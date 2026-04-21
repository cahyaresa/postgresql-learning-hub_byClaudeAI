import React, { useState } from 'react'

const tabs = [
  { id: 'ddl',        label: '🏗️ DDL',           desc: 'CREATE, ALTER, DROP, TRUNCATE' },
  { id: 'dml',        label: '✏️ DML',            desc: 'INSERT, UPDATE, DELETE, MERGE' },
  { id: 'select',     label: '🔍 SELECT',          desc: 'Query & filtering' },
  { id: 'joins',      label: '🔗 JOINs',           desc: 'INNER, LEFT, RIGHT, FULL, CROSS' },
  { id: 'aggregate',  label: '📊 Aggregate',       desc: 'GROUP BY, HAVING, window functions' },
  { id: 'subquery',   label: '📦 Subquery & CTE',  desc: 'WITH, EXISTS, IN, lateral' },
  { id: 'indexes',    label: '⚡ Indexes',          desc: 'CREATE INDEX, EXPLAIN' },
  { id: 'constraints',label: '🔒 Constraints',     desc: 'PK, FK, UNIQUE, CHECK' },
  { id: 'transactions',label:'💳 Transactions',    desc: 'BEGIN, COMMIT, ROLLBACK, SAVEPOINT' },
  { id: 'functions',  label: '⚙️ Functions',        desc: 'CREATE FUNCTION, PL/pgSQL' },
  { id: 'json',       label: '📄 JSON/JSONB',       desc: 'Operator & fungsi JSON' },
  { id: 'advanced',   label: '🚀 Advanced',         desc: 'COPY, LISTEN/NOTIFY, LATERAL, DISTINCT ON' },
  { id: 'roles',      label: '👤 Users & Roles',    desc: 'CREATE ROLE, GRANT, pg_hba.conf' },
]

const Block = ({ title, color = '#64c8ff', children }) => (
  <div style={{ background: `${color}0d`, border: `1px solid ${color}33`, borderRadius: '8px', padding: '14px 16px', marginBottom: '14px' }}>
    <p style={{ color, fontWeight: 'bold', fontSize: '12px', marginBottom: '10px' }}>{title}</p>
    {children}
  </div>
)

const Code = ({ children, color = '#a0c8ff' }) => (
  <pre style={{ background: 'rgba(0,0,0,0.35)', padding: '12px', borderRadius: '6px', fontFamily: 'monospace', fontSize: '11px', color, overflow: 'auto', lineHeight: '1.85', margin: 0 }}>
    {children}
  </pre>
)

const Note = ({ children }) => (
  <p style={{ color: '#708090', fontSize: '11px', marginTop: '8px', lineHeight: '1.7' }}>{children}</p>
)

// ─── TAB CONTENT ───────────────────────────────────────────────────────────────

const DDL = () => (
  <div>
    <h3 style={{ color: '#64c8ff', fontWeight: 'bold', fontSize: '16px', marginBottom: '16px' }}>DDL — Data Definition Language</h3>

    <Block title="CREATE TABLE — Membuat tabel baru" color="#64c8ff">
      <Code>
{`CREATE TABLE employees (
  -- Kolom dengan tipe data
  id          BIGSERIAL       PRIMARY KEY,          -- auto-increment 64-bit
  name        VARCHAR(100)    NOT NULL,
  email       TEXT            UNIQUE NOT NULL,
  department  VARCHAR(50),
  salary      NUMERIC(12, 2)  DEFAULT 0,
  hire_date   DATE            DEFAULT CURRENT_DATE,
  is_active   BOOLEAN         DEFAULT TRUE,
  metadata    JSONB,
  created_at  TIMESTAMPTZ     DEFAULT NOW()
);

-- Tabel dengan composite primary key
CREATE TABLE order_items (
  order_id    BIGINT    NOT NULL,
  product_id  BIGINT    NOT NULL,
  qty         INT       NOT NULL CHECK (qty > 0),
  price       NUMERIC   NOT NULL,
  PRIMARY KEY (order_id, product_id)               -- composite PK
);

-- Tabel dengan GENERATED column
CREATE TABLE products (
  id          SERIAL PRIMARY KEY,
  price_net   NUMERIC(10,2),
  tax_rate    NUMERIC(5,4) DEFAULT 0.11,
  price_gross NUMERIC(10,2) GENERATED ALWAYS AS (price_net * (1 + tax_rate)) STORED
);`}
      </Code>
    </Block>

    <Block title="ALTER TABLE — Modifikasi struktur tabel" color="#4ade80">
      <Code>
{`-- Tambah kolom
ALTER TABLE employees ADD COLUMN phone VARCHAR(20);
ALTER TABLE employees ADD COLUMN bio TEXT DEFAULT '';

-- Drop kolom
ALTER TABLE employees DROP COLUMN bio;
ALTER TABLE employees DROP COLUMN IF EXISTS old_field;

-- Rename kolom
ALTER TABLE employees RENAME COLUMN phone TO phone_number;

-- Ubah tipe data
ALTER TABLE employees ALTER COLUMN salary TYPE BIGINT;
ALTER TABLE employees ALTER COLUMN name TYPE VARCHAR(200);

-- Set / drop DEFAULT
ALTER TABLE employees ALTER COLUMN salary SET DEFAULT 5000000;
ALTER TABLE employees ALTER COLUMN salary DROP DEFAULT;

-- Set / drop NOT NULL
ALTER TABLE employees ALTER COLUMN department SET NOT NULL;
ALTER TABLE employees ALTER COLUMN department DROP NOT NULL;

-- Rename tabel
ALTER TABLE employees RENAME TO staff;

-- Tambah constraint
ALTER TABLE employees ADD CONSTRAINT chk_salary CHECK (salary >= 0);
ALTER TABLE employees ADD CONSTRAINT uq_email UNIQUE (email);

-- Drop constraint
ALTER TABLE employees DROP CONSTRAINT chk_salary;
ALTER TABLE employees DROP CONSTRAINT IF EXISTS uq_email;`}
      </Code>
    </Block>

    <Block title="DROP & TRUNCATE — Hapus tabel / data" color="#f87171">
      <Code>
{`-- Drop tabel
DROP TABLE employees;
DROP TABLE IF EXISTS employees;              -- aman, tidak error jika tidak ada
DROP TABLE employees CASCADE;               -- ikut drop semua dependensi (views, FK, dll)
DROP TABLE employees RESTRICT;             -- default: gagal jika ada dependensi

-- Drop multiple tabel sekaligus
DROP TABLE IF EXISTS orders, order_items, products CASCADE;

-- TRUNCATE: hapus semua data tapi pertahankan struktur
TRUNCATE TABLE employees;                   -- instant, tidak bisa di-ROLLBACK (DDL)
TRUNCATE TABLE employees RESTART IDENTITY; -- reset SERIAL/SEQUENCE ke 1
TRUNCATE TABLE employees CASCADE;          -- truncate termasuk tabel yang FK ke sini
TRUNCATE TABLE a, b, c;                    -- truncate multiple tabel sekaligus`}
      </Code>
      <Note>TRUNCATE jauh lebih cepat dari DELETE untuk hapus semua baris — TRUNCATE tidak scan tiap baris.</Note>
    </Block>

    <Block title="CREATE / DROP SCHEMA, DATABASE, SEQUENCE" color="#a78bfa">
      <Code>
{`-- Schema
CREATE SCHEMA analytics;
CREATE SCHEMA IF NOT EXISTS reports;
DROP SCHEMA analytics CASCADE;

-- Tabel di schema tertentu
CREATE TABLE analytics.daily_stats (
  stat_date DATE PRIMARY KEY,
  visits    INT
);

-- Sequence
CREATE SEQUENCE order_seq START 1000 INCREMENT BY 1;
SELECT nextval('order_seq');   -- ambil nilai berikutnya
SELECT currval('order_seq');   -- nilai terakhir di session ini
SELECT setval('order_seq', 5000);  -- set manual

-- View
CREATE VIEW active_employees AS
  SELECT id, name, email FROM employees WHERE is_active = TRUE;

CREATE OR REPLACE VIEW active_employees AS
  SELECT id, name, email, department FROM employees WHERE is_active = TRUE;

DROP VIEW IF EXISTS active_employees;

-- Materialized View
CREATE MATERIALIZED VIEW monthly_revenue AS
  SELECT DATE_TRUNC('month', order_date) AS month,
         SUM(total_amount) AS revenue
  FROM orders GROUP BY 1;

REFRESH MATERIALIZED VIEW monthly_revenue;
REFRESH MATERIALIZED VIEW CONCURRENTLY monthly_revenue; -- tanpa lock read`}
      </Code>
    </Block>
  </div>
)

