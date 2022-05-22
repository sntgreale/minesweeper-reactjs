import React, { useState } from 'react';
import * as PropType from 'prop-types';
import './Box.scss';

/**
 * Array with the necessary information for the box.
 * @param {Array} data
 */

const Box = ({ data, handleClickLeftOnBox, handleClickRightOnBox }) => {
  const { value, state, color } = data;
  const { isHidden } = state;

  const [isDisabled, setIsDisabled] = useState(!isHidden);

  const handleClickLeft = () => {
    if (!isDisabled) {
      handleClickLeftOnBox(data);
    }
  };

  const handleClickRight = (e) => {
    e.preventDefault();
    if (!isDisabled) {
      handleClickRightOnBox(data);
    }
  };

  const createClassName = () => {
    return `box-surface box-surface-color-${color}`;
  };

  return (
    <button
      className='box-container'
      onClick={() => handleClickLeft()}
      onContextMenu={(e) => {
        handleClickRight(e);
      }}
      disabled={isDisabled}
    >
      <div className={createClassName()} hidden={isHidden}>
        <b className='box-label'>{value}</b>
      </div>
    </button>
  );
};

Box.defaultProps = {
  data: {},
  handleClickLeftOnBox: () => {},
  handleClickRightOnBox: () => {},
};

Box.propTypes = {
  data: PropType.object,
  handleClickLeftOnBox: PropType.func,
  handleClickRightOnBox: PropType.func,
};

export default Box;
