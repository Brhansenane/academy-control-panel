
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

export default function Auth() {
  const { user, signIn, signUp, loading } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });
  
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "teacher" as "teacher" | "admin" | "student"
  });

  // إذا كان المستخدم مسجل دخوله بالفعل، انتقل إلى لوحة القيادة
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (value: string) => {
    setRegisterData(prev => ({ 
      ...prev, 
      role: value as "teacher" | "admin" | "student" 
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      toast({
        title: "خطأ",
        description: "الرجاء إدخال البريد الإلكتروني وكلمة المرور",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    try {
      await signIn(loginData.email, loginData.password);
      toast({
        title: "تم تسجيل الدخول بنجاح",
        description: "مرحباً بك في نظام إدارة المدرسة"
      });
      navigate("/dashboard");
    } catch (error: any) {
      toast({
        title: "فشل تسجيل الدخول",
        description: error.message || "حدث خطأ أثناء تسجيل الدخول",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // التحقق من البيانات
    if (!registerData.firstName || !registerData.lastName || !registerData.email || !registerData.password) {
      toast({
        title: "خطأ",
        description: "الرجاء إكمال جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }
    
    if (registerData.password !== registerData.confirmPassword) {
      toast({
        title: "خطأ",
        description: "كلمات المرور غير متطابقة",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    try {
      await signUp(
        registerData.email, 
        registerData.password,
        registerData.firstName,
        registerData.lastName,
        registerData.role
      );
      toast({
        title: "تم إنشاء الحساب بنجاح",
        description: "يرجى تسجيل الدخول للمتابعة"
      });
    } catch (error: any) {
      toast({
        title: "فشل إنشاء الحساب",
        description: error.message || "حدث خطأ أثناء إنشاء الحساب",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">نظام إدارة المدرسة</CardTitle>
          <CardDescription>سجل دخول أو أنشئ حساب جديد</CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="login" dir="rtl">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">تسجيل الدخول</TabsTrigger>
              <TabsTrigger value="register">حساب جديد</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <Input 
                    id="email"
                    name="email"
                    type="email" 
                    placeholder="your@email.com"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="password">كلمة المرور</Label>
                    <Button type="button" variant="link" className="p-0 h-auto text-xs">
                      نسيت كلمة المرور؟
                    </Button>
                  </div>
                  <Input 
                    id="password"
                    name="password"
                    type="password" 
                    placeholder="••••••••"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">الاسم الأول</Label>
                    <Input 
                      id="firstName"
                      name="firstName"
                      placeholder="الاسم الأول"
                      value={registerData.firstName}
                      onChange={handleRegisterChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="lastName">الاسم الأخير</Label>
                    <Input 
                      id="lastName"
                      name="lastName"
                      placeholder="الاسم الأخير" 
                      value={registerData.lastName}
                      onChange={handleRegisterChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="register-email">البريد الإلكتروني</Label>
                  <Input 
                    id="register-email"
                    name="email"
                    type="email" 
                    placeholder="your@email.com"
                    value={registerData.email}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="role">نوع الحساب</Label>
                  <Select 
                    value={registerData.role} 
                    onValueChange={handleRoleChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر نوع الحساب" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="teacher">معلم</SelectItem>
                      <SelectItem value="admin">مسؤول</SelectItem>
                      <SelectItem value="student">طالب</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="register-password">كلمة المرور</Label>
                  <Input 
                    id="register-password"
                    name="password"
                    type="password" 
                    placeholder="••••••••"
                    value={registerData.password}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">تأكيد كلمة المرور</Label>
                  <Input 
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password" 
                    placeholder="••••••••"
                    value={registerData.confirmPassword}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "جاري إنشاء الحساب..." : "إنشاء حساب"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        
        <CardFooter className="text-center text-sm text-muted-foreground">
          جميع الحقوق محفوظة © {new Date().getFullYear()} نظام إدارة المدرسة
        </CardFooter>
      </Card>
    </div>
  );
}
