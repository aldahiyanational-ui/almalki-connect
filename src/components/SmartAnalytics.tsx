import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, TrendingUp, TrendingDown, Award, 
  BookOpen, Calendar, Target, Zap, Star
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { motion } from 'framer-motion';

// بيانات الأداء الشهري
const monthlyPerformance = [
  { month: 'سبتمبر', grade: 85, attendance: 95 },
  { month: 'أكتوبر', grade: 88, attendance: 92 },
  { month: 'نوفمبر', grade: 82, attendance: 98 },
  { month: 'ديسمبر', grade: 90, attendance: 94 },
  { month: 'يناير', grade: 92, attendance: 96 },
];

// بيانات المواد
const subjectsData = [
  { subject: 'الرياضيات', grade: 92, color: 'hsl(var(--primary))' },
  { subject: 'اللغة العربية', grade: 88, color: 'hsl(var(--secondary))' },
  { subject: 'العلوم', grade: 85, color: 'hsl(var(--success))' },
  { subject: 'اللغة الإنجليزية', grade: 90, color: 'hsl(var(--accent))' },
  { subject: 'الدراسات', grade: 78, color: 'hsl(var(--muted-foreground))' },
];

// بيانات المهارات
const skillsData = [
  { skill: 'التفكير النقدي', value: 85 },
  { skill: 'حل المشكلات', value: 78 },
  { skill: 'التواصل', value: 92 },
  { skill: 'العمل الجماعي', value: 88 },
  { skill: 'الإبداع', value: 75 },
  { skill: 'القيادة', value: 70 },
];

// بيانات توزيع الوقت
const timeDistribution = [
  { name: 'الدراسة', value: 45, color: 'hsl(var(--primary))' },
  { name: 'الأنشطة', value: 25, color: 'hsl(var(--secondary))' },
  { name: 'المشاريع', value: 20, color: 'hsl(var(--success))' },
  { name: 'الاختبارات', value: 10, color: 'hsl(var(--accent))' },
];

