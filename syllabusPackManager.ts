import {
  BiographyItem,
  ChapterEntry,
  ExamTipItem,
  HighYieldNoteItem,
  ImportantQuestion,
  MCQQuestion,
  SolvedPaper,
  SubjectBlueprint,
  SyllabusSessionConfig,
  SyllabusYearPack,
} from '../data/types';
import {
  CLASS_10_BLUEPRINTS,
  CLASS_12_BLUEPRINTS,
  DEFAULT_SESSION_CONFIG,
  HIGH_YIELD_NOTES,
  UP_BOARD_EXAM_TIPS,
} from '../data/curriculumData';

export const YEAR_PACKS_STORAGE_KEY = 'examinside_year_packs_v1';

export interface SavedPacksState {
  activePackId: string;
  packs: SyllabusYearPack[];
}

function deepClone<T>(val: T): T {
  return JSON.parse(JSON.stringify(val)) as T;
}

export function buildSessionConfig(
  examYear: number,
  paperYears?: number[],
  packLabel?: string
): SyllabusSessionConfig {
  const safeYear = Math.min(2099, Math.max(2020, Math.round(examYear) || 2026));
  const rawYears =
    paperYears && paperYears.length > 0
      ? paperYears
      : [safeYear, safeYear - 1, safeYear - 2];

  const normalizedYears = Array.from(
    new Set(
      rawYears
        .map((y) => Math.round(Number(y)))
        .filter((y) => !Number.isNaN(y) && y >= 2015 && y <= 2099)
    )
  ).sort((a, b) => b - a);

  const finalYears =
    normalizedYears.length > 0
      ? normalizedYears
      : [safeYear, safeYear - 1, safeYear - 2];

  const minYr = Math.min(...finalYears);
  const maxYr = Math.max(...finalYears);
  const shortRangeLabel =
    minYr === maxYr ? `${maxYr}` : `${minYr}–${String(maxYr).slice(-2)}`;
  const compactNavRange =
    minYr === maxYr
      ? String(maxYr).slice(-2)
      : `${String(minYr).slice(-2)}–${String(maxYr).slice(-2)}`;

  return {
    examYear: safeYear,
    sessionLabel: `${safeYear - 1}–${safeYear}`,
    paperYears: finalYears,
    shortRangeLabel,
    compactNavRange,
    packLabel: packLabel?.trim() || `UPMSP ${safeYear} Syllabus`,
  };
}

export function parsePaperYearsInput(input: string, fallbackExamYear: number): number[] {
  const parts = input
    .split(/[\s,;]+/)
    .map((s) => parseInt(s.trim(), 10))
    .filter((n) => !Number.isNaN(n) && n >= 2015 && n <= 2099);
  const unique = Array.from(new Set(parts)).sort((a, b) => b - a);
  if (unique.length === 0) {
    return [fallbackExamYear, fallbackExamYear - 1, fallbackExamYear - 2];
  }
  return unique;
}

export function buildDefault2026Pack(): SyllabusYearPack {
  return {
    id: 'pack-2026',
    session: deepClone(DEFAULT_SESSION_CONFIG),
    class10Blueprints: deepClone(CLASS_10_BLUEPRINTS),
    class12Blueprints: deepClone(CLASS_12_BLUEPRINTS),
    notes: deepClone(HIGH_YIELD_NOTES),
    examTips: deepClone(UP_BOARD_EXAM_TIPS as ExamTipItem[]),
    updatedAt: new Date().toISOString(),
  };
}

