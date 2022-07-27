const handleBoxAction = (matrix, dataOfBox, typeOfClick) => {
  let newMatrix = [...matrix];
  if (typeOfClick === 'RIGHT') {
    newMatrix = clickRightMainThread(newMatrix, dataOfBox);
  }
  if (typeOfClick === 'LEFT') {
    newMatrix = clickLeftMainThread(newMatrix, dataOfBox);
  }
  return newMatrix;
};

//! Click Left main thread
/**
 * - Check if currentAction is valid for Left Click
 * - Check if isHidden or not
 * - Check if box that user clicked is a mine or a number
 *      box = mine ->
 *          reveal all mines.
 *          set end game.
 *      box != mine ->
 *          check if number is zero
 *          number == 0 -> Call function to reveal this box and other contiguous
 *          number != 0 -> Call function to reveal this box only.
 */

// TODO
// Main thread to LEFT click
const clickLeftMainThread = (matrix, dataOfBox) => {
  let newMatrix = [...matrix];
  let newDataOfBox = { ...dataOfBox };
  const isHidden = getLogicalDataHiddenStatus(dataOfBox);
  const currentLogicalDataAction = getCurrentLogicalDataAction(dataOfBox);
  const isValidAction = isValidActionForLeftClick(currentLogicalDataAction);
  if (isHidden && isValidAction) {
    const valueOfBoxPressed = determinePressedValue(dataOfBox);
    if (valueOfBoxPressed === 'MINE') {
      /**
       * TODO ->
       * !FIX ME
       * * Set end of game.
       **/
      newMatrix = revealAllMines(newMatrix);
      return newMatrix;
    }
    if (valueOfBoxPressed === 'ZERO') {
      /**
       * TODO ->
       * * Reveal Contiguous Numbers
       */
      newMatrix = revealContiguousNumbers(newMatrix, newDataOfBox);
      return newMatrix;
    }
    if (valueOfBoxPressed === 'NUMBER') {
      const newHiddenStatus = swapLogicalDataHiddenStatus(isHidden);
      newDataOfBox = setLogicalDataHiddenStatus(dataOfBox, newHiddenStatus);
      newDataOfBox = updateLogicalValue(dataOfBox);
      newMatrix = updateMatrixWithNewBoxInfo(newMatrix, newDataOfBox);
      return newMatrix;
    }
  } else {
    return matrix;
  }
};

//! Click Right main thread
/**
 * - Check if the box is not currently hidden.
 * - Check status of box
 *      if box = empty -> set 'Flag'.
 *      if box = flag -> set 'Question'.
 *      if box = question -> set 'Empty'.
 *
 */

// Main thread to RIGHT click
const clickRightMainThread = (matrix, dataOfBox) => {
  let newMatrix = [...matrix];
  let newDataOfBox = { ...dataOfBox };
  const isHidden = getLogicalDataHiddenStatus(dataOfBox);
  if (isHidden) {
    const currentLogicalDataAction = getCurrentLogicalDataAction(dataOfBox);
    const nextLogicalDataAction = getNextLogicalDataAction(
      currentLogicalDataAction
    );
    newDataOfBox = setLogicalDataAction(dataOfBox, nextLogicalDataAction);
    newMatrix = updateMatrixWithNewBoxInfo(newMatrix, newDataOfBox);
    return newMatrix;
  } else {
    return matrix;
  }
};

// Function to set the user's choice.
const setLogicalDataAction = (dataOfBox, nextLogicalDataAction) => {
  const { action, value } = nextLogicalDataAction;
  const newDataOfBox = { ...dataOfBox };
  newDataOfBox.logicalData.action = action;
  newDataOfBox.logicalData.value = value;
  return newDataOfBox;
};

// Function to get the next choice.
const getNextLogicalDataAction = (currentLogicalDataAction) => {
  if (currentLogicalDataAction === 'EMPTY') {
    return { action: 'FLAG', value: '⚑' };
  }
  if (currentLogicalDataAction === 'FLAG') {
    return { action: 'QUESTION', value: '?' };
  }
  if (currentLogicalDataAction === 'QUESTION') {
    return { action: 'EMPTY', value: '' };
  }
};

// Function to get the current choice.
const getCurrentLogicalDataAction = (dataOfBox) => {
  return dataOfBox.logicalData.action;
};

// Function for setting the hidden status
const setLogicalDataHiddenStatus = (dataOfBox, hiddenStatus) => {
  const newDataOfBox = { ...dataOfBox };
  newDataOfBox.logicalData.isHidden = hiddenStatus;
  return newDataOfBox;
};

