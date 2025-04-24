import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ChevronRight, 
  Download,
  Edit, 
  FileText, 
  MoreHorizontal, 
  Plus, 
  Search, 
  Trash2, 
  User 
} from "lucide-react";
import { AddStudentForm } from "@/components/forms/AddStudentForm";

// Mock data for students
const STUDENTS_DATA = [
  {
    id: 1,
    name: "أحمد محمد خالد",
    grade: "الصف التاسع (أ)",
    profileImage: "https://i.pravatar.cc/150?img=1",
    attendance: "95%",
    overallGrade: "ممتاز",
    parentName: "محمد خالد",
    parentPhone: "0599123456",
    dateOfBirth: "15/05/2008",
    address: "عمان، الأردن - شارع الملك عبدالله",
    enrollmentDate: "01/09/2019",
    gender: "ذكر"
  },
  {
    id: 2,
    name: "سارة عبد الله الأحمد",
    grade: "الصف العاشر (ب)",
    profileImage: "https://i.pravatar.cc/150?img=5",
    attendance: "92%",
    overallGrade: "جيد جداً",
    parentName: "عبد الله الأحمد",
    parentPhone: "0599789123",
    dateOfBirth: "22/03/2007",
    address: "عمان، الأردن - حي الجبيهة",
    enrollmentDate: "01/09/2018",
    gender: "أنثى"
  },
  {
    id: 3,
    name: "علي يوسف الحسن",
    grade: "الصف التاسع (أ)",
    profileImage: "https://i.pravatar.cc/150?img=3",
    attendance: "87%",
    overallGrade: "جيد",
    parentName: "يوسف الحسن",
    parentPhone: "0599456789",
    dateOfBirth: "10/11/2008",
    address: "عمان، الأردن - شارع الجامعة",
    enrollmentDate: "01/09/2019",
    gender: "ذكر"
  },
  {
    id: 4,
    name: "نور محمد الخطيب",
    grade: "الصف الثامن (ج)",
    profileImage: "https://i.pravatar.cc/150?img=9",
    attendance: "98%",
    overallGrade: "ممتاز",
    parentName: "محمد الخطيب",
    parentPhone: "0599987654",
    dateOfBirth: "05/08/2009",
    address: "عمان، الأردن - حي تلاع العلي",
    enrollmentDate: "01/09/2020",
    gender: "أنثى"
  },
  {
    id: 5,
    name: "عمر خالد العلي",
    grade: "الصف العاشر (أ)",
    profileImage: "https://i.pravatar.cc/150?img=11",
    attendance: "90%",
    overallGrade: "جيد جداً",
    parentName: "خالد العلي",
    parentPhone: "0599765123",
    dateOfBirth: "18/04/2007",
    address: "عمان، الأردن - شارع المدينة المنورة",
    enrollmentDate: "01/09/2018",
    gender: "ذكر"
  }
];

// Types
interface Student {
  id: number;
  name: string;
  grade: string;
  profileImage: string;
  attendance: string;
  overallGrade: string;
  parentName: string;
  parentPhone: string;
  dateOfBirth: string;
  address: string;
  enrollmentDate: string;
  gender: string;
}

// Component for student card
const StudentCard = ({ student }: { student: Student }) => {
  const [showActions, setShowActions] = useState(false);
  
  const getGradeColor = (grade: string) => {
    if (grade.includes('ممتاز')) return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
    if (grade.includes('جيد جداً')) return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
    if (grade.includes('جيد')) return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
    return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400";
  };

  return (
    <div className="glass-card card-hover p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 relative">
      {/* Student info */}
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-full overflow-hidden border">
          <img 
            src={student.profileImage} 
            alt={student.name} 
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <div className="flex items-center">
            <h3 className="font-medium">{student.name}</h3>
            <span className="text-xs text-muted-foreground mr-2">(#{student.id})</span>
          </div>
          <p className="text-sm text-muted-foreground">{student.grade}</p>
        </div>
      </div>
      
      {/* Student stats - Desktop */}
      <div className="hidden md:flex items-center gap-6">
        <div className="text-center">
          <p className="text-xs text-muted-foreground">الحضور</p>
          <p className="font-medium">{student.attendance}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">التقييم</p>
          <div className={`px-2 py-0.5 rounded-full text-xs text-center mt-1 ${getGradeColor(student.overallGrade)}`}>
            {student.overallGrade}
          </div>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">ولي الأمر</p>
          <p className="font-medium text-sm">{student.parentName}</p>
        </div>
      </div>
      
      {/* Actions */}
      <div className="flex items-center gap-2 mr-auto md:mr-0">
        <Link 
          to={`/students/${student.id}`} 
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
                <Trash2 size={16} className="mr-2" /> حذف الطالب
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export function Students() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("الكل");
  const [showAddForm, setShowAddForm] = useState(false);
  
  // Filter students based on search and filter criteria
  const filteredStudents = STUDENTS_DATA.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          student.id.toString().includes(searchTerm);
    const matchesGrade = selectedGrade === "الكل" || student.grade.includes(selectedGrade);
    return matchesSearch && matchesGrade;
  });
  
  // Grade options
  const gradeOptions = ["الكل", "الصف الثامن", "الصف التاسع", "الصف العاش��"];

  return (
    <div className="animate-fade-in" dir="rtl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">إدارة الطلاب</h1>
          <p className="text-muted-foreground">استعراض بيانات الطلاب وإدارتها</p>
        </div>
        <button 
          className="btn-primary flex items-center gap-2"
          onClick={() => setShowAddForm(true)}
        >
          <Plus size={16} /> إضافة طالب جديد
        </button>
      </div>
      
      <AddStudentForm open={showAddForm} onOpenChange={setShowAddForm} />
      
      {/* Filters */}
      <div className="glass-card p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="البحث عن طالب بالاسم أو الرقم..."
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
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
              >
                {gradeOptions.map((grade) => (
                  <option key={grade} value={grade}>{grade}</option>
                ))}
              </select>
            </div>
            <button className="flex items-center gap-2 border rounded-md py-2 px-3 hover:bg-accent">
              <Download size={16} /> تصدير PDF
            </button>
          </div>
        </div>
      </div>
      
      {/* Student list */}
      <div className="space-y-4">
        {filteredStudents.length > 0 ? (
          filteredStudents.map(student => (
            <StudentCard key={student.id} student={student} />
          ))
        ) : (
          <div className="glass-card p-8 text-center">
            <div className="flex flex-col items-center justify-center">
              <User className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">لم يتم العثور على طلاب</h3>
              <p className="text-muted-foreground mt-1">لا توجد نتائج مطابقة لمعايير البحث</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Pagination */}
      {filteredStudents.length > 0 && (
        <div className="flex items-center justify-between mt-8 border-t pt-4">
          <p className="text-sm text-muted-foreground">عرض 5 من 120 طالب</p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-2 border rounded-md hover:bg-accent disabled:opacity-50 disabled:hover:bg-transparent" disabled>
              السابق
            </button>
            <button className="px-3 py-2 bg-primary text-primary-foreground rounded-md">1</button>
            <button className="px-3 py-2 border rounded-md hover:bg-accent">2</button>
            <button className="px-3 py-2 border rounded-md hover:bg-accent">3</button>
            <span className="px-2">...</span>
            <button className="px-3 py-2 border rounded-md hover:bg-accent">12</button>
            <button className="px-3 py-2 border rounded-md hover:bg-accent">
              التالي
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Students;
