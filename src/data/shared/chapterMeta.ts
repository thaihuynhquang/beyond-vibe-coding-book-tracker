export interface ChapterMeta {
  id: string;
  num: number;
  title: string;
  labIds: string[];
  flashcardId: string;
  glossaryRefs: string[];
}

export const CHAPTER_META: ChapterMeta[] = [
  {
    id: "ch-1",
    num: 1,
    title: "Going with the Vibe",
    labIds: ["lab-ch-1-1", "lab-ch-1-2", "lab-ch-1-3", "lab-ch-1-4"],
    flashcardId: "fc-ch-1",
    glossaryRefs: ["term-vibe-coding", "term-prompt-engineering", "term-system-prompt", "term-temperature", "term-hallucination", "term-spec-driven-development", "term-acceptance-criteria"],
  },
  {
    id: "ch-2",
    num: 2,
    title: "Building Securely and Predictably",
    labIds: ["lab-ch-2-1", "lab-ch-2-2", "lab-ch-2-3", "lab-ch-2-4", "lab-ch-2-5"],
    flashcardId: "fc-ch-2",
    glossaryRefs: ["term-one-prompt-one-commit", "term-rules-file", "term-embedding", "term-vector-database", "term-semantic-search", "term-rag", "term-commit-discipline"],
  },
  {
    id: "ch-3",
    num: 3,
    title: "Learning by Coding",
    labIds: ["lab-ch-3-1", "lab-ch-3-2", "lab-ch-3-3", "lab-ch-3-4", "lab-ch-3-5"],
    flashcardId: "fc-ch-3",
    glossaryRefs: ["term-spec-driven-development", "term-walking-skeleton", "term-domain-modeling", "term-acceptance-criteria"],
  },
  {
    id: "ch-4",
    num: 4,
    title: "Working on a Large Codebase",
    labIds: ["lab-ch-4-1", "lab-ch-4-2", "lab-ch-4-3", "lab-ch-4-4", "lab-ch-4-5", "lab-ch-4-6"],
    flashcardId: "fc-ch-4",
    glossaryRefs: ["term-technical-debt", "term-legacy-code", "term-hallucination", "term-mermaid-diagram", "term-code-review-with-ai"],
  },
  {
    id: "ch-5",
    num: 5,
    title: "Collaborating Inside an AI-Powered Team",
    labIds: [],
    flashcardId: "fc-ch-5",
    glossaryRefs: ["term-agent", "term-mcp", "term-pair-programming-with-ai", "term-prompt-injection", "term-code-review-with-ai"],
  },
  {
    id: "ch-a1",
    num: 6,
    title: "Demystifying Large Language Models (Appendix A1)",
    labIds: [],
    flashcardId: "fc-ch-a1",
    glossaryRefs: ["term-llm", "term-transformer", "term-attention-mechanism", "term-tokenization", "term-context-window", "term-embedding", "term-vector-database", "term-fine-tuning", "term-inference", "term-quantization"],
  },
];
