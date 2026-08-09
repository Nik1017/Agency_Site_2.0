import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

export const authConfig: NextAuthConfig = {
  secret: process.env.AUTH_SECRET,

  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      console.log("PATH:", nextUrl.pathname);
      console.log("AUTH:", auth);
      console.log("ROLE:", auth?.user?.role);
      const isLoggedIn = !!auth?.user;
      const role = auth?.user?.role;

      const isBookCall = nextUrl.pathname.startsWith("/book-call");
      const isAdmin = nextUrl.pathname.startsWith("/admin");

      if (isBookCall && !isLoggedIn) {
        return false;
      }

      if (isAdmin) {
        return isLoggedIn;
      }

      return true;
    },
  },
};
