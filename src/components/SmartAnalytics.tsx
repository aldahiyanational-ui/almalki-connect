import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, TrendingUp, TrendingDown, Award, 
  BookOpen, Calendar, Target, Zap, Star, Loader2
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
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface Student {
  id: string;
  name: string;
  grade: string;
  school_id: string;
}

interface PerformanceData {
  month: string;
  grade: number;
  attendance: number;
}

interface SubjectData {
  subject: string;
  grade: number;
  color: string;
}

interface SkillData {
  skill: string;
  value: number;
  fullMark: number;
}

interface TimeData {
  name: string;
  value: number;
  color: string;
}

// البيانات التجريبية (تظهر عند عدم وجود بيانات حقيقية)
const defaultMonthlyPerformance = [
  { month: 'سبتمبر', grade: 85, attendance: 95 },
  { month: 'أكتوبر', grade: 88, attendance: 92 },
  { month: 'نوفمبر', grade: 82, attendance: 98 },
  { month: 'ديسمبر', grade: 90, attendance: 94 },
  { month: 'يناير', grade: 92, attendance: 96 },
];

const defaultSubjectsData = [
  { subject: 'الرياضيات', grade: 92, color: 'hsl(var(--primary))' },
  { subject: 'اللغة العربية', grade: 88, color: 'hsl(var(--secondary))' },
  { subject: 'العلوم', grade: 85, color: 'hsl(var(--success))' },
  { subject: 'اللغة الإنجليزية', grade: 90, color: 'hsl(var(--accent))' },
  { subject: 'الدراسات', grade: 78, color: 'hsl(var(--muted-foreground))' },
];

const defaultSkillsData = [
  { skill: 'التفكير النقدي', value: 85, fullMark: 100 },
  { skill: 'حل المشكلات', value: 78, fullMark: 100 },
  { skill: 'التواصل', value: 92, fullMark: 100 },
  { skill: 'العمل الجماعي', value: 88, fullMark: 100 },
  { skill: 'الإبداع', value: 75, fullMark: 100 },
  { skill: 'القيادة', value: 70, fullMark: 100 },
];

const defaultTimeDistribution = [
  { name: 'الدراسة', value: 45, color: 'hsl(var(--primary))' },
  { name: 'الأنشطة', value: 25, color: 'hsl(var(--secondary))' },
  { name: 'المشاريع', value: 20, color: 'hsl(var(--success))' },
  { name: 'الاختبارات', value: 10, color: 'hsl(var(--accent))' },
];

const subjectColors = [
  'hsl(var(--primary))',
  'hsl(var(--secondary))',
  'hsl(var(--success))',
  'hsl(var(--accent))',
  'hsl(var(--muted-foreground))',
];

const SmartAnalytics = () => {
  const { user } = useAuth();
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [performanceData, setPerformanceData] = useState<PerformanceData[]>(defaultMonthlyPerformance);
  const [subjectsData, setSubjectsData] = useState<SubjectData[]>(defaultSubjectsData);
  const [skillsData, setSkillsData] = useState<SkillData[]>(defaultSkillsData);
  const [timeDistribution, setTimeDistribution] = useState<TimeData[]>(defaultTimeDistribution);
  const [isUsingDemoData, setIsUsingDemoData] = useState(false);

  // جلب قائمة الطلاب
  useEffect(() => {
    const fetchStudents = async () => {
      if (!user) {
        setLoading(false);
        setIsUsingDemoData(true);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('students')
          .select('*')
          .eq('user_id', user.id);

        if (error) throw error;

        if (data && data.length > 0) {
          setStudents(data);
          setSelectedStudent(data[0]);
        } else {
          setIsUsingDemoData(true);
        }
      } catch (error) {
        console.error('Error fetching students:', error);
        setIsUsingDemoData(true);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [user]);

  // جلب بيانات الطالب المحدد
  useEffect(() => {
    const fetchStudentData = async () => {
      if (!selectedStudent) return;

      try {
        // جلب الأداء الشهري
        const { data: performance } = await supabase
          .from('student_performance')
          .select('*')
          .eq('student_id', selectedStudent.id)
          .order('created_at', { ascending: true });

        if (performance && performance.length > 0) {
          setPerformanceData(performance.map(p => ({
            month: p.month,
            grade: Number(p.average_grade),
            attendance: Number(p.attendance_rate) || 100
          })));
        } else {
          setPerformanceData(defaultMonthlyPerformance);
        }

        // جلب درجات المواد
        const { data: subjects } = await supabase
          .from('subject_grades')
          .select('*')
          .eq('student_id', selectedStudent.id);

        if (subjects && subjects.length > 0) {
          setSubjectsData(subjects.map((s, index) => ({
            subject: s.subject,
            grade: Number(s.grade),
            color: subjectColors[index % subjectColors.length]
          })));
        } else {
          setSubjectsData(defaultSubjectsData);
        }

        // جلب المهارات
        const { data: skills } = await supabase
          .from('student_skills')
          .select('*')
          .eq('student_id', selectedStudent.id);

        if (skills && skills.length > 0) {
          setSkillsData(skills.map(s => ({
            skill: s.skill_name,
            value: s.score,
            fullMark: s.full_score || 100
          })));
        } else {
          setSkillsData(defaultSkillsData);
        }

        // جلب توزيع الوقت
        const { data: time } = await supabase
          .from('study_time')
          .select('*')
          .eq('student_id', selectedStudent.id);

        if (time && time.length > 0) {
          const colors = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--success))', 'hsl(var(--accent))'];
          setTimeDistribution(time.map((t, index) => ({
            name: t.activity,
            value: Number(t.hours),
            color: colors[index % colors.length]
          })));
        } else {
          setTimeDistribution(defaultTimeDistribution);
        }
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchStudentData();
  }, [selectedStudent]);

  // حساب الإحصائيات
  const averageGrade = Math.round(subjectsData.reduce((acc, s) => acc + s.grade, 0) / subjectsData.length);
  const trend = performanceData.length >= 2 
    ? performanceData[performanceData.length - 1].grade - performanceData[0].grade 
    : 0;
  const attendanceAvg = Math.round(performanceData.reduce((acc, m) => acc + m.attendance, 0) / performanceData.length);

  const bestSubject = subjectsData.reduce((max, s) => s.grade > max.grade ? s : max, subjectsData[0]);
  const worstSubject = subjectsData.reduce((min, s) => s.grade < min.grade ? s : min, subjectsData[0]);

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
      {/* العنوان واختيار الطفل */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-bold text-foreground">تحليلات الأداء</h2>
          {isUsingDemoData && (
            <Badge variant="outline" className="text-xs">بيانات تجريبية</Badge>
          )}
        </div>
        <div className="flex gap-2 flex-wrap">
          {students.length > 0 ? (
            students.map((student) => (
              <Badge
                key={student.id}
                variant={selectedStudent?.id === student.id ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => setSelectedStudent(student)}
              >
                {student.name}
              </Badge>
            ))
          ) : (
            ['أحمد', 'سارة'].map((name) => (
              <Badge
                key={name}
                variant={name === 'أحمد' ? 'default' : 'outline'}
                className="cursor-pointer opacity-50"
              >
                {name}
              </Badge>
            ))
          )}
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
                <LineChart data={performanceData}>
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
                  <span>الأفضل: {bestSubject.subject} ({bestSubject.grade}%)</span>
                </div>
                <div className="flex items-center gap-1 text-destructive">
                  <Target className="w-3 h-3" />
                  <span>تحتاج تحسين: {worstSubject.subject} ({worstSubject.grade}%)</span>
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
