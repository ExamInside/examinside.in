import React, { useState, useEffect } from 'react';
import { Download, FileText, ExternalLink, X } from 'lucide-react';
import {
  SubjectItem,
  Medium,
  ClassLevel,
  SolvedPaper,
  SyllabusSessionConfig,
  AUTHOR_NAME,
} from '../data/curriculumData';
import { getEffectiveSubjectMedium } from '../utils/examLogic';

interface ModelPapersSectionProps {
  subjects: SubjectItem[];
  session: SyllabusSessionConfig;
  medium: Medium;
  selectedClass: ClassLevel;
  onOpenSubjectPaper: (subject: SubjectItem) => void;
}

export const ModelPapersSection: React.FC<ModelPapersSectionProps> = ({
  subjects,
  session,
  medium,
  selectedClass,
  onOpenSubjectPaper,
}) => {
  const [selectedYearFilter, setSelectedYearFilter] = useState<number | 'all'>('all');
  const [downloadMsg, setDownloadMsg] = useState<string | null>(null);

  useEffect(() => {
    if (
      selectedYearFilter !== 'all' &&
      !session.paperYears.includes(selectedYearFilter)
    ) {
      setSelectedYearFilter('all');
    }
  }, [session.paperYears, selectedYearFilter]);

  const classSubjects = subjects.filter((s) => s.classLevel === selectedClass);
  const ascendingYearsLabel = [...session.paperYears].sort((a, b) => a - b).join(' · ');
  const commaYearsLabel = [...session.paperYears].sort((a, b) => a - b).join(', ');

  const handleDownloadPaperSheet = (sub: SubjectItem, paper: SolvedPaper) => {
    const eff = getEffectiveSubjectMedium(sub, medium);
    const lines = [
      `ExamInside UP Board Archive | By ${AUTHOR_NAME}`,
      `${eff === 'hindi' ? paper.titleHi : paper.titleEn}`,
      `Paper Code: ${paper.paperCode} | Year: ${paper.year} | Total Marks: ${paper.totalMarks}`,
      `PDF Link: ${paper.pdfUrl}`,
      ``,
      ...paper.sampleSections.map(
        (s, i) =>
          `${i + 1}. ${eff === 'hindi' ? s.sectionNameHi : s.sectionNameEn}\n   Q: ${eff === 'hindi' ? s.sampleQHi : s.sampleQEn}\n   Key: ${eff === 'hindi' ? s.solutionHintHi : s.solutionHintEn}`
      ),
    ];

    const blob = new Blob([lines.join('\n\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ExamInside_${paper.paperCode}_${paper.year}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloadMsg(
      eff === 'hindi'
        ? `${sub.nameHi} (${paper.year}) हल पेपर शीट डाउनलोड हो गई!`
        : `Downloaded ${sub.nameEn} (${paper.year}) Solved Paper Sheet!`
    );
    setTimeout(() => setDownloadMsg(null), 3500);
  };

  const filterOptions: Array<number | 'all'> = ['all', ...session.paperYears];

  return (
    <div id="model-papers" className="space-y-6 pt-4">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-amber-600/10 via-amber-500/5 to-transparent border border-amber-200 dark:border-amber-900/50">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              UP Board Official PDF Vault ({ascendingYearsLabel})
            </span>
            <span className="text-slate-400">·</span>
            <span className="text-xs text-slate-500 font-medium">
              Curated by {AUTHOR_NAME}
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {medium === 'hindi'
              ? `कक्षा ${selectedClass === '10' ? '10वीं' : '12वीं'} के ${session.paperYears.length} वर्षों के बोर्ड पेपर PDF (${commaYearsLabel})`
              : `Class ${selectedClass}th ${session.paperYears.length}-Year Board & Leak Papers PDF (${commaYearsLabel})`}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl">
            {medium === 'hindi'
              ? `${commaYearsLabel} वास्तविक हल बोर्ड प्रश्नपत्र एवं ${session.examYear} आधिकारिक मॉडल लीक पेपर — सभी 6 विषयों के लिए।`
              : `All 6 subjects equipped with ${commaYearsLabel} Solved Papers & ${session.examYear} Model Leak Paper PDFs.`}
          </p>
        </div>

        {/* Dynamic Year Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 self-start md:self-auto">
          {filterOptions.map((yr) => (
            <button
              key={String(yr)}
              type="button"
              onClick={() => setSelectedYearFilter(yr)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                selectedYearFilter === yr
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-amber-600'
              }`}
            >
              {yr === 'all' ? `All (${session.compactNavRange})` : `${yr}`}
            </button>
          ))}
        </div>
      </div>

      {downloadMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-md flex items-center justify-between">
          <span>{downloadMsg}</span>
          <button type="button" onClick={() => setDownloadMsg(null)} className="text-emerald-100 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Grid of Solved Papers for All 6 Subjects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {classSubjects.map((sub) => {
          const eff = getEffectiveSubjectMedium(sub, medium);
          const availablePapers = sub.solvedPapers.filter((p) =>
            selectedYearFilter === 'all' ? true : p.year === selectedYearFilter
          );

          return (
            <div
              key={sub.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-amber-300 dark:hover:border-amber-700/60 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-3 gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 shrink-0">
                      {sub.code}
                    </span>
                    <h3 className="text-sm font-extrabold text-slate-900 dark:text-white truncate">
                      {eff === 'hindi' ? sub.nameHi : sub.nameEn}
                    </h3>
                  </div>
                  <span className="text-xs text-amber-600 dark:text-amber-400 font-bold shrink-0">
                    {availablePapers.length} Sets
                  </span>
                </div>

                <div className="space-y-2.5">
                  {availablePapers.map((paper) => (
                    <div
                      key={paper.id}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="min-w-0">
                        <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                          <span className="truncate">
                            UPMSP {paper.year} ({paper.paperCode})
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                          {eff === 'hindi' ? paper.paperTypeHi : paper.paperTypeEn}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDownloadPaperSheet(sub, paper)}
                        className="p-2 rounded-lg bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 border border-slate-200 dark:border-slate-600 transition-colors cursor-pointer shrink-0"
                        title={`Download ${paper.year} Paper`}
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => onOpenSubjectPaper(sub)}
                  className="w-full py-2 rounded-xl bg-amber-50 dark:bg-amber-950/30 hover:bg-amber-100 dark:hover:bg-amber-900/40 text-amber-800 dark:text-amber-300 text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>
                    {eff === 'hindi'
                      ? 'पेपर हल व PDF डाउनलोड खोलें'
                      : 'Open Solutions & Paper PDF'}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
