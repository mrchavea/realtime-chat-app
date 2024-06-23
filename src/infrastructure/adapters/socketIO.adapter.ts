import { Message } from "@/domain";
import { Socket, io } from "socket.io-client";

export class SocketIOAdapter {
    private static instance: SocketIOAdapter;
    private socket: Socket;

    private constructor() {
        this.socket = io("http://localhost:3000", { withCredentials: true });
        // Escuchar mensajes de la sala
        this.socket.on("message", (message: Message) => {
            console.log("Mensaje recibido:", message);
        });
    }

    static getInstance(): SocketIOAdapter {
        if (!SocketIOAdapter.instance) {
            SocketIOAdapter.instance = new SocketIOAdapter();
        }
        return SocketIOAdapter.instance;
    }

    closeSocket(): void {
        this.socket.disconnect();
    }

    joinRoom(chatRoomId: string): void {
        console.log("joiningRoom", chatRoomId)
        this.socket.emit("join", chatRoomId);
    }

    leaveRoom(chatRoomId: string): void {
        this.socket.emit("leave", chatRoomId);
    }

    sendMessage(message: Message): boolean {
        this.socket.emit("message", message);
        return true;
    }

    onMessage(callback:(message:Message)=>void): void{
        this.socket.on("message", (message:Message) => callback(message))
    }
}
