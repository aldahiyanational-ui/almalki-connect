import { useState, useEffect } from 'react';
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { Plus, UserPlus, BookOpen, Award, Clock, Loader2, Pencil, Trash2, List } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { schools } from '@/contexts/SchoolContext';
import { ScrollArea } from '@/components/ui/scroll-area';

// Schemas
const studentSchema = z.object({
  name: z.string().min(2, 'اسم الطالب مطلوب').max(100, 'الاسم طويل جداً'),
  grade: z.string().min(1, 'الصف مطلوب'),
  school_id: z.string().min(1, 'المدرسة مطلوبة'),
});

const performanceSchema = z.object({
  student_id: z.string().min(1, 'اختر الطالب'),
  month: z.string().min(1, 'الشهر مطلوب'),
  average_grade: z.coerce.number().min(0).max(100, 'الدرجة بين 0 و 100'),
  attendance_rate: z.coerce.number().min(0).max(100, 'النسبة بين 0 و 100'),
});

const subjectSchema = z.object({
  student_id: z.string().min(1, 'اختر الطالب'),
  subject: z.string().min(1, 'المادة مطلوبة'),
  grade: z.coerce.number().min(0).max(100, 'الدرجة بين 0 و 100'),
  semester: z.string().min(1, 'الفصل مطلوب'),
});

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

interface Performance {
  id: string;
  student_id: string;
  month: string;
  average_grade: number;
  attendance_rate: number;
}

interface SubjectGrade {
  id: string;
  student_id: string;
  subject: string;
  grade: number;
  semester: string;
}

interface Skill {
  id: string;
  student_id: string;
  skill_name: string;
  score: number;
}

