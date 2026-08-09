import { auth } from "@/auth";
import { NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/middleware";

export default async function middleware(
  request: NextRequest,
  event: any
) {
  const supabaseResponse = createClient(request);

  const authResponse = await (auth as any)(request);

  if (authResponse instanceof Response) {
    supabaseResponse.headers.forEach((value: string, key: string) => {
      if (key.toLowerCase() === "set-cookie") {
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