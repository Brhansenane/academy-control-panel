
import React, { useState } from "react";
import { 
  ChevronRight, 
  Download, 
  Edit, 
  FileText,
  MoreHorizontal, 
  Plus, 
  Search, 
  Trash2, 
  BookOpen 
} from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for teachers
const TEACHERS_DATA = [
  {
    id: 1,
    name: "د. أحمد محمود",
    specialization: "رياضيات",
    profileImage: "https://i.pravatar.cc/150?img=11",
    totalClasses: "5 فصول",
    yearsOfExperience: "8 سنوات",
    email: "ahmed.mahmoud@school.com",
    phone: "0599123456",
    schedule: "15 حصة/أسبوع",
    department: "القسم العلمي"
  },
  {
    id: 2,
    name: "أ. سارة العلي",
    specialization: "لغة عربية",
    profileImage: "https://i.pravatar.cc/150?img=5",
    totalClasses: "4 فصول",
    yearsOfExperience: "6 سنوات",
    email: "sara.ali@school.com",
    phone: "0599789123",
    schedule: "12 حصة/أسبوع",
    department: "القسم الأدبي"
  },
  {
    id: 3,
    name: "أ. محمد الخالدي",
    specialization: "علوم",
    profileImage: "https://i.pravatar.cc/150?img=12",
    totalClasses: "6 فصول",
    yearsOfExperience: "10 سنوات",
    email: "mohammad.k@school.com",
    phone: "0599456789",
    schedule: "18 حصة/أسبوع",
    department: "القسم العلمي"
  }
];

interface Teacher {
  id: number;
  name: string;
  specialization: string;
  profileImage: string;
  totalClasses: string;
  yearsOfExperience: string;
  email: string;
  phone: string;
  schedule: string;
  department: string;
}

const TeacherCard = ({ teacher }: { teacher: Teacher }) => {
  const [showActions, setShowActions] = useState(false);

  return (
    <div className="glass-card card-hover p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 relative">
      {/* Teacher info */}
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-full overflow-hidden border">
          <img 
            src={teacher.profileImage} 
            alt={teacher.name} 
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <h3 className="font-medium">{teacher.name}</h3>
          <p className="text-sm text-muted-foreground">{teacher.specialization}</p>
        </div>
      </div>

      {/* Teacher stats - Desktop */}
      <div className="hidden md:flex items-center gap-6">
        <div className="text-center">
          <p className="text-xs text-muted-foreground">الفصول</p>
          <p className="font-medium">{teacher.totalClasses}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">الخبرة</p>
          <p className="font-medium">{teacher.yearsOfExperience}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">القسم</p>
          <p className="font-medium">{teacher.department}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 mr-auto md:mr-0">
        <Link 
          to={`/teachers/${teacher.id}`} 
          className="btn-primary text-xs h-8 px-3"
        >
          عرض الملف
          <ChevronRight className="mr-2 h-4 w-4" />
        </Link>

        <div className="relative">
          <button 
            onClick={() => setShowActions(!showActions)}
            className="p-2 rounded-md hover:bg-accent"
          >
            <MoreHorizontal size={18} />
          </button>

          {showActions && (
            <div className="absolute left-0 top-full mt-1 w-48 py-2 bg-card border rounded-md shadow-lg z-10">
              <button className="flex items-center w-full px-3 py-2 text-sm hover:bg-accent">
                <Edit size={16} className="mr-2" /> تعديل البيانات
              </button>
              <button className="flex items-center w-full px-3 py-2 text-sm hover:bg-accent">
                <FileText size={16} className="mr-2" /> تقرير مفصل
              </button>
              <button className="flex items-center w-full px-3 py-2 text-sm text-destructive hover:bg-destructive/10">
                <Trash2 size={16} className="mr-2" /> حذف المدرس
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export function Teachers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("الكل");

  const filteredTeachers = TEACHERS_DATA.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         teacher.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === "الكل" || teacher.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const departmentOptions = ["الكل", "القسم العلمي", "القسم الأدبي"];

  return (
    <div className="animate-fade-in" dir="rtl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">إدارة المدرسين</h1>
          <p className="text-muted-foreground">استعراض بيانات المدرسين وإدارتها</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={16} /> إضافة مدرس جديد
        </button>
      </div>

      {/* Filters */}
      <div className="glass-card p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="البحث عن مدرس بالاسم أو التخصص..."
                className="w-full pl-10 pr-4 py-2 rounded-md border bg-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div>
              <select 
                className="py-2 px-3 rounded-md border bg-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
              >
                {departmentOptions.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            <button className="flex items-center gap-2 border rounded-md py-2 px-3 hover:bg-accent">
              <Download size={16} /> تصدير PDF
            </button>
          </div>
        </div>
      </div>

      {/* Teacher list */}
      <div className="space-y-4">
        {filteredTeachers.length > 0 ? (
          filteredTeachers.map(teacher => (
            <TeacherCard key={teacher.id} teacher={teacher} />
          ))
        ) : (
          <div className="glass-card p-8 text-center">
            <div className="flex flex-col items-center justify-center">
              <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">لم يتم العثور على مدرسين</h3>
              <p className="text-muted-foreground mt-1">لا توجد نتائج مطابقة لمعايير البحث</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Teachers;
