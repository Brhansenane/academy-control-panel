
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { MainLayout } from "@/components/layout/MainLayout";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import Dashboard from "@/pages/Dashboard";
import Students from "@/pages/Students";
import StudentDetails from "@/pages/StudentDetails";
import Teachers from "@/pages/Teachers";
import TeacherDetails from "@/pages/TeacherDetails";
import Schedule from "@/pages/Schedule";
import Attendance from "@/pages/Attendance";
import Grades from "@/pages/Grades";
import Messages from "@/pages/Messages";
import Settings from "@/pages/Settings";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";

const queryClient = new QueryClient();

// مكون لحماية المسارات
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center h-screen">جاري التحميل...</div>;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              {/* تحويل الصفحة الرئيسية إلى صفحة تسجيل الدخول */}
              <Route path="/" element={<Navigate to="/auth" replace />} />
              <Route path="/auth" element={<Auth />} />
              
              {/* حماية جميع المسارات الأخرى */}
              <Route element={
                <ProtectedRoute>
                  <MainLayout />
                </ProtectedRoute>
              }>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/students" element={<Students />} />
                <Route path="/students/:id" element={<StudentDetails />} />
                <Route path="/teachers" element={<Teachers />} />
                <Route path="/teachers/:id" element={<TeacherDetails />} />
                <Route path="/schedule" element={<Schedule />} />
                <Route path="/attendance" element={<Attendance />} />
                <Route path="/grades" element={<Grades />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/settings" element={<Settings />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
