import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildDefault2026Pack,
  buildSessionConfig,
  shiftYearPack,
  bulkParseChaptersText,
  updateSubjectBlueprintInPack,
  updatePaperPdfUrlInPack,
  addCustomMcqToPack,
  applyGlobalPaperUrlPatternInPack,
  upsertImportantQuestionInPack,
  deleteImportantQuestionInPack,
  upsertBiographyInPack,
  deleteBiographyInPack,
  exportPackToJson,
  importPackFromJson,
  parsePaperYearsInput,
} from './syllabusPackManager';
import { hydrateBlueprints, getChapterQuestionBank } from '../data/curriculumData';
import {
  OWNER_DEFAULT_PASSCODE,
  resolveBackendConfigPayload,
  verifyOwnerPasscode,
} from '../config/ownerSyllabusConfig';

test('Default 2026 pack retains complete 6 Class 10 + 6 Class 12 blueprints and 2024-2026 papers', () => {
  const pack2026 = buildDefault2026Pack();
  assert.equal(pack2026.id, 'pack-2026');
  assert.equal(pack2026.session.examYear, 2026);
  assert.equal(pack2026.session.shortRangeLabel, '2024–26');
  assert.equal(pack2026.class10Blueprints.length, 6);
  assert.equal(pack2026.class12Blueprints.length, 6);

  const c10Chapters = pack2026.class10Blueprints.reduce(
    (sum, bp) => sum + bp.chapterDetails.length,
    0
  );
  const c12Chapters = pack2026.class12Blueprints.reduce(
    (sum, bp) => sum + bp.chapterDetails.length,
    0
  );
  assert.equal(c10Chapters, 91);
  assert.equal(c12Chapters, 83);
});

test('1-Click shiftYearPack to 2030 with 2027-2030 papers updates session, all 12 subjects, notes & 400 MCQs cleanly', () => {
  const pack2026 = buildDefault2026Pack();
  const pack2030 = shiftYearPack(pack2026, 2030, [2030, 2029, 2028, 2027]);

  assert.equal(pack2030.id, 'pack-2030');
  assert.equal(pack2030.session.examYear, 2030);
  assert.equal(pack2030.session.sessionLabel, '2029–2030');
  assert.equal(pack2030.session.shortRangeLabel, '2027–30');
  assert.equal(pack2030.session.compactNavRange, '27–30');
  assert.deepEqual(pack2030.session.paperYears, [2030, 2029, 2028, 2027]);

  const hydrated2030 = hydrateBlueprints(
    pack2030.class10Blueprints,
    pack2030.class12Blueprints,
    pack2030.session
  );
  assert.equal(hydrated2030.length, 12);

  for (const sub of hydrated2030) {
    assert.equal(sub.mcqs.length, 400);
    assert.deepEqual(
      sub.solvedPapers.map((p) => p.year),
      [2030, 2029, 2028, 2027]
    );
    assert.ok(sub.solvedPapersYears.includes('2027–30'));
  }

  for (const note of pack2030.notes) {
    assert.ok(note.repeatYears.includes('2030'));
    assert.ok(note.repeatYears.includes('2027'));
  }
});