// Function for getting the hidden status.
const getLogicalDataHiddenStatus = (dataOfBox) => {
  return dataOfBox.logicalData.isHidden;
};

// Function to swap hidden status (true <-> false).
const swapLogicalDataHiddenStatus = (isHidden) => {
  return !isHidden;
};

// Function to update the Logical Data value to display to the user.
const updateLogicalValue = (dataOfBox) => {
  // Function to obtain the Original Data Value
  const getOriginalDataValue = (dataOfBox) => {
    return dataOfBox.originalData.value;
  };

  const newDataOfBox = { ...dataOfBox };
  newDataOfBox.logicalData.value = getOriginalDataValue(newDataOfBox);
  return newDataOfBox;
};

// Function used to reveal all the mines in the game.
const revealAllMines = (matrix) => {
  const newMatrix = [...matrix];
  newMatrix.map((row) => {
    row.map((box) => {
      const dataOfBox = newMatrix[box.position.row][box.position.column];
      const isMine = determinePressedValue(dataOfBox);
      if (isMine === 'MINE') {
        let newDataOfBox = setLogicalDataHiddenStatus(dataOfBox, true);
        newDataOfBox = updateLogicalValue(newDataOfBox);
        updateMatrixWithNewBoxInfo(newMatrix, newDataOfBox);
      }
    });
  });
  return newMatrix;
};

// Function to traverse contiguous boxes when the value of the selected one is 0.
const revealContiguousNumbers = (matrix, dataOfBox) => {
  const newMatrix = [...matrix];
  const newDataOfBox = { ...dataOfBox };

  const recursiveZeroesSequence = (arrayWithZerosData) => {
    const positionsToDiscover = [
      { x: -1, y: -1 },
      { x: -1, y: 0 },
      { x: -1, y: 1 },

      { x: 0, y: -1 },
      { x: 0, y: 1 },

      { x: 1, y: -1 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
    ];
    if (arrayWithZerosData.length > 0) {
      let currentDataBox = arrayWithZerosData.shift();
      const {
        position: { row, column },
      } = currentDataBox;
      currentDataBox = setLogicalDataHiddenStatus(currentDataBox, false);
      currentDataBox = updateLogicalValue(currentDataBox);
      newMatrix[row][column] = currentDataBox;

      positionsToDiscover.forEach((pos) => {
        try {
          let fictitiousBoxData = { ...newMatrix[row + pos.x][column + pos.y] };
          if (fictitiousBoxData.originalData.value !== 0) {
            fictitiousBoxData = setLogicalDataHiddenStatus(
              fictitiousBoxData,
              false
            );
            fictitiousBoxData = updateLogicalValue(fictitiousBoxData);
            newMatrix[row + pos.x][column + pos.y] = fictitiousBoxData;
          } else {
            const dataAlreadyExisting = arrayWithZerosData.some(
              (dataBox) => dataBox.position === fictitiousBoxData.position
            );
            const fictitiousBoxDataHiddenStatus =
              getLogicalDataHiddenStatus(fictitiousBoxData);
            if (
              dataAlreadyExisting === false &&
              fictitiousBoxDataHiddenStatus === true
            ) {
              arrayWithZerosData.push(fictitiousBoxData);
            }
          }
        } catch (e) {
          //
        }
      });
      recursiveZeroesSequence(arrayWithZerosData);
    } else {
      return;
    }
  };

  const boxesToBeProcessed = [newDataOfBox];
  recursiveZeroesSequence(boxesToBeProcessed);
  return newMatrix;
};

// Function that returns the value of the pressed box. (MINE - ZERO - NUMBER)
const determinePressedValue = (dataOfBox) => {
  const value = dataOfBox.originalData.value;
  if (value === '*') return 'MINE';
  if (value === 0) return 'ZERO';
  return 'NUMBER';
};

// TODO
// Function to finish game.
const setEndOfGame = () => {};

// TODO
// Function to determine if the game is over.
const getEndOfGame = () => {};

// Function to update Matrix with new data of boxes
const updateMatrixWithNewBoxInfo = (matrix, dataOfBox) => {
  const {
    position: { row, column },
  } = dataOfBox;
  const newMatrix = [...matrix];
  newMatrix[row][column] = dataOfBox;
  return newMatrix;
};

// Function to determine if the action to be performed with the left click is valid.
// (Only the boxes with numbers / mines / empty, allow to execute the main thread of the Left Click).
// (If a box has a flag or a question, execution is not allowed).
const isValidActionForLeftClick = (currentLogicalDataAction) => {
  return currentLogicalDataAction === 'EMPTY';
};

export default handleBoxAction;
