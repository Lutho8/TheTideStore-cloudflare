-- Seed data for Ride The Tide — Euro-Only Market
-- Products sourced from crushresearch.shop imagery
-- Run: wrangler d1 execute thetide-db --file=./seed.sql

-- Categories
INSERT OR IGNORE INTO categories (id, name, slug, description, sort_order) VALUES
('cat-1', 'GLP-1 & Metabolic', 'glucagon-peptides', 'Triple and dual agonist research compounds for metabolic studies', 1),
('cat-2', 'Healing & Recovery', 'healing-peptides', 'Tissue repair, anti-inflammatory, and regenerative research peptides', 2),
('cat-3', 'Growth & Performance', 'growth-peptides', 'Growth hormone secretagogues and performance research compounds', 3),
('cat-4', 'Copper Peptides', 'copper-peptides', 'Copper-binding tripeptides for regeneration and repair research', 4),
('cat-5', 'Nootropic & Cognitive', 'nootropic-peptides', 'Cognitive enhancement and neuroprotective research peptides', 5),
('cat-6', 'Lab Essentials', 'lab-essentials', 'Research supplies, reconstitution tools, and lab accessories', 6);

-- ============================================
-- PRODUCTS WITH CRUSHRESEARCH IMAGES
-- ============================================

-- DP3-R: Triple Agonist (Retatrutide) — 5 variants
INSERT OR IGNORE INTO products (id, sku, code_label, name, compound_name, slug, cas_number, molecular_formula, molecular_weight, sequence, purity, category_id, short_description, full_description, overview, history, research_findings, key_areas_json, mechanism_of_action, coa_lab, hplc_purity, pubchem_id, structure_image_url, status, is_featured) VALUES
('prod-dp3r', 'RT-DP3R-001', 'DP3-R', 'DP3-R Research Compound', 'Retatrutide', 'dp3-r-research-compound', '2381089-83-2', 'C64H104N16O26S2', '1529.76', 'H-Tyr-Aib-Glu-Gly-Thr-Phe-Thr-Ser-Asp-Tyr-Ser-Lys-Tyr-Leu-Asp-Ser-Arg-Arg-Ala-Gln-Aib-Phe-Ile-Glu-Trp-Leu-Ile-Lys-Gly-Gly-Pro-Ser-Ser-Gly-Ala-Pro-Pro-Pro-Ser-NH2', '99.2%', 'cat-1', 'Triple agonist peptide targeting GLP-1, GIP, and glucagon receptors. For metabolic and energy homeostasis research.', 'DP3-R is a triple hormone receptor agonist designed for metabolic and energy homeostasis research. It activates GLP-1, GIP, and glucagon receptors simultaneously, making it a powerful tool for studying metabolic pathways, energy expenditure, and glucose regulation in controlled laboratory settings.', 'DP3-R acts as an agonist at three distinct receptors: GLP-1R (glucagon-like peptide-1 receptor), GIPR (glucose-dependent insulinotropic polypeptide receptor), and GCGR (glucagon receptor). This triple mechanism enhances insulin secretion, suppresses glucagon release, delays gastric emptying, and increases energy expenditure through brown adipose tissue activation.', NULL, NULL, NULL, NULL, 'Janoshik', '99.2% HPLC', NULL, NULL, 'active', 1);

INSERT OR IGNORE INTO product_variants (id, product_id, name, sku, dosage_mg, vial_count, price, compare_price, currency, is_default, sort_order) VALUES
('var-dp3r-10', 'prod-dp3r', '10mg × 1 vial', 'RT-DP3R-10MG-1', 10, 1, 89.00, 119.00, 'EUR', 1, 1),
('var-dp3r-15', 'prod-dp3r', '15mg × 1 vial', 'RT-DP3R-15MG-1', 15, 1, 129.00, 169.00, 'EUR', 0, 2),
('var-dp3r-20', 'prod-dp3r', '20mg × 1 vial', 'RT-DP3R-20MG-1', 20, 1, 169.00, 219.00, 'EUR', 0, 3),
('var-dp3r-30', 'prod-dp3r', '30mg × 1 vial', 'RT-DP3R-30MG-1', 30, 1, 249.00, 319.00, 'EUR', 0, 4),
('var-dp3r-50', 'prod-dp3r', '50mg × 1 vial', 'RT-DP3R-50MG-1', 50, 1, 349.00, 449.00, 'EUR', 0, 5);

INSERT OR IGNORE INTO product_images (id, product_id, url, alt, sort_order, is_primary) VALUES
('img-dp3r-10', 'prod-dp3r', 'https://r2.ridethetide.site/products/triple-agonist-10mg.png', 'DP3-R 10mg research vial', 1, 1),
('img-dp3r-15', 'prod-dp3r', 'https://r2.ridethetide.site/products/triple-agonist-15mg.png', 'DP3-R 15mg research vial', 2, 0),
('img-dp3r-20', 'prod-dp3r', 'https://r2.ridethetide.site/products/triple-agonist-20mg.png', 'DP3-R 20mg research vial', 3, 0),
('img-dp3r-30', 'prod-dp3r', 'https://r2.ridethetide.site/products/triple-agonist-30mg.png', 'DP3-R 30mg research vial', 4, 0),
('img-dp3r-50', 'prod-dp3r', 'https://r2.ridethetide.site/products/triple-agonist-50mg.png', 'DP3-R 50mg research vial', 5, 0);

-- DP2-T: Double Agonist (Tirzepatide) — 2 variants
INSERT OR IGNORE INTO products (id, sku, code_label, name, compound_name, slug, cas_number, molecular_formula, molecular_weight, sequence, purity, category_id, short_description, full_description, overview, history, research_findings, key_areas_json, mechanism_of_action, coa_lab, hplc_purity, pubchem_id, structure_image_url, status, is_featured) VALUES
('prod-dp2t', 'RT-DP2T-001', 'DP2-T', 'DP2-T Research Compound', 'Tirzepatide', 'dp2-t-research-compound', '2023788-19-2', 'C225H348N56O68', '4813.45', 'Tyr-Aib-Glu-Gly-Thr-Phe-Thr-Ser-Asp-Tyr-Ser-Lys-Tyr-Leu-Asp-Ser-Arg-Arg-Ala-Gln-Aib-Phe-Ile-Glu-Trp-Leu-Ile-Lys-Gly-Gly-Pro-Ser-Ser-Gly-Ala-Pro-Pro-Pro-Ser-NH2', '99.1%', 'cat-1', 'Dual GIP/GLP-1 receptor agonist for metabolic and glucose homeostasis research.', 'DP2-T is a dual glucose-dependent insulinotropic polypeptide (GIP) and glucagon-like peptide-1 (GLP-1) receptor agonist. It is designed for research into metabolic regulation, insulin secretion, and energy balance in controlled laboratory environments.', 'DP2-T simultaneously activates GIP and GLP-1 receptors. The GIP component enhances insulin secretion in a glucose-dependent manner and improves lipid clearance, while the GLP-1 component suppresses glucagon secretion, delays gastric emptying, and promotes satiety signaling.', NULL, NULL, NULL, NULL, 'Janoshik', '99.1% HPLC', NULL, NULL, 'active', 1);

INSERT OR IGNORE INTO product_variants (id, product_id, name, sku, dosage_mg, vial_count, price, compare_price, currency, is_default, sort_order) VALUES
('var-dp2t-20', 'prod-dp2t', '20mg × 1 vial', 'RT-DP2T-20MG-1', 20, 1, 69.00, 89.00, 'EUR', 1, 1),
('var-dp2t-30', 'prod-dp2t', '30mg × 1 vial', 'RT-DP2T-30MG-1', 30, 1, 99.00, 129.00, 'EUR', 0, 2);

INSERT OR IGNORE INTO product_images (id, product_id, url, alt, sort_order, is_primary) VALUES
('img-dp2t-20', 'prod-dp2t', 'https://r2.ridethetide.site/products/double-agonist-20mg.png', 'DP2-T 20mg research vial', 1, 1),
('img-dp2t-30', 'prod-dp2t', 'https://r2.ridethetide.site/products/double-agonist-30mg.png', 'DP2-T 30mg research vial', 2, 0);

