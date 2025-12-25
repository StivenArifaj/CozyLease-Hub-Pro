
import { NavLink, useNavigate } from "react-router-dom";
import {
  Home,
  Building,
  Users,
  FileText,
  CreditCard,
  Wrench,
  BarChart3,
  Settings,
  User,
  LogOut,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  isOpen: boolean;
}

export const Sidebar = ({ isOpen }: SidebarProps) => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const userRole = user?.role || 'landlord';

  const landlordNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/dashboard' },
    { id: 'properties', label: 'Properties', icon: Building, path: '/properties' },
    { id: 'tenants', label: 'Tenants', icon: Users, path: '/tenants' },
    { id: 'leases', label: 'Leases', icon: FileText, path: '/leases' },
    { id: 'payments', label: 'Payments', icon: CreditCard, path: '/payments' },
    { id: 'maintenance', label: 'Maintenance', icon: Wrench, path: '/maintenance' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, path: '/analytics' },
  ];

  const tenantNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/dashboard' },
    { id: 'lease', label: 'My Lease', icon: FileText, path: '/lease' },
    { id: 'payments', label: 'Payments', icon: CreditCard, path: '/payments' },
    { id: 'maintenance', label: 'Maintenance', icon: Wrench, path: '/maintenance' },
  ];

  const navItems = userRole === 'landlord' ? landlordNavItems : tenantNavItems;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <aside className={cn(
      "fixed inset-y-0 left-0 z-50 bg-slate-950 text-slate-300 w-64 min-h-screen transition-all duration-300 ease-in-out lg:translate-x-0 border-r border-slate-800/50 shadow-2xl",
      isOpen ? "translate-x-0" : "-translate-x-full"
    )}>
      <div className="flex flex-col h-full">
        {/* Branding */}
        <div className="p-8">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300">
              <Building className="text-white h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">CozyLease</h1>
              <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">Hub Pro</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
          <p className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4 mt-2">Main Menu</p>
          {navItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <NavLink
                  to={item.path}
                  className={({ isActive }) => cn(
                    "group flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300",
                    isActive
                      ? "bg-blue-600/10 text-blue-400 shadow-[inset_0_0_0_1px_rgba(37,99,235,0.2)]"
                      : "hover:bg-slate-900 hover:text-white"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={cn(
                      "h-5 w-5 transition-colors duration-300",
                      "group-hover:text-blue-400"
                    )} />
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight className={cn(
                    "h-4 w-4 opacity-0 -translate-x-2 transition-all duration-300",
                    "group-hover:opacity-100 group-hover:translate-x-0"
                  )} />
                </NavLink>
              </motion.div>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="p-4 mt-auto">
          <div className="bg-slate-900/50 rounded-2xl p-4 border border-slate-800/50 mb-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-xs font-bold text-white">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-white truncate">{user?.name}</p>
                <p className="text-[10px] text-slate-500 truncate capitalize">{user?.role}</p>
              </div>
            </div>
            <NavLink
              to="/profile"
              className="flex items-center gap-2 text-[10px] font-bold text-blue-500 hover:text-blue-400 transition-colors uppercase tracking-wider"
            >
              <User className="h-3 w-3" />
              View Profile
            </NavLink>
          </div>

          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full justify-start gap-3 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl px-4 py-6 transition-all duration-300"
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Sign Out</span>
          </Button>
        </div>
      </div>
    </aside>
  );
};
