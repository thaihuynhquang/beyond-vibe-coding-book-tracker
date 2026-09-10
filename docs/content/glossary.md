# GLOSSARY — TỪ ĐIỂN AI/LLM THEO CHƯƠNG

Nguồn nội dung cho `GlossaryTerm[]` (xem schema ở **[book_data_model_guide.md](../guides/book_data_model_guide.md)**). Sách này là case-study về phát triển phần mềm với AI assistant, không phải Web API — nên glossary ở đây là thuật ngữ AI/LLM/quy trình, không phải MDN. Mỗi thuật ngữ có id dạng `term-{kebab-case}`, gắn với 1+ chương, mô tả ngắn tiếng Việt, và `refUrl` (Wikipedia/tài liệu chính thức/paper — không giới hạn MDN). 32 mục.

---

## Chương 1 — Going with the Vibe

| id | Tên | Mô tả | Nguồn |
| :--- | :--- | :--- | :--- |
| term-vibe-coding | Vibe coding | Lập trình bằng cách mô tả ý muốn cho AI qua prompt và chấp nhận code sinh ra mà không đọc kỹ (do Andrej Karpathy đặt tên, 2/2025). | https://en.wikipedia.org/wiki/Vibe_coding |
| term-prompt-engineering | Prompt engineering | Kỹ thuật thiết kế prompt để dẫn dắt LLM ra kết quả mong muốn. | https://en.wikipedia.org/wiki/Prompt_engineering |
| term-system-prompt | System prompt | Chỉ dẫn nền gửi trước hội thoại để định hình hành vi AI assistant. | https://www.promptingguide.ai/introduction |
| term-temperature | Temperature (sampling) | Tham số điều chỉnh độ ngẫu nhiên khi LLM sinh token tiếp theo. | https://www.promptingguide.ai/introduction/settings |
| term-hallucination | Hallucination (AI) | AI sinh ra thông tin/code nghe hợp lý nhưng sai hoặc bịa. | https://en.wikipedia.org/wiki/Hallucination_(artificial_intelligence) |
| term-spec-driven-development | Spec-driven development | Viết đặc tả rõ ràng trước khi để AI code, thay vì prompt tự do. | https://github.com/github/spec-kit |
| term-acceptance-criteria | Acceptance criteria | Danh sách điều kiện cụ thể xác nhận một tính năng/đặc tả đã hoàn thành. | https://en.wikipedia.org/wiki/Acceptance_testing |

## Chương 2 — Building Securely and Predictably

| id | Tên | Mô tả | Nguồn |
| :--- | :--- | :--- | :--- |
| term-one-prompt-one-commit | One prompt, one commit | Kỷ luật: mỗi prompt gửi AI chỉ tạo ra đúng 1 commit. | https://cbea.ms/git-commit/ |
| term-rules-file | Rules file (AGENTS.md / CLAUDE.md) | File chỉ dẫn cố định AI assistant tự đọc trước khi code. | https://www.anthropic.com/engineering/claude-code-best-practices |
| term-embedding | Embedding (vector embedding) | Biểu diễn văn bản dưới dạng vector số để so sánh độ tương đồng ngữ nghĩa. | https://platform.openai.com/docs/guides/embeddings |
| term-vector-database | Vector database | Cơ sở dữ liệu chuyên lưu/truy vấn embedding theo độ tương đồng. | https://en.wikipedia.org/wiki/Vector_database |
| term-semantic-search | Semantic search | Tìm kiếm theo nghĩa của câu truy vấn thay vì khớp từ khoá chính xác. | https://en.wikipedia.org/wiki/Semantic_search |
| term-rag | RAG (Retrieval-Augmented Generation) | Kết hợp truy xuất dữ liệu với LLM để trả lời có căn cứ. | https://en.wikipedia.org/wiki/Retrieval-augmented_generation |
| term-commit-discipline | Commit discipline | Thói quen viết commit message rõ ràng, đúng phạm vi. | https://www.conventionalcommits.org/ |

## Chương 3 — Learning by Coding

