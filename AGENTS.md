# AGENTS.md

## Task

You are an AI agent responsible for extracting the poetic text from **ten Arabic poems** and converting each poem into structured Python files.

The goal is to produce a Python representation of each poem where every verse is split into:

- **Sadr** — the first hemistich
- **Ajuz** — the second hemistich

The extracted text must faithfully reflect the source.

---

## Directory Structure

There are **10 poems**.

Each poem has its **own dedicated directory**.

Each poem directory contains one or more Python files as required.

Each Python file must follow this naming convention:

```text
poet_name_poem_name_[INCREMENT].py
```

Where:

- `poet_name` is the poet's name, written using lowercase English characters and underscores instead of spaces.
- `poem_name` is the poem's name, written using lowercase English characters and underscores instead of spaces.
- `[INCREMENT]` is a sequential number used when multiple files are required for the same poem.

For a single file, the increment may be omitted.

Example:

```text
antara_bin_shadad_mullaqa.py
```

If multiple files are required:

```text
antara_bin_shadad_mullaqa_2.py
antara_bin_shadad_mullaqa_3.py
```

---

## Python File Structure

Every Python file must define a variable named exactly:

```python
poem_list
```

`poem_list` must be a list of tuples:

```python
poem_list = [
    (sadr1, ajuz1),
    (sadr2, ajuz2),
    ...
    (sadrN, ajuzN),
]
```

Each tuple represents **one complete poetic verse**:

- First element: **Sadr**
- Second element: **Ajuz**

The order of the verses must be preserved exactly as they appear in the source.

---

## Example

For example, `antara_bin_shadad_mullaqa.py` should have the following structure:

```python
poem_list = [
    # File 01
    (
        "هَلْ غَادَرَ الشُّعَرَاءُ مِنْ مُتَرَدَّمِ",
        "أَمْ هَلْ عَرَفْتَ الدَّارَ بَعْدَ تَوَهُّمِ",
    ),
    (
        "إِلَّا رَوَاكِدَ بَيْنَهُنَّ خَصَائِصٌ",
        "وَبَقِيَّةٌ مِنْ نُؤْيِهَا الْمُجْرَنْثِمِ",
    ),
]
```

---

## Extraction Rules

### 1. Preserve the Source Text

Extract the poem **faithfully from the provided source**.

Do **not**:

- Rewrite verses.
- Paraphrase the text.
- Correct words based on personal knowledge.
- Replace words with versions from another edition.
- Add missing words from memory.
- Remove words.
- Invent text that is not present in the source.

If the source differs from a commonly known version of the poem, **the source takes precedence**.

The task is transcription/extraction, not literary correction.

---

### 2. Split Every Verse into Sadr and Ajuz

Every complete verse must be represented as:

```python
("sadr", "ajuz")
```

Do not store the complete verse as a single string.

For example:

```python
(
    "هَلْ غَادَرَ الشُّعَرَاءُ مِنْ مُتَرَدَّمِ",
    "أَمْ هَلْ عَرَفْتَ الدَّارَ بَعْدَ تَوَهُّمِ",
)
```

---

### 3. Preserve Verse Order

Preserve the original order of all verses.

Do not reorder verses based on:

- Another edition of the poem.
- A different online source.
- The poetic meter.
- Familiarity with the poem.
- Personal assumptions about the correct order.

---

### 4. Preserve Diacritics

If the source contains Arabic diacritics, preserve them.

If the source is unvocalized, **do not add diacritics from memory or from another source** unless explicitly instructed to do so.

---

### 5. Preserve Punctuation

Preserve punctuation when it is part of the source text.

Do not introduce punctuation merely to improve readability.

---

### 6. Preserve Arabic Characters

The Python files must use UTF-8-compatible text.

Do not transliterate Arabic poetry into Latin characters.

Do not normalize or replace Arabic characters unless necessary to faithfully represent the source.

---

## Comments and File Boundaries

Comments may be used to indicate source-file boundaries or sections when relevant.

For example:

```python
poem_list = [
    # File 01
    (
        "...",
        "...",
    ),
]
```

If the source material is divided into multiple files or clearly identified sections, preserve those boundaries using comments where appropriate.

Do not add unnecessary commentary inside `poem_list`.

---

## Validation Before Completion

Before considering a poem complete, verify all of the following:

1. The file name follows the required naming convention.
2. The file is located in the correct poem directory.
3. The main variable is exactly:

   ```python
   poem_list
   ```

4. `poem_list` is a Python list.
5. Every item in `poem_list` is a two-element tuple.
6. The first element of every tuple is the Sadr.
7. The second element of every tuple is the Ajuz.
8. The number of extracted verses matches the source.
9. No verses are missing.
10. No verses were accidentally duplicated.
11. The original verse order is preserved.
12. No text was invented or silently corrected.
13. Arabic characters and diacritics, when present, are preserved.
14. The file is valid Python syntax.
15. The resulting file can be imported successfully as a Python module.

---

## Handling Uncertainty

If a portion of the source is unclear, **do not guess**.

Instead:

1. Re-check the source.
2. Inspect the surrounding text.
3. Compare only when comparison is necessary to resolve an extraction issue.
4. If the text remains genuinely unclear, preserve what is actually visible rather than reconstructing it from memory.

Do not use your knowledge of the poem to silently replace unclear source text with a presumed "correct" version.

---

## Important Principle

**Accuracy of extraction takes priority over literary correctness.**

The agent's job is to extract and structure the text found in the source, not to edit, modernize, correct, or reconstruct the poem.

The final output for each poem should consist of valid Python files containing:

```python
poem_list = [
    ("sadr1", "ajuz1"),
    ("sadr2", "ajuz2"),
    ("sadr3", "ajuz3"),
]
```

The resulting data should be suitable for programmatic processing while preserving the original Arabic poetic text as faithfully as possible.
