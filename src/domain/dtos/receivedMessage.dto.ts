import { Message } from ".."

export class ReceivedMessageDto {
    value:string
    myself:boolean
    sent_date:Date
    private constructor(value:string, myself:boolean, sent_date:Date){
        this.myself=myself
        this.sent_date=sent_date
        this.value=value
    }

    static createMessage(object:{[key:string]:any}): [error:string | undefined, Message | undefined] {
        const {value, myself, sent_date} = object
        if(!value || myself == undefined || !sent_date) return["Error receiving socket message", undefined]
        const new_sent_date = new Date(sent_date)
        return [undefined, {myself, value, sent_date:new_sent_date}]
    }
}