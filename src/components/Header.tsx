import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Globe, Bell, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoAlmalki from "@/assets/logo-almalki-group.png";

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState<"ar" | "en">("ar");

  const toggleLanguage = () => {
    setLanguage(language === "ar" ? "en" : "ar");
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-card/95 backdrop-blur-lg border-b border-border/50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-3 group"
          >
            <img 
              src={logoAlmalki} 
              alt="مجموعة المالكي التعليمية"
              className="h-12 w-auto object-contain group-hover:scale-105 transition-transform"
            />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
              الرئيسية
            </Button>
            <Button variant="ghost" size="sm" onClick={() => navigate("/news")}>
              الأخبار
            </Button>
            <Button variant="ghost" size="sm" onClick={() => navigate("/contact")}>
              تواصل معنا
            </Button>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLanguage}
              className="hidden sm:flex"
            >
              <Globe className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
            </Button>
            <Button
              variant="gold"
              size="sm"
              onClick={() => navigate("/login")}
              className="hidden sm:flex"
            >
              تسجيل الدخول
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50 animate-slide-down">
            <nav className="flex flex-col gap-2">
              <Button variant="ghost" className="justify-start" onClick={() => { navigate("/"); setIsMenuOpen(false); }}>
                الرئيسية
              </Button>
              <Button variant="ghost" className="justify-start" onClick={() => { navigate("/news"); setIsMenuOpen(false); }}>
                الأخبار
              </Button>
              <Button variant="ghost" className="justify-start" onClick={() => { navigate("/contact"); setIsMenuOpen(false); }}>
                تواصل معنا
              </Button>
              <Button variant="gold" onClick={() => { navigate("/login"); setIsMenuOpen(false); }}>
                تسجيل الدخول
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
