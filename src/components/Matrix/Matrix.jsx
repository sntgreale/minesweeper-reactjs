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
          <div className='matrix-rows'>
            {row.map((col) => (
              <div className='matrix-columns'>
                <Box data={col} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Matrix;
