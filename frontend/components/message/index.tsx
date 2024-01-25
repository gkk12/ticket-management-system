import React, { useEffect, useState } from 'react';
import { Tooltip, Link } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import { Message as MessageType } from '../../types/Message';
import { invokeAPI } from '../../utils/invokeAPIUtils';

interface MessageProps {
  contextMessageId?: string | null;
  setError: (error: string | null) => void;
}

const MessageComponent: React.FC<MessageProps> = ({ contextMessageId, setError }) => {
  
  const [message, setMessage] = useState({} as MessageType);

  const messageRowStyle = { paddingBottom: '10px', marginBottom: '10px' };

  useEffect(() => {
    invokeAPI(`http://localhost:5001/message/${contextMessageId}`).then(data => setMessage(data)).catch(error => setError(error));
  },[])
  
  return (
    <div
      style={{
        margin: "1rem",
        padding: "1rem",
        backgroundColor: "#1c1c1f",
        borderRadius: "3px",
        border: "2px solid #282640",
      }}
    >
        <div>
          <div style={messageRowStyle}>
            <strong>Message:</strong> {message?.content}
          </div>
          <div style={messageRowStyle}>
            <strong>Author:</strong> {message?.author?.name}
          </div>
          <div>
            <Tooltip title={"Navigate to Discord"}>
              <Link href={message?.msg_url} target="_blank" rel="noopener noreferrer">
                <strong>Discord URL</strong><LaunchIcon style={{ fontSize:"medium", verticalAlign: 'middle', marginLeft: '5px' }} />
              </Link>
            </Tooltip>
          </div>
        </div>
    </div>
  );
};

export default MessageComponent;
