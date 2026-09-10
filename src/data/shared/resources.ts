import type { Resource } from "../../types/appState";
import { VIDEOS, youtubeUrl } from "./videos";

const VIDEO_RESOURCES: Resource[] = VIDEOS.map((v) => ({
  id: `res-${v.id}`,
  chapterId: v.chapterId,
  type: "video",
  title: v.title,
  url: youtubeUrl(v.youtubeId),
}));

const READING_RESOURCES: Resource[] = [
  // Chapter 1 — Going with the Vibe
  { id: "res-ch-1-1", chapterId: "ch-1", type: "article", title: "Karpathy's original \"vibe coding\" post", url: "https://x.com/karpathy/status/1886192184808149383" },
  { id: "res-ch-1-2", chapterId: "ch-1", type: "article", title: "Wikipedia — Vibe coding", url: "https://en.wikipedia.org/wiki/Vibe_coding" },
  { id: "res-ch-1-3", chapterId: "ch-1", type: "article", title: "Prompt Engineering Guide", url: "https://www.promptingguide.ai/" },
  // Chapter 2 — Building Securely and Predictably
  { id: "res-ch-2-1", chapterId: "ch-2", type: "article", title: "Anthropic — Building effective agents", url: "https://www.anthropic.com/research/building-effective-agents" },
  { id: "res-ch-2-2", chapterId: "ch-2", type: "article", title: "OWASP Top 10 for LLM Applications", url: "https://owasp.org/www-project-top-10-for-large-language-model-applications/" },
  { id: "res-ch-2-3", chapterId: "ch-2", type: "article", title: "Pinecone — What is a vector database?", url: "https://www.pinecone.io/learn/vector-database/" },
  // Chapter 3 — Learning by Coding
  { id: "res-ch-3-1", chapterId: "ch-3", type: "article", title: "Extreme Programming — Walking Skeleton", url: "http://www.extremeprogramming.org/rules/skeleton.html" },
  { id: "res-ch-3-2", chapterId: "ch-3", type: "article", title: "Domain-Driven Design reference (Eric Evans)", url: "https://www.domainlanguage.com/ddd/reference/" },
  { id: "res-ch-3-3", chapterId: "ch-3", type: "tool", title: "Elixir — Official getting started guide", url: "https://elixir-lang.org/getting-started/introduction.html" },
  // Chapter 4 — Working on a Large Codebase
  { id: "res-ch-4-1", chapterId: "ch-4", type: "article", title: "Wikipedia — Technical debt", url: "https://en.wikipedia.org/wiki/Technical_debt" },
  { id: "res-ch-4-2", chapterId: "ch-4", type: "article", title: "Wikipedia — Legacy system", url: "https://en.wikipedia.org/wiki/Legacy_system" },
  { id: "res-ch-4-3", chapterId: "ch-4", type: "tool", title: "Mermaid — Diagramming and charting tool", url: "https://mermaid.js.org/" },
  // Chapter 5 — Collaborating Inside an AI-Powered Team
  { id: "res-ch-5-1", chapterId: "ch-5", type: "article", title: "Model Context Protocol — Introduction", url: "https://modelcontextprotocol.io/introduction" },
  { id: "res-ch-5-2", chapterId: "ch-5", type: "article", title: "Wikipedia — Prompt injection", url: "https://en.wikipedia.org/wiki/Prompt_injection" },
  { id: "res-ch-5-3", chapterId: "ch-5", type: "article", title: "GitHub — Code review best practices with AI assistants", url: "https://github.blog/ai-and-ml/generative-ai/how-to-use-github-copilot-in-your-code-review-process/" },
  // Chapter A1 (ch-a1) — Demystifying Large Language Models
  { id: "res-ch-a1-1", chapterId: "ch-a1", type: "spec", title: "Attention Is All You Need (arXiv)", url: "https://arxiv.org/abs/1706.03762" },
  { id: "res-ch-a1-2", chapterId: "ch-a1", type: "article", title: "IBM — What are large language models (LLMs)?", url: "https://www.ibm.com/think/topics/large-language-models" },
  { id: "res-ch-a1-3", chapterId: "ch-a1", type: "tool", title: "OpenAI — Tokenizer (interactive)", url: "https://platform.openai.com/tokenizer" },
  { id: "res-ch-a1-4", chapterId: "ch-a1", type: "article", title: "IBM — What is quantization-aware training?", url: "https://www.ibm.com/think/topics/quantization-aware-training" },
];

export const RESOURCES: Resource[] = [...VIDEO_RESOURCES, ...READING_RESOURCES];
