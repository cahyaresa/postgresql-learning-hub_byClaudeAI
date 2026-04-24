import React, { useState } from 'react'
import { Copy, Check, Database, Table, Layers, Zap, Shield, BookOpen, Search } from 'lucide-react'

const TABS = [
  { id: 'overview',    label: '📖 Overview',          icon: <BookOpen size={14} /> },
  { id: 'numeric',     label: '🔢 Numeric Types',      icon: <Zap size={14} /> },
  { id: 'string',      label: '📝 String Types',       icon: <Search size={14} /> },
  { id: 'datetime',    label: '📅 Date & Time',        icon: <Shield size={14} /> },
  { id: 'special',     label: '🧩 Special Types',      icon: <Layers size={14} /> },
  { id: 'table-types', label: '🗄️ Table Types',        icon: <Table size={14} /> },
  { id: 'best-practice', label: '✅ Best Practices',  icon: <Database size={14} /> },
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
          fontSize: '15px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px',
        }}
      >
        {copied ? <><Check size={12} /> Copied</> : <><Copy size={12} /> Copy</>}
      </button>
      <pre style={{ margin: 0, color: '#a0c8ff', fontFamily: 'monospace', fontSize: '16px', whiteSpace: 'pre-wrap', paddingRight: '80px' }}>
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
    orange: { bg: 'rgba(249,115,22,0.08)',  border: 'rgba(249,115,22,0.3)',  accent: '#f97316', left: '#f97316' },
  }
  const c = palette[color] || palette.blue
  return (
    <div style={{ background: c.bg, border: `1px solid ${c.border}`, borderLeft: `3px solid ${c.left}`, borderRadius: '10px', padding: '16px', marginBottom: '14px' }}>
      {title && <h4 style={{ color: c.accent, fontWeight: 'bold', marginBottom: '10px', fontSize: '18px' }}>{title}</h4>}
      {children}
    </div>
  )
}

function Badge({ text, color = '#64c8ff' }) {
  return (
    <span style={{ background: `${color}22`, color, border: `1px solid ${color}55`, padding: '3px 10px', borderRadius: '20px', fontSize: '15px', fontWeight: 'bold', display: 'inline-block', margin: '3px' }}>
      {text}
    </span>
  )
}

function TypeRow({ type, size, range, useCase, pg, color = '#64c8ff' }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '130px 90px 1fr 1fr', gap: '10px', padding: '8px 0', borderBottom: '1px solid rgba(100,200,255,0.08)', alignItems: 'start', fontSize: '16px' }}>
      <code style={{ color, fontWeight: 'bold', fontFamily: 'monospace' }}>{type}</code>
      <span style={{ color: '#708090' }}>{size}</span>
      <span style={{ color: '#a0c8ff' }}>{range}</span>
      <span style={{ color: '#708090', fontSize: '15px' }}>{useCase}</span>
    </div>
  )
}

