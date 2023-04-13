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
});