export function createSolvedPaperForYear(
  bp: SubjectBlueprint,
  year: number,
  examYear: number,
  templatePaper?: SolvedPaper
): SolvedPaper {
  const isLatestOrModel = year >= examYear;
  const yy = String(year).slice(-2);
  const baseSections =
    templatePaper?.sampleSections && templatePaper.sampleSections.length > 0
      ? deepClone(templatePaper.sampleSections)
      : [
          {
            sectionNameHi: 'खंड-अ: 20 बहुविकल्पीय प्रश्न (OMR आधारित)',
            sectionNameEn: 'Section A: 20 Objective MCQs (OMR Based)',
            questionsCount: 20,
            sampleQHi: `${bp.nameHi} के मुख्य अध्यायों से संभावित OMR प्रश्न।`,
            sampleQEn: `Top high-repeat OMR MCQs from ${bp.nameEn}.`,
            solutionHintHi: 'सभी विकल्पों का NCERT / UPMSP के अनुसार सटीक विश्लेषण।',
            solutionHintEn: 'Verified NCERT / UPMSP OMR answer key with step checks.',
          },
          {
            sectionNameHi: 'खंड-ब: वर्णनात्मक लघु एवं दीर्घ उत्तरीय प्रश्न',
            sectionNameEn: 'Section B: Subjective Short & Long Answers',
            questionsCount: 10,
            sampleQHi: `मुख्य सिद्धांत, सूत्र, निगमन, जीवन परिचय व मानचित्र/आरेख कार्य।`,
            sampleQEn: `Core derivations, theories, biographies, essays & labelled diagrams.`,
            solutionHintHi: 'स्टेप-मार्किंग नियम के अनुसार बिंदुवार मॉडल उत्तर।',
            solutionHintEn: 'Pointwise step-marking rubric with SI units & key terms.',
          },
        ];

  return {
    id: `${bp.id}-${year}`,
    year,
    paperTypeHi: isLatestOrModel
      ? `${year} आधिकारिक मॉडल / लीक गेस पेपर PDF`
      : `${year} वास्तविक हल बोर्ड प्रश्नपत्र PDF`,
    paperTypeEn: isLatestOrModel
      ? `${year} Official Guess / Leak Model Paper PDF`
      : `${year} Official Solved Board Paper PDF`,
    paperCode: `${bp.code} ${isLatestOrModel ? 'ML' : 'BP'}-${yy}`,
    titleHi: isLatestOrModel
      ? `UP बोर्ड ${bp.nameHi} ${year} मॉडल लीक पेपर (100% संभावित प्रश्न)`
      : `UP बोर्ड ${bp.nameHi} ${year} हल प्रश्नपत्र (All Sets Key)`,
    titleEn: isLatestOrModel
      ? `UP Board ${bp.nameEn} ${year} Official Model & Leak Paper`
      : `UP Board ${bp.nameEn} ${year} Solved Question Paper`,
    totalMarks: templatePaper?.totalMarks ?? (bp.classLevel === '10' ? 70 : 100),
    timeLimit: templatePaper?.timeLimit ?? '3 Hours 15 Mins',
    pdfPages: templatePaper?.pdfPages ?? (isLatestOrModel ? 16 : 12),
    pdfUrl: `https://upmsp.edu.in/ModelPaper${year}_${bp.code}.pdf`,
    sampleSections: baseSections,
  };
}

function mapLegacyBoardYears(
  originalYears: string[],
  oldExamYear: number,
  newExamYear: number,
  targetPaperYears: number[]
): string[] {
  const delta = newExamYear - oldExamYear;
  if (delta === 0) return [...originalYears];
  const minTarget = Math.min(...targetPaperYears);
  const maxTarget = Math.max(...targetPaperYears);

  return originalYears.map((label) => {
    const match = label.match(/\b(20\d{2})\b/);
    if (!match) return label;
    const yr = parseInt(match[1], 10) + delta;
    const clamped = Math.min(maxTarget, Math.max(minTarget - 1, yr));
    return label.replace(match[1], String(clamped));
  });
}

function shiftSubjectBlueprint(
  bp: SubjectBlueprint,
  oldExamYear: number,
  session: SyllabusSessionConfig
): SubjectBlueprint {
  const cloned = deepClone(bp);
  const existingByYear = new Map<number, SolvedPaper>();
  cloned.solvedPapers.forEach((p) => existingByYear.set(p.year, p));
  const templatePaper = cloned.solvedPapers[0];

  cloned.solvedPapers = session.paperYears.map((yr) => {
    const existing = existingByYear.get(yr);
    if (existing) {
      return existing;
    }
    return createSolvedPaperForYear(cloned, yr, session.examYear, templatePaper);
  });

  cloned.coreMcqs = cloned.coreMcqs.map((m) => ({
    ...m,
    boardYears: mapLegacyBoardYears(
      m.boardYears,
      oldExamYear,
      session.examYear,
      session.paperYears
    ),
  }));

  cloned.coreImportantQuestions = cloned.coreImportantQuestions.map((q) => ({
    ...q,
    boardYears: mapLegacyBoardYears(
      q.boardYears,
      oldExamYear,
      session.examYear,
      session.paperYears
    ),
  }));

  return cloned;
}

