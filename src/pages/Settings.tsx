
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Bell, Moon, Sun, User, Globe, Lock, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/components/ui/use-toast";

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const { user, profile, updateProfile, signOut } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);
  
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });

  // تحميل البيانات من الملف الشخصي عند تغييره
  useEffect(() => {
    if (profile) {
      setFormData({
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        email: profile.email || "",
        phone: profile.phone || "",
      });
    }
  }, [profile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = async () => {
    setIsUpdating(true);
    try {
      await updateProfile({
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone: formData.phone,
      });
    } finally {
      setIsUpdating(false);
    }
  };

  // حساب الحروف الأولى من الاسم لعرضها في Avatar fallback
  const getInitials = () => {
    if (!profile) return "؟؟";
    return `${profile.first_name?.[0] || ""}${profile.last_name?.[0] || ""}`;
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-lg">يجب تسجيل الدخول لعرض الإعدادات</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">الإعدادات</h1>
        <Button onClick={signOut} variant="outline">تسجيل الخروج</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              الملف الشخصي
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center mb-6">
              <Avatar className="w-24 h-24">
                <AvatarImage src={profile?.avatar_url || ""} />
                <AvatarFallback className="text-lg">{getInitials()}</AvatarFallback>
              </Avatar>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first_name">الاسم الأول</Label>
                <Input
                  id="first_name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last_name">الاسم الأخير</Label>
                <Input
                  id="last_name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <Input
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled
              />
              <p className="text-xs text-muted-foreground">
                لا يمكن تغيير البريد الإلكتروني
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">رقم الهاتف</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone || ""}
                onChange={handleChange}
              />
            </div>

            <Button 
              onClick={handleUpdateProfile} 
              className="w-full" 
              disabled={isUpdating}
            >
              {isUpdating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> جاري الحفظ...
                </>
              ) : (
                "حفظ التغييرات"
              )}
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                إعدادات الإشعارات
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>إشعارات البريد الإلكتروني</Label>
                  <p className="text-sm text-muted-foreground">استلام الإشعارات عبر البريد الإلكتروني</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>إشعارات المتصفح</Label>
                  <p className="text-sm text-muted-foreground">استلام إشعارات المتصفح الفورية</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                إعدادات التفضيلات
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>الوضع المظلم</Label>
                  <p className="text-sm text-muted-foreground">تبديل مظهر التطبيق</p>
                </div>
                <div className="flex items-center gap-2">
                  {theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                  <Switch
                    checked={theme === "dark"}
                    onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                الأمان والخصوصية
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>المصادقة الثنائية</Label>
                  <p className="text-sm text-muted-foreground">تفعيل المصادقة الثنائية لحسابك</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>تغيير كلمة المرور</Label>
                  <p className="text-sm text-muted-foreground">قم بتحديث كلمة المرور الخاصة بك</p>
                </div>
                <Button variant="outline">تغيير</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
