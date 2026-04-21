import React, { useState } from 'react'
import { Copy, Check, Database, Key, Link, Shield, Layers, GitBranch, Zap, BookOpen } from 'lucide-react'

const TABS = [
  { id: 'overview',       label: '📖 Overview',          icon: <BookOpen size={14} /> },
  { id: 'normalization',  label: '📐 Normalization',      icon: <Layers size={14} /> },
  { id: 'keys',           label: '🔑 Keys & Constraints', icon: <Key size={14} /> },
  { id: 'relationships',  label: '🔗 Relationships',      icon: <Link size={14} /> },
  { id: 'indexes',        label: '⚡ Indexes',             icon: <Zap size={14} /> },
  { id: 'patterns',       label: '🏗️ Design Patterns',    icon: <GitBranch size={14} /> },
  { id: 'antipatterns',   label: '⚠️ Anti-Patterns',      icon: <Shield size={14} /> },
  { id: 'checklist',      label: '✅ Checklist',           icon: <Database size={14} /> },
]

function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <div style={{ position: 'relative', background: 'rgba(0,0,0,0.35)', borderRadius: '8px', padding: '16px', marginBottom: '14px', overflow: 'auto' }}>
      <button
        onClick={handleCopy}
        style={{
          position: 'absolute', top: '8px', right: '8px',
          background: copied ? '#4ade80' : 'rgba(100,200,255,0.2)',
          border: 'none', color: copied ? '#0f1419' : '#64c8ff',
          padding: '4px 10px', borderRadius: '4px', cursor: 'pointer',
          fontSize: '11px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px',
        }}
      >
        {copied ? <><Check size={12} /> Copied</> : <><Copy size={12} /> Copy</>}
      </button>
      <pre style={{ margin: 0, color: '#a0c8ff', fontFamily: 'monospace', fontSize: '12px', whiteSpace: 'pre-wrap', paddingRight: '80px' }}>
        {code}
      </pre>
    </div>
  )
}

function Section({ title, color = 'blue', children }) {
  const palette = {
    blue:   { bg: 'rgba(100,200,255,0.08)', border: 'rgba(100,200,255,0.3)', accent: '#64c8ff', left: '#64c8ff' },
    green:  { bg: 'rgba(74,222,128,0.08)',  border: 'rgba(74,222,128,0.3)',  accent: '#4ade80', left: '#4ade80' },
    yellow: { bg: 'rgba(251,191,36,0.08)',  border: 'rgba(251,191,36,0.3)',  accent: '#fbbf24', left: '#fbbf24' },
    red:    { bg: 'rgba(248,113,113,0.08)', border: 'rgba(248,113,113,0.3)', accent: '#f87171', left: '#f87171' },
    purple: { bg: 'rgba(167,139,250,0.08)', border: 'rgba(167,139,250,0.3)', accent: '#a78bfa', left: '#a78bfa' },
  }
  const c = palette[color]
  return (
    <div style={{ background: c.bg, border: `1px solid ${c.border}`, borderLeft: `3px solid ${c.left}`, borderRadius: '10px', padding: '16px', marginBottom: '14px' }}>
      {title && <h4 style={{ color: c.accent, fontWeight: 'bold', marginBottom: '10px', fontSize: '14px' }}>{title}</h4>}
      {children}
    </div>
  )
}

function Badge({ text, color = '#64c8ff' }) {
  return (
    <span style={{ background: `${color}22`, color, border: `1px solid ${color}55`, padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold', display: 'inline-block', margin: '3px' }}>
      {text}
    </span>
  )
}

function InfoRow({ label, value, good }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid rgba(100,200,255,0.1)' }}>
      <span style={{ color: '#a0c8ff', fontSize: '12px' }}>{label}</span>
      <span style={{ color: good === undefined ? '#64c8ff' : good ? '#4ade80' : '#f87171', fontSize: '12px', fontWeight: 'bold' }}>{value}</span>
    </div>
  )
}

function NormalizationCard({ form, full, rule, example, valid, invalid }) {
  return (
    <div style={{ background: 'rgba(100,200,255,0.06)', border: '1px solid rgba(100,200,255,0.2)', borderRadius: '10px', padding: '16px', marginBottom: '14px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
        <span style={{ background: 'rgba(100,200,255,0.2)', color: '#64c8ff', padding: '4px 12px', borderRadius: '20px', fontWeight: 'bold', fontSize: '13px' }}>{form}</span>
        <span style={{ color: '#e0f2ff', fontWeight: 'bold', fontSize: '13px' }}>{full}</span>
      </div>
      <p style={{ color: '#fbbf24', fontSize: '12px', marginBottom: '8px' }}>📋 Rule: <span style={{ color: '#a0c8ff' }}>{rule}</span></p>
      <p style={{ color: '#4ade80', fontSize: '12px', marginBottom: '8px' }}>📌 Example: <span style={{ color: '#a0c8ff' }}>{example}</span></p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '10px' }}>
        <div style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.3)', borderRadius: '6px', padding: '8px' }}>
          <p style={{ color: '#4ade80', fontSize: '11px', fontWeight: 'bold', marginBottom: '4px' }}>✅ Valid</p>
          <p style={{ color: '#a0c8ff', fontSize: '11px' }}>{valid}</p>
        </div>
        <div style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)', borderRadius: '6px', padding: '8px' }}>
          <p style={{ color: '#f87171', fontSize: '11px', fontWeight: 'bold', marginBottom: '4px' }}>❌ Violation</p>
          <p style={{ color: '#a0c8ff', fontSize: '11px' }}>{invalid}</p>
        </div>
      </div>
    </div>
  )
}

// ─── TAB CONTENT ─────────────────────────────────────────────────────────────

