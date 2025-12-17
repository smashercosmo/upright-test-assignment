BEGIN;

-- =========================
-- 1. ENUMS
-- =========================

CREATE TYPE alignment_category AS ENUM (
    'strongly_aligned',
    'aligned',
    'misaligned',
    'strongly_misaligned'
);

-- =========================
-- 2. SDGs
-- =========================

CREATE TABLE sdg (
    id SERIAL PRIMARY KEY,
    code TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL
);

INSERT INTO sdg (id, code, name) VALUES
    (1, 'SDG_1', 'No Poverty'),
    (2, 'SDG_2', 'Zero Hunger'),
    (3, 'SDG_3', 'Good Health and Well-being'),
    (4, 'SDG_4', 'Quality Education'),
    (5, 'SDG_5', 'Gender Equality'),
    (6, 'SDG_6', 'Clean Water and Sanitation'),
    (7, 'SDG_7', 'Affordable and Clean Energy'),
    (8, 'SDG_8', 'Decent Work and Economic Growth'),
    (9, 'SDG_9', 'Industry, Innovation and Infrastructure'),
    (10, 'SDG_10', 'Reduced Inequalities'),
    (11, 'SDG_11', 'Sustainable Cities and Communities'),
    (12, 'SDG_12', 'Responsible Consumption and Production'),
    (13, 'SDG_13', 'Climate Action'),
    (14, 'SDG_14', 'Life Below Water'),
    (15, 'SDG_15', 'Life on Land'),
    (16, 'SDG_16', 'Peace, Justice and Strong Institutions'),
    (17, 'SDG_17', 'Partnerships for the Goals');

-- =========================
-- 3. PRODUCT TAXONOMY
-- =========================

CREATE TABLE product (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    parent_id INT REFERENCES product(id)
);

-- Root categories
INSERT INTO product (id, name, parent_id) VALUES
    (1, 'Food', NULL),
    (2, 'Energy', NULL),
    (3, 'Healthcare', NULL),
    (4, 'Education', NULL),
    (5, 'Manufacturing', NULL);

-- Subcategories
INSERT INTO product (id, name, parent_id) VALUES
    (10, 'Fruits', 1),
    (11, 'Vegetables', 1),
    (12, 'Processed Foods', 1),

    (20, 'Renewable Energy', 2),
    (21, 'Fossil Energy', 2),

    (30, 'Medical Services', 3),
    (31, 'Pharmaceuticals', 3),

    (40, 'Digital Education', 4),
    (41, 'Traditional Education', 4),

    (50, 'Green Manufacturing', 5),
    (51, 'Heavy Industry', 5);

-- Leaf products
INSERT INTO product (id, name, parent_id) VALUES
    (100, 'Apples', 10),
    (101, 'Pears', 10),
    (102, 'Carrots', 11),
    (103, 'Potatoes', 11),
    (104, 'Frozen Meals', 12),
    (105, 'Sugary Snacks', 12),

    (106, 'Solar Power', 20),
    (107, 'Wind Power', 20),
    (108, 'Coal Power', 21),
    (109, 'Oil Power', 21),

    (110, 'Hospitals', 30),
    (111, 'Clinics', 30),
    (112, 'Vaccines', 31),
    (113, 'Painkillers', 31),

    (114, 'Online Courses', 40),
    (115, 'EdTech Platforms', 40),
    (116, 'Private Schools', 41),
    (117, 'Public Schools', 41),

    (118, 'Recycled Materials', 50),
    (119, 'Eco Packaging', 50),
    (120, 'Steel Production', 51),
    (121, 'Cement Production', 51);

-- =========================
-- 4. PRODUCT ↔ SDG ALIGNMENTS
-- =========================

CREATE TABLE product_sdg_alignment (
    product_id INT REFERENCES product(id),
    sdg_id INT REFERENCES sdg(id),
    alignment alignment_category,
    PRIMARY KEY (product_id, sdg_id)
);

INSERT INTO product_sdg_alignment (product_id, sdg_id, alignment) VALUES
    (3, 3, 'strongly_aligned'),      -- Healthcare -> SDG 3 (Good Health)
    (4, 4, 'strongly_aligned');      -- Education -> SDG 4 (Quality Education)

