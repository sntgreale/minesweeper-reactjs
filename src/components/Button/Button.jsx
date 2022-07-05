import React from 'react';
import * as PropType from 'prop-types';
import './Button.scss';

/**
 * Boolean with logic over visibility.
 * @param {Boolean} disabled
 * Text to display inside the button.
 * @param {String} label
 * Event handler function.
 * @param {Function} handleChange
 * String with the name of the class (extra to the default one).
 * @param {String} className
 */

const Button = ({ handleChange, data }) => {
  const { _searchKey, label, disabled, className } = data;
  const handlerButtonPressed = () => {
    handleChange({ _searchKey });
  };

  const createClassName = () => {
    return `button-clickable ${className}`;
  };

  return (
    <div className='button'>
      <div className='button-container'>
        <button
          disabled={disabled}
          className={createClassName()}
          onClick={() => handlerButtonPressed()}
        >
          <b>{label}</b>
        </button>
      </div>
    </div>
  );
};

Button.defaultProps = {
  className: '',
  handleChange: () => {},
  data: {},
};

Button.propTypes = {
  className: PropType.string,
  handleChange: PropType.func,
  data: PropType.object,
};

export default Button;
