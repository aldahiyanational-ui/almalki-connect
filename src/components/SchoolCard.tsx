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
  delay?: number;
}

const SchoolCard = ({ id, name, description, color, students, location, delay = 0 }: SchoolCardProps) => {
  const navigate = useNavigate();

  return (
    <Card
      variant="school"
      className="overflow-hidden animate-slide-up"
      style={{ animationDelay: `${delay}ms` }}
      onClick={() => navigate(`/school/${id}`)}
    >
      {/* Color bar */}
      <div className={`h-2 ${color}`} />
      
      <CardContent className="p-6">
        {/* School icon placeholder */}
        <div className={`w-16 h-16 ${color} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
          <span className="text-2xl font-bold text-primary-foreground">
            {name.charAt(0)}
          </span>
        </div>

        <h3 className="text-lg font-bold text-foreground mb-2">{name}</h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{description}</p>

        {/* Stats */}
        <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{students}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
        </div>

        <Button variant="outline" className="w-full group">
          دخول المدرسة
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default SchoolCard;
