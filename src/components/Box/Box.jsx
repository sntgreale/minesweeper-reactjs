import "./Box.scss";

const Box = ({data}) => {
  const { value, isHidden, color } = data;

  const createClassName = () => {
    return `box-surface box-surface-color-${color}`
  }

  return (
    <div className='box-container'>
      <div
        className={createClassName()}
        hidden={isHidden}
      >
        <b>
          {value}
        </b>
      </div>
    </div>
  );
};

export default Box;
