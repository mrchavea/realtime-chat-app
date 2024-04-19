import { Cookie } from "@/domain";

export class CookieMapper {
    static createCookie(object: {[key:string]:any}) : Cookie | null {
        const {value, type} = object
        if(!value || type) throw Error("Error creating cookie!")
        return new Cookie(value, type)
    }

}