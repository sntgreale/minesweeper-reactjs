import './Input.scss';

/**
 * Text to display inside the button.
 * @param {String} label
 * Number with the default value of the input.
 * @param {Number} dafultValue
 * Object with the configuration value of the input.
 * @param {Object} inputConfig
 * Event handler function.
 * @param {Function} handleChange
 */

const Input = ({ label, defaultValue, inputConfig, handleChange }) => {
  return (
    <div className='input'>
      <div className='input-container'>
        <div className='input-label'>
          <span>{label}</span>
        </div>
        <div className='input-entry'>
          <input
            className='input-entry-area'
            type={inputConfig.type}
            min={inputConfig.minQty}
            max={inputConfig.maxQty}
            defaultValue={defaultValue}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Input;
