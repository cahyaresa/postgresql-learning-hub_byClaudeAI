import React, { useState } from 'react'

const tabs = [
  { id: 'overview',    label: '📖 Overview',       desc: 'Scaling konsep & strategi' },
  { id: 'scale-up',    label: '⬆️ Scale Up',        desc: 'Vertical scaling & tuning' },
  { id: 'scale-out',   label: '🌐 Scale Out',       desc: 'Horizontal: read replica & sharding' },
  { id: 'replication', label: '🔁 Replication',     desc: 'Streaming & logical replication' },
  { id: 'pgbouncer',   label: '🏊 pgBouncer',       desc: 'Connection pooling' },
  { id: 'fdw',         label: '🔗 FDW',             desc: 'Foreign Data Wrapper' },
  { id: 'partitioning',label: '🗂️ Partitioning',    desc: 'Scaling via table partitioning' },
  { id: 'monitoring',  label: '📊 Monitoring',      desc: 'Metrics & bottleneck detection' },
]

const Block = ({ title, color = '#64c8ff', children }) => (
  <div style={{ background: `${color}0d`, border: `1px solid ${color}33`, borderRadius: '8px', padding: '14px 16px', marginBottom: '14px' }}>
    <p style={{ color, fontWeight: 'bold', fontSize: '16px', marginBottom: '10px' }}>{title}</p>
    {children}
  </div>
)

const Code = ({ children }) => (
  <pre style={{ background: 'rgba(0,0,0,0.38)', padding: '12px', borderRadius: '6px', fontFamily: 'monospace', fontSize: '15px', color: '#a0c8ff', overflow: 'auto', lineHeight: '1.9', margin: 0 }}>
    {children}
  </pre>
)

const Note = ({ children, color = '#708090' }) => (
  <p style={{ color, fontSize: '15px', marginTop: '8px', lineHeight: '1.7' }}>{children}</p>
)

const Tag = ({ children, color }) => (
  <span style={{ background: `${color}22`, border: `1px solid ${color}55`, color, borderRadius: '4px', padding: '2px 8px', fontSize: '14px', fontWeight: 'bold', marginRight: '6px' }}>
    {children}
  </span>
)

// ─────────────────────────────────────────────────────────────────────────────

