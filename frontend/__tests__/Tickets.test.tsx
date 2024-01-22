import { render, screen, waitFor } from '@testing-library/react';
import MessageComponent from '../components/message';

describe('Tickets Page', () => {
    it('should render expanded message with author name', async () => {
        const expandedMessages = [{
            "id": "1166907889106034818",
            "channel_id": "1044571909205016626",
            "parent_channel_id": null,
            "community_server_id": "993846798382805002",
            "timestamp": "2023-10-26 01:15:20",
            "has_attachment": false,
            "reference_msg_id": null,
            "timestamp_insert": "2023-10-26 01:15:21.011664",
            "discussion_id": "15cd4b4b-7a99-4f16-803a-3f9cdef0d7e7",
            "author_id": "841049814275457045",
            "content": "Do we have any update about the end date?",
            "msg_url": "discord://discord.com/channels/993846798382805002/1044571909205016626/1166907889106034818",
            "author": {
                "id": "841049814275457045",
                "name": "dabid3258",
                "nickname": "dabid3258",
                "color": "#2ecc71",
                "discriminator": "0",
                "avatar_url": "https://cdn.discordapp.com/avatars/841049814275457045/6636c8f277e941745e0bdaae1a4dcf4a.png?size=1024",
                "is_bot": false,
                "timestamp_insert": "2023-02-09 16:15:30.486534"
            }
        }];
            
        const ticket = {
            "id": "968e448f-c6e1-4c05-8ca7-34907dcd7816",
            "msg_id": "1166907889106034818",
            "status": "open",
            "resolved_by": null,
            "ts_last_status_change": null,
            "timestamp": "2023-10-26 01:15:21.212065",
            "context_messages": [
                "1166907087851372574",
                "1166907500138860584",
                "1166907658918440980",
                "1166907727138791425",
                "1166907884697812992",
                "1166907889106034818",
                "1166908031741734932",
                "1166908225636020304",
                "1166908425087762432",
                "1166908626603094057",
                "1166909109044527124",
                "1166909370307715092",
                "1166910438752141363",
                "1166913063014891540",
                "1166913809387114496",
                "1166923583138844742"
            ]
        };
        const context_message = "1166907889106034818";

        render(<MessageComponent messages={expandedMessages} ticket={ticket} contextMessage={context_message} />);

        await waitFor(() => {
            const authorName = screen.getByText('dabid3258');
            expect(authorName).toBeInTheDocument();
        });
    });
});

