-- D1 Database Schema for Ride The Tide
-- Run: wrangler d1 execute thetide-db --file=./schema.sql

-- Users
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  phone TEXT UNIQUE NOT NULL,
  phone_verified INTEGER DEFAULT 0,
  email TEXT,
  name TEXT,
  market TEXT DEFAULT 'ZA' CHECK (market IN ('ZA', 'DE')),
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone);

-- OTP Codes
CREATE TABLE IF NOT EXISTS otp_codes (
  id TEXT PRIMARY KEY,
  phone TEXT NOT NULL,
  code TEXT NOT NULL,
  channel TEXT DEFAULT 'whatsapp' CHECK (channel IN ('whatsapp', 'sms')),
  attempts INTEGER DEFAULT 0,
  verified INTEGER DEFAULT 0,
  expires_at TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_otp_phone_code ON otp_codes(phone, code);

-- Compliance Gates
CREATE TABLE IF NOT EXISTS compliance_gates (
  id TEXT PRIMARY KEY,
  user_id TEXT UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  age_confirmed INTEGER DEFAULT 0,
  age_confirmed_at TEXT,
  is_researcher INTEGER DEFAULT 0,
  researcher_confirmed_at TEXT,
  ruo_agreed INTEGER DEFAULT 0,
  ruo_agreed_at TEXT,
  phone_verified INTEGER DEFAULT 0,
  phone_verified_at TEXT,
  fully_compliant INTEGER DEFAULT 0,
  compliant_at TEXT,
  ip_address TEXT,
  user_agent TEXT,
  country TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- Product Categories
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

-- Products (with dual-market pricing)
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  sku TEXT UNIQUE NOT NULL,
  code_label TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  compound_name TEXT,
  slug TEXT UNIQUE NOT NULL,
  cas_number TEXT,
  molecular_formula TEXT,
  molecular_weight TEXT,
  sequence TEXT,
  purity TEXT,
  category_id TEXT REFERENCES categories(id),
  short_description TEXT,
  full_description TEXT,
  mechanism_of_action TEXT,
  coa_url TEXT,
  coa_batch_number TEXT,
  coa_test_date TEXT,
  coa_lab TEXT,
  hplc_purity TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('draft', 'active', 'out_of_stock', 'discontinued')),
  is_featured INTEGER DEFAULT 0,
  view_count INTEGER DEFAULT 0,
  order_count INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);
CREATE INDEX IF NOT EXISTS idx_products_code ON products(code_label);

-- Product Variants (market-specific pricing)
CREATE TABLE IF NOT EXISTS product_variants (
  id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  sku TEXT UNIQUE NOT NULL,
  dosage_mg INTEGER,
  vial_count INTEGER DEFAULT 1,
  price_za REAL NOT NULL,
  price_de REAL NOT NULL,
  compare_price_za REAL,
  compare_price_de REAL,
  is_default INTEGER DEFAULT 0,
  sort_order INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_variants_product ON product_variants(product_id);

-- Research References
CREATE TABLE IF NOT EXISTS research_references (
  id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  authors TEXT,
  title TEXT NOT NULL,
  journal TEXT,
  year INTEGER,
  doi TEXT,
  pmid TEXT,
  url TEXT,
  sort_order INTEGER DEFAULT 0
);

-- Product Images
CREATE TABLE IF NOT EXISTS product_images (
  id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  alt TEXT,
  sort_order INTEGER DEFAULT 0,
  is_primary INTEGER DEFAULT 0
);

-- Inventory
CREATE TABLE IF NOT EXISTS inventory (
  id TEXT PRIMARY KEY,
  product_id TEXT UNIQUE REFERENCES products(id),
  variant_id TEXT UNIQUE REFERENCES product_variants(id),
  quantity INTEGER DEFAULT 0,
  reserved INTEGER DEFAULT 0,
  low_stock_threshold INTEGER DEFAULT 5,
  updated_at TEXT DEFAULT (datetime('now'))
);

-- Cart
CREATE TABLE IF NOT EXISTS cart_items (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL REFERENCES products(id),
  variant_id TEXT REFERENCES product_variants(id),
  quantity INTEGER DEFAULT 1,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  UNIQUE(user_id, product_id, variant_id)
);

-- Addresses
CREATE TABLE IF NOT EXISTS addresses (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT,
  recipient_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  street TEXT NOT NULL,
  city TEXT NOT NULL,
  province TEXT,
  postal_code TEXT NOT NULL,
  country TEXT DEFAULT 'ZA' CHECK (country IN ('ZA', 'DE')),
  is_default INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

-- Orders
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  order_number TEXT UNIQUE NOT NULL,
  user_id TEXT NOT NULL REFERENCES users(id),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded')),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'authorized', 'paid', 'failed', 'refunded')),
  fulfillment_status TEXT DEFAULT 'unfulfilled' CHECK (fulfillment_status IN ('unfulfilled', 'partial', 'fulfilled', 'returned')),
  subtotal REAL NOT NULL,
  shipping_cost REAL DEFAULT 0,
  tax REAL DEFAULT 0,
  discount REAL DEFAULT 0,
  total REAL NOT NULL,
  currency TEXT DEFAULT 'ZAR' CHECK (currency IN ('ZAR', 'EUR')),
  shipping_address TEXT,
  shipping_method TEXT,
  tracking_number TEXT,
  tracking_url TEXT,
  shipped_at TEXT,
  delivered_at TEXT,
  payment_method TEXT,
  payment_processor TEXT,
  payment_ref TEXT,
  customer_note TEXT,
  internal_note TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);

-- Order Items
CREATE TABLE IF NOT EXISTS order_items (
  id TEXT PRIMARY KEY,
  order_id TEXT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL REFERENCES products(id),
  variant_id TEXT REFERENCES product_variants(id),
  quantity INTEGER NOT NULL,
  unit_price REAL NOT NULL,
  total_price REAL NOT NULL,
  product_name TEXT NOT NULL,
  product_sku TEXT NOT NULL,
  variant_name TEXT
);

-- Order Activity Log
CREATE TABLE IF NOT EXISTS order_activity_logs (
  id TEXT PRIMARY KEY,
  order_id TEXT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  details TEXT,
  actor TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

-- Activity Log (general)
CREATE TABLE IF NOT EXISTS activity_logs (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id),
  action TEXT NOT NULL,
  entity_type TEXT,
  entity_id TEXT,
  metadata TEXT,
  ip_address TEXT,
  user_agent TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

-- Pixel Events (marketing tracking)
CREATE TABLE IF NOT EXISTS pixel_events (
  id TEXT PRIMARY KEY,
  event_name TEXT NOT NULL,
  event_id TEXT,
  user_id TEXT,
  phone TEXT,
  email TEXT,
  content_type TEXT,
  content_ids TEXT,
  content_name TEXT,
  value REAL,
  currency TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  ip_address TEXT,
  user_agent TEXT,
  pixel_id TEXT,
  platform TEXT,
  sent_at TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

-- Ad Accounts
CREATE TABLE IF NOT EXISTS ad_accounts (
  id TEXT PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  platform TEXT NOT NULL,
  pixel_id TEXT NOT NULL,
  account_id TEXT,
  is_active INTEGER DEFAULT 1,
  is_primary INTEGER DEFAULT 0,
  geo_target TEXT,
  user_agent_filter TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

-- Site Settings
CREATE TABLE IF NOT EXISTS site_settings (
  id TEXT PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value TEXT,
  updated_at TEXT DEFAULT (datetime('now'))
);
