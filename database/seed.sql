-- Seed data for Ride The Tide — Exact Direct Peptides Clone (Euro Pricing)
-- USD prices converted to EUR at ~0.92 rate
-- Run: wrangler d1 execute thetide-db --file=./seed.sql

-- Categories
INSERT OR IGNORE INTO categories (id, name, slug, description, sort_order) VALUES
('cat-1', 'Peptide Vials', 'peptide-vials', 'Lyophilized research peptide vials', 1),
('cat-2', 'Peptide Blends', 'peptide-blends', 'Synergistic peptide combinations', 2),
('cat-3', 'Lab Essentials', 'lab-essentials', 'Research supplies and accessories', 3);

-- ============================================
-- PRODUCTS — Exact Direct Peptides Catalog
-- ============================================

-- 1. BPC-157
INSERT OR IGNORE INTO products (id, sku, code_label, name, compound_name, slug, cas_number, molecular_formula, molecular_weight, sequence, purity, category_id, short_description, full_description, overview, history, research_findings, key_areas_json, mechanism_of_action, coa_lab, hplc_purity, pubchem_id, structure_image_url, status, is_featured) VALUES
('prod-bpc157', 'RT-BPC157-001', 'BPC-157', 'BPC-157', 'BPC-157', 'bpc-157', '137525-51-0', 'C62H98N16O22', '1419.56', 'Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val', '99.5%', 'cat-1', 'Pentadecapeptide for tissue regeneration and healing research.', 'BPC-157 is a synthetic pentadecapeptide derived from human gastric juice protein BPC. It is widely studied for its potential effects on tissue regeneration, angiogenesis, and wound healing in controlled laboratory settings.', 'BPC-157 is a synthetic pentadecapeptide that has been studied in structural, vascular, epithelial, and systemic models, with reports of activity in collagen regulation, extracellular matrix remodeling, angiogenesis, and molecular migration. Research also highlights signaling roles in preclinical systems, supporting molecular integrity and pathway dynamics.', 'BPC-157 was first identified in the early 1990s as a partial sequence of the body protection compound (BPC) found in human gastric juice. Early research focused on its cytoprotective properties in the gastrointestinal tract. Subsequent studies expanded to investigate its effects on tendon, ligament, and muscle tissue in preclinical models.', 'BPC-157 has been examined in structural, vascular, epithelial, and systemic models, with studies highlighting its influence on collagen regulation, extracellular matrix remodeling, angiogenesis, and molecular migration. Research also points to its role in signaling pathways and molecular dynamics in preclinical and laboratory settings.', '["Structural: Collagen, matrix, tendon","Vascular: Angiogenesis, nitric oxide, signaling","Epithelial: Migration, vessel formation, matrix","Systemic: Signaling, viability, pathway dynamics"]', 'BPC-157 promotes angiogenesis and modulates nitric oxide synthesis. It has been shown to accelerate tendon-to-bone healing and improve muscle recovery in preclinical studies.', 'Janoshik', '99.5% HPLC', '9941957', NULL, 'active', 1);

INSERT OR IGNORE INTO product_variants (id, product_id, name, sku, dosage_mg, vial_count, price, compare_price, currency, is_default, sort_order) VALUES
('var-bpc157-5', 'prod-bpc157', '5mg × 1 vial', 'RT-BPC157-5MG-1', 5, 1, 35.88, NULL, 'EUR', 0, 1),
('var-bpc157-10', 'prod-bpc157', '10mg × 1 vial', 'RT-BPC157-10MG-1', 10, 1, 54.28, NULL, 'EUR', 1, 2);

INSERT OR IGNORE INTO product_images (id, product_id, url, alt, sort_order, is_primary) VALUES
('img-bpc157', 'prod-bpc157', 'https://r2.ridethetide.site/products/bpc-157.png', 'BPC-157 research vial', 1, 1);

-- 2. BPC-157 + TB-500 Blend
INSERT OR IGNORE INTO products (id, sku, code_label, name, compound_name, slug, cas_number, molecular_formula, molecular_weight, sequence, purity, category_id, short_description, full_description, overview, history, research_findings, key_areas_json, mechanism_of_action, coa_lab, hplc_purity, pubchem_id, structure_image_url, status, is_featured) VALUES
('prod-bpctb', 'RT-BPCTB-001', 'BPC-157+TB-500', 'BPC-157 + TB-500', 'BPC-157 / TB-500 Blend', 'bpc-157-tb-500', '137525-51-0 / 77591-33-4', 'C62H98N16O22 / C212H350N56O78S', '1419.56 / 4963.49', 'Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val / Ac-Ser-Asp-Lys-Pro-Asp-Met-Ala-Glu-Ile-Glu-Lys-Phe-Asp-Lys-Ser-Lys-Leu-Lys-Lys-Thr-Glu-Thr-Glu-Lys-Asp-Lys-OH', '99.2%', 'cat-2', 'Synergistic healing peptide blend for tissue repair research.', 'BPC-157 + TB-500 is a research blend combining two extensively studied peptides. It is designed for investigating synergistic effects on tissue repair, cellular migration, and regenerative pathways in controlled laboratory environments.', 'BPC-157 + TB-500 is a two-component peptide formulation that has been studied in structural, vascular, and systemic models. Research highlights coordinated signaling interactions, including receptor-mediated activity, intracellular signaling cascades, and integrated cellular responses in preclinical settings.', 'The combination of BPC-157 and TB-500 emerged from independent research tracks investigating tissue repair mechanisms. BPC-157 was identified from gastric juice extracts in the 1990s, while TB-500 research evolved from studies on thymosin beta-4 and actin regulation. The blend represents a convergence of these research pathways.', 'BPC-157 + TB-500 has been examined in multi-pathway interaction models, with studies highlighting coordinated signaling between fibroblastic activity pathways and actin-binding protein regulation. Research points to potential synergistic effects in cell migration dynamics, cytoskeletal organization, and integrated cellular responses.', '["Structural: Tendon, ligament, matrix repair","Vascular: Angiogenesis, perfusion","Cellular: Migration, actin regulation","Systemic: Multi-pathway coordination"]', 'BPC-157 promotes angiogenesis via VEGF upregulation. TB-500 (thymosin beta-4 fragment) regulates actin and enhances cell migration. Together they may provide complementary mechanisms for tissue repair.', 'Janoshik', '99.2% HPLC', NULL, NULL, 'active', 0);

INSERT OR IGNORE INTO product_variants (id, product_id, name, sku, dosage_mg, vial_count, price, compare_price, currency, is_default, sort_order) VALUES
('var-bpctb-10', 'prod-bpctb', '10mg blend × 1 vial', 'RT-BPCTB-10MG-1', 10, 1, 72.68, NULL, 'EUR', 1, 1),
('var-bpctb-20', 'prod-bpctb', '20mg blend × 1 vial', 'RT-BPCTB-20MG-1', 20, 1, 118.68, NULL, 'EUR', 0, 2);

INSERT OR IGNORE INTO product_images (id, product_id, url, alt, sort_order, is_primary) VALUES
('img-bpctb', 'prod-bpctb', 'https://r2.ridethetide.site/products/bpc-157-tb-500.png', 'BPC-157 + TB-500 blend vial', 1, 1);

-- 3. CJC-1295 + Ipamorelin Blend
INSERT OR IGNORE INTO products (id, sku, code_label, name, compound_name, slug, cas_number, molecular_formula, molecular_weight, sequence, purity, category_id, short_description, full_description, overview, history, research_findings, key_areas_json, mechanism_of_action, coa_lab, hplc_purity, pubchem_id, structure_image_url, status, is_featured) VALUES
('prod-cjcipa', 'RT-CJCIPA-001', 'CJC-1295+IPA', 'CJC-1295 + Ipamorelin', 'CJC-1295 / Ipamorelin Blend', 'cjc-1295-ipamorelin', '863288-34-0 / 170851-70-4', 'C165H269N47O46 / C38H49N9O5', '3647.28 / 711.85', 'Tyr-D-Ala-Asp-Ala-Ile-Phe-Thr-Gln-Ser-Tyr-Arg-Lys-Val-Leu-Ala-Gln-Leu-Ser-Ala-Arg-Lys-Leu-Leu-Gln-Asp-Ile-Leu-Ser-Arg-Lys-Lys(Mal)-NH2 / Aib-His-D-2-Nal-D-Phe-Lys-NH2', '99.3%', 'cat-2', 'Growth hormone secretagogue blend for endocrine research.', 'CJC-1295 + Ipamorelin is a research blend containing a modified GHRH analog and a selective GH secretagogue. It is designed for studying growth hormone secretion, IGF-1 levels, and cellular regeneration in controlled laboratory environments.', 'CJC-1295 + Ipamorelin has been studied in endocrine and metabolic models, with research highlighting synergistic effects on growth hormone release, IGF-1 production, and somatotroph signaling. Studies report enhanced pulsatile GH secretion compared to single-compound administration.', 'CJC-1295 was developed as a long-acting GHRH analog with DAC (drug affinity complex) to extend half-life. Ipamorelin emerged from research into selective ghrelin receptor agonists. The combination was investigated to leverage complementary mechanisms: CJC-1295 for sustained GHRH receptor activation and Ipamorelin for selective GH secretagogue receptor stimulation.', 'CJC-1295 + Ipamorelin has been examined in endocrine models, with studies highlighting enhanced growth hormone secretion through dual receptor pathways. Research points to synergistic effects on IGF-1 levels, metabolic regulation, and cellular regeneration markers in preclinical settings.', '["Endocrine: GH secretion, IGF-1","Metabolic: Lipid oxidation, energy","Cellular: Regeneration, repair","Systemic: Pulsatile hormone dynamics"]', 'CJC-1295 binds GHRH receptors with extended half-life via albumin binding. Ipamorelin selectively activates GH secretagogue receptors without cortisol/prolactin effects. Together they provide complementary GH release profiles.', 'Janoshik', '99.3% HPLC', NULL, NULL, 'active', 0);

INSERT OR IGNORE INTO product_variants (id, product_id, name, sku, dosage_mg, vial_count, price, compare_price, currency, is_default, sort_order) VALUES
('var-cjcipa-10', 'prod-cjcipa', '10mg blend × 1 vial', 'RT-CJCIPA-10MG-1', 10, 1, 72.68, NULL, 'EUR', 1, 1);

INSERT OR IGNORE INTO product_images (id, product_id, url, alt, sort_order, is_primary) VALUES
('img-cjcipa', 'prod-cjcipa', 'https://r2.ridethetide.site/products/cjc-1295-ipamorelin.png', 'CJC-1295 + Ipamorelin blend vial', 1, 1);

-- 4. DP3-R (Retatrutide)
INSERT OR IGNORE INTO products (id, sku, code_label, name, compound_name, slug, cas_number, molecular_formula, molecular_weight, sequence, purity, category_id, short_description, full_description, overview, history, research_findings, key_areas_json, mechanism_of_action, coa_lab, hplc_purity, pubchem_id, structure_image_url, status, is_featured) VALUES
('prod-dp3r', 'RT-DP3R-001', 'DP3-R', 'DP3-R', 'Retatrutide', 'dp3-r', '2381089-83-2', 'C221H342N46O68', '4845.44', 'H-Tyr-Aib-Glu-Gly-Thr-Phe-Thr-Ser-Asp-Tyr-Ser-Lys-Tyr-Leu-Asp-Ser-Arg-Arg-Ala-Gln-Aib-Phe-Ile-Glu-Trp-Leu-Ile-Lys-Gly-Gly-Pro-Ser-Ser-Gly-Ala-Pro-Pro-Pro-Ser-NH2', '99.2%', 'cat-1', 'Triple agonist peptide for metabolic and energy homeostasis research.', 'DP3-R is a synthetic investigational peptide developed as a multi-pathway agonist. It is currently being studied for its potential effects on receptor-mediated signaling, molecular dynamics, and endocrine function in preclinical research models.', 'DP3-R is a synthetic investigational peptide developed as a multi-pathway agonist. It is currently being studied for its potential effects on receptor-mediated signaling, molecular dynamics, and endocrine function in preclinical research models. By activating multiple target receptor subtypes, DP3-R demonstrates broad systemic effects under investigation for their relevance in endocrine and pathway-level research.', 'The development of DP3-R builds on decades of research into peptide signaling science. Early studies with single pathway agonists established their role in downstream signaling and receptor activity. Subsequent research expanded to dual agonist frameworks, paving the way for DP3-R, which uniquely integrates three pathway targets. This multi-agonist design reflects a new direction in peptide research aimed at investigating broader receptor-mediated modulation in preclinical laboratory settings.', 'DP3-R has been examined in endocrine and systemic models, with studies highlighting its influence on receptor binding kinetics, downstream signaling cascades, lipid pathway dynamics, and integrated endocrine pathways. Research also points to its role in multi-system signaling and pathway characterization in preclinical and laboratory settings.', '["Endocrine: Receptor binding, signaling, cascades","Pathway: Target subtypes, modulation, dynamics","Vascular: Lipid pathways, hepatic signaling, markers","Systemic: Multi-pathway signaling, resilience, characterization"]', 'DP3-R acts as an agonist at GLP-1R, GIPR, and GCGR simultaneously. This triple mechanism enhances insulin secretion, suppresses glucagon release, delays gastric emptying, and increases energy expenditure.', 'Janoshik', '99.2% HPLC', '474492335', NULL, 'active', 1);