test('bulkParseChaptersText updates subject chaptersCount, 50 questions/chapter, and 400 MCQs cleanly', () => {
  const pack2030 = shiftYearPack(buildDefault2026Pack(), 2030, [2030, 2029, 2028, 2027]);
  const mathsBp = pack2030.class10Blueprints.find((b) => b.id === 'c10-maths')!;

  const newChapters = bulkParseChaptersText(
    [
      'Algebra | AI & Linear Algebra Basics | Vector Matrix Systems | Gauss Elimination & Matrices | 10 Marks',
      'Geometry | Non-Euclidean & Coordinate Lines | Distance Formula | Slope & Circle Tangents | 8 Marks',
      'Statistics | Data Science & Probability | Bayesian Inference | Conditional Probability & Variance | 12 Marks',
    ].join('\n'),
    mathsBp
  );

  assert.equal(newChapters.length, 3);
  assert.equal(newChapters[0].titleHi, 'AI & Linear Algebra Basics');
  assert.equal(newChapters[0].boardWeightage, '10 Marks');

  const updatedPack = updateSubjectBlueprintInPack(pack2030, {
    ...mathsBp,
    chapterDetails: newChapters,
  });
  const hydrated = hydrateBlueprints(
    updatedPack.class10Blueprints,
    updatedPack.class12Blueprints,
    updatedPack.session
  );
  const updatedMaths = hydrated.find((s) => s.id === 'c10-maths')!;
  assert.equal(updatedMaths.chaptersCount, 3);
  assert.equal(updatedMaths.mcqs.length, 400);
  assert.equal(updatedMaths.totalImpQuestionsCount, 150);

  const chapterBank = getChapterQuestionBank(
    updatedMaths,
    updatedMaths.chapterDetails[0],
    updatedPack.session
  );
  assert.equal(chapterBank.length, 50);
  assert.ok(
    chapterBank.some((q) => q.questionHi.includes('AI & Linear Algebra Basics')),
    'Updated chapter title must immediately reflect in fresh 50-question bank'
  );
});

test('updatePaperPdfUrlInPack, addCustomMcqToPack, parsePaperYearsInput, and JSON export/import round-trip work', () => {
  const pack = shiftYearPack(buildDefault2026Pack(), 2030, [2030, 2029, 2028, 2027]);
  const withUrl = updatePaperPdfUrlInPack(
    pack,
    'c10-science',
    'c10-science-2029',
    'https://drive.google.com/file/d/upboard2029science/view'
  );

  const sciBp = withUrl.class10Blueprints.find((s) => s.id === 'c10-science')!;
  assert.equal(
    sciBp.solvedPapers.find((p) => p.year === 2029)?.pdfUrl,
    'https://drive.google.com/file/d/upboard2029science/view'
  );

  const withCustomMcq = addCustomMcqToPack(withUrl, 'c10-science', {
    id: 'custom-2030-q1',
    questionHi: '2030 नया पाठ्यक्रम टेस्ट MCQ क्या है?',
    questionEn: 'What is the 2030 New Syllabus Custom MCQ?',
    optionsHi: ['विकल्प A', 'विकल्प B', 'विकल्प C', 'विकल्प D'],
    optionsEn: ['Option A', 'Option B', 'Option C', 'Option D'],
    correctIndex: 1,
    explanationHi: 'सही व्याख्या',
    explanationEn: 'Verified explanation',
    chapter: 'रासायनिक अभिक्रियाएँ',
    chapterEn: 'Chemical Reactions',
    boardYears: ['2030 Model'],
  });

  const hydrated = hydrateBlueprints(
    withCustomMcq.class10Blueprints,
    withCustomMcq.class12Blueprints,
    withCustomMcq.session
  );
  const hydratedSci = hydrated.find((s) => s.id === 'c10-science')!;
  assert.equal(hydratedSci.mcqs.length, 400);
  assert.equal(hydratedSci.mcqs[0].id, 'custom-2030-q1');

  const json = exportPackToJson(withCustomMcq);
  const imported = importPackFromJson(json);
  assert.equal(imported.session.examYear, 2030);
  assert.equal(
    imported.class10Blueprints
      .find((s) => s.id === 'c10-science')
      ?.solvedPapers.find((p) => p.year === 2029)?.pdfUrl,
    'https://drive.google.com/file/d/upboard2029science/view'
  );

  assert.throws(() => importPackFromJson('{invalid json'), /Invalid JSON syntax/);
  assert.throws(() => importPackFromJson('{"foo": 1}'), /Missing required syllabus pack fields/);
  assert.deepEqual(parsePaperYearsInput('2027, 2028, 2029, 2030', 2030), [2030, 2029, 2028, 2027]);

  const singleYearCfg = buildSessionConfig(2028, [2028]);
  assert.equal(singleYearCfg.shortRangeLabel, '2028');
  assert.equal(singleYearCfg.compactNavRange, '28');
});

