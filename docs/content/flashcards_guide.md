# FLASHCARDS — QUY TRÌNH ÔN TẬP BẰNG GEMINI / NOTEBOOKLM

Đây là **quy trình**, không phải kho dữ liệu flashcard. App chỉ lưu một checkbox mỗi chương (`fc-ch-{id}` — xem `book_data_model_guide.md`), xác nhận "đã tạo và đã ôn bộ flashcard của chương này". Nội dung thẻ (câu hỏi/đáp án) sống ở Gemini/NotebookLM, không đưa vào `localStorage`.

---

## 1. Vì sao không lưu nội dung thẻ trong app

- Tránh trùng lặp: NotebookLM/Gemini đã là nơi lưu, xuất, và ôn tập tốt hơn một custom flashcard UI tự viết.
- Tracker chỉ cần trả lời 1 câu: "chương này đã có bộ thẻ ôn chưa, đã ôn ít nhất 1 lần chưa" — đúng tinh thần nhẹ-nhàng-không-over-engineer của app.

## 2. Quy trình tạo bộ thẻ sau mỗi chương

1. **Đọc xong** toàn bộ section của 1 chương, **và** xem hết các video companion của chương đó nếu có (tất cả checkbox `read`/video ở tab Chapters đã tick).
2. Copy nội dung chương (ảnh chụp trang sách, ghi chú tay, hoặc bản tóm tắt bạn tự viết) vào **NotebookLM** như 1 nguồn, hoặc dán trực tiếp vào **Gemini** (gemini.google.com) nếu chỉ cần nhanh.
3. Dùng prompt mẫu bên dưới để sinh bộ thẻ.
4. Ôn thử ngay tại chỗ (NotebookLM có chế độ Flashcards có sẵn; Gemini thì đọc qua và tự hỏi-đáp).
5. Tick `fc-ch-{id}` ở cuối chương tương ứng trong tab **Chapters** của tracker.

## 3. Prompt mẫu (song ngữ)

### Prompt cho NotebookLM (dùng tính năng Studio → Flashcards có sẵn)
Chỉ cần add nguồn (PDF/ảnh/ghi chú chương) rồi bấm "Flashcards" trong Studio — NotebookLM tự sinh thẻ từ nguồn, không cần prompt tay.

### Prompt cho Gemini (khi không dùng NotebookLM)
```
Bạn là trợ lý ôn tập. Dựa trên nội dung chương sau đây của sách "Process Over Magic: Beyond Vibe Coding"
(chương {số chương}: {tên chương}），hãy tạo 10-15 flashcard ôn tập theo định dạng:

Q: <câu hỏi ngắn, tập trung vào 1 khái niệm/kỹ thuật cụ thể>
A: <câu trả lời 1-3 câu, có ví dụ ngắn nếu là quy trình/kỹ thuật>

Yêu cầu:
- Ưu tiên câu hỏi kiểu "khi nào dùng kỹ thuật X thay vì Y" hơn là định nghĩa suông
  (ví dụ: "khi nào nên spec-driven thay vì vibe coding thuần?").
- Ít nhất 3 câu hỏi liên hệ trực tiếp tới case study/video của chương (không hỏi lý thuyết trừu tượng).
- Câu hỏi bằng tiếng Việt, thuật ngữ kỹ thuật giữ nguyên tiếng Anh
  (vibe coding, spec-driven development, one prompt one commit, walking skeleton...).

Nội dung chương:
<dán nội dung/ghi chú ở đây>
```

## 4. Tiêu chí "đạt" để tick `fc-ch-{id}`

- [ ] Bộ thẻ có ít nhất 10 câu cho chương thường, ít nhất 15 câu cho chương có nhiều video (2, 3, 4).
- [ ] Đã ôn qua ít nhất 1 lượt toàn bộ thẻ (không cần đúng 100%, chỉ cần đã tự kiểm tra).
- [ ] Với chương có lab (`labs.md`), ít nhất 1 thẻ hỏi trực tiếp về kỹ thuật dùng trong lab đó — nối ôn tập với thực hành.

## 5. Gợi ý lịch ôn (spaced, không bắt buộc)

| Lần ôn | Khi nào |
| :--- | :--- |
| Lần 1 | Ngay sau khi tạo thẻ (cùng ngày đọc xong chương) |
| Lần 2 | +2 ngày |
| Lần 3 | +7 ngày |
| Lần 4 | Trước khi đọc chương phụ lục A1 (ôn lại thuật ngữ LLM nền tảng trước khi vào phần lý thuyết) |

App không track các lần ôn lại này — đây là gợi ý kỷ luật cá nhân, không phải state cần lưu.

## 6. Danh sách 6 task flashcard

| id | Chương |
| :--- | :--- |
| fc-ch-1 | Going with the Vibe |
| fc-ch-2 | Building Securely and Predictably |
| fc-ch-3 | Learning by Coding |
| fc-ch-4 | Working on a Large Codebase |
| fc-ch-5 | Collaborating Inside an AI-Powered Team |
| fc-ch-a1 | Demystifying Large Language Models (Appendix A1) |
