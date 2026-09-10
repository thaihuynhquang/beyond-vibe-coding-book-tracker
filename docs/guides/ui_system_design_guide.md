# UI SYSTEM DESIGN & COMPONENT LAYOUT GUIDE

Official UI System Design & Component Layout Guide for the **Beyond Vibe Coding Tracker**. Covers design language, tokens, component dictionary, and layout assembly. For architecture/state, see [architecture_guide.md](./architecture_guide.md).

The visual system is ported unchanged from the sibling book trackers this repo was cloned from (same tokens, same layer structure, same metric-tile/status-badge language) — this document covers what's specific to this book: 6 always-expanded chapter cards, a video-and-lab list nested per chapter, and a merged Resources grid that now includes companion videos.

---

## 1. Visual Design Philosophy & Tokens

### 1.1. Dark-First Aesthetic with Light Mode Fallback
Deep dark background, elevated cards, glassmorphic header blur, theme swap via `data-theme` on `<html>`.

### 1.2. Color Palette System (`_tokens.css`)

| Token Variable | Dark Mode (Default) | Light Mode | Usage |
| :--- | :--- | :--- | :--- |
| `--bg-main` | `#0d1420` | `#f4f7fa` | Main body background |
| `--bg-card` | `#161f2e` | `#ffffff` | Surface card background |
| `--bg-card-hover` | `#1f2b3d` | `#e9eff6` | Card hover background |
| `--bg-glass` | `rgba(22, 31, 46, 0.78)` | `rgba(255, 255, 255, 0.85)` | Sticky header glass (`backdrop-filter: blur(12px)`) |
| `--border-color` | `rgba(148, 176, 214, 0.16)` | `rgba(15, 37, 64, 0.12)` | Card/input/separator border — also the fill of `.progress-bar-track` |
| `--border-color-strong` | `rgba(148, 176, 214, 0.30)` | `rgba(15, 37, 64, 0.22)` | Hover/active border |
| `--surface-tint` | `rgba(148, 176, 214, 0.05)` | `rgba(15, 37, 64, 0.035)` | Subtle elevation fill — `.item-row`'s resting background, and the default `--card-surface` for `.surface-card` (`.chapter-summary-box`) — theme-aware, unlike a hardcoded white-alpha tint |
| `--surface-tint-strong` | `rgba(148, 176, 214, 0.11)` | `rgba(15, 37, 64, 0.07)` | Slightly stronger tint (`.tag`, `.section-num` chip, Pomodoro ring track) |
| `--text-primary` | `#f2f7fb` | `#0c1826` | Headings, primary content |
| `--text-secondary` | `#b3c2d6` | `#43566d` | Descriptions, inactive tabs |
| `--text-muted` | `#8496ae` | `#6a7c93` | Metadata, footers, timestamps |
| `--primary` | `#14b8a6` (Teal) | `#0f766e` | Brand color, active tab indicator, link color |
| `--primary-hover` | `#0d9488` | `#115e59` | Primary button hover |
| `--primary-glow` | `rgba(20, 184, 166, 0.35)` | `rgba(15, 118, 110, 0.20)` | Glow box-shadow |
| `--primary-contrast` | `#04211d` | `#ffffff` | Foreground on a `--primary` fill (`.btn-primary`, `.filter-pill.active`, active Pomodoro pills) |
| `--accent-lime` | `#84cc16` | `#4d7c0f` | Success / read+watched complete / chapter "done" status / Pomodoro break |
| `--accent-lime-hover` | `#65a30d` | `#3f6212` | Break-mode primary button hover |
| `--accent-lime-glow` | `rgba(132, 204, 22, 0.30)` | `rgba(77, 124, 15, 0.20)` | Lime glow (Pomodoro break ring) |
| `--accent-amber` | `#fbbf24` | `#b45309` | Read-only warning state, chapter "in progress" status |
| `--accent-rose` | `#fb7185` | `#be123c` | Danger action (reset), stop-signal box |
| `--accent-sky` | `#60a5fa` | `#1d4ed8` | Info toast, external links |
| `--accent-purple` | `#c084fc` | `#7e22ce` | Secondary accent gradient, lab/flashcard badges |
| `--status-idle` | `#94a3b8` | `#64748b` | Chapter "not started" status — decoupled from `--text-muted` so idle chapters stay visible |
| `--shadow-press` | `rgba(0, 0, 0, 0.25)` | `rgba(15, 37, 64, 0.18)` | Inset box-shadow on button/pill press |

