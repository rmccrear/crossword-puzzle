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
