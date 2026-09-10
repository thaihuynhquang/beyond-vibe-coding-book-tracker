# PRODUCT REQUIREMENT DOCUMENT (PRD): INTERACTIVE UI COMPONENTS & USER FLOW SPECIFICATIONS

This document is the **Product Requirement Document (PRD)** and User Interaction Specification for all interactive features of the **Beyond Vibe Coding Tracker**.

> [!NOTE]
> For architecture and code patterns, see [architecture_guide.md](./architecture_guide.md). For the data schema and id conventions, see [book_data_model_guide.md](./book_data_model_guide.md). For directory structure, see [project_structure.md](./project_structure.md). For design tokens and icons, see [ui_system_design_guide.md](./ui_system_design_guide.md).

---

## 1. Purpose & Interactive Design Principles

1. **Instant Reactive Feedback**: every interaction (checking read/video/lab, filtering chapters, starting the timer, toggling theme/language) reflects immediately, zero page reload.
2. **State-Driven Persistence**: every change updates the state store and persists to `localStorage` instantly.
3. **Three-Axis Progress Model**: overall % = Read (40%) + Companion video watched (30%) + Chapter deliverables — labs + flashcards (30%). Pomodoro sessions are tracked but excluded from this formula (see `architecture_guide.md` Pattern 4).

---

## 2. Global Features & Navigation Bar Specifications (PRD-01)

### 2.1. Theme Switcher (Dark/Light Mode)
- **User Story**: As a reader, I want to toggle Dark/Light theme to read comfortably at any time of day.
- **UI Component**: `Theme Toggle Component`, header bar.
- **Flow**: read `theme` from store → flip → apply `data-theme` on `<html>` → swap Sun/Moon SVG icon → persist.
- **AC**:
  - [ ] Theme persists across reloads.
  - [ ] CSS custom properties transition smoothly between themes.

### 2.2. Language Switcher (VI/EN)
- **User Story**: As a reader, I want to switch the app's UI and chapter descriptions between Vietnamese and English.
- **UI Component**: `Language Toggle Component`, header bar.
- **Flow**: read `lang` from store → flip → call `getChapters()`/`getVideos()`/`getLabs()`/etc. through the `bookData.ts` facade to repaint content in the new language → sweep static header text via `applyStaticTranslations()` → persist.
- **AC**:
  - [ ] Switching language never changes any `id` or completion state — only display text changes.

### 2.3. Export Backup
- **User Story**: As a reader, I want to export my reading progress and Pomodoro history to a backup file.
- **UI Component**: `Export Action Component`, header bar.
- **Flow**: serialize `AppState` to JSON → download as `beyond-vibe-coding-tracker-backup-YYYY-MM-DD.json` → success toast.
- **AC**:
  - [ ] File contains `read`, `videoWatched`, `labDone`, `flashcardDone`, `activeTab`, `theme`, `lang`, `pomodoroSettings`, `pomodoroSessions`.

### 2.4. Import Backup
- **User Story**: As a reader, I want to import a JSON backup to restore progress on a new device.
- **UI Component**: `Import Action Component`, header bar.
- **Flow**: file picker (`.json` only) → validate schema → on success restore state, re-render, toast; on failure show error toast and keep current state intact.
- **AC**:
  - [ ] Corrupted/invalid JSON is rejected cleanly without crashing the app.

### 2.5. Progress Reset
- **User Story**: As a reader, I want to clear all progress and restart from chapter 1.
- **UI Component**: `Reset Action Component`, header bar.
- **Flow**: confirmation dialog → on confirm, clear `read`/`videoWatched`/`labDone`/`flashcardDone`, wipe `pomodoroSessions`, restore default timer settings (`25/5`), save, re-render to 0%.
- **AC**:
  - [ ] All progress badges instantly return to 0%.

### 2.6. Hash Router & Dynamic Navigation Badge
- **UI Component**: `Navigation Bar Component`.
- **Flow**: URL hash format `#/view-name` (`dashboard`, `chapters`, `pomodoro`, `resources`, `quitcriteria`) → toggle active tab + matching view container → `#badge-overall-pct` on the Dashboard tab shows the weighted overall %.
- **AC**:
  - [ ] Direct URL hash access (e.g. `#/quitcriteria`) activates the correct tab.

---

## 3. Dashboard View Specifications (PRD-02)

