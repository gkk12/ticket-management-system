import React from 'react';
import { Button, Card, CardContent, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MessageIcon from '@mui/icons-material/Message';
import { formatDate } from '../../utils/dateUtils';
import { determineTicketStatusColor } from '../../utils/ticketColorUtils';
import { Message as MessageType } from '../../types/Message';
import { Ticket as TicketType } from "../../types/Ticket"
import ContextMessages from '../contextMessages/index';
import Message from '../message';
import { TicketStatus } from '../../types/TicketStatus';
import MessageComponent from '../message';

interface TicketProps {
  ticket: TicketType;
  deleteTicket: (ticketId: string) => void;
  expandMessage: (context_message: string) => void;
  displayContextMessages: (ticket: TicketType) => void;
  showTicketMessage: (context_message: string) => void;
  expandedMessages: MessageType[];
  expandedTickets: string[];
  expandedTicketMessages: MessageType[];
  hoveredMessage: string | null;
  setHoveredMessage: (message: string | null) => void;
}

const Ticket: React.FC<TicketProps> = ({
  ticket,
  deleteTicket,
  expandMessage,
  displayContextMessages,
  showTicketMessage,
  expandedMessages,
  expandedTickets,
  expandedTicketMessages,
  hoveredMessage,
  setHoveredMessage
}) => {

    // Styles for the ticket layout
    const ticketStyle = { display: 'flex', marginBottom: '10px' };
    const rowHeaderStyle = { flex: 1, fontWeight: 'bold' };
    const rowBodyStyle = { flex: 2 };
    const iconStyle = { marginRight: '8px' };

    // Check if the message associated with the ticket is expanded
    const isMessageExpanded = () : boolean => {
        return expandedTicketMessages.some((message: MessageType) => message.id === ticket.msg_id);
    }

  return (
    <li style={{ marginBottom: '10px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem' }}>
        <Card
          variant="outlined"
          sx={{
            position: 'relative',
            backgroundColor: '#1c1c1f',
            borderRadius: '3px',
            border: '2px solid #282640',
            width: '100%',
            minHeight: '7rem',
            fontSize: '1rem',
            overflow: 'hidden',
          }}
        >
          <CardContent
            sx={{
              position: 'relative',
            }}
          >
            <div>
              <div style={ticketStyle}>
                <div style={rowHeaderStyle}>Id</div>
                <div style={rowBodyStyle}>{ticket.id} <span style={{ color: "gray" }}>({ticket.context_messages.length} context messages)</span></div>
              </div>
              <div style={ticketStyle}>
                <div style={rowHeaderStyle}>Created at</div>
                <div style={rowBodyStyle}>{formatDate(ticket.timestamp)}</div>
              </div>
              <div style={ticketStyle}>
                <div style={rowHeaderStyle}>Message id</div>
                <div style={{ display: 'flex', alignItems: 'center', marginLeft: '8px', flex: 2 }}>
                    <Tooltip title={isMessageExpanded()? "Hide message":"Show message"}>
                    <div onClick={() => showTicketMessage(ticket.msg_id)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                    {isMessageExpanded() ? <ExpandMoreIcon style={iconStyle} /> : <ChevronRightIcon style={iconStyle} />}
                    <MessageIcon style={iconStyle} />
                    {ticket.msg_id}
                    </div>
                    </Tooltip>
                </div>      
              </div>
              <div style={ticketStyle}>
                <div style={rowHeaderStyle}></div>
                <div style={rowBodyStyle}>{isMessageExpanded() ?
                  <MessageComponent messages={expandedTicketMessages} ticket={ticket} /> : ""}
                </div>
              </div>
              <div style={ticketStyle}>
                <div style={rowHeaderStyle}>Status</div>
                <div style={rowBodyStyle}>
                  <div style={{
                    backgroundColor: `${determineTicketStatusColor(ticket.status).bgColor}`,
                    borderRadius: "20px",
                    border: "1px solid" + `${determineTicketStatusColor(ticket.status).borderColor}`,
                    width: "fit-content",
                    fontSize: "small",
                    textAlign: "center",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                    paddingTop: "5px",
                    paddingBottom: "5px"
                  }}>
                    {TicketStatus[ticket.status.toUpperCase()]}
                  </div>
                </div>
              </div>
              <div style={ticketStyle}>
                <div style={rowHeaderStyle}>Context Messages</div>
                <div style={rowBodyStyle}>
                  <ContextMessages setHoveredMessage={setHoveredMessage} ticket={ticket}
                    expandMessage={expandMessage}
                    displayContextMessages={displayContextMessages}
                    expandedMessages={expandedMessages}
                    expandedTickets={expandedTickets}
                    hoveredMessage={hoveredMessage} />
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <Tooltip title="Delete ticket">
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => deleteTicket(ticket.id)}
                  sx={{
                    position: 'absolute',
                    bottom: '1rem',
                    right: '1rem',
                    zIndex: 2,
                    backgroundColor: '#1c1c1f',
                  }}
                >
                  Delete Ticket
                </Button>
              </Tooltip>
            </div>
          </CardContent>
        </Card>
      </div>
    </li>
  );
};

export default Ticket;