# QUIT CRITERIA — MA TRẬN DỪNG/SKIP & EXIT CRITERIA THEO CHƯƠNG

Nguồn nội dung cho `QuitCriteriaRow[]` (xem schema ở **[book_data_model_guide.md](../guides/book_data_model_guide.md)**). Đây là **một ma trận gộp**: mỗi chương có 2 cột — **Stop Signal** ("khi nào nên dừng/skip chương này") và **Exit Criteria** ("khi nào coi là đủ giỏi để đi tiếp, không cần đọc hết từng dòng").

---

## 1. Vì sao cần tiêu chí dừng khi đọc sách kỹ thuật

**Bẫy chi phí chìm (Sunk Cost Fallacy)** không chỉ xảy ra khi làm dự án — nó xảy ra ngay cả khi đọc sách: cố làm lại lab video "cho đẹp" (ví dụ router có View Transitions ở một cuốn sách khác, hay ở đây là router LESS search bằng Elixir) vì "đã bỏ 2 giờ rồi, dừng tiếc", thay vì chấp nhận ghi chú "chưa hoàn hảo, đủ để hiểu ý chính" và đọc tiếp.

**Nguyên lý cầu chì tự ngắt**: đặt sẵn ngưỡng **trước khi đọc/làm lab**, để khi chạm ngưỡng thì hành động dừng/skip diễn ra tự động, không phụ thuộc cảm xúc lúc đó.

## 2. Các điểm nghẽn dự kiến (Choke Points)

```
[Ch. 1: Vibe coding] ──► 🚨 CHOKE POINT 1 ──► 🚨 CHOKE POINT 2 ──► 🚨 CHOKE POINT 3
                            (Ch. 2-3: 9 lab code theo video)   (Ch. 4: Kotlin lớn)   (A1: Toán LLM)
```

### 🚨 Choke Point 1 — Chương 2–3 (9 lab bám sát video, ngôn ngữ mới với nhiều người: Python cho embedding, Elixir cho LESS search)
- **Rủi ro sa lầy**: 10 video liên tiếp (5+5) theo dạng "1/5 → 5/5" dễ khiến người đọc cố làm y hệt video từng khung hình, thay vì rút kỹ thuật cốt lõi ("one prompt, one commit", "walking skeleton") và áp dụng nhanh hơn.
- **Bẫy chi phí chìm**: Debug lỗi cài đặt Elixir/Phoenix hàng giờ (một hệ sinh thái mới) thay vì tạm ghi chú "môi trường lỗi, xem tiếp video để hiểu ý tưởng, quay lại setup sau".

### 🚨 Choke Point 2 — Chương 4 (Kotlin codebase lớn, 6 video/lab)
- **Rủi ro sa lầy**: Nếu không có sẵn một thư viện Kotlin để thực hành, người đọc dễ tốn nhiều thời gian dựng project mẫu thay vì tập trung học kỹ thuật (debug plan, cheat sheet) — kỹ thuật mới là trọng tâm, không phải Kotlin.
- **Bẫy chi phí chìm**: Cố làm đủ cả 6 lab trên cùng 1 codebase "cho nhất quán" thay vì áp dụng kỹ thuật của mỗi video vào bất kỳ codebase quen thuộc nào đang có sẵn.

### 🚨 Choke Point 3 — Phụ lục A1 (Toán nền LLM: attention, transformer)
- **Rủi ro sa lầy**: Phần toán của "Attention Is All You Need" (6.1) có thể khiến người chỉ cần *dùng* LLM cảm thấy lạc lối vì không cần thiết cho mục tiêu thực dụng.
- **Bẫy chi phí chìm**: Cố hiểu hết công thức attention trước khi cho phép bản thân đóng sách, dù mục tiêu ban đầu chỉ là "dùng AI assistant tốt hơn".

## 3. Khung tiêu chí dừng chung (áp dụng mọi chương)

