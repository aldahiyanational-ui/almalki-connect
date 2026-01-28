import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, TrendingUp, TrendingDown, Award, 
  BookOpen, Calendar, Target, Users, Loader2, GraduationCap
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

// بيانات تجريبية لتحليلات المعلم
const classPerformanceData = [
  { month: 'سبتمبر', average: 78, attendance: 92 },
  { month: 'أكتوبر', average: 82, attendance: 94 },
  { month: 'نوفمبر', average: 80, attendance: 90 },
  { month: 'ديسمبر', average: 85, attendance: 95 },
  { month: 'يناير', average: 88, attendance: 97 },
];

const classesData = [
  { name: 'الصف الرابع أ', students: 28, average: 85, color: 'hsl(var(--primary))' },
  { name: 'الصف الخامس ب', students: 25, average: 82, color: 'hsl(var(--secondary))' },
  { name: 'الصف السادس أ', students: 30, average: 88, color: 'hsl(var(--success))' },
];

const gradeDistribution = [
  { range: 'ممتاز (90-100)', count: 35, color: 'hsl(var(--success))' },
  { range: 'جيد جداً (80-89)', count: 42, color: 'hsl(var(--primary))' },
  { range: 'جيد (70-79)', count: 28, color: 'hsl(var(--secondary))' },
  { range: 'مقبول (60-69)', count: 12, color: 'hsl(var(--accent))' },
  { range: 'ضعيف (<60)', count: 3, color: 'hsl(var(--destructive))' },
];

const skillsAssessment = [
  { skill: 'الفهم', value: 85, fullMark: 100 },
  { skill: 'التطبيق', value: 78, fullMark: 100 },
  { skill: 'التحليل', value: 72, fullMark: 100 },
  { skill: 'الحفظ', value: 88, fullMark: 100 },
  { skill: 'الإبداع', value: 65, fullMark: 100 },
  { skill: 'المشاركة', value: 80, fullMark: 100 },
];

const topStudents = [
  { name: 'أحمد محمد', grade: 98, class: 'الصف السادس أ' },
  { name: 'سارة علي', grade: 96, class: 'الصف الخامس ب' },
  { name: 'خالد عبدالله', grade: 95, class: 'الصف الرابع أ' },
  { name: 'نورة سعد', grade: 94, class: 'الصف السادس أ' },
  { name: 'فهد ناصر', grade: 93, class: 'الصف الخامس ب' },
];

const needsAttention = [
  { name: 'يوسف أحمد', grade: 55, issue: 'تراجع في الأداء', class: 'الصف الرابع أ' },
  { name: 'لمى محمد', grade: 58, issue: 'غياب متكرر', class: 'الصف الخامس ب' },
  { name: 'عمر سالم', grade: 62, issue: 'صعوبة في الفهم', class: 'الصف السادس أ' },
];

