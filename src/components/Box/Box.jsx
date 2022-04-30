import { useState } from 'react';
import './Box.scss';

const Box = ({ data }) => {
  const { value, isHidden, color } = data;

  const [isVisible, setIsVisible] = useState(!isHidden);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleClick = (event) => {
    setIsVisible(!isVisible);
    setIsDisabled(!isDisabled);
  };

  const createClassName = () => {
    return `box-surface box-surface-color-${color}`;
  };

  return (
    <button
      className='box-container'
      onClick={(evt) => handleClick(evt)}
      disabled={isDisabled}
    >
      <div className={createClassName()} hidden={isVisible}>
        <b className='box-label'>{value}</b>
      </div>
    </button>
  );
};

export default Box;
