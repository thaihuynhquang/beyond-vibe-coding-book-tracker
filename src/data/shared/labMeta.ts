export interface LabMeta {
  id: string;
  chapterId: string;
  videoId: string;
  toolsUsed: string[];
}

export const LAB_META: LabMeta[] = [
  { id: "lab-ch-1-1", chapterId: "ch-1", videoId: "vid-ch-1-1", toolsUsed: ["AI coding assistant"] },
  { id: "lab-ch-1-2", chapterId: "ch-1", videoId: "vid-ch-1-2", toolsUsed: ["Python", "AI coding assistant"] },
  { id: "lab-ch-1-3", chapterId: "ch-1", videoId: "vid-ch-1-3", toolsUsed: ["Python", "Spec-driven development"] },
  { id: "lab-ch-1-4", chapterId: "ch-1", videoId: "vid-ch-1-4", toolsUsed: ["Python", "Spec-driven development"] },

  { id: "lab-ch-2-1", chapterId: "ch-2", videoId: "vid-ch-2-1", toolsUsed: ["Python", "LLM API", "Embeddings"] },
  { id: "lab-ch-2-2", chapterId: "ch-2", videoId: "vid-ch-2-2", toolsUsed: ["Python", "LLM API", "Embeddings"] },
  { id: "lab-ch-2-3", chapterId: "ch-2", videoId: "vid-ch-2-3", toolsUsed: ["Python", "Vector database"] },
  { id: "lab-ch-2-4", chapterId: "ch-2", videoId: "vid-ch-2-4", toolsUsed: ["Python", "Vector database"] },
  { id: "lab-ch-2-5", chapterId: "ch-2", videoId: "vid-ch-2-5", toolsUsed: ["Python", "One-prompt-one-commit workflow"] },

  { id: "lab-ch-3-1", chapterId: "ch-3", videoId: "vid-ch-3-1", toolsUsed: ["Elixir"] },
  { id: "lab-ch-3-2", chapterId: "ch-3", videoId: "vid-ch-3-2", toolsUsed: ["Elixir"] },
  { id: "lab-ch-3-3", chapterId: "ch-3", videoId: "vid-ch-3-3", toolsUsed: ["Elixir", "Phoenix"] },
  { id: "lab-ch-3-4", chapterId: "ch-3", videoId: "vid-ch-3-4", toolsUsed: ["Elixir", "Phoenix"] },
  { id: "lab-ch-3-5", chapterId: "ch-3", videoId: "vid-ch-3-5", toolsUsed: ["Elixir", "Phoenix"] },

  { id: "lab-ch-4-1", chapterId: "ch-4", videoId: "vid-ch-4-1", toolsUsed: ["Kotlin", "Testing"] },
  { id: "lab-ch-4-2", chapterId: "ch-4", videoId: "vid-ch-4-2", toolsUsed: ["Kotlin", "Debugging"] },
  { id: "lab-ch-4-3", chapterId: "ch-4", videoId: "vid-ch-4-3", toolsUsed: ["Kotlin"] },
  { id: "lab-ch-4-4", chapterId: "ch-4", videoId: "vid-ch-4-4", toolsUsed: ["Documentation generation"] },
  { id: "lab-ch-4-5", chapterId: "ch-4", videoId: "vid-ch-4-5", toolsUsed: ["Debugging"] },
  { id: "lab-ch-4-6", chapterId: "ch-4", videoId: "vid-ch-4-6", toolsUsed: ["Mermaid", "Documentation generation"] },
];
