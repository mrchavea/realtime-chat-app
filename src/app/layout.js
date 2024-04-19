import "@/styles/globals.css";
import { useAuthContext } from "@/presentation/user/context/AuthContext";
import Providers from "./providers";
import AnalyticsWrapper from "./analytics";
import { Poppins } from "next/font/google";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../src/pages/api/auth/[...nextauth]";
import { SessionAdapter } from "@/infrastructure";
import { Toaster } from "@/presentation/shared";
import ClientComponent from "./ClientComponent";

const poppins = Poppins({
  weight: ["400"],
  subsets: ["latin"]
});

export default async function RootLayout({ children }) {
  //const session = await getServerSession(authOptions);

  return (
    <html lang="es">
      <body className={poppins.className}>
        <Providers>
          <Toaster />
          <ClientComponent />
          <div className="dark min-w-[320px] min-h-screen bg-background text-foreground">
            {/* <div className="h-[65px]" /> */}
            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              {children}
            </main>
          </div>
        </Providers>
        <AnalyticsWrapper />
      </body>
    </html>
  );
}
