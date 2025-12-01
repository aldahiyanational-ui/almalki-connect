import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Clock,
  BookOpen,
  User,
  ChevronRight,
} from "lucide-react";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const days = [
  { id: "sunday", name: "الأحد", short: "أحد" },
  { id: "monday", name: "الاثنين", short: "اثنين" },
  { id: "tuesday", name: "الثلاثاء", short: "ثلاثاء" },
  { id: "wednesday", name: "الأربعاء", short: "أربعاء" },
  { id: "thursday", name: "الخميس", short: "خميس" },
];

const scheduleData: Record<string, Array<{ period: number; subject: string; teacher: string; time: string; room: string }>> = {
  sunday: [
    { period: 1, subject: "القرآن الكريم", teacher: "أ. عبدالله السالم", time: "07:00 - 07:45", room: "101" },
    { period: 2, subject: "اللغة العربية", teacher: "أ. محمد الأحمد", time: "07:50 - 08:35", room: "101" },
    { period: 3, subject: "الرياضيات", teacher: "أ. خالد العمري", time: "08:40 - 09:25", room: "102" },
    { period: 4, subject: "العلوم", teacher: "أ. فهد الشمري", time: "09:45 - 10:30", room: "مختبر 1" },
    { period: 5, subject: "اللغة الإنجليزية", teacher: "أ. سارة الحربي", time: "10:35 - 11:20", room: "101" },
    { period: 6, subject: "التربية البدنية", teacher: "أ. ناصر القحطاني", time: "11:25 - 12:10", room: "الملعب" },
  ],
  monday: [
    { period: 1, subject: "الرياضيات", teacher: "أ. خالد العمري", time: "07:00 - 07:45", room: "102" },
    { period: 2, subject: "اللغة العربية", teacher: "أ. محمد الأحمد", time: "07:50 - 08:35", room: "101" },
    { period: 3, subject: "الدراسات الإسلامية", teacher: "أ. عبدالرحمن السعيد", time: "08:40 - 09:25", room: "101" },
    { period: 4, subject: "اللغة الإنجليزية", teacher: "أ. سارة الحربي", time: "09:45 - 10:30", room: "101" },
    { period: 5, subject: "الحاسب الآلي", teacher: "أ. أحمد الدوسري", time: "10:35 - 11:20", room: "معمل الحاسب" },
    { period: 6, subject: "التربية الفنية", teacher: "أ. سلمان العتيبي", time: "11:25 - 12:10", room: "قاعة الفنون" },
  ],
  tuesday: [
    { period: 1, subject: "القرآن الكريم", teacher: "أ. عبدالله السالم", time: "07:00 - 07:45", room: "101" },
    { period: 2, subject: "العلوم", teacher: "أ. فهد الشمري", time: "07:50 - 08:35", room: "مختبر 1" },
    { period: 3, subject: "الرياضيات", teacher: "أ. خالد العمري", time: "08:40 - 09:25", room: "102" },
    { period: 4, subject: "الدراسات الاجتماعية", teacher: "أ. سعود المطيري", time: "09:45 - 10:30", room: "101" },
    { period: 5, subject: "اللغة العربية", teacher: "أ. محمد الأحمد", time: "10:35 - 11:20", room: "101" },
    { period: 6, subject: "المهارات الحياتية", teacher: "أ. نورة الزهراني", time: "11:25 - 12:10", room: "103" },
  ],
  wednesday: [
    { period: 1, subject: "اللغة الإنجليزية", teacher: "أ. سارة الحربي", time: "07:00 - 07:45", room: "101" },
    { period: 2, subject: "الرياضيات", teacher: "أ. خالد العمري", time: "07:50 - 08:35", room: "102" },
    { period: 3, subject: "اللغة العربية", teacher: "أ. محمد الأحمد", time: "08:40 - 09:25", room: "101" },
    { period: 4, subject: "العلوم", teacher: "أ. فهد الشمري", time: "09:45 - 10:30", room: "مختبر 1" },
    { period: 5, subject: "الدراسات الإسلامية", teacher: "أ. عبدالرحمن السعيد", time: "10:35 - 11:20", room: "101" },
    { period: 6, subject: "التربية البدنية", teacher: "أ. ناصر القحطاني", time: "11:25 - 12:10", room: "الملعب" },
  ],
  thursday: [
    { period: 1, subject: "القرآن الكريم", teacher: "أ. عبدالله السالم", time: "07:00 - 07:45", room: "101" },
    { period: 2, subject: "اللغة العربية", teacher: "أ. محمد الأحمد", time: "07:50 - 08:35", room: "101" },
    { period: 3, subject: "الرياضيات", teacher: "أ. خالد العمري", time: "08:40 - 09:25", room: "102" },
    { period: 4, subject: "اللغة الإنجليزية", teacher: "أ. سارة الحربي", time: "09:45 - 10:30", room: "101" },
    { period: 5, subject: "النشاط", teacher: "أ. المشرف", time: "10:35 - 11:20", room: "متنوع" },
    { period: 6, subject: "النشاط", teacher: "أ. المشرف", time: "11:25 - 12:10", room: "متنوع" },
  ],
};

const subjectColors: Record<string, string> = {
  "القرآن الكريم": "bg-emerald-500",
  "اللغة العربية": "bg-blue-500",
  "الرياضيات": "bg-purple-500",
  "العلوم": "bg-green-500",
  "اللغة الإنجليزية": "bg-red-500",
  "التربية البدنية": "bg-orange-500",
  "الدراسات الإسلامية": "bg-teal-500",
  "الحاسب الآلي": "bg-indigo-500",
  "التربية الفنية": "bg-pink-500",
  "الدراسات الاجتماعية": "bg-amber-500",
  "المهارات الحياتية": "bg-cyan-500",
  "النشاط": "bg-gray-500",
};

const Schedule = () => {
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState("sunday");

  const currentSchedule = scheduleData[selectedDay] || [];

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
          <h1 className="text-2xl font-bold text-foreground">الجدول الدراسي</h1>
          <p className="text-muted-foreground">الفصل الدراسي الأول - 1446 هـ</p>
        </div>

        {/* Day Selector */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {days.map((day) => (
            <Button
              key={day.id}
              variant={selectedDay === day.id ? "default" : "outline"}
              className={cn(
                "flex-1 min-w-[70px]",
                selectedDay === day.id && "bg-primary text-primary-foreground"
              )}
              onClick={() => setSelectedDay(day.id)}
            >
              {day.short}
            </Button>
          ))}
        </div>

        {/* Schedule List */}
        <div className="space-y-3">
          {currentSchedule.map((item, index) => (
            <Card
              key={index}
              variant="elevated"
              className="animate-slide-up overflow-hidden"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CardContent className="p-0">
                <div className="flex">
                  <div className={cn("w-2", subjectColors[item.subject] || "bg-primary")} />
                  <div className="flex-1 p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                            {item.period}
                          </span>
                          <h3 className="font-bold text-foreground">{item.subject}</h3>
                        </div>
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <User className="w-4 h-4" />
                            <span>{item.teacher}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            <span>{item.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <BookOpen className="w-4 h-4" />
                            <span>القاعة: {item.room}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Break Time Note */}
        <Card variant="outline" className="bg-secondary/10">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground">
              <Clock className="w-4 h-4 inline ml-2" />
              فترة الاستراحة: 09:25 - 09:45
            </p>
          </CardContent>
        </Card>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default Schedule;
