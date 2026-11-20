import React from 'react';
import {
  BookOpen,
  FileCheck2,
  ScrollText,
  FileSpreadsheet,
  ShieldCheck,
  Sparkles,
  CheckCircle,
} from 'lucide-react';
import {
  Medium,
  ClassLevel,
  SubjectItem,
  SyllabusSessionConfig,
  AUTHOR_NAME,
  APP_NAME,
} from '../data/curriculumData';
import { getClassAggregateMetrics } from '../utils/examLogic';

interface HeroSectionProps {
  subjects: SubjectItem[];
  session: SyllabusSessionConfig;
  medium: Medium;
  selectedClass: ClassLevel;
  onExploreSubject: () => void;
  onQuickMcq: () => void;
  onNavigateSection: (section: string) => void;
  isOwnerAdmin?: boolean;
  onOpenOwnerAdmin?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  subjects,
  session,
  medium,
  selectedClass,
  onExploreSubject,
  onQuickMcq,
  onNavigateSection,
  isOwnerAdmin = false,
  onOpenOwnerAdmin,
}) => {
  const metrics = getClassAggregateMetrics(subjects, selectedClass);

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-indigo-950 via-slate-900 to-slate-950 text-white border-b border-slate-800">
      {/* Subtle ambient depth */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-500 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Hero Copy */}
          <div className="lg:col-span-8 space-y-5">
            <div className="inline-flex flex-wrap items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/15 border border-indigo-400/25 text-indigo-200 text-xs font-medium">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>UPMSP {session.sessionLabel} Revised Syllabus</span>
              <span className="text-slate-400">·</span>
              <span className="text-amber-300 font-bold">Author: {AUTHOR_NAME}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {medium === 'hindi' ? (
                <>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-white">
                    {APP_NAME}
                  </span>
                  : यूपी बोर्ड {selectedClass === '10' ? '10वीं' : '12वीं'} संपूर्ण परीक्षा तैयारी
                </>
              ) : (
                <>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-white">
                    {APP_NAME}
                  </span>
                  : UP Board Class {selectedClass}th Dual-Medium Suite
                </>
              )}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              {medium === 'hindi'
                ? `${AUTHOR_NAME} द्वारा तैयार UPMSP ${session.examYear} का 100% पूर्ण पाठ्यक्रम (${metrics.totalChapters} अध्याय — एक भी अध्याय कम नहीं)। प्रत्येक विषय में लगातार 400 MCQs अभ्यास, हर अध्याय के 50+ रिपीट प्रश्न व ${session.shortRangeLabel} हल पेपर्स PDF।`
                : `Curated by ${AUTHOR_NAME} with 100% complete UPMSP ${session.sessionLabel} chapters (${metrics.totalChapters} chapters mapped, zero skipped). Includes continuous 400-MCQ drills per subject, 50+ repeated questions per chapter, and ${session.shortRangeLabel} Solved Papers PDF.`}
            </p>

            {/* 4 Clickable Quick Feature Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
              <button
                type="button"
                onClick={onQuickMcq}
                className="p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/70 hover:border-indigo-400/60 backdrop-blur-sm text-left transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2 text-indigo-400 mb-1">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-xs font-bold text-slate-100">400+ MCQs</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  {medium === 'hindi'
                    ? `${metrics.totalMcqs} लाइव OMR प्रश्न`
                    : `${metrics.totalMcqs} Live OMR Qs`}
                </p>
              </button>

              <button
                type="button"
                onClick={onExploreSubject}
                className="p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/70 hover:border-emerald-400/60 backdrop-blur-sm text-left transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2 text-emerald-400 mb-1">
                  <FileCheck2 className="w-4 h-4" />
                  <span className="text-xs font-bold text-slate-100">50 Qs / Chapter</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  {medium === 'hindi'
                    ? `${metrics.totalChapters} पूर्ण अध्याय`
                    : `${metrics.totalChapters} Complete Chapters`}
                </p>
              </button>

              <button
                type="button"
                onClick={() => onNavigateSection('notes-vault')}
                className="p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/70 hover:border-rose-400/60 backdrop-blur-sm text-left transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2 text-rose-400 mb-1">
                  <ScrollText className="w-4 h-4" />
                  <span className="text-xs font-bold text-slate-100">Notes & Poems</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  {medium === 'hindi'
                    ? '3-4 साल रिपीट वॉल्ट'
                    : '3-4 Yr Repeat Vault'}
                </p>
              </button>

              <button
                type="button"
                onClick={() => onNavigateSection('model-papers')}
                className="p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/70 hover:border-amber-400/60 backdrop-blur-sm text-left transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2 text-amber-400 mb-1">
                  <FileSpreadsheet className="w-4 h-4" />
                  <span className="text-xs font-bold text-slate-100">{session.shortRangeLabel} PDFs</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  {medium === 'hindi'
                    ? `${metrics.totalSolvedPapers} बोर्ड हल सेट्स`
                    : `${metrics.totalSolvedPapers} Official Paper Sets`}
                </p>
              </button>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={onExploreSubject}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all cursor-pointer flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                <span>
                  {medium === 'hindi'
                    ? `कक्षा ${selectedClass === '10' ? '10वीं' : '12वीं'} के 6 विषय व अध्याय देखें`
                    : `Explore Class ${selectedClass}th All 6 Subjects`}
                </span>
              </button>

              <button
                type="button"
                onClick={onQuickMcq}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold text-sm border border-slate-700 transition-colors cursor-pointer flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>
                  {medium === 'hindi'
                    ? '400+ MCQ लगातार अभ्यास'
                    : 'Start 400+ Non-Stop MCQs'}
                </span>
              </button>
            </div>
          </div>

          {/* Side Exam Blueprint Card */}
          <div className="lg:col-span-4">
            <div className="rounded-2xl p-5 bg-gradient-to-br from-slate-800/90 to-slate-900/95 border border-slate-700 shadow-xl backdrop-blur-md space-y-3">
              <div className="flex items-center justify-between border-b border-slate-700/80 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  {APP_NAME} Blueprint Desk
                </span>
                {isOwnerAdmin && onOpenOwnerAdmin ? (
                  <button
                    type="button"
                    onClick={onOpenOwnerAdmin}
                    title="Owner: 1-Click Year & Syllabus Update"
                    className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 whitespace-nowrap shrink-0 cursor-pointer transition-colors"
                  >
                    Class {selectedClass}th · {session.examYear} ⇄
                  </button>
                ) : (
                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 whitespace-nowrap shrink-0">
                    Class {selectedClass}th · {session.examYear}
                  </span>
                )}
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="text-[11px] text-slate-400">
                  {medium === 'hindi' ? 'कुल संकलित अध्याय (Complete Chapters)' : 'Complete Mapped Chapters'}
                </div>
                <div className="text-sm font-bold text-white mt-0.5">
                  {metrics.totalChapters} {medium === 'hindi' ? 'अध्याय (Zero Missing)' : 'Chapters (Zero Missing)'} · {metrics.totalImpQuestions}+ Q&A
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="text-[11px] text-slate-400">
                  {medium === 'hindi' ? 'अंक पैटर्न व पेपर सेट्स' : 'UPMSP Marking & Paper Archive'}
                </div>
                <div className="text-sm font-bold text-emerald-400 mt-0.5">
                  {selectedClass === '10'
                    ? `20 OMR + 50 Written · ${session.shortRangeLabel} PDFs`
                    : `70/100 Marks Pattern · ${session.shortRangeLabel} PDFs`}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-indigo-950/50 border border-indigo-800/60">
                <div className="text-xs text-indigo-300 mb-1 font-bold">
                  {AUTHOR_NAME} Topper Rule:
                </div>
                <p className="text-xs text-slate-300 italic leading-snug">
                  {medium === 'hindi'
                    ? `"किसी भी अध्याय पर क्लिक करें → 50 महत्वपूर्ण प्रश्न पढ़ें → 400 MCQs व ${session.shortRangeLabel} पेपर हल करें। 90%+ स्कोर पक्का!"`
                    : `"Click any chapter → master its 50 repeated questions → drill 400 MCQs & ${session.shortRangeLabel} papers for 90%+ score."`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
