# 🚀 Deployment Checklist - Thinie Farm

## ✅ Đã hoàn thành

- [x] Push code lên GitHub
- [x] Setup email notifications (Resend)
- [x] Test email notifications locally
- [x] Fix RLS policies trong Supabase
- [x] Commit tất cả changes

## 📋 Cần làm tiếp

### 1. Deploy lên Vercel

- [ ] Truy cập: https://vercel.com/new
- [ ] Import repository: ThienMAC/Thinie_Farm
- [ ] Thêm Environment Variables (7 biến):
  - [ ] NEXT_PUBLIC_SUPABASE_URL
  - [ ] NEXT_PUBLIC_SUPABASE_ANON_KEY
  - [ ] SUPABASE_SERVICE_ROLE_KEY
  - [ ] RESEND_API_KEY
  - [ ] RESEND_FROM_EMAIL
  - [ ] RESEND_TO_EMAIL
  - [ ] ADMIN_PASSWORD
- [ ] Click Deploy
- [ ] Đợi build hoàn tất

### 2. Verify Deployment

- [ ] Website live và load được
- [ ] Trang chủ hiển thị đúng
- [ ] Farm Diary pages hoạt động
- [ ] Guides pages hoạt động
- [ ] Contact form gửi được
- [ ] Email notification nhận được
- [ ] Subscribe form hoạt động
- [ ] Welcome email nhận được
- [ ] Admin login hoạt động (/admin/login)
- [ ] Admin dashboard hiển thị

### 3. Optional: Setup Custom Domain

- [ ] Mua domain (nếu chưa có)
- [ ] Add domain trong Vercel
- [ ] Cấu hình DNS records
- [ ] Đợi SSL certificate tự động

### 4. Post-Deployment Tasks

- [ ] Chạy sample data migration (002_sample_data.sql)
- [ ] Tạo nội dung mẫu qua Admin Panel
- [ ] Test tất cả features trên production
- [ ] Đổi ADMIN_PASSWORD thành mật khẩu mạnh
- [ ] Setup domain cho Resend (thay onboarding@resend.dev)

## 🔗 Important Links

- **GitHub Repo:** https://github.com/ThienMAC/Thinie_Farm
- **Vercel Deploy:** https://vercel.com/new
- **Supabase Dashboard:** https://supabase.com/dashboard/project/xfbswdiodxiwikohrdpz
- **Resend Dashboard:** https://resend.com/emails

## 📝 Environment Variables Summary

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xfbswdiodxiwikohrdpz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Email (Resend)
RESEND_API_KEY=re_7SBa693U_7UT33DMfy3L2ipZZUs9RRh71
RESEND_FROM_EMAIL=Thinie Farm <onboarding@resend.dev>
RESEND_TO_EMAIL=leonguyenpm@gmail.com

# Admin
ADMIN_PASSWORD=admin123
```

## 🎯 Success Criteria

Website được coi là deploy thành công khi:

1. ✅ Live URL hoạt động
2. ✅ Tất cả pages load không lỗi
3. ✅ Contact form gửi được và nhận email
4. ✅ Subscribe form hoạt động
5. ✅ Admin panel login được
6. ✅ Có thể tạo/edit content qua admin

## 🐛 Troubleshooting

Nếu gặp lỗi:

1. **Build failed:** Check logs trong Vercel
2. **Database error:** Verify Supabase credentials
3. **Email không gửi:** Check Resend API key
4. **404 errors:** Clear cache và redeploy
5. **Admin không login được:** Check ADMIN_PASSWORD

## 📞 Next Steps After Deployment

1. Share URL với team/khách hàng
2. Monitor analytics trong Vercel
3. Check email notifications thường xuyên
4. Tạo content định kỳ
5. Backup database thường xuyên

---

**Status:** Ready to deploy! 🚀
**Last Updated:** 2026-02-08
