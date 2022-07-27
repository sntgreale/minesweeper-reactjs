import React, { useState } from 'react';
import * as PropType from 'prop-types';
import Box from '../Box/Box';
import handleBoxAction from '../../functions/handleBoxActions';
import './Matrix.scss';

/**
 * Array with the generated matrix data.
 * @param {Array} data
 */

const Matrix = ({ data }) => {
  const LEFT = 'LEFT';
  const RIGHT = 'RIGHT';
  const [newData, setNewData] = useState(data);

  const handleClickLeftOnBox = (dataFromChildren) => {
    const newMatrix = handleBoxAction(newData, dataFromChildren, LEFT);
    setNewData(newMatrix);
  };

  const handleClickRightOnBox = (dataFromChildren) => {
    const newMatrix = handleBoxAction(newData, dataFromChildren, RIGHT);
    setNewData(newMatrix);
  };

  return (
    <div
      className='matrix'
      onContextMenu={(e) => {
        e.preventDefault();
      }}
    >
      <div className='matrix-container'>
        {newData.map((row) => (
          <>
            <div className='matrix-rows' key={row[0].position.row}>
              {row.map((col) => (
                <div className='matrix-columns' key={col.position.column}>
                  <Box
                    data={col}
                    handleClickLeftOnBox={(boxInfo) => {
                      handleClickLeftOnBox(boxInfo);
                    }}
                    handleClickRightOnBox={(boxInfo) => {
                      handleClickRightOnBox(boxInfo);
                    }}
                  />
                </div>
              ))}
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

Matrix.defaultProps = {
  data: [],
};

Matrix.propTypes = {
  data: PropType.array,
};

export default Matrix;
