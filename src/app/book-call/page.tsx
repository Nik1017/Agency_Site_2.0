"use client";

import {useState} from "react";
import { signOut, useSession } from "next-auth/react";
import { createBookingAction } from "@/actions/bookings";
import BackgroundEffects from "@/components/BackgroundEffects";
import Link from "next/link";
import { LogOut, Calendar, CheckCircle2, Loader2 } from "lucide-react";

import Cal from "@calcom/embed-react";

export default function BookCallPage() {
  const { data: session, status } = useSession();
  const [bookingSaved, setBookingSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [meetingDetails, setMeetingDetails] = useState<{
    id: string;
    time: string;
  } | null>(null);

  if (status === "loading") {
    return (
      <div className="relative min-h-screen flex items-center justify-center bg-background text-white">
        <BackgroundEffects />
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
          <span className="text-xs uppercase font-space tracking-widest text-muted-custom/75">
            Loading session...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-background text-white font-sans flex flex-col">
      <BackgroundEffects />

      {/* Header bar */}
      <header className="relative z-20 w-full max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-1 font-space text-lg font-black tracking-tighter text-white"
        >
          Edify
          <span className="font-serif-italic italic font-normal text-primary">
            Grow
          </span>
        </Link>

        {session?.user && (
          <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
            {session.user.image && (
              <img
                src={session.user.image}
                alt={session.user.name || "User"}
                className="w-6 h-6 rounded-full border border-white/20"
              />
            )}
            <span className="text-xs font-semibold text-white max-w-[120px] truncate">
              {session.user.name || session.user.email}
            </span>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="text-muted-custom hover:text-white transition-colors duration-200"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-grow max-w-5xl w-full mx-auto px-6 pb-12 flex flex-col justify-center">
        {bookingSaved ? (
          /* Booking Success Display */
          <div className="glass rounded-3xl p-10 max-w-xl mx-auto text-center border-white/5 shadow-2xl blue-glow animate-pulse-slow">
            <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-6" />
            <h1 className="text-3xl font-bold tracking-tight uppercase font-space mb-3 text-white">
              Meeting Scheduled!
            </h1>
            <p className="text-sm text-muted-custom/85 mb-8 leading-relaxed">
              Your strategy call has been successfully booked and logged in our
              system. We have sent a calendar invitation with meeting links to
              your email.
            </p>

            {meetingDetails && (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 text-left">
                <div className="flex items-start gap-4">
                  <Calendar className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <span className="text-xs uppercase tracking-widest text-muted-custom/60 font-semibold font-space block mb-1">
                      Time Slot
                    </span>
                    <span className="text-sm font-semibold text-white">
                      {meetingDetails.time}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <Link
              href="/"
              className="relative inline-flex items-center justify-center p-[2px] overflow-hidden rounded-full group cursor-pointer transition-all duration-300"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary to-glow rounded-full opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative px-8 py-3.5 font-space font-bold uppercase tracking-wider text-xs text-white bg-[#050505] rounded-full transition-all duration-200 group-hover:bg-opacity-0">
                Return Home
              </span>
            </Link>
          </div>
        ) : (
          /* Booking Form */
          <div className="flex flex-col items-center">
            <div className="text-center max-w-2xl mb-8">
              <span className="text-xs uppercase font-space font-bold tracking-widest text-primary mb-3 block">
                Scheduling Dashboard
              </span>
              <h1 className="text-4xl md:text-5xl font-sans font-black tracking-tighter uppercase text-white leading-none mb-4">
                Book your strategy{" "}
                <span className="font-serif-italic italic font-normal text-muted-custom/75 lowercase">
                  call
                </span>
              </h1>
              <p className="text-sm text-muted-custom/70">
                Select a convenient date and time slot from the schedule below
                to align with our growth architects.
              </p>
            </div>

            {isSaving && (
              <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                <div className="glass p-8 rounded-2xl flex items-center gap-4 border border-white/10 max-w-xs text-center flex-col">
                  <Loader2 className="w-8 h-8 text-primary animate-spin" />
                  <span className="text-xs uppercase tracking-widest font-space text-white">
                    Persisting booking...
                  </span>
                </div>
              </div>
            )}

            {/* Embedded Cal.com Widget Container */}
            <div className="w-full glass rounded-3xl p-4 md:p-6 border-white/5 relative blue-glow min-h-[680px]">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <Cal
                calLink="nikhil-chandrakar-uagjty/30min"
                style={{
                  width: "100%",
                  height: "650px",
                  overflow: "scroll",
                }}
                config={{
                  theme: "dark",
                }}
              />
            </div>
          </div>
        )}
      </main>

      {/* Footer disclaimer */}
      <footer className="relative z-10 w-full text-center py-6 border-t border-white/5">
        <span className="text-[10px] uppercase font-space font-medium tracking-widest text-muted-custom/30">
          Powered by EdifyGrow Scheduler & Cal.com
        </span>
      </footer>
    </div>
  );
}
