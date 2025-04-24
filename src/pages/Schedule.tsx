import React, { useState } from "react";
import { Calendar as BigCalendar } from "react-big-calendar";
import { dateFnsLocalizer } from 'react-big-calendar'; // Remove 'import type'
import { Plus, Filter, Download } from "lucide-react";
import { AddClassForm } from "@/components/forms/AddClassForm";
import { format, parse, startOfWeek, getDay } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { arSA } from 'date-fns/locale/ar-SA';
import type { Calendar } from 'react-big-calendar';

const locales = {
  'ar-SA': arSA,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// Mock events data
const events = [
  {
    id: 1,
    title: "الرياضيات - الصف التاسع (أ)",
    start: new Date(2024, 3, 23, 8, 0),
    end: new Date(2024, 3, 23, 9, 30),
    resourceId: 1,
  },
  {
    id: 2,
    title: "العلوم - الصف العاشر (ب)",
    start: new Date(2024, 3, 23, 10, 0),
    end: new Date(2024, 3, 23, 11, 30),
    resourceId: 2,
  },
  {
    id: 3,
    title: "اللغة العربية - الصف الثامن (ج)",
    start: new Date(2024, 3, 23, 12, 0),
    end: new Date(2024, 3, 23, 13, 30),
    resourceId: 3,
  },
];

export default function Schedule() {
  const [view, setView] = useState<"month" | "week" | "day">("week");
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div className="animate-fade-in space-y-6" dir="rtl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">الجدول الدراسي</h1>
          <p className="text-muted-foreground">إدارة وتنظيم الحصص الدراسية</p>
        </div>
        <button 
          className="btn-primary flex items-center gap-2"
          onClick={() => setShowAddForm(true)}
        >
          <Plus size={16} /> إضافة حصة جديدة
        </button>
      </div>

      <AddClassForm open={showAddForm} onOpenChange={setShowAddForm} />
      
      <div className="glass-card p-4 flex flex-wrap gap-4 justify-between items-center">
        <div className="flex gap-4">
          <button className="flex items-center gap-2 border rounded-md py-2 px-3 hover:bg-accent">
            <Filter size={16} /> تصفية
          </button>
          <button className="flex items-center gap-2 border rounded-md py-2 px-3 hover:bg-accent">
            <Download size={16} /> تصدير
          </button>
        </div>
        <div>
          <select 
            className="py-2 px-3 rounded-md border bg-background"
            value={view}
            onChange={(e) => setView(e.target.value as "month" | "week" | "day")}
          >
            <option value="day">اليوم</option>
            <option value="week">الأسبوع</option>
            <option value="month">الشهر</option>
          </select>
        </div>
      </div>

      <div className="glass-card p-6" style={{ height: "700px" }}>
        <BigCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          culture="ar-SA"
          view={view}
          onView={(newView) => setView(newView as "month" | "week" | "day")}
          messages={{
            week: 'الأسبوع',
            day: 'اليوم',
            month: 'الشهر',
            previous: 'السابق',
            next: 'التالي',
            today: 'اليوم',
            agenda: 'جدول الأعمال',
          }}
          className="h-full"
        />
      </div>
    </div>
  );
}
