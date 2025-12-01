import { useParams, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Play,
  Image,
  MapPin,
  Phone,
  Mail,
  Globe,
  Award,
  Users,
  BookOpen,
  Calendar,
} from "lucide-react";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const schoolsData: Record<string, {
  name: string;
  nameEn: string;
  description: string;
  vision: string;
  mission: string;
  established: string;
  students: number;
  teachers: number;
  stages: string[];
  features: string[];
  phone: string;
  email: string;
  address: string;
  images: { id: number; title: string; category: string }[];
  videos: { id: number; title: string; duration: string; thumbnail: string }[];
}> = {
  "ajiyal": {
    name: "مدارس أجيال المعالي الأهلية",
    nameEn: "Ajiyal Al-Maali Private Schools",
    description: "مدارس أجيال المعالي الأهلية هي منارة تعليمية رائدة تسعى لبناء جيل متميز قادر على مواكبة متطلبات العصر مع الحفاظ على الهوية الإسلامية والعربية الأصيلة.",
    vision: "أن نكون المؤسسة التعليمية الرائدة في تقديم تعليم متميز يجمع بين الأصالة والمعاصرة",
    mission: "إعداد جيل متميز علمياً وأخلاقياً قادر على المنافسة والإبداع",
    established: "2005",
    students: 1200,
    teachers: 85,
    stages: ["رياض الأطفال", "المرحلة الابتدائية", "المرحلة المتوسطة", "المرحلة الثانوية"],
    features: ["مختبرات علمية متطورة", "مكتبة شاملة", "ملاعب رياضية", "قاعات ذكية", "برامج إثرائية"],
    phone: "0112345678",
    email: "info@ajiyal.edu.sa",
    address: "الرياض، حي النرجس",
    images: [
      { id: 1, title: "المبنى الرئيسي", category: "المباني" },
      { id: 2, title: "الفصول الدراسية", category: "الفصول" },
      { id: 3, title: "المختبرات", category: "المرافق" },
      { id: 4, title: "المكتبة", category: "المرافق" },
      { id: 5, title: "الملاعب", category: "الرياضة" },
      { id: 6, title: "قاعة الأنشطة", category: "الأنشطة" },
    ],
    videos: [
      { id: 1, title: "جولة في المدرسة", duration: "5:30", thumbnail: "" },
      { id: 2, title: "حفل التخرج 2024", duration: "15:00", thumbnail: "" },
      { id: 3, title: "الأنشطة اللاصفية", duration: "8:45", thumbnail: "" },
    ],
  },
  "qanadeel": {
    name: "مدارس قناديل الشرق الأهلية",
    nameEn: "Qanadeel Al-Sharq Private Schools",
    description: "مدارس قناديل الشرق الأهلية تضيء درب التعليم بمنهج متكامل يجمع بين التفوق الأكاديمي وبناء الشخصية المتوازنة.",
    vision: "إنارة العقول وبناء المستقبل من خلال تعليم نوعي متميز",
    mission: "تقديم بيئة تعليمية محفزة تنمي قدرات الطلاب وتصقل مواهبهم",
    established: "2010",
    students: 950,
    teachers: 70,
    stages: ["رياض الأطفال", "المرحلة الابتدائية", "المرحلة المتوسطة"],
    features: ["برامج موهوبين", "تقنيات تعليم حديثة", "أنشطة متنوعة", "رعاية صحية"],
    phone: "0112345679",
    email: "info@qanadeel.edu.sa",
    address: "الرياض، حي الملقا",
    images: [
      { id: 1, title: "المبنى الرئيسي", category: "المباني" },
      { id: 2, title: "الفصول الذكية", category: "الفصول" },
      { id: 3, title: "مركز الموهوبين", category: "المرافق" },
      { id: 4, title: "المسرح", category: "الأنشطة" },
    ],
    videos: [
      { id: 1, title: "تعرف على مدرستنا", duration: "4:00", thumbnail: "" },
      { id: 2, title: "برنامج الموهوبين", duration: "10:00", thumbnail: "" },
    ],
  },
  "dahiya-girls": {
    name: "مدارس الضاحية الأهلية للبنات",
    nameEn: "Al-Dahiya Private Schools for Girls",
    description: "مدارس الضاحية للبنات بيئة تعليمية متميزة تهتم بتنشئة الفتاة المسلمة المتعلمة المثقفة.",
    vision: "بناء جيل نسائي متميز قادر على الإسهام في بناء المجتمع",
    mission: "تمكين الفتاة من التعلم والإبداع في بيئة آمنة ومحفزة",
    established: "2008",
    students: 800,
    teachers: 65,
    stages: ["رياض الأطفال", "المرحلة الابتدائية", "المرحلة المتوسطة", "المرحلة الثانوية"],
    features: ["برامج تأهيلية", "أنشطة ثقافية", "مسابقات علمية", "رعاية نفسية"],
    phone: "0112345680",
    email: "info@dahiya-girls.edu.sa",
    address: "الرياض، حي الياسمين",
    images: [
      { id: 1, title: "المبنى", category: "المباني" },
      { id: 2, title: "المختبرات", category: "المرافق" },
      { id: 3, title: "المكتبة", category: "المرافق" },
      { id: 4, title: "قاعة الحاسب", category: "المرافق" },
      { id: 5, title: "الأنشطة", category: "الأنشطة" },
    ],
    videos: [
      { id: 1, title: "مدرستنا في سطور", duration: "6:00", thumbnail: "" },
      { id: 2, title: "يوم المعلمة", duration: "8:00", thumbnail: "" },
    ],
  },
  "dahiya-boys": {
    name: "مدارس الضاحية الأهلية للبنين",
    nameEn: "Al-Dahiya Private Schools for Boys",
    description: "مدارس الضاحية للبنين صرح تعليمي يهدف لإعداد الشاب المسلم المتميز علمياً وأخلاقياً.",
    vision: "تخريج شباب قادرين على قيادة المستقبل",
    mission: "تقديم تعليم شامل يبني الشخصية القيادية المتوازنة",
    established: "2008",
    students: 850,
    teachers: 68,
    stages: ["رياض الأطفال", "المرحلة الابتدائية", "المرحلة المتوسطة", "المرحلة الثانوية"],
    features: ["برامج قيادية", "أنشطة رياضية", "مسابقات علمية", "تدريب مهني"],
    phone: "0112345681",
    email: "info@dahiya-boys.edu.sa",
    address: "الرياض، حي الربيع",
    images: [
      { id: 1, title: "المبنى الرئيسي", category: "المباني" },
      { id: 2, title: "الملاعب", category: "الرياضة" },
      { id: 3, title: "المختبرات", category: "المرافق" },
      { id: 4, title: "قاعة التدريب", category: "المرافق" },
    ],
    videos: [
      { id: 1, title: "جولة افتراضية", duration: "7:00", thumbnail: "" },
      { id: 2, title: "اليوم الرياضي", duration: "12:00", thumbnail: "" },
      { id: 3, title: "معرض العلوم", duration: "9:00", thumbnail: "" },
    ],
  },
};

