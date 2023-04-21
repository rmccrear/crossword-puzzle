
function trimLines(str) {
  const lines = str.split("\n");
  const clean = [];
  for(line of lines) {
    const trimmed = line.trim();
    if(trimmed) {
      clean.push(trimmed);
    }
  }
  return clean.join("\n");
}

/**
  * csv: string - answer, hint\n
*/
function crosswordItemsFromCSV(csv) {
  csv = trimLines(csv);
  const lines = csv.split("\n");
  const items = [];
  for(const line of lines){
    const data = line.split(",")
    const item = {
      clue: data[1],
      answer: data[0].trim()
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
    const clueParamValue = encodeURIComponent(crosswordItems[i].clue || ''); // handle case of incomplete game
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

function checkQueryStringForMissingClue(qs) {
  const params = new URLSearchParams(qs);
  const len = parseInt(params.get('length'));
  const completedItems = [];
  const items = []
  let isCompleted = true;
  let nextAnswer = null;
  let idx = null;


  if(Number.isNaN(len)){
    throw new Error('invalid query string for length in url');
  } else {
    for(let i=0; i<len; i++) {
      const clue = params.get(`c${i}`);
      const answer = params.get(`a${i}`);
      if(answer === null) {
        throw new Error(`invalid query string for answer ${i} in url`);
      }
      // Check for missing clue here...
      if(clue === '' && idx === null) {
        // indicate next one to complete
        nextAnswer = answer;
        idx = i;
        isCompleted = false;
        // add item without clue
        items.push({answer, clue: ''});
      } else if (clue === '' &&  idx !== null) {
        // add other items without clue
        items.push({answer, clue: ''});
      } else {
        completedItems.push({answer, clue});
        items.push({answer, clue});
      }
    }
  } 
  return {
    isCompleted,
    completedItems, // only completed items
    items, // all items, included incomplete
    idx,
    nextAnswer
  };
}
