import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GraduationCap, Eye, EyeOff, User, Lock, ArrowLeft, Mail, Phone, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { z } from "zod";

// Import role images
import studentBoy from "@/assets/student-boy-saudi.png";
import studentGirl from "@/assets/student-girl-saudi.png";
import studentsGroup from "@/assets/students-group-saudi.png";

type AppRole = 'student' | 'parent' | 'teacher';

const emailSchema = z.string().email('يرجى إدخال بريد إلكتروني صحيح');
const passwordSchema = z.string().min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل');

const roleConfig: Record<AppRole, { label: string; icon: string; color: string; bgColor: string; description: string }> = {
  student: {
    label: 'طالب',
    icon: '🎓',
    color: 'text-primary',
    bgColor: 'bg-accent',
    description: 'متابعة الدروس والواجبات والنتائج'
  },
  parent: {
    label: 'ولي أمر',
    icon: '👨‍👩‍👧‍👦',
    color: 'text-success',
    bgColor: 'bg-success/10',
    description: 'متابعة أبنائك والتواصل مع المدرسة'
  },
  teacher: {
    label: 'معلم',
    icon: '👨‍🏫',
    color: 'text-secondary',
    bgColor: 'bg-secondary/10',
    description: 'إدارة الفصول والطلاب والدرجات'
  }
};

