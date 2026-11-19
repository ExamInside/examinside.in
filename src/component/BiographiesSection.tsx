import React, { useState } from 'react';
import { Search, ExternalLink } from 'lucide-react';
import {
  SubjectItem,
  Medium,
  ClassLevel,
  BiographyItem,
  AUTHOR_NAME,
} from '../data/curriculumData';
import { getEffectiveSubjectMedium } from '../utils/examLogic';

interface BiographiesSectionProps {
  subjects: SubjectItem[];
  medium: Medium;
  selectedClass: ClassLevel;
  onOpenSubjectBiographies: (subject: SubjectItem) => void;
}

export const BiographiesSection: React.FC<BiographiesSectionProps> = ({
  subjects,
  medium,
  selectedClass,
  onOpenSubjectBiographies,
}) => {
  const [filterQuery, setFilterQuery] = useState('');

  const classSubjects = subjects.filter((s) => s.classLevel === selectedClass);
  const allBiographies: { subject: SubjectItem; bio: BiographyItem }[] = [];

  classSubjects.forEach((sub) => {
    sub.biographies.forEach((bio) => {
      allBiographies.push({ subject: sub, bio });
    });
  });

  const filtered = allBiographies.filter(({ bio }) => {
    if (!filterQuery.trim()) return true;
    const q = filterQuery.toLowerCase();
    return (
      bio.authorNameHi.toLowerCase().includes(q) ||
      bio.authorNameEn.toLowerCase().includes(q) ||
      bio.notableWorksHi.some((w) => w.toLowerCase().includes(q)) ||
      bio.notableWorksEn.some((w) => w.toLowerCase().includes(q))
    );
  });

  return (
    <div id="biographies" className="space-y-6 pt-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-rose-600/10 via-rose-500/5 to-transparent border border-rose-200 dark:border-rose-900/50">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400">
              UP Board Literary Profiles & Key Theorists
            </span>
            <span className="text-slate-400">·</span>
            <span className="text-xs text-slate-500 font-medium">80-Word Format</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {medium === 'hindi'
              ? `कक्षा ${selectedClass === '10' ? '10वीं' : '12वीं'} के प्रमुख लेखक, कवि व वैज्ञानिक परिचय`
              : `Class ${selectedClass}th Authors, Poets & Key Profiles`}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl">
            {medium === 'hindi'
              ? 'बोर्ड परीक्षा में पूरे 5/5 अंक प्राप्त करने हेतु 80 शब्द सीमा के अंतर्गत तैयार आदर्श परिचय व प्रमुख रचनाएँ।'
              : 'Formatted to UP Board 5-mark evaluation rubrics (Hindi profiles stay in Hindi).'}
          </p>
        </div>

        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder={medium === 'hindi' ? 'लेखक या रचना खोजें...' : 'Search author or work...'}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map(({ subject, bio }) => {
          const eff = getEffectiveSubjectMedium(subject, medium);
          return (
            <div
              key={bio.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-rose-300 dark:hover:border-rose-800/60 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5 mb-3">
                  <span className="text-xs font-bold text-rose-600 dark:text-rose-400">
                    {bio.category}
                  </span>
                  <span className="text-xs font-mono text-slate-500">{bio.period}</span>
                </div>

                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {eff === 'hindi' ? bio.authorNameHi : bio.authorNameEn}
                    </h3>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {eff === 'hindi' ? 'स्थान:' : 'Place:'}{' '}
                      {eff === 'hindi' ? bio.birthPlaceHi : bio.birthPlaceEn} · Code{' '}
                      {subject.code}
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 whitespace-nowrap">
                    {bio.examWordLimit}
                  </span>
                </div>

                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mt-3">
                  {eff === 'hindi' ? bio.summaryHi : bio.summaryEn}
                </p>

                <div className="mt-3.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-xs">
                  <span className="font-semibold text-slate-800 dark:text-slate-200 block mb-1">
                    {eff === 'hindi' ? 'प्रमुख रचनाएँ / योगदान:' : 'Prescribed Works / Focus:'}
                  </span>
                  <div className="flex flex-wrap gap-1.5 text-slate-600 dark:text-slate-300">
                    {(eff === 'hindi' ? bio.notableWorksHi : bio.notableWorksEn).map(
                      (work, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-white dark:bg-slate-700 text-[11px] font-medium border border-slate-200 dark:border-slate-600"
                        >
                          {work}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="text-[11px] text-amber-800 dark:text-amber-300 bg-amber-50/60 dark:bg-amber-950/20 p-2.5 rounded-xl mb-3">
                  <span className="font-bold">{AUTHOR_NAME} Tip: </span>
                  {eff === 'hindi' ? bio.examTipsHi : bio.examTipsEn}
                </div>

                <button
                  type="button"
                  onClick={() => onOpenSubjectBiographies(subject)}
                  className="w-full py-2 rounded-xl bg-rose-50 dark:bg-rose-950/30 hover:bg-rose-100 dark:hover:bg-rose-900/40 text-rose-800 dark:text-rose-300 text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>
                    {eff === 'hindi'
                      ? 'सभी परिचय व श्लोक/कविताएँ देखें'
                      : 'Open Biographies & Poems'}
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
