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
  const [rowsQuantity, setRowsQuantity] = useState(2);
  const [colsQuantity, setColsQuantity] = useState(2);
  const [minesQuantity, setMinesQuantity] = useState(3);

  /* useEffect used to determine the maximum number of possible mines to be entered by the user. */
  /* Mines MAX = rows*columns-1 */
  useEffect(() => {
    const rows = returnInputOption('Rows');
    const columns = returnInputOption('Columns');
    const mines = returnInputOption('Mines');
    mines.inputConfig.maxQty = rowsQuantity * colsQuantity - 1;
    setInputOptions([rows, columns, mines]);
  }, [rowsQuantity, colsQuantity, minesQuantity]);

  /* Function to return a specific object according to its Label */
  const returnInputOption = (label) => {
    const option = inputsOptions.find((opt) => {
      return opt.label === label;
    });
    return option;
  };

  /* Function to handle changes of input statuses */
  const handleInputChanges = (dataFromChildren) => {
    console.log(dataFromChildren);
    if (dataFromChildren.label === 'Rows') {
      setRowsQuantity(parseInt(dataFromChildren.value));
    }

    if (dataFromChildren.label === 'Columns') {
      setColsQuantity(parseInt(dataFromChildren.value));
    }

    if (dataFromChildren.label === 'Mines') {
      setMinesQuantity(parseInt(dataFromChildren.value));
    }
  };

  /* Function to manage the button actions. */
  const handleButtonPresed = () => {};

  const renderInputs = () => {
    return inputsOptions.map((inp) => {
      return (
        <Input
          label={inp.label}
          defaultValue={inp.defaultValue}
          inputConfig={inp.inputConfig}
          handleChange={(dataFromChildren) =>
            handleInputChanges(dataFromChildren)
          }
          key={inp.label}
        />
      );
    });
  };

  const renderButtons = () => {
    return buttonsList.map((btn) => {
      return (
        <Button
          label={btn.label}
          disabled={btn.disabled}
          className={btn.className}
          handleChange={handleButtonPresed}
          key={btn.label}
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
