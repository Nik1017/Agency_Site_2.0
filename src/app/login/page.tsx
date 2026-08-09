import { signIn } from "@/auth";
import BackgroundEffects from "@/components/BackgroundEffects";
import { Chrome } from "lucide-react";
import Link from "next/link";
import { BRAND_PART1, BRAND_PART2 } from "@/config/branding";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function LoginPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const callbackUrl = (resolvedSearchParams.callbackUrl as string) || "/book-call";

  const handleSignIn = async () => {
    "use server";
    await signIn("google", { redirectTo: callbackUrl });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-background text-white overflow-hidden font-sans">
      <BackgroundEffects />

      {/* Decorative Glowing Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-glow/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Login Card Container */}
      <div className="relative z-10 w-full max-w-md p-8 mx-4">
        <div className="glass rounded-3xl p-10 flex flex-col items-center text-center blue-glow relative overflow-hidden">
          {/* Subtle top light reflection */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-1 font-space text-2xl font-black tracking-tighter mb-8 cursor-pointer text-white"
          >
            {BRAND_PART1}<span className="font-serif-italic italic font-normal text-primary">{BRAND_PART2}</span>
          </Link>

          <h1 className="text-3xl font-bold tracking-tight mb-2 uppercase font-space">
            Welcome Back
          </h1>
          
          <p className="text-xs text-muted-custom/75 mb-8 max-w-[280px]">
            Please sign in to schedule and manage your Strategy Call.
          </p>

          {/* Google Sign In Button */}
          <form action={handleSignIn} className="w-full">
            <button
              type="submit"
              className="relative w-full inline-flex items-center justify-center p-[2px] overflow-hidden rounded-full group cursor-pointer transition-all duration-300 active:scale-98 shadow-xl"
            >
              {/* Spinning / Glowing border */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary via-[#1E6FFF] to-accent-gold rounded-full opacity-90 group-hover:opacity-100 transition-opacity duration-300 blur-[1px]" />
              
              <span className="relative w-full flex items-center justify-center gap-3 px-8 py-4 font-space font-bold uppercase tracking-wider text-xs text-white bg-[#050505] rounded-full transition-all duration-200 group-hover:bg-opacity-0">
                {/* SVG Google Icon */}
                <svg className="w-4 h-4 fill-current text-white transition-colors duration-200" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                </svg>
                Sign in with Google
              </span>
            </button>
          </form>

          {/* Secure disclaimer */}
          <span className="text-[10px] uppercase font-space font-medium tracking-widest text-muted-custom/40 mt-10">
            Secure Authentication via Google OAuth
          </span>
        </div>

        {/* Back Link */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-xs uppercase font-space font-bold tracking-widest text-muted-custom/60 hover:text-white transition-colors duration-200"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
