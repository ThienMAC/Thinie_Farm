#!/bin/bash
# Test email functionality

echo "🧪 Testing Contact Form Email..."
echo ""

# Test Contact Form
response=$(curl -s -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "0123456789",
    "message": "This is a test message to check if email notification works properly."
  }')

echo "📨 Contact Form Response:"
echo "$response" | jq '.' 2>/dev/null || echo "$response"
echo ""

# Check dev server logs for email status
echo "📋 Check your terminal logs for:"
echo "  ✅ 'Email sent via Resend'"
echo "  ❌ 'Email notification failed'"
echo ""
echo "📧 Check your email: leonguyenpm@gmail.com"
echo ""
