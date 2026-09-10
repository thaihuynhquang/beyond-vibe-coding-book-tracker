import type { QuitCriteriaText } from "../../types/appState";

export const QUIT_CRITERIA_EN: Record<string, QuitCriteriaText> = {
  "ch-1": {
    stopSignal: "Once you clearly understand where vibe coding \"breaks\" (rising complexity, prompts stop being enough), stop reading more game examples — move to chapter 2 to learn how to control it.",
    exitCriteria: "You can explain in your own words: at what scale vibe coding is reasonable, and why it breaks down as the game gets more complex (1.4 What Went Wrong).",
  },
  "ch-2": {
    stopSignal: "If you already apply \"one prompt, one commit\" at work, skim 2.1–2.3 and read 2.4 (Building an Application Following Rules) carefully instead.",
    exitCriteria: "You have a real rule file (CLAUDE.md/AGENTS.md) in active use, and Lab 2 runs end-to-end.",
  },
  "ch-3": {
    stopSignal: "If the Walking Skeleton (3.3) already proves the path but you're over-polishing the domain model too early, stop — the chapter's goal is learning Elixir hands-on, not a perfect architecture.",
    exitCriteria: "Lab 3 (the LESS search tool) runs end-to-end in Elixir/Phoenix, and `mix test` passes.",
  },
  "ch-4": {
    stopSignal: "If the Cheat Sheet (4.5) is already enough for daily work, you don't need to re-read the full Kotlin case study in detail — apply the cheat sheet directly to your own large codebase.",
    exitCriteria: "You applied at least one technique from the chapter (tests/bugfix/feature/docs/debug plan/mermaid) to a real large codebase outside the book.",
  },
  "ch-5": {
    stopSignal: "If your team has no formal AI process yet, don't try to apply every suggestion at once — pick one security risk (5.3) to address first.",
    exitCriteria: "You wrote a short (half-page) proposal for your team on bringing AI into the code review process, based on 5.1–5.3.",
  },
  "ch-a1": {
    stopSignal: "If you only need to use an LLM rather than build one, you can skim the detailed math of Attention (6.1) and focus on 6.2–6.4 (the practical concepts: context, vector DBs, limitations).",
    exitCriteria: "You can explain in plain terms: what a transformer/attention does, what a context window is, and why vector databases matter for RAG.",
  },
};
