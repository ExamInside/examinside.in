import React, { useRef } from 'react';
import {
  Flame,
  Moon,
  Sun,
  Bookmark,
  Sparkles,
  Languages,
  SlidersHorizontal,
  Lock,
} from 'lucide-react';
import {
  Medium,
  SyllabusSessionConfig,
  APP_NAME,
  AUTHOR_NAME,
} from '../data/curriculumData';

interface NavbarProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  medium: Medium;
  onSelectMedium: (m: Medium) => void;
  onOpenQuickTest: () => void;
  onOpenBookmarks: () => void;
  bookmarkCount: number;
  activeSection: string;
  onNavigateSection: (section: string) => void;
  session: SyllabusSessionConfig;
  showOwnerIcon?: boolean;
  isOwnerUnlocked?: boolean;
  onTriggerOwnerAdmin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  onToggleDarkMode,
  medium,
  onSelectMedium,
  onOpenQuickTest,
  onOpenBookmarks,
  bookmarkCount,
  activeSection,
  onNavigateSection,
  session,
  showOwnerIcon = false,
  isOwnerUnlocked = false,
  onTriggerOwnerAdmin,
}) => {
  const brandTapCountRef = useRef(0);
  const lastBrandTapRef = useRef(0);

  const handleBrandTap = () => {
    onNavigateSection('dashboard');
    if (!onTriggerOwnerAdmin) return;
    const now = Date.now();
    if (now - lastBrandTapRef.current > 1500) {
      brandTapCountRef.current = 1;
    } else {
      brandTapCountRef.current += 1;
    }
    lastBrandTapRef.current = now;
    if (brandTapCountRef.current >= 3) {
      brandTapCountRef.current = 0;
      onTriggerOwnerAdmin();
    }
  };
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-1.5 sm:gap-4 lg:gap-8 h-16">
          {/* Zone 1: ExamInside Brand Wordmark */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              type="button"
              onClick={handleBrandTap}
              className="flex items-center gap-2 sm:gap-2.5 group text-left cursor-pointer min-w-0"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform shrink-0">
                <Flame className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm sm:text-lg font-extrabold tracking-tight text-slate-900 dark:text-white whitespace-nowrap leading-tight truncate">
                  {APP_NAME}
                </span>
                <span className="text-[10px] sm:text-[11px] font-semibold text-amber-700 dark:text-amber-400 tracking-wide whitespace-nowrap truncate">
                  <span className="sm:hidden">By {AUTHOR_NAME} · {session.examYear}</span>
                  <span className="hidden sm:inline">By {AUTHOR_NAME} • UP Board {session.examYear}</span>
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Desktop Nav Links (single-line, whitespace-nowrap) */}
          <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-slate-600 dark:text-slate-300">
            <button
              type="button"
              onClick={() => onNavigateSection('dashboard')}
              className={`hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer ${
                activeSection === 'dashboard'
                  ? 'text-indigo-600 dark:text-indigo-400 font-bold'
                  : ''
              }`}
            >
              {medium === 'hindi' ? 'विषय डैशबोर्ड' : 'Subjects Hub'}
            </button>
            <button
              type="button"
              onClick={() => onNavigateSection('notes-vault')}
              className={`hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer ${
                activeSection === 'notes-vault'
                  ? 'text-indigo-600 dark:text-indigo-400 font-bold'
                  : ''
              }`}
            >
              {medium === 'hindi' ? 'रिपीट नोट्स व श्लोक' : 'Repeat Notes Vault'}
            </button>
            <button
              type="button"
              onClick={() => onNavigateSection('model-papers')}
              className={`hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer ${
                activeSection === 'model-papers'
                  ? 'text-indigo-600 dark:text-indigo-400 font-bold'
                  : ''
              }`}
            >
              {medium === 'hindi'
                ? `${session.shortRangeLabel} पेपर्स PDF`
                : `${session.shortRangeLabel} Papers PDF`}
            </button>
            <button
              type="button"
              onClick={() => onNavigateSection('biographies')}
              className={`hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer ${
                activeSection === 'biographies'
                  ? 'text-indigo-600 dark:text-indigo-400 font-bold'
                  : ''
              }`}
            >
              {medium === 'hindi' ? 'जीवन परिचय (80 शब्द)' : 'Biographies (80W)'}
            </button>
            <button
              type="button"
              onClick={() => onNavigateSection('exam-tips')}
              className={`hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer ${
                activeSection === 'exam-tips'
                  ? 'text-indigo-600 dark:text-indigo-400 font-bold'
                  : ''
              }`}
            >
              {medium === 'hindi' ? 'बोर्ड टिप्स' : 'Board Rules'}
            </button>
          </nav>

          {/* Zone 3: Quick Medium Toggle + Year/Syllabus Manager + Bookmarks + Theme + 400 MCQ CTA */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {/* Quick Language / Medium Toggle */}
            <button
              type="button"
              onClick={() => onSelectMedium(medium === 'hindi' ? 'english' : 'hindi')}
              aria-label="Toggle Medium between Hindi and English"
              title={
                medium === 'hindi'
                  ? 'Switch to English Medium'
                  : 'हिंदी माध्यम में बदलें'
              }
              className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-lg border border-amber-300 dark:border-amber-700/70 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 text-[11px] sm:text-xs font-bold hover:bg-amber-100 dark:hover:bg-amber-900/50 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Languages className="w-3.5 h-3.5" />
              <span>{medium === 'hindi' ? 'HI ⇄ EN' : 'EN ⇄ HI'}</span>
            </button>

            {/* Owner-Only Hidden Lock/Manager Icon (NEVER shown to normal students) */}
            {showOwnerIcon && onTriggerOwnerAdmin && (
              <button
                type="button"
                onClick={onTriggerOwnerAdmin}
                title={
                  isOwnerUnlocked
                    ? `Owner Admin Unlocked (${session.examYear}) — Click to Edit`
                    : 'Owner Admin Locked — Enter Password to Edit'
                }
                aria-label="Owner Admin & Year Switch"
                className={`relative p-1.5 sm:p-2 rounded-lg border transition-colors cursor-pointer shrink-0 ${
                  isOwnerUnlocked
                    ? 'border-emerald-300 dark:border-emerald-700/70 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/50'
                    : 'border-amber-300 dark:border-amber-700/70 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/50'
                }`}
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span
                  className={`absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full text-white flex items-center justify-center ${
                    isOwnerUnlocked ? 'bg-emerald-600' : 'bg-amber-600'
                  }`}
                >
                  <Lock className="w-2 h-2" />
                </span>
              </button>
            )}

            {/* Bookmarks quick button */}
            <button
              type="button"
              onClick={onOpenBookmarks}
              title="Saved Bookmarks"
              aria-label="View Saved Bookmarks"
              className="relative p-1.5 sm:p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <Bookmark className="w-4 h-4" />
              {bookmarkCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-amber-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {bookmarkCount}
                </span>
              )}
            </button>

            {/* Dark Mode Toggle */}
            <button
              type="button"
              onClick={onToggleDarkMode}
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="p-1.5 sm:p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              {darkMode ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>

            {/* Primary Action Button */}
            <button
              type="button"
              onClick={onOpenQuickTest}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{medium === 'hindi' ? '400+ MCQ टेस्ट' : '400+ MCQ Drill'}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
