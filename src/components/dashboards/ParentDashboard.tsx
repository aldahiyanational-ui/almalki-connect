import { useNavigate } from 'react-router-dom';
import { 
  Users, Calendar, FileText, Award, CreditCard, 
  Bus, MessageSquare, Bell, LogOut, User, Heart
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import { schools } from '@/contexts/SchoolContext';
import SmartAlerts from '@/components/SmartAlerts';
import SmartRecommendations from '@/components/SmartRecommendations';

import studentsGroup from '@/assets/students-group-saudi.png';

const quickStats = [
  { label: 'الأبناء', value: '2', icon: Users, color: 'text-primary', bgColor: 'bg-accent' },
  { label: 'واجبات معلقة', value: '5', icon: FileText, color: 'text-destructive', bgColor: 'bg-destructive/10' },
  { label: 'رسائل جديدة', value: '3', icon: MessageSquare, color: 'text-success', bgColor: 'bg-success/10' },
];

const menuItems = [
  { icon: Users, label: 'ملفات الأبناء', path: '/student-profile', color: 'bg-primary', textColor: 'text-primary-foreground' },
  { icon: Calendar, label: 'الجداول الدراسية', path: '/schedule', color: 'bg-secondary', textColor: 'text-secondary-foreground' },
  { icon: FileText, label: 'الواجبات', path: '/homework', color: 'bg-success', textColor: 'text-success-foreground' },
  { icon: Award, label: 'النتائج', path: '/exams', color: 'bg-accent', textColor: 'text-accent-foreground' },
  { icon: CreditCard, label: 'الرسوم والمدفوعات', path: '/payment', color: 'bg-muted', textColor: 'text-muted-foreground' },
  { icon: Bus, label: 'النقل المدرسي', path: '/transport', color: 'bg-destructive/10', textColor: 'text-destructive' },
];

const ParentDashboard = () => {
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
                  <Heart className="w-5 h-5 text-secondary" />
                  <Badge variant="secondary" className="text-xs">ولي أمر</Badge>
                </div>
                <h1 className="text-2xl font-bold text-primary-foreground mb-1">
                  أهلاً {profile?.full_name || 'ولي الأمر'}! 👨‍👩‍👧‍👦
                </h1>
                <p className="text-primary-foreground/70 text-sm">
                  تابع تقدم أبنائك الدراسي بسهولة
                </p>
              </div>
              <img 
                src={studentsGroup} 
                alt="طلاب" 
                className="w-28 h-24 object-contain animate-float"
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
            <Bell className="w-5 h-5 text-primary" />
            الخدمات السريعة
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

        {/* Schools Section */}
        <div>
          <h2 className="text-lg font-bold text-foreground mb-3">مدارس أبنائك</h2>
          <div className="space-y-3">
            {Object.values(schools).slice(0, 2).map((school) => (
              <Card 
                key={school.id}
                className="cursor-pointer card-hover border-0 shadow-md"
                onClick={() => navigate(`/${school.id}/dashboard`)}
              >
                <CardContent className="p-4 flex items-center gap-4">
                  <img 
                    src={school.logo} 
                    alt={school.name} 
                    className="w-14 h-14 rounded-xl object-contain bg-muted p-1"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground">{school.name}</h3>
                    <p className="text-sm text-muted-foreground">{school.description}</p>
                  </div>
                  <Badge variant="outline">{school.address}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

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

export default ParentDashboard;
