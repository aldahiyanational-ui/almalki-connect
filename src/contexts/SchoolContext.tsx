import { createContext, useContext, ReactNode } from "react";

export interface School {
  id: string;
  name: string;
  nameEn: string;
  logo: string;
  color: string;
  description: string;
}

export const schools: Record<string, School> = {
  ajiyal: {
    id: "ajiyal",
    name: "مدارس أجيال المعالي الأهلية",
    nameEn: "Ajiyal Al-Maali Schools",
    logo: "🎓",
    color: "from-blue-500 to-purple-500",
    description: "نحو جيل متميز ومبدع",
  },
  qanadeeel: {
    id: "qanadeeel",
    name: "مدارس قناديل الشرق الأهلية",
    nameEn: "Qanadeel Al-Shark Schools",
    logo: "🏫",
    color: "from-green-500 to-teal-500",
    description: "إضاءة طريق التميز",
  },
  "dahiya-girls": {
    id: "dahiya-girls",
    name: "مدارس الضاحية الأهلية للبنات",
    nameEn: "Al-Daahiya Girls Schools",
    logo: "🌸",
    color: "from-pink-500 to-rose-500",
    description: "تعليم متميز للبنات",
  },
  "dahiya-boys": {
    id: "dahiya-boys",
    name: "مدارس الضاحية الأهلية للبنين",
    nameEn: "Al-Daahiya Boys Schools",
    logo: "⚡",
    color: "from-orange-500 to-red-500",
    description: "تعليم متميز للبنين",
  },
};

interface SchoolContextType {
  school: School | null;
}

const SchoolContext = createContext<SchoolContextType>({ school: null });

export const useSchool = () => useContext(SchoolContext);

export const SchoolProvider = ({ children, schoolId }: { children: ReactNode; schoolId: string }) => {
  const school = schools[schoolId] || null;

  return <SchoolContext.Provider value={{ school }}>{children}</SchoolContext.Provider>;
};