INSERT OR IGNORE INTO product_variants (id, product_id, name, sku, dosage_mg, vial_count, price, compare_price, currency, is_default, sort_order) VALUES
('var-dp3r-5', 'prod-dp3r', '5mg × 1 vial', 'RT-DP3R-5MG-1', 5, 1, 91.88, NULL, 'EUR', 0, 1),
('var-dp3r-10', 'prod-dp3r', '10mg × 1 vial', 'RT-DP3R-10MG-1', 10, 1, 127.88, NULL, 'EUR', 1, 2),
('var-dp3r-15', 'prod-dp3r', '15mg × 1 vial', 'RT-DP3R-15MG-1', 15, 1, 174.68, NULL, 'EUR', 0, 3),
('var-dp3r-30', 'prod-dp3r', '30mg × 1 vial', 'RT-DP3R-30MG-1', 30, 1, 293.48, NULL, 'EUR', 0, 4);

INSERT OR IGNORE INTO product_images (id, product_id, url, alt, sort_order, is_primary) VALUES
('img-dp3r', 'prod-dp3r', 'https://r2.ridethetide.site/products/dp3-r.png', 'DP3-R research vial', 1, 1);

-- 5. DP2-T (Tirzepatide)
INSERT OR IGNORE INTO products (id, sku, code_label, name, compound_name, slug, cas_number, molecular_formula, molecular_weight, sequence, purity, category_id, short_description, full_description, overview, history, research_findings, key_areas_json, mechanism_of_action, coa_lab, hplc_purity, pubchem_id, structure_image_url, status, is_featured) VALUES
('prod-dp2t', 'RT-DP2T-001', 'DP2-T', 'DP2-T', 'Tirzepatide', 'dp2-t', '2023788-19-2', 'C225H348N56O68', '4813.45', 'Tyr-Aib-Glu-Gly-Thr-Phe-Thr-Ser-Asp-Tyr-Ser-Lys-Tyr-Leu-Asp-Ser-Arg-Arg-Ala-Gln-Aib-Phe-Ile-Glu-Trp-Leu-Ile-Lys-Gly-Gly-Pro-Ser-Ser-Gly-Ala-Pro-Pro-Pro-Ser-NH2', '99.1%', 'cat-1', 'Dual GIP/GLP-1 receptor agonist for metabolic research.', 'DP2-T is a dual glucose-dependent insulinotropic polypeptide (GIP) and glucagon-like peptide-1 (GLP-1) receptor agonist. It is studied for metabolic regulation, insulin secretion, and energy balance in controlled laboratory environments.', 'DP2-T is a dual GIP/GLP-1 receptor agonist that has been studied in metabolic, endocrine, and systemic models. Research highlights its effects on glucose-dependent insulin secretion, glucagon suppression, gastric emptying delay, and energy balance regulation in preclinical settings.', 'DP2-T development emerged from research into incretin hormones and their role in glucose homeostasis. Early work on GLP-1 analogs established the therapeutic potential of single-pathway agonists. Subsequent research into GIP receptor biology led to the hypothesis that dual agonism might provide enhanced metabolic benefits through complementary mechanisms.', 'DP2-T has been examined in metabolic and endocrine models, with studies highlighting its influence on insulin secretion, glucagon suppression, gastric motility, and lipid metabolism. Research points to its role in integrated metabolic regulation and multi-system signaling in preclinical and laboratory settings.', '["Metabolic: Glucose, insulin, lipids","Endocrine: GIP/GLP-1 receptor signaling","Gastrointestinal: Gastric emptying, motility","Systemic: Energy balance, weight regulation"]', 'DP2-T simultaneously activates GIP and GLP-1 receptors. The GIP component enhances insulin secretion in a glucose-dependent manner, while the GLP-1 component suppresses glucagon secretion and delays gastric emptying.', 'Janoshik', '99.1% HPLC', NULL, NULL, 'active', 1);

INSERT OR IGNORE INTO product_variants (id, product_id, name, sku, dosage_mg, vial_count, price, compare_price, currency, is_default, sort_order) VALUES
('var-dp2t-10', 'prod-dp2t', '10mg × 1 vial', 'RT-DP2T-10MG-1', 10, 1, 63.48, NULL, 'EUR', 1, 1),
('var-dp2t-15', 'prod-dp2t', '15mg × 1 vial', 'RT-DP2T-15MG-1', 15, 1, 91.88, NULL, 'EUR', 0, 2),
('var-dp2t-30', 'prod-dp2t', '30mg × 1 vial', 'RT-DP2T-30MG-1', 30, 1, 155.48, NULL, 'EUR', 0, 3);

INSERT OR IGNORE INTO product_images (id, product_id, url, alt, sort_order, is_primary) VALUES
('img-dp2t', 'prod-dp2t', 'https://r2.ridethetide.site/products/dp2-t.png', 'DP2-T research vial', 1, 1);

-- 6. TB-500
INSERT OR IGNORE INTO products (id, sku, code_label, name, compound_name, slug, cas_number, molecular_formula, molecular_weight, sequence, purity, category_id, short_description, full_description, overview, history, research_findings, key_areas_json, mechanism_of_action, coa_lab, hplc_purity, pubchem_id, structure_image_url, status, is_featured) VALUES
('prod-tb500', 'RT-TB500-001', 'TB-500', 'TB-500', 'Thymosin Beta-4 Fragment', 'tb-500', '77591-33-4', 'C212H350N56O78S', '4963.49', 'Ac-Ser-Asp-Lys-Pro-Asp-Met-Ala-Glu-Ile-Glu-Lys-Phe-Asp-Lys-Ser-Lys-Leu-Lys-Lys-Thr-Glu-Thr-Glu-Lys-Asp-Lys-OH', '99.3%', 'cat-1', 'Actin-regulating peptide for cell migration and tissue repair research.', 'TB-500 is a synthetic fragment of thymosin beta-4, a naturally occurring peptide. It is studied for its effects on actin regulation, cell migration, and tissue repair in controlled laboratory settings.', 'TB-500 is a synthetic fragment of thymosin beta-4 that has been studied in structural, vascular, and cellular models. Research highlights its role in actin-binding protein regulation, cell migration dynamics, and cytoskeletal organization in preclinical settings.', 'TB-500 research evolved from studies on thymosin beta-4, a peptide originally isolated from thymus tissue in the 1960s. The Ac-SDKP fragment (TB-500) was identified as the active domain responsible for actin regulation and cell migration. Research expanded to investigate its effects on wound healing, tissue repair, and cardiovascular models.', 'TB-500 has been examined in cellular and structural models, with studies highlighting its influence on actin polymerization, cell migration, and tissue remodeling. Research points to its role in angiogenesis, inflammation modulation, and extracellular matrix dynamics in preclinical and laboratory settings.', '["Cellular: Actin regulation, migration","Structural: Tissue remodeling, repair","Vascular: Angiogenesis, perfusion","Systemic: Inflammation modulation"]', 'TB-500 upregulates actin and enhances cell migration through actin-binding protein regulation. It promotes angiogenesis and modulates inflammatory responses in preclinical models.', 'Janoshik', '99.3% HPLC', '16132393', NULL, 'active', 0);

INSERT OR IGNORE INTO product_variants (id, product_id, name, sku, dosage_mg, vial_count, price, compare_price, currency, is_default, sort_order) VALUES
('var-tb500-5', 'prod-tb500', '5mg × 1 vial', 'RT-TB500-5MG-1', 5, 1, 45.08, NULL, 'EUR', 1, 1),
('var-tb500-10', 'prod-tb500', '10mg × 1 vial', 'RT-TB500-10MG-1', 10, 1, 72.68, NULL, 'EUR', 0, 2);

INSERT OR IGNORE INTO product_images (id, product_id, url, alt, sort_order, is_primary) VALUES
('img-tb500', 'prod-tb500', 'https://r2.ridethetide.site/products/tb-500.png', 'TB-500 research vial', 1, 1);

-- 7. Tesamorelin
INSERT OR IGNORE INTO products (id, sku, code_label, name, compound_name, slug, cas_number, molecular_formula, molecular_weight, sequence, purity, category_id, short_description, full_description, overview, history, research_findings, key_areas_json, mechanism_of_action, coa_lab, hplc_purity, pubchem_id, structure_image_url, status, is_featured) VALUES
('prod-tesa', 'RT-TESA-001', 'Tesamorelin', 'Tesamorelin', 'Tesamorelin', 'tesamorelin', '218949-48-5', 'C221H366N72O67S', '5135.86', 'His-Ala-Asp-Ala-Ile-Phe-Thr-Asn-Ser-Tyr-Arg-Lys-Val-Leu-Gly-Gln-Leu-Ser-Ala-Arg-Lys-Leu-Leu-Gln-Asp-Ile-Met-Ser-Arg-Gln-Gln-Gly-Glu-Ser-Asn-Gln-Glu-Arg-Gly-Ala-Arg-Ala-Arg-Leu-NH2', '99.1%', 'cat-1', 'Growth hormone releasing factor analog for metabolic research.', 'Tesamorelin is a synthetic growth hormone releasing factor (GRF) analog. It is studied for its effects on growth hormone secretion, visceral adipose tissue metabolism, and metabolic syndrome in controlled laboratory settings.', 'Tesamorelin is a synthetic GRF analog that has been studied in endocrine and metabolic models. Research highlights its effects on GH secretion, IGF-1 production, and body composition regulation in preclinical settings.', 'Tesamorelin was developed as a modified GRF analog with enhanced stability and receptor affinity. It was originally investigated for its effects on HIV-associated lipodystrophy and subsequently expanded to broader metabolic research applications.', 'Tesamorelin has been examined in endocrine and metabolic models, with studies highlighting its influence on growth hormone pulsatility, IGF-1 levels, and lipid metabolism. Research points to its role in body composition, visceral adipose regulation, and metabolic health markers in preclinical settings.', '["Endocrine: GH secretion, IGF-1","Metabolic: Lipids, adipose tissue","Body Composition: Visceral fat, lean mass","Systemic: Metabolic health markers"]', 'Tesamorelin binds to GRF receptors in the anterior pituitary, stimulating pulsatile GH release. It preserves natural feedback mechanisms of the GH/IGF-1 axis.', 'Janoshik', '99.1% HPLC', NULL, NULL, 'active', 0);

INSERT OR IGNORE INTO product_variants (id, product_id, name, sku, dosage_mg, vial_count, price, compare_price, currency, is_default, sort_order) VALUES
('var-tesa-10', 'prod-tesa', '10mg × 1 vial', 'RT-TESA-10MG-1', 10, 1, 109.48, NULL, 'EUR', 1, 1);

INSERT OR IGNORE INTO product_images (id, product_id, url, alt, sort_order, is_primary) VALUES
('img-tesa', 'prod-tesa', 'https://r2.ridethetide.site/products/tesamorelin.png', 'Tesamorelin research vial', 1, 1);

