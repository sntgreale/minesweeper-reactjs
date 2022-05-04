import { useState } from 'react';
import './Box.scss';

/**
 * Array with the necessary information for the box.
 * @param {Array} data
 */

const Box = ({ data }) => {
  const { value, isHidden, color, position } = data;

  const [isVisible, setIsVisible] = useState(!isHidden);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleClickLeft = () => {
    // TODO Logic for left click
  };

  const handleClickRight = (e) => {
    // necessary to not display the popup
    e.preventDefault();
    // TODO Logic for right click
  };

  const createClassName = () => {
    return `box-surface box-surface-color-${color}`;
  };

  return (
    <button
      className='box-container'
      onClick={() => handleClickLeft()}
      onContextMenu={(e) => handleClickRight(e)}
      disabled={isDisabled}
    >
      <div className={createClassName()} hidden={isVisible}>
        <b className='box-label'>{value}</b>
      </div>
    </button>
  );
};

export default Box;
