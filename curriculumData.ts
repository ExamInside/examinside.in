import { SubjectBlueprint, SubjectItem, SyllabusSessionConfig } from './types';
import { CLASS_10_BLUEPRINTS } from './class10Blueprint';
import { CLASS_12_BLUEPRINTS } from './class12Blueprint';
import {
  buildFourHundredMcqs,
  buildSubjectImportantQuestions,
  getChapterQuestionBank,
  clearChapterQuestionCache,
} from './questionBankGenerator';
import { HIGH_YIELD_NOTES, UP_BOARD_EXAM_TIPS } from './notesAndTips';

export * from './types';
export {
  HIGH_YIELD_NOTES,
  UP_BOARD_EXAM_TIPS,
  getChapterQuestionBank,
  clearChapterQuestionCache,
  CLASS_10_BLUEPRINTS,
  CLASS_12_BLUEPRINTS,
};

export const DEFAULT_SESSION_CONFIG: SyllabusSessionConfig = {
  examYear: 2026,
  sessionLabel: '2025–2026',
  paperYears: [2026, 2025, 2024],
  shortRangeLabel: '2024–26',
  compactNavRange: '24–26',
  packLabel: 'UPMSP 2026 Official',
};

export function hydrateSubject(
  bp: SubjectBlueprint,
  session: SyllabusSessionConfig = DEFAULT_SESSION_CONFIG
): SubjectItem {
  const mcqs = buildFourHundredMcqs(bp, session);
  const importantQuestions = buildSubjectImportantQuestions(bp, session);
  const chapters = bp.chapterDetails.map((c) => c.titleHi);

  return {
    id: bp.id,
    classLevel: bp.classLevel,
    code: bp.code,
    isHindiLanguageSubject: bp.isHindiLanguageSubject,
    nameHi: bp.nameHi,
    nameEn: bp.nameEn,
    taglineHi: bp.taglineHi,
    taglineEn: bp.taglineEn,
    iconName: bp.iconName,
    colorTheme: bp.colorTheme,
    totalMcqsCount: mcqs.length, // Exact 400 per subject
    totalImpQuestionsCount: bp.chapterDetails.length * 50, // 50+ Questions per chapter
    totalBiographiesCount: bp.biographies.length,
    solvedPapersYears: `${session.shortRangeLabel} (${bp.solvedPapers.length}-Yr Vault)`,
    chaptersCount: bp.chapterDetails.length,
    chapters,
    chapterDetails: bp.chapterDetails,
    mcqs,
    importantQuestions,
    biographies: bp.biographies,
    solvedPapers: bp.solvedPapers,
  };
}

export function hydrateBlueprints(
  class10Blueprints: SubjectBlueprint[],
  class12Blueprints: SubjectBlueprint[],
  session: SyllabusSessionConfig
): SubjectItem[] {
  return [
    ...class10Blueprints.map((bp) => hydrateSubject(bp, session)),
    ...class12Blueprints.map((bp) => hydrateSubject(bp, session)),
  ];
}

export const SUBJECTS_DATA: SubjectItem[] = hydrateBlueprints(
  CLASS_10_BLUEPRINTS,
  CLASS_12_BLUEPRINTS,
  DEFAULT_SESSION_CONFIG
);
