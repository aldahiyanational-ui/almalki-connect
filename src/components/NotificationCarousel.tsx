import { useState, useEffect } from "react";
import { Bell, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const notifications = [
  {
    id: 1,
    title: "بدء التسجيل للعام الدراسي الجديد",
    date: "قبل ساعتين",
    type: "announcement",
  },
  {
    id: 2,
    title: "موعد اختبارات نهاية الفصل الأول",
    date: "قبل يوم",
    type: "exam",
  },
  {
    id: 3,
    title: "حفل تكريم الطلاب المتفوقين",
    date: "قبل يومين",
    type: "event",
  },
];

const NotificationCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % notifications.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (index: number) => {
    setCurrentIndex(index);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + notifications.length) % notifications.length);
  };

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % notifications.length);
  };

  return (
    <div className="relative bg-gradient-to-l from-primary/5 to-secondary/5 rounded-2xl p-4 border border-border/50">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center shrink-0">
          <Bell className="w-5 h-5 text-primary-foreground" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="overflow-hidden">
            <div
              className="transition-transform duration-500 ease-out"
              style={{ transform: `translateX(${currentIndex * 100}%)` }}
            >
              <div className="flex">
                {notifications.map((notification) => (
                  <div key={notification.id} className="w-full shrink-0 pr-4" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                    <h4 className="font-semibold text-foreground truncate">{notification.title}</h4>
                    <p className="text-sm text-muted-foreground">{notification.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" onClick={prev} className="w-8 h-8">
            <ChevronRight className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={next} className="w-8 h-8">
            <ChevronLeft className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-1 mt-3">
        {notifications.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex
                ? "bg-primary w-4"
                : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default NotificationCarousel;
