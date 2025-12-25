
import { Bell, Menu, LogOut, User as UserIcon, Search, Settings as SettingsIcon, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthStore } from "@/store/useAuthStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface HeaderProps {
  onMenuToggle: () => void;
}

export const Header = ({ onMenuToggle }: HeaderProps) => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) return null;

  return (
    <header className="glass border-b border-slate-200/50 px-4 lg:px-8 h-20 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-6 flex-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuToggle}
          className="lg:hidden hover:bg-slate-100 rounded-xl"
        >
          <Menu className="h-5 w-5 text-slate-600" />
        </Button>

        {/* Search Bar */}
        <div className="hidden md:flex items-center relative max-w-md w-full group">
          <Search className="absolute left-3 h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
          <Input
            placeholder="Search properties, tenants, or requests..."
            className="pl-10 bg-slate-100/50 border-none focus-visible:ring-2 focus-visible:ring-blue-500/20 rounded-xl h-11 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-6">
        <div className="hidden sm:flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative hover:bg-slate-100 rounded-xl group">
            <Bell className="h-5 w-5 text-slate-500 group-hover:text-blue-600 transition-colors" />
            <span className="absolute top-2.5 right-2.5 bg-blue-600 text-white text-[8px] font-bold rounded-full h-4 w-4 flex items-center justify-center border-2 border-white shadow-sm">
              3
            </span>
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-slate-100 rounded-xl group" onClick={() => navigate('/settings')}>
            <SettingsIcon className="h-5 w-5 text-slate-500 group-hover:text-blue-600 transition-colors" />
          </Button>
        </div>

        <div className="h-8 w-[1px] bg-slate-200 hidden sm:block" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-3 px-2 hover:bg-slate-100 rounded-2xl transition-all">
              <div className="relative">
                <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" />
              </div>
              <div className="text-left hidden lg:block">
                <div className="text-sm font-bold text-slate-900 leading-none">{user.name}</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">{user.role}</div>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64 p-2 rounded-2xl border-slate-200/50 shadow-xl">
            <DropdownMenuLabel className="px-3 py-2">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">My Account</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-100" />
            <DropdownMenuItem onClick={() => navigate('/profile')} className="rounded-xl py-2.5 cursor-pointer focus:bg-blue-50 focus:text-blue-600">
              <UserIcon className="mr-3 h-4 w-4" />
              <span className="font-medium">Profile Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/billing')} className="rounded-xl py-2.5 cursor-pointer focus:bg-blue-50 focus:text-blue-600">
              <CreditCard className="mr-3 h-4 w-4" />
              <span className="font-medium">Billing & Plans</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-slate-100" />
            <DropdownMenuItem onClick={handleLogout} className="rounded-xl py-2.5 cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-600">
              <LogOut className="mr-3 h-4 w-4" />
              <span className="font-medium">Sign Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
