
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
  } else {
    const input = renderLetterBoxInput({correctAns, idx});
    return `
      <div class="letter-box">${input}</div>
    `
  }
}

function renderBoard(crosswordData) {
  const { cols, rows, table } = crosswordData;
  const boxElms = [];
  for(let i=0; i<rows; i++){
    for(let j=0; j<cols; j++){
      const letter = table[i][j];
      let box;
      if(letter === "-") {
        box = renderLetterBox({isEmpty: true});
      } else {
        box = renderLetterBox({correctAns: letter, idx: i+j})
      }
      boxElms.push(box);
    }
  }
  return boxElms.join("\n");
}
