
import React, { useState, useEffect } from "react";
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
  User,
  Loader2
} from "lucide-react";
import { AddStudentForm } from "@/components/forms/AddStudentForm";
import { supabase } from "@/integrations/supabase/client";
import { Student } from "@/types/database";
import { toast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// مكون بطاقة الطالب
const StudentCard = ({ student, onEdit, onDelete }: { 
  student: Student & { profile?: { first_name: string; last_name: string; avatar_url?: string } }; 
  onEdit: () => void;
  onDelete: () => void;
}) => {
  const [showActions, setShowActions] = useState(false);
  
  const getGradeColor = (grade: string | null) => {
    if (!grade) return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400";
    if (grade.includes('ممتاز')) return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
    if (grade.includes('جيد جداً')) return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
    if (grade.includes('جيد')) return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
    return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400";
  };

  const studentName = student.profile ? 
    `${student.profile.first_name} ${student.profile.last_name}` : 
    "طالب";

  const studentImage = student.profile?.avatar_url || "https://i.pravatar.cc/150?img=1";

  return (
    <div className="glass-card card-hover p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 relative">
      {/* Student info */}
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-full overflow-hidden border">
          <img 
            src={studentImage} 
            alt={studentName} 
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <div className="flex items-center">
            <h3 className="font-medium">{studentName}</h3>
            <span className="text-xs text-muted-foreground mr-2">(#{student.id.substring(0, 4)})</span>
          </div>
          <p className="text-sm text-muted-foreground">{student.grade}</p>
        </div>
      </div>
      
      {/* Student stats - Desktop */}
      <div className="hidden md:flex items-center gap-6">
        <div className="text-center">
          <p className="text-xs text-muted-foreground">الحضور</p>
          <p className="font-medium">{student.attendance_rate ? `${student.attendance_rate}%` : "غير متوفر"}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">التقييم</p>
          <div className={`px-2 py-0.5 rounded-full text-xs text-center mt-1 ${getGradeColor(student.overall_grade)}`}>
            {student.overall_grade || "غير متوفر"}
          </div>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">ولي الأمر</p>
          <p className="font-medium text-sm">{student.parent_name}</p>
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
              <button 
                onClick={() => {
                  onEdit();
                  setShowActions(false);
                }} 
                className="flex items-center w-full px-3 py-2 text-sm hover:bg-accent"
              >
                <Edit size={16} className="mr-2" /> تعديل البيانات
              </button>
              <button className="flex items-center w-full px-3 py-2 text-sm hover:bg-accent">
                <FileText size={16} className="mr-2" /> تقرير مفصل
              </button>
              <button 
                onClick={() => {
                  onDelete();
                  setShowActions(false);
                }} 
                className="flex items-center w-full px-3 py-2 text-sm text-destructive hover:bg-destructive/10"
              >
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
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  
  const [students, setStudents] = useState<(Student & { profile?: { first_name: string; last_name: string; avatar_url?: string } })[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);

  // استرجاع بيانات الطلاب من قاعدة البيانات
  const fetchStudents = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('students')
        .select(`
          *,
          profile: user_id (
            first_name,
            last_name,
            avatar_url
          )
        `);

      if (error) {
        throw error;
      }

      if (data) {
        setStudents(data);
      }
    } catch (error: any) {
      toast({
        title: "خطأ في استرجاع بيانات الطلاب",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // حذف طالب من قاعدة البيانات
  const deleteStudent = async () => {
    if (!currentStudent) return;
    
    try {
      const { error } = await supabase
        .from('students')
        .delete()
        .eq('id', currentStudent.id);
        
      if (error) throw error;
      
      // تحديث قائمة الطلاب بعد الحذف
      setStudents(prev => prev.filter(student => student.id !== currentStudent.id));
      
      toast({
        title: "تم حذف الطالب بنجاح",
      });
    } catch (error: any) {
      toast({
        title: "خطأ في حذف الطالب",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setShowDeleteDialog(false);
      setCurrentStudent(null);
    }
  };

  // استرجاع بيانات الطلاب عند تحميل الصفحة
  useEffect(() => {
    fetchStudents();
  }, []);

  // فلترة الطلاب بناءً على البحث والفلتر
  const filteredStudents = students.filter(student => {
    const profileName = student.profile ? `${student.profile.first_name} ${student.profile.last_name}`.toLowerCase() : "";
    const matchesSearch = profileName.includes(searchTerm.toLowerCase()) || 
                          student.id.toString().includes(searchTerm);
    const matchesGrade = selectedGrade === "الكل" || student.grade.includes(selectedGrade);
    return matchesSearch && matchesGrade;
  });
  
  // خيارات الصفوف
  const gradeOptions = ["الكل", "الصف الثامن", "الصف التاسع", "الصف العاشر"];

  // التعامل مع تحديث الطالب
  const handleStudentUpdate = (updatedStudent: Student) => {
    setStudents(prev => prev.map(student => 
      student.id === updatedStudent.id ? {...student, ...updatedStudent} : student
    ));
    setShowEditForm(false);
    setCurrentStudent(null);
  };

  // التعامل مع إضافة طالب جديد
  const handleStudentAdd = (newStudent: Student) => {
    setStudents(prev => [...prev, newStudent]);
  };

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
      
      <AddStudentForm 
        open={showAddForm} 
        onOpenChange={setShowAddForm} 
        onSuccess={handleStudentAdd}
      />
      
      {currentStudent && (
        <AddStudentForm 
          open={showEditForm} 
          onOpenChange={setShowEditForm}
          student={currentStudent}
          onSuccess={handleStudentUpdate}
        />
      )}
      
      {/* Dialog تأكيد الحذف */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent dir="rtl">
          <AlertDialogHeader>
            <AlertDialogTitle>هل أنت متأكد من حذف هذا الطالب؟</AlertDialogTitle>
            <AlertDialogDescription>
              هذا الإجراء لا يمكن التراجع عنه. سيتم حذف جميع بيانات الطالب نهائيًا.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-row gap-2 justify-end">
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
            <AlertDialogAction onClick={deleteStudent} className="bg-destructive hover:bg-destructive/90">
              حذف
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
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
      
      {/* جاري التحميل */}
      {loading && (
        <div className="flex items-center justify-center py-10">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="mr-2">جاري تحميل بيانات الطلاب...</span>
        </div>
      )}
      
      {/* قائمة الطلاب */}
      {!loading && (
        <div className="space-y-4">
          {filteredStudents.length > 0 ? (
            filteredStudents.map(student => (
              <StudentCard 
                key={student.id} 
                student={student} 
                onEdit={() => {
                  setCurrentStudent(student);
                  setShowEditForm(true);
                }}
                onDelete={() => {
                  setCurrentStudent(student);
                  setShowDeleteDialog(true);
                }}
              />
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
      )}
      
      {/* ترقيم الصفحات */}
      {filteredStudents.length > 0 && (
        <div className="flex items-center justify-between mt-8 border-t pt-4">
          <p className="text-sm text-muted-foreground">عرض {filteredStudents.length} من {students.length} طالب</p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-2 border rounded-md hover:bg-accent disabled:opacity-50 disabled:hover:bg-transparent" disabled>
              السابق
            </button>
            <button className="px-3 py-2 bg-primary text-primary-foreground rounded-md">1</button>
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
