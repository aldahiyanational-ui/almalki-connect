-- Create students table to link students to parents
CREATE TABLE public.students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL, -- parent's user_id
  name TEXT NOT NULL,
  grade TEXT NOT NULL,
  school_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create student performance table for monthly grades
CREATE TABLE public.student_performance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE NOT NULL,
  month TEXT NOT NULL,
  average_grade DECIMAL(5,2) NOT NULL,
  attendance_rate DECIMAL(5,2) DEFAULT 100,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create subject grades table
CREATE TABLE public.subject_grades (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE NOT NULL,
  subject TEXT NOT NULL,
  grade DECIMAL(5,2) NOT NULL,
  semester TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create skills evaluation table
CREATE TABLE public.student_skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE NOT NULL,
  skill_name TEXT NOT NULL,
  score INTEGER NOT NULL CHECK (score >= 0 AND score <= 100),
  full_score INTEGER DEFAULT 100,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create study time distribution table
CREATE TABLE public.study_time (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE NOT NULL,
  activity TEXT NOT NULL,
  hours DECIMAL(5,2) NOT NULL,
  week_start DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS on all tables
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_performance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subject_grades ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_time ENABLE ROW LEVEL SECURITY;

-- RLS policies for students table (parents can view their own students)
CREATE POLICY "Parents can view their own students"
ON public.students FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Parents can insert their own students"
ON public.students FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Parents can update their own students"
ON public.students FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Parents can delete their own students"
ON public.students FOR DELETE
USING (auth.uid() = user_id);

-- RLS policies for student_performance (access through students table)
CREATE POLICY "Parents can view student performance"
ON public.student_performance FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.students
    WHERE students.id = student_performance.student_id
    AND students.user_id = auth.uid()
  )
);

CREATE POLICY "Parents can insert student performance"
ON public.student_performance FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.students
    WHERE students.id = student_performance.student_id
    AND students.user_id = auth.uid()
  )
);

-- RLS policies for subject_grades
CREATE POLICY "Parents can view subject grades"
ON public.subject_grades FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.students
    WHERE students.id = subject_grades.student_id
    AND students.user_id = auth.uid()
  )
);

CREATE POLICY "Parents can insert subject grades"
ON public.subject_grades FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.students
    WHERE students.id = subject_grades.student_id
    AND students.user_id = auth.uid()
  )
);

-- RLS policies for student_skills
CREATE POLICY "Parents can view student skills"
ON public.student_skills FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.students
    WHERE students.id = student_skills.student_id
    AND students.user_id = auth.uid()
  )
);

CREATE POLICY "Parents can insert student skills"
ON public.student_skills FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.students
    WHERE students.id = student_skills.student_id
    AND students.user_id = auth.uid()
  )
);

-- RLS policies for study_time
CREATE POLICY "Parents can view study time"
ON public.study_time FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.students
    WHERE students.id = study_time.student_id
    AND students.user_id = auth.uid()
  )
);

CREATE POLICY "Parents can insert study time"
ON public.study_time FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.students
    WHERE students.id = study_time.student_id
    AND students.user_id = auth.uid()
  )
);

-- Add triggers for updated_at
CREATE TRIGGER update_students_updated_at
BEFORE UPDATE ON public.students
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();