const Auth = () => {
  const navigate = useNavigate();
  const { signIn, signUp, user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<AppRole>('parent');
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  
  const [registerData, setRegisterData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  // Redirect if already logged in
  useEffect(() => {
    if (user && !loading) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  const validateLogin = () => {
    const newErrors: Record<string, string> = {};
    
    try {
      emailSchema.parse(loginData.email);
    } catch (e) {
      if (e instanceof z.ZodError) {
        newErrors.email = e.errors[0].message;
      }
    }
    
    try {
      passwordSchema.parse(loginData.password);
    } catch (e) {
      if (e instanceof z.ZodError) {
        newErrors.password = e.errors[0].message;
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateRegister = () => {
    const newErrors: Record<string, string> = {};
    
    if (!registerData.fullName.trim()) {
      newErrors.fullName = 'يرجى إدخال الاسم الكامل';
    }
    
    try {
      emailSchema.parse(registerData.email);
    } catch (e) {
      if (e instanceof z.ZodError) {
        newErrors.email = e.errors[0].message;
      }
    }
    
    try {
      passwordSchema.parse(registerData.password);
    } catch (e) {
      if (e instanceof z.ZodError) {
        newErrors.password = e.errors[0].message;
      }
    }
    
    if (registerData.password !== registerData.confirmPassword) {
      newErrors.confirmPassword = 'كلمتا المرور غير متطابقتين';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateLogin()) return;
    
    setIsLoading(true);
    const { error } = await signIn(loginData.email, loginData.password);
    setIsLoading(false);
    
    if (!error) {
      navigate('/dashboard');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateRegister()) return;
    
    setIsLoading(true);
    const { error } = await signUp(
      registerData.email,
      registerData.password,
      registerData.fullName,
      registerData.phone,
      selectedRole
    );
    setIsLoading(false);
    
    if (!error) {
      setActiveTab('login');
      setRegisterData({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen gradient-hero flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-secondary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-hero relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary-foreground/5 rounded-full blur-3xl" />
        
        {/* Interactive floating images */}
        <img 
          src={studentBoy} 
          alt="" 
          className="absolute bottom-0 right-4 w-32 md:w-48 opacity-90 animate-float hidden md:block"
          style={{ animationDelay: '0s' }}
        />
        <img 
          src={studentGirl} 
          alt="" 
          className="absolute bottom-0 left-4 w-32 md:w-48 opacity-90 animate-float hidden md:block"
          style={{ animationDelay: '2s' }}
        />
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
        <div className="mb-6 text-center animate-slide-up">
          <div className="w-16 h-16 gradient-gold rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-gold">
            <GraduationCap className="w-8 h-8 text-secondary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-primary-foreground mb-1">مدارس المالكي</h1>
          <p className="text-primary-foreground/70 text-sm">منظومة تعليمية متكاملة</p>
        </div>

        {/* Auth Card */}
        <Card variant="glass" className="w-full max-w-md animate-scale-in">
          <CardHeader className="pb-2">
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'login' | 'register')} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-muted/50">
                <TabsTrigger value="login" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  تسجيل الدخول
                </TabsTrigger>
                <TabsTrigger value="register" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  حساب جديد
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>

          <CardContent className="pt-4">
            {activeTab === 'login' ? (
              <form onSubmit={handleLogin} className="space-y-4">
                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">البريد الإلكتروني</label>
                  <div className="relative">
                    <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="example@email.com"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      className={`pr-10 h-11 rounded-xl ${errors.email ? 'border-destructive' : ''}`}
                      required
                    />
                  </div>
                  {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">كلمة المرور</label>
                  <div className="relative">
                    <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      className={`pr-10 pl-10 h-11 rounded-xl ${errors.password ? 'border-destructive' : ''}`}
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
                  {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
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
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                {/* Role Selection */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    نوع الحساب
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(Object.keys(roleConfig) as AppRole[]).map((role) => (
                      <button
                        key={role}
                        type="button"
                        onClick={() => setSelectedRole(role)}
                        className={`p-3 rounded-xl border-2 transition-all text-center ${
                          selectedRole === role
                            ? 'border-primary bg-accent shadow-md scale-105'
                            : 'border-border hover:border-primary/50 hover:bg-muted/50'
                        }`}
                      >
                        <span className="text-2xl block mb-1">{roleConfig[role].icon}</span>
                        <span className="text-xs font-medium">{roleConfig[role].label}</span>
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground text-center">
                    {roleConfig[selectedRole].description}
                  </p>
                </div>

                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">الاسم الكامل</label>
                  <div className="relative">
                    <User className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="أدخل اسمك الكامل"
                      value={registerData.fullName}
                      onChange={(e) => setRegisterData({ ...registerData, fullName: e.target.value })}
                      className={`pr-10 h-11 rounded-xl ${errors.fullName ? 'border-destructive' : ''}`}
                      required
                    />
                  </div>
                  {errors.fullName && <p className="text-xs text-destructive">{errors.fullName}</p>}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">البريد الإلكتروني</label>
                  <div className="relative">
                    <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="example@email.com"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                      className={`pr-10 h-11 rounded-xl ${errors.email ? 'border-destructive' : ''}`}
                      required
                    />
                  </div>
                  {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">رقم الجوال (اختياري)</label>
                  <div className="relative">
                    <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="tel"
                      placeholder="05xxxxxxxx"
                      value={registerData.phone}
                      onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                      className="pr-10 h-11 rounded-xl"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">كلمة المرور</label>
                  <div className="relative">
                    <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="6 أحرف على الأقل"
                      value={registerData.password}
                      onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                      className={`pr-10 pl-10 h-11 rounded-xl ${errors.password ? 'border-destructive' : ''}`}
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
                  {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
                </div>

                {/* Confirm Password */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">تأكيد كلمة المرور</label>
                  <div className="relative">
                    <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="أعد إدخال كلمة المرور"
                      value={registerData.confirmPassword}
                      onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                      className={`pr-10 h-11 rounded-xl ${errors.confirmPassword ? 'border-destructive' : ''}`}
                      required
                    />
                  </div>
                  {errors.confirmPassword && <p className="text-xs text-destructive">{errors.confirmPassword}</p>}
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "جارٍ إنشاء الحساب..." : "إنشاء حساب"}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        {/* Help */}
        <p className="mt-6 text-primary-foreground/60 text-sm text-center animate-fade-in">
          هل تحتاج مساعدة؟{" "}
          <Link to="/contact" className="text-secondary hover:underline">
            تواصل معنا
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Auth;
