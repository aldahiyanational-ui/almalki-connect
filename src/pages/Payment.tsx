import { useState } from "react";
import { ExternalLink, Monitor, Maximize2, Minimize2, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const BAPAPAY_URL = "https://bapapay.esol.dev/School/login/1C0786FD-80AE-402A-85CF-EC5ECCDDFE48";

const Payment = () => {
  const [showEmbedded, setShowEmbedded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleExternalRedirect = () => {
    window.open(BAPAPAY_URL, "_blank");
  };

  if (showEmbedded) {
    return (
      <div className={cn(
        "bg-background",
        isFullscreen ? "fixed inset-0 z-50" : "min-h-screen pb-20 md:pb-0"
      )}>
        {!isFullscreen && <Header />}
        
        <div className={cn(
          "flex flex-col",
          isFullscreen ? "h-full" : "container mx-auto px-4 py-4 h-[calc(100vh-180px)]"
        )}>
          {/* Controls Bar */}
          <div className="flex items-center justify-between mb-3 bg-muted/50 rounded-lg p-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowEmbedded(false)}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>رجوع</span>
            </Button>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="gap-2"
              >
                {isFullscreen ? (
                  <>
                    <Minimize2 className="w-4 h-4" />
                    <span className="hidden sm:inline">تصغير</span>
                  </>
                ) : (
                  <>
                    <Maximize2 className="w-4 h-4" />
                    <span className="hidden sm:inline">ملء الشاشة</span>
                  </>
                )}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleExternalRedirect}
                className="gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                <span className="hidden sm:inline">فتح في نافذة جديدة</span>
              </Button>
            </div>
          </div>

          {/* Embedded Payment Gateway */}
          <div className={cn(
            "flex-1 rounded-xl overflow-hidden border border-border shadow-lg",
            isFullscreen && "rounded-none border-0"
          )}>
            <iframe
              src={BAPAPAY_URL}
              className="w-full h-full"
              title="بوابة الدفع الإلكتروني"
              allow="payment"
            />
          </div>
        </div>

        {!isFullscreen && <BottomNavigation />}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />

      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8">
          {/* Hero Section */}
          <div className="space-y-3">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Monitor className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">بوابة السداد الإلكتروني</h1>
            <p className="text-muted-foreground max-w-md">اختر طريقة الوصول المفضلة لديك للدخول إلى بوابة الدفع</p>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-xl">
            {/* Embedded Option */}
            <Card 
              className="p-6 cursor-pointer hover:border-primary hover:shadow-lg transition-all duration-300 group"
              onClick={() => setShowEmbedded(true)}
            >
              <div className="space-y-4 text-center">
                <div className="w-14 h-14 mx-auto rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Monitor className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">عرض داخل الصفحة</h3>
                  <p className="text-sm text-muted-foreground">ابقَ في التطبيق أثناء إتمام عملية الدفع</p>
                </div>
                <Button className="w-full">
                  فتح البوابة هنا
                </Button>
              </div>
            </Card>

            {/* External Option */}
            <Card 
              className="p-6 cursor-pointer hover:border-primary hover:shadow-lg transition-all duration-300 group"
              onClick={handleExternalRedirect}
            >
              <div className="space-y-4 text-center">
                <div className="w-14 h-14 mx-auto rounded-xl bg-secondary/50 flex items-center justify-center group-hover:bg-secondary/70 transition-colors">
                  <ExternalLink className="w-7 h-7 text-secondary-foreground" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">فتح في نافذة جديدة</h3>
                  <p className="text-sm text-muted-foreground">فتح بوابة الدفع في تبويب منفصل</p>
                </div>
                <Button variant="outline" className="w-full gap-2">
                  <span>فتح في تبويب جديد</span>
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          </div>

          {/* Security Note */}
          <p className="text-xs text-muted-foreground max-w-md">
            🔒 جميع المعاملات المالية مشفرة وآمنة عبر بوابة BapaPay المعتمدة
          </p>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default Payment;
