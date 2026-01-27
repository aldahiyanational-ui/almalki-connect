-- إضافة سياسات التعديل والحذف للجداول

-- student_performance: UPDATE
CREATE POLICY "Parents can update student performance"
ON public.student_performance
FOR UPDATE
USING (EXISTS (
  SELECT 1 FROM students
  WHERE students.id = student_performance.student_id
    AND students.user_id = auth.uid()
));

-- student_performance: DELETE
CREATE POLICY "Parents can delete student performance"
ON public.student_performance
FOR DELETE
USING (EXISTS (
  SELECT 1 FROM students
  WHERE students.id = student_performance.student_id
    AND students.user_id = auth.uid()
));

-- subject_grades: UPDATE
CREATE POLICY "Parents can update subject grades"
ON public.subject_grades
FOR UPDATE
USING (EXISTS (
  SELECT 1 FROM students
  WHERE students.id = subject_grades.student_id
    AND students.user_id = auth.uid()
));

-- subject_grades: DELETE
CREATE POLICY "Parents can delete subject grades"
ON public.subject_grades
FOR DELETE
USING (EXISTS (
  SELECT 1 FROM students
  WHERE students.id = subject_grades.student_id
    AND students.user_id = auth.uid()
));

-- student_skills: UPDATE
CREATE POLICY "Parents can update student skills"
ON public.student_skills
FOR UPDATE
USING (EXISTS (
  SELECT 1 FROM students
  WHERE students.id = student_skills.student_id
    AND students.user_id = auth.uid()
));

-- student_skills: DELETE
CREATE POLICY "Parents can delete student skills"
ON public.student_skills
FOR DELETE
USING (EXISTS (
  SELECT 1 FROM students
  WHERE students.id = student_skills.student_id
    AND students.user_id = auth.uid()
));

-- study_time: UPDATE
CREATE POLICY "Parents can update study time"
ON public.study_time
FOR UPDATE
USING (EXISTS (
  SELECT 1 FROM students
  WHERE students.id = study_time.student_id
    AND students.user_id = auth.uid()
));

-- study_time: DELETE
CREATE POLICY "Parents can delete study time"
ON public.study_time
FOR DELETE
USING (EXISTS (
  SELECT 1 FROM students
  WHERE students.id = study_time.student_id
    AND students.user_id = auth.uid()
));