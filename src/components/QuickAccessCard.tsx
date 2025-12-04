import { useNavigate } from "react-router-dom";
import { LucideIcon, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuickAccessCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  path: string;
  color: string;
  delay?: number;
}

const QuickAccessCard = ({ icon: Icon, title, description, path, color, delay = 0 }: QuickAccessCardProps) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(path)}
      className={cn(
        "group relative flex items-center gap-4 p-5 rounded-3xl overflow-hidden",
        "bg-gradient-to-br from-card via-card to-muted/30",
        "border border-border/50 shadow-lg",
        "hover:shadow-2xl hover:scale-[1.02] hover:border-primary/30",
        "transition-all duration-500 ease-out text-right w-full",
        "animate-slide-up"
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Background glow effect */}
      <div className={cn(
        "absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-0",
        "group-hover:opacity-30 transition-opacity duration-500",
        color.replace("bg-", "bg-")
      )} />
      
      {/* Animated border gradient */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className={cn(
          "absolute inset-0 rounded-3xl",
          "bg-gradient-to-r from-transparent via-primary/10 to-transparent"
        )} />
      </div>

      {/* Icon container with animation */}
      <div className={cn(
        "relative w-14 h-14 rounded-2xl flex items-center justify-center shrink-0",
        "transition-all duration-500 group-hover:scale-110 group-hover:rotate-3",
        color
      )}>
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent" />
        <Icon className="w-7 h-7 text-primary-foreground relative z-10" />
        
        {/* Pulse effect */}
        <div className={cn(
          "absolute inset-0 rounded-2xl animate-ping opacity-0 group-hover:opacity-20",
          color
        )} />
      </div>

      {/* Content */}
      <div className="flex-1 relative z-10">
        <h4 className="font-bold text-foreground text-lg mb-1 group-hover:text-primary transition-colors">
          {title}
        </h4>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>

      {/* Arrow indicator */}
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted/50 group-hover:bg-primary/10 transition-all duration-300">
        <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:-translate-x-1 transition-all duration-300" />
      </div>
    </button>
  );
};

export default QuickAccessCard;
