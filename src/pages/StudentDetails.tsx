
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Calendar, 
  ChevronDown, 
  Edit, 
  FileText, 
  Mail, 
  MapPin, 
  MessageSquare, 
  Phone, 
  Plus,
  User, 
  Users
} from "lucide-react";

// Mock student data - we would typically fetch this from an API based on the ID
const studentData = {
  id: 1,
  name: "أحمد محمد خالد",
  grade: "الصف التاسع (أ)",
  profileImage: "https://i.pravatar.cc/150?img=1",
  attendance: "95%",
  overallGrade: "ممتاز",
  parentName: "محمد خالد",
  parentPhone: "0599123456",
  parentEmail: "mohammed@example.com",
  dateOfBirth: "15/05/2008",
  address: "عمان، الأردن - شارع الملك عبدالله",
  enrollmentDate: "01/09/2019",
  gender: "ذكر"
};

// Mock grades
const gradesData = [
  { subject: "الرياضيات", midterm: 92, final: 95, assignments: 90, quiz: 88, total: 94 },
  { subject: "اللغة العربية", midterm: 85, final: 82, assignments: 90, quiz: 88, total: 86 },
  { subject: "اللغة الإنجليزية", midterm: 78, final: 82, assignments: 85, quiz: 80, total: 81 },
  { subject: "العلوم", midterm: 90, final: 94, assignments: 92, quiz: 88, total: 92 },
  { subject: "الاجتماعيات", midterm: 85, final: 88, assignments: 87, quiz: 90, total: 87 },
  { subject: "التربية الإسلامية", midterm: 96, final: 98, assignments: 95, quiz: 97, total: 97 },
];

// Mock attendance
const attendanceData = [
  { month: "أيلول 2022", present: 22, absent: 0, late: 1 },
  { month: "تشرين أول 2022", present: 20, absent: 2, late: 0 },
  { month: "تشرين ثاني 2022", present: 21, absent: 1, late: 2 },
  { month: "كانون أول 2022", present: 19, absent: 2, late: 1 },
  { month: "كانون ثاني 2023", present: 22, absent: 0, late: 0 },
  { month: "شباط 2023", present: 20, absent: 1, late: 1 },
];

// Mock behavior notes
const behaviorNotes = [
  { 
    id: 1, 
    date: "12/03/2023", 
    teacher: "فاطمة العلي", 
    note: "أظهر أحمد سلوكًا مثاليًا خلال مشروع العلوم الجماعي، وقدم مساعدة لزملائه.",
    type: "positive" 
  },
  { 
    id: 2, 
    date: "05/02/2023", 
    teacher: "خالد محمود", 
    note: "كان متأخرًا عن الحصة لمدة 15 دقيقة دون عذر مقبول.",
    type: "negative" 
  },
  { 
    id: 3, 
    date: "18/01/2023", 
    teacher: "رانيا حسن", 
    note: "أحمد مجتهد جداً في الواجبات المنزلية، ويقدم عملًا متقنًا باستمرار.",
    type: "positive" 
  },
];

// Tab interface
interface Tab {
  key: string;
  label: string;
  icon: React.ReactNode;
}

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

