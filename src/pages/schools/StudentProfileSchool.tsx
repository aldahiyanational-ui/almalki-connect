import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, User, GraduationCap, Calendar, MapPin, Phone, Mail } from "lucide-react";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useSchool, schools } from "@/contexts/SchoolContext";

const StudentProfileSchool = () => {
  const { schoolId } = useParams();
  const navigate = useNavigate();
  const school = schools[schoolId || ""];

  const studentData = {
    name: "أحمد محمد العمري",
    studentId: "2024001",
    grade: "الصف الخامس الابتدائي",
    section: "أ",
    birthDate: "2014/05/15",
    nationality: "سعودي",
    bloodType: "O+",
    address: "الرياض - حي النرجس",
    enrollmentDate: "2020/09/01",
    parentName: "محمد سعد العمري",
    parentPhone: "0501234567",
    parentEmail: "mohamed@example.com",
    emergencyContact: "0509876543",
  };

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
          <h1 className="text-2xl font-bold text-foreground">بيانات الطالب</h1>
          <p className="text-muted-foreground">المعلومات الأكاديمية والشخصية</p>
        </div>

        <Card variant="gradient" className="animate-slide-up">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center mb-6">
              <Avatar className="w-24 h-24 mb-4 border-4 border-primary-foreground/20">
                <AvatarFallback className="text-2xl bg-primary-foreground/10 text-primary-foreground">
                  {studentData.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-bold text-primary-foreground mb-1">
                {studentData.name}
              </h2>
              <p className="text-primary-foreground/80">رقم الطالب: {studentData.studentId}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="text-center p-3 bg-primary-foreground/10 rounded-lg backdrop-blur-sm">
                <p className="text-primary-foreground/70 text-sm">الصف الدراسي</p>
                <p className="text-primary-foreground font-bold">{studentData.grade}</p>
              </div>
              <div className="text-center p-3 bg-primary-foreground/10 rounded-lg backdrop-blur-sm">
                <p className="text-primary-foreground/70 text-sm">الشعبة</p>
                <p className="text-primary-foreground font-bold text-xl">{studentData.section}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              المعلومات الشخصية
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <InfoRow icon={Calendar} label="تاريخ الميلاد" value={studentData.birthDate} />
            <InfoRow icon={GraduationCap} label="الجنسية" value={studentData.nationality} />
            <InfoRow icon={User} label="فصيلة الدم" value={studentData.bloodType} />
            <InfoRow icon={MapPin} label="العنوان" value={studentData.address} />
            <InfoRow icon={Calendar} label="تاريخ الالتحاق" value={studentData.enrollmentDate} />
          </CardContent>
        </Card>

        <Card variant="elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-primary" />
              بيانات ولي الأمر
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <InfoRow icon={User} label="اسم ولي الأمر" value={studentData.parentName} />
            <InfoRow icon={Phone} label="رقم الجوال" value={studentData.parentPhone} />
            <InfoRow icon={Mail} label="البريد الإلكتروني" value={studentData.parentEmail} />
            <InfoRow icon={Phone} label="رقم الطوارئ" value={studentData.emergencyContact} />
          </CardContent>
        </Card>
      </main>

      <BottomNavigation schoolId={schoolId} />
    </div>
  );
};

const InfoRow = ({ icon: Icon, label, value }: { icon: any; label: string; value: string }) => (
  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
    <div className="flex items-center gap-2 text-muted-foreground">
      <Icon className="w-4 h-4" />
      <span className="text-sm">{label}</span>
    </div>
    <span className="font-medium text-foreground">{value}</span>
  </div>
);

export default StudentProfileSchool;
