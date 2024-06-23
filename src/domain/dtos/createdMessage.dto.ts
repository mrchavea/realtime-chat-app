import { Message } from ".."

export class CreatedMessageDto {
    id: string;
    text: string;
    from: string;
    to:string;
    sent_date: Date;

    private constructor(id:string, text:string, from:string, to:string, sent_date:Date){
        this.id = id
        this.text=text
        this.from=from
        this.to=to
        this.sent_date=sent_date
    }

    static createMessage(object:{[key:string]:any}): [error:string | undefined, Message | undefined] {
        const {id,text, from, to, sent_date} = object
        if(!text || !from || !to || !sent_date) return["Error creating message", undefined]
        const new_sent_date = new Date(sent_date)
        return [undefined, new CreatedMessageDto(id, text, from, to, new_sent_date)]
    }
}