const SmartAnalytics = () => {
  const [selectedChild, setSelectedChild] = useState('أحمد');
  
  // حساب الإحصائيات
  const averageGrade = Math.round(subjectsData.reduce((acc, s) => acc + s.grade, 0) / subjectsData.length);
  const trend = monthlyPerformance[monthlyPerformance.length - 1].grade - monthlyPerformance[0].grade;
  const attendanceAvg = Math.round(monthlyPerformance.reduce((acc, m) => acc + m.attendance, 0) / monthlyPerformance.length);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      {/* العنوان واختيار الطفل */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-bold text-foreground">تحليلات الأداء</h2>
        </div>
        <div className="flex gap-2">
          {['أحمد', 'سارة'].map((child) => (
            <Badge
              key={child}
              variant={selectedChild === child ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => setSelectedChild(child)}
            >
              {child}
            </Badge>
          ))}
        </div>
      </div>

      {/* البطاقات الإحصائية السريعة */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Target className="w-4 h-4 text-primary" />
              <span className="text-2xl font-bold text-foreground">{averageGrade}%</span>
            </div>
            <p className="text-xs text-muted-foreground">المعدل العام</p>
            <div className="flex items-center justify-center gap-1 mt-1">
              {trend > 0 ? (
                <TrendingUp className="w-3 h-3 text-success" />
              ) : (
                <TrendingDown className="w-3 h-3 text-destructive" />
              )}
              <span className={`text-xs ${trend > 0 ? 'text-success' : 'text-destructive'}`}>
                {trend > 0 ? '+' : ''}{trend}%
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Calendar className="w-4 h-4 text-success" />
              <span className="text-2xl font-bold text-foreground">{attendanceAvg}%</span>
            </div>
            <p className="text-xs text-muted-foreground">نسبة الحضور</p>
            <Badge variant="secondary" className="text-xs mt-1">ممتاز</Badge>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Award className="w-4 h-4 text-secondary" />
              <span className="text-2xl font-bold text-foreground">12</span>
            </div>
            <p className="text-xs text-muted-foreground">الإنجازات</p>
            <Badge variant="outline" className="text-xs mt-1">+3 هذا الشهر</Badge>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Zap className="w-4 h-4 text-accent" />
              <span className="text-2xl font-bold text-foreground">5</span>
            </div>
            <p className="text-xs text-muted-foreground">المرتبة</p>
            <Badge className="text-xs mt-1 bg-accent text-accent-foreground">من 32 طالب</Badge>
          </CardContent>
        </Card>
      </div>

      {/* التبويبات للرسوم البيانية */}
      <Tabs defaultValue="performance" dir="rtl">
        <TabsList className="grid w-full grid-cols-4 mb-4">
          <TabsTrigger value="performance" className="text-xs">الأداء</TabsTrigger>
          <TabsTrigger value="subjects" className="text-xs">المواد</TabsTrigger>
          <TabsTrigger value="skills" className="text-xs">المهارات</TabsTrigger>
          <TabsTrigger value="time" className="text-xs">الوقت</TabsTrigger>
        </TabsList>

        {/* تبويب الأداء الشهري */}
        <TabsContent value="performance">
          <Card className="border-0 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                تطور الأداء والحضور
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={monthlyPerformance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                    reversed
                  />
                  <YAxis 
                    tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                    domain={[70, 100]}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="grade" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2 }}
                    name="الدرجات"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="attendance" 
                    stroke="hsl(var(--success))" 
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--success))', strokeWidth: 2 }}
                    name="الحضور"
                  />
                </LineChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-4 mt-2">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span className="text-xs text-muted-foreground">الدرجات</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-success" />
                  <span className="text-xs text-muted-foreground">الحضور</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* تبويب المواد */}
        <TabsContent value="subjects">
          <Card className="border-0 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-secondary" />
                أداء المواد الدراسية
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={subjectsData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                  <XAxis 
                    type="number" 
                    domain={[0, 100]}
                    tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <YAxis 
                    type="category" 
                    dataKey="subject"
                    tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                    width={80}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                    formatter={(value: number) => [`${value}%`, 'الدرجة']}
                  />
                  <Bar 
                    dataKey="grade" 
                    radius={[0, 4, 4, 0]}
                  >
                    {subjectsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              {/* أفضل وأضعف مادة */}
              <div className="flex justify-between mt-3 text-xs">
                <div className="flex items-center gap-1 text-success">
                  <Star className="w-3 h-3" />
                  <span>الأفضل: الرياضيات (92%)</span>
                </div>
                <div className="flex items-center gap-1 text-destructive">
                  <Target className="w-3 h-3" />
                  <span>تحتاج تحسين: الدراسات (78%)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* تبويب المهارات */}
        <TabsContent value="skills">
          <Card className="border-0 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Zap className="w-4 h-4 text-accent" />
                تقييم المهارات
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <RadarChart data={skillsData}>
                  <PolarGrid stroke="hsl(var(--muted))" />
                  <PolarAngleAxis 
                    dataKey="skill" 
                    tick={{ fontSize: 9, fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <PolarRadiusAxis 
                    angle={90} 
                    domain={[0, 100]}
                    tick={{ fontSize: 8, fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <Radar
                    name="المهارات"
                    dataKey="value"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.3}
                  />
                </RadarChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap gap-2 justify-center mt-2">
                {skillsData.map((skill, index) => (
                  <Badge 
                    key={index} 
                    variant={skill.value >= 80 ? 'default' : 'outline'}
                    className="text-xs"
                  >
                    {skill.skill}: {skill.value}%
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* تبويب توزيع الوقت */}
        <TabsContent value="time">
          <Card className="border-0 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Calendar className="w-4 h-4 text-success" />
                توزيع الأنشطة التعليمية
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <ResponsiveContainer width="50%" height={180}>
                  <PieChart>
                    <Pie
                      data={timeDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={70}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {timeDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                        fontSize: '12px'
                      }}
                      formatter={(value: number) => [`${value}%`, 'النسبة']}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex-1 space-y-2">
                  {timeDistribution.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm text-foreground">{item.name}</span>
                      </div>
                      <span className="text-sm font-medium text-muted-foreground">
                        {item.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default SmartAnalytics;
