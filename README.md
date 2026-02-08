# 🌱 Thinie Farm - Website Nhật Ký Trồng Rau

Website ghi lại hành trình trồng rau sạch từ con số 0 - kết quả thật, không màu mè.

## 📖 Giới thiệu

Thinie Farm là dự án cá nhân về trồng rau sạch với mô hình hiện đại. Website này ghi lại toàn bộ quá trình từ gieo hạt đến thu hoạch, chia sẻ kinh nghiệm và kết quả thật.

## �� Mục đích

- ✅ Ghi lại nhật ký gieo trồng chi tiết
- ✅ Chia sẻ kinh nghiệm cho người mới
- ✅ Minh bạch quy trình và kết quả
- ✅ Xây dựng niềm tin qua hành trình thật

## 🏗️ Công nghệ sử dụng

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Content:** MDX (Markdown + JSX)
- **Deployment:** Vercel (recommended)

## 🚀 Cài đặt và chạy

### 1. Cài đặt dependencies

\`\`\`bash
npm install
\`\`\`

### 2. Chạy development server

\`\`\`bash
npm run dev
\`\`\`

Mở [http://localhost:3000](http://localhost:3000) để xem kết quả.

### 3. Build cho production

\`\`\`bash
npm run build
npm start
\`\`\`

## 📁 Cấu trúc website

- **/** - Trang chủ (Hero, giới thiệu dự án, nhật ký mới nhất)
- **/farm-diary** - Nhật ký gieo trồng (quan trọng nhất!)
- **/weekly-harvest** - Sản phẩm rau theo tuần
- **/guides** - Kinh nghiệm trồng rau
- **/about** - Câu chuyện dự án
- **/contact** - Liên hệ

## 📝 Cách thêm nhật ký mới

Tạo file mới trong \`src/content/farm-diary/\`:

\`\`\`mdx
---
title: "Lần X - Tên rau - Kết quả sau Y ngày"
date: "2026-02-07"
startDate: "2026-01-23"
howToPlant: "Cách gieo hạt"
howToWater: "Cách tưới nước"
survivalRate: 75
daysToHarvest: 15
excerpt: "Mô tả ngắn gọn"
images:
  - "/images/farm-diary/image1.jpg"
lessons:
  - "Bài học 1"
  - "Bài học 2"
---

## Nội dung nhật ký ở đây...
\`\`\`

## 🎨 Features

✅ Responsive design (mobile, tablet, desktop)
✅ MDX support cho blog posts
✅ Image optimization
✅ SEO friendly
✅ Fast performance với Next.js
✅ TypeScript cho type safety

## 📧 Liên hệ

- **Email:** contact@thiniefarm.com
- **Zalo:** 0123456789

---

**Made with ❤️ and 🌱 by Thinie Farm**
