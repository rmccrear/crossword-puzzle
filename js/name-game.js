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


// TODO: find next name

// TODO: populate names.

// TODO: show first step.

// TODO: get name game answer, hide first step

// TODO: Populate share URL, show second step.
function builderURL(queryString) {
  return `${location.origin}/name-game.html${queryString}`;
}

function completedGameURL(queryString) {
  return `${location.origin}${queryString}`;
}

function applyBuilderURL(queryString) {
  const elms = document.querySelectorAll('.url-display');
  const url = builderURL(queryString);
  for(let elm of elms) {
    elm.textContent = url;
  }
}

function applyCompletedGameURL(queryString) {
  const elms = document.querySelectorAll('.url-display');
  const url = completedGameURL(queryString);
  for(let elm of elms) {
    elm.textContent = url;
  }
}

function completeShare() {
  const queryString = nameGameBuilder.toQueryString();

  const nextNameGameBuilder = new NameGameBuilder(queryString);
  nextNameGameBuilder.analyzeQueryString(queryString);
  if(nextNameGameBuilder.isCompleted) {
    addClass("#next-person-instructions", "hidden");
    const nextPersonSpans = document.querySelectorAll(".next-person");
    for(let next of nextPersonSpans) {
      next.textContent = "Everyone"
    }
    applyCompletedGameURL(queryString);
  } else {
    const nextAnswer = nextNameGameBuilder.nextAnswer;
    addClass("#last-person-instructions", "hidden");
    const nextPersonSpans = document.querySelectorAll(".next-person");
    for(let next of nextPersonSpans) {
      next.textContent = nextAnswer;
    }
    applyBuilderURL(queryString);
  }
}

function gotoPartTwo() {
  const introContainer = document.getElementById("intro-container");
  const shareLinkContainer = document.getElementById("share-link-container");
  addClass("#intro-container", "hidden");
  removeClass("#share-link-container", "hidden");
}


class NameGameBuilder {
  // grab data from Query String
  analyzeQueryString(queryString) {
    const result = checkQueryStringForMissingClue(queryString);
    this.completedItems = result.completedItems;
    this.items = result.items;
    this.nextIdx = result.idx;
    this.isCompleted = result.isCompleted;
    this.nextAnswer = result.nextAnswer;
  }

  setNextInterestingThing(thing) {
    this.items[this.nextIdx].clue = thing;
  }

  toQueryString() {
    return crosswordItemsToQueryString(this.items);
  }
}

const nameGameBuilder = new NameGameBuilder();
const queryString = location.search;
nameGameBuilder.analyzeQueryString(queryString);
if(nameGameBuilder.isCompleted) {
  // display link to crossword puzzle
} else {
  // continue with name game
  removeClass('#intro-container', 'hidden')
  setCurrentName(nameGameBuilder.nextAnswer);
}

document.getElementById("yes-identity").addEventListener("click", () => {
  addClass("#identify-player-container", "hidden");
  removeClass("#question-container", "hidden");
});

document.getElementById("no-identity").addEventListener("click", () => {
  addClass("#identify-player-container", "hidden");
  removeClass("#wrong-person-container", "hidden");
  const queryString = nameGameBuilder.toQueryString();
  applyBuilderURL(queryString);
});


document.getElementById("name-game-submit-thing").addEventListener("click", () => {
  const input = document.getElementById("interesting-input");
  const interestingThing = input.value;
  nameGameBuilder.setNextInterestingThing(interestingThing);
  console.log(nameGameBuilder.items)
  completeShare();
  gotoPartTwo();
})