test('Lifetime 2050 shift, bilingual Hindi::English bulk chapters, global 12-subject PDF batch & Bio/ImpQ CRUD work cleanly', () => {
  const pack2026 = buildDefault2026Pack();
  const pack2050 = shiftYearPack(pack2026, 2050, [2050, 2049, 2048, 2047]);
  assert.equal(pack2050.id, 'pack-2050');
  assert.equal(pack2050.session.sessionLabel, '2049–2050');
  assert.equal(pack2050.session.shortRangeLabel, '2047–50');
  assert.equal(pack2050.session.compactNavRange, '47–50');

  const sciBp = pack2050.class10Blueprints.find((b) => b.id === 'c10-science')!;
  const bilingualChapters = bulkParseChaptersText(
    [
      'भौतिकी :: Physics | क्वांटम प्रकाशिकी :: Quantum Optics | फोटॉन सिद्धांत :: Photon Theory | तरंग-कण द्वैत :: Wave-Particle Duality | 8 Marks',
      'विद्युत चुम्बकत्व :: Electromagnetism | 5 Marks',
      'जैव ऊर्जा :: Bio Energy',
    ].join('\n'),
    sciBp
  );

  assert.equal(bilingualChapters.length, 3);
  assert.equal(bilingualChapters[0].sectionHi, 'भौतिकी');
  assert.equal(bilingualChapters[0].sectionEn, 'Physics');
  assert.equal(bilingualChapters[0].titleHi, 'क्वांटम प्रकाशिकी');
  assert.equal(bilingualChapters[0].titleEn, 'Quantum Optics');
  assert.equal(bilingualChapters[1].titleHi, 'विद्युत चुम्बकत्व');
  assert.equal(bilingualChapters[1].titleEn, 'Electromagnetism');
  assert.equal(bilingualChapters[1].boardWeightage, '5 Marks');
  assert.equal(bilingualChapters[2].titleHi, 'जैव ऊर्जा');
  assert.equal(bilingualChapters[2].titleEn, 'Bio Energy');

  // Batch update all 12 subjects x 4 years = 48 PDF URLs in 1 click
  const batchPack = applyGlobalPaperUrlPatternInPack(
    pack2050,
    'https://cdn.upboard.example/{year}/Class{class}_{code}.pdf'
  );
  const c12Chem = batchPack.class12Blueprints.find((b) => b.id === 'c12-chemistry')!;
  assert.equal(
    c12Chem.solvedPapers.find((p) => p.year === 2050)?.pdfUrl,
    'https://cdn.upboard.example/2050/Class12_347.pdf'
  );
  assert.equal(
    batchPack.class10Blueprints[0].solvedPapers.find((p) => p.year === 2047)?.pdfUrl,
    `https://cdn.upboard.example/2047/Class10_${batchPack.class10Blueprints[0].code}.pdf`
  );

  // Important Question upsert & delete
  const withIq = upsertImportantQuestionInPack(batchPack, 'c10-science', {
    id: 'iq-2050-1',
    marks: 6,
    chapter: 'क्वांटम प्रकाशिकी',
    chapterEn: 'Quantum Optics',
    questionHi: '2050 प्रश्न',
    questionEn: '2050 Question',
    answerHi: '2050 उत्तर',
    answerEn: '2050 Answer',
    probability: 'Very High',
    boardYears: ['2050'],
  });
  assert.equal(
    withIq.class10Blueprints
      .find((b) => b.id === 'c10-science')
      ?.coreImportantQuestions.some((q) => q.id === 'iq-2050-1'),
    true
  );
  const withoutIq = deleteImportantQuestionInPack(withIq, 'c10-science', 'iq-2050-1');
  assert.equal(
    withoutIq.class10Blueprints
      .find((b) => b.id === 'c10-science')
      ?.coreImportantQuestions.some((q) => q.id === 'iq-2050-1'),
    false
  );

  // Biography upsert & delete
  const withBio = upsertBiographyInPack(withoutIq, 'c10-hindi', {
    id: 'bio-2050-1',
    authorNameHi: 'नये साहित्यकार',
    authorNameEn: 'Modern Author',
    period: '2050 Syllabus',
    category: 'Gadhya (Prose)',
    birthPlaceHi: 'प्रयागराज',
    birthPlaceEn: 'Prayagraj',
    notableWorksHi: ['काव्य संग्रह'],
    notableWorksEn: ['Poetry Collection'],
    summaryHi: 'संक्षिप्त परिचय',
    summaryEn: 'Brief profile',
    examTipsHi: 'रचनाएँ लिखें',
    examTipsEn: 'Write works clearly',
    examWordLimit: '80 Words',
  });
  assert.equal(
    withBio.class10Blueprints
      .find((b) => b.id === 'c10-hindi')
      ?.biographies.some((b) => b.id === 'bio-2050-1'),
    true
  );
  const withoutBio = deleteBiographyInPack(withBio, 'c10-hindi', 'bio-2050-1');
  assert.equal(
    withoutBio.class10Blueprints
      .find((b) => b.id === 'c10-hindi')
      ?.biographies.some((b) => b.id === 'bio-2050-1'),
    false
  );

  // syncFeedUrl preserved on JSON export/import
  const withSync = { ...withBio, syncFeedUrl: 'https://example.com/2050.json' };
  const reimported = importPackFromJson(exportPackToJson(withSync));
  assert.equal(reimported.syncFeedUrl, 'https://example.com/2050.json');
});

