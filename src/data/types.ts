export type Medium = 'hindi' | 'english';
export type ClassLevel = '10' | '12';
export type ResourceType =
  | 'chapters'
  | 'mcqs'
  | 'important_questions'
  | 'biographies'
  | 'solved_papers'
  | 'notes';

export interface MCQQuestion {
  id: string;
  questionNumber: number;
  questionHi: string;
  questionEn: string;
  optionsHi: [string, string, string, string];
  optionsEn: [string, string, string, string];
  correctIndex: number;
  explanationHi: string;
  explanationEn: string;
  chapter: string;
  chapterEn: string;
  boardYears: string[];
}

export interface ImportantQuestion {
  id: string;
  marks: 2 | 3 | 4 | 5 | 6 | 7 | 8;
  chapter: string;
  chapterEn: string;
  questionHi: string;
  questionEn: string;
  answerHi: string;
  answerEn: string;
  probability: 'High' | 'Very High' | 'Repeated';
  boardYears: string[];
  tagHi?: string;
  tagEn?: string;
}

export interface ChapterQuestionItem {
  id: string;
  number: number;
  type: 'mcq' | 'short' | 'long';
  marks: 1 | 2 | 3 | 5 | 6 | 8;
  questionHi: string;
  questionEn: string;
  optionsHi?: [string, string, string, string];
  optionsEn?: [string, string, string, string];
  correctIndex?: number;
  answerHi: string;
  answerEn: string;
  boardYears: string[];
  repeatTag: string;
}

export interface ChapterEntry {
  id: string;
  number: number;
  sectionHi: string;
  sectionEn: string;
  titleHi: string;
  titleEn: string;
  authorOrTopicHi: string;
  authorOrTopicEn: string;
  keyFocusHi: string;
  keyFocusEn: string;
  boardWeightage: string;
  poemsOrShlokasHi?: string[];
  poemsOrShlokasEn?: string[];
  formulaOrTrickHi?: string;
  formulaOrTrickEn?: string;
}

export interface BiographyItem {
  id: string;
  authorNameHi: string;
  authorNameEn: string;
  period: string;
  category: 'Gadhya (Prose)' | 'Kavya (Poetry)' | 'English Literature';
  birthPlaceHi: string;
  birthPlaceEn: string;
  notableWorksHi: string[];
  notableWorksEn: string[];
  summaryHi: string;
  summaryEn: string;
  examTipsHi: string;
  examTipsEn: string;
  examWordLimit: string;
}

export interface SolvedPaper {
  id: string;
  year: number;
  paperTypeHi: string;
  paperTypeEn: string;
  paperCode: string;
  titleHi: string;
  titleEn: string;
  totalMarks: number;
  timeLimit: string;
  pdfPages: number;
  pdfUrl: string;
  sampleSections: {
    sectionNameHi: string;
    sectionNameEn: string;
    questionsCount: number;
    sampleQHi: string;
    sampleQEn: string;
    solutionHintHi: string;
    solutionHintEn: string;
  }[];
}

export interface HighYieldNoteItem {
  id: string;
  classLevel: ClassLevel;
  subjectId: string;
  subjectNameHi: string;
  subjectNameEn: string;
  badgeHi: string;
  badgeEn: string;
  titleHi: string;
  titleEn: string;
  repeatYears: string;
  pointsHi: string[];
  pointsEn: string[];
  formulaOrQuoteHi?: string;
  formulaOrQuoteEn?: string;
}

export interface ExamTipItem {
  titleHi: string;
  titleEn: string;
  descHi: string;
  descEn: string;
}

export interface SubjectBlueprint {
  id: string;
  classLevel: ClassLevel;
  code: string;
  isHindiLanguageSubject?: boolean;
  nameHi: string;
  nameEn: string;
  taglineHi: string;
  taglineEn: string;
  iconName: string;
  colorTheme: {
    bgLight: string;
    bgDark: string;
    borderLight: string;
    borderDark: string;
    accent: string;
    text: string;
  };
  chapterDetails: ChapterEntry[];
  coreMcqs: Omit<MCQQuestion, 'questionNumber'>[];
  coreImportantQuestions: ImportantQuestion[];
  biographies: BiographyItem[];
  solvedPapers: SolvedPaper[];
}

export interface SyllabusSessionConfig {
  examYear: number;
  sessionLabel: string;
  paperYears: number[];
  shortRangeLabel: string;
  compactNavRange: string;
  packLabel: string;
}

export interface SyllabusYearPack {
  id: string;
  session: SyllabusSessionConfig;
  class10Blueprints: SubjectBlueprint[];
  class12Blueprints: SubjectBlueprint[];
  notes: HighYieldNoteItem[];
  examTips: ExamTipItem[];
  syncFeedUrl?: string;
  updatedAt: string;
}

export interface SubjectItem {
  id: string;
  classLevel: ClassLevel;
  code: string;
  isHindiLanguageSubject?: boolean;
  nameHi: string;
  nameEn: string;
  taglineHi: string;
  taglineEn: string;
  iconName: string;
  colorTheme: {
    bgLight: string;
    bgDark: string;
    borderLight: string;
    borderDark: string;
    accent: string;
    text: string;
  };
  totalMcqsCount: number;
  totalImpQuestionsCount: number;
  totalBiographiesCount: number;
  solvedPapersYears: string;
  chaptersCount: number;
  chapters: string[];
  chapterDetails: ChapterEntry[];
  mcqs: MCQQuestion[];
  importantQuestions: ImportantQuestion[];
  biographies: BiographyItem[];
  solvedPapers: SolvedPaper[];
}

export const APP_NAME = 'ExamInside';
export const LEGACY_APP_ID = 'Class10to12ExmLeaker';
export const AUTHOR_NAME = 'Er. M.Pk Mentor';
export const BOARD_NAME = 'UP Board (UPMSP - Uttar Pradesh Madhyamik Shiksha Parishad)';
