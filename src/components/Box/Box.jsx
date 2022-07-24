import React, { useState } from 'react';
import * as PropType from 'prop-types';
import './Box.scss';

/**
 * Array with the necessary information for the box.
 * @param {Array} data
 */

const Box = ({ data, handleClickLeftOnBox, handleClickRightOnBox }) => {
  const { originalData, logicalData } = data;

  const [isDisabled] = useState(!logicalData.isHidden);

  const handleClickLeft = () => {
    if (logicalData.isHidden === true) {
      handleClickLeftOnBox(data);
    }
  };

  const handleClickRight = (e) => {
    e.preventDefault();
    if (logicalData.isHidden === true) {
      handleClickRightOnBox(data);
    }
  };

  const getValue = () => {
    const value = logicalData.value;
    return value;
  };

  const createClassNameForBoxContainer = () => {
    const color = !logicalData.isHidden
      ? originalData.color
      : logicalData.color;
    return `box-container box-container-color-${color}`;
  };

  const createClassNameForBox = () => {
    const color = !logicalData.isHidden
      ? originalData.color
      : logicalData.color;
    return `box-surface box-surface-color-${color}`;
  };

  return (
    <button
      className={createClassNameForBoxContainer()}
      onClick={() => handleClickLeft()}
      onContextMenu={(e) => {
        handleClickRight(e);
      }}
      disabled={isDisabled}
    >
      <div className={createClassNameForBox()}>
        <b className='box-label'>{getValue()}</b>
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
