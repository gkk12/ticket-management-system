import React, { useState } from 'react';
import { Button, Card, CardContent, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { formatDate } from '../../utils/dateUtils';
import { determineTicketStatusColor } from '../../utils/ticketColorUtils';
import { Ticket as TicketType } from "../../types/Ticket"
import ContextMessages from '../contextMessages/index';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityOnIcon from '@mui/icons-material/Visibility';
import { TicketStatus } from '../../types/TicketStatus';
import ContextMessage from '../contextMessage';

interface TicketProps {
  ticket: TicketType;
  deleteTicket: (ticketId: string) => void;
  setError: (error: string | null) => void;
}

const Ticket: React.FC<TicketProps> = ({
  ticket,
  deleteTicket,
  setError
}) => {

  const [contextMessagesVisible, setContextMessagesVisible] = useState(false as boolean);

    // Styles for the ticket layout
    const ticketStyle = { display: 'flex', marginBottom: '10px' };
    const rowHeaderStyle = { flex: 1, fontWeight: 'bold' };
    const rowBodyStyle = { flex: 2 };
    const iconStyle = { marginRight: '8px' };

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
                <div style={rowBodyStyle}>
                  <div>
                    <ContextMessage contextMessage={ticket.msg_id} setError={setError} />
                  </div>
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
                  <Tooltip title={contextMessagesVisible? "Hide context messages": "Show context messages"}>
                    <div
                      style={{ cursor: 'pointer',
                      width: '10%',
                      display: 'flex',
                      alignItems: 'center',
                      marginTop: '8px'
                    }}
                      onClick={() => setContextMessagesVisible(!contextMessagesVisible)}>
                      <span style={{ marginRight: '8px' }}>  
                      {contextMessagesVisible ? "Hide" : "Show"}
                      </span>
                      {contextMessagesVisible ? <VisibilityOffIcon style={iconStyle} /> : <VisibilityOnIcon style={iconStyle} />}
                    </div>
                  </Tooltip>  
                  {contextMessagesVisible && (<ContextMessages contextMessages={ticket.context_messages} setError={setError} />)}
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