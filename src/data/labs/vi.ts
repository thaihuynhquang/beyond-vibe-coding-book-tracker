import type { LabContent } from "../../types/appState";

export const LAB_CONTENT_VI: Record<string, LabContent> = {
  "lab-ch-1-1": {
    title: "Vibe code lại game Jewel Swap",
    goal: "Xem video, sau đó tự vibe-code một game match-3 kiểu Jewel Swap chỉ bằng prompt tự nhiên, không viết tay dòng code nào.",
    requirements: ["Chỉ dùng prompt tiếng tự nhiên cho AI assistant, không tự sửa code bằng tay.", "Ghi lại toàn bộ chuỗi prompt đã dùng."],
    acceptanceCriteria: [
      "Game chạy được: click/kéo 2 ô liền kề để đổi chỗ, 3 ô cùng màu thẳng hàng thì biến mất.",
      "Ghi chú lại ít nhất 1 chỗ AI hiểu sai ý và bạn phải prompt lại để sửa.",
    ],
  },
  "lab-ch-1-2": {
    title: "Vibe code Flight Simulator bằng Python",
    goal: "Lặp lại kỹ thuật vibe coding với một bài toán phức tạp hơn — mô phỏng bay cơ bản bằng Python.",
    requirements: ["Dùng Python, có thể dùng pygame hoặc thư viện tương đương.", "Toàn bộ code do AI sinh ra từ prompt, bạn chỉ định hướng."],
    acceptanceCriteria: [
      "Điều khiển được máy bay bằng bàn phím (lên/xuống/trái/phải tối thiểu).",
      "So sánh bằng văn bản ngắn: độ phức tạp này có làm vibe coding \"vỡ trận\" so với game ở Lab 1.1 không, vì sao.",
    ],
  },
  "lab-ch-1-3": {
    title: "Spec-Driven: platform game con Panda (lần 1)",
    goal: "Thử chuyển từ vibe coding thuần sang spec-driven development — viết đặc tả trước khi để AI code game platform 2D với nhân vật Panda.",
    requirements: ["Viết 1 file đặc tả (SPEC.md) mô tả luật chơi, điều khiển, điều kiện thắng/thua trước khi prompt AI code.", "Python."],
    acceptanceCriteria: [
      "Nhân vật Panda nhảy được qua platform, thua khi rơi khỏi màn hình.",
      "Đối chiếu spec ban đầu với kết quả cuối: liệt kê ít nhất 2 điểm AI làm đúng theo spec và 1 điểm lệch spec.",
    ],
  },
  "lab-ch-1-4": {
    title: "Spec-Driven: platform game con Panda (lần 2, sửa spec)",
    goal: "Rút kinh nghiệm từ lần 1, viết lại spec chặt hơn rồi làm lại — đo xem spec tốt hơn có giảm số vòng sửa lỗi không.",
    requirements: ["Viết lại SPEC.md dựa trên bài học ở Lab 1.3 (thêm chi tiết còn thiếu, chỉnh chỗ mơ hồ).", "Python."],
    acceptanceCriteria: [
      "Game hoàn chỉnh hơn lần 1: thêm ít nhất 1 tính năng mới (ví dụ: điểm số hoặc nhiều màn).",
      "Ghi số vòng prompt-sửa-lỗi ở lần 2 so với lần 1 — spec tốt hơn có thực sự ít vòng lặp hơn không?",
    ],
  },
  "lab-ch-2-1": {
    title: "LLM Semantic Search — Bước 1: nạp dữ liệu & sinh embedding",
    goal: "Bắt đầu xây công cụ tìm kiếm ngữ nghĩa bằng LLM: nạp một bộ tài liệu nhỏ và sinh embedding cho từng đoạn.",
    requirements: ["Python.", "Một API sinh embedding (bất kỳ nhà cung cấp nào).", "Tối thiểu 20 đoạn văn bản mẫu để test."],
    acceptanceCriteria: [
      "Mỗi đoạn văn bản có 1 vector embedding lưu lại được (file JSON hoặc DB tạm).",
      "Áp dụng \"one prompt, one commit\": mỗi bước code là 1 commit riêng, message rõ ràng.",
    ],
  },
  "lab-ch-2-2": {
    title: "LLM Semantic Search — Bước 2: lưu vào vector database",
    goal: "Đưa embedding ở bước 1 vào một vector database thật (local hoặc cloud) thay vì lưu file phẳng.",
    requirements: ["Một vector database (ví dụ Chroma, Qdrant, pgvector — chọn 1).", "Giữ nguyên rule file / guardrails cho AI assistant từ chương 2."],
    acceptanceCriteria: [
      "Query bằng 1 câu văn bản trả về top-k đoạn gần nghĩa nhất, có điểm similarity.",
      "Rule file (CLAUDE.md/AGENTS.md tương đương) được commit cùng repo, AI tuân theo khi sinh code mới.",
    ],
  },
  "lab-ch-2-3": {
    title: "LLM Semantic Search — Bước 3: API tìm kiếm",
    goal: "Bọc phần lõi tìm kiếm thành một API HTTP đơn giản để dùng được từ nơi khác.",
    requirements: ["1 endpoint POST /search nhận query text, trả về danh sách kết quả.", "Có test tự động cho endpoint này."],
    acceptanceCriteria: [
      "Gọi endpoint bằng curl/Postman trả JSON đúng định dạng, đúng thứ tự theo similarity.",
      "Có ít nhất 1 test tự động chạy pass cho endpoint.",
    ],
  },
  "lab-ch-2-4": {
    title: "LLM Semantic Search — Bước 4: xử lý input không an toàn",
    goal: "Áp dụng tư duy \"building securely\" của chương — chặn input độc hại/quá tải trước khi vào pipeline LLM.",
    requirements: ["Validate độ dài & định dạng query trước khi gọi embedding API.", "Giới hạn rate cơ bản (ví dụ: N request/phút/IP)."],
    acceptanceCriteria: [
      "Query rỗng hoặc quá dài (ví dụ >2000 ký tự) bị từ chối với lỗi rõ ràng, không crash service.",
      "Ghi lại 1 kịch bản input ác ý bạn nghĩ ra và cách hệ thống chặn nó.",
    ],
  },
  "lab-ch-2-5": {
    title: "LLM Semantic Search — Bước 5: tổng kết & retro",
    goal: "Hoàn thiện công cụ, sau đó làm retro giống \"Results and Reflections\" (2.5) của chương.",
    requirements: ["Demo end-to-end: nạp dữ liệu mới → tìm kiếm → trả kết quả đúng.", "Viết 1 đoạn retro ngắn."],
    acceptanceCriteria: [
      "Toàn bộ 4 bước trước chạy nối tiếp nhau không cần sửa tay giữa chừng.",
      "Retro nêu rõ: một prompt/commit nào hiệu quả nhất, một cái phải làm lại vì AI đi sai hướng.",
    ],
  },
  "lab-ch-3-1": {
    title: "LESS Search — Bước 1: Inception, chọn ý tưởng",
    goal: "Học Elixir song song với việc quyết định ý tưởng \"LESS search tool\" — công cụ tìm kiếm sẽ xây trong lab này.",
    requirements: ["Cài Elixir + Erlang/OTP.", "Viết 1 trang README mô tả ý tưởng sản phẩm bằng 3-5 câu."],
    acceptanceCriteria: [
      "`elixir -v` chạy được, môi trường sẵn sàng.",
      "README nêu rõ: search cái gì, cho ai, tiêu chí thành công là gì.",
    ],
  },
  "lab-ch-3-2": {
    title: "LESS Search — Bước 2: Shaping the Idea",
    goal: "Định hình ý tưởng thành các use case cụ thể trước khi code, dùng AI để brainstorm nhưng tự chốt quyết định.",
    requirements: ["Liệt kê tối thiểu 3 use case chính của công cụ tìm kiếm.", "Elixir project khởi tạo bằng `mix new`."],
    acceptanceCriteria: [
      "Có file mix.exs hợp lệ, project compile được (`mix compile`) dù chưa có tính năng.",
      "3 use case được viết dưới dạng \"given/when/then\" ngắn gọn.",
    ],
  },
  "lab-ch-3-3": {
    title: "LESS Search — Bước 3: Walking Skeleton",
    goal: "Dựng \"walking skeleton\" — đường đi xuyên suốt từ web UI tới logic tìm kiếm, dù còn rất thô sơ.",
    requirements: ["Phoenix (hoặc Plug thuần) phục vụ 1 trang web tối thiểu.", "1 route nhận query, trả kết quả cứng (hard-coded) để chứng minh luồng thông suốt."],
    acceptanceCriteria: [
      "Mở trình duyệt, nhập query, thấy kết quả (dù là dữ liệu giả) hiển thị ra — toàn bộ luồng UI → server → response hoạt động.",
      "Không có logic tìm kiếm thật ở bước này, chỉ chứng minh luồng.",
    ],
  },
  "lab-ch-3-4": {
    title: "LESS Search — Bước 4: Modeling the Domain",
    goal: "Thay dữ liệu giả bằng domain model thật — định nghĩa các struct/type Elixir cho tài liệu và kết quả tìm kiếm.",
    requirements: ["Định nghĩa struct cho Document và SearchResult bằng Elixir.", "Có ít nhất 1 module xử lý logic tìm kiếm thuần (không phụ thuộc web layer)."],
    acceptanceCriteria: [
      "Module tìm kiếm test được độc lập bằng ExUnit, không cần khởi động Phoenix server.",
      "Route ở bước 3 giờ gọi qua domain model thật thay vì dữ liệu cứng.",
    ],
  },
  "lab-ch-3-5": {
    title: "LESS Search — Bước 5: hoàn thiện Search UI",
    goal: "Hoàn thiện web UI — trải nghiệm tìm kiếm mượt, có xử lý trạng thái rỗng/lỗi.",
    requirements: ["UI có ô nhập + nút tìm kiếm + khu vực hiển thị kết quả.", "Xử lý rõ ràng 2 trạng thái: đang tìm kiếm, không có kết quả."],
    acceptanceCriteria: [
      "Query không khớp dữ liệu nào hiển thị thông báo rõ ràng, không phải màn hình trắng hoặc lỗi 500.",
      "Chạy `mix test` toàn bộ project pass.",
    ],
  },
  "lab-ch-4-1": {
    title: "Thêm test mới cho một thư viện Kotlin",
    goal: "Tái hiện video — chọn 1 thư viện/module Kotlin có sẵn (của bạn hoặc mã nguồn mở), dùng AI assistant viết thêm test cho phần chưa có coverage.",
    requirements: ["Một dự án Kotlin có sẵn (repo cá nhân hoặc clone 1 lib nhỏ).", "Đo coverage trước và sau khi thêm test."],
    acceptanceCriteria: [
      "Coverage tăng rõ rệt so với trước (ghi số % cụ thể).",
      "Toàn bộ test mới do AI viết đều được bạn đọc và hiểu trước khi commit — không commit mù.",
    ],
  },
  "lab-ch-4-2": {
    title: "Sửa 1 bug thật trong thư viện Kotlin bằng AI",
    goal: "Dùng AI assistant để định vị và sửa một bug có thật (hoặc bug bạn tự cấy vào) trong cùng thư viện ở Lab 4.1.",
    requirements: ["Viết 1 test tái hiện bug trước khi sửa (red).", "Prompt AI đề xuất fix, bạn review trước khi apply."],
    acceptanceCriteria: [
      "Test ở bước red giờ pass (green) sau khi fix.",
      "Ghi lại prompt đầu tiên AI đưa fix sai (nếu có) và bạn đã điều chỉnh prompt thế nào để ra fix đúng.",
    ],
  },
  "lab-ch-4-3": {
    title: "Thêm 1 tính năng mới cho thư viện Kotlin bằng AI",
    goal: "Dùng AI assistant thêm một tính năng nhỏ, có giá trị thật, vào thư viện Kotlin đang làm việc.",
    requirements: ["Tính năng phải có ít nhất 1 test mới đi kèm.", "Không phá vỡ test cũ đang pass."],
    acceptanceCriteria: [
      "Toàn bộ test suite (cũ + mới) pass sau khi thêm tính năng.",
      "Tính năng mới có docstring/comment giải thích mục đích, không chỉ code trần.",
    ],
  },
  "lab-ch-4-4": {
    title: "Sinh tài liệu cho một codebase lớn bằng AI",
    goal: "Dùng AI assistant sinh tài liệu (README hoặc docs/) cho một phần codebase lớn mà bạn chưa quen thuộc.",
    requirements: ["Chọn 1 module/thư mục có ít nhất 300 dòng code chưa có docs.", "Yêu cầu AI đọc code trước, không bịa tài liệu từ tên file."],
    acceptanceCriteria: [
      "Tài liệu sinh ra mô tả đúng ít nhất 3 hàm/API công khai thực tế trong module (kiểm tra chéo bằng tay).",
      "Chỉ ra ít nhất 1 chỗ AI mô tả sai hoặc bịa (hallucination) và cách bạn phát hiện ra.",
    ],
  },
  "lab-ch-4-5": {
    title: "Lập kế hoạch debug cho một vấn đề trong codebase lớn",
    goal: "Dùng AI assistant lập một debug plan có cấu trúc trước khi sửa, thay vì để AI tự do đoán mò trên codebase lớn.",
    requirements: ["Chọn 1 vấn đề/bug thật (hoặc giả lập) trong codebase lớn.", "Yêu cầu AI liệt kê giả thuyết, cách kiểm chứng từng giả thuyết, trước khi sửa code."],
    acceptanceCriteria: [
      "Có văn bản debug plan với ít nhất 3 giả thuyết được xếp hạng theo khả năng đúng.",
      "Chỉ sau khi giả thuyết được xác nhận bằng log/test mới cho AI sửa code — không sửa mò.",
    ],
  },
  "lab-ch-4-6": {
    title: "Sinh sơ đồ Mermaid tài liệu hoá kiến trúc",
    goal: "Dùng AI assistant sinh sơ đồ Mermaid (flowchart hoặc sequence diagram) mô tả một luồng thực trong codebase lớn.",
    requirements: ["Chọn 1 luồng nghiệp vụ cụ thể (ví dụ: luồng xử lý 1 request).", "Yêu cầu AI đọc code thực tế trước khi vẽ, không đoán."],
    acceptanceCriteria: [
      "Sơ đồ Mermaid render đúng cú pháp (paste vào mermaid.live không lỗi).",
      "Đối chiếu sơ đồ với code thật: mọi bước trong sơ đồ đều khớp với 1 đoạn code cụ thể, không có bước bịa.",
    ],
  },
};
