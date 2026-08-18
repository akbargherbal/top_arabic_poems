import React, { useState } from 'react';
import { Verse, Poem } from '../types';
import { VerseCard } from './VerseCard';
import { Bookmark, Copy, Trash2, Check, ArrowRight } from 'lucide-react';
import { removeDiacritics } from '../utils/arabicUtils';

interface BookmarksViewProps {
  bookmarks: Set<string>;
  allVerses: Verse[];
  poemsMap: Map<number, Poem>;
  showDiacritics: boolean;
  fontSize: 'small' | 'medium' | 'large' | 'xlarge';
  onToggleBookmark: (verseId: string) => void;
  onClearBookmarks: () => void;
  onSelectPoem: (poemNum: number) => void;
}

export const BookmarksView: React.FC<BookmarksViewProps> = ({
  bookmarks,
  allVerses,
  poemsMap,
  showDiacritics,
  fontSize,
  onToggleBookmark,
  onClearBookmarks,
  onSelectPoem,
}) => {
  const [copiedAll, setCopiedAll] = useState(false);

  const bookmarkedVerses = allVerses.filter((v) => bookmarks.has(v.id));

  const handleCopyAllBookmarked = async () => {
    if (bookmarkedVerses.length === 0) return;
    const text = bookmarkedVerses
      .map(
        (v) =>
          `${showDiacritics ? v.first_hemistich : removeDiacritics(v.first_hemistich)} ... ${
            showDiacritics ? v.second_hemistich : removeDiacritics(v.second_hemistich)
          } (اللزومية ${v.luzumiyya_number} - البيت ${v.verse_number})`
      )
      .join('\n');

    try {
      await navigator.clipboard.writeText(text);
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2500);
    } catch {
      // fallback
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-2xs">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-widest font-bold text-zinc-400 block mb-1">
            Saved Verses
          </span>
          <h2 className="text-2xl font-bold font-serif text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-zinc-900 dark:text-zinc-100 fill-zinc-900 dark:fill-zinc-100" />
            <span>الأبيات المحفوظة</span>
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            الأبيات المختارة والمفضلة لديك ({bookmarkedVerses.length} بيتًا)
          </p>
        </div>

        {bookmarkedVerses.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyAllBookmarked}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 rounded-lg text-xs font-semibold transition-all"
            >
              {copiedAll ? <Check className="w-4 h-4 text-emerald-400 dark:text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copiedAll ? 'تم نسخ المحفوظات' : 'نسخ المحفوظات'}</span>
            </button>

            <button
              onClick={onClearBookmarks}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 rounded-lg text-xs font-semibold transition-all"
            >
              <Trash2 className="w-4 h-4" />
              <span>مسح الكل</span>
            </button>
          </div>
        )}
      </div>

      {/* Bookmarks List */}
      {bookmarkedVerses.length === 0 ? (
        <div className="text-center py-16 bg-zinc-50/50 dark:bg-zinc-900/40 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800 space-y-3">
          <Bookmark className="w-8 h-8 text-zinc-300 dark:text-zinc-700 mx-auto" />
          <h3 className="text-base font-serif font-bold text-zinc-700 dark:text-zinc-300">
            لا توجد أبيات محفوظة بعد
          </h3>
          <p className="text-xs text-zinc-400 max-w-md mx-auto">
            انقر على أيقونة الإشارة المرجعية (🔖) بجوار أي بيت أثناء قراءة القصائد لحفظه هنا للرجوع إليه لاحقًا.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookmarkedVerses.map((verse) => {
            const poem = poemsMap.get(verse.luzumiyya_number);
            return (
              <div key={verse.id} className="space-y-1">
                <div className="flex items-center justify-between px-2 text-xs text-zinc-500">
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                    من {poem?.title || `اللزومية ${verse.luzumiyya_number}`}
                  </span>
                  <button
                    onClick={() => onSelectPoem(verse.luzumiyya_number)}
                    className="text-zinc-600 dark:text-zinc-400 hover:underline flex items-center gap-1 font-medium"
                  >
                    <span>عرض بالقصيدة</span>
                    <ArrowRight className="w-3 h-3 rotate-180" />
                  </button>
                </div>

                <VerseCard
                  verse={verse}
                  showDiacritics={showDiacritics}
                  fontSize={fontSize}
                  isBookmarked={true}
                  onToggleBookmark={onToggleBookmark}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
