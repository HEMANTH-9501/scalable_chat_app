import { Account, AuthOptions, ISODateString } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";
import { LOGIN_URL } from "@/lib/apiEndPoints";

export interface CustomSession {
  user?: CustomUser;
  expires: ISODateString;
}

export interface CustomUser {
  id?: string | null;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  provider?: string | null;
  token?: string | null;
}

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }:{user:CustomUser,account:Account|null}) {
      try{
        console.log("the user data is ", user);
      console.log("the account data is ", account);
      const paylaod={
        email:user.email,
        name:user.name,
        oauth_id:account?.providerAccountId,
        provider:account?.provider,
        image:user?.image,
      }
      const {data}=await axios.post(LOGIN_URL , paylaod, )
      user.id= data?.user?.id.toString();
      user.token=data?.user?.token
      user.provider = data?.user?.provider;
      return true;
      }
      catch(error){
          return false
      }
      
    },

    async session({ session, token }) {
      session.user = token.user as CustomUser;
      return session as CustomSession;
    },

    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
};
