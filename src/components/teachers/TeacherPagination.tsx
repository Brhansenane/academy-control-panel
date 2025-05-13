
import React from "react";

interface TeacherPaginationProps {
  totalCount: number;
  filteredCount: number;
}

export const TeacherPagination: React.FC<TeacherPaginationProps> = ({
  totalCount,
  filteredCount
}) => {
  return (
    <div className="flex items-center justify-between mt-8 border-t pt-4">
      <p className="text-sm text-muted-foreground">عرض {filteredCount} من {totalCount} مدرس</p>
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
  );
};
