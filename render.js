
function renderLetterBoxInput({correctAns, idx}) {
  // double check sanity
  if(correctAns.length==1 && correctAns.match(/[a-zA-Z]/)){
    return `<input type="text" data-idx=${idx} pattern="${correctAns}" data-correct-answer="${correctAns}" class="letter-box-input"/>`;
  } else {
    console.log("error rendering input form with correctAns" + correctAns);
    return `<input type="text" class="letter-box-input letter-box-input-error" />`;
  } 
}

function renderLetterBox({correctAns, isEmpty, idx, startNumber}) {
  if(isEmpty) {
    return `<div class="letter-box letter-box-empty"></div>`
  } else {
    const input = renderLetterBoxInput({correctAns, idx});
    let startNumberDiv = '';
    if(startNumber) {
      startNumberDiv = `<div class="letter-box-start-number">${startNumber}</div>`;
    }
    return `
      <div class="letter-box">${startNumberDiv}${input}</div>
    `
  }
}

function renderBoard(crosswordData) {
  const { cols, rows, table, result } = crosswordData;
  const startPositions = generateHashTableForStartPositions(result);
  const boxElms = [];
  for(let i=0; i<rows; i++){
    for(let j=0; j<cols; j++){
      const letter = table[i][j];
      let box;
      if(letter === "-") {
        box = renderLetterBox({isEmpty: true});
      } else {
        const startNumber = startPositions[[j,i]]; // note: a hash table can be indexed by any hashable object, including an array.
        box = renderLetterBox({correctAns: letter, idx: i+j, startNumber})
      }
      boxElms.push(box);
    }
  }
  return boxElms.join("\n");
}

// this will help us know where to put the number on the crossword board.
// For example: hashTable[0,0] would give us undefined if there is no number applicable
//              or a number, say 1, if that is the number of hint, whether down, or across.
function generateHashTableForStartPositions(crosswordResult) {
  const hashTable = {};
  for(let wordItem of crosswordResult){ 
    // This is the position we will put the number for the word in the board
    const pos = [wordItem.startx - 1, wordItem.starty - 1]; 
    hashTable[pos] = wordItem.position; // position, here is the number of it's hint.
  }
  return hashTable;
}