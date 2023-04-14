
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