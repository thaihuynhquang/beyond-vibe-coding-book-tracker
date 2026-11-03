# UI SYSTEM DESIGN & COMPONENT LAYOUT GUIDE

Official UI System Design & Component Layout Guide for the **Beyond Vibe Coding Tracker**. Covers design language, tokens, component dictionary, and layout assembly. For architecture/state, see [architecture_guide.md](./architecture_guide.md).

The visual system follows the OccupySaaS protest-poster language (occupysaas.com): warm paper, black ink, protest-sign red, hard 3–4px rules, square corners, solid offset shadows instead of blur, and wide uppercase display type. This document covers what's specific to this book: 6 always-expanded chapter cards, a video-and-lab list nested per chapter, and a merged Resources grid that now includes companion videos.

---

## 1. Visual Design Philosophy & Tokens

### 1.1. Light-First Aesthetic with a Dark Mode Opt-In
Paper background with a faint fractal-noise grain (`body::before`, 6% opacity, `pointer-events: none`), flat white cards framed by thick ink rules, and a solid sticky top bar (no glass blur). Theme swap via `data-theme` on `<html>` (`[data-theme="dark"]` is the opt-in override; `:root` is light/paper by default). Dark mode inverts paper and ink: near-black page, paper-colored rules, brighter red.

### 1.2. Color Palette System (`_tokens.css`)

Three core colors — paper, ink, red — taken from the OccupySaaS stylesheet. The other accents exist only for functional states (done, warning, info) and stay saturated and flat so they read as marker ink, not pastel tints.

| Token Variable | Light Mode (Default) | Dark Mode | Usage |
| :--- | :--- | :--- | :--- |
| `--bg-main` | `#f5f2eb` (paper) | `#111111` | Page background |
| `--bg-card` | `#ffffff` | `#1a1a1a` | Card background |
| `--bg-card-hover` | `#ebe6da` (paper-2) | `#262626` | `.surface-card` header band, hover fill |
| `--bg-glass` | `#f5f2eb` | `#111111` | Header bar fill (solid; kept for name compatibility) |
| `--ink` | `#111111` | `#000000` | Fixed-ink shadows |
| `--border-color` / `--border-color-strong` | `#111111` | `#f5f2eb` | All rules and frames |
| `--border-color-soft` | `#d6d0c2` | `#3a3a3a` | Dashed in-card separators |
| `--text-primary` | `#111111` | `#f5f2eb` | Headings, primary content, inverted fills |
| `--text-secondary` | `#2a2a2a` | `#cfcac0` | Descriptions |
| `--text-muted` | `#5c5a55` | `#a29d93` | Metadata, timestamps |
| `--primary` | `#d7141a` (protest red) | `#ff3b40` | Brand, offset shadows, active tab, links |
| `--primary-hover` | `#a50e13` | `#ff6266` | Link hover, progress-bar stripe |
| `--primary-contrast` | `#ffffff` | `#111111` | Foreground on a red fill |
| `--accent-lime` | `#1f6b3a` | `#5fcf86` | Done / success |
| `--accent-amber` | `#b35400` | `#ff9a3c` | Chapter "in progress" status |
| `--accent-rose` | `#a50e13` | `#ff6266` | Danger |
| `--accent-sky` | `#1d4fbf` | `#7fa8ff` | Info toast, article badge |
| `--accent-purple` | `#2a2a2a` | `#cfcac0` | Glossary-term badge |
| `--status-idle` | `#5c5a55` | `#a29d93` | Chapter "not started" status |

### 1.3. Shape, Shadow, Transition Tokens

```css
--radius-sm / --radius-md / --radius-lg: 0;  /* square corners everywhere */
--radius-full: 9999px;                        /* only the Pomodoro ring and pulse dot */

--border-thin: 2px solid var(--border-color);
--border-thick: 3px solid var(--border-color);
--rule: 4px solid var(--border-color);        /* cards, top bar */

--shadow-sm: 4px 4px 0 var(--ink);
--shadow-md: 7px 7px 0 var(--primary);

--transition-fast: 0.12s ease;
--transition-normal: 0.2s ease;
```

**Offset-shadow interaction**: buttons, icon buttons, metric/resource cards and filter pills carry a solid red (or ink) offset shadow. Hover lifts them `translate(-2px, -2px)` and grows the shadow; `:active` pushes them `translate(3px, 3px)` and shrinks it — the same press feel as the OccupySaaS `.btn`.

