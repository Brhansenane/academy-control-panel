
import React, { useState } from "react";
import { Bell, LogOut, Moon, Search, Settings, Sun, User } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { useAuth } from "@/context/AuthContext";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

export function Header() {
  const { theme, setTheme } = useTheme();
  const { user, profile, signOut } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="h-16 px-4 border-b bg-background/95 backdrop-blur-sm flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center">
        <div className="relative md:w-64 hidden md:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input
            type="search"
            placeholder="بحث..."
            className="pl-10 pr-4 py-2 w-full rounded-md border bg-background text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            dir="rtl"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 rounded-full hover:bg-accent"
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button className="p-2 rounded-full hover:bg-accent relative">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-full hover:bg-accent p-1">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                {profile?.avatar_url ? (
                  <img 
                    src={profile.avatar_url} 
                    alt={`${profile.first_name} ${profile.last_name}`} 
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <User size={16} />
                )}
              </div>
              <div className="text-sm font-medium hidden md:block">
                {profile?.first_name} {profile?.last_name}
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="px-2 py-1.5 text-sm">
              <p className="font-medium">{profile?.first_name} {profile?.last_name}</p>
              <p className="text-muted-foreground text-xs mt-0.5">{profile?.email}</p>
              <p className="text-muted-foreground text-xs mt-0.5 capitalize">
                {profile?.role === 'admin' && 'مسؤول' || profile?.role === 'teacher' && 'معلم' || profile?.role === 'student' && 'طالب'}
              </p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/settings" className="cursor-pointer flex w-full items-center">
                <Settings size={16} className="mr-2" />
                <span>الإعدادات</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={signOut} className="text-red-600 focus:text-red-600 cursor-pointer">
              <LogOut size={16} className="mr-2" />
              <span>تسجيل الخروج</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
