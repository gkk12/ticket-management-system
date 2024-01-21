export interface Message {
    id: string
    channel_id: string
    parent_channel_id: string
    community_server_id: string   
    timestamp: string
    has_attachment: boolean
    reference_msg_id: string
    timestamp_insert: string
    discussion_id: string
    author_id: string
    content: string
    msg_url: string
    author: Author
}

export interface Author {
    id: string
    name: string
    nickname: string
    color: string
    discriminator: string
    avatar_url: string
    is_bot: boolean
    timestamp_insert: string
}
