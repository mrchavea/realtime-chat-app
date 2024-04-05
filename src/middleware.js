import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// export { default } from "next-auth/middleware"

const redirectToPath = (req, path, callbackURL = false) => {
  const url = req.nextUrl.clone();
  url.pathname = path;
  if (callbackURL) url.searchParams.set("callbackUrl", req.nextUrl.href);
  return NextResponse.redirect(url);
};

export async function middleware(req) {
  //USER
  if (req.nextUrl.pathname.startsWith("/review")) {
    const token = await getToken({ req });
    if (!token) return redirectToPath(req, "/auth/signin", true);
    return NextResponse.next();
  }
  //ADMIN
  if (req.nextUrl.pathname.startsWith("/admin")) {
    const token = await getToken({ req });
    if (!token) return redirectToPath(req, "/auth/signin", true);
    if (token && !token?.garage) return redirectToPath(req, "/");
    //return NextResponse.next()
  }

  return NextResponse.next();
}

// export const config = { matcher: ["/reviews/:path*"] }
