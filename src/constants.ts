import type { RouteId } from "./types/appState";

export const STORAGE_KEY = "beyond-vibe-coding-tracker-state";
export const THEME_KEY = "beyond-vibe-coding-tracker-theme";
export const LANG_KEY = "beyond-vibe-coding-tracker-lang";

export const ROUTE_IDS: RouteId[] = [
  "dashboard",
  "chapters",
  "pomodoro",
  "resources",
  "quitcriteria",
];

export const CHAPTER_STATUS_COLOR: Record<"notStarted" | "inProgress" | "done", string> = {
  notStarted: "var(--status-idle)",
  inProgress: "var(--accent-amber)",
  done: "var(--accent-lime)",
};

export const TOTAL_SECTIONS = 33;
export const TOTAL_VIDEOS = 20;
export const TOTAL_LABS = 20;
export const TOTAL_FLASHCARDS = 6;

export const DEFAULT_POMODORO_WORK_MINUTES = 25;
export const DEFAULT_POMODORO_BREAK_MINUTES = 5;
export const DEFAULT_POMODORO_LONG_BREAK_MINUTES = 15;

export const FLASHCARDS_GUIDE_URL =
  "https://github.com/thaihuynhquang/beyond-vibe-coding-book-tracker/blob/main/docs/content/flashcards_guide.md";
