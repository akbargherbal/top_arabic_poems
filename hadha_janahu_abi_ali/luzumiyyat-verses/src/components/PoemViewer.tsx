import React, { useState } from 'react';
import { Poem } from '../types';
import { VerseCard } from './VerseCard';
import { ChevronRight, ChevronLeft, Copy, Check, Volume2, BookOpen } from 'lucide-react';
import { removeDiacritics } from '../utils/arabicUtils';

interface PoemViewerProps {
  poem: Poem;
  showDiacritics: boolean;
  fontSize: 'small' | 'medium' | 'large' | 'xlarge';
  bookmarks: Set<string>;
  onToggleBookmark: (verseId: string) => void;
  onSelectPoem: (num: number) => void;
  totalPoemsCount: number;
}

export const PoemViewer: React.FC<PoemViewerProps> = ({
  poem,
  showDiacritics,
  fontSize,
  bookmarks,
  onToggleBookmark,
  onSelectPoem,
  totalPoemsCount,
}) => {
  const [copiedAll, setCopiedAll] = useState(false);
  const [isReadingAll, setIsReadingAll] = useState(false);

  const handleCopyPoem = async () => {
    const poemText = `${poem.title} - لزوميات المعري\n` +
      `حرف الروي: ${poem.rhyme_letter} | الصفحة: ${poem.page_start}\n\n` +
      poem.verses
        .map(
          (v) =>
            `${v.verse_number}. ${
              showDiacritics ? v.first_hemistich : removeDiacritics(v.first_hemistich)
            }  ...  ${
              showDiacritics ? v.second_hemistich : removeDiacritics(v.second_hemistich)
            }`
        )
        .join('\n');

    try {
      await navigator.clipboard.writeText(poemText);
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2500);
    } catch {
      // fallback
    }
  };

  const handleReadAll = () => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    if (isReadingAll) {
      setIsReadingAll(false);
      return;
    }

    setIsReadingAll(true);
    let index = 0;

    const speakNext = () => {
      if (index >= poem.verses.length) {
        setIsReadingAll(false);
        return;
      }

      const v = poem.verses[index];
      const text = `${v.first_hemistich} ... ${v.second_hemistich}`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ar-SA';
      utterance.rate = 0.85;

      utterance.onend = () => {
        index++;
        speakNext();
      };
      utterance.onerror = () => setIsReadingAll(false);

      window.speechSynthesis.speak(utterance);
    };

    speakNext();
  };

  return (
    <div className="space-y-6">
      {/* Poem Header Banner */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-zinc-100 dark:border-zinc-800">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 text-xs font-bold font-mono px-2.5 py-0.5 rounded-md">
                القصيدة #{poem.luzumiyya_number}
              </span>
              {poem.meter && (
                <span className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-medium px-2.5 py-0.5 rounded-md">
                  بحر {poem.meter}
                </span>
              )}
              <span className="text-xs text-zinc-400 font-mono">
                ص {poem.page_start}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-zinc-900 dark:text-zinc-100">
              {poem.title}
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              {poem.rhyme_letter}
            </p>
          </div>

          {/* Quick Actions (Copy & Audio Read) */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={handleReadAll}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold border transition-all ${
                isReadingAll
                  ? 'bg-zinc-800 text-white border-zinc-900 animate-pulse'
                  : 'bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100'
              }`}
              title="استماع إلقاء صَوْتي للقصيدة كاملة"
            >
              <Volume2 className="w-4 h-4" />
              <span>{isReadingAll ? 'جارِ الإلقاء...' : 'استماع كلي'}</span>
            </button>

            <button
              onClick={handleCopyPoem}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 rounded-lg text-xs font-semibold shadow-xs transition-all"
              title="نسخ أبيات القصيدة بالكامل"
            >
              {copiedAll ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
                  <span>تم نسخ القصيدة!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>نسخ القصيدة</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Verse Count Summary & Prev/Next Bar */}
        <div className="pt-4 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 font-medium">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
            <span>عدد الأبيات: {poem.verses.length} بيتًا</span>
          </div>

          {/* Previous / Next Buttons */}
          <div className="flex items-center gap-2">
            <button
              disabled={poem.luzumiyya_number <= 1}
              onClick={() => onSelectPoem(poem.luzumiyya_number - 1)}
              className="flex items-center gap-1 px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 disabled:opacity-30 rounded-lg hover:bg-zinc-200 text-zinc-800 dark:text-zinc-200 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
              <span>القصيدة السابقة</span>
            </button>

            <button
              disabled={poem.luzumiyya_number >= totalPoemsCount}
              onClick={() => onSelectPoem(poem.luzumiyya_number + 1)}
              className="flex items-center gap-1 px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 disabled:opacity-30 rounded-lg hover:bg-zinc-200 text-zinc-800 dark:text-zinc-200 transition-colors"
            >
              <span>القصيدة التالية</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Verses Cards Stack */}
      <div className="space-y-4">
        {poem.verses.map((verse) => (
          <VerseCard
            key={verse.id}
            verse={verse}
            showDiacritics={showDiacritics}
            fontSize={fontSize}
            isBookmarked={bookmarks.has(verse.id)}
            onToggleBookmark={onToggleBookmark}
          />
        ))}
      </div>
    </div>
  );
};
