'use strict';

function generateLinkForCrossword(crosswordData) {
  const crosswordItems = crosswordData.result;
  const qs = crosswordItemsToQueryString(crosswordItems);
  const origin = location.origin;
  // const pathname = location.pathname;
  const pathname = "/name-game.html";
  const url = origin + pathname + qs;
  return url;
}

// global
let crosswordData;


document.getElementById("create-button").addEventListener("click", function(e) {
  e.preventDefault();
  const csv = document.getElementById("create-crossword-textarea").value;
  console.log(csv);
  const crosswordItems = crosswordItemsFromCSV(csv);
  // set global!!
  crosswordData = generateLayout(crosswordItems);
  const url = generateLinkForCrossword(crosswordData);
  removeClass(".after-create-instructions", "hidden");
  const link = document.getElementById("created-game-link");
  link.href = url;
  link.textContent = url;
});