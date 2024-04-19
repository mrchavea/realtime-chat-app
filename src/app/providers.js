"use client";

import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";
import { AuthContextProvider } from "@/presentation/user/context/AuthContext";

export default function Providers({ children }) {
  return (
    <NextUIProvider>
      <ThemeProvider attribute="class" defaultTheme="dark">
        {/* <SessionProvider>{children}</SessionProvider> */}
        <AuthContextProvider>{children}</AuthContextProvider>
      </ThemeProvider>
    </NextUIProvider>
  );
}
