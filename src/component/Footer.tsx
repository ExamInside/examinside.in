import React, { useRef } from 'react';
import { Flame, ShieldCheck } from 'lucide-react';
import {
  AUTHOR_NAME,
  APP_NAME,
  BOARD_NAME,
  SyllabusSessionConfig,
} from '../data/curriculumData';

interface FooterProps {
  session: SyllabusSessionConfig;
  onSecretAdminTrigger?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  session,
  onSecretAdminTrigger,
}) => {
  const tapCountRef = useRef(0);
  const lastTapRef = useRef(0);

  // Invisible 5-tap gesture on the copyright notice for Owner access in APK/WebView
  const handleCopyrightTap = () => {
    if (!onSecretAdminTrigger) return;
    const now = Date.now();
    if (now - lastTapRef.current > 2500) {
      tapCountRef.current = 1;
    } else {
      tapCountRef.current += 1;
    }
    lastTapRef.current = now;
    if (tapCountRef.current >= 5) {
      tapCountRef.current = 0;
      onSecretAdminTrigger();
    }
  };

  return (
    <footer className="mt-14 pb-20 lg:pb-10 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-amber-500 flex items-center justify-center text-white">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-extrabold text-slate-900 dark:text-white">
                {APP_NAME}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Authored & curated by{' '}
                <span className="font-bold text-amber-700 dark:text-amber-400">
                  {AUTHOR_NAME}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 text-center md:text-left">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>
              Strictly mapped to {BOARD_NAME} Class 10th & 12th {session.sessionLabel} Syllabus.
            </span>
          </div>

          <div
            onClick={handleCopyrightTap}
            className="text-xs text-slate-400 dark:text-slate-500 select-none"
          >
            © {session.examYear} {APP_NAME} by {AUTHOR_NAME}.
          </div>
        </div>
      </div>
    </footer>
  );
};
