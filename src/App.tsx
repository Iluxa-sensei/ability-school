import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AccessibilityPanel from "@/components/accessibility/AccessibilityPanel";
import VoiceNavigation from "@/components/accessibility/VoiceNavigation";
import "@/styles/accessibility.css";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PublicLayout from "./layouts/PublicLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivacyPolicy from "./pages/PrivacyPolicy";
// Student pages
import StudentSchedule from "./pages/dashboard/student/Schedule";
import StudentHomework from "./pages/dashboard/student/Homework";
import StudentClassroom from "./pages/dashboard/student/Classroom";
import StudentAIChat from "./pages/dashboard/student/AIChat";
import StudentAchievements from "./pages/dashboard/student/Achievements";
import StudentAIPsychologist from "./pages/dashboard/student/AIPsychologist";
import StudentProfile from "./pages/dashboard/student/Profile";
// Parent pages
import ParentOverview from "./pages/dashboard/parent/Overview";
import ParentProfile from "./pages/dashboard/parent/Profile";
// Teacher pages
import TeacherClasses from "./pages/dashboard/teacher/Classes";
import TeacherAssignments from "./pages/dashboard/teacher/Assignments";
import TeacherAIPlanner from "./pages/dashboard/teacher/AIPlanner";
import TeacherClassroom from "./pages/dashboard/teacher/Classroom";
import TeacherProfile from "./pages/dashboard/teacher/Profile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          {/* Public layout with landing navbar/footer */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Dashboard layout with sidebar and nested routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="student">
              <Route index element={<Navigate to="schedule" replace />} />
              <Route path="schedule" element={<StudentSchedule />} />
              <Route path="homework" element={<StudentHomework />} />
              <Route path="classroom" element={<StudentClassroom />} />
              <Route path="ai-chat" element={<StudentAIChat />} />
              <Route path="achievements" element={<StudentAchievements />} />
              <Route path="ai-psychologist" element={<StudentAIPsychologist />} />
              <Route path="profile" element={<StudentProfile />} />
            </Route>

            <Route path="parent">
              <Route index element={<Navigate to="overview" replace />} />
              <Route path="overview" element={<ParentOverview />} />
              <Route path="profile" element={<ParentProfile />} />
            </Route>

            <Route path="teacher">
              <Route index element={<Navigate to="classes" replace />} />
              <Route path="classes" element={<TeacherClasses />} />
              <Route path="assignments" element={<TeacherAssignments />} />
              <Route path="ai-planner" element={<TeacherAIPlanner />} />
              <Route path="classroom" element={<TeacherClassroom />} />
              <Route path="profile" element={<TeacherProfile />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
        
        {/* Global Accessibility Components */}
        <AccessibilityPanel />
        <VoiceNavigation />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
