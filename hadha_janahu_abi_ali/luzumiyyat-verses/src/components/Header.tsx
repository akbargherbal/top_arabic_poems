import React from 'react';
import {
  BookOpen,
  Search,
  Bookmark,
  BarChart3,
  Download,
  Volume2,
  VolumeX,
  Type,
  Sun,
  Moon,
} from 'lucide-react';
import { ViewMode } from '../types';

interface HeaderProps {
  currentView: ViewMode;
  setCurrentView: (view: ViewMode) => void;
  showDiacritics: boolean;
  setShowDiacritics: (show: boolean) => void;
  fontSize: 'small' | 'medium' | 'large' | 'xlarge';
  setFontSize: (size: 'small' | 'medium' | 'large' | 'xlarge') => void;
  bookmarksCount: number;
  onOpenStats: () => void;
  onOpenExport: () => void;
  isDarkMode: boolean;
  setIsDarkMode: (dark: boolean) => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  setCurrentView,
  showDiacritics,
  setShowDiacritics,
  fontSize,
  setFontSize,
  bookmarksCount,
  onOpenStats,
  onOpenExport,
  isDarkMode,
  setIsDarkMode,
  soundEnabled,
  setSoundEnabled,
}) => {
  return (
    <header className="sticky top-0 z-40 border-b backdrop-blur-md bg-white/90 dark:bg-zinc-950/90 border-zinc-200/80 dark:border-zinc-800 shadow-2xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Brand & Title */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 flex items-center justify-center font-bold text-lg font-serif shadow-xs">
                ل
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-400 block -mb-0.5">
                  Diwan Abu Al-Alaa
                </span>
                <h1 className="text-lg sm:text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 font-serif">
                  لزوميات المعرّي
                </h1>
              </div>
            </div>

            {/* Quick Actions (Mobile View Controls) */}
            <div className="flex md:hidden items-center gap-1">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                title="تغيير المظهر"
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <button
                onClick={onOpenExport}
                className="p-2 rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                title="تصدير البيانات"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Navigation Views */}
          <div className="flex items-center justify-center gap-1 bg-zinc-100/80 dark:bg-zinc-900 p-1 rounded-xl border border-zinc-200/80 dark:border-zinc-800 text-xs font-medium">
            <button
              onClick={() => setCurrentView('reader')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all ${
                currentView === 'reader'
                  ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-semibold shadow-xs'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>القصائد</span>
            </button>

            <button
              onClick={() => setCurrentView('search')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all ${
                currentView === 'search'
                  ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-semibold shadow-xs'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>البحث الشامل</span>
            </button>

            <button
              onClick={() => setCurrentView('bookmarks')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all relative ${
                currentView === 'bookmarks'
                  ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-semibold shadow-xs'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>المحفوظات</span>
              {bookmarksCount > 0 && (
                <span className="mr-1 bg-zinc-700 dark:bg-zinc-300 text-white dark:text-zinc-900 text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-full">
                  {bookmarksCount}
                </span>
              )}
            </button>
          </div>

          {/* Reading Customization Controls */}
          <div className="hidden md:flex items-center gap-2">
            {/* Diacritics Toggle */}
            <button
              onClick={() => setShowDiacritics(!showDiacritics)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                showDiacritics
                  ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 border-zinc-900 dark:border-zinc-100 font-semibold'
                  : 'bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-400 line-through'
              }`}
              title="إظهار أو إخفاء التشكيل والحركات"
            >
              <Type className="w-3.5 h-3.5" />
              <span>التشكيل</span>
            </button>

            {/* Font Size Selector */}
            <div className="flex items-center bg-zinc-100 dark:bg-zinc-900 rounded-lg p-0.5 border border-zinc-200 dark:border-zinc-800 text-xs">
              {(['small', 'medium', 'large', 'xlarge'] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => setFontSize(size)}
                  className={`px-2 py-1 rounded-md transition-all ${
                    fontSize === size
                      ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-bold'
                      : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'
                  }`}
                >
                  {size === 'small' && 'أ'}
                  {size === 'medium' && 'أ+'}
                  {size === 'large' && 'أ++'}
                  {size === 'xlarge' && 'أ+++'}
                </button>
              ))}
            </div>

            {/* Audio Toggle */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              title={soundEnabled ? 'إيقاف الصوت' : 'تفعيل الإلقاء الصوتي'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-zinc-900 dark:text-zinc-100" /> : <VolumeX className="w-4 h-4 opacity-40" />}
            </button>

            {/* Stats Button */}
            <button
              onClick={onOpenStats}
              className="p-2 rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              title="إحصائيات القصائد والأبيات"
            >
              <BarChart3 className="w-4 h-4" />
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              title="تغيير النمط (داكن / فاتح)"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-zinc-100" /> : <Moon className="w-4 h-4 text-zinc-800" />}
            </button>

            {/* Export JSON / CSV */}
            <button
              onClick={onOpenExport}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 rounded-lg text-xs font-semibold shadow-xs transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>تصدير</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
