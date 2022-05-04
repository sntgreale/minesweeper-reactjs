// Main function to create the matrix.
const createMatrix = ({ rows, columns }) => {
  let matrix = createEmptyMatrix(rows, columns);
  matrix = setMines(rows, columns, matrix);
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
        value: '',
        isHidden: false,
        color: '',
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
const setMines = (rows, columns, matrix) => {
  const matrixWithMines = matrix;
  const min = 0;
  let x, y;
  let remainingMines = calculateNumbersOfMines(rows, columns);
  while (remainingMines > 0) {
    x = getRandomInteger(min, rows - 1);
    y = getRandomInteger(min, columns - 1);
    if (!matrixWithMines[x][y] || matrixWithMines[x][y].value !== '*') {
      matrixWithMines[x][y].value = '*';
      matrixWithMines[x][y].color = 'black';
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
      if (matrixWithMines[x][y].value !== '*') {
        let sum = 0;
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            try {
              if (matrixWithMines[x + i][y + j]?.value === '*') {
                if (x + i > -1 && y + j > -1) {
                  sum++;
                }
              }
            } catch (e) {
              // empty
            }
          }
        }
        matrixWithNums[x][y].value = sum;
        matrixWithNums[x][y].color = setColor(sum);
      }
    }
  }
  return matrixWithNums;
};

// Function to set the color corresponding to the number assigned in the box.
/**
 *
 * @param {number} number
 * @returns {string}
 */
const setColor = (number) => {
  if (number === 0) return 'grey';
  if (number === 1) return 'red';
  if (number === 2) return 'white';
  if (number === 3) return 'orange';
  if (number === 4) return 'yellow';
  if (number === 5) return 'cyan';
  if (number === 6) return 'lightblue';
  if (number === 7) return 'pink';
  if (number === 8) return 'violet';
  return 'black';
};

// Function to calculate the number of mines depending on the height and width of the matrix.
/**
 *
 * @param {number} rows
 * @param {number} columns
 * @returns {number}
 */
const calculateNumbersOfMines = (rows, columns) => {
  const minesQty = parseInt((rows * columns) / 3);
  return minesQty;
};

// Function to generate a random number from a range of numbers.
/**
 *
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
const getRandomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

export default createMatrix;
