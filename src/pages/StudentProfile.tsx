import { useNavigate } from "react-router-dom";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  GraduationCap,
  ChevronLeft,
  Edit,
  FileText,
  Heart,
} from "lucide-react";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const studentData = {
  name: "أحمد محمد المالكي",
  nameEn: "Ahmed Mohammed Almalki",
  id: "STU-2024-1234",
  nationalId: "1234567890",
  grade: "الصف السادس الابتدائي",
  section: "الشعبة (أ)",
  school: "مدرسة أجيال المعالي",
  birthDate: "2012/05/15",
  age: "12 سنة",
  gender: "ذكر",
  nationality: "سعودي",
  bloodType: "A+",
  enrollmentDate: "2020/09/01",
  academicYear: "1446 هـ",
};

const parentData = {
  fatherName: "محمد علي المالكي",
  fatherPhone: "0501234567",
  fatherEmail: "mohammed@email.com",
  motherName: "سارة أحمد",
  motherPhone: "0509876543",
  emergencyContact: "0501112233",
  address: "الرياض، حي النرجس، شارع الأمير سلطان",
};

const InfoRow = ({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) => (
  <div className="flex items-center gap-3 py-3 border-b border-border/50 last:border-0">
    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
      <Icon className="w-5 h-5 text-primary" />
    </div>
    <div className="flex-1">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="font-medium text-foreground">{value}</p>
    </div>
  </div>
);

const StudentProfile = () => {
  const navigate = useNavigate();

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

        {/* Student Card */}
        <Card variant="gradient" className="animate-slide-up">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Avatar className="w-24 h-24 border-4 border-primary-foreground/20">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="text-2xl bg-primary-foreground/20 text-primary-foreground">
                  أم
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-primary-foreground">{studentData.name}</h1>
                <p className="text-primary-foreground/80">{studentData.nameEn}</p>
                <p className="text-sm text-primary-foreground/60 mt-2">رقم الطالب: {studentData.id}</p>
                <p className="text-sm text-primary-foreground/60">{studentData.school}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Academic Info */}
        <Card variant="elevated" className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-primary" />
              المعلومات الأكاديمية
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-0">
            <InfoRow icon={GraduationCap} label="المرحلة الدراسية" value={studentData.grade} />
            <InfoRow icon={FileText} label="الشعبة" value={studentData.section} />
            <InfoRow icon={Calendar} label="تاريخ التسجيل" value={studentData.enrollmentDate} />
            <InfoRow icon={Calendar} label="العام الدراسي" value={studentData.academicYear} />
          </CardContent>
        </Card>

        {/* Personal Info */}
        <Card variant="elevated" className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              المعلومات الشخصية
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-0">
            <InfoRow icon={FileText} label="رقم الهوية" value={studentData.nationalId} />
            <InfoRow icon={Calendar} label="تاريخ الميلاد" value={studentData.birthDate} />
            <InfoRow icon={User} label="العمر" value={studentData.age} />
            <InfoRow icon={User} label="الجنس" value={studentData.gender} />
            <InfoRow icon={MapPin} label="الجنسية" value={studentData.nationality} />
            <InfoRow icon={Heart} label="فصيلة الدم" value={studentData.bloodType} />
          </CardContent>
        </Card>

        {/* Parent Info */}
        <Card variant="elevated" className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              معلومات ولي الأمر
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-0">
            <InfoRow icon={User} label="اسم الأب" value={parentData.fatherName} />
            <InfoRow icon={Phone} label="جوال الأب" value={parentData.fatherPhone} />
            <InfoRow icon={Mail} label="بريد الأب" value={parentData.fatherEmail} />
            <InfoRow icon={User} label="اسم الأم" value={parentData.motherName} />
            <InfoRow icon={Phone} label="جوال الأم" value={parentData.motherPhone} />
            <InfoRow icon={Phone} label="رقم الطوارئ" value={parentData.emergencyContact} />
            <InfoRow icon={MapPin} label="العنوان" value={parentData.address} />
          </CardContent>
        </Card>

        {/* Edit Button */}
        <Button className="w-full" onClick={() => navigate("/settings")}>
          <Edit className="w-5 h-5 ml-2" />
          تعديل البيانات
        </Button>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default StudentProfile;
