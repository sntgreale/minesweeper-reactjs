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

const Button = ({ disabled = false, label, handleChange, className = '' }) => {
  const createClassName = (className) => {
    return `button-clickable ${className}`;
  };

  return (
    <div className='button'>
      <div className='button-container'>
        <button
          disabled={disabled}
          className={createClassName(className)}
          onClick={handleChange}
        >
          <b>{label}</b>
        </button>
      </div>
    </div>
  );
};

export default Button;