/**
 * Creates or shifts an entire Year Pack in 1 click (updates session years,
 * generates/updates solved papers for all paperYears across all 12 subjects,
 * and updates repeat-year badges while preserving all subjects & chapters).
 */
export function shiftYearPack(
  basePack: SyllabusYearPack,
  newExamYear: number,
  customPaperYears?: number[],
  packLabel?: string
): SyllabusYearPack {
  const session = buildSessionConfig(newExamYear, customPaperYears, packLabel);
  const oldExamYear = basePack.session.examYear;
  const repeatLabel =
    [...session.paperYears].sort((a, b) => a - b).join(' · ') + ' Model';

  return {
    id: `pack-${session.examYear}`,
    session,
    class10Blueprints: basePack.class10Blueprints.map((bp) =>
      shiftSubjectBlueprint(bp, oldExamYear, session)
    ),
    class12Blueprints: basePack.class12Blueprints.map((bp) =>
      shiftSubjectBlueprint(bp, oldExamYear, session)
    ),
    notes: basePack.notes.map((n) => ({
      ...deepClone(n),
      repeatYears: repeatLabel,
    })),
    examTips: deepClone(basePack.examTips),
    syncFeedUrl: basePack.syncFeedUrl,
    updatedAt: new Date().toISOString(),
  };
}

function splitBilingualSegment(segment: string, fallback: string): { hi: string; en: string } {
  const cleaned = segment.trim();
  if (!cleaned) return { hi: fallback, en: fallback };
  if (cleaned.includes('::')) {
    const [rawHi, ...rest] = cleaned.split('::');
    const hi = rawHi.trim() || fallback;
    const en = rest.join('::').trim() || hi;
    return { hi, en };
  }
  return { hi: cleaned, en: cleaned };
}

function looksLikeMarksToken(val: string): boolean {
  return /\b(marks?|अंक)\b/i.test(val) || /^\d+(\s*[–-]\s*\d+)?$/.test(val.trim());
}

/**
 * Bulk-parses lines into bilingual ChapterEntry[] for rapid yearly syllabus updates.
 * Supports:
 * 1) "Chapter Title" or "अध्याय हिंदी :: Chapter Title English"
 * 2) "TitleHi :: TitleEn | 5 Marks"
 * 3) "Section | Title | 6 Marks" or "Section | Title | Topic | Focus | Marks"
 */
