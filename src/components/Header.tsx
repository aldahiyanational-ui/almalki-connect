import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Globe, Bell, Menu, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import logoAlmalki from "@/assets/logo-almalki-group.png";

const notifications = [
  { id: 1, title: "تذكير بسداد الرسوم", description: "يرجى سداد القسط الثاني قبل نهاية الشهر", time: "منذ ساعة", isNew: true },
  { id: 2, title: "اجتماع أولياء الأمور", description: "اجتماع يوم الخميس القادم الساعة 4 مساءً", time: "منذ 3 ساعات", isNew: true },
  { id: 3, title: "نتائج الاختبارات", description: "تم رفع نتائج اختبارات الفترة الأولى", time: "منذ يوم", isNew: false },
];

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState<"ar" | "en">("ar");

  const toggleLanguage = () => {
    setLanguage(language === "ar" ? "en" : "ar");
  };

  const unreadCount = notifications.filter(n => n.isNew).length;

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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs"
                    >
                      {unreadCount}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <div className="px-4 py-3 border-b border-border">
                  <h3 className="font-semibold text-foreground">الإشعارات</h3>
                  <p className="text-xs text-muted-foreground">{unreadCount} إشعارات جديدة</p>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notification) => (
                    <DropdownMenuItem
                      key={notification.id}
                      className="flex flex-col items-start gap-1 p-4 cursor-pointer hover:bg-muted/50"
                    >
                      <div className="flex items-start justify-between w-full gap-2">
                        <span className="font-medium text-foreground">{notification.title}</span>
                        {notification.isNew && (
                          <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {notification.description}
                      </p>
                      <span className="text-xs text-muted-foreground">{notification.time}</span>
                    </DropdownMenuItem>
                  ))}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="justify-center text-primary font-medium">
                  عرض جميع الإشعارات
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

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