-- HR-BPC: BPC-157 — 2 variants
INSERT OR IGNORE INTO products (id, sku, code_label, name, compound_name, slug, cas_number, molecular_formula, molecular_weight, sequence, purity, category_id, short_description, full_description, overview, history, research_findings, key_areas_json, mechanism_of_action, coa_lab, hplc_purity, pubchem_id, structure_image_url, status, is_featured) VALUES
('prod-hrbpc', 'RT-HRBPC-001', 'HR-BPC', 'HR-BPC Research Compound', 'BPC-157', 'hr-bpc-research-compound', '137525-51-0', 'C62H98N16O22', '1419.56', 'Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val', '99.5%', 'cat-2', 'Pentadecapeptide for tissue regeneration and healing research.', 'HR-BPC is a synthetic pentadecapeptide derived from human gastric juice protein BPC. It is widely studied for its potential effects on tissue regeneration, angiogenesis, and wound healing in controlled laboratory settings.', 'HR-BPC promotes angiogenesis (formation of new blood vessels), upregulates growth factor expression, and modulates nitric oxide synthesis. It has been shown to accelerate tendon-to-bone healing, improve muscle recovery, and protect gastric mucosa in preclinical studies.', NULL, NULL, NULL, NULL, 'Janoshik', '99.5% HPLC', NULL, NULL, 'active', 1);

INSERT OR IGNORE INTO product_variants (id, product_id, name, sku, dosage_mg, vial_count, price, compare_price, currency, is_default, sort_order) VALUES
('var-hrbpc-5', 'prod-hrbpc', '5mg × 1 vial', 'RT-HRBPC-5MG-1', 5, 1, 39.00, 49.00, 'EUR', 1, 1),
('var-hrbpc-10', 'prod-hrbpc', '10mg × 1 vial', 'RT-HRBPC-10MG-1', 10, 1, 59.00, 79.00, 'EUR', 0, 2);

INSERT OR IGNORE INTO product_images (id, product_id, url, alt, sort_order, is_primary) VALUES
('img-hrbpc-5', 'prod-hrbpc', 'https://r2.ridethetide.site/products/bpc-157-5mg.png', 'HR-BPC 5mg research vial', 1, 1),
('img-hrbpc-10', 'prod-hrbpc', 'https://r2.ridethetide.site/products/bpc-157-10mg.png', 'HR-BPC 10mg research vial', 2, 0);

-- CP-GHK: GHK-Cu — 2 variants
INSERT OR IGNORE INTO products (id, sku, code_label, name, compound_name, slug, cas_number, molecular_formula, molecular_weight, sequence, purity, category_id, short_description, full_description, overview, history, research_findings, key_areas_json, mechanism_of_action, coa_lab, hplc_purity, pubchem_id, structure_image_url, status, is_featured) VALUES
('prod-cpghk', 'RT-CPGHK-001', 'CP-GHK', 'CP-GHK Research Compound', 'GHK-Cu', 'cp-ghk-research-compound', '89030-95-9', 'C14H24N6O4Cu', '403.92', 'Gly-His-Lys-Cu', '99.4%', 'cat-4', 'Copper peptide for skin regeneration and tissue repair research.', 'CP-GHK is a copper-binding tripeptide (glycyl-L-histidyl-L-lysine) complexed with copper. It is extensively studied for its role in wound healing, collagen synthesis, and tissue regeneration in controlled laboratory settings.', 'CP-GHK binds copper ions and delivers them to cells, where copper acts as a cofactor for numerous enzymes involved in collagen synthesis, elastin production, and antioxidant defense. It upregulates decorin and lumican expression and modulates TGF-beta signaling.', NULL, NULL, NULL, NULL, 'Janoshik', '99.4% HPLC', NULL, NULL, 'active', 0);

INSERT OR IGNORE INTO product_variants (id, product_id, name, sku, dosage_mg, vial_count, price, compare_price, currency, is_default, sort_order) VALUES
('var-cpghk-50', 'prod-cpghk', '50mg × 1 vial', 'RT-CPGHK-50MG-1', 50, 1, 29.00, 39.00, 'EUR', 1, 1),
('var-cpghk-100', 'prod-cpghk', '100mg × 1 vial', 'RT-CPGHK-100MG-1', 100, 1, 49.00, 69.00, 'EUR', 0, 2);

INSERT OR IGNORE INTO product_images (id, product_id, url, alt, sort_order, is_primary) VALUES
('img-cpghk-50', 'prod-cpghk', 'https://r2.ridethetide.site/products/ghk-cu-50mg.png', 'CP-GHK 50mg research vial', 1, 1),
('img-cpghk-100', 'prod-cpghk', 'https://r2.ridethetide.site/products/ghk-cu-100mg.png', 'CP-GHK 100mg research vial', 2, 0);

-- GP-CJC: CJC-1295 + Ipamorelin Blend
INSERT OR IGNORE INTO products (id, sku, code_label, name, compound_name, slug, cas_number, molecular_formula, molecular_weight, sequence, purity, category_id, short_description, full_description, overview, history, research_findings, key_areas_json, mechanism_of_action, coa_lab, hplc_purity, pubchem_id, structure_image_url, status, is_featured) VALUES
('prod-gpcjc', 'RT-GPCJC-001', 'GP-CJC', 'GP-CJC Research Compound', 'CJC-1295 / Ipamorelin Blend', 'gp-cjc-research-compound', '863288-34-0', 'C165H269N47O46 / C38H49N9O5', '3647.28 / 711.85', 'Tyr-D-Ala-Asp-Ala-Ile-Phe-Thr-Gln-Ser-Tyr-Arg-Lys-Val-Leu-Ala-Gln-Leu-Ser-Ala-Arg-Lys-Leu-Leu-Gln-Asp-Ile-Leu-Ser-Arg-Lys-Lys(Mal)-NH2 / Aib-His-D-2-Nal-D-Phe-Lys-NH2', '99.3%', 'cat-3', 'Growth hormone releasing hormone analog + GH secretagogue blend for endocrine research.', 'GP-CJC is a research blend containing CJC-1295 (modified GHRH with DAC) and Ipamorelin (selective GH secretagogue). Designed for studying growth hormone secretion, IGF-1 levels, and cellular regeneration in controlled laboratory environments.', 'CJC-1295 stimulates the anterior pituitary to release growth hormone via GHRH receptors. The DAC extends half-life by binding to serum albumin. Ipamorelin selectively activates GH secretagogue receptors without affecting cortisol or prolactin, providing a synergistic GH release profile.', NULL, NULL, NULL, NULL, 'Janoshik', '99.3% HPLC', NULL, NULL, 'active', 0);

INSERT OR IGNORE INTO product_variants (id, product_id, name, sku, dosage_mg, vial_count, price, compare_price, currency, is_default, sort_order) VALUES
('var-gpcjc-10', 'prod-gpcjc', '10mg blend × 1 vial', 'RT-GPCJC-10MG-1', 10, 1, 79.00, 99.00, 'EUR', 1, 1);

INSERT OR IGNORE INTO product_images (id, product_id, url, alt, sort_order, is_primary) VALUES
('img-gpcjc-10', 'prod-gpcjc', 'https://r2.ridethetide.site/products/cjc-ipamorelin-10mg.png', 'GP-CJC 10mg blend research vial', 1, 1);

-- GP-TES: Tesamorelin
INSERT OR IGNORE INTO products (id, sku, code_label, name, compound_name, slug, cas_number, molecular_formula, molecular_weight, sequence, purity, category_id, short_description, full_description, overview, history, research_findings, key_areas_json, mechanism_of_action, coa_lab, hplc_purity, pubchem_id, structure_image_url, status, is_featured) VALUES
('prod-gptes', 'RT-GPTES-001', 'GP-TES', 'GP-TES Research Compound', 'Tesamorelin', 'gp-tes-research-compound', '218949-48-5', 'C221H366N72O67S', '5135.86', 'His-Ala-Asp-Ala-Ile-Phe-Thr-Asn-Ser-Tyr-Arg-Lys-Val-Leu-Gly-Gln-Leu-Ser-Ala-Arg-Lys-Leu-Leu-Gln-Asp-Ile-Met-Ser-Arg-Gln-Gln-Gly-Glu-Ser-Asn-Gln-Glu-Arg-Gly-Ala-Arg-Ala-Arg-Leu-NH2', '99.1%', 'cat-3', 'Growth hormone releasing factor analog for metabolic and lipodystrophy research.', 'GP-TES is a synthetic growth hormone releasing factor (GRF) analog designed for research into growth hormone secretion, visceral adipose tissue metabolism, and metabolic syndrome in controlled laboratory settings.', 'GP-TES binds to GRF receptors in the anterior pituitary, stimulating pulsatile growth hormone release. It has been studied for its effects on IGF-1 levels, lipid metabolism, and body composition in preclinical models.', NULL, NULL, NULL, NULL, 'Janoshik', '99.1% HPLC', NULL, NULL, 'active', 0);

INSERT OR IGNORE INTO product_variants (id, product_id, name, sku, dosage_mg, vial_count, price, compare_price, currency, is_default, sort_order) VALUES
('var-gptes-20', 'prod-gptes', '20mg × 1 vial', 'RT-GPTES-20MG-1', 20, 1, 119.00, 149.00, 'EUR', 1, 1);

