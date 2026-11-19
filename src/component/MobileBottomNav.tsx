import React from 'react';
import {
  Home,
  BookOpen,
  GraduationCap,
  HelpCircle,
  StickyNote,
  FileSpreadsheet,
} from 'lucide-react';
import { ClassLevel, Medium, SyllabusSessionConfig } from '../data/curriculumData';

interface MobileBottomNavProps {
  medium: Medium;
  selectedClass: ClassLevel;
  session: SyllabusSessionConfig;
  activeTabKey: 'home' | '10' | '12' | 'mcqs' | 'notes' | 'papers';
  onSelectHome: () => void;
  onSelectClass10: () => void;
  onSelectClass12: () => void;
  onOpenMcqs: () => void;
  onOpenNotes: () => void;
  onOpenPapers: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  medium,
  selectedClass,
  session,
  activeTabKey,
  onSelectHome,
  onSelectClass10,
  onSelectClass12,
  onOpenMcqs,
  onOpenNotes,
  onOpenPapers,
}) => {
  const items = [
    {
      key: 'home' as const,
      label: medium === 'hindi' ? 'होम' : 'Home',
      icon: Home,
      onClick: onSelectHome,
      active: activeTabKey === 'home',
    },
    {
      key: '10' as const,
      label: '10th',
      icon: BookOpen,
      onClick: onSelectClass10,
      active: activeTabKey === '10' || (activeTabKey === 'home' && selectedClass === '10'),
    },
    {
      key: '12' as const,
      label: '12th',
      icon: GraduationCap,
      onClick: onSelectClass12,
      active: activeTabKey === '12' || (activeTabKey === 'home' && selectedClass === '12'),
    },
    {
      key: 'mcqs' as const,
      label: '400 MCQ',
      icon: HelpCircle,
      onClick: onOpenMcqs,
      active: activeTabKey === 'mcqs',
    },
    {
      key: 'notes' as const,
      label: medium === 'hindi' ? 'नोट्स' : 'Notes',
      icon: StickyNote,
      onClick: onOpenNotes,
      active: activeTabKey === 'notes',
    },
    {
      key: 'papers' as const,
      label: `${session.compactNavRange} PDF`,
      icon: FileSpreadsheet,
      onClick: onOpenPapers,
      active: activeTabKey === 'papers',
    },
  ];

  return (
    <nav
      aria-label="Quick Mobile Navigation"
      className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 shadow-[0_-4px_20px_rgba(15,23,42,0.08)]"
    >
      <div className="grid grid-cols-6 max-w-2xl mx-auto">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.key}
              type="button"
              onClick={item.onClick}
              className={`flex flex-col items-center justify-center py-2 px-1 gap-0.5 text-[10px] font-bold transition-colors cursor-pointer ${
                item.active
                  ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/70 dark:bg-indigo-950/40'
                  : 'text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-300'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="whitespace-nowrap">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
