import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Search,
  BookOpen,
  Video,
  Link,
  Download,
  Play,
  ExternalLink,
} from "lucide-react";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { schools } from "@/contexts/SchoolContext";
import { cn } from "@/lib/utils";

const books = [
  {
    id: 1,
    title: "كتاب الرياضيات - الصف السادس",
    subject: "الرياضيات",
    grade: "السادس",
    type: "كتاب مدرسي",
    format: "PDF",
    size: "15 MB",
  },
  {
    id: 2,
    title: "كتاب اللغة العربية - الصف السادس",
    subject: "اللغة العربية",
    grade: "السادس",
    type: "كتاب مدرسي",
    format: "PDF",
    size: "20 MB",
  },
  {
    id: 3,
    title: "كتاب العلوم - الصف السادس",
    subject: "العلوم",
    grade: "السادس",
    type: "كتاب مدرسي",
    format: "PDF",
    size: "18 MB",
  },
  {
    id: 4,
    title: "مراجعة شاملة - الرياضيات",
    subject: "الرياضيات",
    grade: "السادس",
    type: "ملخص",
    format: "PDF",
    size: "5 MB",
  },
];

const videos = [
  {
    id: 1,
    title: "شرح درس الكسور",
    subject: "الرياضيات",
    duration: "15:30",
    views: 1250,
  },
  {
    id: 2,
    title: "قواعد النحو - المبتدأ والخبر",
    subject: "اللغة العربية",
    duration: "20:15",
    views: 890,
  },
  {
    id: 3,
    title: "تجربة الكثافة",
    subject: "العلوم",
    duration: "12:45",
    views: 650,
  },
];

const links = [
  {
    id: 1,
    title: "منصة مدرستي",
    description: "المنصة الرسمية للتعليم عن بعد",
    url: "https://madrasati.sa",
    type: "منصة تعليمية",
  },
  {
    id: 2,
    title: "عين التعليمية",
    description: "بوابة التعليم الوطنية",
    url: "https://ien.edu.sa",
    type: "منصة تعليمية",
  },
];

const subjects = ["الكل", "الرياضيات", "اللغة العربية", "العلوم", "اللغة الإنجليزية"];

const subjectColors: Record<string, string> = {
  "الرياضيات": "bg-purple-500",
  "اللغة العربية": "bg-blue-500",
  "العلوم": "bg-green-500",
  "اللغة الإنجليزية": "bg-red-500",
};

const LibrarySchool = () => {
  const { schoolId } = useParams();
  const navigate = useNavigate();
  const school = schools[schoolId || ""];
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("الكل");

  if (!school) {
    return <div>المدرسة غير موجودة</div>;
  }

  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.title.includes(searchQuery);
    const matchesSubject = selectedSubject === "الكل" || book.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  const filteredVideos = videos.filter((video) => {
    const matchesSearch = video.title.includes(searchQuery);
    const matchesSubject = selectedSubject === "الكل" || video.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

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
          <h1 className="text-2xl font-bold text-foreground">المكتبة الرقمية</h1>
          <p className="text-muted-foreground">الكتب والمراجع التعليمية</p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <Card variant="elevated" className="text-center p-4">
            <BookOpen className="w-6 h-6 mx-auto mb-1 text-primary" />
            <div className="text-2xl font-bold text-primary">{books.length}</div>
            <div className="text-xs text-muted-foreground">كتاب</div>
          </Card>
          <Card variant="elevated" className="text-center p-4">
            <Video className="w-6 h-6 mx-auto mb-1 text-secondary" />
            <div className="text-2xl font-bold text-secondary">{videos.length}</div>
            <div className="text-xs text-muted-foreground">فيديو</div>
          </Card>
          <Card variant="elevated" className="text-center p-4">
            <Link className="w-6 h-6 mx-auto mb-1 text-green-500" />
            <div className="text-2xl font-bold text-green-500">{links.length}</div>
            <div className="text-xs text-muted-foreground">رابط</div>
          </Card>
        </div>

        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="البحث في المكتبة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
            />
          </div>
          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="المادة" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((subject) => (
                <SelectItem key={subject} value={subject}>
                  {subject}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="books" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="books">الكتب</TabsTrigger>
            <TabsTrigger value="videos">الفيديوهات</TabsTrigger>
            <TabsTrigger value="links">الروابط</TabsTrigger>
          </TabsList>

          <TabsContent value="books" className="space-y-3 mt-4">
            {filteredBooks.map((book, index) => (
              <Card
                key={book.id}
                variant="elevated"
                className="animate-slide-up overflow-hidden"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CardContent className="p-0">
                  <div className="flex">
                    <div className={cn("w-2", subjectColors[book.subject] || "bg-primary")} />
                    <div className="flex-1 p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-bold text-foreground">{book.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline">{book.subject}</Badge>
                            <Badge variant="secondary">{book.type}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">
                            {book.format} • {book.size}
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 ml-1" />
                          تحميل
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="videos" className="space-y-3 mt-4">
            {filteredVideos.map((video, index) => (
              <Card
                key={video.id}
                variant="elevated"
                className="animate-slide-up overflow-hidden"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CardContent className="p-0">
                  <div className="flex">
                    <div className={cn("w-2", subjectColors[video.subject] || "bg-primary")} />
                    <div className="flex-1 p-4">
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-14 bg-muted rounded-lg flex items-center justify-center shrink-0">
                          <Play className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-foreground">{video.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline">{video.subject}</Badge>
                            <span className="text-sm text-muted-foreground">{video.duration}</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {video.views.toLocaleString()} مشاهدة
                          </p>
                        </div>
                        <Button size="sm">
                          <Play className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="links" className="space-y-3 mt-4">
            {links.map((link, index) => (
              <Card
                key={link.id}
                variant="elevated"
                className="animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                        <Link className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground">{link.title}</h3>
                        <p className="text-sm text-muted-foreground">{link.description}</p>
                        <Badge variant="outline" className="mt-1">{link.type}</Badge>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <a href={link.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
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

export default LibrarySchool;