INSERT OR IGNORE INTO product_images (id, product_id, url, alt, sort_order, is_primary) VALUES
('img-gptes-20', 'prod-gptes', 'https://r2.ridethetide.site/products/tesamorelin-20mg.png', 'GP-TES 20mg research vial', 1, 1);

-- HR-EP: Epithalon / Epitalon
INSERT OR IGNORE INTO products (id, sku, code_label, name, compound_name, slug, cas_number, molecular_formula, molecular_weight, sequence, purity, category_id, short_description, full_description, overview, history, research_findings, key_areas_json, mechanism_of_action, coa_lab, hplc_purity, pubchem_id, structure_image_url, status, is_featured) VALUES
('prod-hrep', 'RT-HREP-001', 'HR-EP', 'HR-EP Research Compound', 'Epithalon (Epitalon)', 'hr-ep-research-compound', '307297-39-8', 'C14H22N4O9', '390.35', 'Ala-Glu-Asp-Gly', '99.0%', 'cat-2', 'Tetrapeptide for telomerase activation and cellular aging research.', 'HR-EP is a synthetic tetrapeptide (Ala-Glu-Asp-Gly) originally isolated from the pineal gland. It is studied for its potential effects on telomerase activity, cellular senescence, and melatonin regulation in controlled laboratory environments.', 'HR-EP is believed to activate telomerase, the enzyme responsible for maintaining telomere length. It may also influence melatonin synthesis and circadian rhythm regulation through pineal gland interaction.', NULL, NULL, NULL, NULL, 'Janoshik', '99.0% HPLC', NULL, NULL, 'active', 0);

INSERT OR IGNORE INTO product_variants (id, product_id, name, sku, dosage_mg, vial_count, price, compare_price, currency, is_default, sort_order) VALUES
('var-hrep-10', 'prod-hrep', '10mg × 1 vial', 'RT-HREP-10MG-1', 10, 1, 49.00, 69.00, 'EUR', 1, 1),
('var-hrep-50', 'prod-hrep', '50mg × 1 vial', 'RT-HREP-50MG-1', 50, 1, 149.00, 199.00, 'EUR', 0, 2);

INSERT OR IGNORE INTO product_images (id, product_id, url, alt, sort_order, is_primary) VALUES
('img-hrep-10', 'prod-hrep', 'https://r2.ridethetide.site/products/epitalon-10mg.png', 'HR-EP 10mg research vial', 1, 1),
('img-hrep-50', 'prod-hrep', 'https://r2.ridethetide.site/products/epithalon-50mg.png', 'HR-EP 50mg research vial', 2, 0);

-- HR-MC: MOTS-C
INSERT OR IGNORE INTO products (id, sku, code_label, name, compound_name, slug, cas_number, molecular_formula, molecular_weight, sequence, purity, category_id, short_description, full_description, overview, history, research_findings, key_areas_json, mechanism_of_action, coa_lab, hplc_purity, pubchem_id, structure_image_url, status, is_featured) VALUES
('prod-hrmc', 'RT-HRMC-001', 'HR-MC', 'HR-MC Research Compound', 'MOTS-C', 'hr-mc-research-compound', '1627580-64-6', 'C101H152N28O22S2', '2244.64', 'Met-Arg-Trp-Gln-Glu-Trp-Gln-Glu-Arg-Gln-Gly-Glu-Trp-Gln-Glu-Arg-Gln-Gly-Glu-Trp-Gln-Glu-Arg-Gln-Gly', '99.2%', 'cat-2', 'Mitochondrial-derived peptide for metabolic regulation and aging research.', 'HR-MC is a mitochondrial-derived peptide (MDP) that plays a role in metabolic regulation, insulin sensitivity, and cellular energy homeostasis. It is studied for its potential effects on obesity, diabetes, and age-related metabolic decline in controlled laboratory settings.', 'HR-MC is encoded within the mitochondrial genome and acts as a signaling molecule. It improves insulin sensitivity, reduces fat accumulation, and enhances cellular respiration through AMPK pathway activation.', NULL, NULL, NULL, NULL, 'Janoshik', '99.2% HPLC', NULL, NULL, 'active', 0);

INSERT OR IGNORE INTO product_variants (id, product_id, name, sku, dosage_mg, vial_count, price, compare_price, currency, is_default, sort_order) VALUES
('var-hrmc-10', 'prod-hrmc', '10mg × 1 vial', 'RT-HRMC-10MG-1', 10, 1, 59.00, 79.00, 'EUR', 1, 1),
('var-hrmc-20', 'prod-hrmc', '20mg × 1 vial', 'RT-HRMC-20MG-1', 20, 1, 99.00, 129.00, 'EUR', 0, 2),
('var-hrmc-40', 'prod-hrmc', '40mg × 1 vial', 'RT-HRMC-40MG-1', 40, 1, 169.00, 219.00, 'EUR', 0, 3);

INSERT OR IGNORE INTO product_images (id, product_id, url, alt, sort_order, is_primary) VALUES
('img-hrmc-10', 'prod-hrmc', 'https://r2.ridethetide.site/products/mots-c-10mg.png', 'HR-MC 10mg research vial', 1, 1),
('img-hrmc-20', 'prod-hrmc', 'https://r2.ridethetide.site/products/mots-c-20mg.png', 'HR-MC 20mg research vial', 2, 0),
('img-hrmc-40', 'prod-hrmc', 'https://r2.ridethetide.site/products/mots-c-40mg.png', 'HR-MC 40mg research vial', 3, 0);

-- LE-NAD: NAD+ (Nicotinamide Adenine Dinucleotide)
INSERT OR IGNORE INTO products (id, sku, code_label, name, compound_name, slug, cas_number, molecular_formula, molecular_weight, sequence, purity, category_id, short_description, full_description, overview, history, research_findings, key_areas_json, mechanism_of_action, coa_lab, hplc_purity, pubchem_id, structure_image_url, status, is_featured) VALUES
('prod-lenad', 'RT-LENAD-001', 'LE-NAD', 'LE-NAD Research Compound', 'NAD+ (Nicotinamide Adenine Dinucleotide)', 'le-nad-research-compound', '53-84-9', 'C21H28N7O14P2', '663.43', 'N/A (small molecule)', '99.5%', 'cat-6', 'Coenzyme for cellular energy metabolism and sirtuin activation research.', 'LE-NAD is the oxidized form of nicotinamide adenine dinucleotide, a critical coenzyme found in all living cells. It is essential for cellular energy metabolism, DNA repair, and sirtuin-mediated longevity pathways in controlled laboratory research.', 'LE-NAD serves as an electron carrier in redox reactions, transferring electrons from one reaction to another. It is a substrate for sirtuins (SIRT1-7), PARPs, and CD38, enzymes involved in DNA repair, metabolic regulation, and cellular signaling.', NULL, NULL, NULL, NULL, 'Janoshik', '99.5% HPLC', NULL, NULL, 'active', 0);

INSERT OR IGNORE INTO product_variants (id, product_id, name, sku, dosage_mg, vial_count, price, compare_price, currency, is_default, sort_order) VALUES
('var-lenad-500', 'prod-lenad', '500mg × 1 vial', 'RT-LENAD-500MG-1', 500, 1, 49.00, 69.00, 'EUR', 1, 1),
('var-lenad-1000', 'prod-lenad', '1000mg × 1 vial', 'RT-LENAD-1000MG-1', 1000, 1, 79.00, 109.00, 'EUR', 0, 2);

INSERT OR IGNORE INTO product_images (id, product_id, url, alt, sort_order, is_primary) VALUES
('img-lenad-500', 'prod-lenad', 'https://r2.ridethetide.site/products/nad-500mg.png', 'LE-NAD 500mg research vial', 1, 1),
('img-lenad-1000', 'prod-lenad', 'https://r2.ridethetide.site/products/nad-plus-1000mg.png', 'LE-NAD 1000mg research vial', 2, 0);

-- HR-MT1: Melanotan-1
INSERT OR IGNORE INTO products (id, sku, code_label, name, compound_name, slug, cas_number, molecular_formula, molecular_weight, sequence, purity, category_id, short_description, full_description, overview, history, research_findings, key_areas_json, mechanism_of_action, coa_lab, hplc_purity, pubchem_id, structure_image_url, status, is_featured) VALUES
('prod-hrmt1', 'RT-HRMT1-001', 'HR-MT1', 'HR-MT1 Research Compound', 'Melanotan-1 (Afamelanotide)', 'hr-mt1-research-compound', '75921-69-6', 'C78H111N21O19', '1646.85', 'Ac-Ser-Tyr-Ser-Nle-Glu-His-D-Phe-Arg-Trp-Gly-Lys-Pro-Val-NH2', '99.3%', 'cat-2', 'Alpha-MSH analog for melanogenesis and photoprotection research.', 'HR-MT1 is a synthetic analog of alpha-melanocyte stimulating hormone (α-MSH). It is studied for its effects on melanogenesis, skin pigmentation, and photoprotection in controlled laboratory settings.', 'HR-MT1 binds to melanocortin-1 receptors (MC1R) on melanocytes, stimulating melanin production (eumelanin). It also exhibits anti-inflammatory properties through NF-κB pathway inhibition.', NULL, NULL, NULL, NULL, 'Janoshik', '99.3% HPLC', NULL, NULL, 'active', 0);

