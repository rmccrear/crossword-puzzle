function sanityCheckName(answer) {
  if(answer.match(/^[a-zA-Z]+$/)) {
    return true;
  } else {
    return false;
  }
}

function removeClass(selector, className) {
  const elms = document.querySelectorAll(selector);
  for(let elm of elms) {
    elm.classList.remove(className);
  }
}

function addClass(selector, className) {
  const elms = document.querySelectorAll(selector);
  for(let elm of elms) {
    elm.classList.add(className);
  }
}

function setCurrentName(answer) {
  // sanity check here...
  if(!sanityCheckName(answer)){
    console.error(`Error processing: ${answer}`);
    throw new Error("Unknown characters in answer.");
  }
  const elms = document.querySelectorAll('.current-person');
  for(let elm of elms) {
    elm.textContent = answer;
  }
}

// TODO: grab data from Query String
function analyzeQueryString() {
  const queryString = location.search;
  const result = checkQueryStringForMissingClue(queryString);
  if(result.isCompleted) {
    // display link to crossword puzzle
  } else {
    // continue with name game
    removeClass('#intro-container', 'hidden')
    setCurrentName(result.nextAnswer);
  }

}

analyzeQueryString();

// TODO: find next name

// TODO: populate names.

// TODO: show first step.

// TODO: get name game answer, hide first step

// TODO: Populate share URL, show second step.