### 1.4. Typography

```css
--font-display: "Archivo", "Arial Black", system-ui, sans-serif;  /* variable wdth 62–125 */
--font-sans: var(--font-display);
--font-serif: var(--font-display);  /* legacy alias */
--font-marker: "Permanent Marker", "Comic Sans MS", cursive;
--font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
--wdth-display: 125;  --wdth-strong: 115;
```

All three families load from Google Fonts in `index.html` with `display=swap`.

**Type roles**:
- **Display** (Archivo, weight 900, `font-variation-settings: "wdth" 125`, uppercase): `h1`–`h4`, card/section headings, chapter and resource titles.
- **Marker** (Permanent Marker): hand-painted placard text — the Next-focus section title and the Quit Criteria card titles.
- **Mono** (JetBrains Mono, bold, uppercase, wide tracking): kicker labels, badges, tags, filter pills, metric labels, metadata lines, plus numeric detail with `tabular-nums`.
- **Sans** (Archivo at normal width): body copy, descriptions, form text.

### 1.5. Spacing & Typography Scale

Every `padding`/`gap`/`font-size` is a token, not a raw rem literal — snapped to a 4px grid:

```css
--space-3xs: 0.25rem;  --space-2xs: 0.375rem;  --space-xs: 0.5rem;
--space-sm:  0.75rem;  --space-md:  1rem;      --space-lg: 1.25rem;
--space-xl:  1.5rem;   --space-2xl: 2rem;      --space-3xl: 2.5rem;

--font-size-2xs: 0.75rem;   --font-size-xs: 0.8125rem; --font-size-sm: 0.875rem;
--font-size-md:  0.9375rem; --font-size-base: 1rem;    --font-size-lg: 1.125rem;
--font-size-xl:  1.5rem;    --font-size-2xl: 2.25rem;  --font-size-3xl: 4rem;

--font-weight-normal: 400;  --font-weight-medium: 500;  --font-weight-semibold: 700;
--font-weight-bold: 800;    --font-weight-black: 900;

--line-height-tight: 0.95;  --line-height-snug: 1.4;  --line-height-normal: 1.6;  --line-height-relaxed: 1.7;
--letter-spacing-tighter: -0.02em; --letter-spacing-tight: -0.01em;
--letter-spacing-wide: 0.08em;     --letter-spacing-wider: 0.14em;
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
`justify-content: space-between`. Children: `.header-brand` (logo + "Beyond Vibe Coding Tracker" title, subtitle "Reading & Practice Tracker"), `.header-actions` (Export, Import, Reset-danger, Language toggle, Theme toggle). The brand logo is an open-book glyph with a red check breaking out of the lower-right page, drawn on a square ink tile with a red frame (same art as `public/favicon.svg`); it sits tilted `-4deg` like a stamp and swings to `4deg` on hover.

Below the top bar sits a decorative `.app-marquee` (`aria-hidden`): an ink strip with a red bottom rule scrolling uppercase slogans separated by red `///`, stopped under `prefers-reduced-motion`. It scrolls away with the page; only `.app-topbar` is sticky.

Stickiness lives one level up: `index.html` wraps `.app-header` and `.nav-tabs-container` together in `.app-topbar` (`position: sticky; top: 0`), so the two-row mobile header and the tab bar stick as one unit instead of the tab bar needing a hardcoded offset under a header of varying height. All-icon `.header-actions` has no text label to hide for space, so at `max-width: 768px` (`_responsive.css`) `.app-header` gets `flex-wrap: wrap` and `.header-actions` gets `flex-basis: 100%; justify-content: flex-start`, forcing it onto its own row, left-aligned under `.header-brand`.

### 3.2. Navigation Tab Bar (`.nav-tabs-container`, `.nav-tab`)
5 tabs: **Dashboard, Chapters, Pomodoro, Resources, Quit Criteria**. Horizontal-scroll on mobile, centered `max-width: 1200px` on desktop. Only the Dashboard tab shows a badge (`#badge-overall-pct`, `.nav-tab-badge`) with the weighted overall %. There is no separate Labs tab — labs render nested under their paired companion video inside each chapter card (§3.4). There is no separate Glossary or Videos tab either — glossary terms and companion videos are both merged into the Resources tab (§3.8).