const DML = () => (
  <div>
    <h3 style={{ color: '#4ade80', fontWeight: 'bold', fontSize: '16px', marginBottom: '16px' }}>DML — Data Manipulation Language</h3>

    <Block title="INSERT — Memasukkan data" color="#4ade80">
      <Code>
{`-- Insert satu baris
INSERT INTO employees (name, email, department, salary)
VALUES ('Budi Santoso', 'budi@company.com', 'Engineering', 8000000);

-- Insert dan kembalikan data yang dimasukkan
INSERT INTO employees (name, email, salary)
VALUES ('Siti Rahayu', 'siti@company.com', 9000000)
RETURNING id, name, created_at;

-- Insert multiple baris sekaligus
INSERT INTO employees (name, email, department) VALUES
  ('Andi',  'andi@co.com',  'HR'),
  ('Dewi',  'dewi@co.com',  'Finance'),
  ('Fajar', 'fajar@co.com', 'Engineering');

-- INSERT ... ON CONFLICT (UPSERT)
INSERT INTO employees (email, name, salary)
VALUES ('budi@company.com', 'Budi Updated', 9000000)
ON CONFLICT (email) DO UPDATE
  SET name   = EXCLUDED.name,
      salary = EXCLUDED.salary,
      updated_at = NOW();

-- ON CONFLICT DO NOTHING — abaikan jika sudah ada
INSERT INTO employees (email, name)
VALUES ('budi@company.com', 'Budi')
ON CONFLICT (email) DO NOTHING;

-- INSERT dari hasil SELECT
INSERT INTO employees_archive (name, email, salary)
SELECT name, email, salary
FROM employees
WHERE is_active = FALSE;`}
      </Code>
    </Block>

    <Block title="UPDATE — Mengubah data" color="#fbbf24">
      <Code>
{`-- Update semua baris (HATI-HATI: tanpa WHERE = semua baris!)
UPDATE employees SET is_active = FALSE;  -- ⚠️ berbahaya tanpa WHERE

-- Update dengan WHERE
UPDATE employees
SET salary = salary * 1.10,              -- naik 10%
    updated_at = NOW()
WHERE department = 'Engineering'
  AND is_active = TRUE;

-- Update dan kembalikan hasil
UPDATE employees
SET salary = 12000000
WHERE id = 5
RETURNING id, name, salary;

-- UPDATE dengan JOIN menggunakan FROM
UPDATE employees e
SET department = d.new_name
FROM department_mapping d
WHERE e.department = d.old_name;

-- UPDATE dengan subquery
UPDATE employees
SET salary = (
  SELECT AVG(salary) * 1.2
  FROM employees
  WHERE department = 'Engineering'
)
WHERE id = 7;

-- UPDATE multiple kolom
UPDATE products
SET price    = price * 1.05,
    updated_at = NOW(),
    note     = 'Price adjusted Q1 2026'
WHERE category = 'Electronics';`}
      </Code>
    </Block>

    <Block title="DELETE — Menghapus data" color="#f87171">
      <Code>
{`-- Delete dengan kondisi
DELETE FROM employees WHERE is_active = FALSE;
DELETE FROM logs WHERE created_at < NOW() - INTERVAL '90 days';

-- Delete dan kembalikan baris yang dihapus
DELETE FROM employees
WHERE id = 10
RETURNING id, name, email;

-- DELETE dengan JOIN menggunakan USING
DELETE FROM order_items oi
USING orders o
WHERE oi.order_id = o.id
  AND o.status = 'cancelled'
  AND o.created_at < NOW() - INTERVAL '1 year';

-- Delete all (sama seperti TRUNCATE tapi bisa ROLLBACK)
DELETE FROM temp_data;`}
      </Code>
    </Block>

    <Block title="MERGE (PostgreSQL 15+) — Upsert kompleks" color="#a78bfa">
      <Code>
{`-- MERGE: INSERT, UPDATE, atau DELETE dalam satu statement
MERGE INTO employees AS target
USING new_employees AS source
ON target.email = source.email
WHEN MATCHED AND source.status = 'terminated' THEN
  DELETE
WHEN MATCHED THEN
  UPDATE SET
    name       = source.name,
    salary     = source.salary,
    updated_at = NOW()
WHEN NOT MATCHED THEN
  INSERT (name, email, department, salary)
  VALUES (source.name, source.email, source.department, source.salary);`}
      </Code>
      <Note>MERGE tersedia sejak PostgreSQL 15. Untuk versi lebih lama, gunakan INSERT ... ON CONFLICT.</Note>
    </Block>
  </div>
)

const SelectTab = () => (
  <div>
    <h3 style={{ color: '#38bdf8', fontWeight: 'bold', fontSize: '16px', marginBottom: '16px' }}>SELECT — Query & Filtering</h3>

    <Block title="Struktur lengkap SELECT" color="#38bdf8">
      <Code>
{`-- Urutan klausa SELECT (harus ditulis dalam urutan ini):
SELECT   [DISTINCT] kolom1, kolom2, ekspresi  -- 1. kolom yang diambil
FROM     tabel                                 -- 2. sumber data
JOIN     tabel2 ON kondisi                     -- 3. gabungkan tabel
WHERE    kondisi_filter                        -- 4. filter baris
GROUP BY kolom_group                           -- 5. kelompokkan
HAVING   kondisi_agregat                       -- 6. filter setelah GROUP BY
ORDER BY kolom [ASC|DESC] [NULLS FIRST|LAST]  -- 7. urutan hasil
LIMIT    n                                     -- 8. batasi jumlah baris
OFFSET   n;                                    -- 9. lewati n baris pertama`}
      </Code>
    </Block>

    <Block title="WHERE — Filter baris" color="#4ade80">
      <Code>
{`-- Perbandingan dasar
SELECT * FROM employees WHERE salary > 5000000;
SELECT * FROM employees WHERE department = 'Engineering';
SELECT * FROM employees WHERE salary BETWEEN 5000000 AND 10000000;
SELECT * FROM employees WHERE hire_date >= '2024-01-01';

-- NULL checks
SELECT * FROM employees WHERE department IS NULL;
SELECT * FROM employees WHERE department IS NOT NULL;

-- IN / NOT IN
SELECT * FROM employees WHERE department IN ('Engineering', 'Finance', 'HR');
SELECT * FROM employees WHERE id NOT IN (1, 2, 3);

-- LIKE / ILIKE (case-insensitive)
SELECT * FROM employees WHERE name LIKE 'Budi%';       -- mulai dengan Budi
SELECT * FROM employees WHERE email ILIKE '%@gmail%';   -- case-insensitive
SELECT * FROM employees WHERE name LIKE '%anto%';       -- mengandung 'anto'
SELECT * FROM employees WHERE name NOT LIKE 'A%';

-- Regex
SELECT * FROM employees WHERE email ~ '^[a-z]+@company\.com$';  -- case-sensitive
SELECT * FROM employees WHERE email ~* 'GMAIL';                  -- case-insensitive

-- Logika AND / OR / NOT
SELECT * FROM employees
WHERE (department = 'Engineering' OR department = 'IT')
  AND salary > 7000000
  AND is_active = TRUE;

-- ANY / ALL
SELECT * FROM employees WHERE salary > ANY(ARRAY[5000000, 6000000, 7000000]);
SELECT * FROM employees WHERE salary > ALL(SELECT salary FROM employees WHERE department = 'HR');`}
      </Code>
    </Block>

    <Block title="ORDER BY, LIMIT, OFFSET" color="#fbbf24">
      <Code>
{`-- Sorting
SELECT * FROM employees ORDER BY salary DESC;
SELECT * FROM employees ORDER BY department ASC, salary DESC;
SELECT * FROM employees ORDER BY hire_date DESC NULLS LAST;

-- Pagination
SELECT * FROM employees ORDER BY id LIMIT 10 OFFSET 0;    -- halaman 1
SELECT * FROM employees ORDER BY id LIMIT 10 OFFSET 10;   -- halaman 2
SELECT * FROM employees ORDER BY id LIMIT 10 OFFSET 20;   -- halaman 3

-- Praktik terbaik pagination: keyset (lebih cepat dari OFFSET untuk data besar)
SELECT * FROM employees
WHERE id > 1000        -- last seen id
ORDER BY id
LIMIT 10;

-- DISTINCT
SELECT DISTINCT department FROM employees ORDER BY department;

-- DISTINCT ON (PostgreSQL-specific) — satu baris per grup
SELECT DISTINCT ON (department) department, name, salary
FROM employees
ORDER BY department, salary DESC;  -- pilih yang salary tertinggi per department`}
      </Code>
    </Block>

    <Block title="Ekspresi & fungsi dalam SELECT" color="#a78bfa">
      <Code>
{`-- Alias kolom
SELECT name AS employee_name,
       salary AS monthly_salary,
       salary * 12 AS annual_salary
FROM employees;

-- CASE WHEN
SELECT name, salary,
  CASE
    WHEN salary < 5000000  THEN 'Junior'
    WHEN salary < 10000000 THEN 'Mid'
    WHEN salary < 20000000 THEN 'Senior'
    ELSE 'Principal'
  END AS level
FROM employees;

-- Fungsi string
SELECT
  UPPER(name),
  LOWER(email),
  LENGTH(name),
  TRIM('  spasi  '),
  SUBSTRING(name FROM 1 FOR 5),
  name || ' (' || department || ')' AS label,  -- concatenate
  CONCAT(name, ' - ', department)
FROM employees;

-- Fungsi tanggal
SELECT
  NOW(),                                   -- timestamp sekarang
  CURRENT_DATE,                            -- tanggal hari ini
  hire_date + INTERVAL '30 days',          -- tambah 30 hari
  AGE(hire_date),                          -- durasi dari hire_date
  EXTRACT(YEAR FROM hire_date),            -- ambil bagian tahun
  DATE_TRUNC('month', hire_date),          -- potong ke bulan
  TO_CHAR(hire_date, 'DD Month YYYY')      -- format string
FROM employees;

-- COALESCE & NULLIF
SELECT
  COALESCE(department, 'Unassigned'),      -- nilai pertama yang bukan NULL
  NULLIF(salary, 0),                       -- return NULL jika salary = 0
  COALESCE(phone, mobile, 'No contact')    -- coba phone, lalu mobile
FROM employees;`}
      </Code>
    </Block>
  </div>
)

