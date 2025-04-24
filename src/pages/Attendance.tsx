
import React, { useState } from "react";
import { Search, Filter, Download, Check, X } from "lucide-react";

// Mock attendance data
const ATTENDANCE_DATA = [
  {
    id: 1,
    studentName: "أحمد محمد",
    class: "الصف التاسع (أ)",
    date: "2024-04-24",
    status: "حاضر",
    time: "07:45 ص",
    notes: "حضور مبكر"
  },
  {
    id: 2,
    studentName: "سارة خالد",
    class: "الصف العاشر (ب)",
    date: "2024-04-24",
    status: "غائب",
    time: "-",
    notes: "إجازة مرضية"
  },
  {
    id: 3,
    studentName: "عمر أحمد",
    class: "الصف الثامن (ج)",
    date: "2024-04-24",
    status: "حاضر",
    time: "08:00 ص",
    notes: ""
  }
];

const getStatusColor = (status: string) => {
  return status === "حاضر" 
    ? "text-green-500 bg-green-50" 
    : "text-red-500 bg-red-50";
};

export default function Attendance() {
  const [selectedClass, setSelectedClass] = useState("الكل");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  
  return (
    <div className="animate-fade-in space-y-6" dir="rtl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">سجل الحضور</h1>
          <p className="text-muted-foreground">متابعة حضور وغياب الطلاب</p>
        </div>
      </div>

      {/* Filters */}
      <div className="glass-card p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="البحث عن طالب..."
                className="w-full pl-10 pr-4 py-2 rounded-md border bg-background"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <select 
              className="py-2 px-3 rounded-md border bg-background"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              <option value="الكل">جميع الفصول</option>
              <option value="الصف التاسع (أ)">الصف التاسع (أ)</option>
              <option value="الصف العاشر (ب)">الصف العاشر (ب)</option>
              <option value="الصف الثامن (ج)">الصف الثامن (ج)</option>
            </select>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="py-2 px-3 rounded-md border bg-background"
            />
            <button className="flex items-center gap-2 border rounded-md py-2 px-3 hover:bg-accent">
              <Filter size={16} /> تصفية
            </button>
            <button className="flex items-center gap-2 border rounded-md py-2 px-3 hover:bg-accent">
              <Download size={16} /> تصدير التقرير
            </button>
          </div>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-right p-4">الطالب</th>
                <th className="text-right p-4">الفصل</th>
                <th className="text-right p-4">التاريخ</th>
                <th className="text-right p-4">الحالة</th>
                <th className="text-right p-4">وقت الحضور</th>
                <th className="text-right p-4">ملاحظات</th>
                <th className="text-right p-4">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {ATTENDANCE_DATA.map((record) => (
                <tr key={record.id} className="border-b hover:bg-muted/50">
                  <td className="p-4">{record.studentName}</td>
                  <td className="p-4">{record.class}</td>
                  <td className="p-4">{record.date}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="p-4">{record.time}</td>
                  <td className="p-4">{record.notes || "-"}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button 
                        className="p-1 rounded-md hover:bg-green-100 text-green-600"
                        title="تسجيل حضور"
                      >
                        <Check size={16} />
                      </button>
                      <button 
                        className="p-1 rounded-md hover:bg-red-100 text-red-600"
                        title="تسجيل غياب"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