INSERT OR IGNORE INTO product_variants (id, product_id, name, sku, dosage_mg, vial_count, price, compare_price, currency, is_default, sort_order) VALUES
('var-hrmt1-10', 'prod-hrmt1', '10mg × 1 vial', 'RT-HRMT1-10MG-1', 10, 1, 49.00, 69.00, 'EUR', 1, 1);

INSERT OR IGNORE INTO product_images (id, product_id, url, alt, sort_order, is_primary) VALUES
('img-hrmt1-10', 'prod-hrmt1', 'https://r2.ridethetide.site/products/melanotan-1-10mg.png', 'HR-MT1 10mg research vial', 1, 1);

-- HR-MT2: Melanotan-2
INSERT OR IGNORE INTO products (id, sku, code_label, name, compound_name, slug, cas_number, molecular_formula, molecular_weight, sequence, purity, category_id, short_description, full_description, overview, history, research_findings, key_areas_json, mechanism_of_action, coa_lab, hplc_purity, pubchem_id, structure_image_url, status, is_featured) VALUES
('prod-hrmt2', 'RT-HRMT2-001', 'HR-MT2', 'HR-MT2 Research Compound', 'Melanotan-2', 'hr-mt2-research-compound', '121062-08-6', 'C50H69N15O9', '1024.18', 'Ac-Nle-cyclo[Asp-His-D-Phe-Arg-Trp-Lys]-NH2', '99.2%', 'cat-2', 'Cyclic melanocortin analog for melanogenesis and appetite research.', 'HR-MT2 is a cyclic synthetic analog of alpha-MSH with enhanced stability and receptor affinity. It is studied for melanogenesis, sexual function, and appetite regulation in controlled laboratory environments.', 'HR-MT2 is a non-selective melanocortin receptor agonist with high affinity for MC1R, MC3R, MC4R, and MC5R. Its cyclic structure provides resistance to enzymatic degradation compared to linear analogs.', NULL, NULL, NULL, NULL, 'Janoshik', '99.2% HPLC', NULL, NULL, 'active', 0);

INSERT OR IGNORE INTO product_variants (id, product_id, name, sku, dosage_mg, vial_count, price, compare_price, currency, is_default, sort_order) VALUES
('var-hrmt2-10', 'prod-hrmt2', '10mg × 1 vial', 'RT-HRMT2-10MG-1', 10, 1, 49.00, 69.00, 'EUR', 1, 1);

INSERT OR IGNORE INTO product_images (id, product_id, url, alt, sort_order, is_primary) VALUES
('img-hrmt2-10', 'prod-hrmt2', 'https://r2.ridethetide.site/products/melanotan-2-10mg.png', 'HR-MT2 10mg research vial', 1, 1);

-- HR-PT: PT-141 (Bremelanotide)
INSERT OR IGNORE INTO products (id, sku, code_label, name, compound_name, slug, cas_number, molecular_formula, molecular_weight, sequence, purity, category_id, short_description, full_description, overview, history, research_findings, key_areas_json, mechanism_of_action, coa_lab, hplc_purity, pubchem_id, structure_image_url, status, is_featured) VALUES
('prod-hrpt', 'RT-HRPT-001', 'HR-PT', 'HR-PT Research Compound', 'PT-141 (Bremelanotide)', 'hr-pt-research-compound', '32780-32-8', 'C50H68N14O10', '1025.16', 'Ac-Nle-cyclo[Asp-His-D-Phe-Arg-Trp-Lys]-OH', '99.1%', 'cat-2', 'Melanocortin receptor agonist for sexual function and arousal research.', 'HR-PT is a synthetic heptapeptide and melanocortin receptor agonist. It is studied for its effects on sexual arousal, central nervous system activation, and melanocortin signaling in controlled laboratory settings.', 'HR-PT acts primarily on melanocortin receptors in the central nervous system (MC3R, MC4R), bypassing the vascular system. It activates neural pathways involved in sexual arousal and desire through hypothalamic and limbic system interaction.', NULL, NULL, NULL, NULL, 'Janoshik', '99.1% HPLC', NULL, NULL, 'active', 0);

INSERT OR IGNORE INTO product_variants (id, product_id, name, sku, dosage_mg, vial_count, price, compare_price, currency, is_default, sort_order) VALUES
('var-hrpt-10', 'prod-hrpt', '10mg × 1 vial', 'RT-HRPT-10MG-1', 10, 1, 59.00, 79.00, 'EUR', 1, 1);

INSERT OR IGNORE INTO product_images (id, product_id, url, alt, sort_order, is_primary) VALUES
('img-hrpt-10', 'prod-hrpt', 'https://r2.ridethetide.site/products/pt-141-10mg.png', 'HR-PT 10mg research vial', 1, 1);

-- HR-VIP: VIP (Vasoactive Intestinal Peptide)
INSERT OR IGNORE INTO products (id, sku, code_label, name, compound_name, slug, cas_number, molecular_formula, molecular_weight, sequence, purity, category_id, short_description, full_description, overview, history, research_findings, key_areas_json, mechanism_of_action, coa_lab, hplc_purity, pubchem_id, structure_image_url, status, is_featured) VALUES
('prod-hrvip', 'RT-HRVIP-001', 'HR-VIP', 'HR-VIP Research Compound', 'VIP (Vasoactive Intestinal Peptide)', 'hr-vip-research-compound', '40077-57-4', 'C147H237N43O43S', '3325.80', 'His-Ser-Asp-Ala-Val-Phe-Thr-Asp-Asn-Tyr-Thr-Arg-Leu-Arg-Lys-Gln-Met-Ala-Val-Lys-Lys-Tyr-Leu-Asn-Ser-Ile-Leu-Asn-NH2', '99.0%', 'cat-2', 'Neuropeptide for immune regulation and vasodilation research.', 'HR-VIP is a 28-amino acid neuropeptide belonging to the secretin/glucagon family. It is studied for its effects on immune regulation, vasodilation, neuroprotection, and anti-inflammatory responses in controlled laboratory environments.', 'HR-VIP binds to VPAC1 and VPAC2 receptors (class B GPCRs) and PAC1 receptors. It activates adenylate cyclase, increasing cAMP levels. It modulates T-cell differentiation, inhibits pro-inflammatory cytokine production, and promotes regulatory T-cell function.', NULL, NULL, NULL, NULL, 'Janoshik', '99.0% HPLC', NULL, NULL, 'active', 0);

INSERT OR IGNORE INTO product_variants (id, product_id, name, sku, dosage_mg, vial_count, price, compare_price, currency, is_default, sort_order) VALUES
('var-hrvip-10', 'prod-hrvip', '10mg × 1 vial', 'RT-HRVIP-10MG-1', 10, 1, 69.00, 89.00, 'EUR', 1, 1);

INSERT OR IGNORE INTO product_images (id, product_id, url, alt, sort_order, is_primary) VALUES
('img-hrvip-10', 'prod-hrvip', 'https://r2.ridethetide.site/products/vip-10mg.png', 'HR-VIP 10mg research vial', 1, 1);

-- GP-IPA: Ipamorelin
INSERT OR IGNORE INTO products (id, sku, code_label, name, compound_name, slug, cas_number, molecular_formula, molecular_weight, sequence, purity, category_id, short_description, full_description, overview, history, research_findings, key_areas_json, mechanism_of_action, coa_lab, hplc_purity, pubchem_id, structure_image_url, status, is_featured) VALUES
('prod-gpia', 'RT-GPIA-001', 'GP-IPA', 'GP-IPA Research Compound', 'Ipamorelin', 'gp-ipa-research-compound', '170851-70-4', 'C38H49N9O5', '711.85', 'Aib-His-D-2-Nal-D-Phe-Lys-NH2', '99.3%', 'cat-3', 'Selective growth hormone secretagogue for endocrine research.', 'GP-IPA is a selective growth hormone secretagogue and ghrelin receptor agonist. It is studied for its ability to stimulate GH release without affecting cortisol, prolactin, or other hormones in controlled laboratory settings.', 'GP-IPA selectively binds to ghrelin receptors (GHS-R1a) on somatotrophs in the anterior pituitary, triggering GH release via IP3/DAG and cAMP pathways. Unlike other GHRPs, it does not significantly elevate cortisol, prolactin, or aldosterone.', NULL, NULL, NULL, NULL, 'Janoshik', '99.3% HPLC', NULL, NULL, 'active', 0);

