import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterSubjects,
  calculateScoreReport,
  getClassAggregateMetrics,
  toggleBookmarkId,
  getLocalizedText,
  getEffectiveSubjectMedium,
  clampMcqIndex,
  getMcqQuickJumpNumbers,
  filterHighYieldNotes,
} from './examLogic';
import {
  SUBJECTS_DATA,
  HIGH_YIELD_NOTES,
  getChapterQuestionBank,
} from '../data/curriculumData';

test('Class 10 and Class 12 each contain all 6 subjects with 400 actual navigable MCQs per subject', () => {
  const class10 = filterSubjects(SUBJECTS_DATA, '10', '');
  const class12 = filterSubjects(SUBJECTS_DATA, '12', '');
  assert.equal(class10.length, 6);
  assert.equal(class12.length, 6);

  for (const sub of SUBJECTS_DATA) {
    assert.equal(sub.mcqs.length, 400, `${sub.id} should have 400 actual MCQs`);
    assert.equal(sub.solvedPapers.map((p) => p.year).sort().join(','), '2024,2025,2026');
  }
});

test('Class 12 Samanya Hindi (302) and Class 10 Maths/Science include complete UPMSP 2025-2026 chapters', () => {
  const c12Hindi = SUBJECTS_DATA.find((s) => s.id === 'c12-hindi');
  assert.ok(c12Hindi);
  assert.ok(c12Hindi.chapterDetails.length >= 25, 'Class 12 Samanya Hindi must have >= 25 units');

  const c10Maths = SUBJECTS_DATA.find((s) => s.id === 'c10-maths');
  assert.ok(c10Maths);
  assert.equal(c10Maths.chapterDetails.length, 14, 'Class 10 Maths must have all 14 NCERT chapters');

  const c10Science = SUBJECTS_DATA.find((s) => s.id === 'c10-science');
  assert.ok(c10Science);
  assert.equal(c10Science.chapterDetails.length, 13, 'Class 10 Science must have all 13 NCERT chapters');

  const c10Hindi = SUBJECTS_DATA.find((s) => s.id === 'c10-hindi');
  assert.ok(c10Hindi);
  assert.ok(c10Hindi.chapterDetails.length >= 27, 'Class 10 Hindi must include Prose 7 + Poetry 12 + Sanskrit 6 + Grammar');
});

test('Every chapter yields 50 High-Yield Repeated Questions (20 MCQs + 15 Short + 15 Long)', () => {
  const sampleSubject = SUBJECTS_DATA.find((s) => s.id === 'c10-maths')!;
  const thalesChapter = sampleSubject.chapterDetails.find((c) => c.number === 6)!;
  const bank = getChapterQuestionBank(sampleSubject, thalesChapter);

  assert.equal(bank.length, 50);
  assert.equal(bank.filter((q) => q.type === 'mcq').length, 20);
  assert.equal(bank.filter((q) => q.type === 'short').length, 15);
  assert.equal(bank.filter((q) => q.type === 'long').length, 15);
});

test('Dual-medium rule keeps Hindi subject in Hindi when English medium is active while switching other subjects to English', () => {
  const c10Hindi = SUBJECTS_DATA.find((s) => s.id === 'c10-hindi')!;
  const c10Maths = SUBJECTS_DATA.find((s) => s.id === 'c10-maths')!;
  const c12Hindi = SUBJECTS_DATA.find((s) => s.id === 'c12-hindi')!;
  const c12Physics = SUBJECTS_DATA.find((s) => s.id === 'c12-physics')!;

  assert.equal(getEffectiveSubjectMedium(c10Hindi, 'english'), 'hindi');
  assert.equal(getEffectiveSubjectMedium(c12Hindi, 'english'), 'hindi');
  assert.equal(getEffectiveSubjectMedium(c10Maths, 'english'), 'english');
  assert.equal(getEffectiveSubjectMedium(c12Physics, 'english'), 'english');
  assert.equal(getEffectiveSubjectMedium(c10Maths, 'hindi'), 'hindi');
});

test('filterSubjects finds subjects by topic keywords like Thales, Lencho, ओम का नियम, and Gauss', () => {
  const thalesMatch = filterSubjects(SUBJECTS_DATA, '10', 'Thales');
  assert.equal(thalesMatch.length, 1);
  assert.equal(thalesMatch[0].code, '928');

  const lenchoMatch = filterSubjects(SUBJECTS_DATA, '10', 'Lencho');
  assert.equal(lenchoMatch.length, 1);
  assert.equal(lenchoMatch[0].code, '917');

  const gaussMatch = filterSubjects(SUBJECTS_DATA, '12', 'Gauss');
  assert.equal(gaussMatch.length, 1);
  assert.equal(gaussMatch[0].code, '346');
});

test('MCQ pagination bounds and quick-jump checkpoints support continuous 1..400 progression', () => {
  assert.equal(clampMcqIndex(-5, 400), 0);
  assert.equal(clampMcqIndex(396, 400), 396);
  assert.equal(clampMcqIndex(450, 400), 399);

  const jumps400 = getMcqQuickJumpNumbers(400);
  assert.deepEqual(jumps400, [1, 50, 100, 200, 300, 397, 400]);

  const jumps50 = getMcqQuickJumpNumbers(50);
  assert.ok(jumps50.includes(1) && jumps50.includes(50));
});

test('calculateScoreReport, aggregate metrics, notes filtering, and bookmarks work accurately', () => {
  const report1 = calculateScoreReport(18, 20);
  assert.equal(report1.percentage, 90);
  assert.equal(report1.isPass, true);
  assert.equal(report1.division, 'First Division');

  const report4 = calculateScoreReport(5, 20);
  assert.equal(report4.isPass, false);

  const metrics10 = getClassAggregateMetrics(SUBJECTS_DATA, '10');
  assert.equal(metrics10.totalMcqs, 2400);
  assert.equal(metrics10.totalSolvedPapers, 18);

  const notes12 = filterHighYieldNotes(HIGH_YIELD_NOTES, '12', 'Lens');
  assert.equal(notes12.length, 1);

  assert.deepEqual(toggleBookmarkId(['a'], 'b'), ['a', 'b']);
  assert.deepEqual(toggleBookmarkId(['a', 'b'], 'a'), ['b']);
  assert.equal(getLocalizedText('hindi', 'क', 'A'), 'क');
  assert.equal(getLocalizedText('english', 'क', 'A'), 'A');
});
