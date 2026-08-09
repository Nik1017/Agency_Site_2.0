import { getAdminOverviewStats } from "@/actions/bookings";
import { Users, CalendarDays, Hourglass, CheckCircle2 } from "lucide-react";

export const revalidate = 0; // Bypass caches for direct admin data

export default async function AdminDashboardOverview() {
  const stats = await getAdminOverviewStats();

  const cards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      description: "Registered lead accounts",
      icon: Users,
      color: "from-blue-500/20 to-cyan-500/10",
      glowColor: "shadow-blue-500/10",
    },
    {
      title: "Total Bookings",
      value: stats.totalBookings,
      description: "Scheduled video conferences",
      icon: CalendarDays,
      color: "from-purple-500/20 to-pink-500/10",
      glowColor: "shadow-purple-500/10",
    },
    {
      title: "Upcoming Calls",
      value: stats.upcomingCalls,
      description: "Pending strategy calls",
      icon: Hourglass,
      color: "from-amber-500/20 to-orange-500/10",
      glowColor: "shadow-amber-500/10",
    },
    {
      title: "Completed Calls",
      value: stats.completedCalls,
      description: "Successful consultations",
      icon: CheckCircle2,
      color: "from-emerald-500/20 to-teal-500/10",
      glowColor: "shadow-emerald-500/10",
    },
  ];

  return (
    <div className="space-y-10 animate-fade-in">
      
      {/* Page Title */}
      <div>
        <span className="text-xs uppercase font-space font-bold tracking-widest text-primary mb-2 block">
          Admin Portal
        </span>
        <h1 className="text-3xl md:text-4xl font-sans font-black tracking-tighter uppercase text-white leading-none">
          Dashboard Overview
        </h1>
      </div>

      {/* Grid of Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className={`glass rounded-2xl p-6 border-white/5 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${card.glowColor}`}
            >
              {/* Background gradient block */}
              <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-20 -z-10`} />
              
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-[10px] uppercase font-bold font-space tracking-widest text-muted-custom/60 block mb-1">
                    {card.title}
                  </span>
                  <span className="text-4xl font-sans font-black text-white">
                    {card.value}
                  </span>
                </div>
                <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
              </div>
              <p className="text-xs text-muted-custom/60 font-semibold font-space">
                {card.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Decorative details */}
      <div className="glass rounded-3xl p-8 border-white/5 relative overflow-hidden blue-glow">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <h3 className="text-lg font-space font-bold uppercase tracking-wider mb-2">
          Platform Activity Monitor
        </h3>
        <p className="text-xs text-muted-custom/70 leading-relaxed max-w-2xl">
          Authentication handles role distribution on successful login callback. Only users listed inside the admin registry can reach these administrative paths. Database integrations are active through PostgreSQL connection pools on Neon.
        </p>
      </div>

    </div>
  );
}