const Joins = () => (
  <div>
    <h3 style={{ color: '#fb923c', fontWeight: 'bold', fontSize: '16px', marginBottom: '16px' }}>JOINs — Menggabungkan Tabel</h3>

    <Block title="Jenis-jenis JOIN" color="#fb923c">
      <Code>
{`-- Setup contoh
-- employees: id, name, department_id
-- departments: id, name, manager_id

-- INNER JOIN — hanya baris yang cocok di kedua tabel
SELECT e.name, d.name AS dept
FROM employees e
INNER JOIN departments d ON e.department_id = d.id;

-- LEFT JOIN (LEFT OUTER JOIN) — semua baris kiri, NULL jika tidak ada di kanan
SELECT e.name, d.name AS dept
FROM employees e
LEFT JOIN departments d ON e.department_id = d.id;
-- employees tanpa department akan tetap muncul, dept = NULL

-- RIGHT JOIN — semua baris kanan, NULL jika tidak ada di kiri
SELECT e.name, d.name AS dept
FROM employees e
RIGHT JOIN departments d ON e.department_id = d.id;
-- departments tanpa employees tetap muncul

-- FULL OUTER JOIN — semua baris dari kedua tabel
SELECT e.name, d.name AS dept
FROM employees e
FULL OUTER JOIN departments d ON e.department_id = d.id;

-- CROSS JOIN — cartesian product (semua kombinasi)
SELECT e.name, p.project_name
FROM employees e
CROSS JOIN projects p;
-- Jika employees=10 dan projects=5, hasil=50 baris

-- SELF JOIN — tabel join dengan dirinya sendiri
SELECT e.name AS employee,
       m.name AS manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;`}
      </Code>
    </Block>

    <Block title="Multiple JOINs & kondisi kompleks" color="#4ade80">
      <Code>
{`-- Chain beberapa JOIN
SELECT
  e.name,
  d.name  AS department,
  p.name  AS project,
  r.title AS role
FROM employees e
JOIN departments  d ON e.department_id = d.id
JOIN project_assignments pa ON pa.employee_id = e.id
JOIN projects     p ON pa.project_id = p.id
JOIN roles        r ON e.role_id = r.id
WHERE e.is_active = TRUE
  AND p.status = 'active';

-- JOIN dengan kondisi lebih dari satu kolom
SELECT *
FROM order_items oi
JOIN products p ON oi.product_id = p.id
                AND oi.warehouse_id = p.primary_warehouse_id;

-- JOIN dengan kondisi range
SELECT o.id, c.name, od.tier
FROM orders o
JOIN customers c ON o.customer_id = c.id
JOIN order_discounts od ON o.total_amount BETWEEN od.min_amount AND od.max_amount;

-- USING — shorthand jika nama kolom sama
SELECT e.name, d.name AS dept
FROM employees e
JOIN departments d USING (department_id);   -- sama dengan ON e.department_id = d.department_id

-- NATURAL JOIN — otomatis join kolom nama sama (hindari di production!)
SELECT * FROM employees NATURAL JOIN departments;`}
      </Code>
    </Block>

    <Block title="LATERAL JOIN — subquery per baris" color="#a78bfa">
      <Code>
{`-- LATERAL: jalankan subquery untuk setiap baris dari tabel kiri
SELECT d.name AS department,
       top3.name AS top_earner,
       top3.salary
FROM departments d
CROSS JOIN LATERAL (
  SELECT name, salary
  FROM employees e
  WHERE e.department_id = d.id    -- referensi ke d.id (lateral!)
  ORDER BY salary DESC
  LIMIT 3
) AS top3;

-- Equivalent dengan window function tapi LATERAL lebih fleksibel
-- Berguna untuk: top-N per group, pagination per group, dll`}
      </Code>
    </Block>
  </div>
)

const Aggregate = () => (
  <div>
    <h3 style={{ color: '#e879f9', fontWeight: 'bold', fontSize: '16px', marginBottom: '16px' }}>Aggregate, GROUP BY & Window Functions</h3>

    <Block title="Fungsi Agregat Dasar" color="#e879f9">
      <Code>
{`-- Fungsi agregat standar
SELECT
  COUNT(*)                  AS total_rows,
  COUNT(department)         AS non_null_dept,
  COUNT(DISTINCT department) AS unique_depts,
  SUM(salary)               AS total_salary,
  AVG(salary)               AS avg_salary,
  MIN(salary)               AS min_salary,
  MAX(salary)               AS max_salary,
  ROUND(AVG(salary), 2)     AS avg_rounded
FROM employees;

-- GROUP BY — agregat per kelompok
SELECT department,
       COUNT(*)        AS headcount,
       AVG(salary)     AS avg_salary,
       MAX(salary)     AS top_salary,
       SUM(salary)     AS payroll
FROM employees
WHERE is_active = TRUE
GROUP BY department
ORDER BY payroll DESC;

-- HAVING — filter setelah GROUP BY (tidak bisa pakai WHERE untuk agregat)
SELECT department, AVG(salary) AS avg_sal
FROM employees
GROUP BY department
HAVING AVG(salary) > 7000000    -- filter departemen dengan rata-rata > 7jt
   AND COUNT(*) >= 3;            -- dan minimal 3 orang

-- GROUP BY ROLLUP — subtotal per level
SELECT department, DATE_TRUNC('month', hire_date), COUNT(*)
FROM employees
GROUP BY ROLLUP (department, DATE_TRUNC('month', hire_date));

-- GROUP BY CUBE — semua kombinasi subtotal
SELECT department, is_active, COUNT(*)
FROM employees
GROUP BY CUBE (department, is_active);

-- GROUPING SETS — pilih kombinasi subtotal tertentu
SELECT department, is_active, COUNT(*)
FROM employees
GROUP BY GROUPING SETS (
  (department, is_active),
  (department),
  ()
);`}
      </Code>
    </Block>

    <Block title="Window Functions — Agregat tanpa GROUP BY" color="#38bdf8">
      <Code>
{`-- Sintaks: fungsi() OVER (PARTITION BY ... ORDER BY ... ROWS/RANGE ...)

-- ROW_NUMBER, RANK, DENSE_RANK
SELECT name, department, salary,
  ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS row_num,
  RANK()       OVER (PARTITION BY department ORDER BY salary DESC) AS rank,
  DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS dense_rank
FROM employees;
-- RANK: 1,2,2,4 (skip) | DENSE_RANK: 1,2,2,3 (tidak skip)

-- LAG & LEAD — akses baris sebelum/sesudah
SELECT name, hire_date, salary,
  LAG(salary)  OVER (PARTITION BY department ORDER BY hire_date) AS prev_salary,
  LEAD(salary) OVER (PARTITION BY department ORDER BY hire_date) AS next_salary,
  salary - LAG(salary) OVER (PARTITION BY department ORDER BY hire_date) AS salary_diff
FROM employees;

-- FIRST_VALUE & LAST_VALUE
SELECT name, department, salary,
  FIRST_VALUE(name)   OVER (PARTITION BY department ORDER BY salary DESC) AS top_earner,
  LAST_VALUE(salary)  OVER (
    PARTITION BY department ORDER BY salary DESC
    ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
  ) AS min_salary
FROM employees;

-- NTILE — bagi ke n bucket
SELECT name, salary,
  NTILE(4) OVER (ORDER BY salary) AS quartile  -- Q1, Q2, Q3, Q4
FROM employees;

-- SUM/AVG running total (cumulative)
SELECT name, hire_date, salary,
  SUM(salary) OVER (PARTITION BY department ORDER BY hire_date
                    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_payroll
FROM employees;

-- PERCENT_RANK & CUME_DIST
SELECT name, salary,
  PERCENT_RANK() OVER (ORDER BY salary) AS pct_rank,
  CUME_DIST()    OVER (ORDER BY salary) AS cume_dist
FROM employees;

-- Filter top-N per group dengan window function
SELECT * FROM (
  SELECT name, department, salary,
    ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS rn
  FROM employees
) ranked
WHERE rn <= 3;  -- top 3 tertinggi per departemen`}
      </Code>
    </Block>

    <Block title="FILTER — Kondisi dalam agregat" color="#fbbf24">
      <Code>
{`-- FILTER: agregat hanya baris yang memenuhi kondisi
SELECT
  COUNT(*)                               AS total,
  COUNT(*) FILTER (WHERE is_active)      AS active,
  COUNT(*) FILTER (WHERE NOT is_active)  AS inactive,
  AVG(salary) FILTER (WHERE department = 'Engineering') AS eng_avg
FROM employees;`}
      </Code>
    </Block>
  </div>
)

const Subquery = () => (
  <div>
    <h3 style={{ color: '#34d399', fontWeight: 'bold', fontSize: '16px', marginBottom: '16px' }}>Subquery & CTE (Common Table Expressions)</h3>

    <Block title="Subquery — Query dalam query" color="#34d399">
      <Code>
{`-- Subquery di WHERE
SELECT name, salary FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);

-- Subquery di FROM (derived table)
SELECT dept_stats.department, dept_stats.avg_sal
FROM (
  SELECT department, AVG(salary) AS avg_sal, COUNT(*) AS cnt
  FROM employees
  GROUP BY department
) AS dept_stats
WHERE dept_stats.cnt >= 5;

-- Subquery di SELECT (scalar subquery)
SELECT name, salary,
  (SELECT AVG(salary) FROM employees) AS company_avg,
  salary - (SELECT AVG(salary) FROM employees) AS diff_from_avg
FROM employees;

-- EXISTS — cek apakah subquery mengembalikan baris
SELECT name FROM employees e
WHERE EXISTS (
  SELECT 1 FROM project_assignments pa
  WHERE pa.employee_id = e.id
    AND pa.status = 'active'
);

-- NOT EXISTS
SELECT name FROM employees e
WHERE NOT EXISTS (
  SELECT 1 FROM project_assignments pa
  WHERE pa.employee_id = e.id
);

-- IN dengan subquery
SELECT name FROM employees
WHERE department IN (
  SELECT department FROM departments WHERE location = 'Jakarta'
);

-- ANY / ALL dengan subquery
SELECT name, salary FROM employees
WHERE salary > ALL (
  SELECT salary FROM employees WHERE department = 'Support'
);`}
      </Code>
    </Block>

    <Block title="CTE (WITH) — Named subquery yang bisa dipakai ulang" color="#64c8ff">
      <Code>
{`-- CTE dasar
WITH high_earners AS (
  SELECT id, name, salary, department
  FROM employees
  WHERE salary > 10000000
)
SELECT he.name, he.salary, d.name AS dept_name
FROM high_earners he
JOIN departments d ON he.department = d.code;

-- Multiple CTE
WITH
dept_avg AS (
  SELECT department, AVG(salary) AS avg_sal
  FROM employees GROUP BY department
),
above_avg AS (
  SELECT e.name, e.salary, e.department, da.avg_sal
  FROM employees e
  JOIN dept_avg da ON e.department = da.department
  WHERE e.salary > da.avg_sal
)
SELECT * FROM above_avg ORDER BY salary DESC;

-- CTE Rekursif — untuk hierarki/tree
WITH RECURSIVE org_tree AS (
  -- Base case: root node (CEO)
  SELECT id, name, manager_id, 1 AS level, name::TEXT AS path
  FROM employees
  WHERE manager_id IS NULL

  UNION ALL

  -- Recursive case: karyawan di bawah
  SELECT e.id, e.name, e.manager_id, ot.level + 1,
         ot.path || ' > ' || e.name
  FROM employees e
  JOIN org_tree ot ON e.manager_id = ot.id
)
SELECT level, path, name FROM org_tree ORDER BY path;

-- CTE untuk menghitung BFS (Breadth-First Search)
WITH RECURSIVE reachable AS (
  SELECT id, 0 AS depth FROM nodes WHERE id = 1  -- start node
  UNION ALL
  SELECT e.to_id, r.depth + 1
  FROM edges e
  JOIN reachable r ON e.from_id = r.id
  WHERE r.depth < 10  -- batasi kedalaman
)
SELECT DISTINCT id FROM reachable;`}
      </Code>
    </Block>

    <Block title="CTE Writable — INSERT/UPDATE/DELETE dalam CTE" color="#fbbf24">
      <Code>
{`-- DELETE dan INSERT dalam satu statement (move data)
WITH deleted AS (
  DELETE FROM employees
  WHERE is_active = FALSE
    AND updated_at < NOW() - INTERVAL '1 year'
  RETURNING *
)
INSERT INTO employees_archive
SELECT * FROM deleted;

-- UPDATE lalu SELECT hasil
WITH updated AS (
  UPDATE employees
  SET salary = salary * 1.1
  WHERE department = 'Engineering'
  RETURNING id, name, salary
)
SELECT name, salary AS new_salary FROM updated;`}
      </Code>
    </Block>
  </div>
)

