from app.repositories.ticket_repository import TicketRepository
import uvicorn
from fastapi import Depends, FastAPI, Path, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import os


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

current_dir = os.path.dirname(os.path.abspath(__file__))

TICKET_FILEPATH = os.path.join(current_dir, "../data/awesome_tickets.json")

ticket_repository = TicketRepository(filepath=TICKET_FILEPATH)


@app.get("/healthz")
async def root():
    return "OK"

# Retrieve a list of tickets
@app.get("/tickets")
async def get_tickets(
    limit: int = 20,
    ticket_repository: TicketRepository = Depends(lambda: ticket_repository),
):
    tickets = ticket_repository.get_tickets()
    return JSONResponse(tickets, status_code=200)

# Retrieve a list of messages
@app.get("/messages")
async def get_messages(
    limit: int = 20,
    ticket_repository: TicketRepository = Depends(lambda: ticket_repository),
):
    messages = ticket_repository.get_messages()
    return JSONResponse(messages, status_code=200)

# Retrieve a specific message by its unique identifier
@app.get("/message/{message_id}")
async def get_message_by_id(
    message_id: str = Path(...),
    ticket_repository: TicketRepository = Depends(lambda: ticket_repository),
):
    message = ticket_repository.get_message_by_id(message_id)
    return JSONResponse(message, status_code=200)

# Delete a ticket by its unique identifier
@app.delete("/ticket/{ticket_id}")
async def delete_ticket_by_id(
    ticket_id: str,
    ticket_repository: TicketRepository = Depends(lambda: ticket_repository),
):
    deleted_ticket = ticket_repository.delete_ticket_by_id(ticket_id)
    if deleted_ticket:
        return {"message": "Ticket deleted successfully", "deleted_ticket": deleted_ticket}
    else:
        raise HTTPException(status_code=404, detail="Ticket not found")

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=5001, reload=True)