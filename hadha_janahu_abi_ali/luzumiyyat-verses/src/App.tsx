import { useState, useEffect } from 'react';
import { ViewMode } from './types';
import { ALL_POEMS, POEMS_MAP, ALL_VERSES } from './data/poemsIndex';
import { Header } from './components/Header';
import { PoemList } from './components/PoemList';
import { PoemViewer } from './components/PoemViewer';
import { SearchView } from './components/SearchView';
import { BookmarksView } from './components/BookmarksView';
import { StatsModal } from './components/StatsModal';
import { ExportModal } from './components/ExportModal';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('reader');
  const [selectedPoemNumber, setSelectedPoemNumber] = useState<number>(1);
  const [showDiacritics, setShowDiacritics] = useState<boolean>(true);
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large' | 'xlarge'>('medium');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const [isStatsOpen, setIsStatsOpen] = useState<boolean>(false);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);

  // Bookmarks saved in localStorage
  const [bookmarks, setBookmarks] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('luzumiyyat_bookmarks');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  // Dark mode effect
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Persist bookmarks
  useEffect(() => {
    try {
      localStorage.setItem('luzumiyyat_bookmarks', JSON.stringify(Array.from(bookmarks)));
    } catch {
      // ignore
    }
  }, [bookmarks]);

  const handleToggleBookmark = (verseId: string) => {
    setBookmarks((prev) => {
      const next = new Set(prev);
      if (next.has(verseId)) {
        next.delete(verseId);
      } else {
        next.add(verseId);
      }
      return next;
    });
  };

  const handleClearBookmarks = () => {
    setBookmarks(new Set());
  };

  const currentPoem = POEMS_MAP.get(selectedPoemNumber) || ALL_POEMS[0];

  const handleSelectPoem = (num: number) => {
    setSelectedPoemNumber(num);
    setCurrentView('reader');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col transition-colors selection:bg-zinc-900 selection:text-white dark:selection:bg-zinc-100 dark:selection:text-zinc-900">
      {/* Top Navigation Bar */}
      <Header
        currentView={currentView}
        setCurrentView={setCurrentView}
        showDiacritics={showDiacritics}
        setShowDiacritics={setShowDiacritics}
        fontSize={fontSize}
        setFontSize={setFontSize}
        bookmarksCount={bookmarks.size}
        onOpenStats={() => setIsStatsOpen(true)}
        onOpenExport={() => setIsExportOpen(true)}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {currentView === 'reader' && (
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] xl:grid-cols-[300px_1fr] gap-8 items-start">
            {/* Sidebar Poem Navigation */}
            <aside className="lg:sticky lg:top-24">
              <PoemList
                poems={ALL_POEMS}
                selectedPoemNumber={selectedPoemNumber}
                onSelectPoem={handleSelectPoem}
              />
            </aside>

            {/* Selected Poem Reader */}
            <section className="min-w-0">
              <PoemViewer
                poem={currentPoem}
                showDiacritics={showDiacritics}
                fontSize={fontSize}
                bookmarks={bookmarks}
                onToggleBookmark={handleToggleBookmark}
                onSelectPoem={handleSelectPoem}
                totalPoemsCount={ALL_POEMS.length}
              />
            </section>
          </div>
        )}

        {currentView === 'search' && (
          <SearchView
            allVerses={ALL_VERSES}
            poemsMap={POEMS_MAP}
            showDiacritics={showDiacritics}
            fontSize={fontSize}
            bookmarks={bookmarks}
            onToggleBookmark={handleToggleBookmark}
            onSelectPoem={handleSelectPoem}
          />
        )}

        {currentView === 'bookmarks' && (
          <BookmarksView
            bookmarks={bookmarks}
            allVerses={ALL_VERSES}
            poemsMap={POEMS_MAP}
            showDiacritics={showDiacritics}
            fontSize={fontSize}
            onToggleBookmark={handleToggleBookmark}
            onClearBookmarks={handleClearBookmarks}
            onSelectPoem={handleSelectPoem}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200/80 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 py-6 text-center text-xs text-zinc-500 dark:text-zinc-400 mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <span className="font-serif font-bold text-zinc-900 dark:text-zinc-100">
              شرح لزوم ما لا يلزم لأبي العلاء المعري (ت 449 هـ)
            </span>
            <span className="mx-2 text-zinc-300 dark:text-zinc-700">•</span>
            <span>تحقيق د. طه حسين وإبراهيم الإبياري</span>
          </div>

          <div className="flex items-center gap-3 font-mono text-zinc-400">
            <span>642 بيتًا مشكولًا</span>
            <span>•</span>
            <span>75 لزومية</span>
            <span>•</span>
            <button
              onClick={() => setIsExportOpen(true)}
              className="text-zinc-900 dark:text-zinc-100 hover:underline font-semibold font-sans"
            >
              تصدير JSON/CSV
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <StatsModal isOpen={isStatsOpen} onClose={() => setIsStatsOpen(false)} />
      <ExportModal isOpen={isExportOpen} onClose={() => setIsExportOpen(false)} />
    </div>
  );
}