| id | Tên | Mô tả | Nguồn |
| :--- | :--- | :--- | :--- |
| term-walking-skeleton | Walking skeleton | Phiên bản tối thiểu chạy được end-to-end, chứng minh kiến trúc thông trước khi phát triển tiếp. | http://www.extremeprogramming.org/rules/skeleton.html |
| term-domain-modeling | Domain modeling | Xác định khái niệm/struct/quy tắc nghiệp vụ cốt lõi trước khi code chi tiết. | https://en.wikipedia.org/wiki/Domain-driven_design |

## Chương 4 — Working on a Large Codebase

| id | Tên | Mô tả | Nguồn |
| :--- | :--- | :--- | :--- |
| term-technical-debt | Technical debt | Chi phí phải trả sau này vì chọn giải pháp nhanh thay vì đúng đắn. | https://en.wikipedia.org/wiki/Technical_debt |
| term-legacy-code | Legacy code | Code cũ, thường thiếu test, khó thay đổi an toàn. | https://en.wikipedia.org/wiki/Legacy_system |
| term-mermaid-diagram | Mermaid diagram | Cú pháp text-to-diagram để vẽ flowchart/sequence diagram. | https://mermaid.js.org/ |
| term-code-review-with-ai | Code review with AI | Dùng AI assistant hỗ trợ đọc/soát code trước khi merge. | https://github.blog/ai-and-ml/generative-ai/how-to-use-github-copilot-in-your-code-review-process/ |

## Chương 5 — Collaborating Inside an AI-Powered Team

| id | Tên | Mô tả | Nguồn |
| :--- | :--- | :--- | :--- |
| term-agent | AI agent | Hệ thống LLM tự lên kế hoạch, gọi tool, hành động nhiều bước để đạt mục tiêu. | https://www.anthropic.com/research/building-effective-agents |
| term-mcp | Model Context Protocol (MCP) | Chuẩn mở của Anthropic để AI assistant kết nối thống nhất với tool/dữ liệu ngoài. | https://modelcontextprotocol.io/introduction |
| term-pair-programming-with-ai | Pair programming with AI | Biến thể lập trình cặp đôi, trong đó một "người" là AI assistant. | https://en.wikipedia.org/wiki/Pair_programming |
| term-prompt-injection | Prompt injection | Chèn chỉ dẫn độc hại vào nội dung AI đọc được để đánh lừa nó hành động ngoài ý muốn. | https://en.wikipedia.org/wiki/Prompt_injection |

## Phụ lục A1 — Demystifying Large Language Models

| id | Tên | Mô tả | Nguồn |
| :--- | :--- | :--- | :--- |
| term-llm | Large Language Model (LLM) | Mô hình ngôn ngữ quy mô lớn học từ khối văn bản khổng lồ để dự đoán token tiếp theo. | https://en.wikipedia.org/wiki/Large_language_model |
| term-transformer | Transformer (kiến trúc) | Kiến trúc mạng nơ-ron dùng attention làm nền tảng cho hầu hết LLM hiện đại. | https://en.wikipedia.org/wiki/Transformer_(deep_learning_architecture) (spec: arXiv 1706.03762) |
| term-attention-mechanism | Attention mechanism | Cơ chế cho phép model "chú ý" có trọng số tới các token liên quan. | https://en.wikipedia.org/wiki/Attention_(machine_learning) (spec: arXiv 1706.03762) |
| term-tokenization | Tokenization | Chia văn bản thành các token mà LLM xử lý. | https://platform.openai.com/tokenizer |
| term-context-window | Context window | Số lượng token tối đa mà LLM "nhớ" được trong một lượt xử lý. | https://www.ibm.com/think/topics/context-window |
| term-fine-tuning | Fine-tuning | Huấn luyện tiếp một LLM có sẵn trên tập dữ liệu nhỏ, chuyên biệt hơn. | https://en.wikipedia.org/wiki/Fine-tuning_(deep_learning) |
| term-inference | Inference (LLM) | Giai đoạn dùng model đã huấn luyện để sinh output cho input mới. | https://www.ibm.com/think/topics/ai-inference |
| term-quantization | Quantization | Giảm độ chính xác số học của trọng số model để chạy nhẹ hơn, nhanh hơn. | https://www.ibm.com/think/topics/quantization-aware-training |

`term-embedding` và `term-vector-database` xuất hiện lại ở phụ lục A1 (nền tảng RAG) — xem chương 2 ở trên, không lặp bảng.
