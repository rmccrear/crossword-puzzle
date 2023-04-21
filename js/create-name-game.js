'use strict';

function checkForCompletedPuzzle(crosswordData) {
  let isIncomplete = false;
  for(const item of crosswordData.result) {
    if(!item.clue) {
      isIncomplete = true;
    }
  }
  return !isIncomplete;
}

function generateLinkForCrossword(crosswordData) {
  const crosswordItems = crosswordData.result;
  const qs = crosswordItemsToQueryString(crosswordItems);
  const rootURL = getRootURL();
  let pathname;
  if(checkForCompletedPuzzle(crosswordData)){
    pathname = "/play.html"
  } else {
    pathname = "/name-game.html";
  }
  const url = rootURL + pathname + qs;
  return url;
}

// global
let crosswordData;


// sometimes the algorithm fails to include everyone.
function checkForMissing(crosswordData) {
  const missing = crosswordData.result.filter((item) => item.orientation === "none");
  if(missing.length > 0) {
    return missing.map((item) => item.answer);
  } else {
    return false;
  }
}

document.getElementById("create-button").addEventListener("click", function(e) {
  e.preventDefault();
  const csv = document.getElementById("create-crossword-textarea").value;
  const crosswordItems = crosswordItemsFromCSV(csv);
  // set global!!
  crosswordData = generateLayout(crosswordItems);
  const missing = checkForMissing(crosswordData, crosswordItems);
  if(missing) {
    alert(`WARNING: A crossword containing all the names could not be created. This happens if the names just happen not to align in a way that allow us to create one. We suggest adding an extra name to the front of the list until you get a valid crossword puzzle. The missing names is/are: ${missing.join(", ")}`);
  }
  const url = generateLinkForCrossword(crosswordData);
  removeClass(".after-create-instructions", "hidden");
  const link = document.getElementById("created-game-link");
  link.href = url;
  link.textContent = url;
  document.querySelector(".after-create-instructions").scrollIntoView();
});
