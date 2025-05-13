
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { Student } from "@/types/database";

const studentSchema = z.object({
  grade: z.string().min(1, "يرجى اختيار الصف"),
  parent_name: z.string().min(3, "اسم ولي الأمر مطلوب"),
  parent_phone: z.string().min(10, "رقم الهاتف غير صحيح"),
  date_of_birth: z.string().optional(),
  address: z.string().optional(),
  gender: z.string().optional(),
});

type StudentFormData = z.infer<typeof studentSchema>;

interface AddStudentFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  student?: Student;
  onSuccess?: (student: Student) => void;
}

export function AddStudentForm({ open, onOpenChange, student, onSuccess }: AddStudentFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      grade: student?.grade || "",
      parent_name: student?.parent_name || "",
      parent_phone: student?.parent_phone || "",
      date_of_birth: student?.date_of_birth ? new Date(student.date_of_birth).toISOString().split('T')[0] : "",
      address: student?.address || "",
      gender: student?.gender || "",
    },
  });

  // تحديث النموذج عند تغيير بيانات الطالب
  useEffect(() => {
    if (student) {
      form.reset({
        grade: student.grade,
        parent_name: student.parent_name,
        parent_phone: student.parent_phone,
        date_of_birth: student.date_of_birth ? new Date(student.date_of_birth).toISOString().split('T')[0] : "",
        address: student.address || "",
        gender: student.gender || "",
      });
    }
  }, [student, form]);

  const onSubmit = async (formData: StudentFormData) => {
    setIsSubmitting(true);
    
    try {
      // تحديث بيانات طالب موجود
      if (student) {
        const { data, error } = await supabase
          .from('students')
          .update({
            grade: formData.grade,
            parent_name: formData.parent_name,
            parent_phone: formData.parent_phone,
            date_of_birth: formData.date_of_birth || null,
            address: formData.address || null,
            gender: formData.gender || null,
            updated_at: new Date().toISOString()
          })
          .eq('id', student.id)
          .select('*')
          .single();
          
        if (error) throw error;
        
        toast({
          title: "تم تحديث بيانات الطالب بنجاح",
        });
        
        if (data && onSuccess) onSuccess(data);
      } 
      // إضافة طالب جديد
      else {
        const { data, error } = await supabase
          .from('students')
          .insert({
            grade: formData.grade,
            parent_name: formData.parent_name,
            parent_phone: formData.parent_phone,
            date_of_birth: formData.date_of_birth || null,
            address: formData.address || null,
            gender: formData.gender || null,
          })
          .select('*')
          .single();
          
        if (error) throw error;
        
        toast({
          title: "تم إضافة الطالب بنجاح",
        });
        
        if (data && onSuccess) onSuccess(data);
      }
      
      onOpenChange(false);
      form.reset();
    } catch (error: any) {
      toast({
        title: student ? "فشل تحديث بيانات الطالب" : "فشل إضافة الطالب",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]" dir="rtl">
        <DialogHeader>
          <DialogTitle>{student ? "تعديل بيانات الطالب" : "إضافة طالب جديد"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="grade"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الصف</FormLabel>
                  <FormControl>
                    <select 
                      className="w-full p-2 border rounded-md"
                      {...field}
                    >
                      <option value="">اختر الصف</option>
                      <option value="الصف التاسع (أ)">الصف التاسع (أ)</option>
                      <option value="الصف العاشر (ب)">الصف العاشر (ب)</option>
                      <option value="الصف الثامن (ج)">الصف الثامن (ج)</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="parent_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>اسم ولي الأمر</FormLabel>
                  <FormControl>
                    <Input placeholder="ادخل اسم ولي الأمر" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="parent_phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>رقم هاتف ولي الأمر</FormLabel>
                  <FormControl>
                    <Input placeholder="ادخل رقم الهاتف" type="tel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date_of_birth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>تاريخ الميلاد</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الجنس</FormLabel>
                  <FormControl>
                    <select 
                      className="w-full p-2 border rounded-md"
                      {...field}
                      value={field.value || ""}
                    >
                      <option value="">اختر الجنس</option>
                      <option value="ذكر">ذكر</option>
                      <option value="أنثى">أنثى</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>العنوان</FormLabel>
                  <FormControl>
                    <Input placeholder="ادخل العنوان" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>إلغاء</Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "جاري الحفظ..." : student ? "تحديث البيانات" : "إضافة الطالب"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