### 3.3. Dashboard View (`<book-view-dashboard>`)
- **Stat grid** (`.stat-grid` → `.metric-card` × 4): sections read (`N/33`), companion videos watched (`N/20`), chapter deliverables done (labs + flashcards), total Pomodoro focus hours. Each tile is a solid-fill icon square (`.metric-icon--primary/--amber/--sky`) + a big value + a muted label. There is deliberately **no** "overall %" tile — it would duplicate the progress card immediately below.
- **Progress overview card** (`.card` → `.progress-header` + one `.progress-bar-track`): title + subtitle on the left, the big overall % (`.progress-percentage`, outlined red text via `-webkit-text-stroke`) on the right, one full-width bordered bar underneath (`.progress-bar-fill--dynamic`, solid `--primary` when no `--status-color` is set). No per-axis breakdown bars — kept to a single glanceable stat.
- **Next-focus card** (`.card--accent-primary`, or `.card--accent-lime` when everything is done): rocket-tagged callout naming the active chapter and either the next unread section ("Mark as read") or the next unwatched companion video ("Mark as watched"), whichever applies. Recalculated from `calculateProgress()` on every state change.
- **Chapter progress list** (`.chapter-progress-list` → `.chapter-progress-row`): one `.surface-card` per chapter (all 6 shown). Header band: number badge, title, `.status-badge--dynamic` pill + `%`. Body: a thin `.progress-bar-track--sm` bar plus a `.chapter-progress-meta` line (`sectionsRead/sectionsTotal sections · videosWatched/videosTotal videos · ~N min`, from `ChapterProgress`). `--card-accent` is set to the chapter's `statusColor`; `--card-surface` overrides to `--bg-card` so the row still reads as a raised card against the page background. Status/color come from `ChapterProgress.status`/`statusColor` (`src/progress.ts`) — see §3.4. `.chapter-progress-title` gets `flex: 1; min-width: 8rem` (not `0`) so a long title wraps at word boundaries and forces `.surface-card-header`'s existing `flex-wrap: wrap` to drop the badge/`%` to their own line on narrow screens.

### 3.4. Chapter Card (`.chapter-card`)
- **Layout**: header, progress bar, summary box, and flashcard card always render — the section list and the video-and-lab list are each independently collapsible, so a chapter with no companion videos (5, A1) simply omits the second toggle. Header row: number badge, title + a meta line (`N sections · M videos · ~T min`), and on the right a `.status-badge--dynamic` pill + `unitsDone/unitsTotal (pct%)`. Same narrow-screen wrap behavior as the Dashboard's progress row (§3.3): `.chapter-card-title-group` uses `min-width: 8rem` instead of `0`, and `.chapter-card-title` gets `overflow-wrap: anywhere` as a fallback. Below the header: a thin `.progress-bar-track--sm` bar, then a `.chapter-summary-box` (a `.surface-card` with a `fileText`-icon header band and a body paragraph rendering `Chapter.summary`), then a `.section-list-toggle` button (`data-sections-toggle`) controlling the section list, then — when the chapter has companion videos — a second `.section-list-toggle` (`data-videos-toggle`) controlling the video-and-lab list, then the chapter's flashcard card (§3.7) as the last item in `.chapter-card-body`. Collapse state is two in-memory `Set<string>`s on `BookViewChapters` (see `interactive_components_guide.md` §4.1) — not persisted, defaults to expanded, and does not go through `refresh()`.
- **Status color system**: each chapter computes a `ChapterStatus` (`"notStarted" | "inProgress" | "done"`, `src/progress.ts` `buildChapterProgress()`) from `(sectionsRead + videosWatched) / (sectionsTotal + videosTotal)`, mapped to a CSS color via `CHAPTER_STATUS_COLOR` (`src/constants.ts`). That color is passed down as an inline `--status-color` custom property; `.status-badge--dynamic` uses it for a 2px outline and text color, `.progress-bar-fill--dynamic` as a solid fill — one value drives the pill, the percentage text, and the bar. The same system feeds both this card and the Dashboard's chapter-progress-list row for the same chapter, so the two always agree.
- **Perf**: `content-visibility: auto; contain-intrinsic-size: auto 320px` on `.chapter-card`. Off-screen cards skip layout/paint until scrolled near.
- **Focus preservation**: toggling a section, video, lab, or flashcard checkbox triggers a full `refresh()` (the view re-renders `innerHTML` from a template string, per Pattern 2). `book-view-chapters.ts` records `document.activeElement`'s `data-read-id`/`data-video-id`/`data-lab-id`/`data-flashcard-id` before the rebuild and re-focuses the matching input after, so keyboard navigation isn't lost mid-list.

