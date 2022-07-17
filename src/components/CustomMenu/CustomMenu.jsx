import React, { useEffect, useState } from 'react';
import Button from '../Button/Button';
import Input from '../Input/Input';
import Separator from '../Separator/Separator';
import buttonsList from './CustomMenuButtons.config.json';
import inputList from './CustomMenuInputs.config.json';
import * as PropType from 'prop-types';
import './CustomMenu.scss';

const CustomMenu = ({ handleEntrance }) => {
  const [inputsOptions, setInputOptions] = useState(inputList);
  const [buttonsOptions, setButtonsOptions] = useState(buttonsList);
  // TODO FIX ME: Same values as in the configuration
  const [rowsQuantity, setRowsQuantity] = useState(5); //! FIX ME
  const [columnsQuantity, setColsQuantity] = useState(5); //! FIX ME
  const [minesQuantity, setMinesQuantity] = useState(15); //! FIX ME

  /* useEffect used to determine the maximum number of possible mines to be entered by the user. */
  /* Also used to determine the status (active or inactive of the PLAY GAME button) according to the number of mines entered. */
  /* Mines MAX = rows*columns-10 */
  useEffect(() => {
    const currentInputs = [...inputsOptions];
    const currentButtons = [...buttonsOptions];
    const minesInputIndex = returnConfigurationOption(currentInputs, 'MINES');
    const newMaxQtyMines = rowsQuantity * columnsQuantity - 10;
    currentInputs[minesInputIndex].inputConfig.maxQty = newMaxQtyMines;
    const playButtonIndex = returnConfigurationOption(
      currentButtons,
      'PLAYGAME'
    );
    const isValidValue = validateMinesQuantity(newMaxQtyMines);
    // TODO FIX ME
    //! It looks ugly .disabled = !isValidValue. See how to change it.
    currentButtons[playButtonIndex].disabled = !isValidValue;

    setInputOptions(currentInputs);
    setButtonsOptions(currentButtons);
  }, [rowsQuantity, columnsQuantity, minesQuantity]);

  const validateMinesQuantity = (maxQtyValid) => {
    return minesQuantity >= 1 && minesQuantity <= maxQtyValid;
  };

  /* Function to return a specific object according to its Search Key */
  const returnConfigurationOption = (array, key) => {
    const index = array.findIndex((item) => {
      return item._searchKey === key;
    });
    return index;
  };

  /* Function to handle changes of input statuses */
  const handleInputChanges = (dataFromChildren) => {
    const quantity = parseInt(dataFromChildren.value);
    if (dataFromChildren._searchKey === 'ROWS') {
      setRowsQuantity(quantity);
      return;
    }
    if (dataFromChildren._searchKey === 'COLUMNS') {
      setColsQuantity(quantity);
      return;
    }
    if (dataFromChildren._searchKey === 'MINES') {
      setMinesQuantity(quantity);
      return;
    }
  };

  /* Function to manage the button actions. */
  const handleButtonPressed = (dataFromChildren) => {
    const buttonType = dataFromChildren?._searchKey;
    if (buttonType === 'PLAYGAME') {
      handleEntrance({
        action: buttonType,
        data: { rowsQuantity, columnsQuantity, minesQuantity },
      });
    }
    if (buttonType === 'CANCEL') {
      handleEntrance({ action: buttonType });
    }
  };

  const renderInputs = () => {
    return inputsOptions.map((inp) => {
      return (
        <Input
          data={inp}
          handleChange={(dataFromChildren) =>
            handleInputChanges(dataFromChildren)
          }
          key={inp._searchKey}
        />
      );
    });
  };

  const renderButtons = () => {
    return buttonsOptions.map((btn) => {
      return (
        <Button
          data={btn}
          handleChange={(dataFromChildren) =>
            handleButtonPressed(dataFromChildren)
          }
          key={btn._searchKey}
        />
      );
    });
  };

  return (
    <div className='customMenu-container'>
      <div className='customMenu'>
        <div className='customMenu-inputs-container'>{renderInputs()}</div>
        <div>
          <Separator />
        </div>
        <div className='customMenu-buttons-container'>{renderButtons()}</div>
      </div>
    </div>
  );
};

CustomMenu.defaultProps = {
  handleEntrance: () => {},
};

CustomMenu.propTypes = {
  handleEntrance: PropType.func,
};

export default CustomMenu;
