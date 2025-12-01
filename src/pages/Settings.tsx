import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  User,
  Lock,
  Bell,
  Globe,
  Moon,
  Sun,
  LogOut,
  ChevronRight,
  Shield,
  HelpCircle,
  FileText,
  Phone,
} from "lucide-react";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const SettingItem = ({
  icon: Icon,
  title,
  description,
  onClick,
  action,
}: {
  icon: React.ElementType;
  title: string;
  description?: string;
  onClick?: () => void;
  action?: React.ReactNode;
}) => (
  <div
    className={cn(
      "flex items-center justify-between p-4 hover:bg-muted/50 transition-colors",
      onClick && "cursor-pointer"
    )}
    onClick={onClick}
  >
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div>
        <p className="font-medium text-foreground">{title}</p>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
    {action || <ChevronLeft className="w-5 h-5 text-muted-foreground" />}
  </div>
);

const Settings = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("ar");
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    // In a real app, this would update the app's language
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-4"
          onClick={() => navigate("/dashboard")}
        >
          <ChevronLeft className="w-5 h-5 ml-2" />
          العودة للوحة التحكم
        </Button>

        {/* Page Title */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-foreground">الإعدادات</h1>
          <p className="text-muted-foreground">إدارة حسابك وتفضيلاتك</p>
        </div>

        {/* Profile Card */}
        <Card variant="gradient" className="animate-slide-up">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Avatar className="w-20 h-20 border-4 border-primary-foreground/20">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="text-xl bg-primary-foreground/20 text-primary-foreground">
                  أم
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-primary-foreground">محمد علي المالكي</h2>
                <p className="text-primary-foreground/80">ولي أمر</p>
                <p className="text-sm text-primary-foreground/60">mohammed@email.com</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Settings */}
        <Card variant="elevated">
          <CardHeader>
            <CardTitle className="text-lg">الحساب</CardTitle>
          </CardHeader>
          <CardContent className="p-0 divide-y divide-border">
            <Dialog open={isProfileDialogOpen} onOpenChange={setIsProfileDialogOpen}>
              <DialogTrigger asChild>
                <div>
                  <SettingItem
                    icon={User}
                    title="تعديل الملف الشخصي"
                    description="الاسم، البريد، رقم الجوال"
                  />
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>تعديل الملف الشخصي</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <Label>الاسم الكامل</Label>
                    <Input defaultValue="محمد علي المالكي" className="mt-1" />
                  </div>
                  <div>
                    <Label>البريد الإلكتروني</Label>
                    <Input defaultValue="mohammed@email.com" className="mt-1" />
                  </div>
                  <div>
                    <Label>رقم الجوال</Label>
                    <Input defaultValue="0501234567" className="mt-1" />
                  </div>
                  <Button className="w-full">حفظ التغييرات</Button>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
              <DialogTrigger asChild>
                <div>
                  <SettingItem
                    icon={Lock}
                    title="تغيير كلمة المرور"
                    description="تحديث كلمة المرور الخاصة بك"
                  />
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>تغيير كلمة المرور</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <Label>كلمة المرور الحالية</Label>
                    <Input type="password" className="mt-1" />
                  </div>
                  <div>
                    <Label>كلمة المرور الجديدة</Label>
                    <Input type="password" className="mt-1" />
                  </div>
                  <div>
                    <Label>تأكيد كلمة المرور الجديدة</Label>
                    <Input type="password" className="mt-1" />
                  </div>
                  <Button className="w-full">تحديث كلمة المرور</Button>
                </div>
              </DialogContent>
            </Dialog>

            <SettingItem
              icon={Shield}
              title="الأمان والخصوصية"
              description="إعدادات الأمان"
            />
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card variant="elevated">
          <CardHeader>
            <CardTitle className="text-lg">التفضيلات</CardTitle>
          </CardHeader>
          <CardContent className="p-0 divide-y divide-border">
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Globe className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">اللغة</p>
                    <p className="text-sm text-muted-foreground">اختر لغة التطبيق</p>
                  </div>
                </div>
                <Select value={language} onValueChange={handleLanguageChange}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ar">العربية</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Bell className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">الإشعارات</p>
                    <p className="text-sm text-muted-foreground">تفعيل أو إيقاف الإشعارات</p>
                  </div>
                </div>
                <Switch
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    {darkMode ? <Moon className="w-5 h-5 text-primary" /> : <Sun className="w-5 h-5 text-primary" />}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">الوضع الليلي</p>
                    <p className="text-sm text-muted-foreground">تغيير مظهر التطبيق</p>
                  </div>
                </div>
                <Switch
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Support */}
        <Card variant="elevated">
          <CardHeader>
            <CardTitle className="text-lg">الدعم</CardTitle>
          </CardHeader>
          <CardContent className="p-0 divide-y divide-border">
            <SettingItem
              icon={HelpCircle}
              title="المساعدة والدعم"
              description="الأسئلة الشائعة"
              onClick={() => navigate("/contact")}
            />
            <SettingItem
              icon={Phone}
              title="تواصل معنا"
              description="920016166"
              onClick={() => navigate("/contact")}
            />
            <SettingItem
              icon={FileText}
              title="الشروط والأحكام"
              description="سياسة الخصوصية"
            />
          </CardContent>
        </Card>

        {/* Logout Button */}
        <Button
          variant="outline"
          className="w-full text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5 ml-2" />
          تسجيل الخروج
        </Button>

        {/* App Version */}
        <p className="text-center text-sm text-muted-foreground">
          إصدار التطبيق 1.0.0
        </p>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default Settings;
