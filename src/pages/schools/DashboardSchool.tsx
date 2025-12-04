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
  Phone,
  MapPin,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
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
    { icon: User, label: "بيانات الطالب", path: `/${schoolId}/student-profile`, gradient: "from-blue-500 to-blue-600", bgLight: "bg-blue-500/10" },
    { icon: Calendar, label: "الجدول الدراسي", path: `/${schoolId}/schedule`, gradient: "from-green-500 to-emerald-600", bgLight: "bg-green-500/10" },
    { icon: FileText, label: "الواجبات والمهام", path: `/${schoolId}/homework`, gradient: "from-purple-500 to-violet-600", bgLight: "bg-purple-500/10" },
    { icon: GraduationCap, label: "الاختبارات والنتائج", path: `/${schoolId}/exams`, gradient: "from-red-500 to-rose-600", bgLight: "bg-red-500/10" },
    { icon: ClipboardCheck, label: "الحضور والانصراف", path: `/${schoolId}/attendance`, gradient: "from-orange-500 to-amber-600", bgLight: "bg-orange-500/10" },
    { icon: DollarSign, label: "الرسوم والسداد", path: `/${schoolId}/fees`, gradient: "from-yellow-500 to-orange-500", bgLight: "bg-yellow-500/10" },
    { icon: Bus, label: "النقل المدرسي", path: `/${schoolId}/transport`, gradient: "from-cyan-500 to-teal-600", bgLight: "bg-cyan-500/10" },
    { icon: MessageSquare, label: "الرسائل والتواصل", path: `/${schoolId}/messages`, gradient: "from-pink-500 to-rose-600", bgLight: "bg-pink-500/10" },
    { icon: PartyPopper, label: "الأنشطة والفعاليات", path: `/${schoolId}/activities`, gradient: "from-indigo-500 to-purple-600", bgLight: "bg-indigo-500/10" },
    { icon: Library, label: "المكتبة الرقمية", path: `/${schoolId}/library`, gradient: "from-teal-500 to-cyan-600", bgLight: "bg-teal-500/10" },
    { icon: BookOpen, label: "معرض المدرسة", path: `/${schoolId}/gallery`, gradient: "from-rose-500 to-pink-600", bgLight: "bg-rose-500/10" },
  ];

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* School Hero Card */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-secondary p-8">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/30 rounded-full blur-2xl" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
            {/* School Logo */}
            <div className="relative">
              <div className="w-28 h-28 rounded-2xl bg-white/20 backdrop-blur-sm p-3 shadow-2xl">
                <img 
                  src={school.logo} 
                  alt={school.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-secondary-foreground" />
              </div>
            </div>
            
            {/* School Info */}
            <div className="flex-1 text-center md:text-right">
              <Badge variant="secondary" className="mb-3">
                {school.nameEn}
              </Badge>
              <h1 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-2">
                {school.name}
              </h1>
              <p className="text-primary-foreground/80 mb-4">{school.description}</p>
              
              {/* Contact Info */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                {school.address && (
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                    <MapPin className="w-4 h-4 text-secondary" />
                    <span className="text-primary-foreground text-sm">{school.address}</span>
                  </div>
                )}
                {school.phone && (
                  <a 
                    href={`tel:${school.phone}`}
                    className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-white/20 transition-colors"
                  >
                    <Phone className="w-4 h-4 text-secondary" />
                    <span className="text-primary-foreground text-sm" dir="ltr">{school.phone}</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-card rounded-2xl p-4 text-center border border-border/50 shadow-sm">
            <div className="text-2xl font-bold text-primary">1000+</div>
            <div className="text-xs text-muted-foreground">طالب وطالبة</div>
          </div>
          <div className="bg-card rounded-2xl p-4 text-center border border-border/50 shadow-sm">
            <div className="text-2xl font-bold text-secondary">50+</div>
            <div className="text-xs text-muted-foreground">معلم ومعلمة</div>
          </div>
          <div className="bg-card rounded-2xl p-4 text-center border border-border/50 shadow-sm">
            <div className="text-2xl font-bold text-accent">25+</div>
            <div className="text-xs text-muted-foreground">عام خبرة</div>
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={cn(
                  "group relative overflow-hidden rounded-2xl p-5",
                  "bg-card border border-border/50 shadow-md",
                  "hover:shadow-xl hover:border-primary/30 hover:scale-[1.02]",
                  "transition-all duration-300 ease-out",
                  "animate-slide-up"
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Hover gradient overlay */}
                <div className={cn(
                  "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300",
                  `bg-gradient-to-br ${item.gradient}`
                )} />

                <div className="relative z-10 flex flex-col items-center gap-3 text-center">
                  {/* Icon container */}
                  <div className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center",
                    "transition-all duration-300 group-hover:scale-110",
                    item.bgLight
                  )}>
                    <div className={cn(
                      "w-full h-full rounded-2xl flex items-center justify-center",
                      `bg-gradient-to-br ${item.gradient}`
                    )}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  
                  {/* Label */}
                  <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                    {item.label}
                  </p>
                  
                  {/* Arrow indicator */}
                  <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                    <ArrowLeft className="w-4 h-4 text-primary" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </main>

      <BottomNavigation schoolId={schoolId} />
    </div>
  );
};

export default DashboardSchool;
