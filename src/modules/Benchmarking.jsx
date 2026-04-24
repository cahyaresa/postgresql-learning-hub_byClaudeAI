import React, { useState } from 'react'

const tabs = [
  { id: 'intro',     label: '📖 Intro',           desc: 'Apa itu benchmarking & kapan dipakai' },
  { id: 'pgbench',   label: '⚡ pgbench',          desc: 'Tool bawaan PostgreSQL untuk benchmark' },
  { id: 'custom',    label: '🔧 Custom Script',    desc: 'Benchmark query & workload sendiri' },
  { id: 'explain',   label: '🔍 EXPLAIN ANALYZE',  desc: 'Membaca query plan & eksekusi' },
  { id: 'report',    label: '📊 Membaca Laporan',  desc: 'Interpretasi TPS, latency, buffer stats' },
  { id: 'stats',     label: '📈 pg_stat Views',    desc: 'Monitoring statistik live dari PostgreSQL' },
  { id: 'checklist', label: '✅ Checklist',         desc: 'Best practice & hal yang wajib dicek' },
]

const Block = ({ title, color = '#64c8ff', children }) => (
  <div style={{ background: `${color}0d`, border: `1px solid ${color}33`, borderRadius: '8px', padding: '14px 16px', marginBottom: '14px' }}>
    <p style={{ color, fontWeight: 'bold', fontSize: '16px', marginBottom: '10px' }}>{title}</p>
    {children}
  </div>
)

const Code = ({ children, color = '#a0c8ff' }) => (
  <pre style={{ background: 'rgba(0,0,0,0.35)', padding: '12px', borderRadius: '6px', fontFamily: 'monospace', fontSize: '15px', color, overflow: 'auto', lineHeight: '1.85', margin: 0 }}>
    {children}
  </pre>
)

const Note = ({ children }) => (
  <p style={{ color: '#708090', fontSize: '15px', marginTop: '8px', lineHeight: '1.7' }}>{children}</p>
)

const Badge = ({ children, color }) => (
  <span style={{ background: `${color}20`, border: `1px solid ${color}50`, color, fontSize: '14px', padding: '2px 8px', borderRadius: '4px', fontWeight: '600', marginRight: '6px' }}>
    {children}
  </span>
)

const MetricCard = ({ label, value, unit, color, desc }) => (
  <div style={{ background: `${color}0d`, border: `1px solid ${color}30`, borderRadius: '8px', padding: '14px', textAlign: 'center' }}>
    <p style={{ color: '#708090', fontSize: '14px', marginBottom: '4px' }}>{label}</p>
    <p style={{ color, fontWeight: 'bold', fontSize: '26px', margin: '0 0 2px 0' }}>{value}</p>
    <p style={{ color: `${color}99`, fontSize: '14px', marginBottom: '6px' }}>{unit}</p>
    <p style={{ color: '#708090', fontSize: '14px', lineHeight: '1.5', margin: 0 }}>{desc}</p>
  </div>
)

// ─── TAB CONTENTS ──────────────────────────────────────────────────────────────

const Intro = () => (
  <div>
    <h3 style={{ color: '#64c8ff', fontWeight: 'bold', fontSize: '20px', marginBottom: '16px' }}>
      Benchmarking PostgreSQL — Mengukur Performa Database
    </h3>

    <div style={{ background: 'rgba(100,200,255,0.05)', border: '1px solid rgba(100,200,255,0.2)', borderRadius: '10px', padding: '16px', marginBottom: '16px' }}>
      <p style={{ color: '#64c8ff', fontWeight: 'bold', fontSize: '16px', marginBottom: '8px' }}>Apa itu Benchmarking?</p>
      <p style={{ color: '#a0c8ff', fontSize: '16px', lineHeight: '1.8' }}>
        Benchmarking adalah proses mengukur performa sistem database secara kuantitatif — berapa banyak transaksi yang bisa diproses per detik, seberapa cepat query berjalan, dan di mana bottleneck-nya. Hasilnya dipakai untuk membandingkan konfigurasi, hardware, atau versi database.
      </p>
    </div>

    <Block title="Kapan Harus Benchmarking?" color="#4ade80">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
        {[
          { icon: '🔧', title: 'Tuning Konfigurasi', desc: 'Sebelum & sesudah mengubah shared_buffers, work_mem, dll.' },
          { icon: '💻', title: 'Ganti Hardware', desc: 'Bandingkan performa SSD vs NVMe, atau RAM yang lebih besar.' },
          { icon: '📦', title: 'Upgrade Versi', desc: 'Pastikan PostgreSQL versi baru benar-benar lebih cepat untuk workload kamu.' },
          { icon: '🗂️', title: 'Desain Schema', desc: 'Bandingkan strategi indexing atau partitioning yang berbeda.' },
          { icon: '🚀', title: 'Sebelum Production', desc: 'Validasi bahwa sistem mampu menangani peak load sebelum go-live.' },
          { icon: '🔍', title: 'Investigasi Regresi', desc: 'Query tiba-tiba lambat — cari tahu kenapa dengan data kuantitatif.' },
        ].map((item, i) => (
          <div key={i} style={{ background: 'rgba(74,222,128,0.05)', border: '1px solid rgba(74,222,128,0.2)', borderRadius: '6px', padding: '10px' }}>
            <p style={{ fontSize: '22px', marginBottom: '4px' }}>{item.icon}</p>
            <p style={{ color: '#4ade80', fontWeight: 'bold', fontSize: '15px', marginBottom: '4px' }}>{item.title}</p>
            <p style={{ color: '#708090', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>{item.desc}</p>
          </div>
        ))}
      </div>
    </Block>

    <Block title="Tools yang Dipakai" color="#a78bfa">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginBottom: '10px' }}>
        {[
          { name: 'pgbench', color: '#64c8ff', type: 'Built-in', desc: 'Tool resmi bawaan PostgreSQL. Benchmark TPC-B style, support custom SQL script.' },
          { name: 'EXPLAIN ANALYZE', color: '#4ade80', type: 'Built-in', desc: 'Analisis mendalam satu query: node plan, actual time, buffer hit/miss, rows.' },
          { name: 'pg_stat_*', color: '#fbbf24', type: 'Built-in', desc: 'System views bawaan untuk monitoring cache, I/O, query, dan lock secara live.' },
          { name: 'pg_activity / pgTop', color: '#f87171', type: 'External', desc: 'htop versi PostgreSQL — monitor query live, lock, bloat, vacuuming.' },
          { name: 'hypopg', color: '#a78bfa', type: 'Extension', desc: 'Simulasikan "hypothetical index" tanpa benar-benar membuat index, lalu cek EXPLAIN.' },
        ].map((tool, i) => (
          <div key={i} style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', padding: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <p style={{ color: tool.color, fontWeight: 'bold', fontSize: '16px', margin: 0 }}>{tool.name}</p>
              <Badge color={tool.type === 'Built-in' ? '#4ade80' : tool.type === 'Extension' ? '#a78bfa' : '#fbbf24'}>{tool.type}</Badge>
            </div>
            <p style={{ color: '#708090', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>{tool.desc}</p>
          </div>
        ))}
      </div>
    </Block>

    <Block title="Metrik Utama yang Diukur" color="#fbbf24">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '10px' }}>
        {[
          { label: 'TPS', title: 'Transactions Per Second', color: '#64c8ff', desc: 'Throughput sistem — berapa transaksi yang selesai tiap detik.' },
          { label: 'Latency', title: 'Response Time', color: '#4ade80', desc: 'Berapa lama satu request selesai (avg, p95, p99).' },
          { label: 'Buffer Hit %', title: 'Cache Hit Ratio', color: '#fbbf24', desc: 'Persentase page yang dilayani dari RAM vs harus baca disk.' },
          { label: 'I/O Wait', title: 'Disk I/O', color: '#f87171', desc: 'Waktu tunggu karena baca/tulis disk — bottleneck paling umum.' },
          { label: 'Plan Time', title: 'Planning Time', color: '#a78bfa', desc: 'Waktu planner memilih strategi eksekusi query.' },
          { label: 'Exec Time', title: 'Execution Time', color: '#e879f9', desc: 'Waktu executor benar-benar menjalankan query di plan.' },
        ].map((m, i) => (
          <div key={i} style={{ background: `${m.color}0d`, border: `1px solid ${m.color}30`, borderRadius: '6px', padding: '10px' }}>
            <p style={{ color: m.color, fontWeight: 'bold', fontSize: '18px', marginBottom: '2px' }}>{m.label}</p>
            <p style={{ color: '#a0c8ff', fontSize: '14px', fontWeight: '500', marginBottom: '4px' }}>{m.title}</p>
            <p style={{ color: '#708090', fontSize: '14px', lineHeight: '1.5', margin: 0 }}>{m.desc}</p>
          </div>
        ))}
      </div>
    </Block>

    <Block title="Golden Rules Benchmarking" color="#f87171">
      <Code color="#fca5a5">
{`-- 1. Selalu warm up dulu sebelum ukur
--    Cold cache menghasilkan angka yang tidak representatif untuk production
--    Jalankan benchmark beberapa kali, buang hasil pertama

-- 2. Isolasi variabel
--    Ubah SATU hal saja per sesi benchmark, lalu bandingkan
--    Contoh: hanya ubah shared_buffers, jangan barengan ubah work_mem juga

-- 3. Gunakan data yang realistis
--    Benchmark dengan 1000 baris hasilnya beda jauh dengan 100 juta baris
--    Gunakan volume data sesuai production (atau scale yang proporsional)

-- 4. Ukur di kondisi yang sama dengan production
--    Sama OS, sama hardware, sama PostgreSQL version, sama konfigurasi
--    Hindari benchmark di laptop developer untuk keputusan production

-- 5. Perhatikan unit & satuan
--    TPS tinggi bukan selalu baik jika latency juga naik
--    Selalu cek latency p95/p99, bukan hanya rata-rata

-- 6. Jalankan cukup lama
--    Minimal 60 detik untuk steady state, lebih baik 300 detik
--    Checkpoint & autovacuum bisa mempengaruhi angka jangka pendek`}
      </Code>
    </Block>
  </div>
)