function CompareCard({ title, good, bad, color }) {
  return (
    <div style={{ background: 'rgba(26,35,50,0.8)', border: `1px solid ${color}33`, borderRadius: '10px', padding: '14px' }}>
      <p style={{ color, fontWeight: 'bold', fontSize: '17px', marginBottom: '10px' }}>{title}</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        <div style={{ background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.2)', borderRadius: '6px', padding: '8px' }}>
          <p style={{ color: '#4ade80', fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>✅ Gunakan</p>
          <p style={{ color: '#a0c8ff', fontSize: '15px', margin: 0 }}>{good}</p>
        </div>
        <div style={{ background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)', borderRadius: '6px', padding: '8px' }}>
          <p style={{ color: '#f87171', fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>❌ Hindari</p>
          <p style={{ color: '#a0c8ff', fontSize: '15px', margin: 0 }}>{bad}</p>
        </div>
      </div>
    </div>
  )
}

// ─── TABS ─────────────────────────────────────────────────────────────────────

function TabOverview() {
  const categories = [
    { icon: '🔢', title: 'Numeric', desc: 'Integer, decimal, float. Pilih presisi sesuai kebutuhan.', types: ['SMALLINT','INTEGER','BIGINT','NUMERIC','REAL','DOUBLE PRECISION'], color: '#64c8ff' },
    { icon: '📝', title: 'String / Text', desc: 'Teks dengan atau tanpa panjang tetap. Perhatikan collation.', types: ['CHAR(n)','VARCHAR(n)','TEXT','CITEXT'], color: '#4ade80' },
    { icon: '📅', title: 'Date & Time', desc: 'Temporal data. Selalu perhatikan timezone.', types: ['DATE','TIME','TIMESTAMP','TIMESTAMPTZ','INTERVAL'], color: '#fbbf24' },
    { icon: '✅', title: 'Boolean', desc: 'TRUE / FALSE / NULL. Jangan pakai INTEGER 0/1.', types: ['BOOLEAN'], color: '#a78bfa' },
    { icon: '🔵', title: 'Binary / UUID', desc: 'Raw bytes dan universally unique identifiers.', types: ['BYTEA','UUID'], color: '#f97316' },
    { icon: '🧩', title: 'Special / Advanced', desc: 'JSON, array, geometric, network, range types.', types: ['JSON','JSONB','ARRAY','HSTORE','INET','RANGE'], color: '#f87171' },
  ]

  return (
    <div style={{ animation: 'float-up 0.5s ease-out' }}>
      <Section title="🗂️ Mengapa Pemilihan Tipe Data Penting?" color="blue">
        <p style={{ color: '#a0c8ff', fontSize: '17px', lineHeight: 1.7 }}>
          Tipe data yang tepat berdampak langsung pada <strong style={{ color: '#64c8ff' }}>storage efficiency</strong>,{' '}
          <strong style={{ color: '#4ade80' }}>query performance</strong>,{' '}
          <strong style={{ color: '#fbbf24' }}>data integrity</strong>, dan{' '}
          <strong style={{ color: '#a78bfa' }}>maintainability</strong> skema database.
          Kesalahan memilih tipe data di awal bisa sangat mahal untuk diubah di produksi.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px' }}>
          {['Storage Efficiency', 'Query Performance', 'Data Integrity', 'Type Safety', 'Index Efficiency'].map(t => (
            <Badge key={t} text={t} />
          ))}
        </div>
      </Section>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px', marginBottom: '14px' }}>
        {categories.map(({ icon, title, desc, types, color }) => (
          <div key={title} style={{ background: 'rgba(26,35,50,0.8)', border: `1px solid ${color}22`, borderRadius: '10px', padding: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span style={{ fontSize: '24px' }}>{icon}</span>
              <span style={{ color: '#e0f2ff', fontWeight: 'bold', fontSize: '17px' }}>{title}</span>
            </div>
            <p style={{ color: '#a0c8ff', fontSize: '16px', lineHeight: 1.6, marginBottom: '10px' }}>{desc}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {types.map(t => <Badge key={t} text={t} color={color} />)}
            </div>
          </div>
        ))}
      </div>

      <Section title="📏 Prinsip Pemilihan Tipe Data" color="green">
        {[
          ['🎯 Paling Spesifik', 'Gunakan tipe terkecil yang bisa menampung data. SMALLINT bukan BIGINT jika nilainya < 32k.'],
          ['🛡️ Constraints Dulu', 'Tipe data adalah constraint pertama. NOT NULL, CHECK, UNIQUE melengkapi validasi.'],
          ['⏰ Timezone Sadar', 'Selalu gunakan TIMESTAMPTZ bukan TIMESTAMP untuk data dengan konteks waktu global.'],
          ['💰 Jangan Float untuk Uang', 'Gunakan NUMERIC(15,2) bukan FLOAT untuk nilai keuangan. Floating point tidak presisi.'],
          ['🆔 UUID vs SERIAL', 'UUID untuk distributed systems dan expose ke API. BIGSERIAL untuk internal tables yang butuh performa JOIN.'],
        ].map(([title, desc]) => (
          <div key={title} style={{ display: 'flex', gap: '10px', padding: '6px 0', borderBottom: '1px solid rgba(100,200,255,0.08)' }}>
            <span style={{ color: '#64c8ff', fontWeight: 'bold', fontSize: '16px', minWidth: '160px' }}>{title}</span>
            <span style={{ color: '#a0c8ff', fontSize: '16px' }}>{desc}</span>
          </div>
        ))}
      </Section>
    </div>
  )
}

function TabNumeric() {
  return (
    <div style={{ animation: 'float-up 0.5s ease-out' }}>
      <Section title="🔢 Integer Types" color="blue">
        <div style={{ display: 'grid', gridTemplateColumns: '130px 90px 1fr 1fr', gap: '10px', padding: '6px 0', borderBottom: '1px solid rgba(100,200,255,0.15)', fontSize: '15px' }}>
          <span style={{ color: '#708090', fontWeight: 'bold' }}>Type</span>
          <span style={{ color: '#708090', fontWeight: 'bold' }}>Storage</span>
          <span style={{ color: '#708090', fontWeight: 'bold' }}>Range</span>
          <span style={{ color: '#708090', fontWeight: 'bold' }}>Use Case</span>
        </div>
        <TypeRow type="SMALLINT"  size="2 bytes" range="-32,768 to 32,767"                         useCase="Flag, kode, status numerik kecil" color="#4ade80" />
        <TypeRow type="INTEGER"   size="4 bytes" range="-2.1B to 2.1B"                             useCase="ID, counter, foreign key umum" color="#64c8ff" />
        <TypeRow type="BIGINT"    size="8 bytes" range="-9.2 × 10¹⁸ to 9.2 × 10¹⁸"              useCase="ID skala besar, epoch ms, counter besar" color="#fbbf24" />
        <TypeRow type="SMALLSERIAL" size="2 bytes" range="1 to 32,767"                             useCase="Auto-increment kecil" color="#4ade80" />
        <TypeRow type="SERIAL"    size="4 bytes" range="1 to 2.1B"                                useCase="Auto-increment standar (legacy, prefer GENERATED)" color="#64c8ff" />
        <TypeRow type="BIGSERIAL" size="8 bytes" range="1 to 9.2 × 10¹⁸"                         useCase="Auto-increment untuk tabel besar" color="#fbbf24" />
        <CodeBlock code={`-- Modern: gunakan GENERATED ALWAYS AS IDENTITY (SQL standard)
CREATE TABLE products (
  id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  sku_code    SMALLINT,        -- kode kategori produk (< 32k)
  view_count  INTEGER,         -- counter views
  total_sold  BIGINT           -- bisa jutaan unit
);

-- Cek batas SERIAL sebelum overflow:
SELECT last_value, is_called FROM products_id_seq;`} />
      </Section>

      <Section title="💰 Decimal & Floating Point" color="yellow">
        <div style={{ display: 'grid', gridTemplateColumns: '130px 90px 1fr 1fr', gap: '10px', padding: '6px 0', borderBottom: '1px solid rgba(251,191,36,0.15)', fontSize: '15px' }}>
          <span style={{ color: '#708090', fontWeight: 'bold' }}>Type</span>
          <span style={{ color: '#708090', fontWeight: 'bold' }}>Storage</span>
          <span style={{ color: '#708090', fontWeight: 'bold' }}>Presisi</span>
          <span style={{ color: '#708090', fontWeight: 'bold' }}>Use Case</span>
        </div>
        <TypeRow type="NUMERIC(p,s)" size="Variable" range="Hingga 131072 digit" useCase="Keuangan, akuntansi — EXACT" color="#4ade80" />
        <TypeRow type="DECIMAL(p,s)" size="Variable" range="Alias NUMERIC"       useCase="Identik dengan NUMERIC" color="#4ade80" />
        <TypeRow type="REAL"         size="4 bytes" range="6 digit presisi"       useCase="Koordinat approx, metric non-kritis" color="#f87171" />
        <TypeRow type="DOUBLE PRECISION" size="8 bytes" range="15 digit presisi"  useCase="Scientific calc, performa > presisi" color="#f87171" />
        <CodeBlock code={`-- BENAR: Keuangan pakai NUMERIC
CREATE TABLE transactions (
  id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  amount      NUMERIC(15, 2),   -- sampai 999 triliun, 2 desimal
  tax_rate    NUMERIC(5, 4),    -- mis. 0.1100 = 11%
  exchange_rate NUMERIC(12, 6)  -- 6 desimal untuk kurs
);

-- SALAH: Jangan pakai FLOAT untuk uang
-- amount REAL  ← bisa dapat 0.10000000149011612 bukan 0.10!

-- Demonstrasi masalah floating point:
SELECT 0.1::REAL + 0.2::REAL;          -- 0.3000000119...
SELECT 0.1::NUMERIC + 0.2::NUMERIC;   -- 0.3 (exact)`} />
      </Section>

      <Section title="🔢 Numeric Special Values" color="purple">
        <CodeBlock code={`-- Infinity dan NaN untuk FLOAT types
SELECT 'Infinity'::FLOAT, '-Infinity'::FLOAT, 'NaN'::FLOAT;

-- Aritmetika NUMERIC
SELECT
  ROUND(123.456, 2),        -- 123.46
  TRUNC(123.456, 2),        -- 123.45 (truncate, no rounding)
  CEIL(123.1),              -- 124
  FLOOR(123.9),             -- 123
  MOD(17, 5),               -- 2
  POWER(2, 10),             -- 1024
  SQRT(144);                -- 12

-- Generate series of numbers
SELECT generate_series(1, 10, 2) AS odd_numbers;
-- Menghasilkan: 1, 3, 5, 7, 9`} />
      </Section>
    </div>
  )
}

function TabString() {
  return (
    <div style={{ animation: 'float-up 0.5s ease-out' }}>
      <Section title="📝 String Type Comparison" color="green">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px', marginBottom: '12px' }}>
          {[
            { type: 'CHAR(n)', storage: 'n bytes (padded)', desc: 'Fixed-length, selalu padding dengan spasi. Hampir tidak ada alasan modern untuk memakai ini.', use: 'Kode negara: CHAR(2)', avoid: 'Nama, deskripsi', color: '#f87171' },
            { type: 'VARCHAR(n)', storage: 'Up to n+1 bytes', desc: 'Variable-length dengan batas maksimum. Berguna jika ingin enforce panjang maksimum di DB level.', use: 'email VARCHAR(255), slug VARCHAR(100)', avoid: 'Konten bebas panjang', color: '#fbbf24' },
            { type: 'TEXT', storage: 'Variable, unlimited', desc: 'Variable-length tanpa batas. Performanya sama dengan VARCHAR di PostgreSQL. Preferred untuk konten bebas.', use: 'bio, notes, html_content', avoid: 'Field yang perlu max-length validation', color: '#4ade80' },
            { type: 'CITEXT', storage: 'Same as TEXT', desc: 'Case-insensitive TEXT. Memerlukan extension citext. Berguna untuk email comparison tanpa LOWER().', use: 'Email lookup tanpa LOWER()', avoid: 'Jika tidak butuh case-insensitive', color: '#64c8ff' },
          ].map(({ type, storage, desc, use, avoid, color }) => (
            <div key={type} style={{ background: `${color}0d`, border: `1px solid ${color}33`, borderRadius: '10px', padding: '12px' }}>
              <p style={{ color, fontWeight: 'bold', fontSize: '17px', marginBottom: '4px', fontFamily: 'monospace' }}>{type}</p>
              <p style={{ color: '#708090', fontSize: '14px', marginBottom: '8px' }}>{storage}</p>
              <p style={{ color: '#a0c8ff', fontSize: '15px', lineHeight: 1.5, marginBottom: '8px' }}>{desc}</p>
              <p style={{ color: '#4ade80', fontSize: '14px', marginBottom: '2px' }}>✅ {use}</p>
              <p style={{ color: '#f87171', fontSize: '14px' }}>❌ {avoid}</p>
            </div>
          ))}
        </div>
        <CodeBlock code={`-- Di PostgreSQL, VARCHAR(n) dan TEXT punya performa SAMA
-- Perbedaan hanya pada constraint panjang maksimum

CREATE TABLE users (
  id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  -- CHAR(2) untuk fixed-length codes
  country_code CHAR(2)       NOT NULL,
  -- VARCHAR untuk field yang perlu max-length validation
  username    VARCHAR(50)    NOT NULL UNIQUE,
  email       VARCHAR(255)   NOT NULL UNIQUE,
  -- TEXT untuk konten bebas
  bio         TEXT,
  -- CITEXT untuk case-insensitive (butuh: CREATE EXTENSION citext)
  -- email_ci CITEXT UNIQUE
);

-- Mitos: VARCHAR(n) lebih cepat dari TEXT → FALSE di PostgreSQL
-- Keduanya simpan data di TOAST jika > ~2KB`} />
      </Section>

      <Section title="🔍 String Functions & Patterns" color="blue">
        <CodeBlock code={`-- Fungsi string penting di PostgreSQL
SELECT
  LENGTH('hello world'),           -- 11
  UPPER('hello'),                  -- HELLO
  LOWER('HELLO'),                  -- hello
  TRIM('  hello  '),               -- 'hello'
  LTRIM('  hello'),                -- 'hello'
  RTRIM('hello  '),                -- 'hello'
  LPAD('42', 5, '0'),             -- '00042'
  RPAD('hi', 5, '.'),             -- 'hi...'
  SUBSTRING('hello world', 1, 5), -- 'hello'
  POSITION('world' IN 'hello world'), -- 7
  REPLACE('foo bar', 'bar', 'baz'), -- 'foo baz'
  SPLIT_PART('a,b,c', ',', 2),    -- 'b'
  STRING_AGG(name, ', '),         -- join strings
  CONCAT('foo', 'bar'),           -- 'foobar'
  FORMAT('Hello, %s! You are %s.', 'Bob', 'awesome');

-- Pattern matching
SELECT * FROM products WHERE name LIKE '%laptop%';        -- case-sensitive
SELECT * FROM products WHERE name ILIKE '%laptop%';       -- case-insensitive
SELECT * FROM products WHERE name ~ '^[A-Z]';             -- regex
SELECT * FROM products WHERE name !~ '\d';                -- not match regex

-- Full-text search (lebih powerful dari LIKE)
SELECT * FROM articles
WHERE to_tsvector('english', body) @@ to_tsquery('english', 'postgresql & database');`} />
      </Section>

      <Section title="📦 Collation & Encoding" color="purple">
        <CodeBlock code={`-- Cek encoding dan collation database
SELECT datname, encoding, datcollate, datctype
FROM pg_database WHERE datname = current_database();

-- Kolom dengan collation spesifik
CREATE TABLE products (
  id      BIGINT PRIMARY KEY,
  name    TEXT COLLATE "en-US-x-icu",    -- English, case/accent sensitive
  name_ci TEXT COLLATE "und-x-icu"       -- Unicode, default insensitive
);

-- COLLATE dalam query
SELECT * FROM products
ORDER BY name COLLATE "tr-TR-x-icu";    -- Turkish sort order

-- Normalize unicode
SELECT normalize('café', NFC);   -- composed form
SELECT normalize('café', NFD);   -- decomposed form`} />
      </Section>
    </div>
  )
}

function TabDatetime() {
  return (
    <div style={{ animation: 'float-up 0.5s ease-out' }}>
      <Section title="📅 Date & Time Types" color="yellow">
        <div style={{ display: 'grid', gridTemplateColumns: '130px 90px 1fr 1fr', gap: '10px', padding: '6px 0', borderBottom: '1px solid rgba(251,191,36,0.15)', fontSize: '15px' }}>
          <span style={{ color: '#708090', fontWeight: 'bold' }}>Type</span>
          <span style={{ color: '#708090', fontWeight: 'bold' }}>Storage</span>
          <span style={{ color: '#708090', fontWeight: 'bold' }}>Range / Presisi</span>
          <span style={{ color: '#708090', fontWeight: 'bold' }}>Use Case</span>
        </div>
        <TypeRow type="DATE"        size="4 bytes" range="4713 BC – 5874897 AD"         useCase="Tanggal lahir, deadline, tanpa jam" color="#fbbf24" />
        <TypeRow type="TIME"        size="8 bytes" range="00:00:00 – 24:00:00, 1μs"    useCase="Jam operasional (tanpa tanggal)" color="#fbbf24" />
        <TypeRow type="TIMETZ"      size="12 bytes" range="TIME + timezone offset"      useCase="Jarang dipakai — prefer TIMESTAMPTZ" color="#f87171" />
        <TypeRow type="TIMESTAMP"   size="8 bytes" range="4713 BC – 294276 AD, 1μs"    useCase="Waktu lokal (no TZ) — hati-hati!" color="#f87171" />
        <TypeRow type="TIMESTAMPTZ" size="8 bytes" range="Same, stored as UTC"          useCase="Waktu dengan TZ — ALWAYS prefer ini" color="#4ade80" />
        <TypeRow type="INTERVAL"    size="16 bytes" range="Duration: -178M to +178M yr" useCase="Selisih waktu, durasi, offset" color="#64c8ff" />
        <CodeBlock code={`-- TIMESTAMPTZ: disimpan sebagai UTC, ditampilkan per session timezone
CREATE TABLE events (
  id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title       TEXT NOT NULL,
  -- Untuk appointment: DATE + TIME bisa lebih tepat dari TIMESTAMP
  event_date  DATE NOT NULL,
  start_time  TIME NOT NULL,
  -- Untuk created/updated: selalu TIMESTAMPTZ
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  -- Untuk durasi
  duration    INTERVAL
);

-- Set timezone session
SET timezone = 'Asia/Jakarta';

-- now() mengembalikan TIMESTAMPTZ (UTC internally)
SELECT now();                            -- 2025-08-01 07:00:00+07
SELECT now() AT TIME ZONE 'UTC';        -- 2025-08-01 00:00:00
SELECT now() AT TIME ZONE 'US/Pacific'; -- 2025-07-31 17:00:00`} />
      </Section>

      <Section title="⚙️ Date & Time Functions" color="blue">
        <CodeBlock code={`-- Ekstraksi komponen waktu
SELECT
  EXTRACT(YEAR   FROM now()),   -- 2025
  EXTRACT(MONTH  FROM now()),   -- 8
  EXTRACT(DOW    FROM now()),   -- 0=Sunday .. 6=Saturday
  EXTRACT(EPOCH  FROM now()),   -- Unix timestamp (seconds)
  DATE_PART('hour', now()),     -- 7 (alternatif EXTRACT)
  DATE_TRUNC('month', now()),   -- 2025-08-01 00:00:00+07
  DATE_TRUNC('week',  now());   -- Senin minggu ini

-- Aritmetika tanggal
SELECT
  now() + INTERVAL '30 days',          -- 30 hari ke depan
  now() - INTERVAL '1 hour',           -- 1 jam lalu
  '2025-12-31'::DATE - '2025-01-01'::DATE,  -- 364 (hari)
  AGE('2025-08-01', '1990-03-15');     -- 35 years 4 months 17 days

-- Format output
SELECT TO_CHAR(now(), 'DD Mon YYYY HH24:MI:SS');  -- 01 Aug 2025 07:00:00
SELECT TO_CHAR(now(), 'YYYY-MM-DD');              -- 2025-08-01

-- Parse string ke timestamp
SELECT TO_TIMESTAMP('01-08-2025', 'DD-MM-YYYY');

-- Useful patterns
SELECT DATE_TRUNC('day', created_at) AS day,
       COUNT(*) AS orders
FROM orders
WHERE created_at >= now() - INTERVAL '30 days'
GROUP BY 1
ORDER BY 1;`} />
      </Section>

      <Section title="⚠️ TIMESTAMP vs TIMESTAMPTZ — Pitfall Umum" color="red">
        <CodeBlock code={`-- BAHAYA: TIMESTAMP menyimpan "waktu lokal" tanpa info TZ
-- Jika server pindah timezone → data jadi ambigu!
CREATE TABLE bad_example (
  logged_at TIMESTAMP  -- ❌ berbahaya untuk produksi
);

-- BENAR: TIMESTAMPTZ selalu UTC di storage, display per TZ
CREATE TABLE good_example (
  logged_at TIMESTAMPTZ  -- ✅ aman, portable, tidak ambigu
);

-- Konversi timezone
SELECT created_at AT TIME ZONE 'Asia/Jakarta' FROM orders;

-- Bandingkan waktu lintas timezone dengan benar
SELECT * FROM orders
WHERE created_at BETWEEN
  '2025-08-01 00:00:00+07'::TIMESTAMPTZ AND
  '2025-08-01 23:59:59+07'::TIMESTAMPTZ;

-- INTERVAL: tipe untuk durasi
SELECT
  INTERVAL '1 year 2 months 3 days 4 hours',
  INTERVAL '90 minutes',
  now() + INTERVAL '1 week' - INTERVAL '1 day';`} />
      </Section>
    </div>
  )
}

function TabSpecial() {
  return (
    <div style={{ animation: 'float-up 0.5s ease-out' }}>
      <Section title="🆔 UUID" color="purple">
        <CodeBlock code={`-- UUID: Universally Unique Identifier (128-bit)
-- Gunakan uuid-ossp atau gen_random_uuid() (PostgreSQL 13+)

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE api_keys (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),  -- PG 13+
  -- atau: DEFAULT uuid_generate_v4()  (butuh uuid-ossp)
  user_id    BIGINT NOT NULL REFERENCES users(id),
  key_hash   TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- UUID v4 (random) vs v7 (time-ordered, PG 17+)
SELECT gen_random_uuid();         -- a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11
-- UUID v7 lebih baik untuk indexing (monotonically increasing)

-- Kapan UUID, kapan BIGSERIAL?
-- UUID: expose ke external API, distributed insert, no seq dependency
-- BIGSERIAL: internal FK, JOIN-heavy tables, storage-sensitive`} />
      </Section>

      <Section title="🔵 Boolean" color="green">
        <CodeBlock code={`-- BOOLEAN: TRUE / FALSE / NULL
CREATE TABLE feature_flags (
  id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  flag_name   TEXT UNIQUE NOT NULL,
  is_enabled  BOOLEAN NOT NULL DEFAULT FALSE,
  is_beta     BOOLEAN,           -- Nullable: NULL = unknown
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- Literal values PostgreSQL terima:
-- TRUE: true, 't', 'yes', 'on', '1', 'y'
-- FALSE: false, 'f', 'no', 'off', '0', 'n'

INSERT INTO feature_flags (flag_name, is_enabled) VALUES
  ('dark_mode', TRUE),
  ('new_checkout', 'yes'),    -- juga valid
  ('beta_ai', 't');           -- juga valid

-- Query boolean
SELECT * FROM feature_flags WHERE is_enabled;             -- WHERE is_enabled = TRUE
SELECT * FROM feature_flags WHERE NOT is_enabled;         -- WHERE is_enabled = FALSE
SELECT * FROM feature_flags WHERE is_beta IS NULL;        -- NULL check
SELECT * FROM feature_flags WHERE is_beta IS NOT DISTINCT FROM FALSE; -- NULL-safe =`} />
      </Section>

      <Section title="📦 JSONB vs JSON" color="yellow">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
          {[
            { title: 'JSON', pros: ['Preserves key order', 'Preserves duplicate keys', 'Faster write (no parse)'], cons: ['Slower reads (re-parse each time)', 'Cannot be indexed efficiently', 'No operators like @>'], color: '#f87171' },
            { title: 'JSONB', pros: ['Binary storage (fast read)', 'Indexable (GIN index)', 'Rich operator support (@>, ?, #>>)'], cons: ['Slower write (parse on insert)', 'Does not preserve key order', 'Slightly more storage'], color: '#4ade80' },
          ].map(({ title, pros, cons, color }) => (
            <div key={title} style={{ background: `${color}0d`, border: `1px solid ${color}33`, borderRadius: '10px', padding: '12px' }}>
              <p style={{ color, fontWeight: 'bold', fontSize: '18px', marginBottom: '8px' }}>{title}</p>
              {pros.map(p => <p key={p} style={{ color: '#a0c8ff', fontSize: '15px', margin: '2px 0' }}>✅ {p}</p>)}
              <div style={{ height: '8px' }} />
              {cons.map(c => <p key={c} style={{ color: '#708090', fontSize: '15px', margin: '2px 0' }}>❌ {c}</p>)}
            </div>
          ))}
        </div>
        <CodeBlock code={`-- Gunakan JSONB (hampir selalu)
CREATE TABLE products (
  id         BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name       TEXT NOT NULL,
  attributes JSONB DEFAULT '{}'  -- metadata fleksibel
);

-- Insert
INSERT INTO products (name, attributes) VALUES
  ('Laptop Pro', '{"brand": "Dell", "ram_gb": 16, "tags": ["business","gaming"]}'),
  ('Mouse X1',   '{"brand": "Logitech", "wireless": true, "dpi": 1600}');

-- JSONB operators
SELECT attributes->>'brand'          FROM products;  -- text value
SELECT attributes->'tags'            FROM products;  -- json array
SELECT attributes->'tags'->0         FROM products;  -- first element
SELECT attributes #>> '{specs,cpu}'  FROM products;  -- nested path

-- Containment
SELECT * FROM products WHERE attributes @> '{"wireless": true}';

-- Key existence
SELECT * FROM products WHERE attributes ? 'dpi';

-- GIN index untuk JSONB query cepat
CREATE INDEX idx_products_attributes ON products USING GIN (attributes);

-- JSONB update
UPDATE products
SET attributes = attributes || '{"color": "black"}'::jsonb
WHERE id = 1;

-- Remove key
UPDATE products
SET attributes = attributes - 'color'
WHERE id = 1;`} />
      </Section>

      <Section title="📋 ARRAY Types" color="blue">
        <CodeBlock code={`-- Array: kolom bisa menyimpan multiple values
CREATE TABLE articles (
  id       BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title    TEXT NOT NULL,
  tags     TEXT[]     DEFAULT '{}',   -- array of text
  scores   INTEGER[]  DEFAULT '{}',   -- array of int
  matrix   INTEGER[][] DEFAULT '{}'   -- 2D array
);

-- Insert array
INSERT INTO articles (title, tags, scores) VALUES
  ('PostgreSQL Tips', ARRAY['postgres','database','tips'], ARRAY[90,85,92]),
  ('Linux Guide',     '{"linux","sysadmin","shell"}',      '{70,80}');

-- Array operators
SELECT * FROM articles WHERE 'postgres' = ANY(tags);    -- contains element
SELECT * FROM articles WHERE tags @> ARRAY['tips'];      -- contains subarray
SELECT * FROM articles WHERE tags && ARRAY['linux','postgres']; -- overlap
SELECT array_length(tags, 1) FROM articles;             -- length
SELECT unnest(tags) FROM articles;                      -- expand to rows
SELECT array_agg(name) FROM users;                      -- aggregate to array

-- Index untuk array
CREATE INDEX idx_articles_tags ON articles USING GIN (tags);`} />
      </Section>

      <Section title="🌐 Network & Range Types" color="orange">
        <CodeBlock code={`-- Network types
CREATE TABLE server_inventory (
  id       BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  hostname TEXT NOT NULL,
  ip_addr  INET,       -- IPv4 atau IPv6 address
  ip_range CIDR,       -- Network address (e.g. 192.168.1.0/24)
  mac_addr MACADDR     -- MAC address
);

INSERT INTO server_inventory (hostname, ip_addr, ip_range) VALUES
  ('web-01', '192.168.1.10', '192.168.1.0/24'),
  ('db-01',  '10.0.0.5',     '10.0.0.0/8');

-- Query network
SELECT * FROM server_inventory WHERE ip_addr << '192.168.0.0/16';  -- subnet
SELECT host(ip_addr), masklen(ip_range) FROM server_inventory;

-- Range types: kontinu range dengan bounds
CREATE TABLE bookings (
  id         BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  room_id    INT NOT NULL,
  booked_at  TSTZRANGE NOT NULL,   -- e.g. [2025-08-01 09:00, 2025-08-01 18:00)
  EXCLUDE USING GIST (room_id WITH =, booked_at WITH &&) -- no overlapping!
);

INSERT INTO bookings (room_id, booked_at) VALUES
  (1, '[2025-08-01 09:00+07, 2025-08-01 18:00+07)');

-- Range operators
SELECT * FROM bookings WHERE booked_at @> now()::TIMESTAMPTZ;  -- contains now
SELECT * FROM bookings WHERE booked_at && '[2025-08-01 14:00+07, 2025-08-01 16:00+07)'; -- overlaps

-- Integer range
CREATE TABLE age_groups (
  label    TEXT,
  age_range INT4RANGE  -- e.g. [18,65)
);
SELECT * FROM age_groups WHERE age_range @> 25;  -- does range include 25?`} />
      </Section>

      <Section title="💾 BYTEA & Enum" color="purple">
        <CodeBlock code={`-- BYTEA: binary data (images, files — tapi generally simpan di object storage)
CREATE TABLE file_metadata (
  id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  filename    TEXT,
  mime_type   TEXT,
  checksum    BYTEA,      -- hash (md5/sha256) sebagai binary
  thumbnail   BYTEA       -- small thumbnails saja; file besar → S3
);

-- ENUM: set nilai yang terbatas dan stable
CREATE TYPE user_role AS ENUM ('guest', 'member', 'moderator', 'admin');
CREATE TYPE order_status AS ENUM ('pending', 'processing', 'shipped', 'delivered', 'cancelled');

CREATE TABLE users (
  id   BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  role user_role NOT NULL DEFAULT 'member'
);

-- Tambah nilai ke ENUM (hanya bisa append, tidak bisa insert di tengah tanpa workaround)
ALTER TYPE user_role ADD VALUE 'superadmin' AFTER 'admin';

-- Cek nilai ENUM
SELECT enum_range(NULL::user_role);  -- {guest,member,moderator,admin,superadmin}`} />
      </Section>
    </div>
  )
}

function TabTableTypes() {
  const tableTypes = [
    {
      name: 'Regular / Permanent Table',
      icon: '🗄️',
      color: '#64c8ff',
      desc: 'Tabel standar yang persisten selama tidak di-DROP. Data tersimpan di disk dan survive restart.',
      use: 'Data utama aplikasi: users, orders, products',
      note: 'Default ketika Anda tulis CREATE TABLE',
    },
    {
      name: 'Temporary Table',
      icon: '⏳',
      color: '#fbbf24',
      desc: 'Hanya ada selama session atau transaction berlangsung. Otomatis di-drop saat session berakhir.',
      use: 'Intermediate calculation, ETL staging, complex query steps',
      note: 'CREATE TEMP TABLE / CREATE TEMPORARY TABLE',
    },
    {
      name: 'Unlogged Table',
      icon: '⚡',
      color: '#f97316',
      desc: 'Tidak ditulis ke WAL (Write-Ahead Log). Jauh lebih cepat untuk write, tapi data hilang jika crash.',
      use: 'Cache table, session data, queue yang tidak kritis',
      note: 'CREATE UNLOGGED TABLE — data hilang saat crash!',
    },
    {
      name: 'Partitioned Table',
      icon: '🗂️',
      color: '#a78bfa',
      desc: 'Tabel dibagi menjadi partisi fisik berdasarkan nilai kolom (RANGE, LIST, HASH).',
      use: 'Tabel besar > 100M rows: logs, events, time-series',
      note: 'CREATE TABLE ... PARTITION BY RANGE/LIST/HASH',
    },
    {
      name: 'Foreign Table',
      icon: '🔗',
      color: '#4ade80',
      desc: 'Tabel yang datanya berada di sumber eksternal (DB lain, CSV file, API) via FDW (Foreign Data Wrapper).',
      use: 'Federasi data, cross-DB query, data migration',
      note: 'Butuh CREATE EXTENSION postgres_fdw',
    },
    {
      name: 'View',
      icon: '👁️',
      color: '#64c8ff',
      desc: 'Virtual table — hasil query yang disimpan sebagai nama. Tidak menyimpan data sendiri.',
      use: 'Simplifikasi query kompleks, row-level security, API layer',
      note: 'CREATE VIEW — query dijalankan setiap kali view di-SELECT',
    },
    {
      name: 'Materialized View',
      icon: '📸',
      color: '#f87171',
      desc: 'View yang hasilnya disimpan secara fisik ke disk. Perlu REFRESH untuk sinkronisasi data.',
      use: 'Dashboard, agregasi berat, laporan periodik',
      note: 'CREATE MATERIALIZED VIEW + REFRESH MATERIALIZED VIEW',
    },
    {
      name: 'Inheritance Table',
      icon: '🧬',
      color: '#708090',
      desc: 'Child table mewarisi kolom dari parent table (OO-style inheritance). Kurang populer sejak partitioning native.',
      use: 'Warisan dari versi PG lama; prefer declarative partitioning',
      note: 'CREATE TABLE child INHERITS (parent)',
    },
  ]

  return (
    <div style={{ animation: 'float-up 0.5s ease-out' }}>
      <Section title="🗄️ Jenis-Jenis Table di PostgreSQL" color="blue">
        <p style={{ color: '#a0c8ff', fontSize: '16px', marginBottom: '16px' }}>
          PostgreSQL mendukung beberapa jenis table dengan karakteristik storage, persistence, dan use case yang berbeda.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
          {tableTypes.map(({ name, icon, color, desc, use, note }) => (
            <div key={name} style={{ background: 'rgba(26,35,50,0.8)', border: `1px solid ${color}33`, borderRadius: '10px', padding: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ fontSize: '24px' }}>{icon}</span>
                <span style={{ color, fontWeight: 'bold', fontSize: '16px' }}>{name}</span>
              </div>
              <p style={{ color: '#a0c8ff', fontSize: '15px', lineHeight: 1.6, marginBottom: '8px' }}>{desc}</p>
              <p style={{ color: '#4ade80', fontSize: '14px', marginBottom: '2px' }}>✅ {use}</p>
              <p style={{ color: '#708090', fontSize: '14px', fontStyle: 'italic' }}>📌 {note}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="⏳ Temporary Table" color="yellow">
        <CodeBlock code={`-- Temp table: auto-drop saat session berakhir
CREATE TEMP TABLE staging_imports (
  raw_line    TEXT,
  parsed_at   TIMESTAMPTZ DEFAULT now()
);

-- Temp table dengan ON COMMIT behavior
CREATE TEMP TABLE batch_results (
  id     SERIAL,
  result JSONB
) ON COMMIT DELETE ROWS;   -- hapus rows setelah commit (tapi tabel tetap ada)
-- ON COMMIT DROP           -- drop tabel setelah commit
-- ON COMMIT PRESERVE ROWS  -- default: pertahankan rows

-- Use case: intermediate step dalam complex ETL
BEGIN;
  CREATE TEMP TABLE tmp_dedup AS
    SELECT DISTINCT ON (email) * FROM raw_users ORDER BY email, created_at DESC;

  INSERT INTO users SELECT * FROM tmp_dedup
  ON CONFLICT (email) DO NOTHING;
COMMIT;
-- tmp_dedup di-drop otomatis jika pakai ON COMMIT DROP`} />
      </Section>

      <Section title="⚡ Unlogged Table" color="orange">
        <CodeBlock code={`-- Unlogged: ~5-10x lebih cepat untuk write, tapi tidak crash-safe
CREATE UNLOGGED TABLE session_cache (
  session_id  TEXT PRIMARY KEY,
  user_id     BIGINT,
  data        JSONB,
  expires_at  TIMESTAMPTZ
);

-- Juga bisa untuk queue yang bisa di-rebuild
CREATE UNLOGGED TABLE job_queue (
  id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  job_type    TEXT NOT NULL,
  payload     JSONB NOT NULL,
  status      TEXT DEFAULT 'pending',
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- Konversi ke/dari logged (PG 15+)
ALTER TABLE session_cache SET LOGGED;    -- jadikan permanent
ALTER TABLE session_cache SET UNLOGGED;  -- jadikan unlogged

-- WARNING: Setelah crash/restart, unlogged table akan di-truncate otomatis!`} />
      </Section>

      <Section title="👁️ View & Materialized View" color="purple">
        <CodeBlock code={`-- Regular View: virtual, re-executed setiap query
CREATE VIEW active_orders AS
  SELECT o.*, c.name AS customer_name, c.email
  FROM orders o
  JOIN customers c ON c.id = o.customer_id
  WHERE o.status NOT IN ('cancelled', 'refunded');

-- Gunakan seperti tabel biasa
SELECT * FROM active_orders WHERE customer_name ILIKE '%bob%';

-- Updatable view (jika simple enough)
CREATE VIEW my_orders AS
  SELECT * FROM orders WHERE customer_id = current_user_id();

-- MATERIALIZED VIEW: simpan hasil query ke disk
CREATE MATERIALIZED VIEW daily_revenue AS
  SELECT
    DATE_TRUNC('day', created_at)::DATE AS day,
    COUNT(*)                            AS order_count,
    SUM(total_amount)                   AS revenue
  FROM orders
  WHERE status = 'delivered'
  GROUP BY 1
  ORDER BY 1;

-- Index pada materialized view (seperti tabel biasa)
CREATE INDEX idx_daily_revenue_day ON daily_revenue (day);

-- Refresh: update data
REFRESH MATERIALIZED VIEW daily_revenue;                    -- locks view
REFRESH MATERIALIZED VIEW CONCURRENTLY daily_revenue;      -- no lock (butuh UNIQUE index)

-- Jadwalkan refresh dengan pg_cron atau cron job:
-- SELECT cron.schedule('refresh-revenue', '0 1 * * *',
--   'REFRESH MATERIALIZED VIEW CONCURRENTLY daily_revenue');`} />
      </Section>

      <Section title="🔗 Foreign Table (FDW)" color="green">
        <CodeBlock code={`-- Foreign Data Wrapper: query data dari DB eksternal
CREATE EXTENSION postgres_fdw;

-- Definisikan server eksternal
CREATE SERVER legacy_db
  FOREIGN DATA WRAPPER postgres_fdw
  OPTIONS (host 'legacy.internal', port '5432', dbname 'oldapp');

-- Mapping credentials
CREATE USER MAPPING FOR current_user
  SERVER legacy_db
  OPTIONS (user 'readonly', password 'secret');

-- Import tabel dari remote (PG 9.5+)
IMPORT FOREIGN SCHEMA public
  LIMIT TO (legacy_customers, legacy_orders)
  FROM SERVER legacy_db
  INTO legacy_schema;

-- Atau definisikan manual
CREATE FOREIGN TABLE legacy_schema.old_users (
  id       INTEGER,
  username TEXT,
  email    TEXT
) SERVER legacy_db OPTIONS (schema_name 'public', table_name 'users');

-- Query seperti tabel biasa
SELECT * FROM legacy_schema.old_users WHERE email LIKE '%@gmail.com';

-- FDW lain yang populer:
-- file_fdw    → baca dari CSV file
-- redis_fdw   → query Redis
-- mysql_fdw   → query MySQL
-- oracle_fdw  → query Oracle`} />
      </Section>
    </div>
  )
}

function TabBestPractice() {
  const [activeFilter, setActiveFilter] = useState('all')

  const practices = [
    { category: 'numeric', icon: '🔢', title: 'Gunakan BIGINT untuk ID', desc: 'Mulai dengan BIGINT (atau BIGSERIAL) untuk primary key. SERIAL/INTEGER bisa overflow di tabel yang tumbuh cepat. Migration dari INT ke BIGINT di produksi sangat mahal.', severity: 'critical' },
    { category: 'numeric', icon: '💰', title: 'NUMERIC untuk nilai keuangan', desc: 'Jangan pernah pakai FLOAT/REAL untuk currency. Pakai NUMERIC(15,2) atau sesuai presisi kebutuhan. Floating-point arithmetic tidak exact.', severity: 'critical' },
    { category: 'string', icon: '📝', title: 'TEXT > VARCHAR tanpa constraint', desc: 'Di PostgreSQL, TEXT dan VARCHAR punya performa yang sama. Pakai VARCHAR(n) hanya jika memang perlu enforce batas panjang di DB level.', severity: 'tip' },
    { category: 'string', icon: '🔍', title: 'Hindari CHAR(n)', desc: 'CHAR(n) selalu padding dengan spasi sampai n karakter. Ini memboroskan storage dan sering menyebabkan bug perbandingan string. Hanya pakai untuk fixed-length codes (IATA, ISO country code).', severity: 'warning' },
    { category: 'datetime', icon: '⏰', title: 'Selalu TIMESTAMPTZ, bukan TIMESTAMP', desc: 'TIMESTAMP tidak menyimpan timezone info. Saat server pindah TZ atau app diakses dari berbagai timezone, data bisa jadi ambigu. TIMESTAMPTZ store UTC, display per session TZ.', severity: 'critical' },
    { category: 'datetime', icon: '📅', title: 'DATE untuk tanggal murni', desc: 'Jika hanya butuh tanggal (tanpa jam), pakai DATE bukan TIMESTAMP. Lebih jelas, lebih hemat storage, dan menghindari timezone confusion.', severity: 'tip' },
    { category: 'special', icon: '🆔', title: 'UUID v7 untuk distributed ID', desc: 'UUID v4 adalah random — tidak baik untuk B-tree index karena menyebabkan page splits. UUID v7 (time-ordered) jauh lebih baik untuk indexing. Tersedia di PG 17+ via gen_random_uuid() untuk v4, atau extension untuk v7.', severity: 'tip' },
    { category: 'special', icon: '📦', title: 'JSONB bukan JSON', desc: 'JSONB disimpan sebagai binary (parsed), mendukung GIN index, dan punya operator lebih kaya. JSON hanya berguna jika Anda butuh preserve key order atau duplicate keys (edge case sangat jarang).', severity: 'warning' },
    { category: 'special', icon: '✅', title: 'BOOLEAN, bukan INTEGER 0/1', desc: 'Gunakan BOOLEAN untuk flag. Lebih ekspresif, storage sama (1 byte), dan query lebih readable: WHERE is_active bukan WHERE is_active = 1.', severity: 'tip' },
    { category: 'table', icon: '⚡', title: 'Unlogged untuk ephemeral data saja', desc: 'Unlogged table 5-10x lebih cepat tapi data hilang saat crash. Aman untuk: session cache, queue yang bisa di-rebuild, temp computation. JANGAN untuk data yang tidak bisa di-recover.', severity: 'critical' },
    { category: 'table', icon: '📸', title: 'Refresh Materialized View secara berkala', desc: 'Materialized view stale sampai di-REFRESH. Jadwalkan refresh dengan pg_cron atau trigger. Gunakan CONCURRENTLY jika tabel besar untuk menghindari lock.', severity: 'warning' },
    { category: 'table', icon: '🗂️', title: 'Partisi tabel > 100M rows', desc: 'Tabel besar tanpa partisi membuat VACUUM, backup, dan drop-old-data sangat lambat. Partisi berdasarkan waktu (RANGE) untuk time-series, atau HASH untuk distribusi merata.', severity: 'warning' },
    { category: 'general', icon: '🛡️', title: 'Selalu set NOT NULL jika data wajib ada', desc: 'NULL adalah "unknown" bukan "empty". NULL-handling dalam query lebih rumit. Jika kolom selalu punya nilai, enforce NOT NULL + DEFAULT.', severity: 'tip' },
    { category: 'general', icon: '🏷️', title: 'Pakai ENUM untuk nilai yang fixed', desc: 'ENUM lebih hemat storage dari TEXT dan self-documenting. Tapi perlu `ALTER TYPE ... ADD VALUE` untuk menambah nilai — tidak bisa insert di tengah tanpa workaround.', severity: 'tip' },
  ]

  const severityColor = { critical: '#f87171', warning: '#fbbf24', tip: '#4ade80' }
  const severityLabel = { critical: '🔴 Critical', warning: '🟡 Warning', tip: '🟢 Tip' }
  const categories = ['all', 'numeric', 'string', 'datetime', 'special', 'table', 'general']

  const filtered = activeFilter === 'all' ? practices : practices.filter(p => p.category === activeFilter)

  return (
    <div style={{ animation: 'float-up 0.5s ease-out' }}>
      <Section title="✅ Best Practices: Data Type & Table Selection" color="blue">
        {/* Filter */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              style={{
                background: activeFilter === cat ? 'rgba(100,200,255,0.2)' : 'transparent',
                border: `1px solid ${activeFilter === cat ? 'rgba(100,200,255,0.5)' : 'rgba(100,200,255,0.2)'}`,
                color: activeFilter === cat ? '#64c8ff' : '#708090',
                borderRadius: '20px', padding: '4px 14px', cursor: 'pointer', fontSize: '15px', fontWeight: 'bold',
                textTransform: 'capitalize',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '10px' }}>
          {filtered.map(({ icon, title, desc, severity }) => (
            <div key={title} style={{
              background: `${severityColor[severity]}08`,
              border: `1px solid ${severityColor[severity]}33`,
              borderLeft: `3px solid ${severityColor[severity]}`,
              borderRadius: '8px', padding: '12px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ color: '#e0f2ff', fontWeight: 'bold', fontSize: '16px' }}>{icon} {title}</span>
                <span style={{ color: severityColor[severity], fontSize: '14px', fontWeight: 'bold' }}>{severityLabel[severity]}</span>
              </div>
              <p style={{ color: '#a0c8ff', fontSize: '15px', lineHeight: 1.6, margin: 0 }}>{desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="⚖️ Quick Reference: Pilih Tipe yang Tepat" color="green">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '10px' }}>
          {[
            { q: 'ID / Primary Key', a: 'BIGINT GENERATED ALWAYS AS IDENTITY atau UUID', color: '#64c8ff' },
            { q: 'Nilai uang / currency', a: 'NUMERIC(15, 2)', color: '#4ade80' },
            { q: 'Counter, views, likes', a: 'INTEGER atau BIGINT', color: '#64c8ff' },
            { q: 'Persentase, rating 0–100', a: 'NUMERIC(5, 2)', color: '#64c8ff' },
            { q: 'Nama, email, username', a: 'TEXT atau VARCHAR(n)', color: '#4ade80' },
            { q: 'Konten panjang / bio', a: 'TEXT', color: '#4ade80' },
            { q: 'Kode tetap (country code)', a: 'CHAR(2)', color: '#fbbf24' },
            { q: 'Tanggal saja (tanpa jam)', a: 'DATE', color: '#fbbf24' },
            { q: 'Timestamp dengan timezone', a: 'TIMESTAMPTZ', color: '#fbbf24' },
            { q: 'Durasi / selisih waktu', a: 'INTERVAL', color: '#fbbf24' },
            { q: 'Flag / toggle / aktif', a: 'BOOLEAN NOT NULL DEFAULT FALSE', color: '#a78bfa' },
            { q: 'Status terbatas (enum-like)', a: 'CREATE TYPE ... AS ENUM', color: '#a78bfa' },
            { q: 'Metadata fleksibel / config', a: 'JSONB', color: '#f87171' },
            { q: 'Tags / list nilai', a: 'TEXT[] atau JSONB array', color: '#f87171' },
            { q: 'IP address / network', a: 'INET atau CIDR', color: '#f97316' },
            { q: 'Rentang waktu / booking', a: 'TSTZRANGE', color: '#f97316' },
          ].map(({ q, a, color }) => (
            <div key={q} style={{ display: 'flex', flexDirection: 'column', gap: '2px', padding: '8px', background: 'rgba(26,35,50,0.6)', borderRadius: '6px' }}>
              <span style={{ color: '#708090', fontSize: '15px' }}>Untuk: {q}</span>
              <span style={{ color, fontWeight: 'bold', fontSize: '16px', fontFamily: 'monospace' }}>→ {a}</span>
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

function RdbmsTypes() {
  const [activeTab, setActiveTab] = useState('overview')

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':      return <TabOverview />
      case 'numeric':       return <TabNumeric />
      case 'string':        return <TabString />
      case 'datetime':      return <TabDatetime />
      case 'special':       return <TabSpecial />
      case 'table-types':   return <TabTableTypes />
      case 'best-practice': return <TabBestPractice />
      default:              return <TabOverview />
    }
  }

  return (
    <div style={{ minHeight: '100vh', padding: '32px 16px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px', animation: 'float-up 0.5s ease-out' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
            <span style={{ fontSize: '48px' }}>🗂️</span>
            <div>
              <h1 style={{ color: '#e0f2ff', fontSize: '28px', fontWeight: 'bold', margin: 0 }}>
                RDBMS Data Types & Table Types
              </h1>
              <p style={{ color: '#a0c8ff', fontSize: '18px', margin: '4px 0 0' }}>
                Choosing the right data types and table structures in PostgreSQL
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {['Data Types', 'Table Types', 'JSONB', 'Partitioning', 'Views', 'PostgreSQL', 'Intermediate'].map(tag => (
              <Badge key={tag} text={tag} color={tag === 'Intermediate' ? '#fbbf24' : '#64c8ff'} />
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '24px', borderBottom: '1px solid rgba(100,200,255,0.15)', paddingBottom: '12px' }}>
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: activeTab === tab.id ? 'rgba(100,200,255,0.15)' : 'transparent',
                border: activeTab === tab.id ? '1px solid rgba(100,200,255,0.4)' : '1px solid transparent',
                borderRadius: '8px',
                color: activeTab === tab.id ? '#64c8ff' : '#708090',
                padding: '8px 14px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: activeTab === tab.id ? 'bold' : 'normal',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
              onMouseEnter={e => { if (activeTab !== tab.id) e.currentTarget.style.color = '#a0c8ff' }}
              onMouseLeave={e => { if (activeTab !== tab.id) e.currentTarget.style.color = '#708090' }}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {renderContent()}
      </div>
    </div>
  )
}

export default RdbmsTypes
