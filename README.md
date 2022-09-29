# RESPTEST

Coding theo references được viết trong bài word

## Sơ qua về source

### Dependencies chính:
- bcrypt
- cors
- dotenv
- express
- jsonwebtoken
- knex
- nodemon

### Cấu trúc - Dựa vào MVC
- auth: dùng để xác thực người dùng
- middleware: các service như connect knex, logger
- modules: source phân mọi table tương ứng mỗi module
  - controller
  - route
  - schema
  - service
- utils: các util hỗ trợ, xử lý khi thực hiện service

## APIS
- **Tokens**:
  - `/v1/tokens/all` (GET): trả về một dataset của tokens
  - `/v1/tokens/find/:id` (GET): trả về một token theo id
  - `/v1/tokens/add` (POST): thêm token vào table
  - `/v1/tokens/find/user` (POST): trả về user theo token
  - `/v1/tokens/update/:id` (PUT): cập nhật token theo id
  - `/v1/tokens/delete/:id` (DELETE): xóa token theo id

- **Users**:
  - `/v1/users/all` (GET): trả về một dataset của users
  - `/v1/users/find/:id` (GET): trả về một user theo id
  - `/v1/users/add` (POST): thêm user vào table
  - `/v1/users/find/user` (POST): trả về user theo user
  - `/v1/users/sign-up` (POST): đăng ký account
  - `/v1/users/sign-in` (POST): đăng nhập account -> trả về token
  - `/v1/users/sign-out` (POST): đăng xuất 
  - `/v1/users/refresh-token` (POST): Sử dụng refresh token để tạo mới access token
  - `/v1/users/update/:id` (PUT): cập nhật user theo id
  - `/v1/users/delete/:id` (DELETE): xóa user theo id

**Note:** 
- Vì vấn đề thời gian nên không thể triển khai `swagger` đê có view tốt hơn.
- Source này được clone từ source có sẵn (từng được build trước đây) nên sẽ có các api không được đề cập như CRUD và find by id.

## Trước khi chạy chương trình
- `npm install` hoặc `npm i`
- đổi file `.env.example` -> `.env`

## Chạy
- `npm run dev`: `nodemon index.js`

**Note**: Hiện mỗi apis (trừ signup và sign in) đang yêu cầu authorization là Bearer Token, bộ source đang tổ chức Sign up có account -> Sign in để có access token -> gán access token vào Bearer Token Type ở mỗi collections (users, tokens) và thực hiện các API như bình thường.

## Chạy api với postman
Import link postman
- URL: `https://www.getpostman.com/collections/a5b2ffa49bc382cb5929`


## Khó khăn
- Trong quá trình coding, thư viện knex chưa có khái niệm nên vừa học vừa làm code sẽ chưa đảm bảo về khoảng tối ưu
