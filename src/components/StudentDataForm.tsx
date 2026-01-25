import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Plus, UserPlus, BookOpen, Award, Clock, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { schools } from '@/contexts/SchoolContext';

// Schema للطالب
const studentSchema = z.object({
  name: z.string().min(2, 'اسم الطالب مطلوب').max(100, 'الاسم طويل جداً'),
  grade: z.string().min(1, 'الصف مطلوب'),
  school_id: z.string().min(1, 'المدرسة مطلوبة'),
});

// Schema للأداء الشهري
const performanceSchema = z.object({
  student_id: z.string().min(1, 'اختر الطالب'),
  month: z.string().min(1, 'الشهر مطلوب'),
  average_grade: z.coerce.number().min(0).max(100, 'الدرجة بين 0 و 100'),
  attendance_rate: z.coerce.number().min(0).max(100, 'النسبة بين 0 و 100'),
});

// Schema لدرجات المواد
const subjectSchema = z.object({
  student_id: z.string().min(1, 'اختر الطالب'),
  subject: z.string().min(1, 'المادة مطلوبة'),
  grade: z.coerce.number().min(0).max(100, 'الدرجة بين 0 و 100'),
  semester: z.string().min(1, 'الفصل مطلوب'),
});

// Schema للمهارات
const skillSchema = z.object({
  student_id: z.string().min(1, 'اختر الطالب'),
  skill_name: z.string().min(1, 'المهارة مطلوبة'),
  score: z.coerce.number().min(0).max(100, 'الدرجة بين 0 و 100'),
});

type StudentFormData = z.infer<typeof studentSchema>;
type PerformanceFormData = z.infer<typeof performanceSchema>;
type SubjectFormData = z.infer<typeof subjectSchema>;
type SkillFormData = z.infer<typeof skillSchema>;

interface Student {
  id: string;
  name: string;
  grade: string;
  school_id: string;
}

const grades = [
  'الصف الأول',
  'الصف الثاني',
  'الصف الثالث',
  'الصف الرابع',
  'الصف الخامس',
  'الصف السادس',
  'الصف الأول متوسط',
  'الصف الثاني متوسط',
  'الصف الثالث متوسط',
  'الصف الأول ثانوي',
  'الصف الثاني ثانوي',
  'الصف الثالث ثانوي',
];

const months = [
  'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر',
  'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'
];

const subjects = [
  'الرياضيات', 'اللغة العربية', 'العلوم', 'اللغة الإنجليزية',
  'الدراسات الإسلامية', 'الدراسات الاجتماعية', 'التربية الفنية',
  'التربية البدنية', 'الحاسب الآلي', 'المهارات الحياتية'
];

const skills = [
  'التفكير النقدي', 'حل المشكلات', 'التواصل', 'العمل الجماعي',
  'الإبداع', 'القيادة', 'التنظيم', 'البحث العلمي'
];

interface StudentDataFormProps {
  onDataAdded?: () => void;
}

