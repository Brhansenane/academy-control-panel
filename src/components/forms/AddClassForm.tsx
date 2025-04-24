
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const classSchema = z.object({
  title: z.string().min(3, "عنوان الحصة يجب أن يكون 3 أحرف على الأقل"),
  teacher: z.string().min(3, "اسم المدرس مطلوب"),
  subject: z.string().min(2, "المادة مطلوبة"),
  time: z.string().min(1, "وقت الحصة مطلوب"),
  duration: z.string().min(1, "مدة الحصة مطلوبة"),
  room: z.string().min(1, "رقم القاعة مطلوب"),
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
      teacher: "",
      subject: "",
      time: "",
      duration: "",
      room: "",
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
              name="teacher"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>المدرس</FormLabel>
                  <FormControl>
                    <Input placeholder="اختر المدرس" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>المادة</FormLabel>
                  <FormControl>
                    <Input placeholder="ادخل المادة" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>وقت الحصة</FormLabel>
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>مدة الحصة</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="المدة بالدقائق" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="room"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>القاعة</FormLabel>
                  <FormControl>
                    <Input placeholder="رقم القاعة" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-2">
              <Button type="submit">إضافة الحصة</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
