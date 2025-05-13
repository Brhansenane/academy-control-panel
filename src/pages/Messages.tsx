
import React, { useEffect, useState, useRef } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Search, Send, User, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { Message, Profile } from "@/types/database";

type Contact = {
  contact_id: string;
  first_name: string;
  last_name: string;
  avatar_url: string | null;
  latest_message: string;
  latest_sent_at: string;
  unread_count: number;
};

type ChatMessage = {
  id: string;
  content: string;
  sent_at: string;
  read: boolean;
  is_sender: boolean;
};

export default function Messages() {
  const { user } = useAuth();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [loadingContacts, setLoadingContacts] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // جلب قائمة المحادثات
  useEffect(() => {
    if (!user) return;
    
    const fetchContacts = async () => {
      try {
        setLoadingContacts(true);
        const { data, error } = await supabase
          .rpc('get_user_conversations', { user_id: user.id });
        
        if (error) {
          throw error;
        }
        
        setContacts(data || []);
      } catch (error: any) {
        console.error("Error fetching contacts:", error);
        toast({
          title: "خطأ في جلب المحادثات",
          description: error.message,
          variant: "destructive"
        });
      } finally {
        setLoadingContacts(false);
      }
    };
    
    fetchContacts();
    
    // إعداد مستمع للرسائل الجديدة في الوقت الحقيقي
    const channel = supabase
      .channel('messages_changes')
      .on(
        'postgres_changes',
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'messages',
          filter: `receiver_id=eq.${user.id}`
        },
        (payload) => {
          // تحديث المحادثات عند استلام رسالة جديدة
          fetchContacts();
          
          // تحديث الرسائل إذا كانت المحادثة الحالية مفتوحة
          if (selectedContact && payload.new && 
            (payload.new.sender_id === selectedContact.contact_id || 
             payload.new.receiver_id === selectedContact.contact_id)) {
            fetchMessages(selectedContact.contact_id);
          }
        }
      )
      .subscribe();
      
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, selectedContact]);
  
  // جلب رسائل المحادثة المحددة
  const fetchMessages = async (contactId: string) => {
    if (!user) return;
    
    try {
      setLoadingMessages(true);
      const { data, error } = await supabase
        .rpc('get_conversation_messages', { 
          user1_id: user.id,
          user2_id: contactId
        });
      
      if (error) {
        throw error;
      }
      
      setMessages(data || []);
      
      // تحديث حالة القراءة للرسائل المستلمة
      await supabase
        .from('messages')
        .update({ read: true })
        .eq('sender_id', contactId)
        .eq('receiver_id', user.id)
        .eq('read', false);
        
      // تحديث قائمة المحادثات لتعكس الرسائل المقروءة
      setContacts(contacts.map(contact => 
        contact.contact_id === contactId 
          ? { ...contact, unread_count: 0 }
          : contact
      ));
      
    } catch (error: any) {
      console.error("Error fetching messages:", error);
      toast({
        title: "خطأ في جلب الرسائل",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoadingMessages(false);
      // التمرير إلى آخر رسالة
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };
  
  // التمرير إلى آخر رسالة عند استلام رسائل جديدة
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  // تحديد محادثة
  const selectContact = (contact: Contact) => {
    setSelectedContact(contact);
    fetchMessages(contact.contact_id);
  };
  
  // إرسال رسالة جديدة
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !selectedContact || !newMessage.trim()) return;
    
    try {
      setSendingMessage(true);
      
      const { error } = await supabase
        .from('messages')
        .insert({
          sender_id: user.id,
          receiver_id: selectedContact.contact_id,
          content: newMessage.trim()
        });
      
      if (error) throw error;
      
      // إضافة الرسالة المرسلة إلى القائمة
      const newMsg: ChatMessage = {
        id: Date.now().toString(), // مؤقت حتى يتم تحديث القائمة
        content: newMessage,
        sent_at: new Date().toISOString(),
        read: false,
        is_sender: true
      };
      
      setMessages([...messages, newMsg]);
      setNewMessage("");
      
      // إعادة جلب الرسائل للتأكد من عرض الرسالة المرسلة بشكل صحيح
      setTimeout(() => {
        fetchMessages(selectedContact.contact_id);
      }, 500);
      
    } catch (error: any) {
      console.error("Error sending message:", error);
      toast({
        title: "خطأ في إرسال الرسالة",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setSendingMessage(false);
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  // إنشاء محادثة جديدة
  const handleNewConversation = async () => {
    try {
      // هنا يمكن إضافة منطق إنشاء محادثة جديدة
      // مثلاً عرض نافذة منبثقة لاختيار مستخدم من قائمة المستخدمين
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('*')
        .neq('id', user!.id);
        
      if (error) throw error;
      
      if (profiles && profiles.length > 0) {
        // هنا يمكن عرض قائمة المستخدمين في واجهة
        toast({
          title: "تنبيه",
          description: "سيتم إضافة واجهة لإنشاء محادثات جديدة قريباً"
        });
      }
    } catch (error: any) {
      console.error("Error fetching profiles:", error);
      toast({
        title: "خطأ",
        description: error.message,
        variant: "destructive"
      });
    }
  };
  
  // تصفية جهات الاتصال بناءً على نص البحث
  const filteredContacts = contacts.filter(contact => {
    const fullName = `${contact.first_name} ${contact.last_name}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button onClick={handleNewConversation}>رسالة جديدة</Button>
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
              {loadingContacts ? (
                <div className="flex justify-center items-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : filteredContacts.length > 0 ? (
                filteredContacts.map((contact) => (
                  <button
                    key={contact.contact_id}
                    className={`w-full p-4 flex items-center gap-3 hover:bg-muted/50 transition-colors text-right ${
                      selectedContact?.contact_id === contact.contact_id ? 'bg-muted' : ''
                    }`}
                    onClick={() => selectContact(contact)}
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      {contact.avatar_url ? (
                        <img 
                          src={contact.avatar_url} 
                          alt={`${contact.first_name} ${contact.last_name}`} 
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <User className="w-5 h-5" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium flex justify-between">
                        <span>{`${contact.first_name} ${contact.last_name}`}</span>
                        {contact.unread_count > 0 && (
                          <span className="bg-primary text-primary-foreground text-xs rounded-full px-2 py-0.5">
                            {contact.unread_count}
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground truncate" style={{ maxWidth: "200px" }}>
                        {contact.latest_message || "بدء محادثة جديدة..."}
                      </div>
                    </div>
                  </button>
                ))
              ) : (
                <div className="p-6 text-center text-muted-foreground">
                  لا توجد محادثات متاحة
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card>
          {selectedContact ? (
            <>
              <CardHeader className="border-b">
                <CardTitle className="text-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      {selectedContact.avatar_url ? (
                        <img 
                          src={selectedContact.avatar_url} 
                          alt={`${selectedContact.first_name} ${selectedContact.last_name}`} 
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <User className="w-5 h-5" />
                      )}
                    </div>
                    <span>{`${selectedContact.first_name} ${selectedContact.last_name}`}</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[calc(100vh-400px)] flex flex-col">
                  <div className="flex-1 space-y-4 py-4 overflow-y-auto">
                    {loadingMessages ? (
                      <div className="flex justify-center items-center h-full">
                        <Loader2 className="h-8 w-8 animate-spin" />
                      </div>
                    ) : messages.length > 0 ? (
                      messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.is_sender ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[80%] rounded-lg p-3 ${
                              message.is_sender
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted"
                            }`}
                          >
                            <div>{message.content}</div>
                            <div
                              className={`text-xs mt-1 ${
                                message.is_sender
                                  ? "text-primary-foreground/80"
                                  : "text-muted-foreground"
                              }`}
                            >
                              {new Date(message.sent_at).toLocaleTimeString('ar-EG', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="flex justify-center items-center h-full text-muted-foreground">
                        ابدأ المحادثة الآن
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                  <div className="border-t pt-4 mt-4">
                    <form className="flex gap-4" onSubmit={handleSendMessage}>
                      <Textarea
                        placeholder="اكتب رسالتك هنا..."
                        className="min-h-[80px]"
                        dir="rtl"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        disabled={sendingMessage}
                      />
                      <Button type="submit" size="icon" disabled={sendingMessage || !newMessage.trim()}>
                        {sendingMessage ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                      </Button>
                    </form>
                  </div>
                </div>
              </CardContent>
            </>
          ) : (
            <div className="flex justify-center items-center h-[50vh] text-muted-foreground">
              اختر محادثة من القائمة
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
