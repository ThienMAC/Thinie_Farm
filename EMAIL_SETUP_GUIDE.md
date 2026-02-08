# 📧 Hướng Dẫn Setup Email Notifications

## 🎯 Tổng Quan

Khi có người:
- ✉️ Gửi form liên hệ → Bạn nhận email thông báo
- 📝 Đăng ký subscribe → Họ nhận email chào mừng

Có 2 cách setup:

## ✅ Cách 1: Dùng Resend (Khuyên dùng)

### Ưu điểm:
- ✅ Miễn phí 3,000 emails/tháng
- ✅ Không cần App Password
- ✅ Deliverability cao hơn Gmail
- ✅ Dashboard theo dõi emails

### Setup:

#### Bước 1: Tạo tài khoản Resend
1. Truy cập: https://resend.com/signup
2. Đăng ký với email của bạn
3. Verify email

#### Bước 2: Lấy API Key
1. Vào: https://resend.com/api-keys
2. Click **"Create API Key"**
3. Name: `Thinie Farm`
4. Permission: **Full Access**
5. Copy API key (chỉ hiện 1 lần!)

#### Bước 3: Thêm Domain (hoặc dùng onboarding.resend.dev)
1. Vào: https://resend.com/domains
2. Click **"Add Domain"**
3. Nhập domain của bạn (vd: `thiniefarm.com`)
4. Verify domain bằng DNS records
5. Hoặc dùng domain test: `onboarding.resend.dev`

#### Bước 4: Cấu hình Environment Variables

Thêm vào `.env.local`:

```bash
# Resend Email Service
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=Thinie Farm <noreply@yourdomain.com>
RESEND_TO_EMAIL=your-email@gmail.com

# (Hoặc dùng onboarding domain để test)
# RESEND_FROM_EMAIL=Thinie Farm <onboarding@resend.dev>
```

#### Bước 5: Deploy lên Vercel

Thêm environment variables trong Vercel:
1. Vào: https://vercel.com/dashboard
2. Chọn project **Thinie_Farm**
3. Settings → Environment Variables
4. Thêm 3 biến:
   - `RESEND_API_KEY`
   - `RESEND_FROM_EMAIL`
   - `RESEND_TO_EMAIL`
5. Redeploy

✅ **Xong!** Test bằng cách gửi form liên hệ

---

## ⚙️ Cách 2: Dùng Gmail SMTP

### Ưu điểm:
- ✅ Miễn phí hoàn toàn
- ✅ Dùng Gmail có sẵn
- ✅ Không cần đăng ký service mới

### Setup:

#### Bước 1: Bật 2-Step Verification
1. Vào: https://myaccount.google.com/security
2. Tìm **"2-Step Verification"**
3. Click **"Get Started"**
4. Làm theo hướng dẫn

#### Bước 2: Tạo App Password
1. Vào: https://myaccount.google.com/apppasswords
2. Click **"Select app"** → Chọn **"Mail"**
3. Click **"Select device"** → Chọn **"Other"**
4. Nhập: `Thinie Farm`
5. Click **"Generate"**
6. Copy mật khẩu 16 ký tự (vd: `abcd efgh ijkl mnop`)

#### Bước 3: Cấu hình Environment Variables

Thêm vào `.env.local`:

```bash
# Gmail SMTP
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=abcdefghijklmnop
```

**Lưu ý:** 
- KHÔNG dùng mật khẩu Gmail thường
- Phải dùng App Password (16 ký tự không có khoảng trắng)

#### Bước 4: Deploy lên Vercel

Thêm environment variables trong Vercel:
1. Vào: https://vercel.com/dashboard
2. Chọn project **Thinie_Farm**
3. Settings → Environment Variables
4. Thêm 2 biến:
   - `GMAIL_USER`
   - `GMAIL_APP_PASSWORD`
5. Redeploy

✅ **Xong!** Email sẽ được gửi từ Gmail của bạn

---

## 🧪 Test Email Locally

### Test Contact Form:

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "0123456789",
    "message": "This is a test message"
  }'
