import { useNavigate } from 'react-router-dom';
import { 
  Users, Calendar, FileText, Award, BookOpen, 
  ClipboardList, MessageSquare, Settings, LogOut, User, GraduationCap
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';

import studentGirl from '@/assets/student-girl-saudi.png';

const quickStats = [
  { label: 'طلابي', value: '120', icon: Users, color: 'text-primary', bgColor: 'bg-accent' },
  { label: 'الحصص اليوم', value: '5', icon: Calendar, color: 'text-success', bgColor: 'bg-success/10' },
  { label: 'واجبات للتصحيح', value: '18', icon: FileText, color: 'text-destructive', bgColor: 'bg-destructive/10' },
];

const menuItems = [
  { icon: Users, label: 'طلابي', path: '/student-profile', color: 'bg-primary', textColor: 'text-primary-foreground' },
  { icon: Calendar, label: 'جدول الحصص', path: '/schedule', color: 'bg-secondary', textColor: 'text-secondary-foreground' },
  { icon: FileText, label: 'الواجبات', path: '/homework', color: 'bg-success', textColor: 'text-success-foreground' },
  { icon: Award, label: 'الدرجات', path: '/exams', color: 'bg-accent', textColor: 'text-accent-foreground' },
  { icon: ClipboardList, label: 'الحضور', path: '/attendance', color: 'bg-muted', textColor: 'text-muted-foreground' },
  { icon: MessageSquare, label: 'الرسائل', path: '/messages', color: 'bg-destructive/10', textColor: 'text-destructive' },
];

const TeacherDashboard = () => {
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
                  <GraduationCap className="w-5 h-5 text-secondary" />
                  <Badge variant="secondary" className="text-xs">معلم</Badge>
                </div>
                <h1 className="text-2xl font-bold text-primary-foreground mb-1">
                  مرحباً أستاذ {profile?.full_name || 'معلم'}! 👨‍🏫
                </h1>
                <p className="text-primary-foreground/70 text-sm">
                  المعلم المتميز يصنع الفرق في حياة طلابه
                </p>
              </div>
              <img 
                src={studentGirl} 
                alt="طالبة" 
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

        {/* Quick Actions Grid */}
        <div>
          <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            أدوات المعلم
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

        {/* Today's Classes */}
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              حصص اليوم
            </h3>
            <div className="space-y-2">
              {[
                { time: '8:00', class: 'الصف الرابع أ', subject: 'الرياضيات', students: 28 },
                { time: '9:00', class: 'الصف الخامس ب', subject: 'الرياضيات', students: 25 },
                { time: '10:30', class: 'الصف السادس أ', subject: 'الرياضيات', students: 30 },
              ].map((lesson, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <span className="text-xs font-mono text-muted-foreground w-12">{lesson.time}</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{lesson.class}</p>
                    <p className="text-xs text-muted-foreground">{lesson.subject}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    <Users className="w-3 h-3 ml-1" />
                    {lesson.students}
                  </Badge>
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
            <Settings className="w-4 h-4 ml-2" />
            الإعدادات
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

export default TeacherDashboard;