INSERT OR IGNORE INTO product_variants (id, product_id, name, sku, dosage_mg, vial_count, price, compare_price, currency, is_default, sort_order) VALUES
('var-gpia-10', 'prod-gpia', '10mg × 1 vial', 'RT-GPIA-10MG-1', 10, 1, 49.00, 69.00, 'EUR', 1, 1);

INSERT OR IGNORE INTO product_images (id, product_id, url, alt, sort_order, is_primary) VALUES
('img-gpia-10', 'prod-gpia', 'https://r2.ridethetide.site/products/ipamorelin-10mg.png', 'GP-IPA 10mg research vial', 1, 1);

-- NT-SE: Semax
INSERT OR IGNORE INTO products (id, sku, code_label, name, compound_name, slug, cas_number, molecular_formula, molecular_weight, sequence, purity, category_id, short_description, full_description, overview, history, research_findings, key_areas_json, mechanism_of_action, coa_lab, hplc_purity, pubchem_id, structure_image_url, status, is_featured) VALUES
('prod-ntse', 'RT-NTSE-001', 'NT-SE', 'NT-SE Research Compound', 'Semax', 'nt-se-research-compound', '80714-61-0', 'C37H51N9O10S', '813.92', 'Met-His-Phe-Pro-Gly-Pro', '99.2%', 'cat-5', 'Synthetic ACTH fragment for cognitive enhancement and neuroprotection research.', 'NT-SE is a synthetic heptapeptide analog of ACTH 4-10. It is studied for its nootropic, neuroprotective, and cerebroprotective effects in controlled laboratory environments, particularly in models of stroke and cognitive impairment.', 'NT-SE modulates BDNF and NGF expression, enhances brain blood flow, and exhibits antioxidant properties. It interacts with melanocortin receptors and may influence serotonin and dopamine metabolism without hormonal side effects.', NULL, NULL, NULL, NULL, 'Janoshik', '99.2% HPLC', NULL, NULL, 'active', 0);

INSERT OR IGNORE INTO product_variants (id, product_id, name, sku, dosage_mg, vial_count, price, compare_price, currency, is_default, sort_order) VALUES
('var-ntse-15', 'prod-ntse', '15mg × 1 vial', 'RT-NTSE-15MG-1', 15, 1, 59.00, 79.00, 'EUR', 1, 1);

INSERT OR IGNORE INTO product_images (id, product_id, url, alt, sort_order, is_primary) VALUES
('img-ntse-15', 'prod-ntse', 'https://r2.ridethetide.site/products/semax-15mg.png', 'NT-SE 15mg research vial', 1, 1);

-- NT-SL: Selank
INSERT OR IGNORE INTO products (id, sku, code_label, name, compound_name, slug, cas_number, molecular_formula, molecular_weight, sequence, purity, category_id, short_description, full_description, overview, history, research_findings, key_areas_json, mechanism_of_action, coa_lab, hplc_purity, pubchem_id, structure_image_url, status, is_featured) VALUES
('prod-ntsl', 'RT-NTSL-001', 'NT-SL', 'NT-SL Research Compound', 'Selank', 'nt-sl-research-compound', '129954-34-3', 'C33H57N11O9', '751.87', 'Thr-Lys-Pro-Arg-Pro-Gly-Pro', '99.1%', 'cat-5', 'Synthetic tuftsin analog for anxiolytic and cognitive research.', 'NT-SL is a synthetic heptapeptide and tuftsin analog. It is studied for its anxiolytic, nootropic, and immunomodulatory effects in controlled laboratory settings, with particular interest in stress response and immune function research.', 'NT-SL modulates GABAergic neurotransmission and interacts with the benzodiazepine receptor system. It also influences IL-6 and TNF-alpha cytokine production, exhibiting both immunomodulatory and anti-inflammatory properties.', NULL, NULL, NULL, NULL, 'Janoshik', '99.1% HPLC', NULL, NULL, 'active', 0);

INSERT OR IGNORE INTO product_variants (id, product_id, name, sku, dosage_mg, vial_count, price, compare_price, currency, is_default, sort_order) VALUES
('var-ntsl-5', 'prod-ntsl', '5mg × 1 vial', 'RT-NTSL-5MG-1', 5, 1, 49.00, 69.00, 'EUR', 1, 1);

INSERT OR IGNORE INTO product_images (id, product_id, url, alt, sort_order, is_primary) VALUES
('img-ntsl-5', 'prod-ntsl', 'https://r2.ridethetide.site/products/selank-5mg.png', 'NT-SL 5mg research vial', 1, 1);

-- GP-SER: Sermorelin
INSERT OR IGNORE INTO products (id, sku, code_label, name, compound_name, slug, cas_number, molecular_formula, molecular_weight, sequence, purity, category_id, short_description, full_description, overview, history, research_findings, key_areas_json, mechanism_of_action, coa_lab, hplc_purity, pubchem_id, structure_image_url, status, is_featured) VALUES
('prod-gpser', 'RT-GPSER-001', 'GP-SER', 'GP-SER Research Compound', 'Sermorelin', 'gp-ser-research-compound', '86168-78-7', 'C149H246N44O42S', '3357.88', 'Tyr-Ala-Asp-Ala-Ile-Phe-Thr-Asn-Ser-Tyr-Arg-Lys-Val-Leu-Gly-Gln-Leu-Ser-Ala-Arg-Lys-Leu-Leu-Gln-Asp-Ile-Met-Ser-Arg-NH2', '99.0%', 'cat-3', 'Growth hormone releasing hormone analog for endocrine and metabolic research.', 'GP-SER is a synthetic analog of growth hormone releasing hormone (GHRH 1-29). It is studied for its effects on growth hormone secretion, IGF-1 production, and metabolic regulation in controlled laboratory environments.', 'GP-SER binds to GHRH receptors in the anterior pituitary, stimulating pulsatile GH release. It preserves the natural feedback mechanisms of the GH/IGF-1 axis, making it useful for studying endocrine homeostasis.', NULL, NULL, NULL, NULL, 'Janoshik', '99.0% HPLC', NULL, NULL, 'active', 0);

INSERT OR IGNORE INTO product_variants (id, product_id, name, sku, dosage_mg, vial_count, price, compare_price, currency, is_default, sort_order) VALUES
('var-gpser-10', 'prod-gpser', '10mg × 1 vial', 'RT-GPSER-10MG-1', 10, 1, 59.00, 79.00, 'EUR', 1, 1);

INSERT OR IGNORE INTO product_images (id, product_id, url, alt, sort_order, is_primary) VALUES
('img-gpser-10', 'prod-gpser', 'https://r2.ridethetide.site/products/sermorelin-10mg.png', 'GP-SER 10mg research vial', 1, 1);

-- HR-WV: Wolverine (BPC-157 + TB-500 Blend)
INSERT OR IGNORE INTO products (id, sku, code_label, name, compound_name, slug, cas_number, molecular_formula, molecular_weight, sequence, purity, category_id, short_description, full_description, overview, history, research_findings, key_areas_json, mechanism_of_action, coa_lab, hplc_purity, pubchem_id, structure_image_url, status, is_featured) VALUES
('prod-hrwv', 'RT-HRWV-001', 'HR-WV', 'HR-WV Research Compound', 'BPC-157 / TB-500 Blend', 'hr-wv-research-compound', '137525-51-0 / 885340-08-9', 'C62H98N16O22 / C38H67N9O15', '1419.56 / 889.01', 'Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val / Ac-Lys-Lys-Leu-Thr-Glu-Thr-Glu-Pro-Ala-Lys-Leu-Glu-Lys-Glu-Lys-Gln', '99.2%', 'cat-2', 'Synergistic healing peptide blend for tissue repair and regeneration research.', 'HR-WV is a research blend combining BPC-157 (body protection compound) and TB-500 (thymosin beta-4 fragment). It is studied for synergistic effects on wound healing, tissue regeneration, and musculoskeletal repair in controlled laboratory settings.', 'BPC-157 promotes angiogenesis and modulates nitric oxide synthesis. TB-500 (Ac-SDKP fragment) upregulates actin and enhances cell migration. Together they may provide complementary mechanisms for accelerated tissue repair and anti-inflammatory responses.', NULL, NULL, NULL, NULL, 'Janoshik', '99.2% HPLC', NULL, NULL, 'active', 0);

