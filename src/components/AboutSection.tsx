import { Award, Users, Lightbulb, Target, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Lightbulb,
    title: "طرق تعليمية مبتكرة",
    description: "نستخدم أحدث الأساليب التعليمية لجعل التعلم ممتعاً وفعالاً"
  },
  {
    icon: Users,
    title: "معلمون متخصصون",
    description: "فريق من أفضل المعلمين المتخصصين في مختلف المجالات"
  },
  {
    icon: Target,
    title: "بيئة تعليمية محفزة",
    description: "نوفر بيئة آمنة ومحفزة تدعم نمو الطلاب وإبداعهم"
  }
];

const AboutSection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 rounded-3xl" />
      
      <div className="relative bg-card/50 backdrop-blur-sm rounded-3xl border border-border/50 p-8 md:p-12">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-secondary/10 px-4 py-2 rounded-full mb-4">
            <Award className="w-5 h-5 text-secondary" />
            <span className="text-sm font-semibold text-secondary">عن المجموعة</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            خبرة أكثر من{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              25 عاماً
            </span>
            {" "}من النجاح
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            مدارس المالكي التعليمية... انضم إلينا لرحلة تعليمية ملهمة، حيث الإبداع يلتقي بالتكنولوجيا. 
            ابنِ مستقبلك وسط بيئة تعليمية محفزة ومعلمين متخصصين. انضم اليوم وابنِ طريقك نحو النجاح
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className={cn(
                  "group relative p-6 rounded-2xl",
                  "bg-gradient-to-br from-background to-muted/30",
                  "border border-border/50 hover:border-primary/30",
                  "hover:shadow-xl transition-all duration-500",
                  "animate-slide-up"
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-secondary/5 transition-all duration-500" />
                
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Quote */}
        <div className="mt-10 text-center">
          <div className="inline-flex items-start gap-3 p-6 rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
            <Sparkles className="w-6 h-6 text-secondary shrink-0 mt-1" />
            <p className="text-foreground/90 text-lg leading-relaxed max-w-2xl">
              يتمتع المعلم المتميز بالقدرة على إيجاد طرق تعليمية مبتكرة وإبداعية لجعل عملية التعلم ممتعة وفعالة
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
