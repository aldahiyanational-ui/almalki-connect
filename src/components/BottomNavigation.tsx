import { useNavigate, useLocation } from "react-router-dom";
import { Home, LayoutDashboard, Bell, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomNavigationProps {
  schoolId?: string;
}

const BottomNavigation = ({ schoolId }: BottomNavigationProps = {}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = schoolId
    ? [
        { icon: Home, label: "الرئيسية", path: "/" },
        { icon: LayoutDashboard, label: "لوحة التحكم", path: `/${schoolId}/dashboard` },
        { icon: Bell, label: "الإشعارات", path: `/${schoolId}/notifications` },
        { icon: MoreHorizontal, label: "المزيد", path: `/${schoolId}/settings` },
      ]
    : [
        { icon: Home, label: "الرئيسية", path: "/" },
        { icon: LayoutDashboard, label: "لوحة التحكم", path: "/dashboard" },
        { icon: Bell, label: "الإشعارات", path: "/notifications" },
        { icon: MoreHorizontal, label: "المزيد", path: "/more" },
      ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-lg border-t border-border/50 shadow-lg md:hidden">
      <div className="flex items-center justify-around py-2 px-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                "flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-all duration-300",
                isActive
                  ? "text-primary bg-accent"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className={cn("w-5 h-5", isActive && "scale-110")} />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;
