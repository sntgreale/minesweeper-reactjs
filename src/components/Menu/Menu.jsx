import React, { useState } from 'react';
import Card from '../Card/Card';
import CustomMenu from '../CustomMenu/CustomMenu';
import Matrix from '../Matrix/Matrix';
import createMatrix from '../../functions/createMatrix';
import configurations from './Menu.configuration.json';
import './Menu.scss';

const Menu = () => {
  const [started, setStarted] = useState(false);
  const [useCustom, setUseCustom] = useState(false);

  const handleConfigurationCustom = (configurationEntered) => {};

  const handleConfigurationSelected = (dataFromChildren) => {
    const { rows, columns, mines, isCustom } = dataFromChildren;
    if (isCustom) {
      setUseCustom(true);
    } else {
      const { quantity: rowsQuantity } = rows;
      const { quantity: columnsQuantity } = columns;
      const { quantity: minesQuantity } = mines;
      if (!rowsQuantity || !columnsQuantity || !minesQuantity) {
        return; // TODO Error message for missing values.
      }
    }
  };

  const genericMenu = () => {
    return (
      <div className='menu-generic-configuration'>
        {configurations.map((c) => {
          return (
            <Card
              configuration={c}
              key={c.title}
              handleSelection={(configurationSelected) => {
                handleConfigurationSelected(configurationSelected);
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
          {useCustom ? customEntrance() : genericMenu()}
        </div>
      </div>
    );
  };

  const mainMatrix = () => {
    const data = createMatrix();
    return <Matrix data={data} />;
  };

  return menu();
};

export default Menu;
