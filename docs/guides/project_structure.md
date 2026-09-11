# PROJECT DIRECTORY STRUCTURE

Detailed directory tree, file responsibilities, and module layout for the **Beyond Vibe Coding Tracker** app, as implemented in `src/`.

---

## 1. Overview Directory Tree

```text
.
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Actions: build & deploy to GitHub Pages
├── docs/
│   ├── content/                    # Book content documents rendered/sourced by the app
│   │   ├── chapters.md             # 6-chapter map: summaries, sections, companion videos, time estimates, reading order
│   │   ├── labs.md                 # 20 hands-on labs, one per companion video, with acceptance criteria
│   │   ├── flashcards_guide.md     # Gemini/NotebookLM flashcard generation workflow, per chapter
│   │   ├── glossary.md             # AI/LLM glossary, ~32 terms, linked to chapters
│   │   ├── resources.md            # Reading links + the 20 companion videos, grouped by chapter
│   │   └── quit_criteria_guide.md  # Stop-signal + exit-criteria matrix per chapter
│   └── guides/                     # Technical guides for building/maintaining the app
│       ├── architecture_guide.md
│       ├── book_data_model_guide.md
│       ├── project_structure.md    # This file
│       ├── ui_system_design_guide.md
│       ├── interactive_components_guide.md
│       └── github_pages_deployment_guide.md
├── public/
│   └── favicon.svg
├── src/
│   ├── actions/
│   │   └── backup.ts               # JSON export/import & progress reset handlers
│   ├── data/
│   │   ├── bookData.ts             # Facade: getChapters()/getVideos()/getLabs()/getGlossary()/getResources()/getQuitCriteriaData()/getMetaData(); dev-only id-set and content-count assertions
│   │   ├── bookData.vi.ts          # Vietnamese chapter summaries; composes shared/ + labs/ + quitCriteria/ into Chapter[]/Video[]/Lab[]/QuitCriteriaRow[]
│   │   ├── bookData.en.ts          # English translations of the same prose - same ids/shape as bookData.vi.ts
│   │   ├── glossary/               # Per-locale glossary data - description is the only field that differs
│   │   │   ├── vi.ts               # GLOSSARY_VI: 32 GlossaryTerm objects, Vietnamese description
│   │   │   └── en.ts               # GLOSSARY_EN: 32 GlossaryTerm objects, same ids/names/urls, English description
│   │   ├── labs/                   # Per-locale lab prose - composed with shared/labMeta.ts for chapterId/videoId/toolsUsed
│   │   │   ├── vi.ts               # LAB_CONTENT_VI: Record<labId, LabContent> - title/goal/requirements/acceptanceCriteria
│   │   │   └── en.ts               # LAB_CONTENT_EN: same keys, English prose
│   │   ├── quitCriteria/           # Per-locale quit-criteria prose - id/chapterId still derived from CHAPTER_META in bookData.*.ts
│   │   │   ├── vi.ts               # QUIT_CRITERIA_VI: Record<chapterId, QuitCriteriaText> - stopSignal/exitCriteria
│   │   │   └── en.ts               # QUIT_CRITERIA_EN: same keys, English prose
│   │   └── shared/                 # Language-independent structure - the single source of id parity between vi/en
│   │       ├── sections.ts         # SECTIONS_BY_CHAPTER: 33 Section objects (ids, nums, estMinutes)
│   │       ├── videos.ts           # VIDEOS: 20 Video objects (chapterId, youtubeId, title, order) + youtubeUrl() helper
│   │       ├── chapterMeta.ts      # CHAPTER_META: chapter id/num/title/labIds/flashcardId/glossaryRefs
│   │       ├── labMeta.ts          # LAB_META: lab id/chapterId/videoId/toolsUsed
│   │       ├── flashcards.ts       # FLASHCARD_TASKS: 6 FlashcardTask objects
│   │       └── resources.ts        # RESOURCES: the 20 videos (as type "video") + 8 reading-link resources (URLs that duplicate a glossary term's refUrl live only on that term, via resourceType), title shared across locales
│   ├── i18n/
│   │   ├── strings.ts              # UI_STRINGS table, one flat key -> string map per language
│   │   ├── index.ts                # t(key, params) + plural(n, vi, enOne, enOther)
│   │   └── dom.ts                  # applyStaticTranslations() - data-i18n sweep for header markup
│   ├── state/
│   │   └── storage.ts              # AppState singleton, localStorage, read/videoWatched/lab/flashcard toggles, Pomodoro logs
│   ├── styles/
│   │   ├── main.css
│   │   ├── _tokens.css              # Colors, spacing scale, typography scale, radius, shadow tokens
│   │   ├── _reset-base.css          # Includes prefers-reduced-motion guard
│   │   ├── _header.css
│   │   ├── _tabs.css
│   │   ├── _main-layout.css         # Shared primitives: .card, .stat-grid/.metric-card, .status-badge--dynamic, .tag, .item-row, .surface-card
│   │   ├── _views.css               # Chapter cards, dashboard chapter-progress-list, video/lab/resource/quit cards
│   │   ├── _pomodoro.css            # Pomodoro tab: hero card, ring, mode pills, history
│   │   └── _responsive.css
│   ├── types/
│   │   └── appState.ts             # Chapter, Section, Video, Lab, FlashcardTask, GlossaryTerm, Resource, QuitCriteriaRow, AppState
│   ├── utils/
│   │   ├── audio.ts                # Pomodoro chime via Web Audio API
│   │   ├── icons.ts                # SVG icon dictionary
│   │   ├── notification.ts         # Web Notification API
│   │   └── html.ts                 # escapeHtml() - required for any user-typed string interpolated into a view's HTML
│   ├── views/
│   │   ├── base.ts                   # BookView - shared connectedCallback/disconnectedCallback/render-listener lifecycle; skips refresh() while hidden
│   │   ├── helpers.ts                # chapterFilterChipsHtml(), searchHeaderHtml()/bindSearch() - shared filter-pill and search-input markup, binds without losing focus/caret
│   │   ├── index.ts                  # registers all <book-view-*> custom elements
│   │   ├── book-view-dashboard.ts    # <book-view-dashboard> - metric tiles, progress overview, next-focus card, per-chapter progress list
│   │   ├── book-view-chapters.ts     # <book-view-chapters> - 6 always-expanded chapter cards, section checklist, per-chapter video-and-lab list, chapter filter pills, flashcard row
│   │   ├── book-view-pomodoro.ts     # <book-view-pomodoro> - standalone Pomodoro timer tab (mode/ring/presets/history)
│   │   ├── book-view-resources.ts    # <book-view-resources> - merged, searchable grid of glossary terms + reading links + companion videos
│   │   └── book-view-quitcriteria.ts # <book-view-quitcriteria> - stop-signal/exit-criteria matrix
│   ├── constants.ts                # STORAGE_KEY, THEME_KEY, LANG_KEY, ROUTE_IDS, CHAPTER_STATUS_COLOR, TOTAL_SECTIONS/TOTAL_VIDEOS/TOTAL_LABS/TOTAL_FLASHCARDS
│   ├── main.ts                     # Bootstrap: load state -> apply theme -> router -> listeners -> renderAll()
│   ├── progress.ts                 # calculateProgress(): read/video/deliverables weighted %, active chapter, next section/video, per-chapter ChapterProgress[]
│   ├── renderer.ts                 # registerRenderListener() / renderAll()
│   ├── router.ts                   # Hash router (#/route), tab switching, state sync
│   ├── toast.ts                    # Toast notification utility
│   └── vite-env.d.ts
├── .gitignore
├── index.html                      # Header, nav tabs, view containers, toast container
├── package.json
├── package-lock.json
├── README.md
├── tsconfig.json
└── vite.config.ts                  # base: './' for GitHub Pages
```

