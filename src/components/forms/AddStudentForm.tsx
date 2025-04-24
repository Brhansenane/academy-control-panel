
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const studentSchema = z.object({
  name: z.string().min(3, "الاسم يجب أن يكون 3 أحرف على الأقل"),
  grade: z.string().min(1, "يرجى اختيار الصف"),
  parentName: z.string().min(3, "اسم ولي الأمر مطلوب"),
  parentPhone: z.string().min(10, "رقم الهاتف غير صحيح"),
  dateOfBirth: z.string().min(1, "تاريخ الميلاد مطلوب"),
  address: z.string().min(5, "العنوان مطلوب"),
});

type StudentFormData = z.infer<typeof studentSchema>;

interface AddStudentFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddStudentForm({ open, onOpenChange }: AddStudentFormProps) {
  const form = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      name: "",
      grade: "",
      parentName: "",
      parentPhone: "",
      dateOfBirth: "",
      address: "",
    },
  });

  const onSubmit = (data: StudentFormData) => {
    console.log(data);
    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]" dir="rtl">
        <DialogHeader>
          <DialogTitle>إضافة طالب جديد</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>اسم الطالب</FormLabel>
                  <FormControl>
                    <Input placeholder="ادخل اسم الطالب" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
              name="parentName"
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
              name="parentPhone"
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
              name="dateOfBirth"
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
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>العنوان</FormLabel>
                  <FormControl>
                    <Input placeholder="ادخل العنوان" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-2">
              <Button type="submit">إضافة الطالب</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
