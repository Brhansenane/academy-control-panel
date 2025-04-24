
import React, { useState } from "react";
import { Search, Download, Filter } from "lucide-react";

// Mock data for grades
const GRADES_DATA = [
  {
    id: 1,
    studentName: "أحمد محمد",
    class: "الصف التاسع (أ)",
    subject: "الرياضيات",
    grade: 95,
    date: "2024-04-23",
    status: "ممتاز"
  },
  {
    id: 2,
    studentName: "سارة خالد",
    class: "الصف العاشر (ب)",
    subject: "العلوم",
    grade: 88,
    date: "2024-04-23",
    status: "جيد جداً"
  },
  {
    id: 3,
    studentName: "عمر أحمد",
    class: "الصف الثامن (ج)",
    subject: "اللغة العربية",
    grade: 75,
    date: "2024-04-23",
    status: "جيد"
  }
];

export default function Grades() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("الكل");

  const getGradeColor = (grade: number) => {
    if (grade >= 90) return "text-green-500 bg-green-50";
    if (grade >= 80) return "text-blue-500 bg-blue-50";
    if (grade >= 70) return "text-yellow-500 bg-yellow-50";
    return "text-red-500 bg-red-50";
  };

  return (
    <div className="animate-fade-in space-y-6" dir="rtl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">الدرجات والتقييمات</h1>
          <p className="text-muted-foreground">متابعة درجات وتقييمات الطلاب</p>
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
              <Filter size={16} /> تصفية
            </button>
            <button className="flex items-center gap-2 border rounded-md py-2 px-3 hover:bg-accent">
              <Download size={16} /> تصدير التقرير
            </button>
          </div>
        </div>
      </div>

      {/* Grades Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-right p-4">الطالب</th>
                <th className="text-right p-4">الفصل</th>
                <th className="text-right p-4">المادة</th>
                <th className="text-right p-4">الدرجة</th>
                <th className="text-right p-4">التاريخ</th>
                <th className="text-right p-4">التقييم</th>
              </tr>
            </thead>
            <tbody>
              {GRADES_DATA.map((item) => (
                <tr key={item.id} className="border-b hover:bg-muted/50">
                  <td className="p-4">{item.studentName}</td>
                  <td className="p-4">{item.class}</td>
                  <td className="p-4">{item.subject}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getGradeColor(item.grade)}`}>
                      {item.grade}
                    </span>
                  </td>
                  <td className="p-4">{item.date}</td>
                  <td className="p-4">{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
