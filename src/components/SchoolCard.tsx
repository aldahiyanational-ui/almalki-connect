import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Users } from "lucide-react";

interface SchoolCardProps {
  id: string;
  name: string;
  description: string;
  color: string;
  students: string;
  location: string;
  logo: string;
  delay?: number;
}

const SchoolCard = ({ id, name, description, color, students, location, logo, delay = 0 }: SchoolCardProps) => {
  const navigate = useNavigate();

  return (
    <Card
      variant="school"
      className="group overflow-hidden animate-slide-up cursor-pointer hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
      style={{ animationDelay: `${delay}ms` }}
      onClick={() => navigate(`/${id}/dashboard`)}
    >
      {/* Gradient color bar with animation */}
      <div className={`h-2 bg-gradient-to-r ${color} group-hover:h-3 transition-all duration-300`} />
      
      <CardContent className="p-5">
        {/* School Logo */}
        <div className="relative mb-4">
          <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-10 rounded-2xl blur-xl group-hover:opacity-20 transition-opacity`} />
          <div className="relative w-20 h-20 mx-auto rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 bg-white p-2">
            <img 
              src={logo} 
              alt={name} 
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <h3 className="text-lg font-bold text-foreground mb-2 text-center group-hover:text-primary transition-colors">{name}</h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 text-center">{description}</p>

        {/* Stats */}
        <div className="flex items-center justify-center gap-4 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1 bg-muted/50 px-2 py-1 rounded-full">
            <Users className="w-3.5 h-3.5" />
            <span>{students}</span>
          </div>
          <div className="flex items-center gap-1 bg-muted/50 px-2 py-1 rounded-full">
            <MapPin className="w-3.5 h-3.5" />
            <span>{location}</span>
          </div>
        </div>

        <Button 
          variant="outline" 
          className={`w-full group/btn border-2 hover:bg-gradient-to-r hover:${color} hover:text-white hover:border-transparent transition-all duration-300`}
        >
          دخول المدرسة
          <ArrowLeft className="w-4 h-4 mr-2 group-hover/btn:-translate-x-1 transition-transform" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default SchoolCard;
