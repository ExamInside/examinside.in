import React, { useState, useEffect } from 'react';
import {
  X,
  Calendar,
  Layers,
  FileSpreadsheet,
  Download,
  Upload,
  RotateCcw,
  Plus,
  Trash2,
  CheckCircle2,
  Sparkles,
  Save,
  Zap,
  Edit3,
  Globe,
  Copy,
  Link2,
  BookOpen,
  UserCheck,
  HelpCircle,
  Lock,
  KeyRound,
  EyeOff,
} from 'lucide-react';
import { updateOwnerPasscode } from '../config/ownerSyllabusConfig';
import {
  BiographyItem,
  ChapterEntry,
  ClassLevel,
  ExamTipItem,
  HighYieldNoteItem,
  ImportantQuestion,
  MCQQuestion,
  Medium,
  SolvedPaper,
  SubjectBlueprint,
  SyllabusYearPack,
} from '../data/types';
import {
  bulkParseChaptersText,
  createSolvedPaperForYear,
  exportPackToJson,
  fetchAndImportPackFromUrl,
  importPackFromJson,
  parsePaperYearsInput,
} from '../utils/syllabusPackManager';

interface SyllabusManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLockAdmin: () => void;
  onLockAndHideIcon: () => void;
  medium: Medium;
  selectedClass: ClassLevel;
  packs: SyllabusYearPack[];
  activePack: SyllabusYearPack;
  onSelectPack: (packId: string) => void;
  onCreateOrShiftPack: (
    examYear: number,
    paperYears: number[],
    packLabel?: string
  ) => void;
  onDeletePack: (packId: string) => void;
  onUpdateSubjectBlueprint: (updatedBp: SubjectBlueprint) => void;
  onAddCustomMcq: (
    subjectId: string,
    mcq: Omit<MCQQuestion, 'questionNumber'>
  ) => void;
  onUpsertImportantQuestion: (subjectId: string, question: ImportantQuestion) => void;
  onDeleteImportantQuestion: (subjectId: string, questionId: string) => void;
  onUpsertBiography: (subjectId: string, bio: BiographyItem) => void;
  onDeleteBiography: (subjectId: string, bioId: string) => void;
  onApplyGlobalPaperPattern: (urlPattern: string) => void;
  onUpdateNotes: (notes: HighYieldNoteItem[]) => void;
  onUpdateExamTips: (tips: ExamTipItem[]) => void;
  onImportPack: (importedPack: SyllabusYearPack) => void;
  onResetToDefault2026: () => void;
}

type ManagerTab = 'year' | 'syllabus' | 'papers' | 'backup';
type ContentSubTab = 'pdfs' | 'qa' | 'bios' | 'notes_tips';

