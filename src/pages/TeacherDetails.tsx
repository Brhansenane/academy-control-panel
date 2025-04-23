
import React from "react";
import { useParams, Link } from "react-router-dom";
import { 
  ArrowLeft,
  Calendar,
  Edit,
  FileText,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Users,
  BookOpen
} from "lucide-react";

// Mock teacher data
const teacherData = {
  id: 1,
  name: "د. أحمد محمود",
  specialization: "رياضيات",
  profileImage: "https://i.pravatar.cc/150?img=11",
  totalClasses: "5 فصول",
  yearsOfExperience: "8 سنوات",
  email: "ahmed.mahmoud@school.com",
  phone: "0599123456",
  schedule: "15 حصة/أسبوع",
  department: "القسم العلمي",
  address: "عمان، الأردن",
  dateOfBirth: "15/05/1985",
  startDate: "01/09/2015",
  education: "دكتوراه في الرياضيات - جامعة عمان",
  classes: [
    { name: "الصف التاسع (أ)", students: 25, schedule: "الأحد والثلاثاء" },
    { name: "الصف العاشر (ب)", students: 28, schedule: "الاثنين والأربعاء" },
    { name: "الصف التاسع (ج)", students: 23, schedule: "الثلاثاء والخميس" }
  ],
  performance: {
    studentSuccess: "92%",
    attendance: "98%",
    satisfaction: "4.8/5",
    completedLessons: "95%"
  }
};

// Stats card component
const StatsCard = ({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) => (
  <div className="glass-card p-5 flex items-center gap-4">
    <div className="bg-primary/10 text-primary h-12 w-12 rounded-lg flex items-center justify-center">
      {icon}
    </div>
    <div>
      <p className="text-sm text-muted-foreground">{title}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  </div>
);

export default function TeacherDetails() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="animate-fade-in" dir="rtl">
      <div className="flex items-center mb-6 gap-2">
        <Link to="/teachers" className="p-2 rounded-md hover:bg-accent">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold">بيانات المدرس</h1>
      </div>

      {/* Teacher header */}
      <div className="glass-card p-6 mb-6 flex flex-col md:flex-row gap-6 items-center md:items-start">
        <div className="relative">
          <div className="h-28 w-28 rounded-full overflow-hidden border-4 border-background">
            <img 
              src={teacherData.profileImage} 
              alt={teacherData.name} 
              className="h-full w-full object-cover"
            />
          </div>
          <button className="absolute bottom-0 left-0 rounded-full bg-primary text-white p-1.5">
            <Edit size={14} />
          </button>
        </div>

        <div className="text-center md:text-right flex-1">
          <h2 className="text-2xl font-bold">{teacherData.name}</h2>
          <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 text-sm text-muted-foreground mt-1">
            <div className="flex items-center justify-center md:justify-start gap-1">
              <BookOpen size={16} />
              <span>{teacherData.specialization}</span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-1">
              <MapPin size={16} />
              <span>{teacherData.address}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              <div className="text-right">
                <p className="text-xs text-muted-foreground">البريد الإلكتروني</p>
                <p dir="ltr" className="text-right">{teacherData.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-primary" />
              <div className="text-right">
                <p className="text-xs text-muted-foreground">الهاتف</p>
                <p dir="ltr" className="text-right">{teacherData.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <div className="text-right">
                <p className="text-xs text-muted-foreground">تاريخ التعيين</p>
                <p>{teacherData.startDate}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <button className="btn-primary">إرسال رسالة</button>
          <button className="border px-4 py-2 rounded-md hover:bg-accent">تعديل البيانات</button>
        </div>
      </div>

      {/* Stats overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatsCard
          title="نسبة نجاح الطلاب"
          value={teacherData.performance.studentSuccess}
          icon={<FileText size={20} />}
        />
        <StatsCard
          title="نسبة الحضور"
          value={teacherData.performance.attendance}
          icon={<Calendar size={20} />}
        />
        <StatsCard
          title="رضا الطلاب"
          value={teacherData.performance.satisfaction}
          icon={<Users size={20} />}
        />
        <StatsCard
          title="إنجاز المنهج"
          value={teacherData.performance.completedLessons}
          icon={<BookOpen size={20} />}
        />
      </div>

      {/* Classes and Schedule */}
      <div className="glass-card p-6 mb-6">
        <h3 className="text-lg font-medium mb-4">الفصول والجدول الدراسي</h3>
        <div className="grid gap-4">
          {teacherData.classes.map((cls, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">{cls.name}</h4>
                <span className="text-sm text-muted-foreground">{cls.schedule}</span>
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                {cls.students} طالب
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Information */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-medium mb-4">معلومات إضافية</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">المؤهل العلمي</p>
                <p className="font-medium mt-1">{teacherData.education}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">سنوات الخبرة</p>
                <p className="font-medium mt-1">{teacherData.yearsOfExperience}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">القسم</p>
                <p className="font-medium mt-1">{teacherData.department}</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-3">الإنجازات والتقييمات</h4>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>التزام المواعيد</span>
                  <span className="font-medium">98%</span>
                </div>
                <div className="w-full bg-secondary h-2 rounded-full">
                  <div className="bg-primary h-2 rounded-full" style={{ width: "98%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>جودة التدريس</span>
                  <span className="font-medium">95%</span>
                </div>
                <div className="w-full bg-secondary h-2 rounded-full">
                  <div className="bg-primary h-2 rounded-full" style={{ width: "95%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>التعاون مع الزملاء</span>
                  <span className="font-medium">92%</span>
                </div>
                <div className="w-full bg-secondary h-2 rounded-full">
                  <div className="bg-primary h-2 rounded-full" style={{ width: "92%" }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
