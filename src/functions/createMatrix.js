/**
 * TODO - FIX ME
 * ! FIX ME
 * * Currently to create / generate the mines a process is used that randomly (between 0 and row/column -1)
 * * generates a pair of coordinates where the mine will be placed.
 *
 * * This is inefficient in many cases, for example:
 *
 * * If we have 5 rows and 5 columns, we have 25 pair of coordinates available and a maximum of 15 mines
 * * (quantity validation is done previously).
 * * Such a process can generate 2, 3, 4 ... n, EQUAL pair of coordinates (example: x = 1 , y = 5),
 * * so the time of creation of the matrix is irregular. INEFFICIENT.
 *
 * * Proposed solution:
 * * Generate an array with the available coordinates (at first they will be all those that compose the matrix)
 * * and create a process that chooses, randomly, a pair of available coordinates
 * * (once a pair of coordinates was chosen remove them from the array of those coordinates).
 *
 */

/**
 * Matrix =
 * [
 *  { ... }
 *  {
 *    ! originalData: { value: '', color: '' },
 *    * value -> number of mines surrounding it or if it is a mine
 *    * color -> color of the character displayed to the user (see setColor function)
 *
 *    ! logicalData: { value: '', isHidden: true, action: '', color: 'white' },
 *    * value -> value displayed to the user (number of surrounding mines, mine or flag/question)
 *    * isHidden -> Boolean to determine whether or not to display the value of the field.
 *    * action -> EMPTY > FLAG > QUESTION > EMPTY ...>
 *    * color -> Default color
 *
 *    ! position: { row: x, column: y },
 *    * position -> coordinates of the box within the matrix
 *  }
 * ]
 */
// Main function to create the matrix.
const createMatrix = ({
  rowsQuantity: rows,
  columnsQuantity: columns,
  minesQuantity: mines,
}) => {
  let matrix = createEmptyMatrix(rows, columns);
  matrix = setMines(rows, columns, mines, matrix);
  matrix = setNumbers(rows, columns, matrix);
  return matrix;
};

// Function to create a empty array of x rows by x columns.
/**
 * Number of rows (high) of the matrix
 * @param {number} rows
 * Number of columns (width) of the matrix
 * @param {number} columns
 * @returns {Array}
 */
const createEmptyMatrix = (rows, columns) => {
  let newMatrix = [];
  for (let x = 0; x < rows; x++) {
    newMatrix[x] = [];
    for (let y = 0; y < columns; y++) {
      newMatrix[x][y] = {
        originalData: { value: '', color: '' },
        logicalData: {
          value: '',
          isHidden: true,
          action: 'EMPTY',
          color: 'white',
        },
        position: { row: x, column: y },
      };
    }
  }
  return newMatrix;
};

// Function to set mines in random places on the matrix.
/**
 *
 * @param {number} rows
 * @param {number} columns
 * @param {array} matrix
 * @returns {array}
 */
const setMines = (rows, columns, mines, matrix) => {
  const matrixWithMines = matrix;
  const min = 0;
  const maxRows = rows - 1;
  const maxCols = columns - 1;
  let x, y;
  let remainingMines = mines;
  while (remainingMines > 0) {
    x = getRandomInteger(min, maxRows);
    y = getRandomInteger(min, maxCols);
    if (
      !matrixWithMines[x][y] ||
      matrixWithMines[x][y].originalData.value !== '*'
    ) {
      matrixWithMines[x][y].originalData.value = '*';
      matrixWithMines[x][y].originalData.color = 'black';
      remainingMines -= 1;
    }
  }
  return matrixWithMines;
};

// Function to set the number of mines around the box.
/**
 *
 * @param {number} rows
 * @param {number} columns
 * @param {array} matrixWithMines
 * @returns {array}
 */
const setNumbers = (rows, columns, matrixWithMines) => {
  let matrixWithNums = matrixWithMines;

  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < columns; y++) {
      if (matrixWithMines[x][y].originalData.value !== '*') {
        let sum = 0;
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            try {
              if (matrixWithMines[x + i][y + j]?.originalData.value === '*') {
                if (x + i > -1 && y + j > -1) {
                  sum++;
                }
              }
            } catch (e) {
              // empty
            }
          }
        }
        matrixWithNums[x][y].originalData.value = sum;
        matrixWithNums[x][y].originalData.color = setColor(sum);
      }
    }
  }
  return matrixWithNums;
};

// Function to set the color corresponding to the number assigned in the box.
/**
 *
 * @param {number} number
 * @returns {string} String with color of number
 */
const setColor = (number) => {
  if (number === 0) return 'grey';
  if (number === 1) return 'red';
  if (number === 2) return 'green';
  if (number === 3) return 'orange';
  if (number === 4) return 'yellow';
  if (number === 5) return 'cyan';
  if (number === 6) return 'lightblue';
  if (number === 7) return 'pink';
  if (number === 8) return 'violet';
  return 'black';
};

// Function to generate a random number from a range of numbers.
/**
 *
 * @param {number} min
 * @param {number} max
 * @returns {number} random number
 */
const getRandomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

export default createMatrix;
