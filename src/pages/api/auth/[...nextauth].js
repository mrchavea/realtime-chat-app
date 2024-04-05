import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { compare } from "bcryptjs";
import { getUserByEmail } from "../../../repositories/user";
import { getAdminByEmail } from "../../../repositories/admin";
import { randomUUID } from "crypto";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com"
        },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const promises = await Promise.allSettled([
          getUserByEmail(credentials.email),
          getAdminByEmail(credentials.email)
        ]);

        const user =
          promises[0].status === "fulfilled" ? promises[0].value : null;
        const admin =
          promises[1].status === "fulfilled" ? promises[1].value : null;
        //TO DO: Get the role from User or Account and pass to jthe session in order to let know the server the roile

        if (!user && !admin) {
          return null;
        }

        if (
          user &&
          user?.password &&
          (await compare(credentials.password, user?.password))
        ) {
          return {
            id: user.id,
            email: user.email,
            name: user.name
          };
        }

        if (
          admin &&
          admin?.password &&
          (await compare(credentials.password, admin?.password))
        ) {
          return {
            id: admin.id,
            email: admin.email,
            name: admin.name,
            garage: admin.garageId
          };
        }

        return null;
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    })
  ],

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/auth/signin"
  },

  session: {
    strategy: "jwt"
  },

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      //TO DO: create correctly user and accounts no matter what scenary it is (providers, client credentials)
      if (account?.provider === "google") {
        user.emailVerified = profile?.email_verified;
        const accountId = randomUUID();
        user.accountId = accountId;
        account.id = accountId;
      }
      //console.log("SIGNIN",user, account, profile )
      return true;
    },
    async jwt({ token, user, account }) {
      //TO DO: Only executes when log in: get and persist the user role on the token
      //TO DO: Unify when providers and accounts to the jwt data (SERVER SIDE)
      //TO DO: Refresh token in order to prevent access removed actions
      if (user) {
        token.garage = user.garage;
      }
      //console.log("JWT STRATEGY", token, user, account)
      return token;
    },
    async session({ session, token, user }) {
      //TO DO: Unify when providers and accounts to the session data (CLIENT SIDE)
      if (token) session.user.garage = token.garage;
      //console.log("SESSION HERE!", session, token, user)
      return session;
    }
  }
};

const authHandler = NextAuth(authOptions);
export default async function handler(...params) {
  await authHandler(...params);
}
