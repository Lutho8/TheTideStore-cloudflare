# Ride The Tide — Deployment Guide

Complete step-by-step to deploy the Direct Peptides clone to Cloudflare.

---

## Prerequisites

- Node.js 18+ installed
- Cloudflare account (free tier works)
- `wrangler` CLI installed globally: `npm install -g wrangler`
- Logged into wrangler: `npx wrangler login`

---

## Step 1: Create Cloudflare Resources

### 1.1 Create D1 Database

```bash
npx wrangler d1 create thetide-db
```

Copy the `database_id` from the output and paste it into `worker/wrangler.toml`:

```toml
[[d1_databases]]
binding = "DB"
database_name = "thetide-db"
database_id = "YOUR_ACTUAL_D1_ID_HERE"
```

### 1.2 Create R2 Buckets

```bash
npx wrangler r2 bucket create thetide-coas
npx wrangler r2 bucket create thetide-images
```

### 1.3 Create KV Namespace

```bash
npx wrangler kv namespace create "SESSIONS"
```

Copy the `id` from the output and paste it into `worker/wrangler.toml`:

```toml
[[kv_namespaces]]
binding = "SESSIONS"
id = "YOUR_ACTUAL_KV_ID_HERE"
```

---

## Step 2: Deploy the Worker (API)

```bash
cd worker
npm install
npx wrangler deploy
```

Your API will be deployed to: `https://thetide-api.YOUR_SUBDOMAIN.workers.dev`

---

## Step 3: Seed the Database

```bash
npx wrangler d1 execute thetide-db --file=../database/schema.sql
npx wrangler d1 execute thetide-db --file=../database/seed.sql
```

Verify:

```bash
npx wrangler d1 execute thetide-db --command="SELECT COUNT(*) as products FROM products"
```

Should return `30`.

---

## Step 4: Set Secrets (DO NOT put these in wrangler.toml)

```bash
cd worker

# Generate a strong JWT secret (32+ chars)
# Use: openssl rand -base64 32
npx wrangler secret put JWT_SECRET

# NowPayments API Key (get from https://account.nowpayments.io)
npx wrangler secret put NOWPAYMENTS_API_KEY

# Stripe Secret Key (optional — for card payments)
npx wrangler secret put STRIPE_SECRET_KEY

# WhatsApp Business API (Meta Developers — see Step 6)
npx wrangler secret put WHATSAPP_API_KEY
npx wrangler secret put WHATSAPP_PHONE_ID

# Twilio SMS Fallback (optional)
npx wrangler secret put TWILIO_SID
npx wrangler secret put TWILIO_TOKEN
npx wrangler secret put TWILIO_PHONE
```

---

## Step 5: Build & Deploy Frontend (Cloudflare Pages)

### 5.1 Build

```bash
cd frontend
npm install
npm run build
```

### 5.2 Deploy to Pages

```bash
npx wrangler pages deploy dist --project-name=thetide-store
```

Or connect GitHub repo to Cloudflare Pages for auto-deploy on push:

