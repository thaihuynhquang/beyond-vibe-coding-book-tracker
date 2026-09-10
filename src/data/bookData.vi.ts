import type { Chapter, Lab, QuitCriteriaRow, GlossaryTerm, Resource, FlashcardTask, Video } from "../types/appState";
import { CHAPTER_META } from "./shared/chapterMeta";
import { SECTIONS_BY_CHAPTER } from "./shared/sections";
import { VIDEOS } from "./shared/videos";
import { LAB_META } from "./shared/labMeta";
import { GLOSSARY_VI } from "./glossary/vi";
import { LAB_CONTENT_VI } from "./labs/vi";
import { QUIT_CRITERIA_VI } from "./quitCriteria/vi";
import { RESOURCES } from "./shared/resources";
import { FLASHCARD_TASKS } from "./shared/flashcards";

const CHAPTER_SUMMARIES_VI: Record<number, string> = {
  1: "Case study đầu tiên: tác giả vibe-code hai game (Jewel Swap, Flight Simulator bằng Python) chỉ bằng prompt, rồi thử một game phức tạp hơn để xem vibe coding \"vỡ trận\" ở đâu. Kết thúc bằng bước chuyển sang spec-driven development — viết đặc tả trước khi để AI code.",
  2: "Đối lập với chương 1 — một quy trình có kỷ luật: \"one prompt, one commit\", rule file để AI giữ thói quen tốt, và xây trọn một ứng dụng thật (LLM Empowered Semantic Search tool) theo đúng quy trình đó từ đầu đến cuối, rồi tổng kết kết quả.",
  3: "Học một ngôn ngữ mới (Elixir) bằng cách vừa code vừa để AI hỗ trợ — từ ý tưởng ban đầu, walking skeleton, domain model, tới hoàn thiện UI tìm kiếm (công cụ LESS search) và khả năng hiển thị PDF.",
  4: "Áp dụng AI vào một codebase lớn có thật — quản lý technical debt, hiểu legacy code, dùng AI để thêm test/sửa bug/thêm tính năng/viết docs/lập debug plan/vẽ sơ đồ Mermaid cho một thư viện Kotlin, kèm cheat sheet tổng hợp cho developer.",
  5: "Đưa AI vào quy trình làm việc nhóm — cách team áp dụng AI, tổ chức lại vai trò, và các rủi ro bảo mật (rò rỉ dữ liệu, prompt injection) khi nhiều người cùng dùng chung AI assistant.",
  6: "Phụ lục A1 giải thích nền tảng kỹ thuật đứng sau mọi thứ ở các chương trước — cơ chế attention/transformer, LLM thực chất là gì, vector database dùng để làm gì, và các giới hạn thực tế (context window, chi phí, fine-tuning, quantization) cần biết khi làm việc với AI.",
};

export function getChaptersVi(): Chapter[] {
  return CHAPTER_META.map((meta) => ({
    id: meta.id,
    num: meta.num,
    title: meta.title,
    summary: CHAPTER_SUMMARIES_VI[meta.num],
    sections: SECTIONS_BY_CHAPTER[meta.num],
    labIds: meta.labIds,
    flashcardId: meta.flashcardId,
    glossaryRefs: meta.glossaryRefs,
  }));
}

export function getVideosVi(): Video[] {
  return VIDEOS;
}

export function getLabsVi(): Lab[] {
  return LAB_META.map((meta) => {
    const content = LAB_CONTENT_VI[meta.id];
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

export function getQuitCriteriaVi(): QuitCriteriaRow[] {
  return CHAPTER_META.map((meta) => ({
    id: `qc-${meta.id}`,
    chapterId: meta.id,
    stopSignal: QUIT_CRITERIA_VI[meta.id].stopSignal,
    exitCriteria: QUIT_CRITERIA_VI[meta.id].exitCriteria,
  }));
}

export function getGlossaryVi(): GlossaryTerm[] {
  return GLOSSARY_VI;
}

export function getResourcesVi(): Resource[] {
  return RESOURCES;
}

export function getFlashcardTasksVi(): FlashcardTask[] {
  return FLASHCARD_TASKS;
}