### 1.3. Radius, Shadow, Transition Tokens

```css
--radius-sm: 6px;      /* Badges, tags, small buttons */
--radius-md: 12px;     /* Buttons, inputs, action icons */
--radius-lg: 18px;     /* Chapter cards, metric cards */
--radius-full: 9999px; /* Progress rings, status pills */

--shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.2);
--shadow-md: 0 4px 12px rgba(0, 0, 0, 0.3);

--transition-fast: 0.15s ease;
--transition-normal: 0.25s ease;

--font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
```

`Inter` (weights 400–800) loads from Google Fonts in `index.html` with `display=swap`; the system-font fallback stack paints first so there's no invisible-text flash.

### 1.4. Spacing & Typography Scale

Every `padding`/`gap`/`font-size` is a token, not a raw rem literal — snapped to a 4px grid:

```css
--space-3xs: 0.25rem;  --space-2xs: 0.375rem;  --space-xs: 0.5rem;
--space-sm:  0.75rem;  --space-md:  1rem;      --space-lg: 1.25rem;
--space-xl:  1.5rem;   --space-2xl: 2rem;      --space-3xl: 2.5rem;

--font-size-2xs: 0.7rem;  --font-size-xs: 0.75rem;  --font-size-sm: 0.85rem;
--font-size-md:  0.9rem;  --font-size-base: 0.95rem; --font-size-lg: 1.1rem;
--font-size-xl:  1.25rem; --font-size-2xl: 1.6rem;   --font-size-3xl: 3.5rem; /* Pomodoro digits only */

--font-weight-normal: 400;  --font-weight-medium: 500;  --font-weight-semibold: 600;
--font-weight-bold: 700;    --font-weight-black: 800;

--line-height-tight: 1.2;  --line-height-snug: 1.4;  --line-height-normal: 1.5;  --line-height-relaxed: 1.6;
--letter-spacing-tighter: -0.04em; --letter-spacing-tight: -0.02em;
--letter-spacing-wide: 0.04em;     --letter-spacing-wider: 0.08em;
```

---

## 2. Layered CSS File Breakdown

```text
src/styles/
├── main.css         # @layer (reset, base, components, views, utilities)
├── _tokens.css       # -> @layer base — colors, spacing, typography, radius, shadow tokens
├── _reset-base.css   # -> @layer reset — includes a prefers-reduced-motion guard
├── _header.css       # -> @layer components
├── _tabs.css          # -> @layer components
├── _main-layout.css  # -> @layer components — shared primitives: .card, .stat-grid/.metric-card,
│                       #   .status-badge--dynamic, .tag, .item-row, .surface-card, .progress-bar-fill--dynamic
├── _views.css         # -> @layer views (chapter cards, dashboard chapter-progress-list, video/lab cards,
│                       #   resource cards, quit-matrix)
├── _pomodoro.css      # -> @layer views (Pomodoro tab: hero card, ring, mode pills, history)
└── _responsive.css   # -> @layer utilities (768px / 480px breakpoints)
```

---

## 3. UI Component Dictionary

### 3.1. Header Bar (`.app-header`)
`justify-content: space-between`. Children: `.header-brand` (logo + "Beyond Vibe Coding Tracker" title, subtitle "Reading & Practice Tracker"), `.header-actions` (Export, Import, Reset-danger, Language toggle, Theme toggle). The brand logo is an open-book glyph with a knockout check breaking out of the lower-right page, drawn on a `--primary → --accent-purple` gradient tile (`#brand-grad`); hover applies a subtle scale + tilt (`scale(1.08) rotate(-3deg)`) plus the existing `--primary-glow` drop-shadow.

