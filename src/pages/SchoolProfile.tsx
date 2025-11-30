import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  MapPin,
  Clock,
  Phone,
  Mail,
  MessageCircle,
  Users,
  BookOpen,
  Target,
  Eye,
} from "lucide-react";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const schoolsData: Record<string, {
  name: string;
  description: string;
  color: string;
  vision: string;
  mission: string;
  stages: string[];
  hours: string;
  location: string;
  phone: string;
  email: string;
  students: string;
  teachers: string;
}> = {
  ajyal: {
    name: "مدرسة أجيال المعالي الأهلية",
    description: "تعليم متميز لأجيال المستقبل مع رؤية تربوية شاملة تهدف لبناء جيل واعد ومتميز",
    color: "bg-primary",
    vision: "أن نكون رواداً في تقديم تعليم نوعي يبني شخصيات متكاملة ومبدعة",
    mission: "تقديم بيئة تعليمية محفزة تجمع بين التميز الأكاديمي والقيم الإسلامية الأصيلة",
    stages: ["الروضة", "الابتدائية", "المتوسطة", "الثانوية"],
    hours: "7:00 ص - 2:00 م",
    location: "الرياض، حي النزهة",
    phone: "+966 11 123 4567",
    email: "ajyal@almalki.edu.sa",
    students: "1,200+",
    teachers: "85+",
  },
  qanadil: {
    name: "مدرسة قناديل الشرق الأهلية",
    description: "إضاءة طريق العلم والمعرفة لبناء جيل واعد ومتميز يحمل قيم الأصالة والمعاصرة",
    color: "bg-secondary",
    vision: "إنارة مستقبل أبنائنا بنور العلم والمعرفة",
    mission: "بناء قادة المستقبل من خلال منهج تعليمي متطور ومتكامل",
    stages: ["الروضة", "الابتدائية", "المتوسطة"],
    hours: "7:00 ص - 2:00 م",
    location: "الرياض، حي الملقا",
    phone: "+966 11 234 5678",
    email: "qanadil@almalki.edu.sa",
    students: "800+",
    teachers: "60+",
  },
  "dahiya-girls": {
    name: "مدرسة الضاحية الأهلية للبنات",
    description: "بيئة تعليمية آمنة ومحفزة للطالبات مع الاهتمام بالجوانب الأكاديمية والتربوية",
    color: "gradient-primary",
    vision: "تمكين الطالبات ليكنّ قائدات في مجتمعاتهن",
    mission: "توفير بيئة تعليمية متميزة تراعي خصوصية الطالبات وتنمي قدراتهن",
    stages: ["الروضة", "الابتدائية", "المتوسطة", "الثانوية"],
    hours: "7:00 ص - 2:00 م",
    location: "الرياض، حي الضاحية",
    phone: "+966 11 345 6789",
    email: "dahiya-girls@almalki.edu.sa",
    students: "950+",
    teachers: "70+",
  },
  "dahiya-boys": {
    name: "مدرسة الضاحية الأهلية للبنين",
    description: "تنمية شاملة للطلاب في بيئة تربوية متكاملة تجمع بين العلم والأخلاق",
    color: "bg-school-navy",
    vision: "إعداد جيل من الشباب المتميز علمياً وخلقياً",
    mission: "تقديم تعليم متكامل يعزز الثقة بالنفس ويبني القيادة",
    stages: ["الابتدائية", "المتوسطة", "الثانوية"],
    hours: "7:00 ص - 2:00 م",
    location: "الرياض، حي الضاحية",
    phone: "+966 11 456 7890",
    email: "dahiya-boys@almalki.edu.sa",
    students: "1,100+",
    teachers: "75+",
  },
};

const SchoolProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const school = id ? schoolsData[id] : null;

  if (!school) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">المدرسة غير موجودة</h1>
          <Button onClick={() => navigate("/")}>العودة للرئيسية</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />

      <main>
        {/* Hero Banner */}
        <section className={`relative ${school.color} py-16 px-4`}>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/20" />
          <div className="container mx-auto relative z-10">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-6 transition-colors"
            >
              <ArrowRight className="w-5 h-5" />
              <span>العودة</span>
            </button>

            <div className="flex items-start gap-6">
              <div className="w-20 h-20 bg-primary-foreground/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <span className="text-4xl font-bold text-primary-foreground">
                  {school.name.charAt(6)}
                </span>
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-2">
                  {school.name}
                </h1>
                <p className="text-primary-foreground/80 max-w-2xl">
                  {school.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-6 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 -mt-8 relative z-20">
            <Card variant="elevated" className="text-center p-4">
              <Users className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{school.students}</div>
              <div className="text-sm text-muted-foreground">طالب وطالبة</div>
            </Card>
            <Card variant="elevated" className="text-center p-4">
              <BookOpen className="w-6 h-6 text-secondary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{school.teachers}</div>
              <div className="text-sm text-muted-foreground">معلم ومعلمة</div>
            </Card>
            <Card variant="elevated" className="text-center p-4">
              <Clock className="w-6 h-6 text-success mx-auto mb-2" />
              <div className="text-lg font-bold text-foreground">{school.hours}</div>
              <div className="text-sm text-muted-foreground">ساعات الدوام</div>
            </Card>
            <Card variant="elevated" className="text-center p-4">
              <MapPin className="w-6 h-6 text-destructive mx-auto mb-2" />
              <div className="text-lg font-bold text-foreground truncate">{school.location}</div>
              <div className="text-sm text-muted-foreground">الموقع</div>
            </Card>
          </div>

          {/* Vision & Mission */}
          <div className="grid md:grid-cols-2 gap-4">
            <Card variant="feature">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
                    <Eye className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">رؤيتنا</h3>
                </div>
                <p className="text-muted-foreground">{school.vision}</p>
              </CardContent>
            </Card>

            <Card variant="feature">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 gradient-gold rounded-xl flex items-center justify-center">
                    <Target className="w-5 h-5 text-secondary-foreground" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">رسالتنا</h3>
                </div>
                <p className="text-muted-foreground">{school.mission}</p>
              </CardContent>
            </Card>
          </div>

          {/* Stages */}
          <Card variant="feature">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-foreground mb-4">المراحل الدراسية</h3>
              <div className="flex flex-wrap gap-2">
                {school.stages.map((stage) => (
                  <span
                    key={stage}
                    className="px-4 py-2 bg-accent text-accent-foreground rounded-full text-sm font-medium"
                  >
                    {stage}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card variant="feature">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-foreground mb-4">تواصل معنا</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                <Button variant="outline" className="justify-start h-auto py-3">
                  <Phone className="w-5 h-5 ml-3 text-primary" />
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">اتصل بنا</div>
                    <div className="text-sm font-medium" dir="ltr">{school.phone}</div>
                  </div>
                </Button>
                <Button variant="outline" className="justify-start h-auto py-3">
                  <MessageCircle className="w-5 h-5 ml-3 text-success" />
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">واتساب</div>
                    <div className="text-sm font-medium">تواصل مباشر</div>
                  </div>
                </Button>
                <Button variant="outline" className="justify-start h-auto py-3">
                  <Mail className="w-5 h-5 ml-3 text-secondary" />
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">البريد</div>
                    <div className="text-sm font-medium truncate">{school.email}</div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Map Placeholder */}
          <Card variant="feature" className="overflow-hidden">
            <div className="h-48 bg-muted flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">خريطة الموقع</p>
              </div>
            </div>
          </Card>

          {/* CTA */}
          <div className="flex gap-3">
            <Button variant="hero" size="lg" className="flex-1" onClick={() => navigate("/login")}>
              تسجيل الدخول
            </Button>
            <Button variant="gold" size="lg" className="flex-1" onClick={() => navigate("/contact")}>
              تواصل معنا
            </Button>
          </div>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default SchoolProfile;
