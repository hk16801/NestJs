Middleware
  Chạy đầu tiên khi có request, xử lý các công việc như ghi log, gán user giả lập, hoặc kiểm tra token.
  Middleware gán user admin hoặc user bình thường dựa trên header x-user.
JWT
  Xác thực người dùng (Authentication).
  Kết hợp với Guard để bảo vệ các route cần đăng nhập.
Guard
  Kiểm tra quyền truy cập, xác minh xem user có được phép vào route hay không.
  RolesGuard kiểm tra req.user.role.
Interceptor
  Can thiệp trước/sau khi controller xử lý request.
  Log thời gian xử lý request.
Pipe
  Validate và xử lý dữ liệu gửi lên trước khi controller nhận.
  ValidationPipe kết hợp với class-validator trong DTOs.
  ValidationPipe tự động kiểm tra nếu dữ liệu không hợp lệ sẽ trả lỗi 400.
Logic trong App Module và Controller, Service
  App Module đăng ký Middleware, Guard, Interceptor, Pipe
  Controller nhận request đã qua xử lý trên, gọi Service để xử lý nghiệp vụ.
  Service thực hiện tạo, sửa, xóa user hoặc trả dữ liệu.
Exception Filter
  Bắt lỗi trong toàn bộ pipeline, log lỗi chi tiết và trả response chuẩn cho client.

Client gửi Request → Middleware → JWT Guard (xác thực) → RolesGuard (phân quyền)→ Pipe (Validate) → Controller → Service
→ Exception Filter (nếu lỗi) → Client
