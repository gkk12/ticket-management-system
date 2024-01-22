import * as React from "react";
import { NextPage } from "next";
import { Button, CircularProgress, Tooltip } from "@mui/material";
import { useRouter } from "next/router";
import { Ticket as TicketType } from "../../types/Ticket";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { Message as MessageType } from "../../types/Message";
import Ticket from "../../components/ticket";

const Tickets: NextPage = () => {
  const router = useRouter();
  const [tickets, setTickets] = React.useState([] as TicketType[]);
  const [loading, setLoading] = React.useState(true as boolean);
  const [hoveredMessage, setHoveredMessage] = React.useState(null as string);
  const [expandedMessages, setExpandedMessages] = React.useState([] as MessageType[]);
  const [expandedTickets, setExpandedTickets] = React.useState([] as string[]);
  const [expandedTicketMessages, setExpandedTicketMessages] = React.useState([] as MessageType[]);
  const [height, setHeight] = React.useState(350);
  const [error, setError] = React.useState("" as string);

  const divHeight = React.useRef<any>(null);

  React.useEffect(() => {
    // Fetch the ticket data from the server on rendering page
    fetch("http://localhost:5001/tickets")
      .then(response => response.json())
      .then(data => {
        setTickets(data);
        setLoading(false);
      })
      .catch(err => setError(err));
  }, []);

  React.useEffect(() => {
    // adjusts height of the tickets dashboard
    if (divHeight.current) {
      setHeight(divHeight.current.offsetHeight);
    }

    const handleResize = () => {
      if (divHeight.current) {
        setHeight(divHeight.current.offsetHeight);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Function to handle API calls with error handling
  const invokeAPI = async (url: string, options?: RequestInit) => {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      setError(error);
    }
  };

  // deletes tickets and returns the ticket deleted
  const deleteTicket = async (ticketId: string) => {
    try {
      const data = await invokeAPI(`http://localhost:5001/ticket/${ticketId}`, {
        method: 'DELETE',
      });
  
      const currentTickets = tickets.filter(ticket => ticket.id !== data.deleted_ticket.id);
      setTickets(currentTickets);
    } catch (error) {
      setError(error);
    }
  };

  // Function to expand a message
  const expandMessage = async (context_message: string) => {
    // expand the message to display the message details
    try {
      const data = await invokeAPI(`http://localhost:5001/message/${context_message}`);
      const { id } = data;
  
      setExpandedMessages(prevMessages => {
        if (prevMessages.some(message => message.id === id)) {
          return prevMessages.filter(message => message.id !== id);
        } else {
          return [...prevMessages, data];
        }
      });
    } catch (error) {
      setError(error);
    }
  };

  // Function to expand/collapse context messages for a ticket
  const displayContextMessages = (ticket: TicketType) : void => {
    // expand the ticket to display all the context messages
    const ticketId = ticket.id;
    if (expandedTickets.includes(ticketId)) {
      setExpandedTickets((prevExpandedTickets) => prevExpandedTickets.filter(ticket => ticket !== ticketId));
    } else {
      setExpandedTickets((prevExpandedTickets) => [...prevExpandedTickets, ticketId]);
    }
  };

  // Function to show/hide details of a ticket message
  const showTicketMessage = async (context_message: string) => {
    try {
      const data = await invokeAPI(`http://localhost:5001/message/${context_message}`);
  
      setExpandedTicketMessages(prevExpandedTicketMessages => {
        if (prevExpandedTicketMessages.some(message => message.id === data.id)) {
          return prevExpandedTicketMessages.filter(message => message.id !== data.id);
        } else {
          return [...prevExpandedTicketMessages, data];
        }
      });
    } catch (error) {
      setError(error);
    }
  };

  return (
    <>
      <Tooltip title="Return to Home Page">
        <Button style={{ width: "fit-content" }} startIcon={<NavigateBeforeIcon />} onClick={() => router.back()}>Home</Button>
      </Tooltip>
      
      <h2 style={{ textAlign: "center" }}>{error ? error: "Tickets"}</h2>
      {!loading ? (
        <>
          <div style={{
            height: height,
            overflow: "auto",
            display: "flex",
            justifyContent: "center"
          }}
            ref={divHeight}>
            <ol style={{ width: "100%" }}>
              {tickets.map((ticket: TicketType, index: number) => (
                <Ticket
                  key={index}
                  ticket={ticket}
                  deleteTicket={deleteTicket}
                  expandMessage={expandMessage}
                  displayContextMessages={displayContextMessages}
                  showTicketMessage={showTicketMessage}
                  expandedMessages={expandedMessages}
                  expandedTickets={expandedTickets}
                  expandedTicketMessages={expandedTicketMessages}
                  hoveredMessage={hoveredMessage}
                  setHoveredMessage={setHoveredMessage}
                />
              ))}
            </ol>
          </div>
        </>
      ) : (
        <>
          <div style={{
            height: height,
            overflow: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
            ref={divHeight}>
            <CircularProgress
              size={100}
              thickness={5}
              sx={{ color: "#282640" }}
            />
          </div>
        </>
      )}
    </>
  );
};

export default Tickets;