import { getToken } from "next-auth/jwt";
import { CookieAdapter } from "./infrastructure";
import { parseCookies } from "nookies";
import { cookies } from 'next/headers'
import {NextRequest, NextResponse} from 'next/server'

// export { default } from "next-auth/middleware"

const redirectToPath = (req:any, path:any, callbackURL = false) => {
  const url = req.nextUrl.clone();
  url.pathname = path;
  if (callbackURL) url.searchParams.set("callbackUrl", req.nextUrl.href);
  return NextResponse.redirect(url);
};

export async function middleware(request:NextRequest) {
//   const session = CookieAdapter.getServerSession()
// const store = parseCookies();
const cookies = request.cookies
  //USER
  // if (req.nextUrl.pathname.startsWith("/review")) {
  //   const token = await getToken({ request });
  //   if (!token) return redirectToPath(request, "/auth/signin", true);
  //   return NextResponse.next();
  // }
  // //ADMIN
  // if (req.nextUrl.pathname.startsWith("/admin")) {
  //   const token = await getToken({ request });
  //   if (!token) return redirectToPath(request, "/auth/signin", true);
  //   if (token && !token?.garage) return redirectToPath(request, "/");
  //   //return NextResponse.next()
  // }

  return NextResponse.next();
}

// export const config = { matcher: ["/reviews/:path*"] }
