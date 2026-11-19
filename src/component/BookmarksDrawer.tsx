import React from 'react';
import { X, Bookmark, ExternalLink, Trash2 } from 'lucide-react';
import { SubjectItem, Medium, SyllabusSessionConfig } from '../data/curriculumData';
import { getEffectiveSubjectMedium } from '../utils/examLogic';

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarkedSubjectIds: string[];
  subjects: SubjectItem[];
  session: SyllabusSessionConfig;
  medium: Medium;
  onSelectSubject: (sub: SubjectItem) => void;
  onRemoveBookmark: (id: string) => void;
}

export const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({
  isOpen,
  onClose,
  bookmarkedSubjectIds,
  subjects,
  session,
  medium,
  onSelectSubject,
  onRemoveBookmark,
}) => {
  if (!isOpen) return null;

  const bookmarkedSubjects = subjects.filter((s) =>
    bookmarkedSubjectIds.includes(s.id)
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-sm flex justify-end">
      <div
        className="w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="bookmarks-title"
      >
        <div className="p-4 px-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-amber-500 fill-amber-500" />
            <h3
              id="bookmarks-title"
              className="text-base font-bold text-slate-900 dark:text-white"
            >
              {medium === 'hindi' ? 'सहेजे गए विषय (Bookmarks)' : 'Saved Subjects'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
            aria-label="Close bookmarks"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          {bookmarkedSubjects.length === 0 ? (
            <div className="text-center py-12 text-slate-400 dark:text-slate-500 space-y-2">
              <Bookmark className="w-10 h-10 mx-auto stroke-1" />
              <p className="text-sm">
                {medium === 'hindi'
                  ? 'कोई विषय बुकमार्क नहीं किया गया है।'
                  : 'No subjects bookmarked yet.'}
              </p>
            </div>
          ) : (
            bookmarkedSubjects.map((sub) => {
              const eff = getEffectiveSubjectMedium(sub, medium);
              return (
                <div
                  key={sub.id}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3"
                >
                  <div>
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                      Code {sub.code} · Class {sub.classLevel}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                      {eff === 'hindi' ? sub.nameHi : sub.nameEn}
                    </h4>
                    <div className="text-[11px] text-slate-500">
                      {sub.chaptersCount} Ch · {sub.totalMcqsCount} MCQs · {session.shortRangeLabel} PDF
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => {
                        onSelectSubject(sub);
                        onClose();
                      }}
                      className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 transition-colors cursor-pointer"
                      title="Open Subject"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onRemoveBookmark(sub.id)}
                      className="p-2 rounded-lg text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                      title="Remove Bookmark"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
