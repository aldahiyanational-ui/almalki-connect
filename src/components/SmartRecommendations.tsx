import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Lightbulb,
  TrendingUp,
  BookOpen,
  Trophy,
  Star,
  Clock,
  Target,
  Zap,
  ChevronLeft,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Recommendation {
  id: string;
  type: "study" | "activity" | "improvement" | "achievement";
  title: string;
  description: string;
  reason: string;
  action: {
    label: string;
    path: string;
  };
  score: number;
  icon: React.ElementType;
  gradient: string;
}

const generateRecommendations = (): Recommendation[] => {
  const now = new Date();
  const hour = now.getHours();
  const recommendations: Recommendation[] = [];

  // Study recommendation based on time
  if (hour >= 16 && hour <= 20) {
    recommendations.push({
      id: "study-math",
      type: "study",
      title: "راجع درس الكسور",
      description: "بناءً على نتيجة آخر اختبار، ننصحك بمراجعة هذا الدرس",
      reason: "تحسين الأداء في الرياضيات",
      action: {
        label: "ابدأ المراجعة",
        path: "/library",
      },
      score: 85,
      icon: BookOpen,
      gradient: "from-blue-500 to-purple-500",
    });
  }

  // Activity recommendation
  recommendations.push({
    id: "activity-sports",
    type: "activity",
    title: "سجّل في اليوم الرياضي",
    description: "فعالية رياضية ممتعة الأسبوع القادم - 15 مقعد متبقي",
    reason: "الأنشطة تعزز التواصل والنشاط",
    action: {
      label: "سجّل الآن",
      path: "/activities",
    },
    score: 92,
    icon: Trophy,
    gradient: "from-orange-500 to-red-500",
  });

  // Improvement suggestion
  recommendations.push({
    id: "improve-attendance",
    type: "improvement",
    title: "حسّن الحضور المبكر",
    description: "وصولك قبل 10 دقائق يرفع تركيزك في الحصة الأولى",
    reason: "بناءً على أداء الطلاب المتميزين",
    action: {
      label: "عرض الجدول",
      path: "/schedule",
    },
    score: 78,
    icon: Clock,
    gradient: "from-emerald-500 to-teal-500",
  });

  // Achievement tracking
  recommendations.push({
    id: "achievement-track",
    type: "achievement",
    title: "قريب من الإنجاز! 🎯",
    description: "3 واجبات فقط لتحصل على شارة 'الملتزم'",
    reason: "واصل تقديم الواجبات في موعدها",
    action: {
      label: "عرض الواجبات",
      path: "/homework",
    },
    score: 95,
    icon: Target,
    gradient: "from-yellow-500 to-orange-500",
  });

  // Sort by score
  return recommendations.sort((a, b) => b.score - a.score).slice(0, 3);
};

const typeLabels = {
  study: "دراسة",
  activity: "نشاط",
  improvement: "تطوير",
  achievement: "إنجاز",
};

const SmartRecommendations = () => {
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  useEffect(() => {
    setRecommendations(generateRecommendations());
  }, []);

  if (recommendations.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center">
            <Lightbulb className="w-4 h-4 text-secondary" />
          </div>
          <h3 className="font-bold text-foreground">توصيات مخصصة لك</h3>
          <Badge variant="outline" className="text-xs gap-1">
            <Zap className="w-3 h-3" />
            ذكاء اصطناعي
          </Badge>
        </div>
      </div>

      <div className="grid gap-3">
        {recommendations.map((rec, index) => {
          const Icon = rec.icon;

          return (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.4 }}
            >
              <Card className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-all duration-300 group cursor-pointer"
                onClick={() => navigate(rec.action.path)}
              >
                <CardContent className="p-0">
                  <div className="flex">
                    {/* Gradient Side Bar */}
                    <div
                      className={cn(
                        "w-2 shrink-0 bg-gradient-to-b",
                        rec.gradient
                      )}
                    />

                    <div className="flex-1 p-4">
                      <div className="flex items-start gap-3">
                        {/* Icon */}
                        <div
                          className={cn(
                            "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br text-white shadow-lg",
                            rec.gradient
                          )}
                        >
                          <Icon className="w-6 h-6" />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <Badge
                                  variant="secondary"
                                  className="text-xs px-2 py-0"
                                >
                                  {typeLabels[rec.type]}
                                </Badge>
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <TrendingUp className="w-3 h-3 text-success" />
                                  <span>{rec.score}% ملاءمة</span>
                                </div>
                              </div>
                              <h4 className="font-bold text-foreground group-hover:text-primary transition-colors">
                                {rec.title}
                              </h4>
                              <p className="text-sm text-muted-foreground mt-0.5 line-clamp-1">
                                {rec.description}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Star className="w-3 h-3 text-secondary" />
                              <span>{rec.reason}</span>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 text-xs gap-1 text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              {rec.action.label}
                              <ChevronLeft className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* AI Note */}
      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <Zap className="w-3 h-3" />
        <span>التوصيات مُحدّثة بناءً على أدائك وسلوكك</span>
      </div>
    </div>
  );
};

export default SmartRecommendations;
