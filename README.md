# RESPTEST

Coding theo references được viết trong bài word


## Trước khi chạy chương trình

- đổi file `.env.example` -> `.env`


## Chạy

- `npm run dev`: `nodemon index.js`


## Cấu trúc - Dựa vào MVC
- auth: dùng để xác thực người dùng
- middleware: các service như connect knex, logger
- modules: source phân mọi table tương ứng mỗi module
  - controller
  - route
  - schema
  - service
- utils: các util hỗ trợ, xử lý trước khi thực hiện service

# Sử dụng postman
Import link postman
- URL: `https://www.getpostman.com/collections/a5b2ffa49bc382cb5929`


# Vấn đề chưa giải quyết được
- Sử dụng express-jwt
  - **Thay thế**: tham khảo được `express-jwt` sử dụng `jsonwebtoken` nên sử dụng trực tiếp thư viện này