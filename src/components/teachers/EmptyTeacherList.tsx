
import React from "react";
import { BookOpen } from "lucide-react";

export const EmptyTeacherList: React.FC = () => {
  return (
    <div className="glass-card p-8 text-center">
      <div className="flex flex-col items-center justify-center">
        <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">لم يتم العثور على مدرسين</h3>
        <p className="text-muted-foreground mt-1">لا توجد نتائج مطابقة لمعايير البحث</p>
      </div>
    </div>
  );
};
