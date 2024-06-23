import { Chat, ChatRepository, Message } from "@/domain";
import { SocketIOAdapter } from "@/infrastructure";
import { FetchAdapter } from "@/infrastructure/adapters/fetch.adapter";
import { error } from "console";

export class ChatDatasourceREST {

    private readonly apiURL:string = 'http://localhost:3000/chat'
    private fetchAdapter: FetchAdapter

    constructor(apiURL: string, fetchAdapter: FetchAdapter){
        this.apiURL = apiURL
        this.fetchAdapter = fetchAdapter
    }

    getChatById(chatId: string): Chat {
        throw Error("Not implemented")
    }

    getMessages(chatId: string, pagination: number): Promise<Message[]> {
        return this.fetchAdapter.get(`${this.apiURL}/${chatId}/message`)
    }

}