1. Go to [Cloudflare Dashboard → Pages](https://dash.cloudflare.com)
2. Click "Create a project" → "Connect to Git"
3. Select `Lutho8/TheTideStore-cloudflare`
4. Build settings:
   - **Build command:** `cd frontend && npm install && npm run build`
   - **Build output directory:** `frontend/dist`
   - **Root directory:** `/`
5. Add environment variable: `VITE_API_URL = https://thetide-api.YOUR_SUBDOMAIN.workers.dev`

---

## Step 6: Configure WhatsApp Business API (+49 162 4747159)

### 6.1 Create Meta Business Account

1. Go to [business.facebook.com](https://business.facebook.com)
2. Create a Business Account
3. Add your phone number: **+49 162 4747159**

### 6.2 Set Up WhatsApp Business API

1. Go to [developers.facebook.com](https://developers.facebook.com)
2. Create a new app → Business type
3. Add WhatsApp product to your app
4. Verify your phone number (+49 162 4747159) via SMS
5. Get your **Phone Number ID** and **Access Token**

### 6.3 Create OTP Message Template

1. In WhatsApp Manager, go to **Account tools → Message templates**
2. Click **Create template**
3. Category: Authentication
4. Name: `ride_the_tide_otp`
5. Language: English
6. Body:
   ```
   Your Ride The Tide verification code is: {{1}}. Valid for 10 minutes.
   ```
7. Submit for review (usually approved within minutes for authentication templates)

### 6.4 Set Secrets in Worker

```bash
cd worker
npx wrangler secret put WHATSAPP_API_KEY    # Paste your Meta access token
npx wrangler secret put WHATSAPP_PHONE_ID   # Paste your Phone Number ID
```

### 6.5 Test OTP

```bash
curl -X POST https://thetide-api.YOUR_SUBDOMAIN.workers.dev/api/auth/otp \
  -H "Content-Type: application/json" \
  -d '{"phone": "+491624747159", "channel": "whatsapp"}'
```

You should receive a WhatsApp message with a 6-digit code.

---

## Step 7: Configure NowPayments

### 7.1 Get API Key

1. Sign up at [account.nowpayments.io](https://account.nowpayments.io)
2. Go to **Store Settings → API Keys**
3. Copy your **API Key**

### 7.2 Set Secret

```bash
cd worker
npx wrangler secret put NOWPAYMENTS_API_KEY
```

### 7.3 Configure Payment Button

The NowPayments button is already embedded in `ProductPage.tsx`:

```html
<a href="https://nowpayments.io/payment/?iid=6076227642&source=button" target="_blank" rel="noreferrer noopener">
  <img src="https://nowpayments.io/images/embeds/payment-button-black.svg" alt="Crypto payment button by NOWPayments">
</a>
```

To use your own NowPayments account:

1. Log into [NowPayments](https://account.nowpayments.io)
2. Go to **Payment Tools → Payment Button**
3. Configure your button and copy the new `iid`
4. Replace `6076227642` in `frontend/src/components/pages/ProductPage.tsx` with your `iid`

---

## Step 8: Upload Product Images to R2

### 8.1 Brand Images with Logo (Optional)

```bash
cd scripts
pip install Pillow
python overlay_logo.py
```

Branded images saved to `product-images/branded/`.

### 8.2 Upload to R2

```bash
cd product-images

# Upload branded images (or originals if no branding)
for img in *.png; do
  npx wrangler r2 object put thetide-images/products/$img --file=$img
done
```

Or use the Cloudflare Dashboard → R2 → Upload.

### 8.3 Set Public Access (Optional)

If you want direct image URLs, configure a Custom Domain for your R2 bucket:

1. Cloudflare Dashboard → R2 → thetide-images
2. Settings → Custom Domain → Add `images.ridethetide.site`
3. Update `seed.sql` image URLs to match your custom domain

---

## Step 9: Configure Custom Domain

### 9.1 Add Domain to Cloudflare

1. [Cloudflare Dashboard](https://dash.cloudflare.com) → Add Site
2. Enter `ridethetide.site` (or your domain)
3. Follow DNS setup instructions

### 9.2 Connect to Pages

1. Cloudflare Dashboard → Pages → thetide-store
2. Custom Domains → Add `ridethetide.site`

### 9.3 Connect Worker Route (Optional)

If using `api.ridethetide.site` for the Worker:

1. Cloudflare Dashboard → Workers & Pages
2. thetide-api → Triggers → Add Custom Domain → `api.ridethetide.site`

---

## Step 10: Verify Everything

### 10.1 Check API Health

```bash
curl https://thetide-api.YOUR_SUBDOMAIN.workers.dev/api/products
```

Should return 30 products with EUR pricing.

### 10.2 Check OTP Flow

```bash
curl -X POST https://thetide-api.YOUR_SUBDOMAIN.workers.dev/api/auth/otp \
  -H "Content-Type: application/json" \
  -d '{"phone": "+491624747159"}'
```

### 10.3 Check Product Page

Open `https://ridethetide.site/product/bpc-157` and verify:
- Product image loads
- Size selector shows 5mg / 10mg
- Price shows EUR
- "Add To Cart" button works
- NowPayments button visible
- COA section shows DPS- batches
- Overview / History / Structure / Research / References sections render

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| `database_id not found` | Run `npx wrangler d1 list` to get the correct ID |
| `KV namespace not found` | Run `npx wrangler kv namespace list` to get the correct ID |
| Images not loading | Check R2 bucket name matches `wrangler.toml` |
| OTP not sending | Verify WhatsApp template is approved in Meta Dashboard |
| NowPayments failing | Check `NOWPAYMENTS_API_KEY` is set via `wrangler secret put` |
| CORS errors | Ensure frontend `VITE_API_URL` matches Worker URL |

---

## Post-Deploy Checklist

- [ ] D1 database created and seeded with 30 products
- [ ] R2 buckets created and images uploaded
- [ ] KV namespace created
- [ ] Worker deployed and responding
- [ ] Frontend deployed to Pages
- [ ] Custom domain connected
- [ ] WhatsApp OTP template approved
- [ ] NowPayments API key set
- [ ] Test purchase flow end-to-end
- [ ] Test OTP login with +49 162 4747159
