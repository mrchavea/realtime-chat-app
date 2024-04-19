import { removeCookieSession } from "@/app/serverActions"
import { LogInCredentials } from "@/domain"
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

export async function handleLogIn (form_data: LogInCredentials, setAcessToken: Function): Promise <[boolean, string]> {
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
            return [false, data?.error ? data.error : 'Error inesperado']
        } 

        getAccessCookie(setAcessToken)
    
        return [true, '']

    } catch (error) {
        //TODO: Refactor and use custom error
        throw new Error('Error when log in')
    }
}

export function handleLogOut(setAcessToken: Function): void {
    //Call to logOut EP
    const response = {ok:true}
    if(response.ok){
        setAcessToken(undefined)
        removeCookieSession()       
    }
}

export async function handleRefreshToken (setAcessToken: Function) : Promise<void> {
    try {
        const response = await fetch("http://localhost:3000/auth/refreshToken", {
            method: 'GET',
            headers: {"Content-type": "application/json; charset=UTF-8"},
            credentials: 'include'
        })
            
        if(!response.ok) throw new Error('Error when refresh token')
        getAccessCookie(setAcessToken)

    } catch (error) {
        //TODO: Refactor and use custom error
        throw new Error('Error when refresh token')
    }
}

export function handleRefreshTimeout(access_token: string | null, setAcessToken: Function): NodeJS.Timeout | null{
    if(access_token) {
        const payload: TokenPayload = jwt.decode(access_token) as TokenPayload
        // const current_ms = new Date().getTime()
        // const restant_ms = payload.exp! * 1000 - current_ms
        //TODO: RECEIVE EXPIRATION DATE AS PROPERTY IN ORDER TO HANDLE SAME TIME ZONE
        const refresh_time_ms = calcularTiempoRefresco(payload.exp!)
        console.log("REFRESH_MS", refresh_time_ms)
        const refresh_timeout = setTimeout(()=> {
            handleRefreshToken(setAcessToken)
        }, 1000*5)
        return refresh_timeout
    }
    return null
}

export function getAccessCookie (setAcessToken: Function): void {
    const getCookie = (name: string) => {
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            const [cookieName, cookieValue] = cookie.trim().split('=');
            if (cookieName === name) {
                return cookieValue;
            }
        }
        return null;
    };

    // Obtener el token de acceso almacenado en la cookie
    const storedAccessToken = getCookie('jwt_access');  
    console.log("TOKEN?", storedAccessToken, document.cookie)
    if (storedAccessToken) setAcessToken(storedAccessToken);
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
