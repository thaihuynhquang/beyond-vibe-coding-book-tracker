import type { Video } from "../../types/appState";

// Companion videos for "Process Over Magic: Beyond Vibe Coding" by Uberto Barbini.
// https://www.youtube.com/playlist?list=PLUeffUYYqoHrUy1_VrwLxBybjHNL7p9Mz
// Chapters 5 and A1 (ch-5, ch-a1) have no companion video.
const PLAYLIST_ID = "PLUeffUYYqoHrUy1_VrwLxBybjHNL7p9Mz";

function video(chapterNum: number, index: number, youtubeId: string, title: string): Video {
  return { id: `vid-ch-${chapterNum}-${index}`, chapterId: chapterIdFor(chapterNum), youtubeId, title, order: index };
}

function chapterIdFor(chapterNum: number): string {
  return chapterNum === 6 ? "ch-a1" : `ch-${chapterNum}`;
}

export const VIDEOS: Video[] = [
  video(1, 1, "7DV4MvSR1v0", "Vibe coding Jewel Swap game"),
  video(1, 2, "roO8VFa83j4", "Vibe coding a Flight Simulator game in Python"),
  video(1, 3, "atpjMv336RE", "Spec Driven Development coding a platform game in Python with a Panda"),
  video(1, 4, "78-302HxG5g", "Spec Driven Development coding a platform game in Python with a Panda — the second try"),

  video(2, 1, "IDy3B4oiIsc", "Build LLM Empowered Semantic Search tool 1/5"),
  video(2, 2, "BTortzZHPBU", "Build LLM Empowered Semantic Search tool 2/5"),
  video(2, 3, "wYmTTx5iDTU", "Build LLM Empowered Semantic Search tool 3/5"),
  video(2, 4, "VOpyOc-DG6g", "Build LLM Empowered Semantic Search tool 4/5"),
  video(2, 5, "-x_mvYOD7CM", "Build LLM Empowered Semantic Search tool 5/5"),

  video(3, 1, "cO-QiG2QyKQ", "Learning Elixir while building a web UI for the LESS search tool 1/5"),
  video(3, 2, "ID0YQ2Kxibc", "Learning Elixir while building a web UI for the LESS search tool 2/5"),
  video(3, 3, "d5mVnvmopmM", "Learning Elixir while building a web UI for the LESS search tool 3/5"),
  video(3, 4, "DTTCh6H9Nuo", "Learning Elixir while building a web UI for the LESS search tool 4/5"),
  video(3, 5, "HKFt13L3Nas", "Learning Elixir while building a web UI for the LESS search tool 5/5"),

  video(4, 1, "kUAagcC6HKE", "Adding New Tests on a Kotlin Library with AI Assistants"),
  video(4, 2, "HrZhIfeHTeU", "Fixing a Bug on a Kotlin Library with AI Assistants"),
  video(4, 3, "yyXxcJ-NHMg", "Creating a New Feature for a Kotlin Library with AI assistants"),
  video(4, 4, "DHfFdMSuZHM", "Generating Documentation for Large Code Bases with AI assistants"),
  video(4, 5, "Zo7HbTFd5LE", "Creating a Debug Plan for Large Code Bases with AI assistants"),
  video(4, 6, "Cf-BSd9t6qc", "Generating Mermaid Documentation Diagrams with AI Assistants"),
];

export function youtubeUrl(youtubeId: string): string {
  return `https://www.youtube.com/watch?v=${youtubeId}&list=${PLAYLIST_ID}`;
}