export default function StudentDetails() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<string>("overview");
  
  // Tabs for student profile
  const tabs: Tab[] = [
    { key: "overview", label: "نظرة عامة", icon: <User size={18} /> },
    { key: "grades", label: "الدرجات", icon: <FileText size={18} /> },
    { key: "attendance", label: "الحضور والغياب", icon: <Calendar size={18} /> },
    { key: "behavior", label: "السلوك والملاحظات", icon: <MessageSquare size={18} /> },
  ];

  return (
    <div className="animate-fade-in" dir="rtl">
      <div className="flex items-center mb-6 gap-2">
        <Link to="/students" className="p-2 rounded-md hover:bg-accent">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold">بيانات الطالب</h1>
      </div>
      
      {/* Student header */}
      <div className="glass-card p-6 mb-6 flex flex-col md:flex-row gap-6 items-center md:items-start">
        <div className="relative">
          <div className="h-28 w-28 rounded-full overflow-hidden border-4 border-background">
            <img 
              src={studentData.profileImage} 
              alt={studentData.name} 
              className="h-full w-full object-cover"
            />
          </div>
          <button className="absolute bottom-0 left-0 rounded-full bg-primary text-white p-1.5">
            <Edit size={14} />
          </button>
        </div>
        
        <div className="text-center md:text-right flex-1">
          <h2 className="text-2xl font-bold">{studentData.name}</h2>
          <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 text-sm text-muted-foreground mt-1">
            <div className="flex items-center justify-center md:justify-start gap-1">
              <Users size={16} />
              <span>{studentData.grade}</span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-1">
              <MapPin size={16} />
              <span>{studentData.address}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-primary" />
              <div className="text-right">
                <p className="text-xs text-muted-foreground">ولي الأمر</p>
                <p>{studentData.parentName}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-primary" />
              <div className="text-right">
                <p className="text-xs text-muted-foreground">الهاتف</p>
                <p dir="ltr" className="text-right">{studentData.parentPhone}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              <div className="text-right">
                <p className="text-xs text-muted-foreground">البريد الإلكتروني</p>
                <p dir="ltr" className="text-right">{studentData.parentEmail}</p>
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
          title="المعدل العام"
          value="94%"
          icon={<FileText size={20} />}
        />
        <StatsCard
          title="نسبة الحضور"
          value={studentData.attendance}
          icon={<Calendar size={20} />}
        />
        <StatsCard
          title="المستوى السلوكي"
          value="ممتاز"
          icon={<User size={20} />}
        />
        <StatsCard
          title="الترتيب الصفي"
          value="3 / 34"
          icon={<Users size={20} />}
        />
      </div>
      
      {/* Tabs */}
      <div className="glass-card mb-6 overflow-hidden">
        <div className="border-b">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                className={`px-4 py-3 flex items-center gap-2 border-b-2 transition-colors ${
                  activeTab === tab.key
                    ? "border-primary text-primary font-medium"
                    : "border-transparent hover:text-primary"
                }`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
        
        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium mb-4">البيانات الشخصية</h3>
                <div className="glass-card border p-4 rounded-lg">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5">
                    <div>
                      <p className="text-sm text-muted-foreground">الاسم الكامل</p>
                      <p className="font-medium">{studentData.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">الصف الدراسي</p>
                      <p className="font-medium">{studentData.grade}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">تاريخ الميلاد</p>
                      <p className="font-medium">{studentData.dateOfBirth}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">الجنس</p>
                      <p className="font-medium">{studentData.gender}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">تاريخ التسجيل</p>
                      <p className="font-medium">{studentData.enrollmentDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">العنوان</p>
                      <p className="font-medium">{studentData.address}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">أداء الطالب</h3>
                <div className="glass-card border p-4 rounded-lg space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <p className="text-sm">المعدل العام</p>
                      <p className="font-medium">94%</p>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "94%" }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <p className="text-sm">نسبة الحضور</p>
                      <p className="font-medium">95%</p>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "95%" }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <p className="text-sm">السلوك والمشاركة</p>
                      <p className="font-medium">92%</p>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "92%" }}></div>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-lg font-medium mb-4 mt-8">معلومات ولي الأمر</h3>
                <div className="glass-card border p-4 rounded-lg">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5">
                    <div>
                      <p className="text-sm text-muted-foreground">الاسم</p>
                      <p className="font-medium">{studentData.parentName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">رقم الهاتف</p>
                      <p dir="ltr" className="font-medium text-right">{studentData.parentPhone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">البريد الإلكتروني</p>
                      <p dir="ltr" className="font-medium text-right">{studentData.parentEmail}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Grades Tab */}
          {activeTab === "grades" && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">سجل الدرجات</h3>
                <div>
                  <button className="flex items-center gap-1 px-3 py-2 border rounded-md hover:bg-accent">
                    <span>الفصل الدراسي الحالي</span>
                    <ChevronDown size={16} />
                  </button>
                </div>
              </div>
              
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-secondary/50">
                    <tr>
                      <th className="text-right py-3 px-4 border-b">المادة</th>
                      <th className="text-center py-3 px-4 border-b">اختبار نصفي</th>
                      <th className="text-center py-3 px-4 border-b">الواجبات</th>
                      <th className="text-center py-3 px-4 border-b">الاختبارات القصيرة</th>
                      <th className="text-center py-3 px-4 border-b">الامتحان النهائي</th>
                      <th className="text-center py-3 px-4 border-b">المجموع</th>
                    </tr>
                  </thead>
                  <tbody>
                    {gradesData.map((grade, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-background" : ""}>
                        <td className="py-3 px-4 font-medium">{grade.subject}</td>
                        <td className="text-center py-3 px-4">{grade.midterm}</td>
                        <td className="text-center py-3 px-4">{grade.assignments}</td>
                        <td className="text-center py-3 px-4">{grade.quiz}</td>
                        <td className="text-center py-3 px-4">{grade.final}</td>
                        <td className="text-center py-3 px-4 font-medium">{grade.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">مخطط الأداء</h3>
                <div className="glass-card border p-4 h-64 flex items-center justify-center">
                  <p className="text-muted-foreground">سيتم عرض رسم بياني للدرجات هنا</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Attendance Tab */}
          {activeTab === "attendance" && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">سجل الحضور والغياب</h3>
                <div>
                  <button className="flex items-center gap-1 px-3 py-2 border rounded-md hover:bg-accent">
                    <span>العام الدراسي 2022-2023</span>
                    <ChevronDown size={16} />
                  </button>
                </div>
              </div>
              
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-secondary/50">
                    <tr>
                      <th className="text-right py-3 px-4 border-b">الشهر</th>
                      <th className="text-center py-3 px-4 border-b">أيام الحضور</th>
                      <th className="text-center py-3 px-4 border-b">أيام الغياب</th>
                      <th className="text-center py-3 px-4 border-b">أيام التأخير</th>
                      <th className="text-center py-3 px-4 border-b">نسبة الحضور</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceData.map((record, i) => {
                      const totalDays = record.present + record.absent + record.late;
                      const attendanceRate = Math.round((record.present / totalDays) * 100);
                      
                      return (
                        <tr key={i} className={i % 2 === 0 ? "bg-background" : ""}>
                          <td className="py-3 px-4 font-medium">{record.month}</td>
                          <td className="text-center py-3 px-4">{record.present}</td>
                          <td className="text-center py-3 px-4">{record.absent}</td>
                          <td className="text-center py-3 px-4">{record.late}</td>
                          <td className="text-center py-3 px-4 font-medium">{attendanceRate}%</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">ملخص الحضور</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="glass-card border p-4 text-center">
                    <div className="h-24 w-24 mx-auto rounded-full bg-primary/20 flex items-center justify-center mb-3">
                      <p className="text-2xl font-bold">95%</p>
                    </div>
                    <p className="text-sm text-muted-foreground">نسبة الحضور الكلية</p>
                  </div>
                  <div className="glass-card border p-4 text-center">
                    <div className="h-24 w-24 mx-auto rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mb-3">
                      <p className="text-2xl font-bold">6</p>
                    </div>
                    <p className="text-sm text-muted-foreground">أيام الغياب</p>
                  </div>
                  <div className="glass-card border p-4 text-center">
                    <div className="h-24 w-24 mx-auto rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-3">
                      <p className="text-2xl font-bold">124</p>
                    </div>
                    <p className="text-sm text-muted-foreground">أيام الحضور</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Behavior Tab */}
          {activeTab === "behavior" && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">ملاحظات السلوك</h3>
                <button className="btn-primary flex items-center gap-1">
                  <Plus size={16} /> إضافة ملاحظة جديدة
                </button>
              </div>
              
              <div className="space-y-4">
                {behaviorNotes.map((note) => (
                  <div 
                    key={note.id} 
                    className={`glass-card border-r-4 p-4 ${
                      note.type === "positive" 
                        ? "border-r-green-500" 
                        : "border-r-amber-500"
                    }`}
                  >
                    <div className="flex justify-between mb-2">
                      <div className="font-medium text-sm">{note.teacher}</div>
                      <div className="text-xs text-muted-foreground">{note.date}</div>
                    </div>
                    <p>{note.note}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
