import Box from '../Box/Box'
import "./Matrix.scss";

/**
 *
 * @param {*} data
 */

const Matrix = ({ data }) => {
  return (
    <div className="matrix">
      <div className="matrix-container">
        {data.map((col) => (
          <div className="matrix-columns">
            {col.map((row) => (
              <div className="matrix-rows">
                <Box data={row}/>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Matrix;