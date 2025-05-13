
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { Profile } from '@/types/database';
import { toast } from '@/components/ui/use-toast';

type AuthContextType = {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, firstName: string, lastName: string, role: 'teacher' | 'admin' | 'student') => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<Profile>) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// دالة لتنظيف حالة المصادقة
const cleanupAuthState = () => {
  // إزالة الرموز القياسية للمصادقة
  localStorage.removeItem('supabase.auth.token');
  // إزالة جميع مفاتيح Supabase من localStorage
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      localStorage.removeItem(key);
    }
  });
  // إزالة من sessionStorage إذا كانت مستخدمة
  Object.keys(sessionStorage || {}).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      sessionStorage.removeItem(key);
    }
  });
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // إعداد مستمع لتغييرات حالة المصادقة أولاً
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          setTimeout(() => {
            fetchUserProfile(session.user.id);
          }, 0);
        } else {
          setProfile(null);
        }
      }
    );

    // التحقق من وجود جلسة
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchUserProfile(session.user.id);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }

      if (data) {
        setProfile(data as Profile);
      }
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
    }
  };

  const signUp = async (
    email: string, 
    password: string, 
    firstName: string, 
    lastName: string, 
    role: 'teacher' | 'admin' | 'student'
  ) => {
    try {
      // تنظيف حالة المصادقة أولاً
      cleanupAuthState();
      
      // محاولة تسجيل خروج عام
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        // استمر حتى لو فشل هذا
      }
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            role: role
          }
        }
      });

      if (error) {
        toast({
          title: "خطأ في إنشاء الحساب",
          description: error.message,
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "تم إنشاء الحساب بنجاح",
        description: "يرجى تسجيل الدخول للمتابعة",
      });
    } catch (error: any) {
      toast({
        title: "خطأ غير متوقع",
        description: error.message || "حدث خطأ أثناء إنشاء الحساب",
        variant: "destructive"
      });
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      // تنظيف حالة المصادقة أولاً
      cleanupAuthState();
      
      // محاولة تسجيل خروج عام
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        // استمر حتى لو فشل هذا
      }
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        toast({
          title: "فشل تسجيل الدخول",
          description: error.message,
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "تم تسجيل الدخول بنجاح",
        description: `مرحباً بعودتك!`
      });
      
      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: "خطأ غير متوقع",
        description: error.message || "حدث خطأ أثناء تسجيل الدخول",
        variant: "destructive"
      });
    }
  };

  const signOut = async () => {
    try {
      // تنظيف حالة المصادقة أولاً
      cleanupAuthState();
      
      // محاولة تسجيل خروج عام
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        // تجاهل الأخطاء
      }
      
      // إعادة تحميل الصفحة للحصول على حالة نظيفة
      window.location.href = '/auth';
      
      toast({
        title: "تم تسجيل الخروج بنجاح",
      });
    } catch (error: any) {
      toast({
        title: "خطأ في تسجيل الخروج",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const updateProfile = async (data: Partial<Profile>) => {
    if (!user) {
      toast({
        title: "يجب تسجيل الدخول أولاً",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', user.id);

      if (error) {
        toast({
          title: "فشل تحديث البيانات",
          description: error.message,
          variant: "destructive"
        });
        return;
      }

      // تحديث البيانات محلياً
      setProfile(prev => prev ? { ...prev, ...data } : null);
      
      toast({
        title: "تم تحديث البيانات بنجاح",
      });
    } catch (error: any) {
      toast({
        title: "خطأ غير متوقع",
        description: error.message || "حدث خطأ أثناء تحديث البيانات",
        variant: "destructive"
      });
    }
  };

  const value = {
    user,
    profile,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
