import { useEffect, useState } from "react";
import { GraduationCap } from "lucide-react";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 300);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 gradient-hero flex flex-col items-center justify-center z-50">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-64 h-64 bg-secondary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary-foreground/5 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      {/* Logo */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-secondary/20 rounded-full blur-2xl animate-pulse-slow" />
          <div className="relative w-32 h-32 bg-primary-foreground/10 backdrop-blur-lg rounded-full flex items-center justify-center border border-primary-foreground/20 animate-scale-in">
            <GraduationCap className="w-16 h-16 text-secondary animate-float" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-2 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          مجموعة المالكي
        </h1>
        <p className="text-xl text-primary-foreground/80 mb-12 animate-slide-up" style={{ animationDelay: "0.4s" }}>
          التعليمية
        </p>

        {/* Progress bar */}
        <div className="w-64 h-1.5 bg-primary-foreground/20 rounded-full overflow-hidden animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <div
            className="h-full gradient-gold rounded-full transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Loading text */}
        <p className="text-primary-foreground/60 text-sm mt-4 animate-fade-in" style={{ animationDelay: "0.8s" }}>
          جارٍ التحميل...
        </p>
      </div>

      {/* Bottom branding */}
      <div className="absolute bottom-8 text-center text-primary-foreground/40 text-sm animate-fade-in" style={{ animationDelay: "1s" }}>
        <p>تميّز • إبداع • تفوّق</p>
      </div>
    </div>
  );
};

export default SplashScreen;
