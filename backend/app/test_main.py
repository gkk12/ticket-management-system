from fastapi.testclient import TestClient

from main import app

client = TestClient(app)

def test_read_main():
    response = client.get("/healthz")
    assert response.status_code == 200
    assert response.json() == "OK"

def test_invalid_endpoint_returns_404():
    response = client.get("/messageURL")
    assert response.status_code == 404


def test_get_tickets():
    response = client.get("/tickets")
    assert response.status_code == 200
    tickets = response.json()
    assert isinstance(tickets, list)
    assert len(tickets) == 219

def test_get_messages():
    response = client.get("/messages")
    assert response.status_code == 200
    messages = response.json()
    assert isinstance(messages, list)
    assert len(messages) == 2625

def test_get_message_by_id_successful():
    response = client.get("/message/1166908425087762432")
    assert response.status_code == 200
    message = response.json()
    expected_message = {
            "id": "1166908425087762432",
            "channel_id": "1044571909205016626",
            "parent_channel_id": None,
            "community_server_id": "993846798382805002",
            "timestamp": "2023-10-26 01:17:28",
            "has_attachment": False,
            "reference_msg_id": "1166907727138791425",
            "timestamp_insert": "2023-10-26 01:17:28.814427",
            "discussion_id": "abb3989d-19ab-45e4-b97f-01b2c24c8dfc",
            "author_id": "805636568571183114",
            "content": "When I bought from mintle, I do not have to validate, but when I sell I have to validate?",
            "msg_url": "discord://discord.com/channels/993846798382805002/1044571909205016626/1166908425087762432",
            "author": {
                "id": "805636568571183114",
                "name": "antonfour",
                "nickname": "antonfour",
                "color": "#1de9c5",
                "discriminator": "0",
                "avatar_url": "https://cdn.discordapp.com/avatars/805636568571183114/6e22c2563263d05109bd283d0d91f986.png?size=1024",
                "is_bot": False,
                "timestamp_insert": "2023-08-30 09:41:28.869115"
            }}
    assert message == expected_message

def test_invalid_message_id_returns_none():
    response = client.get("/message/1166908425087762ew432")
    message = response.json()
    assert response.status_code == 200
    assert message == None

def test_delete_ticket_by_id_successful():
    response = client.delete(f"/ticket/d7973c7d-ae3f-44e4-967f-b52433d38aab")
    expected_message = "Ticket deleted successfully"
    expected_deleted_ticket = {"id": "d7973c7d-ae3f-44e4-967f-b52433d38aab", 
    "timestamp": "2023-10-26 05:00:01.600140",
    "msg_id": "1166964428776943697",
    "status": "open",
    "resolved_by": None,
    "ts_last_status_change": None,
    "context_messages": [
                "1166938560532852788",
                "1166939260088221706",
                "1166942590424334418",
                "1166943078846836806",
                "1166945427711590440",
                "1166945579931275345",
                "1166953353008398356",
                "1166954498623811594",
                "1166957511409152101",
                "1166958142840655873",
                "1166964428776943697",
                "1166965869839138856",
                "1166966687531290705",
                "1166968792073642074",
                "1166968805449273385",
                "1166968872172273715",
                "1166969100451450951",
                "1166969250230063134",
                "1166969275735605259",
                "1166969771917590529",
                "1166970144812171284"
            ]}
    assert response.status_code == 200
    result = response.json()
    assert "message" in result
    assert "deleted_ticket" in result
    assert result["message"] == expected_message
    assert result["deleted_ticket"] == expected_deleted_ticket

def test_delete_nonexistent_ticket_returns_404():
    response = client.delete(f"/ticket/sd7973c7d-ae3f-44e4-967f-sdb52433d38aab")
    assert response.status_code == 404