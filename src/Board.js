// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict

    //i:rowIndex o:T/F c: ec:
    hasRowConflictAt: function(rowIndex) {

//access the row.. []
      var currentRow = this.get(rowIndex);
      var counter = 0;
//loop through row for the elements
      for(var i = 0; i < currentRow.length; i++){
        if(currentRow[i] === 1){
          counter ++;
        }
      }
      if(counter > 1){
        return true;
      }
//if after looping, check if theres one 1, return false
//if after looping, and theres > 1, return true;

      return false; // fixme
    },

    // test if any rows on this board contain conflicts


    //i: o:T/F c: ec:
    hasAnyRowConflicts: function() {
    

    //loop through each row

    for(var i = 0; i< this.rows().length; i++){
      if(this.hasRowConflictAt(i)){
        return true;
      }
    }
    // for(var i = 0 ; i < grid.length; i++){
    //   if(hasRowConflictAt(grid[i])){
    //     return true;
    //   }
    // }
    //for each row, we use above function
    //after loop, check if any returned true
    //if it returned true, then return true;  
      return false; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    // I colIndex (number)
    // O boolean
    // C, E none
    hasColConflictAt: function(colIndex) {
      // retrieve the numbers at this.get[key][colIndex]
      // Add them together
      // if the sum is > 1; return true; else false.
      var sum = 0;
      for (let i = 0; i < this.get('n'); i++) {
        sum += this.get(i)[colIndex];
      }
      if (sum > 1) {
        return true;
      }
      return false; // fixme
    },

    // test if any columns on this board contain conflicts
    // I none
    // O boolean
    // C, E none
    hasAnyColConflicts: function() {
      // loop through every row
      // call hasColConflictAt on every row
      // if there is a true value, return true
      // Loop breaks (returns), after true
      // if not, return false. 
      for (let i = 0; i < this.get('n'); i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    // I all the indexes at the top first column (number)
    // O Boolean
    // C, E none?

    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      // take whatever number is produced
      // declare a sum value
      // if cmajorDiagonal whatever, then add to sum
      // so need a for loop to iterate through rowIndexes and Colindexes and then add the values to sum
      // if sum > 1
      // return true
      var sum = 0;
      for (let i = 0; i < this.get('n'); i++) {
        for (let j = 0; j < this.get('n'); j++) {
          if (this._getFirstRowColumnIndexForMajorDiagonalOn(i, j) === majorDiagonalColumnIndexAtFirstRow) {
            sum += this.get(i)[j];
          }
        }
      }
      if (sum > 1) {
        return true;
      }
      return false; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    // I none
    // O boolean
    // C, E none? 
    hasAnyMajorDiagonalConflicts: function() {
      for (let i = -1 * (this.get('n')-1); i < this.get('n'); i++) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {//
      var sum = 0;
      for(var i = 0; i < this.get('n'); i++){
        for(var j = 0; j < this.get('n'); j++){
          if(this._getFirstRowColumnIndexForMinorDiagonalOn(i, j) === minorDiagonalColumnIndexAtFirstRow){
            sum += this.get(i)[j];
          }
        }
      }
      if(sum > 1){
        return true;
      }
      //create board by looping through twice
      //if(rci 
      //if greater than 2, return true;
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    //i: o: boolean : c,e:
    hasAnyMinorDiagonalConflicts: function() {
    //loop all the numbers in rci board
    //perform function above on each index
    //if true; then return false

    for(var i = 0; i <= (this.get('n')-1)*2; i++){
      if(this.hasMinorDiagonalConflictAt(i)){
        return true;
      }
       // fixme
    }
    return false;
  }  

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