const SchoolGallery = () => {
  const { schoolId } = useParams();
  const navigate = useNavigate();
  
  const school = schoolId ? schoolsData[schoolId] : null;

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

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-4"
          onClick={() => navigate("/")}
        >
          <ChevronLeft className="w-5 h-5 ml-2" />
          العودة للرئيسية
        </Button>

        {/* School Header */}
        <Card variant="gradient" className="animate-slide-up">
          <CardContent className="p-6">
            <h1 className="text-2xl font-bold text-primary-foreground mb-2">{school.name}</h1>
            <p className="text-primary-foreground/80 mb-4">{school.nameEn}</p>
            <p className="text-primary-foreground/70 text-sm">{school.description}</p>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-2">
          <Card variant="elevated" className="text-center p-3">
            <Calendar className="w-5 h-5 mx-auto mb-1 text-primary" />
            <div className="text-lg font-bold text-primary">{school.established}</div>
            <div className="text-xs text-muted-foreground">تأسست</div>
          </Card>
          <Card variant="elevated" className="text-center p-3">
            <Users className="w-5 h-5 mx-auto mb-1 text-secondary" />
            <div className="text-lg font-bold text-secondary">{school.students}</div>
            <div className="text-xs text-muted-foreground">طالب</div>
          </Card>
          <Card variant="elevated" className="text-center p-3">
            <BookOpen className="w-5 h-5 mx-auto mb-1 text-green-500" />
            <div className="text-lg font-bold text-green-500">{school.teachers}</div>
            <div className="text-xs text-muted-foreground">معلم</div>
          </Card>
          <Card variant="elevated" className="text-center p-3">
            <Award className="w-5 h-5 mx-auto mb-1 text-yellow-500" />
            <div className="text-lg font-bold text-yellow-500">{school.stages.length}</div>
            <div className="text-xs text-muted-foreground">مراحل</div>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="about" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="about">عن المدرسة</TabsTrigger>
            <TabsTrigger value="gallery">الصور</TabsTrigger>
            <TabsTrigger value="videos">الفيديوهات</TabsTrigger>
          </TabsList>

          <TabsContent value="about" className="space-y-4 mt-4">
            {/* Vision & Mission */}
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="text-lg">الرؤية والرسالة</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <p className="font-medium text-primary mb-1">الرؤية</p>
                  <p className="text-sm text-foreground">{school.vision}</p>
                </div>
                <div className="p-3 bg-secondary/10 rounded-lg">
                  <p className="font-medium text-secondary mb-1">الرسالة</p>
                  <p className="text-sm text-foreground">{school.mission}</p>
                </div>
              </CardContent>
            </Card>

            {/* Stages */}
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="text-lg">المراحل الدراسية</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {school.stages.map((stage, index) => (
                    <Badge key={index} variant="secondary" className="text-sm">
                      {stage}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="text-lg">المميزات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {school.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-2 bg-muted/30 rounded-lg"
                    >
                      <Award className="w-4 h-4 text-primary" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="text-lg">معلومات التواصل</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <span className="text-foreground">{school.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <span className="text-foreground">{school.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="text-foreground">{school.address}</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="gallery" className="mt-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {school.images.map((image) => (
                <Card
                  key={image.id}
                  variant="elevated"
                  className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-square bg-muted flex items-center justify-center">
                    <Image className="w-12 h-12 text-muted-foreground" />
                  </div>
                  <CardContent className="p-3">
                    <p className="font-medium text-foreground text-sm">{image.title}</p>
                    <Badge variant="outline" className="text-xs mt-1">
                      {image.category}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="videos" className="space-y-3 mt-4">
            {school.videos.map((video) => (
              <Card
                key={video.id}
                variant="elevated"
                className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-0">
                  <div className="flex">
                    <div className="w-32 h-20 bg-muted flex items-center justify-center shrink-0">
                      <Play className="w-10 h-10 text-muted-foreground" />
                    </div>
                    <div className="flex-1 p-3 flex flex-col justify-center">
                      <p className="font-medium text-foreground">{video.title}</p>
                      <p className="text-sm text-muted-foreground">{video.duration}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {/* CTA Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" asChild>
            <a href={`tel:${school.phone}`}>
              <Phone className="w-4 h-4 ml-2" />
              اتصل بنا
            </a>
          </Button>
          <Button onClick={() => navigate("/login")}>
            <Users className="w-4 h-4 ml-2" />
            التسجيل
          </Button>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default SchoolGallery;
