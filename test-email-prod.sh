#!/bin/bash
# Test email on production

if [ -z "$1" ]; then
  echo "Usage: ./test-email-prod.sh <production-url>"
  echo "Example: ./test-email-prod.sh https://thinie-farm.vercel.app"
  exit 1
fi

PROD_URL=$1

echo "🧪 Testing Email on Production: $PROD_URL"
echo ""

# Test Contact Form
echo "📨 Testing Contact Form..."
response=$(curl -s -X POST "$PROD_URL/api/contact" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Production Test",
    "email": "test@example.com",
    "phone": "0123456789",
    "message": "This is a test from production to check email notification"
  }')

echo "Response:"
echo "$response" | jq '.' 2>/dev/null || echo "$response"
echo ""

# Check if successful
if echo "$response" | grep -q '"success":true'; then
  echo "✅ Contact form submitted successfully!"
  echo "📧 Check your email: leonguyenpm@gmail.com"
  echo ""
  echo "If you don't receive email, check:"
  echo "1. Vercel environment variables"
  echo "2. Resend API key is valid"
  echo "3. Check Vercel function logs"
  echo "4. Check Resend dashboard: https://resend.com/emails"
else
  echo "❌ Contact form failed!"
  echo ""
  echo "Troubleshooting:"
  echo "1. Check Vercel logs"
  echo "2. Verify environment variables"
  echo "3. Check database RLS policies"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔍 To check Vercel logs:"
echo "👉 $PROD_URL/_logs"
echo "Or: Vercel Dashboard → Project → Functions → Logs"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
