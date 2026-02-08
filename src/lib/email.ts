// Email service for sending notifications
import { Resend } from 'resend';
import nodemailer from 'nodemailer';

// Option 1: Using Resend (Recommended)
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Option 2: Using Nodemailer with Gmail
const gmailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD, // Use App Password, not regular password
  },
});

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

/**
 * Send email notification when contact form is submitted
 * Uses Resend if configured, falls back to Gmail
 */
export async function sendContactNotification(data: ContactFormData) {
  const { name, email, phone, message } = data;
  
  const emailContent = {
    subject: `🌱 Liên hệ mới từ ${name} - Thinie Farm`,
    text: `
Bạn có liên hệ mới từ website Thinie Farm!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 THÔNG TIN LIÊN HỆ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 Tên: ${name}
📧 Email: ${email}
📱 Số điện thoại: ${phone || 'Không có'}

💬 Nội dung:
${message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Trả lời ngay: ${email}
${phone ? `Gọi điện: ${phone}` : ''}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `,
    html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #22c55e 0%, #10b981 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
    .info-row { margin: 15px 0; padding: 15px; background: white; border-left: 4px solid #22c55e; border-radius: 5px; }
    .label { font-weight: bold; color: #16a34a; margin-bottom: 5px; }
    .value { color: #374151; }
    .message-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #e5e7eb; }
    .footer { background: #374151; color: white; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; }
    .button { display: inline-block; background: #22c55e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 5px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🌱 Thinie Farm</h1>
      <p style="margin: 0; font-size: 18px;">Liên hệ mới từ website</p>
    </div>
    
    <div class="content">
      <h2 style="color: #16a34a; margin-top: 0;">Thông tin liên hệ</h2>
      
      <div class="info-row">
        <div class="label">👤 Họ tên</div>
        <div class="value">${name}</div>
      </div>
      
      <div class="info-row">
        <div class="label">📧 Email</div>
        <div class="value"><a href="mailto:${email}">${email}</a></div>
      </div>
      
      ${phone ? `
      <div class="info-row">
        <div class="label">📱 Số điện thoại</div>
        <div class="value"><a href="tel:${phone}">${phone}</a></div>
      </div>
      ` : ''}
      
      <div class="message-box">
        <div class="label">💬 Nội dung tin nhắn</div>
        <div class="value" style="margin-top: 10px; white-space: pre-wrap;">${message}</div>
      </div>
      
      <div style="text-align: center; margin-top: 30px;">
        <a href="mailto:${email}" class="button">📧 Trả lời qua Email</a>
        ${phone ? `<a href="tel:${phone}" class="button">📱 Gọi điện</a>` : ''}
      </div>
    </div>
    
    <div class="footer">
      <p style="margin: 0;">Thinie Farm - Nhật ký nông trại</p>
      <p style="margin: 5px 0 0 0; font-size: 14px; opacity: 0.8;">Email này được gửi tự động từ hệ thống</p>
    </div>
  </div>
</body>
</html>
    `,
  };

  try {
    // Try Resend first (if configured)
    if (resend && process.env.RESEND_FROM_EMAIL && process.env.RESEND_TO_EMAIL) {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL,
        to: process.env.RESEND_TO_EMAIL,
        subject: emailContent.subject,
        html: emailContent.html,
      });
      console.log('✅ Email sent via Resend');
      return { success: true, method: 'resend' };
    }
    
    // Fallback to Gmail (if configured)
    if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
      await gmailTransporter.sendMail({
        from: process.env.GMAIL_USER,
        to: process.env.GMAIL_USER, // Send to yourself
        replyTo: email, // Allow direct reply to customer
        subject: emailContent.subject,
        text: emailContent.text,
        html: emailContent.html,
      });
      console.log('✅ Email sent via Gmail');
      return { success: true, method: 'gmail' };
    }

    // No email service configured
    console.warn('⚠️ No email service configured. Email notification not sent.');
    return { success: false, error: 'No email service configured' };

  } catch (error) {
    console.error('❌ Failed to send email:', error);
    return { success: false, error: String(error) };
  }
}

/**
 * Send welcome email to new subscriber
 */
export async function sendWelcomeEmail(email: string) {
  const emailContent = {
    subject: '🌱 Chào mừng bạn đến với Thinie Farm!',
    html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #22c55e 0%, #10b981 100%); color: white; padding: 40px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: white; padding: 40px; border: 1px solid #e5e7eb; border-top: none; }
    .footer { background: #f9fafb; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; border: 1px solid #e5e7eb; border-top: none; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0; font-size: 32px;">🌱</h1>
      <h2 style="margin: 10px 0 0 0;">Chào mừng đến với Thinie Farm!</h2>
    </div>
    
    <div class="content">
      <p style="font-size: 18px; margin-top: 0;">Xin chào! 👋</p>
      
      <p>Cảm ơn bạn đã đăng ký nhận thông tin từ <strong>Thinie Farm</strong>!</p>
      
      <p>Chúng tôi sẽ thường xuyên chia sẻ với bạn:</p>
      <ul>
        <li>📔 Nhật ký trồng trọt mới nhất</li>
        <li>🌿 Hướng dẫn chăm sóc cây trồng</li>
        <li>📊 Thông tin thu hoạch hàng tuần</li>
        <li>💡 Mẹo vặt làm vườn</li>
      </ul>
      
      <p>Hãy ghé thăm website để xem các bài viết mới nhất nhé!</p>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}" 
           style="display: inline-block; background: #22c55e; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: bold;">
          Khám phá Thinie Farm
        </a>
      </div>
    </div>
    
    <div class="footer">
      <p style="margin: 0; color: #6b7280; font-size: 14px;">
        Bạn nhận được email này vì đã đăng ký nhận thông tin từ Thinie Farm
      </p>
    </div>
  </div>
</body>
</html>
    `,
  };

  try {
    if (resend && process.env.RESEND_FROM_EMAIL) {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL,
        to: email,
        subject: emailContent.subject,
        html: emailContent.html,
      });
      return { success: true };
    }

    if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
      await gmailTransporter.sendMail({
        from: process.env.GMAIL_USER,
        to: email,
        subject: emailContent.subject,
        html: emailContent.html,
      });
      return { success: true };
    }

    return { success: false, error: 'No email service configured' };
  } catch (error) {
    console.error('❌ Failed to send welcome email:', error);
    return { success: false, error: String(error) };
  }
}
