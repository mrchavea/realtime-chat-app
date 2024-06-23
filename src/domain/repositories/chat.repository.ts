import { Chat, CreatedMessageDto, Message } from "..";

export interface ChatRepository {
    getChatById: (chatId:string) => Chat
    getMessages: (chatId:string, pagination: number)=> Promise<Array<Message>>,
    sendMessage: (messageDto: CreatedMessageDto)=> void
    onMessage: (callback:(message:Message)=> void) => void
}