export function bulkParseChaptersText(
  rawText: string,
  subjectBp: SubjectBlueprint
): ChapterEntry[] {
  const lines = rawText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length === 0) {
    return subjectBp.chapterDetails;
  }

  return lines.map((line, idx) => {
    const parts = line.split('|').map((p) => p.trim());
    const num = idx + 1;

    let rawSection = '';
    let rawTitle = line.replace(/^\d+[\.)]\s*/, '');
    let rawTopic = '';
    let rawFocus = '';
    let weightage = '4–6 Marks';

    if (parts.length === 2) {
      if (looksLikeMarksToken(parts[1])) {
        rawTitle = parts[0] || rawTitle;
        weightage = parts[1];
      } else {
        rawSection = parts[0];
        rawTitle = parts[1] || rawTitle;
      }
    } else if (parts.length === 3) {
      rawSection = parts[0];
      rawTitle = parts[1] || rawTitle;
      if (looksLikeMarksToken(parts[2])) {
        weightage = parts[2];
      } else {
        rawTopic = parts[2];
      }
    } else if (parts.length === 4) {
      rawSection = parts[0];
      rawTitle = parts[1] || rawTitle;
      if (looksLikeMarksToken(parts[3])) {
        rawFocus = parts[2];
        weightage = parts[3];
      } else {
        rawTopic = parts[2];
        rawFocus = parts[3];
      }
    } else if (parts.length >= 5) {
      rawSection = parts[0];
      rawTitle = parts[1] || rawTitle;
      rawTopic = parts[2];
      rawFocus = parts[3];
      weightage = parts[4] || weightage;
    }

    const section = rawSection
      ? splitBilingualSegment(rawSection, 'Core Unit')
      : { hi: 'पाठ्यक्रम इकाई', en: 'Syllabus Unit' };

    const title = splitBilingualSegment(rawTitle, line);

    const topic = rawTopic
      ? splitBilingualSegment(rawTopic, title.hi)
      : {
          hi: `${title.hi} — मुख्य अवधारणा`,
          en: `${title.en} — Core Syllabus Concept`,
        };

    const focus = rawFocus
      ? splitBilingualSegment(rawFocus, title.hi)
      : {
          hi: `${title.hi} के महत्वपूर्ण सूत्र, परिभाषाएँ एवं पिछले वर्षों के रिपीट प्रश्न।`,
          en: `High-yield definitions, board derivations & repeated PYQ practice for ${title.en}.`,
        };

    return {
      id: `${subjectBp.id}-ch-${num}-${Date.now().toString(36).slice(-3)}`,
      number: num,
      sectionHi: section.hi,
      sectionEn: section.en,
      titleHi: title.hi,
      titleEn: title.en,
      authorOrTopicHi: topic.hi,
      authorOrTopicEn: topic.en,
      keyFocusHi: focus.hi,
      keyFocusEn: focus.en,
      boardWeightage: weightage,
    };
  });
}

export function updateSubjectBlueprintInPack(
  pack: SyllabusYearPack,
  updatedBp: SubjectBlueprint
): SyllabusYearPack {
  const updateList = (list: SubjectBlueprint[]) =>
    list.map((bp) => (bp.id === updatedBp.id ? deepClone(updatedBp) : bp));

  // Keep session paperYears synced if papers were added/removed
  const allPaperYears = new Set<number>(pack.session.paperYears);
  updatedBp.solvedPapers.forEach((p) => allPaperYears.add(p.year));
  const sortedYears = Array.from(allPaperYears).sort((a, b) => b - a);
  const nextSession = buildSessionConfig(
    pack.session.examYear,
    sortedYears.length > 0 ? sortedYears : pack.session.paperYears,
    pack.session.packLabel
  );

  return {
    ...pack,
    session: nextSession,
    class10Blueprints:
      updatedBp.classLevel === '10'
        ? updateList(pack.class10Blueprints)
        : pack.class10Blueprints,
    class12Blueprints:
      updatedBp.classLevel === '12'
        ? updateList(pack.class12Blueprints)
        : pack.class12Blueprints,
    updatedAt: new Date().toISOString(),
  };
}

export function updatePaperPdfUrlInPack(
  pack: SyllabusYearPack,
  subjectId: string,
  paperId: string,
  pdfUrl: string
): SyllabusYearPack {
  const cleanUrl = pdfUrl.trim();
  if (!cleanUrl) return pack;

  const patchList = (list: SubjectBlueprint[]) =>
    list.map((bp) => {
      if (bp.id !== subjectId) return bp;
      return {
        ...bp,
        solvedPapers: bp.solvedPapers.map((p) =>
          p.id === paperId ? { ...p, pdfUrl: cleanUrl } : p
        ),
      };
    });

  return {
    ...pack,
    class10Blueprints: patchList(pack.class10Blueprints),
    class12Blueprints: patchList(pack.class12Blueprints),
    updatedAt: new Date().toISOString(),
  };
}

export function addCustomMcqToPack(
  pack: SyllabusYearPack,
  subjectId: string,
  mcq: Omit<MCQQuestion, 'questionNumber'>
): SyllabusYearPack {
  const patchList = (list: SubjectBlueprint[]) =>
    list.map((bp) => {
      if (bp.id !== subjectId) return bp;
      return {
        ...bp,
        coreMcqs: [mcq, ...bp.coreMcqs],
      };
    });

  return {
    ...pack,
    class10Blueprints: patchList(pack.class10Blueprints),
    class12Blueprints: patchList(pack.class12Blueprints),
    updatedAt: new Date().toISOString(),
  };
}

