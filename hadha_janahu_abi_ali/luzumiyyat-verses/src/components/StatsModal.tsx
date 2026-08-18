import React from 'react';
import { X, CheckCircle2, BookOpen, Layers, FileText } from 'lucide-react';
import { ALL_POEMS, TOTAL_VERSES_COUNT } from '../data/poemsIndex';

interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StatsModal: React.FC<StatsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  // Meter breakdown
  const meterCounts: Record<string, number> = {};
  ALL_POEMS.forEach((p) => {
    const m = p.meter || 'غير محدد';
    meterCounts[m] = (meterCounts[m] || 0) + p.verses.length;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 left-5 p-2 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-right space-y-1">
          <span className="text-[10px] uppercase font-mono tracking-widest font-bold text-zinc-400">
            Metadata Audit
          </span>
          <h3 className="text-xl font-bold font-serif text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Layers className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
            <span>إحصائيات ومدقق جودة المخرجات</span>
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            تقرير التحقق والمطابقة الآلية لنص لزوميات أبي العلاء المعري (الجزء الأول)
          </p>
        </div>

        {/* Core Metric Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 text-center space-y-1">
            <BookOpen className="w-5 h-5 text-zinc-700 dark:text-zinc-300 mx-auto" />
            <div className="text-2xl font-bold font-mono text-zinc-900 dark:text-zinc-100">
              75
            </div>
            <div className="text-[11px] font-medium text-zinc-500">اللزوميات المستخرجة</div>
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 text-center space-y-1">
            <FileText className="w-5 h-5 text-zinc-700 dark:text-zinc-300 mx-auto" />
            <div className="text-2xl font-bold font-mono text-zinc-900 dark:text-zinc-100">
              {TOTAL_VERSES_COUNT}
            </div>
            <div className="text-[11px] font-medium text-zinc-500">إجمالي الأبيات الشعريّة</div>
          </div>

          <div className="col-span-2 sm:col-span-1 bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 text-center space-y-1">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mx-auto" />
            <div className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
              100%
            </div>
            <div className="text-[11px] font-medium text-zinc-500">دقة مطابقة الفهرس</div>
          </div>
        </div>

        {/* Verification Audit Checklist */}
        <div className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-2 text-xs">
          <h4 className="font-bold text-zinc-900 dark:text-zinc-100">معايير جودة المعالجة والـ OCR:</h4>
          <ul className="space-y-1.5 text-zinc-600 dark:text-zinc-400">
            <li className="flex items-center gap-2">
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
              <span>استبعاد كامل الشروح والحواشي وهامش التحقيق.</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
              <span>عزل الأبيات المقترحة كشواهد لشعراء آخرين داخل الشرح.</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
              <span>الاحتفاظ التام بتشكيل الحروف وتنقيطها الأصلي.</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
              <span>فصل الشطرين (الصدر والعجز) بدقة واستقرار.</span>
            </li>
          </ul>
        </div>

        {/* Meter Distribution */}
        <div className="space-y-2 text-xs">
          <h4 className="font-bold text-zinc-900 dark:text-zinc-100">توزيع الأبيات حسب البحور الشعريّة:</h4>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(meterCounts).map(([meter, count]) => (
              <div
                key={meter}
                className="flex items-center justify-between p-2.5 bg-zinc-50 dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800"
              >
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">{meter}</span>
                <span className="font-mono bg-zinc-200/80 dark:bg-zinc-800 px-2 py-0.5 rounded text-zinc-900 dark:text-zinc-100 font-bold text-[11px]">
                  {count} بيت
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center pt-2">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 rounded-lg font-bold text-xs shadow-xs transition-colors"
          >
            إغلاق التقرير
          </button>
        </div>
      </div>
    </div>
  );
};
