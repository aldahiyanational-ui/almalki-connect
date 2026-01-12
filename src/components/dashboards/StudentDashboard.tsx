import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, Calendar, FileText, Award, Clock, 
  BookMarked, Bell, LogOut, User, Sparkles
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import SmartAlerts from '@/components/SmartAlerts';
import SmartRecommendations from '@/components/SmartRecommendations';

import studentBoy from '@/assets/student-boy-saudi.png';

const quickStats = [
  { label: 'الواجبات', value: '3', icon: FileText, color: 'text-primary', bgColor: 'bg-accent' },
  { label: 'الحصص اليوم', value: '6', icon: Clock, color: 'text-success', bgColor: 'bg-success/10' },
  { label: 'الاختبارات', value: '2', icon: Award, color: 'text-destructive', bgColor: 'bg-destructive/10' },
];

const menuItems = [
  { icon: Calendar, label: 'جدولي الدراسي', path: '/schedule', color: 'bg-primary', textColor: 'text-primary' },
  { icon: FileText, label: 'واجباتي', path: '/homework', color: 'bg-secondary', textColor: 'text-secondary-foreground' },
  { icon: Award, label: 'درجاتي', path: '/exams', color: 'bg-success', textColor: 'text-success' },
  { icon: Clock, label: 'حضوري', path: '/attendance', color: 'bg-accent', textColor: 'text-accent-foreground' },
  { icon: BookMarked, label: 'المكتبة', path: '/library', color: 'bg-muted', textColor: 'text-muted-foreground' },
  { icon: Bell, label: 'الإشعارات', path: '/messages', color: 'bg-destructive/10', textColor: 'text-destructive' },
];

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { profile, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />

      <main className="container py-4 space-y-6">
        {/* Welcome Section with Interactive Image */}
        <Card className="overflow-hidden border-0 shadow-lg">
          <div className="gradient-hero p-6 relative">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-secondary" />
                  <Badge variant="secondary" className="text-xs">طالب</Badge>
                </div>
                <h1 className="text-2xl font-bold text-primary-foreground mb-1">
                  مرحباً {profile?.full_name || 'طالب'}! 👋
                </h1>
                <p className="text-primary-foreground/70 text-sm">
                  استمر في التعلم واجتهد لتحقيق أهدافك
                </p>
              </div>
              <img 
                src={studentBoy} 
                alt="طالب" 
                className="w-24 h-24 object-contain animate-float"
              />
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              {quickStats.map((stat, index) => (
                <div 
                  key={index}
                  className={`${stat.bgColor} rounded-xl p-3 text-center backdrop-blur-sm`}
                >
                  <stat.icon className={`w-5 h-5 mx-auto mb-1 ${stat.color}`} />
                  <p className="text-xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Smart Alerts Section */}
        <SmartAlerts />

        {/* Smart Recommendations Section */}
        <SmartRecommendations />

        {/* Quick Actions Grid */}
        <div>
          <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            الوصول السريع
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {menuItems.map((item, index) => (
              <Card 
                key={index}
                className="cursor-pointer card-hover border-0 shadow-md overflow-hidden"
                onClick={() => navigate(item.path)}
              >
                <CardContent className="p-4 text-center">
                  <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center mx-auto mb-2`}>
                    <item.icon className={`w-6 h-6 ${item.textColor}`} />
                  </div>
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Today's Schedule Preview */}
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              جدول اليوم
            </h3>
            <div className="space-y-2">
              {[
                { time: '8:00', subject: 'الرياضيات', teacher: 'أ. محمد' },
                { time: '9:00', subject: 'اللغة العربية', teacher: 'أ. أحمد' },
                { time: '10:00', subject: 'العلوم', teacher: 'أ. خالد' },
              ].map((class_, index) => (
                <div key={index} className="flex items-center gap-3 p-2 bg-muted/50 rounded-lg">
                  <span className="text-xs font-mono text-muted-foreground w-12">{class_.time}</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{class_.subject}</p>
                    <p className="text-xs text-muted-foreground">{class_.teacher}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" size="sm" className="w-full mt-3" onClick={() => navigate('/schedule')}>
              عرض الجدول الكامل
            </Button>
          </CardContent>
        </Card>

        {/* Account Actions */}
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" onClick={() => navigate('/settings')}>
            <User className="w-4 h-4 ml-2" />
            حسابي
          </Button>
          <Button variant="destructive" className="flex-1" onClick={signOut}>
            <LogOut className="w-4 h-4 ml-2" />
            تسجيل خروج
          </Button>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default StudentDashboard;
