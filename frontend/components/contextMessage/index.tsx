import React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MessageIcon from '@mui/icons-material/Message';
import MessageComponent from '../message';

interface ContextMessageProps {
    contextMessage: string;
    setError: (error: string | null) => void;
}

const ContextMessage: React.FC<ContextMessageProps> = ({ contextMessage, setError }) => {
    
    const [isVisible, setIsVisible] = React.useState(false as boolean);
    const [hoveredMessage, setHoveredMessage] = React.useState(null as string);

    // Check if the message associated with the ticket is expanded
    const expandMessage = () => {
        setIsVisible(!isVisible);
    }
    
    const iconStyle = { marginRight: '8px' };
    
    return <li style={{ listStyleType: 'none' }} >
    <div
      onMouseEnter={() => setHoveredMessage(contextMessage)}
      onMouseLeave={() => setHoveredMessage(null)}
      style={{
        cursor: 'pointer',
        width: '10%',
        color: hoveredMessage === contextMessage ? '#999' : 'white',
        display: 'flex',
        alignItems: 'center',
        marginTop: '8px',
      }}
      onClick={() => expandMessage()}
    >
      {isVisible ? (
        <ExpandMoreIcon style={iconStyle} />
      ) : (
        <ChevronRightIcon style={iconStyle} />
      )}
      <MessageIcon style={iconStyle} />
      {contextMessage}
    </div>
    {isVisible ? <MessageComponent contextMessageId={contextMessage} setError={setError} /> : ""}
  </li>
};

export default ContextMessage;