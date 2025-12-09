import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import RoleBasedDashboard from "@/components/RoleBasedDashboard";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import SchoolProfile from "./pages/SchoolProfile";
import News from "./pages/News";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

// School-specific pages
import DashboardSchool from "./pages/schools/DashboardSchool";
import StudentProfileSchool from "./pages/schools/StudentProfileSchool";
import ScheduleSchool from "./pages/schools/ScheduleSchool";
import GallerySchool from "./pages/schools/GallerySchool";
import HomeworkSchool from "./pages/schools/HomeworkSchool";
import ExamsSchool from "./pages/schools/ExamsSchool";
import AttendanceSchool from "./pages/schools/AttendanceSchool";
import FeesSchool from "./pages/schools/FeesSchool";
import TransportSchool from "./pages/schools/TransportSchool";
import MessagesSchool from "./pages/schools/MessagesSchool";
import ActivitiesSchool from "./pages/schools/ActivitiesSchool";
import LibrarySchool from "./pages/schools/LibrarySchool";
import SettingsSchool from "./pages/schools/SettingsSchool";

// Import existing pages for non-school routes
import StudentProfile from "./pages/StudentProfile";
import Schedule from "./pages/Schedule";
import Homework from "./pages/Homework";
import Exams from "./pages/Exams";
import Attendance from "./pages/Attendance";
import Fees from "./pages/Fees";
import Payment from "./pages/Payment";
import Transport from "./pages/Transport";
import Messages from "./pages/Messages";
import Activities from "./pages/Activities";
import Library from "./pages/Library";
import Settings from "./pages/Settings";
import SchoolGallery from "./pages/SchoolGallery";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/dashboard" element={<ProtectedRoute><RoleBasedDashboard /></ProtectedRoute>} />
            <Route path="/school/:id" element={<SchoolProfile />} />
            <Route path="/news" element={<News />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/student-profile" element={<ProtectedRoute><StudentProfile /></ProtectedRoute>} />
            <Route path="/schedule" element={<ProtectedRoute><Schedule /></ProtectedRoute>} />
            <Route path="/homework" element={<ProtectedRoute><Homework /></ProtectedRoute>} />
            <Route path="/exams" element={<ProtectedRoute><Exams /></ProtectedRoute>} />
            <Route path="/attendance" element={<ProtectedRoute><Attendance /></ProtectedRoute>} />
            <Route path="/fees" element={<ProtectedRoute><Fees /></ProtectedRoute>} />
            <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
            <Route path="/transport" element={<ProtectedRoute><Transport /></ProtectedRoute>} />
            <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
            <Route path="/activities" element={<ProtectedRoute><Activities /></ProtectedRoute>} />
            <Route path="/library" element={<ProtectedRoute><Library /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="/school-gallery/:schoolId" element={<SchoolGallery />} />
            
            {/* School-specific routes */}
            <Route path="/:schoolId/dashboard" element={<ProtectedRoute><DashboardSchool /></ProtectedRoute>} />
            <Route path="/:schoolId/student-profile" element={<ProtectedRoute><StudentProfileSchool /></ProtectedRoute>} />
            <Route path="/:schoolId/schedule" element={<ProtectedRoute><ScheduleSchool /></ProtectedRoute>} />
            <Route path="/:schoolId/homework" element={<ProtectedRoute><HomeworkSchool /></ProtectedRoute>} />
            <Route path="/:schoolId/exams" element={<ProtectedRoute><ExamsSchool /></ProtectedRoute>} />
            <Route path="/:schoolId/attendance" element={<ProtectedRoute><AttendanceSchool /></ProtectedRoute>} />
            <Route path="/:schoolId/fees" element={<ProtectedRoute><FeesSchool /></ProtectedRoute>} />
            <Route path="/:schoolId/transport" element={<ProtectedRoute><TransportSchool /></ProtectedRoute>} />
            <Route path="/:schoolId/messages" element={<ProtectedRoute><MessagesSchool /></ProtectedRoute>} />
            <Route path="/:schoolId/activities" element={<ProtectedRoute><ActivitiesSchool /></ProtectedRoute>} />
            <Route path="/:schoolId/library" element={<ProtectedRoute><LibrarySchool /></ProtectedRoute>} />
            <Route path="/:schoolId/settings" element={<ProtectedRoute><SettingsSchool /></ProtectedRoute>} />
            <Route path="/:schoolId/gallery" element={<ProtectedRoute><GallerySchool /></ProtectedRoute>} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
