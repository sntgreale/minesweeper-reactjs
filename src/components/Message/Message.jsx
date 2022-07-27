import React from 'react';
import * as PropType from 'prop-types';
import './Message.scss';

const Message = ({ messageData }) => {
  const { message, typeOfMessage } = messageData;

  const createClassNameForMessageText = () => {
    return `message message-type-${typeOfMessage}`;
  };

  return (
    <div className='message-container'>
      <span className={createClassNameForMessageText()}>{message}</span>
    </div>
  );
};

Message.defaultProps = {
  messageData: {
    message: '',
    typeOfMessage: '',
  },
};

Message.propTypes = {
  messageData: PropType.object,
};

export default Message;
