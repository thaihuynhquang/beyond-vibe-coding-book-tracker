# LABS — 20 BÀI THỰC HÀNH THEO VIDEO COMPANION

Nguồn nội dung cho `Lab[]` trong `bookData.*.ts` (xem schema `Lab` ở **[book_data_model_guide.md](../guides/book_data_model_guide.md)**). Mỗi lab có `id = lab-ch-{n}-{order}`, đi kèm 1 video companion (`videoId`) — xem video trước, rồi tái hiện bài tập bằng AI assistant của riêng bạn theo đúng stack video dùng (Python/Kotlin/Elixir), không cần TypeScript hay web.

Mỗi lab đóng vai trò của trục **"chapter deliverables"** (30% trọng số, cùng flashcard) trong công thức tiến độ — chỉ có 1 checkbox "đã hoàn thành", không chia nhỏ acceptance criteria thành state riêng.

---

## Chương 1 — Going with the Vibe (4 lab)

### `lab-ch-1-1` — Vibe code lại game Jewel Swap
- **Video**: Vibe coding Jewel Swap game
- **Mục tiêu**: Xem video, sau đó tự vibe-code một game match-3 kiểu Jewel Swap chỉ bằng prompt tự nhiên, không viết tay dòng code nào.
- **Acceptance criteria**: Game chạy được (đổi chỗ 2 ô liền kề, 3 ô cùng màu thẳng hàng biến mất); ghi lại ít nhất 1 chỗ AI hiểu sai ý.
- **Tools**: AI coding assistant.

### `lab-ch-1-2` — Vibe code Flight Simulator bằng Python
- **Video**: Vibe coding a Flight Simulator game in Python
- **Mục tiêu**: Lặp lại kỹ thuật vibe coding với bài toán phức tạp hơn.
- **Acceptance criteria**: Điều khiển được máy bay bằng bàn phím; so sánh độ phức tạp với Lab 1.1.
- **Tools**: Python, AI coding assistant.

### `lab-ch-1-3` — Spec-Driven: platform game con Panda (lần 1)
- **Video**: Spec Driven Development coding a platform game in Python with a Panda
- **Mục tiêu**: Viết đặc tả trước khi để AI code game platform 2D.
- **Acceptance criteria**: Panda nhảy được qua platform, thua khi rơi khỏi màn hình; đối chiếu spec với kết quả.
- **Tools**: Python, spec-driven development.

### `lab-ch-1-4` — Spec-Driven: platform game con Panda (lần 2, sửa spec)
- **Video**: …the second try
- **Mục tiêu**: Viết lại spec chặt hơn, đo số vòng sửa lỗi so với lần 1.
- **Acceptance criteria**: Game hoàn chỉnh hơn (thêm 1 tính năng); ghi số vòng prompt-sửa-lỗi.
- **Tools**: Python, spec-driven development.

## Chương 2 — Building Securely and Predictably (5 lab)

### `lab-ch-2-1`…`lab-ch-2-5` — Build LLM Empowered Semantic Search tool, bước 1–5
Bám theo 5 video "1/5" → "5/5": (1) nạp dữ liệu + sinh embedding, (2) lưu vào vector database, (3) bọc thành API tìm kiếm, (4) chặn input không an toàn, (5) tổng kết + retro. Mỗi bước có acceptance criteria riêng và áp dụng "one prompt, one commit" xuyên suốt — xem chi tiết trong `src/data/labs/vi.ts` / `en.ts`.
- **Tools**: Python, LLM API, embeddings, vector database.

## Chương 3 — Learning by Coding (5 lab)

### `lab-ch-3-1`…`lab-ch-3-5` — LESS search tool bằng Elixir, bước 1–5
Bám theo 5 video "1/5" → "5/5": (1) Inception/chọn ý tưởng, (2) Shaping the Idea, (3) Walking Skeleton, (4) Modeling the Domain, (5) hoàn thiện Search UI. Học Elixir/Phoenix song song với việc code — xem chi tiết trong `src/data/labs/vi.ts` / `en.ts`.
- **Tools**: Elixir, Phoenix.

## Chương 4 — Working on a Large Codebase (6 lab)

### `lab-ch-4-1` — Thêm test mới cho một thư viện Kotlin
Video: Adding New Tests on a Kotlin Library with AI Assistants. Đo coverage trước/sau. **Tools**: Kotlin, testing.

### `lab-ch-4-2` — Sửa 1 bug thật bằng AI
Video: Fixing a Bug on a Kotlin Library with AI Assistants. Viết test tái hiện bug (red) trước khi fix (green). **Tools**: Kotlin, debugging.

### `lab-ch-4-3` — Thêm 1 tính năng mới bằng AI
Video: Creating a New Feature for a Kotlin Library with AI assistants. Tính năng phải có test đi kèm, không phá test cũ. **Tools**: Kotlin.

### `lab-ch-4-4` — Sinh tài liệu cho codebase lớn bằng AI
Video: Generating Documentation for Large Code Bases with AI assistants. Đối chiếu tài liệu sinh ra với code thật, tìm hallucination. **Tools**: Documentation generation.

### `lab-ch-4-5` — Lập kế hoạch debug cho codebase lớn
Video: Creating a Debug Plan for Large Code Bases with AI assistants. Ít nhất 3 giả thuyết xếp hạng trước khi sửa code. **Tools**: Debugging.

### `lab-ch-4-6` — Sinh sơ đồ Mermaid tài liệu hoá kiến trúc
Video: Generating Mermaid Documentation Diagrams with AI Assistants. Sơ đồ phải khớp với code thật, không bịa bước. **Tools**: Mermaid, documentation generation.

## Chương 5 & Phụ lục A1

Không có video companion, do đó không có lab. Tiến độ deliverable của 2 chương này chỉ tính flashcard (`fc-ch-5`, `fc-ch-a1`).
