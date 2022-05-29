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

const Button = ({ label, disabled, className, handleChange }) => {
  const createClassName = () => {
    return `button-clickable ${className}`;
  };

  return (
    <div className='button'>
      <div className='button-container'>
        <button
          disabled={disabled}
          className={createClassName()}
          onClick={handleChange}
        >
          <b>{label}</b>
        </button>
      </div>
    </div>
  );
};

Button.defaultProps = {
  disabled: false,
  label: '',
  handleChange: () => {},
  className: '',
};

Button.propTypes = {
  disabled: PropType.bool,
  label: PropType.string,
  handleChange: PropType.func,
  className: PropType.string,
};

export default Button;