const Pgbench = () => (
  <div>
    <h3 style={{ color: '#64c8ff', fontWeight: 'bold', fontSize: '20px', marginBottom: '4px' }}>pgbench — Benchmark Bawaan PostgreSQL</h3>
    <p style={{ color: '#708090', fontSize: '16px', marginBottom: '16px' }}>pgbench adalah tool resmi PostgreSQL yang mengimplementasikan benchmark TPC-B style. Sudah termasuk dalam instalasi PostgreSQL standar.</p>

    <Block title="Inisialisasi — Buat Database & Tabel Benchmark" color="#64c8ff">
      <Code>
{`-- Buat database khusus benchmark
createdb benchdb

-- Inisialisasi schema pgbench (skala 1 = ~100.000 baris di pgbench_accounts)
pgbench -i benchdb

-- Scale factor lebih besar (rekomendasi: setara data production)
-- scale 10  → ~1 juta baris  (~150 MB)
-- scale 100 → ~10 juta baris (~1.5 GB)
pgbench -i -s 10  benchdb
pgbench -i -s 100 benchdb

-- Gunakan tablespace tertentu (jika ingin test SSD vs HDD)
pgbench -i -s 50 --tablespace=fast_ssd benchdb

-- Tabel yang dibuat pgbench:
-- pgbench_accounts  (account_id, bid, abalance, filler)   ← tabel besar
-- pgbench_branches  (bid, bbalance, filler)
-- pgbench_tellers   (tid, bid, tbalance, filler)
-- pgbench_history   (tid, bid, aid, delta, mtime, filler)

-- Tambahkan index (opsional, mirip kondisi production)
pgbench -i -s 50 --index-tablespace=fast_ssd benchdb`}
      </Code>
    </Block>

    <Block title="Menjalankan Benchmark — Opsi Dasar" color="#4ade80">
      <Code>
{`-- Benchmark dasar: 10 client, 5 thread, selama 60 detik
pgbench -c 10 -j 5 -T 60 benchdb

-- Benchmark dengan jumlah transaksi fixed (bukan durasi)
pgbench -c 10 -j 5 -t 1000 benchdb   -- 1000 transaksi per client

-- Penjelasan flag penting:
-- -c N   : jumlah client (koneksi serentak) → simulasi concurrency
-- -j N   : jumlah thread worker pgbench (set = jumlah core CPU, maksimal = -c)
-- -T N   : durasi dalam detik (gunakan ini untuk steady-state measurement)
-- -t N   : transaksi per client (alternatif -T)
-- -s N   : scale factor (harus sama dengan saat -i)
-- -r     : report latency per statement (detail per query)
-- -P N   : print progress setiap N detik (real-time monitoring)
-- --no-vacuum : skip vacuum sebelum benchmark dimulai

-- Benchmark dengan progress report tiap 10 detik
pgbench -c 20 -j 10 -T 120 -P 10 benchdb

-- Benchmark hanya SELECT (read-only, cocok untuk replica test)
pgbench -c 10 -j 5 -T 60 -S benchdb   -- -S = SELECT only

-- Benchmark dengan latency detail per statement
pgbench -c 10 -j 5 -T 60 -r benchdb`}
      </Code>
      <Note>Mulai dari -c kecil (5-10) lalu naikkan bertahap. Jika TPS tidak naik saat -c naik, kamu sudah menyentuh batas server.</Note>
    </Block>

    <Block title="Benchmark dengan Custom SQL Script" color="#fbbf24">
      <Code>
{`-- Buat file: bench_read.sql
-- pgbench akan random pilih account_id dari 1 sampai scale*100000
\set aid random(1, 100000 * :scale)
SELECT abalance FROM pgbench_accounts WHERE aid = :aid;

-- Jalankan dengan custom script
pgbench -c 10 -j 5 -T 60 -f bench_read.sql benchdb

-- Custom script campuran read/write (simulasi OLTP realistis)
-- Simpan sebagai: bench_oltp.sql
\set aid  random(1, 100000 * :scale)
\set bid  random(1, 1 * :scale)
\set tid  random(1, 10 * :scale)
\set delta random(-5000, 5000)
BEGIN;
UPDATE pgbench_accounts SET abalance = abalance + :delta WHERE aid = :aid;
SELECT abalance FROM pgbench_accounts WHERE aid = :aid;
UPDATE pgbench_tellers  SET tbalance = tbalance + :delta WHERE tid = :tid;
UPDATE pgbench_branches SET bbalance = bbalance + :delta WHERE bid = :bid;
INSERT INTO pgbench_history (tid, bid, aid, delta, mtime)
  VALUES (:tid, :bid, :aid, :delta, CURRENT_TIMESTAMP);
END;

-- Jalankan:
pgbench -c 20 -j 10 -T 120 -f bench_oltp.sql benchdb

-- Mix: 80% read, 20% write (gunakan weight)
pgbench -c 20 -j 10 -T 120 \\
  -f bench_read.sql@8 \\
  -f bench_oltp.sql@2 \\
  benchdb`}
      </Code>
    </Block>

    <Block title="Variabel & Fungsi dalam pgbench Script" color="#a78bfa">
      <Code>
{`-- Variabel built-in pgbench:
-- :scale        → scale factor yang dipakai saat init
-- :client_id    → ID client (0 sampai -c-1)
-- :random_seed  → seed acak sesi ini

-- Fungsi random:
\set x random(1, 100)                     -- uniform random antara 1-100
\set x random_gaussian(1, 100000, 2.5)   -- gaussian distribution
\set x random_exponential(1, 100000, 3.0) -- exponential distribution (hotspot)

-- Operasi string & aritmatika:
\set user_id random(1, 10000)
\set status   random(0, 1)
SELECT id, name FROM users WHERE id = :user_id AND active = :status::bool;

-- Sleep (simulasi think time antar request)
\sleep 100ms      -- sleep 100 milidetik
\sleep 1s         -- sleep 1 detik

-- Kondisional:
\if :client_id % 2 = 0
  SELECT 'even client';
\else
  SELECT 'odd client';
\endif`}
      </Code>
    </Block>

    <Block title="Benchmark Latency Bertahap — Ramp-up Test" color="#f87171">
      <Code>
{`#!/bin/bash
# Script bash: naikkan concurrency bertahap, rekam TPS & latency

DB="benchdb"
DURATION=60
THREADS=8

echo "clients,tps,avg_latency_ms,stddev_latency_ms" > benchmark_results.csv

for CLIENTS in 1 2 4 8 16 32 64 128; do
  echo "Running with $CLIENTS clients..."
  RESULT=$(pgbench -c $CLIENTS -j $THREADS -T $DURATION -S $DB 2>&1)

  TPS=$(echo "$RESULT"         | grep "^tps" | head -1 | awk '{print $3}' | tr -d '(')
  LATENCY=$(echo "$RESULT"     | grep "latency average" | awk '{print $3}')
  STDDEV=$(echo "$RESULT"      | grep "latency stddev"  | awk '{print $3}')

  echo "$CLIENTS,$TPS,$LATENCY,$STDDEV" >> benchmark_results.csv
  echo "  → TPS: $TPS | Avg Latency: ${'${LATENCY}'}ms | Stddev: ${'${STDDEV}'}ms"
done

echo ""
echo "Results saved to benchmark_results.csv"`}
      </Code>
    </Block>
  </div>
)

