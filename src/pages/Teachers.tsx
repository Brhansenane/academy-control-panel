
import React, { useState } from "react";
import { AddTeacherForm } from "@/components/forms/AddTeacherForm";
import { Plus, Loader2 } from "lucide-react";
import { TeacherCard } from "@/components/teachers/TeacherCard";
import { TeacherFilters } from "@/components/teachers/TeacherFilters";
import { EmptyTeacherList } from "@/components/teachers/EmptyTeacherList";
import { TeacherPagination } from "@/components/teachers/TeacherPagination";
import { useTeachers } from "@/hooks/useTeachers";
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

export function Teachers() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  
  const { 
    filteredTeachers, 
    teachers, 
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
  } = useTeachers();

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
      
      <TeacherFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedDepartment={selectedDepartment}
        setSelectedDepartment={setSelectedDepartment}
        departmentOptions={departmentOptions}
      />

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
            <EmptyTeacherList />
          )}
        </div>
      )}
      
      {/* ترقيم الصفحات */}
      {filteredTeachers.length > 0 && (
        <TeacherPagination 
          totalCount={teachers.length} 
          filteredCount={filteredTeachers.length} 
        />
      )}
    </div>
  );
}

export default Teachers;
