import { useState } from "react";
import { Calendar, Eye, ArrowLeft, Search, Filter } from "lucide-react";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const categories = [
  { id: "all", label: "الكل" },
  { id: "announcement", label: "إعلانات" },
  { id: "event", label: "فعاليات" },
  { id: "achievement", label: "إنجازات" },
  { id: "academic", label: "أكاديمي" },
];

const newsItems = [
  {
    id: 1,
    title: "افتتاح التسجيل للعام الدراسي 1446-1447هـ",
    description: "يسر مجموعة المالكي التعليمية أن تعلن عن بدء التسجيل للعام الدراسي الجديد. سارعوا بالتسجيل للحصول على مقاعدكم.",
    date: "2024-01-15",
    category: "announcement",
    featured: true,
    views: 1250,
    school: "جميع المدارس",
  },
  {
    id: 2,
    title: "حفل تكريم الطلاب المتفوقين للفصل الأول",
    description: "تقيم مدارس أجيال المعالي حفل تكريم للطلاب المتفوقين في الفصل الدراسي الأول يوم الخميس القادم.",
    date: "2024-01-12",
    category: "event",
    featured: true,
    views: 890,
    school: "أجيال المعالي",
  },
  {
    id: 3,
    title: "فوز طلابنا بالمركز الأول في مسابقة الروبوت",
    description: "حقق طلاب مدارس قناديل الشرق المركز الأول على مستوى المملكة في مسابقة الروبوت التعليمي.",
    date: "2024-01-10",
    category: "achievement",
    featured: false,
    views: 2100,
    school: "قناديل الشرق",
  },
  {
    id: 4,
    title: "موعد اختبارات نهاية الفصل الدراسي الأول",
    description: "نود إعلام أولياء الأمور الكرام بموعد اختبارات نهاية الفصل الدراسي الأول والتي ستبدأ من يوم الأحد.",
    date: "2024-01-08",
    category: "academic",
    featured: false,
    views: 3200,
    school: "جميع المدارس",
  },
  {
    id: 5,
    title: "ورشة عمل للمعلمين حول التعليم الإلكتروني",
    description: "تنظم إدارة مدارس الضاحية ورشة عمل متخصصة للمعلمين حول أحدث تقنيات التعليم الإلكتروني.",
    date: "2024-01-05",
    category: "event",
    featured: false,
    views: 560,
    school: "الضاحية",
  },
  {
    id: 6,
    title: "تحديث جديد لتطبيق النقل المدرسي",
    description: "تم إطلاق تحديث جديد لتطبيق النقل المدرسي يتضمن ميزات جديدة لتتبع الحافلات بشكل أفضل.",
    date: "2024-01-03",
    category: "announcement",
    featured: false,
    views: 1800,
    school: "جميع المدارس",
  },
];

const getCategoryColor = (category: string) => {
  switch (category) {
    case "announcement":
      return "bg-primary text-primary-foreground";
    case "event":
      return "bg-secondary text-secondary-foreground";
    case "achievement":
      return "bg-success text-success-foreground";
    case "academic":
      return "bg-school-navy text-primary-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const getCategoryLabel = (category: string) => {
  switch (category) {
    case "announcement":
      return "إعلان";
    case "event":
      return "فعالية";
    case "achievement":
      return "إنجاز";
    case "academic":
      return "أكاديمي";
    default:
      return category;
  }
};

const News = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNews = newsItems.filter((item) => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch = item.title.includes(searchQuery) || item.description.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  const featuredNews = filteredNews.filter((item) => item.featured);
  const regularNews = filteredNews.filter((item) => !item.featured);

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Page Header */}
        <div className="text-center animate-slide-up">
          <h1 className="text-3xl font-bold text-foreground mb-2">الأخبار والإعلانات</h1>
          <p className="text-muted-foreground">آخر المستجدات والفعاليات في مدارسنا</p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="ابحث في الأخبار..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10 h-12 rounded-xl"
            />
          </div>
          <Button variant="outline" className="h-12 gap-2">
            <Filter className="w-5 h-5" />
            تصفية
          </Button>
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide animate-slide-up" style={{ animationDelay: "0.2s" }}>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="shrink-0"
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Featured News */}
        {featuredNews.length > 0 && (
          <section className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <h2 className="text-xl font-bold text-foreground mb-4">أخبار مميزة</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {featuredNews.map((item, index) => (
                <Card
                  key={item.id}
                  variant="school"
                  className="overflow-hidden group"
                  style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                >
                  {/* Featured Banner */}
                  <div className="h-40 gradient-hero relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                    <div className="absolute top-4 right-4">
                      <span className={cn("px-3 py-1 rounded-full text-xs font-medium", getCategoryColor(item.category))}>
                        {getCategoryLabel(item.category)}
                      </span>
                    </div>
                    <div className="absolute bottom-4 right-4 left-4">
                      <h3 className="text-lg font-bold text-primary-foreground line-clamp-2">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(item.date).toLocaleDateString("ar-SA")}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {item.views.toLocaleString()}
                        </span>
                      </div>
                      <Button variant="ghost" size="sm" className="group-hover:text-primary">
                        اقرأ المزيد
                        <ArrowLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Regular News */}
        <section className="animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <h2 className="text-xl font-bold text-foreground mb-4">جميع الأخبار</h2>
          <div className="space-y-4">
            {regularNews.map((item, index) => (
              <Card
                key={item.id}
                variant="feature"
                className="overflow-hidden group cursor-pointer"
                style={{ animationDelay: `${0.4 + index * 0.05}s` }}
              >
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    {/* Thumbnail */}
                    <div className={cn("w-20 h-20 rounded-xl shrink-0 flex items-center justify-center", getCategoryColor(item.category))}>
                      <span className="text-2xl font-bold">{item.title.charAt(0)}</span>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                          {item.title}
                        </h3>
                        <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium shrink-0", getCategoryColor(item.category))}>
                          {getCategoryLabel(item.category)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                        {item.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(item.date).toLocaleDateString("ar-SA")}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {item.views.toLocaleString()}
                        </span>
                        <span className="text-primary">{item.school}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Load More */}
        <div className="text-center animate-fade-in">
          <Button variant="outline" size="lg">
            تحميل المزيد
          </Button>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default News;
