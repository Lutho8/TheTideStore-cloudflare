import { Hono } from 'hono'
import type { Env } from '../index'

const products = new Hono<{ Bindings: Env }>()

// List products (with market-specific pricing)
products.get('/', async (c) => {
  const market = c.req.header('X-Market') || 'ZA'
  const search = c.req.query('search') || ''
  const tag = c.req.query('tag') || ''
  const limit = Math.min(parseInt(c.req.query('limit') || '50'), 100)
  const offset = parseInt(c.req.query('offset') || '0')

  let query = `
    SELECT 
      p.*,
      c.name as category_name,
      c.slug as category_slug
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE p.status = 'active'
  `
  const params: (string | number)[] = []

  if (search) {
    query += ` AND (p.name LIKE ? OR p.code_label LIKE ? OR p.compound_name LIKE ?)`
    params.push(`%${search}%`, `%${search}%`, `%${search}%`)
  }

  query += ` ORDER BY p.sort_order ASC, p.created_at DESC LIMIT ? OFFSET ?`
  params.push(limit, offset)

  const { results } = await c.env.DB.prepare(query).bind(...params).all()

  // Get variants with market pricing
  const productsWithVariants = await Promise.all((results || []).map(async (product: any) => {
    const { results: variants } = await c.env.DB.prepare(
      `SELECT id, name, sku, dosage_mg, vial_count, 
        CASE WHEN ? = 'DE' THEN price_de ELSE price_za END as price,
        CASE WHEN ? = 'DE' THEN compare_price_de ELSE compare_price_za END as compare_price,
        is_default
      FROM product_variants WHERE product_id = ? ORDER BY sort_order ASC`
    ).bind(market, market, product.id).all()

    const { results: images } = await c.env.DB.prepare(
      'SELECT url, alt, is_primary FROM product_images WHERE product_id = ? ORDER BY sort_order ASC'
    ).bind(product.id).all()

    return {
      ...product,
      variants: variants || [],
      images: images || [],
    }
  }))

  return c.json({ products: productsWithVariants, total: productsWithVariants.length })
})

// Get single product
products.get('/:slug', async (c) => {
  const slug = c.req.param('slug')
  const market = c.req.header('X-Market') || 'ZA'

  const product = await c.env.DB.prepare(
    `SELECT p.*, c.name as category_name
     FROM products p
     LEFT JOIN categories c ON p.category_id = c.id
     WHERE p.slug = ? AND p.status = 'active'`
  ).bind(slug).first()

  if (!product) return c.json({ error: 'Product not found' }, 404)

  // Get variants with market pricing
  const { results: variants } = await c.env.DB.prepare(
    `SELECT id, name, sku, dosage_mg, vial_count,
      CASE WHEN ? = 'DE' THEN price_de ELSE price_za END as price,
      CASE WHEN ? = 'DE' THEN compare_price_de ELSE compare_price_za END as compare_price,
      is_default
    FROM product_variants WHERE product_id = ? ORDER BY sort_order ASC`
  ).bind(market, market, product.id).all()

  const { results: images } = await c.env.DB.prepare(
    'SELECT url, alt, is_primary FROM product_images WHERE product_id = ? ORDER BY sort_order ASC'
  ).bind(product.id).all()

  const { results: references } = await c.env.DB.prepare(
    'SELECT * FROM research_references WHERE product_id = ? ORDER BY sort_order ASC'
  ).bind(product.id).all()

  // Increment view count
  await c.env.DB.prepare('UPDATE products SET view_count = view_count + 1 WHERE id = ?').bind(product.id).run()

  return c.json({
    ...product,
    variants: variants || [],
    images: images || [],
    references: references || [],
  })
})

// Get categories
products.get('/categories/all', async (c) => {
  const { results } = await c.env.DB.prepare(
    `SELECT c.*, COUNT(p.id) as product_count
     FROM categories c
     LEFT JOIN products p ON p.category_id = c.id AND p.status = 'active'
     GROUP BY c.id
     ORDER BY c.sort_order ASC`
  ).all()

  return c.json({ categories: results || [] })
})

export { products as productRoutes }
