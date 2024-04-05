import "@/styles/globals.css";
import Providers from "./providers";
import AnalyticsWrapper from "./analytics";
import { Poppins } from "next/font/google";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../src/pages/api/auth/[...nextauth]";
import { Toaster } from "@/components/ui/toaster";

const poppins = Poppins({
  weight: ["400"],
  subsets: ["latin"]
});

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="es">
      <body className={poppins.className}>
        <Providers>
          <Toaster />
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