Stickiness lives one level up: `index.html` wraps `.app-header` and `.nav-tabs-container` together in `.app-topbar` (`position: sticky; top: 0`), so the two-row mobile header and the tab bar stick as one unit instead of the tab bar needing a hardcoded offset under a header of varying height. All-icon `.header-actions` has no text label to hide for space, so at `max-width: 768px` (`_responsive.css`) `.app-header` gets `flex-wrap: wrap` and `.header-actions` gets `flex-basis: 100%; justify-content: flex-start`, forcing it onto its own row, left-aligned under `.header-brand`.

### 3.2. Navigation Tab Bar (`.nav-tabs-container`, `.nav-tab`)
5 tabs: **Dashboard, Chapters, Pomodoro, Resources, Quit Criteria**. Horizontal-scroll on mobile, centered `max-width: 1200px` on desktop. Only the Dashboard tab shows a badge (`#badge-overall-pct`, `.nav-tab-badge`) with the weighted overall %. There is no separate Labs tab — labs render nested under their paired companion video inside each chapter card (§3.4). There is no separate Glossary or Videos tab either — glossary terms and companion videos are both merged into the Resources tab (§3.8).

### 3.3. Dashboard View (`<book-view-dashboard>`)
- **Stat grid** (`.stat-grid` → `.metric-card` × 4): sections read (`N/33`), companion videos watched (`N/20`), chapter deliverables done (labs + flashcards), total Pomodoro focus hours. Each tile is an icon square (`.metric-icon--primary/--amber/--sky`, 15%-alpha tint of the accent color) + a big value + a muted label. There is deliberately **no** "overall %" tile — it would duplicate the progress card immediately below.
- **Progress overview card** (`.card` → `.progress-header` + one `.progress-bar-track`): title + subtitle on the left, the big overall % (`.progress-percentage`, lime) on the right, one full-width gradient bar underneath (`.progress-bar-fill--dynamic`, primary→lime gradient when no `--status-color` is set). No per-axis breakdown bars — kept to a single glanceable stat.
- **Next-focus card** (`.card--accent-primary`, or `.card--accent-lime` when everything is done): rocket-tagged callout naming the active chapter and either the next unread section ("Mark as read") or the next unwatched companion video ("Mark as watched"), whichever applies. Recalculated from `calculateProgress()` on every state change.
- **Chapter progress list** (`.chapter-progress-list` → `.chapter-progress-row`): one `.surface-card` per chapter (all 6 shown). Header band: number badge, title, `.status-badge--dynamic` pill + `%`. Body: a thin `.progress-bar-track--sm` bar plus a `.chapter-progress-meta` line (`sectionsRead/sectionsTotal sections · videosWatched/videosTotal videos · ~N min`, from `ChapterProgress`). `--card-accent` is set to the chapter's `statusColor`; `--card-surface` overrides to `--bg-card` so the row still reads as a raised card against the page background. Status/color come from `ChapterProgress.status`/`statusColor` (`src/progress.ts`) — see §3.4. `.chapter-progress-title` gets `flex: 1; min-width: 8rem` (not `0`) so a long title wraps at word boundaries and forces `.surface-card-header`'s existing `flex-wrap: wrap` to drop the badge/`%` to their own line on narrow screens.

