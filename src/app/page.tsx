import { CookieAdapter } from "@/infrastructure"
import Link from "next/link"

export default async function Home() {

  const ClientComponent = () => {
    

    return (
      <>
        HOME
      </>
    )
  }
  // return (
  //   <>{JSON.stringify(session)}</>
  // )

  return (
    <>
      {/* <ClientComponent/> */}
      <Link href={"/auth/authenticate"}>LINK</Link>
    </>
  )

}