### 3.1. Metric Tiles
- **UI Component**: `Dashboard View Component` (`.stat-grid` → `.metric-card` × 4).
- **Requirements**: sections read (`readCount/33`), companion videos watched (`videoWatchedCount/20`), chapter deliverables done (`labDoneCount + flashcardDoneCount`), total Pomodoro focus hours. No "overall %" tile — it would duplicate 3.2.
- **AC**:
  - [ ] Each tile updates instantly when its underlying state changes.

### 3.2. Progress Overview Card
- **UI Component**: `Dashboard View Component` (`.progress-header` + one `.progress-bar-track`).
- **Requirements**: title + subtitle, one big weighted Overall % (`.progress-percentage`), one full-width gradient bar (`.progress-bar-fill--dynamic`) driven by that same %. Deliberately a single stat, not a per-axis (read/video/deliverables) breakdown — see `progress.ts`'s `overallPct` weighting in Pattern 4 of `architecture_guide.md` for how the three axes still feed into it.
- **AC**:
  - [ ] The bar width and the header % always match, since both read `stats.overallPct`.

### 3.3. Active Chapter & Next Focus Card
- **User Story**: As a reader, I want to see which chapter I'm on and what to do next without hunting through the Chapters tab.
- **UI Component**: `Dashboard View Component` ("Next Focus" card, `.card--accent-primary`).
- **Flow**: Progress Engine finds the first chapter not 100% read and 100% watched → if it has an unread section, renders that section + a "Mark as read" button (`data-section-id`); else, if it has an unwatched companion video, renders that video + a "Mark as watched" button (`data-video-id`). When every chapter is complete, renders a `.card--accent-lime` "all done" state instead.
- **Trigger**: click either button → `toggleRead(sectionId)` / `toggleVideoWatched(videoId)` → Dashboard recalculates and re-renders.
- **AC**:
  - [ ] Clicking a button updates state and recalculates overall % immediately.

### 3.4. Per-Chapter Progress List
- **User Story**: As a reader, I want to see at a glance which chapters are done, in progress, or untouched, without opening each one.
- **UI Component**: `Dashboard View Component` (`.chapter-progress-list` → `.chapter-progress-row`, one per chapter — all 6 are always shown, none are placeholder/unpublished).
- **Flow**: each row is a `.surface-card` with a header band (chapter number/title, a `.status-badge--dynamic` pill (`notStarted`/`inProgress`/`done`) + `%`) and a body (a thin progress bar plus a `sectionsRead/sectionsTotal sections · videosWatched/videosTotal videos · ~N min` meta line) — all derived from `ChapterProgress` (`calculateProgress().chapterProgresses`, see Pattern 4 in `architecture_guide.md`). The same `ChapterProgress` entries drive the Chapters view's per-card badge (§4.1), so the two views always agree.
- **AC**:
  - [ ] Status color/label/percentage for a given chapter are identical between the Dashboard row and the Chapters tab card.

---

## 4. Chapters View Specifications (PRD-03)

### 4.1. Chapter Cards with Collapsible Section and Video Lists
- **UI Component**: `Chapters View Component` (`<book-view-chapters>`), 6 `.chapter-card`s.
- **Flow**: every chapter card always shows header (chapter number, title, `N sections · M videos · ~T min` meta line, `.status-badge--dynamic` pill, `unitsDone/unitsTotal (pct%)`), progress bar, chapter-summary box, and flashcard card. The section list and the video-and-lab list are each independently collapsible via their own `.section-list-toggle` button (`data-sections-toggle` / `data-videos-toggle`, `chevronDown` icon that rotates on collapse); collapse state is two in-memory `Set<string>`s of chapter ids on `BookViewChapters` — **not** persisted to `AppState`/`localStorage`, so it resets on tab switch, language/theme change, import, and reset. Default is expanded (empty sets). Chapters with no companion videos (5, A1) render no video-and-lab section at all.
- **Filtering**: a chapter filter-pill row (`chapterFilterChipsHtml()`, `src/views/helpers.ts`, `.filter-bar`/`.filter-pill`) narrows the list to one chapter at a time, or back to "All chapters".
- **AC**:
  - [ ] Clicking a chapter's section-list or video-list toggle hides/shows only that list; the rest of the card stays visible either way, and it does not trigger a full view re-render (mutates the DOM in place, same pattern as `patchChapterCard()`).
  - [ ] Toggling a section-read, video-watched, or lab-done checkbox re-renders only that chapter's card (`patchChapterCard()`) without losing keyboard focus on that checkbox or losing the card's collapse state.

