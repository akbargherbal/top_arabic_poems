export interface Verse {
  id: string; // e.g., "1-1"
  luzumiyya_number: number;
  verse_number: number;
  first_hemistich: string; // صدر البيت
  second_hemistich: string; // عجز البيت
  page_number: number;
}

export interface Poem {
  luzumiyya_number: number;
  title: string;
  rhyme_letter: string; // e.g., "الهمزة المضمومة مع الباء"
  page_start: number;
  verses: Verse[];
  meter?: string; // البحر الشعري (e.g., الطويل, البسيط, الوافر)
}

export interface Bookmark {
  verseId: string;
  poemNumber: number;
  verseNumber: number;
  addedAt: number;
  note?: string;
}

export type ViewMode = 'reader' | 'search' | 'bookmarks' | 'grid';