function TabOverview() {
  const principles = [
    { icon: '🎯', title: 'Single Source of Truth', desc: 'Setiap data hanya disimpan di satu tempat. Perubahan cukup di satu titik, menghindari inkonsistensi.' },
    { icon: '📐', title: 'Normalization', desc: 'Organisasi tabel untuk menghilangkan redundansi dan dependency anomalies (1NF → 2NF → 3NF → BCNF).' },
    { icon: '🔑', title: 'Referential Integrity', desc: 'Foreign key harus selalu merujuk ke baris yang valid. Jaga konsistensi relasi antar tabel.' },
    { icon: '⚡', title: 'Performance by Design', desc: 'Index, partitioning, dan denormalisasi yang strategis — bukan afterthought setelah data besar.' },
    { icon: '📏', title: 'Appropriate Data Types', desc: 'Gunakan tipe paling tepat dan kecil. INT vs BIGINT, VARCHAR(n) vs TEXT, TIMESTAMP vs DATE.' },
    { icon: '🛡️', title: 'Constraints as Documentation', desc: 'NOT NULL, UNIQUE, CHECK constraints adalah kontrak yang dapat dienforce oleh database secara otomatis.' },
    { icon: '🏷️', title: 'Naming Conventions', desc: 'Konsisten: snake_case untuk kolom, singular noun untuk tabel (user bukan users), prefix untuk FK.' },
    { icon: '🔄', title: 'Plan for Change', desc: 'Schema migration adalah inevitable. Desain agar ALTER TABLE mudah: hindari wide tables, gunakan versioning.' },
  ]

  return (
    <div style={{ animation: 'float-up 0.5s ease-out' }}>
      <Section title="🏛️ Apa itu Database Design?" color="blue">
        <p style={{ color: '#a0c8ff', fontSize: '13px', lineHeight: 1.7 }}>
          Database Design adalah proses mendefinisikan struktur, relasi, constraints, dan aturan penyimpanan data
          sehingga database dapat menangani kebutuhan aplikasi secara <strong style={{ color: '#64c8ff' }}>efisien</strong>,{' '}
          <strong style={{ color: '#4ade80' }}>konsisten</strong>, dan{' '}
          <strong style={{ color: '#fbbf24' }}>mudah di-maintain</strong>.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px' }}>
          {['Logical Design', 'Physical Design', 'ER Modeling', 'Schema Migration', 'Query Optimization'].map(t => (
            <Badge key={t} text={t} />
          ))}
        </div>
      </Section>

      <h3 style={{ color: '#e0f2ff', fontWeight: 'bold', fontSize: '16px', marginBottom: '14px' }}>
        8 Core Principles
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
        {principles.map((p, i) => (
          <div key={i} style={{ background: 'rgba(26,35,50,0.8)', border: '1px solid rgba(100,200,255,0.15)', borderRadius: '10px', padding: '14px' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>{p.icon}</div>
            <h4 style={{ color: '#64c8ff', fontWeight: 'bold', fontSize: '13px', marginBottom: '6px' }}>{p.title}</h4>
            <p style={{ color: '#a0c8ff', fontSize: '12px', lineHeight: 1.6 }}>{p.desc}</p>
          </div>
        ))}
      </div>

      <Section title="🗂️ Tahapan Database Design" color="purple">
        {[
          { step: '1', phase: 'Requirements Analysis', desc: 'Kumpulkan entitas, atribut, dan aturan bisnis dari stakeholder.' },
          { step: '2', phase: 'Conceptual Design (ER Diagram)', desc: 'Gambar entitas dan relasi tanpa memikirkan implementasi fisik.' },
          { step: '3', phase: 'Logical Design (Normalization)', desc: 'Konversi ER diagram ke tabel terstruktur, terapkan normalisasi.' },
          { step: '4', phase: 'Physical Design', desc: 'Pilih tipe data, definisikan index, partitioning, tablespace.' },
          { step: '5', phase: 'Implementation & Migration', desc: 'Tulis DDL, setup CI migration pipeline, version control schema.' },
        ].map(s => (
          <div key={s.step} style={{ display: 'flex', gap: '12px', marginBottom: '10px', alignItems: 'flex-start' }}>
            <span style={{ background: 'rgba(167,139,250,0.3)', color: '#a78bfa', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '12px', flexShrink: 0 }}>{s.step}</span>
            <div>
              <p style={{ color: '#a78bfa', fontWeight: 'bold', fontSize: '13px' }}>{s.phase}</p>
              <p style={{ color: '#a0c8ff', fontSize: '12px' }}>{s.desc}</p>
            </div>
          </div>
        ))}
      </Section>
    </div>
  )
}

function TabNormalization() {
  const forms = [
    {
      form: '1NF', full: 'First Normal Form',
      rule: 'Setiap kolom harus atomic (satu nilai), tidak ada repeating groups, ada primary key.',
      example: 'Tabel orders tidak boleh kolom "products" yang isinya "Apple, Banana, Cherry".',
      valid: 'Setiap produk sebaris sendiri dengan order_id + product_id sebagai PK.',
      invalid: 'Kolom phone = "08123,08456" (multi-value).',
    },
    {
      form: '2NF', full: 'Second Normal Form',
      rule: 'Sudah 1NF + setiap non-key attribute fully dependent pada seluruh primary key (no partial dependency).',
      example: 'Tabel order_items(order_id, product_id, product_name) — product_name hanya depend pada product_id.',
      valid: 'Pisah ke products(product_id, product_name) dan order_items(order_id, product_id, qty).',
      invalid: 'product_name ada di order_items (partial dependency ke product_id).',
    },
    {
      form: '3NF', full: 'Third Normal Form',
      rule: 'Sudah 2NF + tidak ada transitive dependency (non-key tidak boleh depend ke non-key lain).',
      example: 'employees(emp_id, dept_id, dept_name) — dept_name depend pada dept_id bukan emp_id.',
      valid: 'Pisah ke departments(dept_id, dept_name) dan employees(emp_id, dept_id).',
      invalid: 'dept_name disimpan di employees (transitive dependency).',
    },
    {
      form: 'BCNF', full: 'Boyce-Codd Normal Form',
      rule: 'Versi lebih kuat dari 3NF. Setiap determinant harus berupa candidate key.',
      example: 'course_enrollment(student, course, teacher) — teacher → course tapi teacher bukan candidate key.',
      valid: 'Pisah relasi menjadi dua tabel dengan candidate key yang tepat.',
      invalid: 'Non-candidate key menentukan nilai kolom lain.',
    },
  ]

  return (
    <div style={{ animation: 'float-up 0.5s ease-out' }}>
      <Section title="📐 Mengapa Normalization Penting?" color="blue">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
          {[
            { icon: '🗑️', title: 'Eliminasi Redundansi', desc: 'Data tidak disimpan duplikat di banyak tempat.' },
            { icon: '🔒', title: 'Cegah Anomali', desc: 'Insert, update, delete anomaly tidak terjadi.' },
            { icon: '🔄', title: 'Mudah Di-maintain', desc: 'Perubahan data cukup di satu tempat.' },
            { icon: '💾', title: 'Hemat Storage', desc: 'Tidak ada data yang tersimpan berulang.' },
          ].map((item, i) => (
            <div key={i} style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '8px', padding: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '22px', marginBottom: '6px' }}>{item.icon}</div>
              <p style={{ color: '#64c8ff', fontWeight: 'bold', fontSize: '12px', marginBottom: '4px' }}>{item.title}</p>
              <p style={{ color: '#a0c8ff', fontSize: '11px' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <h3 style={{ color: '#e0f2ff', fontWeight: 'bold', fontSize: '16px', marginBottom: '14px' }}>Normal Forms</h3>
      {forms.map(f => <NormalizationCard key={f.form} {...f} />)}

      <Section title="💡 Kapan Denormalize?" color="yellow">
        <p style={{ color: '#a0c8ff', fontSize: '12px', marginBottom: '10px' }}>
          Normalisasi tidak selalu optimal untuk <strong style={{ color: '#fbbf24' }}>read-heavy workloads</strong>.
          Denormalisasi boleh dilakukan dengan pertimbangan:
        </p>
        {[
          'Query JOIN kompleks yang memperlambat reporting (&gt; 3 tabel)',
          'Kolom agregat yang sering dibutuhkan (total_orders, avg_score) — simpan sebagai materialized column',
          'OLAP / Data Warehouse — star/snowflake schema sengaja denormalized',
          'Selalu document alasan denormalisasi sebagai comment di migration file',
        ].map((t, i) => (
          <p key={i} style={{ color: '#a0c8ff', fontSize: '12px', marginBottom: '6px' }}>→ {t}</p>
        ))}
      </Section>

      <CodeBlock code={`-- Contoh: Refactor ke 3NF
-- BEFORE (violates 3NF):
CREATE TABLE orders (
  order_id     INT PRIMARY KEY,
  customer_id  INT,
  customer_name VARCHAR(100),   -- transitive dependency!
  customer_city VARCHAR(100),   -- transitive dependency!
  total        DECIMAL(10,2)
);

-- AFTER (3NF compliant):
CREATE TABLE customers (
  customer_id  INT PRIMARY KEY,
  name         VARCHAR(100) NOT NULL,
  city         VARCHAR(100)
);

CREATE TABLE orders (
  order_id    INT PRIMARY KEY,
  customer_id INT NOT NULL REFERENCES customers(customer_id),
  total       DECIMAL(10,2) NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);`} />
    </div>
  )
}

function TabKeys() {
  return (
    <div style={{ animation: 'float-up 0.5s ease-out' }}>
      <Section title="🔑 Jenis-Jenis Keys" color="blue">
        {[
          { name: 'Primary Key (PK)', color: '#64c8ff', desc: 'Identifier unik setiap baris. NOT NULL + UNIQUE. Setiap tabel harus punya satu.', tip: 'Gunakan surrogate key (SERIAL/UUID) untuk stabilitas, bukan natural key yang bisa berubah.' },
          { name: 'Foreign Key (FK)', color: '#4ade80', desc: 'Kolom yang merujuk PK tabel lain. Menjaga referential integrity secara otomatis.', tip: 'Selalu index FK column untuk performa JOIN dan cascade operations.' },
          { name: 'Unique Key', color: '#a78bfa', desc: 'Constraint UNIQUE — nilai tidak boleh duplikat, tapi boleh NULL (berbeda dengan PK).', tip: 'Gunakan untuk business keys: email, username, nomor_ktp.' },
          { name: 'Composite Key', color: '#fbbf24', desc: 'PK dari gabungan beberapa kolom. Cocok untuk junction tables di many-to-many.', tip: 'order_items(order_id, product_id) — kombinasinya unique meskipun masing-masing tidak.' },
          { name: 'Candidate Key', color: '#f97316', desc: 'Kolom atau kombinasi kolom yang bisa menjadi PK. Dari semua kandidat, pilih satu sebagai PK.', tip: 'email dan phone bisa sama-sama candidate key untuk tabel users.' },
        ].map((k, i) => (
          <div key={i} style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '8px', padding: '12px', marginBottom: '10px', borderLeft: `3px solid ${k.color}` }}>
            <p style={{ color: k.color, fontWeight: 'bold', fontSize: '13px', marginBottom: '4px' }}>{k.name}</p>
            <p style={{ color: '#a0c8ff', fontSize: '12px', marginBottom: '6px' }}>{k.desc}</p>
            <p style={{ color: '#708090', fontSize: '11px' }}>💡 {k.tip}</p>
          </div>
        ))}
      </Section>

      <h3 style={{ color: '#e0f2ff', fontWeight: 'bold', fontSize: '16px', margin: '16px 0 10px' }}>Constraints Penting</h3>
      <CodeBlock code={`CREATE TABLE products (
  -- Primary Key: surrogate (lebih stabil dari natural key)
  product_id   SERIAL PRIMARY KEY,

  -- Unique constraint: business key
  sku          VARCHAR(50) UNIQUE NOT NULL,

  -- NOT NULL: kolom wajib isi
  name         VARCHAR(200) NOT NULL,

  -- CHECK constraint: validasi nilai
  price        DECIMAL(10,2) NOT NULL CHECK (price >= 0),
  stock        INT NOT NULL DEFAULT 0 CHECK (stock >= 0),

  -- ENUM-like via CHECK
  status       VARCHAR(20) NOT NULL DEFAULT 'active'
               CHECK (status IN ('active','inactive','archived')),

  -- Foreign Key dengan ON DELETE behavior
  category_id  INT NOT NULL
               REFERENCES categories(category_id)
               ON DELETE RESTRICT
               ON UPDATE CASCADE,

  -- Timestamps
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);`} />

      <Section title="🆚 SERIAL vs UUID vs IDENTITY" color="purple">
        <InfoRow label="SERIAL / BIGSERIAL" value="Auto-increment integer. Simpel, index kecil, tidak portable." />
        <InfoRow label="GENERATED ALWAYS AS IDENTITY" value="SQL standard. Lebih baik dari SERIAL di PostgreSQL 10+." />
        <InfoRow label="UUID v4" value="Globally unique. Bagus untuk distributed systems, tapi index lebih besar." />
        <InfoRow label="UUID v7 (UUIDv7)" value="Time-ordered UUID. Performa index mirip BIGINT, globally unique." />
        <p style={{ color: '#a78bfa', fontSize: '12px', marginTop: '10px' }}>
          ✅ <strong>Rekomendasi:</strong> Gunakan <code style={{ color: '#64c8ff' }}>BIGINT GENERATED ALWAYS AS IDENTITY</code> untuk internal apps, <code style={{ color: '#64c8ff' }}>UUID v7</code> untuk distributed/microservices.
        </p>
      </Section>

      <Section title="🔗 FK ON DELETE Behavior" color="yellow">
        {[
          { opt: 'RESTRICT', desc: 'Error jika ada FK yang merujuk. Default behavior.', use: 'Data penting — jangan hapus parent jika ada child.' },
          { opt: 'CASCADE', desc: 'Hapus child otomatis saat parent dihapus.', use: 'Dependent data: order_items ikut terhapus bila order dihapus.' },
          { opt: 'SET NULL', desc: 'Set FK column ke NULL saat parent dihapus.', use: 'Optional reference: post.author_id = NULL jika user dihapus.' },
          { opt: 'SET DEFAULT', desc: 'Set FK ke nilai default saat parent dihapus.', use: 'Fallback ke anonymous user / default category.' },
          { opt: 'NO ACTION', desc: 'Seperti RESTRICT tapi check ditunda (deferred).', use: 'Butuh fleksibilitas di dalam transaction.' },
        ].map((r, i) => (
          <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: '8px' }}>
            <code style={{ color: '#fbbf24', fontSize: '11px', minWidth: '100px', fontWeight: 'bold' }}>{r.opt}</code>
            <div>
              <p style={{ color: '#a0c8ff', fontSize: '12px' }}>{r.desc}</p>
              <p style={{ color: '#708090', fontSize: '11px' }}>Use: {r.use}</p>
            </div>
          </div>
        ))}
      </Section>
    </div>
  )
}

function TabRelationships() {
  return (
    <div style={{ animation: 'float-up 0.5s ease-out' }}>
      <Section title="🔗 Tipe Relasi" color="blue">
        {[
          {
            type: 'One-to-One (1:1)', color: '#64c8ff',
            desc: 'Satu baris di tabel A berhubungan dengan tepat satu baris di tabel B.',
            example: 'users → user_profiles. Biasanya untuk memisah data yang jarang diakses (vertical partitioning).',
            sql: `-- users memiliki satu profile
CREATE TABLE user_profiles (
  user_id    INT PRIMARY KEY REFERENCES users(user_id),
  bio        TEXT,
  avatar_url VARCHAR(500)
);`,
          },
          {
            type: 'One-to-Many (1:N)', color: '#4ade80',
            desc: 'Satu baris di tabel A berhubungan dengan banyak baris di tabel B. Paling umum.',
            example: 'customers → orders. Satu customer punya banyak order.',
            sql: `-- FK di sisi "many"
CREATE TABLE orders (
  order_id    BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  customer_id INT NOT NULL REFERENCES customers(customer_id),
  total       DECIMAL(12,2) NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_orders_customer ON orders(customer_id);`,
          },
          {
            type: 'Many-to-Many (M:N)', color: '#a78bfa',
            desc: 'Banyak baris di A berhubungan dengan banyak baris di B. Butuh junction/bridge table.',
            example: 'students ↔ courses. Satu student ikut banyak course, satu course diikuti banyak student.',
            sql: `-- Junction table dengan composite PK
CREATE TABLE enrollments (
  student_id  INT NOT NULL REFERENCES students(student_id),
  course_id   INT NOT NULL REFERENCES courses(course_id),
  enrolled_at TIMESTAMPTZ DEFAULT NOW(),
  grade       CHAR(2),
  PRIMARY KEY (student_id, course_id)
);`,
          },
          {
            type: 'Self-Referencing', color: '#f97316',
            desc: 'FK merujuk ke PK di tabel yang sama. Untuk hierarki/tree structure.',
            example: 'employees.manager_id → employees.employee_id. Atau categories dengan parent_id.',
            sql: `-- Hierarki karyawan
CREATE TABLE employees (
  employee_id  INT PRIMARY KEY,
  name         VARCHAR(100) NOT NULL,
  manager_id   INT REFERENCES employees(employee_id) -- nullable = top-level
);

-- Query dengan recursive CTE
WITH RECURSIVE org_chart AS (
  SELECT employee_id, name, manager_id, 0 AS depth
  FROM employees WHERE manager_id IS NULL
  UNION ALL
  SELECT e.employee_id, e.name, e.manager_id, oc.depth + 1
  FROM employees e
  JOIN org_chart oc ON e.manager_id = oc.employee_id
)
SELECT * FROM org_chart ORDER BY depth, name;`,
          },
        ].map((r, i) => (
          <div key={i} style={{ marginBottom: '20px' }}>
            <h4 style={{ color: r.color, fontWeight: 'bold', fontSize: '14px', marginBottom: '6px' }}>{r.type}</h4>
            <p style={{ color: '#a0c8ff', fontSize: '12px', marginBottom: '6px' }}>{r.desc}</p>
            <p style={{ color: '#708090', fontSize: '11px', marginBottom: '8px' }}>📌 {r.example}</p>
            <CodeBlock code={r.sql} />
          </div>
        ))}
      </Section>

      <Section title="🌟 Junction Table Best Practices" color="green">
        {[
          'Tambahkan metadata di junction table: created_at, created_by, status',
          'Composite PK (fk1, fk2) sudah cukup sebagai index untuk kedua arah query',
          'Jika perlu query satu arah dominan, tambahkan index terpisah untuk arah sebaliknya',
          'Pertimbangkan surrogate PK di junction jika junction itu sendiri menjadi FK dari tabel lain',
        ].map((t, i) => (
          <p key={i} style={{ color: '#a0c8ff', fontSize: '12px', marginBottom: '6px' }}>✅ {t}</p>
        ))}
      </Section>
    </div>
  )
}

function TabIndexes() {
  return (
    <div style={{ animation: 'float-up 0.5s ease-out' }}>
      <Section title="⚡ Mengapa Index?" color="blue">
        <p style={{ color: '#a0c8ff', fontSize: '12px', lineHeight: 1.7 }}>
          Index adalah struktur data terpisah (B-Tree, Hash, GIN, GiST, BRIN) yang mempercepat pencarian dengan mengorbankan
          write performance dan storage. PostgreSQL menggunakan <strong style={{ color: '#64c8ff' }}>B-Tree</strong> sebagai default.
        </p>
      </Section>

      <Section title="📋 Kapan Buat Index?" color="green">
        {[
          { cond: 'Kolom di WHERE clause yang sering difilter', ex: 'WHERE status = \'active\'' },
          { cond: 'Kolom FK — selalu index untuk performa JOIN', ex: 'orders.customer_id' },
          { cond: 'Kolom di ORDER BY / GROUP BY yang sering dipakai', ex: 'ORDER BY created_at DESC' },
          { cond: 'Kolom di JOIN condition', ex: 'ON a.id = b.a_id' },
          { cond: 'Kolom dengan cardinality tinggi (banyak nilai unik)', ex: 'email, uuid, timestamp' },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: '8px' }}>
            <span style={{ color: '#4ade80', fontSize: '14px', flexShrink: 0 }}>✓</span>
            <div>
              <p style={{ color: '#a0c8ff', fontSize: '12px' }}>{item.cond}</p>
              <code style={{ color: '#64c8ff', fontSize: '11px' }}>{item.ex}</code>
            </div>
          </div>
        ))}
      </Section>

      <Section title="⚠️ Kapan TIDAK Buat Index?" color="red">
        {[
          'Kolom dengan cardinality rendah (boolean, gender, status dgn 2-3 nilai) — full scan lebih cepat',
          'Tabel sangat kecil (&lt; 1000 baris) — sequential scan sudah optimal',
          'Kolom yang jarang diquery (tulis sekali, baca tahunan)',
          'Terlalu banyak index di tabel write-heavy — setiap INSERT/UPDATE harus update semua index',
        ].map((t, i) => (
          <p key={i} style={{ color: '#a0c8ff', fontSize: '12px', marginBottom: '6px' }}>❌ {t}</p>
        ))}
      </Section>

      <h3 style={{ color: '#e0f2ff', fontWeight: 'bold', fontSize: '16px', margin: '16px 0 10px' }}>Tipe Index PostgreSQL</h3>
      <CodeBlock code={`-- 1. B-Tree (default) — untuk =, <, >, BETWEEN, LIKE 'prefix%'
CREATE INDEX idx_users_email ON users(email);

-- 2. Partial Index — hanya index subset baris (lebih kecil, lebih cepat)
CREATE INDEX idx_orders_pending ON orders(created_at)
  WHERE status = 'pending';

-- 3. Composite Index — urutan kolom PENTING (leftmost prefix rule)
CREATE INDEX idx_orders_customer_date ON orders(customer_id, created_at DESC);

-- 4. Unique Index
CREATE UNIQUE INDEX idx_users_username ON users(username);

-- 5. Expression / Functional Index
CREATE INDEX idx_users_email_lower ON users(LOWER(email));

-- 6. GIN — untuk arrays, JSONB, full-text search
CREATE INDEX idx_products_tags ON products USING GIN(tags);
CREATE INDEX idx_docs_content ON documents USING GIN(to_tsvector('english', content));

-- 7. BRIN — untuk kolom yang naturally sorted (timestamps di append-only table)
CREATE INDEX idx_logs_created ON logs USING BRIN(created_at);

-- 8. Concurrent Index (tidak block writes)
CREATE INDEX CONCURRENTLY idx_orders_status ON orders(status);`} />

      <Section title="🔍 Analisis Index dengan EXPLAIN" color="purple">
        <CodeBlock code={`-- Cek apakah index digunakan
EXPLAIN ANALYZE SELECT * FROM orders WHERE customer_id = 42;

-- Output key:
-- "Index Scan" = index dipakai ✅
-- "Seq Scan"   = full table scan, pertimbangkan index
-- Rows/Actual Rows: estimasi vs aktual
-- Actual Time: waktu eksekusi nyata (ms)

-- Cek index yang tidak pernah dipakai
SELECT schemaname, tablename, indexname, idx_scan
FROM pg_stat_user_indexes
WHERE idx_scan = 0
ORDER BY schemaname, tablename;`} />
        <p style={{ color: '#a78bfa', fontSize: '12px' }}>
          ✅ Selalu gunakan <code style={{ color: '#64c8ff' }}>EXPLAIN (ANALYZE, BUFFERS)</code> untuk debug query performance — bukan hanya <code style={{ color: '#64c8ff' }}>EXPLAIN</code>.
        </p>
      </Section>
    </div>
  )
}

