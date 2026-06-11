-- Seed data for Ride The Tide
-- Run after schema.sql

-- Categories
INSERT OR IGNORE INTO categories (id, name, slug, description, sort_order) VALUES
('cat-1', 'GLP-1 & Metabolic', 'glucagon-peptides', 'Glucagon-like peptide research compounds', 1),
('cat-2', 'Healing & Recovery', 'healing-peptides', 'Tissue repair and recovery research', 2),
('cat-3', 'Growth & Performance', 'growth-peptides', 'Growth hormone secretagogues', 3),
('cat-4', 'Copper Peptides', 'copper-peptides', 'Copper-based research compounds', 4);

-- Products with dual-market pricing
INSERT OR IGNORE INTO products (id, sku, code_label, name, compound_name, slug, cas_number, molecular_formula, molecular_weight, sequence, purity, category_id, short_description, full_description, mechanism_of_action, coa_batch_number, coa_lab, hplc_purity, status, is_featured) VALUES
('prod-1', 'RT-DP3R-001', 'DP3-R', 'DP3-R Research Compound', 'Retatrutide', 'dp3-r-research-compound', '2381089-83-2', 'C64H104N16O26S2', '1529.76', 'H-Tyr-Aib-Glu-Gly-Thr-Phe-Thr-Ser-Asp-Tyr-Ser-Lys-Tyr-Leu-Asp-Ser-Arg-Arg-Ala-Gln-Aib-Phe-Ile-Glu-Trp-Leu-Ile-Lys-Gly-Gly-Pro-Ser-Ser-Gly-Ala-Pro-Pro-Pro-Ser-NH2', '99.2%', 'cat-1', 'Triple agonist peptide targeting GLP-1, GIP, and glucagon receptors. For metabolic research.', 'DP3-R is a triple hormone receptor agonist designed for metabolic and energy homeostasis research.', 'DP3-R acts as an agonist at three distinct receptors: GLP-1R, GIPR, and GCGR.', 'RT-240601-A', 'Janoshik', '99.2%', 'active', 1),

('prod-2', 'RT-DP2T-001', 'DP2-T', 'DP2-T Research Compound', 'Tirzepatide', 'dp2-t-research-compound', '2023788-19-2', 'C225H348N56O68', '4813.45', 'Tyr-Aib-Glu-Gly-Thr-Phe-Thr-Ser-Asp-Tyr-Ser-Lys-Tyr-Leu-Asp-Ser-Arg-Arg-Ala-Gln-Aib-Phe-Ile-Glu-Trp-Leu-Ile-Lys-Gly-Gly-Pro-Ser-Ser-Gly-Ala-Pro-Pro-Pro-Ser-NH2', '99.1%', 'cat-1', 'Dual GIP/GLP-1 receptor agonist for metabolic and glucose homeostasis research.', 'DP2-T is a dual glucose-dependent insulinotropic polypeptide and glucagon-like peptide-1 receptor agonist.', 'DP2-T simultaneously activates GIP and GLP-1 receptors.', 'RT-240602-B', 'Janoshik', '99.1%', 'active', 1),

('prod-3', 'RT-HRBPC-001', 'HR-BPC', 'HR-BPC Research Compound', 'BPC-157', 'hr-bpc-research-compound', '137525-51-0', 'C62H98N16O22', '1419.56', 'Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val', '99.5%', 'cat-2', 'Pentadecapeptide for tissue regeneration and healing research.', 'HR-BPC is a synthetic pentadecapeptide derived from human gastric juice protein BPC.', 'HR-BPC promotes angiogenesis, upregulates growth factor expression, and modulates nitric oxide synthesis.', 'RT-240603-C', 'Janoshik', '99.5%', 'active', 1),

('prod-4', 'RT-GPCJC-001', 'GP-CJC', 'GP-CJC Research Compound', 'CJC-1295', 'gp-cjc-research-compound', '863288-34-0', 'C165H269N47O46', '3647.28', 'Tyr-D-Ala-Asp-Ala-Ile-Phe-Thr-Gln-Ser-Tyr-Arg-Lys-Val-Leu-Ala-Gln-Leu-Ser-Ala-Arg-Lys-Leu-Leu-Gln-Asp-Ile-Leu-Ser-Arg-Lys-Lys(Mal)-NH2', '99.3%', 'cat-3', 'Growth hormone releasing hormone analog for endocrine research.', 'GP-CJC is a modified growth hormone releasing hormone analog with drug affinity complex.', 'GP-CJC stimulates the anterior pituitary to release growth hormone.', 'RT-240604-D', 'Janoshik', '99.3%', 'active', 0),

('prod-5', 'RT-CPGHK-001', 'CP-GHK', 'CP-GHK Research Compound', 'GHK-Cu', 'cp-ghk-research-compound', '89030-95-9', 'C14H24N6O4Cu', '403.92', 'Gly-His-Lys-Cu', '99.4%', 'cat-4', 'Copper peptide for skin regeneration and tissue repair research.', 'CP-GHK is a copper-binding tripeptide complexed with copper.', 'CP-GHK binds copper ions and delivers them to cells for collagen synthesis.', 'RT-240605-E', 'Janoshik', '99.4%', 'active', 0);

