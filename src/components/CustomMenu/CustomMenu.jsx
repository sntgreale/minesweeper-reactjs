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
  const [rowsQuantity, setRowsQuantity] = useState(2);
  const [colsQuantity, setColsQuantity] = useState(2);
  const [minesQuantity, setMinesQuantity] = useState(3);

  /* useEffect used to determine the maximum number of possible mines to be entered by the user. */
  /* Also used to determine the status (active or inactive of the PLAY GAME button) according to the number of mines entered. */
  /* Mines MAX = rows*columns-1 */
  useEffect(() => {
    const currentInputs = [...inputsOptions];
    const currentButtons = [...buttonsOptions];
    const minesInputIndex = returnConfigurationOption(currentInputs, 'MINES');
    const newMaxQtyMines = rowsQuantity * colsQuantity - 1;
    currentInputs[minesInputIndex].inputConfig.maxQty = newMaxQtyMines;
    const playButtonIndex = returnConfigurationOption(
      currentButtons,
      'PLAYGAME'
    );
    const isValidValue = validateMinesQuantity(newMaxQtyMines);
    //! It looks ugly .disabled = !isValidValue. See how to change it.
    currentButtons[playButtonIndex].disabled = !isValidValue;

    setInputOptions(currentInputs);
    setButtonsOptions(currentButtons);
  }, [rowsQuantity, colsQuantity, minesQuantity]);

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
    } else {
      if (dataFromChildren._searchKey === 'COLUMNS') {
        setColsQuantity(quantity);
      } else {
        if (dataFromChildren._searchKey === 'MINES') {
          setMinesQuantity(quantity);
        }
      }
    }
  };

  /* Function to manage the button actions. */
  const handleButtonPressed = (dataFromChildren) => {
    console.log(dataFromChildren);
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
