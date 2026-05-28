# Flutterwave Setup Guide for QuickBite

This guide walks you through setting up Flutterwave for payment processing in the QuickBite MVP.

---

## Prerequisites

- A Flutterwave account (sign up at https://flutterwave.com)
- Nigerian business bank account (for settlements)
- Registered business (CAC) - optional for testing, required for live mode
- Access to the QuickBite repository

---

## Step 1: Create a Flutterwave Account

1. Go to https://flutterwave.com and click **Sign Up**
2. Select **Merchant Account** (for receiving payments)
3. Fill in your details:
   - Business name
   - Business email
   - Phone number
   - Business type
4. Verify your email

---

## Step 2: Get Your API Keys

1. Log in to your Flutterwave dashboard at https://dashboard.flutterwave.com
2. Go to **Settings** → **API Keys**
3. Copy the following:
   - **Public Key**: `FLWPUBK-...` (use in frontend)
   - **Secret Key**: `FLWSECK-...` (server-side only, never expose)
   - **Encryption Key**: `...` (for payment verification)

4. Add to your `.env.local` file:
   ```bash
   NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY=FLWPUBK-xxxxxxxxxxxxxxxxxxxxxxxx
   FLUTTERWAVE_SECRET_KEY=FLWSECK-xxxxxxxxxxxxxxxxxxxxxxxx
   FLUTTERWAVE_ENCRYPTION_KEY=xxxxxxxxxxxxxxxxxxxxxxxx
   ```

---

## Step 3: Configure Your Website URL

1. Go to **Settings** → **General**
2. Under **Website URL**, add:
   - Development: `http://localhost:3000`
   - Production: `https://dulcet-panda-80d15a.netlify.app`

---

## Step 4: Set Up Webhook URL

Flutterwave will send payment notifications to this URL.

1. Go to **Settings** → **Webhooks**
2. Add your webhook endpoint:
   ```
   https://dulcet-panda-80d15a.netlify.app/api/webhooks/flutterwave
   ```

3. Select these events to receive:
   - [x] Payment completed
   - [x] Payment failed
   - [x] Refund initiated
   - [x] Refund completed

4. For local testing, use ngrok:
   ```bash
   ngrok http 3000
   # Use the https:// URL provided by ngrok for webhook
   ```

---

## Step 5: Configure Payment Methods

1. Go to **Settings** → **Payment Methods**
2. Enable the payment methods your users will need:

| Method | Required for MVP |
|--------|------------------|
| Card (Visa, Mastercard, Verve) | ✅ Yes |
| USSD (GTBank, First Bank, etc.) | ✅ Yes (critical for feature phones) |
| Bank Transfer | ⚠️ Optional |
| Opay Wallet | ⚠️ Optional |
| PalmPay | ⚠️ Optional |
| Moniepoint | ⚠️ Optional |

3. For USSD to work, ensure:
   - Your business is verified
   - You have a Nigerian bank account connected

---

## Step 6: Test the Integration

### Using Flutterwave Test Mode

1. In your Flutterwave dashboard, toggle **Test Mode** (top right)
2. Use test cards:
   - **Success**: `5531880000000000`, any future date, any CVV
   - **Decline**: `5531880000000002`, any future date, any CVV
3. Test USSD with any USSD code (will simulate success)

### Test Your Integration

```bash
# In the frontend directory
cd /root/workspace/quickbite/frontend

# Start development server
npm run dev

# Visit http://localhost:3000
# Navigate to checkout and test payment flow
```

---

## Step 7: Go Live Checklist

Before switching to production:

- [x] Test mode payments work end-to-end
- [x] Webhook is receiving events
- [x] Business is verified (CAC documents uploaded)
- [x] Bank account is connected for settlements
- [x] All payment methods are enabled
- [x] Public key updated in production environment

---

## Environment Variables Reference

| Variable | Description | Where to get it |
|----------|-------------|-----------------|
| `NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY` | Frontend API key | Dashboard → Settings → API Keys |
| `FLUTTERWAVE_SECRET_KEY` | Server-side API key | Dashboard → Settings → API Keys |
| `FLUTTERWAVE_ENCRYPTION_KEY` | Payment encryption key | Dashboard → Settings → API Keys |

---

## Flutterwave Integration Flow

QuickBite uses the following flow for payments:

```
1. User clicks "Place Order"
   ↓
2. Frontend calls /api/orders to create pending order
   ↓
3. Backend calls Flutterwave API to get transaction reference
   ↓
4. Frontend shows Flutterwave inline widget (card/USSD/wallet)
   ↓
5. User completes payment on Flutterwave
   ↓
6. Flutterwave redirects to /order-success?tx_ref=xxx
   ↓
7. Webhook sends payment.completed event to /api/webhooks/flutterwave
   ↓
8. Backend verifies and updates order status to "paid"
   ↓
9. Frontend polls order status and shows confirmation
```

---

## Webhook Security

Always verify webhook signatures:

```typescript
// In your webhook handler
import crypto from 'crypto';

function verifyWebhookSignature(payload: any, signature: string, secret: string): boolean {
  const hash = crypto.createHmac('sha256', secret).update(JSON.stringify(payload)).digest('hex');
  return hash === signature;
}
```

---

## Troubleshooting

### Payment widget not loading
- Check your Public Key is correct
- Ensure your website URL is configured in Flutterwave dashboard

### Webhook not receiving events
- Use https://webhook.site/ to test webhook delivery
- Check Flutterwave dashboard for failed webhook attempts
- Ensure your server is accessible (not blocked by firewall)

### USSD payments not working
- USSD requires business verification
- Check that you have a Nigerian bank account connected
- Test in live mode (test mode USSD has limitations)

### Payment shows as "pending"
- This usually means the webhook hasn't been received
- Check webhook URL is correct and accessible
- Verify webhook signature check isn't rejecting valid requests

---

## Rate Limits & Fees

| Aspect | Details |
|--------|---------|
| Transaction fee | 1.5% per successful transaction (capped at N200) |
| Settlement | Same day or next day to your bank account |
| Minimum payout | No minimum |
| Refund fee | Free for disputes |

---

## Next Steps

After setting up Flutterwave:

1. Update your `.env.local` with all Flutterwave keys
2. Test the payment flow end-to-end
3. Configure your production webhook URL
4. Review the LAUNCH_CHECKLIST.md before going live