import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SchoolProfile from "./pages/SchoolProfile";
import News from "./pages/News";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

// School-specific pages
import DashboardSchool from "./pages/schools/DashboardSchool";
import StudentProfileSchool from "./pages/schools/StudentProfileSchool";
import ScheduleSchool from "./pages/schools/ScheduleSchool";
import GallerySchool from "./pages/schools/GallerySchool";

// Import existing pages for school routes
import StudentProfile from "./pages/StudentProfile";
import Schedule from "./pages/Schedule";
import Homework from "./pages/Homework";
import Exams from "./pages/Exams";
import Attendance from "./pages/Attendance";
import Fees from "./pages/Fees";
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
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/school/:id" element={<SchoolProfile />} />
          <Route path="/news" element={<News />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/student-profile" element={<StudentProfile />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/homework" element={<Homework />} />
          <Route path="/exams" element={<Exams />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/fees" element={<Fees />} />
          <Route path="/transport" element={<Transport />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/library" element={<Library />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/school-gallery/:schoolId" element={<SchoolGallery />} />
          
          {/* School-specific routes */}
          <Route path="/:schoolId/dashboard" element={<DashboardSchool />} />
          <Route path="/:schoolId/student-profile" element={<StudentProfileSchool />} />
          <Route path="/:schoolId/schedule" element={<ScheduleSchool />} />
          <Route path="/:schoolId/homework" element={<Homework />} />
          <Route path="/:schoolId/exams" element={<Exams />} />
          <Route path="/:schoolId/attendance" element={<Attendance />} />
          <Route path="/:schoolId/fees" element={<Fees />} />
          <Route path="/:schoolId/transport" element={<Transport />} />
          <Route path="/:schoolId/messages" element={<Messages />} />
          <Route path="/:schoolId/activities" element={<Activities />} />
          <Route path="/:schoolId/library" element={<Library />} />
          <Route path="/:schoolId/settings" element={<Settings />} />
          <Route path="/:schoolId/gallery" element={<GallerySchool />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