export const SyllabusManagerModal: React.FC<SyllabusManagerModalProps> = ({
  isOpen,
  onClose,
  onLockAdmin,
  onLockAndHideIcon,
  medium,
  selectedClass,
  packs,
  activePack,
  onSelectPack,
  onCreateOrShiftPack,
  onDeletePack,
  onUpdateSubjectBlueprint,
  onAddCustomMcq,
  onUpsertImportantQuestion,
  onDeleteImportantQuestion,
  onUpsertBiography,
  onDeleteBiography,
  onApplyGlobalPaperPattern,
  onUpdateNotes,
  onUpdateExamTips,
  onImportPack,
  onResetToDefault2026,
}) => {
  const [activeTab, setActiveTab] = useState<ManagerTab>('year');
  const [contentSubTab, setContentSubTab] = useState<ContentSubTab>('pdfs');
  const [notice, setNotice] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  // Tab 1: Year creator + OTA sync + global PDF pattern
  const [customExamYear, setCustomExamYear] = useState<string>(
    String(Math.max(2027, activePack.session.examYear + 1))
  );
  const [customPaperYearsText, setCustomPaperYearsText] = useState<string>(
    '2030, 2029, 2028, 2027'
  );
  const [customPackLabel, setCustomPackLabel] = useState<string>('');
  const [syncFeedUrl, setSyncFeedUrl] = useState<string>(activePack.syncFeedUrl || '');
  const [isSyncingUrl, setIsSyncingUrl] = useState<boolean>(false);
  const [globalUrlPattern, setGlobalUrlPattern] = useState<string>(
    'https://upmsp.edu.in/papers/{year}/Class{class}_{code}.pdf'
  );

  // Tab 2: Subject & Bilingual Chapters editor
  const [editClass, setEditClass] = useState<ClassLevel>(selectedClass);
  const classBlueprints =
    editClass === '10' ? activePack.class10Blueprints : activePack.class12Blueprints;
  const [editSubjectId, setEditSubjectId] = useState<string>(
    classBlueprints[0]?.id || ''
  );

  const activeSubjectBp =
    classBlueprints.find((b) => b.id === editSubjectId) || classBlueprints[0];

  const [subNameHi, setSubNameHi] = useState('');
  const [subNameEn, setSubNameEn] = useState('');
  const [subCode, setSubCode] = useState('');
  const [subTaglineHi, setSubTaglineHi] = useState('');
  const [subTaglineEn, setSubTaglineEn] = useState('');

  const [bulkChaptersText, setBulkChaptersText] = useState('');
  const [bulkMode, setBulkMode] = useState<'replace' | 'append'>('replace');

  const [editingChapterId, setEditingChapterId] = useState<string | null>(null);
  const [chTitleHi, setChTitleHi] = useState('');
  const [chTitleEn, setChTitleEn] = useState('');
  const [chSectionHi, setChSectionHi] = useState('');
  const [chSectionEn, setChSectionEn] = useState('');
  const [chTopicHi, setChTopicHi] = useState('');
  const [chTopicEn, setChTopicEn] = useState('');
  const [chFocusHi, setChFocusHi] = useState('');
  const [chFocusEn, setChFocusEn] = useState('');
  const [chWeightage, setChWeightage] = useState('4–6 Marks');

  // Tab 3A: Papers PDF editor
  const [newPaperYear, setNewPaperYear] = useState<string>(
    String(activePack.session.examYear)
  );
  const [paperEdits, setPaperEdits] = useState<
    Record<
      string,
      { pdfUrl: string; paperCode: string; titleHi: string; titleEn: string; totalMarks: string }
    >
  >({});

  // Tab 3B: Custom MCQ & Important Questions
  const [mcqQHi, setMcqQHi] = useState('');
  const [mcqQEn, setMcqQEn] = useState('');
  const [mcqOptA, setMcqOptA] = useState('');
  const [mcqOptB, setMcqOptB] = useState('');
  const [mcqOptC, setMcqOptC] = useState('');
  const [mcqOptD, setMcqOptD] = useState('');
  const [mcqCorrectIdx, setMcqCorrectIdx] = useState<number>(0);

  const [impMarks, setImpMarks] = useState<2 | 3 | 4 | 5 | 6 | 7 | 8>(6);
  const [impQHi, setImpQHi] = useState('');
  const [impQEn, setImpQEn] = useState('');
  const [impAnsHi, setImpAnsHi] = useState('');
  const [impAnsEn, setImpAnsEn] = useState('');
  const [impChapter, setImpChapter] = useState('');

  // Tab 3C: Biographies Editor (80-Word Profiles)
  const [editingBioId, setEditingBioId] = useState<string | null>(null);
  const [bioNameHi, setBioNameHi] = useState('');
  const [bioNameEn, setBioNameEn] = useState('');
  const [bioPeriod, setBioPeriod] = useState('');
  const [bioCategory, setBioCategory] = useState<BiographyItem['category']>('Gadhya (Prose)');
  const [bioWorksHi, setBioWorksHi] = useState('');
  const [bioWorksEn, setBioWorksEn] = useState('');
  const [bioSummaryHi, setBioSummaryHi] = useState('');
  const [bioSummaryEn, setBioSummaryEn] = useState('');

  // Tab 4: JSON Import / Reset / Owner Security
  const [importJsonText, setImportJsonText] = useState('');
  const [confirmReset, setConfirmReset] = useState(false);
  const [currPassInput, setCurrPassInput] = useState('');
  const [newPassInput, setNewPassInput] = useState('');

  const showToast = (type: 'ok' | 'err', text: string) => {
    setNotice({ type, text });
    setTimeout(() => setNotice(null), 4500);
  };

  useEffect(() => {
    if (!isOpen) return;
    setEditClass(selectedClass);
    setSyncFeedUrl(activePack.syncFeedUrl || '');
    setNewPaperYear(String(activePack.session.examYear));
  }, [isOpen, selectedClass, activePack.syncFeedUrl, activePack.session.examYear]);

  useEffect(() => {
    const list =
      editClass === '10' ? activePack.class10Blueprints : activePack.class12Blueprints;
    if (!list.some((b) => b.id === editSubjectId) && list[0]) {
      setEditSubjectId(list[0].id);
    }
  }, [editClass, activePack, editSubjectId]);

  useEffect(() => {
    if (!activeSubjectBp) return;
    setSubNameHi(activeSubjectBp.nameHi);
    setSubNameEn(activeSubjectBp.nameEn);
    setSubCode(activeSubjectBp.code);
    setSubTaglineHi(activeSubjectBp.taglineHi);
    setSubTaglineEn(activeSubjectBp.taglineEn);
    setImpChapter(activeSubjectBp.chapterDetails[0]?.titleHi || '');

    const nextPaperEdits: Record<
      string,
      { pdfUrl: string; paperCode: string; titleHi: string; titleEn: string; totalMarks: string }
    > = {};
    activeSubjectBp.solvedPapers.forEach((p) => {
      nextPaperEdits[p.id] = {
        pdfUrl: p.pdfUrl,
        paperCode: p.paperCode,
        titleHi: p.titleHi,
        titleEn: p.titleEn,
        totalMarks: String(p.totalMarks),
      };
    });
    setPaperEdits(nextPaperEdits);
    setEditingChapterId(null);
    setEditingBioId(null);
  }, [activeSubjectBp?.id, activePack.id, activePack.updatedAt]);

  if (!isOpen) return null;

  const isHi = medium === 'hindi';

  const handleAutoFillFourPaperYears = (yearStr: string) => {
    setCustomExamYear(yearStr);
    const yr = parseInt(yearStr, 10);
    if (!Number.isNaN(yr) && yr >= 2020 && yr <= 2099) {
      setCustomPaperYearsText(`${yr}, ${yr - 1}, ${yr - 2}, ${yr - 3}`);
    }
  };

  const handleSyncFromRemoteUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!syncFeedUrl.trim()) return;
    setIsSyncingUrl(true);
    try {
      const syncedPack = await fetchAndImportPackFromUrl(syncFeedUrl);
      onImportPack(syncedPack);
      showToast(
        'ok',
        isHi
          ? `लाइव URL से ${syncedPack.session.examYear} सिलेबस पैक सिंक हो गया!`
          : `Synced ${syncedPack.session.examYear} Syllabus Pack from live URL!`
      );
    } catch (err) {
      showToast(
        'err',
        err instanceof Error ? err.message : 'Unable to fetch remote JSON pack.'
      );
    } finally {
      setIsSyncingUrl(false);
    }
  };

  const handleSaveSubjectMeta = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeSubjectBp) return;
    onUpdateSubjectBlueprint({
      ...activeSubjectBp,
      nameHi: subNameHi.trim() || activeSubjectBp.nameHi,
      nameEn: subNameEn.trim() || activeSubjectBp.nameEn,
      code: subCode.trim() || activeSubjectBp.code,
      taglineHi: subTaglineHi.trim() || activeSubjectBp.taglineHi,
      taglineEn: subTaglineEn.trim() || activeSubjectBp.taglineEn,
    });
    showToast(
      'ok',
      isHi ? 'विषय विवरण (Hindi + English) अपडेट हो गया!' : 'Bilingual subject details updated!'
    );
  };

  const handleApplyBulkChapters = () => {
    if (!activeSubjectBp || !bulkChaptersText.trim()) return;
    const parsed = bulkParseChaptersText(bulkChaptersText, activeSubjectBp);
    const merged =
      bulkMode === 'replace'
        ? parsed
        : [...activeSubjectBp.chapterDetails, ...parsed].map((c, idx) => ({
            ...c,
            number: idx + 1,
          }));
    onUpdateSubjectBlueprint({
      ...activeSubjectBp,
      chapterDetails: merged,
    });
    setBulkChaptersText('');
    showToast(
      'ok',
      isHi
        ? `${merged.length} द्विभाषी अध्याय व ${merged.length * 50} प्रश्न अपडेट हो गए!`
        : `Updated ${merged.length} bilingual chapters (${merged.length * 50} Qs rebuilt)!`
    );
  };

  const startEditChapter = (ch: ChapterEntry) => {
    setEditingChapterId(ch.id);
    setChTitleHi(ch.titleHi);
    setChTitleEn(ch.titleEn);
    setChSectionHi(ch.sectionHi);
    setChSectionEn(ch.sectionEn);
    setChTopicHi(ch.authorOrTopicHi);
    setChTopicEn(ch.authorOrTopicEn);
    setChFocusHi(ch.keyFocusHi);
    setChFocusEn(ch.keyFocusEn);
    setChWeightage(ch.boardWeightage);
  };

  const resetChapterForm = () => {
    setEditingChapterId(null);
    setChTitleHi('');
    setChTitleEn('');
    setChSectionHi('');
    setChSectionEn('');
    setChTopicHi('');
    setChTopicEn('');
    setChFocusHi('');
    setChFocusEn('');
  };

  const handleSaveChapterForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeSubjectBp || !chTitleHi.trim()) return;

    let nextChapters: ChapterEntry[];
    if (editingChapterId) {
      nextChapters = activeSubjectBp.chapterDetails.map((c) =>
        c.id === editingChapterId
          ? {
              ...c,
              sectionHi: chSectionHi.trim() || c.sectionHi,
              sectionEn: chSectionEn.trim() || chSectionHi.trim() || c.sectionEn,
              titleHi: chTitleHi.trim(),
              titleEn: chTitleEn.trim() || chTitleHi.trim(),
              authorOrTopicHi: chTopicHi.trim() || c.authorOrTopicHi,
              authorOrTopicEn: chTopicEn.trim() || chTopicHi.trim() || c.authorOrTopicEn,
              keyFocusHi: chFocusHi.trim() || c.keyFocusHi,
              keyFocusEn: chFocusEn.trim() || chFocusHi.trim() || c.keyFocusEn,
              boardWeightage: chWeightage.trim() || c.boardWeightage,
            }
          : c
      );
    } else {
      const nextNum = activeSubjectBp.chapterDetails.length + 1;
      const newEntry: ChapterEntry = {
        id: `${activeSubjectBp.id}-ch-${nextNum}-${Date.now().toString(36).slice(-3)}`,
        number: nextNum,
        sectionHi: chSectionHi.trim() || 'मुख्य इकाई',
        sectionEn: chSectionEn.trim() || chSectionHi.trim() || 'Core Unit',
        titleHi: chTitleHi.trim(),
        titleEn: chTitleEn.trim() || chTitleHi.trim(),
        authorOrTopicHi: chTopicHi.trim() || chTitleHi.trim(),
        authorOrTopicEn: chTopicEn.trim() || chTopicHi.trim() || chTitleEn.trim() || chTitleHi.trim(),
        keyFocusHi:
          chFocusHi.trim() || `${chTitleHi.trim()} के प्रमुख परीक्षा प्रश्न एवं सूत्र।`,
        keyFocusEn:
          chFocusEn.trim() ||
          chFocusHi.trim() ||
          `High-yield exam questions & formulas for ${chTitleEn.trim() || chTitleHi.trim()}.`,
        boardWeightage: chWeightage.trim() || '5 Marks',
      };
      nextChapters = [...activeSubjectBp.chapterDetails, newEntry];
    }

    onUpdateSubjectBlueprint({
      ...activeSubjectBp,
      chapterDetails: nextChapters,
    });
    resetChapterForm();
    showToast('ok', isHi ? 'अध्याय (Hindi + English) सेव हो गया!' : 'Chapter saved!');
  };

  const handleDeleteChapter = (chapterId: string) => {
    if (!activeSubjectBp || activeSubjectBp.chapterDetails.length <= 1) {
      showToast(
        'err',
        isHi ? 'कम से कम 1 अध्याय आवश्यक है।' : 'At least 1 chapter must remain.'
      );
      return;
    }
    const nextChapters = activeSubjectBp.chapterDetails
      .filter((c) => c.id !== chapterId)
      .map((c, idx) => ({ ...c, number: idx + 1 }));
    onUpdateSubjectBlueprint({
      ...activeSubjectBp,
      chapterDetails: nextChapters,
    });
    showToast('ok', isHi ? 'अध्याय हटाया गया।' : 'Chapter removed.');
  };

  const handleSavePaperRow = (paper: SolvedPaper) => {
    if (!activeSubjectBp) return;
    const ed = paperEdits[paper.id];
    if (!ed) return;
    const nextPapers = activeSubjectBp.solvedPapers.map((p) =>
      p.id === paper.id
        ? {
            ...p,
            pdfUrl: ed.pdfUrl.trim() || p.pdfUrl,
            paperCode: ed.paperCode.trim() || p.paperCode,
            titleHi: ed.titleHi.trim() || p.titleHi,
            titleEn: ed.titleEn.trim() || p.titleEn,
            totalMarks: parseInt(ed.totalMarks, 10) || p.totalMarks,
          }
        : p
    );
    onUpdateSubjectBlueprint({
      ...activeSubjectBp,
      solvedPapers: nextPapers,
    });
    showToast(
      'ok',
      isHi ? `${paper.year} पेपर PDF लिंक सेव किया गया!` : `Saved ${paper.year} Paper PDF!`
    );
  };

  const handleAddPaperYear = () => {
    if (!activeSubjectBp) return;
    const yr = parseInt(newPaperYear, 10);
    if (Number.isNaN(yr) || yr < 2015 || yr > 2099) {
      showToast('err', isHi ? 'मान्य वर्ष (2015–2099) दर्ज करें।' : 'Enter a valid year (2015–2099).');
      return;
    }
    if (activeSubjectBp.solvedPapers.some((p) => p.year === yr)) {
      showToast('err', isHi ? `वर्ष ${yr} पहले से मौजूद है।` : `Year ${yr} already exists.`);
      return;
    }
    const newPaper = createSolvedPaperForYear(
      activeSubjectBp,
      yr,
      activePack.session.examYear,
      activeSubjectBp.solvedPapers[0]
    );
    const sorted = [...activeSubjectBp.solvedPapers, newPaper].sort(
      (a, b) => b.year - a.year
    );
    onUpdateSubjectBlueprint({
      ...activeSubjectBp,
      solvedPapers: sorted,
    });
    showToast('ok', isHi ? `${yr} पेपर सेट जोड़ा गया!` : `Added ${yr} Solved Paper slot!`);
  };

  const handleDeletePaper = (paperId: string) => {
    if (!activeSubjectBp || activeSubjectBp.solvedPapers.length <= 1) {
      showToast('err', isHi ? 'कम से कम 1 पेपर सेट रखें।' : 'Keep at least 1 paper set.');
      return;
    }
    const nextPapers = activeSubjectBp.solvedPapers.filter((p) => p.id !== paperId);
    onUpdateSubjectBlueprint({
      ...activeSubjectBp,
      solvedPapers: nextPapers,
    });
    showToast('ok', isHi ? 'पेपर हटाया गया।' : 'Paper removed.');
  };

  const handleSubmitCustomMcq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeSubjectBp || !mcqQHi.trim() || !mcqOptA.trim() || !mcqOptB.trim()) return;
    const opts: [string, string, string, string] = [
      mcqOptA.trim(),
      mcqOptB.trim(),
      mcqOptC.trim() || 'उपरोक्त दोनों',
      mcqOptD.trim() || 'इनमें से कोई नहीं',
    ];
    onAddCustomMcq(activeSubjectBp.id, {
      id: `custom-mcq-${Date.now().toString(36)}`,
      questionHi: mcqQHi.trim(),
      questionEn: mcqQEn.trim() || mcqQHi.trim(),
      optionsHi: opts,
      optionsEn: opts,
      correctIndex: mcqCorrectIdx,
      explanationHi: `${activeSubjectBp.nameHi} (${activePack.session.examYear}) कस्टम बोर्ड MCQ — सही उत्तर: विकल्प ${String.fromCharCode(65 + mcqCorrectIdx)}।`,
      explanationEn: `${activeSubjectBp.nameEn} (${activePack.session.examYear}) Custom Board MCQ — Correct Option ${String.fromCharCode(65 + mcqCorrectIdx)}.`,
      chapter: activeSubjectBp.chapterDetails[0]?.titleHi || activeSubjectBp.nameHi,
      chapterEn: activeSubjectBp.chapterDetails[0]?.titleEn || activeSubjectBp.nameEn,
      boardYears: [`${activePack.session.examYear} Model`],
    });
    setMcqQHi('');
    setMcqQEn('');
    setMcqOptA('');
    setMcqOptB('');
    setMcqOptC('');
    setMcqOptD('');
    showToast(
      'ok',
      isHi ? 'नया कस्टम MCQ Q1 पर जोड़ा गया!' : 'Custom MCQ added at Q1 of the 400-MCQ Drill!'
    );
  };

  const handleSubmitImpQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeSubjectBp || !impQHi.trim() || !impAnsHi.trim()) return;
    const chMatch =
      activeSubjectBp.chapterDetails.find((c) => c.titleHi === impChapter) ||
      activeSubjectBp.chapterDetails[0];
    onUpsertImportantQuestion(activeSubjectBp.id, {
      id: `custom-iq-${Date.now().toString(36)}`,
      marks: impMarks,
      chapter: chMatch?.titleHi || activeSubjectBp.nameHi,
      chapterEn: chMatch?.titleEn || activeSubjectBp.nameEn,
      questionHi: impQHi.trim(),
      questionEn: impQEn.trim() || impQHi.trim(),
      answerHi: impAnsHi.trim(),
      answerEn: impAnsEn.trim() || impAnsHi.trim(),
      probability: 'Very High',
      boardYears: activePack.session.paperYears.slice(0, 3).map((y) => String(y)),
      tagHi: `${impMarks} Marks ${activePack.session.examYear}`,
      tagEn: `${impMarks} Marks ${activePack.session.examYear}`,
    });
    setImpQHi('');
    setImpQEn('');
    setImpAnsHi('');
    setImpAnsEn('');
    showToast(
      'ok',
      isHi ? 'नया महत्वपूर्ण प्रश्न जोड़ा गया!' : 'Important Question added!'
    );
  };

  const startEditBio = (bio: BiographyItem) => {
    setEditingBioId(bio.id);
    setBioNameHi(bio.authorNameHi);
    setBioNameEn(bio.authorNameEn);
    setBioPeriod(bio.period);
    setBioCategory(bio.category);
    setBioWorksHi(bio.notableWorksHi.join(', '));
    setBioWorksEn(bio.notableWorksEn.join(', '));
    setBioSummaryHi(bio.summaryHi);
    setBioSummaryEn(bio.summaryEn);
  };

  const resetBioForm = () => {
    setEditingBioId(null);
    setBioNameHi('');
    setBioNameEn('');
    setBioPeriod('');
    setBioWorksHi('');
    setBioWorksEn('');
    setBioSummaryHi('');
    setBioSummaryEn('');
  };

  const handleSaveBioForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeSubjectBp || !bioNameHi.trim()) return;
    const worksHi = bioWorksHi
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    const worksEn = bioWorksEn
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const existing = editingBioId
      ? activeSubjectBp.biographies.find((b) => b.id === editingBioId)
      : undefined;

    onUpsertBiography(activeSubjectBp.id, {
      id: editingBioId || `bio-${Date.now().toString(36)}`,
      authorNameHi: bioNameHi.trim(),
      authorNameEn: bioNameEn.trim() || bioNameHi.trim(),
      period: bioPeriod.trim() || `${activePack.session.examYear} Syllabus`,
      category: bioCategory,
      birthPlaceHi: existing?.birthPlaceHi || 'UP Board Prescribed',
      birthPlaceEn: existing?.birthPlaceEn || 'UP Board Prescribed',
      notableWorksHi: worksHi.length > 0 ? worksHi : ['प्रमुख पाठ्यक्रम रचना'],
      notableWorksEn: worksEn.length > 0 ? worksEn : worksHi.length > 0 ? worksHi : ['Prescribed Work'],
      summaryHi:
        bioSummaryHi.trim() ||
        `${bioNameHi.trim()} यूपी बोर्ड पाठ्यक्रम के महत्वपूर्ण साहित्यकार/विद्वान हैं।`,
      summaryEn:
        bioSummaryEn.trim() ||
        bioSummaryHi.trim() ||
        `${bioNameEn.trim() || bioNameHi.trim()} is a key figure in the UP Board syllabus.`,
      examTipsHi: existing?.examTipsHi || 'रचनाओं व जन्म-मृत्यु तिथियों को हाइलाइट करके लिखें।',
      examTipsEn: existing?.examTipsEn || 'Highlight notable works and timeline dates for full 5/5 marks.',
      examWordLimit: existing?.examWordLimit || '80 Words',
    });
    resetBioForm();
    showToast('ok', isHi ? 'जीवन परिचय सेव हो गया!' : 'Biography / Profile saved!');
  };

  const handleDownloadJsonBackup = () => {
    const json = exportPackToJson(activePack);
    const blob = new Blob([json], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ExamInside_UPBoard_${activePack.session.examYear}_Pack.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(
      'ok',
      isHi
        ? `${activePack.session.examYear} बैकअप JSON डाउनलोड हो गया!`
        : `Exported ${activePack.session.examYear} Syllabus Pack (.json)!`
    );
  };

  const handleDownloadBackendConfigJson = () => {
    const json = exportPackToJson(activePack);
    const blob = new Blob([json], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'syllabus-config.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(
      'ok',
      isHi
        ? 'syllabus-config.json डाउनलोड हो गया — इसे public/syllabus-config.json में डालें।'
        : 'Downloaded syllabus-config.json — drop into public/syllabus-config.json for silent student sync!'
    );
  };

  const handleChangeOwnerPasscode = (e: React.FormEvent) => {
    e.preventDefault();
    const res = updateOwnerPasscode(currPassInput, newPassInput);
    if (res.ok) {
      setCurrPassInput('');
      setNewPassInput('');
      showToast(
        'ok',
        isHi
          ? 'Owner Admin पासवर्ड सफलतापूर्वक बदल गया!'
          : 'Owner Admin passcode updated successfully!'
      );
    } else {
      showToast('err', res.error || 'Could not update passcode');
    }
  };

  const handleCopyJsonToClipboard = async () => {
    const json = exportPackToJson(activePack);
    try {
      await navigator.clipboard.writeText(json);
      showToast(
        'ok',
        isHi
          ? `${activePack.session.examYear} मास्टर JSON कॉपी हो गया! कहीं भी एडिट करके इम्पोर्ट करें।`
          : `Copied full ${activePack.session.examYear} Master JSON to clipboard!`
      );
    } catch {
      setImportJsonText(json);
      showToast(
        'ok',
        isHi
          ? 'JSON नीचे बॉक्स में लोड हो गया है — वहाँ से कॉपी या एडिट करें।'
          : 'Loaded Pack JSON into the editor box below.'
      );
    }
  };

  const handleImportJsonText = () => {
    try {
      const imported = importPackFromJson(importJsonText);
      onImportPack(imported);
      setImportJsonText('');
      showToast(
        'ok',
        isHi
          ? `${imported.session.examYear} सिलेबस पैक सफलतापूर्वक इम्पोर्ट व सक्रिय किया गया!`
          : `Imported & activated ${imported.session.examYear} Syllabus Pack!`
      );
    } catch (err) {
      showToast('err', err instanceof Error ? err.message : 'Failed to import JSON');
    }
  };

  const handleUploadJsonFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const content = typeof reader.result === 'string' ? reader.result : '';
      try {
        const imported = importPackFromJson(content);
        onImportPack(imported);
        showToast(
          'ok',
          isHi
            ? `फ़ाइल से ${imported.session.examYear} सिलेबस सक्रिय हो गया!`
            : `Loaded ${imported.session.examYear} Syllabus Pack from file!`
        );
      } catch (err) {
        showToast('err', err instanceof Error ? err.message : 'Invalid JSON file');
      }
    };
    reader.readAsText(file);
  };

  const classNotes = activePack.notes.filter((n) => n.classLevel === editClass);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
      <div
        className="relative w-full max-w-5xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[94vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="syllabus-manager-title"
      >
        {/* Header */}
        <div className="px-4 sm:px-6 py-3.5 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700/80 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h2
                id="syllabus-manager-title"
                className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white truncate"
              >
                {isHi
                  ? 'लाइफटाइम 1-मिनट सिलेबस व वर्ष अपडेट मैनेजर'
                  : 'Lifetime 1-Min Year & Syllabus Update Manager'}
              </h2>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                {isHi
                  ? `सक्रिय: ${activePack.session.packLabel} · पेपर्स: ${activePack.session.paperYears.join(', ')} (UI डिज़ाइन 100% स्थिर)`
                  : `Active: ${activePack.session.packLabel} · Papers: ${activePack.session.paperYears.join(', ')} (Zero Home UI Change)`}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onLockAdmin}
              title="Lock password while keeping small icon on this device"
              className="px-3 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-700 dark:text-amber-300 text-xs font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {isHi ? 'लॉक करें' : 'Lock'}
              </span>
            </button>
            <button
              type="button"
              onClick={onLockAndHideIcon}
              title="Lock password & hide icon completely (Student View)"
              className="px-3 py-1.5 rounded-lg bg-slate-200/70 hover:bg-slate-300/70 dark:bg-slate-700/70 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <EyeOff className="w-3.5 h-3.5" />
              <span className="hidden md:inline">
                {isHi ? 'आइकन छुपाएं' : 'Hide Icon'}
              </span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-700/60 transition-colors cursor-pointer"
              aria-label="Close Syllabus Manager"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Toast Notification */}
        {notice && (
          <div
            className={`px-4 py-2.5 text-xs font-bold flex items-center justify-between ${
              notice.type === 'ok'
                ? 'bg-emerald-600 text-white'
                : 'bg-rose-600 text-white'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              {notice.text}
            </span>
            <button type="button" onClick={() => setNotice(null)} className="cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* 4 Navigation Tabs */}
        <div className="px-4 sm:px-6 py-2.5 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2 overflow-x-auto shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('year')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'year'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>{isHi ? '1-क्लिक वर्ष (2026–2099)' : '1-Click Year (2026–2099)'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('syllabus')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'syllabus'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{isHi ? 'विषय व अध्याय (HI + EN)' : 'Subjects & Chapters (HI/EN)'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('papers')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'papers'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>{isHi ? 'पेपर PDF, परिचय, प्रश्न व नोट्स' : 'PDFs, Bios, Q&A & Notes'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('backup')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'backup'
                ? 'bg-slate-900 dark:bg-slate-700 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isHi ? 'JSON बैकअप / रीसेट' : 'JSON Backup / Reset'}</span>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* ============== TAB 1: 1-CLICK LIFETIME YEAR SWITCH & OTA SYNC ============== */}
          {activeTab === 'year' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/60 space-y-2">
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>
                    {isHi
                      ? '2027, 2030 या 2050 — किसी भी वर्ष का पूरा डेटा 1 मिनट में बदलें (APK/UI बिल्कुल वही रहेगा)'
                      : 'Update Entire Data for 2027, 2030, or 2050 in 1 Minute (Home UI Stays Identical)'}
                  </span>
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {isHi
                    ? 'आपका होमपेज व APK डिज़ाइन जीवन भर एक जैसा रहेगा। नीचे से कोई भी वर्ष (2027–2099) चुनते ही पूरा सत्र, पिछले 4 वर्षों के पेपर PDF, 400 MCQs, नोट्स व अध्याय ऑटो-अपडेट हो जाते हैं।'
                    : 'Your homepage & APK layout stays untouched forever. Selecting or generating any year (up to 2099) shifts session banners, 4-year solved paper tabs, 400 MCQs/subject, and notes across Hindi & English mediums.'}
                </p>
              </div>

              {/* 1-Click Quick Year Presets (including 2030 & 2050) */}
              <div className="space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {isHi
                      ? '1-क्लिक फ्यूचर ईयर पैक (2027 से 2050):'
                      : 'Instant 1-Click Future Year Presets (2027 – 2050):'}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      const nextYr = Math.min(2099, activePack.session.examYear + 1);
                      const nextPapers = [nextYr, nextYr - 1, nextYr - 2, nextYr - 3];
                      onCreateOrShiftPack(nextYr, nextPapers, `UPMSP ${nextYr} Syllabus`);
                      showToast(
                        'ok',
                        isHi
                          ? `1 क्लिक में अगले वर्ष ${nextYr} (${nextPapers.slice().sort((a,b)=>a-b).join(', ')}) पर स्विच हो गया!`
                          : `Advanced +1 year to ${nextYr} (${nextPapers.slice().sort((a,b)=>a-b).join(', ')})!`
                      );
                    }}
                    className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold cursor-pointer inline-flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    <span>+1 Next Year ({Math.min(2099, activePack.session.examYear + 1)})</span>
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                  {[
                    { year: 2027, papers: [2027, 2026, 2025, 2024], label: '24–27 Papers' },
                    { year: 2028, papers: [2028, 2027, 2026, 2025], label: '25–28 Papers' },
                    { year: 2029, papers: [2029, 2028, 2027, 2026], label: '26–29 Papers' },
                    { year: 2030, papers: [2030, 2029, 2028, 2027], label: '27–30 Papers' },
                    { year: 2040, papers: [2040, 2039, 2038, 2037], label: '37–40 Papers' },
                    { year: 2050, papers: [2050, 2049, 2048, 2047], label: '47–50 Papers' },
                  ].map((preset) => {
                    const isCurrent = activePack.session.examYear === preset.year;
                    return (
                      <button
                        key={preset.year}
                        type="button"
                        onClick={() => {
                          onCreateOrShiftPack(
                            preset.year,
                            preset.papers,
                            `UPMSP ${preset.year} Syllabus`
                          );
                          showToast(
                            'ok',
                            isHi
                              ? `पूरा ऐप 1 क्लिक में वर्ष ${preset.year} (${preset.papers.slice().sort((a,b)=>a-b).join(', ')} पेपर्स) पर स्विच हो गया!`
                              : `Switched entire app in 1 click to ${preset.year} (${preset.papers.slice().sort((a,b)=>a-b).join(', ')} Papers)!`
                          );
                        }}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          isCurrent
                            ? 'bg-indigo-600 border-indigo-600 text-white shadow-md'
                            : 'bg-slate-50 dark:bg-slate-800/70 border-slate-200 dark:border-slate-700 hover:border-indigo-500 text-slate-900 dark:text-white'
                        }`}
                      >
                        <div className="text-sm font-extrabold">UP Board {preset.year}</div>
                        <div
                          className={`text-[11px] mt-0.5 ${
                            isCurrent ? 'text-indigo-100' : 'text-slate-500 dark:text-slate-400'
                          }`}
                        >
                          {preset.label}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Custom Any Year (2020–2099) Generator */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const yr = parseInt(customExamYear, 10) || 2050;
                  const paperYrs = parsePaperYearsInput(customPaperYearsText, yr);
                  onCreateOrShiftPack(
                    yr,
                    paperYrs,
                    customPackLabel.trim() || `UPMSP ${yr} Syllabus`
                  );
                  showToast(
                    'ok',
                    isHi
                      ? `${yr} सिलेबस पैक (पेपर्स: ${paperYrs.join(', ')}) तैयार व लागू हो गया!`
                      : `Created & activated ${yr} pack (Papers: ${paperYrs.join(', ')})!`
                  );
                }}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3"
              >
                <div className="text-xs font-extrabold text-slate-900 dark:text-white">
                  {isHi
                    ? 'कोई भी वर्ष (जैसे 2032, 2045, 2050) व उसके 4 पेपर सेट 1 सेकंड में बनाएँ:'
                    : 'Any Custom Exam Year (2020–2099) & Auto 4-Year Paper Generator:'}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label
                      htmlFor="custom-exam-year-input"
                      className="block text-[11px] font-bold text-slate-500 mb-1"
                    >
                      {isHi ? 'परीक्षा वर्ष (Exam Year)' : 'Target Exam Year'}
                    </label>
                    <input
                      id="custom-exam-year-input"
                      type="number"
                      min={2020}
                      max={2099}
                      value={customExamYear}
                      onChange={(e) => handleAutoFillFourPaperYears(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="custom-paper-years-input"
                      className="block text-[11px] font-bold text-slate-500 mb-1"
                    >
                      {isHi ? 'पेपर PDF वर्ष (कॉमा से लिखें)' : 'Paper PDF Years (auto-filled)'}
                    </label>
                    <input
                      id="custom-paper-years-input"
                      type="text"
                      value={customPaperYearsText}
                      onChange={(e) => setCustomPaperYearsText(e.target.value)}
                      placeholder="2050, 2049, 2048, 2047"
                      className="w-full px-3 py-2 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="custom-pack-label-input"
                      className="block text-[11px] font-bold text-slate-500 mb-1"
                    >
                      {isHi ? 'पैक नाम (वैकल्पिक)' : 'Pack Label (Optional)'}
                    </label>
                    <input
                      id="custom-pack-label-input"
                      type="text"
                      value={customPackLabel}
                      onChange={(e) => setCustomPackLabel(e.target.value)}
                      placeholder="e.g. UPMSP 2050 NEP"
                      className="w-full px-3 py-2 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>
                    {isHi ? 'बनाएँ और 1 क्लिक में लागू करें' : 'Generate & Activate Pack'}
                  </span>
                </button>
              </form>

              {/* 1-Click Global PDF Pattern & Remote Live JSON OTA Sync */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!globalUrlPattern.trim()) return;
                    onApplyGlobalPaperPattern(globalUrlPattern);
                    showToast(
                      'ok',
                      isHi
                        ? 'सभी 12 विषयों के सभी पेपर PDF लिंक 1 क्लिक में अपडेट हो गए!'
                        : 'Updated PDF URLs for ALL 12 subjects & paper years in 1 click!'
                    );
                  }}
                  className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 space-y-2.5"
                >
                  <div className="text-xs font-extrabold text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
                    <Link2 className="w-4 h-4" />
                    <span>
                      {isHi
                        ? 'सभी 12 विषयों के PDF लिंक 1 क्लिक में बदलें:'
                        : 'Batch Update All 12 Subjects PDF URLs in 1 Click:'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300">
                    Placeholders: <code>{'{year}'}</code>, <code>{'{yy}'}</code>,{' '}
                    <code>{'{class}'}</code>, <code>{'{code}'}</code>, <code>{'{subjectId}'}</code>
                  </p>
                  <input
                    type="text"
                    value={globalUrlPattern}
                    onChange={(e) => setGlobalUrlPattern(e.target.value)}
                    placeholder="https://yoursite.com/upmsp/{year}/Class{class}_{code}.pdf"
                    className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-800 font-mono"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold cursor-pointer"
                  >
                    {isHi ? 'सभी 12 विषयों पर लागू करें' : 'Apply to All 12 Subjects'}
                  </button>
                </form>

                <form
                  onSubmit={handleSyncFromRemoteUrl}
                  className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 space-y-2.5"
                >
                  <div className="text-xs font-extrabold text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5">
                    <Globe className="w-4 h-4" />
                    <span>
                      {isHi
                        ? 'लाइव रिमोट JSON सिंक (बिना APK दोबारा बनाए अपडेट करें):'
                        : 'Live Remote JSON OTA Sync (Update APK Data Without Rebuilding):'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300">
                    {isHi
                      ? 'अपने GitHub Raw / सर्वर JSON का URL डालें — 1 क्लिक में पूरा सिलेबस अपडेट होगा।'
                      : 'Paste a public JSON pack URL (GitHub Raw / CDN) to sync Hindi & English syllabus in 1 click.'}
                  </p>
                  <input
                    type="url"
                    value={syncFeedUrl}
                    onChange={(e) => setSyncFeedUrl(e.target.value)}
                    placeholder="https://raw.githubusercontent.com/.../upboard_2030.json"
                    className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 font-mono"
                  />
                  <button
                    type="submit"
                    disabled={isSyncingUrl || !syncFeedUrl.trim()}
                    className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white text-xs font-bold cursor-pointer"
                  >
                    {isSyncingUrl
                      ? 'Syncing...'
                      : isHi
                      ? 'लाइव JSON से सिंक करें'
                      : 'Sync Live JSON Pack'}
                  </button>
                </form>
              </div>

              {/* Saved Year Packs Switcher */}
              <div className="space-y-2.5">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {isHi
                    ? `सेव किए गए सिलेबस पैक (${packs.length}):`
                    : `Saved Year Packs (${packs.length}):`}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {packs.map((pack) => {
                    const isActive = pack.id === activePack.id;
                    const chTotal =
                      pack.class10Blueprints.reduce((s, b) => s + b.chapterDetails.length, 0) +
                      pack.class12Blueprints.reduce((s, b) => s + b.chapterDetails.length, 0);
                    return (
                      <div
                        key={pack.id}
                        className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 ${
                          isActive
                            ? 'bg-emerald-50/70 dark:bg-emerald-950/25 border-emerald-500'
                            : 'bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-extrabold text-slate-900 dark:text-white truncate">
                              {pack.session.packLabel}
                            </span>
                            {isActive && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-600 text-white">
                                ACTIVE
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                            Session {pack.session.sessionLabel} · Papers:{' '}
                            {pack.session.paperYears.join(', ')} · {chTotal} Ch
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          {!isActive && (
                            <button
                              type="button"
                              onClick={() => {
                                onSelectPack(pack.id);
                                showToast(
                                  'ok',
                                  isHi
                                    ? `${pack.session.packLabel} सक्रिय हो गया!`
                                    : `Activated ${pack.session.packLabel}!`
                                );
                              }}
                              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold cursor-pointer"
                            >
                              {isHi ? 'लागू करें' : 'Activate'}
                            </button>
                          )}
                          {packs.length > 1 && (
                            <button
                              type="button"
                              onClick={() => onDeletePack(pack.id)}
                              title="Delete Pack"
                              className="p-2 rounded-lg text-slate-400 hover:text-rose-600 cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ============== TAB 2: BILINGUAL SUBJECTS & CHAPTERS (HI + EN) ============== */}
          {activeTab === 'syllabus' && activeSubjectBp && (
            <div className="space-y-5">
              {/* Fast Class + 6-Subject Quick Switch Pills */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-1 bg-white dark:bg-slate-900 p-1 rounded-lg border border-slate-200 dark:border-slate-700">
                    {(['10', '12'] as const).map((cls) => (
                      <button
                        key={cls}
                        type="button"
                        onClick={() => setEditClass(cls)}
                        className={`px-3 py-1 text-xs font-bold rounded-md cursor-pointer ${
                          editClass === cls
                            ? 'bg-indigo-600 text-white'
                            : 'text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        Class {cls}th
                      </button>
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500">
                    {isHi
                      ? 'विषय चुनें और Hindi + English दोनों माध्यम का सिलेबस अपडेट करें'
                      : 'Select any subject to update both Hindi & English mediums'}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {classBlueprints.map((bp) => {
                    const selected = bp.id === activeSubjectBp.id;
                    return (
                      <button
                        key={bp.id}
                        type="button"
                        onClick={() => setEditSubjectId(bp.id)}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                          selected
                            ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm'
                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-emerald-500'
                        }`}
                      >
                        {bp.code} · {isHi ? bp.nameHi : bp.nameEn} ({bp.chapterDetails.length} Ch)
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Edit Subject Name / Code / Tagline (Bilingual) */}
              <form
                onSubmit={handleSaveSubjectMeta}
                className="p-4 rounded-xl bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-extrabold text-slate-900 dark:text-white">
                    {isHi
                      ? 'विषय का नाम, कोड और टैगलाइन (हिंदी + English दोनों):'
                      : 'Edit Subject Name, Code & Tagline (Hindi + English):'}
                  </span>
                  <button
                    type="submit"
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold inline-flex items-center gap-1 cursor-pointer shrink-0"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{isHi ? 'विषय सेव करें' : 'Save Subject'}</span>
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <input
                    type="text"
                    value={subNameHi}
                    onChange={(e) => setSubNameHi(e.target.value)}
                    placeholder="Subject Name (Hindi)"
                    className="px-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                  />
                  <input
                    type="text"
                    value={subNameEn}
                    onChange={(e) => setSubNameEn(e.target.value)}
                    placeholder="Subject Name (English)"
                    className="px-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                  />
                  <input
                    type="text"
                    value={subCode}
                    onChange={(e) => setSubCode(e.target.value)}
                    placeholder="Code (e.g. 928)"
                    className="px-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <input
                    type="text"
                    value={subTaglineHi}
                    onChange={(e) => setSubTaglineHi(e.target.value)}
                    placeholder="Hindi Tagline"
                    className="px-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                  />
                  <input
                    type="text"
                    value={subTaglineEn}
                    onChange={(e) => setSubTaglineEn(e.target.value)}
                    placeholder="English Tagline"
                    className="px-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                  />
                </div>
              </form>

              {/* 1-Click Bilingual Bulk Chapter Paste */}
              <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-extrabold text-emerald-900 dark:text-emerald-300">
                    {isHi
                      ? '1-मिनट द्विभाषी बल्क अध्याय पेस्ट (Hindi :: English — 50 Qs/Ch व 400 MCQs ऑटो-अपडेट):'
                      : '1-Min Bilingual Bulk Chapter Paste (Hindi :: English — auto-builds 50 Qs/ch & 400 MCQs):'}
                  </span>
                  <div className="flex items-center gap-1.5 text-[11px]">
                    <button
                      type="button"
                      onClick={() => setBulkMode('replace')}
                      className={`px-2 py-0.5 rounded font-bold cursor-pointer ${
                        bulkMode === 'replace'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      Replace All
                    </button>
                    <button
                      type="button"
                      onClick={() => setBulkMode('append')}
                      className={`px-2 py-0.5 rounded font-bold cursor-pointer ${
                        bulkMode === 'append'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      Append
                    </button>
                  </div>
                </div>
                <textarea
                  rows={3}
                  value={bulkChaptersText}
                  onChange={(e) => setBulkChaptersText(e.target.value)}
                  placeholder={
                    'Format 1: अध्याय का नाम हिंदी :: Chapter Title English\nFormat 2: इकाई :: Unit | शीर्षक :: Title | विषय :: Topic | फोकस :: Key Focus | 6 Marks'
                  }
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 text-slate-900 dark:text-white font-mono"
                />
                <button
                  type="button"
                  onClick={handleApplyBulkChapters}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer"
                >
                  {isHi
                    ? 'अध्याय लागू करें और प्रश्न बैंक अपडेट करें'
                    : 'Apply Bilingual Chapters & Rebuild Questions'}
                </button>
              </div>

              {/* Single Bilingual Add / Edit Chapter Form + List */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                <form
                  onSubmit={handleSaveChapterForm}
                  className="lg:col-span-5 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2.5 h-fit"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-slate-900 dark:text-white">
                      {editingChapterId
                        ? isHi
                          ? 'अध्याय संपादित करें (HI + EN)'
                          : 'Edit Chapter (HI + EN)'
                        : isHi
                        ? '+ नया अध्याय जोड़ें (HI + EN)'
                        : '+ Add Bilingual Chapter'}
                    </span>
                    {editingChapterId && (
                      <button
                        type="button"
                        onClick={resetChapterForm}
                        className="text-[11px] text-slate-500 hover:underline cursor-pointer"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    required
                    value={chTitleHi}
                    onChange={(e) => setChTitleHi(e.target.value)}
                    placeholder="Chapter Title (Hindi / Primary)"
                    className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                  />
                  <input
                    type="text"
                    value={chTitleEn}
                    onChange={(e) => setChTitleEn(e.target.value)}
                    placeholder="Chapter Title (English)"
                    className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={chSectionHi}
                      onChange={(e) => setChSectionHi(e.target.value)}
                      placeholder="Unit (Hindi)"
                      className="px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                    />
                    <input
                      type="text"
                      value={chSectionEn}
                      onChange={(e) => setChSectionEn(e.target.value)}
                      placeholder="Unit (English)"
                      className="px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={chTopicHi}
                      onChange={(e) => setChTopicHi(e.target.value)}
                      placeholder="Topic / Author (HI)"
                      className="px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                    />
                    <input
                      type="text"
                      value={chTopicEn}
                      onChange={(e) => setChTopicEn(e.target.value)}
                      placeholder="Topic / Author (EN)"
                      className="px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                    />
                  </div>
                  <input
                    type="text"
                    value={chWeightage}
                    onChange={(e) => setChWeightage(e.target.value)}
                    placeholder="Marks (e.g. 6 Marks)"
                    className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                  />
                  <textarea
                    rows={2}
                    value={chFocusHi}
                    onChange={(e) => setChFocusHi(e.target.value)}
                    placeholder="Key Board Focus (Hindi)"
                    className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                  />
                  <textarea
                    rows={2}
                    value={chFocusEn}
                    onChange={(e) => setChFocusEn(e.target.value)}
                    placeholder="Key Board Focus (English)"
                    className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                  />
                  <button
                    type="submit"
                    className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold inline-flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>
                      {editingChapterId
                        ? isHi
                          ? 'अध्याय अपडेट करें'
                          : 'Update Chapter'
                        : isHi
                        ? 'अध्याय जोड़ें'
                        : 'Add Chapter'}
                    </span>
                  </button>
                </form>

                <div className="lg:col-span-7 space-y-2 max-h-[420px] overflow-y-auto pr-1">
                  {activeSubjectBp.chapterDetails.map((ch) => (
                    <div
                      key={ch.id}
                      className="p-3 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-2"
                    >
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {ch.number}. {isHi ? ch.titleHi : ch.titleEn}
                        </div>
                        <div className="text-[11px] text-slate-500 truncate">
                          {isHi ? ch.sectionHi : ch.sectionEn} · {ch.boardWeightage} ·{' '}
                          {isHi ? ch.titleEn : ch.titleHi}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => startEditChapter(ch)}
                          title="Edit Chapter"
                          className="p-1.5 rounded-lg text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteChapter(ch.id)}
                          title="Delete Chapter"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ============== TAB 3: PAPERS PDF, BIOS, MCQs, IMP Qs & NOTES ============== */}
          {activeTab === 'papers' && activeSubjectBp && (
            <div className="space-y-5">
              {/* Subject Picker + Sub-Section Pills */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-1 bg-white dark:bg-slate-900 p-1 rounded-lg border border-slate-200 dark:border-slate-700">
                    {(['10', '12'] as const).map((cls) => (
                      <button
                        key={cls}
                        type="button"
                        onClick={() => setEditClass(cls)}
                        className={`px-3 py-1 text-xs font-bold rounded-md cursor-pointer ${
                          editClass === cls
                            ? 'bg-amber-600 text-white'
                            : 'text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        Class {cls}th
                      </button>
                    ))}
                  </div>
                  <select
                    aria-label="Select Subject for Content Update"
                    value={activeSubjectBp.id}
                    onChange={(e) => setEditSubjectId(e.target.value)}
                    className="flex-1 min-w-[200px] px-3 py-2 text-xs font-bold rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white"
                  >
                    {classBlueprints.map((bp) => (
                      <option key={bp.id} value={bp.id}>
                        Code {bp.code} — {isHi ? bp.nameHi : bp.nameEn}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {[
                    { id: 'pdfs' as const, label: isHi ? 'पेपर PDF लिंक' : 'Solved Papers PDF', icon: FileSpreadsheet },
                    { id: 'qa' as const, label: isHi ? 'MCQs व महत्वपूर्ण प्रश्न' : 'MCQs & Imp Qs', icon: HelpCircle },
                    { id: 'bios' as const, label: isHi ? 'जीवन परिचय (80W)' : 'Biographies (80W)', icon: UserCheck },
                    { id: 'notes_tips' as const, label: isHi ? 'रिपीट नोट्स व बोर्ड नियम' : 'Repeat Notes & Board Tips', icon: BookOpen },
                  ].map((sub) => {
                    const Icon = sub.icon;
                    const active = contentSubTab === sub.id;
                    return (
                      <button
                        key={sub.id}
                        type="button"
                        onClick={() => setContentSubTab(sub.id)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          active
                            ? 'bg-slate-900 dark:bg-amber-600 text-white shadow-sm'
                            : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span>{sub.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* SUBTAB 3A: Solved Papers PDF Links */}
              {contentSubTab === 'pdfs' && (
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                      {isHi
                        ? `${activeSubjectBp.nameHi} — पिछले वर्षों के पेपर PDF लिंक`
                        : `${activeSubjectBp.nameEn} — Year-Wise Solved Paper PDFs`}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="number"
                        min={2015}
                        max={2099}
                        value={newPaperYear}
                        onChange={(e) => setNewPaperYear(e.target.value)}
                        className="w-20 px-2 py-1 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600"
                      />
                      <button
                        type="button"
                        onClick={handleAddPaperYear}
                        className="px-2.5 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold cursor-pointer inline-flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Year</span>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    {activeSubjectBp.solvedPapers.map((paper) => {
                      const ed = paperEdits[paper.id] || {
                        pdfUrl: paper.pdfUrl,
                        paperCode: paper.paperCode,
                        titleHi: paper.titleHi,
                        titleEn: paper.titleEn,
                        totalMarks: String(paper.totalMarks),
                      };
                      return (
                        <div
                          key={paper.id}
                          className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span className="text-xs font-extrabold text-slate-900 dark:text-white">
                              UPMSP Year {paper.year}
                            </span>
                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => handleSavePaperRow(paper)}
                                className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold cursor-pointer inline-flex items-center gap-1"
                              >
                                <Save className="w-3 h-3" />
                                <span>Save</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeletePaper(paper.id)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 cursor-pointer"
                                title="Remove Year"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                            <input
                              type="url"
                              value={ed.pdfUrl}
                              onChange={(e) =>
                                setPaperEdits((prev) => ({
                                  ...prev,
                                  [paper.id]: { ...ed, pdfUrl: e.target.value },
                                }))
                              }
                              placeholder="https://drive.google.com/..."
                              className="sm:col-span-5 px-2.5 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono"
                            />
                            <input
                              type="text"
                              value={ed.paperCode}
                              onChange={(e) =>
                                setPaperEdits((prev) => ({
                                  ...prev,
                                  [paper.id]: { ...ed, paperCode: e.target.value },
                                }))
                              }
                              placeholder="Code"
                              className="sm:col-span-2 px-2.5 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                            />
                            <input
                              type="text"
                              value={ed.titleHi}
                              onChange={(e) =>
                                setPaperEdits((prev) => ({
                                  ...prev,
                                  [paper.id]: { ...ed, titleHi: e.target.value },
                                }))
                              }
                              placeholder="Title (HI)"
                              className="sm:col-span-2 px-2.5 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                            />
                            <input
                              type="text"
                              value={ed.titleEn}
                              onChange={(e) =>
                                setPaperEdits((prev) => ({
                                  ...prev,
                                  [paper.id]: { ...ed, titleEn: e.target.value },
                                }))
                              }
                              placeholder="Title (EN)"
                              className="sm:col-span-2 px-2.5 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                            />
                            <input
                              type="number"
                              value={ed.totalMarks}
                              onChange={(e) =>
                                setPaperEdits((prev) => ({
                                  ...prev,
                                  [paper.id]: { ...ed, totalMarks: e.target.value },
                                }))
                              }
                              placeholder="Marks"
                              className="sm:col-span-1 px-2 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* SUBTAB 3B: MCQs & Important Questions */}
              {contentSubTab === 'qa' && (
                <div className="space-y-5">
                  <form
                    onSubmit={handleSubmitCustomMcq}
                    className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/50 space-y-2.5"
                  >
                    <div className="text-xs font-extrabold text-blue-900 dark:text-blue-300">
                      {isHi
                        ? `+ ${activeSubjectBp.nameHi} में नया बोर्ड MCQ जोड़ें (Q1 पर दिखेगा):`
                        : `+ Add Custom Board MCQ to ${activeSubjectBp.nameEn} (Appears at Q1):`}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        required
                        value={mcqQHi}
                        onChange={(e) => setMcqQHi(e.target.value)}
                        placeholder="Question (Hindi)"
                        className="px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                      />
                      <input
                        type="text"
                        value={mcqQEn}
                        onChange={(e) => setMcqQEn(e.target.value)}
                        placeholder="Question (English)"
                        className="px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                      />
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <input
                        type="text"
                        required
                        value={mcqOptA}
                        onChange={(e) => setMcqOptA(e.target.value)}
                        placeholder="Option A"
                        className="px-2.5 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                      />
                      <input
                        type="text"
                        required
                        value={mcqOptB}
                        onChange={(e) => setMcqOptB(e.target.value)}
                        placeholder="Option B"
                        className="px-2.5 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                      />
                      <input
                        type="text"
                        value={mcqOptC}
                        onChange={(e) => setMcqOptC(e.target.value)}
                        placeholder="Option C"
                        className="px-2.5 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                      />
                      <input
                        type="text"
                        value={mcqOptD}
                        onChange={(e) => setMcqOptD(e.target.value)}
                        placeholder="Option D"
                        className="px-2.5 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                      />
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                        <span>Correct Option:</span>
                        <select
                          value={mcqCorrectIdx}
                          onChange={(e) => setMcqCorrectIdx(Number(e.target.value))}
                          className="px-2 py-1 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600"
                        >
                          <option value={0}>A</option>
                          <option value={1}>B</option>
                          <option value={2}>C</option>
                          <option value={3}>D</option>
                        </select>
                      </label>
                      <button
                        type="submit"
                        className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold cursor-pointer"
                      >
                        + Add MCQ to Drill
                      </button>
                    </div>
                  </form>

                  {/* Important Questions (2M-8M) Editor */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                    <form
                      onSubmit={handleSubmitImpQuestion}
                      className="lg:col-span-6 p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 space-y-2.5"
                    >
                      <div className="text-xs font-extrabold text-emerald-900 dark:text-emerald-300">
                        {isHi
                          ? `+ महत्वपूर्ण प्रश्न (2–8 अंक) जोड़ें:`
                          : `+ Add Important Subjective Question (2–8 Marks):`}
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <select
                          aria-label="Important Question Marks"
                          value={impMarks}
                          onChange={(e) =>
                            setImpMarks(Number(e.target.value) as 2 | 3 | 4 | 5 | 6 | 7 | 8)
                          }
                          className="px-2.5 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                        >
                          {[2, 3, 4, 5, 6, 7, 8].map((m) => (
                            <option key={m} value={m}>
                              {m} Marks
                            </option>
                          ))}
                        </select>
                        <select
                          aria-label="Important Question Chapter"
                          value={impChapter}
                          onChange={(e) => setImpChapter(e.target.value)}
                          className="px-2.5 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                        >
                          {activeSubjectBp.chapterDetails.map((c) => (
                            <option key={c.id} value={c.titleHi}>
                              {isHi ? c.titleHi : c.titleEn}
                            </option>
                          ))}
                        </select>
                      </div>
                      <input
                        type="text"
                        required
                        value={impQHi}
                        onChange={(e) => setImpQHi(e.target.value)}
                        placeholder="Important Question (Hindi)"
                        className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                      />
                      <input
                        type="text"
                        value={impQEn}
                        onChange={(e) => setImpQEn(e.target.value)}
                        placeholder="Important Question (English)"
                        className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                      />
                      <textarea
                        rows={2}
                        required
                        value={impAnsHi}
                        onChange={(e) => setImpAnsHi(e.target.value)}
                        placeholder="Model Answer (Hindi)"
                        className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                      />
                      <textarea
                        rows={2}
                        value={impAnsEn}
                        onChange={(e) => setImpAnsEn(e.target.value)}
                        placeholder="Model Answer (English)"
                        className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                      />
                      <button
                        type="submit"
                        className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer"
                      >
                        + Add Important Question
                      </button>
                    </form>

                    <div className="lg:col-span-6 space-y-2 max-h-80 overflow-y-auto pr-1">
                      <div className="text-xs font-bold text-slate-500">
                        {isHi
                          ? `मुख्य महत्वपूर्ण प्रश्न (${activeSubjectBp.coreImportantQuestions.length})`
                          : `Core Important Questions (${activeSubjectBp.coreImportantQuestions.length})`}
                      </div>
                      {activeSubjectBp.coreImportantQuestions.map((iq) => (
                        <div
                          key={iq.id}
                          className="p-2.5 rounded-xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-start justify-between gap-2"
                        >
                          <div className="min-w-0">
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300">
                              {iq.marks} Marks
                            </span>
                            <div className="text-xs font-bold text-slate-900 dark:text-white mt-1">
                              {isHi ? iq.questionHi : iq.questionEn}
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              onDeleteImportantQuestion(activeSubjectBp.id, iq.id)
                            }
                            title="Delete Question"
                            className="p-1 text-slate-400 hover:text-rose-600 cursor-pointer shrink-0"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* SUBTAB 3C: Biographies (80-Word Profiles) Editor */}
              {contentSubTab === 'bios' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                  <form
                    onSubmit={handleSaveBioForm}
                    className="lg:col-span-5 p-4 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 space-y-2.5 h-fit"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-rose-900 dark:text-rose-300">
                        {editingBioId
                          ? isHi
                            ? 'परिचय संपादित करें (80 शब्द)'
                            : 'Edit Biography / Profile'
                          : isHi
                          ? '+ नया लेखक/वैज्ञानिक परिचय जोड़ें'
                          : '+ Add Author / Poet / Theorist'}
                      </span>
                      {editingBioId && (
                        <button
                          type="button"
                          onClick={resetBioForm}
                          className="text-[11px] text-slate-500 hover:underline cursor-pointer"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                    <input
                      type="text"
                      required
                      value={bioNameHi}
                      onChange={(e) => setBioNameHi(e.target.value)}
                      placeholder="Author / Theorist Name (Hindi)"
                      className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                    />
                    <input
                      type="text"
                      value={bioNameEn}
                      onChange={(e) => setBioNameEn(e.target.value)}
                      placeholder="Author / Theorist Name (English)"
                      className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={bioPeriod}
                        onChange={(e) => setBioPeriod(e.target.value)}
                        placeholder="Period / Years"
                        className="px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                      />
                      <select
                        value={bioCategory}
                        onChange={(e) =>
                          setBioCategory(e.target.value as BiographyItem['category'])
                        }
                        className="px-2 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                      >
                        <option value="Gadhya (Prose)">Gadhya (Prose)</option>
                        <option value="Kavya (Poetry)">Kavya (Poetry)</option>
                        <option value="English Literature">English Literature</option>
                      </select>
                    </div>
                    <input
                      type="text"
                      value={bioWorksHi}
                      onChange={(e) => setBioWorksHi(e.target.value)}
                      placeholder="Works (Hindi, comma separated)"
                      className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                    />
                    <input
                      type="text"
                      value={bioWorksEn}
                      onChange={(e) => setBioWorksEn(e.target.value)}
                      placeholder="Works (English, comma separated)"
                      className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                    />
                    <textarea
                      rows={2}
                      value={bioSummaryHi}
                      onChange={(e) => setBioSummaryHi(e.target.value)}
                      placeholder="80-Word Summary (Hindi)"
                      className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                    />
                    <textarea
                      rows={2}
                      value={bioSummaryEn}
                      onChange={(e) => setBioSummaryEn(e.target.value)}
                      placeholder="80-Word Summary (English)"
                      className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                    />
                    <button
                      type="submit"
                      className="w-full py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold cursor-pointer"
                    >
                      {editingBioId ? 'Update Biography' : '+ Add Biography'}
                    </button>
                  </form>

                  <div className="lg:col-span-7 space-y-2 max-h-96 overflow-y-auto pr-1">
                    {activeSubjectBp.biographies.length === 0 ? (
                      <div className="p-6 text-center rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 text-xs text-slate-500">
                        {isHi
                          ? 'इस विषय में अभी कोई जीवन परिचय नहीं है — बाएँ फ़ॉर्म से जोड़ें।'
                          : 'No biographies added for this subject yet — use the form on the left.'}
                      </div>
                    ) : (
                      activeSubjectBp.biographies.map((bio) => (
                        <div
                          key={bio.id}
                          className="p-3 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex items-start justify-between gap-2"
                        >
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-slate-900 dark:text-white">
                              {isHi ? bio.authorNameHi : bio.authorNameEn}{' '}
                              <span className="text-[11px] font-normal text-slate-500">
                                ({bio.period})
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">
                              {isHi ? bio.summaryHi : bio.summaryEn}
                            </p>
                          </div>
                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              type="button"
                              onClick={() => startEditBio(bio)}
                              title="Edit Biography"
                              className="p-1.5 rounded-lg text-indigo-600 hover:bg-indigo-50 cursor-pointer"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => onDeleteBiography(activeSubjectBp.id, bio.id)}
                              title="Delete Biography"
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* SUBTAB 3D: High-Yield Notes & Board Exam Rules/Tips */}
              {contentSubTab === 'notes_tips' && (
                <div className="space-y-5">
                  {classNotes.length > 0 && (
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2.5">
                      <div className="text-xs font-extrabold text-slate-900 dark:text-white">
                        {isHi
                          ? `कक्षा ${editClass}वीं रिपीट नोट्स (शीर्षक, वर्ष व सूत्र — Hindi/English):`
                          : `Class ${editClass}th High-Yield Repeat Notes (Title, Repeat Years & Formula):`}
                      </div>
                      <div className="space-y-2.5">
                        {classNotes.map((note) => (
                          <div
                            key={note.id}
                            className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-2"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                                {isHi ? note.subjectNameHi : note.subjectNameEn}
                              </span>
                              <input
                                type="text"
                                value={note.repeatYears}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  onUpdateNotes(
                                    activePack.notes.map((n) =>
                                      n.id === note.id ? { ...n, repeatYears: val } : n
                                    )
                                  );
                                }}
                                placeholder="Repeat Years"
                                className="px-2.5 py-1 text-xs rounded bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono w-48"
                              />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              <input
                                type="text"
                                value={note.titleHi}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  onUpdateNotes(
                                    activePack.notes.map((n) =>
                                      n.id === note.id ? { ...n, titleHi: val } : n
                                    )
                                  );
                                }}
                                placeholder="Note Title (Hindi)"
                                className="px-2.5 py-1 text-xs rounded bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                              />
                              <input
                                type="text"
                                value={note.titleEn}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  onUpdateNotes(
                                    activePack.notes.map((n) =>
                                      n.id === note.id ? { ...n, titleEn: val } : n
                                    )
                                  );
                                }}
                                placeholder="Note Title (English)"
                                className="px-2.5 py-1 text-xs rounded bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Board Exam Tips / Rules Editor (HI & EN) */}
                  <div className="p-4 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/50 space-y-2.5">
                    <div className="text-xs font-extrabold text-indigo-950 dark:text-indigo-200">
                      {isHi
                        ? 'यूपी बोर्ड परीक्षा नियम व टॉपर टिप्स (यदि भविष्य में बोर्ड पैटर्न बदले):'
                        : 'UPMSP Board Rules & Exam Guidelines (Editable for Future Pattern Changes):'}
                    </div>
                    <div className="space-y-2.5">
                      {activePack.examTips.map((tip, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-2"
                        >
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <input
                              type="text"
                              value={tip.titleHi}
                              onChange={(e) => {
                                const val = e.target.value;
                                onUpdateExamTips(
                                  activePack.examTips.map((t, i) =>
                                    i === idx ? { ...t, titleHi: val } : t
                                  )
                                );
                              }}
                              placeholder={`Tip ${idx + 1} Title (Hindi)`}
                              className="px-2.5 py-1 text-xs font-bold rounded bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                            />
                            <input
                              type="text"
                              value={tip.titleEn}
                              onChange={(e) => {
                                const val = e.target.value;
                                onUpdateExamTips(
                                  activePack.examTips.map((t, i) =>
                                    i === idx ? { ...t, titleEn: val } : t
                                  )
                                );
                              }}
                              placeholder={`Tip ${idx + 1} Title (English)`}
                              className="px-2.5 py-1 text-xs font-bold rounded bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                            />
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <textarea
                              rows={2}
                              value={tip.descHi}
                              onChange={(e) => {
                                const val = e.target.value;
                                onUpdateExamTips(
                                  activePack.examTips.map((t, i) =>
                                    i === idx ? { ...t, descHi: val } : t
                                  )
                                );
                              }}
                              placeholder="Rule Description (Hindi)"
                              className="px-2.5 py-1 text-xs rounded bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                            />
                            <textarea
                              rows={2}
                              value={tip.descEn}
                              onChange={(e) => {
                                const val = e.target.value;
                                onUpdateExamTips(
                                  activePack.examTips.map((t, i) =>
                                    i === idx ? { ...t, descEn: val } : t
                                  )
                                );
                              }}
                              placeholder="Rule Description (English)"
                              className="px-2.5 py-1 text-xs rounded bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ============== TAB 4: JSON EXPORT / COPY TEMPLATE / IMPORT / RESET ============== */}
          {activeTab === 'backup' && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/50 space-y-3">
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                    {isHi ? '1-मिनट मास्टर JSON एक्सपोर्ट व कॉपी' : '1-Min Master JSON Export & Copy'}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    {isHi
                      ? 'अपने पूरे वर्ष के हिंदी + इंग्लिश सिलेबस, PDF लिंक, परिचय व प्रश्नों की JSON फ़ाइल सेव या कॉपी करें।'
                      : 'Download or copy the complete Hindi + English pack JSON to edit or deploy across any future year or APK.'}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={handleDownloadJsonBackup}
                      className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download {activePack.session.examYear} Pack JSON</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleDownloadBackendConfigJson}
                      className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download public/syllabus-config.json</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleCopyJsonToClipboard}
                      className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300 text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Full JSON</span>
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-rose-50/70 dark:bg-rose-950/25 border border-rose-200 dark:border-rose-900/50 space-y-3">
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                    {isHi ? '2026 मूल डिफ़ॉल्ट रीस्टोर करें' : 'Restore Official 2026 Default'}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    {isHi
                      ? 'यदि आप सभी बदलाव हटाकर प्रारंभिक UPMSP 2026 पाठ्यक्रम वापस लाना चाहते हैं।'
                      : 'Reset back to the untouched official UPMSP 2025–2026 baseline pack.'}
                  </p>
                  {!confirmReset ? (
                    <button
                      type="button"
                      onClick={() => setConfirmReset(true)}
                      className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>{isHi ? '2026 डिफ़ॉल्ट रीसेट करें' : 'Reset to 2026 Default'}</span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          onResetToDefault2026();
                          setConfirmReset(false);
                          showToast(
                            'ok',
                            isHi ? '2026 डिफ़ॉल्ट पैक रीस्टोर हो गया!' : 'Restored 2026 Official Default!'
                          );
                        }}
                        className="px-3.5 py-1.5 rounded-lg bg-rose-700 text-white text-xs font-bold cursor-pointer"
                      >
                        Confirm Reset
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmReset(false)}
                        className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 text-xs font-bold border border-slate-300 dark:border-slate-600 cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                    {isHi ? 'JSON से नया वर्ष पैक इम्पोर्ट करें:' : 'Import Year Pack from JSON File or Text:'}
                  </h3>
                  <label className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 text-xs font-bold text-indigo-600 dark:text-indigo-400 inline-flex items-center gap-1.5 cursor-pointer">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload .json File</span>
                    <input
                      type="file"
                      accept=".json,application/json"
                      onChange={handleUploadJsonFile}
                      className="hidden"
                    />
                  </label>
                </div>
                <textarea
                  rows={5}
                  value={importJsonText}
                  onChange={(e) => setImportJsonText(e.target.value)}
                  placeholder="Paste exported SyllabusYearPack JSON here..."
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono"
                />
                <button
                  type="button"
                  disabled={!importJsonText.trim()}
                  onClick={handleImportJsonText}
                  className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-indigo-600 disabled:opacity-40 text-white text-xs font-bold cursor-pointer"
                >
                  {isHi ? 'इम्पोर्ट करें और 1 क्लिक में लागू करें' : 'Import & Activate Pack'}
                </button>
              </div>

              {/* Owner Passcode Security Section */}
              <form
                onSubmit={handleChangeOwnerPasscode}
                className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 space-y-3"
              >
                <div className="flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                    {isHi ? 'Owner Admin पासवर्ड बदलें' : 'Change Owner Admin Password'}
                  </h3>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  {isHi
                    ? 'यह गुप्त आइकन सिर्फ़ आपके डिवाइस पर दिखता है। छात्रों को यह नहीं दिखेगा। दोबारा खोलने के तरीके: #admin, ?admin=1, Ctrl+Shift+A, ExamInside लोगो पर 3 टैप या फ़ुटर कॉपीराइट पर 5 टैप।'
                    : 'Your Owner Icon is hidden from students. Re-open anytime via: #admin, ?admin=1, Ctrl+Shift+A, 3 rapid taps on the ExamInside Logo, or 5 taps on Footer copyright.'}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <input
                    type="password"
                    value={currPassInput}
                    onChange={(e) => setCurrPassInput(e.target.value)}
                    placeholder={isHi ? 'वर्तमान पासवर्ड' : 'Current Passcode'}
                    className="px-3 py-2 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                  />
                  <input
                    type="password"
                    value={newPassInput}
                    onChange={(e) => setNewPassInput(e.target.value)}
                    placeholder={isHi ? 'नया पासवर्ड (min 4 अक्षर)' : 'New Passcode (min 4 chars)'}
                    className="px-3 py-2 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                  />
                  <button
                    type="submit"
                    disabled={!currPassInput.trim() || !newPassInput.trim()}
                    className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 disabled:opacity-40 text-white text-xs font-bold inline-flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{isHi ? 'पासवर्ड अपडेट करें' : 'Update Passcode'}</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-4 sm:px-6 py-3 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-700/80 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400 shrink-0">
          <span>
            {isHi
              ? 'सभी बदलाव ऑटोमैटिक सेव होते हैं — छात्र स्क्रीन पर कोई एडिट बटन नहीं दिखेगा।'
              : 'All changes auto-save locally — Student View stays 100% study-only.'}
          </span>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={onLockAdmin}
              className="px-3.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{isHi ? 'लॉक करें (मेरा आइकन रहे)' : 'Lock Admin (Keep Icon)'}</span>
            </button>
            <button
              type="button"
              onClick={onLockAndHideIcon}
              className="px-3.5 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-800 text-white font-bold inline-flex items-center gap-1.5 cursor-pointer"
            >
              <EyeOff className="w-3.5 h-3.5" />
              <span>{isHi ? 'आइकन छुपाएं (Student View)' : 'Hide Icon & Lock (Student View)'}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold cursor-pointer"
            >
              {isHi ? 'डैशबोर्ड पर लौटें' : 'Done & View App'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
