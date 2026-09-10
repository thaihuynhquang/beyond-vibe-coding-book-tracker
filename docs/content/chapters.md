# BẢN ĐỒ 6 CHƯƠNG — PROCESS OVER MAGIC: BEYOND VIBE CODING

Nội dung nguồn cho tab **Chapters** (`#/chapters`). Mỗi chương: tóm tắt tiếng Việt (học được gì / dùng vào đâu), danh sách section `x.y` (đơn vị tick `read`), danh sách video companion (đơn vị tick `videoWatched`, mỗi video có 1 lab đi kèm), và ước lượng thời gian đọc. Id chính xác tham chiếu **[book_data_model_guide.md](../guides/book_data_model_guide.md)** — file này không lặp lại toàn bộ bảng id, chỉ nói về nội dung và cách đọc.

> Sách gốc: ***Process Over Magic: Beyond Vibe Coding: Faster, Smarter, and Safer Coding with AI Assistants*** — Uberto Barbini, The Pragmatic Programmers, 06/2026 — https://pragprog.com/titles/ubaidev/process-over-magic-beyond-vibe-coding/
> Video companion (20 video): https://www.youtube.com/playlist?list=PLUeffUYYqoHrUy1_VrwLxBybjHNL7p9Mz

---

## Cách dùng bản đồ này

- **Lướt nhanh** (skim): đọc để nắm khái niệm, không cần xem hết video.
- **Đọc kỹ + xem video + làm lab** (deep): đọc section, xem video tương ứng, tái hiện lab bằng AI assistant của bạn.
- **Chương thực hành nặng**: 2, 3, 4 — nhiều video/lab nhất (5, 5, 6), nên xem video và làm ít nhất 1-2 lab mỗi chương.
- **Chương lý thuyết/quy trình**: 1, 5 — ít hoặc không có lab, đọc kỹ để nắm tư duy (spec-driven, team adoption).
- **Phụ lục**: A1 — nền tảng kỹ thuật (LLM, attention), đọc khi cần hiểu "cỗ máy" đứng sau các chương trước, không bắt buộc đọc trước.

Tổng cộng **33 section**, **20 video companion**, **20 lab** trên 6 chương.

---

## Chương 1 — Going with the Vibe
**Tóm tắt**: Case study đầu tiên: tác giả vibe-code hai game (Jewel Swap, Flight Simulator bằng Python) chỉ bằng prompt, rồi thử một game phức tạp hơn để xem vibe coding "vỡ trận" ở đâu. Kết thúc bằng bước chuyển sang spec-driven development.
**Ưu tiên đọc**: Đọc kỹ + xem cả 4 video, ~95 phút đọc.
**Sections**:
- 1.1 Vibe Coding a Game
- 1.2 Improving Your Prompts
- 1.3 Writing a More Complex Game with AI
- 1.4 What Went Wrong
- 1.5 Using Specifications to Drive Assistants
- 1.6 What We Learned

**Video companion (4)**: Vibe coding Jewel Swap game · Vibe coding a Flight Simulator game in Python · Spec Driven Development coding a platform game in Python with a Panda · …the second try.

## Chương 2 — Building Securely and Predictably
**Tóm tắt**: Đối lập với chương 1 — một quy trình có kỷ luật: "one prompt, one commit", rule file để AI giữ thói quen tốt, và xây trọn một ứng dụng thật (LLM Empowered Semantic Search tool) theo đúng quy trình đó từ đầu đến cuối.
**Ưu tiên đọc**: Đọc kỹ, ~95 phút đọc + 5 video (~1-2 giờ xem + làm lab).
**Sections**:
- 2.1 Keep the Edge
- 2.2 One Prompt, One Commit
- 2.3 An AI with Good Habits
- 2.4 Building an Application Following Rules
- 2.5 Results and Reflections
- 2.6 What We Learned

**Video companion (5)**: Build LLM Empowered Semantic Search tool 1/5 → 5/5.

## Chương 3 — Learning by Coding
**Tóm tắt**: Học một ngôn ngữ mới (Elixir) bằng cách vừa code vừa để AI hỗ trợ — từ ý tưởng ban đầu, walking skeleton, domain model, tới hoàn thiện UI tìm kiếm (công cụ LESS search) và khả năng hiển thị PDF.
**Ưu tiên đọc**: Đọc kỹ, ~95 phút đọc + 5 video.
**Sections**:
- 3.1 The Inception
- 3.2 Shaping the Idea
- 3.3 Walking Skeleton
- 3.4 Modeling the Domain
- 3.5 Developing the Search UI
- 3.6 Show PDFs
- 3.7 What We Learned

**Video companion (5)**: Learning Elixir while building a web UI for the LESS search tool 1/5 → 5/5.

## Chương 4 — Working on a Large Codebase
**Tóm tắt**: Áp dụng AI vào một codebase lớn có thật — quản lý technical debt, hiểu legacy code, dùng AI để thêm test/sửa bug/thêm tính năng/viết docs/lập debug plan/vẽ sơ đồ Mermaid cho một thư viện Kotlin, kèm cheat sheet tổng hợp cho developer.
**Ưu tiên đọc**: Đọc kỹ, ~85 phút đọc + 6 video — chương thực hành nặng nhất sách.
**Sections**:
- 4.1 Managing Technical Debt
- 4.2 Understanding Legacy Code
- 4.3 Enhancing Big Code Projects with AI
- 4.4 Is It All Worth It?
- 4.5 Cheat Sheet for the AI Powered Developer
- 4.6 What We Learned

**Video companion (6)**: Adding New Tests on a Kotlin Library · Fixing a Bug on a Kotlin Library · Creating a New Feature for a Kotlin Library · Generating Documentation for Large Code Bases · Creating a Debug Plan for Large Code Bases · Generating Mermaid Documentation Diagrams (all "with AI Assistants").

## Chương 5 — Collaborating Inside an AI-Powered Team
**Tóm tắt**: Đưa AI vào quy trình làm việc nhóm — cách team áp dụng AI, tổ chức lại vai trò, và các rủi ro bảo mật (rò rỉ dữ liệu, prompt injection) khi nhiều người cùng dùng chung AI assistant.
**Ưu tiên đọc**: Đọc kỹ, ~55 phút — không có video/lab, chương thuần lý thuyết/quy trình.
**Sections**:
- 5.1 Adopting AI
- 5.2 Team Organization
- 5.3 Security Risks
- 5.4 What We Learned

## Phụ lục A1 — Demystifying Large Language Models
**Tóm tắt**: Giải thích nền tảng kỹ thuật đứng sau mọi thứ ở các chương trước — cơ chế attention/transformer, LLM thực chất là gì, vector database dùng để làm gì, và các giới hạn thực tế (context window, chi phí, fine-tuning, quantization).
**Ưu tiên đọc**: Đọc tham khảo, ~60 phút — không có video/lab, đọc trước hoặc sau tùy nhu cầu nền tảng lý thuyết.
**Sections**:
- 6.1 Attention Is All You Need
- 6.2 What Are Large Language Models?
- 6.3 Vector Databases
- 6.4 Considerations
