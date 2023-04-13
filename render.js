
function renderLetterBoxInput({correctAns, idx}) {
  // double check sanity
  if(correctAns.length==1 && correctAns.match(/[a-zA-Z]/)){
    return `<input type="text" data-idx=${idx} data-correct-answer="${correctAns}" class="letter-box-input"/>`;
  } else {
    console.log("error rendering input form with correctAns" + correctAns);
    return `<input type="text" class="letter-box-input letter-box-input-error"/>`;
  } 
}

function renderLetterBox({correctAns, isEmpty, idx}) {
  if(isEmpty) {
    return `<div class="letter-box letter-box-empty"></div>`
  }
}