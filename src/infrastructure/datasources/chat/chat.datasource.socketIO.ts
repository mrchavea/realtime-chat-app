import { Chat, ChatRepository, CreatedMessageDto, Message } from "@/domain";
import { SocketIOAdapter } from "@/infrastructure";
import { error } from "console";

export class ChatDatasourceSocketIO{

    private readonly socket:SocketIOAdapter

    constructor(socket: SocketIOAdapter){
        this.socket = socket
    }

    sendMessage(messageDto: CreatedMessageDto): void {
        this.socket.sendMessage(messageDto as Message)
    }

    onMessage(callback: (message:Message) => void): void {
        this.socket.onMessage(callback)
    }
    

}
