export enum COOKIE_TYPE {
    'REFRESH',
    'ACCESS'
}

export class Cookie {

    public value: string
    public type: COOKIE_TYPE

    constructor(value: string, type: COOKIE_TYPE){
        this.value = value
        this.type = type
    }
}