
import React, { useState, useEffect } from "react";
import { AddTeacherForm } from "@/components/forms/AddTeacherForm";
import { 
  ChevronRight, 
  Download, 
  Edit, 
  FileText,
  MoreHorizontal, 
  Plus, 
  Search, 
  Trash2, 
  BookOpen,
  Loader2
} from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { Teacher } from "@/types/database";
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

interface TeacherWithProfile extends Teacher {
  profile?: {
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
    avatar_url?: string;
  };
}

const TeacherCard = ({ 
  teacher, 
  onEdit, 
  onDelete 
}: { 
  teacher: TeacherWithProfile; 
  onEdit: () => void;
  onDelete: () => void;
}) => {
  const [showActions, setShowActions] = useState(false);

  const teacherName = teacher.profile ? 
    `${teacher.profile.first_name} ${teacher.profile.last_name}` : 
    "مدرس";

  const teacherEmail = teacher.profile?.email;
  const teacherPhone = teacher.profile?.phone;
  const teacherImage = teacher.profile?.avatar_url || "https://i.pravatar.cc/150?img=11";

  return (
    <div className="glass-card card-hover p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 relative">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-full overflow-hidden border">
          <img 
            src={teacherImage}
            alt={teacherName} 
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <h3 className="font-medium">{teacherName}</h3>
          <p className="text-sm text-muted-foreground">{teacher.specialization}</p>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-6">
        <div className="text-center">
          <p className="text-xs text-muted-foreground">الفصول</p>
          <p className="font-medium">{teacher.total_classes || 0} فصول</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">الخبرة</p>
          <p className="font-medium">{teacher.years_of_experience || 0} سنوات</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">القسم</p>
          <p className="font-medium">{teacher.department}</p>
        </div>
      </div>

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
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const [teachers, setTeachers] = useState<TeacherWithProfile[]>([]);
  const [currentTeacher, setCurrentTeacher] = useState<TeacherWithProfile | null>(null);

  // استرجاع بيانات المدرسين
  const fetchTeachers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('teachers')
        .select(`
          *,
          profile: user_id (
            first_name,
            last_name,
            email,
            phone,
            avatar_url
          )
        `);
      
      if (error) throw error;
      
      if (data) {
        setTeachers(data as TeacherWithProfile[]);
      }
    } catch (error: any) {
      toast({
        title: "خطأ في استرجاع بيانات المدرسين",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  
  // حذف مدرس
  const deleteTeacher = async () => {
    if (!currentTeacher) return;
    
    try {
      const { error } = await supabase
        .from('teachers')
        .delete()
        .eq('id', currentTeacher.id);
        
      if (error) throw error;
      
      // تحديث قائمة المدرسين
      setTeachers(prev => prev.filter(teacher => teacher.id !== currentTeacher.id));
      
      toast({
        title: "تم حذف المدرس بنجاح",
      });
    } catch (error: any) {
      toast({
        title: "خطأ في حذف المدرس",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setShowDeleteDialog(false);
      setCurrentTeacher(null);
    }
  };
  
  // استرجاع بيانات المدرسين عند تحميل الصفحة
  useEffect(() => {
    fetchTeachers();
  }, []);

  const filteredTeachers = teachers.filter(teacher => {
    const teacherName = teacher.profile 
      ? `${teacher.profile.first_name} ${teacher.profile.last_name}`.toLowerCase() 
      : "";
    const matchesSearch = 
      teacherName.includes(searchTerm.toLowerCase()) || 
      teacher.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = 
      selectedDepartment === "الكل" || 
      teacher.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const departmentOptions = ["الكل", "القسم العلمي", "القسم الأدبي"];
  
  // التعامل مع تحديث المدرس
  const handleTeacherUpdate = (updatedTeacher: Teacher) => {
    setTeachers(prev => prev.map(teacher => 
      teacher.id === updatedTeacher.id ? 
        {...teacher, ...updatedTeacher} : 
        teacher
    ));
    setShowEditForm(false);
    setCurrentTeacher(null);
  };

  // التعامل مع إضافة مدرس جديد
  const handleTeacherAdd = (newTeacher: Teacher) => {
    setTeachers(prev => [...prev, newTeacher as TeacherWithProfile]);
  };

  return (
    <div className="animate-fade-in" dir="rtl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">إدارة المدرسين</h1>
          <p className="text-muted-foreground">استعراض بيانات المدرسين وإدارتها</p>
        </div>
        <button 
          className="btn-primary flex items-center gap-2"
          onClick={() => setShowAddForm(true)}
        >
          <Plus size={16} /> إضافة مدرس جديد
        </button>
      </div>

      <AddTeacherForm 
        open={showAddForm} 
        onOpenChange={setShowAddForm}
        onSuccess={handleTeacherAdd}
      />
      
      {currentTeacher && (
        <AddTeacherForm 
          open={showEditForm} 
          onOpenChange={setShowEditForm}
          teacher={currentTeacher}
          onSuccess={handleTeacherUpdate}
        />
      )}
      
      {/* Dialog تأكيد الحذف */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent dir="rtl">
          <AlertDialogHeader>
            <AlertDialogTitle>هل أنت متأكد من حذف هذا المدرس؟</AlertDialogTitle>
            <AlertDialogDescription>
              هذا الإجراء لا يمكن التراجع عنه. سيتم حذف جميع بيانات المدرس نهائيًا.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-row gap-2 justify-end">
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
            <AlertDialogAction onClick={deleteTeacher} className="bg-destructive hover:bg-destructive/90">
              حذف
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
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

      {/* جاري التحميل */}
      {loading && (
        <div className="flex items-center justify-center py-10">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="mr-2">جاري تحميل بيانات المدرسين...</span>
        </div>
      )}

      {/* قائمة المدرسين */}
      {!loading && (
        <div className="space-y-4">
          {filteredTeachers.length > 0 ? (
            filteredTeachers.map(teacher => (
              <TeacherCard 
                key={teacher.id} 
                teacher={teacher} 
                onEdit={() => {
                  setCurrentTeacher(teacher);
                  setShowEditForm(true);
                }}
                onDelete={() => {
                  setCurrentTeacher(teacher);
                  setShowDeleteDialog(true);
                }}
              />
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
      )}
      
      {/* ترقيم الصفحات */}
      {filteredTeachers.length > 0 && (
        <div className="flex items-center justify-between mt-8 border-t pt-4">
          <p className="text-sm text-muted-foreground">عرض {filteredTeachers.length} من {teachers.length} مدرس</p>
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

export default Teachers;
