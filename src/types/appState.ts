export interface Section {
  id: string;
  num: string;
  title: string;
  estMinutes: number;
}

export interface Video {
  id: string;
  chapterId: string;
  youtubeId: string;
  title: string;
  order: number;
}

export interface Chapter {
  id: string;
  num: number;
  title: string;
  summary: string;
  sections: Section[];
  labIds: string[];
  flashcardId: string;
  glossaryRefs: string[];
}

export interface Lab {
  id: string;
  chapterId: string;
  videoId: string;
  title: string;
  goal: string;
  requirements: string[];
  acceptanceCriteria: string[];
  toolsUsed: string[];
}

export interface LabContent {
  title: string;
  goal: string;
  requirements: string[];
  acceptanceCriteria: string[];
}

export interface FlashcardTask {
  id: string;
  chapterId: string;
}

export interface GlossaryTerm {
  id: string;
  name: string;
  chapterIds: string[];
  description: string;
  refUrl: string;
  specUrl?: string;
}

export type ResourceType = "mdn" | "spec" | "article" | "video" | "demo" | "tool";

export interface Resource {
  id: string;
  chapterId: string;
  title: string;
  url: string;
  type: ResourceType;
}

export interface QuitCriteriaRow {
  id: string;
  chapterId: string;
  stopSignal: string;
  exitCriteria: string;
}

export interface QuitCriteriaText {
  stopSignal: string;
  exitCriteria: string;
}

export type RouteId = "dashboard" | "chapters" | "pomodoro" | "resources" | "quitcriteria";

export type Theme = "dark" | "light";
export type Lang = "vi" | "en";

export interface PomodoroSettings {
  workMinutes: number;
  breakMinutes: number;
  longBreakMinutes: number;
}

export interface PomodoroSession {
  completedAt: string;
  durationMinutes: number;
}

export interface AppState {
  read: Record<string, boolean>;
  videoWatched: Record<string, boolean>;
  labDone: Record<string, boolean>;
  flashcardDone: Record<string, boolean>;
  activeTab: RouteId;
  theme: Theme;
  lang: Lang;
  pomodoroSettings: PomodoroSettings;
  pomodoroSessions: PomodoroSession[];
}