test('Owner Admin passcode gate & backend syllabus-config.json resolver behave safely', () => {
  assert.equal(verifyOwnerPasscode(OWNER_DEFAULT_PASSCODE), true);
  assert.equal(verifyOwnerPasscode(`  ${OWNER_DEFAULT_PASSCODE}  `), true);
  assert.equal(verifyOwnerPasscode('wrong123'), false);
  assert.equal(verifyOwnerPasscode('   '), false);

  // Disabled backend config leaves Student View untouched
  const disabledRes = resolveBackendConfigPayload(
    JSON.stringify({ enabled: false, examYear: 2050 })
  );
  assert.equal(disabledRes.pack, null);
  assert.equal(disabledRes.signature, '');

  // Enabled lightweight backend config shifts all 12 subjects silently to 2050
  const lightRes = resolveBackendConfigPayload(
    JSON.stringify({
      enabled: true,
      version: '2050.1',
      examYear: 2050,
      paperYears: [2050, 2049, 2048, 2047],
      packLabel: 'UPMSP 2050 Official',
    })
  );
  assert.ok(lightRes.pack);
  assert.equal(lightRes.pack?.session.examYear, 2050);
  assert.deepEqual(lightRes.pack?.session.paperYears, [2050, 2049, 2048, 2047]);
  assert.ok(lightRes.signature.includes('2050'));

  // Full exported SyllabusYearPack JSON in backend config loads complete syllabus
  const custom2030 = shiftYearPack(
    buildDefault2026Pack(),
    2030,
    [2030, 2029, 2028, 2027],
    'UPMSP 2030 Backend Full Pack'
  );
  const fullRes = resolveBackendConfigPayload(exportPackToJson(custom2030));
  assert.ok(fullRes.pack);
  assert.equal(fullRes.pack?.session.examYear, 2030);
  assert.equal(fullRes.pack?.session.packLabel, 'UPMSP 2030 Backend Full Pack');
  assert.ok(fullRes.signature.startsWith('full:'));
});

