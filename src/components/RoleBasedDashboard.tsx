import { useAuth } from '@/contexts/AuthContext';
import StudentDashboard from './dashboards/StudentDashboard';
import ParentDashboard from './dashboards/ParentDashboard';
import TeacherDashboard from './dashboards/TeacherDashboard';

const RoleBasedDashboard = () => {
  const { role, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  switch (role) {
    case 'student':
      return <StudentDashboard />;
    case 'teacher':
      return <TeacherDashboard />;
    case 'parent':
    default:
      return <ParentDashboard />;
  }
};

export default RoleBasedDashboard;
