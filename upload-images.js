#!/usr/bin/env node
/**
 * Upload product vial images to Cloudflare R2
 * Run: node upload-images.js
 * Requires: CLOUDFLARE_API_TOKEN, R2_ACCOUNT_ID env vars
 */

const fs = require('fs');
const path = require('path');

const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID || 'YOUR_ACCOUNT_ID';
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID || 'YOUR_R2_ACCESS_KEY';
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY || 'YOUR_R2_SECRET_KEY';
const BUCKET_NAME = 'thetide-images';
const IMAGES_DIR = path.join(__dirname, 'product-images');

// Product slugs matching seed.sql
const products = [
  'bpc-157', 'bpc-157-tb-500', 'cjc-1295-ipamorelin', 'dp3-r', 'dp2-t',
  'tb-500', 'tesamorelin', 'sermorelin', 'ipamorelin', 'mots-c',
  'nad-plus', 'l-glutathione', 'aod-9604', 'dp1-s', 'ghk-cu',
  'glow', 'klow', 'kpv', 'cjc-1295-no-dac', 'thymosin-alpha-1',
  'selank', 'semax', 'igf-1-lr3', 'dsip', 'hexarelin',
  'melanotan-ii', 'kisspeptin', 'oxytocin', 'pt-141', 'cagrilintide'
];

async function uploadToR2(slug) {
  const filePath = path.join(IMAGES_DIR, `${slug}.png`);
  if (!fs.existsSync(filePath)) {
    console.log(`❌ Missing: ${slug}.png`);
    return false;
  }

  const data = fs.readFileSync(filePath);
  const key = `products/${slug}.png`;

  // R2 S3-compatible endpoint
  const endpoint = `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`;
  const url = `${endpoint}/${BUCKET_NAME}/${key}`;

  // Simple PUT upload (for production, use aws-sdk or @aws-sdk/client-s3)
  // This is a placeholder - you'll need to use wrangler r2 object put or aws-cli
  console.log(`📤 Would upload: ${filePath} → r2://${BUCKET_NAME}/${key} (${data.length} bytes)`);
  return true;
}

async function main() {
  console.log('=== Ride The Tide — R2 Image Upload ===\n');

  let uploaded = 0;
  for (const slug of products) {
    const ok = await uploadToR2(slug);
    if (ok) uploaded++;
  }

  console.log(`\n✅ Ready to upload: ${uploaded}/${products.length} images`);
  console.log('\n--- Upload Commands (run in terminal) ---\n');

  // Generate wrangler commands
  for (const slug of products) {
    const filePath = path.join(IMAGES_DIR, `${slug}.png`);
    if (fs.existsSync(filePath)) {
      console.log(`wrangler r2 object put thetide-images/products/${slug}.png --file="${filePath}" --content-type=image/png`);
    }
  }

  console.log('\n--- Or use AWS CLI ---\n');
  console.log(`aws s3 sync "${IMAGES_DIR}" s3://thetide-images/products/ --endpoint-url=https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com --content-type image/png`);
  console.log('\nMake sure AWS credentials are configured with your R2 Access Key ID and Secret.');
}

main().catch(console.error);
