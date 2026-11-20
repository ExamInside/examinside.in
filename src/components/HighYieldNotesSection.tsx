import React, { useState } from 'react';
import {
  StickyNote,
  Sparkles,
  ExternalLink,
  Search,
  CheckCircle2,
  BookmarkCheck,
} from 'lucide-react';
import {
  ClassLevel,
  Medium,
  SubjectItem,
  HighYieldNoteItem,
  AUTHOR_NAME,
} from '../data/curriculumData';
import { filterHighYieldNotes, getEffectiveSubjectMedium } from '../utils/examLogic';

interface HighYieldNotesSectionProps {
  subjects: SubjectItem[];
  notes: HighYieldNoteItem[];
  medium: Medium;
  selectedClass: ClassLevel;
  onOpenSubject: (subject: SubjectItem) => void;
}

export const HighYieldNotesSection: React.FC<HighYieldNotesSectionProps> = ({
  subjects,
  notes,
  medium,
  selectedClass,
  onOpenSubject,
}) => {
  const [noteQuery, setNoteQuery] = useState('');
  const filteredNotes = filterHighYieldNotes(notes, selectedClass, noteQuery);

  return (
    <div id="notes-vault" className="space-y-6 pt-4">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-indigo-600/10 via-blue-500/5 to-transparent border border-indigo-200 dark:border-indigo-900/50">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400 flex items-center gap-1">
              <StickyNote className="w-3.5 h-3.5" />
              3–4 Year Repeated High-Yield Notes Vault
            </span>
            <span className="text-slate-400">·</span>
            <span className="text-xs text-slate-500 font-medium">
              Deep Research by {AUTHOR_NAME}
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {medium === 'hindi'
              ? `कक्षा ${selectedClass === '10' ? '10वीं' : '12वीं'} के 3–4 वर्षों से बार-बार आने वाले पक्के नोट्स`
              : `Class ${selectedClass}th 3–4 Year Guaranteed Repeat Notes Vault`}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl">
            {medium === 'hindi'
              ? 'कविताएँ, संस्कृत श्लोक, 6M थ्योरम, नेम रिएक्शंस, मानचित्र प्वाइंट्स व 80-शब्द जीवन परिचय — 75% से 90%+ स्कोर की गारंटी।'
              : 'High-probability poems, shlokas, theorems, organic name reactions, DNA models, and 10M map points compiled for 90%+ exam readiness.'}
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={noteQuery}
            onChange={(e) => setNoteQuery(e.target.value)}
            placeholder={medium === 'hindi' ? 'नोट्स खोजें (जैसे श्लोक, Thales)...' : 'Filter repeat notes...'}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Notes Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredNotes.map((note) => {
          const linkedSubject = subjects.find((s) => s.id === note.subjectId);
          const effMedium = linkedSubject
            ? getEffectiveSubjectMedium(linkedSubject, medium)
            : medium;

          return (
            <div
              key={note.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-indigo-300 dark:hover:border-indigo-700/60 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-2.5">
                  <span className="text-xs font-bold text-indigo-700 dark:text-indigo-400">
                    {effMedium === 'hindi' ? note.subjectNameHi : note.subjectNameEn}
                  </span>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300">
                    {effMedium === 'hindi' ? note.badgeHi : note.badgeEn}
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-slate-900 dark:text-white leading-snug">
                  {effMedium === 'hindi' ? note.titleHi : note.titleEn}
                </h3>

                <div className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                  <BookmarkCheck className="w-3.5 h-3.5" />
                  <span>Asked in: {note.repeatYears}</span>
                </div>

                <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                  {(effMedium === 'hindi' ? note.pointsHi : note.pointsEn).map((pt, i) => (
                    <li key={i} className="flex items-start gap-2 leading-relaxed">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

                {(note.formulaOrQuoteHi || note.formulaOrQuoteEn) && (
                  <div className="p-3 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200/80 dark:border-indigo-800/50 text-xs font-mono font-semibold text-indigo-900 dark:text-indigo-200">
                    {effMedium === 'hindi' ? note.formulaOrQuoteHi : note.formulaOrQuoteEn}
                  </div>
                )}
              </div>

              {linkedSubject && (
                <button
                  type="button"
                  onClick={() => onOpenSubject(linkedSubject)}
                  className="w-full py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>
                    {effMedium === 'hindi'
                      ? 'इस विषय के सभी अध्याय व 50 प्रश्न खोलें'
                      : 'Open Subject Chapters & 50 Qs/Ch'}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