const Overview = () => (
  <div>
    <h3 style={{ color: '#64c8ff', fontWeight: 'bold', fontSize: '20px', marginBottom: '16px' }}>
      Scaling PostgreSQL — Strategi & Kapan Menggunakannya
    </h3>

    <Block title="💡 Dua Dimensi Scaling" color="#64c8ff">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        {[
          {
            name: '⬆️ Scale Up (Vertical)',
            color: '#4ade80',
            points: [
              'Tambah CPU, RAM, storage di server yang sama',
              'Tidak ubah arsitektur aplikasi',
              'Ada batas fisik & biaya tinggi',
              'Cocok: database utama, pertama dilakukan',
            ],
          },
          {
            name: '🌐 Scale Out (Horizontal)',
            color: '#38bdf8',
            points: [
              'Tambah lebih banyak server/node',
              'Read replicas, sharding, partitioning',
              'Butuh perubahan arsitektur & tooling',
              'Cocok: setelah vertical mencapai batas',
            ],
          },
        ].map((s, i) => (
          <div key={i} style={{ background: `${s.color}11`, border: `1px solid ${s.color}33`, borderRadius: '8px', padding: '12px' }}>
            <p style={{ color: s.color, fontWeight: 'bold', fontSize: '16px', marginBottom: '8px' }}>{s.name}</p>
            <ul style={{ color: '#a0c8ff', fontSize: '15px', marginLeft: '14px', lineHeight: '1.9' }}>
              {s.points.map((p, j) => <li key={j}>{p}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </Block>

    <Block title="🗺️ Arsitektur Scaling Berlapis" color="#fbbf24">
      <Code>
{`Tier 1 — Scale Up
  └─ Upgrade CPU (lebih core), RAM (shared_buffers), SSD NVMe
  └─ Tuning postgresql.conf (work_mem, parallel query, checkpoint)
  └─ Query optimization (index, EXPLAIN ANALYZE, vacuuming)

Tier 2 — Connection Pooling (pgBouncer)
  └─ Satu process PostgreSQL bisa layani ribuan koneksi app
  └─ Kurangi overhead fork process per koneksi

Tier 3 — Read Replicas (Scale Out Read)
  └─ Streaming replication → 1+ standby server
  └─ Route SELECT ke replica, INSERT/UPDATE/DELETE ke primary
  └─ HAProxy / PgBouncer / pgpool-II untuk routing

Tier 4 — Partitioning
  └─ Pecah tabel besar per range/list/hash
  └─ Partition pruning = lebih cepat, indeks lebih kecil
  └─ ATTACH/DETACH partition untuk archiving

Tier 5 — Foreign Data Wrapper (FDW)
  └─ Query data dari server PostgreSQL/MySQL/CSV/S3 lain
  └─ Federasi data tanpa replikasi fisik
  └─ Cross-database join dalam satu query

Tier 6 — Citus / Sharding
  └─ Distribusi data ke banyak node (shard)
  └─ Paralel query lintas shard
  └─ Kompleks: hanya jika tier 1–5 tidak cukup`}
      </Code>
    </Block>

    <Block title="⚡ Decision Matrix — Pilih strategi yang tepat" color="#a78bfa">
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', color: '#a0c8ff', fontSize: '15px', borderCollapse: 'collapse' }}>
          <tbody>
            <tr style={{ borderBottom: '1px solid rgba(167,139,250,0.3)' }}>
              <td style={{ padding: '6px 8px', color: '#a78bfa', fontWeight: 'bold' }}>Masalah</td>
              <td style={{ padding: '6px 8px', color: '#a78bfa', fontWeight: 'bold' }}>Solusi Utama</td>
              <td style={{ padding: '6px 8px', color: '#a78bfa', fontWeight: 'bold' }}>Tools</td>
            </tr>
            {[
              ['Query lambat', 'Indexing + EXPLAIN + tuning', 'EXPLAIN ANALYZE, pg_stat_statements'],
              ['Terlalu banyak koneksi', 'Connection pooling', 'pgBouncer'],
              ['Read bottleneck', 'Read replicas', 'Streaming replication + HAProxy'],
              ['Write bottleneck', 'Scale up primary + tuning WAL', 'faster disk, sync_commit=off'],
              ['Tabel > 100GB', 'Table partitioning', 'PARTITION BY RANGE/LIST/HASH'],
              ['Data di banyak server', 'Foreign Data Wrapper', 'postgres_fdw, file_fdw'],
              ['Skala > 1TB writes/day', 'Sharding', 'Citus, manual sharding'],
            ].map(([problem, solution, tools], i) => (
              <tr key={i} style={{ borderBottom: '1px solid rgba(100,200,255,0.08)' }}>
                <td style={{ padding: '6px 8px', color: '#f87171' }}>{problem}</td>
                <td style={{ padding: '6px 8px', color: '#4ade80' }}>{solution}</td>
                <td style={{ padding: '6px 8px', color: '#fbbf24', fontFamily: 'monospace', fontSize: '14px' }}>{tools}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Block>
  </div>
)

const ScaleUp = () => (
  <div>
    <h3 style={{ color: '#4ade80', fontWeight: 'bold', fontSize: '20px', marginBottom: '16px' }}>
      Scale Up — Vertical Scaling & Tuning postgresql.conf
    </h3>

    <Block title="🖥️ Hardware Sizing Guidelines" color="#4ade80">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
        {[
          { label: 'RAM', color: '#4ade80', tips: ['shared_buffers = 25% total RAM', 'effective_cache_size = 75% total RAM', 'work_mem = RAM / (max_connections × 2)', 'huge_pages = on (jika > 32GB RAM)'] },
          { label: 'CPU', color: '#38bdf8', tips: ['max_worker_processes = jumlah core', 'max_parallel_workers = jumlah core', 'max_parallel_workers_per_gather = core/2', 'parallel_setup_cost, parallel_tuple_cost'] },
          { label: 'Disk (I/O)', color: '#fbbf24', tips: ['random_page_cost = 1.1 (SSD) / 4.0 (HDD)', 'effective_io_concurrency = 200 (SSD)', 'checkpoint_completion_target = 0.9', 'wal_compression = on'] },
          { label: 'Connections', color: '#f87171', tips: ['max_connections = 100–200 (gunakan pgBouncer)', 'idle_in_transaction_session_timeout', 'statement_timeout untuk query limit', 'lock_timeout untuk deadlock prevention'] },
        ].map((s, i) => (
          <div key={i} style={{ background: `${s.color}11`, border: `1px solid ${s.color}33`, borderRadius: '8px', padding: '10px 12px' }}>
            <p style={{ color: s.color, fontWeight: 'bold', fontSize: '15px', marginBottom: '6px' }}>{s.label}</p>
            <ul style={{ color: '#a0c8ff', fontSize: '15px', marginLeft: '12px', lineHeight: '1.9' }}>
              {s.tips.map((t, j) => <li key={j}>{t}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </Block>

    <Block title="⚙️ postgresql.conf — Konfigurasi krusial untuk performance" color="#fbbf24">
      <Code>
{`# ─── MEMORY ───────────────────────────────────────────────────
# Server: 32GB RAM

shared_buffers       = 8GB          # 25% RAM — cache data pages di memory
effective_cache_size = 24GB         # estimasi total OS + PG cache (hint untuk planner)
work_mem             = 64MB         # per sort/hash operation per query
                                    # HATI-HATI: bisa × max_connections × operasi paralel
maintenance_work_mem = 2GB          # untuk VACUUM, CREATE INDEX, ALTER TABLE
wal_buffers          = 64MB         # buffer WAL sebelum flush (default: auto)
huge_pages           = try          # aktifkan HugePages jika OS support

# ─── CHECKPOINT & WAL ─────────────────────────────────────────
checkpoint_timeout          = 15min  # seberapa sering checkpoint (default 5min)
checkpoint_completion_target = 0.9   # spread I/O checkpoint selama 90% interval
max_wal_size                = 4GB    # batas WAL sebelum paksa checkpoint
min_wal_size                = 1GB
wal_compression             = on     # kompresi WAL record (hemat disk & I/O)
wal_level                   = replica # minimal untuk streaming replication
archive_mode                = on      # aktifkan WAL archiving
archive_command             = 'cp %p /mnt/wal_archive/%f'

# ─── PARALLEL QUERY ───────────────────────────────────────────
max_worker_processes           = 16  # = jumlah CPU core
max_parallel_workers           = 16
max_parallel_workers_per_gather = 8  # per query
max_parallel_maintenance_workers = 4 # untuk CREATE INDEX, VACUUM

# ─── PLANNER / OPTIMIZER ──────────────────────────────────────
random_page_cost    = 1.1    # SSD: 1.1, HDD: 4.0 (default)
effective_io_concurrency = 200  # SSD: 200, HDD: 2
seq_page_cost       = 1.0    # biaya baca sequential (baseline)

# ─── CONNECTIONS & TIMEOUT ────────────────────────────────────
max_connections                      = 200   # gunakan pgBouncer, jangan terlalu besar
superuser_reserved_connections       = 3
idle_in_transaction_session_timeout  = '10min'  # kill idle-in-transaction
statement_timeout                    = '0'       # 0 = tidak ada limit (set per role)
lock_timeout                         = '10s'     # hindari deadlock menggantung

# ─── LOGGING ──────────────────────────────────────────────────
log_min_duration_statement = 1000   # log query yang > 1 detik
log_checkpoints            = on
log_connections            = on
log_disconnections         = on
log_lock_waits             = on
log_temp_files             = 0      # log semua temp file

# ─── AUTOVACUUM ───────────────────────────────────────────────
autovacuum                     = on
autovacuum_max_workers         = 5
autovacuum_vacuum_cost_delay   = 2ms   # lebih agresif (default: 20ms)
autovacuum_vacuum_scale_factor = 0.05  # vacuum jika 5% baris dead (default: 0.2)
autovacuum_analyze_scale_factor= 0.02`}
      </Code>
    </Block>

    <Block title="🔄 Reload vs Restart" color="#38bdf8">
      <Code>
{`-- Parameter yang bisa reload tanpa restart (SIGHUP):
SELECT pg_reload_conf();
-- atau: pg_ctl reload -D $PGDATA

-- Contoh parameter reload-only:
-- work_mem, maintenance_work_mem, log_*, autovacuum_*,
-- checkpoint_timeout, wal_buffers, shared_preload_libraries (sebagian)

-- Parameter yang butuh RESTART:
-- shared_buffers, max_connections, wal_level,
-- max_worker_processes, listen_addresses, port

-- Cek apakah perubahan config sudah aktif
SELECT name, setting, unit, pending_restart
FROM pg_settings
WHERE pending_restart = TRUE;   -- butuh restart jika TRUE

-- Cek nilai parameter saat ini
SHOW shared_buffers;
SHOW work_mem;
SELECT current_setting('work_mem');

-- Set sementara di session (tidak persistent)
SET work_mem = '256MB';
SET LOCAL work_mem = '512MB';  -- hanya berlaku dalam transaksi`}
      </Code>
    </Block>

    <Block title="📈 pg_stat_statements — Identifikasi query lambat" color="#a78bfa">
      <Code>
{`-- Aktifkan extension
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
-- Tambahkan di postgresql.conf:
-- shared_preload_libraries = 'pg_stat_statements'
-- pg_stat_statements.track = all

-- Top 10 query paling lambat (total time)
SELECT
  LEFT(query, 80) AS query_snippet,
  calls,
  ROUND(total_exec_time::numeric, 2)       AS total_ms,
  ROUND(mean_exec_time::numeric, 2)        AS avg_ms,
  ROUND(stddev_exec_time::numeric, 2)      AS stddev_ms,
  rows,
  ROUND(100.0 * total_exec_time /
    SUM(total_exec_time) OVER (), 2)       AS pct_total
FROM pg_stat_statements
ORDER BY total_exec_time DESC
LIMIT 10;

-- Query dengan I/O tinggi (banyak baca dari disk)
SELECT LEFT(query, 80), calls,
  shared_blks_hit,
  shared_blks_read,
  ROUND(100.0 * shared_blks_hit /
    NULLIF(shared_blks_hit + shared_blks_read, 0), 2) AS cache_hit_pct
FROM pg_stat_statements
WHERE shared_blks_read > 1000
ORDER BY shared_blks_read DESC LIMIT 10;

-- Reset statistik
SELECT pg_stat_statements_reset();`}
      </Code>
    </Block>
  </div>
)

const ScaleOut = () => (
  <div>
    <h3 style={{ color: '#38bdf8', fontWeight: 'bold', fontSize: '20px', marginBottom: '16px' }}>
      Scale Out — Horizontal Scaling & Read Replicas
    </h3>

    <Block title="🏗️ Arsitektur Read Replica" color="#38bdf8">
      <Code>
{`Aplikasi
   │
   ├─── Write (INSERT/UPDATE/DELETE/DDL)
   │       └─→ PRIMARY (read-write)
   │                 │
   │         WAL streaming (async/sync)
   │                 │
   └─── Read  (SELECT)
           ├─→ REPLICA 1 (read-only)
           ├─→ REPLICA 2 (read-only)
           └─→ REPLICA 3 (read-only)

Routing layer: HAProxy / PgBouncer / pgpool-II / app-level
  - Semua write → port 5432 (primary)
  - Semua read  → port 5433 (replica pool)`}
      </Code>
    </Block>

    <Block title="⚙️ Setup Primary — postgresql.conf" color="#4ade80">
      <Code>
{`# postgresql.conf pada PRIMARY

wal_level                   = replica    # minimal untuk streaming rep
max_wal_senders             = 10         # maks koneksi replica serentak
max_replication_slots       = 10         # slot untuk setiap replica
wal_keep_size               = 1GB        # simpan WAL jika replica tertinggal
synchronous_commit          = on         # on=aman, off=performa (risk: loss ~few ms)

# Jika ingin synchronous replication (zero data loss):
# synchronous_standby_names = 'FIRST 1 (replica1, replica2)'

# pg_hba.conf: izinkan replica connect
# host replication replicator 10.0.2.0/24 scram-sha-256

# Buat user replication
CREATE ROLE replicator LOGIN REPLICATION PASSWORD 'ReplP@ss!';

# Buat replication slot (agar WAL tidak dihapus sebelum replica ambil)
SELECT pg_create_physical_replication_slot('replica1_slot');
SELECT * FROM pg_replication_slots;`}
      </Code>
    </Block>

    <Block title="⚙️ Setup Replica — postgresql.conf & pg_basebackup" color="#fbbf24">
      <Code>
{`# ── STEP 1: Base backup dari primary ─────────────────────────
pg_basebackup \
  -h primary-host \
  -U replicator \
  -D /var/lib/postgresql/data \
  -P -Xs -R            # -R: auto-buat standby.signal + postgresql.auto.conf
  --slot=replica1_slot # gunakan replication slot

# ── STEP 2: postgresql.conf pada REPLICA ─────────────────────
hot_standby            = on      # izinkan SELECT saat recovery
hot_standby_feedback   = on      # beri feedback ke primary (cegah vacuum hapus baris yang dipakai replica)
max_standby_streaming_delay = 30s  # tunggu max 30s sebelum cancel query replica karena conflict
recovery_min_apply_delay    = 0    # delay terapkan WAL (untuk delayed replica)

# ── STEP 3: postgresql.auto.conf (auto-dibuat oleh pg_basebackup -R) ─
primary_conninfo = 'host=10.0.1.10 port=5432 user=replicator password=ReplP@ss! application_name=replica1'
primary_slot_name = 'replica1_slot'

# File standby.signal harus ada di $PGDATA:
touch $PGDATA/standby.signal

# ── STEP 4: Start replica ─────────────────────────────────────
pg_ctl start -D /var/lib/postgresql/data

# ── Cek status dari primary ───────────────────────────────────
SELECT application_name, state, sent_lsn, write_lsn,
       flush_lsn, replay_lsn,
       (sent_lsn - replay_lsn) AS replication_lag_bytes,
       sync_state
FROM pg_stat_replication;

# Cek lag dalam waktu (dari replica)
SELECT NOW() - pg_last_xact_replay_timestamp() AS replication_lag;

# Cek apakah node adalah replica
SELECT pg_is_in_recovery();   -- TRUE = replica, FALSE = primary`}
      </Code>
    </Block>

    <Block title="🔄 Promote Replica → Primary (Failover)" color="#f87171">
      <Code>
{`# Jika primary mati, promote replica menjadi primary baru:

# Metode 1: pg_ctl
pg_ctl promote -D /var/lib/postgresql/data

# Metode 2: pg_promote() SQL function (PG 12+)
SELECT pg_promote();

# Metode 3: trigger file (konfigurasi di recovery)
touch /tmp/promote_trigger

# Setelah promote:
# 1. File standby.signal otomatis dihapus
# 2. Server mulai accept write
# 3. Update pg_hba.conf, load balancer untuk redirect traffic
# 4. Replica lain perlu repointing ke primary baru

# Tool otomatis failover:
# - Patroni (paling populer, pakai etcd/consul/zookeeper)
# - repmgr (PostgreSQL native)
# - pg_auto_failover (Microsoft)`}
      </Code>
      <Note color="#fbbf24">Untuk production, gunakan Patroni atau repmgr untuk automated failover — manual promote rentan human error.</Note>
    </Block>
  </div>
)

const Replication = () => (
  <div>
    <h3 style={{ color: '#e879f9', fontWeight: 'bold', fontSize: '20px', marginBottom: '16px' }}>
      Replication — Streaming vs Logical
    </h3>

    <Block title="📊 Perbandingan Streaming vs Logical Replication" color="#e879f9">
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', color: '#a0c8ff', fontSize: '15px', borderCollapse: 'collapse' }}>
          <tbody>
            {[
              ['Aspek', 'Streaming (Physical)', 'Logical'],
              ['Unit replikasi', 'Blok disk (WAL byte-by-byte)', 'Baris & transaksi (row-level)'],
              ['PostgreSQL versi', 'Harus sama major version', 'Boleh berbeda versi (9.4+)'],
              ['Granularity', 'Seluruh cluster/database', 'Per tabel yang dipilih'],
              ['Replica bisa write?', 'Tidak (read-only)', 'Ya (independent)'],
              ['DDL otomatis direplikasi?', 'Ya (semua perubahan)', 'Tidak — harus manual'],
              ['Cocok untuk', 'HA, failover, read scaling', 'Migrasi, upgrade, selective sync'],
              ['Setup', 'pg_basebackup + standby.signal', 'CREATE PUBLICATION / SUBSCRIPTION'],
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid rgba(232,121,249,0.15)' }}>
                {row.map((cell, j) => (
                  <td key={j} style={{
                    padding: '6px 8px',
                    color: i === 0 ? '#e879f9' : j === 0 ? '#a0c8ff' : j === 1 ? '#4ade80' : '#38bdf8',
                    fontWeight: i === 0 ? 'bold' : 'normal',
                  }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Block>

    <Block title="📡 Logical Replication — PUBLICATION & SUBSCRIPTION" color="#38bdf8">
      <Code>
{`-- ══ PUBLISHER (sumber data) ══════════════════════════════════
-- postgresql.conf:
-- wal_level = logical     ← wajib untuk logical replication

-- Buat publication: tabel mana yang dikirim
CREATE PUBLICATION pub_orders FOR TABLE orders, order_items;

-- Semua tabel dalam database
CREATE PUBLICATION pub_all FOR ALL TABLES;

-- Dengan filter (PG 15+): hanya baris tertentu
CREATE PUBLICATION pub_active_orders FOR TABLE orders
  WHERE (status != 'cancelled');

-- Hanya kolom tertentu (PG 15+)
CREATE PUBLICATION pub_public_products FOR TABLE products
  (id, name, price, category);  -- exclude cost_price

-- Cek publications
SELECT * FROM pg_publication;
SELECT * FROM pg_publication_tables;

-- ══ SUBSCRIBER (tujuan data) ══════════════════════════════════
-- Tabel target harus sudah ada dengan skema yang sama
CREATE TABLE orders (LIKE orders_source INCLUDING ALL);  -- atau DDL manual

-- Buat subscription
CREATE SUBSCRIPTION sub_orders
  CONNECTION 'host=primary-host port=5432 dbname=appdb user=replicator password=ReplP@ss!'
  PUBLICATION pub_orders;

-- Dengan slot name kustom
CREATE SUBSCRIPTION sub_orders
  CONNECTION 'host=primary-host dbname=appdb user=replicator password=ReplP@ss!'
  PUBLICATION pub_orders
  WITH (slot_name = 'sub_orders_slot', create_slot = true);

-- Cek status subscription
SELECT subname, subenabled, subslotname FROM pg_subscription;
SELECT * FROM pg_stat_subscription;

-- Stop / start subscription
ALTER SUBSCRIPTION sub_orders DISABLE;
ALTER SUBSCRIPTION sub_orders ENABLE;

-- Update connection string
ALTER SUBSCRIPTION sub_orders
  CONNECTION 'host=new-primary dbname=appdb user=replicator password=ReplP@ss!';

-- Drop subscription (hapus slot di publisher juga)
DROP SUBSCRIPTION sub_orders;`}
      </Code>
    </Block>

    <Block title="🔄 Logical Replication — Use Cases" color="#4ade80">
      <Code>
{`-- USE CASE 1: Zero-downtime major version upgrade
-- 1. Setup logical replication dari v14 (old) ke v15 (new)
-- 2. Biarkan sync sampai lag ~ 0
-- 3. Stop app, tunggu semua transaksi selesai
-- 4. Pastikan lag = 0: SELECT * FROM pg_stat_replication;
-- 5. Promote v15, update connection string app
-- 6. Downtime: detik, bukan jam!

-- USE CASE 2: Selective sync antar database/cluster
-- Kirim hanya tabel tertentu ke analytics DB
-- (Publisher: OLTP DB, Subscriber: Analytics DB)
CREATE PUBLICATION pub_analytics
  FOR TABLE sales, products, customers;

-- USE CASE 3: Real-time CDC (Change Data Capture)
-- Gunakan pgoutput plugin atau wal2json
-- untuk stream perubahan ke Kafka, Debezium, dll
-- wal_level = logical wajib diset di primary`}
      </Code>
    </Block>
  </div>
)

const PgBouncer = () => (
  <div>
    <h3 style={{ color: '#fb923c', fontWeight: 'bold', fontSize: '20px', marginBottom: '16px' }}>
      pgBouncer — Connection Pooling
    </h3>

    <Block title="💡 Mengapa pgBouncer Penting?" color="#fb923c">
      <Code>
{`Masalah tanpa pgBouncer:
  App: 500 koneksi concurrent
  PostgreSQL: fork 500 processes → ~500MB overhead RAM hanya untuk koneksi
  max_connections = 500 → banyak memory terbuang, context switching tinggi

Dengan pgBouncer:
  App: 500 koneksi → pgBouncer (pool)
  pgBouncer: 20–50 koneksi nyata → PostgreSQL
  PostgreSQL: hemat RAM, context switching minimal
  Throughput lebih tinggi!

pgBouncer Pool Modes:
  ┌─────────────────┬───────────────────────────────────────────────────┐
  │ session         │ 1 koneksi app = 1 koneksi DB selama session        │
  │                 │ Paling aman, tapi tidak banyak hemat               │
  ├─────────────────┼───────────────────────────────────────────────────┤
  │ transaction     │ Koneksi DB dipinjam hanya selama 1 transaksi       │
  │ (RECOMMENDED)   │ Efisien, cocok untuk app stateless                 │
  ├─────────────────┼───────────────────────────────────────────────────┤
  │ statement       │ Koneksi DB dipinjam per statement                  │
  │                 │ Tidak bisa pakai multi-statement transaction        │
  └─────────────────┴───────────────────────────────────────────────────┘`}
      </Code>
    </Block>

    <Block title="📄 pgbouncer.ini — Konfigurasi lengkap" color="#fbbf24">
      <Code>
{`; /etc/pgbouncer/pgbouncer.ini

[databases]
; Format: alias = host=... port=... dbname=...
appdb        = host=127.0.0.1 port=5432 dbname=appdb
appdb_ro     = host=replica1  port=5432 dbname=appdb  ; read-only alias ke replica
analytics    = host=127.0.0.1 port=5432 dbname=analytics

; Pool per database dengan ukuran custom
bigdb        = host=db-server port=5432 dbname=bigdb pool_size=50

; Wildcard: semua database di server ini
*            = host=127.0.0.1 port=5432

[pgbouncer]
; ─── LISTEN ─────────────────────────────────────────────────
listen_addr       = 0.0.0.0    ; atau: 127.0.0.1 untuk lokal saja
listen_port       = 6432        ; port pgBouncer (bukan 5432!)

; ─── POOL MODE ───────────────────────────────────────────────
pool_mode         = transaction ; session | transaction | statement

; ─── POOL SIZING ─────────────────────────────────────────────
max_client_conn   = 2000        ; maks koneksi dari app ke pgBouncer
default_pool_size = 25          ; koneksi nyata ke PostgreSQL per (db, user)
min_pool_size     = 5           ; pertahankan minimal koneksi
reserve_pool_size = 5           ; cadangan saat pool penuh
max_db_connections = 100        ; maks koneksi ke satu database
max_user_connections = 50       ; maks koneksi per user

; ─── TIMEOUT ─────────────────────────────────────────────────
server_idle_timeout   = 600     ; tutup koneksi idle ke DB setelah 600s
client_idle_timeout   = 0       ; 0 = tidak timeout client
server_connect_timeout = 15     ; timeout konek ke PostgreSQL
server_login_retry    = 15      ; retry jika gagal konek
query_timeout         = 0       ; 0 = tidak ada limit (set di postgresql.conf)
client_login_timeout  = 60      ; timeout login client

; ─── AUTH ────────────────────────────────────────────────────
auth_type         = scram-sha-256  ; md5 | scram-sha-256 | trust | hba
auth_file         = /etc/pgbouncer/userlist.txt
; Atau gunakan auth_query untuk cek dari database:
auth_user         = pgbouncer_auth
auth_query        = SELECT usename, passwd FROM pg_shadow WHERE usename=$1

; ─── LOGGING ─────────────────────────────────────────────────
logfile           = /var/log/pgbouncer/pgbouncer.log
pidfile           = /var/run/pgbouncer/pgbouncer.pid
log_connections   = 1
log_disconnections= 1
log_stats         = 1
stats_period      = 60          ; log stats tiap 60 detik

; ─── TLS ─────────────────────────────────────────────────────
client_tls_sslmode = require
client_tls_key_file = /etc/ssl/pgbouncer.key
client_tls_cert_file = /etc/ssl/pgbouncer.crt
server_tls_sslmode = require`}
      </Code>
    </Block>

    <Block title="👤 userlist.txt — Autentikasi user" color="#4ade80">
      <Code>
{`; /etc/pgbouncer/userlist.txt
; Format: "username" "password-hash"

; Dapatkan hash password dari PostgreSQL:
SELECT usename, passwd FROM pg_shadow WHERE usename = 'appuser';
-- Output: md5xxxxxxxx atau SCRAM-SHA-256$...

; Isi file:
"appuser"  "SCRAM-SHA-256$4096:salt==:hash=="
"analyst"  "md5a1b2c3d4e5f6..."
"pgbouncer_auth" "md5..."

; Atau gunakan auth_query (lebih mudah kelola):
; pgBouncer akan query SELECT usename, passwd FROM pg_shadow
; Butuh user pgbouncer_auth dengan akses pg_shadow:
CREATE ROLE pgbouncer_auth LOGIN PASSWORD 'bouncer_pass';
GRANT pg_read_all_settings TO pgbouncer_auth;`}
      </Code>
    </Block>

    <Block title="📊 Monitoring & Admin pgBouncer" color="#a78bfa">
      <Code>
{`-- Konek ke pgBouncer admin (database: pgbouncer)
psql -h 127.0.0.1 -p 6432 -U pgbouncer pgbouncer

-- Status pool
SHOW POOLS;
-- cl_active: client aktif | cl_waiting: client antri
-- sv_active: server aktif | sv_idle: server idle
-- sv_used: server baru selesai dipakai

-- Semua koneksi aktif
SHOW CLIENTS;
SHOW SERVERS;

-- Statistik per database
SHOW STATS;
-- total_query_count, total_query_time, avg_query_time

-- Statistik per 1 detik terakhir
SHOW STATS_AVERAGES;

-- Konfigurasi saat ini
SHOW CONFIG;

-- Reload konfigurasi tanpa restart
RELOAD;

-- Pause / resume database (maintenance)
PAUSE appdb;    -- tunggu query selesai, lalu pause
RESUME appdb;

-- Reconnect semua koneksi server
RECONNECT;

-- Kill client tertentu
KILL appdb;     -- disconnect semua client dari database appdb

-- Shutdown
SHUTDOWN;`}
      </Code>
    </Block>

    <Block title="🏗️ Topologi pgBouncer Production" color="#38bdf8">
      <Code>
{`Topologi 1: pgBouncer di depan primary + replica
─────────────────────────────────────────────────
App Servers
    │
    ├─ Write port :6432 → pgBouncer-primary → PostgreSQL Primary :5432
    │
    └─ Read port  :6433 → pgBouncer-replica → PostgreSQL Replica :5432

Topologi 2: pgBouncer per app server (sidecar)
─────────────────────────────────────────────────
App Server 1: App + pgBouncer → Primary
App Server 2: App + pgBouncer → Primary
App Server 3: App + pgBouncer → Replica

Keuntungan sidecar: koneksi lokal (Unix socket), latency minimal
Kelemahan: lebih banyak instance pgBouncer dikelola

Topologi 3: Multi-tier pooling
─────────────────────────────────────────────────
App → pgBouncer (transaction mode, :6432)
        → HAProxy (load balance antar replica)
            → Replica 1, 2, 3

Batasan transaction pool mode:
  ✗ SET statement tidak persistent antar query
  ✗ LISTEN/NOTIFY tidak bisa dipakai
  ✗ Prepared statement (butuh: server_reset_query_always = 0 + track_prepared_statements)
  ✗ Advisory lock (session-level)
  ✗ WITH HOLD cursor`}
      </Code>
    </Block>
  </div>
)

const FDW = () => (
  <div>
    <h3 style={{ color: '#34d399', fontWeight: 'bold', fontSize: '20px', marginBottom: '16px' }}>
      FDW — Foreign Data Wrapper
    </h3>

    <Block title="💡 Apa itu FDW?" color="#34d399">
      <p style={{ color: '#a0c8ff', fontSize: '16px', lineHeight: '1.8', marginBottom: '10px' }}>
        FDW memungkinkan PostgreSQL <strong>query data dari sumber eksternal</strong> seolah-olah data itu ada di tabel lokal.
        Sumber bisa berupa: PostgreSQL lain, MySQL, Oracle, MongoDB, CSV/file, S3, HTTP API, Redis, dan lain-lain.
        Berguna untuk <em>data federation</em>, migrasi bertahap, dan integrasi lintas sistem.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
        {[
          { name: 'postgres_fdw', color: '#4ade80', desc: 'PostgreSQL ke PostgreSQL (bawaan)' },
          { name: 'file_fdw', color: '#38bdf8', desc: 'Baca CSV/file lokal sebagai tabel' },
          { name: 'mysql_fdw', color: '#fbbf24', desc: 'Konek ke MySQL/MariaDB' },
          { name: 'oracle_fdw', color: '#f87171', desc: 'Konek ke Oracle Database' },
          { name: 'mongo_fdw', color: '#a78bfa', desc: 'Konek ke MongoDB' },
          { name: 'redis_fdw', color: '#fb923c', desc: 'Konek ke Redis' },
        ].map((f, i) => (
          <div key={i} style={{ background: `${f.color}11`, border: `1px solid ${f.color}33`, borderRadius: '6px', padding: '8px 10px' }}>
            <code style={{ color: f.color, fontSize: '15px', fontWeight: 'bold' }}>{f.name}</code>
            <p style={{ color: '#a0c8ff', fontSize: '14px', marginTop: '4px' }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </Block>

    <Block title="🔗 postgres_fdw — Query ke PostgreSQL lain" color="#4ade80">
      <Code>
{`-- ═══ SERVER LOKAL (yang akan query) ════════════════════════

-- 1. Aktifkan extension
CREATE EXTENSION IF NOT EXISTS postgres_fdw;

-- 2. Buat foreign server (definisi koneksi ke server remote)
CREATE SERVER remote_appdb
  FOREIGN DATA WRAPPER postgres_fdw
  OPTIONS (
    host '10.0.2.10',
    port '5432',
    dbname 'appdb',
    fetch_size '5000',       -- baris per fetch (default: 100, naikkan untuk performa)
    use_remote_estimate 'on' -- gunakan statistik remote untuk query plan
  );

-- 3. Mapping user lokal ke user di remote server
CREATE USER MAPPING FOR analyst
  SERVER remote_appdb
  OPTIONS (user 'analyst_ro', password 'RemoteP@ss!');

-- Mapping untuk semua user lokal (public)
CREATE USER MAPPING FOR PUBLIC
  SERVER remote_appdb
  OPTIONS (user 'fdw_reader', password 'FdwP@ss!');

-- 4a. Buat foreign table manual
CREATE FOREIGN TABLE remote_orders (
  id         BIGINT,
  user_id    BIGINT,
  total      NUMERIC,
  status     TEXT,
  created_at TIMESTAMPTZ
)
SERVER remote_appdb
OPTIONS (schema_name 'public', table_name 'orders');

-- 4b. Atau IMPORT semua tabel dari schema (lebih mudah!)
IMPORT FOREIGN SCHEMA public
  FROM SERVER remote_appdb
  INTO remote_schema;           -- nama schema lokal untuk menyimpan foreign tables

-- Import tabel tertentu saja
IMPORT FOREIGN SCHEMA public
  LIMIT TO (orders, order_items, products)
  FROM SERVER remote_appdb
  INTO fdw_tables;

-- 5. Sekarang bisa query seperti tabel biasa!
SELECT * FROM remote_orders WHERE status = 'pending' LIMIT 100;

-- Cross-server JOIN (pushdown ke remote jika bisa)
SELECT l.name, r.total
FROM local_users l
JOIN remote_orders r ON r.user_id = l.id
WHERE r.created_at >= NOW() - INTERVAL '7 days';`}
      </Code>
    </Block>

    <Block title="📁 file_fdw — Konsep & Setup" color="#fbbf24">
      <p style={{ color: '#a0c8ff', fontSize: '16px', lineHeight: '1.8', marginBottom: '10px' }}>
        <code style={{ color: '#86efac', fontFamily: 'monospace' }}>file_fdw</code> adalah extension bawaan PostgreSQL untuk membaca
        file sistem (CSV, TSV, teks) <strong>seolah-olah tabel biasa</strong> — tanpa harus import ke tabel dulu.
        Data dibaca langsung dari disk saat query dijalankan. Berguna untuk ETL, audit log, bulk import, dan monitoring file.
      </p>
      <Code>
{`-- Aktifkan extension (bawaan PostgreSQL, tidak perlu install)
CREATE EXTENSION IF NOT EXISTS file_fdw;

-- Satu SERVER untuk semua file (bisa pakai satu server saja)
CREATE SERVER file_server FOREIGN DATA WRAPPER file_fdw;

-- Tidak perlu USER MAPPING untuk file_fdw
-- (file dibaca oleh OS user yang menjalankan postgres process)
-- File harus readable oleh user 'postgres'

-- Cek extension aktif
SELECT extname, extversion FROM pg_extension WHERE extname = 'file_fdw';`}
      </Code>
    </Block>

    <Block title="📄 file_fdw — Format CSV (semua opsi)" color="#fbbf24">
      <Code>
{`-- ─── CSV dengan header ────────────────────────────────────
-- File: /tmp/employees.csv
-- id,name,department,salary,hire_date
-- 1,Budi Santoso,Engineering,8000000,2023-03-15
-- 2,Siti Rahayu,Finance,7500000,2022-08-01

CREATE FOREIGN TABLE ft_employees_csv (
  id          INT,
  name        VARCHAR(100),
  department  VARCHAR(50),
  salary      NUMERIC,
  hire_date   DATE
)
SERVER file_server
OPTIONS (
  filename  '/tmp/employees.csv',  -- path absolut, harus bisa dibaca oleh postgres
  format    'csv',                 -- csv | text | binary
  header    'true',                -- baris pertama adalah header (skip saat baca)
  delimiter ',',                   -- pemisah kolom (default: ',' untuk csv)
  quote     '"',                   -- karakter quote (default: '"')
  escape    '"',                   -- karakter escape (default: sama dengan quote)
  null      '',                    -- representasi NULL dalam file (default: '')
  encoding  'UTF8'                 -- encoding file
);

-- Query langsung
SELECT * FROM ft_employees_csv;
SELECT department, AVG(salary) FROM ft_employees_csv GROUP BY department;

-- ─── CSV tanpa header ──────────────────────────────────────
-- File: /tmp/data_noheader.csv
-- 1,Budi,Engineering
-- 2,Siti,Finance

CREATE FOREIGN TABLE ft_data_noheader (
  id    INT,
  name  TEXT,
  dept  TEXT
)
SERVER file_server
OPTIONS (
  filename '/tmp/data_noheader.csv',
  format   'csv',
  header   'false'   -- tidak ada header
);

-- ─── CSV dengan delimiter custom ───────────────────────────
-- File: /tmp/report.csv (semicolon-separated)
-- id;name;value
-- 1;Item A;9999

CREATE FOREIGN TABLE ft_semicolon (
  id    INT,
  name  TEXT,
  value NUMERIC
)
SERVER file_server
OPTIONS (
  filename  '/tmp/report.csv',
  format    'csv',
  header    'true',
  delimiter ';'     -- bisa: ';' '|' '\t' dll
);

-- ─── TSV (Tab-separated) ───────────────────────────────────
CREATE FOREIGN TABLE ft_tsv (
  id    INT,
  name  TEXT,
  score NUMERIC
)
SERVER file_server
OPTIONS (
  filename  '/tmp/data.tsv',
  format    'text',     -- 'text' untuk format psql COPY default
  null      '\\N'       -- NULL representation dalam format text
);`}
      </Code>
    </Block>

    <Block title="📋 file_fdw — Format TEXT & BINARY" color="#38bdf8">
      <Code>
{`-- ─── FORMAT TEXT (format default psql COPY) ────────────────
-- Kolom dipisahkan tab, NULL = \N, backslash sebagai escape

CREATE FOREIGN TABLE ft_text_format (
  user_id   BIGINT,
  action    TEXT,
  timestamp TIMESTAMPTZ
)
SERVER file_server
OPTIONS (
  filename '/var/lib/postgresql/exports/actions.txt',
  format   'text',
  null     '\\N',
  delimiter E'\t'  -- tab character
);

-- ─── FORMAT BINARY (output dari COPY ... WITH BINARY) ───────
-- Lebih cepat, tidak bisa diedit manual
-- Dihasilkan oleh: COPY tabel TO '/tmp/data.bin' WITH BINARY;

CREATE FOREIGN TABLE ft_binary (
  id     INT,
  name   TEXT,
  amount NUMERIC
)
SERVER file_server
OPTIONS (
  filename '/tmp/exported_data.bin',
  format   'binary'
);

-- ─── Hanya baca kolom tertentu dari file lebar ──────────────
-- File punya 20 kolom tapi kita hanya butuh 3:
-- Kolom yang tidak didefinisikan akan dilewati
-- (tidak bisa skip kolom di tengah — harus definisi semua s.d kolom terakhir yang dipakai)

CREATE FOREIGN TABLE ft_partial_read (
  id          INT,
  name        TEXT,
  email       TEXT,
  department  TEXT
  -- sisa kolom di file tidak perlu didefinisikan jika di akhir
)
SERVER file_server
OPTIONS (
  filename '/tmp/full_export.csv',
  format   'csv',
  header   'true'
);`}
      </Code>
    </Block>

    <Block title="⚙️ file_fdw — PROGRAM option (baca dari command)" color="#a78bfa">
      <Code>
{`-- PROGRAM: jalankan command shell, output-nya dibaca sebagai tabel
-- Butuh superuser atau pg_read_server_files privilege

-- ─── Baca log PostgreSQL real-time ──────────────────────────
CREATE FOREIGN TABLE ft_pg_log (
  log_line TEXT
)
SERVER file_server
OPTIONS (
  program 'tail -n 500 /var/log/postgresql/postgresql.log',
  format  'text'
);

SELECT log_line FROM ft_pg_log WHERE log_line LIKE '%ERROR%';
SELECT log_line FROM ft_pg_log WHERE log_line LIKE '%duration%';

-- ─── Parse log terstruktur dengan grep + awk ─────────────────
CREATE FOREIGN TABLE ft_slow_queries (
  log_line TEXT
)
SERVER file_server
OPTIONS (
  program $$grep "duration:" /var/log/postgresql/postgresql.log | tail -n 200$$,
  format  'text'
);

-- ─── Baca output dari sistem (df, ps, dll) ───────────────────
CREATE FOREIGN TABLE ft_disk_usage (
  filesystem  TEXT,
  size_1k     BIGINT,
  used_1k     BIGINT,
  avail_1k    BIGINT,
  use_pct     TEXT,
  mountpoint  TEXT
)
SERVER file_server
OPTIONS (
  program 'df -k --output=source,size,used,avail,pcent,target | tail -n +2',
  format  'text'
);

SELECT mountpoint, round(used_1k/1024.0/1024, 2) AS used_gb,
       round(avail_1k/1024.0/1024, 2) AS avail_gb
FROM ft_disk_usage
ORDER BY used_gb DESC;

-- ─── Baca file gz langsung (tanpa extract) ───────────────────
CREATE FOREIGN TABLE ft_gz_log (
  log_line TEXT
)
SERVER file_server
OPTIONS (
  program 'zcat /var/log/postgresql/postgresql-2026-01-01.log.gz',
  format  'text'
);

-- ─── Gabungkan beberapa file sekaligus ───────────────────────
CREATE FOREIGN TABLE ft_all_access_logs (
  log_line TEXT
)
SERVER file_server
OPTIONS (
  program 'cat /var/log/app/access.log /var/log/app/access.log.1',
  format  'text'
);`}
      </Code>
    </Block>

    <Block title="🔒 Permission & Keamanan file_fdw" color="#f87171">
      <Code>
{`-- file_fdw membaca file sebagai OS user 'postgres'
-- File HARUS bisa dibaca oleh user postgres

-- Cek permission file
-- ls -la /tmp/employees.csv
-- -rw-r--r-- 1 root root ... → postgres bisa baca (world-readable)
-- -rw------- 1 root root ... → postgres TIDAK bisa baca → ERROR

-- Fix permission:
-- chmod 644 /tmp/employees.csv
-- chown postgres:postgres /tmp/employees.csv

-- ─── Privilege yang dibutuhkan ────────────────────────────────
-- CREATE FOREIGN TABLE dengan filename: butuh superuser atau pg_read_server_files
-- CREATE FOREIGN TABLE dengan program:  butuh superuser saja (lebih ketat)

-- Grant akses file kepada user biasa (non-superuser):
GRANT pg_read_server_files TO analyst;   -- bisa buat foreign table filename
-- pg_read_server_files tidak termasuk program option!

-- Cek apakah user punya privilege
SELECT has_role_privilege('analyst', 'pg_read_server_files', 'MEMBER');

-- ─── Batasi direktori yang boleh diakses ──────────────────────
-- Tidak ada mekanisme built-in untuk batasi direktori di file_fdw
-- Rekomendasi: buat direktori khusus untuk file import
-- mkdir -p /var/lib/postgresql/imports
-- chown postgres:postgres /var/lib/postgresql/imports
-- chmod 750 /var/lib/postgresql/imports
-- Hanya taruh file yang boleh diakses di direktori ini

-- Grant EXECUTE pada foreign table (bukan buat FT-nya)
GRANT SELECT ON ft_employees_csv TO analyst;
GRANT SELECT ON ft_employees_csv TO role_readonly;`}
      </Code>
    </Block>

    <Block title="🔄 file_fdw — Pola ETL & Import Bulk" color="#4ade80">
      <Code>
{`-- ─── Pola 1: Import CSV ke tabel permanen ───────────────────
CREATE FOREIGN TABLE ft_sales_raw (
  sale_date   TEXT,   -- baca sebagai TEXT dulu, konversi saat INSERT
  product_id  INT,
  qty         INT,
  revenue     TEXT
)
SERVER file_server
OPTIONS (filename '/tmp/sales_jan.csv', format 'csv', header 'true');

-- Import dengan transformasi
INSERT INTO sales (sale_date, product_id, qty, revenue)
SELECT
  sale_date::DATE,
  product_id,
  qty,
  REPLACE(revenue, ',', '')::NUMERIC   -- hapus koma ribuan
FROM ft_sales_raw
WHERE product_id IS NOT NULL
  AND qty > 0;

-- ─── Pola 2: Upsert dari file ────────────────────────────────
INSERT INTO products (id, name, price, updated_at)
SELECT id, name, price::NUMERIC, NOW()
FROM ft_products_csv
ON CONFLICT (id) DO UPDATE
  SET name       = EXCLUDED.name,
      price      = EXCLUDED.price,
      updated_at = EXCLUDED.updated_at;

-- ─── Pola 3: Validasi sebelum import ─────────────────────────
-- Cek data kotor sebelum insert ke tabel utama
SELECT
  COUNT(*) AS total_rows,
  COUNT(*) FILTER (WHERE product_id IS NULL)  AS null_product,
  COUNT(*) FILTER (WHERE qty <= 0)            AS invalid_qty,
  COUNT(*) FILTER (WHERE revenue !~ '^[0-9.,]+$') AS non_numeric_revenue
FROM ft_sales_raw;

-- ─── Pola 4: Partisi otomatis dari file ──────────────────────
-- Tabel partisi berdasarkan tahun
CREATE TABLE sales_2026_q1 PARTITION OF sales
  FOR VALUES FROM ('2026-01-01') TO ('2026-04-01');

-- Insert file ke partisi yang tepat (routing otomatis)
INSERT INTO sales (sale_date, product_id, qty, revenue)
SELECT sale_date::DATE, product_id, qty, revenue::NUMERIC
FROM ft_sales_raw;  -- PostgreSQL routing otomatis ke partisi yang benar

-- ─── Pola 5: Banding file vs tabel ───────────────────────────
-- Cari produk di file yang belum ada di database
SELECT f.product_id FROM ft_products_csv f
WHERE NOT EXISTS (
  SELECT 1 FROM products p WHERE p.id = f.product_id
);`}
      </Code>
    </Block>

    <Block title="🛠️ ALTER & DROP Foreign Table" color="#64c8ff">
      <Code>
{`-- Update path file (jika file dipindah)
ALTER FOREIGN TABLE ft_employees_csv
  OPTIONS (SET filename '/data/imports/employees.csv');

-- Ganti ke file baru (bulan berikutnya)
ALTER FOREIGN TABLE ft_sales_raw
  OPTIONS (SET filename '/tmp/sales_feb.csv');

-- Ubah format
ALTER FOREIGN TABLE ft_sales_raw
  OPTIONS (SET delimiter ';');

-- Tambah kolom (jika file bertambah kolom)
ALTER FOREIGN TABLE ft_employees_csv ADD COLUMN phone TEXT;

-- Drop kolom
ALTER FOREIGN TABLE ft_employees_csv DROP COLUMN IF EXISTS phone;

-- Drop foreign table (tidak hapus file di disk!)
DROP FOREIGN TABLE IF EXISTS ft_employees_csv;
DROP FOREIGN TABLE IF EXISTS ft_sales_raw;

-- Lihat semua foreign tables
SELECT foreign_table_schema, foreign_table_name, foreign_server_name
FROM information_schema.foreign_tables
ORDER BY foreign_table_name;

-- Lihat opsi per foreign table
SELECT ft.foreign_table_name,
       fto.option_name,
       fto.option_value
FROM information_schema.foreign_tables ft
JOIN information_schema.foreign_table_options fto
  ON ft.foreign_table_name = fto.foreign_table_name
WHERE ft.foreign_server_name = 'file_server'
ORDER BY ft.foreign_table_name, fto.option_name;`}
      </Code>
    </Block>

    <Block title="⚡ Performa & Keterbatasan file_fdw" color="#fb923c">
      <Code>
{`-- ─── Keterbatasan file_fdw ────────────────────────────────────
-- ✗ Read-only: tidak bisa INSERT/UPDATE/DELETE ke foreign table
-- ✗ Tidak ada index: selalu full file scan untuk setiap query
-- ✗ Tidak ada pushdown filter: WHERE diproses SETELAH baca file
-- ✗ File harus statis selama query berjalan (concurrent write = undefined behavior)
-- ✗ PROGRAM option: hanya superuser, potensi command injection (hati-hati!)

-- ─── Performa tips ─────────────────────────────────────────────
-- 1. Untuk file besar: import ke tabel lokal, baru query
--    Jangan query berulang dari file (baca dari disk setiap kali)

-- 2. Gunakan CTE untuk baca file sekali
WITH raw AS (
  SELECT * FROM ft_sales_raw   -- baca file SEKALI
)
SELECT product_id, SUM(revenue::NUMERIC) AS total
FROM raw
WHERE sale_date::DATE >= '2026-01-01'
GROUP BY product_id;

-- 3. Estimate baris untuk planner (file_fdw tidak punya statistik)
-- Default: planner asumsikan 1000 baris → bisa salah untuk file besar
-- Solusi: beri hint via ANALYZE (tidak benar-benar scan, tapi bisa dikasih manual)
-- Atau: import ke temp table dulu
CREATE TEMP TABLE tmp_sales AS
  SELECT * FROM ft_sales_raw;   -- baca file sekali, simpan ke temp
ANALYZE tmp_sales;               -- update statistik
-- Sekarang query dari tmp_sales: planner punya info yang akurat

-- 4. Paralel membaca file TIDAK didukung (single worker)

-- ─── Bandingkan: file_fdw vs COPY ──────────────────────────────
-- COPY: batch import sekali, data masuk ke tabel permanen
-- file_fdw: baca real-time dari file, tidak ada persistent storage
-- Untuk import rutin: COPY lebih cepat
-- Untuk query ad-hoc / explorasi: file_fdw lebih fleksibel`}
      </Code>
    </Block>

    <Block title="⚡ FDW Performance & Pushdown" color="#a78bfa">
      <Code>
{`-- FDW secara otomatis "pushdown" filter ke remote server
-- untuk menghindari transfer data berlebihan

-- Query ini: filter WHERE dikirim ke remote PostgreSQL
-- Remote hanya kirim baris yang cocok, bukan semua data
EXPLAIN (VERBOSE, ANALYZE)
SELECT * FROM remote_orders
WHERE created_at >= '2026-01-01'
  AND status = 'pending';
-- Plan: Foreign Scan on remote_orders
--   Remote SQL: SELECT ... FROM orders WHERE created_at >= ... AND status = ...

-- Opsi untuk tuning FDW
ALTER FOREIGN TABLE remote_orders OPTIONS (SET fetch_size '10000');

ALTER SERVER remote_appdb OPTIONS (
  SET fetch_size '5000',
  SET use_remote_estimate 'on'
);

-- UPDATE & DELETE melalui FDW (postgres_fdw mendukung writable)
UPDATE remote_orders SET status = 'cancelled' WHERE id = 999;
DELETE FROM remote_orders WHERE status = 'test';

-- Nonaktifkan writable jika hanya butuh read
ALTER FOREIGN TABLE remote_orders OPTIONS (SET updatable 'false');

-- Cek semua foreign servers & tables
SELECT srvname, srvoptions FROM pg_foreign_server;
SELECT foreign_table_schema, foreign_table_name, foreign_server_name
FROM information_schema.foreign_tables;`}
      </Code>
    </Block>

    <Block title="🗺️ Use Case FDW: Migrasi Zero Downtime" color="#38bdf8">
      <Code>
{`-- Skenario: migrasi data dari MySQL ke PostgreSQL tanpa downtime
-- Gunakan mysql_fdw (install: apt install postgresql-fdw-mysql)

CREATE EXTENSION mysql_fdw;

CREATE SERVER mysql_legacy
  FOREIGN DATA WRAPPER mysql_fdw
  OPTIONS (host '10.0.3.5', port '3306');

CREATE USER MAPPING FOR postgres
  SERVER mysql_legacy
  OPTIONS (username 'migration_user', password 'MigrP@ss!');

-- Import tabel MySQL
CREATE FOREIGN TABLE mysql_users (
  id         INT,
  username   VARCHAR(100),
  email      VARCHAR(200),
  created_at TIMESTAMP
)
SERVER mysql_legacy
OPTIONS (dbname 'legacy_app', table_name 'users');

-- STEP 1: Inisial copy semua data
INSERT INTO users (id, username, email, created_at)
SELECT id, username, email, created_at::TIMESTAMPTZ
FROM mysql_users;

-- STEP 2: Sinkronisasi delta (baris baru sejak copy terakhir)
INSERT INTO users
SELECT * FROM mysql_users
WHERE created_at > (SELECT MAX(created_at) FROM users)
ON CONFLICT (id) DO UPDATE SET
  username = EXCLUDED.username,
  email    = EXCLUDED.email;

-- STEP 3: Setelah cutover, drop FDW
DROP FOREIGN TABLE mysql_users;
DROP USER MAPPING FOR postgres SERVER mysql_legacy;
DROP SERVER mysql_legacy;
DROP EXTENSION mysql_fdw;`}
      </Code>
    </Block>
  </div>
)

const PartitioningScaling = () => (
  <div>
    <h3 style={{ color: '#f97316', fontWeight: 'bold', fontSize: '20px', marginBottom: '16px' }}>
      Partitioning sebagai Strategi Scaling
    </h3>

    <Block title="📈 Kapan Partitioning Menjadi Scaling Tool" color="#f97316">
      <Code>
{`-- Partitioning efektif untuk scaling ketika:
-- 1. Tabel > 10GB dan query selalu filter by partition key
-- 2. Perlu drop/archive data lama (DETACH + DROP instant)
-- 3. Ingin paralel query lintas partisi
-- 4. Ingin indeks kecil per partisi (vs. satu indeks besar)

-- Contoh: tabel events 500GB, partition by range bulan
CREATE TABLE events (
  id         BIGSERIAL,
  user_id    BIGINT,
  event_type TEXT,
  payload    JSONB,
  created_at TIMESTAMPTZ NOT NULL
) PARTITION BY RANGE (created_at);

-- Buat partisi per bulan
CREATE TABLE events_2026_01 PARTITION OF events
  FOR VALUES FROM ('2026-01-01') TO ('2026-02-01');
CREATE TABLE events_2026_02 PARTITION OF events
  FOR VALUES FROM ('2026-02-01') TO ('2026-03-01');
-- dst...

-- Indeks per partisi (otomatis di-inherit dari parent)
CREATE INDEX ON events (user_id, created_at);
-- PostgreSQL otomatis buat index di setiap partisi

-- Query hanya scan partisi yang relevan (partition pruning)
EXPLAIN SELECT * FROM events
WHERE created_at BETWEEN '2026-01-01' AND '2026-01-31';
-- → Seq Scan on events_2026_01 (hanya 1 partisi!)`}
      </Code>
    </Block>

    <Block title="🔄 Partition Maintenance Otomatis dengan pg_partman" color="#4ade80">
      <Code>
{`-- pg_partman: extension untuk auto-manage partisi
-- Install: apt install postgresql-[ver]-partman

CREATE EXTENSION pg_partman SCHEMA partman;

-- Setup auto partitioning
SELECT partman.create_parent(
  p_parent_table  => 'public.events',
  p_control       => 'created_at',
  p_type          => 'range',
  p_interval      => 'monthly',   -- daily | weekly | monthly | yearly
  p_premake       => 3,           -- buat 3 partisi ke depan
  p_start_partition => '2026-01-01'
);

-- Update config
UPDATE partman.part_config
SET retention = '12 months',           -- hapus partisi > 12 bulan
    retention_keep_table = FALSE,       -- benar-benar drop
    infinite_time_partitions = TRUE,    -- terus buat partisi baru
    premake = 4                         -- buat 4 partisi ke depan
WHERE parent_table = 'public.events';

-- Jalankan maintenance (tambahkan ke cron)
SELECT partman.run_maintenance();

-- Atau via cron (setiap hari tengah malam):
-- 0 0 * * * psql -c "SELECT partman.run_maintenance()"`}
      </Code>
    </Block>

    <Block title="🔗 Partitioning + FDW = Partition Federation" color="#a78bfa">
      <Code>
{`-- Advanced: partisi yang ada di server berbeda via FDW
-- Data lama di server archive (cheaper storage)
-- Data baru di server utama (fast NVMe)

-- Buat foreign table ke server archive
CREATE FOREIGN TABLE events_2024 PARTITION OF events
  FOR VALUES FROM ('2024-01-01') TO ('2025-01-01')
SERVER archive_server
OPTIONS (schema_name 'public', table_name 'events_2024');

-- Query transparan: PostgreSQL otomatis route ke server yang benar
SELECT COUNT(*) FROM events
WHERE created_at >= '2024-06-01'
  AND created_at <  '2024-07-01';
-- → Query dikirim ke archive_server untuk partisi 2024

SELECT COUNT(*) FROM events
WHERE created_at >= '2026-01-01';
-- → Query lokal untuk partisi 2026`}
      </Code>
    </Block>
  </div>
)

const MonitoringScaling = () => (
  <div>
    <h3 style={{ color: '#64c8ff', fontWeight: 'bold', fontSize: '20px', marginBottom: '16px' }}>
      Monitoring — Deteksi Bottleneck Sebelum Jadi Masalah
    </h3>

    <Block title="🔍 Query & Index Performance" color="#64c8ff">
      <Code>
{`-- Query paling lambat (butuh pg_stat_statements)
SELECT LEFT(query, 100), calls,
  ROUND(mean_exec_time::numeric, 2) AS avg_ms,
  ROUND(total_exec_time::numeric/1000, 2) AS total_sec
FROM pg_stat_statements
ORDER BY mean_exec_time DESC LIMIT 10;

-- Index yang tidak pernah dipakai (kandidat untuk di-drop)
SELECT schemaname, tablename, indexname, idx_scan
FROM pg_stat_user_indexes
WHERE idx_scan = 0 AND indexname NOT LIKE '%pkey%'
ORDER BY pg_relation_size(indexrelid) DESC;

-- Tabel yang paling banyak sequential scan (perlu index?)
SELECT schemaname, relname,
  seq_scan, idx_scan,
  CASE WHEN seq_scan > 0
    THEN ROUND(100.0 * idx_scan / (seq_scan + idx_scan), 1)
    ELSE 100 END AS idx_ratio_pct
FROM pg_stat_user_tables
WHERE seq_scan > 100
ORDER BY seq_scan DESC;`}
      </Code>
    </Block>

    <Block title="💾 Cache, Bloat & Vacuum Health" color="#4ade80">
      <Code>
{`-- Cache hit ratio (idealnya > 99%)
SELECT
  SUM(heap_blks_hit) AS cache_hits,
  SUM(heap_blks_read) AS disk_reads,
  ROUND(100.0 * SUM(heap_blks_hit) /
    NULLIF(SUM(heap_blks_hit) + SUM(heap_blks_read), 0), 2) AS cache_hit_pct
FROM pg_statio_user_tables;

-- Index cache hit ratio
SELECT
  ROUND(100.0 * SUM(idx_blks_hit) /
    NULLIF(SUM(idx_blks_hit) + SUM(idx_blks_read), 0), 2) AS idx_cache_hit_pct
FROM pg_statio_user_indexes;

-- Tabel terbesar
SELECT schemaname, tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS total_size,
  pg_size_pretty(pg_relation_size(schemaname||'.'||tablename)) AS table_size,
  pg_size_pretty(pg_indexes_size(schemaname||'.'||tablename)) AS index_size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC LIMIT 10;

-- Dead tuples (bloat) — perlu VACUUM?
SELECT schemaname, relname,
  n_dead_tup, n_live_tup,
  ROUND(100.0 * n_dead_tup / NULLIF(n_live_tup + n_dead_tup, 0), 2) AS dead_pct,
  last_autovacuum, last_autoanalyze
FROM pg_stat_user_tables
WHERE n_dead_tup > 1000
ORDER BY n_dead_tup DESC;

-- Lock yang sedang menunggu
SELECT pid, wait_event_type, wait_event, state,
  LEFT(query, 80) AS query
FROM pg_stat_activity
WHERE wait_event IS NOT NULL
  AND state != 'idle'
ORDER BY wait_event_type;

-- Koneksi per state
SELECT state, count(*)
FROM pg_stat_activity
GROUP BY state ORDER BY count DESC;`}
      </Code>
    </Block>

    <Block title="🔁 Replication Lag Monitoring" color="#fbbf24">
      <Code>
{`-- Lag replication di primary
SELECT application_name,
  client_addr,
  state,
  sent_lsn,
  replay_lsn,
  (sent_lsn - replay_lsn) AS lag_bytes,
  write_lag, flush_lag, replay_lag,
  sync_state
FROM pg_stat_replication
ORDER BY lag_bytes DESC;

-- Lag waktu di replica
SELECT NOW() - pg_last_xact_replay_timestamp() AS replication_lag;

-- Cek apakah WAL archiving berjalan
SELECT archived_count, last_archived_wal,
  last_archived_time, failed_count,
  last_failed_wal, last_failed_time
FROM pg_stat_archiver;

-- Checkpoint stats (sering checkpoint = masalah)
SELECT checkpoints_timed, checkpoints_req,
  checkpoint_write_time, checkpoint_sync_time,
  buffers_checkpoint, buffers_clean, buffers_backend
FROM pg_stat_bgwriter;`}
      </Code>
    </Block>

    <Block title="🏊 pgBouncer Stats — Monitor pool dari PostgreSQL" color="#fb923c">
      <Code>
{`-- Konek ke pgBouncer admin:
-- psql -h 127.0.0.1 -p 6432 -U pgbouncer pgbouncer

SHOW POOLS;
-- database | user | cl_active | cl_waiting | sv_active | sv_idle | sv_used | maxwait
-- maxwait > 0 → client antri → pool terlalu kecil atau DB lambat!

SHOW STATS;
-- total_query_count | total_query_time | avg_query_time

-- Alert jika banyak client waiting
-- → naikkan default_pool_size di pgbouncer.ini
-- → atau naikkan max_connections di PostgreSQL
-- → atau optimasi query yang lambat

-- Cek dari PostgreSQL sisi: koneksi dari pgBouncer
SELECT application_name, client_addr, state, count(*)
FROM pg_stat_activity
WHERE application_name LIKE 'pgbouncer%' OR client_addr IS NOT NULL
GROUP BY application_name, client_addr, state;`}
      </Code>
    </Block>
  </div>
)

const contentMap = {
  overview:    <Overview />,
  'scale-up':  <ScaleUp />,
  'scale-out': <ScaleOut />,
  replication: <Replication />,
  pgbouncer:   <PgBouncer />,
  fdw:         <FDW />,
  partitioning:<PartitioningScaling />,
  monitoring:  <MonitoringScaling />,
}

const ScalingModule = () => {
  const [activeTab, setActiveTab] = useState('overview')

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
            Scaling PostgreSQL 📈
          </h1>
          <p style={{ color: '#a0c8ff', fontSize: '20px' }}>
            Scale Up/Out · Read Replicas · Streaming Replication · pgBouncer Connection Pooling · Foreign Data Wrapper
          </p>
        </div>
      </header>

      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '40px 24px' }}>
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

        <div style={{ animation: 'float-up 0.5s ease-out' }}>
          {contentMap[activeTab]}
        </div>
      </div>

      <footer style={{ background: 'rgba(15, 20, 25, 0.5)', borderTop: '1px solid rgba(100, 200, 255, 0.2)', marginTop: '60px', padding: '40px 0', textAlign: 'center' }}>
        <p style={{ color: '#708090', fontSize: '18px', marginBottom: '8px' }}>
          📈 Scaling = Tune first · Pool connections · Replicate reads · Federate data
        </p>
        <p style={{ color: '#708090', fontSize: '18px' }}>
          💡 Urutan: EXPLAIN → Index → Tune config → pgBouncer → Read Replica → Partition → FDW 🚀
        </p>
      </footer>
    </div>
  )
}

export default ScalingModule
