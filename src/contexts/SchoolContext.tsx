import { createContext, useContext, ReactNode } from "react";
import logoDahiyaBoys from "@/assets/logo-dahiya-boys.png";
import logoDahiyaGirls from "@/assets/logo-dahiya-girls.png";
import logoAjiyal from "@/assets/logo-ajiyal.png";
import logoQanadeeel from "@/assets/logo-qanadeeel.png";

export interface School {
  id: string;
  name: string;
  nameEn: string;
  logo: string;
  color: string;
  description: string;
  address?: string;
  phone?: string;
}

export const schools: Record<string, School> = {
  "dahiya-boys": {
    id: "dahiya-boys",
    name: "مدارس الضاحية الأهلية للبنين",
    nameEn: "Al-Daahiya Boys Schools",
    logo: logoDahiyaBoys,
    color: "from-orange-500 to-red-500",
    description: "ابتدائي - متوسط - ثانوي",
    address: "حي الضباب",
    phone: "0508704443",
  },
  "dahiya-girls": {
    id: "dahiya-girls",
    name: "مدارس الضاحية الأهلية بنات",
    nameEn: "Al-Daahiya Girls Schools",
    logo: logoDahiyaGirls,
    color: "from-pink-500 to-rose-500",
    description: "رياض أطفال - ابتدائي - متوسط",
    address: "حي الضباب",
    phone: "0539893393",
  },
  ajiyal: {
    id: "ajiyal",
    name: "مدارس أجيال المعالي الأهلية",
    nameEn: "Ajiyal Al-Maali Schools",
    logo: logoAjiyal,
    color: "from-blue-500 to-purple-500",
    description: "رياض أطفال - ابتدائي - متوسط",
    address: "ضاحية الملك فهد",
    phone: "0558501166",
  },
  qanadeeel: {
    id: "qanadeeel",
    name: "مدارس قناديل الشرق الأهلية",
    nameEn: "Qanadeel Al-Shark Schools",
    logo: logoQanadeeel,
    color: "from-green-500 to-teal-500",
    description: "رياض أطفال - ابتدائي - متوسط",
    address: "حي الشعلة",
    phone: "0552229953",
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
