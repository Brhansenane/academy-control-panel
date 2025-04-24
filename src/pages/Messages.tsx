
import React from "react";
import { Search, UserPlus, Circle } from "lucide-react";

// Mock messages data
const MESSAGES_DATA = [
  {
    id: 1,
    sender: "أحمد محمد",
    role: "مدرس",
    message: "السلام عليكم، أود إبلاغكم بموعد الاجتماع القادم",
    time: "10:30 ص",
    date: "اليوم",
    unread: true,
  },
  {
    id: 2,
    sender: "سارة خالد",
    role: "ولي أمر",
    message: "شكراً على المتابعة المستمرة",
    time: "9:15 ص",
    date: "اليوم",
    unread: false,
  },
  {
    id: 3,
    sender: "محمد عمر",
    role: "مدير",
    message: "تم تحديث جدول الاختبارات النهائية",
    time: "أمس",
    date: "الأمس",
    unread: true,
  }
];

export default function Messages() {
  return (
    <div className="animate-fade-in space-y-6" dir="rtl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">الرسائل</h1>
          <p className="text-muted-foreground">إدارة المراسلات والإشعارات</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <UserPlus size={16} /> رسالة جديدة
        </button>
      </div>

      {/* Search */}
      <div className="glass-card p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="البحث في الرسائل..."
            className="w-full pl-10 pr-4 py-2 rounded-md border bg-background"
          />
        </div>
      </div>

      {/* Messages List */}
      <div className="glass-card divide-y">
        {MESSAGES_DATA.map((message) => (
          <div
            key={message.id}
            className="p-4 hover:bg-muted/50 cursor-pointer transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4 space-x-reverse">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  {message.sender[0]}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{message.sender}</h3>
                    <span className="text-sm text-muted-foreground">
                      {message.role}
                    </span>
                    {message.unread && (
                      <Circle className="w-2 h-2 fill-primary text-primary" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {message.message}
                  </p>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                <div>{message.time}</div>
                <div>{message.date}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