const TeacherAnalytics = () => {
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [loading, setLoading] = useState(false);

  // إحصائيات عامة
  const totalStudents = classesData.reduce((sum, c) => sum + c.students, 0);
  const overallAverage = Math.round(classesData.reduce((sum, c) => sum + c.average * c.students, 0) / totalStudents);
  const trend = classPerformanceData.length >= 2 
    ? classPerformanceData[classPerformanceData.length - 1].average - classPerformanceData[0].average 
    : 0;
  const attendanceAvg = Math.round(classPerformanceData.reduce((acc, m) => acc + m.attendance, 0) / classPerformanceData.length);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
        <span className="mr-2 text-muted-foreground">جاري تحميل التحليلات...</span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      {/* العنوان واختيار الفصل */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-bold text-foreground">تحليلات أداء الطلاب</h2>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Badge
            variant={selectedClass === 'all' ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => setSelectedClass('all')}
          >
            جميع الفصول
          </Badge>
          {classesData.map((cls) => (
            <Badge
              key={cls.name}
              variant={selectedClass === cls.name ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => setSelectedClass(cls.name)}
            >
              {cls.name}
            </Badge>
          ))}
        </div>
      </div>

      {/* البطاقات الإحصائية السريعة */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-2xl font-bold text-foreground">{totalStudents}</span>
            </div>
            <p className="text-xs text-muted-foreground">إجمالي الطلاب</p>
            <Badge variant="outline" className="text-xs mt-1">{classesData.length} فصول</Badge>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Target className="w-4 h-4 text-secondary" />
              <span className="text-2xl font-bold text-foreground">{overallAverage}%</span>
            </div>
            <p className="text-xs text-muted-foreground">المعدل العام</p>
            <div className="flex items-center justify-center gap-1 mt-1">
              {trend > 0 ? (
                <TrendingUp className="w-3 h-3 text-success" />
              ) : trend < 0 ? (
                <TrendingDown className="w-3 h-3 text-destructive" />
              ) : null}
              <span className={`text-xs ${trend > 0 ? 'text-success' : trend < 0 ? 'text-destructive' : 'text-muted-foreground'}`}>
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
            <Badge variant="secondary" className="text-xs mt-1">
              {attendanceAvg >= 90 ? 'ممتاز' : attendanceAvg >= 75 ? 'جيد' : 'يحتاج تحسين'}
            </Badge>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Award className="w-4 h-4 text-accent" />
              <span className="text-2xl font-bold text-foreground">{gradeDistribution[0].count}</span>
            </div>
            <p className="text-xs text-muted-foreground">طلاب متفوقين</p>
            <Badge className="text-xs mt-1 bg-success text-success-foreground">ممتاز</Badge>
          </CardContent>
        </Card>
      </div>

      {/* التبويبات للرسوم البيانية */}
      <Tabs defaultValue="performance" dir="rtl">
        <TabsList className="grid w-full grid-cols-4 mb-4">
          <TabsTrigger value="performance" className="text-xs">الأداء</TabsTrigger>
          <TabsTrigger value="classes" className="text-xs">الفصول</TabsTrigger>
          <TabsTrigger value="distribution" className="text-xs">التوزيع</TabsTrigger>
          <TabsTrigger value="skills" className="text-xs">المهارات</TabsTrigger>
        </TabsList>

        {/* تبويب الأداء الشهري */}
        <TabsContent value="performance">
          <Card className="border-0 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                تطور أداء الفصول
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={classPerformanceData}>
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
                    dataKey="average" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2 }}
                    name="المعدل"
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
                  <span className="text-xs text-muted-foreground">المعدل</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-success" />
                  <span className="text-xs text-muted-foreground">الحضور</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* تبويب الفصول */}
        <TabsContent value="classes">
          <Card className="border-0 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-secondary" />
                مقارنة أداء الفصول
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={classesData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                  <XAxis 
                    type="number" 
                    domain={[0, 100]}
                    tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <YAxis 
                    type="category" 
                    dataKey="name"
                    tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                    width={100}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                    formatter={(value: number, name: string) => [
                      name === 'average' ? `${value}%` : value,
                      name === 'average' ? 'المعدل' : 'عدد الطلاب'
                    ]}
                  />
                  <Bar 
                    dataKey="average" 
                    radius={[0, 4, 4, 0]}
                  >
                    {classesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              {/* معلومات إضافية */}
              <div className="grid grid-cols-3 gap-2 mt-3">
                {classesData.map((cls, index) => (
                  <div key={index} className="text-center p-2 bg-muted/50 rounded-lg">
                    <p className="text-xs font-medium text-foreground">{cls.name}</p>
                    <p className="text-xs text-muted-foreground">{cls.students} طالب</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* تبويب التوزيع */}
        <TabsContent value="distribution">
          <Card className="border-0 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-accent" />
                توزيع الدرجات
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={gradeDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      dataKey="count"
                      nameKey="range"
                    >
                      {gradeDistribution.map((entry, index) => (
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
                      formatter={(value: number) => [`${value} طالب`, 'العدد']}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-col justify-center gap-2">
                  {gradeDistribution.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-xs text-muted-foreground">{item.range}</span>
                      <Badge variant="outline" className="text-xs mr-auto">{item.count}</Badge>
                    </div>
                  ))}
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
                <Award className="w-4 h-4 text-primary" />
                تقييم المهارات العامة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <RadarChart data={skillsAssessment}>
                  <PolarGrid stroke="hsl(var(--muted))" />
                  <PolarAngleAxis 
                    dataKey="skill" 
                    tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
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
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                    formatter={(value: number) => [`${value}%`, 'المستوى']}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* قوائم الطلاب */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* الطلاب المتفوقين */}
        <Card className="border-0 shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Award className="w-4 h-4 text-success" />
              الطلاب المتفوقين
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {topStudents.map((student, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-success/10 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="w-6 h-6 rounded-full p-0 flex items-center justify-center text-xs">
                      {index + 1}
                    </Badge>
                    <div>
                      <p className="text-sm font-medium text-foreground">{student.name}</p>
                      <p className="text-xs text-muted-foreground">{student.class}</p>
                    </div>
                  </div>
                  <Badge className="bg-success text-success-foreground">{student.grade}%</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* الطلاب الذين يحتاجون متابعة */}
        <Card className="border-0 shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-destructive" />
              يحتاجون متابعة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {needsAttention.map((student, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-destructive/10 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-foreground">{student.name}</p>
                    <p className="text-xs text-muted-foreground">{student.class}</p>
                    <Badge variant="outline" className="text-xs mt-1">{student.issue}</Badge>
                  </div>
                  <Badge variant="destructive">{student.grade}%</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default TeacherAnalytics;