const Indexes = () => (
  <div>
    <h3 style={{ color: '#fb923c', fontWeight: 'bold', fontSize: '16px', marginBottom: '16px' }}>Indexes — Strategi & EXPLAIN</h3>

    <Block title="CREATE INDEX" color="#fb923c">
      <Code>
{`-- Index B-Tree (default)
CREATE INDEX idx_employees_email    ON employees (email);
CREATE INDEX idx_employees_dept_sal ON employees (department, salary DESC);

-- Index unik
CREATE UNIQUE INDEX idx_employees_email_uq ON employees (email);

-- Partial index — hanya subset baris
CREATE INDEX idx_active_employees ON employees (department)
  WHERE is_active = TRUE;

-- Index pada ekspresi
CREATE INDEX idx_employees_lower_email ON employees (LOWER(email));
-- Query yang menggunakan: WHERE LOWER(email) = 'budi@co.com'

-- Index untuk LIKE prefix
CREATE INDEX idx_employees_name_text ON employees USING BTREE (name text_pattern_ops);

-- GIN untuk JSONB
CREATE INDEX idx_employees_meta ON employees USING GIN (metadata);
-- Query: WHERE metadata @> '{"role": "admin"}'

-- GIN untuk Full-Text Search
CREATE INDEX idx_products_fts ON products
  USING GIN (to_tsvector('indonesian', name || ' ' || description));

-- BRIN untuk tabel besar terurut
CREATE INDEX idx_logs_created_brin ON logs USING BRIN (created_at);

-- Buat index tanpa lock tabel (production!)
CREATE INDEX CONCURRENTLY idx_orders_user_id ON orders (user_id);

-- Drop index
DROP INDEX idx_employees_email;
DROP INDEX CONCURRENTLY idx_orders_user_id;`}
      </Code>
    </Block>

    <Block title="EXPLAIN ANALYZE — Membaca query plan" color="#64c8ff">
      <Code>
{`-- Lihat query plan (tanpa eksekusi)
EXPLAIN SELECT * FROM employees WHERE email = 'budi@company.com';

-- Lihat plan + eksekusi nyata (waktu, rows aktual)
EXPLAIN ANALYZE SELECT * FROM employees WHERE email = 'budi@company.com';

-- Format JSON untuk parsing
EXPLAIN (FORMAT JSON, ANALYZE, BUFFERS)
SELECT e.name, d.name
FROM employees e JOIN departments d ON e.department_id = d.id
WHERE e.salary > 8000000;

-- Contoh output EXPLAIN:
-- Index Scan using idx_employees_email on employees
--   (cost=0.29..8.31 rows=1 width=120) (actual time=0.023..0.024 rows=1 loops=1)
--   Index Cond: (email = 'budi@company.com')
-- Planning Time: 0.1 ms
-- Execution Time: 0.05 ms

-- Node types yang penting:
-- Seq Scan       → full table scan (buruk untuk tabel besar)
-- Index Scan     → pakai index, baca heap untuk data
-- Index Only Scan → pakai index saja, tidak baca heap (tercepat)
-- Bitmap Scan    → index + bitset, efisien untuk banyak baris
-- Hash Join      → join dengan hash table (bagus untuk besar ke besar)
-- Nested Loop    → join baris per baris (bagus untuk satu sisi kecil)
-- Merge Join     → join data sudah terurut`}
      </Code>
      <Note>Perhatikan cost=X..Y (perkiraan) vs actual time=X..Y (nyata). Jika selisih besar, statistik tabel mungkin perlu di-ANALYZE.</Note>
    </Block>

    <Block title="Query optimization tips" color="#4ade80">
      <Code>
{`-- Update statistik tabel
ANALYZE employees;
ANALYZE;          -- semua tabel

-- Lihat index yang ada
SELECT indexname, indexdef FROM pg_indexes WHERE tablename = 'employees';

-- Cek index yang tidak dipakai
SELECT schemaname, tablename, indexname, idx_scan
FROM pg_stat_user_indexes
WHERE idx_scan = 0
  AND indexname NOT LIKE '%pkey%'
ORDER BY tablename;

-- Cek ukuran index
SELECT indexname,
       pg_size_pretty(pg_relation_size(indexname::regclass)) AS size
FROM pg_indexes
WHERE tablename = 'employees';

-- Enable/disable seqscan untuk testing
SET enable_seqscan = OFF;    -- paksa index scan
EXPLAIN ANALYZE SELECT ...;
SET enable_seqscan = ON;     -- kembalikan normal`}
      </Code>
    </Block>
  </div>
)

const Constraints = () => (
  <div>
    <h3 style={{ color: '#f87171', fontWeight: 'bold', fontSize: '16px', marginBottom: '16px' }}>Constraints — Integritas Data</h3>

    <Block title="PRIMARY KEY, UNIQUE, NOT NULL" color="#f87171">
      <Code>
{`CREATE TABLE orders (
  -- NOT NULL
  id          BIGSERIAL NOT NULL,
  user_id     BIGINT    NOT NULL,

  -- PRIMARY KEY (otomatis NOT NULL + UNIQUE)
  order_code  VARCHAR(20) PRIMARY KEY,

  -- UNIQUE
  invoice_no  VARCHAR(50) UNIQUE,

  -- UNIQUE composite
  UNIQUE (user_id, order_code),

  -- PRIMARY KEY composite
  -- PRIMARY KEY (order_id, product_id)  -- jika composite PK
  amount      NUMERIC NOT NULL DEFAULT 0
);

-- Primary key otomatis
CREATE TABLE items (
  id    BIGSERIAL PRIMARY KEY,   -- sequence + PK
  name  TEXT NOT NULL
);

-- UUID primary key
CREATE TABLE events (
  id    UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name  TEXT NOT NULL
);`}
      </Code>
    </Block>

    <Block title="FOREIGN KEY — Relasi antar tabel" color="#fbbf24">
      <Code>
{`CREATE TABLE order_items (
  id         BIGSERIAL PRIMARY KEY,
  order_id   BIGINT NOT NULL,
  product_id BIGINT NOT NULL,
  qty        INT NOT NULL,

  -- FK inline
  FOREIGN KEY (order_id)   REFERENCES orders(id)   ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT
);

-- Opsi ON DELETE:
--   CASCADE       → hapus baris ini jika parent dihapus
--   SET NULL      → set FK jadi NULL jika parent dihapus
--   SET DEFAULT   → set FK ke nilai DEFAULT
--   RESTRICT      → tolak DELETE parent jika ada child (default)
--   NO ACTION     → seperti RESTRICT tapi dicek di akhir transaksi

-- Opsi ON UPDATE sama dengan ON DELETE
FOREIGN KEY (order_id) REFERENCES orders(id)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

-- DEFERRABLE FK — cek constraint di akhir transaksi, bukan per statement
ALTER TABLE order_items
  ADD CONSTRAINT fk_order FOREIGN KEY (order_id)
  REFERENCES orders(id)
  DEFERRABLE INITIALLY DEFERRED;

-- Nonaktifkan FK sementara (untuk bulk insert)
SET session_replication_role = 'replica';  -- skip FK checks
-- ... bulk insert ...
SET session_replication_role = 'origin';   -- kembalikan`}
      </Code>
    </Block>

    <Block title="CHECK — Validasi nilai kolom" color="#a78bfa">
      <Code>
{`CREATE TABLE products (
  id       SERIAL PRIMARY KEY,
  name     TEXT NOT NULL,
  price    NUMERIC CHECK (price >= 0),
  discount NUMERIC CHECK (discount BETWEEN 0 AND 1),
  status   TEXT CHECK (status IN ('active', 'inactive', 'archived')),

  -- CHECK yang melibatkan banyak kolom (table-level)
  CONSTRAINT chk_price_discount CHECK (price * (1 - discount) >= 0)
);

-- Tambah CHECK setelah tabel dibuat
ALTER TABLE employees
  ADD CONSTRAINT chk_salary_positive CHECK (salary >= 0);

ALTER TABLE employees
  ADD CONSTRAINT chk_hire_future CHECK (hire_date <= CURRENT_DATE);

-- CHECK dengan fungsi
ALTER TABLE users
  ADD CONSTRAINT chk_email_format
  CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');`}
      </Code>
    </Block>

    <Block title="EXCLUDE — Constraint tidak overlap" color="#38bdf8">
      <Code>
{`-- EXCLUDE: tidak boleh ada dua baris yang kondisinya conflict
-- Butuh extension btree_gist untuk tipe non-range
CREATE EXTENSION IF NOT EXISTS btree_gist;

CREATE TABLE room_bookings (
  room_id  INT NOT NULL,
  period   TSTZRANGE NOT NULL,

  -- Tidak boleh ada booking room yang sama dengan period overlap
  EXCLUDE USING GIST (room_id WITH =, period WITH &&)
);

-- Test: insert dua booking yang overlap → ERROR
INSERT INTO room_bookings VALUES (1, '[2026-01-01, 2026-01-05)');
INSERT INTO room_bookings VALUES (1, '[2026-01-03, 2026-01-07)');  -- ERROR!`}
      </Code>
    </Block>
  </div>
)

