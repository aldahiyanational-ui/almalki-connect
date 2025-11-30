import { useNavigate } from "react-router-dom";
import { LucideIcon } from "lucide-react";
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
        "flex items-center gap-4 p-4 rounded-2xl bg-card border border-border/50 shadow-md",
        "hover:shadow-lg hover:scale-[1.02] transition-all duration-300 text-right w-full",
        "animate-slide-up"
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shrink-0", color)}>
        <Icon className="w-6 h-6 text-primary-foreground" />
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-foreground">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </button>
  );
};

export default QuickAccessCard;
