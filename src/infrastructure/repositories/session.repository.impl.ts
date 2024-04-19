import {Cookie, CookieRepository} from "@/domain"
import { CookieDataSourceNookies } from "@/infrastructure"

export class CookieRepositoryImpl implements CookieRepository{

    constructor (private cookieDataSource: CookieDataSourceNookies) {}

    getServerSession(): Cookie | null {
        return this.cookieDataSource.getServerSession()
    } ;

}