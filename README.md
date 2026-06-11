<p align="center">
  <img src="assets/logo-animated.png" alt="Ride The Tide Logo" width="180" />
</p>

# Ride The Tide — Cloudflare-Native E-Commerce Platform

A premium research peptide e-commerce platform built for **South Africa** and **Germany**. Runs entirely on Cloudflare — no Vercel, no AWS, no server management.

## Architecture

```
thetide-cloudflare/
├── frontend/          # React SPA → Cloudflare Pages
│   └── src/
│       ├── components/  # Auth, Compliance, Product, Layout, Pages
│       └── hooks/       # Zustand auth store, API client
├── worker/            # Hono API → Cloudflare Workers
│   └── src/
│       ├── routes/      # Auth, Products, Orders, Compliance, Checkout, Webhooks, Admin
│       └── utils/       # JWT, OTP crypto
├── database/          # D1 SQLite schema + seed data
│   ├── schema.sql
│   └── seed.sql
└── shared/            # TypeScript types
```

## Stack

| Layer | Technology | Cloudflare Service |
|-------|-----------|-------------------|
| Frontend | React 18 + Vite + Tailwind | **Cloudflare Pages** |
| Backend API | Hono (lightweight, Express-like) | **Cloudflare Workers** |
| Database | SQLite | **Cloudflare D1** |
| File Storage | S3-compatible | **Cloudflare R2** (already using) |
| Sessions/Cache | Key-value | **Cloudflare KV** |
| Auth | JWT + WhatsApp OTP | Meta Cloud API + Twilio fallback |

## Why Cloudflare-Native?

- **You're already on Cloudflare Pages** — zero migration friction
- **$5/month at low volume** — Workers + D1 + R2 + KV
- **No cold starts** — edge deployment, <5ms response globally
- **Zero egress fees** — R2 has no bandwidth charges (unlike AWS S3)
- **No server to manage** — fully serverless
- **Dual-market ready** — edge PoPs in Johannesburg and Frankfurt

## Three Critical Gaps — SOLVED

### 1. Phone OTP Login (WhatsApp Primary + SMS Fallback)
- WhatsApp Business API as primary channel (~$0.0076 per OTP in SA)
- Twilio SMS fallback for non-WhatsApp users
- South African phone normalization (+27)
- JWT session tokens with 30-day expiry

### 2. Scientific Product Pages
- CAS numbers with monospace display
- Molecular formulas with subscript rendering (C₆₂H₉₈N₁₆O₂₂)
- 3-6 PubMed references per product with DOI/PMID links
- Inline COA viewer + download
- HPLC purity badges
- Coded labels: DP3-R, DP2-T, HR-BPC, GP-CJC, CP-GHK

### 3. Multi-Step Compliance Gate
- Step 1: Age 21+ confirmation
- Step 2: Qualified researcher declaration
- Step 3: Research Use Only agreement
- Step 4: Phone verification
- Full audit trail (IP, UA, timestamp, country)
- Blocks browsing until all gates passed

## Dual-Market Support (South Africa + Germany)

| Feature | South Africa | Germany |
|---------|-------------|---------|
| **Currency** | ZAR (R) | EUR (€) |
| **Payment** | PayFast (card/EFT) | Stripe (card/SEPA) |
| **Crypto** | NowPayments | NowPayments |
| **Shipping** | The Courier Guy / Pargo | DHL / DPD |
| **Compliance** | SAHPRA reference | BfArM reference |
| **Support** | WhatsApp (+27) | WhatsApp (+49) |

Product variants have **separate pricing per market**:
- `price_za` / `compare_price_za` for South Africa
- `price_de` / `compare_price_de` for Germany

## Product Catalog (Coded Labels)

| Code | Compound | CAS | Purity | ZAR | EUR |
|------|----------|-----|--------|-----|-----|
| DP3-R | Retatrutide | 2381089-83-2 | 99.2% | R18,999 | €950 |
| DP2-T | Tirzepatide | 2023788-19-2 | 99.1% | R12,999 | €650 |
| HR-BPC | BPC-157 | 137525-51-0 | 99.5% | R2,499 | €125 |
| GP-CJC | CJC-1295 | 863288-34-0 | 99.3% | R3,499 | €175 |
| CP-GHK | GHK-Cu | 89030-95-9 | 99.4% | R1,799 | €90 |

## Getting Started

### Prerequisites
- Node.js 20+
- Cloudflare account
- Wrangler CLI: `npm install -g wrangler`

### 1. Clone & Install
```bash
git clone https://github.com/Lutho8/thetide-cloudflare.git
cd thetide-cloudflare

# Install frontend dependencies
cd frontend && npm install

# Install worker dependencies
cd ../worker && npm install
```

### 2. Create Cloudflare Resources

```bash
# Login to Cloudflare
wrangler login

# Create D1 database
wrangler d1 create thetide-db
# Copy the database_id into worker/wrangler.toml

# Create R2 buckets
wrangler r2 bucket create thetide-coas
wrangler r2 bucket create thetide-images

# Create KV namespace
wrangler kv:namespace create SESSIONS
# Copy the id into worker/wrangler.toml
```

