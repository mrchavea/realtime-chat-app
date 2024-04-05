"use client"

import { signIn } from "next-auth/react"

export default function SigInProviderButton ({provider}) {

    //TO DO: Use the callbackURL from SignInForm to redirect like other providers

    return (
        <button onClick={() => signIn(provider.id).finally(()=>console.log("google err"))}
            aria-label="Continue with google" role="button" class="focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 flex items-center w-full">
            <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/sign_in-svg2.svg" alt="google"/>
            <p class="text-base font-medium ml-4 text-gray-700 dark:text-neutral-200">Inicia sesión con {provider.name}</p>
        </button>
    )
}