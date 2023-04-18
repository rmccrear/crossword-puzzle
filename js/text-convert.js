
/**
  * csv: string - answer, hint\n
*/
function crosswordItemsFromCSV(csv) {
  const lines = csv.split("\n");
  const items = [];
  for(line of lines){
    const data = line.split(",")
    const item = {
      clue: data[1],
      answer: data[0]
    }
    items.push(item);
  }
  return items;
}

/**
 * 
 * @param {Array} crosswordItems 
 * 
 * This function "saves" the crossword puzzle as a URL
 * 
 * ?length=2&a0=owl&a1=octopus&c0=night%20bird&c1=sea%20animal
 * 
 */
function crosswordItemsToQueryString(crosswordItems) {
  const clueParams = [];
  const ansParams = [];
  for(let i=0; i<crosswordItems.length; i++){
    const clueParamKey = `c${i}`;
    const ansParamKey = `a${i}`;
    const clueParamValue = encodeURIComponent(crosswordItems[i].clue);
    const ansParamValue = encodeURIComponent(crosswordItems[i].answer);
    clueParams.push(`${clueParamKey}=${clueParamValue}`);
    ansParams.push(`${ansParamKey}=${ansParamValue}`);
  }

  return '?' + `length=${crosswordItems.length}` + '&' + clueParams.join('&') + '&' + ansParams.join('&');
}

function queryStringToCrosswordItems(qs) {
  const params = new URLSearchParams(qs);
  const len = parseInt(params.get('length'));
  const items = [];
  console.log(len)
  if(Number.isNaN(len)){
    throw new Error('invalid query string for length in url');
  } else {
    for(let i=0; i<len; i++) {
      const clue = params.get(`c${i}`);
      const answer = params.get(`a${i}`);
      if(clue === null || answer === null) {
        throw new Error(`invalid query string for clue or answer ${i} in url`);
      }
      items.push({clue, answer});
    }
  } 
  return items;
}
