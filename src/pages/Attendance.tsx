import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  CheckCircle2,
  XCircle,
  Clock,
  Download,
  TrendingUp,
} from "lucide-react";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const months = [
  "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
  "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
];

const weekDays = ["أحد", "اثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة", "سبت"];

// Sample attendance data for the month
const attendanceData: Record<string, "present" | "absent" | "late" | "holiday"> = {
  "2024-03-01": "present",
  "2024-03-02": "holiday",
  "2024-03-03": "present",
  "2024-03-04": "present",
  "2024-03-05": "late",
  "2024-03-06": "present",
  "2024-03-07": "present",
  "2024-03-08": "holiday",
  "2024-03-09": "holiday",
  "2024-03-10": "present",
  "2024-03-11": "absent",
  "2024-03-12": "present",
  "2024-03-13": "present",
  "2024-03-14": "present",
  "2024-03-15": "holiday",
  "2024-03-16": "holiday",
};

const recentRecords = [
  { date: "2024/03/14", day: "الخميس", checkIn: "06:45", checkOut: "12:30", status: "present" },
  { date: "2024/03/13", day: "الأربعاء", checkIn: "06:50", checkOut: "12:30", status: "present" },
  { date: "2024/03/12", day: "الثلاثاء", checkIn: "06:48", checkOut: "12:30", status: "present" },
  { date: "2024/03/11", day: "الاثنين", checkIn: "-", checkOut: "-", status: "absent" },
  { date: "2024/03/10", day: "الأحد", checkIn: "06:45", checkOut: "12:30", status: "present" },
  { date: "2024/03/07", day: "الخميس", checkIn: "06:45", checkOut: "12:30", status: "present" },
  { date: "2024/03/06", day: "الأربعاء", checkIn: "06:50", checkOut: "12:30", status: "present" },
  { date: "2024/03/05", day: "الثلاثاء", checkIn: "07:15", checkOut: "12:30", status: "late" },
];

const statusConfig = {
  present: { label: "حاضر", color: "bg-green-500", textColor: "text-green-500", icon: CheckCircle2 },
  absent: { label: "غائب", color: "bg-red-500", textColor: "text-red-500", icon: XCircle },
  late: { label: "متأخر", color: "bg-yellow-500", textColor: "text-yellow-500", icon: Clock },
  holiday: { label: "إجازة", color: "bg-gray-300", textColor: "text-gray-500", icon: CalendarIcon },
};

const Attendance = () => {
  const navigate = useNavigate();
  const [currentMonth, setCurrentMonth] = useState(2); // March (0-indexed)
  const [currentYear, setCurrentYear] = useState(2024);

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);

  const presentDays = Object.values(attendanceData).filter(s => s === "present").length;
  const absentDays = Object.values(attendanceData).filter(s => s === "absent").length;
  const lateDays = Object.values(attendanceData).filter(s => s === "late").length;
  const attendanceRate = Math.round((presentDays / (presentDays + absentDays + lateDays)) * 100);

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

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
          <h1 className="text-2xl font-bold text-foreground">الحضور والانصراف</h1>
          <p className="text-muted-foreground">سجل الحضور اليومي</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-2">
          <Card variant="elevated" className="text-center p-3">
            <TrendingUp className="w-5 h-5 mx-auto mb-1 text-primary" />
            <div className="text-xl font-bold text-primary">{attendanceRate}%</div>
            <div className="text-xs text-muted-foreground">النسبة</div>
          </Card>
          <Card variant="elevated" className="text-center p-3">
            <CheckCircle2 className="w-5 h-5 mx-auto mb-1 text-green-500" />
            <div className="text-xl font-bold text-green-500">{presentDays}</div>
            <div className="text-xs text-muted-foreground">حضور</div>
          </Card>
          <Card variant="elevated" className="text-center p-3">
            <XCircle className="w-5 h-5 mx-auto mb-1 text-red-500" />
            <div className="text-xl font-bold text-red-500">{absentDays}</div>
            <div className="text-xs text-muted-foreground">غياب</div>
          </Card>
          <Card variant="elevated" className="text-center p-3">
            <Clock className="w-5 h-5 mx-auto mb-1 text-yellow-500" />
            <div className="text-xl font-bold text-yellow-500">{lateDays}</div>
            <div className="text-xs text-muted-foreground">تأخير</div>
          </Card>
        </div>

        {/* Calendar */}
        <Card variant="elevated">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="icon" onClick={nextMonth}>
                <ChevronRight className="w-5 h-5" />
              </Button>
              <CardTitle className="text-lg">
                {months[currentMonth]} {currentYear}
              </CardTitle>
              <Button variant="ghost" size="icon" onClick={prevMonth}>
                <ChevronLeft className="w-5 h-5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Week days header */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {weekDays.map((day) => (
                <div key={day} className="text-center text-xs text-muted-foreground font-medium py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar days */}
            <div className="grid grid-cols-7 gap-1">
              {/* Empty cells for days before the first day */}
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square" />
              ))}

              {/* Days of the month */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                const status = attendanceData[dateStr];
                const config = status ? statusConfig[status] : null;

                return (
                  <div
                    key={day}
                    className={cn(
                      "aspect-square rounded-lg flex items-center justify-center text-sm font-medium",
                      config ? config.color : "bg-muted/50",
                      config ? "text-white" : "text-muted-foreground"
                    )}
                  >
                    {day}
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-4 mt-4 pt-4 border-t border-border">
              {Object.entries(statusConfig).map(([key, config]) => (
                <div key={key} className="flex items-center gap-1">
                  <div className={cn("w-3 h-3 rounded", config.color)} />
                  <span className="text-xs text-muted-foreground">{config.label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Records */}
        <Card variant="elevated">
          <CardHeader>
            <CardTitle className="text-lg">السجل التفصيلي</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {recentRecords.map((record, index) => {
              const config = statusConfig[record.status as keyof typeof statusConfig];
              const Icon = config.icon;

              return (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", config.color)}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{record.day}</p>
                      <p className="text-sm text-muted-foreground">{record.date}</p>
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="text-sm">
                      <span className="text-muted-foreground">الدخول:</span> {record.checkIn}
                    </p>
                    <p className="text-sm">
                      <span className="text-muted-foreground">الخروج:</span> {record.checkOut}
                    </p>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Download Button */}
        <Button variant="outline" className="w-full">
          <Download className="w-4 h-4 ml-2" />
          تحميل تقرير الحضور (PDF)
        </Button>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default Attendance;
