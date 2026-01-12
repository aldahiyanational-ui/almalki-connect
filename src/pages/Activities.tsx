import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Calendar,
  Trophy,
  Users,
  MapPin,
  Clock,
  CheckCircle2,
  Image,
  Play,
  Filter,
} from "lucide-react";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import bgActivities from "@/assets/bg-activities.jpg";

const upcomingEvents = [
  {
    id: 1,
    title: "اليوم الرياضي",
    date: "2024/03/20",
    time: "08:00 - 12:00",
    location: "ملعب المدرسة",
    type: "رياضي",
    description: "يوم رياضي متكامل يشمل مسابقات في كرة القدم والجري والقفز",
    registered: true,
    spots: 50,
    registeredCount: 35,
  },
  {
    id: 2,
    title: "مسابقة القرآن الكريم",
    date: "2024/03/25",
    time: "09:00 - 11:00",
    location: "قاعة المناسبات",
    type: "ديني",
    description: "مسابقة في حفظ وتجويد القرآن الكريم للمراحل الابتدائية",
    registered: false,
    spots: 30,
    registeredCount: 22,
  },
  {
    id: 3,
    title: "معرض العلوم",
    date: "2024/04/01",
    time: "10:00 - 14:00",
    location: "مختبر العلوم",
    type: "علمي",
    description: "معرض لعرض المشاريع العلمية للطلاب",
    registered: false,
    spots: 40,
    registeredCount: 15,
  },
  {
    id: 4,
    title: "رحلة المتحف الوطني",
    date: "2024/04/10",
    time: "08:00 - 15:00",
    location: "المتحف الوطني",
    type: "ترفيهي",
    description: "رحلة تعليمية لزيارة المتحف الوطني",
    registered: true,
    spots: 45,
    registeredCount: 45,
  },
];

const pastEvents = [
  {
    id: 1,
    title: "اليوم الوطني",
    date: "2024/09/23",
    type: "وطني",
    images: 15,
    videos: 3,
  },
  {
    id: 2,
    title: "حفل التفوق",
    date: "2024/02/15",
    type: "تكريم",
    images: 25,
    videos: 2,
  },
  {
    id: 3,
    title: "يوم المعلم",
    date: "2024/03/05",
    type: "تكريم",
    images: 20,
    videos: 1,
  },
];

const typeColors: Record<string, string> = {
  "رياضي": "bg-orange-500",
  "ديني": "bg-emerald-500",
  "علمي": "bg-blue-500",
  "ترفيهي": "bg-purple-500",
  "وطني": "bg-green-600",
  "تكريم": "bg-yellow-500",
};

const Activities = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />

      {/* Hero Section with Background */}
      <div className="relative h-48 md:h-64 overflow-hidden">
        <img 
          src={bgActivities} 
          alt="الأنشطة والفعاليات" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="container mx-auto">
            <Button
              variant="ghost"
              className="mb-2 text-white hover:bg-white/20"
              onClick={() => navigate("/dashboard")}
            >
              <ChevronLeft className="w-5 h-5 ml-2" />
              العودة للوحة التحكم
            </Button>
            <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">الأنشطة والفعاليات</h1>
            <p className="text-white/90 drop-shadow">الفعاليات المدرسية والأنشطة</p>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-6 space-y-6">

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card variant="elevated" className="text-center p-4">
            <Calendar className="w-6 h-6 mx-auto mb-1 text-primary" />
            <div className="text-2xl font-bold text-primary">{upcomingEvents.length}</div>
            <div className="text-xs text-muted-foreground">فعاليات قادمة</div>
          </Card>
          <Card variant="elevated" className="text-center p-4">
            <CheckCircle2 className="w-6 h-6 mx-auto mb-1 text-green-500" />
            <div className="text-2xl font-bold text-green-500">2</div>
            <div className="text-xs text-muted-foreground">مسجل فيها</div>
          </Card>
          <Card variant="elevated" className="text-center p-4">
            <Trophy className="w-6 h-6 mx-auto mb-1 text-secondary" />
            <div className="text-2xl font-bold text-secondary">5</div>
            <div className="text-xs text-muted-foreground">إنجازات</div>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upcoming">الفعاليات القادمة</TabsTrigger>
            <TabsTrigger value="gallery">معرض الصور</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4 mt-4">
            {upcomingEvents.map((event, index) => (
              <Card
                key={event.id}
                variant="elevated"
                className="animate-slide-up overflow-hidden"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CardContent className="p-0">
                  <div className="flex">
                    <div className={cn("w-2", typeColors[event.type] || "bg-primary")} />
                    <div className="flex-1 p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-bold text-foreground text-lg">{event.title}</h3>
                          <Badge variant="outline" className="mt-1">{event.type}</Badge>
                        </div>
                        {event.registered && (
                          <Badge className="bg-green-500 text-white">
                            <CheckCircle2 className="w-3 h-3 ml-1" />
                            مسجل
                          </Badge>
                        )}
                      </div>

                      <p className="text-sm text-muted-foreground mb-3">{event.description}</p>

                      <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{event.registeredCount}/{event.spots}</span>
                        </div>
                      </div>

                      {!event.registered && event.registeredCount < event.spots && (
                        <Button className="w-full" size="sm">
                          التسجيل في الفعالية
                        </Button>
                      )}
                      {event.registeredCount >= event.spots && !event.registered && (
                        <Button className="w-full" size="sm" variant="outline" disabled>
                          اكتمل العدد
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="gallery" className="space-y-4 mt-4">
            {pastEvents.map((event, index) => (
              <Card
                key={event.id}
                variant="elevated"
                className="animate-slide-up overflow-hidden"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-foreground">{event.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline">{event.type}</Badge>
                        <span className="text-sm text-muted-foreground">{event.date}</span>
                      </div>
                    </div>
                  </div>

                  {/* Placeholder for images grid */}
                  <div className="grid grid-cols-4 gap-2 mb-3">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div
                        key={i}
                        className="aspect-square bg-muted rounded-lg flex items-center justify-center"
                      >
                        <Image className="w-6 h-6 text-muted-foreground" />
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Image className="w-4 h-4" />
                        {event.images} صورة
                      </span>
                      <span className="flex items-center gap-1">
                        <Play className="w-4 h-4" />
                        {event.videos} فيديو
                      </span>
                    </div>
                    <Button variant="outline" size="sm">
                      عرض المزيد
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default Activities;
