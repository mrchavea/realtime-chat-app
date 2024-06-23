import { CreatedMessageDto, Message, ReceivedMessageDto } from ".."

export interface MessageRepository{
    sendMessage: (newMessage: CreatedMessageDto) => Message
    receiveMessage: () => Promise<Message>
}