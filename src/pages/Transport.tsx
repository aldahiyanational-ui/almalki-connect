import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Bus,
  MapPin,
  User,
  Phone,
  Clock,
  Navigation,
  CheckCircle2,
  AlertCircle,
  CreditCard,
  Map,
} from "lucide-react";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const transportInfo = {
  busNumber: "BUS-15",
  route: "المسار الشمالي",
  driver: {
    name: "أحمد سالم العتيبي",
    phone: "0501234567",
  },
  supervisor: {
    name: "نورة محمد الشهري",
    phone: "0509876543",
  },
  pickupTime: "06:15 صباحاً",
  dropoffTime: "01:00 ظهراً",
  pickupLocation: "حي النرجس، شارع الأمير سلطان",
  status: "subscribed",
};

const transportFees = {
  annualFee: 2500,
  semesterFee: 1400,
  monthlyFee: 300,
  status: "paid",
  validUntil: "2024/06/30",
};

const coveredAreas = [
  { name: "حي النرجس", distance: "5 كم" },
  { name: "حي الملقا", distance: "7 كم" },
  { name: "حي الياسمين", distance: "6 كم" },
  { name: "حي العارض", distance: "8 كم" },
  { name: "حي الصحافة", distance: "4 كم" },
  { name: "حي النخيل", distance: "9 كم" },
  { name: "حي الورود", distance: "3 كم" },
  { name: "حي الربيع", distance: "5 كم" },
  { name: "حي الغدير", distance: "6 كم" },
  { name: "حي المروج", distance: "7 كم" },
];

const busSchedule = [
  { time: "06:00", location: "انطلاق من المدرسة", type: "start" },
  { time: "06:15", location: "حي النرجس", type: "pickup" },
  { time: "06:25", location: "حي الملقا", type: "pickup" },
  { time: "06:35", location: "حي الياسمين", type: "pickup" },
  { time: "06:45", location: "حي العارض", type: "pickup" },
  { time: "07:00", location: "الوصول للمدرسة", type: "end" },
];