INSERT INTO product_sdg_alignment (product_id, sdg_id, alignment) VALUES
    (10, 2, 'aligned'),              -- Fruits -> SDG 2 (Zero Hunger)
    (20, 7, 'strongly_aligned'),     -- Renewable Energy -> SDG 7 (Clean Energy)
    (21, 13, 'strongly_misaligned'), -- Fossil Energy -> SDG 13 (Climate Action)
    (50, 12, 'aligned'),             -- Green Manufacturing -> SDG 12 (Responsible Consumption)
    (51, 9, 'misaligned');           -- Heavy Industry -> SDG 9 (Industry/Infrastructure)

INSERT INTO product_sdg_alignment (product_id, sdg_id, alignment) VALUES
    (102, 2, 'aligned'),             -- Carrots -> SDG 2 (Zero Hunger)
    (103, 2, 'aligned'),             -- Potatoes -> SDG 2 (Zero Hunger)
    (104, 3, 'misaligned'),          -- Frozen Meals -> SDG 3 (Good Health)
    (105, 3, 'strongly_misaligned'), -- Sugary Snacks -> SDG 3 (Good Health)
    (118, 15, 'aligned'),            -- Recycled Materials -> SDG 15 (Life on Land)
    (119, 14, 'aligned'),            -- Eco Packaging -> SDG 14 (Life Below Water)
    (120, 13, 'strongly_misaligned'),-- Steel Production -> SDG 13 (Climate Action)
    (121, 13, 'strongly_misaligned'),-- Cement Production -> SDG 13 (Climate Action)
    (100, 12, 'aligned'),            -- Apples -> SDG 12 (Consumption/Production)
    (101, 12, 'aligned');            -- Pears -> SDG 12 (Consumption/Production)

-- =========================
-- 5. COMPANIES
-- =========================

