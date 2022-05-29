import React, { useState } from 'react';
import * as PropType from 'prop-types';
import Box from '../Box/Box';
// import handleBoxAction from '../../functions/handleBoxActions';
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
    // TODO: Logic for Left click
    // Call function to check if Box is not already showed.
    //* If isDisabled = true, this is not necessary.
    //* Because the value corresponding to the box is being displayed
    //* but the button is disabled to trigger any function.
    // Call the function to check state of Box AFTER unhide their value.
    //* If it is a mine, it is necessary to proceed differently than if it were any other number.
    // Call the function to unhide the Box value.
    //* Update isHidden state.
    // Call the function to update state.
    console.log(`Left click on Matrix ${LEFT}`);
  };

  const handleClickRightOnBox = (dataFromChildren) => {
    // TODO Logic for Right click
    /*
     * When the user right clicks,
     * it is necessary to update the state.userChoice ( nothing -> flag -> question ).
     * But do not show the number (or mine).
     */
    console.log(`Right click on Matrix ${RIGHT}`);
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
