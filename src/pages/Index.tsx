import { useState, useEffect } from "react";
import { Newspaper, Phone, CreditCard, Bus } from "lucide-react";
import SplashScreen from "@/components/SplashScreen";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import SchoolCard from "@/components/SchoolCard";
import QuickAccessCard from "@/components/QuickAccessCard";
import NotificationCarousel from "@/components/NotificationCarousel";
import studentsGroup from "@/assets/students-group-saudi.png";
import studentBoy from "@/assets/student-boy-saudi.png";
import studentGirl from "@/assets/student-girl-saudi.png";

const schools = [
  {
    id: "ajiyal",
    name: "أجيال المعالي الأهلية",
    description: "تعليم متميز لأجيال المستقبل مع رؤية تربوية شاملة",
    color: "bg-primary",
    students: "1,200+",
    location: "الدمام",
  },
  {
    id: "qanadeeel",
    name: "قناديل الشرق الأهلية",
    description: "إضاءة طريق العلم والمعرفة لبناء جيل واعد",
    color: "bg-secondary",
    students: "800+",
    location: "الدمام",
  },
  {
    id: "dahiya-girls",
    name: "الضاحية للبنات",
    description: "بيئة تعليمية آمنة ومحفزة للطالبات",
    color: "gradient-primary",
    students: "950+",
    location: "الدمام",
  },
  {
    id: "dahiya-boys",
    name: "الضاحية للبنين",
    description: "تنمية شاملة للطلاب في بيئة تربوية متكاملة",
    color: "bg-school-navy",
    students: "1,100+",
    location: "الدمام",
  },
];

const quickAccess = [
  {
    icon: Newspaper,
    title: "الأخبار والإعلانات",
    description: "آخر المستجدات والفعاليات",
    path: "/news",
    color: "bg-primary",
  },
  {
    icon: Phone,
    title: "تواصل معنا",
    description: "نحن هنا لمساعدتك",
    path: "/contact",
    color: "bg-success",
  },
  {
    icon: CreditCard,
    title: "بوابة الدفع",
    description: "سداد الرسوم إلكترونياً",
    path: "/payment",
    color: "bg-secondary",
  },
  {
    icon: Bus,
    title: "النقل المدرسي",
    description: "تتبع الباص ومعلومات النقل",
    path: "/transport",
    color: "bg-destructive",
  },
];

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Check if splash was already shown
    const splashShown = sessionStorage.getItem("splashShown");
    if (splashShown) {
      setShowSplash(false);
    }
  }, []);

  const handleSplashComplete = () => {
    sessionStorage.setItem("splashShown", "true");
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />

      <main className="container mx-auto px-4 py-6 space-y-8">
        {/* Hero Section */}
        <section className="relative gradient-hero rounded-3xl p-8 md:p-12 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-foreground rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-right flex-1">
              <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm px-4 py-2 rounded-full mb-4 animate-fade-in">
                <span className="text-primary-foreground text-sm font-medium">مرحباً بكم في الدمام</span>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4 animate-slide-up">
                مجموعة المالكي التعليمية
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl animate-slide-up" style={{ animationDelay: "0.1s" }}>
                نبني أجيالاً متميزة بالعلم والقيم
              </p>
            </div>
            
            <div className="hidden md:flex items-end gap-2 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <img src={studentGirl} alt="طالبة" className="w-28 h-28 object-cover rounded-2xl shadow-lg" />
              <img src={studentBoy} alt="طالب" className="w-32 h-32 object-cover rounded-2xl shadow-lg -mb-2" />
            </div>
          </div>
        </section>

        {/* Students Banner - Mobile */}
        <section className="md:hidden animate-slide-up">
          <img 
            src={studentsGroup} 
            alt="طلاب مجموعة المالكي التعليمية" 
            className="w-full h-48 object-cover rounded-2xl shadow-lg"
          />
        </section>

        {/* Notifications */}
        <section className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <NotificationCarousel />
        </section>

        {/* Schools Grid */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">مدارسنا</h2>
            <span className="text-sm text-muted-foreground">اختر مدرستك</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {schools.map((school, index) => (
              <SchoolCard key={school.id} {...school} delay={index * 100} />
            ))}
          </div>
        </section>

        {/* Quick Access */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">الوصول السريع</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quickAccess.map((item, index) => (
              <QuickAccessCard key={item.path} {...item} delay={index * 100} />
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-slide-up">
          {[
            { value: "4", label: "مدارس" },
            { value: "4,000+", label: "طالب وطالبة" },
            { value: "300+", label: "معلم ومعلمة" },
            { value: "25+", label: "عاماً من التميز" },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-6 text-center border border-border/50 shadow-md"
            >
              <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </section>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default Index;