INSERT OR IGNORE INTO product_variants (id, product_id, name, sku, dosage_mg, vial_count, price, compare_price, currency, is_default, sort_order) VALUES
('var-hrwv-20', 'prod-hrwv', '20mg blend × 1 vial', 'RT-HRWV-20MG-1', 20, 1, 89.00, 119.00, 'EUR', 1, 1);

INSERT OR IGNORE INTO product_images (id, product_id, url, alt, sort_order, is_primary) VALUES
('img-hrwv-20', 'prod-hrwv', 'https://r2.ridethetide.site/products/wolverine-20mg.png', 'HR-WV 20mg blend research vial', 1, 1);

-- CP-GK: GHK-Cu + KPV Blend
INSERT OR IGNORE INTO products (id, sku, code_label, name, compound_name, slug, cas_number, molecular_formula, molecular_weight, sequence, purity, category_id, short_description, full_description, overview, history, research_findings, key_areas_json, mechanism_of_action, coa_lab, hplc_purity, pubchem_id, structure_image_url, status, is_featured) VALUES
('prod-cpgk', 'RT-CPGK-001', 'CP-GK', 'CP-GK Research Compound', 'GHK-Cu / KPV Blend', 'cp-gk-research-compound', '89030-95-9 / N/A', 'C14H24N6O4Cu / C16H25N3O4', '403.92 / 323.39', 'Gly-His-Lys-Cu / Lys-Pro-Val', '99.1%', 'cat-4', 'Copper peptide + anti-inflammatory tripeptide blend for skin and gut research.', 'CP-GK is a research blend combining GHK-Cu (copper tripeptide) and KPV (Lys-Pro-Val). It is studied for synergistic effects on skin regeneration, wound healing, and anti-inflammatory responses in controlled laboratory environments.', 'GHK-Cu delivers copper for collagen synthesis and antioxidant enzyme function. KPV is a potent anti-inflammatory tripeptide derived from alpha-MSH that inhibits NF-κB and reduces pro-inflammatory cytokine production. Together they may enhance tissue repair while modulating inflammation.', NULL, NULL, NULL, NULL, 'Janoshik', '99.1% HPLC', NULL, NULL, 'active', 0);

INSERT OR IGNORE INTO product_variants (id, product_id, name, sku, dosage_mg, vial_count, price, compare_price, currency, is_default, sort_order) VALUES
('var-cpgk-60', 'prod-cpgk', '60mg blend × 1 vial', 'RT-CPGK-60MG-1', 60, 1, 69.00, 89.00, 'EUR', 1, 1);

INSERT OR IGNORE INTO product_images (id, product_id, url, alt, sort_order, is_primary) VALUES
('img-cpgk-60', 'prod-cpgk', 'https://r2.ridethetide.site/products/ghk-cu-kpv-60mg.png', 'CP-GK 60mg blend research vial', 1, 1);

-- Additional single products from crushresearch
-- HR-KPV: KPV
INSERT OR IGNORE INTO products (id, sku, code_label, name, compound_name, slug, cas_number, molecular_formula, molecular_weight, sequence, purity, category_id, short_description, full_description, overview, history, research_findings, key_areas_json, mechanism_of_action, coa_lab, hplc_purity, pubchem_id, structure_image_url, status, is_featured) VALUES
('prod-hrkpv', 'RT-HRKPV-001', 'HR-KPV', 'HR-KPV Research Compound', 'KPV (Lys-Pro-Val)', 'hr-kpv-research-compound', 'N/A', 'C16H25N3O4', '323.39', 'Lys-Pro-Val', '99.0%', 'cat-2', 'Anti-inflammatory tripeptide for immune modulation research.', 'HR-KPV is a tripeptide derived from the C-terminus of alpha-melanocyte stimulating hormone. It is studied for its potent anti-inflammatory and immunomodulatory effects in controlled laboratory settings.', 'HR-KPV inhibits NF-κB activation and reduces pro-inflammatory cytokine production (IL-6, TNF-alpha). It does not require melanocortin receptors for activity, making it a direct anti-inflammatory agent.', NULL, NULL, NULL, NULL, 'Janoshik', '99.0% HPLC', NULL, NULL, 'active', 0);

INSERT OR IGNORE INTO product_variants (id, product_id, name, sku, dosage_mg, vial_count, price, compare_price, currency, is_default, sort_order) VALUES
('var-hrkpv-10', 'prod-hrkpv', '10mg × 1 vial', 'RT-HRKPV-10MG-1', 10, 1, 39.00, 49.00, 'EUR', 1, 1);

INSERT OR IGNORE INTO product_images (id, product_id, url, alt, sort_order, is_primary) VALUES
('img-hrkpv-10', 'prod-hrkpv', 'https://r2.ridethetide.site/products/kpv-10mg.png', 'HR-KPV 10mg research vial', 1, 1);

-- LE-GLU: Glutathione
INSERT OR IGNORE INTO products (id, sku, code_label, name, compound_name, slug, cas_number, molecular_formula, molecular_weight, sequence, purity, category_id, short_description, full_description, overview, history, research_findings, key_areas_json, mechanism_of_action, coa_lab, hplc_purity, pubchem_id, structure_image_url, status, is_featured) VALUES
('prod-leglu', 'RT-LEGLU-001', 'LE-GLU', 'LE-GLU Research Compound', 'Glutathione (Reduced)', 'le-glu-research-compound', '70-18-8', 'C10H17N3O6S', '307.32', 'γ-Glu-Cys-Gly', '99.5%', 'cat-6', 'Master antioxidant tripeptide for oxidative stress and detoxification research.', 'LE-GLU is the reduced form of glutathione, the most abundant intracellular antioxidant. It is studied for its role in oxidative stress management, detoxification, immune function, and cellular homeostasis in controlled laboratory environments.', 'LE-GLU scavenges reactive oxygen species (ROS), regenerates other antioxidants (vitamins C and E), and participates in phase II detoxification via glutathione S-transferase enzymes. It maintains thiol redox balance and regulates cell proliferation and apoptosis.', NULL, NULL, NULL, NULL, 'Janoshik', '99.5% HPLC', NULL, NULL, 'active', 0);

INSERT OR IGNORE INTO product_variants (id, product_id, name, sku, dosage_mg, vial_count, price, compare_price, currency, is_default, sort_order) VALUES
('var-leglu-1500', 'prod-leglu', '1500mg × 1 vial', 'RT-LEGLU-1500MG-1', 1500, 1, 39.00, 49.00, 'EUR', 1, 1);

INSERT OR IGNORE INTO product_images (id, product_id, url, alt, sort_order, is_primary) VALUES
('img-leglu-1500', 'prod-leglu', 'https://r2.ridethetide.site/products/glutathione-1500mg.png', 'LE-GLU 1500mg research vial', 1, 1);

-- GP-AOD: AOD-9604
INSERT OR IGNORE INTO products (id, sku, code_label, name, compound_name, slug, cas_number, molecular_formula, molecular_weight, sequence, purity, category_id, short_description, full_description, overview, history, research_findings, key_areas_json, mechanism_of_action, coa_lab, hplc_purity, pubchem_id, structure_image_url, status, is_featured) VALUES
('prod-gpaod', 'RT-GPAOD-001', 'GP-AOD', 'GP-AOD Research Compound', 'AOD-9604', 'gp-aod-research-compound', '221231-10-3', 'C78H123N23O23S2', '1815.08', 'Tyr-Leu-Arg-Ile-Val-Gln-Cys-Arg-Ser-Val-Glu-Gly-Ser-Cys-Gly-Phe', '99.2%', 'cat-3', 'HGH fragment for lipolysis and fat metabolism research.', 'GP-AOD is a modified fragment of human growth hormone (amino acids 176-191). It is studied for its effects on lipolysis, fat metabolism, and metabolic regulation without the IGF-1 stimulating effects of full-length HGH.', 'GP-AOD mimics the lipolytic domain of HGH without affecting growth or blood glucose. It stimulates lipolysis by binding to beta-adrenergic receptors and enhancing hormone-sensitive lipase activity in adipocytes.', NULL, NULL, NULL, NULL, 'Janoshik', '99.2% HPLC', NULL, NULL, 'active', 0);

INSERT OR IGNORE INTO product_variants (id, product_id, name, sku, dosage_mg, vial_count, price, compare_price, currency, is_default, sort_order) VALUES
('var-gpaod-5', 'prod-gpaod', '5mg × 1 vial', 'RT-GPAOD-5MG-1', 5, 1, 49.00, 69.00, 'EUR', 1, 1);

INSERT OR IGNORE INTO product_images (id, product_id, url, alt, sort_order, is_primary) VALUES
('img-gpaod-5', 'prod-gpaod', 'https://r2.ridethetide.site/products/aod9604-5mg.png', 'GP-AOD 5mg research vial', 1, 1);

