import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CreditCard,
  Building2,
  Smartphone,
  Shield,
  ChevronLeft,
  CheckCircle2,
  Info,
  Wallet,
  ArrowRight,
} from "lucide-react";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { schools } from "@/contexts/SchoolContext";

const paymentMethods = [
  {
    id: "card",
    name: "بطاقة ائتمان / مدى",
    description: "فيزا، ماستركارد، مدى",
    icon: CreditCard,
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    id: "bank",
    name: "تحويل بنكي",
    description: "جميع البنوك السعودية",
    icon: Building2,
    gradient: "from-green-500 to-emerald-600",
  },
  {
    id: "apple",
    name: "Apple Pay",
    description: "الدفع السريع عبر Apple",
    icon: Smartphone,
    gradient: "from-gray-700 to-gray-900",
  },
];

const schoolsList = Object.values(schools);

const Payment = () => {
  const navigate = useNavigate();
  const [selectedSchool, setSelectedSchool] = useState<string>("");
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [studentId, setStudentId] = useState("");
  const [amount, setAmount] = useState("");

  const handlePayment = () => {
    // Open BapaPay payment gateway
    window.open("https://bapapay.esol.dev/School/login/1C0786FD-80AE-402A-85CF-EC5ECCDDFE48", "_blank");
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-secondary via-secondary to-primary p-8">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/30 rounded-full blur-2xl" />
          
          <div className="relative z-10 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm mb-4">
              <Wallet className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-primary-foreground mb-2">بوابة السداد الإلكتروني</h1>
            <p className="text-primary-foreground/80">سداد الرسوم الدراسية بكل سهولة وأمان</p>
          </div>
        </div>

        {/* Security Badge */}
        <div className="flex items-center justify-center gap-3 p-4 bg-green-500/10 rounded-2xl border border-green-500/20">
          <Shield className="w-5 h-5 text-green-600" />
          <span className="text-sm text-green-700 font-medium">جميع المعاملات مشفرة وآمنة 100%</span>
        </div>

        {/* Step 1: Select School */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
              1
            </div>
            <h2 className="text-lg font-bold text-foreground">اختر المدرسة</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {schoolsList.map((school) => (
              <button
                key={school.id}
                onClick={() => setSelectedSchool(school.id)}
                className={cn(
                  "flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-300",
                  selectedSchool === school.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50 hover:bg-muted/50"
                )}
              >
                <img src={school.logo} alt={school.name} className="w-12 h-12 object-contain" />
                <div className="flex-1 text-right">
                  <p className="font-semibold text-foreground text-sm">{school.name}</p>
                  <p className="text-xs text-muted-foreground">{school.description}</p>
                </div>
                {selectedSchool === school.id && (
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                )}
              </button>
            ))}
          </div>
        </Card>

        {/* Step 2: Student Info */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
              2
            </div>
            <h2 className="text-lg font-bold text-foreground">بيانات الطالب</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="studentId">رقم الطالب / السجل المدني</Label>
              <Input
                id="studentId"
                placeholder="أدخل رقم الطالب"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="text-right"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">المبلغ المراد سداده (ريال)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="أدخل المبلغ"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="text-right"
                dir="ltr"
              />
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-muted/50 rounded-xl flex items-start gap-2">
            <Info className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
            <p className="text-sm text-muted-foreground">
              يمكنك الاطلاع على المبلغ المستحق من خلال الدخول إلى حسابك في المدرسة
            </p>
          </div>
        </Card>

        {/* Step 3: Payment Method */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
              3
            </div>
            <h2 className="text-lg font-bold text-foreground">طريقة الدفع</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {paymentMethods.map((method) => {
              const Icon = method.icon;
              return (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={cn(
                    "group relative overflow-hidden p-5 rounded-2xl border-2 transition-all duration-300 text-center",
                    selectedMethod === method.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <div className={cn(
                    "w-14 h-14 mx-auto mb-3 rounded-2xl flex items-center justify-center",
                    `bg-gradient-to-br ${method.gradient}`
                  )}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <p className="font-semibold text-foreground mb-1">{method.name}</p>
                  <p className="text-xs text-muted-foreground">{method.description}</p>
                  
                  {selectedMethod === method.id && (
                    <div className="absolute top-2 left-2">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </Card>

        {/* Summary & Pay Button */}
        {selectedSchool && studentId && amount && selectedMethod && (
          <Card className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20 animate-fade-in">
            <h3 className="font-bold text-foreground mb-4">ملخص العملية</h3>
            <div className="space-y-2 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">المدرسة</span>
                <span className="font-medium text-foreground">{schools[selectedSchool]?.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">رقم الطالب</span>
                <span className="font-medium text-foreground" dir="ltr">{studentId}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">طريقة الدفع</span>
                <span className="font-medium text-foreground">
                  {paymentMethods.find(m => m.id === selectedMethod)?.name}
                </span>
              </div>
              <div className="border-t border-border pt-2 mt-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-foreground">المبلغ الإجمالي</span>
                  <span className="text-2xl font-bold text-primary">{amount} ريال</span>
                </div>
              </div>
            </div>
            
            <Button
              variant="gold"
              size="lg"
              className="w-full gap-2"
              onClick={handlePayment}
            >
              <span>متابعة للدفع</span>
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Card>
        )}

        {/* Help Section */}
        <div className="text-center p-6 bg-muted/30 rounded-2xl">
          <p className="text-muted-foreground mb-2">تحتاج مساعدة؟</p>
          <Button variant="outline" onClick={() => navigate("/contact")}>
            تواصل مع الدعم الفني
          </Button>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default Payment;
