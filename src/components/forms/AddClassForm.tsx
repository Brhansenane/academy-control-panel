
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const classSchema = z.object({
  title: z.string().min(3, "عنوان الحصة مطلوب"),
  teacherId: z.string().min(1, "يرجى اختيار المدرس"),
  grade: z.string().min(1, "يرجى اختيار الصف"),
  startTime: z.string().min(1, "وقت البداية مطلوب"),
  endTime: z.string().min(1, "وقت النهاية مطلوب"),
  date: z.string().min(1, "التاريخ مطلوب"),
});

type ClassFormData = z.infer<typeof classSchema>;

interface AddClassFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddClassForm({ open, onOpenChange }: AddClassFormProps) {
  const form = useForm<ClassFormData>({
    resolver: zodResolver(classSchema),
    defaultValues: {
      title: "",
      teacherId: "",
      grade: "",
      startTime: "",
      endTime: "",
      date: "",
    },
  });

  const onSubmit = (data: ClassFormData) => {
    console.log(data);
    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]" dir="rtl">
        <DialogHeader>
          <DialogTitle>إضافة حصة جديدة</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>عنوان الحصة</FormLabel>
                  <FormControl>
                    <Input placeholder="ادخل عنوان الحصة" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="teacherId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>المدرس</FormLabel>
                  <FormControl>
                    <select 
                      className="w-full p-2 border rounded-md"
                      {...field}
                    >
                      <option value="">اختر المدرس</option>
                      <option value="1">أحمد محمود - رياضيات</option>
                      <option value="2">سارة العلي - لغة عربية</option>
                      <option value="3">محمد الخالدي - علوم</option>
                    </select>
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
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>التاريخ</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>وقت البداية</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>وقت النهاية</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button type="submit">إضافة الحصة</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