### 3.5. Section Row (`.item-row`)
- **Layout**: a compact 2-column grid, not the `.surface-card` header+body anatomy — with ~33 rows rendered per page, a header band per row would needlessly inflate the Chapters tab's height. Columns: `.section-num` (a small tabular-nums chip, inverted ink fill, showing this app's own `1.1`/`1.2`/… numbering) and `.item-row-main` (title line — `.section-title` + `.section-badge` + a `.tag` showing `estMinutes`). `.item-row-title-line` carries `flex-wrap: wrap`; `.section-title` uses `flex: 1; min-width: 8rem` (plus `overflow-wrap: anywhere` fallback) and `.section-badge` carries `white-space: nowrap; flex-shrink: 0`, so on narrow screens the badge/duration tag drop to their own line under the title instead of the title breaking mid-word. Below both columns, `.item-row-footer` spans the full row width behind a hairline `border-top` — holding a single `.section-check` label (open-book icon, wrapping a native checkbox — `data-read-id`, set to the section's `id`).
- **Checkbox tint**: `.section-check input` gets `accent-color: var(--card-accent)`, so the checkbox itself picks up the row's read accent instead of the browser default — same idiom as `.deliverable-checkbox input` (§3.7).
- **State via `--card-accent`**: the row carries a 6px `border-left` colored by `--card-accent` (`--text-muted` at rest).
  - Not started: `--text-muted` outline badge, "Chưa đọc"/"Not started"; row border stays muted.
  - Read: `--primary` outline badge, "Đã đọc"/"Read"; row gets `.item-row--read` (`--card-accent: var(--accent-amber)`). There is no separate "hands-on" badge state for sections in this book — practicing happens at the video/lab level (§3.5b), not per reading section.

### 3.5b. Video Row (`.item-row`, nested lab as `.deliverable-card`)
- **Layout**: reuses the same `.item-row` shape as a section row — `.section-num` shows the video's `order` (1, 2, 3…) instead of a decimal, `.item-row-main` shows the video title + a `.section-badge` (watched/not-watched). `.item-row-footer` holds an external "Watch on YouTube" link (`externalLink` icon) and a `.section-check` watched checkbox (`video` icon, `data-video-id`). When the video has a paired `Lab` — every video in chapters 1–4 does — the lab renders as a `.deliverable-card` directly below the footer, inside the same row: goal, requirements, acceptance-criteria bullets, a `tag-row` of `toolsUsed` (free-text stack/tool names, not glossary links — this book's labs aren't tied to a single API), and its own "Mark lab complete" checkbox (`data-lab-id`).
- **State**: `.item-row--done` (lime) once the video is watched; the nested lab card's checkbox is independent and doesn't affect the row's own state class.

### 3.6. Pomodoro View (`<book-view-pomodoro>`) — own tab
- **Layout**: hero card, metric row, and history card all span the same full content width (no card-specific `max-width`) so the tab lines up with every other tab's cards — `.pomodoro-container > .card, .pomodoro-container > .stat-grid { margin-bottom: 0 }` avoids the double-margin (container `gap` + `.card`'s own `margin-bottom`).
- **Hero card** (`.pomodoro-hero-card`): mode segmented group (Focus/Short Break/Long Break, `aria-pressed` synced with `.active`), an SVG progress ring (`.pomodoro-ring-wrap`, sized `clamp(280px, 62vw, 400px)`, 10px butt-capped stroke over a white disc with a 3px ink frame and ink offset shadow drawn by `::before`; a pulsing red dot `::after` shows while `.running`), digital countdown (`.pomodoro-time`, Archivo display width, tabular-nums, `clamp(2.6rem, 12vw, 4.5rem)`, `role="timer"`), square Start/Reset buttons, and a duration-preset segmented group (`25/5`, `50/5`, `Custom`) plus a custom-duration row.
- **Presets share the mode group's exact visual language**: `.pomodoro-modes` and `.pomodoro-presets` are one merged container rule (3px ink frame + red offset shadow, segments split by 2px rules), and `.pomodoro-mode-btn`/`.pomodoro-preset-btn` are one merged button rule (transparent uppercase by default, `--surface-tint-strong` hover, solid `--primary` fill when `.active`). Selecting a preset closes and deselects the Custom option; opening Custom deselects both presets.
- **Custom-duration row** (`.pomodoro-custom-form`, shown when the `Custom` option is active): a single dashed-border line holding inline mono `label + input` pairs (`.pomodoro-custom-group`), small centered bold number fields (`.pomodoro-custom-input`, 2px ink frame), and the Apply button (`.btn.btn-primary.btn-sm`) at the end of the row.
- **Break mode inverts the control cluster**: `setMode()` toggles `.break` on `.pomodoro-widget`; under `.pomodoro-widget.break` the ring stroke and the active Short/Long Break segment switch to ink (`--text-primary`), and the Start/Pause button flips from ink to red.
- **Metric row** (`#pomo-metrics.stat-grid`): three `.metric-card` tiles reusing the Dashboard's tile language (§3.3) — today's session count, today's focus minutes (+ hours, locale-formatted), and lifetime session count.
- **History card** (`.pomodoro-history-card`): a `progress-card`-shaped card — `.progress-header` (title left, a `{count} sessions` subtitle right) over a reverse-chronological list of card-style rows (`.pomodoro-history-item`), each with a red left bar, a red outlined "+1 Pomodoro" `.tag`, timestamp, duration, and a compact 32px delete `.icon-btn` that fills red on hover.
- Session data (`state.pomodoroSessions`) also feeds the Dashboard's "focus hours" stat tile (§3.3) — but the timer UI itself lives only here, not on the Dashboard.