-- Product Variants (ZA = ZAR, DE = EUR)
INSERT OR IGNORE INTO product_variants (id, product_id, name, sku, dosage_mg, vial_count, price_za, price_de, compare_price_za, compare_price_de, is_default, sort_order) VALUES
('var-1-1', 'prod-1', '5mg × 1 vial', 'RT-DP3R-5MG-1', 5, 1, 18999.00, 950.00, 21999.00, 1100.00, 1, 1),
('var-1-2', 'prod-1', '10mg × 1 vial', 'RT-DP3R-10MG-1', 10, 1, 34999.00, 1750.00, 39999.00, 2000.00, 0, 2),
('var-1-3', 'prod-1', '10mg × 10 vials', 'RT-DP3R-10MG-10', 10, 10, 299999.00, 15000.00, 349999.00, 17500.00, 0, 3),

('var-2-1', 'prod-2', '5mg × 1 vial', 'RT-DP2T-5MG-1', 5, 1, 12999.00, 650.00, 14999.00, 750.00, 1, 1),
('var-2-2', 'prod-2', '10mg × 1 vial', 'RT-DP2T-10MG-1', 10, 1, 22999.00, 1150.00, 26999.00, 1350.00, 0, 2),
('var-2-3', 'prod-2', '10mg × 10 vials', 'RT-DP2T-10MG-10', 10, 10, 199999.00, 10000.00, 229999.00, 11500.00, 0, 3),

('var-3-1', 'prod-3', '5mg × 1 vial', 'RT-HRBPC-5MG-1', 5, 1, 2499.00, 125.00, 2999.00, 150.00, 1, 1),
('var-3-2', 'prod-3', '10mg × 1 vial', 'RT-HRBPC-10MG-1', 10, 1, 4499.00, 225.00, 5499.00, 275.00, 0, 2),

('var-4-1', 'prod-4', '2mg × 1 vial', 'RT-GPCJC-2MG-1', 2, 1, 3499.00, 175.00, 3999.00, 200.00, 1, 1),
('var-4-2', 'prod-4', '5mg × 1 vial', 'RT-GPCJC-5MG-1', 5, 1, 7499.00, 375.00, 8499.00, 425.00, 0, 2),

('var-5-1', 'prod-5', '50mg × 1 vial', 'RT-CPGHK-50MG-1', 50, 1, 1799.00, 90.00, 2199.00, 110.00, 1, 1),
('var-5-2', 'prod-5', '100mg × 1 vial', 'RT-CPGHK-100MG-1', 100, 1, 2999.00, 150.00, 3499.00, 175.00, 0, 2);

-- Research References
INSERT OR IGNORE INTO research_references (id, product_id, authors, title, journal, year, doi, pmid, sort_order) VALUES
('ref-1-1', 'prod-1', 'Rosenstock J, et al.', 'Triple hormone receptor agonist in type 2 diabetes', 'N Engl J Med', 2023, '10.1056/NEJMoa2301972', '37354173', 1),
('ref-1-2', 'prod-1', 'Sattar N, et al.', 'Cardiovascular risk reduction with retatrutide in obesity', 'N Engl J Med', 2024, '10.1056/NEJMoa2401580', '38498846', 2),
('ref-1-3', 'prod-1', 'Coskun T, et al.', 'LY3437943, a novel triple glucagon, GIP, and GLP-1 receptor agonist', 'Mol Metab', 2022, '10.1016/j.molmet.2022.101553', '35973429', 3),

('ref-2-1', 'prod-2', 'Rosenstock J, et al.', 'Efficacy and safety of tirzepatide', 'Lancet', 2021, '10.1016/S0140-6736(21)01324-6', '34293727', 1),
('ref-2-2', 'prod-2', 'Gastaldelli A, et al.', 'Effect of tirzepatide on insulin sensitivity', 'Diabetes Care', 2023, '10.2337/dc23-0358', '37347291', 2),

('ref-3-1', 'prod-3', 'Sikiric P, et al.', 'The pharmacological properties of BPC 157', 'Life Sci', 1993, '10.1016/0024-3205(93)90591-F', '8510290', 1),
('ref-3-2', 'prod-3', 'Chang CH, et al.', 'BPC 157 enhances healing of rat medial collateral ligament', 'J Orthop Res', 2011, '10.1002/jor.21391', '21584909', 2),
('ref-3-3', 'prod-3', 'Cerovecki I, et al.', 'BPC 157 modulates VEGF and NO synthesis', 'Med Sci Monit', 2010, '10.12659/MSM.880319', '20628637', 3);

-- Inventory
INSERT OR IGNORE INTO inventory (id, product_id, quantity, reserved, low_stock_threshold) VALUES
('inv-1', 'prod-1', 100, 0, 5),
('inv-2', 'prod-2', 100, 0, 5),
('inv-3', 'prod-3', 100, 0, 5),
('inv-4', 'prod-4', 100, 0, 5),
('inv-5', 'prod-5', 100, 0, 5);

-- Ad Accounts
INSERT OR IGNORE INTO ad_accounts (id, name, platform, pixel_id, is_active, is_primary, geo_target) VALUES
('ad-1', 'mainxacc1', 'meta', 'REPLACE_META_PIXEL', 1, 1, 'ZA,DE'),
('ad-2', 'tikxacc1', 'tiktok', 'REPLACE_TIKTOK_PIXEL', 1, 1, 'ZA,DE'),
('ad-3', 'google1', 'google', 'AW-REPLACE_GOOGLE', 1, 1, 'ZA,DE'),
('ad-4', 'reditxacc1', 'reddit', 'REPLACE_REDDIT_PIXEL', 1, 1, 'ZA,DE');
