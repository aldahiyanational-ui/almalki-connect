import { useEffect } from "react";
import { ExternalLink, Loader2 } from "lucide-react";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import { Button } from "@/components/ui/button";

const BAPAPAY_URL = "https://bapapay.esol.dev/School/login/1C0786FD-80AE-402A-85CF-EC5ECCDDFE48";

const Payment = () => {
  useEffect(() => {
    // Auto-redirect to BapaPay after a short delay
    const timer = setTimeout(() => {
      window.location.href = BAPAPAY_URL;
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleManualRedirect = () => {
    window.location.href = BAPAPAY_URL;
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />

      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">جاري التحويل لبوابة الدفع</h1>
            <p className="text-muted-foreground">سيتم توجيهك تلقائياً إلى بوابة السداد الإلكتروني...</p>
          </div>

          <Button 
            onClick={handleManualRedirect}
            className="gap-2"
            size="lg"
          >
            <span>انتقل الآن</span>
            <ExternalLink className="w-4 h-4" />
          </Button>

          <p className="text-sm text-muted-foreground">
            إذا لم يتم التحويل تلقائياً، اضغط على الزر أعلاه
          </p>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default Payment;
