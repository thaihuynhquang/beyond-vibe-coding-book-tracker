import type { Chapter, Lab, GlossaryTerm, Resource, QuitCriteriaRow, FlashcardTask, Video, Lang } from "../types/appState";
import { getChaptersVi, getVideosVi, getLabsVi, getQuitCriteriaVi, getGlossaryVi, getResourcesVi, getFlashcardTasksVi } from "./bookData.vi";
import { getChaptersEn, getVideosEn, getLabsEn, getQuitCriteriaEn, getGlossaryEn, getResourcesEn, getFlashcardTasksEn } from "./bookData.en";
import { getLangState } from "../state/storage";
import { TOTAL_SECTIONS, TOTAL_VIDEOS, TOTAL_LABS, TOTAL_FLASHCARDS } from "../constants";

function assertIdSetsMatch(label: string, viIds: string[], enIds: string[]): void {
  if (import.meta.env.PROD) return;
  const viSet = new Set(viIds);
  const enSet = new Set(enIds);
  const diverged = viIds.length !== enIds.length || viIds.some((id) => !enSet.has(id)) || enIds.some((id) => !viSet.has(id));
  if (diverged) {
    console.error(`[bookData] id set mismatch between bookData.vi.ts and bookData.en.ts for ${label}`);
  }
}

function assertContentCounts(): void {
  if (import.meta.env.PROD) return;
  const chapters = getChaptersVi();
  const videos = getVideosVi();
  const labs = getLabsVi();
  const totalSections = chapters.reduce((sum, c) => sum + c.sections.length, 0);

  if (chapters.length !== 6) {
    console.error(`[bookData] expected 6 chapters, found ${chapters.length}`);
  }
  if (totalSections !== TOTAL_SECTIONS) {
    console.error(`[bookData] expected ${TOTAL_SECTIONS} sections, found ${totalSections}`);
  }
  if (videos.length !== TOTAL_VIDEOS) {
    console.error(`[bookData] expected ${TOTAL_VIDEOS} videos, found ${videos.length}`);
  }
  if (labs.length !== TOTAL_LABS) {
    console.error(`[bookData] expected ${TOTAL_LABS} labs, found ${labs.length}`);
  }
  if (getFlashcardTasksVi().length !== TOTAL_FLASHCARDS) {
    console.error(`[bookData] expected ${TOTAL_FLASHCARDS} flashcard tasks, found ${getFlashcardTasksVi().length}`);
  }

  const chapterIds = new Set(chapters.map((c) => c.id));
  const videoIds = new Set(videos.map((v) => v.id));
  for (const chapter of chapters) {
    for (const labId of chapter.labIds) {
      if (!labs.some((l) => l.id === labId)) {
        console.error(`[bookData] chapter ${chapter.id} references missing lab ${labId}`);
      }
    }
  }
  for (const lab of labs) {
    if (!chapterIds.has(lab.chapterId)) {
      console.error(`[bookData] lab ${lab.id} references missing chapter ${lab.chapterId}`);
    }
    if (!videoIds.has(lab.videoId)) {
      console.error(`[bookData] lab ${lab.id} references missing video ${lab.videoId}`);
    }
  }
  for (const video of videos) {
    if (!chapterIds.has(video.chapterId)) {
      console.error(`[bookData] video ${video.id} references missing chapter ${video.chapterId}`);
    }
  }
}

function assertNoDuplicateUrls(): void {
  if (import.meta.env.PROD) return;
  const urls = [...getGlossaryEn().map((t) => t.refUrl), ...getResourcesEn().map((r) => r.url)];
  const seen = new Set<string>();
  for (const url of urls) {
    if (seen.has(url)) {
      console.error(`[bookData] duplicate resource URL across glossary/resources: ${url}`);
    }
    seen.add(url);
  }
}

assertIdSetsMatch("chapters", getChaptersVi().map((c) => c.id), getChaptersEn().map((c) => c.id));
assertIdSetsMatch("labs", getLabsVi().map((l) => l.id), getLabsEn().map((l) => l.id));
assertIdSetsMatch("quitCriteria", getQuitCriteriaVi().map((q) => q.id), getQuitCriteriaEn().map((q) => q.id));
assertIdSetsMatch("glossary", getGlossaryVi().map((t) => t.id), getGlossaryEn().map((t) => t.id));
assertContentCounts();
assertNoDuplicateUrls();

function lang(): Lang {
  return getLangState();
}

export function getChapters(): Chapter[] {
  return lang() === "vi" ? getChaptersVi() : getChaptersEn();
}

export function getVideos(): Video[] {
  return lang() === "vi" ? getVideosVi() : getVideosEn();
}

export function getLabs(): Lab[] {
  return lang() === "vi" ? getLabsVi() : getLabsEn();
}

export function getQuitCriteriaData(): QuitCriteriaRow[] {
  return lang() === "vi" ? getQuitCriteriaVi() : getQuitCriteriaEn();
}

export function getGlossary(): GlossaryTerm[] {
  return lang() === "vi" ? getGlossaryVi() : getGlossaryEn();
}

export function getResources(): Resource[] {
  return lang() === "vi" ? getResourcesVi() : getResourcesEn();
}

export function getFlashcardTasks(): FlashcardTask[] {
  return lang() === "vi" ? getFlashcardTasksVi() : getFlashcardTasksEn();
}

export function getMetaData(): { totalSections: number; totalVideos: number; totalLabs: number; totalFlashcards: number } {
  const chapters = getChapters();
  return {
    totalSections: chapters.reduce((sum, c) => sum + c.sections.length, 0),
    totalVideos: getVideos().length,
    totalLabs: getLabs().length,
    totalFlashcards: getFlashcardTasks().length,
  };
}