const Transactions = () => (
  <div>
    <h3 style={{ color: '#4ade80', fontWeight: 'bold', fontSize: '16px', marginBottom: '16px' }}>Transactions — BEGIN, COMMIT, ROLLBACK, SAVEPOINT</h3>

    <Block title="Transaction dasar" color="#4ade80">
      <Code>
{`-- Mulai transaksi eksplisit
BEGIN;
-- atau: START TRANSACTION;

  UPDATE accounts SET balance = balance - 500000 WHERE id = 1;
  UPDATE accounts SET balance = balance + 500000 WHERE id = 2;

COMMIT;   -- simpan semua perubahan
-- atau: ROLLBACK; -- batalkan semua perubahan

-- Cek apakah dalam transaksi
SELECT current_setting('transaction_isolation');`}
      </Code>
    </Block>

    <Block title="SAVEPOINT — Checkpoint dalam transaksi" color="#fbbf24">
      <Code>
{`BEGIN;
  INSERT INTO orders (user_id, total) VALUES (1, 100000);

  SAVEPOINT setelah_order;   -- buat checkpoint

  INSERT INTO order_items (order_id, product_id, qty) VALUES (1, 5, 2);
  -- Misalnya ada error di sini:

  ROLLBACK TO SAVEPOINT setelah_order;  -- kembali ke checkpoint, order tetap ada

  -- Coba lagi dengan data berbeda
  INSERT INTO order_items (order_id, product_id, qty) VALUES (1, 3, 1);

  RELEASE SAVEPOINT setelah_order;  -- hapus savepoint (opsional)
COMMIT;`}
      </Code>
    </Block>

    <Block title="Isolation Level" color="#a78bfa">
      <Code>
{`-- Set isolation level untuk transaksi ini
BEGIN TRANSACTION ISOLATION LEVEL SERIALIZABLE;
BEGIN TRANSACTION ISOLATION LEVEL REPEATABLE READ;
BEGIN TRANSACTION ISOLATION LEVEL READ COMMITTED;  -- default PostgreSQL
BEGIN TRANSACTION ISOLATION LEVEL READ UNCOMMITTED; -- sama dengan READ COMMITTED di PG

-- Atau set untuk session
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;

-- ─── Perbandingan Isolation Level ───────────────────────────────
-- READ COMMITTED (default):
--   + Baca data yang sudah di-commit
--   - Nonrepeatable read (baris bisa berubah antar query dalam transaksi)
--   - Phantom read (baris baru bisa muncul)

-- REPEATABLE READ:
--   + Snapshot konsisten sejak awal transaksi
--   + Tidak ada nonrepeatable read
--   - Masih bisa ada serialization anomaly

-- SERIALIZABLE:
--   + Tertinggi: transaksi seolah dijalankan serial
--   + Deteksi dan abort jika ada konflik
--   - Lebih lambat, lebih banyak retry

-- FOR UPDATE / FOR SHARE — row-level locking
SELECT * FROM accounts WHERE id = 1 FOR UPDATE;        -- lock untuk update
SELECT * FROM accounts WHERE id = 1 FOR SHARE;         -- lock baca (shared)
SELECT * FROM accounts WHERE id = 1 FOR UPDATE SKIP LOCKED; -- skip baris yang terkunci
SELECT * FROM accounts WHERE id = 1 FOR UPDATE NOWAIT; -- error jika tidak bisa lock`}
      </Code>
    </Block>

    <Block title="Advisory Locks — Lock aplikasi" color="#f87171">
      <Code>
{`-- Advisory lock: lock bebas pakai yang dikontrol aplikasi
-- Berguna untuk mutex/semaphore level aplikasi

-- Session-level lock (sampai session berakhir atau unlock eksplisit)
SELECT pg_advisory_lock(12345);
-- ... critical section ...
SELECT pg_advisory_unlock(12345);

-- Transaction-level lock (otomatis unlock saat COMMIT/ROLLBACK)
BEGIN;
  SELECT pg_advisory_xact_lock(42);
  -- ... critical section dalam transaksi ...
COMMIT;  -- lock otomatis dilepas

-- Try lock (tidak blocking, return false jika tidak bisa)
SELECT pg_try_advisory_lock(99);   -- return true/false`}
      </Code>
    </Block>
  </div>
)

const Functions = () => (
  <div>
    <h3 style={{ color: '#a78bfa', fontWeight: 'bold', fontSize: '16px', marginBottom: '16px' }}>Functions & PL/pgSQL</h3>

    <Block title="CREATE FUNCTION — SQL function" color="#a78bfa">
      <Code>
{`-- SQL function sederhana
CREATE OR REPLACE FUNCTION get_full_name(first TEXT, last TEXT)
RETURNS TEXT AS $$
  SELECT first || ' ' || last;
$$ LANGUAGE sql IMMUTABLE;

-- Pakai:
SELECT get_full_name('Budi', 'Santoso');

-- Function yang return table
CREATE OR REPLACE FUNCTION get_active_employees(dept TEXT DEFAULT NULL)
RETURNS TABLE (id BIGINT, name TEXT, salary NUMERIC) AS $$
  SELECT id, name, salary
  FROM employees
  WHERE is_active = TRUE
    AND (dept IS NULL OR department = dept);
$$ LANGUAGE sql STABLE;

-- Pakai:
SELECT * FROM get_active_employees('Engineering');
SELECT * FROM get_active_employees();  -- semua dept`}
      </Code>
    </Block>

    <Block title="PL/pgSQL — Procedural language" color="#64c8ff">
      <Code>
{`-- PL/pgSQL dengan IF, LOOP, variabel
CREATE OR REPLACE FUNCTION transfer_balance(
  from_id  BIGINT,
  to_id    BIGINT,
  amount   NUMERIC
) RETURNS VOID AS $$
DECLARE
  v_balance NUMERIC;
BEGIN
  -- Ambil saldo
  SELECT balance INTO v_balance
  FROM accounts WHERE id = from_id FOR UPDATE;

  -- Validasi
  IF v_balance IS NULL THEN
    RAISE EXCEPTION 'Account % not found', from_id;
  END IF;

  IF v_balance < amount THEN
    RAISE EXCEPTION 'Insufficient balance: have %, need %', v_balance, amount;
  END IF;

  -- Lakukan transfer
  UPDATE accounts SET balance = balance - amount WHERE id = from_id;
  UPDATE accounts SET balance = balance + amount WHERE id = to_id;

  -- Log
  INSERT INTO transfer_log (from_id, to_id, amount, created_at)
  VALUES (from_id, to_id, amount, NOW());

  RAISE NOTICE 'Transfer % dari % ke % berhasil', amount, from_id, to_id;
END;
$$ LANGUAGE plpgsql;

-- Pakai:
SELECT transfer_balance(1, 2, 500000);`}
      </Code>
    </Block>

    <Block title="LOOP, FOR, WHILE dalam PL/pgSQL" color="#4ade80">
      <Code>
{`CREATE OR REPLACE FUNCTION generate_report(start_date DATE, end_date DATE)
RETURNS TEXT AS $$
DECLARE
  rec        RECORD;
  result     TEXT := '';
  total_rev  NUMERIC := 0;
  curr_date  DATE;
BEGIN
  -- FOR loop cursor
  FOR rec IN
    SELECT DATE_TRUNC('day', order_date) AS day, SUM(total) AS revenue
    FROM orders
    WHERE order_date BETWEEN start_date AND end_date
    GROUP BY 1 ORDER BY 1
  LOOP
    result := result || rec.day || ': Rp ' || rec.revenue || E'\n';
    total_rev := total_rev + rec.revenue;
  END LOOP;

  -- FOR loop integer range
  FOR i IN 1..5 LOOP
    RAISE NOTICE 'Iteration %', i;
  END LOOP;

  -- WHILE loop
  curr_date := start_date;
  WHILE curr_date <= end_date LOOP
    curr_date := curr_date + 1;
  END LOOP;

  result := result || 'Total: Rp ' || total_rev;
  RETURN result;
END;
$$ LANGUAGE plpgsql;`}
      </Code>
    </Block>

    <Block title="TRIGGER — Otomatis saat data berubah" color="#fbbf24">
      <Code>
{`-- Trigger function
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Buat trigger
CREATE TRIGGER trg_employees_updated_at
  BEFORE UPDATE ON employees
  FOR EACH ROW
  EXECUTE FUNCTION set_updated_at();

-- Trigger untuk audit log
CREATE OR REPLACE FUNCTION audit_changes()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO audit_log (table_name, operation, new_data, changed_by)
    VALUES (TG_TABLE_NAME, 'INSERT', row_to_json(NEW), current_user);
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' THEN
    INSERT INTO audit_log (table_name, operation, old_data, new_data, changed_by)
    VALUES (TG_TABLE_NAME, 'UPDATE', row_to_json(OLD), row_to_json(NEW), current_user);
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    INSERT INTO audit_log (table_name, operation, old_data, changed_by)
    VALUES (TG_TABLE_NAME, 'DELETE', row_to_json(OLD), current_user);
    RETURN OLD;
  END IF;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_employees_audit
  AFTER INSERT OR UPDATE OR DELETE ON employees
  FOR EACH ROW EXECUTE FUNCTION audit_changes();

-- Drop trigger
DROP TRIGGER IF EXISTS trg_employees_audit ON employees;`}
      </Code>
    </Block>
  </div>
)

