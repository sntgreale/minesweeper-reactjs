import React from 'react';
import * as PropType from 'prop-types';
import './Card.scss';

const Card = ({ configuration, handleSelection }) => {
  const { title, rows, columns, mines } = configuration;

  return (
    <button
      className='card-container'
      onClick={() => handleSelection(configuration)}
    >
      <div className='card-title'>
        <span>{title}</span>
      </div>
      <div className='card-data-container'>
        <div className='card-data-size'>
          <div className='card-data-size-rows'>
            <div className='card-data-size-rows-quantity'>
              {rows.quantity ? rows.quantity : '?'}
            </div>
            <div className='card-data-size-rows-label'>{rows.label}</div>
          </div>
          <div className='card-data-size-columns'>
            <div className='card-data-size-columns-quantity'>
              {columns.quantity ? columns.quantity : '?'}
            </div>
            <div className='card-data-size-columns-label'>{columns.label}</div>
          </div>
          <span></span>
        </div>
        <div className='card-data-mines'>
          <div className='card-data-mines-quantity'>
            {mines.quantity ? mines.quantity : '?'}
          </div>
          <div className='card-data-mines-label'>{mines.label}</div>
        </div>
      </div>
    </button>
  );
};

Card.defaultProps = {
  configuration: {},
  handleSelection: () => {},
};

Card.propTypes = {
  configuration: PropType.object,
  handleSelection: PropType.func,
};

export default Card;
