import React from 'react';
import { Tooltip } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MessageIcon from '@mui/icons-material/Message';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityOnIcon from '@mui/icons-material/Visibility';
import { Message as MessageType } from '../../types/Message';
import { Ticket as TicketType } from "../../types/Ticket"
import Message from '../message';
import MessageComponent from '../message';

interface ContextMessagesProps {
  ticket: TicketType;
  expandMessage: (context_message: string) => void;
  displayContextMessages: (ticket: TicketType) => void;
  expandedMessages: MessageType[];
  expandedTickets: string[];
  hoveredMessage: string | null;
  setHoveredMessage: (message: string | null) => void;
}

const ContextMessages: React.FC<ContextMessagesProps> = ({
  ticket,
  expandMessage,
  displayContextMessages,
  expandedMessages,
  expandedTickets,
  hoveredMessage,
  setHoveredMessage
}) => {

    const iconStyle = { marginRight: '8px' };

    // Check if the ticket is expanded
    const isTicketExpanded = (): boolean => {
        return expandedTickets.includes(ticket.id);
    }

    // Check if a context message is expanded
    const isContextMessageExpanded = (context_message) : boolean => {
        return expandedMessages.some((message: MessageType) => message.id === context_message);
    }

  return (
    <div>
      <Tooltip title={isTicketExpanded() ? 'Hide messages' : 'Show messages'}>
        <span
          style={{ width: '10%', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          onClick={() => displayContextMessages(ticket)}
        >
          {isTicketExpanded() ? (
            <>
              <span style={iconStyle}>Hide</span>
              <VisibilityOffIcon />
            </>
          ) : (
            <>
              <span style={iconStyle}>Show</span>
              <VisibilityOnIcon />
            </>
          )}
        </span>
      </Tooltip>
      {isTicketExpanded() && (
        <div>
          <ol>
            {ticket.context_messages.map((context_message: string, index: number) => (
              <li style={{ listStyleType: 'none', margin: '1rem' }} key={index}>
                <div
                  onMouseEnter={() => setHoveredMessage(context_message)}
                  onMouseLeave={() => setHoveredMessage(null)}
                  style={{
                    cursor: 'pointer',
                    width: '10%',
                    color: hoveredMessage === context_message ? '#999' : 'white',
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: '8px',
                  }}
                  onClick={() => expandMessage(context_message)}
                >
                  {isContextMessageExpanded(context_message) ? (
                    <ExpandMoreIcon style={iconStyle} />
                  ) : (
                    <ChevronRightIcon style={iconStyle} />
                  )}
                  <MessageIcon style={iconStyle} />
                  {context_message}
                </div>
                {isContextMessageExpanded(context_message) && (
                  <MessageComponent messages={expandedMessages} ticket={ticket} contextMessage={context_message} />
                )}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default ContextMessages;