### 4.2. Section Checklist (Read)
- **User Story**: As a reader, I want to mark a section as read as I go through the book.
- **UI Component**: `Chapters View Component` (per-section row, one checkbox: `data-read-id`, set to the section's `id`).
- **Flow**: `change` on the checkbox → `toggleRead(sectionId)`.
- **AC**:
  - [ ] State persists in `localStorage`.
  - [ ] Reading contributes 40% weight to overall progress.

### 4.3. Video & Lab Checklist
- **User Story**: As a reader, I want to track which companion videos I've watched and which of their paired labs I've actually reproduced.
- **UI Component**: `Chapters View Component` (per-video row: a `.item-row` with an external "Watch on YouTube" link, a `data-video-id` watched checkbox, and — nested inside — that video's `Lab` as a `.deliverable-card`: goal, requirements, acceptance criteria, tools-used tags, and a `data-lab-id` "Mark lab complete" checkbox).
- **Flow**: `change` on the video checkbox → `toggleVideoWatched(videoId)`; `change` on the lab checkbox → `toggleLabDone(labId)`. A video and its lab toggle independently — watching the video doesn't auto-complete the lab.
- **AC**:
  - [ ] Both states persist independently in `localStorage`.
  - [ ] Video-watched contributes 30% weight; lab-done contributes to the 30%-weight chapter-deliverables axis alongside flashcards.

---

## 5. Chapter Deliverables Specifications (PRD-04)

The flashcard checklist renders at the end of each chapter card in `Chapters View Component` (`<book-view-chapters>`), after the section and video-and-lab lists — there is no separate Labs tab; labs render nested under their paired video (§4.3).

### 5.1. Flashcard Task Checklist
- **User Story**: As a reader, I want one checkbox per chapter confirming "I generated and reviewed my flashcard deck," without the app needing to store the deck itself.
- **UI Component**: `Chapters View Component` (`.deliverable-card`, one per chapter, linked from `docs/content/flashcards_guide.md`).
- **Flow**: single checkbox bound to `data-flashcard-id` calls `toggleFlashcardDone(flashcardId)`.
- **AC**:
  - [ ] This is intentionally the only flashcard state the app stores — no spaced-repetition scheduling, no card content in `localStorage`.

---

## 6. Resources View Specifications (PRD-06)

Glossary terms, reading-list links, and the 20 companion videos render as one merged, flat grid — sorted by chapter, distinguished only by a `.resource-badge` type tag. There is no separate Glossary tab and no bookmark/star feature.

### 6.1. Search & Chapter Filter
- **UI Component**: `Resources View Component` (`#resources-search-input`, chapter filter pills).
- **Flow**: filter the merged item list (glossary terms + resource links + videos) by title/description substring match and/or selected chapter id; re-render matching cards; empty state when zero matches.
- **AC**:
  - [ ] Filtering responds on `input` event with no full reload.

### 6.2. Card Links
- **UI Component**: `Resources View Component` (resource card, primary open-link button, optional secondary Spec/Paper link for terms with a `specUrl`, e.g. the Attention/Transformer terms' arXiv link).
- **Flow**: links open with `target="_blank" rel="noopener noreferrer"`.

---

## 7. Quit Criteria View Specifications (PRD-07)

### 7.1. Combined Decision Matrix
- **User Story**: As a reader, I want one place that tells me both "when should I skip this chapter" and "when am I good enough to move on without finishing every page."
- **UI Component**: `Quit Criteria View Component` (`.quit-matrix-grid`, one `.quit-module-card` per chapter).
- **Flow**: iterate over `QuitCriteriaRow[]` (from `getQuitCriteriaData()`); each card shows chapter title, a **Stop Signal** box (amber warning icon, "skip if…") and an **Exit Criteria** box (green check icon, "good enough if…").
- **AC**:
  - [ ] All 6 chapters have a row.

### 7.2. Real-Time Search
- **UI Component**: `Quit Criteria View Component` (`#quit-search-input`).
- **Flow**: lowercase substring match against chapter title, stop signal, and exit criteria text; empty-state banner on zero matches.
- **AC**:
  - [ ] Filtering responds instantly on `input`, no reload.

---

## 8. Acceptance Criteria & Component Interaction Matrix

| PRD Code | Feature | Component | Event | State Contract | Acceptance Criteria |
| :--- | :--- | :--- | :--- | :--- | :--- |
| PRD-01.1 | Theme Switcher | Theme Toggle | `click` | `setThemeState()` | Toggles `data-theme`, persists. |
| PRD-01.2 | Language Switcher | Language Toggle | `click` | `setLangState()` | Repaints content bundle, ids unchanged. |
| PRD-01.3 | Export Backup | Export Action | `click` | `exportStateJSON()` | Downloads valid `.json` snapshot. |
| PRD-01.4 | Import Backup | Import Action | `click` | `importState()` | Validates & restores, rejects invalid files cleanly. |
| PRD-01.5 | Progress Reset | Reset Action | `click` | `resetProgress()` | Confirms, resets all progress to 0%. |
| PRD-01.6 | Hash Router | Navigation Bar | `hashchange` | `setActiveTabState()` | Syncs `#/route`, active tab, badge %. |
| PRD-02.1 | Metric Tiles | Dashboard | render | `calculateProgress()` | Sections read / videos watched / deliverables / focus hours. |
| PRD-02.2 | Progress Overview Card | Dashboard | render | `calculateProgress()` | Single Overall % + one gradient bar. |
| PRD-02.3 | Next Focus Card | Dashboard | `click` | `toggleRead()` / `toggleVideoWatched()` | Marks recommended section/video, recalculates. |
| PRD-02.4 | Chapter Progress List | Dashboard | render | `calculateProgress().chapterProgresses` | Per-chapter status badge + % row, matches Chapters tab. |
| PRD-03.1 | Chapter Cards + Filter Pills | Chapters | `click` | local filter state | `chapterFilterChipsHtml()` narrows to one chapter. |
| PRD-03.2 | Section Checklist | Chapters | `change` | `toggleRead()` | Persisted boolean per section; checkbox focus preserved across re-render. |
| PRD-03.3 | Video & Lab Checklist | Chapters | `change` | `toggleVideoWatched()` / `toggleLabDone()` | Two independent persisted booleans per video/lab pair. |
| PRD-03.4 | Collapsible Section/Video Lists | Chapters | `click` | in-memory `collapsedSectionListIds` / `collapsedVideoListIds` | Collapses/expands one list only; not persisted. |
| PRD-04.1 | Flashcard Task Checklist | Chapters | `change` | `toggleFlashcardDone()` | Contributes to 30%-weight deliverables axis, no deck content stored. |
| PRD-06.1 | Resources Search | Resources | `input` | `searchQuery` | Instant filter across terms + links + videos, empty state. |
| PRD-06.2 | Resource Filter | Resources | `click` | `selectedChapterId` | Filters cards by chapter. |
| PRD-07.1 | Combined Decision Matrix | Quit Criteria | render | none | 6 cards, stop signal + exit criteria. |
| PRD-07.2 | Quit Criteria Search | Quit Criteria | `input` | `searchQuery` | Instant filter, empty state. |
| PRD-08.1 | Pomodoro Timer | Pomodoro | `click` | `setPomodoroSettings()` / `addPomodoroSession()` | Countdown ring, chime + notification on completion, session logged. |

---

## 9. Pomodoro View Specifications (PRD-08, own tab, tracked but not weighted)

- **UI Component**: `<book-view-pomodoro>`, its own nav tab (not embedded in Dashboard).
- **Mechanics**: mode switch Focus/Short Break/Long Break, `25/5`/`50/5`/Custom presets, countdown + SVG progress ring (ambient glow pulses while running, swaps to lime on break), Web Audio chime, Web Notification, session history log with delete.
- **Flow**: the timer's own Custom Element keeps its running/paused state in instance fields (not `AppState`) so a global `renderAll()` from an unrelated action (e.g. toggling a section elsewhere) never interrupts a running countdown; only completing a session calls `addPomodoroSession()` and `renderAll()`.
- **Cross-view effect**: the resulting session count/duration feeds the Dashboard's "focus hours" metric tile (§3.1) — but the timer UI itself lives only on this tab, and Pomodoro sessions are never part of `calculateProgress()`'s weighted formula.
- **AC**:
  - [ ] Switching to another tab and back does not reset or pause a running timer.
  - [ ] Completing a focus session plays the chime, fires a notification (if permitted), and appends to session history.
  - [ ] Deleting a history entry updates the Dashboard's focus-hours tile.
