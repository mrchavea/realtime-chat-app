import { CookieAdapter } from "@/infrastructure";
import Link from "next/link";

export default async function Home() {
  return (
    <>
      {/* <ClientComponent/> */}
      <Link href={"/auth/authenticate"}>LINK</Link>
    </>
  );
}
