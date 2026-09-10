import { getChapters, getVideos, getLabs } from "../data/bookData";
import { getState, toggleRead, toggleVideoWatched, toggleLabDone, toggleFlashcardDone } from "../state/storage";
import { calculateProgress, type ChapterProgress } from "../progress";
import { updateNavBadge } from "../nav-badge";
import { t } from "../i18n";
import { icon } from "../utils/icons";
import { escapeHtml } from "../utils/html";
import { chapterFilterChipsHtml, surfaceCardHtml } from "./helpers";
import { FLASHCARDS_GUIDE_URL } from "../constants";
import type { Section, Video, Lab } from "../types/appState";
import { BookView } from "./base";

export class BookViewChapters extends BookView {
  private selectedChapterId: string | null = null;
  private collapsedSectionListIds = new Set<string>();
  private collapsedVideoListIds = new Set<string>();

  refresh(): void {
    const chapters = getChapters();
    const state = getState();
    const stats = calculateProgress();
    const videosByChapterId = this.groupVideosByChapter();
    const labByVideoId = new Map(getLabs().map((l) => [l.videoId, l]));
    const focusedInput = document.activeElement as HTMLElement | null;
    const focusedReadId = focusedInput?.dataset.readId ?? null;
    const focusedVideoId = focusedInput?.dataset.videoId ?? null;
    const focusedLabId = focusedInput?.dataset.labId ?? null;
    const focusedFlashcardId = focusedInput?.dataset.flashcardId ?? null;

    const visibleChapters = this.selectedChapterId
      ? chapters.filter((c) => c.id === this.selectedChapterId)
      : chapters;

    this.innerHTML = `
      <section class="section-heading">
        <div>
          <h2 class="section-heading-title">${t("chapters.title")}</h2>
          <p class="section-heading-subtitle">${t("chapters.header.subtitle")}</p>
        </div>
      </section>
      ${chapterFilterChipsHtml(chapters, this.selectedChapterId, t("chapters.filter.allChapters"))}
      <div class="chapter-accordion">
        ${visibleChapters.map((c) => this.chapterCardHtml(c, stats.chapterProgresses.find((cp) => cp.chapter.id === c.id)!, state, videosByChapterId.get(c.id) ?? [], labByVideoId)).join("")}
      </div>
    `;

    this.querySelectorAll<HTMLElement>("[data-chapter-filter]").forEach((btn) => {
      btn.addEventListener("click", () => {
        this.selectedChapterId = btn.dataset.chapterFilter || null;
        this.refresh();
      });
    });

    this.bindChecklistListeners(this);
    this.bindListToggles(this);

    if (focusedReadId) {
      this.querySelector<HTMLInputElement>(`[data-read-id="${CSS.escape(focusedReadId)}"]`)?.focus();
    } else if (focusedVideoId) {
      this.querySelector<HTMLInputElement>(`[data-video-id="${CSS.escape(focusedVideoId)}"]`)?.focus();
    } else if (focusedLabId) {
      this.querySelector<HTMLInputElement>(`[data-lab-id="${CSS.escape(focusedLabId)}"]`)?.focus();
    } else if (focusedFlashcardId) {
      this.querySelector<HTMLInputElement>(`[data-flashcard-id="${CSS.escape(focusedFlashcardId)}"]`)?.focus();
    }
  }

  private groupVideosByChapter(): Map<string, Video[]> {
    const map = new Map<string, Video[]>();
    for (const video of getVideos()) {
      const list = map.get(video.chapterId) ?? [];
      list.push(video);
      map.set(video.chapterId, list);
    }
    for (const list of map.values()) list.sort((a, b) => a.order - b.order);
    return map;
  }

  // Scoped to `root` so it can bind either the whole view (full refresh) or a single
  // freshly-swapped `.chapter-card` (patchChapterCard) without re-binding every input.
  private bindChecklistListeners(root: ParentNode): void {
    root.querySelectorAll<HTMLInputElement>("[data-read-id]").forEach((input) => {
      input.addEventListener("change", () => {
        toggleRead(input.dataset.readId!);
        this.afterChecklistToggle(input.dataset.chapterId!, "data-read-id", input.dataset.readId!);
      });
    });

    root.querySelectorAll<HTMLInputElement>("[data-video-id]").forEach((input) => {
      input.addEventListener("change", () => {
        toggleVideoWatched(input.dataset.videoId!);
        this.afterChecklistToggle(input.dataset.chapterId!, "data-video-id", input.dataset.videoId!);
      });
    });

    root.querySelectorAll<HTMLInputElement>("[data-lab-id]").forEach((input) => {
      input.addEventListener("change", () => {
        toggleLabDone(input.dataset.labId!);
        this.afterChecklistToggle(input.dataset.chapterId!, "data-lab-id", input.dataset.labId!);
      });
    });

    root.querySelectorAll<HTMLInputElement>("[data-flashcard-id]").forEach((input) => {
      input.addEventListener("change", () => {
        toggleFlashcardDone(input.dataset.flashcardId!);
        this.afterChecklistToggle(input.dataset.chapterId!, "data-flashcard-id", input.dataset.flashcardId!);
      });
    });
  }