-- 8. Sermorelin
INSERT OR IGNORE INTO products (id, sku, code_label, name, compound_name, slug, cas_number, molecular_formula, molecular_weight, sequence, purity, category_id, short_description, full_description, overview, history, research_findings, key_areas_json, mechanism_of_action, coa_lab, hplc_purity, pubchem_id, structure_image_url, status, is_featured) VALUES
('prod-serm', 'RT-SERM-001', 'Sermorelin', 'Sermorelin', 'Sermorelin', 'sermorelin', '86168-78-7', 'C149H246N44O42S', '3357.88', 'Tyr-Ala-Asp-Ala-Ile-Phe-Thr-Asn-Ser-Tyr-Arg-Lys-Val-Leu-Gly-Gln-Leu-Ser-Ala-Arg-Lys-Leu-Leu-Gln-Asp-Ile-Met-Ser-Arg-NH2', '99.0%', 'cat-1', 'Growth hormone releasing hormone analog for endocrine research.', 'Sermorelin is a synthetic analog of growth hormone releasing hormone (GHRH 1-29). It is studied for its effects on growth hormone secretion, IGF-1 production, and metabolic regulation in controlled laboratory environments.', 'Sermorelin is a synthetic GHRH analog that has been studied in endocrine and metabolic models. Research highlights its effects on pulsatile GH secretion, sleep quality, and metabolic markers in preclinical settings.', 'Sermorelin was developed as the first commercially available GHRH analog. It consists of the first 29 amino acids of natural GHRH, which contain the full biological activity of the parent molecule. Research has investigated its role in growth hormone deficiency, sleep architecture, and metabolic regulation.', 'Sermorelin has been examined in endocrine models, with studies highlighting its influence on pulsatile GH release, IGF-1 production, and sleep architecture. Research points to its role in metabolic regulation, body composition, and cellular repair mechanisms in preclinical settings.', '["Endocrine: GH pulsatility, IGF-1","Sleep: Architecture, REM, slow-wave","Metabolic: Lipids, glucose","Cellular: Repair, regeneration"]', 'Sermorelin binds to GHRH receptors in the anterior pituitary, stimulating pulsatile GH release. It preserves the natural feedback mechanisms of the GH/IGF-1 axis.', 'Janoshik', '99.0% HPLC', NULL, NULL, 'active', 0);

INSERT OR IGNORE INTO product_variants (id, product_id, name, sku, dosage_mg, vial_count, price, compare_price, currency, is_default, sort_order) VALUES
('var-serm-5', 'prod-serm', '5mg × 1 vial', 'RT-SERM-5MG-1', 5, 1, 45.08, NULL, 'EUR', 1, 1),
('var-serm-10', 'prod-serm', '10mg × 1 vial', 'RT-SERM-10MG-1', 10, 1, 72.68, NULL, 'EUR', 0, 2);

INSERT OR IGNORE INTO product_images (id, product_id, url, alt, sort_order, is_primary) VALUES
('img-serm', 'prod-serm', 'https://r2.ridethetide.site/products/sermorelin.png', 'Sermorelin research vial', 1, 1);

-- 9. Ipamorelin
INSERT OR IGNORE INTO products (id, sku, code_label, name, compound_name, slug, cas_number, molecular_formula, molecular_weight, sequence, purity, category_id, short_description, full_description, overview, history, research_findings, key_areas_json, mechanism_of_action, coa_lab, hplc_purity, pubchem_id, structure_image_url, status, is_featured) VALUES
('prod-ipa', 'RT-IPA-001', 'Ipamorelin', 'Ipamorelin', 'Ipamorelin', 'ipamorelin', '170851-70-4', 'C38H49N9O5', '711.85', 'Aib-His-D-2-Nal-D-Phe-Lys-NH2', '99.3%', 'cat-1', 'Selective growth hormone secretagogue for endocrine research.', 'Ipamorelin is a selective growth hormone secretagogue and ghrelin receptor agonist. It is studied for its ability to stimulate GH release without affecting cortisol, prolactin, or other hormones in controlled laboratory settings.', 'Ipamorelin is a selective GH secretagogue that has been studied in endocrine and metabolic models. Research highlights its specific effects on GH release without significant impact on cortisol, prolactin, or aldosterone levels in preclinical settings.', 'Ipamorelin was developed through structure-activity relationship studies on GHRP-6. Researchers sought to create a more selective compound that would stimulate GH release without the undesirable side effects of earlier secretagogues. It emerged as the first selective GH secretagogue with minimal off-target effects.', 'Ipamorelin has been examined in endocrine models, with studies highlighting its selective activation of ghrelin receptors on somatotrophs. Research points to its role in GH secretion, IGF-1 production, and metabolic regulation without significant cortisol or prolactin elevation in preclinical settings.', '["Endocrine: Selective GH secretion","Metabolic: IGF-1, lipids","Cellular: Repair, regeneration","Systemic: Minimal off-target effects"]', 'Ipamorelin selectively binds to ghrelin receptors (GHS-R1a) on somatotrophs, triggering GH release via IP3/DAG and cAMP pathways. Unlike other GHRPs, it does not significantly elevate cortisol, prolactin, or aldosterone.', 'Janoshik', '99.3% HPLC', NULL, NULL, 'active', 0);

INSERT OR IGNORE INTO product_variants (id, product_id, name, sku, dosage_mg, vial_count, price, compare_price, currency, is_default, sort_order) VALUES
('var-ipa-5', 'prod-ipa', '5mg × 1 vial', 'RT-IPA-5MG-1', 5, 1, 45.08, NULL, 'EUR', 1, 1),
('var-ipa-10', 'prod-ipa', '10mg × 1 vial', 'RT-IPA-10MG-1', 10, 1, 72.68, NULL, 'EUR', 0, 2);

INSERT OR IGNORE INTO product_images (id, product_id, url, alt, sort_order, is_primary) VALUES
('img-ipa', 'prod-ipa', 'https://r2.ridethetide.site/products/ipamorelin.png', 'Ipamorelin research vial', 1, 1);

-- 10. MOTS-c
INSERT OR IGNORE INTO products (id, sku, code_label, name, compound_name, slug, cas_number, molecular_formula, molecular_weight, sequence, purity, category_id, short_description, full_description, overview, history, research_findings, key_areas_json, mechanism_of_action, coa_lab, hplc_purity, pubchem_id, structure_image_url, status, is_featured) VALUES
('prod-mots', 'RT-MOTS-001', 'MOTS-c', 'MOTS-c', 'MOTS-c', 'mots-c', '1627580-64-6', 'C101H152N28O22S2', '2244.64', 'Met-Arg-Trp-Gln-Glu-Trp-Gln-Glu-Arg-Gln-Gly-Glu-Trp-Gln-Glu-Arg-Gln-Gly-Glu-Trp-Gln-Glu-Arg-Gln-Gly', '99.2%', 'cat-1', 'Mitochondrial-derived peptide for metabolic regulation research.', 'MOTS-c is a mitochondrial-derived peptide that plays a role in metabolic regulation, insulin sensitivity, and cellular energy homeostasis. It is studied for its potential effects on obesity, diabetes, and age-related metabolic decline.', 'MOTS-c is a mitochondrial-derived peptide that has been studied in mitochondrial, molecular, and systemic models. Research highlights its role in mitochondrial function, AMPK pathway activation, and signaling dynamics in preclinical settings.', 'MOTS-c was first described in 2015 following the discovery of short open reading frames encoded within mitochondrial DNA. Identified as a mitochondrial-derived peptide with signaling activity, it has since been studied for its ability to activate AMPK pathways and support molecular stress resistance.', 'MOTS-c has been studied in mitochondrial, molecular, and systemic models, with research highlighting its role in mitochondrial function, AMPK pathway activation, and signaling dynamics. Studies also report activity in substrate utilization, downstream markers, and molecular stress responses in preclinical settings.', '["Mitochondrial: AMPK, signaling, pathway dynamics","Molecular: Mitochondrial function, stress response, remodeling","Systemic: Signaling, resilience, viability"]', 'MOTS-c is encoded within the mitochondrial genome and acts as a signaling molecule. It improves insulin sensitivity, reduces fat accumulation, and enhances cellular respiration through AMPK pathway activation.', 'Janoshik', '99.2% HPLC', '91808068', NULL, 'active', 1);

INSERT OR IGNORE INTO product_variants (id, product_id, name, sku, dosage_mg, vial_count, price, compare_price, currency, is_default, sort_order) VALUES
('var-mots-5', 'prod-mots', '5mg × 1 vial', 'RT-MOTS-5MG-1', 5, 1, 35.88, NULL, 'EUR', 0, 1),
('var-mots-10', 'prod-mots', '10mg × 1 vial', 'RT-MOTS-10MG-1', 10, 1, 45.08, NULL, 'EUR', 1, 2);

INSERT OR IGNORE INTO product_images (id, product_id, url, alt, sort_order, is_primary) VALUES
('img-mots', 'prod-mots', 'https://r2.ridethetide.site/products/mots-c.png', 'MOTS-c research vial', 1, 1);

-- 11. NAD+
INSERT OR IGNORE INTO products (id, sku, code_label, name, compound_name, slug, cas_number, molecular_formula, molecular_weight, sequence, purity, category_id, short_description, full_description, overview, history, research_findings, key_areas_json, mechanism_of_action, coa_lab, hplc_purity, pubchem_id, structure_image_url, status, is_featured) VALUES
('prod-nad', 'RT-NAD-001', 'NAD+', 'NAD+', 'Nicotinamide Adenine Dinucleotide', 'nad-plus', '53-84-9', 'C21H28N7O14P2', '663.43', NULL, '99.5%', 'cat-3', 'Coenzyme for cellular energy metabolism research.', 'NAD+ is the oxidized form of nicotinamide adenine dinucleotide, a critical coenzyme found in all living cells. It is essential for cellular energy metabolism, DNA repair, and sirtuin-mediated longevity pathways.', 'NAD+ is a critical coenzyme that has been studied in metabolic, cellular, and aging models. Research highlights its role in redox reactions, sirtuin activation, DNA repair, and cellular energy homeostasis in preclinical settings.', 'NAD+ was first discovered in 1906 as a fermentation enhancer in yeast. Its role as an electron carrier was established in the 1930s. More recent research has focused on its function as a substrate for sirtuins, PARPs, and CD38, enzymes involved in aging, DNA repair, and metabolic regulation.', 'NAD+ has been examined in metabolic and aging models, with studies highlighting its influence on cellular respiration, DNA repair, and sirtuin activity. Research points to its role in mitochondrial function, metabolic health, and age-related decline in preclinical settings.', '["Metabolic: Redox reactions, respiration","Cellular: DNA repair, sirtuins","Aging: Decline, supplementation","Systemic: Energy homeostasis"]', 'NAD+ serves as an electron carrier in redox reactions and is a substrate for sirtuins (SIRT1-7), PARPs, and CD38. It is essential for cellular energy metabolism and DNA repair processes.', 'Janoshik', '99.5% HPLC', '5893', NULL, 'active', 0);

INSERT OR IGNORE INTO product_variants (id, product_id, name, sku, dosage_mg, vial_count, price, compare_price, currency, is_default, sort_order) VALUES
('var-nad-100', 'prod-nad', '100mg × 1 vial', 'RT-NAD-100MG-1', 100, 1, 35.88, NULL, 'EUR', 0, 1),
('var-nad-500', 'prod-nad', '500mg × 1 vial', 'RT-NAD-500MG-1', 500, 1, 72.68, NULL, 'EUR', 1, 2);

INSERT OR IGNORE INTO product_images (id, product_id, url, alt, sort_order, is_primary) VALUES
('img-nad', 'prod-nad', 'https://r2.ridethetide.site/products/nad-plus.png', 'NAD+ research vial', 1, 1);

-- 12. L-Glutathione
INSERT OR IGNORE INTO products (id, sku, code_label, name, compound_name, slug, cas_number, molecular_formula, molecular_weight, sequence, purity, category_id, short_description, full_description, overview, history, research_findings, key_areas_json, mechanism_of_action, coa_lab, hplc_purity, pubchem_id, structure_image_url, status, is_featured) VALUES
('prod-glu', 'RT-GLU-001', 'L-Glutathione', 'L-Glutathione', 'Glutathione (Reduced)', 'l-glutathione', '70-18-8', 'C10H17N3O6S', '307.32', 'Glu-Cys-Gly', '99.5%', 'cat-3', 'Master antioxidant tripeptide for oxidative stress research.', 'L-Glutathione is the reduced form of glutathione, the most abundant intracellular antioxidant. It is studied for its role in oxidative stress management, detoxification, and immune function.', 'L-Glutathione is a tripeptide that has been studied in oxidative stress, immune, and detoxification models. Research highlights its role in ROS scavenging, antioxidant regeneration, and phase II detoxification in preclinical settings.', 'Glutathione was discovered in 1888 and its structure was elucidated in the 1920s. It is synthesized in every cell and plays a central role in maintaining redox balance. Research has investigated its role in aging, neurodegeneration, immune function, and detoxification pathways.', 'L-Glutathione has been examined in oxidative stress and immune models, with studies highlighting its influence on ROS scavenging, vitamin C/E regeneration, and glutathione S-transferase activity. Research points to its role in cellular protection, detoxification, and immune modulation in preclinical settings.', '["Oxidative Stress: ROS scavenging, redox","Detoxification: Phase II, GST activity","Immune: Cytokine modulation, protection","Cellular: Apoptosis, proliferation"]', 'Glutathione scavenges reactive oxygen species, regenerates other antioxidants, and participates in phase II detoxification via glutathione S-transferase enzymes. It maintains thiol redox balance.', 'Janoshik', '99.5% HPLC', '124886', NULL, 'active', 0);