export function applyGlobalPaperUrlPatternInPack(
  pack: SyllabusYearPack,
  urlPattern: string
): SyllabusYearPack {
  const cleanPattern = urlPattern.trim();
  if (!cleanPattern) return pack;

  const formatForPaper = (bp: SubjectBlueprint, paper: SolvedPaper) =>
    cleanPattern
      .replace(/\{year\}/gi, String(paper.year))
      .replace(/\{yy\}/gi, String(paper.year).slice(-2))
      .replace(/\{class\}/gi, bp.classLevel)
      .replace(/\{code\}/gi, bp.code)
      .replace(/\{subjectId\}/gi, bp.id);

  const patchList = (list: SubjectBlueprint[]) =>
    list.map((bp) => ({
      ...bp,
      solvedPapers: bp.solvedPapers.map((p) => ({
        ...p,
        pdfUrl: formatForPaper(bp, p),
      })),
    }));

  return {
    ...pack,
    class10Blueprints: patchList(pack.class10Blueprints),
    class12Blueprints: patchList(pack.class12Blueprints),
    updatedAt: new Date().toISOString(),
  };
}

export function upsertImportantQuestionInPack(
  pack: SyllabusYearPack,
  subjectId: string,
  question: ImportantQuestion
): SyllabusYearPack {
  const patchList = (list: SubjectBlueprint[]) =>
    list.map((bp) => {
      if (bp.id !== subjectId) return bp;
      const exists = bp.coreImportantQuestions.some((q) => q.id === question.id);
      return {
        ...bp,
        coreImportantQuestions: exists
          ? bp.coreImportantQuestions.map((q) => (q.id === question.id ? question : q))
          : [question, ...bp.coreImportantQuestions],
      };
    });

  return {
    ...pack,
    class10Blueprints: patchList(pack.class10Blueprints),
    class12Blueprints: patchList(pack.class12Blueprints),
    updatedAt: new Date().toISOString(),
  };
}

export function deleteImportantQuestionInPack(
  pack: SyllabusYearPack,
  subjectId: string,
  questionId: string
): SyllabusYearPack {
  const patchList = (list: SubjectBlueprint[]) =>
    list.map((bp) => {
      if (bp.id !== subjectId) return bp;
      return {
        ...bp,
        coreImportantQuestions: bp.coreImportantQuestions.filter(
          (q) => q.id !== questionId
        ),
      };
    });

  return {
    ...pack,
    class10Blueprints: patchList(pack.class10Blueprints),
    class12Blueprints: patchList(pack.class12Blueprints),
    updatedAt: new Date().toISOString(),
  };
}

export function upsertBiographyInPack(
  pack: SyllabusYearPack,
  subjectId: string,
  biography: BiographyItem
): SyllabusYearPack {
  const patchList = (list: SubjectBlueprint[]) =>
    list.map((bp) => {
      if (bp.id !== subjectId) return bp;
      const exists = bp.biographies.some((b) => b.id === biography.id);
      return {
        ...bp,
        biographies: exists
          ? bp.biographies.map((b) => (b.id === biography.id ? biography : b))
          : [biography, ...bp.biographies],
      };
    });

  return {
    ...pack,
    class10Blueprints: patchList(pack.class10Blueprints),
    class12Blueprints: patchList(pack.class12Blueprints),
    updatedAt: new Date().toISOString(),
  };
}

export function deleteBiographyInPack(
  pack: SyllabusYearPack,
  subjectId: string,
  biographyId: string
): SyllabusYearPack {
  const patchList = (list: SubjectBlueprint[]) =>
    list.map((bp) => {
      if (bp.id !== subjectId) return bp;
      return {
        ...bp,
        biographies: bp.biographies.filter((b) => b.id !== biographyId),
      };
    });

  return {
    ...pack,
    class10Blueprints: patchList(pack.class10Blueprints),
    class12Blueprints: patchList(pack.class12Blueprints),
    updatedAt: new Date().toISOString(),
  };
}

