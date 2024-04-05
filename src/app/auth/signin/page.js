import { getProviders } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../../pages/api/auth/[...nextauth]";
import { redirect } from 'next/navigation';
import { SigInForm } from "./SigInForm";
import { Suspense } from "react";
import AuthLoadingSkeleton from "../AuthLoadingSkeleton"
import ExternalProviders from './ExternalProviders'
import Link from "next/link";
import SigInProviderButton from "./SignInProviderButton";

export default async function SignInPage() {
  const session = await getServerSession(authOptions)
  //TO DO: Redirect to last page visited
  if (session) {
    redirect('/');
  }
  
  const providers = await getProviders() ?? []
  
  return (  
      <div>
          <section className="pb-5">
            <p tabindex="0" class="focus:outline-none text-2xl font-extrabold leading-6 text-gray-800 dark:text-white">Entra a tu cuenta</p>
            <p tabindex="0" class="focus:outline-none text-sm mt-4 font-medium leading-none text-gray-500 dark:text-neutral-300">¿No tienes cuenta aún?
              <Link href="/auth/signup" class="underline ml-1 hover:text-gray-500 focus:text-gray-500 focus:outline-none focus:underline text-sm font-medium leading-none  text-gray-800  dark:text-neutral-200 cursor-pointer">
                Regístrate ahora
              </Link>              
            </p>
          </section>

          <Suspense fallback={<AuthLoadingSkeleton/>}>
            <SigInForm>
              {/* <ExternalProviders providers={providers}/> */}
              <SigInProviderButton provider={providers['google']}/>
            </SigInForm>
          </Suspense>

          
      </div>
  )
}