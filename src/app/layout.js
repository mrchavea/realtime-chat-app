import "@/styles/globals.css";
import { useAuthContext } from "@/presentation/user/context/AuthContext";
import Providers from "./providers";
import AnalyticsWrapper from "./analytics";
import { Poppins } from "next/font/google";
import { authOptions } from "../../src/pages/api/auth/[...nextauth]";
import { SessionAdapter } from "@/infrastructure";
import { Toaster } from "@/presentation/shared";

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
          <div className="dark min-w-[320px] min-h-screen bg-background text-foreground">{children}</div>
        </Providers>
        <AnalyticsWrapper />
      </body>
    </html>
  );
}
