import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Calendar,
  FileText,
  Download,
  Clock,
  Award,
  TrendingUp,
  BookOpen,
} from "lucide-react";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const upcomingExams = [
  {
    id: 1,
    subject: "الرياضيات",
    type: "اختبار نهائي",
    date: "2024/03/20",
    time: "08:00 صباحاً",
    duration: "ساعتان",
    room: "قاعة 1",
    chapters: "الوحدات 1-5",
  },
  {
    id: 2,
    subject: "اللغة العربية",
    type: "اختبار نهائي",
    date: "2024/03/22",
    time: "08:00 صباحاً",
    duration: "ساعتان",
    room: "قاعة 1",
    chapters: "جميع الوحدات",
  },
  {
    id: 3,
    subject: "العلوم",
    type: "اختبار نهائي",
    date: "2024/03/24",
    time: "08:00 صباحاً",
    duration: "ساعة ونصف",
    room: "قاعة 2",
    chapters: "الوحدات 1-4",
  },
];

const examResults = [
  {
    id: 1,
    subject: "الرياضيات",
    type: "اختبار شهري",
    date: "2024/02/15",
    score: 92,
    total: 100,
    grade: "A",
    rank: 3,
  },
  {
    id: 2,
    subject: "اللغة العربية",
    type: "اختبار شهري",
    date: "2024/02/17",
    score: 88,
    total: 100,
    grade: "B+",
    rank: 5,
  },
  {
    id: 3,
    subject: "العلوم",
    type: "اختبار شهري",
    date: "2024/02/19",
    score: 95,
    total: 100,
    grade: "A+",
    rank: 1,
  },
  {
    id: 4,
    subject: "اللغة الإنجليزية",
    type: "اختبار شهري",
    date: "2024/02/21",
    score: 85,
    total: 100,
    grade: "B+",
    rank: 7,
  },
  {
    id: 5,
    subject: "الدراسات الإسلامية",
    type: "اختبار شهري",
    date: "2024/02/23",
    score: 98,
    total: 100,
    grade: "A+",
    rank: 1,
  },
];

const subjectColors: Record<string, string> = {
  "الرياضيات": "bg-purple-500",
  "اللغة العربية": "bg-blue-500",
  "العلوم": "bg-green-500",
  "اللغة الإنجليزية": "bg-red-500",
  "الدراسات الإسلامية": "bg-teal-500",
};

const getGradeColor = (grade: string) => {
  if (grade.startsWith("A")) return "text-green-500";
  if (grade.startsWith("B")) return "text-blue-500";
  if (grade.startsWith("C")) return "text-yellow-500";
  return "text-red-500";
};

const Exams = () => {
  const navigate = useNavigate();

  const averageScore = Math.round(
    examResults.reduce((acc, e) => acc + e.score, 0) / examResults.length
  );

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
          <h1 className="text-2xl font-bold text-foreground">الاختبارات والنتائج</h1>
          <p className="text-muted-foreground">متابعة الاختبارات والدرجات</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3">
          <Card variant="elevated" className="text-center p-4">
            <Award className="w-6 h-6 mx-auto mb-1 text-primary" />
            <div className="text-2xl font-bold text-primary">{averageScore}%</div>
            <div className="text-xs text-muted-foreground">المعدل العام</div>
          </Card>
          <Card variant="elevated" className="text-center p-4">
            <TrendingUp className="w-6 h-6 mx-auto mb-1 text-green-500" />
            <div className="text-2xl font-bold text-green-500">3</div>
            <div className="text-xs text-muted-foreground">الترتيب</div>
          </Card>
          <Card variant="elevated" className="text-center p-4">
            <Calendar className="w-6 h-6 mx-auto mb-1 text-secondary" />
            <div className="text-2xl font-bold text-secondary">{upcomingExams.length}</div>
            <div className="text-xs text-muted-foreground">اختبارات قادمة</div>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upcoming">الاختبارات القادمة</TabsTrigger>
            <TabsTrigger value="results">النتائج</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-3 mt-4">
            {upcomingExams.map((exam, index) => (
              <Card
                key={exam.id}
                variant="elevated"
                className="animate-slide-up overflow-hidden"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CardContent className="p-0">
                  <div className="flex">
                    <div className={cn("w-2", subjectColors[exam.subject] || "bg-primary")} />
                    <div className="flex-1 p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-bold text-foreground">{exam.subject}</h3>
                          <Badge variant="outline" className="mt-1">{exam.type}</Badge>
                        </div>
                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                          {exam.date}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground mt-3">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{exam.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{exam.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen className="w-4 h-4" />
                          <span>القاعة: {exam.room}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FileText className="w-4 h-4" />
                          <span>{exam.chapters}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="results" className="space-y-3 mt-4">
            {examResults.map((result, index) => (
              <Card
                key={result.id}
                variant="elevated"
                className="animate-slide-up overflow-hidden"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CardContent className="p-0">
                  <div className="flex">
                    <div className={cn("w-2", subjectColors[result.subject] || "bg-primary")} />
                    <div className="flex-1 p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-bold text-foreground">{result.subject}</h3>
                          <p className="text-sm text-muted-foreground">{result.type}</p>
                        </div>
                        <div className="text-left">
                          <span className={cn("text-2xl font-bold", getGradeColor(result.grade))}>
                            {result.grade}
                          </span>
                          <p className="text-xs text-muted-foreground">الترتيب: {result.rank}</p>
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted-foreground">الدرجة</span>
                          <span className="font-bold">{result.score}/{result.total}</span>
                        </div>
                        <Progress value={(result.score / result.total) * 100} className="h-2" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Button variant="outline" className="w-full">
              <Download className="w-4 h-4 ml-2" />
              تحميل الشهادة (PDF)
            </Button>
          </TabsContent>
        </Tabs>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default Exams;
