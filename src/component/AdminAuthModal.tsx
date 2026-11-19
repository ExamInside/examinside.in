import React, { useState, useEffect, useRef } from 'react';
import { Lock, Eye, EyeOff, ShieldAlert, X, KeyRound } from 'lucide-react';
import { Medium, AUTHOR_NAME, APP_NAME } from '../data/types';
import { verifyOwnerPasscode } from '../config/ownerSyllabusConfig';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticated: (keepIconVisible: boolean) => void;
  medium: Medium;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({
  isOpen,
  onClose,
  onAuthenticated,
  medium,
}) => {
  const [passcode, setPasscode] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [keepIconVisible, setKeepIconVisible] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setPasscode('');
      setErrorMsg(null);
      setTimeout(() => inputRef.current?.focus(), 40);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const isHi = medium === 'hindi';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) {
      setErrorMsg(
        isHi ? 'कृपया Owner पासवर्ड दर्ज करें।' : 'Please enter Owner passcode.'
      );
      return;
    }
    if (verifyOwnerPasscode(passcode)) {
      setErrorMsg(null);
      setPasscode('');
      onAuthenticated(keepIconVisible);
    } else {
      setErrorMsg(
        isHi
          ? 'गलत पासवर्ड — यह क्षेत्र केवल ऐप Owner के लिए सुरक्षित है।'
          : 'Incorrect passcode — restricted to Owner Admin only.'
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="owner-auth-title"
      >
        <div className="px-5 py-4 bg-gradient-to-r from-indigo-950 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 flex items-center justify-center">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h2 id="owner-auth-title" className="text-sm font-extrabold">
                {isHi ? `${APP_NAME} Owner Admin गेट` : `${APP_NAME} Owner Admin Gate`}
              </h2>
              <p className="text-[11px] text-slate-300">
                {isHi
                  ? `केवल ${AUTHOR_NAME} / ऐप मालिक प्रवेश`
                  : `Restricted Control Panel · ${AUTHOR_NAME}`}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close Owner Login"
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            {isHi
              ? 'छात्रों की स्क्रीन पर कोई बदलाव बटन नहीं दिखता। वर्ष (2027, 2030, 2050), अध्याय व PDF लिंक अपडेट करने के लिए अपना Owner पासवर्ड दर्ज करें।'
              : 'Students only see study material. Enter your Owner passcode to unlock year switching, chapter editing, and backend JSON tools.'}
          </p>

          <div className="space-y-1.5">
            <label
              htmlFor="owner-passcode-input"
              className="block text-xs font-bold text-slate-700 dark:text-slate-200"
            >
              {isHi ? 'Owner पासवर्ड / PIN' : 'Owner Passcode / PIN'}
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                ref={inputRef}
                id="owner-passcode-input"
                type={showPass ? 'text' : 'password'}
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  if (errorMsg) setErrorMsg(null);
                }}
                placeholder="••••••••"
                autoComplete="current-password"
                className="w-full pl-9 pr-10 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                aria-label={showPass ? 'Hide passcode' : 'Show passcode'}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
              >
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {errorMsg && (
            <div
              role="alert"
              className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-bold flex items-center gap-2"
            >
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <label className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={keepIconVisible}
              onChange={(e) => setKeepIconVisible(e.target.checked)}
              className="mt-0.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
              {isHi
                ? 'सिर्फ़ मेरे डिवाइस पर ऊपर छोटा लॉक-एडमिन आइकन दिखाएं (अन्य छात्रों को यह कभी नहीं दिखेगा)'
                : 'Show small Owner Lock Icon on this device only (always hidden from students)'}
            </span>
          </label>

          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold cursor-pointer"
            >
              {isHi ? 'रद्द करें' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{isHi ? 'Admin खोलें' : 'Unlock Admin'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