### 3.4. Chapter Card (`.chapter-card`)
- **Layout**: header, progress bar, summary box, and flashcard card always render — the section list and the video-and-lab list are each independently collapsible, so a chapter with no companion videos (5, A1) simply omits the second toggle. Header row: number badge, title + a meta line (`N sections · M videos · ~T min`), and on the right a `.status-badge--dynamic` pill + `unitsDone/unitsTotal (pct%)`. Same narrow-screen wrap behavior as the Dashboard's progress row (§3.3): `.chapter-card-title-group` uses `min-width: 8rem` instead of `0`, and `.chapter-card-title` gets `overflow-wrap: anywhere` as a fallback. Below the header: a thin `.progress-bar-track--sm` bar, then a `.chapter-summary-box` (a `.surface-card` with a `fileText`-icon header band and a body paragraph rendering `Chapter.summary`), then a `.section-list-toggle` button (`data-sections-toggle`) controlling the section list, then — when the chapter has companion videos — a second `.section-list-toggle` (`data-videos-toggle`) controlling the video-and-lab list, then the chapter's flashcard card (§3.7) as the last item in `.chapter-card-body`. Collapse state is two in-memory `Set<string>`s on `BookViewChapters` (see `interactive_components_guide.md` §4.1) — not persisted, defaults to expanded, and does not go through `refresh()`.
- **Status color system**: each chapter computes a `ChapterStatus` (`"notStarted" | "inProgress" | "done"`, `src/progress.ts` `buildChapterProgress()`) from `(sectionsRead + videosWatched) / (sectionsTotal + videosTotal)`, mapped to a CSS color via `CHAPTER_STATUS_COLOR` (`src/constants.ts`). That color is passed down as an inline `--status-color` custom property; `.status-badge--dynamic` and `.progress-bar-fill--dynamic` derive their fill/border from it with `color-mix()` (20%/40% alpha) — one value drives the pill, the percentage text, and the bar. The same system feeds both this card and the Dashboard's chapter-progress-list row for the same chapter, so the two always agree.
- **Perf**: `content-visibility: auto; contain-intrinsic-size: auto 320px` on `.chapter-card`. Off-screen cards skip layout/paint until scrolled near.
- **Focus preservation**: toggling a section, video, lab, or flashcard checkbox triggers a full `refresh()` (the view re-renders `innerHTML` from a template string, per Pattern 2). `book-view-chapters.ts` records `document.activeElement`'s `data-read-id`/`data-video-id`/`data-lab-id`/`data-flashcard-id` before the rebuild and re-focuses the matching input after, so keyboard navigation isn't lost mid-list.

