# 🚀 Hướng Dẫn Deploy Thinie Farm lên Vercel

## 📋 Yêu Cầu Trước Khi Deploy

- [x] Code đã được push lên GitHub: `https://github.com/ThienMAC/Thinie_Farm`
- [x] Đã có tài khoản Supabase với database đã setup
- [ ] Có tài khoản Vercel (đăng ký tại: https://vercel.com)

## 🎯 Các Bước Deploy

### Bước 1: Import Project từ GitHub

1. Truy cập: **https://vercel.com/new**
2. Click **"Import Git Repository"**
3. Chọn repository: **`ThienMAC/Thinie_Farm`**
4. Click **"Import"**

### Bước 2: Cấu Hình Environment Variables

Trong phần **Environment Variables**, thêm các biến sau:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xfbswdiodxiwikohrdpz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhmYnN3ZGlvZHhpd2lrb2hyZHB6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0NzM1NjAsImV4cCI6MjA4NjA0OTU2MH0.WmMaUITd3CG_fg_LCzxUZJS-nE-Hs6Qy8KYz1shnShQ
SUPABASE_SERVICE_ROLE_KEY=[Lấy từ Supabase Dashboard]
ADMIN_PASSWORD=admin123
```

**Lưu ý:** 
- Copy `SUPABASE_SERVICE_ROLE_KEY` từ: https://supabase.com/dashboard/project/xfbswdiodxiwikohrdpz/settings/api
- Đổi `ADMIN_PASSWORD` thành mật khẩu mạnh hơn

### Bước 3: Cấu Hình Build Settings

Vercel sẽ tự động nhận diện Next.js project, các setting mặc định:

- **Framework Preset:** Next.js
- **Build Command:** `npm run build`
- **Output Directory:** `.next`
- **Install Command:** `npm install`

→ Giữ nguyên, không cần thay đổi

### Bước 4: Deploy

1. Click **"Deploy"**
2. Đợi 2-3 phút để Vercel build và deploy
3. Khi hoàn tất, bạn sẽ thấy:
   - ✅ Deployment successful
   - 🌐 URL production: `https://thinie-farm.vercel.app`

### Bước 5: Setup Domain (Tùy chọn)

Nếu bạn có domain riêng:

1. Vào **Settings** → **Domains**
2. Add domain của bạn (vd: `thiniefarm.com`)
3. Cấu hình DNS theo hướng dẫn của Vercel

## 🔧 Sau Khi Deploy

### Kiểm Tra Website

1. Truy cập URL production
2. Test các chức năng:
   - ✅ Trang chủ load được
   - ✅ Farm Diary list và detail pages
   - ✅ Guides list và detail pages
   - ✅ Contact form gửi được
   - ✅ Subscribe form hoạt động
   - ✅ Admin login: `https://your-url.vercel.app/admin/login`

### Setup Database (Nếu chưa có data)

1. Vào Supabase SQL Editor
2. Chạy file migration: `supabase/migrations/002_sample_data.sql`
3. Verify data đã được tạo trong Tables

### Cấu Hình Analytics (Tùy chọn)

Vercel tự động cung cấp:
- **Web Analytics** - Miễn phí
- **Speed Insights** - Miễn phí

Bật trong: **Settings** → **Analytics**

## 🔄 Deploy Tự Động

Mỗi khi bạn push code mới lên GitHub:
1. Vercel tự động phát hiện thay đổi
2. Build và deploy version mới
3. Production URL tự động cập nhật

## 🐛 Troubleshooting

### Lỗi Build Failed

**Nguyên nhân:** Thiếu environment variables

**Giải pháp:**
1. Vào **Settings** → **Environment Variables**
2. Kiểm tra đã thêm đủ các biến
3. Click **Redeploy** để deploy lại

### Lỗi Database Connection

**Nguyên nhân:** Supabase keys không đúng

**Giải pháp:**
1. Kiểm tra lại keys từ Supabase Dashboard
2. Update environment variables trong Vercel
3. Redeploy

### Lỗi 404 trên các trang

**Nguyên nhân:** Database chưa có data

**Giải pháp:**
1. Chạy migration `002_sample_data.sql` trong Supabase
2. Hoặc tạo content mới qua Admin Panel

## 📱 URL Quan Trọng

- **Production:** https://thinie-farm.vercel.app (sau khi deploy)
- **Admin Panel:** https://thinie-farm.vercel.app/admin/login
- **Vercel Dashboard:** https://vercel.com/dashboard
- **Supabase Dashboard:** https://supabase.com/dashboard/project/xfbswdiodxiwikohrdpz

## 🎉 Hoàn Tất!

Website của bạn đã live! 🚀

- ✅ Tự động deploy khi push code
- ✅ SSL certificate miễn phí
- ✅ CDN toàn cầu
- ✅ Analytics và monitoring