const Json = () => (
  <div>
    <h3 style={{ color: '#38bdf8', fontWeight: 'bold', fontSize: '16px', marginBottom: '16px' }}>JSON / JSONB — Operator & Fungsi</h3>

    <Block title="Operator dasar JSON/JSONB" color="#38bdf8">
      <Code>
{`-- Contoh kolom: metadata JSONB
-- Data: {"role": "admin", "tags": ["pg", "dba"], "address": {"city": "Jakarta"}}

-- -> : ambil field, return JSONB
SELECT metadata -> 'role' FROM users;              -- "admin"

-- ->> : ambil field sebagai TEXT
SELECT metadata ->> 'role' FROM users;             -- admin (tanpa quotes)

-- #> : path array, return JSONB
SELECT metadata #> '{address, city}' FROM users;   -- "Jakarta"

-- #>> : path array, return TEXT
SELECT metadata #>> '{address, city}' FROM users;  -- Jakarta

-- WHERE dengan JSON
SELECT * FROM users WHERE metadata ->> 'role' = 'admin';
SELECT * FROM users WHERE metadata -> 'address' ->> 'city' = 'Jakarta';

-- @> (contains) — cek apakah mengandung JSON tertentu
SELECT * FROM users WHERE metadata @> '{"role": "admin"}';
SELECT * FROM users WHERE metadata @> '{"tags": ["dba"]}';

-- <@ (contained by)
SELECT * FROM users WHERE '{"role": "admin"}' <@ metadata;

-- ? (key exists)
SELECT * FROM users WHERE metadata ? 'phone';         -- punya field phone?

-- ?| (any key exists)
SELECT * FROM users WHERE metadata ?| ARRAY['phone', 'mobile'];

-- ?& (all keys exist)
SELECT * FROM users WHERE metadata ?& ARRAY['role', 'tags'];`}
      </Code>
    </Block>

    <Block title="Fungsi JSONB" color="#4ade80">
      <Code>
{`-- jsonb_set — update nilai dalam JSONB
UPDATE users
SET metadata = jsonb_set(metadata, '{role}', '"superadmin"')
WHERE id = 1;

-- Update nested path
UPDATE users
SET metadata = jsonb_set(metadata, '{address, city}', '"Bandung"')
WHERE id = 1;

-- jsonb_insert — insert ke array
UPDATE users
SET metadata = jsonb_insert(metadata, '{tags, 0}', '"newbie"')
WHERE id = 1;

-- || (concat/merge JSONB)
UPDATE users
SET metadata = metadata || '{"phone": "081234567890", "verified": true}'
WHERE id = 1;

-- Hapus key dengan -
UPDATE users
SET metadata = metadata - 'old_field'
WHERE id = 1;

-- Hapus multiple keys
UPDATE users
SET metadata = metadata - ARRAY['old1', 'old2']
WHERE id = 1;

-- Hapus path nested dengan #-
UPDATE users
SET metadata = metadata #- '{address, zip}'
WHERE id = 1;

-- jsonb_each — expand ke rows
SELECT key, value FROM jsonb_each('{"a":1,"b":2,"c":3}'::jsonb);

-- jsonb_object_keys — ambil semua key
SELECT jsonb_object_keys(metadata) FROM users LIMIT 1;

-- jsonb_array_elements — expand array ke rows
SELECT jsonb_array_elements(metadata -> 'tags') AS tag FROM users WHERE id = 1;

-- jsonb_array_length
SELECT jsonb_array_length(metadata -> 'tags') FROM users WHERE id = 1;

-- JSON build
SELECT jsonb_build_object('name', name, 'salary', salary) FROM employees;
SELECT jsonb_agg(name ORDER BY name) FROM employees;  -- aggregate ke JSON array`}
      </Code>
    </Block>

    <Block title="Index JSONB & Full-Text Search" color="#fbbf24">
      <Code>
{`-- GIN index untuk operator @>, ?, ?|, ?&
CREATE INDEX idx_users_metadata ON users USING GIN (metadata);

-- GIN index untuk path tertentu (lebih kecil)
CREATE INDEX idx_users_role ON users USING GIN ((metadata -> 'role'));

-- Full-Text Search
CREATE INDEX idx_articles_fts ON articles
  USING GIN (to_tsvector('indonesian', title || ' ' || content));

-- Query FTS
SELECT title FROM articles
WHERE to_tsvector('indonesian', title || ' ' || content)
   @@ to_tsquery('indonesian', 'postgresql & indexing');

-- ts_rank — relevansi
SELECT title,
  ts_rank(to_tsvector('indonesian', title || ' ' || content),
          to_tsquery('postgresql')) AS rank
FROM articles
WHERE to_tsvector('indonesian', title || ' ' || content)
   @@ to_tsquery('postgresql')
ORDER BY rank DESC;`}
      </Code>
    </Block>
  </div>
)

const Advanced = () => (
  <div>
    <h3 style={{ color: '#e879f9', fontWeight: 'bold', fontSize: '16px', marginBottom: '16px' }}>Advanced SQL — COPY, Array, LISTEN/NOTIFY, dan lainnya</h3>

    <Block title="COPY — Import/Export data cepat" color="#e879f9">
      <Code>
{`-- Export ke CSV
COPY employees TO '/tmp/employees.csv' CSV HEADER DELIMITER ',';
COPY employees TO '/tmp/employees.tsv' DELIMITER E'\t';

-- Export hasil query
COPY (SELECT id, name, salary FROM employees WHERE is_active = TRUE)
  TO '/tmp/active_employees.csv' CSV HEADER;

-- Import dari CSV
COPY employees (name, email, department, salary)
  FROM '/tmp/new_employees.csv' CSV HEADER;

-- Client-side copy (tidak butuh permission server)
\copy employees TO '/home/user/employees.csv' CSV HEADER    -- psql command

-- COPY dengan NULL dan format tertentu
COPY employees FROM '/tmp/data.csv'
  CSV HEADER NULL 'NULL' QUOTE '"' ESCAPE '\';`}
      </Code>
    </Block>

    <Block title="Array — Tipe data array PostgreSQL" color="#64c8ff">
      <Code>
{`-- Deklarasi kolom array
CREATE TABLE articles (
  id     SERIAL PRIMARY KEY,
  title  TEXT,
  tags   TEXT[],
  scores INT[]
);

-- Insert array
INSERT INTO articles (title, tags, scores)
VALUES ('PostgreSQL Tips', ARRAY['postgres', 'database', 'tips'], ARRAY[95, 87, 92]);

-- Akses element (1-indexed!)
SELECT tags[1], scores[2] FROM articles WHERE id = 1;

-- ANY — cek apakah nilai ada dalam array
SELECT * FROM articles WHERE 'postgres' = ANY(tags);

-- @> contains, <@ contained by
SELECT * FROM articles WHERE tags @> ARRAY['postgres', 'tips'];
SELECT * FROM articles WHERE ARRAY['tips'] <@ tags;

-- || concat array
UPDATE articles SET tags = tags || ARRAY['new-tag'] WHERE id = 1;

-- array_append / array_prepend
UPDATE articles SET tags = array_append(tags, 'featured') WHERE id = 1;

-- array_remove
UPDATE articles SET tags = array_remove(tags, 'tips') WHERE id = 1;

-- array_length, cardinality
SELECT array_length(tags, 1), cardinality(tags) FROM articles;

-- unnest — expand array ke rows
SELECT id, unnest(tags) AS tag FROM articles;

-- array_agg — aggregate ke array
SELECT array_agg(name ORDER BY salary DESC) FROM employees;`}
      </Code>
    </Block>

    <Block title="LISTEN / NOTIFY — Pub/Sub real-time" color="#4ade80">
      <Code>
{`-- NOTIFY: kirim notifikasi ke channel
NOTIFY order_updates, '{"order_id": 123, "status": "shipped"}';
SELECT pg_notify('order_updates', json_build_object('id', 123, 'status', 'shipped')::TEXT);

-- LISTEN: subscribe ke channel (dalam psql atau koneksi app)
LISTEN order_updates;
-- Sekarang koneksi ini akan menerima notifikasi

-- Trigger yang otomatis NOTIFY
CREATE OR REPLACE FUNCTION notify_order_change()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM pg_notify(
    'order_updates',
    json_build_object('id', NEW.id, 'status', NEW.status, 'op', TG_OP)::TEXT
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_notify_orders
  AFTER INSERT OR UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION notify_order_change();

UNLISTEN order_updates;   -- berhenti subscribe
UNLISTEN *;               -- berhenti semua`}
      </Code>
    </Block>

    <Block title="DISTINCT ON, RETURNING, GENERATE_SERIES" color="#fbbf24">
      <Code>
{`-- DISTINCT ON (PostgreSQL-specific) — ambil satu baris per group
SELECT DISTINCT ON (department)
  department, name, salary
FROM employees
ORDER BY department, salary DESC;  -- per dept, ambil yang salary tertinggi

-- RETURNING — kembalikan data yang baru dimodifikasi
INSERT INTO orders (user_id, total) VALUES (1, 500000) RETURNING id, created_at;
UPDATE employees SET salary = salary * 1.1 RETURNING id, name, salary AS new_salary;
DELETE FROM logs WHERE id = 5 RETURNING *;

-- GENERATE_SERIES — generate deretan angka/tanggal
SELECT generate_series(1, 10);                               -- 1 sampai 10
SELECT generate_series(0, 100, 5);                           -- 0, 5, 10, ..., 100
SELECT generate_series(NOW(), NOW() + INTERVAL '7 days', INTERVAL '1 day'); -- 7 hari

-- Kombinasi generate_series untuk kalender
SELECT date_trunc('day', d) AS day
FROM generate_series('2026-01-01'::date, '2026-01-31'::date, '1 day') AS d;

-- VALUES sebagai inline tabel
SELECT * FROM (VALUES
  (1, 'Engineering', 'Jakarta'),
  (2, 'Finance',     'Bandung'),
  (3, 'HR',          'Surabaya')
) AS t(id, dept_name, location);`}
      </Code>
    </Block>

    <Block title="Tipe data khusus PostgreSQL" color="#a78bfa">
      <Code>
{`-- UUID
CREATE TABLE sessions (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id    BIGINT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL
);

-- Range types
CREATE TABLE reservations (
  id       SERIAL PRIMARY KEY,
  room_id  INT,
  period   TSTZRANGE NOT NULL,           -- range waktu
  EXCLUDE USING GIST (room_id WITH =, period WITH &&)
);
INSERT INTO reservations (room_id, period)
VALUES (101, '[2026-05-01 09:00, 2026-05-01 12:00)');

-- INET / CIDR untuk IP
CREATE TABLE access_log (
  id         SERIAL PRIMARY KEY,
  ip_address INET NOT NULL,
  network    CIDR
);
SELECT * FROM access_log WHERE ip_address << '192.168.1.0/24';  -- contained in subnet

-- INTERVAL
SELECT NOW() + INTERVAL '3 months 2 weeks';
SELECT AGE('2030-01-01', NOW()::DATE);

-- ENUM
CREATE TYPE order_status AS ENUM ('pending', 'processing', 'shipped', 'delivered', 'cancelled');
CREATE TABLE orders (
  id     SERIAL PRIMARY KEY,
  status order_status DEFAULT 'pending'
);

-- Tambah nilai ke ENUM
ALTER TYPE order_status ADD VALUE 'refunded' AFTER 'delivered';`}
      </Code>
    </Block>
  </div>
)