### 3.5. Section Row (`.item-row`)
- **Layout**: a compact 2-column grid, not the `.surface-card` header+body anatomy — with ~33 rows rendered per page, a header band per row would needlessly inflate the Chapters tab's height. Columns: `.section-num` (a small tabular-nums chip, `--surface-tint-strong` fill, showing this app's own `1.1`/`1.2`/… numbering) and `.item-row-main` (title line — `.section-title` + `.section-badge` + a `.tag` showing `estMinutes`). `.item-row-title-line` carries `flex-wrap: wrap`; `.section-title` uses `flex: 1; min-width: 8rem` (plus `overflow-wrap: anywhere` fallback) and `.section-badge` carries `white-space: nowrap; flex-shrink: 0`, so on narrow screens the badge/duration tag drop to their own line under the title instead of the title breaking mid-word. Below both columns, `.item-row-footer` spans the full row width behind a hairline `border-top` — holding a single `.section-check` label (open-book icon, wrapping a native checkbox — `data-read-id`, set to the section's `id`).
- **Checkbox tint**: `.section-check input` gets `accent-color: var(--card-accent)`, so the checkbox itself picks up the row's read accent instead of the browser default — same idiom as `.deliverable-checkbox input` (§3.7).
- **State via `--card-accent`**: the row carries a 3px `border-left` colored by `--card-accent` (`--text-muted` at rest).
  - Not started: `--text-muted` outline badge, "Chưa đọc"/"Not started"; row border stays muted.
  - Read: `--accent-lime` badge, "Đã đọc"/"Read"; row gets `.item-row--read` (`--card-accent: var(--accent-lime)`). There is no separate "hands-on" badge state for sections in this book — practicing happens at the video/lab level (§3.5b), not per reading section.

### 3.5b. Video Row (`.item-row`, nested lab as `.deliverable-card`)
- **Layout**: reuses the same `.item-row` shape as a section row — `.section-num` shows the video's `order` (1, 2, 3…) instead of a decimal, `.item-row-main` shows the video title + a `.section-badge` (watched/not-watched). `.item-row-footer` holds an external "Watch on YouTube" link (`externalLink` icon) and a `.section-check` watched checkbox (`video` icon, `data-video-id`). When the video has a paired `Lab` — every video in chapters 1–4 does — the lab renders as a `.deliverable-card` directly below the footer, inside the same row: goal, requirements, acceptance-criteria bullets, a `tag-row` of `toolsUsed` (free-text stack/tool names, not glossary links — this book's labs aren't tied to a single API), and its own "Mark lab complete" checkbox (`data-lab-id`).
- **State**: `.item-row--done` (lime) once the video is watched; the nested lab card's checkbox is independent and doesn't affect the row's own state class.

### 3.6. Pomodoro View (`<book-view-pomodoro>`) — own tab
- **Layout**: hero card, metric row, and history card all span the same full content width (no card-specific `max-width`) so the tab lines up with every other tab's cards — `.pomodoro-container > .card, .pomodoro-container > .stat-grid { margin-bottom: 0 }` avoids the double-margin (container `gap` + `.card`'s own `margin-bottom`).
- **Hero card** (`.pomodoro-hero-card`): mode segmented-pill group (Focus/Short Break/Long Break, `aria-pressed` synced with `.active`), an SVG progress ring (`.pomodoro-ring-wrap`, sized `clamp(280px, 62vw, 400px)`, thin 6px stroke, ambient glow via a `::before` radial-gradient — its color set by the local `--ring-glow` token, `--primary-glow` by default and `--accent-lime-glow` under `.pomodoro-widget.break` — that pulses while `.running`), digital countdown (`.pomodoro-time`, tabular-nums, `clamp(2.4rem, 11vw, 3.5rem)`, `role="timer"`), pill-shaped Start/Reset buttons, and a duration-preset segmented pill group (`25/5`, `50/5`, `Custom`) plus a custom-duration row.
- **Presets share the mode-pill's exact visual language**: `.pomodoro-modes` and `.pomodoro-presets` are one merged container rule (bordered pill-group), and `.pomodoro-mode-btn`/`.pomodoro-preset-btn` are one merged button rule (transparent/muted by default, `--surface-tint-strong` hover, `--primary` fill + glow + inset-shadow press when `.active`). Selecting a preset closes and deselects the Custom pill; opening Custom deselects both presets.
- **Custom-duration row** (`.pomodoro-custom-form`, shown when the `Custom` pill is active): a single bordered line holding inline `label + input` pairs (`.pomodoro-custom-group`), small centered bold number fields (`.pomodoro-custom-input`, `--bg-main` fill against the card), and the Apply button (`.btn.btn-primary.btn-sm`) at the end of the row.
- **Break mode recolors the whole control cluster, not just the ring**: `setMode()` toggles `.break` on `.pomodoro-widget`, so `.pomodoro-widget.break` drives the ring, its glow, the active Short/Long Break pill, and the Start/Pause button all switching from `--primary` to `--accent-lime` together.
- **Metric row** (`#pomo-metrics.stat-grid`): three `.metric-card` tiles reusing the Dashboard's tile language (§3.3) — today's session count, today's focus minutes (+ hours, locale-formatted), and lifetime session count.
- **History card** (`.pomodoro-history-card`): a `progress-card`-shaped card — `.progress-header` (title left, a `{count} sessions` subtitle right) over a reverse-chronological list of card-style rows (`.pomodoro-history-item`), each with a lime "+1 Pomodoro" `.tag`, timestamp, duration, and a compact 32px delete `.icon-btn` with a rose hover.
- Session data (`state.pomodoroSessions`) also feeds the Dashboard's "focus hours" stat tile (§3.3) — but the timer UI itself lives only here, not on the Dashboard.

### 3.7. Deliverable Card (`.deliverable-card`)
A thin modifier over `.surface-card` (§3.4's summary box and the Dashboard's chapter-progress-row are the other consumers of that base) — `--card-surface: transparent` keeps its flush-with-parent look. Header (icon + title, `--card-accent` tint on the icon) / body / footer (single `.deliverable-checkbox` + mark-complete label, checkbox `accent-color` matching the header icon). Two consumers:
- **Flashcard card** (default `--card-accent` = `--primary`, `cards` icon): one per chapter, rendered as the last item in `.chapter-card-body`. Body holds a link to `docs/content/flashcards_guide.md`'s prompt template; footer checkbox is "Generated & reviewed flashcards".
- **Lab card** (default `--card-accent` = `--primary`, `flask` icon): one per companion video (chapters 1–4 only), nested inside that video's row (§3.5b) rather than at the chapter-card level, since there can be several per chapter. Body holds goal, requirements list, acceptance-criteria checklist as plain bullets, "Tools used" `tag-row`; footer checkbox is "Mark lab complete".

