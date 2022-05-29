const handleBoxAction = (matrix, dataOfBox, typeOfClick) => {};

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

// Function to set the user's choice.
const setLogicalDataAction = () => {};

// Function to get the following choice.
const getLogicalDataAction = () => {};

// Function to get the current choice.
const getCurrentLogicalDataAction = () => {};

// Function for setting the hidden status
const setLogicalDataHiddenStatus = () => {};

// Function for getting the hidden status.
const getLogicalDataHiddenStatus = () => {};

// Function to swap hidden status (true <-> false).
const swapLogicalDataHiddenStatus = () => {};

// Function to traverse contiguous boxes when the value of the selected one is 0.
const contiguousNumbers = () => {};

// Function to finish game.
const setEndOfGame = () => {};

// Function to determine if the game is over.
const getEndOfGame = () => {};

export default handleBoxAction;
