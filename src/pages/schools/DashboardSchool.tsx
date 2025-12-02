import { useParams, useNavigate } from "react-router-dom";
import {
  User,
  Calendar,
  FileText,
  BookOpen,
  DollarSign,
  Bus,
  MessageSquare,
  PartyPopper,
  Library,
  ClipboardCheck,
  GraduationCap,
} from "lucide-react";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { schools } from "@/contexts/SchoolContext";
import { cn } from "@/lib/utils";

const DashboardSchool = () => {
  const { schoolId } = useParams();
  const navigate = useNavigate();
  const school = schools[schoolId || ""];

  if (!school) {
    return <div>المدرسة غير موجودة</div>;
  }

  const menuItems = [
    { icon: User, label: "بيانات الطالب", path: `/${schoolId}/student-profile`, color: "text-blue-500" },
    { icon: Calendar, label: "الجدول الدراسي", path: `/${schoolId}/schedule`, color: "text-green-500" },
    { icon: FileText, label: "الواجبات والمهام", path: `/${schoolId}/homework`, color: "text-purple-500" },
    { icon: GraduationCap, label: "الاختبارات والنتائج", path: `/${schoolId}/exams`, color: "text-red-500" },
    { icon: ClipboardCheck, label: "الحضور والانصراف", path: `/${schoolId}/attendance`, color: "text-orange-500" },
    { icon: DollarSign, label: "الرسوم والسداد", path: `/${schoolId}/fees`, color: "text-yellow-500" },
    { icon: Bus, label: "النقل المدرسي", path: `/${schoolId}/transport`, color: "text-cyan-500" },
    { icon: MessageSquare, label: "الرسائل والتواصل", path: `/${schoolId}/messages`, color: "text-pink-500" },
    { icon: PartyPopper, label: "الأنشطة والفعاليات", path: `/${schoolId}/activities`, color: "text-indigo-500" },
    { icon: Library, label: "المكتبة الرقمية", path: `/${schoolId}/library`, color: "text-teal-500" },
    { icon: BookOpen, label: "معرض المدرسة", path: `/${schoolId}/gallery`, color: "text-rose-500" },
  ];

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />

      <main className="container mx-auto px-4 py-6 space-y-6">
        <Card variant="gradient" className="p-6 text-center">
          <div className="mb-3">
            <img 
              src={school.logo} 
              alt={school.name}
              className="w-20 h-20 mx-auto object-contain"
            />
          </div>
          <h1 className="text-2xl font-bold text-primary-foreground mb-2">{school.name}</h1>
          <p className="text-primary-foreground/80">{school.description}</p>
          <Badge variant="secondary" className="mt-3">{school.nameEn}</Badge>
        </Card>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.path}
                variant="elevated"
                className="cursor-pointer hover:scale-105 transition-transform animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => navigate(item.path)}
              >
                <div className="p-4 flex flex-col items-center gap-2 text-center">
                  <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center bg-muted/50", item.color)}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </main>

      <BottomNavigation schoolId={schoolId} />
    </div>
  );
};

export default DashboardSchool;
