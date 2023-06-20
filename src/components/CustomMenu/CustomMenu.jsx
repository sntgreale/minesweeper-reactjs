import React, { useEffect, useState } from 'react';
import Button from '../Button/Button';
import Input from '../Input/Input';
import Message from '../Message/Message';
import Separator from '../Separator/Separator';
import buttonsList from './CustomMenuButtons.config.json';
import inputsList from './CustomMenuInputs.config.json';
import * as PropType from 'prop-types';
import './CustomMenu.scss';

const CustomMenu = ({ handleEntrance }) => {
  const [inputsOptions, setInputOptions] = useState(inputsList);
  const [buttonsOptions] = useState(buttonsList);
  const [rowsQuantity, setRowsQuantity] = useState(5);
  const [columnsQuantity, setColsQuantity] = useState(5);
  const [minesQuantity, setMinesQuantity] = useState(10);

  const validateRowsAndColumnsData = (searchKey, quantityValue) => {
    let newInputOptions = [...inputsOptions];
    let newMessage = resetMessage();
    const { minQty, maxQty } = returnMinAndMaxValues(
      newInputOptions,
      searchKey
    );
    const isWithinTheRange = numberEnteredIsInTheRange(
      minQty,
      quantityValue,
      maxQty
    );
    if (!isWithinTheRange) {
      newMessage = createErrorMessage(minQty, maxQty);
    }
    newInputOptions = setMessage(searchKey, newMessage);
    setInputOptions(newInputOptions);
  };

  useEffect(() => {
    validateRowsAndColumnsData('ROWS', rowsQuantity);
    if (rowsQuantity !== 0) {
      validateMinesInputData();
    }
  }, [rowsQuantity, minesQuantity]);

  useEffect(() => {
    validateRowsAndColumnsData('COLUMNS', columnsQuantity);
    if (columnsQuantity !== 0) {
      validateMinesInputData();
    }
  }, [columnsQuantity, minesQuantity]);

  const validateMinesInputData = () => {
    let newInputOptions = [...inputsOptions];
    let newMessage = resetMessage();
    const { minQty } = returnMinAndMaxValues(newInputOptions, 'MINES');
    const maxAllowed = rowsQuantity * columnsQuantity - 10;
    const isWithinTheRange = numberEnteredIsInTheRange(
      minQty,
      minesQuantity,
      maxAllowed
    );
    if (!isWithinTheRange) {
      newMessage = createErrorMessage(minQty, maxAllowed);
    }
    newInputOptions = setMessage('MINES', newMessage);
    setInputOptions(newInputOptions);
  };

  const setMessage = (searchKey, message) => {
    const newInputOptions = [...inputsOptions];
    const inputIndex = returnConfigurationOptionIndex(
      newInputOptions,
      searchKey
    );
    newInputOptions[inputIndex].message = message;
    return newInputOptions;
  };

  const createErrorMessage = (min, max) => {
    return {
      message: `The value entered must be between: ${min}-${max}`,
      typeOfMessage: 'error',
    };
  };

  const resetMessage = () => {
    return { message: '', typeOfMessage: '' };
  };

  const returnSpecificConfiguration = (inputsConfiguration, searchKey) => {
    const configurationIndex = returnConfigurationOptionIndex(
      inputsConfiguration,
      searchKey
    );
    const configuration = inputsConfiguration[configurationIndex];
    return configuration;
  };

  const numberEnteredIsInTheRange = (min, val, max) => {
    if (val < min || val > max) {
      return false;
    }
    return true;
  };

  const returnMinAndMaxValues = (inputsConfiguration, searchKey) => {
    const inputConfiguration = returnSpecificConfiguration(
      inputsConfiguration,
      searchKey
    );
    const { minQty, maxQty } = inputConfiguration.inputConfig;
    return { minQty, maxQty };
  };

  /* Function to return a specific object according to its Search Key */
  const returnConfigurationOptionIndex = (array, key) => {
    const index = array.findIndex((item) => {
      return item._searchKey === key;
    });
    return index;
  };

  /* Function to handle changes of input statuses */
  const handleInputChanges = (dataFromChildren) => {
    let quantity = parseInt(dataFromChildren.targetValue);
    if (Number.isNaN(quantity) || quantity < 0) {
      quantity = 0;
    }
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
      // TODO VALIDATE ROWS - COLUMNS - MINES
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
        <div key={Math.random()}>
          <Input
            data={inp}
            handleChange={(dataFromChildren) =>
              handleInputChanges(dataFromChildren)
            }
            key={inp._searchKey}
          />
          <Message messageData={inp.message} />
        </div>
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
