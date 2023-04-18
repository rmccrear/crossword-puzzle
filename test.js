
const testData1 = {
  "table": [
      [ "-", "-", "-", "-", "-", "h", "-" ],
      [ "-", "-", "-", "-", "-", "o", "-" ],
      [ "o", "c", "t", "o", "p", "u", "s" ],
      [ "-", "-", "-", "-", "-", "n", "-" ],
      [ "-", "-", "-", "-", "-", "d", "-" ]
  ],
  "result": [
      {
          "clue": "a kind of dog", "answer": "hound", "startx": 6, "starty": 1, "orientation": "down", "position": 1
      },
      {
          "clue": "a kind of sea animal", "answer": "octopus", "startx": 1, "starty": 3, "orientation": "across", "position": 2
      }
  ],
  "rows": 5,
  "cols": 7,
  "table_string": "-----h-<br>-----o-<br>octopus<br>-----n-<br>-----d-<br>"
};

describe('Render Engine', function () {
  describe('#renderLetterBoxInput', function () {
    it('should render an input for the answer', function () {
      const letterBoxInput = renderLetterBoxInput({correctAns: "a", idx: 0});
      chai.assert(letterBoxInput.match(/letter-box-input/));
      chai.assert(letterBoxInput.includes("data-idx=0"));
      chai.assert(letterBoxInput.includes('data-correct-answer="a"'));
    });
    it('should sanity check an input', function () {
      // should only accept answers of length 1
      const letterBoxInput = renderLetterBoxInput({correctAns: "xyz", idx: 0});
      chai.assert(letterBoxInput.match(/letter-box-input-error/));
    });
  });

  describe('#renderLetterBox', function () {
    it('should render an empty box', function () {
      const emptyLetterBox = renderLetterBox({isEmpty: true});
      chai.assert(emptyLetterBox.match(/letter-box-empty/));
    });
  });

  describe("#renderBoard", function () {
    it("should render a full board", function () {
      const gameBoard = renderBoard(testData1);
      chai.assert(gameBoard.includes('data-correct-answer="o"'));
      chai.assert(gameBoard.includes('data-correct-answer="c"'));
      chai.assert(gameBoard.includes('data-correct-answer="c"'));
      chai.assert(gameBoard.includes('data-correct-answer="t"'));
      chai.assert(gameBoard.includes('data-correct-answer="p"'));
      chai.assert(gameBoard.includes('data-correct-answer="u"'));
      chai.assert(gameBoard.includes('data-correct-answer="s"'));
    })
  });
});

describe('convert and save', () => {
  describe('#crosswordItemsToQueryString', () => {
    it('can convert crossword to query string', () => {
      const crosswordItems = [
        {answer: "owl", clue: "night bird"},
        {answer: "octopus", clue: "sea animal"}
      ];
      const qs = crosswordItemsToQueryString(crosswordItems);
      const expectedQueryString = '?length=2&c0=night%20bird&c1=sea%20animal&a0=owl&a1=octopus';
      chai.expect(qs).to.equal(expectedQueryString);
    });
  });

  describe('#queryStringToCrosswordItems', () => {
    it('can build your crossword from a query string', () => {
      const qs = '?length=2&c0=night%20bird&c1=sea%20animal&a0=owl&a1=octopus';
      const crosswordItems = queryStringToCrosswordItems(qs);
      chai.expect(crosswordItems[0].answer).to.equal('owl');
      chai.expect(crosswordItems[1].answer).to.equal('octopus');
      chai.expect(crosswordItems[0].clue).to.equal('night bird');
      chai.expect(crosswordItems[1].clue).to.equal('sea animal');
    });

    it('throws on missing length in query string', () => {
      const qs = '?length=XYZ&c0=night%20bird&c1=sea%20animal&a0=owl&a1=octopus';
      chai.expect(() => queryStringToCrosswordItems(qs)).to.throw();
    });

    it('throws on missing answer', () => {
      const qs = '?length=2&c0=night%20bird&c1=sea%20animal&a0=owl&';
      chai.expect(() => queryStringToCrosswordItems(qs)).to.throw();
    })

    it('throws on missing clue', () => {
      const qs = '?length=2&c0=night%20bird&a0=owl&a1=octopus';
      chai.expect(() => queryStringToCrosswordItems(qs)).to.throw();
    })
  })
})