import { getAdminAnalytics } from "@/actions/bookings";
import { TrendingUp, Users, Target, CalendarRange, Percent } from "lucide-react";

export const revalidate = 0;

export default async function AdminAnalyticsPage() {
  const analytics = await getAdminAnalytics();

  const metrics = [
    {
      title: "Lead Acquisition",
      total: analytics.totalLeads,
      monthly: analytics.monthlyLeads,
      description: "Total registrations & new contacts this month",
      icon: Users,
    },
    {
      title: "Strategy Bookings",
      total: analytics.totalBookings,
      monthly: analytics.monthlyBookings,
      description: "Total scheduled meetings & new meetings this month",
      icon: CalendarRange,
    },
  ];

  return (
    <div className="space-y-10">
      
      {/* Title */}
      <div>
        <span className="text-xs uppercase font-space font-bold tracking-widest text-primary mb-2 block">
          Performance Indicators
        </span>
        <h1 className="text-3xl md:text-4xl font-sans font-black tracking-tighter uppercase text-white leading-none">
          Analytics & Leads
        </h1>
      </div>

      {/* Conversion Rate Highlight */}
      <div className="glass rounded-3xl p-8 border-white/5 relative overflow-hidden blue-glow flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-30 -z-10" />

        <div className="space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold font-space tracking-wider uppercase border bg-primary/20 text-primary border-primary/30">
            <Target className="w-3.5 h-3.5" />
            Conversion Performance
          </span>
          <h2 className="text-2xl md:text-3xl font-space font-bold uppercase tracking-wider text-white">
            Lead-To-Booking Ratio
          </h2>
          <p className="text-xs text-muted-custom/75 max-w-xl">
            This metric calculates the ratio of user registrations (leads generated via Google Login) who have completed at least one successful strategy call booking in the system.
          </p>
        </div>

        {/* Large Conversion Rate Display */}
        <div className="relative shrink-0 flex items-center justify-center p-6 bg-white/5 border border-white/10 rounded-2xl w-40 h-40">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/25 to-pink-500/10 opacity-30 blur-[2px] rounded-2xl" />
          <div className="text-center z-10 flex flex-col items-center">
            <span className="text-5xl font-sans font-black tracking-tighter text-white flex items-center">
              {analytics.conversionRate}
              <Percent className="w-6 h-6 text-primary" />
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-muted-custom/60 font-space mt-2">
              Conversion
            </span>
          </div>
        </div>
      </div>

      {/* Leads & Bookings Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div 
              key={metric.title} 
              className="glass rounded-3xl p-8 border-white/5 relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/5"
            >
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-space font-bold uppercase tracking-wider">
                  {metric.title}
                </h3>
                <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                  <span className="text-[10px] uppercase font-bold font-space tracking-widest text-muted-custom/50 block mb-1">
                    All-Time
                  </span>
                  <span className="text-4xl font-sans font-black text-white">
                    {metric.total}
                  </span>
                </div>
                
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                  <span className="text-[10px] uppercase font-bold font-space tracking-widest text-muted-custom/50 block mb-1">
                    This Month
                  </span>
                  <span className="text-4xl font-sans font-black text-white flex items-center gap-2">
                    {metric.monthly}
                    {metric.monthly > 0 && (
                      <TrendingUp className="w-5 h-5 text-emerald-400" />
                    )}
                  </span>
                </div>
              </div>

              <p className="text-xs text-muted-custom/60 leading-relaxed font-semibold font-space">
                {metric.description}
              </p>
            </div>
          );
        })}
      </div>

    </div>
  );
}
