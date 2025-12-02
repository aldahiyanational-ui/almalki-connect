import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, Clock } from "lucide-react";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { schools } from "@/contexts/SchoolContext";
import { cn } from "@/lib/utils";

const weekDays = [
  { id: "sunday", label: "الأحد" },
  { id: "monday", label: "الاثنين" },
  { id: "tuesday", label: "الثلاثاء" },
  { id: "wednesday", label: "الأربعاء" },
  { id: "thursday", label: "الخميس" },
];

const schedule = [
  { period: 1, time: "07:30 - 08:15", subject: "الرياضيات", teacher: "أ. خالد العمري", room: "101" },
  { period: 2, time: "08:15 - 09:00", subject: "اللغة العربية", teacher: "أ. محمد الأحمد", room: "102" },
  { period: 3, time: "09:00 - 09:45", subject: "العلوم", teacher: "أ. فهد الشمري", room: "201" },
  { period: 4, time: "09:45 - 10:15", subject: "استراحة", teacher: "-", room: "-" },
  { period: 5, time: "10:15 - 11:00", subject: "اللغة الإنجليزية", teacher: "أ. سارة الحربي", room: "103" },
  { period: 6, time: "11:00 - 11:45", subject: "الدراسات الإسلامية", teacher: "أ. عبدالرحمن السعيد", room: "104" },
  { period: 7, time: "11:45 - 12:30", subject: "التربية البدنية", teacher: "أ. أحمد الزهراني", room: "الملعب" },
];

const subjectColors: Record<string, string> = {
  "الرياضيات": "bg-purple-500",
  "اللغة العربية": "bg-blue-500",
  "العلوم": "bg-green-500",
  "اللغة الإنجليزية": "bg-red-500",
  "الدراسات الإسلامية": "bg-teal-500",
  "التربية البدنية": "bg-orange-500",
  "استراحة": "bg-yellow-500",
};

const ScheduleSchool = () => {
  const { schoolId } = useParams();
  const navigate = useNavigate();
  const school = schools[schoolId || ""];
  const [selectedDay, setSelectedDay] = useState("sunday");

  if (!school) {
    return <div>المدرسة غير موجودة</div>;
  }

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />

      <main className="container mx-auto px-4 py-6 space-y-6">
        <Button
          variant="ghost"
          className="mb-4"
          onClick={() => navigate(`/${schoolId}/dashboard`)}
        >
          <ChevronLeft className="w-5 h-5 ml-2" />
          العودة للوحة التحكم
        </Button>

        <div className="text-center mb-6">
          <Badge variant="secondary" className="mb-2">
            {school.name}
          </Badge>
          <h1 className="text-2xl font-bold text-foreground">الجدول الدراسي</h1>
          <p className="text-muted-foreground">الحصص الأسبوعية</p>
        </div>

        <Tabs value={selectedDay} onValueChange={setSelectedDay}>
          <TabsList className="grid w-full grid-cols-5">
            {weekDays.map((day) => (
              <TabsTrigger key={day.id} value={day.id} className="text-xs">
                {day.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="space-y-3">
          {schedule.map((item, index) => (
            <Card
              key={item.period}
              variant="elevated"
              className="animate-slide-up overflow-hidden"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CardContent className="p-0">
                <div className="flex">
                  <div className={cn("w-2", subjectColors[item.subject] || "bg-primary")} />
                  <div className="flex-1 p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <Badge variant="secondary" className="mb-2">الحصة {item.period}</Badge>
                        <h3 className="font-bold text-foreground">{item.subject}</h3>
                        <p className="text-sm text-muted-foreground">{item.teacher}</p>
                      </div>
                      <Badge variant="outline">{item.room}</Badge>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{item.time}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <BottomNavigation schoolId={schoolId} />
    </div>
  );
};

export default ScheduleSchool;
