import React from 'react';
import { ShieldCheck, CheckCircle2, Clock, Award, AlertTriangle, BookOpen } from 'lucide-react';
import { ExamTipItem, Medium, ClassLevel, AUTHOR_NAME } from '../data/curriculumData';

interface ExamTipsSectionProps {
  tips: ExamTipItem[];
  medium: Medium;
  selectedClass: ClassLevel;
}

export const ExamTipsSection: React.FC<ExamTipsSectionProps> = ({
  tips,
  medium,
  selectedClass,
}) => {
  return (
    <div id="exam-tips" className="space-y-6 pt-4">
      
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-600/10 via-indigo-500/5 to-transparent border border-indigo-200 dark:border-indigo-900/50">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">
            UPMSP Board Examination Blueprint
          </span>
          <span className="text-slate-400">·</span>
          <span className="text-xs text-slate-500 font-medium">Authored by {AUTHOR_NAME}</span>
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {medium === 'hindi'
            ? 'यूपी बोर्ड टॉपर रणनीति व महत्वपूर्ण परीक्षा नियम'
            : 'UP Board Topper Strategy & Official Guidelines'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl">
          {medium === 'hindi'
            ? 'परीक्षा कक्ष में 3 घंटे 15 मिनट के समुचित प्रबंधन, OMR शीट भरने की सावधानी और अधिकतम अंक प्राप्ति हेतु परीक्षक-सम्मत तकनीकें।'
            : 'Proven techniques for the 3hr 15min duration, OMR sheet compliance and step-marking optimization.'}
        </p>
      </div>

      {/* Main 4 Tips Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {tips.map((tip, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2.5"
          >
            <div className="flex items-center gap-2.5 text-indigo-600 dark:text-indigo-400">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center font-bold text-xs shrink-0">
                0{idx + 1}
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {medium === 'hindi' ? tip.titleHi : tip.titleEn}
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-10">
              {medium === 'hindi' ? tip.descHi : tip.descEn}
            </p>
          </div>
        ))}
      </div>

      {/* Official 3 Hours 15 Minutes Breakdown */}
      <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-4">
        <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-base">
          <Clock className="w-5 h-5 text-amber-500" />
          <span>
            {medium === 'hindi'
              ? 'समय सारिणी विभाजन (3 घंटे 15 मिनट की समय योजना):'
              : 'Exam Time Distribution Blueprint (3 Hours 15 Mins):'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-indigo-600 dark:text-indigo-400 block mb-1">
              {medium === 'hindi'
                ? 'प्रथम 15 मिनट (00:00 - 00:15)'
                : 'First 15 Minutes (00:00 – 00:15)'}
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              {medium === 'hindi'
                ? 'केवल प्रश्नपत्र को ध्यानपूर्वक पढ़ें। जिन प्रश्नों पर पूरा विश्वास हो उन पर पेंसिल से हल्का टिक लगाएं।'
                : 'Read the entire question paper calmly. Lightly mark confident choices and internal alternatives with pencil.'}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-emerald-600 dark:text-emerald-400 block mb-1">
              {medium === 'hindi'
                ? 'अगले 45 मिनट (00:15 - 01:00)'
                : 'Next 45 Minutes (00:15 – 01:00)'}
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              {medium === 'hindi'
                ? selectedClass === '10'
                  ? 'खंड-अ के 20 बहुविकल्पीय प्रश्नों को OMR शीट पर पूरी सावधानी से काले बॉल पेन से भरें।'
                  : 'सभी वस्तुनिष्ठ एवं 1-2 अंक वाले संक्षिप्त प्रश्नों के उत्तर लिखें।'
                : selectedClass === '10'
                  ? 'Fill Section-A 20 OMR MCQs carefully with black/blue ballpoint pen and complete 2-mark very short answers.'
                  : 'Complete all objective MCQs and 1–2 mark very short answer questions cleanly.'}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-amber-600 dark:text-amber-400 block mb-1">
              {medium === 'hindi'
                ? 'अंतिम 2 घंटे 15 मिनट (01:00 - 03:15)'
                : 'Final 2 Hours 15 Mins (01:00 – 03:15)'}
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              {medium === 'hindi'
                ? 'दीर्घ उत्तरीय प्रश्न, व्याख्या और अंतिम 10 मिनट उत्तरपुस्तिका की रोल नंबर व पेज नंबर री-चेकिंग हेतु सुरक्षित रखें।'
                : 'Attempt long derivations, essays, and diagrams with headings; keep the final 10 minutes to re-check roll number & page totals.'}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
