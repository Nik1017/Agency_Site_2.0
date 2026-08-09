import { getAdminUsers } from "@/actions/bookings";
import { User, Shield } from "lucide-react";

export const revalidate = 0;

export default async function AdminUsersPage() {
  const users = await getAdminUsers();

  return (
    <div className="space-y-10">
      
      {/* Title */}
      <div>
        <span className="text-xs uppercase font-space font-bold tracking-widest text-primary mb-2 block">
          Lead Registry
        </span>
        <h1 className="text-3xl md:text-4xl font-sans font-black tracking-tighter uppercase text-white leading-none">
          Registered Users
        </h1>
      </div>

      {/* Users Table Container */}
      <div className="glass rounded-3xl overflow-hidden border-white/5 relative blue-glow">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02] text-xs font-bold uppercase tracking-wider text-muted-custom/60 font-space">
                <th className="py-5 px-6">User</th>
                <th className="py-5 px-6">Email Address</th>
                <th className="py-5 px-6 text-center">System Role</th>
                <th className="py-5 px-6 text-right">Join Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {users.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-10 text-muted-custom/65 font-space text-xs uppercase tracking-widest">
                    No registered users found
                  </td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u.id} className="hover:bg-white/[0.01] transition-colors duration-150">
                    {/* User profile details */}
                    <td className="py-4 px-6 flex items-center gap-3">
                      {u.image ? (
                        <img 
                          src={u.image} 
                          alt={u.name || "Avatar"} 
                          className="w-8 h-8 rounded-full border border-white/10"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                          <User className="w-4 h-4 text-primary" />
                        </div>
                      )}
                      <span className="font-semibold text-white">
                        {u.name || "Guest Account"}
                      </span>
                    </td>
                    
                    {/* Email */}
                    <td className="py-4 px-6 text-muted-custom/80 font-medium">
                      {u.email}
                    </td>
                    
                    {/* Role badge */}
                    <td className="py-4 px-6 text-center">
                      <span 
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold font-space tracking-wider uppercase border ${
                          u.role === "ADMIN" 
                            ? "bg-primary/10 text-primary border-primary/20" 
                            : "bg-white/5 text-muted-custom/80 border-white/10"
                        }`}
                      >
                        {u.role === "ADMIN" && <Shield className="w-3 h-3" />}
                        {u.role}
                      </span>
                    </td>
                    
                    {/* Join date */}
                    <td className="py-4 px-6 text-right text-muted-custom/60 font-semibold font-space text-xs">
                      {new Date(u.createdAt).toLocaleDateString("en-US", {
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