CREATE TABLE company (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

INSERT INTO company (id, name) VALUES
    (1, 'GreenGrow Foods'),
    (2, 'Future Energy Corp'),
    (3, 'HealthFirst Group'),
    (4, 'EduWorld'),
    (5, 'EcoManufacture Ltd'),
    (6, 'UrbanLiving Inc'),
    (7, 'GlobalGoods Co'),
    (8, 'CleanTech Solutions'),
    (9, 'AgriPlus'),
    (10, 'NextGen Industries');

-- =========================
-- 6. COMPANY REVENUE MIX
-- =========================

CREATE TABLE company_revenue (
    company_id INT REFERENCES company(id),
    product_id INT REFERENCES product(id),
    revenue_share NUMERIC(5,4),
    PRIMARY KEY (company_id, product_id)
);

-- Company 1: Food-focused
INSERT INTO company_revenue VALUES
    (1,100,0.0768),(1,101,0.0838),(1,102,0.1706),(1,103,0.1171),(1,104,0.1343),
    (1,105,0.0658),(1,114,0.0279),(1,115,0.1378),(1,118,0.0519),(1,119,0.1340);

-- Company 2: Energy-heavy
INSERT INTO company_revenue VALUES
    (2,106,0.1347),(2,107,0.1557),(2,108,0.1309),(2,109,0.0827),(2,118,0.0823),
    (2,119,0.1408),(2,120,0.0381),(2,121,0.1167),(2,114,0.0911),(2,115,0.0270);

-- Company 3: Healthcare
INSERT INTO company_revenue VALUES
    (3,110,0.1030),(3,111,0.1215),(3,112,0.1593),(3,113,0.1659),(3,114,0.0371),
    (3,115,0.1052),(3,118,0.0631),(3,119,0.1036),(3,120,0.1103),(3,121,0.0310);

-- Company 4: Education
INSERT INTO company_revenue VALUES
    (4,114,0.0573),(4,115,0.1417),(4,116,0.1207),(4,117,0.0076),(4,110,0.1051),
    (4,111,0.1352),(4,118,0.1192),(4,119,0.0523),(4,106,0.1306),(4,107,0.1303);

-- Company 5: Manufacturing
INSERT INTO company_revenue VALUES
    (5,118,0.0645),(5,119,0.1519),(5,120,0.0322),(5,121,0.1564),(5,106,0.1783),
    (5,107,0.0594),(5,104,0.1412),(5,105,0.0917),(5,114,0.0953),(5,115,0.0291);

-- Company 6: Mixed economy
INSERT INTO company_revenue VALUES
    (6,100,0.0933),(6,102,0.1517),(6,106,0.0760),(6,108,0.0401),(6,110,0.1129),
    (6,112,0.1186),(6,114,0.0872),(6,116,0.0135),(6,118,0.1216),(6,120,0.1851);

-- Company 7: Consumer goods
INSERT INTO company_revenue VALUES
    (7,101,0.1017),(7,103,0.1353),(7,104,0.0515),(7,105,0.1185),(7,114,0.0872),
    (7,115,0.1398),(7,118,0.1265),(7,119,0.1403),(7,120,0.0560),(7,121,0.0432);

-- Company 8: Clean tech
INSERT INTO company_revenue VALUES
    (8,106,0.0368),(8,107,0.0768),(8,118,0.1121),(8,119,0.1408),(8,114,0.1303),
    (8,115,0.1056),(8,100,0.0652),(8,102,0.1245),(8,110,0.0924),(8,112,0.1155);

-- Company 9: Agriculture
INSERT INTO company_revenue VALUES
    (9,100,0.0614),(9,101,0.1166),(9,102,0.1325),(9,103,0.1542),(9,104,0.1561),
    (9,105,0.0573),(9,118,0.1301),(9,119,0.0366),(9,114,0.1481),(9,115,0.0071);

-- Company 10: Heavy industry
INSERT INTO company_revenue VALUES
    (10,120,0.1267),(10,121,0.0931),(10,108,0.0631),(10,109,0.1348),(10,106,0.1158),
    (10,107,0.0931),(10,118,0.1396),(10,119,0.0354),(10,114,0.0847),(10,115,0.1137);

CREATE VIEW product_sdg_contribution AS
WITH RECURSIVE
    product_ancestors AS (SELECT p.id AS current_product_id,
                                 p.parent_id,
                                 p.id AS origin_product_id,
                                 0    AS depth
                          FROM product p

                          UNION ALL

                          SELECT parent.id,
                                 parent.parent_id,
                                 pa.origin_product_id,
                                 pa.depth + 1
                          FROM product parent
                                   JOIN product_ancestors pa
                                        ON pa.parent_id = parent.id),

    nearest_alignment AS (SELECT pa.origin_product_id AS product_id,
                                 psa.sdg_id,
                                 psa.alignment,
                                 ROW_NUMBER() OVER (
                                     PARTITION BY pa.origin_product_id, psa.sdg_id
                                     ORDER BY pa.depth
                                     )                AS rn
                          FROM product_ancestors pa
                                   JOIN product_sdg_alignment psa
                                        ON psa.product_id = pa.current_product_id),

    effective_product_alignment AS (SELECT product_id,
                                           sdg_id,
                                           alignment
                                    FROM nearest_alignment
                                    WHERE rn = 1),

    scored_alignment AS (SELECT product_id,
                                sdg_id,
                                alignment,
                                CASE alignment
                                    WHEN 'strongly_aligned' THEN 2
                                    WHEN 'aligned' THEN 1
                                    WHEN 'misaligned' THEN -1
                                    WHEN 'strongly_misaligned' THEN -2
                                    END AS score
                         FROM effective_product_alignment)

SELECT c.id                                  AS company_id,
       c.name                                AS company_name,
       p.id                                  AS product_id,
       p.name                                AS product_name,
       s.code                                AS sdg_code,
       s.name                                AS sdg_name,
       cr.revenue_share,
       sa.alignment,
       sa.score,
       ROUND(cr.revenue_share * sa.score, 4) AS weighted_contribution
FROM company c
         JOIN company_revenue cr ON cr.company_id = c.id
         JOIN product p ON p.id = cr.product_id
         JOIN scored_alignment sa ON sa.product_id = p.id
         JOIN sdg s ON s.id = sa.sdg_id
ORDER BY c.id,
         s.code,
         weighted_contribution DESC;
;

CREATE VIEW company_sdg_summary AS
SELECT company_id,
       company_name,
       sdg_code,
       sdg_name,
       ROUND(SUM(weighted_contribution), 4)               AS raw_score,
       ROUND((SUM(weighted_contribution) / 2.0) * 100, 2) AS normalized_score
FROM product_sdg_contribution
GROUP BY company_id,
         company_name,
         sdg_code,
         sdg_name;

CREATE VIEW company_sdg_confidence AS
SELECT *,
       CASE
           WHEN normalized_score >= 50 THEN 'Strong Positive'
           WHEN normalized_score >= 20 THEN 'Positive'
           WHEN normalized_score > -20 THEN 'Neutral'
           WHEN normalized_score > -50 THEN 'Negative'
           ELSE 'Strong Negative'
           END AS confidence_band
FROM company_sdg_summary;

COMMIT;