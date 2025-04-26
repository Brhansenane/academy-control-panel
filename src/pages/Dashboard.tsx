
import React from "react";
import { 
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from "recharts";
import { Bell, Book, BookOpen, Calendar, Clock, Users } from "lucide-react";

// Mock data for charts
const attendanceData = [
  { name: "سبت", attendance: 92, absence: 8 },
  { name: "أحد", attendance: 88, absence: 12 },
  { name: "اثنين", attendance: 94, absence: 6 },
  { name: "ثلاثاء", attendance: 90, absence: 10 },
  { name: "أربعاء", attendance: 87, absence: 13 },
  { name: "خميس", attendance: 95, absence: 5 },
];

const gradesData = [
  { name: "رياضيات", متميز: 12, جيد: 18, متوسط: 8, ضعيف: 2 },
  { name: "علوم", متميز: 15, جيد: 14, متوسط: 9, ضعيف: 2 },
  { name: "لغة عربية", متميز: 18, جيد: 13, متوسط: 7, ضعيف: 2 },
  { name: "لغة إنجليزية", متميز: 10, جيد: 15, متوسط: 12, ضعيف: 3 },
];

const enrollmentData = [
  { name: "أيلول", طلاب: 340 },
  { name: "تشرين أول", طلاب: 345 },
  { name: "تشرين ثاني", طلاب: 350 },
  { name: "كانون أول", طلاب: 355 },
  { name: "كانون ثاني", طلاب: 360 },
  { name: "شباط", طلاب: 365 },
];

// Component for statistic cards
const StatCard = ({ icon, title, value, trend, color }: { 
  icon: React.ReactNode, 
  title: string, 
  value: string, 
  trend?: string,
  color: string
}) => {
  return (
    <div className="glass-card p-6 card-hover flex items-center">
      <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${color}`}>
        {icon}
      </div>
      <div className="mr-5">
        <h3 className="text-muted-foreground text-sm font-medium">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
        {trend && <p className="text-xs text-muted-foreground mt-1">{trend}</p>}
      </div>
    </div>
  );
};

export function Dashboard() {
  return (
    <div className="animate-fade-in" dir="rtl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">مرحباً بك في نظام إدارة المدرسة</h1>
          <p className="text-muted-foreground">لوحة التحكم الرئيسية</p>
        </div>
        <div className="hidden md:block">
          <div className="bg-primary/10 text-primary px-4 py-2 rounded-lg flex items-center">
            <Calendar className="mr-2 h-5 w-5" />
            <span>14 نيسان، 2023</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          icon={<Users className="h-6 w-6 text-blue-500" />} 
          title="إجمالي الطلاب" 
          value="365" 
          trend="زيادة بنسبة 2.5% عن الشهر الماضي"
          color="bg-blue-100 dark:bg-blue-900/30"
        />
        <StatCard 
          icon={<BookOpen className="h-6 w-6 text-green-500" />} 
          title="عدد المدرسين" 
          value="42" 
          color="bg-green-100 dark:bg-green-900/30"
        />
        <StatCard 
          icon={<Clock className="h-6 w-6 text-amber-500" />} 
          title="معدل الحضور" 
          value="92%" 
          trend="زيادة بنسبة 1.2% عن الأسبوع الماضي"
          color="bg-amber-100 dark:bg-amber-900/30"
        />
        <StatCard 
          icon={<Bell className="h-6 w-6 text-purple-500" />} 
          title="إشعارات جديدة" 
          value="8" 
          color="bg-purple-100 dark:bg-purple-900/30"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="glass-card p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-medium mb-4">معدل الحضور الأسبوعي</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={attendanceData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorAttendance" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickMargin={10} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickMargin={10} />
              <Tooltip 
                contentStyle={{ 
                  background: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))", 
                  borderRadius: "var(--radius)" 
                }} 
              />
              <Area 
                type="monotone" 
                dataKey="attendance" 
                stroke="hsl(var(--primary))" 
                fillOpacity={1} 
                fill="url(#colorAttendance)" 
                name="الحضور (%)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-medium mb-4">توزيع الدرجات حسب المواد</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={gradesData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickMargin={10} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickMargin={10} />
              <Tooltip 
                contentStyle={{ 
                  background: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))", 
                  borderRadius: "var(--radius)" 
                }} 
              />
              <Bar dataKey="متميز" stackId="a" fill="#3b82f6" name="متميز" />
              <Bar dataKey="جيد" stackId="a" fill="#14b8a6" name="جيد" />
              <Bar dataKey="متوسط" stackId="a" fill="#eab308" name="متوسط" />
              <Bar dataKey="ضعيف" stackId="a" fill="#ef4444" name="ضعيف" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card p-6 rounded-xl shadow-sm lg:col-span-2">
          <h3 className="text-lg font-medium mb-4">تطور أعداد الطلاب</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={enrollmentData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickMargin={10} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickMargin={10} />
              <Tooltip 
                contentStyle={{ 
                  background: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))", 
                  borderRadius: "var(--radius)" 
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="طلاب" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2} 
                dot={{ r: 4 }} 
                activeDot={{ r: 6 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity & Calendar Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="glass-card p-6 rounded-xl shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">النشاطات الأخيرة</h3>
            <button className="text-primary text-sm hover:underline">عرض الكل</button>
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="flex items-start border-b pb-4 last:border-0 last:pb-0">
                <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-1">
                  <Book className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <p className="font-medium">تم تسجيل علامات مادة الرياضيات</p>
                    <span className="text-xs text-muted-foreground">منذ ساعة</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">قام المدرس أحمد خالد بتسجيل علامات الاختبار الشهري لمادة الرياضيات للصف التاسع (أ).</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="glass-card p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">الأحداث القادمة</h3>
            <button className="text-primary text-sm hover:underline">التقويم</button>
          </div>
          <div className="space-y-4">
            {[
              { 
                title: "اجتماع أولياء الأمور", 
                date: "18 أبريل", 
                time: "16:00", 
                color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" 
              },
              { 
                title: "رحلة مدرسية - حديقة العلوم", 
                date: "20 أبريل", 
                time: "09:00", 
                color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" 
              },
              { 
                title: "اختبار نصف الفصل - علوم", 
                date: "22 أبريل", 
                time: "10:30", 
                color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" 
              },
              { 
                title: "مسابقة الخط العربي", 
                date: "25 أبريل", 
                time: "13:00", 
                color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400" 
              },
            ].map((event, index) => (
              <div key={index} className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-primary mr-2"></div>
                <div className={`flex-1 ${event.color} rounded-lg p-3`}>
                  <p className="font-medium">{event.title}</p>
                  <div className="flex text-xs mt-1 opacity-80">
                    <span>{event.date}</span>
                    <span className="mx-2">•</span>
                    <span>{event.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