```

Kiểm tra terminal logs:
- ✅ `Email sent via Resend` (nếu dùng Resend)
- ✅ `Email sent via Gmail` (nếu dùng Gmail)
- ⚠️ `No email service configured` (nếu chưa setup)

### Test Subscribe Form:

```bash
curl -X POST http://localhost:3000/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com"
  }'
```

Subscriber sẽ nhận email chào mừng!

---

## 📨 Email Templates

### 1. Contact Notification (Gửi cho bạn)

**Subject:** 🌱 Liên hệ mới từ [Name] - Thinie Farm

**Nội dung:**
- Thông tin người liên hệ (Tên, Email, Phone)
- Nội dung tin nhắn
- Buttons: Trả lời Email, Gọi điện

### 2. Welcome Email (Gửi cho subscriber)

**Subject:** 🌱 Chào mừng bạn đến với Thinie Farm!

**Nội dung:**
- Lời chào mừng
- Giới thiệu nội dung sẽ nhận
- Button: Khám phá website

---

## 🔧 Troubleshooting

### Không nhận được email?

#### 1. Kiểm tra logs
```bash
# Local dev server logs sẽ hiển thị:
✅ Email sent via Resend
hoặc
✅ Email sent via Gmail
hoặc
⚠️ No email service configured
```

#### 2. Kiểm tra spam folder
- Gmail thường đưa email tự động vào spam
- Đánh dấu "Not spam" và thêm vào whitelist

#### 3. Kiểm tra Resend Dashboard
- Vào: https://resend.com/emails
- Xem email đã được gửi chưa
- Check delivery status

#### 4. Kiểm tra environment variables
```bash
# Local
cat .env.local | grep -E "RESEND|GMAIL"

# Vercel
vercel env ls
```

### Lỗi "Authentication failed" (Gmail)

**Nguyên nhân:** App Password không đúng

**Giải pháp:**
1. Tạo lại App Password mới
2. Copy đúng 16 ký tự (không khoảng trắng)
3. Update `.env.local`
4. Restart dev server

### Lỗi "Invalid API key" (Resend)

**Nguyên nhân:** API key không đúng hoặc đã bị revoke

**Giải pháp:**
1. Vào https://resend.com/api-keys
2. Tạo API key mới
3. Update `.env.local`
4. Restart dev server

---

## 🚀 Production Checklist

Trước khi deploy production:

- [ ] Đã chọn Resend hoặc Gmail
- [ ] Đã thêm environment variables trong Vercel
- [ ] Đã test gửi email thành công locally
- [ ] Đã verify domain (nếu dùng Resend)
- [ ] Đã đổi `ADMIN_PASSWORD` thành password mạnh
- [ ] Đã test form contact trên production
- [ ] Đã test subscribe form trên production
- [ ] Đã kiểm tra email không vào spam

---

## 💡 Best Practices

1. **Resend cho Production**
   - Deliverability tốt hơn
   - Analytics chi tiết
   - Không bị rate limit như Gmail

2. **Gmail cho Development**
   - Nhanh, đơn giản
   - Không cần verify domain
   - Free hoàn toàn

3. **Email Non-blocking**
   - Email được gửi async
   - Không làm chậm API response
   - Nếu email fail, form vẫn submit thành công

4. **Privacy**
   - Không commit API keys vào Git
   - Dùng environment variables
   - `.env.local` đã có trong `.gitignore`

---

## 📊 Resend Pricing

| Plan | Price | Emails/month | Features |
|------|-------|--------------|----------|
| **Free** | $0 | 3,000 | ✅ Perfect cho bắt đầu |
| **Pro** | $20 | 50,000 | Analytics, Custom domains |
| **Business** | $100 | 500,000 | Priority support, SLA |

Với website nhỏ như Thinie Farm, **Free plan là đủ**!

---

## 🎉 Hoàn Tất!

Bây giờ khi có người liên hệ, bạn sẽ nhận email thông báo ngay! 📧

Còn thắc mắc gì không?
