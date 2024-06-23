"use client";

import { ThemeProvider } from "next-themes";
import { NextUIProvider } from "@nextui-org/react";
import { AuthContextProvider } from "@/presentation/user/contexts/AuthContext";

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