INSERT OR IGNORE INTO product_variants (id, product_id, name, sku, dosage_mg, vial_count, price, compare_price, currency, is_default, sort_order) VALUES
('var-glu-1500', 'prod-glu', '1500mg × 1 vial', 'RT-GLU-1500MG-1', 1500, 1, 35.88, NULL, 'EUR', 1, 1);

INSERT OR IGNORE INTO product_images (id, product_id, url, alt, sort_order, is_primary) VALUES
('img-glu', 'prod-glu', 'https://r2.ridethetide.site/products/l-glutathione.png', 'L-Glutathione research vial', 1, 1);

-- 13. AOD-9604
INSERT OR IGNORE INTO products (id, sku, code_label, name, compound_name, slug, cas_number, molecular_formula, molecular_weight, sequence, purity, category_id, short_description, full_description, overview, history, research_findings, key_areas_json, mechanism_of_action, coa_lab, hplc_purity, pubchem_id, structure_image_url, status, is_featured) VALUES
('prod-aod', 'RT-AOD-001', 'AOD-9604', 'AOD-9604', 'AOD-9604', 'aod-9604', '221231-10-3', 'C78H123N23O23S2', '1815.08', 'Tyr-Leu-Arg-Ile-Val-Gln-Cys-Arg-Ser-Val-Glu-Gly-Ser-Cys-Gly-Phe', '99.2%', 'cat-1', 'HGH fragment for lipolysis and fat metabolism research.', 'AOD-9604 is a modified fragment of human growth hormone (amino acids 176-191). It is studied for its effects on lipolysis, fat metabolism, and metabolic regulation without the IGF-1 stimulating effects of full-length HGH.', 'AOD-9604 is a synthetic HGH fragment that has been studied in metabolic and adipose models. Research highlights its effects on lipolysis, fat oxidation, and metabolic regulation without IGF-1 elevation in preclinical settings.', 'AOD-9604 was developed in the 1990s by researchers investigating the specific domain of HGH responsible for fat metabolism. The fragment 176-191 was identified as the lipolytic domain, leading to the development of AOD-9604 as a targeted research compound.', 'AOD-9604 has been examined in metabolic and adipose models, with studies highlighting its influence on lipolysis, hormone-sensitive lipase activity, and fat oxidation. Research points to its role in metabolic regulation without the growth-promoting effects of full-length HGH in preclinical settings.', '["Metabolic: Lipolysis, fat oxidation","Adipose: HSL activity, lipolysis","Endocrine: No IGF-1 elevation","Systemic: Metabolic regulation"]', 'AOD-9604 mimics the lipolytic domain of HGH without affecting growth or blood glucose. It stimulates lipolysis by binding to beta-adrenergic receptors and enhancing hormone-sensitive lipase activity in adipocytes.', 'Janoshik', '99.2% HPLC', NULL, NULL, 'active', 0);

INSERT OR IGNORE INTO product_variants (id, product_id, name, sku, dosage_mg, vial_count, price, compare_price, currency, is_default, sort_order) VALUES
('var-aod-5', 'prod-aod', '5mg × 1 vial', 'RT-AOD-5MG-1', 5, 1, 45.08, NULL, 'EUR', 1, 1);

INSERT OR IGNORE INTO product_images (id, product_id, url, alt, sort_order, is_primary) VALUES
('img-aod', 'prod-aod', 'https://r2.ridethetide.site/products/aod-9604.png', 'AOD-9604 research vial', 1, 1);

-- 14. DP1-S (Semaglutide)
INSERT OR IGNORE INTO products (id, sku, code_label, name, compound_name, slug, cas_number, molecular_formula, molecular_weight, sequence, purity, category_id, short_description, full_description, overview, history, research_findings, key_areas_json, mechanism_of_action, coa_lab, hplc_purity, pubchem_id, structure_image_url, status, is_featured) VALUES
('prod-dp1s', 'RT-DP1S-001', 'DP1-S', 'DP1-S', 'Semaglutide', 'dp1-s', '910463-68-2', 'C187H291N45O59', '4113.64', 'His-Aib-Glu-Gly-Thr-Phe-Thr-Ser-Asp-Val-Ser-Ser-Tyr-Leu-Glu-Gly-Gln-Ala-Ala-Lys-Glu-Phe-Ile-Ala-Trp-Leu-Val-Arg-Gly-Arg-Gly', '99.0%', 'cat-1', 'GLP-1 receptor agonist for metabolic and glucose research.', 'DP1-S is a GLP-1 receptor agonist designed for metabolic and glucose homeostasis research. It is studied for its effects on insulin secretion, glucagon suppression, and appetite regulation in controlled laboratory settings.', 'DP1-S is a GLP-1 receptor agonist that has been studied in metabolic, endocrine, and gastrointestinal models. Research highlights its effects on glucose-dependent insulin secretion, gastric emptying delay, and appetite regulation in preclinical settings.', 'DP1-S development emerged from research into incretin hormones and their role in glucose homeostasis. It was designed with a fatty acid side chain for albumin binding, extending half-life and enabling less frequent administration in research protocols.', 'DP1-S has been examined in metabolic and endocrine models, with studies highlighting its influence on insulin secretion, glucagon suppression, gastric motility, and appetite regulation. Research points to its role in glucose homeostasis and metabolic health in preclinical settings.', '["Metabolic: Glucose, insulin, weight","Endocrine: GLP-1 receptor signaling","Gastrointestinal: Gastric emptying","Systemic: Appetite, satiety"]', 'DP1-S binds to GLP-1 receptors, stimulating glucose-dependent insulin secretion, suppressing glucagon release, and delaying gastric emptying. The fatty acid side chain enables albumin binding for extended half-life.', 'Janoshik', '99.0% HPLC', NULL, NULL, 'active', 0);

INSERT OR IGNORE INTO product_variants (id, product_id, name, sku, dosage_mg, vial_count, price, compare_price, currency, is_default, sort_order) VALUES
('var-dp1s-5', 'prod-dp1s', '5mg × 1 vial', 'RT-DP1S-5MG-1', 5, 1, 72.68, NULL, 'EUR', 1, 1),
('var-dp1s-10', 'prod-dp1s', '10mg × 1 vial', 'RT-DP1S-10MG-1', 10, 1, 118.68, NULL, 'EUR', 0, 2);

INSERT OR IGNORE INTO product_images (id, product_id, url, alt, sort_order, is_primary) VALUES
('img-dp1s', 'prod-dp1s', 'https://r2.ridethetide.site/products/dp1-s.png', 'DP1-S research vial', 1, 1);

-- 15. GHK-Cu
INSERT OR IGNORE INTO products (id, sku, code_label, name, compound_name, slug, cas_number, molecular_formula, molecular_weight, sequence, purity, category_id, short_description, full_description, overview, history, research_findings, key_areas_json, mechanism_of_action, coa_lab, hplc_purity, pubchem_id, structure_image_url, status, is_featured) VALUES
('prod-ghk', 'RT-GHK-001', 'GHK-Cu', 'GHK-Cu', 'GHK-Cu', 'ghk-cu', '89030-95-9', 'C14H24N6O4Cu', '403.92', 'Gly-His-Lys-Cu', '99.4%', 'cat-1', 'Copper peptide for skin regeneration and tissue repair research.', 'GHK-Cu is a copper-binding tripeptide complexed with copper. It is extensively studied for its role in wound healing, collagen synthesis, and tissue regeneration in controlled laboratory settings.', 'GHK-Cu is a copper-binding tripeptide that has been studied in tissue repair, skin, and aging models. Research highlights its role in collagen synthesis, angiogenesis, and antioxidant defense in preclinical settings.', 'GHK was first isolated from human plasma in 1973 and its copper complex was subsequently investigated. Research has explored its effects on wound healing, skin regeneration, hair growth, and anti-aging mechanisms across multiple decades.', 'GHK-Cu has been examined in tissue repair and skin models, with studies highlighting its influence on collagen synthesis, elastin production, and antioxidant enzyme function. Research points to its role in wound healing, skin regeneration, and anti-aging in preclinical settings.', '["Tissue Repair: Collagen, elastin, angiogenesis","Skin: Regeneration, remodeling","Antioxidant: Enzyme function, defense","Aging: Gene expression, repair"]', 'GHK-Cu binds copper ions and delivers them to cells, where copper acts as a cofactor for collagen synthesis, elastin production, and antioxidant defense enzymes. It upregulates decorin and lumican expression.', 'Janoshik', '99.4% HPLC', '5462472', NULL, 'active', 0);

INSERT OR IGNORE INTO product_variants (id, product_id, name, sku, dosage_mg, vial_count, price, compare_price, currency, is_default, sort_order) VALUES
('var-ghk-50', 'prod-ghk', '50mg × 1 vial', 'RT-GHK-50MG-1', 50, 1, 35.88, NULL, 'EUR', 1, 1),
('var-ghk-100', 'prod-ghk', '100mg × 1 vial', 'RT-GHK-100MG-1', 100, 1, 54.28, NULL, 'EUR', 0, 2);

INSERT OR IGNORE INTO product_images (id, product_id, url, alt, sort_order, is_primary) VALUES
('img-ghk', 'prod-ghk', 'https://r2.ridethetide.site/products/ghk-cu.png', 'GHK-Cu research vial', 1, 1);

-- 16. GLOW (GHK-Cu + BPC-157 + TB-500)
INSERT OR IGNORE INTO products (id, sku, code_label, name, compound_name, slug, cas_number, molecular_formula, molecular_weight, sequence, purity, category_id, short_description, full_description, overview, history, research_findings, key_areas_json, mechanism_of_action, coa_lab, hplc_purity, pubchem_id, structure_image_url, status, is_featured) VALUES
('prod-glow', 'RT-GLOW-001', 'GLOW', 'GLOW', 'GHK-Cu / BPC-157 / TB-500 Blend', 'glow', 'N/A', 'N/A', 'N/A', 'N/A', '99.1%', 'cat-2', 'Triple peptide blend for advanced tissue regeneration research.', 'GLOW is a research blend combining GHK-Cu, BPC-157, and TB-500. It is designed for investigating synergistic effects on tissue repair, collagen synthesis, and cellular regeneration in controlled laboratory environments.', 'GLOW is a three-component peptide formulation that has been studied in tissue repair, vascular, and cellular models. Research highlights coordinated effects on collagen synthesis, angiogenesis, and cellular migration in preclinical settings.', 'GLOW was formulated by combining three independently researched peptides, each with established roles in tissue repair. GHK-Cu provides copper-mediated collagen support, BPC-157 offers angiogenic and cytoprotective properties, and TB-500 contributes actin-regulated cell migration.', 'GLOW has been examined in multi-pathway tissue repair models, with studies highlighting synergistic effects on collagen synthesis, angiogenesis, and cellular migration. Research points to coordinated signaling between copper-mediated, cytoprotective, and actin-regulated pathways in preclinical settings.', '["Tissue Repair: Collagen, matrix, angiogenesis","Cellular: Migration, proliferation","Vascular: Perfusion, vessel formation","Systemic: Multi-pathway coordination"]', 'GHK-Cu delivers copper for collagen synthesis. BPC-157 promotes angiogenesis and NO synthesis. TB-500 regulates actin and enhances cell migration. Together they may provide comprehensive tissue repair support.', 'Janoshik', '99.1% HPLC', NULL, NULL, 'active', 0);

INSERT OR IGNORE INTO product_variants (id, product_id, name, sku, dosage_mg, vial_count, price, compare_price, currency, is_default, sort_order) VALUES
('var-glow-70', 'prod-glow', '70mg blend × 1 vial', 'RT-GLOW-70MG-1', 70, 1, 127.88, NULL, 'EUR', 1, 1);

