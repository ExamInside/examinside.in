import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  HelpCircle,
  FileText,
  ScrollText,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  Download,
  Printer,
  ChevronRight,
  ChevronLeft,
  BookOpen,
  Award,
  Bookmark,
  Check,
  Copy,
  Layers,
  Link2,
  Sparkles,
} from 'lucide-react';
import {
  SubjectItem,
  Medium,
  ResourceType,
  ChapterEntry,
  ChapterQuestionItem,
  SolvedPaper,
  SyllabusSessionConfig,
  AUTHOR_NAME,
  getChapterQuestionBank,
} from '../data/curriculumData';
import {
  calculateScoreReport,
  clampMcqIndex,
  getEffectiveSubjectMedium,
  getMcqQuickJumpNumbers,
} from '../utils/examLogic';

interface SubjectDetailModalProps {
  subject: SubjectItem;
  session: SyllabusSessionConfig;
  initialResource: ResourceType;
  initialChapter?: ChapterEntry;
  medium: Medium;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  isOwnerAdmin?: boolean;
  onSavePaperUrl?: (subjectId: string, paperId: string, pdfUrl: string) => void;
}

export const SubjectDetailModal: React.FC<SubjectDetailModalProps> = ({
  subject,
  session,
  initialResource,
  initialChapter,
  medium,
  onClose,
  isBookmarked,
  onToggleBookmark,
  isOwnerAdmin = false,
  onSavePaperUrl,
}) => {
  // Enforce Dual-Medium rule: Hindi subject stays in Hindi even when English Medium is active
  const effMedium = getEffectiveSubjectMedium(subject, medium);

  const normalizedInitialTab: Exclude<ResourceType, 'notes'> =
    initialResource === 'notes' ? 'chapters' : initialResource;

  const [activeTab, setActiveTab] =
    useState<Exclude<ResourceType, 'notes'>>(normalizedInitialTab);

  // Chapters & 50Q per Chapter state
  const [selectedChapterId, setSelectedChapterId] = useState<string>(
    initialChapter?.id || subject.chapterDetails[0]?.id || ''
  );
  const [chapterQFilter, setChapterQFilter] = useState<'all' | 'mcq' | 'short' | 'long'>('all');
  const [chapterMcqSelections, setChapterMcqSelections] = useState<Record<string, number>>({});
  const [chapterJumpIndex, setChapterJumpIndex] = useState<number>(0);

  // 400+ Continuous MCQs Drill state
  const [currentMcqIndex, setCurrentMcqIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [mcqFilterChapter, setMcqFilterChapter] = useState<string>('all');
  const [jumpInput, setJumpInput] = useState<string>('');

  // Important Questions state
  const [selectedMarksFilter, setSelectedMarksFilter] = useState<number | 'all'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Solved Papers (Dynamic Year Tabs from active pack)
  const [selectedYear, setSelectedYear] = useState<number>(
    subject.solvedPapers[0]?.year ?? session.examYear
  );
  const [showSolutions, setShowSolutions] = useState<boolean>(true);
  const [customPdfLinks, setCustomPdfLinks] = useState<Record<string, string>>({});
  const [editingLinkPaperId, setEditingLinkPaperId] = useState<string | null>(null);
  const [tempLinkInput, setTempLinkInput] = useState<string>('');
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  useEffect(() => {
    setActiveTab(initialResource === 'notes' ? 'chapters' : initialResource);
    if (initialChapter) {
      setSelectedChapterId(initialChapter.id);
    }
    if (!subject.solvedPapers.some((p) => p.year === selectedYear)) {
      setSelectedYear(subject.solvedPapers[0]?.year ?? session.examYear);
    }
  }, [subject.id, subject.solvedPapers, initialResource, initialChapter, session.examYear]);

  const activeChapter = useMemo(
    () =>
      subject.chapterDetails.find((c) => c.id === selectedChapterId) ||
      subject.chapterDetails[0],
    [subject, selectedChapterId]
  );

  const chapterQuestions: ChapterQuestionItem[] = useMemo(() => {
    if (!activeChapter) return [];
    return getChapterQuestionBank(subject, activeChapter, session);
  }, [subject, activeChapter, session]);

  const filteredChapterQuestions = useMemo(() => {
    return chapterQuestions.filter((q) =>
      chapterQFilter === 'all' ? true : q.type === chapterQFilter
    );
  }, [chapterQuestions, chapterQFilter]);

  // 400 MCQs filtering & progression
  const filteredMcqs = useMemo(() => {
    return subject.mcqs.filter((m) =>
      mcqFilterChapter === 'all' ? true : m.chapter === mcqFilterChapter
    );
  }, [subject.mcqs, mcqFilterChapter]);

  const safeMcqIndex = clampMcqIndex(currentMcqIndex, filteredMcqs.length);
  const activeMcq = filteredMcqs[safeMcqIndex];
  const quickJumpNumbers = getMcqQuickJumpNumbers(filteredMcqs.length);

  // Score calculation across answered MCQs in current filtered list
  const answeredInDrill = filteredMcqs.filter((m) => selectedAnswers[m.id] !== undefined);
  const correctInDrill = answeredInDrill.filter(
    (m) => selectedAnswers[m.id] === m.correctIndex
  ).length;
  const scoreReport = calculateScoreReport(correctInDrill, answeredInDrill.length);

  // Important Questions
  const filteredImpQuestions = subject.importantQuestions.filter((q) =>
    selectedMarksFilter === 'all' ? true : q.marks === selectedMarksFilter
  );

  // Active Solved Paper (2026 / 2025 / 2024)
  const activePaper: SolvedPaper | undefined =
    subject.solvedPapers.find((p) => p.year === selectedYear) || subject.solvedPapers[0];

  const handleSelectMcqOption = (mcqId: string, optIndex: number) => {
    if (selectedAnswers[mcqId] !== undefined) return;
    setSelectedAnswers((prev) => ({ ...prev, [mcqId]: optIndex }));
  };

  const handleSelectChapterMcqOption = (qId: string, optIndex: number) => {
    if (chapterMcqSelections[qId] !== undefined) return;
    setChapterMcqSelections((prev) => ({ ...prev, [qId]: optIndex }));
  };

  const handleJumpToNumber = (oneBasedNum: number) => {
    const idx = clampMcqIndex(oneBasedNum - 1, filteredMcqs.length);
    setCurrentMcqIndex(idx);
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownloadPaperSheet = (paper: SolvedPaper) => {
    const lines = [
      `============================================================`,
      `ExamInside UP Board Study Vault | Author: ${AUTHOR_NAME}`,
      `${effMedium === 'hindi' ? paper.titleHi : paper.titleEn}`,
      `Paper Code: ${paper.paperCode} | Year: ${paper.year} | Marks: ${paper.totalMarks}`,
      `Custom PDF Reference Link: ${customPdfLinks[paper.id] || paper.pdfUrl}`,
      `============================================================`,
      ``,
      ...paper.sampleSections.flatMap((sec, i) => [
        `${i + 1}. ${effMedium === 'hindi' ? sec.sectionNameHi : sec.sectionNameEn} (${sec.questionsCount} Qs)`,
        `Question Focus: ${effMedium === 'hindi' ? sec.sampleQHi : sec.sampleQEn}`,
        `Model Solution Key: ${effMedium === 'hindi' ? sec.solutionHintHi : sec.solutionHintEn}`,
        ``,
      ]),
      `Generated from ExamInside — UP Board Class 10th & 12th Suite.`,
    ];

    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ExamInside_${paper.paperCode}_${paper.year}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloadNotice(
      effMedium === 'hindi'
        ? `UP बोर्ड ${paper.year} (${paper.paperCode}) हल पेपर शीट डाउनलोड हो गई!`
        : `Downloaded UP Board ${paper.year} (${paper.paperCode}) Solved Paper Sheet!`
    );
    setTimeout(() => setDownloadNotice(null), 4000);
  };

  const handleSaveCustomLink = (paperId: string) => {
    const clean = tempLinkInput.trim();
    if (clean) {
      setCustomPdfLinks((prev) => ({ ...prev, [paperId]: clean }));
      onSavePaperUrl?.(subject.id, paperId, clean);
      setDownloadNotice(
        effMedium === 'hindi'
          ? 'कस्टम PDF लिंक सफलतापूर्वक सेव किया गया!'
          : 'Custom PDF Link saved successfully!'
      );
      setTimeout(() => setDownloadNotice(null), 3000);
    }
    setEditingLinkPaperId(null);
  };

  const scrollToChapterQuestion = (qNumber: number) => {
    setChapterQFilter('all');
    setChapterJumpIndex(qNumber);
    setTimeout(() => {
      const el = document.getElementById(`chapter-q-${qNumber}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  // Collect all chapter poems/shlokas across this subject
  const subjectVerses = subject.chapterDetails.filter(
    (c) => (c.poemsOrShlokasHi && c.poemsOrShlokasHi.length > 0) || c.formulaOrTrickHi
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
      <div
        className="relative w-full max-w-5xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[94vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Modal Header */}
        <div className="px-4 sm:px-6 py-3.5 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700/80 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 shrink-0">
              Code {subject.code}
            </span>
            <div className="min-w-0">
              <h2
                id="modal-title"
                className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white truncate"
              >
                {effMedium === 'hindi' ? subject.nameHi : subject.nameEn}
              </h2>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                Class {subject.classLevel}th · {subject.chaptersCount} Chapters · Curated by {AUTHOR_NAME}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => onToggleBookmark(subject.id)}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                isBookmarked
                  ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/30'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
              }`}
              title="Bookmark Subject"
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500' : ''}`} />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-700/60 transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 5 Interactive Resource Tabs */}
        <div className="px-4 sm:px-6 py-2.5 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2 overflow-x-auto shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('chapters')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'chapters'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>
              {effMedium === 'hindi'
                ? `सभी अध्याय (${subject.chaptersCount}) + 50 Qs`
                : `All Chapters (${subject.chaptersCount}) + 50 Qs`}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('mcqs')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'mcqs'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>400+ MCQs Drill</span>
            <span className="text-[10px] opacity-85">({subject.mcqs.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('important_questions')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'important_questions'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Important Q&A</span>
            <span className="text-[10px] opacity-85">({subject.importantQuestions.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('biographies')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'biographies'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <ScrollText className="w-3.5 h-3.5" />
            <span>
              {effMedium === 'hindi' ? 'जीवन परिचय व श्लोक' : 'Biographies & Poems'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('solved_papers')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'solved_papers'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>{session.shortRangeLabel} Papers PDF</span>
          </button>
        </div>

        {/* Modal Body Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {/* ================= TAB 1: LINE-BY-LINE CHAPTERS & 50 Qs/CHAPTER ================= */}
          {activeTab === 'chapters' && activeChapter && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* Left Sidebar: Line-by-Line All Chapters */}
              <div className="lg:col-span-4 space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-1">
                  {effMedium === 'hindi'
                    ? `संपूर्ण ${subject.chaptersCount} अध्याय (UPMSP ${session.examYear})`
                    : `All ${subject.chaptersCount} Complete Chapters (${session.examYear})`}
                </div>
                <div className="space-y-1.5 max-h-[56vh] overflow-y-auto pr-1">
                  {subject.chapterDetails.map((ch) => {
                    const isSelected = ch.id === activeChapter.id;
                    return (
                      <button
                        key={ch.id}
                        type="button"
                        onClick={() => {
                          setSelectedChapterId(ch.id);
                          setChapterQFilter('all');
                          setChapterJumpIndex(0);
                        }}
                        className={`w-full p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm'
                            : 'bg-slate-50 dark:bg-slate-800/70 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-indigo-400'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 text-[10px] font-bold opacity-80 mb-0.5">
                          <span>{effMedium === 'hindi' ? ch.sectionHi : ch.sectionEn}</span>
                          <span>{ch.boardWeightage}</span>
                        </div>
                        <div className="text-xs font-bold leading-snug">
                          {ch.number}. {effMedium === 'hindi' ? ch.titleHi : ch.titleEn}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Panel: Selected Chapter Study Room (50 High-Yield Repeated Questions) */}
              <div className="lg:col-span-8 space-y-4">
                {/* Chapter Hero Card */}
                <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/60 space-y-2.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-600 text-white">
                      {effMedium === 'hindi' ? activeChapter.sectionHi : activeChapter.sectionEn} · Chapter {activeChapter.number}
                    </span>
                    <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                      50 High-Yield Questions Loaded ({activeChapter.boardWeightage})
                    </span>
                  </div>

                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                    {effMedium === 'hindi' ? activeChapter.titleHi : activeChapter.titleEn}
                  </h3>
                  <p className="text-xs text-slate-700 dark:text-slate-300">
                    <span className="font-bold">
                      {effMedium === 'hindi' ? 'प्रमुख लेखक / विषय:' : 'Core Author / Topic:'}
                    </span>{' '}
                    {effMedium === 'hindi'
                      ? activeChapter.authorOrTopicHi
                      : activeChapter.authorOrTopicEn}
                  </p>
                  <p className="text-xs text-indigo-900 dark:text-indigo-200 font-medium bg-white/70 dark:bg-slate-900/60 p-2.5 rounded-xl border border-indigo-100 dark:border-indigo-800/50">
                    <span className="font-bold text-amber-600 dark:text-amber-400">
                      {effMedium === 'hindi' ? 'बोर्ड लीक फोकस: ' : 'Board Exam Focus: '}
                    </span>
                    {effMedium === 'hindi' ? activeChapter.keyFocusHi : activeChapter.keyFocusEn}
                  </p>

                  {/* Poems / Shlokas / Formulas if present */}
                  {(activeChapter.poemsOrShlokasHi || activeChapter.formulaOrTrickHi) && (
                    <div className="p-3 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 text-xs text-amber-950 dark:text-amber-200 space-y-1">
                      <div className="font-bold flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        <span>
                          {effMedium === 'hindi'
                            ? 'महत्वपूर्ण कविता / श्लोक / गोल्डन सूत्र:'
                            : 'Important Verse / Shloka / Formula:'}
                        </span>
                      </div>
                      {(effMedium === 'hindi'
                        ? activeChapter.poemsOrShlokasHi
                        : activeChapter.poemsOrShlokasEn
                      )?.map((line, i) => (
                        <div key={i} className="font-mono whitespace-pre-line">
                          {line}
                        </div>
                      ))}
                      {(effMedium === 'hindi'
                        ? activeChapter.formulaOrTrickHi
                        : activeChapter.formulaOrTrickEn) && (
                        <div className="font-mono font-semibold">
                          {effMedium === 'hindi'
                            ? activeChapter.formulaOrTrickHi
                            : activeChapter.formulaOrTrickEn}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Type Filter & Quick Jump Pills Q1..Q50 */}
                <div className="flex flex-wrap items-center justify-between gap-2.5 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {(
                      [
                        { key: 'all', label: 'All 50 Qs' },
                        { key: 'mcq', label: '20 MCQs (1M)' },
                        { key: 'short', label: '15 Short (2-3M)' },
                        { key: 'long', label: '15 Long (5-8M)' },
                      ] as const
                    ).map((f) => (
                      <button
                        key={f.key}
                        type="button"
                        onClick={() => setChapterQFilter(f.key)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors cursor-pointer ${
                          chapterQFilter === f.key
                            ? 'bg-indigo-600 text-white'
                            : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-1 shrink-0">
                    <span className="text-[10px] font-bold text-slate-500 mr-1">Jump:</span>
                    {[1, 10, 21, 36, 50].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => scrollToChapterQuestion(num)}
                        className={`px-2 py-0.5 rounded text-[11px] font-bold cursor-pointer shrink-0 ${
                          chapterJumpIndex === num
                            ? 'bg-amber-600 text-white'
                            : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-amber-500'
                        }`}
                      >
                        Q{num}
                      </button>
                    ))}
                  </div>
                </div>

                {/* List of 50 Chapter Questions */}
                <div className="space-y-3 max-h-[46vh] overflow-y-auto pr-1">
                  {filteredChapterQuestions.map((q) => {
                    const selectedOpt = chapterMcqSelections[q.id];
                    const isMcqAnswered = selectedOpt !== undefined;

                    return (
                      <div
                        id={`chapter-q-${q.number}`}
                        key={q.id}
                        className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2.5"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 text-[11px]">
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300">
                              Q{q.number}/50
                            </span>
                            <span className="font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300">
                              {q.marks} {q.marks === 1 ? 'Mark MCQ' : 'Marks'}
                            </span>
                            <span className="font-semibold text-amber-700 dark:text-amber-400">
                              {q.repeatTag}
                            </span>
                          </div>
                          <span className="text-slate-500 dark:text-slate-400">
                            UPMSP: {q.boardYears.join(', ')}
                          </span>
                        </div>

                        <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-relaxed">
                          {effMedium === 'hindi' ? q.questionHi : q.questionEn}
                        </div>

                        {q.type === 'mcq' && q.optionsHi && q.optionsEn ? (
                          <div className="space-y-1.5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                              {(effMedium === 'hindi' ? q.optionsHi : q.optionsEn).map(
                                (opt, optIdx) => {
                                  const isPicked = selectedOpt === optIdx;
                                  const isRight = optIdx === q.correctIndex;
                                  let btnCls =
                                    'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-indigo-400 text-slate-800 dark:text-slate-200';
                                  if (isMcqAnswered) {
                                    if (isRight) {
                                      btnCls =
                                        'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold';
                                    } else if (isPicked && !isRight) {
                                      btnCls =
                                        'bg-rose-50 dark:bg-rose-950/50 border-rose-500 text-rose-900 dark:text-rose-200';
                                    }
                                  }
                                  return (
                                    <button
                                      key={optIdx}
                                      type="button"
                                      onClick={() => handleSelectChapterMcqOption(q.id, optIdx)}
                                      className={`px-3 py-2 rounded-lg border text-left text-xs flex items-center justify-between gap-2 transition-colors cursor-pointer ${btnCls}`}
                                    >
                                      <span>
                                        <span className="font-bold mr-1.5">
                                          {String.fromCharCode(65 + optIdx)}.
                                        </span>
                                        {opt}
                                      </span>
                                      {isMcqAnswered && isRight && (
                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                      )}
                                      {isMcqAnswered && isPicked && !isRight && (
                                        <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                                      )}
                                    </button>
                                  );
                                }
                              )}
                            </div>

                            {isMcqAnswered && (
                              <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200">
                                <span className="font-bold">{AUTHOR_NAME} व्याख्या: </span>
                                {effMedium === 'hindi' ? q.answerHi : q.answerEn}
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed">
                            <span className="font-bold text-indigo-600 dark:text-indigo-400 block mb-1">
                              {effMedium === 'hindi'
                                ? `आदर्श उत्तर (${AUTHOR_NAME}):`
                                : `Model Answer (${AUTHOR_NAME}):`}
                            </span>
                            {effMedium === 'hindi' ? q.answerHi : q.answerEn}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 2: CONTINUOUS 400+ MCQs DRILL ================= */}
          {activeTab === 'mcqs' && (
            <div className="space-y-5">
              {/* Top Stats & Chapter Filter */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex flex-wrap items-center gap-2">
                    <span>
                      {effMedium === 'hindi'
                        ? `लगातार 400+ वस्तुनिष्ठ प्रश्न अभ्यास (OMR Drill)`
                        : `Non-Stop 400+ MCQs OMR Practice Engine`}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-blue-600 text-white">
                      {filteredMcqs.length} Questions
                    </span>
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                    {effMedium === 'hindi'
                      ? 'ऑप्शन A/B/C/D पर क्लिक करते ही तुरंत हरा/लाल OMR परिणाम व व्याख्या देखें; Q1 से Q400 तक लगातार बढ़ें।'
                      : 'Click A, B, C, or D for instant Green/Red OMR validation & explanation; solve non-stop from Q1 to Q400.'}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <select
                    aria-label="Filter MCQs by Chapter"
                    value={mcqFilterChapter}
                    onChange={(e) => {
                      setMcqFilterChapter(e.target.value);
                      setCurrentMcqIndex(0);
                    }}
                    className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 max-w-[200px]"
                  >
                    <option value="all">
                      {effMedium === 'hindi' ? 'सभी अध्याय (400 MCQs)' : 'All Chapters (400 MCQs)'}
                    </option>
                    {subject.chapterDetails.map((c) => (
                      <option key={c.id} value={c.titleHi}>
                        {c.number}. {effMedium === 'hindi' ? c.titleHi : c.titleEn}
                      </option>
                    ))}
                  </select>

                  {answeredInDrill.length > 0 && (
                    <div className="flex items-center gap-2 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-bold">
                      <Award className="w-4 h-4 text-amber-500" />
                      <span>
                        {correctInDrill}/{answeredInDrill.length} ({scoreReport.percentage}%)
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Jump Bar (Q1, Q50, Q100, Q200, Q300, Q397, Q400 + Direct Input) */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] font-bold text-slate-500 mr-1">
                    {effMedium === 'hindi' ? 'सीधे जाएँ (Quick Jump):' : 'Quick Jump:'}
                  </span>
                  {quickJumpNumbers.map((num) => {
                    const isCurrent = safeMcqIndex + 1 === num;
                    return (
                      <button
                        key={num}
                        type="button"
                        onClick={() => handleJumpToNumber(num)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          isCurrent
                            ? 'bg-indigo-600 text-white shadow-sm'
                            : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-indigo-500'
                        }`}
                      >
                        Q{num}
                      </button>
                    );
                  })}
                </div>

                {/* Direct Jump Form */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const parsed = parseInt(jumpInput, 10);
                    if (!Number.isNaN(parsed)) {
                      handleJumpToNumber(parsed);
                      setJumpInput('');
                    }
                  }}
                  className="flex items-center gap-1.5"
                >
                  <input
                    type="number"
                    min={1}
                    max={filteredMcqs.length}
                    value={jumpInput}
                    onChange={(e) => setJumpInput(e.target.value)}
                    placeholder={`1-${filteredMcqs.length}`}
                    className="w-20 px-2 py-1 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                  <button
                    type="submit"
                    className="px-2.5 py-1 rounded-lg bg-slate-900 dark:bg-slate-700 text-white text-xs font-bold cursor-pointer"
                  >
                    Go
                  </button>
                </form>
              </div>

              {/* Active MCQ Card */}
              {activeMcq && (
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-4">
                  {/* Question Header + Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <span className="font-extrabold text-indigo-600 dark:text-indigo-400">
                        {effMedium === 'hindi'
                          ? `प्रश्न ${safeMcqIndex + 1} / ${filteredMcqs.length}`
                          : `Question ${safeMcqIndex + 1} of ${filteredMcqs.length}`}
                      </span>
                      <span className="font-medium truncate max-w-xs">
                        {effMedium === 'hindi' ? activeMcq.chapter : activeMcq.chapterEn}
                      </span>
                      <span className="text-amber-700 dark:text-amber-400 font-semibold">
                        UP Board: {activeMcq.boardYears.join(', ')}
                      </span>
                    </div>

                    <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                      <div
                        className="h-full bg-indigo-600 transition-all duration-300"
                        style={{
                          width: `${Math.round(((safeMcqIndex + 1) / filteredMcqs.length) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="text-base font-bold text-slate-900 dark:text-white leading-relaxed">
                    {effMedium === 'hindi' ? activeMcq.questionHi : activeMcq.questionEn}
                  </div>

                  {/* Instant Check Options A, B, C, D */}
                  <div className="space-y-2">
                    {(effMedium === 'hindi'
                      ? activeMcq.optionsHi
                      : activeMcq.optionsEn
                    ).map((opt, optIdx) => {
                      const pickedIdx = selectedAnswers[activeMcq.id];
                      const isAnswered = pickedIdx !== undefined;
                      const isSelected = pickedIdx === optIdx;
                      const isCorrect = optIdx === activeMcq.correctIndex;

                      let optionStyle =
                        'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-indigo-400 text-slate-800 dark:text-slate-100';
                      if (isAnswered) {
                        if (isCorrect) {
                          optionStyle =
                            'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 text-emerald-950 dark:text-emerald-200 font-bold';
                        } else if (isSelected && !isCorrect) {
                          optionStyle =
                            'bg-rose-50 dark:bg-rose-950/50 border-rose-500 text-rose-950 dark:text-rose-200 font-semibold';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => handleSelectMcqOption(activeMcq.id, optIdx)}
                          className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between text-xs sm:text-sm font-medium transition-all cursor-pointer ${optionStyle}`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs font-bold shrink-0">
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span>{opt}</span>
                          </div>

                          {isAnswered && isCorrect && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          )}
                          {isAnswered && isSelected && !isCorrect && (
                            <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Instant Explanation */}
                  {selectedAnswers[activeMcq.id] !== undefined && (
                    <div
                      className={`p-4 rounded-xl border text-xs space-y-1 ${
                        selectedAnswers[activeMcq.id] === activeMcq.correctIndex
                          ? 'bg-emerald-50/90 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200'
                          : 'bg-rose-50/90 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-200'
                      }`}
                    >
                      <div className="font-bold flex items-center gap-1.5">
                        {selectedAnswers[activeMcq.id] === activeMcq.correctIndex ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>
                              {effMedium === 'hindi'
                                ? `सही उत्तर! (${AUTHOR_NAME} व्याख्या)`
                                : `Correct Answer! (${AUTHOR_NAME} Explanation)`}
                            </span>
                          </>
                        ) : (
                          <>
                            <AlertCircle className="w-4 h-4 text-rose-600" />
                            <span>
                              {effMedium === 'hindi'
                                ? `गलत विकल्प — सही उत्तर: विकल्प ${String.fromCharCode(65 + activeMcq.correctIndex)}`
                                : `Incorrect — Correct Option: ${String.fromCharCode(65 + activeMcq.correctIndex)}`}
                            </span>
                          </>
                        )}
                      </div>
                      <p className="leading-relaxed">
                        {effMedium === 'hindi'
                          ? activeMcq.explanationHi
                          : activeMcq.explanationEn}
                      </p>
                    </div>
                  )}

                  {/* Continuous Previous / Next Controls */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-700">
                    <button
                      type="button"
                      disabled={safeMcqIndex <= 0}
                      onClick={() => setCurrentMcqIndex((prev) => clampMcqIndex(prev - 1, filteredMcqs.length))}
                      className="px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 disabled:opacity-40 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all cursor-pointer disabled:cursor-not-allowed flex items-center gap-1.5"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>{effMedium === 'hindi' ? 'पिछला प्रश्न' : 'Previous'}</span>
                    </button>

                    <span className="text-xs font-mono font-bold text-slate-500">
                      Q{safeMcqIndex + 1} / {filteredMcqs.length}
                    </span>

                    <button
                      type="button"
                      disabled={safeMcqIndex >= filteredMcqs.length - 1}
                      onClick={() => setCurrentMcqIndex((prev) => clampMcqIndex(prev + 1, filteredMcqs.length))}
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white text-xs font-bold transition-all cursor-pointer disabled:cursor-not-allowed flex items-center gap-1.5"
                    >
                      <span>{effMedium === 'hindi' ? 'अगला प्रश्न' : 'Next Question'}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ================= TAB 3: IMPORTANT QUESTIONS ================= */}
          {activeTab === 'important_questions' && (
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                    {effMedium === 'hindi'
                      ? 'बोर्ड परीक्षा महत्वपूर्ण प्रश्न बैंक (2–8 अंक)'
                      : 'Board High-Yield Important Questions (2–8 Marks)'}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                    {effMedium === 'hindi'
                      ? 'प्रत्येक अध्याय के लघु व दीर्घ उत्तरीय गारंटीड प्रश्न स्टेप-मार्किंग उत्तर सहित।'
                      : 'Chapter-wise high-frequency short & long model answers with UPMSP marking steps.'}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-1 bg-white dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
                  {(['all', 2, 3, 5, 6, 8] as const).map((mk) => (
                    <button
                      key={mk}
                      type="button"
                      onClick={() => setSelectedMarksFilter(mk)}
                      className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                        selectedMarksFilter === mk
                          ? 'bg-emerald-600 text-white'
                          : 'text-slate-600 dark:text-slate-300 hover:text-emerald-600'
                      }`}
                    >
                      {mk === 'all' ? (effMedium === 'hindi' ? 'सभी' : 'All') : `${mk}M`}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3.5">
                {filteredImpQuestions.map((q) => (
                  <div
                    key={q.id}
                    className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2.5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-700 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300">
                          {q.marks} Marks
                        </span>
                        <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                          {effMedium === 'hindi' ? q.chapter : q.chapterEn}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[11px] px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 font-bold">
                          {q.probability}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            handleCopyText(
                              q.id,
                              `${effMedium === 'hindi' ? q.questionHi : q.questionEn}\n\n${effMedium === 'hindi' ? q.answerHi : q.answerEn}`
                            )
                          }
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
                          title="Copy Q&A"
                        >
                          {copiedId === q.id ? (
                            <Check className="w-4 h-4 text-emerald-500" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="text-sm font-bold text-slate-900 dark:text-white leading-relaxed">
                      {effMedium === 'hindi' ? q.questionHi : q.questionEn}
                    </div>

                    <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 space-y-1.5">
                      <div className="font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>
                          {effMedium === 'hindi'
                            ? `आदर्श उत्तर (${AUTHOR_NAME}):`
                            : `Model Answer (${AUTHOR_NAME}):`}
                        </span>
                      </div>
                      <p className="leading-relaxed whitespace-pre-line">
                        {effMedium === 'hindi' ? q.answerHi : q.answerEn}
                      </p>
                      <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
                        <span>Board Years: {q.boardYears.join(' · ')}</span>
                        <span>Step-Marking Ready</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= TAB 4: BIOGRAPHIES & POEMS ================= */}
          {activeTab === 'biographies' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50">
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  {effMedium === 'hindi'
                    ? 'जीवन परिचय (80 शब्द प्रारूप) व प्रमुख श्लोक / कविताएँ'
                    : 'Biographies, Prescribed Poems & Key Formulas'}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                  {effMedium === 'hindi'
                    ? 'पूरे 5 अंक पाने हेतु जन्म, स्थान, प्रमुख रचनाएँ तथा बोर्ड-तैयार श्लोक/कविताएँ।'
                    : 'Exam-ready author profiles, poems, and golden formulas structured for full marks.'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {subject.biographies.map((bio) => (
                  <div
                    key={bio.id}
                    className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-2 text-xs">
                        <span className="font-bold text-rose-600 dark:text-rose-400">
                          {bio.category}
                        </span>
                        <span className="font-mono text-slate-500">{bio.period}</span>
                      </div>
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                        {effMedium === 'hindi' ? bio.authorNameHi : bio.authorNameEn}
                      </h4>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {effMedium === 'hindi' ? 'स्थान:' : 'Place:'}{' '}
                        {effMedium === 'hindi' ? bio.birthPlaceHi : bio.birthPlaceEn}
                      </div>
                      <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                        {effMedium === 'hindi' ? bio.summaryHi : bio.summaryEn}
                      </p>
                      <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs">
                        <span className="font-bold block mb-1">
                          {effMedium === 'hindi' ? 'प्रमुख रचनाएँ:' : 'Key Contributions:'}
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {(effMedium === 'hindi' ? bio.notableWorksHi : bio.notableWorksEn).map(
                            (w, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[11px]"
                              >
                                {w}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="text-[11px] text-amber-800 dark:text-amber-300 bg-amber-50/70 dark:bg-amber-950/30 p-2.5 rounded-lg">
                      <span className="font-bold">{AUTHOR_NAME} Tip: </span>
                      {effMedium === 'hindi' ? bio.examTipsHi : bio.examTipsEn}
                    </div>
                  </div>
                ))}
              </div>

              {subjectVerses.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
                    {effMedium === 'hindi'
                      ? 'कंठस्थ श्लोक, काव्य पंक्तियाँ एवं गोल्डन सूत्र:'
                      : 'Memorizable Poems, Shlokas & Golden Formulas:'}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {subjectVerses.map((v) => (
                      <div
                        key={v.id}
                        className="p-3.5 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/50 text-xs space-y-1.5"
                      >
                        <div className="font-bold text-amber-900 dark:text-amber-300">
                          {effMedium === 'hindi' ? v.titleHi : v.titleEn}
                        </div>
                        {(effMedium === 'hindi' ? v.poemsOrShlokasHi : v.poemsOrShlokasEn)?.map(
                          (line, idx) => (
                            <p
                              key={idx}
                              className="font-mono text-slate-800 dark:text-slate-200 whitespace-pre-line"
                            >
                              {line}
                            </p>
                          )
                        )}
                        {(effMedium === 'hindi' ? v.formulaOrTrickHi : v.formulaOrTrickEn) && (
                          <p className="font-mono text-indigo-800 dark:text-indigo-300 font-semibold">
                            {effMedium === 'hindi' ? v.formulaOrTrickHi : v.formulaOrTrickEn}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ================= TAB 5: SOLVED PAPERS PDF (DYNAMIC YEARS) ================= */}
          {activeTab === 'solved_papers' && (
            <div className="space-y-5">
              {downloadNotice && (
                <div className="p-3.5 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center justify-between shadow-md">
                  <span>{downloadNotice}</span>
                  <button type="button" onClick={() => setDownloadNotice(null)}>
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Header + Dynamic Paper Year Tabs */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                    {effMedium === 'hindi'
                      ? `पिछले ${subject.solvedPapers.length} वर्षों के बोर्ड पेपर PDF (${subject.solvedPapers.map((p) => p.year).sort((a, b) => a - b).join(', ')})`
                      : `${subject.solvedPapers.length} Years Official Board Papers PDF Vault (${subject.solvedPapers.map((p) => p.year).sort((a, b) => a - b).join(', ')})`}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                    {effMedium === 'hindi'
                      ? `${session.shortRangeLabel} बोर्ड व मॉडल लीक पेपर — डाउनलोड व ऑनलाइन PDF व्यू।`
                      : `${session.shortRangeLabel} Solved Papers & ${session.examYear} Model Leak Paper with printable PDF sheet.`}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 bg-white dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 self-start">
                  {subject.solvedPapers.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setSelectedYear(p.year)}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                        selectedYear === p.year
                          ? 'bg-amber-600 text-white shadow-sm'
                          : 'text-slate-600 dark:text-slate-300 hover:text-amber-600'
                      }`}
                    >
                      {p.year} {p.year >= session.examYear ? 'Leak/Model' : 'Solved'}
                    </button>
                  ))}
                </div>
              </div>

              {activePaper && (
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-700 pb-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-500 text-white">
                          {activePaper.paperCode}
                        </span>
                        <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                          {effMedium === 'hindi'
                            ? activePaper.paperTypeHi
                            : activePaper.paperTypeEn}
                        </span>
                      </div>
                      <h4 className="text-lg font-extrabold text-slate-900 dark:text-white mt-1">
                        {effMedium === 'hindi' ? activePaper.titleHi : activePaper.titleEn}
                      </h4>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleDownloadPaperSheet(activePaper)}
                        className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download Paper Sheet</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => window.print()}
                        className="px-3 py-2 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-100 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                        title="Print / Save as PDF"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Print PDF</span>
                      </button>
                    </div>
                  </div>

                  {/* Board Paper PDF Link Box (Read-only for Students; Editable only in Owner Admin mode) */}
                  <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                      <span className="font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                        <Link2 className="w-3.5 h-3.5 text-amber-500" />
                        <span>
                          {effMedium === 'hindi'
                            ? 'आधिकारिक बोर्ड पेपर PDF लिंक:'
                            : 'Official Board Paper PDF Link:'}
                        </span>
                      </span>
                      {isOwnerAdmin && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingLinkPaperId(activePaper.id);
                            setTempLinkInput(
                              customPdfLinks[activePaper.id] || activePaper.pdfUrl
                            );
                          }}
                          className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline cursor-pointer"
                        >
                          {effMedium === 'hindi' ? 'लिंक संपादित करें (Owner)' : 'Edit Custom Link'}
                        </button>
                      )}
                    </div>

                    {isOwnerAdmin && editingLinkPaperId === activePaper.id ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="url"
                          value={tempLinkInput}
                          onChange={(e) => setTempLinkInput(e.target.value)}
                          placeholder="https://drive.google.com/file/d/..."
                          className="flex-1 px-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white"
                        />
                        <button
                          type="button"
                          onClick={() => handleSaveCustomLink(activePaper.id)}
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold cursor-pointer"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between gap-2 text-[11px] font-mono text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/70 px-3 py-1.5 rounded-lg overflow-hidden">
                        <span className="truncate">
                          {customPdfLinks[activePaper.id] || activePaper.pdfUrl}
                        </span>
                        <div className="flex items-center gap-2.5 shrink-0">
                          <a
                            href={customPdfLinks[activePaper.id] || activePaper.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-amber-700 dark:text-amber-400 font-bold hover:underline"
                          >
                            {effMedium === 'hindi' ? 'PDF खोलें' : 'Open PDF'}
                          </a>
                          <button
                            type="button"
                            onClick={() =>
                              handleCopyText(
                                activePaper.id,
                                customPdfLinks[activePaper.id] || activePaper.pdfUrl
                              )
                            }
                            className="text-indigo-600 dark:text-indigo-400 font-bold cursor-pointer"
                          >
                            {copiedId === activePaper.id ? 'Copied!' : 'Copy URL'}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Metadata */}
                  <div className="grid grid-cols-3 gap-3 text-center text-xs">
                    <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                      <div className="text-slate-400">
                        {effMedium === 'hindi' ? 'पूर्णांक' : 'Total Marks'}
                      </div>
                      <div className="font-extrabold text-base text-slate-900 dark:text-white mt-0.5">
                        {activePaper.totalMarks} Marks
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                      <div className="text-slate-400">
                        {effMedium === 'hindi' ? 'समय सीमा' : 'Duration'}
                      </div>
                      <div className="font-extrabold text-base text-slate-900 dark:text-white mt-0.5">
                        {activePaper.timeLimit}
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                      <div className="text-slate-400">
                        {effMedium === 'hindi' ? 'हल पृष्ठ' : 'Solved Pages'}
                      </div>
                      <div className="font-extrabold text-base text-slate-900 dark:text-white mt-0.5">
                        {activePaper.pdfPages} Pages
                      </div>
                    </div>
                  </div>

                  {/* Sections & Solutions Preview */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                        {effMedium === 'hindi'
                          ? 'खंडवार प्रश्न व हल:'
                          : 'Sectional Blueprint & Key:'}
                      </span>
                      <button
                        type="button"
                        onClick={() => setShowSolutions(!showSolutions)}
                        className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                      >
                        {showSolutions
                          ? effMedium === 'hindi'
                            ? 'हल छुपाएं'
                            : 'Hide Key'
                          : effMedium === 'hindi'
                          ? 'हल देखें'
                          : 'Show Key'}
                      </button>
                    </div>

                    {activePaper.sampleSections.map((sec, sIdx) => (
                      <div
                        key={sIdx}
                        className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-2"
                      >
                        <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200 border-b border-slate-100 dark:border-slate-800 pb-1.5">
                          <span>
                            {effMedium === 'hindi' ? sec.sectionNameHi : sec.sectionNameEn}
                          </span>
                          <span className="text-slate-500 font-normal">
                            ({sec.questionsCount} Questions)
                          </span>
                        </div>
                        <div className="text-xs text-slate-700 dark:text-slate-300">
                          <span className="font-bold text-slate-900 dark:text-white">
                            {effMedium === 'hindi' ? 'मुख्य प्रश्न: ' : 'Paper Focus: '}
                          </span>
                          {effMedium === 'hindi' ? sec.sampleQHi : sec.sampleQEn}
                        </div>
                        {showSolutions && (
                          <div className="text-xs text-emerald-800 dark:text-emerald-300 bg-emerald-50/70 dark:bg-emerald-950/30 p-2.5 rounded-lg">
                            <span className="font-bold">
                              {effMedium === 'hindi' ? 'उत्तर कुंजी: ' : 'Solution Key: '}
                            </span>
                            {effMedium === 'hindi' ? sec.solutionHintHi : sec.solutionHintEn}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-4 sm:px-6 py-3 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-700/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 shrink-0">
          <span>
            {effMedium === 'hindi' ? subject.nameHi : subject.nameEn} · Class{' '}
            {subject.classLevel}th
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 font-bold cursor-pointer"
          >
            {effMedium === 'hindi' ? 'बंद करें (Close)' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
