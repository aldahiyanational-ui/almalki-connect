import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Globe, Menu, X, Check, LogIn, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logoAlmalki from "@/assets/logo-almalki-group.png";
import NotificationsDropdown from "@/components/NotificationsDropdown";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState<"ar" | "en">("ar");

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
            {/* Language Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hidden sm:flex">
                  <Globe className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem 
                  onClick={() => setLanguage("ar")}
                  className="flex items-center justify-between"
                >
                  <span>العربية</span>
                  {language === "ar" && <Check className="w-4 h-4 text-primary" />}
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setLanguage("en")}
                  className="flex items-center justify-between"
                >
                  <span>English</span>
                  {language === "en" && <Check className="w-4 h-4 text-primary" />}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Notifications Dropdown */}
            <NotificationsDropdown />

            {/* User Menu or Login Button */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="hidden sm:flex">
                    <User className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                    <User className="w-4 h-4 ml-2" />
                    لوحة التحكم
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => signOut()} className="text-destructive">
                    <LogOut className="w-4 h-4 ml-2" />
                    تسجيل الخروج
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="gold"
                size="sm"
                onClick={() => navigate("/auth")}
                className="hidden sm:flex"
              >
                <LogIn className="w-4 h-4 ml-2" />
                تسجيل الدخول
              </Button>
            )}
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
              <div className="flex items-center gap-2 px-4 py-2">
                <span className="text-sm text-muted-foreground">اللغة:</span>
                <Button 
                  variant={language === "ar" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setLanguage("ar")}
                >
                  العربية
                </Button>
                <Button 
                  variant={language === "en" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setLanguage("en")}
                >
                  English
                </Button>
              </div>
              {user ? (
                <>
                  <Button variant="ghost" className="justify-start" onClick={() => { navigate("/dashboard"); setIsMenuOpen(false); }}>
                    <User className="w-4 h-4 ml-2" />
                    لوحة التحكم
                  </Button>
                  <Button variant="destructive" onClick={() => { signOut(); setIsMenuOpen(false); }}>
                    <LogOut className="w-4 h-4 ml-2" />
                    تسجيل الخروج
                  </Button>
                </>
              ) : (
                <Button variant="gold" onClick={() => { navigate("/auth"); setIsMenuOpen(false); }}>
                  <LogIn className="w-4 h-4 ml-2" />
                  تسجيل الدخول
                </Button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