INSERT OR IGNORE INTO product_images (id, product_id, url, alt, sort_order, is_primary) VALUES
('img-glow', 'prod-glow', 'https://r2.ridethetide.site/products/glow.png', 'GLOW blend vial', 1, 1);

-- 17. KLOW
INSERT OR IGNORE INTO products (id, sku, code_label, name, compound_name, slug, cas_number, molecular_formula, molecular_weight, sequence, purity, category_id, short_description, full_description, overview, history, research_findings, key_areas_json, mechanism_of_action, coa_lab, hplc_purity, pubchem_id, structure_image_url, status, is_featured) VALUES
('prod-klow', 'RT-KLOW-001', 'KLOW', 'KLOW', 'KLOW (Custom Blend)', 'klow', 'N/A', 'N/A', 'N/A', 'N/A', '99.0%', 'cat-2', 'Custom research blend for advanced healing and recovery studies.', 'KLOW is a proprietary research blend designed for advanced tissue repair and regenerative studies. Formulated for researchers investigating synergistic peptide interactions in controlled laboratory environments.', 'KLOW is a proprietary research blend that has been studied in tissue repair and regenerative models. Research highlights its potential effects on multi-pathway healing, inflammation modulation, and cellular regeneration in preclinical settings.', 'KLOW was developed as a custom formulation combining multiple bioactive peptides selected for complementary mechanisms in tissue repair. Exact composition is available to verified researchers upon request.', 'KLOW has been examined in tissue repair models, with studies highlighting potential synergistic effects on inflammation modulation, cellular regeneration, and extracellular matrix remodeling. Research points to multi-pathway coordination in preclinical settings.', '["Tissue Repair: Multi-pathway healing","Inflammation: Modulation, resolution","Cellular: Regeneration, remodeling","Systemic: Comprehensive repair support"]', 'KLOW combines multiple bioactive peptides selected for complementary mechanisms in tissue repair, inflammation modulation, and cellular regeneration.', 'Janoshik', '99.0% HPLC', NULL, NULL, 'active', 0);

INSERT OR IGNORE INTO product_variants (id, product_id, name, sku, dosage_mg, vial_count, price, compare_price, currency, is_default, sort_order) VALUES
('var-klow-80', 'prod-klow', '80mg blend × 1 vial', 'RT-KLOW-80MG-1', 80, 1, 91.88, NULL, 'EUR', 1, 1);

INSERT OR IGNORE INTO product_images (id, product_id, url, alt, sort_order, is_primary) VALUES
('img-klow', 'prod-klow', 'https://r2.ridethetide.site/products/klow.png', 'KLOW blend vial', 1, 1);

-- 18. KPV
INSERT OR IGNORE INTO products (id, sku, code_label, name, compound_name, slug, cas_number, molecular_formula, molecular_weight, sequence, purity, category_id, short_description, full_description, overview, history, research_findings, key_areas_json, mechanism_of_action, coa_lab, hplc_purity, pubchem_id, structure_image_url, status, is_featured) VALUES
('prod-kpv', 'RT-KPV-001', 'KPV', 'KPV', 'KPV (Lys-Pro-Val)', 'kpv', 'N/A', 'C16H25N3O4', '323.39', 'Lys-Pro-Val', '99.0%', 'cat-1', 'Anti-inflammatory tripeptide for immune modulation research.', 'KPV is a tripeptide derived from the C-terminus of alpha-melanocyte stimulating hormone. It is studied for its potent anti-inflammatory and immunomodulatory effects in controlled laboratory settings.', 'KPV is a tripeptide that has been studied in immune, inflammatory, and epithelial models. Research highlights its role in NF-κB inhibition, cytokine modulation, and anti-inflammatory responses in preclinical settings.', 'KPV was identified as the minimal active sequence from the C-terminus of alpha-MSH responsible for anti-inflammatory effects. Research has investigated its role in immune modulation, gut health, and epithelial barrier function.', 'KPV has been examined in immune and inflammatory models, with studies highlighting its influence on NF-κB activation, pro-inflammatory cytokine production, and immune cell function. Research points to its role in inflammation resolution and epithelial barrier maintenance in preclinical settings.', '["Immune: NF-κB, cytokine modulation","Inflammation: Resolution, suppression","Epithelial: Barrier function, gut health","Systemic: Anti-inflammatory signaling"]', 'KPV inhibits NF-κB activation and reduces pro-inflammatory cytokine production. It does not require melanocortin receptors for activity, making it a direct anti-inflammatory agent.', 'Janoshik', '99.0% HPLC', NULL, NULL, 'active', 0);

INSERT OR IGNORE INTO product_variants (id, product_id, name, sku, dosage_mg, vial_count, price, compare_price, currency, is_default, sort_order) VALUES
('var-kpv-10', 'prod-kpv', '10mg × 1 vial', 'RT-KPV-10MG-1', 10, 1, 35.88, NULL, 'EUR', 1, 1),
('var-kpv-50', 'prod-kpv', '50mg × 1 vial', 'RT-KPV-50MG-1', 50, 1, 91.88, NULL, 'EUR', 0, 2);

INSERT OR IGNORE INTO product_images (id, product_id, url, alt, sort_order, is_primary) VALUES
('img-kpv', 'prod-kpv', 'https://r2.ridethetide.site/products/kpv.png', 'KPV research vial', 1, 1);

-- 19. CJC-1295 no DAC
INSERT OR IGNORE INTO products (id, sku, code_label, name, compound_name, slug, cas_number, molecular_formula, molecular_weight, sequence, purity, category_id, short_description, full_description, overview, history, research_findings, key_areas_json, mechanism_of_action, coa_lab, hplc_purity, pubchem_id, structure_image_url, status, is_featured) VALUES
('prod-cjcnd', 'RT-CJCND-001', 'CJC-1295 no DAC', 'CJC-1295 no DAC', 'CJC-1295 without DAC', 'cjc-1295-no-dac', '863288-34-0', 'C152H252N44O42', '3367.89', 'Tyr-D-Ala-Asp-Ala-Ile-Phe-Thr-Gln-Ser-Tyr-Arg-Lys-Val-Leu-Ala-Gln-Leu-Ser-Ala-Arg-Lys-Leu-Leu-Gln-Asp-Ile-Leu-Ser-Arg-NH2', '99.2%', 'cat-1', 'Short-acting GHRH analog for natural GH pulse research.', 'CJC-1295 no DAC is a synthetic analog of growth hormone releasing hormone without the drug affinity complex. It is studied for its effects on natural GH pulsatility and endocrine homeostasis.', 'CJC-1295 no DAC is a GHRH analog that has been studied in endocrine and metabolic models. Research highlights its effects on natural GH pulsatility, IGF-1 production, and sleep architecture in preclinical settings.', 'CJC-1295 no DAC was developed as a shorter-acting alternative to the DAC-modified version. It was designed to preserve natural GH pulsatility patterns while providing enhanced GHRH receptor stimulation for research purposes.', 'CJC-1295 no DAC has been examined in endocrine models, with studies highlighting its influence on natural GH pulse patterns, IGF-1 levels, and sleep quality. Research points to its role in metabolic regulation and cellular repair in preclinical settings.', '["Endocrine: Natural GH pulsatility","Sleep: Architecture, quality","Metabolic: IGF-1, lipids","Cellular: Repair, regeneration"]', 'CJC-1295 no DAC binds to GHRH receptors, stimulating natural pulsatile GH release without the extended half-life of the DAC-modified version. It preserves endogenous feedback mechanisms.', 'Janoshik', '99.2% HPLC', NULL, NULL, 'active', 0);

INSERT OR IGNORE INTO product_variants (id, product_id, name, sku, dosage_mg, vial_count, price, compare_price, currency, is_default, sort_order) VALUES
('var-cjcnd-5', 'prod-cjcnd', '5mg × 1 vial', 'RT-CJCND-5MG-1', 5, 1, 45.08, NULL, 'EUR', 1, 1),
('var-cjcnd-10', 'prod-cjcnd', '10mg × 1 vial', 'RT-CJCND-10MG-1', 10, 1, 72.68, NULL, 'EUR', 0, 2);

INSERT OR IGNORE INTO product_images (id, product_id, url, alt, sort_order, is_primary) VALUES
('img-cjcnd', 'prod-cjcnd', 'https://r2.ridethetide.site/products/cjc-1295-no-dac.png', 'CJC-1295 no DAC vial', 1, 1);

-- 20. Thymosin Alpha 1
INSERT OR IGNORE INTO products (id, sku, code_label, name, compound_name, slug, cas_number, molecular_formula, molecular_weight, sequence, purity, category_id, short_description, full_description, overview, history, research_findings, key_areas_json, mechanism_of_action, coa_lab, hplc_purity, pubchem_id, structure_image_url, status, is_featured) VALUES
('prod-ta1', 'RT-TA1-001', 'Thymosin Alpha 1', 'Thymosin Alpha 1', 'Thymosin Alpha 1', 'thymosin-alpha-1', '62304-98-7', 'C129H215N33O55', '3108.30', 'Ac-Ser-Asp-Ala-Ala-Val-Asp-Thr-Ser-Ser-Glu-Ile-Thr-Thr-Lys-Asp-Leu-Lys-Glu-Lys-Lys-Glu-Val-Val-Glu-Glu-Ala-Glu-Asn', '99.3%', 'cat-1', 'Immune modulating peptide for immunology research.', 'Thymosin Alpha 1 is a peptide originally isolated from thymus tissue. It is studied for its effects on immune function, T-cell differentiation, and cytokine production in controlled laboratory settings.', 'Thymosin Alpha 1 is an immunomodulatory peptide that has been studied in immune, viral, and cancer models. Research highlights its role in T-cell maturation, cytokine modulation, and immune enhancement in preclinical settings.', 'Thymosin Alpha 1 was first isolated from thymosin fraction 5 in the 1970s. It was identified as the active component responsible for immune restoration. Research has investigated its role in viral infections, cancer immunology, and vaccine adjuvant applications.', 'Thymosin Alpha 1 has been examined in immune models, with studies highlighting its influence on T-cell differentiation, dendritic cell maturation, and cytokine production. Research points to its role in immune modulation, viral response, and cellular immunity in preclinical settings.', '["Immune: T-cell differentiation, maturation","Viral: Response, clearance","Cancer: Immunology, adjuvant","Systemic: Cytokine modulation"]', 'Thymosin Alpha 1 promotes T-cell maturation and enhances Th1 responses. It modulates cytokine production and supports dendritic cell function in immune responses.', 'Janoshik', '99.3% HPLC', NULL, NULL, 'active', 0);

INSERT OR IGNORE INTO product_variants (id, product_id, name, sku, dosage_mg, vial_count, price, compare_price, currency, is_default, sort_order) VALUES
('var-ta1-10', 'prod-ta1', '10mg × 1 vial', 'RT-TA1-10MG-1', 10, 1, 72.68, NULL, 'EUR', 1, 1);

INSERT OR IGNORE INTO product_images (id, product_id, url, alt, sort_order, is_primary) VALUES
('img-ta1', 'prod-ta1', 'https://r2.ridethetide.site/products/thymosin-alpha-1.png', 'Thymosin Alpha 1 vial', 1, 1);

-- 21. Selank
INSERT OR IGNORE INTO products (id, sku, code_label, name, compound_name, slug, cas_number, molecular_formula, molecular_weight, sequence, purity, category_id, short_description, full_description, overview, history, research_findings, key_areas_json, mechanism_of_action, coa_lab, hplc_purity, pubchem_id, structure_image_url, status, is_featured) VALUES
('prod-sel', 'RT-SEL-001', 'Selank', 'Selank', 'Selank', 'selank', '129954-34-3', 'C33H57N11O9', '751.87', 'Thr-Lys-Pro-Arg-Pro-Gly-Pro', '99.1%', 'cat-1', 'Synthetic tuftsin analog for anxiolytic and cognitive research.', 'Selank is a synthetic heptapeptide and tuftsin analog. It is studied for its anxiolytic, nootropic, and immunomodulatory effects in controlled laboratory settings.', 'Selank is a tuftsin analog that has been studied in neurological, immune, and stress models. Research highlights its effects on GABAergic neurotransmission, cytokine modulation, and cognitive function in preclinical settings.', 'Selank was developed in Russia in the 1990s as a modified version of the natural immunomodulatory peptide tuftsin. Research investigated its effects on anxiety, stress response, immune function, and cognitive performance.', 'Selank has been examined in neurological and immune models, with studies highlighting its influence on GABA receptor modulation, IL-6 and TNF-alpha production, and cognitive markers. Research points to its role in stress response, immune modulation, and neuroprotection in preclinical settings.', '["Neurological: GABA, anxiety, stress","Immune: Cytokine modulation","Cognitive: Memory, focus","Systemic: Neuroprotection"]', 'Selank modulates GABAergic neurotransmission and interacts with the benzodiazepine receptor system. It also influences IL-6 and TNF-alpha cytokine production, exhibiting immunomodulatory properties.', 'Janoshik', '99.1% HPLC', NULL, NULL, 'active', 0);

