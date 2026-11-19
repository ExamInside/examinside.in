import {
  SubjectItem,
  ClassLevel,
  Medium,
  HighYieldNoteItem,
} from '../data/curriculumData';

export interface ScoreReport {
  score: number;
  total: number;
  percentage: number;
  isPass: boolean;
  division: 'First Division' | 'Second Division' | 'Third Division' | 'Needs Improvement (Fail)';
  divisionHi: 'प्रथम श्रेणी (Distinction/First)' | 'द्वितीय श्रेणी' | 'तृतीय श्रेणी' | 'सुधार की आवश्यकता (अनुत्तीर्ण)';
}

/**
 * Dual-Medium Rule:
 * When English Medium is selected, Hindi subject stays in Hindi,
 * while all other subjects switch to English Medium.
 * When Hindi Medium is selected, all subjects adapt to Hindi Medium.
 */
export function getEffectiveSubjectMedium(
  subject: Pick<SubjectItem, 'isHindiLanguageSubject'>,
  appMedium: Medium
): Medium {
  if (appMedium === 'english' && subject.isHindiLanguageSubject) {
    return 'hindi';
  }
  return appMedium;
}

/**
 * Filter subjects by target class and search query across names, codes, topics, and all chapters
 */
export function filterSubjects(
  subjects: SubjectItem[],
  classLevel: ClassLevel,
  searchQuery: string = ''
): SubjectItem[] {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  return subjects.filter((subject) => {
    if (subject.classLevel !== classLevel) {
      return false;
    }
    if (!normalizedQuery) {
      return true;
    }
    return (
      subject.nameHi.toLowerCase().includes(normalizedQuery) ||
      subject.nameEn.toLowerCase().includes(normalizedQuery) ||
      subject.code.toLowerCase().includes(normalizedQuery) ||
      subject.taglineHi.toLowerCase().includes(normalizedQuery) ||
      subject.taglineEn.toLowerCase().includes(normalizedQuery) ||
      subject.chapters.some((c) => c.toLowerCase().includes(normalizedQuery)) ||
      subject.chapterDetails.some(
        (ch) =>
          ch.titleHi.toLowerCase().includes(normalizedQuery) ||
          ch.titleEn.toLowerCase().includes(normalizedQuery) ||
          ch.authorOrTopicHi.toLowerCase().includes(normalizedQuery) ||
          ch.authorOrTopicEn.toLowerCase().includes(normalizedQuery) ||
          ch.keyFocusHi.toLowerCase().includes(normalizedQuery) ||
          ch.keyFocusEn.toLowerCase().includes(normalizedQuery)
      )
    );
  });
}

/**
 * Clamp MCQ index cleanly within valid 0..(total-1) bounds
 */
export function clampMcqIndex(index: number, total: number): number {
  if (total <= 0) return 0;
  if (index < 0) return 0;
  if (index >= total) return total - 1;
  return index;
}

/**
 * Returns 1-based quick-jump checkpoints for continuous MCQ engines (e.g., Q1, Q50, Q100, Q200, Q300, Q397, Q400)
 */
export function getMcqQuickJumpNumbers(total: number): number[] {
  if (total <= 0) return [];
  if (total >= 400) {
    return [1, 50, 100, 200, 300, 397, 400];
  }
  const candidates = [1, 10, 20, 25, 50, 100, 200, 300, total];
  return Array.from(new Set(candidates.filter((n) => n >= 1 && n <= total))).sort((a, b) => a - b);
}

/**
 * Filter High-Yield Notes by class and optional search query
 */
export function filterHighYieldNotes(
  notes: HighYieldNoteItem[],
  classLevel: ClassLevel,
  searchQuery: string = ''
): HighYieldNoteItem[] {
  const q = searchQuery.trim().toLowerCase();
  return notes.filter((n) => {
    if (n.classLevel !== classLevel) return false;
    if (!q) return true;
    return (
      n.subjectNameHi.toLowerCase().includes(q) ||
      n.subjectNameEn.toLowerCase().includes(q) ||
      n.titleHi.toLowerCase().includes(q) ||
      n.titleEn.toLowerCase().includes(q) ||
      n.pointsHi.some((p) => p.toLowerCase().includes(q)) ||
      n.pointsEn.some((p) => p.toLowerCase().includes(q))
    );
  });
}

/**
 * Calculates board grade and division based on official UP Board examination criteria
 */
export function calculateScoreReport(score: number, total: number): ScoreReport {
  if (total <= 0) {
    return {
      score: 0,
      total: 0,
      percentage: 0,
      isPass: false,
      division: 'Needs Improvement (Fail)',
      divisionHi: 'सुधार की आवश्यकता (अनुत्तीर्ण)',
    };
  }

  const rawPercent = (score / total) * 100;
  const percentage = Math.round(rawPercent * 10) / 10;
  const isPass = percentage >= 33;

  let division: ScoreReport['division'] = 'Needs Improvement (Fail)';
  let divisionHi: ScoreReport['divisionHi'] = 'सुधार की आवश्यकता (अनुत्तीर्ण)';

  if (percentage >= 60) {
    division = 'First Division';
    divisionHi = 'प्रथम श्रेणी (Distinction/First)';
  } else if (percentage >= 45) {
    division = 'Second Division';
    divisionHi = 'द्वितीय श्रेणी';
  } else if (percentage >= 33) {
    division = 'Third Division';
    divisionHi = 'तृतीय श्रेणी';
  }

  return {
    score,
    total,
    percentage,
    isPass,
    division,
    divisionHi,
  };
}

/**
 * Calculate aggregate syllabus metrics for a specific class level
 */
export function getClassAggregateMetrics(subjects: SubjectItem[], classLevel: ClassLevel) {
  const classSubjects = subjects.filter((s) => s.classLevel === classLevel);
  const totalSubjects = classSubjects.length;
  const totalChapters = classSubjects.reduce((acc, curr) => acc + curr.chaptersCount, 0);
  const totalMcqs = classSubjects.reduce((acc, curr) => acc + curr.mcqs.length, 0);
  const totalImpQuestions = classSubjects.reduce((acc, curr) => acc + curr.totalImpQuestionsCount, 0);
  const totalBiographies = classSubjects.reduce((acc, curr) => acc + curr.totalBiographiesCount, 0);
  const totalSolvedPapers = classSubjects.reduce((acc, curr) => acc + curr.solvedPapers.length, 0);

  return {
    totalSubjects,
    totalChapters,
    totalMcqs,
    totalImpQuestions,
    totalBiographies,
    totalSolvedPapers,
  };
}

/**
 * Toggle bookmark utility
 */
export function toggleBookmarkId(existingIds: string[], targetId: string): string[] {
  if (existingIds.includes(targetId)) {
    return existingIds.filter((id) => id !== targetId);
  }
  return [...existingIds, targetId];
}

/**
 * Returns localized label based on selected medium
 */
export function getLocalizedText(
  medium: Medium,
  hindiText: string,
  englishText: string
): string {
  return medium === 'hindi' ? hindiText : englishText;
      }
