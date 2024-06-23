import { Chat, ChatRepository, CreatedMessageDto, Message } from "@/domain";
import { ChatDatasourceSocketIO } from "../datasources/chat/chat.datasource.socketIO";
import { ChatDatasourceREST } from "../datasources/chat/chat.datasource.rest";

export class ChatRepositoryImpl implements ChatRepository{

    constructor(private chatDatasourceSocket: ChatDatasourceSocketIO, private chatDatasourceREST : ChatDatasourceREST){}
    
    getChatById(chatId: string): Chat {
        throw new Error("Not implemented")
    }

    getMessages(chatId: string, pagination: number): Promise<Message[]> {
        return this.chatDatasourceREST.getMessages(chatId, pagination)

    }
    sendMessage(createdMessage: CreatedMessageDto): void {
        return this.chatDatasourceSocket.sendMessage(createdMessage)
    }

    onMessage(callback: (message: Message) => void): void {
        return this.chatDatasourceSocket.onMessage(callback)
    }

}