const CustomScript = () => (
  <div>
    <h3 style={{ color: '#fbbf24', fontWeight: 'bold', fontSize: '20px', marginBottom: '16px' }}>Custom Benchmark — Query & Workload Sendiri</h3>

    <Block title="Benchmark Query Spesifik dengan psql + timing" color="#fbbf24">
      <Code>
{`-- Aktifkan timing di psql
\timing on

-- Jalankan query yang ingin diukur
SELECT e.name, d.name AS dept, SUM(s.amount) AS total
FROM employees e
JOIN departments d ON e.dept_id = d.id
JOIN sales s ON s.employee_id = e.id
WHERE s.sale_date >= '2025-01-01'
GROUP BY e.name, d.name
ORDER BY total DESC
LIMIT 20;

-- Output: Time: 234.567 ms

-- Benchmark manual: jalankan 100x dan lihat variasi
-- Gunakan generate_series sebagai loop
DO $$
DECLARE
  i   INT;
  t   TIMESTAMPTZ;
  dur INTERVAL;
  total_ms NUMERIC := 0;
  min_ms   NUMERIC := 9999999;
  max_ms   NUMERIC := 0;
BEGIN
  FOR i IN 1..100 LOOP
    t := clock_timestamp();

    PERFORM COUNT(*) FROM employees
    WHERE department = 'Engineering' AND salary > 5000000;

    dur := clock_timestamp() - t;
    total_ms := total_ms + EXTRACT(MILLISECOND FROM dur) + EXTRACT(SECOND FROM dur)*1000;
    IF EXTRACT(MILLISECOND FROM dur) < min_ms THEN min_ms := EXTRACT(MILLISECOND FROM dur); END IF;
    IF EXTRACT(MILLISECOND FROM dur) > max_ms THEN max_ms := EXTRACT(MILLISECOND FROM dur); END IF;
  END LOOP;

  RAISE NOTICE 'Avg: % ms | Min: % ms | Max: % ms', ROUND(total_ms/100, 3), min_ms, max_ms;
END;
$$;`}
      </Code>
    </Block>

    <Block title="Benchmark Sebelum vs Sesudah Index" color="#4ade80">
      <Code>
{`-- ── STEP 1: Ukur tanpa index ─────────────────────────────────
EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT)
SELECT * FROM orders
WHERE user_id = 12345 AND status = 'pending'
ORDER BY created_at DESC;

-- Catat: Execution Time, Buffers hit/read, Seq Scan rows

-- ── STEP 2: Buat index ───────────────────────────────────────
CREATE INDEX CONCURRENTLY idx_orders_user_status_date
  ON orders (user_id, status, created_at DESC);

-- Paksa PostgreSQL pakai statistik terbaru
ANALYZE orders;

-- ── STEP 3: Ukur dengan index ────────────────────────────────
EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT)
SELECT * FROM orders
WHERE user_id = 12345 AND status = 'pending'
ORDER BY created_at DESC;

-- Catat: Execution Time, Buffers hit/read, Index Scan rows

-- ── STEP 4: Bandingkan hasil ─────────────────────────────────
-- Contoh perbandingan:
-- Tanpa index: Seq Scan, cost=0..45000, actual time=2300ms, buffers read=5800
-- Dengan index: Index Scan, cost=0..8,  actual time=0.8ms,  buffers hit=4`}
      </Code>
    </Block>

    <Block title="Benchmark Partitioning vs Non-Partitioning" color="#a78bfa">
      <Code>
{`-- ── Setup: tabel biasa vs tabel terpartisi ───────────────────

-- Tabel biasa
CREATE TABLE orders_plain (
  id         BIGSERIAL PRIMARY KEY,
  user_id    BIGINT NOT NULL,
  amount     NUMERIC NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabel terpartisi per bulan
CREATE TABLE orders_partitioned (
  id         BIGSERIAL,
  user_id    BIGINT NOT NULL,
  amount     NUMERIC NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
) PARTITION BY RANGE (created_at);

CREATE TABLE orders_y2025m01 PARTITION OF orders_partitioned
  FOR VALUES FROM ('2025-01-01') TO ('2025-02-01');
CREATE TABLE orders_y2025m02 PARTITION OF orders_partitioned
  FOR VALUES FROM ('2025-02-01') TO ('2025-03-01');
-- dst...

-- Insert data test (10 juta baris)
INSERT INTO orders_plain (user_id, amount, created_at)
SELECT
  (random()*100000)::INT,
  (random()*1000000)::NUMERIC(12,2),
  NOW() - (random()*365)::INT * INTERVAL '1 day'
FROM generate_series(1, 10000000);

INSERT INTO orders_partitioned SELECT * FROM orders_plain;

-- Benchmark query rentang waktu:
\timing on

-- Tabel biasa (harus scan semua)
SELECT COUNT(*), SUM(amount) FROM orders_plain
WHERE created_at BETWEEN '2025-01-01' AND '2025-01-31';

-- Tabel partisi (partition pruning: hanya scan 1 partisi)
SELECT COUNT(*), SUM(amount) FROM orders_partitioned
WHERE created_at BETWEEN '2025-01-01' AND '2025-01-31';`}
      </Code>
    </Block>

    <Block title="Benchmark Connection Pooling (pgBouncer)" color="#38bdf8">
      <Code>
{`-- ── Tanpa pgBouncer: koneksi langsung ke PostgreSQL ──────────
pgbench -h localhost -p 5432 -c 100 -j 10 -T 60 -S benchdb
-- Masalah: 100 koneksi PostgreSQL → banyak memory & context switch overhead

-- ── Dengan pgBouncer (mode transaction pooling) ───────────────
pgbench -h localhost -p 6432 -c 100 -j 10 -T 60 -S benchdb
-- pgBouncer hanya buka misal 20 koneksi ke PostgreSQL
-- Client ke pgBouncer: 100 | PostgreSQL connections: 20

-- Bandingkan TPS & latency:
-- Tanpa pgBouncer (100 clients):  TPS ~8.000  | avg latency ~12ms
-- Dengan pgBouncer (100 clients): TPS ~22.000 | avg latency ~4ms

-- Cek koneksi aktif di PostgreSQL:
SELECT count(*), state
FROM pg_stat_activity
WHERE datname = 'benchdb'
GROUP BY state;

-- Cek stats pgBouncer (via psql ke port pgBouncer):
SHOW STATS;
SHOW POOLS;
SHOW CLIENTS;
SHOW SERVERS;`}
      </Code>
    </Block>
  </div>
)

