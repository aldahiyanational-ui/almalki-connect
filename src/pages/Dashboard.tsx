import { useNavigate } from "react-router-dom";
import {
  User,
  Calendar,
  BookOpen,
  FileText,
  Clock,
  CreditCard,
  Bus,
  MessageSquare,
  Trophy,
  Library,
  Settings,
  LogOut,
  ChevronLeft,
} from "lucide-react";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const studentInfo = {
  name: "أحمد محمد المالكي",
  grade: "الصف السادس الابتدائي",
  section: "الشعبة (أ)",
  school: "مدرسة أجيال المعالي",
  id: "STU-2024-1234",
};

const dashboardTiles = [
  {
    icon: User,
    title: "بيانات الطالب",
    description: "معلومات الطالب الشخصية",
    path: "/student-profile",
    color: "bg-primary",
  },
  {
    icon: Calendar,
    title: "الجدول الدراسي",
    description: "مواعيد الحصص اليومية",
    path: "/schedule",
    color: "bg-school-navy",
  },
  {
    icon: BookOpen,
    title: "الواجبات والمهام",
    description: "الواجبات المطلوبة",
    path: "/homework",
    color: "bg-secondary",
  },
  {
    icon: FileText,
    title: "الاختبارات والنتائج",
    description: "الدرجات والتقارير",
    path: "/exams",
    color: "bg-success",
  },
  {
    icon: Clock,
    title: "الحضور والانصراف",
    description: "سجل الحضور اليومي",
    path: "/attendance",
    color: "bg-destructive",
  },
  {
    icon: CreditCard,
    title: "الرسوم والسداد",
    description: "سداد الرسوم إلكترونياً",
    path: "/fees",
    color: "gradient-gold",
  },
  {
    icon: Bus,
    title: "النقل المدرسي",
    description: "تتبع الباص المدرسي",
    path: "/transport",
    color: "bg-primary",
  },
  {
    icon: MessageSquare,
    title: "الرسائل والتواصل",
    description: "التواصل مع المدرسة",
    path: "/messages",
    color: "bg-school-navy",
  },
  {
    icon: Trophy,
    title: "الأنشطة والفعاليات",
    description: "الفعاليات المدرسية",
    path: "/activities",
    color: "bg-secondary",
  },
  {
    icon: Library,
    title: "المكتبة الرقمية",
    description: "الكتب والمراجع",
    path: "/library",
    color: "bg-success",
  },
];

const DashboardTile = ({
  icon: Icon,
  title,
  description,
  path,
  color,
  delay,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  path: string;
  color: string;
  delay: number;
}) => {
  const navigate = useNavigate();

  return (
    <Card
      variant="feature"
      className="cursor-pointer group animate-slide-up"
      style={{ animationDelay: `${delay}ms` }}
      onClick={() => navigate(path)}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform", color)}>
            <Icon className="w-6 h-6 text-primary-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground truncate">{description}</p>
          </div>
          <ChevronLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:-translate-x-1 transition-all" />
        </div>
      </CardContent>
    </Card>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Welcome Card */}
        <Card variant="gradient" className="animate-slide-up">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-primary-foreground/80 text-sm mb-1">مرحباً بك</p>
                <h2 className="text-2xl font-bold text-primary-foreground mb-4">
                  {studentInfo.name}
                </h2>
                <div className="space-y-1 text-sm text-primary-foreground/80">
                  <p>{studentInfo.school}</p>
                  <p>{studentInfo.grade} • {studentInfo.section}</p>
                  <p className="text-primary-foreground/60">رقم الطالب: {studentInfo.id}</p>
                </div>
              </div>
              <div className="w-16 h-16 bg-primary-foreground/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <User className="w-8 h-8 text-primary-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <Card variant="elevated" className="text-center p-4">
            <div className="text-2xl font-bold text-success">95%</div>
            <div className="text-xs text-muted-foreground">نسبة الحضور</div>
          </Card>
          <Card variant="elevated" className="text-center p-4">
            <div className="text-2xl font-bold text-primary">A+</div>
            <div className="text-xs text-muted-foreground">المعدل العام</div>
          </Card>
          <Card variant="elevated" className="text-center p-4">
            <div className="text-2xl font-bold text-secondary">3</div>
            <div className="text-xs text-muted-foreground">واجبات معلقة</div>
          </Card>
        </div>

        {/* Dashboard Tiles */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">الخدمات</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {dashboardTiles.map((tile, index) => (
              <DashboardTile key={tile.path} {...tile} delay={index * 50} />
            ))}
          </div>
        </section>

        {/* Settings & Logout */}
        <section className="flex gap-3 animate-slide-up" style={{ animationDelay: "0.5s" }}>
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => navigate("/settings")}
          >
            <Settings className="w-5 h-5 ml-2" />
            الإعدادات
          </Button>
          <Button
            variant="outline"
            className="flex-1 text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
            onClick={() => navigate("/")}
          >
            <LogOut className="w-5 h-5 ml-2" />
            تسجيل الخروج
          </Button>
        </section>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default Dashboard;
