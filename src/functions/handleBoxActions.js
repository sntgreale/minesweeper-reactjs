const handleBoxAction = (matrix, dataOfBox) => {};

//! Click Left main thread
/**
 * Check if box that user clicked is a mine or a number
 *  box = mine -> end game
 *  box != mine ->
 *    check if number is zero
 *    number = 0 -> Call function to reveal this box and other contiguous
 *    numbr != 0 -> Call function to reveañ this box only.
 */

//! Click Right main thread
/**
 * Check if the box is not currently hidden.
 * Check status of box
 *  if box = empty -> set 'Flag'.
 *  if box = flag -> set 'Question'.
 *  if box = question -> set 'Empty'.
 *
 */

//! General functions
/**
 *  contiguousNumbers -> function to traverse contiguous boxes when the value of the selected one is 0.
 *
 *  setEndOfGame -> function to finish game.
 *  getEndOfGame -> function to determine if the game is over.
 */

// Function to determine if the game is over.
const getEndOfGame = (matrix) => {
  let allBoxesUnhidden = true;
  matrix.map((row) => {
    row.map((col) => {
      if (col.state.isHidden === true) {
        allBoxesUnhidden = false;
      }
    });
  });
  return allBoxesUnhidden;
};

// Function to set the user's choice.
const setUserChoice = (data) => {
  const currentData = { ...data };
  currentData.state.userChoice = getNextChoice(data);
  return currentData;
};

// Function to get the following choice.
const getNextChoice = (data) => {
  const currentChoice = getCurrentChoice(data);
  if (currentChoice === '') {
    return 'FLAG';
  }
  if (currentChoice === 'FLAG') {
    return 'QUESTION';
  }
  if (currentChoice === 'QUESTION') {
    return '';
  }
};

// Function to get the current choice.
const getCurrentChoice = (data) => {
  const currentUserChoice = data.state.userChoice;
  return currentUserChoice;
};

// Function for setting the hidden status
const setHiddenStatus = (data, value) => {
  const currentData = { ...data };
  currentData.state.isHidden = value;
  return currentData;
};

// Function for getting the hidden status.
const getHiddenStatus = (data) => {
  const currentHiddenStatus = data.state.isHidden;
  return currentHiddenStatus;
};

// Function to swap hidden status (true <-> false).
const swapHiddenStatus = (data) => {
  const currentHiddenStatus = getHiddenStatus(data);
  const currentData = { ...data };
  currentData.state.isHidden = !currentHiddenStatus;
  return currentData;
};

export default handleBoxAction;
