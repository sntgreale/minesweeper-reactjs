import React, { useState } from 'react';
import * as PropType from 'prop-types';
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
  const [value, setValue] = useState(defaultValue);

  const handlerChangeValue = (e) => {
    const value = e.target.value;
    setValue(value);
    handleChange({ value, label, defaultValue, inputConfig });
  };

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
            value={value}
            onChange={(e) => handlerChangeValue(e)}
          />
        </div>
      </div>
    </div>
  );
};

Input.defaultProps = {
  label: '',
  defaultValue: 0,
  inputConfig: {},
  handleChange: () => {},
};

Input.propTypes = {
  label: PropType.string,
  defaultValue: PropType.number,
  inputConfig: PropType.object,
  handleChange: PropType.func,
};

export default Input;
