'use strict';

// This page implements a Single Page App design by showing and hiding steps
// with the .hidden class as the user completes a process.

// After one section is complete, we hide it and ask for the next step.
// set name of current user in document

// TODO: populate names.
// It might be nice to show who has completed the game already
// But it might confuse the users.

// helper:
// set current user name in document
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

// helper:
// create url for creation part of game
function builderURL(queryString) {
  const rootURL = getRootURL();
  return `${rootURL}/name-game.html${queryString}`;
}

// helper:
// set url for final part of game
function completedGameURL(queryString) {
  const rootURL = getRootURL();
  return `${rootURL}/play.html${queryString}`;
}

// insert builder url (creation part of the game) into the document
function applyBuilderURL(queryString) {
  const elms = document.querySelectorAll('.url-display');
  const url = builderURL(queryString);
  for(let elm of elms) {
    elm.textContent = url;
  }
}

// insert completed url into the document
function applyCompletedGameURL(queryString) {
  const elms = document.querySelectorAll('.url-display');
  const url = completedGameURL(queryString);
  for(let elm of elms) {
    elm.textContent = url;
  }
}

// after user has shared, show the link
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

// hide the current section and display the link
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

// START DOM SETUP

const nameGameBuilder = new NameGameBuilder();
const queryString = location.search;
nameGameBuilder.analyzeQueryString(queryString);
if(nameGameBuilder.isCompleted) {
  // TODO: display link to crossword puzzle if user has inputted an already completed game.
} else {
  // continue with name game
  removeClass('#intro-container', 'hidden')
  setCurrentName(nameGameBuilder.nextAnswer);
}

// handle clicks

// handle "yes, it is me"
// move to question
document.getElementById("yes-identity").addEventListener("click", () => {
  addClass("#identify-player-container", "hidden");
  removeClass("#question-container", "hidden");
});

// handle "no, it is not me"
// instruct the user to send it on.
document.getElementById("no-identity").addEventListener("click", () => {
  addClass("#identify-player-container", "hidden");
  removeClass("#wrong-person-container", "hidden");
  const queryString = nameGameBuilder.toQueryString();
  applyBuilderURL(queryString);
});

// handle input interesting thing
document.getElementById("name-game-submit-thing").addEventListener("click", () => {
  const input = document.getElementById("interesting-input");
  const interestingThing = input.value;
  if(interestingThing.length>0){
    nameGameBuilder.setNextInterestingThing(interestingThing);
    console.log(nameGameBuilder.items)
    completeShare(); // populate share link
    gotoPartTwo(); // show share link div
  }
});

// handle click URL to copy it into clipboard
function copyUrlFn(evt) {
  const target = evt.currentTarget;
  // the url-display is within this container, so search for it.
  const textElm = target.querySelector(".url-display");
  const copyValue = textElm.textContent;
  navigator.clipboard.writeText(copyValue);
  const copyButton = target.querySelector(".url-display-copy-btn");
  copyButton.textContent = "Copied!"
}

const urlContainers = document.querySelectorAll(".url-display-container");
for(let elm of urlContainers) {
  elm.addEventListener("click", copyUrlFn);
}