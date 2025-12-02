import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  MessageSquare,
  Send,
  Search,
  CheckCheck,
  Plus,
} from "lucide-react";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { schools } from "@/contexts/SchoolContext";
import { cn } from "@/lib/utils";

const teachers = [
  { id: 1, name: "أ. محمد الأحمد", subject: "اللغة العربية" },
  { id: 2, name: "أ. خالد العمري", subject: "الرياضيات" },
  { id: 3, name: "أ. فهد الشمري", subject: "العلوم" },
  { id: 4, name: "أ. سارة الحربي", subject: "اللغة الإنجليزية" },
  { id: 5, name: "أ. عبدالرحمن السعيد", subject: "الدراسات الإسلامية" },
];

const conversations = [
  {
    id: 1,
    teacher: "أ. محمد الأحمد",
    subject: "اللغة العربية",
    lastMessage: "شكراً لكم، تم استلام الواجب",
    time: "منذ 5 دقائق",
    unread: 2,
  },
  {
    id: 2,
    teacher: "أ. خالد العمري",
    subject: "الرياضيات",
    lastMessage: "الرجاء مراجعة الطالب في الوحدة الخامسة",
    time: "منذ ساعة",
    unread: 0,
  },
  {
    id: 3,
    teacher: "إدارة المدرسة",
    subject: "إشعار",
    lastMessage: "تذكير: غداً إجازة رسمية",
    time: "أمس",
    unread: 1,
  },
];

const chatMessages = [
  {
    id: 1,
    sender: "teacher",
    message: "السلام عليكم ولي أمر الطالب أحمد",
    time: "10:00",
  },
  {
    id: 2,
    sender: "parent",
    message: "وعليكم السلام ورحمة الله",
    time: "10:02",
  },
  {
    id: 3,
    sender: "teacher",
    message: "أود إبلاغكم بأن مستوى الطالب في اللغة العربية ممتاز، واجباته منتظمة ومشاركته فعالة",
    time: "10:03",
  },
  {
    id: 4,
    sender: "parent",
    message: "الحمد لله، شكراً لكم على المتابعة",
    time: "10:05",
  },
  {
    id: 5,
    sender: "teacher",
    message: "شكراً لكم، تم استلام الواجب",
    time: "10:10",
  },
];

const MessagesSchool = () => {
  const { schoolId } = useParams();
  const navigate = useNavigate();
  const school = schools[schoolId || ""];
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [isNewMessageOpen, setIsNewMessageOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [messageSubject, setMessageSubject] = useState("");
  const [messageContent, setMessageContent] = useState("");

  if (!school) {
    return <div>المدرسة غير موجودة</div>;
  }

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.teacher.includes(searchQuery) || conv.lastMessage.includes(searchQuery)
  );

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setNewMessage("");
    }
  };

  const handleSendNewMessage = () => {
    if (selectedTeacher && messageContent.trim()) {
      setIsNewMessageOpen(false);
      setSelectedTeacher("");
      setMessageSubject("");
      setMessageContent("");
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />

      <main className="container mx-auto px-4 py-6 space-y-6">
        <Button
          variant="ghost"
          className="mb-4"
          onClick={() => {
            if (selectedConversation) {
              setSelectedConversation(null);
            } else {
              navigate(`/${schoolId}/dashboard`);
            }
          }}
        >
          <ChevronLeft className="w-5 h-5 ml-2" />
          {selectedConversation ? "العودة للرسائل" : "العودة للوحة التحكم"}
        </Button>

        {!selectedConversation ? (
          <>
            <div className="text-center mb-4">
              <Badge variant="secondary" className="mb-2">
                {school.name}
              </Badge>
              <h1 className="text-2xl font-bold text-foreground">الرسائل والتواصل</h1>
              <p className="text-muted-foreground">التواصل مع المعلمين والإدارة</p>
            </div>

            <div className="flex items-center justify-between mb-4">
              <Dialog open={isNewMessageOpen} onOpenChange={setIsNewMessageOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 ml-2" />
                    رسالة جديدة
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>رسالة جديدة</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        اختر المعلم/ة
                      </label>
                      <Select value={selectedTeacher} onValueChange={setSelectedTeacher}>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر المعلم/ة للتواصل" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">إدارة المدرسة</SelectItem>
                          {teachers.map((teacher) => (
                            <SelectItem key={teacher.id} value={teacher.id.toString()}>
                              {teacher.name} - {teacher.subject}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        الموضوع
                      </label>
                      <Input
                        placeholder="موضوع الرسالة"
                        value={messageSubject}
                        onChange={(e) => setMessageSubject(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        الرسالة
                      </label>
                      <Textarea
                        placeholder="اكتب رسالتك هنا..."
                        value={messageContent}
                        onChange={(e) => setMessageContent(e.target.value)}
                        rows={4}
                      />
                    </div>
                    <Button className="w-full" onClick={handleSendNewMessage}>
                      <Send className="w-4 h-4 ml-2" />
                      إرسال الرسالة
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="relative mb-4">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="البحث في الرسائل..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
            </div>

            <div className="space-y-3">
              {filteredConversations.map((conv, index) => (
                <Card
                  key={conv.id}
                  variant="elevated"
                  className="cursor-pointer hover:shadow-md transition-shadow animate-slide-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                  onClick={() => setSelectedConversation(conv.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {conv.teacher.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-foreground">{conv.teacher}</h3>
                          <span className="text-xs text-muted-foreground">{conv.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{conv.subject}</p>
                        <p className="text-sm text-foreground truncate">{conv.lastMessage}</p>
                      </div>
                      {conv.unread > 0 && (
                        <Badge className="bg-primary text-primary-foreground">
                          {conv.unread}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        ) : (
          <>
            <Card variant="elevated" className="min-h-[60vh] flex flex-col">
              <CardHeader className="border-b">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-primary/10 text-primary">م</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">أ. محمد الأحمد</CardTitle>
                    <p className="text-sm text-muted-foreground">اللغة العربية</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 p-4 overflow-y-auto space-y-4">
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      "flex",
                      msg.sender === "parent" ? "justify-start" : "justify-end"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[80%] p-3 rounded-2xl",
                        msg.sender === "parent"
                          ? "bg-primary text-primary-foreground rounded-br-sm"
                          : "bg-muted rounded-bl-sm"
                      )}
                    >
                      <p className="text-sm">{msg.message}</p>
                      <div className={cn(
                        "flex items-center gap-1 mt-1",
                        msg.sender === "parent" ? "justify-start" : "justify-end"
                      )}>
                        <span className={cn(
                          "text-xs",
                          msg.sender === "parent" ? "text-primary-foreground/70" : "text-muted-foreground"
                        )}>
                          {msg.time}
                        </span>
                        {msg.sender === "parent" && (
                          <CheckCheck className="w-3 h-3 text-primary-foreground/70" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    placeholder="اكتب رسالتك..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </>
        )}
      </main>

      <BottomNavigation schoolId={schoolId} />
    </div>
  );
};

export default MessagesSchool;
