"use client"

import { Context, createContext, useState, useMemo, ReactNode, useEffect, useContext, Dispatch, SetStateAction } from "react";
import { getAccessCookie, handleLogIn, handleLogOut, handleRefreshTimeout} from "./helpers";
import { LogInCredentials } from "@/domain";

interface AuthContextInterface {
    access_token:string | null,
    handleLogInCallback: (form_data: LogInCredentials) => Promise <[boolean, string]>,
    handleLogOutCallback: () => void
}

// interface AuthContextInterface {
//     access_token:string | null,
//     setAcessToken: Dispatch<SetStateAction<string | null>>,
// }



const initialState: AuthContextInterface = {
    access_token: null,
    handleLogInCallback: async () => [false, ""],
    handleLogOutCallback: () => {}
}

// const initialState: AuthContextInterface = {
//     access_token: null,
//     setAcessToken: () => {},
// }

const AuthContext: Context<AuthContextInterface> = createContext(initialState)

const AuthContextProvider : React.FC<{ children: ReactNode }> = ({children}) => {
    const [access_token, setAcessToken] = useState <string | null> (null)

    useEffect(()=>{
        getAccessCookie(setAcessToken)
    }, [])

    // useEffect(()=>{
    //     const refresh_timeout: NodeJS.Timeout | null = handleRefreshTimeout(access_token, setAcessToken)
    //     console.log("REFRESH", refresh_timeout)
    //     if(refresh_timeout) return () => clearTimeout(refresh_timeout)
    // }, [access_token])

    function handleLogInCallback (form_data: LogInCredentials): Promise <[boolean, string]> {
        return handleLogIn(form_data, setAcessToken)
    }
    
    function handleLogOutCallback () {
        handleLogOut(setAcessToken)
    }

    const values = useMemo(()=> ({
        access_token,
        handleLogInCallback,
        handleLogOutCallback,
    }), [access_token])

    // const values = useMemo(()=> ({
    //     access_token,
    //     setAcessToken
    // }), [access_token])

    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

function useAuthContext(){
    const context = useContext(AuthContext)
    
    if(!context) console.error('Error deploying App Context!!!');

    return context
}

export {AuthContext, AuthContextProvider, useAuthContext}