const grades = [
  'الصف الأول', 'الصف الثاني', 'الصف الثالث', 'الصف الرابع',
  'الصف الخامس', 'الصف السادس', 'الصف الأول متوسط', 'الصف الثاني متوسط',
  'الصف الثالث متوسط', 'الصف الأول ثانوي', 'الصف الثاني ثانوي', 'الصف الثالث ثانوي',
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

type EditMode = 'add' | 'edit';
type ViewMode = 'form' | 'list';

const StudentDataForm = ({ onDataAdded }: StudentDataFormProps) => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [performances, setPerformances] = useState<Performance[]>([]);
  const [subjectGrades, setSubjectGrades] = useState<SubjectGrade[]>([]);
  const [studentSkills, setStudentSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('student');
  const [viewMode, setViewMode] = useState<ViewMode>('form');
  const [editMode, setEditMode] = useState<EditMode>('add');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{ type: string; id: string } | null>(null);

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

  // Fetch all data
  const fetchAllData = async () => {
    if (!user) return;
    
    const [studentsRes, perfRes, gradesRes, skillsRes] = await Promise.all([
      supabase.from('students').select('*').eq('user_id', user.id),
      supabase.from('student_performance').select('*'),
      supabase.from('subject_grades').select('*'),
      supabase.from('student_skills').select('*'),
    ]);

    if (studentsRes.data) setStudents(studentsRes.data);
    if (perfRes.data) setPerformances(perfRes.data);
    if (gradesRes.data) setSubjectGrades(gradesRes.data);
    if (skillsRes.data) setStudentSkills(skillsRes.data);
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen) {
      fetchAllData();
      resetForms();
    }
  };

  const resetForms = () => {
    setEditMode('add');
    setEditingId(null);
    setViewMode('form');
    studentForm.reset({ name: '', grade: '', school_id: '' });
    performanceForm.reset({ student_id: '', month: '', average_grade: 0, attendance_rate: 100 });
    subjectForm.reset({ student_id: '', subject: '', grade: 0, semester: '' });
    skillForm.reset({ student_id: '', skill_name: '', score: 0 });
  };

  // Student CRUD
  const onSubmitStudent = async (data: StudentFormData) => {
    if (!user) {
      toast({ title: 'خطأ', description: 'يجب تسجيل الدخول', variant: 'destructive' });
      return;
    }

    setLoading(true);

    if (editMode === 'edit' && editingId) {
      const { error } = await supabase
        .from('students')
        .update({ name: data.name.trim(), grade: data.grade, school_id: data.school_id })
        .eq('id', editingId);

      if (error) {
        toast({ title: 'خطأ', description: 'فشل في تحديث الطالب', variant: 'destructive' });
      } else {
        toast({ title: 'تم بنجاح', description: 'تم تحديث بيانات الطالب' });
        resetForms();
        fetchAllData();
        onDataAdded?.();
      }
    } else {
      const { error } = await supabase
        .from('students')
        .insert({ user_id: user.id, name: data.name.trim(), grade: data.grade, school_id: data.school_id });

      if (error) {
        toast({ title: 'خطأ', description: 'فشل في إضافة الطالب', variant: 'destructive' });
      } else {
        toast({ title: 'تم بنجاح', description: 'تم إضافة الطالب' });
        studentForm.reset();
        fetchAllData();
        onDataAdded?.();
      }
    }

    setLoading(false);
  };

  const editStudent = (student: Student) => {
    setEditMode('edit');
    setEditingId(student.id);
    setViewMode('form');
    studentForm.reset({ name: student.name, grade: student.grade, school_id: student.school_id });
  };

  // Performance CRUD
  const onSubmitPerformance = async (data: PerformanceFormData) => {
    setLoading(true);

    if (editMode === 'edit' && editingId) {
      const { error } = await supabase
        .from('student_performance')
        .update({ student_id: data.student_id, month: data.month, average_grade: data.average_grade, attendance_rate: data.attendance_rate })
        .eq('id', editingId);

      if (error) {
        toast({ title: 'خطأ', description: 'فشل في تحديث الأداء', variant: 'destructive' });
      } else {
        toast({ title: 'تم بنجاح', description: 'تم تحديث بيانات الأداء' });
        resetForms();
        fetchAllData();
        onDataAdded?.();
      }
    } else {
      const { error } = await supabase
        .from('student_performance')
        .insert({ student_id: data.student_id, month: data.month, average_grade: data.average_grade, attendance_rate: data.attendance_rate });

      if (error) {
        toast({ title: 'خطأ', description: 'فشل في إضافة الأداء', variant: 'destructive' });
      } else {
        toast({ title: 'تم بنجاح', description: 'تم إضافة بيانات الأداء' });
        performanceForm.reset();
        fetchAllData();
        onDataAdded?.();
      }
    }

    setLoading(false);
  };

  const editPerformance = (perf: Performance) => {
    setEditMode('edit');
    setEditingId(perf.id);
    setViewMode('form');
    performanceForm.reset({
      student_id: perf.student_id,
      month: perf.month,
      average_grade: perf.average_grade,
      attendance_rate: perf.attendance_rate ?? 100,
    });
  };

  // Subject CRUD
  const onSubmitSubject = async (data: SubjectFormData) => {
    setLoading(true);

    if (editMode === 'edit' && editingId) {
      const { error } = await supabase
        .from('subject_grades')
        .update({ student_id: data.student_id, subject: data.subject, grade: data.grade, semester: data.semester })
        .eq('id', editingId);

      if (error) {
        toast({ title: 'خطأ', description: 'فشل في تحديث الدرجة', variant: 'destructive' });
      } else {
        toast({ title: 'تم بنجاح', description: 'تم تحديث درجة المادة' });
        resetForms();
        fetchAllData();
        onDataAdded?.();
      }
    } else {
      const { error } = await supabase
        .from('subject_grades')
        .insert({ student_id: data.student_id, subject: data.subject, grade: data.grade, semester: data.semester });

      if (error) {
        toast({ title: 'خطأ', description: 'فشل في إضافة الدرجة', variant: 'destructive' });
      } else {
        toast({ title: 'تم بنجاح', description: 'تم إضافة درجة المادة' });
        subjectForm.reset();
        fetchAllData();
        onDataAdded?.();
      }
    }

    setLoading(false);
  };

  const editSubjectGrade = (grade: SubjectGrade) => {
    setEditMode('edit');
    setEditingId(grade.id);
    setViewMode('form');
    subjectForm.reset({
      student_id: grade.student_id,
      subject: grade.subject,
      grade: grade.grade,
      semester: grade.semester,
    });
  };

  // Skill CRUD
  const onSubmitSkill = async (data: SkillFormData) => {
    setLoading(true);

    if (editMode === 'edit' && editingId) {
      const { error } = await supabase
        .from('student_skills')
        .update({ student_id: data.student_id, skill_name: data.skill_name, score: data.score })
        .eq('id', editingId);

      if (error) {
        toast({ title: 'خطأ', description: 'فشل في تحديث المهارة', variant: 'destructive' });
      } else {
        toast({ title: 'تم بنجاح', description: 'تم تحديث تقييم المهارة' });
        resetForms();
        fetchAllData();
        onDataAdded?.();
      }
    } else {
      const { error } = await supabase
        .from('student_skills')
        .insert({ student_id: data.student_id, skill_name: data.skill_name, score: data.score });

      if (error) {
        toast({ title: 'خطأ', description: 'فشل في إضافة المهارة', variant: 'destructive' });
      } else {
        toast({ title: 'تم بنجاح', description: 'تم إضافة تقييم المهارة' });
        skillForm.reset();
        fetchAllData();
        onDataAdded?.();
      }
    }

    setLoading(false);
  };

  const editSkill = (skill: Skill) => {
    setEditMode('edit');
    setEditingId(skill.id);
    setViewMode('form');
    skillForm.reset({
      student_id: skill.student_id,
      skill_name: skill.skill_name,
      score: skill.score,
    });
  };

  // Delete handler
  const confirmDelete = (type: string, id: string) => {
    setItemToDelete({ type, id });
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!itemToDelete) return;

    setLoading(true);
    let error = null;

    switch (itemToDelete.type) {
      case 'student':
        ({ error } = await supabase.from('students').delete().eq('id', itemToDelete.id));
        break;
      case 'performance':
        ({ error } = await supabase.from('student_performance').delete().eq('id', itemToDelete.id));
        break;
      case 'subject':
        ({ error } = await supabase.from('subject_grades').delete().eq('id', itemToDelete.id));
        break;
      case 'skill':
        ({ error } = await supabase.from('student_skills').delete().eq('id', itemToDelete.id));
        break;
    }

    setLoading(false);
    setDeleteDialogOpen(false);
    setItemToDelete(null);

    if (error) {
      toast({ title: 'خطأ', description: 'فشل في الحذف', variant: 'destructive' });
    } else {
      toast({ title: 'تم الحذف', description: 'تم حذف السجل بنجاح' });
      fetchAllData();
      onDataAdded?.();
    }
  };

  const getStudentName = (studentId: string) => {
    return students.find(s => s.id === studentId)?.name || 'غير معروف';
  };

  // List components
  const StudentList = () => (
    <ScrollArea className="h-64">
      <div className="space-y-2">
        {students.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">لا يوجد طلاب</p>
        ) : (
          students.map((student) => (
            <div key={student.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium text-sm">{student.name}</p>
                <p className="text-xs text-muted-foreground">{student.grade}</p>
              </div>
              <div className="flex gap-1">
                <Button size="icon" variant="ghost" onClick={() => editStudent(student)}>
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="ghost" className="text-destructive" onClick={() => confirmDelete('student', student.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </ScrollArea>
  );

  const PerformanceList = () => (
    <ScrollArea className="h-64">
      <div className="space-y-2">
        {performances.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">لا توجد بيانات أداء</p>
        ) : (
          performances.map((perf) => (
            <div key={perf.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium text-sm">{getStudentName(perf.student_id)} - {perf.month}</p>
                <p className="text-xs text-muted-foreground">المعدل: {perf.average_grade}% | الحضور: {perf.attendance_rate}%</p>
              </div>
              <div className="flex gap-1">
                <Button size="icon" variant="ghost" onClick={() => editPerformance(perf)}>
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="ghost" className="text-destructive" onClick={() => confirmDelete('performance', perf.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </ScrollArea>
  );

  const SubjectList = () => (
    <ScrollArea className="h-64">
      <div className="space-y-2">
        {subjectGrades.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">لا توجد درجات</p>
        ) : (
          subjectGrades.map((grade) => (
            <div key={grade.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium text-sm">{getStudentName(grade.student_id)} - {grade.subject}</p>
                <p className="text-xs text-muted-foreground">{grade.semester}: {grade.grade}%</p>
              </div>
              <div className="flex gap-1">
                <Button size="icon" variant="ghost" onClick={() => editSubjectGrade(grade)}>
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="ghost" className="text-destructive" onClick={() => confirmDelete('subject', grade.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </ScrollArea>
  );

  const SkillList = () => (
    <ScrollArea className="h-64">
      <div className="space-y-2">
        {studentSkills.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">لا توجد مهارات</p>
        ) : (
          studentSkills.map((skill) => (
            <div key={skill.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium text-sm">{getStudentName(skill.student_id)} - {skill.skill_name}</p>
                <p className="text-xs text-muted-foreground">الدرجة: {skill.score}%</p>
              </div>
              <div className="flex gap-1">
                <Button size="icon" variant="ghost" onClick={() => editSkill(skill)}>
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="ghost" className="text-destructive" onClick={() => confirmDelete('skill', skill.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </ScrollArea>
  );

  return (
    <>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            إدارة البيانات
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto" dir="rtl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-primary" />
              إدارة بيانات الطالب والأداء
            </DialogTitle>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={(v) => { setActiveTab(v); resetForms(); }} className="mt-4">
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

            {/* Student Tab */}
            <TabsContent value="student">
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-3 flex flex-row items-center justify-between">
                  <CardTitle className="text-sm">
                    {editMode === 'edit' ? 'تعديل الطالب' : 'إضافة طالب جديد'}
                  </CardTitle>
                  <Button size="sm" variant="outline" onClick={() => setViewMode(viewMode === 'form' ? 'list' : 'form')}>
                    <List className="w-4 h-4 ml-1" />
                    {viewMode === 'form' ? 'عرض القائمة' : 'إضافة جديد'}
                  </Button>
                </CardHeader>
                <CardContent>
                  {viewMode === 'list' ? (
                    <StudentList />
                  ) : (
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

                        <div className="flex gap-2">
                          <Button type="submit" className="flex-1" disabled={loading}>
                            {loading && <Loader2 className="w-4 h-4 ml-2 animate-spin" />}
                            {editMode === 'edit' ? 'تحديث' : 'إضافة'}
                          </Button>
                          {editMode === 'edit' && (
                            <Button type="button" variant="outline" onClick={resetForms}>
                              إلغاء
                            </Button>
                          )}
                        </div>
                      </form>
                    </Form>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Performance Tab */}
            <TabsContent value="performance">
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-3 flex flex-row items-center justify-between">
                  <CardTitle className="text-sm">
                    {editMode === 'edit' ? 'تعديل الأداء' : 'إضافة أداء شهري'}
                  </CardTitle>
                  <Button size="sm" variant="outline" onClick={() => setViewMode(viewMode === 'form' ? 'list' : 'form')}>
                    <List className="w-4 h-4 ml-1" />
                    {viewMode === 'form' ? 'عرض القائمة' : 'إضافة جديد'}
                  </Button>
                </CardHeader>
                <CardContent>
                  {viewMode === 'list' ? (
                    <PerformanceList />
                  ) : students.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">أضف طالباً أولاً</p>
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

                        <div className="flex gap-2">
                          <Button type="submit" className="flex-1" disabled={loading}>
                            {loading && <Loader2 className="w-4 h-4 ml-2 animate-spin" />}
                            {editMode === 'edit' ? 'تحديث' : 'إضافة'}
                          </Button>
                          {editMode === 'edit' && (
                            <Button type="button" variant="outline" onClick={resetForms}>
                              إلغاء
                            </Button>
                          )}
                        </div>
                      </form>
                    </Form>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Subject Tab */}
            <TabsContent value="subject">
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-3 flex flex-row items-center justify-between">
                  <CardTitle className="text-sm">
                    {editMode === 'edit' ? 'تعديل الدرجة' : 'إضافة درجة مادة'}
                  </CardTitle>
                  <Button size="sm" variant="outline" onClick={() => setViewMode(viewMode === 'form' ? 'list' : 'form')}>
                    <List className="w-4 h-4 ml-1" />
                    {viewMode === 'form' ? 'عرض القائمة' : 'إضافة جديد'}
                  </Button>
                </CardHeader>
                <CardContent>
                  {viewMode === 'list' ? (
                    <SubjectList />
                  ) : students.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">أضف طالباً أولاً</p>
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
                                      <SelectValue placeholder="اختر الفصل" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="الفصل الأول">الفصل الأول</SelectItem>
                                    <SelectItem value="الفصل الثاني">الفصل الثاني</SelectItem>
                                    <SelectItem value="الفصل الثالث">الفصل الثالث</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="flex gap-2">
                          <Button type="submit" className="flex-1" disabled={loading}>
                            {loading && <Loader2 className="w-4 h-4 ml-2 animate-spin" />}
                            {editMode === 'edit' ? 'تحديث' : 'إضافة'}
                          </Button>
                          {editMode === 'edit' && (
                            <Button type="button" variant="outline" onClick={resetForms}>
                              إلغاء
                            </Button>
                          )}
                        </div>
                      </form>
                    </Form>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Skill Tab */}
            <TabsContent value="skill">
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-3 flex flex-row items-center justify-between">
                  <CardTitle className="text-sm">
                    {editMode === 'edit' ? 'تعديل المهارة' : 'إضافة تقييم مهارة'}
                  </CardTitle>
                  <Button size="sm" variant="outline" onClick={() => setViewMode(viewMode === 'form' ? 'list' : 'form')}>
                    <List className="w-4 h-4 ml-1" />
                    {viewMode === 'form' ? 'عرض القائمة' : 'إضافة جديد'}
                  </Button>
                </CardHeader>
                <CardContent>
                  {viewMode === 'list' ? (
                    <SkillList />
                  ) : students.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">أضف طالباً أولاً</p>
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
                              <FormLabel>الدرجة (%)</FormLabel>
                              <FormControl>
                                <Input type="number" min={0} max={100} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="flex gap-2">
                          <Button type="submit" className="flex-1" disabled={loading}>
                            {loading && <Loader2 className="w-4 h-4 ml-2 animate-spin" />}
                            {editMode === 'edit' ? 'تحديث' : 'إضافة'}
                          </Button>
                          {editMode === 'edit' && (
                            <Button type="button" variant="outline" onClick={resetForms}>
                              إلغاء
                            </Button>
                          )}
                        </div>
                      </form>
                    </Form>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent dir="rtl">
          <AlertDialogHeader>
            <AlertDialogTitle>تأكيد الحذف</AlertDialogTitle>
            <AlertDialogDescription>
              هل أنت متأكد من حذف هذا السجل؟ لا يمكن التراجع عن هذا الإجراء.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-row-reverse gap-2">
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'حذف'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default StudentDataForm;
