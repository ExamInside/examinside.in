import React, { useState } from 'react';
import {
  BookOpen,
  Languages,
  Calculator,
  Atom,
  Globe,
  Palette,
  Zap,
  FlaskConical,
  Dna,
  FileText,
  HelpCircle,
  ScrollText,
  FileSpreadsheet,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Bookmark,
  Layers,
} from 'lucide-react';
import {
  SubjectItem,
  Medium,
  ResourceType,
  ChapterEntry,
  SyllabusSessionConfig,
} from '../data/curriculumData';
import { getEffectiveSubjectMedium } from '../utils/examLogic';

interface SubjectCardProps {
  subject: SubjectItem;
  session: SyllabusSessionConfig;
  medium: Medium;
  onOpenResource: (
    subject: SubjectItem,
    resource: ResourceType,
    initialChapter?: ChapterEntry
  ) => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  BookOpen,
  Languages,
  Calculator,
  Atom,
  Globe,
  Palette,
  Zap,
  FlaskConical,
  Dna,
};

export const SubjectCard: React.FC<SubjectCardProps> = ({
  subject,
  session,
  medium,
  onOpenResource,
  isBookmarked,
  onToggleBookmark,
}) => {
  const [chaptersExpanded, setChaptersExpanded] = useState(false);
  const IconComponent = ICON_MAP[subject.iconName] || BookOpen;
  const effMedium = getEffectiveSubjectMedium(subject, medium);
  const previewChapters = chaptersExpanded
    ? subject.chapterDetails
    : subject.chapterDetails.slice(0, 4);

  return (
    <div className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 flex flex-col justify-between overflow-hidden">
      {/* Header & Syllabus Summary */}
      <div className="p-5 pb-3.5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-950/40 group-hover:scale-105 transition-all shrink-0">
              <IconComponent className="w-6 h-6" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  Code {subject.code}
                </span>
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                  {effMedium === 'hindi'
                    ? `कक्षा ${subject.classLevel === '10' ? '10वीं' : '12वीं'}`
                    : `Class ${subject.classLevel}th`}
                </span>
                {subject.isHindiLanguageSubject && medium === 'english' && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-100 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300">
                    Hindi Medium Fixed
                  </span>
                )}
              </div>

              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight mt-0.5 leading-snug">
                {effMedium === 'hindi' ? subject.nameHi : subject.nameEn}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onToggleBookmark(subject.id)}
            title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Subject'}
            aria-label={`Bookmark ${subject.nameEn}`}
            className={`p-2 rounded-lg transition-colors cursor-pointer shrink-0 ${
              isBookmarked
                ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/30'
                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500' : ''}`} />
          </button>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 min-h-[32px]">
          {effMedium === 'hindi' ? subject.taglineHi : subject.taglineEn}
        </p>

        {/* Stats Strip */}
        <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] font-semibold text-slate-500 dark:text-slate-400">
          <span>
            {subject.chaptersCount} {effMedium === 'hindi' ? 'पूर्ण अध्याय' : 'Chapters'}
          </span>
          <span>·</span>
          <span>{subject.totalMcqsCount} MCQs</span>
          <span>·</span>
          <span>
            {session.shortRangeLabel} PDF ({subject.solvedPapers.length} Sets)
          </span>
        </div>

        {/* Line-by-Line Clickable Chapters List */}
        <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              {effMedium === 'hindi'
                ? 'क्रमवार अध्याय (क्लिक कर 50 प्रश्न पढ़ें):'
                : 'Line-by-Line Chapters (Tap for 50 Qs):'}
            </span>
            <button
              type="button"
              onClick={() => setChaptersExpanded(!chaptersExpanded)}
              className="text-[11px] font-bold text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-0.5 cursor-pointer"
            >
              <span>
                {chaptersExpanded
                  ? effMedium === 'hindi'
                    ? 'कम दिखाएं'
                    : 'Collapse'
                  : effMedium === 'hindi'
                  ? `सभी ${subject.chaptersCount} देखें`
                  : `View All ${subject.chaptersCount}`}
              </span>
              {chaptersExpanded ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          <div
            className={`space-y-1 ${
              chaptersExpanded ? 'max-h-56 overflow-y-auto pr-1' : ''
            }`}
          >
            {previewChapters.map((ch) => (
              <button
                key={ch.id}
                type="button"
                onClick={() => onOpenResource(subject, 'chapters', ch)}
                className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 border border-slate-200/70 dark:border-slate-700/60 text-left transition-colors cursor-pointer group/ch"
              >
                <span className="text-[11px] font-medium text-slate-700 dark:text-slate-200 group-hover/ch:text-indigo-600 dark:group-hover/ch:text-indigo-300 truncate pr-2">
                  <span className="font-bold text-indigo-600 dark:text-indigo-400 mr-1">
                    {ch.number}.
                  </span>
                  {effMedium === 'hindi' ? ch.titleHi : ch.titleEn}
                </span>
                <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 shrink-0">
                  50 Qs →
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons Suite */}
      <div className="p-4 pt-2 space-y-1.5 bg-slate-50/70 dark:bg-slate-950/30 border-t border-slate-100 dark:border-slate-800">
        {/* Chapters & 50 Qs/Ch Primary Button */}
        <button
          type="button"
          onClick={() => onOpenResource(subject, 'chapters')}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-left transition-all cursor-pointer shadow-sm"
        >
          <div className="flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 shrink-0" />
            <span className="text-xs font-bold">
              {effMedium === 'hindi'
                ? `सभी ${subject.chaptersCount} अध्याय व 50 प्रश्न/अध्याय`
                : `All ${subject.chaptersCount} Chapters & 50 Qs/Ch`}
            </span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
        </button>

        {/* 400+ MCQs */}
        <button
          type="button"
          onClick={() => onOpenResource(subject, 'mcqs')}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-white dark:bg-slate-800/90 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 border border-slate-200/90 dark:border-slate-700/80 text-left transition-all group/btn cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 flex items-center justify-center shrink-0">
              <HelpCircle className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover/btn:text-indigo-600 dark:group-hover/btn:text-indigo-400">
              400+ MCQs
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400 group-hover/btn:text-indigo-500">
            <span className="text-[11px] font-medium">
              {effMedium === 'hindi' ? 'Q1–400 अभ्यास' : 'Q1–400 Drill'}
            </span>
            <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </div>
        </button>

        {/* Important Questions */}
        <button
          type="button"
          onClick={() => onOpenResource(subject, 'important_questions')}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-white dark:bg-slate-800/90 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border border-slate-200/90 dark:border-slate-700/80 text-left transition-all group/btn cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0">
              <FileText className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover/btn:text-emerald-600 dark:group-hover/btn:text-emerald-400">
              {effMedium === 'hindi' ? 'Important Questions' : 'Important Questions'}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400 group-hover/btn:text-emerald-500">
            <span className="text-[11px] font-medium">2–8 Marks</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </div>
        </button>

        {/* Biographies / Poems */}
        <button
          type="button"
          onClick={() => onOpenResource(subject, 'biographies')}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-white dark:bg-slate-800/90 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-slate-200/90 dark:border-slate-700/80 text-left transition-all group/btn cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300 flex items-center justify-center shrink-0">
              <ScrollText className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover/btn:text-rose-600 dark:group-hover/btn:text-rose-400">
              {effMedium === 'hindi'
                ? 'Biographies व श्लोक/कविता'
                : 'Biographies & Poems'}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400 group-hover/btn:text-rose-500">
            <span className="text-[11px] font-medium">80 Words</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </div>
        </button>

        {/* 2024–2026 Solved Papers PDF */}
        <button
          type="button"
          onClick={() => onOpenResource(subject, 'solved_papers')}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-white dark:bg-slate-800/90 hover:bg-amber-50 dark:hover:bg-amber-950/40 border border-slate-200/90 dark:border-slate-700/80 text-left transition-all group/btn cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0">
              <FileSpreadsheet className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover/btn:text-amber-600 dark:group-hover/btn:text-amber-400">
              {subject.solvedPapers.length}-Year Solved Papers PDF
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400 group-hover/btn:text-amber-500">
            <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400">
              {session.shortRangeLabel}
            </span>
            <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </div>
        </button>
      </div>
    </div>
  );
};
