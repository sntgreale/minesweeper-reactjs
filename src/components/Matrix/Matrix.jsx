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
              <div className="matrix-rows">{row}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Matrix;
