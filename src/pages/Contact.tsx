import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  Headphones,
  Building,
  ChevronLeft,
} from "lucide-react";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const schools = [
  {
    name: "مدرسة أجيال المعالي الأهلية",
    phone: "+966 11 123 4567",
    email: "ajyal@almalki.edu.sa",
    address: "الرياض، حي النزهة، شارع الأمير سلطان",
  },
  {
    name: "مدرسة قناديل الشرق الأهلية",
    phone: "+966 11 234 5678",
    email: "qanadil@almalki.edu.sa",
    address: "الرياض، حي الملقا، طريق الملك فهد",
  },
  {
    name: "مدرسة الضاحية الأهلية للبنات",
    phone: "+966 11 345 6789",
    email: "dahiya-girls@almalki.edu.sa",
    address: "الرياض، حي الضاحية، شارع الإمام أحمد",
  },
  {
    name: "مدرسة الضاحية الأهلية للبنين",
    phone: "+966 11 456 7890",
    email: "dahiya-boys@almalki.edu.sa",
    address: "الرياض، حي الضاحية، شارع الإمام أحمد",
  },
];

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "تم إرسال رسالتك بنجاح",
        description: "سنقوم بالرد عليك في أقرب وقت ممكن",
      });
      setFormData({ name: "", phone: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />

      <main className="container mx-auto px-4 py-6 space-y-8">
        {/* Hero Section */}
        <section className="relative gradient-hero rounded-3xl p-8 md:p-12 overflow-hidden animate-slide-up">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-foreground rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 text-center">
            <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
              <Headphones className="w-5 h-5 text-secondary" />
              <span className="text-primary-foreground text-sm font-medium">نحن هنا لمساعدتك</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              تواصل معنا
            </h1>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-8">
              نسعد بتواصلكم معنا والإجابة على جميع استفساراتكم
            </p>

            {/* WhatsApp - Main CTA */}
            <a
              href="https://wa.me/966500000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-col items-center gap-2 bg-primary-foreground/20 backdrop-blur-lg rounded-2xl p-6 border border-primary-foreground/20 hover:bg-primary-foreground/30 transition-colors cursor-pointer"
            >
              <span className="text-primary-foreground/80 text-sm">تواصل معنا عبر واتساب</span>
              <div className="flex items-center gap-3 text-3xl md:text-4xl font-bold text-success hover:scale-105 transition-transform">
                <MessageCircle className="w-8 h-8 animate-pulse" />
                <span>واتساب</span>
              </div>
              <span className="text-primary-foreground/60 text-sm">الدمام - المملكة العربية السعودية</span>
            </a>
          </div>
        </section>

        {/* Quick Contact Options */}
        <section className="grid grid-cols-2 md:grid-cols-3 gap-4 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <a
            href="https://wa.me/966500000000"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <Card variant="elevated" className="text-center p-6 hover:shadow-xl transition-all group-hover:scale-[1.02]">
              <div className="w-14 h-14 bg-success rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-7 h-7 text-success-foreground" />
              </div>
              <h3 className="font-bold text-foreground mb-1">واتساب</h3>
              <p className="text-sm text-muted-foreground">تواصل معنا</p>
            </Card>
          </a>

          <a
            href="mailto:gr.almalkigroup@gmail.com"
            className="group"
          >
            <Card variant="elevated" className="text-center p-6 hover:shadow-xl transition-all group-hover:scale-[1.02]">
              <div className="w-14 h-14 bg-secondary rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <Mail className="w-7 h-7 text-secondary-foreground" />
              </div>
              <h3 className="font-bold text-foreground mb-1">البريد</h3>
              <p className="text-sm text-muted-foreground">راسلنا</p>
            </Card>
          </a>

          <div className="group cursor-pointer">
            <Card variant="elevated" className="text-center p-6 hover:shadow-xl transition-all group-hover:scale-[1.02]">
              <div className="w-14 h-14 bg-school-navy rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <MapPin className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="font-bold text-foreground mb-1">الموقع</h3>
              <p className="text-sm text-muted-foreground">الدمام</p>
            </Card>
          </div>
        </section>

        {/* Contact Form & Info */}
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Contact Form */}
          <Card variant="feature" className="lg:col-span-3 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-foreground mb-6">أرسل رسالة</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">الاسم الكامل *</label>
                    <Input
                      placeholder="أدخل اسمك"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="h-12 rounded-xl"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">رقم الجوال *</label>
                    <Input
                      type="tel"
                      placeholder="05xxxxxxxx"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="h-12 rounded-xl"
                      dir="ltr"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">البريد الإلكتروني</label>
                  <Input
                    type="email"
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="h-12 rounded-xl"
                    dir="ltr"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">الموضوع *</label>
                  <Input
                    placeholder="موضوع الرسالة"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="h-12 rounded-xl"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">الرسالة *</label>
                  <Textarea
                    placeholder="اكتب رسالتك هنا..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="min-h-32 rounded-xl resize-none"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "جارٍ الإرسال..."
                  ) : (
                    <>
                      <Send className="w-5 h-5 ml-2" />
                      إرسال الرسالة
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-4 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            {/* WhatsApp Card */}
            <a
              href="https://wa.me/966500000000"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Card variant="gradient" className="hover:scale-[1.02] transition-transform cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-success/80 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                      <MessageCircle className="w-7 h-7 text-success-foreground" />
                    </div>
                    <div>
                      <p className="text-primary-foreground/80 text-sm">تواصل معنا عبر واتساب</p>
                      <span className="text-2xl font-bold text-primary-foreground">
                        اضغط هنا للتواصل
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </a>

            {/* Working Hours */}
            <Card variant="feature">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-secondary/20 rounded-xl flex items-center justify-center">
                    <Clock className="w-5 h-5 text-secondary" />
                  </div>
                  <h3 className="font-bold text-foreground">ساعات العمل</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">الأحد - الخميس</span>
                    <span className="font-medium text-foreground">7:00 ص - 4:00 م</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">الجمعة - السبت</span>
                    <span className="font-medium text-destructive">مغلق</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Main Email */}
            <Card variant="feature">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground">البريد الإلكتروني</h3>
                </div>
                <a
                  href="mailto:gr.almalkigroup@gmail.com"
                  className="text-primary hover:underline"
                  dir="ltr"
                >
                  gr.almalkigroup@gmail.com
                </a>
              </CardContent>
            </Card>

            {/* Main Address */}
            <Card variant="feature">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-destructive/20 rounded-xl flex items-center justify-center">
                    <Building className="w-5 h-5 text-destructive" />
                  </div>
                  <h3 className="font-bold text-foreground">العنوان</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  المملكة العربية السعودية<br />
                  الدمام
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Schools Contact Info */}
        <section className="animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <h2 className="text-xl font-bold text-foreground mb-6">بيانات التواصل لكل مدرسة</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {schools.map((school, index) => (
              <Card
                key={index}
                variant="feature"
                className="group hover:shadow-lg transition-all"
              >
                <CardContent className="p-5">
                  <h3 className="font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                    {school.name}
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-primary" />
                      <a href={`tel:${school.phone.replace(/\s/g, "")}`} className="text-muted-foreground hover:text-primary" dir="ltr">
                        {school.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-secondary" />
                      <a href={`mailto:${school.email}`} className="text-muted-foreground hover:text-secondary" dir="ltr">
                        {school.email}
                      </a>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-destructive mt-0.5" />
                      <span className="text-muted-foreground">{school.address}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Map Placeholder */}
        <Card variant="feature" className="overflow-hidden animate-slide-up" style={{ animationDelay: "0.5s" }}>
          <div className="h-64 bg-muted flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground font-medium">خريطة مواقع المدارس</p>
              <p className="text-sm text-muted-foreground/70">سيتم إضافة الخريطة التفاعلية قريباً</p>
            </div>
          </div>
        </Card>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default Contact;
