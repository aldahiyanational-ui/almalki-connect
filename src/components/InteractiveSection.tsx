import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface InteractiveSectionProps {
  title: string;
  description: string;
  icon: LucideIcon;
  image: string;
  path: string;
  color: string;
  delay?: number;
}

const InteractiveSection = ({
  title,
  description,
  icon: Icon,
  image,
  path,
  color,
  delay = 0,
}: InteractiveSectionProps) => {
  return (
    <Link to={path}>
      <div
        className="group relative overflow-hidden rounded-2xl bg-card border border-border/50 shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer animate-slide-up"
        style={{ animationDelay: `${delay}ms` }}
      >
        {/* Background Image */}
        <div className="relative h-40 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${color} opacity-60 group-hover:opacity-70 transition-opacity`} />
          
          {/* Floating Icon */}
          <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
            <Icon className="w-6 h-6 text-white" />
          </div>

          {/* Animated Student Image */}
          <div className="absolute bottom-0 left-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
            <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border-2 border-white/30 overflow-hidden">
              <img
                src={image}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>

          {/* Interactive Arrow */}
          <div className="mt-3 flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
            <span className="text-sm font-medium">اكتشف المزيد</span>
            <svg
              className="w-4 h-4 rotate-180 animate-pulse"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </div>

        {/* Hover Glow Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute top-0 left-1/2 w-32 h-32 bg-primary/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        </div>
      </div>
    </Link>
  );
};

export default InteractiveSection;
