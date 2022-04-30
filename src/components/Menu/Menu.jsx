import { useState } from 'react';
import Button from '../Button/Button';
import Input from '../Input/Input';
import Matrix from '../Matrix/Matrix';
import Separator from '../Separator/Separator';
import createMatrix from '../../functions/createMatrix';
import './Menu.scss';

const Menu = () => {
  const [rows, setRows] = useState(10);
  const [columns, setColumns] = useState(10);
  const [started, setStarted] = useState(false);

  const inputConfig = {
    type: 'number',
    minQty: 10,
    maxQty: 25,
  };

  const checkLimitValues = (valueBetween) => {
    return valueBetween >= 10 && valueBetween <= 50;
  };

  const handleChangeRows = (event) => {
    setRows(event.target.value);
  };

  const handleChangeColumns = (event) => {
    setColumns(event.target.value);
  };

  const handleStartGame = () => {
    if (checkLimitValues(rows) && checkLimitValues(columns)) {
      setStarted(!started);
    }
  };

  const mainMenu = () => {
    return (
      <div className='menu'>
        <div className='menu-container'>
          <div className='menu-configuration'>
            <Input
              label={'Rows'}
              defaultValue={rows}
              inputConfig={inputConfig}
              handleChange={handleChangeRows}
            />
            <Input
              label={'Columns'}
              defaultValue={columns}
              inputConfig={inputConfig}
              handleChange={handleChangeColumns}
            />
          </div>
          <Separator />
          <div className='menu-options'>
            <Button label={'START!'} handleChange={handleStartGame} />
          </div>
        </div>
      </div>
    );
  };

  const mainMatrix = () => {
    const data = createMatrix({ rows, columns });
    return (
      <Matrix data={data} />
    )
  }

  return (
    <div>
      {started ? mainMatrix() : mainMenu()}
    </div>
  );
};

export default Menu;
