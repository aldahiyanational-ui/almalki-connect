import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, Image, Video, MapPin, Phone, Mail, Globe } from "lucide-react";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { schools } from "@/contexts/SchoolContext";
import { cn } from "@/lib/utils";

const GallerySchool = () => {
  const { schoolId } = useParams();
  const navigate = useNavigate();
  const school = schools[schoolId || ""];

  if (!school) {
    return <div>المدرسة غير موجودة</div>;
  }

  const galleryImages = [
    { id: 1, title: "المبنى الرئيسي", category: "مرافق" },
    { id: 2, title: "الفصول الدراسية", category: "مرافق" },
    { id: 3, title: "المكتبة", category: "مرافق" },
    { id: 4, title: "الملاعب", category: "مرافق" },
    { id: 5, title: "يوم التأسيس", category: "فعاليات" },
    { id: 6, title: "اليوم الوطني", category: "فعاليات" },
    { id: 7, title: "حفل التخرج", category: "فعاليات" },
    { id: 8, title: "مسابقة العلوم", category: "أنشطة" },
  ];

  const videos = [
    { id: 1, title: "فيديو تعريفي بالمدرسة", duration: "3:45" },
    { id: 2, title: "جولة في المرافق", duration: "5:20" },
    { id: 3, title: "أنشطة الطلاب", duration: "4:10" },
    { id: 4, title: "شهادات أولياء الأمور", duration: "6:30" },
  ];

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
          <h1 className="text-2xl font-bold text-foreground">معرض المدرسة</h1>
          <p className="text-muted-foreground">صور وفيديوهات المدرسة</p>
        </div>

        <Card variant="gradient" className="animate-slide-up">
          <CardContent className="p-6 text-center">
            <div className="mb-4">
              <img 
                src={school.logo} 
                alt={school.name}
                className="w-24 h-24 mx-auto object-contain"
              />
            </div>
            <h2 className="text-xl font-bold text-primary-foreground mb-2">{school.name}</h2>
            <p className="text-primary-foreground/80 mb-4">{school.description}</p>
            
            <div className="grid grid-cols-2 gap-3 text-left">
              <div className="flex items-center gap-2 text-primary-foreground/80">
                <Phone className="w-4 h-4" />
                <span className="text-sm">920016166</span>
              </div>
              <div className="flex items-center gap-2 text-primary-foreground/80">
                <Mail className="w-4 h-4" />
                <span className="text-sm">info@almalki.edu.sa</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="images" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="images">
              <Image className="w-4 h-4 ml-2" />
              الصور
            </TabsTrigger>
            <TabsTrigger value="videos">
              <Video className="w-4 h-4 ml-2" />
              الفيديوهات
            </TabsTrigger>
          </TabsList>

          <TabsContent value="images" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {galleryImages.map((image, index) => (
                <Card
                  key={image.id}
                  variant="elevated"
                  className="overflow-hidden cursor-pointer hover:scale-105 transition-transform animate-slide-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <Image className="w-12 h-12 text-muted-foreground" />
                  </div>
                  <CardContent className="p-3">
                    <p className="font-medium text-sm text-foreground">{image.title}</p>
                    <Badge variant="outline" className="text-xs mt-1">{image.category}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="videos" className="space-y-3 mt-4">
            {videos.map((video, index) => (
              <Card
                key={video.id}
                variant="elevated"
                className="cursor-pointer hover:scale-[1.02] transition-transform animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CardContent className="p-0">
                  <div className="flex gap-4">
                    <div className="w-32 h-24 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <Video className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <div className="flex-1 p-4">
                      <h3 className="font-bold text-foreground mb-1">{video.title}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {video.duration}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </main>

      <BottomNavigation schoolId={schoolId} />
    </div>
  );
};

export default GallerySchool;
