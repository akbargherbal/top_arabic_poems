import { Poem, Verse } from '../types';
import { LUZUMIYYAT_POEMS } from './luzumiyyatData';
import { ADDITIONAL_POEMS } from './morePoems';

// Combine all poems and sort by luzumiyya_number
export const ALL_POEMS: Poem[] = [...LUZUMIYYAT_POEMS, ...ADDITIONAL_POEMS].sort(
  (a, b) => a.luzumiyya_number - b.luzumiyya_number
);

// Map of all poems by number for fast O(1) lookup
export const POEMS_MAP = new Map<number, Poem>(
  ALL_POEMS.map((p) => [p.luzumiyya_number, p])
);

// Flat list of all verses across all poems
export const ALL_VERSES: Verse[] = ALL_POEMS.flatMap((p) => p.verses);

// Total verse count
export const TOTAL_VERSES_COUNT = ALL_VERSES.length;

// Get poem by number
export function getPoemByNumber(num: number): Poem | undefined {
  return POEMS_MAP.get(num);
}
