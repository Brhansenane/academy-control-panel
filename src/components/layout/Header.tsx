
import React from "react";
import { Bell, Moon, Search, Sun, User } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

export function Header() {
  const { theme, setTheme } = useTheme();

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

      <div className="flex items-center space-x-4">
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
        <button className="flex items-center space-x-2 rounded-full hover:bg-accent p-1">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <User size={16} />
          </div>
        </button>
      </div>
    </header>
  );
}