-- DP-CAG: Cagrilintide
INSERT OR IGNORE INTO products (id, sku, code_label, name, compound_name, slug, cas_number, molecular_formula, molecular_weight, sequence, purity, category_id, short_description, full_description, overview, history, research_findings, key_areas_json, mechanism_of_action, coa_lab, hplc_purity, pubchem_id, structure_image_url, status, is_featured) VALUES
('prod-dpcag', 'RT-DPCAG-001', 'DP-CAG', 'DP-CAG Research Compound', 'Cagrilintide', 'dp-cag-research-compound', 'N/A', 'C187H292N46O59', '4118.68', 'Ac-Arg-Cys(1)-Asp-Cys(2)-Gln-Met-Tyr-Lys-Leu-Arg-Cys(1)-Tyr-Arg-Gly-Glu-Cys(2)-Arg-Arg-Arg-NH2', '99.0%', 'cat-1', 'Amylin analog for appetite suppression and metabolic research.', 'DP-CAG is a long-acting amylin analog designed for research into appetite regulation, gastric emptying, and metabolic control. It is studied for its effects on satiety signaling and glucose homeostasis in controlled laboratory settings.', 'DP-CAG binds to amylin receptors in the area postrema and other CNS regions, suppressing appetite and slowing gastric emptying. It also modulates glucagon secretion and enhances postprandial glucose control.', NULL, NULL, NULL, NULL, 'Janoshik', '99.0% HPLC', NULL, NULL, 'active', 0);

INSERT OR IGNORE INTO product_variants (id, product_id, name, sku, dosage_mg, vial_count, price, compare_price, currency, is_default, sort_order) VALUES
('var-dpcag-5', 'prod-dpcag', '5mg × 1 vial', 'RT-DPCAG-5MG-1', 5, 1, 79.00, 99.00, 'EUR', 1, 1);

INSERT OR IGNORE INTO product_images (id, product_id, url, alt, sort_order, is_primary) VALUES
('img-dpcag-5', 'prod-dpcag', 'https://r2.ridethetide.site/products/cagrilintide-5mg.png', 'DP-CAG 5mg research vial', 1, 1);

-- HR-PI: Pinealon
INSERT OR IGNORE INTO products (id, sku, code_label, name, compound_name, slug, cas_number, molecular_formula, molecular_weight, sequence, purity, category_id, short_description, full_description, overview, history, research_findings, key_areas_json, mechanism_of_action, coa_lab, hplc_purity, pubchem_id, structure_image_url, status, is_featured) VALUES
('prod-hrpi', 'RT-HRPI-001', 'HR-PI', 'HR-PI Research Compound', 'Pinealon', 'hr-pi-research-compound', 'N/A', 'C15H25N5O6', '371.39', 'Ala-Glu-Asp-Gly', '99.0%', 'cat-5', 'Synthetic pineal peptide for circadian rhythm and neuroprotection research.', 'HR-PI is a synthetic tripeptide identical in structure to a natural pineal gland peptide. It is studied for its effects on circadian rhythm regulation, neuroprotection, and cellular aging in controlled laboratory environments.', 'HR-PI influences melatonin synthesis and circadian gene expression (CLOCK, BMAL1, PER). It exhibits antioxidant properties and may protect neurons from oxidative stress and ischemic damage.', NULL, NULL, NULL, NULL, 'Janoshik', '99.0% HPLC', NULL, NULL, 'active', 0);

INSERT OR IGNORE INTO product_variants (id, product_id, name, sku, dosage_mg, vial_count, price, compare_price, currency, is_default, sort_order) VALUES
('var-hrpi-10', 'prod-hrpi', '10mg × 1 vial', 'RT-HRPI-10MG-1', 10, 1, 49.00, 69.00, 'EUR', 1, 1);

INSERT OR IGNORE INTO product_images (id, product_id, url, alt, sort_order, is_primary) VALUES
('img-hrpi-10', 'prod-hrpi', 'https://r2.ridethetide.site/products/pinealon-10mg.png', 'HR-PI 10mg research vial', 1, 1);

-- HR-KL: KLOW
INSERT OR IGNORE INTO products (id, sku, code_label, name, compound_name, slug, cas_number, molecular_formula, molecular_weight, sequence, purity, category_id, short_description, full_description, overview, history, research_findings, key_areas_json, mechanism_of_action, coa_lab, hplc_purity, pubchem_id, structure_image_url, status, is_featured) VALUES
('prod-hrkl', 'RT-HRKL-001', 'HR-KL', 'HR-KL Research Compound', 'KLOW (Custom Blend)', 'hr-kl-research-compound', 'N/A', 'N/A', 'N/A', 'N/A', '99.0%', 'cat-2', 'Custom research blend for advanced healing and recovery studies.', 'HR-KL is a proprietary research blend designed for advanced tissue repair and regenerative studies. Formulated for researchers investigating synergistic peptide interactions in controlled laboratory environments.', 'HR-KL combines multiple bioactive peptides selected for complementary mechanisms in tissue repair, inflammation modulation, and cellular regeneration. Exact composition available to verified researchers upon request.', NULL, NULL, NULL, NULL, 'Janoshik', '99.0% HPLC', NULL, NULL, 'active', 0);

INSERT OR IGNORE INTO product_variants (id, product_id, name, sku, dosage_mg, vial_count, price, compare_price, currency, is_default, sort_order) VALUES
('var-hrkl-80', 'prod-hrkl', '80mg × 1 vial', 'RT-HRKL-80MG-1', 80, 1, 99.00, 129.00, 'EUR', 1, 1);

INSERT OR IGNORE INTO product_images (id, product_id, url, alt, sort_order, is_primary) VALUES
('img-hrkl-80', 'prod-hrkl', 'https://r2.ridethetide.site/products/klow-80mg.png', 'HR-KL 80mg research vial', 1, 1);

-- ============================================
-- RESEARCH REFERENCES
-- ============================================

INSERT OR IGNORE INTO research_references (id, product_id, authors, title, journal, year, doi, pmid, sort_order) VALUES
('ref-dp3r-1', 'prod-dp3r', 'Rosenstock J, et al.', 'Triple hormone receptor agonist in type 2 diabetes', 'N Engl J Med', 2023, '10.1056/NEJMoa2301972', '37354173', 1),
('ref-dp3r-2', 'prod-dp3r', 'Sattar N, et al.', 'Cardiovascular risk reduction with retatrutide in obesity', 'N Engl J Med', 2024, '10.1056/NEJMoa2401580', '38498846', 2),
('ref-dp3r-3', 'prod-dp3r', 'Coskun T, et al.', 'LY3437943, a novel triple glucagon, GIP, and GLP-1 receptor agonist', 'Mol Metab', 2022, '10.1016/j.molmet.2022.101553', '35973429', 3);

INSERT OR IGNORE INTO research_references (id, product_id, authors, title, journal, year, doi, pmid, sort_order) VALUES
('ref-dp2t-1', 'prod-dp2t', 'Rosenstock J, et al.', 'Efficacy and safety of tirzepatide', 'Lancet', 2021, '10.1016/S0140-6736(21)01324-6', '34293727', 1),
('ref-dp2t-2', 'prod-dp2t', 'Gastaldelli A, et al.', 'Effect of tirzepatide on insulin sensitivity', 'Diabetes Care', 2023, '10.2337/dc23-0358', '37347291', 2);

INSERT OR IGNORE INTO research_references (id, product_id, authors, title, journal, year, doi, pmid, sort_order) VALUES
('ref-hrbpc-1', 'prod-hrbpc', 'Sikiric P, et al.', 'The pharmacological properties of BPC 157', 'Life Sci', 1993, '10.1016/0024-3205(93)90591-F', '8510290', 1),
('ref-hrbpc-2', 'prod-hrbpc', 'Chang CH, et al.', 'BPC 157 enhances healing of rat medial collateral ligament', 'J Orthop Res', 2011, '10.1002/jor.21391', '21584909', 2),
('ref-hrbpc-3', 'prod-hrbpc', 'Cerovecki I, et al.', 'BPC 157 modulates VEGF and NO synthesis', 'Med Sci Monit', 2010, '10.12659/MSM.880319', '20628637', 3);

INSERT OR IGNORE INTO research_references (id, product_id, authors, title, journal, year, doi, pmid, sort_order) VALUES
('ref-cpghk-1', 'prod-cpghk', 'Pickart L, Margolina A.', 'Regenerative and protective actions of the GHK-Cu peptide', 'Int J Mol Sci', 2018, '10.3390/ijms19071987', '29986520', 1),
('ref-cpghk-2', 'prod-cpghk', 'Pickart L, et al.', 'GHK peptide as a natural modulator of multiple cellular pathways', 'Biomol Concepts', 2012, '10.1515/bmc-2012-0002', '22644660', 2);

