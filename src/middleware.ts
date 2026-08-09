import NextAuth from "next-auth";
import { authConfig } from "@/auth/auth.config";
import { type NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/middleware";

const nextAuthMiddleware = NextAuth(authConfig).auth;

export default async function middleware(request: NextRequest, event: any) {
  // 1. Initialize Supabase middleware client
  const supabaseResponse = createClient(request);

  // 2. Run NextAuth middleware
  const authResponse = await nextAuthMiddleware(request, event);

  if (authResponse) {
    // If NextAuth returns a response (like redirect), copy Supabase cookies to it
    supabaseResponse.headers.forEach((value, key) => {
      if (key.toLowerCase() === 'set-cookie') {
        authResponse.headers.append(key, value);
      }
    });
    return authResponse;
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/book-call",
    "/admin/:path*",
    "/todos",
  ],
};
