import Link from "next/link";
import BackgroundEffects from "@/components/BackgroundEffects";
import { LayoutDashboard, Users, Calendar, BarChart3, LogOut, ArrowLeft } from "lucide-react";
import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import { BRAND_PART1, BRAND_PART2 } from "@/config/branding";


export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Triple check server-side for admin status (middleware also checks this, but this protects layouts/actions natively)
  const session = await auth();
  console.log("SESSION:", session);
  console.log("ROLE:", session?.user?.role);
  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/");
  }

  const handleSignOut = async () => {
    "use server";
    await signOut({ redirectTo: "/" });
  };

  const menuItems = [
    {
      name: "Overview",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Users",
      href: "/admin/users",
      icon: Users,
    },
    {
      name: "Bookings",
      href: "/admin/bookings",
      icon: Calendar,
    },
    {
      name: "Analytics",
      href: "/admin/analytics",
      icon: BarChart3,
    },
  ];

  return (
    <div className="relative min-h-screen bg-background text-white font-sans flex flex-col md:flex-row overflow-hidden">
      <BackgroundEffects />

      {/* Sidebar Navigation */}
      <aside className="relative z-20 w-full md:w-64 bg-[#050505] md:bg-transparent border-b md:border-b-0 md:border-r border-white/5 flex flex-col p-6 shrink-0">

        {/* Brand Header */}
        <div className="flex items-center justify-between md:justify-start gap-1 mb-8">
          <Link href="/" className="flex items-center gap-1 font-space text-lg font-black tracking-tighter text-white">
            {BRAND_PART1}<span className="font-serif-italic italic font-normal text-primary">{BRAND_PART2}</span>
          </Link>

          <span className="text-[10px] uppercase font-bold font-space bg-primary/20 text-primary border border-primary/30 px-2 py-0.5 rounded-full">
            Admin
          </span>
        </div>

        {/* Menu Links */}
        <nav className="flex md:flex-col gap-2 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 scrollbar-none">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 text-sm font-semibold uppercase tracking-wider text-muted-custom/75 hover:text-white hover:bg-white/5 rounded-2xl transition-all duration-200 shrink-0 font-space"
              >
                <Icon className="w-4 h-4 text-primary" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex flex-col gap-3 mt-auto pt-6 border-t border-white/5">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-widest text-muted-custom/50 hover:text-white transition-colors duration-200 font-space"
          >
            <ArrowLeft className="w-3 h-3" />
            Home Site
          </Link>
          <form action={handleSignOut}>
            <button
              type="submit"
              className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-widest text-red-400/70 hover:text-red-400 transition-colors duration-200 font-space"
            >
              <LogOut className="w-3 h-3" />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Panel Content */}
      <main className="relative z-10 flex-grow p-6 md:p-10 overflow-y-auto max-h-screen">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
