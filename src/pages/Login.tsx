import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GraduationCap, Eye, EyeOff, User, Lock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "تم تسجيل الدخول بنجاح",
        description: "مرحباً بك في تطبيق مدارس المالكي",
      });
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen gradient-hero relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary-foreground/5 rounded-full blur-3xl" />
      </div>

      {/* Back button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 right-6 z-20 flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>الرئيسية</span>
      </button>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8">
        {/* Logo */}
        <div className="mb-8 text-center animate-slide-up">
          <div className="w-20 h-20 gradient-gold rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-gold">
            <GraduationCap className="w-10 h-10 text-secondary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-primary-foreground mb-2">تسجيل الدخول</h1>
          <p className="text-primary-foreground/70">مرحباً بك في تطبيق مدارس المالكي</p>
        </div>

        {/* Login Card */}
        <Card variant="glass" className="w-full max-w-md animate-scale-in">
          <CardHeader className="text-center pb-0">
            <p className="text-muted-foreground text-sm">
              أدخل بياناتك للوصول إلى حسابك
            </p>
          </CardHeader>

          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  اسم المستخدم أو رقم الجوال
                </label>
                <div className="relative">
                  <User className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="أدخل اسم المستخدم"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="pr-10 h-12 rounded-xl"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  كلمة المرور
                </label>
                <div className="relative">
                  <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="أدخل كلمة المرور"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="pr-10 pl-10 h-12 rounded-xl"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Forgot Password */}
              <div className="text-left">
                <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                  نسيت كلمة المرور؟
                </Link>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                variant="hero"
                size="lg"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "جارٍ تسجيل الدخول..." : "تسجيل الدخول"}
              </Button>
            </form>

            {/* Register Link */}
            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">ليس لديك حساب؟ </span>
              <Link to="/register" className="text-primary font-semibold hover:underline">
                إنشاء حساب جديد
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Help */}
        <p className="mt-8 text-primary-foreground/60 text-sm text-center animate-fade-in">
          هل تحتاج مساعدة؟{" "}
          <Link to="/contact" className="text-secondary hover:underline">
            تواصل معنا
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
