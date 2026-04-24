import React, { useState } from 'react'

const tabs = [
  { id: 'overview',     label: '📖 Overview',         desc: 'Kategori metrik & tools monitoring' },
  { id: 'activity',     label: '🔍 Activity & Locks',  desc: 'pg_stat_activity, lock, idle, blocking query' },
  { id: 'tables',       label: '🗄️ Tables & I/O',      desc: 'pg_stat_user_tables, bloat, seq scan, cache hit' },
  { id: 'vacuum',       label: '🧹 Vacuum & Bloat',    desc: 'Autovacuum, dead tuples, table bloat, pg_stat_progress_vacuum' },
  { id: 'connections',  label: '🔌 Connections',       desc: 'Connection usage, pool, max_connections' },
  { id: 'logs',         label: '📋 Logs & Slow Query', desc: 'log_min_duration, pg_stat_statements, auto_explain' },
  { id: 'prometheus',   label: '📡 Prometheus & Grafana', desc: 'postgres_exporter, scrape config, dashboard' },
  { id: 'alerts',       label: '🔔 Alerting',          desc: 'Alert rules penting untuk production' },
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

const Note = ({ children, color = '#708090' }) => (
  <p style={{ color, fontSize: '15px', marginTop: '8px', lineHeight: '1.7' }}>{children}</p>
)

const Badge = ({ children, color }) => (
  <span style={{ background: `${color}20`, border: `1px solid ${color}50`, color, fontSize: '13px', padding: '2px 8px', borderRadius: '4px', fontWeight: '600', marginRight: '6px', whiteSpace: 'nowrap' }}>
    {children}
  </span>
)

const MetricCard = ({ name, view, color, desc }) => (
  <div style={{ background: `${color}0d`, border: `1px solid ${color}33`, borderRadius: '8px', padding: '12px' }}>
    <p style={{ color, fontWeight: 'bold', fontSize: '15px', margin: '0 0 4px 0' }}>{name}</p>
    <code style={{ color: '#708090', fontSize: '13px', display: 'block', marginBottom: '6px' }}>{view}</code>
    <p style={{ color: '#a0c8ff', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>{desc}</p>
  </div>
)

// ─── TAB CONTENTS ──────────────────────────────────────────────────────────────

const Overview = () => (
  <div>
    <h3 style={{ color: '#64c8ff', fontWeight: 'bold', fontSize: '20px', marginBottom: '4px' }}>
      Monitoring PostgreSQL
    </h3>
    <p style={{ color: '#708090', fontSize: '16px', marginBottom: '20px' }}>
      Monitoring database bukan hanya soal "apakah server hidup?" — tapi memahami health query, penggunaan resource, bloat, lock, dan tren beban sebelum menjadi insiden.
    </p>

    <Block title="Lima Area Monitoring Kritis" color="#64c8ff">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: '10px' }}>
        {[
          { area: 'Connections', icon: '🔌', color: '#64c8ff', desc: 'Jumlah koneksi aktif, idle, waiting vs max_connections' },
          { area: 'Query Health', icon: '🔍', color: '#4ade80', desc: 'Slow query, long-running, blocking locks, idle-in-transaction' },
          { area: 'Storage & I/O', icon: '💾', color: '#fbbf24', desc: 'Disk usage, cache hit ratio, seq scan, bloat tabel/index' },
          { area: 'Vacuum & MVCC', icon: '🧹', color: '#a78bfa', desc: 'Dead tuples, autovacuum progress, transaction ID wraparound' },
          { area: 'Replication', icon: '📡', color: '#f87171', desc: 'WAL lag, slot bloat, replica status' },
        ].map(c => (
          <div key={c.area} style={{ background: `${c.color}0d`, border: `1px solid ${c.color}33`, borderRadius: '8px', padding: '12px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', marginBottom: '6px' }}>{c.icon}</div>
            <p style={{ color: c.color, fontWeight: 'bold', fontSize: '14px', margin: '0 0 4px 0' }}>{c.area}</p>
            <p style={{ color: '#708090', fontSize: '13px', lineHeight: '1.6', margin: 0 }}>{c.desc}</p>
          </div>
        ))}
      </div>
    </Block>

    <Block title="System Views Penting" color="#4ade80">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        {[
          { name: 'Connections & Query',  view: 'pg_stat_activity',           color: '#64c8ff', desc: 'Semua koneksi aktif, state, query yang sedang berjalan, lock wait' },
          { name: 'Query Statistics',      view: 'pg_stat_statements',         color: '#4ade80', desc: 'Statistik historis per query: total time, mean time, calls, rows' },
          { name: 'Table Health',          view: 'pg_stat_user_tables',        color: '#fbbf24', desc: 'Seq scan, idx scan, n_dead_tup, last vacuum/analyze, row count' },
          { name: 'Table I/O',             view: 'pg_statio_user_tables',      color: '#fbbf24', desc: 'Heap blks read vs hit — mengukur buffer cache effectiveness' },
          { name: 'Index Usage',           view: 'pg_stat_user_indexes',       color: '#a78bfa', desc: 'Index scan count, unused indexes, idx blks hit ratio' },
          { name: 'Lock Waits',            view: 'pg_locks + pg_stat_activity',color: '#f87171', desc: 'Siapa memblokir siapa — join kedua view untuk blocking tree' },
          { name: 'Vacuum Progress',       view: 'pg_stat_progress_vacuum',    color: '#a78bfa', desc: 'Progres vacuum yang sedang berjalan: heap blks total vs scanned' },
          { name: 'Database Stats',        view: 'pg_stat_database',           color: '#38bdf8', desc: 'Per-database: commits, rollbacks, blks_hit, tup_fetched, deadlocks' },
          { name: 'Replication',           view: 'pg_stat_replication',        color: '#f97316', desc: 'Lag bytes/waktu tiap replica, sync state, sent vs replay LSN' },
          { name: 'WAL Activity',          view: 'pg_stat_wal',                color: '#f97316', desc: 'WAL records written, fpi, buffers, sync count & time (PG 14+)' },
          { name: 'Replication Slots',     view: 'pg_replication_slots',       color: '#f87171', desc: 'Slot aktif/inaktif, lag bytes — awasi slot yang menahan WAL' },
          { name: 'Background Writer',     view: 'pg_stat_bgwriter',           color: '#64c8ff', desc: 'Checkpoint frequency, buffers written, maxwritten_clean' },
        ].map(m => <MetricCard key={m.name} {...m} />)}
      </div>
    </Block>

    <Block title="Tools Ekosistem" color="#a78bfa">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '10px' }}>
        {[
          { name: 'postgres_exporter', color: '#f97316', type: 'Metrics', desc: 'Expose semua pg_stat views ke Prometheus. Konfigurabel via custom queries.' },
          { name: 'Grafana', color: '#f97316', type: 'Dashboard', desc: 'Visualisasi metrik Prometheus. Dashboard PostgreSQL tersedia di grafana.com.' },
          { name: 'pg_activity', color: '#4ade80', type: 'CLI', desc: 'htop untuk PostgreSQL — query live, CPU, I/O, bloat, lock per proses.' },
          { name: 'pgBadger', color: '#38bdf8', type: 'Log Analysis', desc: 'Analisis log PostgreSQL menjadi HTML report — slow query, lock, error.' },
          { name: 'auto_explain', color: '#a78bfa', type: 'Extension', desc: 'Log EXPLAIN ANALYZE otomatis untuk query lambat tanpa perlu intervensi manual.' },
          { name: 'pg_stat_statements', color: '#fbbf24', type: 'Extension', desc: 'Agregat statistik setiap unique query — wajib di semua production instance.' },
        ].map(t => (
          <div key={t.name} style={{ background: `${t.color}0d`, border: `1px solid ${t.color}33`, borderRadius: '8px', padding: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <p style={{ color: t.color, fontWeight: 'bold', fontSize: '15px', margin: 0 }}>{t.name}</p>
              <Badge color={t.color}>{t.type}</Badge>
            </div>
            <p style={{ color: '#a0c8ff', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>{t.desc}</p>
          </div>
        ))}
      </div>
    </Block>
  </div>
)

// ─── ACTIVITY & LOCKS ─────────────────────────────────────────────────────────

const Activity = () => (
  <div>
    <h3 style={{ color: '#64c8ff', fontWeight: 'bold', fontSize: '20px', marginBottom: '4px' }}>Activity & Locks</h3>
    <p style={{ color: '#708090', fontSize: '16px', marginBottom: '20px' }}>
      Query aktif, idle-in-transaction, dan blocking lock adalah sumber masalah production yang paling umum. Deteksi dini dengan query berikut.
    </p>

    <Block title="pg_stat_activity — Snapshot Semua Koneksi" color="#64c8ff">
      <Code>{`-- ── Semua koneksi beserta state-nya ─────────────────────────
SELECT
  pid,
  usename,
  application_name,
  client_addr,
  state,                        -- active | idle | idle in transaction | ...
  wait_event_type,
  wait_event,
  now() - query_start AS query_duration,
  now() - state_change AS state_duration,
  left(query, 120)  AS query_snippet
FROM pg_stat_activity
WHERE pid <> pg_backend_pid()   -- exclude query ini sendiri
ORDER BY query_duration DESC NULLS LAST;

-- ── Hitung state breakdown ────────────────────────────────────
SELECT state, count(*) AS jumlah
FROM pg_stat_activity
WHERE pid <> pg_backend_pid()
GROUP BY state
ORDER BY jumlah DESC;

-- ── Koneksi idle in transaction > 5 menit (berbahaya!) ────────
SELECT pid, usename, application_name, client_addr,
       now() - state_change AS idle_duration,
       left(query, 100) AS last_query
FROM pg_stat_activity
WHERE state = 'idle in transaction'
  AND state_change < now() - interval '5 minutes'
ORDER BY idle_duration DESC;

-- ── Terminate query yang berjalan > 10 menit ──────────────────
SELECT pg_terminate_backend(pid)
FROM pg_stat_activity
WHERE state = 'active'
  AND query_start < now() - interval '10 minutes'
  AND pid <> pg_backend_pid();`}</Code>
    </Block>

    <Block title="Blocking Lock — Siapa Memblokir Siapa" color="#f87171">
      <Note color="#fca5a5">Lock yang tidak terdeteksi bisa membuat aplikasi freeze total. Jalankan query ini secara periodik atau expose ke Prometheus.</Note>
      <Code color="#fecaca">{`-- ── Pohon blocking (recursive) ──────────────────────────────
WITH RECURSIVE lock_tree AS (
  -- node daun: yang sedang diblokir
  SELECT
    blocked.pid                         AS blocked_pid,
    blocked.usename                     AS blocked_user,
    blocking.pid                        AS blocking_pid,
    blocking.usename                    AS blocking_user,
    blocked.query                       AS blocked_query,
    blocking.query                      AS blocking_query,
    now() - blocked.query_start         AS wait_duration
  FROM pg_stat_activity AS blocked
  JOIN pg_locks         AS bl  ON bl.pid = blocked.pid AND NOT bl.granted
  JOIN pg_locks         AS kl  ON kl.transactionid = bl.transactionid AND kl.granted
  JOIN pg_stat_activity AS blocking ON blocking.pid = kl.pid
  WHERE blocked.pid <> blocking.pid
)
SELECT
  blocking_pid,
  blocking_user,
  blocked_pid,
  blocked_user,
  wait_duration,
  left(blocking_query, 80) AS blocking_query,
  left(blocked_query,  80) AS blocked_query
FROM lock_tree
ORDER BY wait_duration DESC;

-- ── Semua lock yang sedang held / waited ─────────────────────
SELECT
  l.pid,
  a.usename,
  a.state,
  l.locktype,
  l.relation::regclass,
  l.mode,
  l.granted,
  now() - a.query_start AS duration
FROM pg_locks l
JOIN pg_stat_activity a USING (pid)
WHERE l.relation IS NOT NULL
ORDER BY l.granted, duration DESC;

-- ── Terminate blocker spesifik ────────────────────────────────
SELECT pg_terminate_backend(blocking_pid) FROM lock_tree;`}</Code>
    </Block>

    <Block title="Wait Events — Apa yang Ditunggu PostgreSQL" color="#fbbf24">
      <Code color="#fef9c3">{`-- ── Top wait events saat ini ────────────────────────────────
SELECT
  wait_event_type,
  wait_event,
  count(*) AS sessions
FROM pg_stat_activity
WHERE wait_event IS NOT NULL
  AND pid <> pg_backend_pid()
GROUP BY wait_event_type, wait_event
ORDER BY sessions DESC;

-- Tipe wait_event_type yang perlu diperhatikan:
-- Lock      → kontensi lock antar transaksi
-- LWLock    → internal lightweight lock (buffer, WAL)
-- IO        → menunggu I/O disk (read/write)
-- Client    → menunggu data dari client (idle)
-- IPC       → komunikasi antar proses internal PostgreSQL`}</Code>
    </Block>
  </div>
)

// ─── TABLES & I/O ─────────────────────────────────────────────────────────────

const Tables = () => (
  <div>
    <h3 style={{ color: '#64c8ff', fontWeight: 'bold', fontSize: '20px', marginBottom: '4px' }}>Tables & I/O Health</h3>
    <p style={{ color: '#708090', fontSize: '16px', marginBottom: '20px' }}>
      Cache hit ratio yang rendah, sequential scan berlebihan, dan index yang tidak terpakai adalah sinyal bahwa ada yang perlu diperbaiki di storage access pattern.
    </p>

    <Block title="Buffer Cache Hit Ratio" color="#4ade80">
      <Note>Target: heap_hit_ratio dan idx_hit_ratio harus &gt; 99%. Di bawah 95% artinya banyak I/O ke disk.</Note>
      <Code color="#bbf7d0">{`-- ── Cache hit ratio per database ────────────────────────────
SELECT
  datname,
  blks_hit,
  blks_read,
  round(
    blks_hit::numeric / nullif(blks_hit + blks_read, 0) * 100, 2
  ) AS cache_hit_ratio_pct
FROM pg_stat_database
WHERE datname NOT IN ('template0','template1')
ORDER BY cache_hit_ratio_pct;

-- ── Cache hit ratio per tabel ─────────────────────────────────
SELECT
  schemaname,
  relname AS tablename,
  heap_blks_hit,
  heap_blks_read,
  round(
    heap_blks_hit::numeric / nullif(heap_blks_hit + heap_blks_read, 0) * 100, 2
  ) AS heap_hit_pct,
  round(
    idx_blks_hit::numeric / nullif(idx_blks_hit + idx_blks_read, 0) * 100, 2
  ) AS idx_hit_pct
FROM pg_statio_user_tables
WHERE heap_blks_hit + heap_blks_read > 0
ORDER BY heap_hit_pct NULLS LAST
LIMIT 20;`}</Code>
    </Block>

    <Block title="Sequential Scan vs Index Scan" color="#fbbf24">
      <Code color="#fef9c3">{`-- ── Tabel dengan seq_scan terbanyak (kandidat butuh index) ──
SELECT
  schemaname,
  relname                     AS tablename,
  seq_scan,
  idx_scan,
  round(
    idx_scan::numeric / nullif(seq_scan + idx_scan, 0) * 100, 2
  )                           AS idx_scan_pct,
  n_live_tup                  AS live_rows,
  pg_size_pretty(pg_total_relation_size(relid)) AS total_size
FROM pg_stat_user_tables
WHERE seq_scan > 0
  AND n_live_tup > 10000      -- tabel besar yang sering di-scan penuh
ORDER BY seq_scan DESC
LIMIT 20;

-- ── Index yang tidak pernah dipakai ──────────────────────────
SELECT
  schemaname,
  relname  AS tablename,
  indexrelname AS indexname,
  idx_scan,
  pg_size_pretty(pg_relation_size(indexrelid)) AS index_size
FROM pg_stat_user_indexes
WHERE idx_scan = 0
  AND NOT indisunique           -- index unik tetap dibutuhkan walau scan = 0
  AND schemaname NOT IN ('pg_catalog','pg_toast')
ORDER BY pg_relation_size(indexrelid) DESC;`}</Code>
    </Block>

    <Block title="Ukuran Tabel & Pertumbuhan" color="#64c8ff">
      <Code>{`-- ── Top 20 tabel terbesar (data + index + toast) ────────────
SELECT
  schemaname,
  relname                           AS tablename,
  n_live_tup                        AS live_rows,
  n_dead_tup                        AS dead_rows,
  pg_size_pretty(pg_relation_size(relid))              AS table_size,
  pg_size_pretty(pg_indexes_size(relid))               AS index_size,
  pg_size_pretty(pg_total_relation_size(relid))        AS total_size,
  pg_total_relation_size(relid)                        AS total_bytes
FROM pg_stat_user_tables
ORDER BY total_bytes DESC
LIMIT 20;

-- ── Pertumbuhan database ──────────────────────────────────────
SELECT
  datname,
  pg_size_pretty(pg_database_size(datname)) AS db_size
FROM pg_database
WHERE datistemplate = false
ORDER BY pg_database_size(datname) DESC;`}</Code>
    </Block>
  </div>
)

// ─── VACUUM & BLOAT ───────────────────────────────────────────────────────────

const Vacuum = () => (
  <div>
    <h3 style={{ color: '#64c8ff', fontWeight: 'bold', fontSize: '20px', marginBottom: '4px' }}>Vacuum & Bloat</h3>
    <p style={{ color: '#708090', fontSize: '16px', marginBottom: '20px' }}>
      Tabel yang jarang di-vacuum menumpuk dead tuples dan menyebabkan bloat — disk membesar tapi row aktual sedikit. Transaction ID wraparound adalah ancaman paling fatal jika vacuum terabaikan.
    </p>

    <Block title="Dead Tuples & Jadwal Vacuum" color="#a78bfa">
      <Code color="#e2d9f3">{`-- ── Tabel dengan dead tuples terbanyak ─────────────────────
SELECT
  schemaname,
  relname                     AS tablename,
  n_live_tup                  AS live_rows,
  n_dead_tup                  AS dead_rows,
  round(
    n_dead_tup::numeric / nullif(n_live_tup + n_dead_tup, 0) * 100, 2
  )                           AS dead_pct,
  last_vacuum,
  last_autovacuum,
  last_analyze,
  last_autoanalyze
FROM pg_stat_user_tables
WHERE n_dead_tup > 1000
ORDER BY dead_rows DESC
LIMIT 20;

-- ── Paksa vacuum pada tabel tertentu ─────────────────────────
VACUUM (VERBOSE, ANALYZE) public.orders;

-- ── Vacuum full (kunci tabel — hati-hati di production!) ──────
-- VACUUM FULL public.orders;`}</Code>
    </Block>

    <Block title="Transaction ID Wraparound — Ancaman Paling Fatal" color="#f87171">
      <Note color="#fca5a5">Jika age(relfrozenxid) mendekati 2 miliar, PostgreSQL akan shutdown sendiri! Monitor ini wajib.</Note>
      <Code color="#fecaca">{`-- ── Jarak menuju wraparound (semakin kecil semakin bahaya) ──
SELECT
  datname,
  age(datfrozenxid)                 AS db_age,
  2000000000 - age(datfrozenxid)    AS txids_remaining,
  round(age(datfrozenxid)::numeric / 2000000000 * 100, 2) AS danger_pct
FROM pg_database
ORDER BY db_age DESC;

-- ── Per tabel — tabel yang paling tua ────────────────────────
SELECT
  schemaname,
  relname,
  age(relfrozenxid)                 AS table_age,
  2000000000 - age(relfrozenxid)    AS txids_remaining
FROM pg_class
JOIN pg_namespace ON pg_class.relnamespace = pg_namespace.oid
WHERE relkind = 'r'
  AND age(relfrozenxid) > 500000000   -- waspada: > 500 juta
ORDER BY table_age DESC
LIMIT 20;

-- ── Alert threshold (jalankan VACUUM FREEZE jika > 1.5 M) ────
-- autovacuum_freeze_max_age = 200000000  (default)
-- Ubah di postgresql.conf jika tabel sangat aktif:
-- autovacuum_freeze_max_age = 150000000`}</Code>
    </Block>

    <Block title="pg_stat_progress_vacuum — Monitor Vacuum Live" color="#4ade80">
      <Code color="#bbf7d0">{`-- ── Vacuum yang sedang berjalan saat ini ────────────────────
SELECT
  p.pid,
  a.usename,
  p.relid::regclass               AS table_name,
  p.phase,                        -- scanning heap | vacuuming indexes | ...
  p.heap_blks_total,
  p.heap_blks_scanned,
  p.heap_blks_vacuumed,
  round(
    p.heap_blks_scanned::numeric / nullif(p.heap_blks_total, 0) * 100, 2
  )                               AS progress_pct,
  p.index_vacuum_count,
  p.num_dead_tuples,
  now() - a.query_start           AS running_for
FROM pg_stat_progress_vacuum p
JOIN pg_stat_activity a ON a.pid = p.pid;`}</Code>
    </Block>

    <Block title="Estimasi Bloat Tabel & Index" color="#fbbf24">
      <Note>Bloat = ruang yang ditempati dead tuples atau fragmented pages. Tabel ideal: bloat &lt; 20%.</Note>
      <Code color="#fef9c3">{`-- ── Estimasi bloat tabel (approx) ──────────────────────────
SELECT
  schemaname,
  relname                           AS tablename,
  pg_size_pretty(pg_relation_size(relid))  AS actual_size,
  n_dead_tup,
  n_live_tup,
  round(
    n_dead_tup::numeric / nullif(n_live_tup + n_dead_tup, 0) * 100, 2
  ) AS dead_pct,
  pg_size_pretty(
    pg_relation_size(relid) * n_dead_tup / nullif(n_live_tup + n_dead_tup, 1)
  ) AS est_bloat_size
FROM pg_stat_user_tables
WHERE n_live_tup + n_dead_tup > 0
ORDER BY pg_relation_size(relid) * n_dead_tup / nullif(n_live_tup + n_dead_tup, 1) DESC
LIMIT 20;

-- ── pgstattuple — bloat akurat (perlu install extension) ─────
CREATE EXTENSION IF NOT EXISTS pgstattuple;

SELECT * FROM pgstattuple('public.orders');
-- kolom: table_len, tuple_percent, dead_tuple_percent, free_space, free_percent`}</Code>
    </Block>
  </div>
)

// ─── CONNECTIONS ──────────────────────────────────────────────────────────────

const Connections = () => (
  <div>
    <h3 style={{ color: '#64c8ff', fontWeight: 'bold', fontSize: '20px', marginBottom: '4px' }}>Connections & Pool</h3>
    <p style={{ color: '#708090', fontSize: '16px', marginBottom: '20px' }}>
      PostgreSQL membuat satu proses per koneksi. Terlalu banyak koneksi = RAM habis dan context switch tinggi. Monitor usage vs max_connections dan gunakan connection pooler.
    </p>

    <Block title="Penggunaan Koneksi" color="#64c8ff">
      <Code>{`-- ── Total koneksi vs max_connections ───────────────────────
SELECT
  max_conn,
  used_conn,
  reserved_conn,
  max_conn - used_conn - reserved_conn AS available,
  round(used_conn::numeric / max_conn * 100, 2) AS usage_pct
FROM (
  SELECT
    (SELECT setting::int FROM pg_settings WHERE name = 'max_connections') AS max_conn,
    (SELECT count(*) FROM pg_stat_activity WHERE pid <> pg_backend_pid()) AS used_conn,
    (SELECT setting::int FROM pg_settings WHERE name = 'superuser_reserved_connections') AS reserved_conn
) t;

-- ── Koneksi per user & database ──────────────────────────────
SELECT
  datname AS database,
  usename AS username,
  state,
  count(*) AS connections
FROM pg_stat_activity
WHERE pid <> pg_backend_pid()
GROUP BY datname, usename, state
ORDER BY connections DESC;

-- ── Per application_name ──────────────────────────────────────
SELECT
  application_name,
  count(*) AS total,
  count(*) FILTER (WHERE state = 'active')             AS active,
  count(*) FILTER (WHERE state = 'idle')               AS idle,
  count(*) FILTER (WHERE state = 'idle in transaction') AS idle_tx
FROM pg_stat_activity
WHERE pid <> pg_backend_pid()
GROUP BY application_name
ORDER BY total DESC;`}</Code>
    </Block>

    <Block title="Connection Limits per Role & Database" color="#a78bfa">
      <Code color="#e2d9f3">{`-- ── Cek limit koneksi per database ─────────────────────────
SELECT datname, datconnlimit,
       (SELECT count(*) FROM pg_stat_activity WHERE datname = pg_database.datname) AS current_conn
FROM pg_database
WHERE datistemplate = false;

-- ── Set limit koneksi per database ───────────────────────────
ALTER DATABASE myapp CONNECTION LIMIT 200;

-- ── Cek limit koneksi per role ────────────────────────────────
SELECT rolname, rolconnlimit
FROM pg_roles
WHERE rolconnlimit <> -1;

-- ── Set limit per role ────────────────────────────────────────
ALTER ROLE appuser CONNECTION LIMIT 50;

-- ── Kill semua koneksi ke database tertentu ───────────────────
-- (berguna sebelum maintenance atau DROP DATABASE)
SELECT pg_terminate_backend(pid)
FROM pg_stat_activity
WHERE datname = 'myapp'
  AND pid <> pg_backend_pid();`}</Code>
    </Block>

    <Block title="postgresql.conf — Parameter Koneksi" color="#4ade80">
      <Code color="#bbf7d0">{`# ── Tuning koneksi (postgresql.conf) ────────────────────────
max_connections            = 200       # turunkan jika pakai pgBouncer
superuser_reserved_connections = 3    # cadangan untuk admin

# TCP keepalive — deteksi koneksi mati dari jaringan
tcp_keepalives_idle        = 60        # detik sebelum keepalive probe pertama
tcp_keepalives_interval    = 10        # interval antar probe
tcp_keepalives_count       = 6         # jumlah probe sebelum dinyatakan mati

# Timeout koneksi idle
idle_in_transaction_session_timeout = '5min'   # kill idle-in-transaction
statement_timeout                   = '30s'    # kill query yang terlalu lama (opsional)
lock_timeout                        = '10s'    # kill jika menunggu lock terlalu lama

# ── Reload tanpa restart ──────────────────────────────────────
SELECT pg_reload_conf();`}</Code>
      <Note>Dengan pgBouncer (transaction pooling), max_connections bisa diturunkan ke 100-200 meski ada ribuan client.</Note>
    </Block>
  </div>
)

// ─── LOGS & SLOW QUERY ────────────────────────────────────────────────────────

const Logs = () => (
  <div>
    <h3 style={{ color: '#64c8ff', fontWeight: 'bold', fontSize: '20px', marginBottom: '4px' }}>Logs & Slow Query</h3>
    <p style={{ color: '#708090', fontSize: '16px', marginBottom: '20px' }}>
      Log adalah sumber investigasi pertama saat ada masalah. Aktifkan slow query log dan pg_stat_statements untuk menangkap query bermasalah tanpa overhead besar.
    </p>

    <Block title="postgresql.conf — Konfigurasi Log" color="#64c8ff">
      <Code>{`# ── Logging destination ──────────────────────────────────────
log_destination        = 'csvlog'          # csvlog | stderr | syslog
logging_collector      = on
log_directory          = 'pg_log'
log_filename           = 'postgresql-%Y-%m-%d_%H%M%S.log'
log_rotation_age       = 1d
log_rotation_size      = 100MB
log_truncate_on_rotation = on

# ── Slow query ────────────────────────────────────────────────
log_min_duration_statement = 1000         # log query > 1 detik (ms)
# set ke -1 untuk disable, 0 untuk log SEMUA query

# ── Log apa yang dicatat ──────────────────────────────────────
log_checkpoints        = on               # checkpoint info
log_connections        = on               # setiap koneksi baru
log_disconnections     = on               # setiap koneksi putus
log_lock_waits         = on               # lock wait > deadlock_timeout
log_temp_files         = 0                # log semua temp file (MB, 0 = semua)
log_autovacuum_min_duration = 250ms       # autovacuum yang lambat

# ── Format log ────────────────────────────────────────────────
log_line_prefix        = '%m [%p] %q%u@%d '  # timestamp, pid, user@db
log_error_verbosity    = default

# ── Reload ────────────────────────────────────────────────────
SELECT pg_reload_conf();`}</Code>
    </Block>

    <Block title="pg_stat_statements — Top Query by Time" color="#4ade80">
      <Code color="#bbf7d0">{`-- ── Setup (sekali saja) ─────────────────────────────────────
-- shared_preload_libraries = 'pg_stat_statements'  -- di postgresql.conf, butuh restart
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;

-- ── Top 20 query paling mahal (total time) ───────────────────
SELECT
  round(total_exec_time::numeric, 2)               AS total_ms,
  calls,
  round(mean_exec_time::numeric, 2)                AS mean_ms,
  round(stddev_exec_time::numeric, 2)              AS stddev_ms,
  round(total_exec_time::numeric / sum(total_exec_time) OVER () * 100, 2) AS pct_total,
  rows,
  round(rows::numeric / calls, 2)                  AS rows_per_call,
  left(query, 100)                                 AS query
FROM pg_stat_statements
ORDER BY total_exec_time DESC
LIMIT 20;

-- ── Top 20 query paling lambat rata-rata ─────────────────────
SELECT
  round(mean_exec_time::numeric, 2) AS mean_ms,
  calls,
  left(query, 100) AS query
FROM pg_stat_statements
WHERE calls > 10
ORDER BY mean_exec_time DESC
LIMIT 20;

-- ── Reset statistik ───────────────────────────────────────────
SELECT pg_stat_statements_reset();`}</Code>
    </Block>

    <Block title="auto_explain — EXPLAIN Otomatis untuk Query Lambat" color="#a78bfa">
      <Code color="#e2d9f3">{`# ── postgresql.conf ─────────────────────────────────────────
shared_preload_libraries = 'pg_stat_statements, auto_explain'

auto_explain.log_min_duration = 500      # log plan jika > 500ms
auto_explain.log_analyze      = on       # sertakan waktu aktual (EXPLAIN ANALYZE)
auto_explain.log_buffers      = on       # sertakan buffer stats
auto_explain.log_format       = text     # text | json | yaml
auto_explain.log_nested_statements = on  # log juga subquery dalam fungsi

# ── Aktifkan untuk satu session (tanpa restart) ───────────────
LOAD 'auto_explain';
SET auto_explain.log_min_duration = '500ms';
SET auto_explain.log_analyze = true;

-- jalankan query yang ingin didiagnosa —
-- plan langsung muncul di log PostgreSQL`}</Code>
    </Block>

    <Block title="pgBadger — Analisis Log" color="#fbbf24">
      <Code color="#fef9c3">{`# Install
apt install pgbadger
# atau: cpan App::pgbadger

# Analisis log hari ini → buat HTML report
pgbadger /var/log/postgresql/postgresql-$(date +%F).log \\
  -o /var/www/html/pgbadger/report.html

# Analisis semua log dalam direktori (mode incremental)
pgbadger /var/log/postgresql/*.log \\
  --incremental \\
  --outdir /var/www/html/pgbadger/ \\
  --format csv                    # jika log_destination=csvlog

# Report otomatis via cron (harian)
# 0 1 * * * pgbadger /var/log/postgresql/*.log -o /reports/pg_$(date +\%F).html`}</Code>
      <Note>pgBadger menghasilkan statistik: top slow queries, normalize query, lock waits, connection stats, checkpoint frequency.</Note>
    </Block>
  </div>
)

// ─── PROMETHEUS & GRAFANA ─────────────────────────────────────────────────────

const PrometheusGrafana = () => (
  <div>
    <h3 style={{ color: '#64c8ff', fontWeight: 'bold', fontSize: '20px', marginBottom: '4px' }}>Prometheus & Grafana</h3>
    <p style={{ color: '#708090', fontSize: '16px', marginBottom: '20px' }}>
      postgres_exporter mengekspos semua metrik PostgreSQL ke format Prometheus. Grafana menyediakan dashboard visual. Stack ini adalah standar industri untuk monitoring production PostgreSQL.
    </p>

    <Block title="Arsitektur Stack Monitoring" color="#64c8ff">
      <Code>{`
  ┌─────────────────────┐     scrape /metrics      ┌───────────────────┐
  │  postgres_exporter  │◄────────────────────────  │   Prometheus      │
  │  :9187              │                            │   (time-series DB)│
  │                     │                            └─────────┬─────────┘
  │  query pg_stat_*    │                                      │  PromQL
  └────────┬────────────┘                            ┌─────────▼─────────┐
           │  SQL                                    │   Grafana          │
           ▼                                         │   (dashboard)      │
  ┌─────────────────────┐                            └─────────┬─────────┘
  │  PostgreSQL          │                                      │  alert
  │  :5432               │                            ┌─────────▼─────────┐
  └─────────────────────┘                             │ AlertManager       │
                                                      │ (Slack, PagerDuty) │
                                                      └───────────────────┘
`}</Code>
    </Block>

    <Block title="postgres_exporter — Setup" color="#4ade80">
      <Code color="#bbf7d0">{`# ── Download & install ───────────────────────────────────────
wget https://github.com/prometheus-community/postgres_exporter/releases/download/v0.15.0/postgres_exporter_v0.15.0_linux-amd64.tar.gz
tar xzf postgres_exporter_*.tar.gz
mv postgres_exporter /usr/local/bin/

# ── Buat user monitoring (minimal privilege) ──────────────────
CREATE USER pg_monitor_user WITH PASSWORD 'M0n1t0r@Pass!';
GRANT pg_monitor TO pg_monitor_user;           -- role bawaan PG 10+
GRANT CONNECT ON DATABASE myapp TO pg_monitor_user;

# ── Environment file /etc/postgres_exporter/postgres_exporter.env
DATA_SOURCE_NAME="postgresql://pg_monitor_user:M0n1t0r@Pass!@localhost:5432/postgres?sslmode=disable"

# ── Systemd unit ──────────────────────────────────────────────
cat > /etc/systemd/system/postgres_exporter.service << 'EOF'
[Unit]
Description=Prometheus PostgreSQL Exporter
After=network.target

[Service]
User=postgres
EnvironmentFile=/etc/postgres_exporter/postgres_exporter.env
ExecStart=/usr/local/bin/postgres_exporter \\
  --web.listen-address=:9187 \\
  --extend.query-path=/etc/postgres_exporter/queries.yaml
Restart=on-failure

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable postgres_exporter
systemctl start postgres_exporter

# ── Verifikasi ────────────────────────────────────────────────
curl -s http://localhost:9187/metrics | grep pg_up`}</Code>
    </Block>

    <Block title="Custom Queries — queries.yaml" color="#a78bfa">
      <Code color="#e2d9f3">{`# /etc/postgres_exporter/queries.yaml

pg_connection_states:
  query: |
    SELECT state, count(*) AS count
    FROM pg_stat_activity
    WHERE pid <> pg_backend_pid()
    GROUP BY state
  metrics:
    - state:
        usage: LABEL
        description: "Connection state"
    - count:
        usage: GAUGE
        description: "Number of connections in this state"

pg_bloat:
  query: |
    SELECT schemaname, relname AS tablename,
           n_dead_tup,
           round(n_dead_tup::numeric / nullif(n_live_tup+n_dead_tup,0)*100,2) AS dead_pct
    FROM pg_stat_user_tables
    WHERE n_live_tup + n_dead_tup > 0
  metrics:
    - schemaname:
        usage: LABEL
    - tablename:
        usage: LABEL
    - n_dead_tup:
        usage: GAUGE
        description: "Dead tuples count"
    - dead_pct:
        usage: GAUGE
        description: "Dead tuple percentage"`}</Code>
    </Block>

    <Block title="Prometheus scrape_config" color="#fbbf24">
      <Code color="#fef9c3">{`# prometheus.yml
scrape_configs:
  - job_name: postgresql
    static_configs:
      - targets:
          - "pg-node1:9187"
          - "pg-node2:9187"
          - "pg-node3:9187"
    relabel_configs:
      - source_labels: [__address__]
        target_label: instance
    scrape_interval: 15s
    scrape_timeout:  10s`}</Code>
    </Block>

    <Block title="Grafana — Dashboard PostgreSQL" color="#f97316">
      <Code color="#fed7aa">{`# ── Dashboard siap pakai dari grafana.com ────────────────────
# ID 9628  — PostgreSQL Database (postgres_exporter)
# ID 455   — PostgreSQL Overview
# ID 12485 — PostgreSQL Statistics

# ── Import via UI ─────────────────────────────────────────────
# Grafana → Dashboards → Import → masukkan ID → Load

# ── Panel PromQL penting ──────────────────────────────────────

# Koneksi aktif
pg_stat_activity_count{state="active"}

# Cache hit ratio
rate(pg_stat_database_blks_hit[5m]) /
  (rate(pg_stat_database_blks_hit[5m]) + rate(pg_stat_database_blks_read[5m]))

# TPS (transactions per second)
rate(pg_stat_database_xact_commit[1m]) + rate(pg_stat_database_xact_rollback[1m])

# Replication lag (bytes)
pg_replication_slots_pg_wal_lsn_diff

# Dead tuple percentage
pg_stat_user_tables_n_dead_tup /
  (pg_stat_user_tables_n_live_tup + pg_stat_user_tables_n_dead_tup + 1) * 100`}</Code>
    </Block>
  </div>
)

// ─── ALERTING ─────────────────────────────────────────────────────────────────

const Alerting = () => (
  <div>
    <h3 style={{ color: '#64c8ff', fontWeight: 'bold', fontSize: '20px', marginBottom: '4px' }}>Alert Rules Production</h3>
    <p style={{ color: '#708090', fontSize: '16px', marginBottom: '20px' }}>
      Alert yang terlalu banyak = alert fatigue. Fokus pada yang benar-benar membutuhkan respons segera. Berikut alert minimal yang wajib ada di setiap cluster production.
    </p>

    <Block title="Alert Rules Prometheus (alerts.yml)" color="#f87171">
      <Code color="#fecaca">{`groups:
  - name: postgresql
    interval: 30s
    rules:

      # ── Instance Down ────────────────────────────────────────
      - alert: PostgreSQLDown
        expr: pg_up == 0
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "PostgreSQL {{ $labels.instance }} is down"

      # ── Koneksi hampir penuh ──────────────────────────────────
      - alert: PostgreSQLConnectionsCritical
        expr: |
          pg_stat_activity_count / pg_settings_max_connections > 0.90
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: "Connections > 90% of max_connections on {{ $labels.instance }}"

      # ── Cache hit ratio rendah ────────────────────────────────
      - alert: PostgreSQLLowCacheHitRate
        expr: |
          rate(pg_stat_database_blks_hit[5m]) /
          (rate(pg_stat_database_blks_hit[5m]) + rate(pg_stat_database_blks_read[5m]) + 1) < 0.95
        for: 10m
        labels:
          severity: warning
        annotations:
          summary: "Cache hit rate < 95% on {{ $labels.instance }}"

      # ── Replication lag ───────────────────────────────────────
      - alert: PostgreSQLReplicationLagHigh
        expr: pg_replication_lag > 30
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: "Replication lag > 30s on {{ $labels.instance }}"

      # ── Dead locks ────────────────────────────────────────────
      - alert: PostgreSQLDeadlocks
        expr: rate(pg_stat_database_deadlocks[5m]) > 0
        for: 1m
        labels:
          severity: warning
        annotations:
          summary: "Deadlocks detected on {{ $labels.instance }}"

      # ── Long-running query ────────────────────────────────────
      - alert: PostgreSQLLongRunningQuery
        expr: |
          pg_stat_activity_max_tx_duration{state="active"} > 300
        for: 1m
        labels:
          severity: warning
        annotations:
          summary: "Query running > 5 minutes on {{ $labels.instance }}"

      # ── Transaction ID wraparound ─────────────────────────────
      - alert: PostgreSQLXIDWraparoundDanger
        expr: |
          pg_database_age_datfrozenxid > 1500000000
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "XID wraparound danger on {{ $labels.instance }} — run VACUUM FREEZE now!"

      # ── Disk mendekati penuh ──────────────────────────────────
      - alert: PostgreSQLDiskFull
        expr: |
          (node_filesystem_size_bytes{mountpoint="/var/lib/postgresql"} -
           node_filesystem_free_bytes{mountpoint="/var/lib/postgresql"}) /
           node_filesystem_size_bytes{mountpoint="/var/lib/postgresql"} > 0.85
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "PostgreSQL data disk > 85% full on {{ $labels.instance }}"`}</Code>
    </Block>

    <Block title="Tabel Prioritas Alert" color="#fbbf24">
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'rgba(251,191,36,0.12)' }}>
              {['Alert', 'Severity', 'Threshold', 'Aksi'].map(h => (
                <th key={h} style={{ padding: '8px 12px', color: '#fbbf24', textAlign: 'left', fontSize: '14px' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['PostgreSQL Down',          'critical', 'pg_up == 0',                           'Cek systemd status, cek log'],
              ['Connections > 90%',        'critical', '> 90% max_connections',                'Restart pgBouncer, kill idle conn'],
              ['XID Wraparound',           'critical', 'age > 1.5 miliar',                     'Jalankan VACUUM FREEZE segera'],
              ['Disk > 85%',               'critical', '>85% mountpoint data',                 'Hapus log lama, VACUUM FULL, tambah disk'],
              ['Replication Lag > 30s',    'warning',  'lag > 30 detik',                       'Cek network, cek query berat di replica'],
              ['Cache Hit < 95%',          'warning',  'hit ratio < 95%',                      'Tambah shared_buffers / RAM'],
              ['Long Running Query > 5m',  'warning',  'active query > 300 detik',             'Investigate query, pg_terminate_backend'],
              ['Deadlocks',                'warning',  'rate deadlock > 0',                    'Cek aplikasi, fix urutan lock'],
              ['Autovacuum Disabled',      'warning',  'autovacuum = off',                     'Re-enable autovacuum segera'],
            ].map(([alert, sev, thr, action]) => (
              <tr key={alert} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '8px 12px', color: '#a0c8ff', fontSize: '14px' }}>{alert}</td>
                <td style={{ padding: '8px 12px', fontSize: '14px' }}>
                  <Badge color={sev === 'critical' ? '#f87171' : '#fbbf24'}>{sev}</Badge>
                </td>
                <td style={{ padding: '8px 12px', color: '#708090', fontSize: '13px', fontFamily: 'monospace' }}>{thr}</td>
                <td style={{ padding: '8px 12px', color: '#a0c8ff', fontSize: '13px' }}>{action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Block>
  </div>
)

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function Monitoring() {
  const [activeTab, setActiveTab] = useState('overview')

  const content = {
    overview:    <Overview />,
    activity:    <Activity />,
    tables:      <Tables />,
    vacuum:      <Vacuum />,
    connections: <Connections />,
    logs:        <Logs />,
    prometheus:  <PrometheusGrafana />,
    alerts:      <Alerting />,
  }

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '32px 0' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ color: '#ffffff', fontWeight: 'bold', fontSize: '28px', marginBottom: '8px' }}>
          📊 Monitoring PostgreSQL
        </h1>
        <p style={{ color: '#708090', fontSize: '16px' }}>
          pg_stat_activity, locks, vacuum, connections, slow query log, Prometheus + Grafana, dan alert rules production.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '6px', marginBottom: '32px', borderBottom: '1px solid rgba(100,200,255,0.2)', paddingBottom: '16px', overflowX: 'auto' }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            title={tab.desc}
            style={{
              padding: '10px 14px',
              fontWeight: '500',
              whiteSpace: 'nowrap',
              fontSize: '13px',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              color: activeTab === tab.id ? '#64c8ff' : '#708090',
              borderBottom: activeTab === tab.id ? '3px solid #64c8ff' : '3px solid transparent',
              transition: 'all 0.2s',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {content[activeTab]}
    </div>
  )
}
