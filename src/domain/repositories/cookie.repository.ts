import { Cookie } from "@/domain";

export interface CookieRepository {
    getServerSession: () => Cookie | null
    // addAccessToken: (access_token: string) => Promise<void>
}