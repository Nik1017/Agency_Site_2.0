import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { prisma } from "@/lib/prisma";

// List of administrator email addresses
const ADMIN_EMAILS = [
  "nikhilchandrakar00@gmail.com", 
];

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  callbacks: {
    ...authConfig.callbacks,
    async signIn({ user }) {
      if (!user.email) return false;
      
      const isAdmin = ADMIN_EMAILS.includes(user.email);
      const role = isAdmin ? "ADMIN" : "USER";

      try {
        await prisma.user.upsert({
          where: { email: user.email },
          update: {
            name: user.name,
            image: user.image,
            role: role,
          },
          create: {
            email: user.email,
            name: user.name,
            image: user.image,
            role: role,
          },
        });
        return true;
      } catch (error) {
        console.error("Error saving user during sign in:", error);
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        // Query the database to find the user's ID and role
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email! },
        });
        if (dbUser) {
          token.id = dbUser.id;
          token.role = dbUser.role;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
});