### 3.8. Resource Card (`.resource-card`)
The Resources tab renders one flat, chapter-sorted grid mixing glossary terms, reading-list links, and the 20 companion videos — no sub-tab, no bookmark/star. Each card: tag row (`.resource-tag-row`) with a tinted type `.resource-badge` (`--term` purple, `--mdn` primary, `--spec` amber, `--article` sky, `--video` rose, `--demo` lime, `--tool` muted — all via `color-mix(in srgb, var(--badge-color) 15%, transparent)` so tints stay theme-aware) plus chapter `.tag`/`.tag--primary` tag(s); bold title; a 3-line-clamped description (a term's definition, or a link's/video's chapter label); footer separated by a hairline border with an optional secondary link (a term's Spec/Paper link, e.g. the arXiv paper for Attention/Transformer) on the left and a primary-glow "open link" button (`.btn--resource`) on the right, pointing at the video's YouTube URL for a video card. Card chrome (bg/border/radius/hover lift) matches `.deliverable-card`'s sibling shape.

### 3.9. Quit Criteria Module Card (`.quit-module-card`)
Chapter title header, `.quit-box--trigger` (amber, "Stop signal") and `.quit-box--pivot` (lime, "Exit criteria") boxes side by side, stacking on mobile. One card per chapter, 6 total.

### 3.10. Toast Notifications (`.toast`)
`--accent-lime` success, `--accent-rose` error, `--accent-sky` info — each carries its color via border, a 3px `border-left` accent, and a 12%-mix tinted background (not a 1px border alone), bottom-right stack, auto-dismiss 3.5s.

---

## 4. Icons (`src/utils/icons.ts`)

One flat `ICONS` dictionary, one raw SVG string per key (24×24 viewBox, `currentColor` stroke unless noted), consumed via `icon(key: IconKey)`.

| Icon key | Used in |
| :--- | :--- |
| `book` | Chapters tab nav icon |
| `bookOpen` | Section row "read" checkbox label, Dashboard "sections read" metric tile, Resources tab nav icon, resource card "MDN" type badge |
| `flask` | Lab deliverable card header (nested under a video row) |
| `video` | Video row "watched" checkbox label, Dashboard "videos watched" metric tile, resource card "Video" type badge |
| `target` | Dashboard "deliverables" metric tile |
| `pomodoro` | Pomodoro tab nav icon, Dashboard "focus hours" metric tile, Pomodoro tab "today's sessions" metric tile |
| `dashboard` | Dashboard tab nav icon |
| `layers` | Dashboard chapter-progress-list section heading, resource card "Spec" type badge |
| `rocket` | Dashboard next-focus card tag |
| `check` | Dashboard next-focus card CTA buttons |
| `checkCircle` | Dashboard "all chapters done" state, Quit Criteria exit-criteria box, Pomodoro history row "+1 Pomodoro" tag |
| `shieldAlert` | Quit Criteria tab nav icon |
| `cards` | Flashcard deliverable card header (chapter card) |
| `glossary` (magnifying glass over `{ }`) | Resource card "Term" type badge |
| `close` | Pomodoro history row delete button |
| `clock` | Pomodoro tab "today's minutes" metric tile |
| `trophy` | Pomodoro tab "total sessions" metric tile |
| `rotateCcw` | Pomodoro Reset button — deliberately not `reset` (that key is a trash-can glyph reused by the header's destructive Reset-data button) |
| `fileText` | Resource card "Article" type badge, chapter summary box header |
| `externalLink` | Video row "Watch on YouTube" link, resource card "open link" button |
| `monitor` | Resource card "Demo" type badge |
| `wrench` | Resource card "Tool" type badge |
| `chevronDown`, `skip`, `trash`, `starOutline`, `starFilled` | Defined in the dictionary, currently unused — free for future components |

All other icons (Export, Import, Reset, Sun/Moon theme, external-link, search, warning-amber) are reused unchanged from the sibling projects' dictionary.