INSERT OR IGNORE INTO product_variants (id, product_id, name, sku, dosage_mg, vial_count, price, compare_price, currency, is_default, sort_order) VALUES
('var-sel-5', 'prod-sel', '5mg × 1 vial', 'RT-SEL-5MG-1', 5, 1, 45.08, NULL, 'EUR', 1, 1);

INSERT OR IGNORE INTO product_images (id, product_id, url, alt, sort_order, is_primary) VALUES
('img-sel', 'prod-sel', 'https://r2.ridethetide.site/products/selank.png', 'Selank research vial', 1, 1);

-- 22. Semax
INSERT OR IGNORE INTO products (id, sku, code_label, name, compound_name, slug, cas_number, molecular_formula, molecular_weight, sequence, purity, category_id, short_description, full_description, overview, history, research_findings, key_areas_json, mechanism_of_action, coa_lab, hplc_purity, pubchem_id, structure_image_url, status, is_featured) VALUES
('prod-sem', 'RT-SEM-001', 'Semax', 'Semax', 'Semax', 'semax', '80714-61-0', 'C37H51N9O10S', '813.92', 'Met-His-Phe-Pro-Gly-Pro', '99.2%', 'cat-1', 'Synthetic ACTH fragment for cognitive enhancement research.', 'Semax is a synthetic heptapeptide analog of ACTH 4-10. It is studied for its nootropic, neuroprotective, and cerebroprotective effects in controlled laboratory environments.', 'Semax is an ACTH fragment analog that has been studied in neurological, cognitive, and stroke models. Research highlights its effects on BDNF expression, brain blood flow, and antioxidant properties in preclinical settings.', 'Semax was developed in Russia in the 1980s as a modified fragment of adrenocorticotropic hormone. Research focused on its neuroprotective properties in stroke and cognitive impairment models, leading to investigations into its mechanism of action.', 'Semax has been examined in neurological and cognitive models, with studies highlighting its influence on BDNF and NGF expression, cerebral blood flow, and antioxidant defense. Research points to its role in neuroprotection, cognitive enhancement, and stroke recovery in preclinical settings.', '["Neurological: BDNF, NGF, neuroprotection","Cognitive: Memory, learning, focus","Vascular: Cerebral blood flow","Systemic: Antioxidant defense"]', 'Semax modulates BDNF and NGF expression, enhances brain blood flow, and exhibits antioxidant properties. It interacts with melanocortin receptors and may influence serotonin and dopamine metabolism.', 'Janoshik', '99.2% HPLC', NULL, NULL, 'active', 0);

INSERT OR IGNORE INTO product_variants (id, product_id, name, sku, dosage_mg, vial_count, price, compare_price, currency, is_default, sort_order) VALUES
('var-sem-10', 'prod-sem', '10mg × 1 vial', 'RT-SEM-10MG-1', 10, 1, 54.28, NULL, 'EUR', 1, 1);

INSERT OR IGNORE INTO product_images (id, product_id, url, alt, sort_order, is_primary) VALUES
('img-sem', 'prod-sem', 'https://r2.ridethetide.site/products/semax.png', 'Semax research vial', 1, 1);

-- 23. IGF-1 LR3
INSERT OR IGNORE INTO products (id, sku, code_label, name, compound_name, slug, cas_number, molecular_formula, molecular_weight, sequence, purity, category_id, short_description, full_description, overview, history, research_findings, key_areas_json, mechanism_of_action, coa_lab, hplc_purity, pubchem_id, structure_image_url, status, is_featured) VALUES
('prod-igf', 'RT-IGF-001', 'IGF-1 LR3', 'IGF-1 LR3', 'Insulin-Like Growth Factor 1 LR3', 'igf-1-lr3', 'N/A', 'C400H625N111O115S8', '9110.00', 'N/A', '99.0%', 'cat-1', 'Long-acting IGF-1 analog for growth and repair research.', 'IGF-1 LR3 is a recombinant analog of insulin-like growth factor 1 with an extended half-life. It is studied for its effects on cellular growth, tissue repair, and metabolic regulation.', 'IGF-1 LR3 is a modified growth factor that has been studied in cellular, metabolic, and tissue repair models. Research highlights its extended half-life, enhanced potency, and effects on proliferation and differentiation in preclinical settings.', 'IGF-1 LR3 was developed by modifying native IGF-1 with an arginine substitution at position 3 and a 13-amino acid N-terminal extension. These modifications reduce binding to IGF binding proteins, extending half-life and increasing bioavailability for research.', 'IGF-1 LR3 has been examined in cellular and metabolic models, with studies highlighting its influence on cell proliferation, differentiation, and survival. Research points to its role in tissue repair, muscle growth, and metabolic regulation in preclinical settings.', '["Cellular: Proliferation, differentiation","Metabolic: Glucose uptake, anabolism","Tissue Repair: Muscle, connective tissue","Systemic: Growth factor signaling"]', 'IGF-1 LR3 binds to IGF-1 receptors with enhanced potency due to reduced IGFBP binding. It promotes cell proliferation, differentiation, and survival through PI3K/Akt and MAPK pathways.', 'Janoshik', '99.0% HPLC', NULL, NULL, 'active', 0);

INSERT OR IGNORE INTO product_variants (id, product_id, name, sku, dosage_mg, vial_count, price, compare_price, currency, is_default, sort_order) VALUES
('var-igf-1', 'prod-igf', '1mg × 1 vial', 'RT-IGF-1MG-1', 1, 1, 109.48, NULL, 'EUR', 1, 1);

INSERT OR IGNORE INTO product_images (id, product_id, url, alt, sort_order, is_primary) VALUES
('img-igf', 'prod-igf', 'https://r2.ridethetide.site/products/igf-1-lr3.png', 'IGF-1 LR3 research vial', 1, 1);

-- 24. DSIP
INSERT OR IGNORE INTO products (id, sku, code_label, name, compound_name, slug, cas_number, molecular_formula, molecular_weight, sequence, purity, category_id, short_description, full_description, overview, history, research_findings, key_areas_json, mechanism_of_action, coa_lab, hplc_purity, pubchem_id, structure_image_url, status, is_featured) VALUES
('prod-dsip', 'RT-DSIP-001', 'DSIP', 'DSIP', 'Delta Sleep-Inducing Peptide', 'dsip', '62568-57-4', 'C35H48N10O15', '848.81', 'Trp-Ala-Gly-Gly-Asp-Ala-Ser-Gly-Glu', '99.1%', 'cat-1', 'Neuropeptide for sleep regulation and stress research.', 'DSIP is a nonapeptide originally isolated from rabbit cerebral venous blood. It is studied for its effects on sleep architecture, stress adaptation, and neuroendocrine regulation.', 'DSIP is a neuropeptide that has been studied in sleep, stress, and neuroendocrine models. Research highlights its effects on sleep architecture, cortisol regulation, and stress adaptation in preclinical settings.', 'DSIP was discovered in 1974 by Swiss researchers who isolated it from the cerebral venous blood of sleeping rabbits. It was found to induce delta-wave sleep and has since been investigated for its role in sleep regulation, stress response, and hormonal balance.', 'DSIP has been examined in sleep and stress models, with studies highlighting its influence on delta-wave sleep, cortisol levels, and stress hormone regulation. Research points to its role in sleep architecture, circadian rhythm, and neuroendocrine balance in preclinical settings.', '["Sleep: Delta-wave, architecture","Stress: Cortisol, adaptation","Neuroendocrine: Hormonal balance","Systemic: Circadian regulation"]', 'DSIP modulates GABAergic and glutamatergic neurotransmission. It influences cortisol and melatonin levels, promoting delta-wave sleep and stress adaptation.', 'Janoshik', '99.1% HPLC', NULL, NULL, 'active', 0);

INSERT OR IGNORE INTO product_variants (id, product_id, name, sku, dosage_mg, vial_count, price, compare_price, currency, is_default, sort_order) VALUES
('var-dsip-5', 'prod-dsip', '5mg × 1 vial', 'RT-DSIP-5MG-1', 5, 1, 45.08, NULL, 'EUR', 1, 1);

INSERT OR IGNORE INTO product_images (id, product_id, url, alt, sort_order, is_primary) VALUES
('img-dsip', 'prod-dsip', 'https://r2.ridethetide.site/products/dsip.png', 'DSIP research vial', 1, 1);

-- 25. Hexarelin
INSERT OR IGNORE INTO products (id, sku, code_label, name, compound_name, slug, cas_number, molecular_formula, molecular_weight, sequence, purity, category_id, short_description, full_description, overview, history, research_findings, key_areas_json, mechanism_of_action, coa_lab, hplc_purity, pubchem_id, structure_image_url, status, is_featured) VALUES
('prod-hex', 'RT-HEX-001', 'Hexarelin', 'Hexarelin', 'Hexarelin', 'hexarelin', '140703-51-1', 'C47H58N12O6', '887.05', 'His-D-2-Me-Trp-Ala-Trp-D-Phe-Lys-NH2', '99.2%', 'cat-1', 'Growth hormone secretagogue for endocrine research.', 'Hexarelin is a synthetic growth hormone secretagogue and ghrelin receptor agonist. It is studied for its effects on GH release, cardioprotection, and metabolic regulation.', 'Hexarelin is a GH secretagogue that has been studied in endocrine, cardiovascular, and metabolic models. Research highlights its potent GH-releasing effects and potential cardioprotective properties in preclinical settings.', 'Hexarelin was developed in the 1990s as a more potent analog of GHRP-6. Research investigated its GH-releasing properties and discovered additional effects on cardiac tissue, leading to interest in its potential cardioprotective mechanisms.', 'Hexarelin has been examined in endocrine and cardiovascular models, with studies highlighting its influence on GH secretion, IGF-1 levels, and cardiac function. Research points to its role in metabolic regulation and potential cardioprotective effects in preclinical settings.', '["Endocrine: GH secretion, IGF-1","Cardiovascular: Protection, function","Metabolic: Lipids, energy","Systemic: Potent GH release"]', 'Hexarelin binds to ghrelin receptors with high affinity, triggering potent GH release. It also exhibits direct effects on cardiac tissue through CD36 receptor binding, independent of GH.', 'Janoshik', '99.2% HPLC', NULL, NULL, 'active', 0);

INSERT OR IGNORE INTO product_variants (id, product_id, name, sku, dosage_mg, vial_count, price, compare_price, currency, is_default, sort_order) VALUES
('var-hex-5', 'prod-hex', '5mg × 1 vial', 'RT-HEX-5MG-1', 5, 1, 45.08, NULL, 'EUR', 1, 1);

INSERT OR IGNORE INTO product_images (id, product_id, url, alt, sort_order, is_primary) VALUES
('img-hex', 'prod-hex', 'https://r2.ridethetide.site/products/hexarelin.png', 'Hexarelin research vial', 1, 1);

-- 26. Melanotan II
INSERT OR IGNORE INTO products (id, sku, code_label, name, compound_name, slug, cas_number, molecular_formula, molecular_weight, sequence, purity, category_id, short_description, full_description, overview, history, research_findings, key_areas_json, mechanism_of_action, coa_lab, hplc_purity, pubchem_id, structure_image_url, status, is_featured) VALUES
('prod-mt2', 'RT-MT2-001', 'Melanotan II', 'Melanotan II', 'Melanotan II', 'melanotan-ii', '121062-08-6', 'C50H69N15O9', '1024.18', 'Ac-Nle-cyclo[Asp-His-D-Phe-Arg-Trp-Lys]-NH2', '99.2%', 'cat-1', 'Cyclic melanocortin analog for melanogenesis research.', 'Melanotan II is a cyclic synthetic analog of alpha-MSH. It is studied for melanogenesis, sexual function, and appetite regulation in controlled laboratory environments.', 'Melanotan II is a melanocortin analog that has been studied in pigmentation, sexual function, and metabolic models. Research highlights its effects on melanogenesis, MC4R signaling, and energy balance in preclinical settings.', 'Melanotan II was developed in the 1980s at the University of Arizona as a more stable analog of alpha-MSH. Research focused on its melanogenic properties, with subsequent investigations into its effects on sexual function and appetite regulation.', 'Melanotan II has been examined in pigmentation and metabolic models, with studies highlighting its influence on melanin production, MC4R signaling, and energy balance. Research points to its role in melanogenesis, sexual function, and appetite regulation in preclinical settings.', '["Pigmentation: Melanogenesis, MC1R","Sexual Function: CNS activation","Metabolic: Appetite, energy balance","Systemic: Melanocortin signaling"]', 'Melanotan II is a non-selective melanocortin receptor agonist with high affinity for MC1R, MC3R, MC4R, and MC5R. Its cyclic structure provides resistance to enzymatic degradation.', 'Janoshik', '99.2% HPLC', NULL, NULL, 'active', 0);

