
import React, { useState } from "react";
import { Search, Download, Calendar, Check, X } from "lucide-react";

// Mock data for attendance
const ATTENDANCE_DATA = [
  {
    id: 1,
    name: "أحمد محمد",
    class: "الصف التاسع (أ)",
    date: "2024-04-23",
    status: "present",
    arrivalTime: "07:45",
    note: ""
  },
  {
    id: 2,
    name: "سارة خالد",
    class: "الصف العاشر (ب)",
    date: "2024-04-23",
    status: "absent",
    arrivalTime: "-",
    note: "إجازة مرضية"
  },
  {
    id: 3,
    name: "عمر أحمد",
    class: "الصف الثامن (ج)",
    date: "2024-04-23",
    status: "late",
    arrivalTime: "08:15",
    note: "تأخر 15 دقيقة"
  }
];

export default function Attendance() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("الكل");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "present":
        return "text-green-500 bg-green-50";
      case "absent":
        return "text-red-500 bg-red-50";
      case "late":
        return "text-yellow-500 bg-yellow-50";
      default:
        return "";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "present":
        return "حاضر";
      case "absent":
        return "غائب";
      case "late":
        return "متأخر";
      default:
        return "";
    }
  };

  return (
    <div className="animate-fade-in space-y-6" dir="rtl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">سجل الحضور والغياب</h1>
          <p className="text-muted-foreground">متابعة حضور الطلاب</p>
        </div>
        <button className="flex items-center gap-2 border rounded-md py-2 px-4 hover:bg-accent">
          <Calendar size={16} />
          23 أبريل 2024
        </button>
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
                <th className="text-right p-4">الحالة</th>
                <th className="text-right p-4">وقت الحضور</th>
                <th className="text-right p-4">ملاحظات</th>
                <th className="text-right p-4">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {ATTENDANCE_DATA.map((student) => (
                <tr key={student.id} className="border-b hover:bg-muted/50">
                  <td className="p-4">{student.name}</td>
                  <td className="p-4">{student.class}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(student.status)}`}>
                      {getStatusText(student.status)}
                    </span>
                  </td>
                  <td className="p-4">{student.arrivalTime}</td>
                  <td className="p-4">{student.note}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1 rounded-full hover:bg-green-100 text-green-600">
                        <Check size={18} />
                      </button>
                      <button className="p-1 rounded-full hover:bg-red-100 text-red-600">
                        <X size={18} />
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
