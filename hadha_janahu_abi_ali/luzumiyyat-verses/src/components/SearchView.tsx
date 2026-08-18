import React, { useState } from 'react';
import { Verse, Poem } from '../types';
import { VerseCard } from './VerseCard';
import { matchesArabicSearch } from '../utils/arabicUtils';
import { Search, Sparkles } from 'lucide-react';

interface SearchViewProps {
  allVerses: Verse[];
  poemsMap: Map<number, Poem>;
  showDiacritics: boolean;
  fontSize: 'small' | 'medium' | 'large' | 'xlarge';
  bookmarks: Set<string>;
  onToggleBookmark: (verseId: string) => void;
  onSelectPoem: (poemNum: number) => void;
}

export const SearchView: React.FC<SearchViewProps> = ({
  allVerses,
  poemsMap,
  showDiacritics,
  fontSize,
  bookmarks,
  onToggleBookmark,
  onSelectPoem,
}) => {
  const [query, setQuery] = useState('');

  const searchResults = query.trim()
    ? allVerses.filter(
        (v) =>
          matchesArabicSearch(v.first_hemistich, query) ||
          matchesArabicSearch(v.second_hemistich, query) ||
          matchesArabicSearch(v.luzumiyya_number.toString(), query)
      )
    : [];

  return (
    <div className="space-y-6">
      {/* Search Bar Banner */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-4 shadow-2xs">
        <div className="max-w-2xl mx-auto text-center space-y-1.5">
          <span className="text-[10px] uppercase font-mono tracking-widest font-bold text-zinc-400">
            Global Index Search
          </span>
          <h2 className="text-2xl font-bold font-serif text-zinc-900 dark:text-zinc-100 flex items-center justify-center gap-2">
            <Search className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
            <span>البحث الشامل في أبيات اللزوميات</span>
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            ابحث في جميع أبيات المعري الـ 642 بالنص، التشكيل، أو برقم البيت والقصيدة
          </p>
        </div>

        {/* Input Field */}
        <div className="max-w-xl mx-auto relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="اكتب كلمة، مفردة، أو شطرًا للبحث..."
            autoFocus
            className="w-full pl-4 pr-11 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-zinc-100 text-sm font-medium shadow-2xs focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-100 focus:bg-white dark:focus:bg-zinc-900 transition-all"
          />
          <Search className="w-5 h-5 text-zinc-400 absolute right-4 top-3.5 pointer-events-none" />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute left-4 top-3 text-xs text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 bg-zinc-200 dark:bg-zinc-800 px-2 py-0.5 rounded-md"
            >
              مسح
            </button>
          )}
        </div>

        {query.trim() && (
          <div className="text-center text-xs text-zinc-600 dark:text-zinc-400 font-medium">
            تم العثور على <span className="font-bold text-zinc-900 dark:text-zinc-100 font-mono">{searchResults.length}</span> بيتًا ينطبق عليه البحث
          </div>
        )}
      </div>

      {/* Results List */}
      {!query.trim() ? (
        <div className="text-center py-12 text-zinc-400 space-y-3 bg-zinc-50/50 dark:bg-zinc-900/40 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800">
          <Sparkles className="w-6 h-6 text-zinc-400 mx-auto" />
          <p className="text-sm font-serif text-zinc-600 dark:text-zinc-400">
            ابدأ بكتابة الكلمات في مربع البحث لعرض الأبيات ومواقعها
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs text-zinc-600 dark:text-zinc-400">
            <span className="text-zinc-400">مقترحات بحث:</span>
            {['غرباء', 'الموت', 'العالمين', 'الدهر', 'العقل', 'حواء'].map((term) => (
              <button
                key={term}
                onClick={() => setQuery(term)}
                className="px-2.5 py-1 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg transition-colors font-medium text-xs"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      ) : searchResults.length === 0 ? (
        <div className="text-center py-12 text-zinc-400 text-sm font-serif">
          لم يتم العثور على أي أبيات تحتوي على كلمة «{query}»
        </div>
      ) : (
        <div className="space-y-4">
          {searchResults.map((verse) => {
            const poem = poemsMap.get(verse.luzumiyya_number);
            return (
              <div key={verse.id} className="space-y-1">
                {/* Result Poem Header Link */}
                <div className="flex items-center justify-between px-2 text-xs text-zinc-500">
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                    من {poem?.title || `اللزومية ${verse.luzumiyya_number}`}
                  </span>
                  <button
                    onClick={() => onSelectPoem(verse.luzumiyya_number)}
                    className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:underline font-medium"
                  >
                    الانتقال للقصيدة ←
                  </button>
                </div>

                <VerseCard
                  verse={verse}
                  showDiacritics={showDiacritics}
                  fontSize={fontSize}
                  isBookmarked={bookmarks.has(verse.id)}
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