export function exportPackToJson(pack: SyllabusYearPack): string {
  return JSON.stringify(pack, null, 2);
}

export function importPackFromJson(rawJson: string): SyllabusYearPack {
  let parsed: unknown;
  try {
    parsed = JSON.parse(rawJson);
  } catch {
    throw new Error('Invalid JSON syntax. Please check the pasted or uploaded file.');
  }

  if (!parsed || typeof parsed !== 'object') {
    throw new Error('Syllabus pack must be a valid JSON object.');
  }

  const candidate = parsed as Partial<SyllabusYearPack>;
  if (
    !candidate.session ||
    typeof candidate.session.examYear !== 'number' ||
    !Array.isArray(candidate.class10Blueprints) ||
    !Array.isArray(candidate.class12Blueprints)
  ) {
    throw new Error(
      'Missing required syllabus pack fields (session, class10Blueprints, class12Blueprints).'
    );
  }

  const normalizedSession = buildSessionConfig(
    candidate.session.examYear,
    Array.isArray(candidate.session.paperYears)
      ? candidate.session.paperYears
      : undefined,
    candidate.session.packLabel
  );

  return {
    id:
      typeof candidate.id === 'string' && candidate.id.trim()
        ? candidate.id.trim()
        : `pack-${normalizedSession.examYear}`,
    session: normalizedSession,
    class10Blueprints: candidate.class10Blueprints,
    class12Blueprints: candidate.class12Blueprints,
    notes: Array.isArray(candidate.notes)
      ? candidate.notes
      : deepClone(HIGH_YIELD_NOTES),
    examTips: Array.isArray(candidate.examTips)
      ? candidate.examTips
      : deepClone(UP_BOARD_EXAM_TIPS as ExamTipItem[]),
    syncFeedUrl:
      typeof candidate.syncFeedUrl === 'string' && candidate.syncFeedUrl.trim()
        ? candidate.syncFeedUrl.trim()
        : undefined,
    updatedAt: new Date().toISOString(),
  };
}

export async function fetchAndImportPackFromUrl(
  rawUrl: string
): Promise<SyllabusYearPack> {
  const cleanUrl = rawUrl.trim();
  if (!cleanUrl || !/^(https?:\/\/|\/)/i.test(cleanUrl)) {
    throw new Error('Please enter a valid http://, https://, or relative JSON feed URL.');
  }
  const response = await fetch(cleanUrl, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error(`Sync failed (HTTP ${response.status}). Check your JSON link access.`);
  }
  const text = await response.text();
  const imported = importPackFromJson(text);
  return {
    ...imported,
    syncFeedUrl: cleanUrl,
  };
}

export function loadSavedPacksState(): SavedPacksState {
  const defaultPack = buildDefault2026Pack();
  if (typeof window === 'undefined') {
    return { activePackId: defaultPack.id, packs: [defaultPack] };
  }

  try {
    const raw = window.localStorage.getItem(YEAR_PACKS_STORAGE_KEY);
    if (!raw) {
      return { activePackId: defaultPack.id, packs: [defaultPack] };
    }
    const parsed = JSON.parse(raw) as Partial<SavedPacksState>;
    if (
      !parsed ||
      !Array.isArray(parsed.packs) ||
      parsed.packs.length === 0
    ) {
      return { activePackId: defaultPack.id, packs: [defaultPack] };
    }

    const validPacks = parsed.packs.filter(
      (p) =>
        p &&
        typeof p.id === 'string' &&
        p.session &&
        Array.isArray(p.class10Blueprints) &&
        Array.isArray(p.class12Blueprints)
    );
    if (validPacks.length === 0) {
      return { activePackId: defaultPack.id, packs: [defaultPack] };
    }

    const activeExists = validPacks.some((p) => p.id === parsed.activePackId);
    return {
      activePackId: activeExists
        ? (parsed.activePackId as string)
        : validPacks[0].id,
      packs: validPacks,
    };
  } catch {
    return { activePackId: defaultPack.id, packs: [defaultPack] };
  }
}

export function savePacksState(state: SavedPacksState): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(YEAR_PACKS_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore storage quota errors gracefully
  }
}