const Transport = () => {
  const navigate = useNavigate();

  const handleTrackBus = () => {
    // This would open the external transport tracking app
    window.open("https://transport.example.com/track", "_blank");
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
          <h1 className="text-2xl font-bold text-foreground">النقل المدرسي</h1>
          <p className="text-muted-foreground">إدارة خدمات النقل</p>
        </div>

        {/* Subscription Status Card */}
        <Card variant="gradient" className="animate-slide-up">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-primary-foreground/80 text-sm">حالة الاشتراك</p>
                <div className="flex items-center gap-2 mt-1">
                  <CheckCircle2 className="w-6 h-6 text-primary-foreground" />
                  <span className="text-xl font-bold text-primary-foreground">مشترك</span>
                </div>
              </div>
              <div className="w-16 h-16 bg-primary-foreground/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Bus className="w-8 h-8 text-primary-foreground" />
              </div>
            </div>
            <div className="flex items-center justify-between text-sm text-primary-foreground/80">
              <span>رقم الباص: {transportInfo.busNumber}</span>
              <span>صالح حتى: {transportFees.validUntil}</span>
            </div>
          </CardContent>
        </Card>

        {/* Track Bus Button */}
        <Button className="w-full h-14 text-lg" onClick={handleTrackBus}>
          <Navigation className="w-6 h-6 ml-2" />
          تتبع الباص الآن
        </Button>

        {/* Tabs */}
        <Tabs defaultValue="info" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="info">معلومات النقل</TabsTrigger>
            <TabsTrigger value="fees">الرسوم</TabsTrigger>
            <TabsTrigger value="areas">المناطق</TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="space-y-4 mt-4">
            {/* Bus Info */}
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Bus className="w-5 h-5 text-primary" />
                  معلومات الباص
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <p className="text-sm text-muted-foreground">رقم الباص</p>
                    <p className="font-bold text-foreground">{transportInfo.busNumber}</p>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <p className="text-sm text-muted-foreground">المسار</p>
                    <p className="font-bold text-foreground">{transportInfo.route}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-muted-foreground">وقت الذهاب</span>
                    </div>
                    <p className="font-bold text-foreground">{transportInfo.pickupTime}</p>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-blue-500" />
                      <span className="text-sm text-muted-foreground">وقت العودة</span>
                    </div>
                    <p className="font-bold text-foreground">{transportInfo.dropoffTime}</p>
                  </div>
                </div>

                <div className="p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="text-sm text-muted-foreground">موقع التجمع</span>
                  </div>
                  <p className="font-bold text-foreground">{transportInfo.pickupLocation}</p>
                </div>
              </CardContent>
            </Card>

            {/* Driver & Supervisor Info */}
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  طاقم النقل
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground">السائق</p>
                    <p className="font-bold text-foreground">{transportInfo.driver.name}</p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <a href={`tel:${transportInfo.driver.phone}`}>
                      <Phone className="w-4 h-4 ml-1" />
                      اتصال
                    </a>
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground">المشرفة</p>
                    <p className="font-bold text-foreground">{transportInfo.supervisor.name}</p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <a href={`tel:${transportInfo.supervisor.phone}`}>
                      <Phone className="w-4 h-4 ml-1" />
                      اتصال
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Bus Schedule */}
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  جدول المسار الصباحي
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  {busSchedule.map((stop, index) => (
                    <div key={index} className="flex items-start gap-3 pb-4 last:pb-0">
                      <div className="flex flex-col items-center">
                        <div className={cn(
                          "w-4 h-4 rounded-full",
                          stop.type === "start" ? "bg-green-500" :
                          stop.type === "end" ? "bg-blue-500" : "bg-primary"
                        )} />
                        {index < busSchedule.length - 1 && (
                          <div className="w-0.5 h-8 bg-border" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{stop.location}</p>
                        <p className="text-sm text-muted-foreground">{stop.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="fees" className="space-y-4 mt-4">
            {/* Fee Cards */}
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-primary" />
                  رسوم النقل المدرسي
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-primary/10 rounded-xl border-2 border-primary">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-foreground">الاشتراك السنوي</span>
                    <Badge className="bg-primary">موصى به</Badge>
                  </div>
                  <p className="text-3xl font-bold text-primary">{transportFees.annualFee.toLocaleString()} ريال</p>
                  <p className="text-sm text-muted-foreground mt-1">وفر 200 ريال</p>
                </div>

                <div className="p-4 bg-muted/30 rounded-xl">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-foreground">الاشتراك الفصلي</span>
                    <p className="text-xl font-bold text-foreground">{transportFees.semesterFee.toLocaleString()} ريال</p>
                  </div>
                </div>

                <div className="p-4 bg-muted/30 rounded-xl">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-foreground">الاشتراك الشهري</span>
                    <p className="text-xl font-bold text-foreground">{transportFees.monthlyFee.toLocaleString()} ريال</p>
                  </div>
                </div>

                <Button className="w-full" onClick={() => navigate("/fees")}>
                  <CreditCard className="w-4 h-4 ml-2" />
                  سداد رسوم النقل
                </Button>
              </CardContent>
            </Card>

            {/* Payment Status */}
            <Card variant="outline" className="bg-green-500/10 border-green-500/30">
              <CardContent className="p-4 flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-green-500" />
                <div>
                  <p className="font-bold text-green-600">رسوم النقل مدفوعة</p>
                  <p className="text-sm text-muted-foreground">صالح حتى: {transportFees.validUntil}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="areas" className="space-y-4 mt-4">
            {/* Covered Areas */}
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Map className="w-5 h-5 text-primary" />
                  الأحياء التي تغطيها خدمة النقل
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {coveredAreas.map((area, index) => (
                    <div
                      key={index}
                      className="p-3 bg-muted/30 rounded-lg flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span className="font-medium text-foreground">{area.name}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{area.distance}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contact for unlisted areas */}
            <Card variant="outline" className="bg-secondary/10">
              <CardContent className="p-4 text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  حيك غير موجود في القائمة؟
                </p>
                <Button variant="outline" size="sm">
                  <Phone className="w-4 h-4 ml-2" />
                  تواصل معنا للاستفسار
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default Transport;