  // Scoped to `root` for the same reason as bindChecklistListeners: needs to bind either the
  // whole view or a single freshly-swapped `.chapter-card`.
  private bindListToggles(root: ParentNode): void {
    root.querySelectorAll<HTMLButtonElement>("[data-sections-toggle]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.sectionsToggle!;
        const collapsed = !this.collapsedSectionListIds.has(id);
        if (collapsed) this.collapsedSectionListIds.add(id);
        else this.collapsedSectionListIds.delete(id);
        btn.setAttribute("aria-expanded", String(!collapsed));
        const list = this.querySelector<HTMLElement>(`[data-section-list="${CSS.escape(id)}"]`);
        if (list) list.hidden = collapsed;
      });
    });

    root.querySelectorAll<HTMLButtonElement>("[data-videos-toggle]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.videosToggle!;
        const collapsed = !this.collapsedVideoListIds.has(id);
        if (collapsed) this.collapsedVideoListIds.add(id);
        else this.collapsedVideoListIds.delete(id);
        btn.setAttribute("aria-expanded", String(!collapsed));
        const list = this.querySelector<HTMLElement>(`[data-video-list="${CSS.escape(id)}"]`);
        if (list) list.hidden = collapsed;
      });
    });
  }

  // A section/video/lab/flashcard toggle only ever changes one chapter's data. Patching just
  // that chapter's card (instead of renderAll() -> a full-view rebuild) keeps every other
  // .chapter-card's DOM node untouched, so content-visibility's remembered size for them
  // is never invalidated and the page never jumps (see docs/guides/ui_system_design_guide.md §3.4 Perf).
  private afterChecklistToggle(chapterId: string, refocusAttr: string, refocusId: string): void {
    updateNavBadge();
    this.patchChapterCard(chapterId, { attr: refocusAttr, id: refocusId });
  }

  private patchChapterCard(chapterId: string, refocus: { attr: string; id: string }): void {
    const oldCard = this.querySelector(`[data-chapter-id="${CSS.escape(chapterId)}"]`);
    if (!oldCard) return;

    const state = getState();
    const stats = calculateProgress();
    const chapter = getChapters().find((c) => c.id === chapterId);
    const progress = stats.chapterProgresses.find((cp) => cp.chapter.id === chapterId);
    if (!chapter || !progress) return;

    const videosByChapterId = this.groupVideosByChapter();
    const labByVideoId = new Map(getLabs().map((l) => [l.videoId, l]));

    const template = document.createElement("template");
    template.innerHTML = this.chapterCardHtml(chapter, progress, state, videosByChapterId.get(chapterId) ?? [], labByVideoId).trim();
    const newCard = template.content.firstElementChild as HTMLElement;

    // The new card has no "remembered size" yet, so content-visibility:auto would size it via
    // the 320px contain-intrinsic-size placeholder until the browser's next (lazy, unpredictably
    // timed) proximity check — even though it's the one card guaranteed to be on/near screen.
    // Pin it to `visible` so it always lays out at its real size. This one chapter loses the
    // off-screen-skip optimization for the rest of the session, but every other (untouched)
    // card keeps it, and a full rebuild (tab switch, filter change, language switch) recreates
    // every card fresh from `chapterCardHtml()` without this override, restoring `auto` for all.
    newCard.style.contentVisibility = "visible";
    oldCard.replaceWith(newCard);
    this.bindChecklistListeners(newCard);
    this.bindListToggles(newCard);
    newCard.querySelector<HTMLInputElement>(`[${refocus.attr}="${CSS.escape(refocus.id)}"]`)?.focus({ preventScroll: true });
  }

  private chapterCardHtml(
    chapter: ChapterProgress["chapter"],
    progress: ChapterProgress,
    state: ReturnType<typeof getState>,
    chapterVideos: Video[],
    labByVideoId: Map<string, Lab>,
  ): string {
    const isSectionsCollapsed = this.collapsedSectionListIds.has(chapter.id);
    const isVideosCollapsed = this.collapsedVideoListIds.has(chapter.id);

    return `
      <div class="chapter-card" data-chapter-id="${escapeHtml(chapter.id)}">
        <div class="chapter-card-header">
          <span class="chapter-number-badge">${escapeHtml(String(chapter.num))}</span>
          <div class="chapter-card-title-group">
            <span class="chapter-card-title">${escapeHtml(chapter.title)}</span>
            <span class="chapter-card-meta">${progress.sectionsTotal} ${t("chapters.meta.sections")} · ${progress.videosTotal} ${t("chapters.meta.videos")} · ~${progress.estMinutes} ${t("chapters.meta.estMinutes")}</span>
          </div>
          <div class="chapter-card-status">
            <span class="status-badge status-badge--dynamic" style="--status-color: ${progress.statusColor};">${t(`status.${progress.status}`)}</span>
            <span class="chapter-card-pct" style="--status-color: ${progress.statusColor};">${progress.unitsDone}/${progress.unitsTotal} (${progress.percentage}%)</span>
          </div>
        </div>
        <div class="progress-bar-track progress-bar-track--sm">
          <div class="progress-bar-fill progress-bar-fill--dynamic" style="--progress: ${progress.percentage}%; --status-color: ${progress.statusColor};"></div>
        </div>
        <div class="chapter-card-body">
          ${chapter.summary ? this.summaryBoxHtml(chapter.summary) : ""}
          <button type="button" class="section-list-toggle" data-sections-toggle="${escapeHtml(chapter.id)}" aria-expanded="${!isSectionsCollapsed}" aria-controls="sections-${escapeHtml(chapter.id)}">
            <span class="section-list-chevron">${icon("chevronDown")}</span>
            <span>${t("chapters.sections.toggle", { count: chapter.sections.length })}</span>
          </button>
          <div class="section-list" id="sections-${escapeHtml(chapter.id)}" data-section-list="${escapeHtml(chapter.id)}" ${isSectionsCollapsed ? "hidden" : ""}>
            ${chapter.sections.map((s) => this.sectionRowHtml(s, chapter.id, state)).join("")}
          </div>
          ${chapterVideos.length > 0
            ? `
              <button type="button" class="section-list-toggle" data-videos-toggle="${escapeHtml(chapter.id)}" aria-expanded="${!isVideosCollapsed}" aria-controls="videos-${escapeHtml(chapter.id)}">
                <span class="section-list-chevron">${icon("chevronDown")}</span>
                <span>${t("chapters.videos.toggle", { count: chapterVideos.length })}</span>
              </button>
              <div class="section-list" id="videos-${escapeHtml(chapter.id)}" data-video-list="${escapeHtml(chapter.id)}" ${isVideosCollapsed ? "hidden" : ""}>
                ${chapterVideos.map((v) => this.videoRowHtml(v, chapter.id, labByVideoId.get(v.id), state)).join("")}
              </div>
            `
            : ""}
          ${this.flashcardBlockHtml(chapter, state)}
        </div>
      </div>
    `;
  }

  private summaryBoxHtml(summary: string): string {
    return surfaceCardHtml({
      className: "chapter-summary-box",
      iconHtml: icon("fileText"),
      headerHtml: `<span class="surface-card-title">${t("chapters.summary.title")}</span>`,
      bodyHtml: `<p>${escapeHtml(summary)}</p>`,
    });
  }

  private flashcardBlockHtml(chapter: ChapterProgress["chapter"], state: ReturnType<typeof getState>): string {
    const isFlashcardDone = !!state.flashcardDone[chapter.flashcardId];

    return surfaceCardHtml({
      className: "deliverable-card",
      iconHtml: icon("cards"),
      headerHtml: `<span class="surface-card-title">${t("chapters.flashcard.label")}</span>`,
      bodyHtml: `<p><a href="${FLASHCARDS_GUIDE_URL}" target="_blank" rel="noopener noreferrer" class="flashcard-guide-link">${t("chapters.flashcard.guideLink")}</a></p>`,
      footerHtml: `
        <label class="deliverable-checkbox">
          <input type="checkbox" data-flashcard-id="${escapeHtml(chapter.flashcardId)}" data-chapter-id="${escapeHtml(chapter.id)}" ${isFlashcardDone ? "checked" : ""}/>
          ${t("chapters.flashcard.markDone")}
        </label>
      `,
    });
  }

  private sectionRowHtml(section: Section, chapterId: string, state: ReturnType<typeof getState>): string {
    const isRead = !!state.read[section.id];
    const badge = isRead
      ? { cls: "section-badge--read", text: t("chapters.badge.read") }
      : { cls: "section-badge--none", text: t("chapters.badge.notStarted") };

    return `
      <div class="item-row ${isRead ? "item-row--read" : ""}">
        <span class="section-num">${escapeHtml(section.num)}</span>
        <div class="item-row-main">
          <div class="item-row-title-line">
            <span class="section-title">${escapeHtml(section.title)}</span>
            <span class="section-badge ${badge.cls}">${badge.text}</span>
            <span class="tag">${section.estMinutes} ${t("chapters.meta.estMinutes")}</span>
          </div>
        </div>
        <div class="item-row-footer">
          <label class="section-check">
            ${icon("bookOpen")}
            <input type="checkbox" data-read-id="${escapeHtml(section.id)}" data-chapter-id="${escapeHtml(chapterId)}" ${isRead ? "checked" : ""}/>
            <span>${t("chapters.section.read")}</span>
          </label>
        </div>
      </div>
    `;
  }

  private videoRowHtml(video: Video, chapterId: string, lab: Lab | undefined, state: ReturnType<typeof getState>): string {
    const isWatched = !!state.videoWatched[video.id];
    const badge = isWatched
      ? { cls: "section-badge--done", text: t("chapters.video.watched") }
      : { cls: "section-badge--none", text: t("chapters.video.notWatched") };
    const watchUrl = `https://www.youtube.com/watch?v=${video.youtubeId}`;

    return `
      <div class="item-row ${isWatched ? "item-row--done" : ""}">
        <span class="section-num">${video.order}</span>
        <div class="item-row-main">
          <div class="item-row-title-line">
            <span class="section-title">${escapeHtml(video.title)}</span>
            <span class="section-badge ${badge.cls}">${badge.text}</span>
          </div>
          <div class="item-row-footer">
            <a href="${escapeHtml(watchUrl)}" target="_blank" rel="noopener noreferrer" class="flashcard-guide-link">
              ${icon("externalLink")} ${t("chapters.video.watchLink")}
            </a>
            <label class="section-check">
              ${icon("video")}
              <input type="checkbox" data-video-id="${escapeHtml(video.id)}" data-chapter-id="${escapeHtml(chapterId)}" ${isWatched ? "checked" : ""}/>
              <span>${t("chapters.video.markWatched")}</span>
            </label>
          </div>
          ${lab ? this.labBlockHtml(lab, state) : ""}
        </div>
      </div>
    `;
  }

  private labBlockHtml(lab: Lab, state: ReturnType<typeof getState>): string {
    const isLabDone = !!state.labDone[lab.id];

    return surfaceCardHtml({
      className: "deliverable-card",
      iconHtml: icon("flask"),
      headerHtml: `<span class="surface-card-title">${escapeHtml(lab.title)}</span>`,
      bodyHtml: `
        <p class="lab-goal"><strong>${t("chapters.lab.goal")}:</strong> ${escapeHtml(lab.goal)}</p>
        <p class="lab-section-label">${t("chapters.lab.requirements")}</p>
        <ul class="lab-list">${lab.requirements.map((r) => `<li>${escapeHtml(r)}</li>`).join("")}</ul>
        <p class="lab-section-label">${t("chapters.lab.acceptanceCriteria")}</p>
        <ul class="lab-list lab-list--criteria">${lab.acceptanceCriteria.map((a) => `<li>${escapeHtml(a)}</li>`).join("")}</ul>
        ${lab.toolsUsed.length > 0
          ? `<p class="lab-section-label">${t("chapters.lab.toolsUsed")}</p>
             <div class="tag-row">${lab.toolsUsed.map((tool) => `<span class="tag">${escapeHtml(tool)}</span>`).join("")}</div>`
          : ""}
      `,
      footerHtml: `
        <label class="deliverable-checkbox">
          <input type="checkbox" data-lab-id="${escapeHtml(lab.id)}" data-chapter-id="${escapeHtml(lab.chapterId)}" ${isLabDone ? "checked" : ""}/>
          ${t("chapters.lab.markDone")}
        </label>
      `,
    });
  }
}

customElements.define("book-view-chapters", BookViewChapters);