const ExplainAnalyze = () => (
  <div>
    <h3 style={{ color: '#4ade80', fontWeight: 'bold', fontSize: '20px', marginBottom: '16px' }}>EXPLAIN ANALYZE — Membaca Query Plan</h3>

    <Block title="Sintaks EXPLAIN dan Opsi-Opsinya" color="#4ade80">
      <Code>
{`-- Hanya lihat plan (TIDAK eksekusi query)
EXPLAIN SELECT * FROM employees WHERE department = 'Engineering';

-- Jalankan query DAN tampilkan plan + waktu aktual
EXPLAIN ANALYZE SELECT * FROM employees WHERE department = 'Engineering';

-- Semua opsi sekaligus (paling informatif)
EXPLAIN (
  ANALYZE,    -- eksekusi nyata (actual time, rows)
  BUFFERS,    -- buffer cache hit/miss
  WAL,        -- WAL records yang dihasilkan (untuk write)
  TIMING,     -- waktu per node (default ON jika ANALYZE)
  FORMAT TEXT -- format output: TEXT (default) | JSON | YAML | XML
)
SELECT e.name, d.name AS dept, SUM(s.amount)
FROM employees e
JOIN departments d ON e.dept_id = d.id
JOIN sales s ON s.employee_id = e.id
WHERE s.sale_date >= '2025-01-01'
GROUP BY e.name, d.name
ORDER BY 3 DESC;

-- JSON format (berguna untuk parsing / tools eksternal)
EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)
SELECT * FROM orders WHERE user_id = 42;`}
      </Code>
    </Block>

    <Block title="Anatomi Output EXPLAIN ANALYZE" color="#64c8ff">
      <Code color="#86efac">
{`Gather  (cost=1000.43..22542.91 rows=1000 width=68)
        (actual time=12.345..234.567 rows=987 loops=1)
  Workers Planned: 2
  Workers Launched: 2
  Buffers: shared hit=4823 read=1200
  ->  Parallel Hash Join  (cost=900.43..21442.91 rows=417 width=68)
                          (actual time=11.123..220.456 rows=329 loops=3)
        Hash Cond: (s.employee_id = e.id)
        Buffers: shared hit=4823 read=1200
        ->  Parallel Seq Scan on sales s
                  (cost=0..15000 rows=200000 width=20)
                  (actual time=0.05..98.321 rows=333333 loops=3)
              Filter: (sale_date >= '2025-01-01'::date)
              Rows Removed by Filter: 666667
              Buffers: shared hit=3200 read=1000
        ->  Hash  (cost=500..500 rows=32034 width=52)
                  (actual time=8.234..8.234 rows=32034 loops=1)
              Buckets: 65536  Batches: 1  Memory Usage: 3456kB
              Buffers: shared hit=1623 read=200
              ->  Seq Scan on employees e  (...)
Planning Time:  2.345 ms
Execution Time: 240.123 ms`}
      </Code>
    </Block>

    <Block title="Cara Membaca Setiap Bagian" color="#a78bfa">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
        {[
          {
            label: 'cost=X..Y',
            color: '#64c8ff',
            lines: [
              'X = startup cost (sebelum baris pertama)',
              'Y = total cost (semua baris selesai)',
              'Satuan: arbitrary "cost unit"',
              'Bukan milidetik! Dipakai planner untuk membandingkan rencana',
            ],
          },
          {
            label: 'actual time=X..Y',
            color: '#4ade80',
            lines: [
              'X = ms sampai baris pertama keluar',
              'Y = ms sampai semua baris selesai',
              'Ini waktu NYATA dalam milidetik',
              'Selisih besar antara cost vs actual → statistik perlu di-ANALYZE',
            ],
          },
          {
            label: 'rows=N (planned vs actual)',
            color: '#fbbf24',
            lines: [
              'rows= sebelum kurung = estimasi planner',
              'rows= dalam (actual...) = baris nyata',
              'Jika selisih > 10x → row estimate sangat meleset',
              'Akibat: planner pilih plan yang salah (mis: nested loop vs hash join)',
            ],
          },
          {
            label: 'loops=N',
            color: '#f87171',
            lines: [
              'Berapa kali node ini dieksekusi',
              'Khususnya di Parallel plans: actual time per loop',
              'Total = actual time × loops',
              'Jika loops=1000 → node dijalankan 1000 kali (nested loop!)',
            ],
          },
          {
            label: 'Buffers: shared hit=X read=Y',
            color: '#e879f9',
            lines: [
              'hit  = page dilayani dari Shared Buffers (RAM) ✅',
              'read = page dibaca dari disk ❌ (lambat)',
              'hit ratio = hit / (hit + read) → target > 99%',
              'read tinggi = butuh more RAM / bigger shared_buffers',
            ],
          },
          {
            label: 'Rows Removed by Filter: N',
            color: '#38bdf8',
            lines: [
              'Baris yang di-scan tapi dibuang oleh filter WHERE',
              'Nilai besar → index bisa membantu skip baris ini',
              'Filter artinya kondisi WHERE diterapkan SETELAH scan',
              'Index Cond artinya kondisi dipakai langsung di index lookup',
            ],
          },
        ].map((item, i) => (
          <div key={i} style={{ background: `${item.color}0d`, border: `1px solid ${item.color}30`, borderRadius: '6px', padding: '10px' }}>
            <p style={{ color: item.color, fontWeight: 'bold', fontSize: '15px', marginBottom: '6px', fontFamily: 'monospace' }}>{item.label}</p>
            {item.lines.map((line, j) => (
              <p key={j} style={{ color: '#a0c8ff', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>{line}</p>
            ))}
          </div>
        ))}
      </div>
    </Block>

    <Block title="Node Types — Kenali Strategi Eksekusi" color="#fbbf24">
      <Code>
{`-- ── SCAN NODES ───────────────────────────────────────────────

Seq Scan           → Full table scan, baca semua page dari disk/buffer
                     Wajar untuk tabel kecil atau query yang ambil >20% baris

Index Scan         → Pakai B-Tree index, baca heap page untuk ambil data
                     Baik untuk query selective (filter sedikit baris)

Index Only Scan    → Data ada di index, tidak perlu baca heap (paling cepat!)
                     Butuh: semua kolom di SELECT ada dalam index (covering index)
                     Butuh: VM (Visibility Map) menandai page sebagai all-visible

Bitmap Index Scan  → Buat bitset dari index, lalu baca heap page yang perlu
  + Bitmap Heap Scan  Efisien jika banyak baris yang cocok (medium selectivity)

-- ── JOIN NODES ────────────────────────────────────────────────

Nested Loop        → Untuk setiap baris dari sisi kiri, cari di sisi kanan
                     Bagus jika satu sisi kecil & sisi lain punya index
                     Buruk jika kedua sisi besar → O(N×M)

Hash Join          → Build hash table dari sisi kecil, probe dengan sisi besar
                     Bagus untuk join dua tabel besar
                     Memory: "Batches: 1" artinya fit in work_mem (baik!)
                     "Batches: >1" artinya spill ke disk (tambah work_mem)

Merge Join         → Join dua set yang sudah terurut
                     Efisien jika data sudah tersort (mis: dari index)

-- ── AGGREGATION NODES ─────────────────────────────────────────

HashAggregate      → GROUP BY menggunakan hash table
                     "Batches: 1" = fit in work_mem ✅
                     "Batches: >1" = spill to disk, naikkan work_mem

GroupAggregate     → GROUP BY pada data yang sudah tersort
                     Lebih hemat memory dari HashAggregate

-- ── PARALLEL NODES ────────────────────────────────────────────

Gather             → Koordinator: kumpulkan hasil dari parallel workers
Gather Merge       → Seperti Gather, tapi preserve urutan (untuk ORDER BY)
Parallel Seq Scan  → Multiple worker scan tabel berbarengan`}
      </Code>
    </Block>

    <Block title="Diagnosa Masalah Umum dari EXPLAIN" color="#f87171">
      <Code>
{`-- ❌ MASALAH 1: Row estimate meleset jauh
-- Gejala: rows=1 tapi actual rows=50000
-- Penyebab: statistik tabel sudah stale
-- Solusi:
ANALYZE orders;                              -- update statistik satu tabel
ANALYZE;                                     -- update semua tabel
ALTER TABLE orders ALTER COLUMN status
  SET STATISTICS 500;                        -- tingkatkan sample untuk kolom skewed
ANALYZE orders (status);

-- ❌ MASALAH 2: Seq Scan padahal ada index
-- Gejala: Seq Scan on orders (rows=10000000) padahal ada idx_orders_status
-- Penyebab: planner pikir index tidak efisien (terlalu banyak row yang cocok)
--           ATAU statistik menyebabkan estimasi salah
-- Diagnosa:
SET enable_seqscan = OFF;                    -- paksa index scan
EXPLAIN ANALYZE SELECT ...;                  -- apakah index lebih cepat?
SET enable_seqscan = ON;                     -- kembalikan

-- ❌ MASALAH 3: Hash Join spill ke disk
-- Gejala: Hash Join ... Batches: 8 (seharusnya 1)
-- Penyebab: work_mem terlalu kecil
-- Solusi:
SET work_mem = '256MB';                      -- set untuk session ini
EXPLAIN ANALYZE SELECT ...;                  -- cek apakah Batches: 1 sekarang

-- ❌ MASALAH 4: Nested Loop pada tabel besar
-- Gejala: Nested Loop ... loops=500000
-- Penyebab: planner salah estimasi, harusnya Hash Join
-- Solusi:
SET enable_nestloop = OFF;
EXPLAIN ANALYZE SELECT ...;                  -- bandingkan dengan Hash Join
SET enable_nestloop = ON;

-- ❌ MASALAH 5: Planning Time >> Execution Time
-- Gejala: Planning Time: 2300ms, Execution Time: 5ms
-- Penyebab: terlalu banyak JOIN atau tabel, planner exhausted
-- Solusi:
SET join_collapse_limit = 8;                 -- batasi kombinasi join
SET geqo_threshold = 10;                     -- pakai GEQO untuk banyak tabel`}
      </Code>
    </Block>
  </div>
)

const ReadReport = () => (
  <div>
    <h3 style={{ color: '#e879f9', fontWeight: 'bold', fontSize: '20px', marginBottom: '16px' }}>Membaca Laporan Benchmark</h3>

    <Block title="Output pgbench — Contoh Lengkap" color="#64c8ff">
      <Code color="#86efac">
{`$ pgbench -c 20 -j 10 -T 120 -r -P 10 benchdb

pgbench (16.3)
starting vacuum...end.

-- ── PROGRESS REPORT (setiap 10 detik) ────────────────────────
progress: 10.0 s, 14523.4 tps, lat 1.376 ms stddev 0.823, 0 failed
progress: 20.0 s, 14891.2 tps, lat 1.343 ms stddev 0.791, 0 failed
progress: 30.0 s, 14654.8 tps, lat 1.365 ms stddev 0.812, 0 failed
progress: 40.0 s, 15102.1 tps, lat 1.324 ms stddev 0.756, 0 failed
progress: 50.0 s, 14876.3 tps, lat 1.344 ms stddev 0.798, 0 failed
...

-- ── HASIL AKHIR ───────────────────────────────────────────────
transaction type: <builtin: TPC-B (sort of)>
scaling factor: 50
query mode: simple
number of clients: 20
number of threads: 10
maximum number of tries: 1
duration: 120 s
number of transactions actually processed: 1784934
number of failed transactions: 0 (0.000%)
latency average = 1.344 ms
latency stddev  = 0.801 ms
initial connection time = 45.321 ms
tps = 14874.409 (without initial connection time)

-- ── LATENCY PER STATEMENT (-r flag) ──────────────────────────
statement latencies in milliseconds and failures:
         0.003  0  \set aid random(1, 100000 * :scale)
         0.003  0  \set bid random(1, 1 * :scale)
         0.003  0  \set tid random(1, 10 * :scale)
         0.004  0  \set delta random(-5000, 5000)
         0.072  0  BEGIN;
         0.284  0  UPDATE pgbench_accounts SET abalance = ...
         0.198  0  SELECT abalance FROM pgbench_accounts WHERE aid = :aid;
         0.089  0  UPDATE pgbench_tellers  SET tbalance = ...
         0.091  0  UPDATE pgbench_branches SET bbalance = ...
         0.102  0  INSERT INTO pgbench_history ...
         0.498  0  END;`}
      </Code>
    </Block>

    <Block title="Interpretasi Metrik Utama" color="#4ade80">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginBottom: '12px' }}>
        <MetricCard label="TPS" value="14.874" unit="transactions/sec" color="#64c8ff" desc="Throughput keseluruhan sistem. Naik saat concurrency naik — sampai titik saturasi." />
        <MetricCard label="Latency Avg" value="1.344" unit="ms per transaksi" color="#4ade80" desc="Rata-rata waktu satu transaksi selesai. Harus stabil, tidak spike." />
        <MetricCard label="Stddev" value="0.801" unit="ms" color="#fbbf24" desc="Standar deviasi latency. Kecil = stabil. Besar = ada jitter / contention." />
        <MetricCard label="Failed" value="0" unit="transaksi" color="#f87171" desc="Transaksi gagal (deadlock, timeout). Harus 0 dalam benchmark normal." />
      </div>
      <Code>
{`-- Interpretasi TPS:
-- TPS naik linear seiring -c naik   → sistem masih punya kapasitas, tambah client lagi
-- TPS stagnan meski -c naik          → sudah di batas (CPU, I/O, atau connection limit)
-- TPS turun saat -c naik             → overloaded, contention tinggi

-- Interpretasi Latency:
-- Avg rendah + stddev rendah         → sistem stabil dan responsif ✅
-- Avg rendah + stddev tinggi         → ada request yang occasionally sangat lambat ⚠️
-- Avg naik seiring -c naik           → queuing, sistem mulai kewalahan ❌

-- Interpretasi statement latency (-r):
-- Lihat pernyataan mana yang paling lama (ms tertinggi)
-- UPDATE pgbench_accounts 0.284ms  ← ini yang paling lambat (wajar, ada lock)
-- Jika INSERT/UPDATE jauh lebih lambat dari SELECT → WAL I/O jadi bottleneck`}
      </Code>
    </Block>

    <Block title="Analisis TPS vs Concurrency (Saturation Curve)" color="#a78bfa">
      <Code>
{`-- Contoh data hasil benchmark ramp-up:
-- clients | TPS     | avg_latency_ms | stddev_ms
-- ──────────────────────────────────────────────
--       1 |   1.823 |          0.549 |     0.123
--       2 |   3.621 |          0.552 |     0.145
--       4 |   7.198 |          0.556 |     0.167
--       8 |  14.312 |          0.559 |     0.189
--      16 |  27.891 |          0.573 |     0.234
--      32 |  52.134 |          0.614 |     0.312
--      64 |  89.432 |          0.715 |     0.541  ← mulai naik
--     128 | 110.234 |          1.161 |     1.234  ← TPS stagnan = saturasi
--     256 | 108.912 |          2.350 |     2.891  ← TPS turun = overloaded

-- Kesimpulan dari data di atas:
-- Optimal concurrency = sekitar 64-128 client
-- Setelah 128 client, TPS stagnan & latency melonjak
-- Solusi: naikkan max_connections, atau pakai connection pooler (pgBouncer)

-- Cek saturation point juga dari OS:
-- top / htop : CPU usage, load average
-- iostat -x 1: disk I/O utilization (util% mendekati 100% = I/O bottleneck)
-- free -h    : apakah RAM terpakai penuh → swapping?`}
      </Code>
    </Block>

    <Block title="Laporan Buffer Hit Ratio — Seberapa Efektif Cache?" color="#fbbf24">
      <Code>
{`-- Cek cache hit ratio seluruh database
SELECT
  datname,
  blks_hit,
  blks_read,
  ROUND(blks_hit::NUMERIC / NULLIF(blks_hit + blks_read, 0) * 100, 2) AS hit_ratio_pct
FROM pg_stat_database
WHERE datname = 'benchdb';

-- Contoh output:
-- datname  | blks_hit | blks_read | hit_ratio_pct
-- benchdb  | 4823190  |   120034  |         97.57

-- ── Interpretasi hit_ratio_pct: ───────────────────────────────
-- > 99%    → Excellent. Hampir semua data dari RAM, sangat cepat ✅
-- 95–99%   → Good. Masih bisa ditingkatkan dengan naik shared_buffers
-- 90–95%   → Fair. Cukup banyak disk read, perlu investigasi ⚠️
-- < 90%    → Poor. Banyak I/O disk, bottleneck jelas → naikkan shared_buffers ❌

-- Cek per tabel (mana yang paling banyak disk read)
SELECT
  schemaname,
  relname,
  heap_blks_hit,
  heap_blks_read,
  ROUND(heap_blks_hit::NUMERIC / NULLIF(heap_blks_hit + heap_blks_read, 0) * 100, 2) AS hit_pct
FROM pg_statio_user_tables
ORDER BY heap_blks_read DESC
LIMIT 20;

-- Cek hit ratio index
SELECT
  relname,
  indexrelname,
  idx_blks_hit,
  idx_blks_read,
  ROUND(idx_blks_hit::NUMERIC / NULLIF(idx_blks_hit + idx_blks_read, 0) * 100, 2) AS idx_hit_pct
FROM pg_statio_user_indexes
ORDER BY idx_blks_read DESC
LIMIT 20;`}
      </Code>
    </Block>

    <Block title="Laporan WAL & I/O — Bottleneck Write" color="#e879f9">
      <Code>
{`-- Cek statistik bgwriter (background writer & checkpointer)
SELECT
  checkpoints_timed,           -- checkpoint karena waktu (normal)
  checkpoints_req,             -- checkpoint dipaksa karena WAL penuh (⚠️ warning!)
  checkpoint_write_time / 1000 AS checkpoint_write_sec,
  checkpoint_sync_time / 1000  AS checkpoint_sync_sec,
  buffers_checkpoint,          -- buffer ditulis ke disk oleh checkpointer
  buffers_clean,               -- buffer ditulis oleh bgwriter
  buffers_backend,             -- buffer ditulis langsung oleh backend (⚠️ buruk!)
  buffers_alloc                -- total buffer yang dialokasikan
FROM pg_stat_bgwriter;

-- ── Interpretasi: ─────────────────────────────────────────────
-- checkpoints_req >> checkpoints_timed
--   → WAL sering penuh sebelum waktunya → naikkan max_wal_size
--   → Atau naikkan checkpoint_completion_target (0.9)

-- buffers_backend tinggi
--   → Backend harus tulis ke disk sendiri karena bgwriter tidak cukup cepat
--   → Naikkan bgwriter_lru_maxpages atau bgwriter_delay

-- checkpoint_sync_time tinggi
--   → fsync lambat → I/O disk jadi bottleneck → pertimbangkan NVMe SSD

-- Cek WAL rate:
SELECT
  pg_current_wal_lsn(),
  pg_size_pretty(
    pg_wal_lsn_diff(pg_current_wal_lsn(), '0/0')
  ) AS total_wal_generated;

-- Jalankan benchmark, lalu cek lagi → hitung WAL rate:
-- WAL rate = (lsn_after - lsn_before) / duration_seconds`}
      </Code>
    </Block>
  </div>
)

