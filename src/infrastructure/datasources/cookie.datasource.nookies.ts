import { CookieRepository, Cookie, COOKIE_TYPE } from "@/domain";
import { CookieMapper } from "../mappers/cookie.mapper";

export class CookieDataSourceNookies implements CookieRepository {

    // private readonly cookieStore: {[key:string]:string}

    // constructor(cookieStore: {[key:string]:string} = parseCookies()){
    //     this.cookieStore = cookieStore
    // }
    
    getServerSession() : Cookie | null {
        // console.log("STORE", this.cookieStore)
        // const jwt_session = this.cookieStore['jwt_session']
        // if(!jwt_session) return null
        // return CookieMapper.createCookie({value: jwt_session, type:COOKIE_TYPE.REFRESH})
        return null
    }
    
    // async addAccessToken (access_token:string): Promise<void> {
    //     const session = await this.getServerSession()
    //     if(session) SessionMapper.createSession({access_token})
    // }

    // async getServerSession(): Promise<Session | null>{
    //     const session = Session.getInstance()
    //     if(session.refresh_cookie) return session
    //     try {
    //         const cookieStore = cookies();
    //         const browser_refresh_cookie = cookieStore.get("refresh_cookie");
    //         if (browser_refresh_cookie) return SessionMapper.createSession({refresh_cookie: browser_refresh_cookie?.value})
    //     } catch (error) {
    //         console.log("Err:", error)
    //     }
    //     return null
    // } ;
    
}