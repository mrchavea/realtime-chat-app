import { Cookie } from "@/domain";
import { CookieDataSourceNookies, CookieRepositoryImpl } from "@/infrastructure";


class CookieAdapterClass {

    private cookieDataSourceImpl: CookieDataSourceNookies
    private cookieRepositoryImpl: CookieRepositoryImpl

    constructor(){
        this.cookieDataSourceImpl = new CookieDataSourceNookies();
        this.cookieRepositoryImpl = new CookieRepositoryImpl(this.cookieDataSourceImpl);
    }
    
    public getServerSession(): Cookie | null {
        return this.cookieRepositoryImpl.getServerSession()
    }

}

const CookieAdapter = new CookieAdapterClass()

export {CookieAdapter}