---

## 2. Directory Responsibilities

### `.github/`
`deploy.yml` — on push to `main`: `npm ci`, `npm run build`, deploy `dist/` to GitHub Pages.

### `docs/content/` (book content — see individual files for detail)
- **`chapters.md`**: source of the 6-chapter reading map (summaries, sections, companion videos, time estimates, suggested reading order).
- **`labs.md`**: source of the 20 `Lab` objects.
- **`flashcards_guide.md`**: process doc for the 6 `FlashcardTask` completion criteria — not a data source, a how-to.
- **`glossary.md`**: source of `GlossaryTerm[]`.
- **`resources.md`**: source of `Resource[]` (reading links + the 20 companion videos).
- **`quit_criteria_guide.md`**: source of `QuitCriteriaRow[]`.

### `docs/guides/`
- **`architecture_guide.md`**: architecture, tech stack, design patterns, build blueprint.
- **`book_data_model_guide.md`**: the data contract — interfaces, id conventions, full chapter/section/video/lab id map. Read first.
- **`project_structure.md`**: this file.
- **`ui_system_design_guide.md`**: CSS tokens, `@layer` structure, SVG icons.
- **`interactive_components_guide.md`**: PRD/UX specs, component lifecycles, state contracts.
- **`github_pages_deployment_guide.md`**: CI/CD.

### `src/`
See **[architecture_guide.md](./architecture_guide.md)** for the design patterns behind each module, and **[book_data_model_guide.md](./book_data_model_guide.md)** for what `bookData.*.ts` must contain.
