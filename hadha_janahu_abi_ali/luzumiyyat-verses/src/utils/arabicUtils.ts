/**
 * Utility functions for processing Arabic text and diacritics
 */

// Remove diacritics (Harakat) from Arabic text
export function removeDiacritics(text: string): string {
  return text
    // Remove Tashkeel (diacritics)
    .replace(/[\u064B-\u0652\u0670\u0640]/g, '')
    // Normalize Alif forms (أ, إ, آ => ا)
    .replace(/[أإآ]/g, 'ا')
    // Normalize Ya/Alef Maqsura (ى => ي)
    .replace(/ى/g, 'ي')
    // Normalize Taa Marbouta (ة => ه)
    .replace(/ة/g, 'ه');
}

// Check if query matches target text (insensitive to diacritics and hamza)
export function matchesArabicSearch(text: string, query: string): boolean {
  if (!query.trim()) return true;
  const cleanText = removeDiacritics(text).toLowerCase();
  const cleanQuery = removeDiacritics(query).toLowerCase();
  return cleanText.includes(cleanQuery);
}

// Convert numbers to Arabic Eastern numerals (optionally)
export function toArabicNumerals(num: number | string): string {
  const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return String(num).replace(/\d/g, (digit) => arabicDigits[parseInt(digit, 10)]);
}
