# BOOK DATA MODEL GUIDE

This document is the **data contract** for the Beyond Vibe Coding Tracker. Every other guide and content file in this repo (`chapters.md`, `labs.md`, `glossary.md`, `resources.md`, `quit_criteria_guide.md`, and the app itself) reads ids from this document. Read this file first.

> [!IMPORTANT]
> This tracker follows ***Process Over Magic: Beyond Vibe Coding: Faster, Smarter, and Safer Coding with AI Assistants*** by Uberto Barbini (The Pragmatic Programmers, June 2026, ISBN 9798888652008 — https://pragprog.com/titles/ubaidev/process-over-magic-beyond-vibe-coding/). The PragProg table of contents lists **section titles only** — no section numbers (`x.y`) and no sub-subsections. The `num` values below (`1.1`, `1.2`, …) are this app's own sequencing for navigation, not numbers printed in the book. The book also ships a **20-video YouTube companion series** (https://www.youtube.com/playlist?list=PLUeffUYYqoHrUy1_VrwLxBybjHNL7p9Mz) that this tracker treats as the hands-on backbone — one `Lab` per video.

---

## 1. Source of truth files

Same split as the sibling book trackers this repo was cloned from: language-independent structure lives once in `src/data/shared/`, so id parity between locales is structural rather than merely checked.

- `src/data/shared/*.ts` — `sections.ts`, `videos.ts`, `chapterMeta.ts`, `labMeta.ts`, `flashcards.ts`, `resources.ts`. Ids, nums, and every field that must not vary by language.
- `src/data/glossary/vi.ts` / `en.ts` — full per-locale `GlossaryTerm[]` arrays. `id`, `name`, `chapterIds`, `refUrl`, `specUrl` are duplicated identically across both files; only `description` differs by language.
- `src/data/labs/vi.ts` / `en.ts` — per-locale `Record<labId, LabContent>` (`title`/`goal`/`requirements`/`acceptanceCriteria`) — prose only. Composed with `shared/labMeta.ts` (`chapterId`/`videoId`/`toolsUsed`) in `bookData.vi.ts`/`bookData.en.ts` into `Lab[]`.
- `src/data/quitCriteria/vi.ts` / `en.ts` — per-locale `Record<chapterId, QuitCriteriaText>` (`stopSignal`/`exitCriteria`) — prose only. `id` (`qc-${chapterId}`) and `chapterId` are still derived from `CHAPTER_META`, keeping id parity structural.
- `src/data/bookData.vi.ts` / `bookData.en.ts` — chapter summaries, composed with `shared/`, `labs/<lang>.ts`, and `quitCriteria/<lang>.ts` into `Chapter[]` / `Video[]` / `Lab[]` / `QuitCriteriaRow[]`; each also re-exports its glossary bundle.
- `src/data/bookData.ts` — thin facade, picks a bundle by `state.lang`, exposes `getChapters()`, `getVideos()`, `getLabs()`, `getGlossary()`, `getResources()`, `getQuitCriteriaData()`, `getMetaData()`. Runs dev-only id-set and content-count assertions on import.

`Resource` and `Video` records live in `shared/` as single objects (not per-locale) — `title` there is a proper name/link title, not prose to translate. `GlossaryTerm` records are per-locale since `description` is prose. `Lab` and `QuitCriteriaRow` are split: language-independent fields stay in `shared/` (or derive from `CHAPTER_META`), prose fields are per-locale under `labs/` and `quitCriteria/`.

**Never rename or reassign an existing id.** Ids are the primary key for completion state persisted in `localStorage`. A dev-only check in `bookData.ts` logs a `console.error` if the id sets of the vi/en files ever diverge — for chapters, labs, quit-criteria, and glossary — and if the chapter/section/video/lab/flashcard counts in §6 don't match what `shared/` actually contains, or if a `Lab.videoId`/`Chapter.labIds` reference doesn't resolve.

## 2. TypeScript interfaces

```typescript
export interface Section {
  id: string;          // "ch-1-s1" — stable primary key
  num: string;          // "1.1" — this app's own display numbering, not printed in the book
  title: string;
  estMinutes: number;   // reading time estimate, used for schedule-free time stats only
}

export interface Video {
  id: string;           // "vid-ch-1-1"
  chapterId: string;    // "ch-1"
  youtubeId: string;    // "7DV4MvSR1v0"
  title: string;
  order: number;        // position within the chapter's video list
}

export interface Chapter {
  id: string;            // "ch-1" (appendix A1 is "ch-a1", tracked as chapter 6)
  num: number;           // 1
  title: string;
  summary: string;       // 1-3 sentences: what you learn / when it matters
  sections: Section[];
  labIds: string[];      // "lab-ch-1-1", … — one per companion video for this chapter, [] if none
  flashcardId: string;   // "fc-ch-1"
  glossaryRefs: string[]; // glossary term ids introduced or central to this chapter
}

export interface Lab {
  id: string;            // "lab-ch-2-3"
  chapterId: string;     // "ch-2"
  videoId: string;       // "vid-ch-2-3" — the companion video this lab reproduces
  title: string;
  goal: string;
  requirements: string[];
  acceptanceCriteria: string[];
  toolsUsed: string[];   // free-text tools/stack (e.g. "Python", "Kotlin", "Claude Code") — not glossary ids
}

export interface FlashcardTask {
  id: string;            // "fc-ch-1"
  chapterId: string;
}

export interface GlossaryTerm {
  id: string;            // "term-vibe-coding"
  name: string;
  chapterIds: string[];  // chapters where this term is central
  description: string;   // localized prose — one array per language, see glossary/vi.ts / glossary/en.ts
  refUrl: string;         // primary reference (Wikipedia, official docs, vendor blog — not MDN-only, this isn't a Web API glossary)
  specUrl?: string;       // secondary deep-dive link (e.g. the arXiv paper for Attention/Transformer terms)
}

export interface Resource {
  id: string;             // "res-ch-1-1" or "res-vid-ch-1-1" for a video resource
  chapterId: string;
  title: string;
  url: string;
  type: "mdn" | "spec" | "article" | "video" | "demo" | "tool";
}

export interface QuitCriteriaRow {
  id: string;             // "qc-ch-1"
  chapterId: string;
  stopSignal: string;     // when to stop/skip this chapter
  exitCriteria: string;   // when you're "good enough" to move on without finishing every page
}
```

## 3. State keys written to `localStorage` (`AppState`)

```typescript
interface AppState {
  read: Record<string, boolean>;          // key = section.id  -> "ch-1-s1"
  videoWatched: Record<string, boolean>;  // key = video.id    -> "vid-ch-1-1"
  labDone: Record<string, boolean>;       // key = lab.id      -> "lab-ch-1-1"
  flashcardDone: Record<string, boolean>; // key = chapter.flashcardId -> "fc-ch-1"
  activeTab: RouteId;
  theme: "dark" | "light";
  lang: "vi" | "en";
  pomodoroSettings: { workMinutes: number; breakMinutes: number; longBreakMinutes: number };
  pomodoroSessions: Array<{ completedAt: string; durationMinutes: number }>;
}
```

`read[sectionId]` and `videoWatched[videoId]` are independent booleans on independent entities (a section, a video) — there is no longer a hands-on flag per section; hands-on practice is tracked at the video/lab level instead, since this book's hands-on unit is "reproduce this video's exercise," not "practice this reading section."

## 4. Id conventions (do not deviate)

| Entity | Pattern | Example |
| :--- | :--- | :--- |
| Chapter | `ch-{num}` or `ch-a1` for the appendix | `ch-2`, `ch-a1` |
| Section | `ch-{num}-s{sectionNum}` | `ch-2-s3` (= this app's section 2.3) |
| Video | `vid-ch-{num}-{order}` | `vid-ch-2-3` |
| Lab | `lab-ch-{num}-{order}`, same `{order}` as its paired video | `lab-ch-2-3` |
| Chapter flashcard task | `fc-ch-{num}` | `fc-ch-2` |
| Glossary term | `term-{kebab-case-name}` | `term-vibe-coding` |
| Resource | `res-ch-{num}-{index}` (reading link) or `res-vid-ch-{num}-{order}` (video, generated from `Video[]`) | `res-ch-2-1`, `res-vid-ch-2-3` |
| Quit-criteria row | `qc-{chapterId}` | `qc-ch-2` |

Appendix A1 is chapter id `ch-a1`, `num: 6` — it sorts and displays as the 6th chapter, keeping numbering simple (`Chapter.num` is a plain integer, needed for sorting resources and quit-criteria rows). Section/video/lab ids use `ch-{num}` with `num=6` for the appendix's own children (e.g. `ch-6-s1`) even though the chapter id itself is `ch-a1` — see `src/data/shared/sections.ts` and `chapterIdFor()` in `videos.ts` for the exact mapping.

## 5. Full chapter → section/video/lab map

6 chapters (5 numbered + appendix A1), **33 tracked sections**, **20 companion videos**, **20 labs** (one per video — chapters 5 and A1 have no companion videos, so no labs), **6 flashcard tasks**.

### Chapter 1 — `ch-1` — "Going with the Vibe" (4 videos / 4 labs)
| Section id | num | Title |
| :--- | :--- | :--- |
| ch-1-s1 | 1.1 | Vibe Coding a Game |
| ch-1-s2 | 1.2 | Improving Your Prompts |
| ch-1-s3 | 1.3 | Writing a More Complex Game with AI |
| ch-1-s4 | 1.4 | What Went Wrong |
| ch-1-s5 | 1.5 | Using Specifications to Drive Assistants |
| ch-1-s6 | 1.6 | What We Learned |

| Video id | Title | Lab id |
| :--- | :--- | :--- |
| vid-ch-1-1 | Vibe coding Jewel Swap game | lab-ch-1-1 |
| vid-ch-1-2 | Vibe coding a Flight Simulator game in Python | lab-ch-1-2 |
| vid-ch-1-3 | Spec Driven Development coding a platform game in Python with a Panda | lab-ch-1-3 |
| vid-ch-1-4 | …the second try | lab-ch-1-4 |

### Chapter 2 — `ch-2` — "Building Securely and Predictably" (5 videos / 5 labs)
| Section id | num | Title |
| :--- | :--- | :--- |
| ch-2-s1 | 2.1 | Keep the Edge |
| ch-2-s2 | 2.2 | One Prompt, One Commit |
| ch-2-s3 | 2.3 | An AI with Good Habits |
| ch-2-s4 | 2.4 | Building an Application Following Rules |
| ch-2-s5 | 2.5 | Results and Reflections |
| ch-2-s6 | 2.6 | What We Learned |

Videos `vid-ch-2-1`…`vid-ch-2-5` = "Build LLM Empowered Semantic Search tool 1/5"…"5/5", labs `lab-ch-2-1`…`lab-ch-2-5`.

### Chapter 3 — `ch-3` — "Learning by Coding" (5 videos / 5 labs)
| Section id | num | Title |
| :--- | :--- | :--- |
| ch-3-s1 | 3.1 | The Inception |
| ch-3-s2 | 3.2 | Shaping the Idea |
| ch-3-s3 | 3.3 | Walking Skeleton |
| ch-3-s4 | 3.4 | Modeling the Domain |
| ch-3-s5 | 3.5 | Developing the Search UI |
| ch-3-s6 | 3.6 | Show PDFs |
| ch-3-s7 | 3.7 | What We Learned |

Videos `vid-ch-3-1`…`vid-ch-3-5` = "Learning Elixir while building a web UI for the LESS search tool 1/5"…"5/5", labs `lab-ch-3-1`…`lab-ch-3-5`.

### Chapter 4 — `ch-4` — "Working on a Large Codebase" (6 videos / 6 labs)
| Section id | num | Title |
| :--- | :--- | :--- |
| ch-4-s1 | 4.1 | Managing Technical Debt |
| ch-4-s2 | 4.2 | Understanding Legacy Code |
| ch-4-s3 | 4.3 | Enhancing Big Code Projects with AI |
| ch-4-s4 | 4.4 | Is It All Worth It? |
| ch-4-s5 | 4.5 | Cheat Sheet for the AI Powered Developer |
| ch-4-s6 | 4.6 | What We Learned |

| Video id | Title | Lab id |
| :--- | :--- | :--- |
| vid-ch-4-1 | Adding New Tests on a Kotlin Library with AI Assistants | lab-ch-4-1 |
| vid-ch-4-2 | Fixing a Bug on a Kotlin Library with AI Assistants | lab-ch-4-2 |
| vid-ch-4-3 | Creating a New Feature for a Kotlin Library with AI assistants | lab-ch-4-3 |
| vid-ch-4-4 | Generating Documentation for Large Code Bases with AI assistants | lab-ch-4-4 |
| vid-ch-4-5 | Creating a Debug Plan for Large Code Bases with AI assistants | lab-ch-4-5 |
| vid-ch-4-6 | Generating Mermaid Documentation Diagrams with AI Assistants | lab-ch-4-6 |

### Chapter 5 — `ch-5` — "Collaborating Inside an AI-Powered Team" (no videos, no labs)
| Section id | num | Title |
| :--- | :--- | :--- |
| ch-5-s1 | 5.1 | Adopting AI |
| ch-5-s2 | 5.2 | Team Organization |
| ch-5-s3 | 5.3 | Security Risks |
| ch-5-s4 | 5.4 | What We Learned |

### Appendix A1 — `ch-a1` — "Demystifying Large Language Models" — tracked as chapter 6, no videos, no labs
| Section id | num | Title |
| :--- | :--- | :--- |
| ch-6-s1 | 6.1 | Attention Is All You Need |
| ch-6-s2 | 6.2 | What Are Large Language Models? |
| ch-6-s3 | 6.3 | Vector Databases |
| ch-6-s4 | 6.4 | Considerations |

---

## 6. Counts (for verification)

| Chapter | Sections | Videos | Labs |
| :--- | ---: | ---: | ---: |
| ch-1 | 6 | 4 | 4 |
| ch-2 | 6 | 5 | 5 |
| ch-3 | 7 | 5 | 5 |
| ch-4 | 6 | 6 | 6 |
| ch-5 | 4 | 0 | 0 |
| ch-a1 | 4 | 0 | 0 |
| **Total** | **33** | **20** | **20** |

Any implementation must have exactly 6 `Chapter` objects, 33 `Section` objects, 20 `Video` objects, 20 `Lab` objects, and 6 `FlashcardTask` objects across `bookData.*.ts` — enforced by the dev-only assertions in `src/data/bookData.ts` (`TOTAL_SECTIONS`/`TOTAL_VIDEOS`/`TOTAL_LABS`/`TOTAL_FLASHCARDS` in `src/constants.ts`).

## 7. Updating this file if the book's structure changes

1. Check the PragProg product page or liveBook for the current TOC — no file to fetch or store, just read it and transcribe by hand.
2. Add/adjust rows following the exact id pattern in §4. Never renumber an existing section/video/lab id out from under recorded progress — treat a real content change as adding/removing an id, not reassigning one.
3. Update the counts table in §6 and the constants in `src/constants.ts` together.
4. Update `docs/content/chapters.md`, `labs.md`, `glossary.md`, `resources.md`, `quit_criteria_guide.md` to match.
