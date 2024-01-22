import React from 'react';
import { Tooltip, Link } from '@mui/material';
import { Message as MessageType } from '../../types/Message';
import LaunchIcon from '@mui/icons-material/Launch';
import { Ticket } from '../../types/Ticket';

interface MessageProps {
  messages: MessageType[];
  ticket: Ticket;
  contextMessage?: string | null;
}

const MessageComponent: React.FC<MessageProps> = ({ messages, ticket, contextMessage }) => {

  // Determine the target message ID based on whether a context message is provided
  const targetMessageId = contextMessage ? contextMessage : ticket.msg_id;

  // Style for each message row
  const messageRowStyle = { paddingBottom: '10px', marginBottom: '10px' };

  // Find the target message based on the target message ID
  const findMessage = () : MessageType => {
    return messages.find(message => message.id === targetMessageId);
  }

  return (
    <div style={{
      margin: "1rem",
      padding: "1rem",
      backgroundColor: "#1c1c1f",
      borderRadius: "3px",
      border: "2px solid #282640",
    }}>
      <div style={messageRowStyle}>
        <strong>Message:</strong> {findMessage()?.content}
      </div>
      <div style={messageRowStyle}>
        <strong>Author:</strong> {findMessage()?.author.name}
      </div>
      <div>
        <Tooltip title={"Navigate to Discord"}>
          <Link href={findMessage()?.msg_url} target="_blank" rel="noopener noreferrer">
            <strong>Discord URL</strong><LaunchIcon style={{ fontSize:"medium", verticalAlign: 'middle', marginLeft: '5px' }} />
          </Link>
        </Tooltip>
      </div>
    </div>
  );
};

export default MessageComponent;