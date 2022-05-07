import React from 'react';
import * as PropType from 'prop-types';
import Box from '../Box/Box';
import './Matrix.scss';

/**
 * Array with the generated matrix data.
 * @param {Array} data
 */

const Matrix = ({ data }) => {
  return (
    <div
      className='matrix'
      onContextMenu={(e) => {
        e.preventDefault();
      }}
    >
      <div className='matrix-container'>
        {data.map((row) => (
          <div className='matrix-rows' key={row.position.row}>
            {row.map((col) => (
              <div className='matrix-columns' key={col.position.column}>
                <Box data={col} />
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
