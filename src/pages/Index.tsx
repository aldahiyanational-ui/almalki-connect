import { useState, useEffect } from "react";
import { Newspaper, Phone, CreditCard, Bus, Sparkles, GraduationCap, Users, Award } from "lucide-react";
import SplashScreen from "@/components/SplashScreen";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import SchoolCard from "@/components/SchoolCard";
import QuickAccessCard from "@/components/QuickAccessCard";
import NotificationCarousel from "@/components/NotificationCarousel";
import studentsGroup from "@/assets/students-group-saudi.png";
import studentBoy from "@/assets/student-boy-saudi.png";
import studentGirl from "@/assets/student-girl-saudi.png";
import logoDahiyaBoys from "@/assets/logo-dahiya-boys.png";
import logoDahiyaGirls from "@/assets/logo-dahiya-girls.png";
import logoAjiyal from "@/assets/logo-ajiyal.png";
import logoQanadeeel from "@/assets/logo-qanadeeel.png";

const schools = [
  {
    id: "dahiya-boys",
    name: "مدارس الضاحية الأهلية للبنين",
    description: "ابتدائي - متوسط - ثانوي",
    color: "from-orange-500 to-red-600",
    students: "1,100+",
    location: "حي الضباب",
    phone: "0508704443",
    logo: logoDahiyaBoys,
  },
  {
    id: "dahiya-girls",
    name: "مدارس الضاحية الأهلية بنات",
    description: "رياض أطفال - ابتدائي - متوسط",
    color: "from-pink-500 to-rose-600",
    students: "950+",
    location: "حي الضباب",
    phone: "0539893393",
    logo: logoDahiyaGirls,
  },
  {
    id: "ajiyal",
    name: "مدارس أجيال المعالي الأهلية",
    description: "رياض أطفال - ابتدائي - متوسط",
    color: "from-blue-600 to-purple-600",
    students: "1,200+",
    location: "ضاحية الملك فهد",
    phone: "0558501166",
    logo: logoAjiyal,
  },
  {
    id: "qanadeeel",
    name: "مدارس قناديل الشرق الأهلية",
    description: "رياض أطفال - ابتدائي - متوسط",
    color: "from-emerald-500 to-teal-600",
    students: "800+",
    location: "حي الشعلة",
    phone: "0552229953",
    logo: logoQanadeeel,
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

const stats = [
  { value: "4", label: "مدارس", icon: GraduationCap },
  { value: "4,000+", label: "طالب وطالبة", icon: Users },
  { value: "300+", label: "معلم ومعلمة", icon: Award },
  { value: "25+", label: "عاماً من التميز", icon: Sparkles },
];

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
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
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-foreground rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
            <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-accent rounded-full blur-2xl animate-pulse" style={{ animationDelay: "0.5s" }} />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-right flex-1">
              <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm px-4 py-2 rounded-full mb-4 animate-fade-in border border-primary-foreground/20">
                <Sparkles className="w-4 h-4 text-secondary" />
                <span className="text-primary-foreground text-sm font-medium">مرحباً بكم في الدمام</span>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4 animate-slide-up">
                مجموعة المالكي التعليمية
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl animate-slide-up" style={{ animationDelay: "0.1s" }}>
                نبني أجيالاً متميزة بالعلم والقيم
              </p>
              
              {/* Contact number */}
              <div className="mt-6 inline-flex items-center gap-3 bg-primary-foreground/10 backdrop-blur-sm px-5 py-3 rounded-xl border border-primary-foreground/20 animate-slide-up" style={{ animationDelay: "0.2s" }}>
                <Phone className="w-5 h-5 text-secondary" />
                <span className="text-primary-foreground font-bold text-lg tracking-wider" dir="ltr">920016166</span>
              </div>
            </div>
            
            <div className="hidden md:flex items-end gap-3 animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <div className="relative group">
                <img src={studentGirl} alt="طالبة" className="w-32 h-32 object-cover rounded-2xl shadow-2xl transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-2" />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="relative group">
                <img src={studentBoy} alt="طالب" className="w-36 h-36 object-cover rounded-2xl shadow-2xl transition-transform duration-300 group-hover:scale-105 group-hover:rotate-2 -mb-2" />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>
        </section>

        {/* Students Banner - Mobile */}
        <section className="md:hidden animate-slide-up overflow-hidden rounded-2xl">
          <div className="relative group">
            <img 
              src={studentsGroup} 
              alt="طلاب مجموعة المالكي التعليمية" 
              className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 right-4 text-primary-foreground">
              <p className="text-sm font-medium">طلابنا فخرنا</p>
            </div>
          </div>
        </section>

        {/* Notifications */}
        <section className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <NotificationCarousel />
        </section>

        {/* Schools Grid */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-gradient-to-b from-primary to-secondary rounded-full" />
              <h2 className="text-2xl font-bold text-foreground">مدارسنا</h2>
            </div>
            <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">اختر مدرستك</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {schools.map((school, index) => (
              <SchoolCard key={school.id} {...school} delay={index * 100} />
            ))}
          </div>
        </section>

        {/* Quick Access */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-secondary to-accent rounded-full" />
            <h2 className="text-2xl font-bold text-foreground">الوصول السريع</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quickAccess.map((item, index) => (
              <QuickAccessCard key={item.path} {...item} delay={index * 100} />
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group bg-card rounded-2xl p-6 text-center border border-border/50 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-slide-up cursor-default"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary mb-1 group-hover:scale-110 transition-transform">{stat.value}</div>
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
