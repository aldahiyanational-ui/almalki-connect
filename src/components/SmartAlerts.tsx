import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  Clock,
  Calendar,
  BookOpen,
  AlertTriangle,
  CheckCircle,
  X,
  ChevronLeft,
  Sparkles,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SmartAlert {
  id: string;
  type: "reminder" | "warning" | "info" | "success";
  title: string;
  message: string;
  time: string;
  priority: "high" | "medium" | "low";
  action?: {
    label: string;
    path: string;
  };
  icon: React.ElementType;
}

const generateSmartAlerts = (): SmartAlert[] => {
  const now = new Date();
  const hour = now.getHours();
  const dayOfWeek = now.getDay();
  const alerts: SmartAlert[] = [];

  // Morning school reminder
  if (hour >= 5 && hour < 8 && dayOfWeek !== 5 && dayOfWeek !== 6) {
    alerts.push({
      id: "morning-school",
      type: "reminder",
      title: "موعد المدرسة قريب! 🌅",
      message: "تأكد من تجهيز الحقيبة والزي المدرسي",
      time: "الآن",
      priority: "high",
      icon: Clock,
      action: {
        label: "عرض الجدول",
        path: "/schedule",
      },
    });
  }

  // Homework deadline reminder
  if (hour >= 18 && hour < 22) {
    alerts.push({
      id: "homework-reminder",
      type: "warning",
      title: "واجبات قريبة التسليم ⏰",
      message: "لديك 3 واجبات يجب تسليمها غداً",
      time: "منذ ساعة",
      priority: "high",
      icon: BookOpen,
      action: {
        label: "عرض الواجبات",
        path: "/homework",
      },
    });
  }

  // Exam coming up
  if (dayOfWeek >= 0 && dayOfWeek <= 4) {
    alerts.push({
      id: "exam-reminder",
      type: "info",
      title: "اختبار قادم 📝",
      message: "اختبار الرياضيات بعد 3 أيام - راجع الفصل الخامس",
      time: "تذكير",
      priority: "medium",
      icon: Calendar,
      action: {
        label: "عرض الاختبارات",
        path: "/exams",
      },
    });
  }

  // Success message for good attendance
  alerts.push({
    id: "attendance-success",
    type: "success",
    title: "أداء ممتاز! 🌟",
    message: "نسبة حضورك هذا الشهر 98% - استمر في التميز",
    time: "اليوم",
    priority: "low",
    icon: CheckCircle,
  });

  // Fee reminder (mid-month)
  const dayOfMonth = now.getDate();
  if (dayOfMonth >= 15 && dayOfMonth <= 20) {
    alerts.push({
      id: "fee-reminder",
      type: "warning",
      title: "تذكير بالرسوم 💳",
      message: "موعد سداد القسط الشهري خلال 5 أيام",
      time: "تذكير",
      priority: "medium",
      icon: AlertTriangle,
      action: {
        label: "الدفع الآن",
        path: "/payment",
      },
    });
  }

  return alerts.slice(0, 4);
};

const alertStyles = {
  reminder: {
    bg: "bg-primary/10 border-primary/30",
    iconBg: "bg-primary",
    iconColor: "text-primary-foreground",
  },
  warning: {
    bg: "bg-destructive/10 border-destructive/30",
    iconBg: "bg-destructive",
    iconColor: "text-destructive-foreground",
  },
  info: {
    bg: "bg-secondary/10 border-secondary/30",
    iconBg: "bg-secondary",
    iconColor: "text-secondary-foreground",
  },
  success: {
    bg: "bg-success/10 border-success/30",
    iconBg: "bg-success",
    iconColor: "text-success-foreground",
  },
};

const SmartAlerts = () => {
  const [alerts, setAlerts] = useState<SmartAlert[]>([]);
  const [dismissedAlerts, setDismissedAlerts] = useState<string[]>([]);

  useEffect(() => {
    setAlerts(generateSmartAlerts());
  }, []);

  const handleDismiss = (alertId: string) => {
    setDismissedAlerts((prev) => [...prev, alertId]);
  };

  const visibleAlerts = alerts.filter(
    (alert) => !dismissedAlerts.includes(alert.id)
  );

  if (visibleAlerts.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
          <h3 className="font-bold text-foreground">تنبيهات ذكية</h3>
          <Badge variant="secondary" className="text-xs">
            {visibleAlerts.length} جديد
          </Badge>
        </div>
      </div>

      <AnimatePresence>
        {visibleAlerts.map((alert, index) => {
          const styles = alertStyles[alert.type];
          const Icon = alert.icon;

          return (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: -100, scale: 0.95 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <Card
                className={cn(
                  "border overflow-hidden transition-all duration-300 hover:shadow-md",
                  styles.bg
                )}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                        styles.iconBg
                      )}
                    >
                      <Icon className={cn("w-5 h-5", styles.iconColor)} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-bold text-foreground text-sm">
                            {alert.title}
                          </h4>
                          <p className="text-muted-foreground text-sm mt-0.5">
                            {alert.message}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 shrink-0"
                          onClick={() => handleDismiss(alert.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xs text-muted-foreground">
                          {alert.time}
                        </span>
                        {alert.action && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 text-xs gap-1 text-primary hover:text-primary"
                            onClick={() => {
                              window.location.href = alert.action!.path;
                            }}
                          >
                            {alert.action.label}
                            <ChevronLeft className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default SmartAlerts;
