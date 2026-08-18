import React, { useState } from 'react';
import { Verse } from '../types';
import { Bookmark, Copy, Check, Volume2 } from 'lucide-react';
import { removeDiacritics } from '../utils/arabicUtils';

interface VerseCardProps {
  verse: Verse;
  showDiacritics: boolean;
  fontSize: 'small' | 'medium' | 'large' | 'xlarge';
  isBookmarked: boolean;
  onToggleBookmark: (verseId: string) => void;
  highlightQuery?: string;
  soundEnabled?: boolean;
}

export const VerseCard: React.FC<VerseCardProps> = ({
  verse,
  showDiacritics,
  fontSize,
  isBookmarked,
  onToggleBookmark,
  soundEnabled = true,
}) => {
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Apply diacritics toggle
  const firstHalf = showDiacritics ? verse.first_hemistich : removeDiacritics(verse.first_hemistich);
  const secondHalf = showDiacritics ? verse.second_hemistich : removeDiacritics(verse.second_hemistich);

  // Dynamic font sizing
  const fontSizeClasses = {
    small: 'text-base sm:text-lg leading-relaxed',
    medium: 'text-lg sm:text-xl leading-loose',
    large: 'text-xl sm:text-2xl leading-loose',
    xlarge: 'text-2xl sm:text-3xl leading-loose',
  }[fontSize];

  const handleCopy = async () => {
    const textToCopy = `${firstHalf} ... ${secondHalf} (اللزومية ${verse.luzumiyya_number} - البيت ${verse.verse_number})`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleSpeak = () => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    if (isSpeaking) {
      setIsSpeaking(false);
      return;
    }

    const fullVerseText = `${verse.first_hemistich} ... ${verse.second_hemistich}`;
    const utterance = new SpeechSynthesisUtterance(fullVerseText);
    utterance.lang = 'ar-SA';
    utterance.rate = 0.85;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div
      id={`verse-${verse.id}`}
      className={`group relative bg-white dark:bg-zinc-900 hover:bg-zinc-50/80 dark:hover:bg-zinc-850 border rounded-2xl p-4 sm:p-6 transition-all duration-200 shadow-2xs ${
        isBookmarked
          ? 'border-zinc-900 dark:border-zinc-100 bg-zinc-50/90 dark:bg-zinc-850 shadow-xs'
          : 'border-zinc-200/80 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
      }`}
    >
      {/* Verse Top Bar Metadata */}
      <div className="flex items-center justify-between gap-2 mb-3 text-xs text-zinc-500 border-b border-zinc-100 dark:border-zinc-800 pb-2.5">
        <div className="flex items-center gap-2 font-mono">
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-zinc-100 dark:bg-zinc-800 font-bold text-zinc-900 dark:text-zinc-100 text-xs">
            {verse.verse_number}
          </span>
          <span className="text-zinc-500 text-[11px] font-sans">
            البيت رقم {verse.verse_number}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-md font-mono text-[11px] text-zinc-600 dark:text-zinc-400">
            ص {verse.page_number}
          </span>

          {/* Audio Speech Button */}
          {soundEnabled && (
            <button
              onClick={handleSpeak}
              className={`p-1.5 rounded-lg transition-all ${
                isSpeaking
                  ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 animate-pulse'
                  : 'text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
              title="إلقاء البيت بصوت آلي"
            >
              <Volume2 className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            title="نسخ البيت"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          {/* Bookmark Button */}
          <button
            onClick={() => onToggleBookmark(verse.id)}
            className={`p-1.5 rounded-lg transition-colors ${
              isBookmarked
                ? 'text-zinc-900 dark:text-zinc-100 bg-zinc-200/80 dark:bg-zinc-800'
                : 'text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
            title={isBookmarked ? 'إزالة من المحفوظات' : 'حفظ البيت في المفضلة'}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-zinc-900 dark:fill-zinc-100' : ''}`} />
          </button>
        </div>
      </div>

      {/* Verse Poetry Layout (Traditional Arab Poetic Split) */}
      <div className={`font-serif text-zinc-900 dark:text-zinc-100 ${fontSizeClasses} text-center transition-all`}>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-6 py-1">
          {/* First Hemistich (صدر البيت) */}
          <div className="tracking-wide text-right sm:text-center lg:text-left font-bold text-zinc-900 dark:text-zinc-100">
            {firstHalf}
          </div>

          {/* Poetic Divider Ornament */}
          <div className="hidden lg:flex items-center justify-center text-zinc-300 dark:text-zinc-600 font-serif select-none px-2 text-sm">
            ❊
          </div>

          {/* Mobile Divider */}
          <div className="flex lg:hidden items-center justify-center text-zinc-300 dark:text-zinc-700 text-xs">
            •••
          </div>

          {/* Second Hemistich (عجز البيت) */}
          <div className="tracking-wide text-right sm:text-center lg:text-right font-bold text-zinc-900 dark:text-zinc-100">
            {secondHalf}
          </div>
        </div>
      </div>
    </div>
  );
};