function TabPatterns() {
  const patterns = [
    {
      name: 'Soft Delete', icon: '🗑️', color: '#4ade80',
      desc: 'Tandai baris sebagai "deleted" dengan kolom boolean/timestamp daripada DELETE fisik.',
      when: 'Butuh audit trail, undo capability, atau referential integrity ke data historis.',
      sql: `ALTER TABLE users ADD COLUMN deleted_at TIMESTAMPTZ;

-- Soft delete
UPDATE users SET deleted_at = NOW() WHERE user_id = 42;

-- Query aktif saja
CREATE VIEW active_users AS
  SELECT * FROM users WHERE deleted_at IS NULL;

-- Index partial untuk performa
CREATE INDEX idx_users_active ON users(email)
  WHERE deleted_at IS NULL;`,
    },
    {
      name: 'Audit Trail', icon: '📋', color: '#64c8ff',
      desc: 'Catat siapa mengubah apa dan kapan — via trigger atau application layer.',
      when: 'Compliance, debugging, regulatory requirements (finansial, kesehatan).',
      sql: `CREATE TABLE audit_logs (
  id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  table_name  VARCHAR(100) NOT NULL,
  record_id   BIGINT NOT NULL,
  action      VARCHAR(10) NOT NULL CHECK (action IN ('INSERT','UPDATE','DELETE')),
  old_data    JSONB,
  new_data    JSONB,
  changed_by  INT REFERENCES users(user_id),
  changed_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Trigger otomatis
CREATE OR REPLACE FUNCTION audit_trigger_fn()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO audit_logs(table_name, record_id, action, old_data, new_data, changed_by)
  VALUES (TG_TABLE_NAME, COALESCE(NEW.id, OLD.id), TG_OP,
          row_to_json(OLD), row_to_json(NEW), current_setting('app.user_id')::INT);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;`,
    },
    {
      name: 'Polymorphic Association', icon: '🔀', color: '#a78bfa',
      desc: 'Satu tabel bisa berelasi ke beberapa tabel berbeda (comments di post, video, photo).',
      when: 'Hindari jika bisa — preferably gunakan separate junction tables. Pakai dengan sadar.',
      sql: `-- Pattern: type + id columns
CREATE TABLE comments (
  comment_id    BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  content       TEXT NOT NULL,
  commentable_type VARCHAR(50) NOT NULL, -- 'post', 'video', 'photo'
  commentable_id   BIGINT NOT NULL,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_comments_poly ON comments(commentable_type, commentable_id);

-- LEBIH BAIK: separate FK columns (nullable)
CREATE TABLE comments (
  comment_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  content    TEXT NOT NULL,
  post_id    INT REFERENCES posts(post_id),
  video_id   INT REFERENCES videos(video_id),
  photo_id   INT REFERENCES photos(photo_id),
  CONSTRAINT one_parent CHECK (
    (post_id IS NOT NULL)::int + (video_id IS NOT NULL)::int
    + (photo_id IS NOT NULL)::int = 1
  )
);`,
    },
    {
      name: 'Versioning / Temporal Tables', icon: '🕐', color: '#f97316',
      desc: 'Simpan history perubahan baris dengan periode validitas waktu.',
      when: 'Harga produk yang berubah, kontrak, konfigurasi dengan effective date.',
      sql: `CREATE TABLE product_prices (
  price_id    BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  product_id  INT NOT NULL REFERENCES products(product_id),
  price       DECIMAL(10,2) NOT NULL,
  valid_from  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  valid_to    TIMESTAMPTZ, -- NULL = currently active
  CONSTRAINT no_overlap EXCLUDE USING GIST (
    product_id WITH =,
    tstzrange(valid_from, valid_to) WITH &&
  )
);

-- Harga aktif sekarang
SELECT price FROM product_prices
WHERE product_id = 1 AND valid_from <= NOW()
  AND (valid_to IS NULL OR valid_to > NOW());`,
    },
    {
      name: 'Status State Machine', icon: '🔄', color: '#fbbf24',
      desc: 'Validasi transisi status di database level via CHECK atau trigger.',
      when: 'Order workflow, ticket system, approval process — hindari invalid state.',
      sql: `CREATE TABLE orders (
  order_id  BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  status    VARCHAR(20) NOT NULL DEFAULT 'draft'
            CHECK (status IN ('draft','confirmed','processing','shipped','delivered','cancelled')),
  ...
);

-- Validasi transisi via trigger
CREATE OR REPLACE FUNCTION validate_order_status()
RETURNS TRIGGER AS $$
DECLARE
  valid_transitions JSONB := '{
    "draft":       ["confirmed","cancelled"],
    "confirmed":   ["processing","cancelled"],
    "processing":  ["shipped","cancelled"],
    "shipped":     ["delivered"]
  }';
BEGIN
  IF NOT (valid_transitions->OLD.status) @> to_jsonb(NEW.status) THEN
    RAISE EXCEPTION 'Invalid transition: % → %', OLD.status, NEW.status;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;`,
    },
  ]

  return (
    <div style={{ animation: 'float-up 0.5s ease-out' }}>
      <p style={{ color: '#a0c8ff', fontSize: '13px', marginBottom: '20px' }}>
        Design patterns yang terbukti untuk masalah umum dalam database design.
      </p>
      {patterns.map((p, i) => (
        <div key={i} style={{ background: 'rgba(26,35,50,0.8)', border: `1px solid ${p.color}44`, borderRadius: '12px', padding: '18px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <span style={{ fontSize: '22px' }}>{p.icon}</span>
            <h4 style={{ color: p.color, fontWeight: 'bold', fontSize: '15px' }}>{p.name}</h4>
          </div>
          <p style={{ color: '#a0c8ff', fontSize: '12px', marginBottom: '6px' }}>{p.desc}</p>
          <p style={{ color: '#708090', fontSize: '11px', marginBottom: '12px' }}>📌 Kapan: {p.when}</p>
          <CodeBlock code={p.sql} />
        </div>
      ))}
    </div>
  )
}

function TabAntiPatterns() {
  const antipatterns = [
    {
      name: 'EAV (Entity-Attribute-Value)', severity: 'Kritis',
      desc: 'Menyimpan schema dinamis dalam tiga kolom: entity_id, attribute_name, value. Terlihat fleksibel tapi mematikan performa dan kehilangan type safety.',
      symptom: 'Tabel attributes(id, entity_id, key VARCHAR, value VARCHAR) untuk semua jenis data.',
      fix: 'Gunakan JSONB column untuk dynamic attributes, atau proper schema design. Pertimbangkan JSONB + GIN index.',
      sql: `-- ❌ JANGAN: EAV pattern
INSERT INTO attributes VALUES (1, 42, 'price', '9.99');
INSERT INTO attributes VALUES (2, 42, 'color', 'red');
-- Query menjadi sangat kompleks dan lambat

-- ✅ SEBAIKNYA: JSONB untuk truly dynamic data
ALTER TABLE products ADD COLUMN attributes JSONB DEFAULT '{}';
UPDATE products SET attributes = '{"price": 9.99, "color": "red"}' WHERE id = 42;
CREATE INDEX idx_products_attrs ON products USING GIN(attributes);
SELECT * FROM products WHERE attributes->>'color' = 'red';`,
    },
    {
      name: 'God Table', severity: 'Tinggi',
      desc: 'Satu tabel dengan puluhan kolom yang menyimpan banyak entitas berbeda. Biasanya dengan banyak kolom nullable.',
      symptom: 'Tabel "items" dengan 60+ kolom, setengahnya NULL tergantung "type".',
      fix: 'Gunakan table inheritance, separate tables per type, atau JSONB untuk type-specific attributes.',
      sql: `-- ❌ JANGAN: God table
CREATE TABLE items (
  id INT, type VARCHAR, name VARCHAR,
  price DECIMAL,         -- hanya untuk produk
  duration INT,          -- hanya untuk service
  file_size BIGINT,      -- hanya untuk digital
  author VARCHAR,        -- hanya untuk buku
  ...50 kolom lagi NULL...
);

-- ✅ SEBAIKNYA: Single Table Inheritance atau table per type
CREATE TABLE products (id INT, name VARCHAR, price DECIMAL);
CREATE TABLE services (id INT, name VARCHAR, duration INT);
-- atau gunakan jsonb untuk atribut spesifik tipe`,
    },
    {
      name: 'Storing Derived Data', severity: 'Sedang',
      desc: 'Menyimpan data yang bisa dihitung dari data lain: total_price = qty * unit_price. Menyebabkan inkonsistensi jika update tidak sinkron.',
      symptom: 'Kolom full_name padahal ada first_name + last_name. Kolom age padahal ada birth_date.',
      fix: 'Gunakan generated columns, view, atau hitung di application layer. Simpan hanya jika performa kritis.',
      sql: `-- ❌ JANGAN: Simpan data derived
ALTER TABLE users ADD COLUMN full_name VARCHAR; -- bisa out of sync!
ALTER TABLE users ADD COLUMN age INT;           -- harus update tiap tahun!

-- ✅ SEBAIKNYA: Generated Column (PostgreSQL 12+)
ALTER TABLE users ADD COLUMN full_name TEXT
  GENERATED ALWAYS AS (first_name || ' ' || last_name) STORED;

-- Atau hitung di query
SELECT EXTRACT(YEAR FROM AGE(birth_date)) AS age FROM users;`,
    },
    {
      name: 'Implicit Column Selection (SELECT *)', severity: 'Sedang',
      desc: 'SELECT * mengambil semua kolom meskipun tidak dibutuhkan, termasuk JSONB/TEXT besar. Memboroskan network dan memory.',
      symptom: 'SELECT * di production query, terutama dengan JOIN atau tabel berkolom besar.',
      fix: 'Selalu eksplisit sebutkan kolom yang dibutuhkan. Gunakan view untuk common projections.',
      sql: `-- ❌ JANGAN
SELECT * FROM orders o JOIN customers c ON o.customer_id = c.id;

-- ✅ SEBAIKNYA: explicit columns
SELECT o.order_id, o.total, o.created_at,
       c.name AS customer_name, c.email
FROM orders o
JOIN customers c ON o.customer_id = c.id;`,
    },
    {
      name: 'Storing Comma-Separated Values', severity: 'Kritis',
      desc: 'Menyimpan list di satu kolom VARCHAR sebagai string "1,2,3". Melanggar 1NF, query menjadi mimpi buruk.',
      symptom: 'WHERE tags LIKE \'%,database,%\' atau string splitting di application.',
      fix: 'Gunakan junction table (M:N), atau PostgreSQL ARRAY type, atau JSONB array.',
      sql: `-- ❌ JANGAN
CREATE TABLE posts (
  id INT, title VARCHAR,
  tag_ids VARCHAR DEFAULT '' -- "1,3,7,12"
);

-- ✅ SEBAIKNYA: Junction table
CREATE TABLE post_tags (
  post_id INT REFERENCES posts(id),
  tag_id  INT REFERENCES tags(id),
  PRIMARY KEY (post_id, tag_id)
);

-- ✅ ATAU: Native PostgreSQL array
ALTER TABLE posts ADD COLUMN tag_ids INT[];
CREATE INDEX ON posts USING GIN(tag_ids);
SELECT * FROM posts WHERE 5 = ANY(tag_ids);`,
    },
  ]

  const severityColor = { Kritis: '#f87171', Tinggi: '#f97316', Sedang: '#fbbf24' }

  return (
    <div style={{ animation: 'float-up 0.5s ease-out' }}>
      <Section title="⚠️ Mengapa Anti-Patterns Berbahaya?" color="red">
        <p style={{ color: '#a0c8ff', fontSize: '12px', lineHeight: 1.7 }}>
          Anti-patterns sering muncul karena keputusan desain yang terburu-buru atau kurangnya pengalaman.
          Mereka terlihat "bekerja" di awal tapi menjadi <strong style={{ color: '#f87171' }}>technical debt</strong> yang
          sangat mahal saat data tumbuh.
        </p>
      </Section>

      {antipatterns.map((ap, i) => (
        <div key={i} style={{ background: 'rgba(26,35,50,0.8)', border: '1px solid rgba(248,113,113,0.3)', borderRadius: '12px', padding: '18px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <h4 style={{ color: '#f87171', fontWeight: 'bold', fontSize: '14px' }}>❌ {ap.name}</h4>
            <span style={{ background: `${severityColor[ap.severity]}22`, color: severityColor[ap.severity], border: `1px solid ${severityColor[ap.severity]}55`, padding: '2px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold' }}>
              {ap.severity}
            </span>
          </div>
          <p style={{ color: '#a0c8ff', fontSize: '12px', marginBottom: '6px' }}>{ap.desc}</p>
          <p style={{ color: '#fbbf24', fontSize: '11px', marginBottom: '6px' }}>🔍 Gejala: <span style={{ color: '#708090' }}>{ap.symptom}</span></p>
          <p style={{ color: '#4ade80', fontSize: '11px', marginBottom: '10px' }}>✅ Fix: <span style={{ color: '#708090' }}>{ap.fix}</span></p>
          <CodeBlock code={ap.sql} />
        </div>
      ))}
    </div>
  )
}

function TabChecklist() {
  const categories = [
    {
      title: '🏗️ Schema Design', color: '#64c8ff',
      items: [
        'Setiap tabel punya Primary Key',
        'Tipe data dipilih paling tepat dan kecil (INT bukan BIGINT jika tidak perlu)',
        'Kolom wajib isi sudah NOT NULL',
        'Tidak ada data redundant — sudah minimal 3NF kecuali ada alasan performa',
        'Tidak ada kolom yang menyimpan multiple values (CSV, JSON string) kecuali pakai ARRAY/JSONB',
        'Nama tabel: singular, snake_case (user, product, order_item)',
        'Nama kolom: deskriptif, konsisten (created_at bukan createdAt atau created_date)',
      ],
    },
    {
      title: '🔑 Keys & Constraints', color: '#4ade80',
      items: [
        'Semua FK sudah dideklarasikan eksplisit di database',
        'ON DELETE behavior sudah dipikirkan untuk setiap FK',
        'UNIQUE constraint untuk business keys (email, SKU, username)',
        'CHECK constraint untuk domain validation (harga >= 0, status IN (...))',
        'Default values diset untuk kolom yang ada nilai standar',
        'Surrogate key dipilih (IDENTITY atau UUID) bukan mutable natural key',
      ],
    },
    {
      title: '⚡ Performance', color: '#fbbf24',
      items: [
        'Index pada semua FK columns',
        'Index pada kolom yang sering di-filter/sort pada query utama',
        'Tidak ada index yang tidak pernah dipakai (cek pg_stat_user_indexes)',
        'EXPLAIN ANALYZE sudah dijalankan untuk semua query kritis',
        'Partial index dipertimbangkan untuk filter yang sering (WHERE status = \'active\')',
        'Tabel besar sudah dipertimbangkan untuk partitioning',
        'Concurrent index creation untuk tabel production',
      ],
    },
    {
      title: '🛡️ Data Integrity', color: '#a78bfa',
      items: [
        'Timestamps: created_at dan updated_at ada di semua tabel penting',
        'Soft delete diimplementasikan untuk data yang perlu audit trail',
        'Audit log untuk perubahan data sensitif',
        'Backup dan restore telah ditest',
        'Tidak ada data yang hanya ada di application memory tanpa persisted ke DB',
      ],
    },
    {
      title: '🔄 Migration & Maintenance', color: '#f97316',
      items: [
        'Semua DDL dalam migration files yang di-version control',
        'Migration dapat dirollback (down migration tersedia)',
        'Tidak ada ALTER TABLE yang bisa mengunci tabel production berjam-jam',
        'Data migration dipisah dari schema migration',
        'Naming convention migration file: timestamp_description.sql',
      ],
    },
  ]

  const [checked, setChecked] = useState({})
  const totalItems = categories.reduce((acc, c) => acc + c.items.length, 0)
  const totalChecked = Object.values(checked).filter(Boolean).length

  return (
    <div style={{ animation: 'float-up 0.5s ease-out' }}>
      <div style={{ background: 'rgba(100,200,255,0.1)', border: '1px solid rgba(100,200,255,0.3)', borderRadius: '10px', padding: '16px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ color: '#64c8ff', fontWeight: 'bold', fontSize: '14px' }}>Overall Progress</span>
          <span style={{ color: '#4ade80', fontWeight: 'bold', fontSize: '16px' }}>{totalChecked}/{totalItems}</span>
        </div>
        <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '4px', height: '12px', overflow: 'hidden' }}>
          <div style={{ background: 'linear-gradient(90deg, #64c8ff, #4ade80)', height: '100%', width: `${(totalChecked / totalItems) * 100}%`, transition: 'width 0.3s' }} />
        </div>
        <p style={{ color: '#708090', fontSize: '11px', marginTop: '6px' }}>Klik item untuk menandai selesai</p>
      </div>

      {categories.map((cat, ci) => {
        const catChecked = cat.items.filter((_, ii) => checked[`${ci}-${ii}`]).length
        return (
          <div key={ci} style={{ background: 'rgba(26,35,50,0.8)', border: `1px solid ${cat.color}33`, borderRadius: '12px', padding: '16px', marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h4 style={{ color: cat.color, fontWeight: 'bold', fontSize: '14px' }}>{cat.title}</h4>
              <span style={{ color: catChecked === cat.items.length ? '#4ade80' : '#708090', fontSize: '12px', fontWeight: 'bold' }}>
                {catChecked}/{cat.items.length}
              </span>
            </div>
            {cat.items.map((item, ii) => {
              const key = `${ci}-${ii}`
              const isDone = checked[key]
              return (
                <div
                  key={ii}
                  onClick={() => setChecked(prev => ({ ...prev, [key]: !prev[key] }))}
                  style={{
                    display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '8px',
                    borderRadius: '6px', cursor: 'pointer', marginBottom: '4px',
                    background: isDone ? 'rgba(74,222,128,0.08)' : 'transparent',
                    transition: 'background 0.2s',
                  }}
                >
                  <span style={{ color: isDone ? '#4ade80' : '#708090', fontSize: '16px', flexShrink: 0, lineHeight: 1.4 }}>
                    {isDone ? '✅' : '⬜'}
                  </span>
                  <span style={{ color: isDone ? '#4ade80' : '#a0c8ff', fontSize: '12px', textDecoration: isDone ? 'line-through' : 'none', lineHeight: 1.6 }}>
                    {item}
                  </span>
                </div>
              )
            })}
          </div>
        )
      })}

      <Section title="📚 Referensi & Tools" color="purple">
        {[
          { name: 'pgAdmin / DBeaver', desc: 'Visual schema designer dan query analyzer' },
          { name: 'db-diagram.io', desc: 'ER diagram online gratis' },
          { name: 'pgBadger', desc: 'Analisis PostgreSQL log untuk slow queries' },
          { name: 'Flyway / Liquibase', desc: 'Database migration version control' },
          { name: 'pg_stat_statements', desc: 'Extension PostgreSQL untuk monitoring query performance' },
        ].map((r, i) => (
          <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: '8px' }}>
            <span style={{ color: '#a78bfa', fontWeight: 'bold', fontSize: '12px', minWidth: '160px' }}>{r.name}</span>
            <span style={{ color: '#a0c8ff', fontSize: '12px' }}>— {r.desc}</span>
          </div>
        ))}
      </Section>
    </div>
  )
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

function DatabaseDesign() {
  const [activeTab, setActiveTab] = useState('overview')

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':      return <TabOverview />
      case 'normalization': return <TabNormalization />
      case 'keys':          return <TabKeys />
      case 'relationships': return <TabRelationships />
      case 'indexes':       return <TabIndexes />
      case 'patterns':      return <TabPatterns />
      case 'antipatterns':  return <TabAntiPatterns />
      case 'checklist':     return <TabChecklist />
      default:              return null
    }
  }

  return (
    <div style={{ minHeight: '100vh', padding: '32px 24px', maxWidth: '960px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px', animation: 'float-up 0.5s ease-out' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
          <div style={{ fontSize: '48px' }}>🗄️</div>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#e0f2ff', marginBottom: '4px' }}>
              Database Design Principles
            </h1>
            <p style={{ color: '#a0c8ff', fontSize: '14px' }}>
              Panduan komprehensif: normalization, keys, relationships, indexes, patterns &amp; anti-patterns
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {['Intermediate', 'Advanced'].map(d => (
            <Badge key={d} text={d} color={d === 'Intermediate' ? '#fbbf24' : '#f87171'} />
          ))}
          {['Normalization', 'Indexing', 'Schema Design', 'PostgreSQL'].map(t => (
            <Badge key={t} text={t} />
          ))}
        </div>
      </div>

      {/* Tab Navigation */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '28px', borderBottom: '1px solid rgba(100,200,255,0.2)', paddingBottom: '0', overflowX: 'auto' }}>
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '10px 14px',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === tab.id ? '3px solid #64c8ff' : '3px solid transparent',
              color: activeTab === tab.id ? '#64c8ff' : '#708090',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: activeTab === tab.id ? 'bold' : '500',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div>{renderContent()}</div>
    </div>
  )
}

export default DatabaseDesign