const StatsViews = () => (
  <div>
    <h3 style={{ color: '#38bdf8', fontWeight: 'bold', fontSize: '20px', marginBottom: '16px' }}>pg_stat Views — Monitoring Live PostgreSQL</h3>

    <Block title="pg_stat_activity — Query yang Sedang Berjalan" color="#38bdf8">
      <Code>
{`-- Semua query aktif saat ini
SELECT
  pid,
  usename,
  application_name,
  client_addr,
  state,
  wait_event_type,
  wait_event,
  now() - query_start AS duration,
  left(query, 100)    AS query_snippet
FROM pg_stat_activity
WHERE state != 'idle'
  AND query_start IS NOT NULL
ORDER BY duration DESC;

-- Query yang berjalan > 30 detik (potential slow query)
SELECT pid, usename, now() - query_start AS runtime, query
FROM pg_stat_activity
WHERE state = 'active'
  AND now() - query_start > INTERVAL '30 seconds'
ORDER BY runtime DESC;

-- Lihat lock yang sedang terjadi
SELECT
  a.pid,
  a.usename,
  a.query_start,
  l.locktype,
  l.relation::regclass AS table_name,
  l.mode,
  l.granted,
  left(a.query, 80) AS query
FROM pg_stat_activity a
JOIN pg_locks l ON l.pid = a.pid
WHERE NOT l.granted     -- lock yang sedang menunggu
ORDER BY a.query_start;

-- Kill query yang lambat (hati-hati!)
SELECT pg_terminate_backend(pid)
FROM pg_stat_activity
WHERE state = 'active'
  AND now() - query_start > INTERVAL '5 minutes'
  AND usename != 'postgres';`}
      </Code>
    </Block>

    <Block title="pg_stat_statements — Statistik Query Historis" color="#4ade80">
      <Code>
{`-- Aktifkan extension (tambahkan ke postgresql.conf lalu restart)
-- shared_preload_libraries = 'pg_stat_statements'
-- pg_stat_statements.track = all

CREATE EXTENSION IF NOT EXISTS pg_stat_statements;

-- TOP 20 query paling lambat (total waktu)
SELECT
  ROUND(total_exec_time::NUMERIC, 2)   AS total_ms,
  calls,
  ROUND(mean_exec_time::NUMERIC, 3)    AS avg_ms,
  ROUND(min_exec_time::NUMERIC, 3)     AS min_ms,
  ROUND(max_exec_time::NUMERIC, 3)     AS max_ms,
  ROUND(stddev_exec_time::NUMERIC, 3)  AS stddev_ms,
  rows,
  shared_blks_hit,
  shared_blks_read,
  ROUND(shared_blks_hit::NUMERIC / NULLIF(shared_blks_hit + shared_blks_read, 0) * 100, 1) AS hit_pct,
  left(query, 120) AS query
FROM pg_stat_statements
ORDER BY total_exec_time DESC
LIMIT 20;

-- Query yang paling sering dipanggil (high frequency)
SELECT calls, ROUND(mean_exec_time::NUMERIC, 3) AS avg_ms, left(query, 100) AS query
FROM pg_stat_statements
ORDER BY calls DESC
LIMIT 20;

-- Query dengan hit ratio rendah (butuh lebih banyak cache/index)
SELECT
  calls,
  ROUND(mean_exec_time::NUMERIC, 3) AS avg_ms,
  shared_blks_read,
  ROUND(shared_blks_hit::NUMERIC / NULLIF(shared_blks_hit + shared_blks_read, 0) * 100, 1) AS hit_pct,
  left(query, 100) AS query
FROM pg_stat_statements
WHERE shared_blks_read > 1000
ORDER BY shared_blks_read DESC
LIMIT 20;

-- Reset statistik (setelah tuning, mulai pengukuran fresh)
SELECT pg_stat_statements_reset();`}
      </Code>
    </Block>

    <Block title="pg_stat_user_tables — Statistik per Tabel" color="#a78bfa">
      <Code>
{`-- Statistik akses tabel
SELECT
  schemaname,
  relname                           AS table_name,
  seq_scan,                         -- berapa kali full table scan
  seq_tup_read,                     -- total baris dibaca oleh seq scan
  idx_scan,                         -- berapa kali index scan
  idx_tup_fetch,                    -- baris yang diambil via index
  n_tup_ins,                        -- total insert
  n_tup_upd,                        -- total update
  n_tup_del,                        -- total delete
  n_live_tup,                       -- perkiraan baris hidup
  n_dead_tup,                       -- baris mati (perlu VACUUM)
  ROUND(n_dead_tup::NUMERIC / NULLIF(n_live_tup + n_dead_tup, 0) * 100, 1) AS dead_pct,
  last_vacuum,
  last_autovacuum,
  last_analyze,
  last_autoanalyze,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||relname)) AS total_size
FROM pg_stat_user_tables
ORDER BY seq_scan DESC
LIMIT 20;

-- Tabel dengan banyak seq_scan tapi sedikit idx_scan
-- → kandidat untuk ditambahkan index
SELECT relname, seq_scan, idx_scan,
  ROUND(seq_scan::NUMERIC / NULLIF(seq_scan + idx_scan, 0) * 100, 1) AS seq_pct
FROM pg_stat_user_tables
WHERE seq_scan > 1000
ORDER BY seq_pct DESC;

-- Tabel dengan dead tuple tinggi (perlu vacuum)
SELECT relname, n_live_tup, n_dead_tup,
  ROUND(n_dead_tup::NUMERIC / NULLIF(n_live_tup + n_dead_tup, 0) * 100, 1) AS bloat_pct
FROM pg_stat_user_tables
WHERE n_dead_tup > 10000
ORDER BY bloat_pct DESC;`}
      </Code>
    </Block>

    <Block title="pg_stat_user_indexes — Statistik Index" color="#fbbf24">
      <Code>
{`-- Index yang tidak pernah dipakai (kandidat untuk di-drop)
SELECT
  schemaname,
  relname     AS table_name,
  indexrelname AS index_name,
  idx_scan,
  pg_size_pretty(pg_relation_size(indexrelid)) AS index_size
FROM pg_stat_user_indexes
WHERE idx_scan = 0
  AND indexrelname NOT LIKE '%pkey%'    -- jangan hapus primary key!
  AND indexrelname NOT LIKE '%unique%'
ORDER BY pg_relation_size(indexrelid) DESC;

-- Index yang paling sering dipakai (perlu diprioritaskan masuk RAM)
SELECT
  relname,
  indexrelname,
  idx_scan,
  idx_tup_read,
  idx_tup_fetch,
  pg_size_pretty(pg_relation_size(indexrelid)) AS size
FROM pg_stat_user_indexes
ORDER BY idx_scan DESC
LIMIT 20;

-- Hit ratio per index (apakah index dalam cache?)
SELECT
  relname,
  indexrelname,
  idx_blks_hit,
  idx_blks_read,
  ROUND(idx_blks_hit::NUMERIC / NULLIF(idx_blks_hit + idx_blks_read, 0) * 100, 1) AS hit_pct
FROM pg_statio_user_indexes
WHERE idx_blks_hit + idx_blks_read > 100
ORDER BY hit_pct ASC    -- yang paling rendah muncul dulu (paling butuh cache)
LIMIT 20;`}
      </Code>
    </Block>

    <Block title="pg_stat_bgwriter & pg_stat_wal — I/O Subsystem" color="#f87171">
      <Code>
{`-- Checkpoint health (jalankan sebelum dan sesudah benchmark)
SELECT
  checkpoints_timed                                AS ckpt_scheduled,
  checkpoints_req                                  AS ckpt_forced,     -- ⚠️ harus kecil
  ROUND(checkpoints_req::NUMERIC /
    NULLIF(checkpoints_timed + checkpoints_req, 0) * 100, 1)          AS forced_pct,
  checkpoint_write_time / 1000                     AS write_sec,
  checkpoint_sync_time / 1000                      AS sync_sec,        -- fsync time
  buffers_checkpoint                               AS bufs_by_ckpt,
  buffers_clean                                    AS bufs_by_bgwriter,
  buffers_backend                                  AS bufs_by_backend, -- ⚠️ buruk jika tinggi
  buffers_alloc                                    AS total_alloc
FROM pg_stat_bgwriter;

-- WAL statistics (PostgreSQL 14+)
SELECT
  wal_records,
  wal_fpi,             -- full page images (setelah crash / checkpoint)
  pg_size_pretty(wal_bytes) AS wal_total,
  wal_buffers_full,    -- berapa kali WAL buffer penuh sebelum flush → naikkan wal_buffers
  wal_write,
  wal_sync,
  ROUND(wal_write_time, 2) AS write_ms,
  ROUND(wal_sync_time, 2)  AS sync_ms    -- tinggi → I/O disk lambat untuk WAL
FROM pg_stat_wal;

-- Locks yang menyebabkan waiting (blocker & waiter)
SELECT
  blocked.pid              AS waiting_pid,
  blocked.usename          AS waiting_user,
  left(blocked.query, 60)  AS waiting_query,
  blocking.pid             AS blocking_pid,
  blocking.usename         AS blocking_user,
  left(blocking.query, 60) AS blocking_query
FROM pg_stat_activity AS blocked
JOIN pg_stat_activity AS blocking
  ON blocking.pid = ANY(pg_blocking_pids(blocked.pid))
WHERE cardinality(pg_blocking_pids(blocked.pid)) > 0;`}
      </Code>
    </Block>
  </div>
)

