import React from 'react';
import { Search, X, Languages } from 'lucide-react';
import { Medium, ClassLevel } from '../data/curriculumData';

interface ControlsBarProps {
  medium: Medium;
  onSelectMedium: (m: Medium) => void;
  selectedClass: ClassLevel;
  onSelectClass: (c: ClassLevel) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  filteredCount: number;
}

export const ControlsBar: React.FC<ControlsBarProps> = ({
  medium,
  onSelectMedium,
  selectedClass,
  onSelectClass,
  searchQuery,
  onSearchChange,
  filteredCount,
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors py-3.5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-3.5">
        {/* Left side: Class and Dual Medium Segmented Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Class Selection */}
          <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200/80 dark:border-slate-700/80">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 px-2 py-1 uppercase tracking-wider">
              {medium === 'hindi' ? 'कक्षा:' : 'Class:'}
            </span>
            <button
              type="button"
              onClick={() => onSelectClass('10')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                selectedClass === '10'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white'
              }`}
            >
              {medium === 'hindi' ? 'कक्षा 10वीं (10th)' : 'Class 10th'}
            </button>
            <button
              type="button"
              onClick={() => onSelectClass('12')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                selectedClass === '12'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white'
              }`}
            >
              {medium === 'hindi' ? 'कक्षा 12वीं (12th)' : 'Class 12th'}
            </button>
          </div>

          {/* Dual Medium Selection */}
          <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200/80 dark:border-slate-700/80">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 px-2 py-1 uppercase tracking-wider flex items-center gap-1">
              <Languages className="w-3 h-3" />
              {medium === 'hindi' ? 'माध्यम:' : 'Medium:'}
            </span>
            <button
              type="button"
              onClick={() => onSelectMedium('hindi')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                medium === 'hindi'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-white'
              }`}
            >
              हिंदी माध्यम
            </button>
            <button
              type="button"
              onClick={() => onSelectMedium('english')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                medium === 'english'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-white'
              }`}
            >
              English Medium
            </button>
          </div>

          {medium === 'english' && (
            <span className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/50">
              English Medium Active (Hindi Subject Stays in Hindi)
            </span>
          )}
        </div>

        {/* Right side: Deep Topic & Chapter Search */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={
                medium === 'hindi'
                  ? 'टॉपिक खोजें (जैसे Thales, सूरदास, Lencho, ओम नियम)...'
                  : 'Search topic or chapter (Thales, Lencho, Gauss, Ohm)...'
              }
              className="w-full pl-9 pr-8 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5 rounded cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>
              {filteredCount} {medium === 'hindi' ? 'विषय' : 'Subjects'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