| Ngưỡng | Trigger | Hành động |
| :--- | :--- | :--- |
| **Thời gian đọc** | Đọc 1 section quá 150% thời gian ước lượng (`estMinutes`) mà vẫn chưa nắm được ý chính | Đánh dấu section "đã đọc" với ghi chú riêng (giấy/note app), đọc tiếp — quay lại sau khi có nhiều ngữ cảnh hơn từ chương sau |
| **Lab quá hạn** | Đã dùng gấp đôi thời gian dự kiến cho 1 lab mà chưa đạt tiêu chí đầu tiên | Cắt giảm phạm vi lab xuống chỉ còn tiêu chí đầu tiên, bỏ phần còn lại, tick lab hoàn thành ở mức tối thiểu |
| **Burnout** | 2 tuần liên tiếp không mở sách/app | Giảm mục tiêu xuống 1 video/section mỗi lần thay vì cả chương, không tự trách |

## 4. Ma trận quyết định theo chương (6/6)

| id | Chương | Stop Signal (khi nào nên dừng/skip) | Exit Criteria (khi nào đủ giỏi để đi tiếp) |
| :--- | :--- | :--- | :--- |
| qc-ch-1 | 1. Going with the Vibe | Nếu đã hiểu rõ vibe coding "vỡ trận" ở đâu, dừng đọc thêm ví dụ game — chuyển sang chương 2 để học cách kiểm soát nó. | Giải thích được bằng lời của mình: vibe coding hợp lý ở quy mô nào, và tại sao nó gãy khi game phức tạp lên (1.4). |
| qc-ch-2 | 2. Building Securely and Predictably | Nếu đã áp dụng thành thạo "one prompt, one commit" trong công việc, lướt nhanh 2.1–2.3, tập trung đọc kỹ 2.4. | Có 1 rule file (CLAUDE.md/AGENTS.md) thật đang dùng, và ít nhất 1 lab trong 5 lab chương 2 chạy end-to-end. |
| qc-ch-3 | 3. Learning by Coding | Nếu Walking Skeleton (3.3) đã thông luồng nhưng bạn sa đà tối ưu domain model quá sớm, dừng lại — mục tiêu chương là học Elixir qua thực hành. | Ít nhất 1 lab trong 5 lab chương 3 chạy được bằng Elixir/Phoenix, `mix test` pass. |
| qc-ch-4 | 4. Working on a Large Codebase | Nếu Cheat Sheet (4.5) đã đủ dùng cho công việc hằng ngày, không cần làm đủ cả 6 lab — áp dụng cheat sheet vào codebase thật của bạn luôn. | Áp dụng được ít nhất 1 kỹ thuật của chương (test/bug fix/feature/docs/debug plan/mermaid) vào một codebase lớn thật ngoài sách. |
| qc-ch-5 | 5. Collaborating Inside an AI-Powered Team | Nếu team bạn chưa có quy trình AI chính thức nào, đừng cố áp dụng hết mọi gợi ý cùng lúc — chọn 1 rủi ro bảo mật (5.3) để giải quyết trước. | Viết được 1 đề xuất ngắn (nửa trang) cho team về cách đưa AI vào quy trình code review, dựa trên 5.1–5.3. |
| qc-ch-a1 | A1. Demystifying Large Language Models | Nếu chỉ cần dùng LLM chứ không xây model, có thể lướt phần toán chi tiết của Attention (6.1) và tập trung 6.2–6.4. | Giải thích được bằng lời đơn giản: transformer/attention làm gì, context window là gì, và vì sao vector database cần cho RAG. |

## 5. Quy trình tự đánh giá định kỳ

1. **Mỗi cuối tuần**: mở tab Quit Criteria, đọc lại 2–3 dòng của chương đang đọc dở.
2. Tự hỏi: đã chạm **Stop Signal** nào chưa? Nếu có → áp dụng hành động pivot ngay, không trì hoãn thêm 1 tuần.
3. Tự hỏi: đã đạt **Exit Criteria** chưa dù chưa xem/làm 100% video và lab? Nếu có → cho phép bản thân chuyển chương, quay lại phần còn thiếu sau khi đọc xong toàn sách (không cần tuyến tính tuyệt đối).
4. Ghi 1 dòng nhận xét ngắn (giấy hoặc note app, không cần lưu trong tracker) — mục đích là phản tư, không phải để "chấm điểm" bản thân.