const StudentDataForm = ({ onDataAdded }: StudentDataFormProps) => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('student');

  // Forms
  const studentForm = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
    defaultValues: { name: '', grade: '', school_id: '' },
  });

  const performanceForm = useForm<PerformanceFormData>({
    resolver: zodResolver(performanceSchema),
    defaultValues: { student_id: '', month: '', average_grade: 0, attendance_rate: 100 },
  });

  const subjectForm = useForm<SubjectFormData>({
    resolver: zodResolver(subjectSchema),
    defaultValues: { student_id: '', subject: '', grade: 0, semester: '' },
  });

  const skillForm = useForm<SkillFormData>({
    resolver: zodResolver(skillSchema),
    defaultValues: { student_id: '', skill_name: '', score: 0 },
  });

  // جلب الطلاب عند فتح النموذج
  const fetchStudents = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .eq('user_id', user.id);
    
    if (!error && data) {
      setStudents(data);
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen) {
      fetchStudents();
    }
  };

  // إضافة طالب جديد
  const onSubmitStudent = async (data: StudentFormData) => {
    if (!user) {
      toast({ title: 'خطأ', description: 'يجب تسجيل الدخول', variant: 'destructive' });
      return;
    }

    setLoading(true);
    const { error } = await supabase
      .from('students')
      .insert({
        user_id: user.id,
        name: data.name.trim(),
        grade: data.grade,
        school_id: data.school_id,
      });

    setLoading(false);

    if (error) {
      toast({ title: 'خطأ', description: 'فشل في إضافة الطالب', variant: 'destructive' });
      return;
    }

    toast({ title: 'تم بنجاح', description: 'تم إضافة الطالب' });
    studentForm.reset();
    fetchStudents();
    onDataAdded?.();
  };

  // إضافة الأداء الشهري
  const onSubmitPerformance = async (data: PerformanceFormData) => {
    setLoading(true);
    const { error } = await supabase
      .from('student_performance')
      .insert({
        student_id: data.student_id,
        month: data.month,
        average_grade: data.average_grade,
        attendance_rate: data.attendance_rate,
      });

    setLoading(false);

    if (error) {
      toast({ title: 'خطأ', description: 'فشل في إضافة الأداء', variant: 'destructive' });
      return;
    }

    toast({ title: 'تم بنجاح', description: 'تم إضافة بيانات الأداء' });
    performanceForm.reset();
    onDataAdded?.();
  };

  // إضافة درجة مادة
  const onSubmitSubject = async (data: SubjectFormData) => {
    setLoading(true);
    const { error } = await supabase
      .from('subject_grades')
      .insert({
        student_id: data.student_id,
        subject: data.subject,
        grade: data.grade,
        semester: data.semester,
      });

    setLoading(false);

    if (error) {
      toast({ title: 'خطأ', description: 'فشل في إضافة الدرجة', variant: 'destructive' });
      return;
    }

    toast({ title: 'تم بنجاح', description: 'تم إضافة درجة المادة' });
    subjectForm.reset();
    onDataAdded?.();
  };

  // إضافة مهارة
  const onSubmitSkill = async (data: SkillFormData) => {
    setLoading(true);
    const { error } = await supabase
      .from('student_skills')
      .insert({
        student_id: data.student_id,
        skill_name: data.skill_name,
        score: data.score,
      });

    setLoading(false);

    if (error) {
      toast({ title: 'خطأ', description: 'فشل في إضافة المهارة', variant: 'destructive' });
      return;
    }

    toast({ title: 'تم بنجاح', description: 'تم إضافة تقييم المهارة' });
    skillForm.reset();
    onDataAdded?.();
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          إضافة بيانات
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto" dir="rtl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-primary" />
            إضافة بيانات الطالب والأداء
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="student" className="text-xs">
              <UserPlus className="w-3 h-3 ml-1" />
              طالب
            </TabsTrigger>
            <TabsTrigger value="performance" className="text-xs">
              <Award className="w-3 h-3 ml-1" />
              أداء
            </TabsTrigger>
            <TabsTrigger value="subject" className="text-xs">
              <BookOpen className="w-3 h-3 ml-1" />
              مادة
            </TabsTrigger>
            <TabsTrigger value="skill" className="text-xs">
              <Clock className="w-3 h-3 ml-1" />
              مهارة
            </TabsTrigger>
          </TabsList>

          {/* نموذج إضافة طالب */}
          <TabsContent value="student">
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">إضافة طالب جديد</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...studentForm}>
                  <form onSubmit={studentForm.handleSubmit(onSubmitStudent)} className="space-y-4">
                    <FormField
                      control={studentForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>اسم الطالب</FormLabel>
                          <FormControl>
                            <Input placeholder="أدخل اسم الطالب" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={studentForm.control}
                      name="grade"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>الصف الدراسي</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="اختر الصف" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {grades.map((g) => (
                                <SelectItem key={g} value={g}>{g}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={studentForm.control}
                      name="school_id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>المدرسة</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="اختر المدرسة" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Object.values(schools).map((school) => (
                                <SelectItem key={school.id} value={school.id}>
                                  {school.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading && <Loader2 className="w-4 h-4 ml-2 animate-spin" />}
                      إضافة الطالب
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* نموذج إضافة الأداء */}
          <TabsContent value="performance">
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">إضافة أداء شهري</CardTitle>
              </CardHeader>
              <CardContent>
                {students.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    أضف طالباً أولاً
                  </p>
                ) : (
                  <Form {...performanceForm}>
                    <form onSubmit={performanceForm.handleSubmit(onSubmitPerformance)} className="space-y-4">
                      <FormField
                        control={performanceForm.control}
                        name="student_id"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>الطالب</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="اختر الطالب" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {students.map((s) => (
                                  <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={performanceForm.control}
                        name="month"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>الشهر</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="اختر الشهر" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {months.map((m) => (
                                  <SelectItem key={m} value={m}>{m}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={performanceForm.control}
                          name="average_grade"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>المعدل (%)</FormLabel>
                              <FormControl>
                                <Input type="number" min={0} max={100} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={performanceForm.control}
                          name="attendance_rate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>الحضور (%)</FormLabel>
                              <FormControl>
                                <Input type="number" min={0} max={100} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <Button type="submit" className="w-full" disabled={loading}>
                        {loading && <Loader2 className="w-4 h-4 ml-2 animate-spin" />}
                        إضافة الأداء
                      </Button>
                    </form>
                  </Form>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* نموذج إضافة درجة مادة */}
          <TabsContent value="subject">
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">إضافة درجة مادة</CardTitle>
              </CardHeader>
              <CardContent>
                {students.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    أضف طالباً أولاً
                  </p>
                ) : (
                  <Form {...subjectForm}>
                    <form onSubmit={subjectForm.handleSubmit(onSubmitSubject)} className="space-y-4">
                      <FormField
                        control={subjectForm.control}
                        name="student_id"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>الطالب</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="اختر الطالب" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {students.map((s) => (
                                  <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={subjectForm.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>المادة</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="اختر المادة" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {subjects.map((s) => (
                                  <SelectItem key={s} value={s}>{s}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={subjectForm.control}
                          name="grade"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>الدرجة (%)</FormLabel>
                              <FormControl>
                                <Input type="number" min={0} max={100} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={subjectForm.control}
                          name="semester"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>الفصل</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="الفصل" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="الأول">الأول</SelectItem>
                                  <SelectItem value="الثاني">الثاني</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <Button type="submit" className="w-full" disabled={loading}>
                        {loading && <Loader2 className="w-4 h-4 ml-2 animate-spin" />}
                        إضافة الدرجة
                      </Button>
                    </form>
                  </Form>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* نموذج إضافة مهارة */}
          <TabsContent value="skill">
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">إضافة تقييم مهارة</CardTitle>
              </CardHeader>
              <CardContent>
                {students.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    أضف طالباً أولاً
                  </p>
                ) : (
                  <Form {...skillForm}>
                    <form onSubmit={skillForm.handleSubmit(onSubmitSkill)} className="space-y-4">
                      <FormField
                        control={skillForm.control}
                        name="student_id"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>الطالب</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="اختر الطالب" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {students.map((s) => (
                                  <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={skillForm.control}
                        name="skill_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>المهارة</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="اختر المهارة" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {skills.map((s) => (
                                  <SelectItem key={s} value={s}>{s}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={skillForm.control}
                        name="score"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>التقييم (%)</FormLabel>
                            <FormControl>
                              <Input type="number" min={0} max={100} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="submit" className="w-full" disabled={loading}>
                        {loading && <Loader2 className="w-4 h-4 ml-2 animate-spin" />}
                        إضافة التقييم
                      </Button>
                    </form>
                  </Form>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default StudentDataForm;