### 3.7. Deliverable Card (`.deliverable-card`)
A thin modifier over `.surface-card` (§3.4's summary box and the Dashboard's chapter-progress-row are the other consumers of that base) — `--card-surface: transparent` keeps its flush-with-parent look. Header (icon + title, `--card-accent` tint on the icon) / body / footer (single `.deliverable-checkbox` + mark-complete label, checkbox `accent-color` matching the header icon). Two consumers:
- **Flashcard card** (default `--card-accent` = `--primary`, `cards` icon): one per chapter, rendered as the last item in `.chapter-card-body`. Body holds a link to `docs/content/flashcards_guide.md`'s prompt template; footer checkbox is "Generated & reviewed flashcards".
- **Lab card** (default `--card-accent` = `--primary`, `flask` icon): one per companion video (chapters 1–4 only), nested inside that video's row (§3.5b) rather than at the chapter-card level, since there can be several per chapter. Body holds goal, requirements list, acceptance-criteria checklist as plain bullets, "Tools used" `tag-row`; footer checkbox is "Mark lab complete".

### 3.8. Resource Card (`.resource-card`)
The Resources tab renders one flat, chapter-sorted grid mixing glossary terms, reading-list links, and the 20 companion videos — no sub-tab, no bookmark/star. Each card: tag row (`.resource-tag-row`) with an outlined mono type `.resource-badge` (`--term` ink, `--mdn` primary, `--spec` amber, `--article` sky, `--video` rose, `--demo` lime, `--tool` muted — 2px border and text in `--badge-color`) plus chapter `.tag`/`.tag--primary` tag(s); bold title; a 3-line-clamped description (a term's definition, or a link's/video's chapter label); footer separated by a hairline border with an optional secondary link (a term's Spec/Paper link, e.g. the arXiv paper for Attention/Transformer) on the left and a solid red "open link" button (`.btn--resource`, ink offset shadow) on the right, pointing at the video's YouTube URL for a video card. Card chrome (bg/border/radius/hover lift) matches `.deliverable-card`'s sibling shape.

### 3.9. Quit Criteria Module Card (`.quit-module-card`)
Styled as a protest placard: thick ink frame, inset red outline, ink offset shadow, and a slight alternating tilt (`nth-child(3n…)`) that straightens on hover. Marker-font chapter title, then `.quit-box--trigger` (red, "Stop signal") and `.quit-box--pivot` (ink, "Exit criteria") boxes with a 5px left bar in the box color, stacking on mobile. One card per chapter, 6 total.

### 3.10. Toast Notifications (`.toast`)
`--accent-lime` success, `--primary` error, `--accent-sky` info — each is a white box with a 3px ink frame, an 8px colored `border-left`, and an ink offset shadow; bottom-right stack, auto-dismiss 3.5s.

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