### 3. Set Up Database
```bash
cd worker

# Push schema
wrangler d1 execute thetide-db --file=../database/schema.sql

# Seed data
wrangler d1 execute thetide-db --file=../database/seed.sql
```

### 4. Configure Environment Variables

Edit `worker/wrangler.toml`:
```toml
[vars]
JWT_SECRET = "your-32-char-secret-here"
WHATSAPP_API_KEY = "your-whatsapp-api-key"
WHATSAPP_PHONE_ID = "your-whatsapp-phone-id"
TWILIO_SID = "your-twilio-sid"
TWILIO_TOKEN = "your-twilio-token"
TWILIO_PHONE = "+27xxxxxxxxx"
PAYFAST_MERCHANT_ID = "your-payfast-id"
PAYFAST_MERCHANT_KEY = "your-payfast-key"
STRIPE_SECRET_KEY = "sk_live_..."
NOWPAYMENTS_API_KEY = "your-nowpayments-key"
```

For secrets, use:
```bash
wrangler secret put JWT_SECRET
wrangler secret put WHATSAPP_API_KEY
# etc.
```

### 5. Deploy

```bash
# Deploy API worker
cd worker
wrangler deploy

# Deploy frontend (from frontend directory)
cd ../frontend
wrangler pages deploy dist
```

### 6. Local Development
```bash
# Terminal 1: Start worker
cd worker
wrangler dev

# Terminal 2: Start frontend
cd frontend
npm run dev
# Frontend: http://localhost:5173
# API: http://localhost:8787
```

## WhatsApp Business API Setup

1. Create a Meta Business account: [business.facebook.com](https://business.facebook.com)
2. Apply for WhatsApp Business API access
3. Create a WhatsApp Business Account (WABA)
4. Add a phone number (can use your existing business number)
5. Get your **Phone Number ID** and **Permanent Access Token**
6. Create an OTP template named `ride_the_tide_otp` with body: `Your verification code is: {{1}}`
7. Submit for approval (usually 24-48 hours)

**Cost in South Africa**: ~$0.0076 per authentication message (70-90% cheaper than SMS)

## Courier Integrations

### South Africa
- **The Courier Guy** — Primary (door-to-door, API available, COD support)
- **Pargo** — Secondary (4,000+ pickup points, cheaper)

### Germany
- **DHL** — Primary
- **DPD** — Secondary

## Payment Processors

| Market | Primary | Secondary | Fallback |
|--------|---------|-----------|----------|
| South Africa | PayFast (ZAR) | Ozow (Instant EFT) | NowPayments (crypto) |
| Germany | Stripe (EUR) | SEPA transfer | NowPayments (crypto) |

## Admin Dashboard

Access at `/admin` (protected by admin phone check). Features:
- KPI cards (revenue, orders, customers, products)
- Orders table with status pipeline
- Products table with stock levels
- Customers table with compliance status
- Real-time analytics

## Marketing Infrastructure

- **Pixel Registry**: Meta, TikTok, Google, Reddit
- **Cloaking**: Bot detection, UA filtering
- **UTM Capture**: Automatic attribution tracking
- **Multi-account**: Backup ad accounts ready

## File Structure

```
thetide-cloudflare/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/AuthModal.tsx
│   │   │   ├── compliance/ComplianceGate.tsx
│   │   │   ├── layout/Navbar.tsx
│   │   │   ├── layout/Footer.tsx
│   │   │   └── pages/
│   │   │       ├── HomePage.tsx
│   │   │       ├── ShopPage.tsx
│   │   │       ├── ProductPage.tsx
│   │   │       ├── CheckoutPage.tsx
│   │   │       └── AccountPage.tsx
│   │   ├── hooks/useAuthStore.ts
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.js
├── worker/
│   ├── src/
│   │   ├── index.ts
│   │   ├── routes/
│   │   │   ├── auth.ts
│   │   │   ├── products.ts
│   │   │   ├── compliance.ts
│   │   │   ├── orders.ts
│   │   │   ├── checkout.ts
│   │   │   ├── webhooks.ts
│   │   │   └── admin.ts
│   │   └── utils/crypto.ts
│   ├── wrangler.toml
│   └── package.json
├── database/
│   ├── schema.sql
│   └── seed.sql
└── shared/
    └── types.ts
```

## Next Steps

1. **Set up WhatsApp Business API** — Apply for Meta Business verification
2. **Upload COA PDFs** — Upload Janoshik COAs to R2 bucket, update `coa_url` in database
3. **Add product images** — Upload to R2, add to `product_images` table
4. **Configure payment processors** — Sign up for PayFast (SA) and Stripe (DE)
5. **Set up courier accounts** — The Courier Guy (SA) and DHL (DE)
6. **Create ad accounts** — Meta, TikTok, Google, Reddit pixel IDs
7. **Deploy to production** — Point ridethetide.site to Cloudflare Pages

## Cost Estimate (Low Volume)

| Service | Monthly Cost |
|---------|-------------|
| Cloudflare Workers | $5 |
| Cloudflare D1 | ~$1 (1M reads) |
| Cloudflare R2 | ~$0.15 (10GB) |
| Cloudflare KV | $0.50 (1M reads) |
| WhatsApp API | ~$5 (500 OTPs) |
| **Total** | **~$12/month** |

## License

All products are for research purposes only. Not for human consumption.
