import { LogIn, UserPlus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import studentBoy from "@/assets/student-boy-saudi.png";
import studentGirl from "@/assets/student-girl-saudi.png";

const LoginPromptBanner = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  if (user) return null;

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-l from-primary via-primary to-primary/90 p-6 md:p-8 animate-slide-up">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      {/* Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Content */}
        <div className="text-center md:text-right flex-1">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-4 border border-white/20">
            <Sparkles className="w-4 h-4 text-secondary" />
            <span className="text-primary-foreground text-sm font-medium">انضم إلينا اليوم</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-3">
            سجّل دخولك الآن
          </h2>
          <p className="text-primary-foreground/80 mb-6 max-w-md">
            تابع درجات أبنائك، الجدول الدراسي، الواجبات، والمزيد من خلال حسابك الشخصي
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
            <Button
              onClick={() => navigate("/auth")}
              size="lg"
              className="bg-white text-primary hover:bg-white/90 shadow-lg hover:shadow-xl transition-all group"
            >
              <LogIn className="w-5 h-5 ml-2 group-hover:translate-x-[-4px] transition-transform" />
              تسجيل الدخول
            </Button>
            <Button
              onClick={() => navigate("/auth?mode=signup")}
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
            >
              <UserPlus className="w-5 h-5 ml-2" />
              إنشاء حساب جديد
            </Button>
          </div>
        </div>

        {/* Interactive Students */}
        <div className="hidden md:flex items-end gap-3">
          <div className="relative group">
            <div className="absolute inset-0 bg-secondary/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <img
              src={studentGirl}
              alt="طالبة"
              className="relative w-28 h-28 object-cover rounded-2xl border-4 border-white/20 shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3 group-hover:border-secondary/50"
            />
          </div>
          <div className="relative group">
            <div className="absolute inset-0 bg-secondary/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <img
              src={studentBoy}
              alt="طالب"
              className="relative w-32 h-32 object-cover rounded-2xl border-4 border-white/20 shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:border-secondary/50 -mb-2"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPromptBanner;
