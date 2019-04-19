/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
// I n number. n by n, n by n rooks. 
// O array of arrays.  =this.rows()
// C must not have any row or col conflicts.
// E 0? 1? there's no solutions for 1, and only 1 solution for n=1. 
window.findNRooksSolution = function(n) {
  var board = new Board({'n':n})
  var solution = board.rows(); //fixme
  // instantiate a board, this.rows()
  // togglePiece to begin with
  // then iterate to the next spot
  // togglePiece for that spot EG [1, 1, 0, 0]
  // call hasAnyRowConflicts || ColConflicts
  // if either are true, togglePiece for that spot back
  // move on, iterating through whole book
  // upon reaching the end of the book, return solution. 
  for (let i = 0; i < board.get('n'); i++) {
    for (let j = 0; j < board.get('n'); j++) {
      board.togglePiece(i,j)
      if (board.hasAnyRooksConflicts()) {
        board.togglePiece(i,j)
      }
    }
  }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
