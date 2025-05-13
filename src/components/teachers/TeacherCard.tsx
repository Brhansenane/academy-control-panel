
import React, { useState } from "react";
import { ChevronRight, Edit, FileText, MoreHorizontal, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { TeacherWithProfile } from "@/types/teacher";

interface TeacherCardProps {
  teacher: TeacherWithProfile;
  onEdit: () => void;
  onDelete: () => void;
}

export const TeacherCard: React.FC<TeacherCardProps> = ({ 
  teacher, 
  onEdit, 
  onDelete 
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