const Checklist = () => (
  <div>
    <h3 style={{ color: '#4ade80', fontWeight: 'bold', fontSize: '20px', marginBottom: '16px' }}>Checklist Benchmarking PostgreSQL</h3>

    <Block title="Sebelum Benchmark — Persiapan" color="#64c8ff">
      {[
        { done: true,  item: 'Reset statistik pg_stat_statements: SELECT pg_stat_statements_reset();' },
        { done: true,  item: 'Reset statistik bgwriter: SELECT pg_stat_reset();' },
        { done: true,  item: 'Catat konfigurasi PostgreSQL saat ini (shared_buffers, work_mem, dll.)' },
        { done: true,  item: 'Pastikan shared_buffers ≥ 25% RAM server untuk workload general' },
        { done: true,  item: 'Catat versi PostgreSQL, OS, CPU, RAM, dan jenis storage (HDD/SSD/NVMe)' },
        { done: true,  item: 'Gunakan data volume yang realistis (scale factor sesuai production)' },
        { done: true,  item: 'Warm-up: jalankan benchmark sekali, buang hasilnya' },
        { done: false, item: 'Pastikan tidak ada beban lain di server (backup, replication lag tinggi)' },
        { done: false, item: 'Set checkpoint_completion_target = 0.9 untuk benchmark yang adil' },
      ].map((c, i) => (
        <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '8px' }}>
          <span style={{ color: c.done ? '#4ade80' : '#fbbf24', fontSize: '18px', flexShrink: 0, marginTop: '1px' }}>{c.done ? '✅' : '⬜'}</span>
          <p style={{ color: '#a0c8ff', fontSize: '15px', lineHeight: '1.7', margin: 0, fontFamily: c.item.includes(':') ? 'inherit' : 'inherit' }}>{c.item}</p>
        </div>
      ))}
    </Block>

    <Block title="Saat Benchmark — Yang Harus Dimonitor" color="#fbbf24">
      <Code>
{`-- Terminal 1: jalankan benchmark
pgbench -c 20 -j 10 -T 120 -P 10 benchdb

-- Terminal 2: monitor query aktif
watch -n 2 "psql benchdb -c \"
  SELECT pid, state, wait_event_type, wait_event,
         round(extract(epoch from (now()-query_start))::numeric, 1) AS secs,
         left(query,60) AS q
  FROM pg_stat_activity
  WHERE state != 'idle' ORDER BY secs DESC LIMIT 10;\""

-- Terminal 3: monitor OS
htop                    # CPU & memory
iostat -x 2             # disk I/O (await, util%)
vmstat 2                # memory swap, context switch

-- Terminal 4: monitor PostgreSQL locks
watch -n 2 "psql benchdb -c \"
  SELECT count(*) AS waiting_queries,
         wait_event_type, wait_event
  FROM pg_stat_activity
  WHERE wait_event IS NOT NULL
  GROUP BY 2,3
  ORDER BY 1 DESC;\""

-- Catat nilai-nilai ini sebelum & sesudah benchmark:
SELECT
  blks_hit, blks_read,
  tup_returned, tup_fetched, tup_inserted, tup_updated, tup_deleted,
  conflicts, temp_files, temp_bytes, deadlocks
FROM pg_stat_database
WHERE datname = 'benchdb';`}
      </Code>
    </Block>

    <Block title="Setelah Benchmark — Analisis Hasil" color="#a78bfa">
      {[
        'Hitung TPS tertinggi sebelum latency mulai naik signifikan (saturation point)',
        'Bandingkan buffer hit ratio: target > 99%, jika < 95% pertimbangkan naik shared_buffers',
        'Cek checkpoints_req — jika besar, naikkan max_wal_size atau checkpoint_timeout',
        'Cek buffers_backend di pg_stat_bgwriter — nilai besar berarti backend harus tulis disk sendiri',
        'Identifikasi top 5 query paling lambat dari pg_stat_statements (total_exec_time)',
        'Verifikasi tidak ada seq_scan pada tabel besar di pg_stat_user_tables',
        'Cek index yang tidak dipakai (idx_scan = 0) dan pertimbangkan untuk di-drop',
        'Bandingkan planning time vs execution time — planning time > 10ms adalah warning',
        'Dokumentasikan: konfigurasi, scale factor, -c -j -T, TPS, latency avg/p95, hit ratio',
      ].map((item, i) => (
        <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '8px' }}>
          <span style={{ color: '#a78bfa', fontSize: '16px', flexShrink: 0, fontWeight: 'bold' }}>{i + 1}.</span>
          <p style={{ color: '#a0c8ff', fontSize: '15px', lineHeight: '1.7', margin: 0 }}>{item}</p>
        </div>
      ))}
    </Block>

    <Block title="Konfigurasi PostgreSQL yang Paling Berdampak pada Benchmark" color="#f87171">
      <Code>
{`-- ── Memory ───────────────────────────────────────────────────
shared_buffers       = 25% RAM          -- cache utama PostgreSQL
work_mem             = 64MB             -- memory per sort/hash operation
                                        -- ⚠️ dikali jumlah koneksi × operasi per query
effective_cache_size = 75% RAM          -- hint ke planner tentang OS cache
maintenance_work_mem = 512MB            -- untuk VACUUM, CREATE INDEX

-- ── WAL & Checkpoint ─────────────────────────────────────────
wal_buffers                = 64MB       -- buffer WAL di RAM sebelum flush
checkpoint_completion_target = 0.9     -- spread checkpoint I/O selama 90% interval
max_wal_size               = 4GB       -- batas WAL sebelum forced checkpoint
checkpoint_timeout         = 15min     -- interval checkpoint normal

-- ── I/O & Parallelism ────────────────────────────────────────
effective_io_concurrency   = 200        -- untuk SSD (4 untuk HDD)
random_page_cost           = 1.1        -- untuk SSD (4.0 untuk HDD)
seq_page_cost              = 1.0        -- referensi cost seq scan
max_parallel_workers_per_gather = 4    -- parallel query workers
max_worker_processes       = 16

-- ── Connections ──────────────────────────────────────────────
max_connections            = 200        -- gunakan pgBouncer untuk > 200
connection_timeout         = 5s

-- ── Autovacuum ───────────────────────────────────────────────
autovacuum_vacuum_scale_factor    = 0.05   -- vacuum jika 5% dead tuple (default 20%)
autovacuum_analyze_scale_factor   = 0.02   -- analyze jika 2% changed (default 10%)
autovacuum_vacuum_cost_delay      = 2ms    -- lebih agresif (default 20ms)

-- ── Cara apply tanpa restart (hanya reload): ─────────────────
SELECT pg_reload_conf();

-- ── Cek nilai aktif saat ini: ────────────────────────────────
SHOW shared_buffers;
SHOW work_mem;
SELECT name, setting, unit FROM pg_settings WHERE name IN (
  'shared_buffers', 'work_mem', 'max_connections',
  'effective_cache_size', 'wal_buffers', 'checkpoint_completion_target'
);`}
      </Code>
      <Note>Ubah satu parameter per sesi benchmark, catat hasilnya, lalu bandingkan. Jangan ubah banyak hal sekaligus karena kamu tidak bisa tahu mana yang berdampak.</Note>
    </Block>

    <Block title="Template Dokumentasi Hasil Benchmark" color="#38bdf8">
      <Code color="#a0c8ff">
{`# Benchmark Report — [Tanggal]

## Environment
- PostgreSQL : 16.3
- OS         : Ubuntu 22.04, kernel 6.5
- Hardware   : 16 vCPU, 64GB RAM, NVMe 1TB
- Test DB    : benchdb (scale factor 50 = ~7.5 juta rows)

## Konfigurasi yang Diuji
- shared_buffers : 16GB (sebelumnya 1GB)
- work_mem       : 64MB
- max_wal_size   : 4GB

## Hasil Benchmark
| clients | TPS     | avg_ms | stddev_ms | hit_ratio |
|---------|---------|--------|-----------|-----------|
|       8 | 28.234  |  0.283 |     0.091 |    99.8%  |
|      16 | 54.112  |  0.296 |     0.112 |    99.7%  |
|      32 | 98.432  |  0.325 |     0.189 |    99.5%  |
|      64 | 164.891 |  0.388 |     0.312 |    99.1%  |
|     128 | 201.234 |  0.636 |     0.678 |    98.9%  |

## Bottleneck Ditemukan
- checkpoints_req tinggi → naikkan max_wal_size ke 8GB
- buffers_backend ada tapi kecil → bgwriter masih cukup

## Top Slow Queries (pg_stat_statements)
1. UPDATE pgbench_accounts avg 0.284ms (terbanyak dipanggil)
2. SELECT dengan Seq Scan pada orders_history → butuh index

## Kesimpulan & Rekomendasi
- Optimal concurrency: 64–128 client
- Naik shared_buffers 1GB → 16GB: TPS naik +98%, latency turun -71%
- Rekomendasi: tambah index pada orders_history.created_at`}
      </Code>
    </Block>
  </div>
)

