import { CreatedMessageDto, Message, MessageRepository, ReceivedMessageDto } from "@/domain";
import { SocketIOAdapter } from "@/infrastructure/adapters/socketIO.adapter";

export class MessageDatasourceWebSocket implements MessageRepository{

    private readonly socket:SocketIOAdapter

    constructor(socket: SocketIOAdapter){
        this.socket = socket
    }

    sendMessage(message: CreatedMessageDto): Message {
        this.socket.sendMessage(message)
        return message
    }

    receiveMessage(): Promise<Message> {
        return this.socket.receiveMessage()
    }
}