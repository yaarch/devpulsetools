const fs = require('fs');

const f = `import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Plus, Trash2, Calculator, RotateCcw } from 'lucide-react';

interface Course {
  id: string;
  name: string;
  credits: number;
  grade: string;
}

const GRADE_POINTS: Record<string, number> = {
  'A+': 4.0, 'A': 4.0, 'A-': 3.7,
  'B+': 3.3, 'B': 3.0, 'B-': 2.7,
  'C+': 2.3, 'C': 2.0, 'C-': 1.7,
  'D+': 1.3, 'D': 1.0, 'F': 0.0
};

export const GpaCalculator: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([
    { id: '1', name: 'Course 1', credits: 3, grade: 'A' },
    { id: '2', name: 'Course 2', credits: 3, grade: 'B' },
  ]);

  const addCourse = () => {
    setCourses([...courses, { id: Math.random().toString(), name: \`Course \${courses.length + 1}\`, credits: 3, grade: 'A' }]);
  };

  const removeCourse = (id: string) => {
    if (courses.length > 1) {
      setCourses(courses.filter(c => c.id !== id));
    }
  };

  const updateCourse = (id: string, field: keyof Course, value: any) => {
    setCourses(courses.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const calculateGPA = () => {
    let totalCredits = 0;
    let totalPoints = 0;

    courses.forEach(course => {
      const credits = Number(course.credits);
      if (!isNaN(credits) && credits > 0 && course.grade) {
        totalCredits += credits;
        totalPoints += credits * (GRADE_POINTS[course.grade] ?? 0);
      }
    });

    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';
  };

  const reset = () => {
    setCourses([
      { id: '1', name: 'Course 1', credits: 3, grade: 'A' },
      { id: '2', name: 'Course 2', credits: 3, grade: 'B' },
    ]);
  };

  const currentGPA = calculateGPA();

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
      <div className="bg-indigo-600 rounded-2xl p-6 sm:p-8 text-center text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Calculator className="w-32 h-32" />
        </div>
        <p className="text-indigo-200 text-sm sm:text-base font-medium mb-2">Cumulative GPA</p>
        <h2 className="text-5xl sm:text-7xl font-extrabold tracking-tight">{currentGPA}</h2>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">Courses</h3>
          <div className="flex gap-2">
            <button onClick={reset} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-lg transition-colors">
              <RotateCcw className="w-4 h-4" />
            </button>
            <button onClick={addCourse} className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-colors font-medium text-sm">
              <Plus className="w-4 h-4" /> Add Course
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-6 space-y-4">
          <div className="hidden sm:grid grid-cols-12 gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-2">
            <div className="col-span-5">Course Name</div>
            <div className="col-span-3">Credits</div>
            <div className="col-span-3">Grade</div>
            <div className="col-span-1 text-center">Action</div>
          </div>

          {courses.map((course) => (
            <div key={course.id} className="flex flex-col sm:grid sm:grid-cols-12 gap-3 sm:gap-4 items-center bg-slate-50 dark:bg-slate-800/50 p-3 sm:p-2 rounded-xl border border-slate-100 dark:border-slate-800 sm:border-transparent">
              <div className="col-span-5 w-full">
                <input
                  type="text"
                  value={course.name}
                  onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100"
                  placeholder="e.g. Math 101"
                />
              </div>
              <div className="col-span-3 w-full flex items-center gap-2">
                <span className="sm:hidden text-xs font-medium text-slate-500 w-16">Credits:</span>
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  value={course.credits}
                  onChange={(e) => updateCourse(course.id, 'credits', e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100"
                />
              </div>
              <div className="col-span-3 w-full flex items-center gap-2">
                <span className="sm:hidden text-xs font-medium text-slate-500 w-16">Grade:</span>
                <select
                  value={course.grade}
                  onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100"
                >
                  {Object.keys(GRADE_POINTS).map(grade => (
                    <option key={grade} value={grade}>{grade}</option>
                  ))}
                </select>
              </div>
              <div className="col-span-1 w-full sm:w-auto flex justify-end sm:justify-center">
                <button
                  onClick={() => removeCourse(course.id)}
                  disabled={courses.length <= 1}
                  className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
`;
fs.writeFileSync('src/components/tools/GpaCalculator.tsx', f);
