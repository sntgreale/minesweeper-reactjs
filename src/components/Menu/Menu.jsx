import React, { useState } from 'react';
import Card from '../Card/Card';
import CustomMenu from '../CustomMenu/CustomMenu';
import Matrix from '../Matrix/Matrix';
import createMatrix from '../../functions/createMatrix';
import menuEntries from './Menu.config.json';
import './Menu.scss';

const Menu = () => {
  const [started, setStarted] = useState(false);
  const [useCustom, setUseCustom] = useState(false);
  const [propertiesQuantity, setPropQty] = useState({});

  const handleConfigurationCustom = (dataFromCustomMenu) => {
    const { action } = dataFromCustomMenu;
    if (action) {
      if (action === 'PLAYGAME') {
        const {
          data: { rowsQuantity, columnsQuantity, minesQuantity },
        } = dataFromCustomMenu;
        setPropQty({ rowsQuantity, columnsQuantity, minesQuantity });
        setStarted(true);
      } else {
        setStarted(false);
        setUseCustom(false);
      }
    }
    /**
     * TODO When we receive the information from the custom input:
     * 1.- Validate it
     * 2.- Create the Matrix.
     */
  };

  const handleEntrieSelected = (dataFromChildren) => {
    const { rows, columns, mines, isCustom } = dataFromChildren;
    if (isCustom) {
      setUseCustom(true);
    } else {
      const { quantity: rowsQuantity } = rows;
      const { quantity: columnsQuantity } = columns;
      const { quantity: minesQuantity } = mines;
      if (!rowsQuantity || !columnsQuantity || !minesQuantity) {
        return; // TODO Error message for missing values.
      } else {
        setPropQty({ rowsQuantity, columnsQuantity, minesQuantity });
        setStarted(true);
      }
    }
  };

  const genericMenu = () => {
    return (
      <div className='menu-generic-configuration'>
        {menuEntries.map((c) => {
          return (
            <Card
              configuration={c}
              key={c.title}
              handleSelection={(entrieSelected) => {
                handleEntrieSelected(entrieSelected);
              }}
            />
          );
        })}
      </div>
    );
  };

  const customEntrance = () => {
    return (
      <div className='menu-configurable-configuration'>
        <CustomMenu
          handleEntrance={(configurationEntered) => {
            handleConfigurationCustom(configurationEntered);
          }}
        />
      </div>
    );
  };

  const menu = () => {
    return (
      <div className='menu' onContextMenu={(e) => e.preventDefault()}>
        <div className='menu-container'>
          {started
            ? mainMatrix()
            : useCustom
            ? customEntrance()
            : genericMenu()}
        </div>
      </div>
    );
  };

  const mainMatrix = () => {
    const data = createMatrix(propertiesQuantity);
    return <Matrix data={data} />;
  };

  return menu();
};

export default Menu;
