"use server";

import { cookies } from "next/headers";

interface LogInCredentials{
    email:string,
    password:string
}

// async function refreshAccesCookie(){

// }

// async function userAction_Middleware(){
//     const access_token = cookies().get("jwt_access")
//     if(!access_token &&) refreshAccesCookie()
// }

export async function removeCookieSession() {
    cookies().delete('jwt_session')
}

// export async function LogInFromServer(form_data:LogInCredentials): Promise<string> {
//     try {

//         let return_value = {
//             ok: true,
//             error: '',
//         }

//         const response = await fetch("http://localhost:3000/auth/login", {
//             method: 'POST',
//             body: JSON.stringify({email: form_data.email, password: form_data.password}),
//             headers: {"Content-type": "application/json; charset=UTF-8"},
//             credentials: 'include'
//         })
    
//         if(!response.ok) {
//             const data = await response.json()
//             return_value.ok = false
//             return_value.error = data.error ? data.error : 'Error inesperado'
//             //return data.error ? data.error : 'Error inesperado'
//         }

//         //Add cookies to browser due to handling log in from server
//         const headers_cookies = response.headers.getSetCookie()
//         for(let cookie_detail of headers_cookies){
//             let [cookie_name, cookie_value] = cookie_detail.split(";")[0].split("=")
//             cookies().set(cookie_name, cookie_value)
//         }

//         return JSON.stringify(return_value)

//     } catch (error) {
//         console.log("ERROR?", error)
//         throw new Error('Error when log in user')
//     }

// }
// export async function setAccessTokenFromClient (access_token: string): Promise<void> {
//     SessionAdapter.addAccessToken(access_token)
// }
