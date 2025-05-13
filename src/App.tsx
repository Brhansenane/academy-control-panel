
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { MainLayout } from "@/components/layout/MainLayout";
import { AuthProvider } from "@/context/AuthContext";
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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route element={<MainLayout />}>
                <Route path="/" element={<Dashboard />} />
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