const Roles = () => (
  <div>
    <h3 style={{ color: '#f97316', fontWeight: 'bold', fontSize: '16px', marginBottom: '16px' }}>Users, Groups & Roles — Manajemen Akses PostgreSQL</h3>

    <div style={{ background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.25)', borderRadius: '8px', padding: '14px 16px', marginBottom: '14px' }}>
      <p style={{ color: '#f97316', fontWeight: 'bold', fontSize: '12px', marginBottom: '8px' }}>💡 Konsep Dasar</p>
      <p style={{ color: '#a0c8ff', fontSize: '12px', lineHeight: '1.8' }}>
        Di PostgreSQL, <strong>USER</strong> dan <strong>ROLE</strong> adalah hal yang sama — <code style={{ color: '#86efac', fontFamily: 'monospace' }}>CREATE USER</code> adalah alias
        dari <code style={{ color: '#86efac', fontFamily: 'monospace' }}>CREATE ROLE ... LOGIN</code>. Role bisa berperan sebagai <em>user</em> (punya LOGIN)
        maupun sebagai <em>group</em> (tidak punya LOGIN, hanya dipakai untuk kumpulkan privilege).
        Alur akses: <strong>pg_hba.conf</strong> menentukan <em>siapa boleh konek dari mana</em>,
        lalu <strong>GRANT</strong> menentukan <em>apa yang boleh dilakukan</em> setelah konek.
      </p>
    </div>

    <Block title="CREATE ROLE / USER — Buat user baru" color="#f97316">
      <Code>
{`-- CREATE USER (alias: CREATE ROLE ... LOGIN)
CREATE USER appuser WITH PASSWORD 'secret123';

-- CREATE ROLE tanpa login (group role)
CREATE ROLE readonly;
CREATE ROLE readwrite;
CREATE ROLE admin_group;

-- Role dengan semua opsi
CREATE ROLE analyst
  LOGIN                          -- boleh login
  PASSWORD 'P@ssw0rd!'
  NOSUPERUSER                    -- bukan superuser
  NOCREATEDB                     -- tidak bisa buat database
  NOCREATEROLE                   -- tidak bisa buat role lain
  NOINHERIT                      -- tidak inherit privilege dari parent role
  CONNECTION LIMIT 10            -- maksimal 10 koneksi serentak
  VALID UNTIL '2027-12-31';      -- akun expired

-- Superuser (HATI-HATI: bypass semua permission check)
CREATE ROLE dba_super LOGIN SUPERUSER PASSWORD 'super_secret';

-- Role untuk replication
CREATE ROLE replicator LOGIN REPLICATION PASSWORD 'repl_pass';

-- Lihat semua role
SELECT rolname, rolsuper, rolcreatedb, rolcanlogin, rolconnlimit, rolvaliduntil
FROM pg_roles
ORDER BY rolname;

-- Shortcut di psql
\du          -- list semua users/roles
\du appuser  -- detail satu role`}
      </Code>
    </Block>

    <Block title="ALTER ROLE — Modifikasi user/role" color="#fbbf24">
      <Code>
{`-- Ganti password
ALTER ROLE appuser PASSWORD 'NewP@ss456';
ALTER USER appuser WITH PASSWORD 'NewP@ss456';   -- sama saja

-- Reset password (hapus password)
ALTER ROLE appuser PASSWORD NULL;

-- Aktifkan / nonaktifkan login
ALTER ROLE appuser NOLOGIN;     -- suspend akun sementara
ALTER ROLE appuser LOGIN;       -- aktifkan kembali

-- Ubah atribut
ALTER ROLE analyst CONNECTION LIMIT 20;
ALTER ROLE analyst VALID UNTIL 'infinity';     -- tidak expired
ALTER ROLE analyst NOSUPERUSER NOCREATEDB;

-- Rename role
ALTER ROLE old_name RENAME TO new_name;

-- Set konfigurasi default untuk role (session-level)
ALTER ROLE appuser SET search_path TO myschema, public;
ALTER ROLE appuser SET statement_timeout TO '30s';
ALTER ROLE appuser SET timezone TO 'Asia/Jakarta';

-- Reset konfigurasi default
ALTER ROLE appuser RESET statement_timeout;
ALTER ROLE appuser RESET ALL;`}
      </Code>
    </Block>

    <Block title="GROUP ROLE — Kumpulkan privilege dalam grup" color="#4ade80">
      <Code>
{`-- Buat group roles (tidak punya LOGIN)
CREATE ROLE role_readonly;
CREATE ROLE role_readwrite;
CREATE ROLE role_admin;

-- GRANT privilege ke group role
GRANT CONNECT ON DATABASE appdb TO role_readonly;
GRANT USAGE ON SCHEMA public TO role_readonly;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO role_readonly;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT SELECT ON TABLES TO role_readonly;

GRANT CONNECT ON DATABASE appdb TO role_readwrite;
GRANT USAGE ON SCHEMA public TO role_readwrite;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO role_readwrite;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO role_readwrite;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO role_readwrite;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT USAGE ON SEQUENCES TO role_readwrite;

-- Assign user ke group role
GRANT role_readonly  TO analyst;
GRANT role_readwrite TO appuser;
GRANT role_readwrite TO developer;
GRANT role_admin     TO dba_user;

-- Assign multiple roles sekaligus
GRANT role_readonly, role_readwrite TO appuser;

-- Cabut membership dari group
REVOKE role_readonly FROM analyst;

-- Lihat membership
SELECT r.rolname AS role, m.rolname AS member
FROM pg_auth_members am
JOIN pg_roles r ON r.oid = am.roleid
JOIN pg_roles m ON m.oid = am.member
ORDER BY r.rolname, m.rolname;`}
      </Code>
    </Block>

    <Block title="GRANT — Berikan privilege ke object" color="#64c8ff">
      <Code>
{`-- ─── DATABASE ───────────────────────────────────────────
GRANT CONNECT ON DATABASE appdb TO appuser;
GRANT CREATE  ON DATABASE appdb TO developer;
REVOKE CONNECT ON DATABASE appdb FROM PUBLIC;  -- cabut akses default semua user

-- ─── SCHEMA ─────────────────────────────────────────────
GRANT USAGE  ON SCHEMA public TO appuser;      -- bisa lihat objek dalam schema
GRANT CREATE ON SCHEMA public TO developer;    -- bisa buat objek baru

-- ─── TABLE ──────────────────────────────────────────────
GRANT SELECT                     ON employees TO analyst;
GRANT SELECT, INSERT, UPDATE     ON employees TO appuser;
GRANT SELECT, INSERT, UPDATE, DELETE ON employees TO developer;
GRANT ALL PRIVILEGES              ON employees TO dba_user;

-- Hanya kolom tertentu
GRANT SELECT (id, name, department) ON employees TO hr_viewer;
GRANT UPDATE (salary)               ON employees TO hr_admin;

-- Semua tabel dalam schema
GRANT SELECT ON ALL TABLES IN SCHEMA public TO analyst;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO appuser;

-- ─── SEQUENCE ───────────────────────────────────────────
GRANT USAGE ON SEQUENCE employees_id_seq TO appuser;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO appuser;

-- ─── FUNCTION ───────────────────────────────────────────
GRANT EXECUTE ON FUNCTION get_full_name(TEXT, TEXT) TO appuser;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO appuser;

-- ─── DEFAULT PRIVILEGES (untuk objek yang dibuat di masa depan) ─
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT SELECT ON TABLES TO analyst;

ALTER DEFAULT PRIVILEGES FOR ROLE developer IN SCHEMA public
  GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO appuser;

-- ─── REVOKE ─────────────────────────────────────────────
REVOKE INSERT ON employees FROM appuser;
REVOKE ALL PRIVILEGES ON employees FROM public;
REVOKE ALL ON ALL TABLES IN SCHEMA public FROM old_user;`}
      </Code>
    </Block>

    <Block title="ROW LEVEL SECURITY (RLS) — Filter baris per user" color="#a78bfa">
      <Code>
{`-- Aktifkan RLS pada tabel
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders FORCE ROW LEVEL SECURITY;   -- berlaku juga untuk owner tabel

-- Policy: user hanya bisa lihat order miliknya sendiri
CREATE POLICY policy_orders_self
  ON orders
  FOR ALL                                       -- SELECT, INSERT, UPDATE, DELETE
  USING (user_id = (SELECT id FROM users WHERE username = current_user));

-- Policy terpisah per operasi
CREATE POLICY policy_orders_select
  ON orders FOR SELECT
  USING (user_id = (SELECT id FROM users WHERE username = current_user)
         OR current_user = 'admin');

CREATE POLICY policy_orders_insert
  ON orders FOR INSERT
  WITH CHECK (user_id = (SELECT id FROM users WHERE username = current_user));

-- Policy berdasarkan role
CREATE POLICY policy_hr_only
  ON salary_data
  FOR ALL
  USING (pg_has_role(current_user, 'role_hr', 'MEMBER'));

-- Nonaktifkan / drop policy
ALTER TABLE orders DISABLE ROW LEVEL SECURITY;
DROP POLICY policy_orders_self ON orders;

-- Lihat semua policy
SELECT tablename, policyname, cmd, roles, qual
FROM pg_policies
WHERE schemaname = 'public';`}
      </Code>
    </Block>

    <Block title="DROP ROLE & Investigasi permission" color="#f87171">
      <Code>
{`-- Drop role (harus revoke semua privilege dulu!)
REVOKE ALL ON ALL TABLES IN SCHEMA public FROM old_user;
REVOKE ALL ON ALL SEQUENCES IN SCHEMA public FROM old_user;
REVOKE ALL ON DATABASE appdb FROM old_user;
REVOKE role_readwrite FROM old_user;
DROP ROLE old_user;

-- DROP OWNED: hapus semua objek milik role, lalu revoke semua privilege
REASSIGN OWNED BY old_user TO postgres;  -- pindahkan ownership ke postgres
DROP OWNED BY old_user;                  -- hapus semua sisa privilege
DROP ROLE old_user;                      -- baru bisa drop

-- ─── Investigasi ───────────────────────────────────────
-- Cek privilege tabel
SELECT grantee, privilege_type, is_grantable
FROM information_schema.role_table_grants
WHERE table_name = 'employees'
ORDER BY grantee, privilege_type;

-- Cek privilege kolom
SELECT grantee, column_name, privilege_type
FROM information_schema.role_column_grants
WHERE table_name = 'employees';

-- Cek siapa owner suatu tabel
SELECT tableowner FROM pg_tables WHERE tablename = 'employees';

-- Cek effective privileges user saat ini
SELECT has_table_privilege('appuser', 'employees', 'SELECT');   -- true/false
SELECT has_schema_privilege('appuser', 'public', 'USAGE');
SELECT has_database_privilege('appuser', 'appdb', 'CONNECT');

-- Cek semua privilege user ini
\dp employees   -- psql: detail privilege tabel
\l              -- psql: list database + privilege`}
      </Code>
    </Block>

    <Block title="Kaitan dengan pg_hba.conf — Dua Lapis Keamanan" color="#38bdf8">
      <Code>
{`-- ══════════════════════════════════════════════════════════════
-- LAPISAN 1: pg_hba.conf — "Siapa boleh konek dari mana?"
-- ══════════════════════════════════════════════════════════════
-- File: $PGDATA/pg_hba.conf

# Hanya appuser boleh konek ke appdb dari subnet app server
host    appdb    appuser    10.0.1.0/24    scram-sha-256

# analyst hanya dari VPN
host    appdb    analyst    10.10.0.0/16   scram-sha-256

# dba_super hanya dari localhost
host    all      dba_super  127.0.0.1/32   scram-sha-256

# Tolak semua lainnya
host    all      all        0.0.0.0/0      reject

-- Reload setelah edit:
SELECT pg_reload_conf();

-- ══════════════════════════════════════════════════════════════
-- LAPISAN 2: GRANT/REVOKE — "Apa yang boleh dilakukan setelah konek?"
-- ══════════════════════════════════════════════════════════════

-- appuser: konek, baca-tulis semua tabel
GRANT CONNECT             ON DATABASE appdb TO appuser;
GRANT USAGE               ON SCHEMA public  TO appuser;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO appuser;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO appuser;

-- analyst: konek, hanya baca
GRANT CONNECT  ON DATABASE appdb TO analyst;
GRANT USAGE    ON SCHEMA public  TO analyst;
GRANT SELECT   ON ALL TABLES IN SCHEMA public TO analyst;

-- dba_super: semua akses
GRANT ALL ON DATABASE appdb TO dba_super;
-- (sudah SUPERUSER jadi bypass check, tapi tetap beri explicit untuk audit)

-- ══════════════════════════════════════════════════════════════
-- Alur lengkap: appuser konek ke appdb
-- ══════════════════════════════════════════════════════════════
-- 1. Client: psql -h 10.0.1.5 -U appuser -d appdb
-- 2. pg_hba.conf cek: host=10.0.1.5, user=appuser, db=appdb → MATCH → scram-sha-256
-- 3. PostgreSQL minta password → appuser masukkan password → cocok → KONEK ✅
-- 4. appuser jalankan: SELECT * FROM orders;
-- 5. PostgreSQL cek: apakah appuser punya SELECT pada tabel orders? → GRANT ada → OK ✅
-- 6. Jika GRANT tidak ada → ERROR: permission denied for table orders`}
      </Code>
      <Note>pg_hba.conf = penjaga pintu masuk (authentication). GRANT = penjaga di dalam (authorization). Keduanya HARUS dikonfigurasi dengan benar — lolos pg_hba.conf tidak otomatis bisa akses semua tabel.</Note>
    </Block>

    <Block title="Contoh setup lengkap: Aplikasi production" color="#4ade80">
      <Code>
{`-- ── STEP 1: Buat database & schema ──────────────────────────
CREATE DATABASE appdb;
\c appdb
CREATE SCHEMA app;

-- ── STEP 2: Buat group roles ─────────────────────────────────
CREATE ROLE role_app_read;
CREATE ROLE role_app_write;
CREATE ROLE role_app_admin;

-- ── STEP 3: Beri privilege ke group roles ────────────────────
-- Read-only group
GRANT CONNECT ON DATABASE appdb TO role_app_read;
GRANT USAGE   ON SCHEMA app     TO role_app_read;
GRANT SELECT  ON ALL TABLES IN SCHEMA app TO role_app_read;
ALTER DEFAULT PRIVILEGES IN SCHEMA app GRANT SELECT ON TABLES TO role_app_read;

-- Read-write group
GRANT CONNECT ON DATABASE appdb TO role_app_write;
GRANT USAGE   ON SCHEMA app     TO role_app_write;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA app TO role_app_write;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA app TO role_app_write;
ALTER DEFAULT PRIVILEGES IN SCHEMA app
  GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO role_app_write;
ALTER DEFAULT PRIVILEGES IN SCHEMA app
  GRANT USAGE ON SEQUENCES TO role_app_write;

-- ── STEP 4: Buat individual users ────────────────────────────
CREATE USER app_backend WITH PASSWORD 'Str0ng#Pass!' CONNECTION LIMIT 50;
CREATE USER app_worker  WITH PASSWORD 'W0rker#Pass!' CONNECTION LIMIT 20;
CREATE USER app_analyst WITH PASSWORD 'An4lyst#Pass!' CONNECTION LIMIT 10;
CREATE USER app_dba     WITH PASSWORD 'Db4#Admin!'   CONNECTION LIMIT 5;

-- ── STEP 5: Assign ke group roles ────────────────────────────
GRANT role_app_write TO app_backend;
GRANT role_app_write TO app_worker;
GRANT role_app_read  TO app_analyst;
GRANT role_app_admin TO app_dba;

-- ── STEP 6: pg_hba.conf ──────────────────────────────────────
-- # App server subnet
-- host  appdb  app_backend  10.0.1.0/24  scram-sha-256
-- host  appdb  app_worker   10.0.2.0/24  scram-sha-256
-- # Analytics team VPN
-- host  appdb  app_analyst  10.10.0.0/16  scram-sha-256
-- # DBA hanya localhost
-- host  appdb  app_dba      127.0.0.1/32  scram-sha-256
-- # Default deny
-- host  all    all          0.0.0.0/0     reject

SELECT pg_reload_conf();`}
      </Code>
    </Block>
  </div>
)

const contentMap = {
  ddl: <DDL />,
  dml: <DML />,
  select: <SelectTab />,
  joins: <Joins />,
  aggregate: <Aggregate />,
  subquery: <Subquery />,
  indexes: <Indexes />,
  constraints: <Constraints />,
  transactions: <Transactions />,
  functions: <Functions />,
  json: <Json />,
  advanced: <Advanced />,
  roles: <Roles />,
}

const SqlSyntaxModule = () => {
  const [activeTab, setActiveTab] = useState('ddl')

  return (
    <div style={{ background: 'linear-gradient(135deg, #0f1419 0%, #1a2332 100%)', minHeight: '100vh' }}>
      <style>{`
        @keyframes float-up {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
      `}</style>

      <header style={{ borderBottom: '1px solid rgba(100, 200, 255, 0.2)', background: 'rgba(15, 20, 25, 0.8)' }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '40px 24px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px', color: '#e0f2ff' }}>
            SQL Syntax PostgreSQL 📘
          </h1>
          <p style={{ color: '#a0c8ff', fontSize: '16px' }}>
            Referensi lengkap DDL, DML, SELECT, JOIN, Aggregate, CTE, Index, Constraints, Transactions, Functions, JSON, dan Advanced SQL
          </p>
        </div>
      </header>

      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '40px 24px' }}>
        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: '6px', marginBottom: '32px', borderBottom: '1px solid rgba(100, 200, 255, 0.2)', paddingBottom: '16px', overflowX: 'auto' }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '10px 14px',
                fontWeight: '500',
                whiteSpace: 'nowrap',
                fontSize: '12px',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                color: activeTab === tab.id ? '#64c8ff' : '#708090',
                borderBottom: activeTab === tab.id ? '3px solid #64c8ff' : 'none',
                transition: 'all 0.25s',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ animation: 'float-up 0.5s ease-out' }}>
          {contentMap[activeTab]}
        </div>
      </div>

      <footer style={{ background: 'rgba(15, 20, 25, 0.5)', borderTop: '1px solid rgba(100, 200, 255, 0.2)', marginTop: '60px', padding: '40px 0', textAlign: 'center' }}>
        <p style={{ color: '#708090', fontSize: '14px', marginBottom: '8px' }}>
          📘 SQL Syntax Reference — DDL · DML · SELECT · JOIN · Aggregate · CTE · Index · Constraints · Transactions · Functions · JSON · Advanced
        </p>
        <p style={{ color: '#708090', fontSize: '14px' }}>
          💡 Tip: Gunakan EXPLAIN ANALYZE untuk memahami query plan sebelum optimasi! 🚀
        </p>
      </footer>
    </div>
  )
}

export default SqlSyntaxModule