// ─── TAB CONTENT MAP ───────────────────────────────────────────────────────────

const contentMap = {
  intro:     <Intro />,
  pgbench:   <Pgbench />,
  custom:    <CustomScript />,
  explain:   <ExplainAnalyze />,
  report:    <ReadReport />,
  stats:     <StatsViews />,
  checklist: <Checklist />,
}

// ─── MODULE ROOT ───────────────────────────────────────────────────────────────

const BenchmarkingModule = () => {
  const [activeTab, setActiveTab] = useState('intro')

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
          <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '8px', color: '#e0f2ff' }}>
            Benchmarking PostgreSQL 📊
          </h1>
          <p style={{ color: '#a0c8ff', fontSize: '20px' }}>
            pgbench, EXPLAIN ANALYZE, pg_stat views — cara mengukur, membaca laporan, dan menemukan bottleneck performa database
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
                fontSize: '16px',
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
        <p style={{ color: '#708090', fontSize: '18px', marginBottom: '8px' }}>
          📊 PostgreSQL Benchmarking — pgbench · EXPLAIN ANALYZE · pg_stat_statements · Buffer Hit Ratio · WAL Stats
        </p>
        <p style={{ color: '#708090', fontSize: '18px' }}>
          💡 Tip: Ukur dulu, lalu optimasi. Jangan optimasi sesuatu yang belum diukur!
        </p>
      </footer>
    </div>
  )
}

export default BenchmarkingModule
