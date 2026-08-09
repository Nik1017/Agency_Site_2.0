import { getAdminBookings } from "@/actions/bookings";
import { Calendar, Video, Clock } from "lucide-react";

export const revalidate = 0;

export default async function AdminBookingsPage() {
  const bookings = await getAdminBookings();

  return (
    <div className="space-y-10">
      
      {/* Title */}
      <div>
        <span className="text-xs uppercase font-space font-bold tracking-widest text-primary mb-2 block">
          Meeting Log
        </span>
        <h1 className="text-3xl md:text-4xl font-sans font-black tracking-tighter uppercase text-white leading-none">
          Strategy Call Bookings
        </h1>
      </div>

      {/* Bookings Table Container */}
      <div className="glass rounded-3xl overflow-hidden border-white/5 relative blue-glow">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02] text-xs font-bold uppercase tracking-wider text-muted-custom/60 font-space">
                <th className="py-5 px-6">User</th>
                <th className="py-5 px-6">Email Address</th>
                <th className="py-5 px-6">Meeting Time</th>
                <th className="py-5 px-6 text-center">Status</th>
                <th className="py-5 px-6 text-right">Logged At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-muted-custom/65 font-space text-xs uppercase tracking-widest">
                    No booking records found
                  </td>
                </tr>
              ) : (
                bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-white/[0.01] transition-colors duration-150">
                    {/* User profile details */}
                    <td className="py-4 px-6">
                      <span className="font-semibold text-white">
                        {b.user?.name || "Guest Account"}
                      </span>
                    </td>
                    
                    {/* Email */}
                    <td className="py-4 px-6 text-muted-custom/80 font-medium">
                      {b.user?.email || "Unknown Email"}
                    </td>

                    {/* Meeting Time */}
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className="font-semibold text-white flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-primary" />
                          {new Date(b.meetingTime).toLocaleDateString("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                            year: "numeric"
                          })}
                        </span>
                        <span className="text-xs text-muted-custom/60 font-medium font-space flex items-center gap-1.5 mt-0.5 pl-5">
                          <Clock className="w-3.5 h-3.5 text-muted-custom/40" />
                          {new Date(b.meetingTime).toLocaleTimeString("en-US", {
                            hour: "numeric",
                            minute: "2-digit"
                          })}
                        </span>
                      </div>
                    </td>
                    
                    {/* Status badge */}
                    <td className="py-4 px-6 text-center">
                      <span 
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold font-space tracking-wider uppercase border ${
                          b.status.toLowerCase() === "scheduled"
                            ? "bg-primary/10 text-primary border-primary/20"
                            : b.status.toLowerCase() === "completed"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : "bg-white/5 text-muted-custom/80 border-white/10"
                        }`}
                      >
                        <Video className="w-3 h-3" />
                        {b.status}
                      </span>
                    </td>
                    
                    {/* Created date */}
                    <td className="py-4 px-6 text-right text-muted-custom/60 font-semibold font-space text-xs">
                      {new Date(b.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric"
                      })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
