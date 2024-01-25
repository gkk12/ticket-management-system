import * as React from "react";
import { NextPage } from "next";
import { Button, CircularProgress, Tooltip } from "@mui/material";
import { useRouter } from "next/router";
import { Ticket as TicketType } from "../../types/Ticket";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import Ticket from "../../components/ticket";
import { invokeAPI } from "../../utils/invokeAPIUtils";

const Tickets: NextPage = () => {
  const router = useRouter();
  const [tickets, setTickets] = React.useState([] as TicketType[]);
  const [loading, setLoading] = React.useState(true as boolean);
  const [height, setHeight] = React.useState(350);
  const [error, setError] = React.useState("" as string);

  const divHeight = React.useRef<any>(null);

  React.useEffect(() => {
    // Fetch the ticket data from the server on rendering page
    invokeAPI("http://localhost:5001/tickets").then(data => {setTickets(data);
    setLoading(false);}).catch(error => setError(error));
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
                  setError={setError}
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