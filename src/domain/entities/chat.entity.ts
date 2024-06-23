import { Message, User } from ".."


// export class Chat {
//     id: string
//     name: string
//     users: Array<User>
//     messages: Array<Message>

//     constructor (id:string, name:string, users:Array<User>, messages: Array<Message>) {
//         this.id = id
//         this.name = name
//         this.users = users
//         this.messages = messages
//     }

//     addMessage (message: Message): void {
//         this.messages.push(message)
//     }
// }

export interface Chat {
    id: string
    name: string
    users: Array<User>
    messages: Array<Message>
}

