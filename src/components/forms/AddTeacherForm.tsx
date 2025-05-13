
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
import { Teacher } from "@/types/database";

const teacherSchema = z.object({
  specialization: z.string().min(2, "التخصص مطلوب"),
  department: z.string().min(1, "القسم مطلوب"),
  email: z.string().email("البريد الإلكتروني غير صحيح").optional(),
  phone: z.string().min(10, "رقم الهاتف غير صحيح").optional(),
  years_of_experience: z.string().optional(),
  education: z.string().optional(),
  address: z.string().optional(),
  date_of_birth: z.string().optional(),
});

type TeacherFormData = z.infer<typeof teacherSchema>;

interface AddTeacherFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  teacher?: Teacher & { profile?: { email: string; phone?: string } };
  onSuccess?: (teacher: Teacher) => void;
}

export function AddTeacherForm({ open, onOpenChange, teacher, onSuccess }: AddTeacherFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<TeacherFormData>({
    resolver: zodResolver(teacherSchema),
    defaultValues: {
      specialization: teacher?.specialization || "",
      department: teacher?.department || "",
      email: teacher?.profile?.email || "",
      phone: teacher?.profile?.phone || "",
      years_of_experience: teacher?.years_of_experience?.toString() || "",
      education: teacher?.education || "",
      address: teacher?.address || "",
      date_of_birth: teacher?.date_of_birth ? new Date(teacher.date_of_birth).toISOString().split('T')[0] : "",
    },
  });

  // تحديث النموذج عند تغيير بيانات المدرس
  useEffect(() => {
    if (teacher) {
      form.reset({
        specialization: teacher.specialization || "",
        department: teacher.department || "",
        email: teacher.profile?.email || "",
        phone: teacher.profile?.phone || "",
        years_of_experience: teacher.years_of_experience?.toString() || "",
        education: teacher.education || "",
        address: teacher.address || "",
        date_of_birth: teacher.date_of_birth ? new Date(teacher.date_of_birth).toISOString().split('T')[0] : "",
      });
    }
  }, [teacher, form]);

  const onSubmit = async (formData: TeacherFormData) => {
    setIsSubmitting(true);
    
    try {
      // تحديث بيانات مدرس موجود
      if (teacher) {
        const { data, error } = await supabase
          .from('teachers')
          .update({
            specialization: formData.specialization,
            department: formData.department,
            years_of_experience: formData.years_of_experience ? parseInt(formData.years_of_experience) : 0,
            education: formData.education || null,
            address: formData.address || null,
            date_of_birth: formData.date_of_birth || null,
            updated_at: new Date().toISOString()
          })
          .eq('id', teacher.id)
          .select('*')
          .single();
          
        if (error) throw error;
        
        // تحديث بيانات الاتصال إذا كان هناك user_id
        if (teacher.user_id && (formData.email || formData.phone)) {
          const { error: profileError } = await supabase
            .from('profiles')
            .update({
              phone: formData.phone || null,
              updated_at: new Date().toISOString()
            })
            .eq('id', teacher.user_id);
            
          if (profileError) {
            console.error("Error updating profile:", profileError);
          }
        }
        
        toast({
          title: "تم تحديث بيانات المدرس بنجاح",
        });
        
        if (data && onSuccess) onSuccess(data);
      } 
      // إضافة مدرس جديد
      else {
        const { data, error } = await supabase
          .from('teachers')
          .insert({
            specialization: formData.specialization,
            department: formData.department,
            years_of_experience: formData.years_of_experience ? parseInt(formData.years_of_experience) : 0,
            education: formData.education || null,
            address: formData.address || null,
            date_of_birth: formData.date_of_birth || null,
          })
          .select('*')
          .single();
          
        if (error) throw error;
        
        toast({
          title: "تم إضافة المدرس بنجاح",
        });
        
        if (data && onSuccess) onSuccess(data);
      }
      
      onOpenChange(false);
      form.reset();
    } catch (error: any) {
      toast({
        title: teacher ? "فشل تحديث بيانات المدرس" : "فشل إضافة المدرس",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !isSubmitting && onOpenChange(open)}>
      <DialogContent className="sm:max-w-[425px]" dir="rtl">
        <DialogHeader>
          <DialogTitle>{teacher ? "تعديل بيانات المدرس" : "إضافة مدرس جديد"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="specialization"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>التخصص</FormLabel>
                  <FormControl>
                    <Input placeholder="ادخل التخصص" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>القسم</FormLabel>
                  <FormControl>
                    <select 
                      className="w-full p-2 border rounded-md"
                      {...field}
                    >
                      <option value="">اختر القسم</option>
                      <option value="القسم العلمي">القسم العلمي</option>
                      <option value="القسم الأدبي">القسم الأدبي</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {!teacher && (
              <>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>البريد الإلكتروني (اختياري)</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="ادخل البريد الإلكتروني" {...field} value={field.value || ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>رقم الهاتف (اختياري)</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="ادخل رقم الهاتف" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="years_of_experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>سنوات الخبرة (اختياري)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="ادخل عدد سنوات الخبرة" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="education"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>المؤهل العلمي (اختياري)</FormLabel>
                  <FormControl>
                    <Input placeholder="ادخل المؤهل العلمي" {...field} value={field.value || ""} />
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
                  <FormLabel>العنوان (اختياري)</FormLabel>
                  <FormControl>
                    <Input placeholder="ادخل العنوان" {...field} value={field.value || ""} />
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
                  <FormLabel>تاريخ الميلاد (اختياري)</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end space-x-2 gap-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>إلغاء</Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "جاري الحفظ..." : teacher ? "تحديث المعلومات" : "إضافة المدرس"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
