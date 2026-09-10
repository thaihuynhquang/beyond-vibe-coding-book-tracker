import type { Chapter, Lab, QuitCriteriaRow, GlossaryTerm, Resource, FlashcardTask, Video } from "../types/appState";
import { CHAPTER_META } from "./shared/chapterMeta";
import { SECTIONS_BY_CHAPTER } from "./shared/sections";
import { VIDEOS } from "./shared/videos";
import { LAB_META } from "./shared/labMeta";
import { GLOSSARY_EN } from "./glossary/en";
import { LAB_CONTENT_EN } from "./labs/en";
import { QUIT_CRITERIA_EN } from "./quitCriteria/en";
import { RESOURCES } from "./shared/resources";
import { FLASHCARD_TASKS } from "./shared/flashcards";

const CHAPTER_SUMMARIES_EN: Record<number, string> = {
  1: "The first case study: the author vibe-codes two games (Jewel Swap, a Python Flight Simulator) from prompts alone, then tries a more complex one to see where vibe coding \"breaks\". Ends with a pivot to spec-driven development — writing a spec before letting the AI code.",
  2: "The counterpoint to chapter 1 — a disciplined process: \"one prompt, one commit\", a rule file that keeps the AI well-behaved, and building a real application (an LLM Empowered Semantic Search tool) start to finish under that process, then reviewing the results.",
  3: "Learning a new language (Elixir) by coding with AI support — from the initial idea, through a walking skeleton and domain model, to a finished search UI (the LESS search tool) and PDF display.",
  4: "Applying AI to a real large codebase — managing technical debt, understanding legacy code, using AI to add tests/fix a bug/add a feature/write docs/build a debug plan/draw a Mermaid diagram for a Kotlin library, plus a cheat sheet for the AI-powered developer.",
  5: "Bringing AI into team workflows — how a team adopts AI, reorganizes roles, and the security risks (data leakage, prompt injection) that come with everyone sharing the same AI assistant.",
  6: "Appendix A1 explains the technical foundation behind everything in the previous chapters — the attention/transformer mechanism, what an LLM actually is, what vector databases are for, and the practical limits (context window, cost, fine-tuning, quantization) worth knowing when working with AI.",
};

export function getChaptersEn(): Chapter[] {
  return CHAPTER_META.map((meta) => ({
    id: meta.id,
    num: meta.num,
    title: meta.title,
    summary: CHAPTER_SUMMARIES_EN[meta.num],
    sections: SECTIONS_BY_CHAPTER[meta.num],
    labIds: meta.labIds,
    flashcardId: meta.flashcardId,
    glossaryRefs: meta.glossaryRefs,
  }));
}

export function getVideosEn(): Video[] {
  return VIDEOS;
}

export function getLabsEn(): Lab[] {
  return LAB_META.map((meta) => {
    const content = LAB_CONTENT_EN[meta.id];
    return {
      id: meta.id,
      chapterId: meta.chapterId,
      videoId: meta.videoId,
      title: content.title,
      goal: content.goal,
      requirements: content.requirements,
      acceptanceCriteria: content.acceptanceCriteria,
      toolsUsed: meta.toolsUsed,
    };
  });
}

export function getQuitCriteriaEn(): QuitCriteriaRow[] {
  return CHAPTER_META.map((meta) => ({
    id: `qc-${meta.id}`,
    chapterId: meta.id,
    stopSignal: QUIT_CRITERIA_EN[meta.id].stopSignal,
    exitCriteria: QUIT_CRITERIA_EN[meta.id].exitCriteria,
  }));
}

export function getGlossaryEn(): GlossaryTerm[] {
  return GLOSSARY_EN;
}

export function getResourcesEn(): Resource[] {
  return RESOURCES;
}

export function getFlashcardTasksEn(): FlashcardTask[] {
  return FLASHCARD_TASKS;
}
