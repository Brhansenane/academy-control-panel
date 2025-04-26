
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BarChart,
  BookOpen,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  File,
  MessageSquare,
  Settings,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  isActive: boolean;
}

const SidebarItem = ({ icon, label, to, isActive }: SidebarItemProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "sidebar-item",
        isActive && "sidebar-item-active"
      )}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <aside
      className={cn(
        "bg-sidebar h-screen flex flex-col border-r transition-all duration-300",
        collapsed ? "w-[40px]" : "w-[260px]"
      )}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b">
        {!collapsed && (
          <h1 className="text-xl font-bold text-sidebar-foreground">المدرسة</h1>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-full hover:bg-sidebar-accent/30"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <div className="flex flex-col flex-1 p-3 space-y-1 overflow-y-auto">
        {!collapsed ? (
          <>
            <SidebarItem
              icon={<BarChart size={20} />}
              label="لوحة التحكم"
              to="/"
              isActive={isActive("/")}
            />
            <SidebarItem
              icon={<Users size={20} />}
              label="الطلاب"
              to="/students"
              isActive={isActive("/students")}
            />
            <SidebarItem
              icon={<BookOpen size={20} />}
              label="المدرسين"
              to="/teachers"
              isActive={isActive("/teachers")}
            />
            <SidebarItem
              icon={<CalendarDays size={20} />}
              label="الجدول الدراسي"
              to="/schedule"
              isActive={isActive("/schedule")}
            />
            <SidebarItem
              icon={<Clock size={20} />}
              label="الحضور والغياب"
              to="/attendance"
              isActive={isActive("/attendance")}
            />
            <SidebarItem
              icon={<File size={20} />}
              label="الدرجات"
              to="/grades"
              isActive={isActive("/grades")}
            />
            <SidebarItem
              icon={<MessageSquare size={20} />}
              label="الرسائل"
              to="/messages"
              isActive={isActive("/messages")}
            />
            <SidebarItem
              icon={<Settings size={20} />}
              label="الإعدادات"
              to="/settings"
              isActive={isActive("/settings")}
            />
          </>
        ) : (
          <>
            <div className="flex flex-col items-center space-y-4 pt-4">
              <Link
                to="/"
                className={cn(
                  "p-2 rounded-lg",
                  isActive("/") ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                )}
              >
                <BarChart size={24} />
              </Link>
              <Link
                to="/students"
                className={cn(
                  "p-2 rounded-lg",
                  isActive("/students") ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                )}
              >
                <Users size={24} />
              </Link>
              <Link
                to="/teachers"
                className={cn(
                  "p-2 rounded-lg",
                  isActive("/teachers") ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                )}
              >
                <BookOpen size={24} />
              </Link>
              <Link
                to="/schedule"
                className={cn(
                  "p-2 rounded-lg",
                  isActive("/schedule") ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                )}
              >
                <CalendarDays size={24} />
              </Link>
              <Link
                to="/attendance"
                className={cn(
                  "p-2 rounded-lg",
                  isActive("/attendance") ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                )}
              >
                <Clock size={24} />
              </Link>
              <Link
                to="/grades"
                className={cn(
                  "p-2 rounded-lg",
                  isActive("/grades") ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                )}
              >
                <File size={24} />
              </Link>
              <Link
                to="/messages"
                className={cn(
                  "p-2 rounded-lg",
                  isActive("/messages") ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                )}
              >
                <MessageSquare size={24} />
              </Link>
              <Link
                to="/settings"
                className={cn(
                  "p-2 rounded-lg",
                  isActive("/settings") ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                )}
              >
                <Settings size={24} />
              </Link>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}
