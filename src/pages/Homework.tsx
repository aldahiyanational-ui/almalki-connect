import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Clock,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  Upload,
  FileText,
  Filter,
} from "lucide-react";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const homeworkData = [
  {
    id: 1,
    subject: "الرياضيات",
    title: "حل تمارين الوحدة الخامسة",
    description: "حل التمارين من صفحة 45 إلى صفحة 48",
    teacher: "أ. خالد العمري",
    dueDate: "2024/03/15",
    status: "pending",
    priority: "high",
  },
  {
    id: 2,
    subject: "اللغة العربية",
    title: "كتابة موضوع تعبير",
    description: "موضوع عن أهمية القراءة في حياتنا",
    teacher: "أ. محمد الأحمد",
    dueDate: "2024/03/16",
    status: "pending",
    priority: "medium",
  },
  {
    id: 3,
    subject: "العلوم",
    title: "تقرير عن النباتات",
    description: "إعداد تقرير مصور عن أنواع النباتات",
    teacher: "أ. فهد الشمري",
    dueDate: "2024/03/18",
    status: "pending",
    priority: "low",
  },
  {
    id: 4,
    subject: "اللغة الإنجليزية",
    title: "Reading Comprehension",
    description: "قراءة النص وحل الأسئلة صفحة 30",
    teacher: "أ. سارة الحربي",
    dueDate: "2024/03/14",
    status: "submitted",
    priority: "medium",
  },
  {
    id: 5,
    subject: "الدراسات الإسلامية",
    title: "حفظ سورة الملك",
    description: "حفظ الآيات من 1 إلى 15",
    teacher: "أ. عبدالرحمن السعيد",
    dueDate: "2024/03/12",
    status: "graded",
    grade: "95%",
    priority: "high",
  },
];

const subjectColors: Record<string, string> = {
  "الرياضيات": "bg-purple-500",
  "اللغة العربية": "bg-blue-500",
  "العلوم": "bg-green-500",
  "اللغة الإنجليزية": "bg-red-500",
  "الدراسات الإسلامية": "bg-teal-500",
};

const statusConfig = {
  pending: { label: "معلق", color: "bg-yellow-500", icon: AlertCircle },
  submitted: { label: "تم التسليم", color: "bg-blue-500", icon: Upload },
  graded: { label: "تم التقييم", color: "bg-green-500", icon: CheckCircle2 },
};

const priorityConfig = {
  high: { label: "عاجل", color: "text-destructive bg-destructive/10" },
  medium: { label: "متوسط", color: "text-yellow-600 bg-yellow-500/10" },
  low: { label: "عادي", color: "text-green-600 bg-green-500/10" },
};

const Homework = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");

  const filteredHomework = homeworkData.filter((item) => {
    if (filter === "all") return true;
    return item.status === filter;
  });

  const pendingCount = homeworkData.filter((h) => h.status === "pending").length;
  const submittedCount = homeworkData.filter((h) => h.status === "submitted").length;
  const gradedCount = homeworkData.filter((h) => h.status === "graded").length;

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
          <h1 className="text-2xl font-bold text-foreground">الواجبات والمهام</h1>
          <p className="text-muted-foreground">متابعة الواجبات المدرسية</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card variant="elevated" className="text-center p-4">
            <div className="text-2xl font-bold text-yellow-500">{pendingCount}</div>
            <div className="text-xs text-muted-foreground">معلقة</div>
          </Card>
          <Card variant="elevated" className="text-center p-4">
            <div className="text-2xl font-bold text-blue-500">{submittedCount}</div>
            <div className="text-xs text-muted-foreground">تم تسليمها</div>
          </Card>
          <Card variant="elevated" className="text-center p-4">
            <div className="text-2xl font-bold text-green-500">{gradedCount}</div>
            <div className="text-xs text-muted-foreground">تم تقييمها</div>
          </Card>
        </div>

        {/* Tabs Filter */}
        <Tabs defaultValue="all" onValueChange={setFilter}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">الكل</TabsTrigger>
            <TabsTrigger value="pending">معلقة</TabsTrigger>
            <TabsTrigger value="submitted">مسلمة</TabsTrigger>
            <TabsTrigger value="graded">مقيمة</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Homework List */}
        <div className="space-y-3">
          {filteredHomework.map((item, index) => {
            const status = statusConfig[item.status as keyof typeof statusConfig];
            const priority = priorityConfig[item.priority as keyof typeof priorityConfig];
            const StatusIcon = status.icon;

            return (
              <Card
                key={item.id}
                variant="elevated"
                className="animate-slide-up overflow-hidden"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CardContent className="p-0">
                  <div className="flex">
                    <div className={cn("w-2", subjectColors[item.subject] || "bg-primary")} />
                    <div className="flex-1 p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className={cn("text-xs", priority.color)}>
                            {priority.label}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {item.subject}
                          </Badge>
                        </div>
                        <div className={cn("flex items-center gap-1 text-xs px-2 py-1 rounded-full text-white", status.color)}>
                          <StatusIcon className="w-3 h-3" />
                          {status.label}
                        </div>
                      </div>
                      
                      <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{item.teacher}</span>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>التسليم: {item.dueDate}</span>
                        </div>
                      </div>

                      {item.status === "graded" && item.grade && (
                        <div className="mt-3 p-2 bg-green-500/10 rounded-lg text-center">
                          <span className="text-green-600 font-bold">الدرجة: {item.grade}</span>
                        </div>
                      )}

                      {item.status === "pending" && (
                        <Button className="w-full mt-3" size="sm">
                          <Upload className="w-4 h-4 ml-2" />
                          تسليم الواجب
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default Homework;
