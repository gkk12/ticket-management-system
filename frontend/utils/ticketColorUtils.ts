import { TicketStatus } from "../types/TicketStatus";

export const determineTicketStatusColor = (status: string): {bgColor: string, borderColor: string} => {     // determine the color of the ticket status
    const enumStatus: TicketStatus = TicketStatus[status.toUpperCase() as keyof typeof TicketStatus];
    switch (enumStatus) {
      case TicketStatus.OPEN:
        return {bgColor: "#282640", borderColor: "#A39EE1"};
      case TicketStatus.CLOSED:
        return {bgColor: "#29442C", borderColor: "#9EE1A7"};
      case TicketStatus.IN_PROGRESS:
        return {bgColor: "#443629", borderColor: "#E1B89E"};
      default:
        return {bgColor: "#282640", borderColor: "#A39EE1"};
    }
};
