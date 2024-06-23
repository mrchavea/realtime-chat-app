import { removeCookieSession } from "@/app/serverActions"
import { LogInCredentials, User } from "@/domain"
import jwt from "jsonwebtoken"

const REFRESH_MARGIN = 0.1 //10% time before

export enum TOKEN_METHOD{
    'LOGIN',
    'REFRESH'
}

export enum TOKEN_TYPE {
    'ACESS_TOKEN',
    'REFRESH_TOKEN'
}


interface TokenPayload {
    user_id: string,
    method?: TOKEN_METHOD,
    type?: TOKEN_TYPE,
    iat?: number,
    exp?: number
}

export async function handleLogIn (form_data: LogInCredentials, setUser: Function): Promise <[boolean, string, (User | undefined)]> {
    try {
        //Refactor and use infrastructure and use case
        const response = await fetch("http://localhost:3000/auth/login", {
            method: 'POST',
            body: JSON.stringify({email: form_data.email, password: form_data.password}),
            headers: {"Content-type": "application/json; charset=UTF-8"},
            credentials: 'include'
        })
    
        if(!response.ok) {
            const data = await response.json()
            return [false, data?.error ? data.error : 'Error inesperado', undefined]
        } 

        const user = getAccessCookie(setUser)
        if(!user) throw new Error("Error with log in cookie")
        return [true, '', user!]

    } catch (error) {
        //TODO: Refactor and use custom error
        throw new Error('Error when log in')
    }
}

export function handleLogOut(setUser: Function): void {
    //Call to logOut EP
    const response = {ok:true}
    if(response.ok){
        setUser(undefined)
        removeCookieSession()       
    }
}

export async function handleRefreshToken (setUser: Function) : Promise<void> {
    try {
        const response = await fetch("http://localhost:3000/auth/refreshToken", {
            method: 'GET',
            headers: {"Content-type": "application/json; charset=UTF-8"},
            credentials: 'include'
        })
            
        if(!response.ok) throw new Error('Error when refresh token')
        getAccessCookie(setUser)

    } catch (error) {
        //TODO: Refactor and use custom error
        throw new Error('Error when refresh token')
    }
}

export function handleRefreshTimeout(access_token: string | null, setUser: Function): NodeJS.Timeout | null{
    if(access_token) {
        const payload: TokenPayload = jwt.decode(access_token) as TokenPayload
        // const current_ms = new Date().getTime()
        // const restant_ms = payload.exp! * 1000 - current_ms
        //TODO: RECEIVE EXPIRATION DATE AS PROPERTY IN ORDER TO HANDLE SAME TIME ZONE
        const refresh_time_ms = calcularTiempoRefresco(payload.exp!)
        console.log("REFRESH_MS", refresh_time_ms)
        const refresh_timeout = setTimeout(()=> {
            handleRefreshToken(setUser)
        }, 1000*5)
        return refresh_timeout
    }
    return null
}

export function getAccessCookie (setUser: Function): User | undefined {
    const getCookie = (name: string) => {
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            const [cookieName, cookieValue] = cookie.trim().split('=');
            if (cookieName === name) {
                return cookieValue;
            }
        }
        return undefined;
    };

    // Obtener el token de acceso almacenado en la cookie
    const storedAccessToken = getCookie('jwt_access');  
    console.log("TOKEN?", storedAccessToken, document.cookie)
    if (!storedAccessToken) return undefined
    const user = createUserFromAccessToken(storedAccessToken)
    setUser(user);
    return user
}

function calcularTiempoRefresco(exp: number): number {
    // Obtener la fecha actual en segundos
    const now = Math.floor(Date.now()/1000.0);
    
    console.log("EXP - NOW", exp, now, exp - now)
    // Calcular el tiempo restante hasta la expiración en segundos
    const tiempoRestanteSegundos = exp - now;
    
    // Convertir el tiempo restante a milisegundos
    const tiempoRestanteMilisegundos = tiempoRestanteSegundos * 1000;
  
    // Calcular el 90% del tiempo restante
    const tiempoRefrescoMilisegundos = tiempoRestanteMilisegundos * 0.9;
  
    return tiempoRefrescoMilisegundos;
}

function createUserFromAccessToken(access_token:string): User {
    const payload: TokenPayload = jwt.decode(access_token) as TokenPayload
    const {user_id} = payload
    const user:User = {id:user_id, name:"Daniel",profile_picture:"example"}
    return user
}
