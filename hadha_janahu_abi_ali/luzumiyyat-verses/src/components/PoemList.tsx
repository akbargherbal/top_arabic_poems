import React, { useState } from 'react';
import { Poem } from '../types';
import { matchesArabicSearch } from '../utils/arabicUtils';
import { Search, BookOpen } from 'lucide-react';

interface PoemListProps {
  poems: Poem[];
  selectedPoemNumber: number;
  onSelectPoem: (num: number) => void;
}

export const PoemList: React.FC<PoemListProps> = ({
  poems,
  selectedPoemNumber,
  onSelectPoem,
}) => {
  const [filterQuery, setFilterQuery] = useState('');

  const filteredPoems = poems.filter((poem) => {
    if (!filterQuery) return true;
    const numMatch = poem.luzumiyya_number.toString().includes(filterQuery);
    const titleMatch = matchesArabicSearch(poem.title, filterQuery);
    const rhymeMatch = matchesArabicSearch(poem.rhyme_letter, filterQuery);
    const verseMatch = poem.verses.some(
      (v) =>
        matchesArabicSearch(v.first_hemistich, filterQuery) ||
        matchesArabicSearch(v.second_hemistich, filterQuery)
    );
    return numMatch || titleMatch || rhymeMatch || verseMatch;
  });

  return (
    <div className="bg-zinc-50/80 dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-zinc-800 rounded-2xl p-4 shadow-2xs space-y-4">
      {/* Header & Filter */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
            <span>فهرس اللزوميات</span>
          </h3>
          <span className="text-[10px] uppercase font-mono tracking-widest bg-zinc-200/70 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold px-2 py-0.5 rounded-md">
            {filteredPoems.length} قصيدة
          </span>
        </div>

        {/* Filter Input */}
        <div className="relative">
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="تصفية برقم اللزومية أو القافية..."
            className="w-full pl-3 pr-9 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-100 transition-colors"
          />
          <Search className="w-4 h-4 text-zinc-400 absolute right-3 top-2.5 pointer-events-none" />
        </div>
      </div>

      {/* Poem Cards List */}
      <div className="max-h-[600px] overflow-y-auto space-y-2 pr-1 custom-scrollbar">
        {filteredPoems.length === 0 ? (
          <div className="text-center py-8 text-zinc-400 text-xs">
            لا توجد لزوميات تطابق البحث
          </div>
        ) : (
          filteredPoems.map((poem) => {
            const isSelected = poem.luzumiyya_number === selectedPoemNumber;
            return (
              <button
                key={poem.luzumiyya_number}
                onClick={() => onSelectPoem(poem.luzumiyya_number)}
                className={`w-full text-right p-3 rounded-xl border transition-all duration-150 flex flex-col gap-1.5 ${
                  isSelected
                    ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 dark:border-zinc-100 shadow-xs'
                    : 'bg-white dark:bg-zinc-900/90 border-zinc-200/80 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 text-zinc-800 dark:text-zinc-200'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className={`font-bold font-serif text-sm ${isSelected ? 'text-white dark:text-zinc-900' : 'text-zinc-900 dark:text-zinc-100'}`}>
                    {poem.title}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md font-semibold ${
                      isSelected
                        ? 'bg-zinc-800 text-zinc-200 dark:bg-zinc-200 dark:text-zinc-800'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                    }`}
                  >
                    #{poem.luzumiyya_number}
                  </span>
                </div>

                <div className={`text-xs ${isSelected ? 'text-zinc-300 dark:text-zinc-700' : 'text-zinc-500 dark:text-zinc-400'} flex items-center justify-between`}>
                  <span className="truncate max-w-[150px]">{poem.rhyme_letter}</span>
                  <div className="flex items-center gap-2 text-[10px] font-mono">
                    <span>{poem.verses.length} بيتًا</span>
                    <span>•</span>
                    <span>ص {poem.page_start}</span>
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
};
