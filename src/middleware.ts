import NextAuth from "next-auth";
import { authConfig } from "@/auth/auth.config";
import { NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/middleware";

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const supabaseResponse = createClient(req as NextRequest);

  return supabaseResponse;
});

export const config = {
  matcher: [
    "/book-call",
    "/admin/:path*",
    "/todos",
  ],
};