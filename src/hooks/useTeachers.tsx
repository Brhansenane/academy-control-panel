
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { TeacherWithProfile } from "@/types/teacher";

export const useTeachers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("الكل");
  const [teachers, setTeachers] = useState<TeacherWithProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentTeacher, setCurrentTeacher] = useState<TeacherWithProfile | null>(null);

  const departmentOptions = ["الكل", "القسم العلمي", "القسم الأدبي"];
  
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
      setCurrentTeacher(null);
    }
  };

  // التعامل مع تحديث المدرس
  const handleTeacherUpdate = (updatedTeacher: TeacherWithProfile) => {
    setTeachers(prev => prev.map(teacher => 
      teacher.id === updatedTeacher.id ? 
        {...teacher, ...updatedTeacher} : 
        teacher
    ));
    setCurrentTeacher(null);
  };

  // التعامل مع إضافة مدرس جديد
  const handleTeacherAdd = (newTeacher: TeacherWithProfile) => {
    setTeachers(prev => [...prev, newTeacher]);
  };

  // تصفية المدرسين بناءً على البحث والقسم
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
  
  // استرجاع بيانات المدرسين عند تحميل الصفحة
  useEffect(() => {
    fetchTeachers();
  }, []);

  return {
    teachers,
    filteredTeachers,
    loading,
    searchTerm,
    setSearchTerm,
    selectedDepartment,
    setSelectedDepartment,
    departmentOptions,
    currentTeacher,
    setCurrentTeacher,
    deleteTeacher,
    handleTeacherUpdate,
    handleTeacherAdd
  };
};
