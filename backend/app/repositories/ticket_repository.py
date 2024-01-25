import json
from typing import Optional

class TicketRepository:
    def __init__(self, filepath: str):
        with open(filepath) as json_file:
            self.data = json.load(json_file)

    def get_tickets(self, limit: Optional[int] = None) -> list[dict]:
        if limit is None:
            return self.data["tickets"]
        else:
            return self.data["tickets"][:limit]

    def get_messages(self, limit: Optional[int] = None) -> list[dict]:
        if limit is None:
            return self.data["messages"]
        else:
            return self.data["messages"][:limit]

    def get_message_by_id(self, messageId):
        all_messages = self.data["messages"]
        filtered_messages = list(filter(lambda message: message['id'] == messageId, all_messages))

        if filtered_messages:
            return filtered_messages[0]
        else:
            return None  

    
    def delete_ticket_by_id(self, ticketId):
        all_tickets = self.data["tickets"]
        ticket_to_be_deleted = list(filter(lambda ticket: ticket['id'] == ticketId, all_tickets))
        if ticket_to_be_deleted:
            all_tickets.remove(ticket_to_be_deleted[0])
            return ticket_to_be_deleted[0]
        else:
            return None  