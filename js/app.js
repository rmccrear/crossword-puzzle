// set global settings here.
const globalBoxWidth = "3em";
const globalBoxHeight= "3em";

// TODO: replace with input from url string
// initial data
const crosswordData = generateLayout([{clue: "a kind of dog", answer:"hound"}, {"clue": "a kind of sea animal", answer: "octopus"}, {clue: "night bird", answer: "owl"}, {clue: "not off", answer: "on"}]);
console.log(crosswordData);

// This function will populate the hints section of the page
function setupHints(crosswordData) {
  const items = crosswordData.result;
  const acrossHints = [];
  const downHints = [];
  for(item of items) {
    const {clue, orientation, position} = item;
    if(orientation === "across"){
      acrossHints.push({position, clue});
    } else if (orientation === "down") {
      downHints.push({position, clue});
    }
  }
  const acrossHintListItems = renderHintListItems(acrossHints);
  document.getElementById("across-hints").innerHTML = acrossHintListItems.join("");
  const downHintListItems = renderHintListItems(downHints);
  document.getElementById("down-hints").innerHTML = downHintListItems.join("");

}

// This function will populate the board section of the page.
function setupBoard(crosswordData){
  const boardData = renderBoard(crosswordData);
  console.log(boardData);
  document.getElementById("board").style.backgroundColor = "white";
  document.getElementById("board").style.width = `calc(${globalBoxWidth}*${crosswordData.cols} + 1em)`
  document.getElementById("board").style.gridTemplateColumns = `repeat(${crosswordData.cols}, ${globalBoxWidth})`;
  document.getElementById("board").style.gridTemplateRows = `repeat(${crosswordData.rows}, ${globalBoxHeight})`;
  document.getElementById("board").innerHTML = boardData;
}

function run(){
  // on init do...
  setupBoard(crosswordData);
  setupHints(crosswordData);
  document.getElementById("create-button").addEventListener("click", function(e) {
    e.preventDefault();
    const csv = document.getElementById("create-crossword-textarea").value;
    console.log(csv);
    const crosswordItems = crosswordItemsFromCSV(csv);
    const crosswordData = generateLayout(crosswordItems);
    setupBoard(crosswordData);
  });
}

run();
