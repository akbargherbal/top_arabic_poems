import React, { useState } from 'react';
import { X, Download, FileCode, FileSpreadsheet, Check } from 'lucide-react';
import { ALL_VERSES } from '../data/poemsIndex';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose }) => {
  const [copiedJSON, setCopiedJSON] = useState(false);
  const [copiedCSV, setCopiedCSV] = useState(false);

  if (!isOpen) return null;

  // Generate JSON content
  const getJSONData = () => {
    return JSON.stringify(ALL_VERSES, null, 2);
  };

  // Generate CSV content with UTF-8 BOM
  const getCSVData = () => {
    const headers = ['luzumiyya_number', 'verse_number', 'first_hemistich', 'second_hemistich', 'page_number'];
    const rows = ALL_VERSES.map((v) => [
      v.luzumiyya_number,
      v.verse_number,
      `"${v.first_hemistich.replace(/"/g, '""')}"`,
      `"${v.second_hemistich.replace(/"/g, '""')}"`,
      v.page_number,
    ]);
    return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  };

  const handleDownloadJSON = () => {
    const blob = new Blob([getJSONData()], { type: 'application/json;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'luzumiyyat_verses.json');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadCSV = () => {
    // Include UTF-8 BOM so Excel opens Arabic correctly
    const bom = '\uFEFF';
    const blob = new Blob([bom + getCSVData()], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'luzumiyyat_verses.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyJSON = async () => {
    try {
      await navigator.clipboard.writeText(getJSONData());
      setCopiedJSON(true);
      setTimeout(() => setCopiedJSON(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleCopyCSV = async () => {
    try {
      await navigator.clipboard.writeText(getCSVData());
      setCopiedCSV(true);
      setTimeout(() => setCopiedCSV(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
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
            Export Dataset
          </span>
          <h3 className="text-xl font-bold font-serif text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Download className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
            <span>تصدير البيانات المخرجة</span>
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            تحميل ملفات البيانات النهائيّة المنسّقة بأعلى درجات الدقة
          </p>
        </div>

        {/* Export Options Cards */}
        <div className="space-y-4">
          {/* JSON Option */}
          <div className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-zinc-200/80 dark:bg-zinc-800 rounded-lg text-zinc-800 dark:text-zinc-200">
                  <FileCode className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold font-mono text-xs text-zinc-900 dark:text-zinc-100">
                    luzumiyyat_verses.json
                  </h4>
                  <p className="text-[11px] text-zinc-500">
                    هيكلية برمجية منظمة مع الحقول والتشكيل
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={handleDownloadJSON}
                className="flex-1 py-2 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 rounded-lg font-bold text-xs transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-3.5 h-3.5" />
                <span>تحميل JSON</span>
              </button>

              <button
                onClick={handleCopyJSON}
                className="px-3 py-2 bg-zinc-200/70 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 rounded-lg font-medium text-xs transition-colors"
              >
                {copiedJSON ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : 'نسخ'}
              </button>
            </div>
          </div>

          {/* CSV Option */}
          <div className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-zinc-200/80 dark:bg-zinc-800 rounded-lg text-zinc-800 dark:text-zinc-200">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold font-mono text-xs text-zinc-900 dark:text-zinc-100">
                    luzumiyyat_verses.csv
                  </h4>
                  <p className="text-[11px] text-zinc-500">
                    ملف جداول بتنسيق UTF-8-SIG متوافق مع Excel
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={handleDownloadCSV}
                className="flex-1 py-2 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 rounded-lg font-bold text-xs transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-3.5 h-3.5" />
                <span>تحميل CSV</span>
              </button>

              <button
                onClick={handleCopyCSV}
                className="px-3 py-2 bg-zinc-200/70 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 rounded-lg font-medium text-xs transition-colors"
              >
                {copiedCSV ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : 'نسخ'}
              </button>
            </div>
          </div>
        </div>

        <div className="text-center pt-2">
          <button
            onClick={onClose}
            className="w-full py-2 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg font-semibold text-xs transition-colors"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
