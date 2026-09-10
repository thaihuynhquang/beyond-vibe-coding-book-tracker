import { getChapters, getVideos } from "./data/bookData";
import { getState } from "./state/storage";
import type { Chapter, Section, Video } from "./types/appState";
import { CHAPTER_STATUS_COLOR, TOTAL_FLASHCARDS, TOTAL_LABS, TOTAL_SECTIONS, TOTAL_VIDEOS } from "./constants";

export type ChapterStatus = "notStarted" | "inProgress" | "done";

export interface ChapterProgress {
  chapter: Chapter;
  sectionsTotal: number;
  sectionsRead: number;
  videosTotal: number;
  videosWatched: number;
  unitsTotal: number;
  unitsDone: number;
  percentage: number;
  estMinutes: number;
  status: ChapterStatus;
  statusColor: string;
}

export interface ProgressStats {
  readPct: number;
  videoPct: number;
  deliverablesPct: number;
  overallPct: number;
  readCount: number;
  videoWatchedCount: number;
  labDoneCount: number;
  flashcardDoneCount: number;
  activeChapter: Chapter | null;
  nextSection: Section | null;
  nextVideo: Video | null;
  chapterProgresses: ChapterProgress[];
}

function isChapterComplete(chapter: Chapter, chapterVideos: Video[], state: ReturnType<typeof getState>): boolean {
  return chapter.sections.every((s) => state.read[s.id]) && chapterVideos.every((v) => state.videoWatched[v.id]);
}

function buildChapterProgress(chapter: Chapter, chapterVideos: Video[], state: ReturnType<typeof getState>): ChapterProgress {
  const sectionsTotal = chapter.sections.length;
  const videosTotal = chapterVideos.length;

  let sectionsRead = 0;
  let estMinutes = 0;
  for (const section of chapter.sections) {
    if (state.read[section.id]) sectionsRead++;
    estMinutes += section.estMinutes;
  }

  let videosWatched = 0;
  for (const video of chapterVideos) {
    if (state.videoWatched[video.id]) videosWatched++;
  }

  const unitsTotal = sectionsTotal + videosTotal;
  const unitsDone = sectionsRead + videosWatched;
  const percentage = unitsTotal > 0 ? Math.round((unitsDone / unitsTotal) * 100) : 0;
  const status: ChapterStatus = percentage === 100 ? "done" : percentage > 0 ? "inProgress" : "notStarted";

  return {
    chapter,
    sectionsTotal,
    sectionsRead,
    videosTotal,
    videosWatched,
    unitsTotal,
    unitsDone,
    percentage,
    estMinutes,
    status,
    statusColor: CHAPTER_STATUS_COLOR[status],
  };
}

export function calculateProgress(): ProgressStats {
  const chapters = getChapters();
  const videos = getVideos();
  const state = getState();

  const videosByChapterId = new Map<string, Video[]>();
  for (const video of videos) {
    const list = videosByChapterId.get(video.chapterId) ?? [];
    list.push(video);
    videosByChapterId.set(video.chapterId, list);
  }
  for (const list of videosByChapterId.values()) {
    list.sort((a, b) => a.order - b.order);
  }

  let readCount = 0;
  for (const chapter of chapters) {
    for (const section of chapter.sections) {
      if (state.read[section.id]) readCount++;
    }
  }

  let videoWatchedCount = 0;
  for (const video of videos) {
    if (state.videoWatched[video.id]) videoWatchedCount++;
  }

  let labDoneCount = 0;
  let flashcardDoneCount = 0;
  for (const chapter of chapters) {
    for (const labId of chapter.labIds) {
      if (state.labDone[labId]) labDoneCount++;
    }
    if (state.flashcardDone[chapter.flashcardId]) flashcardDoneCount++;
  }

  const readPct = (readCount / TOTAL_SECTIONS) * 100;
  const videoPct = (videoWatchedCount / TOTAL_VIDEOS) * 100;
  const deliverablesPct = ((labDoneCount + flashcardDoneCount) / (TOTAL_LABS + TOTAL_FLASHCARDS)) * 100;
  const overallPct = readPct * 0.4 + videoPct * 0.3 + deliverablesPct * 0.3;

  const activeChapter = chapters.find((c) => !isChapterComplete(c, videosByChapterId.get(c.id) ?? [], state)) ?? null;
  const nextSection = activeChapter ? (activeChapter.sections.find((s) => !state.read[s.id]) ?? null) : null;
  const nextVideo = activeChapter && !nextSection
    ? ((videosByChapterId.get(activeChapter.id) ?? []).find((v) => !state.videoWatched[v.id]) ?? null)
    : null;

  const chapterProgresses = chapters.map((c) => buildChapterProgress(c, videosByChapterId.get(c.id) ?? [], state));

  return {
    readPct,
    videoPct,
    deliverablesPct,
    overallPct,
    readCount,
    videoWatchedCount,
    labDoneCount,
    flashcardDoneCount,
    activeChapter,
    nextSection,
    nextVideo,
    chapterProgresses,
  };
}