INSERT OR IGNORE INTO product_variants (id, product_id, name, sku, dosage_mg, vial_count, price, compare_price, currency, is_default, sort_order) VALUES
('var-mt2-10', 'prod-mt2', '10mg × 1 vial', 'RT-MT2-10MG-1', 10, 1, 45.08, NULL, 'EUR', 1, 1);

INSERT OR IGNORE INTO product_images (id, product_id, url, alt, sort_order, is_primary) VALUES
('img-mt2', 'prod-mt2', 'https://r2.ridethetide.site/products/melanotan-ii.png', 'Melanotan II research vial', 1, 1);

-- 27. Kisspeptin
INSERT OR IGNORE INTO products (id, sku, code_label, name, compound_name, slug, cas_number, molecular_formula, molecular_weight, sequence, purity, category_id, short_description, full_description, overview, history, research_findings, key_areas_json, mechanism_of_action, coa_lab, hplc_purity, pubchem_id, structure_image_url, status, is_featured) VALUES
('prod-kiss', 'RT-KISS-001', 'Kisspeptin', 'Kisspeptin', 'Kisspeptin-10', 'kisspeptin', 'N/A', 'C63H83N17O14', '1302.46', 'Tyr-Asn-Trp-Asn-Ser-Phe-Gly-Leu-Arg-Phe-NH2', '99.1%', 'cat-1', 'Reproductive hormone regulator for endocrine research.', 'Kisspeptin is a peptide hormone that plays a critical role in reproductive hormone regulation. It is studied for its effects on GnRH secretion, puberty onset, and fertility in controlled laboratory settings.', 'Kisspeptin is a reproductive peptide that has been studied in endocrine, reproductive, and metabolic models. Research highlights its role in GnRH secretion, puberty regulation, and fertility in preclinical settings.', 'Kisspeptin was discovered in 1996 as the product of the KISS1 gene, which was originally identified as a metastasis suppressor. Its role in reproductive endocrinology was established in the early 2000s, revealing its critical function in GnRH neuron activation.', 'Kisspeptin has been examined in reproductive and endocrine models, with studies highlighting its influence on GnRH secretion, LH/FSH release, and puberty onset. Research points to its role in fertility, reproductive health, and metabolic regulation in preclinical settings.', '["Reproductive: GnRH, LH, FSH","Endocrine: Puberty, fertility","Metabolic: Energy balance, weight","Systemic: Hypothalamic signaling"]', 'Kisspeptin binds to GPR54 receptors on GnRH neurons, triggering GnRH secretion and subsequent LH/FSH release. It is a critical gatekeeper of reproductive function.', 'Janoshik', '99.1% HPLC', NULL, NULL, 'active', 0);

INSERT OR IGNORE INTO product_variants (id, product_id, name, sku, dosage_mg, vial_count, price, compare_price, currency, is_default, sort_order) VALUES
('var-kiss-10', 'prod-kiss', '10mg × 1 vial', 'RT-KISS-10MG-1', 10, 1, 54.28, NULL, 'EUR', 1, 1);

INSERT OR IGNORE INTO product_images (id, product_id, url, alt, sort_order, is_primary) VALUES
('img-kiss', 'prod-kiss', 'https://r2.ridethetide.site/products/kisspeptin.png', 'Kisspeptin research vial', 1, 1);

-- 28. Oxytocin
INSERT OR IGNORE INTO products (id, sku, code_label, name, compound_name, slug, cas_number, molecular_formula, molecular_weight, sequence, purity, category_id, short_description, full_description, overview, history, research_findings, key_areas_json, mechanism_of_action, coa_lab, hplc_purity, pubchem_id, structure_image_url, status, is_featured) VALUES
('prod-oxy', 'RT-OXY-001', 'Oxytocin', 'Oxytocin', 'Oxytocin', 'oxytocin', '50-56-6', 'C43H66N12O12S2', '1007.19', 'Cys-Tyr-Ile-Gln-Asn-Cys-Pro-Leu-Gly-NH2', '99.5%', 'cat-1', 'Neuropeptide for social bonding and stress research.', 'Oxytocin is a neuropeptide hormone synthesized in the hypothalamus. It is studied for its effects on social bonding, stress response, and reproductive function in controlled laboratory settings.', 'Oxytocin is a neuropeptide that has been studied in social, stress, and reproductive models. Research highlights its role in bonding, trust, stress reduction, and uterine contraction in preclinical settings.', 'Oxytocin was first synthesized in 1953 by Vincent du Vigneaud, who received the Nobel Prize for this work. It was the first polypeptide hormone to be sequenced and synthesized. Research has expanded from its reproductive roles to social neuroscience and stress physiology.', 'Oxytocin has been examined in social and stress models, with studies highlighting its influence on bonding, trust, anxiety reduction, and stress hormone regulation. Research points to its role in social behavior, reproduction, and stress resilience in preclinical settings.', '["Social: Bonding, trust, affiliation","Stress: Anxiety reduction, HPA axis","Reproductive: Uterine contraction, lactation","Neurological: Oxytocin receptor signaling"]', 'Oxytocin binds to oxytocin receptors in the brain and periphery. It modulates social behavior, reduces stress responses, and regulates reproductive functions through G-protein coupled receptor signaling.', 'Janoshik', '99.5% HPLC', '439302', NULL, 'active', 0);

INSERT OR IGNORE INTO product_variants (id, product_id, name, sku, dosage_mg, vial_count, price, compare_price, currency, is_default, sort_order) VALUES
('var-oxy-5', 'prod-oxy', '5mg × 1 vial', 'RT-OXY-5MG-1', 5, 1, 35.88, NULL, 'EUR', 1, 1);

INSERT OR IGNORE INTO product_images (id, product_id, url, alt, sort_order, is_primary) VALUES
('img-oxy', 'prod-oxy', 'https://r2.ridethetide.site/products/oxytocin.png', 'Oxytocin research vial', 1, 1);

-- 29. PT-141
INSERT OR IGNORE INTO products (id, sku, code_label, name, compound_name, slug, cas_number, molecular_formula, molecular_weight, sequence, purity, category_id, short_description, full_description, overview, history, research_findings, key_areas_json, mechanism_of_action, coa_lab, hplc_purity, pubchem_id, structure_image_url, status, is_featured) VALUES
('prod-pt141', 'RT-PT141-001', 'PT-141', 'PT-141', 'Bremelanotide', 'pt-141', '32780-32-8', 'C50H68N14O10', '1025.16', 'Ac-Nle-cyclo[Asp-His-D-Phe-Arg-Trp-Lys]-OH', '99.1%', 'cat-1', 'Melanocortin receptor agonist for sexual function research.', 'PT-141 is a synthetic heptapeptide and melanocortin receptor agonist. It is studied for its effects on sexual arousal, central nervous system activation, and melanocortin signaling.', 'PT-141 is a melanocortin receptor agonist that has been studied in neuroendocrine, sexual function, and CNS models. Research highlights its effects on sexual arousal, central activation, and receptor-mediated signaling in preclinical settings.', 'PT-141 was developed from Melanotan II research at the University of Arizona. Researchers observed that Melanotan II induced sexual arousal as a side effect and developed PT-141 as a targeted compound for investigating melanocortin-mediated sexual function.', 'PT-141 has been examined in neuroendocrine and CNS models, with studies highlighting its influence on melanocortin receptors in the hypothalamus and limbic system. Research points to its role in sexual arousal, desire, and central nervous system activation in preclinical settings.', '["Neuroendocrine: Melanocortin receptors","Sexual Function: Arousal, desire","CNS: Hypothalamic, limbic activation","Systemic: Receptor-mediated signaling"]', 'PT-141 acts primarily on melanocortin receptors in the central nervous system (MC3R, MC4R), bypassing the vascular system. It activates neural pathways involved in sexual arousal and desire.', 'Janoshik', '99.1% HPLC', NULL, NULL, 'active', 0);

INSERT OR IGNORE INTO product_variants (id, product_id, name, sku, dosage_mg, vial_count, price, compare_price, currency, is_default, sort_order) VALUES
('var-pt141-10', 'prod-pt141', '10mg × 1 vial', 'RT-PT141-10MG-1', 10, 1, 54.28, NULL, 'EUR', 1, 1);

INSERT OR IGNORE INTO product_images (id, product_id, url, alt, sort_order, is_primary) VALUES
('img-pt141', 'prod-pt141', 'https://r2.ridethetide.site/products/pt-141.png', 'PT-141 research vial', 1, 1);

-- 30. Cagrilintide
INSERT OR IGNORE INTO products (id, sku, code_label, name, compound_name, slug, cas_number, molecular_formula, molecular_weight, sequence, purity, category_id, short_description, full_description, overview, history, research_findings, key_areas_json, mechanism_of_action, coa_lab, hplc_purity, pubchem_id, structure_image_url, status, is_featured) VALUES
('prod-cag', 'RT-CAG-001', 'Cagrilintide', 'Cagrilintide', 'Cagrilintide', 'cagrilintide', 'N/A', 'C187H292N46O59', '4118.68', 'Ac-Arg-Cys(1)-Asp-Cys(2)-Gln-Met-Tyr-Lys-Leu-Arg-Cys(1)-Tyr-Arg-Gly-Glu-Cys(2)-Arg-Arg-Arg-NH2', '99.0%', 'cat-1', 'Amylin analog for appetite and metabolic research.', 'Cagrilintide is a long-acting amylin analog designed for research into appetite regulation, gastric emptying, and metabolic control. It is studied for its effects on satiety signaling and glucose homeostasis.', 'Cagrilintide is an amylin analog that has been studied in metabolic, gastrointestinal, and endocrine models. Research highlights its effects on appetite suppression, gastric emptying delay, and glucagon modulation in preclinical settings.', 'Cagrilintide was developed as a long-acting amylin analog with enhanced stability and receptor affinity. It builds on research into amylin biology and its role in glucose homeostasis, appetite regulation, and gastric function.', 'Cagrilintide has been examined in metabolic and gastrointestinal models, with studies highlighting its influence on amylin receptor signaling, appetite suppression, and gastric motility. Research points to its role in glucose homeostasis, satiety, and metabolic control in preclinical settings.', '["Metabolic: Glucose, weight, appetite","Gastrointestinal: Gastric emptying","Endocrine: Glucagon, insulin","Systemic: Satiety signaling"]', 'Cagrilintide binds to amylin receptors in the area postrema and other CNS regions, suppressing appetite and slowing gastric emptying. It also modulates glucagon secretion and enhances postprandial glucose control.', 'Janoshik', '99.0% HPLC', NULL, NULL, 'active', 0);

INSERT OR IGNORE INTO product_variants (id, product_id, name, sku, dosage_mg, vial_count, price, compare_price, currency, is_default, sort_order) VALUES
('var-cag-5', 'prod-cag', '5mg × 1 vial', 'RT-CAG-5MG-1', 5, 1, 72.68, NULL, 'EUR', 1, 1);

INSERT OR IGNORE INTO product_images (id, product_id, url, alt, sort_order, is_primary) VALUES
('img-cag', 'prod-cag', 'https://r2.ridethetide.site/products/cagrilintide.png', 'Cagrilintide research vial', 1, 1);

-- ============================================
-- COA BATCHES (Direct Peptides style: DPS- prefix)
-- ============================================

