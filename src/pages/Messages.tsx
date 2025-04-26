
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Search, Send, User } from "lucide-react";

// Mock messages data
const MESSAGES = [
  {
    id: 1,
    sender: "أحمد المعلم",
    content: "مرحباً، هل يمكنني مساعدتك في شيء ما؟",
    timestamp: "10:30 ص",
    isMe: false,
  },
  {
    id: 2,
    sender: "أنت",
    content: "نعم، لدي بعض الأسئلة حول الواجب المنزلي",
    timestamp: "10:32 ص",
    isMe: true,
  },
  {
    id: 3,
    sender: "أحمد المعلم",
    content: "تفضل، أنا هنا للمساعدة",
    timestamp: "10:33 ص",
    isMe: false,
  },
];

export default function Messages() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">الرسائل</h1>
        <div className="flex gap-4">
          <div className="relative w-64">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="search"
              placeholder="بحث في الرسائل..."
              className="pl-3 pr-10"
              dir="rtl"
            />
          </div>
          <Button>رسالة جديدة</Button>
        </div>
      </div>

      <div className="grid md:grid-cols-[300px_1fr] gap-6">
        {/* Contacts List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">المحادثات</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {[
                "أحمد المعلم",
                "سارة المعلمة",
                "محمد المدير",
                "فاطمة المرشدة",
              ].map((contact) => (
                <button
                  key={contact}
                  className="w-full p-4 flex items-center gap-3 hover:bg-muted/50 transition-colors text-right"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{contact}</div>
                    <div className="text-sm text-muted-foreground">آخر رسالة هنا...</div>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card>
          <CardHeader className="border-b">
            <CardTitle className="text-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-5 h-5" />
                </div>
                <span>أحمد المعلم</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[calc(100vh-400px)] flex flex-col">
              <div className="flex-1 space-y-4 py-4 overflow-y-auto">
                {MESSAGES.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isMe ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.isMe
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      {!message.isMe && (
                        <div className="font-medium mb-1">{message.sender}</div>
                      )}
                      <div>{message.content}</div>
                      <div
                        className={`text-xs mt-1 ${
                          message.isMe
                            ? "text-primary-foreground/80"
                            : "text-muted-foreground"
                        }`}
                      >
                        {message.timestamp}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4 mt-4">
                <form className="flex gap-4">
                  <Textarea
                    placeholder="اكتب رسالتك هنا..."
                    className="min-h-[80px]"
                    dir="rtl"
                  />
                  <Button type="submit" size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