INSERT OR IGNORE INTO research_references (id, product_id, authors, title, journal, year, doi, pmid, sort_order) VALUES
('ref-gpcjc-1', 'prod-gpcjc', 'Teichman SL, et al.', 'Prolonged stimulation of growth hormone by CJC-1295', 'Endocrine', 2006, '10.1385/ENDO:31:1:41', '16612908', 1),
('ref-gpcjc-2', 'prod-gpcjc', 'Ionescu M, Frohman LA.', 'Pulsatile secretion of growth hormone persists during continuous stimulation by CJC-1295', 'J Clin Endocrinol Metab', 2006, '10.1210/jc.2005-1704', '16449377', 2);

INSERT OR IGNORE INTO research_references (id, product_id, authors, title, journal, year, doi, pmid, sort_order) VALUES
('ref-gptes-1', 'prod-gptes', 'Frost RA, et al.', 'Tesamorelin, a growth hormone-releasing factor analog', 'AIDS', 2010, '10.1097/QAD.0b013e32833f8815', '20588185', 1);

INSERT OR IGNORE INTO research_references (id, product_id, authors, title, journal, year, doi, pmid, sort_order) VALUES
('ref-hrep-1', 'prod-hrep', 'Khavinson VKh, et al.', 'Epitalon peptide induces telomerase activity', 'Bull Exp Biol Med', 2003, '10.1023/A:1026297029015', '12937682', 1);

INSERT OR IGNORE INTO research_references (id, product_id, authors, title, journal, year, doi, pmid, sort_order) VALUES
('ref-hrmc-1', 'prod-hrmc', 'Lee C, et al.', 'The mitochondrial-derived peptide MOTS-c promotes metabolic homeostasis', 'Cell Metab', 2015, '10.1016/j.cmet.2015.09.005', '26365113', 1);

INSERT OR IGNORE INTO research_references (id, product_id, authors, title, journal, year, doi, pmid, sort_order) VALUES
('ref-lenad-1', 'prod-lenad', 'Imai S, Guarente L.', 'NAD+ and sirtuins in aging and disease', 'Trends Cell Biol', 2014, '10.1016/j.tcb.2014.04.002', '24786309', 1);

INSERT OR IGNORE INTO research_references (id, product_id, authors, title, journal, year, doi, pmid, sort_order) VALUES
('ref-ntse-1', 'prod-ntse', 'Stvolinsky SL, et al.', 'Neuroprotective properties of Semax', 'Bull Exp Biol Med', 2011, '10.1007/s10517-011-1426-2', '22332966', 1);

INSERT OR IGNORE INTO research_references (id, product_id, authors, title, journal, year, doi, pmid, sort_order) VALUES
('ref-ntsl-1', 'prod-ntsl', 'Uchakina ON, et al.', 'Immunomodulatory effects of Selank', 'Bull Exp Biol Med', 2008, '10.1007/s10517-008-0066-7', '19089615', 1);

-- ============================================
-- INVENTORY
-- ============================================

INSERT OR IGNORE INTO inventory (id, product_id, quantity, reserved, low_stock_threshold) VALUES
('inv-dp3r', 'prod-dp3r', 100, 0, 5),
('inv-dp2t', 'prod-dp2t', 100, 0, 5),
('inv-hrbpc', 'prod-hrbpc', 100, 0, 5),
('inv-cpghk', 'prod-cpghk', 100, 0, 5),
('inv-gpcjc', 'prod-gpcjc', 100, 0, 5),
('inv-gptes', 'prod-gptes', 100, 0, 5),
('inv-hrep', 'prod-hrep', 100, 0, 5),
('inv-hrmc', 'prod-hrmc', 100, 0, 5),
('inv-lenad', 'prod-lenad', 100, 0, 5),
('inv-hrmt1', 'prod-hrmt1', 100, 0, 5),
('inv-hrmt2', 'prod-hrmt2', 100, 0, 5),
('inv-hrpt', 'prod-hrpt', 100, 0, 5),
('inv-hrvip', 'prod-hrvip', 100, 0, 5),
('inv-gpia', 'prod-gpia', 100, 0, 5),
('inv-ntse', 'prod-ntse', 100, 0, 5),
('inv-ntsl', 'prod-ntsl', 100, 0, 5),
('inv-gpser', 'prod-gpser', 100, 0, 5),
('inv-hrwv', 'prod-hrwv', 100, 0, 5),
('inv-cpgk', 'prod-cpgk', 100, 0, 5),
('inv-hrkpv', 'prod-hrkpv', 100, 0, 5),
('inv-leglu', 'prod-leglu', 100, 0, 5),
('inv-gpaod', 'prod-gpaod', 100, 0, 5),
('inv-dpcag', 'prod-dpcag', 100, 0, 5),
('inv-hrpi', 'prod-hrpi', 100, 0, 5),
('inv-hrkl', 'prod-hrkl', 100, 0, 5);

-- ============================================
-- AD ACCOUNTS (Euro market focus)
-- ============================================

INSERT OR IGNORE INTO ad_accounts (id, name, platform, pixel_id, is_active, is_primary, geo_target) VALUES
('ad-1', 'mainxacc1', 'meta', 'REPLACE_META_PIXEL', 1, 1, 'DE,AT,CH,NL,BE'),
('ad-2', 'tikxacc1', 'tiktok', 'REPLACE_TIKTOK_PIXEL', 1, 1, 'DE,AT,CH,NL,BE'),
('ad-3', 'google1', 'google', 'AW-REPLACE_GOOGLE', 1, 1, 'DE,AT,CH,NL,BE'),
('ad-4', 'reditxacc1', 'reddit', 'REPLACE_REDDIT_PIXEL', 1, 1, 'DE,AT,CH,NL,BE');


-- ============================================
-- COA BATCHES
-- ============================================

INSERT OR IGNORE INTO coa_batches (id, product_id, batch_number, test_type, test_date, result_value, pdf_url, sort_order) VALUES
('coa-dp3r-1', 'prod-dp3r', 'DPS-6963679', 'purity', '2024-06-01', '99.2%', NULL, 1),
('coa-dp3r-2', 'prod-dp3r', 'DPS-7058391', 'purity', '2024-08-15', '99.1%', NULL, 2),
('coa-dp3r-3', 'prod-dp3r', 'DPS-6963679', 'endotoxin', '2024-06-01', '<0.01 EU/mg', NULL, 3),
('coa-dp2t-1', 'prod-dp2t', 'DPS-7123456', 'purity', '2024-07-10', '99.1%', NULL, 1),
('coa-dp2t-2', 'prod-dp2t', 'DPS-7234567', 'purity', '2024-09-20', '99.0%', NULL, 2),
('coa-hrbpc-1', 'prod-hrbpc', 'DPS-7345678', 'purity', '2024-05-15', '99.5%', NULL, 1),
('coa-hrbpc-2', 'prod-hrbpc', 'DPS-7456789', 'endotoxin', '2024-05-15', '<0.01 EU/mg', NULL, 2),
('coa-cpghk-1', 'prod-cpghk', 'DPS-7567890', 'purity', '2024-04-20', '99.4%', NULL, 1),
('coa-hrmc-1', 'prod-hrmc', 'DPS-7678901', 'purity', '2024-03-10', '99.2%', NULL, 1),
('coa-hrmc-2', 'prod-hrmc', 'DPS-7789012', 'endotoxin', '2024-03-10', '<0.01 EU/mg', NULL, 2),
('coa-hrep-1', 'prod-hrep', 'DPS-7890123', 'purity', '2024-02-28', '99.0%', NULL, 1),
('coa-gpcjc-1', 'prod-gpcjc', 'DPS-7901234', 'purity', '2024-06-20', '99.3%', NULL, 1),
('coa-gptes-1', 'prod-gptes', 'DPS-8012345', 'purity', '2024-01-15', '99.1%', NULL, 1),
('coa-gpia-1', 'prod-gpia', 'DPS-8123456', 'purity', '2024-07-05', '99.3%', NULL, 1),
('coa-ntse-1', 'prod-ntse', 'DPS-8234567', 'purity', '2024-08-01', '99.2%', NULL, 1),
('coa-ntsl-1', 'prod-ntsl', 'DPS-8345678', 'purity', '2024-09-10', '99.1%', NULL, 1),
('coa-hrwv-1', 'prod-hrwv', 'DPS-8456789', 'purity', '2024-10-01', '99.2%', NULL, 1),
('coa-cpgk-1', 'prod-cpgk', 'DPS-8567890', 'purity', '2024-11-15', '99.1%', NULL, 1);