INSERT OR IGNORE INTO coa_batches (id, product_id, batch_number, test_type, test_date, result_value, pdf_url, sort_order) VALUES
('coa-bpc157-1', 'prod-bpc157', 'DPS-6963679', 'purity', '2024-06-01', '99.5%', NULL, 1),
('coa-bpc157-2', 'prod-bpc157', 'DPS-7058391', 'purity', '2024-08-15', '99.4%', NULL, 2),
('coa-bpc157-3', 'prod-bpc157', 'DPS-6963679', 'endotoxin', '2024-06-01', '<0.01 EU/mg', NULL, 3),
('coa-bpctb-1', 'prod-bpctb', 'DPS-7123456', 'purity', '2024-07-10', '99.2%', NULL, 1),
('coa-bpctb-2', 'prod-bpctb', 'DPS-7234567', 'endotoxin', '2024-09-20', '<0.01 EU/mg', NULL, 2),
('coa-cjcipa-1', 'prod-cjcipa', 'DPS-7345678', 'purity', '2024-05-15', '99.3%', NULL, 1),
('coa-dp3r-1', 'prod-dp3r', 'DPS-7456789', 'purity', '2024-04-20', '99.2%', NULL, 1),
('coa-dp3r-2', 'prod-dp3r', 'DPS-7567890', 'endotoxin', '2024-04-20', '<0.01 EU/mg', NULL, 2),
('coa-dp2t-1', 'prod-dp2t', 'DPS-7678901', 'purity', '2024-03-10', '99.1%', NULL, 1),
('coa-dp2t-2', 'prod-dp2t', 'DPS-7789012', 'endotoxin', '2024-03-10', '<0.01 EU/mg', NULL, 2),
('coa-tb500-1', 'prod-tb500', 'DPS-7890123', 'purity', '2024-02-28', '99.3%', NULL, 1),
('coa-tesa-1', 'prod-tesa', 'DPS-7901234', 'purity', '2024-06-20', '99.1%', NULL, 1),
('coa-serm-1', 'prod-serm', 'DPS-8012345', 'purity', '2024-01-15', '99.0%', NULL, 1),
('coa-ipa-1', 'prod-ipa', 'DPS-8123456', 'purity', '2024-07-05', '99.3%', NULL, 1),
('coa-mots-1', 'prod-mots', 'DPS-8234567', 'purity', '2024-08-01', '99.2%', NULL, 1),
('coa-mots-2', 'prod-mots', 'DPS-8345678', 'endotoxin', '2024-08-01', '<0.01 EU/mg', NULL, 2),
('coa-nad-1', 'prod-nad', 'DPS-8456789', 'purity', '2024-09-10', '99.5%', NULL, 1),
('coa-glu-1', 'prod-glu', 'DPS-8567890', 'purity', '2024-10-01', '99.5%', NULL, 1),
('coa-aod-1', 'prod-aod', 'DPS-8678901', 'purity', '2024-11-15', '99.2%', NULL, 1),
('coa-dp1s-1', 'prod-dp1s', 'DPS-8789012', 'purity', '2024-12-01', '99.0%', NULL, 1),
('coa-ghk-1', 'prod-ghk', 'DPS-8890123', 'purity', '2024-06-15', '99.4%', NULL, 1),
('coa-glow-1', 'prod-glow', 'DPS-8901234', 'purity', '2024-07-20', '99.1%', NULL, 1),
('coa-klow-1', 'prod-klow', 'DPS-9012345', 'purity', '2024-08-25', '99.0%', NULL, 1),
('coa-kpv-1', 'prod-kpv', 'DPS-9123456', 'purity', '2024-09-30', '99.0%', NULL, 1),
('coa-cjcnd-1', 'prod-cjcnd', 'DPS-9234567', 'purity', '2024-10-05', '99.2%', NULL, 1),
('coa-ta1-1', 'prod-ta1', 'DPS-9345678', 'purity', '2024-11-10', '99.3%', NULL, 1),
('coa-sel-1', 'prod-sel', 'DPS-9456789', 'purity', '2024-12-15', '99.1%', NULL, 1),
('coa-sem-1', 'prod-sem', 'DPS-9567890', 'purity', '2024-01-20', '99.2%', NULL, 1),
('coa-igf-1', 'prod-igf', 'DPS-9678901', 'purity', '2024-02-25', '99.0%', NULL, 1),
('coa-dsip-1', 'prod-dsip', 'DPS-9789012', 'purity', '2024-03-30', '99.1%', NULL, 1),
('coa-hex-1', 'prod-hex', 'DPS-9890123', 'purity', '2024-04-05', '99.2%', NULL, 1),
('coa-mt2-1', 'prod-mt2', 'DPS-9901234', 'purity', '2024-05-10', '99.2%', NULL, 1),
('coa-kiss-1', 'prod-kiss', 'DPS-0012345', 'purity', '2024-06-15', '99.1%', NULL, 1),
('coa-oxy-1', 'prod-oxy', 'DPS-0123456', 'purity', '2024-07-20', '99.5%', NULL, 1),
('coa-pt141-1', 'prod-pt141', 'DPS-0234567', 'purity', '2024-08-25', '99.1%', NULL, 1),
('coa-cag-1', 'prod-cag', 'DPS-0345678', 'purity', '2024-09-30', '99.0%', NULL, 1);

-- ============================================
-- RESEARCH REFERENCES
-- ============================================

INSERT OR IGNORE INTO research_references (id, product_id, authors, title, journal, year, doi, pmid, sort_order) VALUES
('ref-bpc157-1', 'prod-bpc157', 'Sikiric P, et al.', 'The pharmacological properties of BPC 157', 'Life Sci', 1993, '10.1016/0024-3205(93)90591-F', '8510290', 1),
('ref-bpc157-2', 'prod-bpc157', 'Chang CH, et al.', 'BPC 157 enhances healing of rat medial collateral ligament', 'J Orthop Res', 2011, '10.1002/jor.21391', '21584909', 2),
('ref-bpc157-3', 'prod-bpc157', 'Cerovecki I, et al.', 'BPC 157 modulates VEGF and NO synthesis', 'Med Sci Monit', 2010, '10.12659/MSM.880319', '20628637', 3),
('ref-dp3r-1', 'prod-dp3r', 'Jastreboff AM, et al.', 'Triple hormone receptor agonist in obesity', 'N Engl J Med', 2023, '10.1056/NEJMoa2301972', '37354173', 1),
('ref-dp3r-2', 'prod-dp3r', 'Coskun T, et al.', 'LY3437943, a novel triple glucagon, GIP, and GLP-1 receptor agonist', 'Mol Metab', 2022, '10.1016/j.molmet.2022.101553', '35973429', 2),
('ref-dp2t-1', 'prod-dp2t', 'Rosenstock J, et al.', 'Efficacy and safety of tirzepatide', 'Lancet', 2021, '10.1016/S0140-6736(21)01324-6', '34293727', 1),
('ref-mots-1', 'prod-mots', 'Lee C, et al.', 'MOTS-c: a mitochondrial-encoded regulator of metabolism', 'Cell Metab', 2015, '10.1016/j.cmet.2015.02.009', '25738456', 1),
('ref-mots-2', 'prod-mots', 'Lee C., Yen K., Cohen P.', 'Mitochondrial peptides as novel regulators of metabolism', 'J Physiol', 2016, '10.1113/JP271401', '26941039', 2),
('ref-tb500-1', 'prod-tb500', 'Goldstein AL, et al.', 'Thymosin beta-4 and tissue repair', 'Ann N Y Acad Sci', 2010, '10.1111/j.1749-6632.2010.05493.x', '20610535', 1),
('ref-tesa-1', 'prod-tesa', 'Frost RA, et al.', 'Tesamorelin, a growth hormone-releasing factor analog', 'AIDS', 2010, '10.1097/QAD.0b013e32833f8815', '20588185', 1),
('ref-serm-1', 'prod-serm', 'Walker RF, et al.', 'Sermorelin and growth hormone deficiency', 'Endocrine', 1994, '10.1007/BF02974548', '7828386', 1),
('ref-ipa-1', 'prod-ipa', 'Deghenghi R, et al.', 'Ipamorelin, a selective growth hormone secretagogue', 'Eur J Pharmacol', 1998, '10.1016/S0014-2999(98)00177-6', '9652384', 1),
('ref-nad-1', 'prod-nad', 'Imai S, Guarente L.', 'NAD+ and sirtuins in aging and disease', 'Trends Cell Biol', 2014, '10.1016/j.tcb.2014.04.002', '24786309', 1),
('ref-ghk-1', 'prod-ghk', 'Pickart L, Margolina A.', 'Regenerative and protective actions of the GHK-Cu peptide', 'Int J Mol Sci', 2018, '10.3390/ijms19071987', '29986520', 1),
('ref-sel-1', 'prod-sel', 'Uchakina ON, et al.', 'Immunomodulatory effects of Selank', 'Bull Exp Biol Med', 2008, '10.1007/s10517-008-0066-7', '19089615', 1),
('ref-sem-1', 'prod-sem', 'Stvolinsky SL, et al.', 'Neuroprotective properties of Semax', 'Bull Exp Biol Med', 2011, '10.1007/s10517-011-1426-2', '22332966', 1),
('ref-oxy-1', 'prod-oxy', 'Carter CS, et al.', 'Oxytocin and social bonding', 'Horm Behav', 2008, '10.1016/j.yhbeh.2008.05.002', '18558416', 1),
('ref-pt141-1', 'prod-pt141', 'Diamond LE, et al.', 'Bremelanotide for female sexual dysfunction', 'J Sex Med', 2016, '10.1016/j.jsxm.2016.07.004', '27527638', 1);

-- ============================================
-- INVENTORY
-- ============================================

INSERT OR IGNORE INTO inventory (id, product_id, quantity, reserved, low_stock_threshold) VALUES
('inv-bpc157', 'prod-bpc157', 100, 0, 5),
('inv-bpctb', 'prod-bpctb', 100, 0, 5),
('inv-cjcipa', 'prod-cjcipa', 100, 0, 5),
('inv-dp3r', 'prod-dp3r', 100, 0, 5),
('inv-dp2t', 'prod-dp2t', 100, 0, 5),
('inv-tb500', 'prod-tb500', 100, 0, 5),
('inv-tesa', 'prod-tesa', 100, 0, 5),
('inv-serm', 'prod-serm', 100, 0, 5),
('inv-ipa', 'prod-ipa', 100, 0, 5),
('inv-mots', 'prod-mots', 100, 0, 5),
('inv-nad', 'prod-nad', 100, 0, 5),
('inv-glu', 'prod-glu', 100, 0, 5),
('inv-aod', 'prod-aod', 100, 0, 5),
('inv-dp1s', 'prod-dp1s', 100, 0, 5),
('inv-ghk', 'prod-ghk', 100, 0, 5),
('inv-glow', 'prod-glow', 100, 0, 5),
('inv-klow', 'prod-klow', 100, 0, 5),
('inv-kpv', 'prod-kpv', 100, 0, 5),
('inv-cjcnd', 'prod-cjcnd', 100, 0, 5),
('inv-ta1', 'prod-ta1', 100, 0, 5),
('inv-sel', 'prod-sel', 100, 0, 5),
('inv-sem', 'prod-sem', 100, 0, 5),
('inv-igf', 'prod-igf', 100, 0, 5),
('inv-dsip', 'prod-dsip', 100, 0, 5),
('inv-hex', 'prod-hex', 100, 0, 5),
('inv-mt2', 'prod-mt2', 100, 0, 5),
('inv-kiss', 'prod-kiss', 100, 0, 5),
('inv-oxy', 'prod-oxy', 100, 0, 5),
('inv-pt141', 'prod-pt141', 100, 0, 5),
('inv-cag', 'prod-cag', 100, 0, 5);

-- ============================================
-- AD ACCOUNTS (Euro market focus)
-- ============================================

INSERT OR IGNORE INTO ad_accounts (id, name, platform, pixel_id, is_active, is_primary, geo_target) VALUES
('ad-1', 'mainxacc1', 'meta', 'REPLACE_META_PIXEL', 1, 1, 'DE,AT,CH,NL,BE'),
('ad-2', 'tikxacc1', 'tiktok', 'REPLACE_TIKTOK_PIXEL', 1, 1, 'DE,AT,CH,NL,BE'),
('ad-3', 'google1', 'google', 'AW-REPLACE_GOOGLE', 1, 1, 'DE,AT,CH,NL,BE'),
('ad-4', 'reditxacc1', 'reddit', 'REPLACE_REDDIT_PIXEL', 1, 1, 'DE,AT,CH,NL,BE');
