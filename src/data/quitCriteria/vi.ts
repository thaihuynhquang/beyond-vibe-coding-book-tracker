import type { QuitCriteriaText } from "../../types/appState";

export const QUIT_CRITERIA_VI: Record<string, QuitCriteriaText> = {
  "ch-1": {
    stopSignal: "Nếu đã hiểu rõ vibe coding \"vỡ trận\" ở đâu (độ phức tạp tăng, prompt không đủ), dừng đọc thêm ví dụ game — chuyển sang chương 2 để học cách kiểm soát nó.",
    exitCriteria: "Giải thích được bằng lời của mình: vibe coding hợp lý ở quy mô nào, và tại sao nó gãy khi game phức tạp lên (1.4 What Went Wrong).",
  },
  "ch-2": {
    stopSignal: "Nếu đã áp dụng thành thạo \"one prompt, one commit\" trong công việc, lướt nhanh 2.1–2.3, tập trung đọc kỹ 2.4 (Building an Application Following Rules).",
    exitCriteria: "Có 1 rule file (CLAUDE.md/AGENTS.md) thật đang dùng, và Lab 2 chạy được end-to-end.",
  },
  "ch-3": {
    stopSignal: "Nếu Walking Skeleton (3.3) đã thông luồng nhưng bạn sa đà tối ưu domain model quá sớm, dừng lại — mục tiêu chương là học Elixir qua thực hành, không phải kiến trúc hoàn hảo.",
    exitCriteria: "Lab 3 (LESS search tool) chạy được end-to-end bằng Elixir/Phoenix, `mix test` pass.",
  },
  "ch-4": {
    stopSignal: "Nếu Cheat Sheet (4.5) đã đủ dùng cho công việc hằng ngày, không cần đọc lại toàn bộ case study Kotlin chi tiết — áp dụng cheat sheet vào codebase thật của bạn luôn.",
    exitCriteria: "Áp dụng được ít nhất 1 kỹ thuật của chương (test/bug fix/feature/docs/debug plan/mermaid) vào một codebase lớn thật ngoài sách.",
  },
  "ch-5": {
    stopSignal: "Nếu team bạn chưa có quy trình AI chính thức nào, đừng cố áp dụng hết mọi gợi ý cùng lúc — chọn 1 rủi ro bảo mật (5.3) để giải quyết trước.",
    exitCriteria: "Viết được 1 đề xuất ngắn (nửa trang) cho team về cách đưa AI vào quy trình code review, dựa trên 5.1–5.3.",
  },
  "ch-a1": {
    stopSignal: "Nếu chỉ cần dùng LLM chứ không xây model, có thể lướt phần toán chi tiết của Attention (6.1) và tập trung 6.2–6.4 (khái niệm thực dụng: context, vector DB, giới hạn).",
    exitCriteria: "Giải thích được bằng lời đơn giản: transformer/attention làm gì, context window là gì, và vì sao vector database cần cho RAG.",
  },
};
