import React, { useState } from 'react'

const tabs = [
  { id: 'overview',    label: '📖 Overview',           desc: 'Jenis replikasi & kapan dipakai' },
  { id: 'streaming',   label: '📡 Streaming',           desc: 'Streaming replication (physical WAL)' },
  { id: 'logical',     label: '🔀 Logical',             desc: 'Logical replication (publish/subscribe)' },
  { id: 'slots',       label: '🎰 Replication Slots',   desc: 'Slot, wal_keep_size, monitoring' },
  { id: 'monitoring',  label: '📊 Monitoring',          desc: 'pg_stat_replication, lag, lag bytes' },
  { id: 'failover',    label: '🔁 Failover & Promote',  desc: 'Promote standby, switchover, pg_rewind' },
  { id: 'compare',     label: '⚖️ Perbandingan',         desc: 'Streaming vs Logical vs BDR vs Citus' },
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
  <span style={{ background: `${color}20`, border: `1px solid ${color}50`, color, fontSize: '14px', padding: '2px 8px', borderRadius: '4px', fontWeight: '600', marginRight: '6px', whiteSpace: 'nowrap' }}>
    {children}
  </span>
)

const Step = ({ number, color, title, desc }) => (
  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '10px' }}>
    <div style={{ background: color, color: '#0f1419', fontWeight: 'bold', fontSize: '15px', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>
      {number}
    </div>
    <div>
      <p style={{ color, fontWeight: 'bold', fontSize: '15px', margin: '0 0 2px 0' }}>{title}</p>
      <p style={{ color: '#708090', fontSize: '14px', margin: 0, lineHeight: '1.6' }}>{desc}</p>
    </div>
  </div>
)

// ─── TAB CONTENTS ──────────────────────────────────────────────────────────────

const Overview = () => (
  <div>
    <h3 style={{ color: '#64c8ff', fontWeight: 'bold', fontSize: '20px', marginBottom: '4px' }}>
      Replikasi PostgreSQL
    </h3>
    <p style={{ color: '#708090', fontSize: '16px', marginBottom: '20px' }}>
      Replikasi adalah mekanisme menyalin data dari satu server PostgreSQL (primary) ke server lain (standby/replica) secara otomatis dan berkelanjutan. Tujuannya: high availability, disaster recovery, dan distribusi beban baca.
    </p>

    {/* Kenapa replikasi */}
    <Block title="Mengapa Replikasi Diperlukan?" color="#64c8ff">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
        {[
          { icon: '🛡️', title: 'High Availability', desc: 'Jika primary down, standby bisa dipromosikan jadi primary dalam hitungan detik.' },
          { icon: '📖', title: 'Read Scaling', desc: 'Query SELECT bisa diarahkan ke replica — primary hanya handle write.' },
          { icon: '🌍', title: 'Disaster Recovery', desc: 'Replica di datacenter berbeda melindungi dari bencana fisik.' },
          { icon: '🔬', title: 'Reporting / Analytics', desc: 'Query berat untuk laporan dijalankan di replica, tidak ganggu production.' },
          { icon: '🔄', title: 'Zero-Downtime Upgrade', desc: 'Upgrade PostgreSQL versi baru dengan switchover ke replica yang sudah diupgrade.' },
          { icon: '📊', title: 'Data Distribution', desc: 'Logical replication memungkinkan distribusi subset data ke sistem lain.' },
        ].map((item, i) => (
          <div key={i} style={{ background: 'rgba(100,200,255,0.05)', border: '1px solid rgba(100,200,255,0.15)', borderRadius: '6px', padding: '10px' }}>
            <p style={{ fontSize: '22px', marginBottom: '4px' }}>{item.icon}</p>
            <p style={{ color: '#64c8ff', fontWeight: 'bold', fontSize: '15px', marginBottom: '4px' }}>{item.title}</p>
            <p style={{ color: '#708090', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>{item.desc}</p>
          </div>
        ))}
      </div>
    </Block>

    {/* Dua jenis utama */}
    <Block title="Dua Jenis Utama Replikasi PostgreSQL" color="#a78bfa">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '10px' }}>
        <div style={{ background: 'rgba(100,200,255,0.06)', border: '1px solid rgba(100,200,255,0.25)', borderRadius: '8px', padding: '16px' }}>
          <p style={{ color: '#64c8ff', fontWeight: 'bold', fontSize: '17px', marginBottom: '4px' }}>📡 Physical Replication</p>
          <Badge color="#64c8ff">Streaming Replication</Badge>
          <p style={{ color: '#a0c8ff', fontSize: '15px', lineHeight: '1.8', margin: '10px 0 8px 0' }}>
            Menyalin <strong>perubahan level byte</strong> dari WAL (Write-Ahead Log) secara real-time. Replica adalah salinan identik bit-per-bit dari primary.
          </p>
          <p style={{ color: '#4ade80', fontSize: '14px', margin: '0 0 2px 0' }}>✓ Sangat sederhana, semua data otomatis ikut</p>
          <p style={{ color: '#4ade80', fontSize: '14px', margin: '0 0 2px 0' }}>✓ Lag sangat rendah (milidetik)</p>
          <p style={{ color: '#4ade80', fontSize: '14px', margin: '0 0 2px 0' }}>✓ Cocok untuk HA & disaster recovery</p>
          <p style={{ color: '#f87171', fontSize: '14px', margin: '0 0 2px 0' }}>✗ Harus versi & arsitektur sama</p>
          <p style={{ color: '#f87171', fontSize: '14px', margin: '0 0 2px 0' }}>✗ Replica read-only, tidak bisa write</p>
          <p style={{ color: '#f87171', fontSize: '14px', margin: '0 0 2px 0' }}>✗ Tidak bisa replikasi sebagian tabel</p>
        </div>
        <div style={{ background: 'rgba(74,222,128,0.06)', border: '1px solid rgba(74,222,128,0.25)', borderRadius: '8px', padding: '16px' }}>
          <p style={{ color: '#4ade80', fontWeight: 'bold', fontSize: '17px', marginBottom: '4px' }}>🔀 Logical Replication</p>
          <Badge color="#4ade80">Publish / Subscribe</Badge>
          <p style={{ color: '#a0c8ff', fontSize: '15px', lineHeight: '1.8', margin: '10px 0 8px 0' }}>
            Menyalin <strong>perubahan level baris</strong> (INSERT/UPDATE/DELETE) berdasarkan publikasi yang dikonfigurasi. Replica bisa versi berbeda & bisa write.
          </p>
          <p style={{ color: '#4ade80', fontSize: '14px', margin: '0 0 2px 0' }}>✓ Bisa beda versi PostgreSQL</p>
          <p style={{ color: '#4ade80', fontSize: '14px', margin: '0 0 2px 0' }}>✓ Bisa replikasi tabel / schema tertentu</p>
          <p style={{ color: '#4ade80', fontSize: '14px', margin: '0 0 2px 0' }}>✓ Subscriber bisa write (tabel yang tidak direplikasi)</p>
          <p style={{ color: '#4ade80', fontSize: '14px', margin: '0 0 2px 0' }}>✓ Cocok untuk migrasi & distribusi data</p>
          <p style={{ color: '#f87171', fontSize: '14px', margin: '0 0 2px 0' }}>✗ DDL tidak ikut direplikasi otomatis</p>
          <p style={{ color: '#f87171', fontSize: '14px', margin: '0 0 2px 0' }}>✗ Sequence tidak direplikasi</p>
          <p style={{ color: '#f87171', fontSize: '14px', margin: '0 0 2px 0' }}>✗ Setup lebih kompleks dari streaming</p>
        </div>
      </div>
    </Block>

    {/* Topologi umum */}
    <Block title="Topologi Replikasi yang Umum Digunakan" color="#fbbf24">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
        {[
          {
            name: 'Primary + 1 Standby',
            color: '#64c8ff',
            desc: 'Setup paling sederhana. 1 primary, 1 standby siap jadi primary saat failover.',
            use: 'HA sederhana, development',
          },
          {
            name: 'Primary + N Standby',
            color: '#4ade80',
            desc: 'Multiple replica untuk load balancing baca. 1 standby sync (HA), sisanya async (read scale).',
            use: 'Production dengan banyak read query',
          },
          {
            name: 'Cascading Replication',
            color: '#fbbf24',
            desc: 'Standby mereplikasi ke standby lain. Mengurangi beban WAL streaming dari primary.',
            use: 'Multi-region, banyak replica',
          },
          {
            name: 'Logical (Pub/Sub)',
            color: '#a78bfa',
            desc: 'Replikasi tabel tertentu ke subscriber. Subscriber bisa versi berbeda, bisa write.',
            use: 'Migrasi versi, distribusi data, microservices',
          },
        ].map((t, i) => (
          <div key={i} style={{ background: `${t.color}0d`, border: `1px solid ${t.color}30`, borderRadius: '6px', padding: '12px' }}>
            <p style={{ color: t.color, fontWeight: 'bold', fontSize: '15px', marginBottom: '6px' }}>{t.name}</p>
            <p style={{ color: '#a0c8ff', fontSize: '14px', lineHeight: '1.7', marginBottom: '6px' }}>{t.desc}</p>
            <p style={{ color: '#708090', fontSize: '14px' }}>Use case: <span style={{ color: t.color }}>{t.use}</span></p>
          </div>
        ))}
      </div>
    </Block>

    {/* Sync vs Async */}
    <Block title="Synchronous vs Asynchronous Replication" color="#f87171">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div style={{ background: 'rgba(248,113,113,0.06)', border: '1px solid rgba(248,113,113,0.2)', borderRadius: '8px', padding: '14px' }}>
          <p style={{ color: '#f87171', fontWeight: 'bold', fontSize: '16px', marginBottom: '8px' }}>Synchronous (SYNC)</p>
          <p style={{ color: '#a0c8ff', fontSize: '15px', lineHeight: '1.8', marginBottom: '8px' }}>
            Primary menunggu konfirmasi dari standby sebelum mengembalikan sukses ke client. <strong>Tidak ada data loss</strong> jika primary crash.
          </p>
          <p style={{ color: '#4ade80', fontSize: '14px' }}>✓ RPO = 0 (zero data loss)</p>
          <p style={{ color: '#4ade80', fontSize: '14px' }}>✓ Aman untuk transaksi kritis (perbankan, dll)</p>
          <p style={{ color: '#f87171', fontSize: '14px' }}>✗ Latency write naik (tunggu ack dari standby)</p>
          <p style={{ color: '#f87171', fontSize: '14px' }}>✗ Jika standby down → primary bisa hang!</p>
          <Code color="#86efac">
{`-- postgresql.conf
synchronous_standby_names = 'standby1'
-- atau ANY 1 dari beberapa:
synchronous_standby_names = 'ANY 1 (s1, s2, s3)'
-- atau ALL harus confirm:
synchronous_standby_names = 'FIRST 2 (s1, s2, s3)'`}
          </Code>
        </div>
        <div style={{ background: 'rgba(74,222,128,0.06)', border: '1px solid rgba(74,222,128,0.2)', borderRadius: '8px', padding: '14px' }}>
          <p style={{ color: '#4ade80', fontWeight: 'bold', fontSize: '16px', marginBottom: '8px' }}>Asynchronous (ASYNC) — Default</p>
          <p style={{ color: '#a0c8ff', fontSize: '15px', lineHeight: '1.8', marginBottom: '8px' }}>
            Primary langsung kembalikan sukses ke client tanpa tunggu standby. Standby mengejar WAL secara async. Ada jeda kecil (lag).
          </p>
          <p style={{ color: '#4ade80', fontSize: '14px' }}>✓ Tidak ada overhead latency di primary</p>
          <p style={{ color: '#4ade80', fontSize: '14px' }}>✓ Standby down tidak mempengaruhi primary</p>
          <p style={{ color: '#f87171', fontSize: '14px' }}>✗ Ada kemungkinan data loss kecil saat failover</p>
          <p style={{ color: '#f87171', fontSize: '14px' }}>✗ RPO = sejumlah lag yang ada</p>
          <Code color="#86efac">
{`-- postgresql.conf (default jika tidak di-set)
synchronous_standby_names = ''
-- Cek mode replikasi yang berjalan:
SELECT application_name, sync_state
FROM pg_stat_replication;
-- sync_state: async / sync / potential`}
          </Code>
        </div>
      </div>
    </Block>
  </div>
)

const Streaming = () => (
  <div>
    <h3 style={{ color: '#64c8ff', fontWeight: 'bold', fontSize: '20px', marginBottom: '4px' }}>📡 Streaming Replication — Setup Lengkap</h3>
    <p style={{ color: '#708090', fontSize: '16px', marginBottom: '16px' }}>
      Streaming replication mengirim WAL record secara real-time dari primary ke standby melalui koneksi TCP. Ini adalah mode replikasi paling umum di production PostgreSQL.
    </p>

    <Block title="Cara Kerja Streaming Replication" color="#64c8ff">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
        {[
          { n: '1', c: '#64c8ff', t: 'Client commit transaksi di Primary', d: 'WAL record ditulis ke pg_wal. Jika async: langsung sukses. Jika sync: tunggu ack standby.' },
          { n: '2', c: '#4ade80', t: 'WAL Sender process mengirim WAL', d: 'Setiap primary menjalankan 1 WAL sender per standby. WAL record dikirim via TCP connection.' },
          { n: '3', c: '#fbbf24', t: 'WAL Receiver di standby menerima', d: 'Standby punya 1 WAL receiver process. WAL record ditulis ke pg_wal standby.' },
          { n: '4', c: '#f87171', t: 'Startup process me-replay WAL', d: 'Standby terus replay WAL record ke data files. Database standby selalu dalam recovery mode.' },
          { n: '5', c: '#a78bfa', t: 'Standby siap menerima query read-only', d: 'hot_standby = on memungkinkan SELECT berjalan di standby meski sedang replay WAL.' },
        ].map(s => <Step key={s.n} number={s.n} color={s.c} title={s.t} desc={s.d} />)}
      </div>
    </Block>

    <Block title="Konfigurasi Primary — postgresql.conf & pg_hba.conf" color="#4ade80">
      <Code>
{`-- ── postgresql.conf di PRIMARY ───────────────────────────────

-- WAL level minimal harus 'replica'
wal_level = replica

-- Izinkan berapa banyak WAL sender (1 per replica)
max_wal_senders = 10

-- Simpan WAL cukup lama agar standby bisa catch-up setelah lag
-- (dipakai jika tidak pakai replication slot)
wal_keep_size = 1GB            -- PostgreSQL 13+
-- wal_keep_segments = 64     -- PostgreSQL 12 ke bawah (1 segment = 16MB)

-- Aktifkan query di standby (hot standby)
hot_standby = on               -- ini setting di standby, tapi tidak ada salahnya set di primary

-- Untuk synchronous replication (opsional):
-- synchronous_standby_names = 'ANY 1 (standby1, standby2)'
-- synchronous_commit = on     -- default

-- Timeout jika standby tidak merespons
wal_sender_timeout = 60s       -- 0 = tidak pernah timeout (hati-hati!)
wal_receiver_timeout = 60s

-- ── pg_hba.conf di PRIMARY ────────────────────────────────────
-- Izinkan koneksi replication dari IP standby

# TYPE  DATABASE     USER         ADDRESS           METHOD
host    replication  replicator   10.0.0.2/32       scram-sha-256
host    replication  replicator   10.0.0.3/32       scram-sha-256

-- ── Buat user replication di PRIMARY ─────────────────────────
CREATE ROLE replicator
  LOGIN
  REPLICATION
  PASSWORD 'R3pl1c@P@ss!';

-- Reload config
SELECT pg_reload_conf();`}
      </Code>
    </Block>

    <Block title="Setup Standby dari Nol dengan pg_basebackup" color="#fbbf24">
      <Code>
{`# ── Di server STANDBY ────────────────────────────────────────

# 1. Pastikan PostgreSQL di standby sudah terinstall (versi sama)
#    tapi belum pernah diinisialisasi (atau sudah dihapus datanya)

# 2. Hapus data lama jika ada
sudo systemctl stop postgresql
sudo rm -rf /var/lib/postgresql/16/main/*

# 3. Jalankan pg_basebackup dari primary
sudo -u postgres pg_basebackup \
  -h 10.0.0.1 \
  -p 5432 \
  -U replicator \
  -D /var/lib/postgresql/16/main \
  -Fp \
  --checkpoint=fast \
  --wal-method=stream \
  -R \
  -P \
  -v

# Flag penting:
# -Fp  : format plain (direktori, langsung dipakai)
# -Xs  : stream WAL selama backup berlangsung (alias --wal-method=stream)
# -R   : otomatis buat standby.signal + tulis primary_conninfo ke postgresql.auto.conf
# -P   : progress bar
# -v   : verbose

# 4. Verifikasi file yang dibuat oleh -R:
cat /var/lib/postgresql/16/main/standby.signal
# (file kosong — keberadaannya yang penting, menandai ini adalah standby)

cat /var/lib/postgresql/16/main/postgresql.auto.conf
# primary_conninfo = 'host=10.0.0.1 port=5432 user=replicator ...'

# 5. Tambahkan konfigurasi standby (jika -R kurang lengkap)
cat >> /var/lib/postgresql/16/main/postgresql.auto.conf << 'EOF'
primary_conninfo = 'host=10.0.0.1 port=5432 user=replicator password=R3pl1c@P@ss! application_name=standby1'
recovery_target_timeline = 'latest'
hot_standby = on
hot_standby_feedback = on    -- beritahu primary tentang query aktif di standby (cegah vacuum agresif)
EOF

# 6. Nyalakan standby
sudo systemctl start postgresql

# 7. Monitor log standby — harus ada:
# "started streaming WAL from primary at ..."
tail -f /var/log/postgresql/postgresql-16-main.log`}
      </Code>
    </Block>

    <Block title="Setup Standby dengan rsync (Alternatif pg_basebackup)" color="#34d399">
      <Code>
{`# ── Kapan pakai rsync? ────────────────────────────────────────
# - Standby sudah ada datanya dan hampir sinkron (hemat bandwidth)
# - pg_basebackup tidak tersedia / terblokir firewall port 5432 dari standby
# - Butuh kontrol lebih detail atas file yang disalin
# ⚠️  Butuh akses SSH dari primary ke standby (atau sebaliknya)

# ── Di server PRIMARY ─────────────────────────────────────────

# 1. Mulai backup mode (PostgreSQL 15+ gunakan pg_backup_start())
sudo -u postgres psql -c "SELECT pg_backup_start('rsync-base', fast := true);"
# PostgreSQL < 15:
# sudo -u postgres psql -c "SELECT pg_start_backup('rsync-base', true);"

# 2. Salin data ke standby via rsync
#    --exclude pg_wal  → WAL disalin terpisah setelah stop backup
#    --exclude postmaster.pid  → jangan salin PID file
sudo -u postgres rsync -av --delete \\
  --exclude='pg_wal/*' \\
  --exclude='postmaster.pid' \\
  --exclude='postmaster.opts' \\
  /var/lib/postgresql/16/main/ \\
  postgres@10.0.0.2:/var/lib/postgresql/16/main/

# 3. Selesaikan backup mode — PostgreSQL mencatat LSN akhir
sudo -u postgres psql -c "SELECT pg_backup_stop(wait_for_archive := true);"
# PostgreSQL < 15:
# sudo -u postgres psql -c "SELECT pg_stop_backup();"

# 4. Salin WAL yang dibutuhkan (dari pg_wal)
#    pg_backup_stop() menghasilkan file .backup yang menunjukkan range WAL
sudo -u postgres rsync -av \\
  /var/lib/postgresql/16/main/pg_wal/ \\
  postgres@10.0.0.2:/var/lib/postgresql/16/main/pg_wal/

# ── Di server STANDBY ─────────────────────────────────────────

# 5. Pastikan PostgreSQL standby berhenti
sudo systemctl stop postgresql

# 6. Buat standby.signal (tanda bahwa ini adalah standby)
sudo -u postgres touch /var/lib/postgresql/16/main/standby.signal

# 7. Tulis konfigurasi koneksi ke primary
sudo -u postgres tee -a /var/lib/postgresql/16/main/postgresql.auto.conf << 'EOF'
primary_conninfo = 'host=10.0.0.1 port=5432 user=replicator password=R3pl1c@P@ss! application_name=standby1'
recovery_target_timeline = 'latest'
hot_standby = on
hot_standby_feedback = on
EOF

# 8. Perbaiki kepemilikan file (jika rsync dijalankan sebagai root)
sudo chown -R postgres:postgres /var/lib/postgresql/16/main/

# 9. Nyalakan standby
sudo systemctl start postgresql

# 10. Verifikasi streaming berjalan
sudo -u postgres psql -c "SELECT * FROM pg_stat_wal_receiver;"

# ── Di PRIMARY — cek standby terhubung ───────────────────────
sudo -u postgres psql -c "SELECT application_name, state, sent_lsn, write_lsn, flush_lsn, replay_lsn FROM pg_stat_replication;"`}
      </Code>
    </Block>

    <Block title="Konfigurasi Standby — postgresql.conf" color="#a78bfa">
      <Code>
{`-- ── postgresql.conf di STANDBY ──────────────────────────────

hot_standby = on
-- Izinkan query SELECT di standby meski sedang replay WAL

hot_standby_feedback = on
-- Standby memberitahu primary tentang transaksi aktif
-- Mencegah primary VACUUM menghapus baris yang masih dibutuhkan standby
-- ⚠️ Bisa menyebabkan table bloat di primary jika standby lag tinggi

max_standby_streaming_delay = 30s
-- Berapa lama standby menunggu sebelum cancel query yang conflict dengan WAL replay
-- -1 = tunggu selamanya (hati-hati untuk query panjang)

max_standby_archive_delay = 30s
-- Sama, tapi untuk WAL yang dibaca dari archive (bukan streaming)

wal_receiver_timeout = 60s
-- Berapa lama WAL receiver tunggu data dari primary sebelum reconnect

-- ── Periksa apakah ini primary atau standby ───────────────────
SELECT pg_is_in_recovery();   -- TRUE = standby, FALSE = primary

-- ── Cek status WAL receiver ───────────────────────────────────
SELECT * FROM pg_stat_wal_receiver \gx`}
      </Code>
    </Block>

    <Block title="Cascading Replication — Standby dari Standby" color="#e879f9">
      <Code>
{`-- Topologi: Primary → Standby1 → Standby2 (cascading)
-- Manfaat: mengurangi beban WAL sender di primary
-- Standby2 menerima WAL dari Standby1, bukan dari Primary

-- ── Di Standby1: izinkan menjadi sumber replikasi ────────────
-- postgresql.conf Standby1:
wal_level = replica          -- harus replica agar bisa jadi sumber WAL
max_wal_senders = 5
hot_standby = on

-- ── Setup Standby2: basebackup dari Standby1 ─────────────────
pg_basebackup \
  -h 10.0.0.2 \             # IP Standby1 (bukan primary!)
  -U replicator \
  -D /var/lib/postgresql/16/main \
  -Fp --checkpoint=fast --wal-method=stream -R -P

# Di postgresql.auto.conf Standby2:
# primary_conninfo = 'host=10.0.0.2 ...'   ← point ke Standby1

-- ── Verifikasi cascade dari primary ──────────────────────────
-- Di primary: lihat semua koneksi replication (hanya Standby1)
SELECT application_name, client_addr, state, sent_lsn, write_lsn
FROM pg_stat_replication;

-- Di Standby1: lihat koneksi dari Standby2
SELECT application_name, client_addr, state, sent_lsn
FROM pg_stat_replication;   -- Standby2 muncul di sini

-- Di Standby2: lihat koneksi ke Standby1
SELECT * FROM pg_stat_wal_receiver;`}
      </Code>
    </Block>
  </div>
)

const Logical = () => (
  <div>
    <h3 style={{ color: '#4ade80', fontWeight: 'bold', fontSize: '20px', marginBottom: '4px' }}>🔀 Logical Replication — Publish / Subscribe</h3>
    <p style={{ color: '#708090', fontSize: '16px', marginBottom: '16px' }}>
      Logical replication menyalin perubahan di level baris (row), bukan level byte WAL. Publisher mendefinisikan publikasi, subscriber mendaftar dan menerima perubahan. Keduanya bisa beda versi PostgreSQL.
    </p>

    <Block title="Cara Kerja Logical Replication" color="#4ade80">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '10px' }}>
        <div>
          {[
            { n: '1', c: '#4ade80', t: 'Logical Decoding', d: 'WAL record di-decode dari format binary menjadi perubahan logis (INSERT/UPDATE/DELETE per baris) menggunakan output plugin pgoutput.' },
            { n: '2', c: '#fbbf24', t: 'Publication', d: 'Publisher mendefinisikan tabel mana yang akan dipublikasikan dan operasi apa (INSERT, UPDATE, DELETE, TRUNCATE).' },
            { n: '3', c: '#f87171', t: 'Replication Slot', d: 'Slot dibuat di publisher untuk menyimpan posisi WAL yang sudah dikirim ke subscriber. Menjamin tidak ada data yang terlewat.' },
            { n: '4', c: '#a78bfa', t: 'Subscription', d: 'Subscriber connect ke publisher, sinkronisasi data awal (initial sync), lalu terus menerima perubahan real-time.' },
          ].map(s => <Step key={s.n} number={s.n} color={s.c} title={s.t} desc={s.d} />)}
        </div>
        <div style={{ background: 'rgba(74,222,128,0.05)', border: '1px solid rgba(74,222,128,0.2)', borderRadius: '8px', padding: '14px' }}>
          <p style={{ color: '#4ade80', fontWeight: 'bold', fontSize: '15px', marginBottom: '10px' }}>Apa yang BISA dan TIDAK BISA direplikasi</p>
          {[
            { ok: true,  text: 'INSERT, UPDATE, DELETE, TRUNCATE per tabel' },
            { ok: true,  text: 'Tabel tertentu (tidak harus semua)' },
            { ok: true,  text: 'Schema tertentu (PostgreSQL 15+)' },
            { ok: true,  text: 'Subscriber bisa beda versi PostgreSQL' },
            { ok: true,  text: 'Subscriber bisa write di tabel lain' },
            { ok: true,  text: 'Row filter (PostgreSQL 15+)' },
            { ok: true,  text: 'Column filter (PostgreSQL 16+)' },
            { ok: false, text: 'DDL (CREATE TABLE, ALTER, dll.) — harus manual' },
            { ok: false, text: 'Sequence values' },
            { ok: false, text: 'Large objects (pg_largeobject)' },
            { ok: false, text: 'Tabel tanpa PRIMARY KEY atau REPLICA IDENTITY' },
          ].map((item, i) => (
            <p key={i} style={{ color: item.ok ? '#4ade80' : '#f87171', fontSize: '14px', margin: '0 0 3px 0' }}>
              {item.ok ? '✓' : '✗'} {item.text}
            </p>
          ))}
        </div>
      </div>
    </Block>

    <Block title="Konfigurasi Publisher" color="#64c8ff">
      <Code>
{`-- ── postgresql.conf di PUBLISHER ────────────────────────────
wal_level = logical          -- wajib! (lebih tinggi dari replica)
max_replication_slots = 10   -- 1 slot per subscriber
max_wal_senders = 10

-- Reload config
SELECT pg_reload_conf();

-- ── pg_hba.conf di PUBLISHER ─────────────────────────────────
-- host  replication  replicator  10.0.0.5/32  scram-sha-256

-- ── Buat user replication ─────────────────────────────────────
CREATE ROLE replicator LOGIN REPLICATION PASSWORD 'R3pl1c@P@ss!';

-- Beri akses SELECT ke semua tabel yang akan dipublikasikan
GRANT SELECT ON ALL TABLES IN SCHEMA public TO replicator;
-- Atau per tabel:
GRANT SELECT ON orders, order_items, products TO replicator;

-- ── Buat PUBLICATION ──────────────────────────────────────────

-- Publikasi semua tabel di semua schema
CREATE PUBLICATION pub_all FOR ALL TABLES;

-- Publikasi tabel tertentu saja
CREATE PUBLICATION pub_orders
  FOR TABLE orders, order_items, products;

-- Publikasi dengan filter operasi (hanya INSERT & UPDATE, tidak DELETE)
CREATE PUBLICATION pub_inserts_only
  FOR TABLE audit_log
  WITH (publish = 'insert, update');

-- Publikasi INSERT + UPDATE saja untuk tabel tertentu
CREATE PUBLICATION pub_orders_iupdate
  FOR TABLE orders, order_items
  WITH (publish = 'insert, update');

-- Publikasi INSERT saja (append-only, tidak ada update/delete/truncate)
CREATE PUBLICATION pub_events_insert_only
  FOR TABLE events
  WITH (publish = 'insert');

-- Cek operasi apa yang dipublikasikan
SELECT pubname,
       pubinsert,
       pubupdate,
       pubdelete,
       pubtruncate
FROM pg_publication;

-- Publikasi semua tabel dalam schema tertentu (PG 15+)
CREATE PUBLICATION pub_analytics
  FOR TABLES IN SCHEMA analytics;

-- Tambah / hapus tabel dari publikasi
ALTER PUBLICATION pub_orders ADD TABLE customers;
ALTER PUBLICATION pub_orders DROP TABLE old_table;
ALTER PUBLICATION pub_orders SET TABLE orders, order_items;

-- Lihat publikasi yang ada
SELECT * FROM pg_publication;
SELECT * FROM pg_publication_tables;

-- Drop publikasi
DROP PUBLICATION pub_orders;`}
      </Code>
    </Block>

    <Block title="Konfigurasi Subscriber" color="#a78bfa">
      <Code>
{`-- ── Di SUBSCRIBER: buat tabel dulu (DDL tidak direplikasi!) ──
-- Schema harus sudah ada di subscriber sebelum subscribe
CREATE TABLE orders (
  id         BIGINT PRIMARY KEY,
  user_id    BIGINT NOT NULL,
  total      NUMERIC NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE order_items (
  id         BIGINT PRIMARY KEY,
  order_id   BIGINT NOT NULL,
  product_id BIGINT NOT NULL,
  qty        INT NOT NULL,
  price      NUMERIC NOT NULL
);

-- ── Buat SUBSCRIPTION ─────────────────────────────────────────
CREATE SUBSCRIPTION sub_orders
  CONNECTION 'host=10.0.0.1 port=5432 dbname=mydb user=replicator password=R3pl1c@P@ss!'
  PUBLICATION pub_orders;

-- Subscription dengan opsi
CREATE SUBSCRIPTION sub_orders
  CONNECTION 'host=10.0.0.1 port=5432 dbname=mydb user=replicator sslmode=require'
  PUBLICATION pub_orders
  WITH (
    copy_data = true,        -- lakukan initial data sync (default true)
    create_slot = true,      -- buat replication slot di publisher (default true)
    enabled = true,          -- langsung aktif (default true)
    slot_name = 'sub_orders_slot'  -- nama slot kustom
  );

-- Subscribe tapi tunda initial sync (berguna jika data sudah ada di subscriber)
CREATE SUBSCRIPTION sub_orders
  CONNECTION '...'
  PUBLICATION pub_orders
  WITH (copy_data = false);

-- ── Kelola subscription ────────────────────────────────────────
-- Disable / enable sementara
ALTER SUBSCRIPTION sub_orders DISABLE;
ALTER SUBSCRIPTION sub_orders ENABLE;

-- Refresh (sinkronisasi tabel baru yang ditambahkan ke publikasi)
ALTER SUBSCRIPTION sub_orders REFRESH PUBLICATION;
ALTER SUBSCRIPTION sub_orders REFRESH PUBLICATION WITH (copy_data = false);

-- Skip 1 transaksi yang bermasalah (PG 15+)
ALTER SUBSCRIPTION sub_orders SKIP (lsn = '0/15D5678');

-- Lihat subscription
SELECT * FROM pg_subscription;
SELECT * FROM pg_subscription_rel;  -- status per tabel

-- Drop subscription
DROP SUBSCRIPTION sub_orders;       -- otomatis drop slot di publisher`}
      </Code>
    </Block>

    <Block title="Row Filter & Column Filter (PostgreSQL 15/16+)" color="#fbbf24">
      <Code>
{`-- ── Row Filter (PG 15+): hanya replikasi baris tertentu ──────
CREATE PUBLICATION pub_active_orders
  FOR TABLE orders (id, user_id, total, status, created_at)   -- column filter PG 16+
  WHERE (status != 'cancelled' AND created_at > '2025-01-01');  -- row filter PG 15+

-- Contoh: replikasi hanya region tertentu ke subscriber regional
CREATE PUBLICATION pub_jakarta
  FOR TABLE orders
  WHERE (region_id = 1);

CREATE PUBLICATION pub_surabaya
  FOR TABLE orders
  WHERE (region_id = 2);

-- ── Column Filter (PG 16+): hanya kolom tertentu ─────────────
-- Berguna untuk tidak mengirim kolom sensitif (PII, secret)
CREATE PUBLICATION pub_orders_public
  FOR TABLE employees (id, name, department, hire_date)
  -- kolom salary, address, phone TIDAK disertakan
  ;

-- ── Catatan penting Row Filter: ───────────────────────────────
-- UPDATE/DELETE: baris yang tidak match filter tetap diproses di publisher
-- tapi tidak dikirim ke subscriber
-- Jika baris berubah dari match → tidak match: DELETE dikirim ke subscriber
-- Jika baris berubah dari tidak match → match: INSERT dikirim ke subscriber`}
      </Code>
    </Block>

    <Block title="Use Case: Migrasi Zero-Downtime ke Versi Baru" color="#e879f9">
      <Code>
{`-- Skenario: Migrasi dari PostgreSQL 15 ke 16 tanpa downtime

-- ── PHASE 1: Setup logical replication 15 → 16 ───────────────

-- Di PG 15 (publisher/old):
CREATE PUBLICATION pub_migration FOR ALL TABLES;

-- Di PG 16 (subscriber/new): buat semua schema & tabel dulu
-- (bisa gunakan pg_dump --schema-only dari PG 15)
pg_dump -h old-server -U postgres -d mydb --schema-only | \
  psql -h new-server -U postgres -d mydb

-- Di PG 16: buat subscription
CREATE SUBSCRIPTION sub_migration
  CONNECTION 'host=old-server port=5432 dbname=mydb user=replicator password=...'
  PUBLICATION pub_migration;

-- Tunggu initial sync selesai:
SELECT subname, srrelid::regclass, srsubstate
FROM pg_subscription_rel
JOIN pg_subscription ON srsubid = oid;
-- srsubstate: 'i'=init, 'd'=data copy, 'f'=finished, 'r'=ready ✅

-- Monitor lag:
SELECT now() - pg_last_xact_replay_timestamp() AS replication_lag;

-- ── PHASE 2: Cutover ──────────────────────────────────────────
-- 1. Set aplikasi ke maintenance mode / read-only
-- 2. Tunggu lag = 0 di subscriber
-- 3. Update sequence di PG 16 (tidak direplikasi otomatis!)
SELECT setval('orders_id_seq',
  (SELECT MAX(id) FROM orders) + 1000);  -- +1000 buffer
-- 4. Point aplikasi ke PG 16
-- 5. Drop subscription dan publikasi

DROP SUBSCRIPTION sub_migration;       -- di PG 16
DROP PUBLICATION pub_migration;        -- di PG 15`}
      </Code>
      <Note>Setelah cutover, jangan lupa update semua sequence di server baru. Logical replication tidak mereplikasi nilai sequence — ini sering menjadi penyebab duplicate key error setelah migrasi.</Note>
    </Block>
  </div>
)

const Slots = () => (
  <div>
    <h3 style={{ color: '#f87171', fontWeight: 'bold', fontSize: '20px', marginBottom: '4px' }}>🎰 Replication Slots</h3>
    <p style={{ color: '#708090', fontSize: '16px', marginBottom: '16px' }}>
      Replication slot adalah mekanisme di PostgreSQL untuk menjamin bahwa WAL tidak dihapus sebelum dikonsumsi oleh consumer (standby atau logical subscriber). Sangat penting tapi bisa berbahaya jika tidak dimonitor.
    </p>

    <Block title="Jenis Replication Slot" color="#f87171">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '10px' }}>
        <div style={{ background: 'rgba(248,113,113,0.06)', border: '1px solid rgba(248,113,113,0.2)', borderRadius: '8px', padding: '14px' }}>
          <p style={{ color: '#f87171', fontWeight: 'bold', fontSize: '16px', marginBottom: '8px' }}>Physical Slot</p>
          <p style={{ color: '#a0c8ff', fontSize: '15px', lineHeight: '1.7', marginBottom: '8px' }}>Digunakan oleh streaming replication. Memastikan primary tidak menghapus WAL yang belum diterima standby.</p>
          <Code color="#86efac">
{`-- Buat physical slot
SELECT pg_create_physical_replication_slot('standby1_slot');

-- Pakai di standby (primary_slot_name):
-- postgresql.auto.conf:
-- primary_slot_name = 'standby1_slot'

SELECT slot_name, slot_type, active,
       restart_lsn, confirmed_flush_lsn
FROM pg_replication_slots
WHERE slot_type = 'physical';`}
          </Code>
        </div>
        <div style={{ background: 'rgba(74,222,128,0.06)', border: '1px solid rgba(74,222,128,0.2)', borderRadius: '8px', padding: '14px' }}>
          <p style={{ color: '#4ade80', fontWeight: 'bold', fontSize: '16px', marginBottom: '8px' }}>Logical Slot</p>
          <p style={{ color: '#a0c8ff', fontSize: '15px', lineHeight: '1.7', marginBottom: '8px' }}>Digunakan oleh logical replication. Menyimpan posisi WAL decode untuk setiap subscriber. Dibuat otomatis saat CREATE SUBSCRIPTION.</p>
          <Code color="#86efac">
{`-- Buat logical slot manual (jarang diperlukan)
SELECT pg_create_logical_replication_slot(
  'my_slot', 'pgoutput');

-- Lihat slot dan posisinya
SELECT slot_name, slot_type, active,
       pg_size_pretty(
         pg_wal_lsn_diff(pg_current_wal_lsn(), restart_lsn)
       ) AS retained_wal
FROM pg_replication_slots
WHERE slot_type = 'logical';`}
          </Code>
        </div>
      </div>
    </Block>

    <Block title="⚠️ Bahaya Replication Slot yang Tidak Aktif" color="#fbbf24">
      <Code color="#fca5a5">
{`-- Replication slot yang INACTIVE (consumer mati/disconnect)
-- menyebabkan PostgreSQL TIDAK menghapus WAL lama
-- Akibat: disk $PGDATA penuh → PostgreSQL CRASH!

-- ── Deteksi slot berbahaya ───────────────────────────────────
SELECT
  slot_name,
  slot_type,
  active,
  pg_size_pretty(
    pg_wal_lsn_diff(pg_current_wal_lsn(), restart_lsn)
  ) AS retained_wal_size,   -- ← ini yang harus dipantau!
  now() - pg_last_xact_replay_timestamp() AS slot_lag
FROM pg_replication_slots
ORDER BY pg_wal_lsn_diff(pg_current_wal_lsn(), restart_lsn) DESC;

-- Contoh output berbahaya:
-- slot_name    | active | retained_wal_size
-- sub_old_slot | f      | 45 GB             ← slot inactive, WAL 45GB tertahan!

-- ── Solusi: drop slot yang tidak dipakai ─────────────────────
SELECT pg_drop_replication_slot('sub_old_slot');

-- ── Pencegahan: set batas maksimal WAL yang dipertahankan ────
-- postgresql.conf:
max_slot_wal_keep_size = 10GB
-- Jika slot menahan WAL lebih dari 10GB → slot otomatis di-invalidate
-- Subscriber harus melakukan full resync

-- ── Alert: monitor retained WAL size ────────────────────────
SELECT slot_name, active,
  pg_size_pretty(
    pg_wal_lsn_diff(pg_current_wal_lsn(), restart_lsn)
  ) AS retained
FROM pg_replication_slots
WHERE pg_wal_lsn_diff(pg_current_wal_lsn(), restart_lsn) > 5368709120; -- > 5GB`}
      </Code>
      <Note>Aturan emas: jangan pernah biarkan replication slot inactive lebih dari beberapa menit tanpa monitoring. Pasang alert jika retained WAL size melebihi threshold (misalnya 5GB).</Note>
    </Block>

    <Block title="wal_keep_size vs Replication Slot" color="#a78bfa">
      <Code>
{`-- Dua cara mencegah WAL terlalu cepat dihapus:

-- ── 1. wal_keep_size (postgresql.conf) ───────────────────────
wal_keep_size = 1GB
-- Pertahankan WAL minimal 1GB terakhir di pg_wal/
-- Tidak bergantung pada apakah ada consumer atau tidak
-- Konsumsi disk fix ~1GB tambahan
-- Tidak ada jaminan WAL cukup jika standby lag terlalu lama

-- ── 2. Replication Slot ──────────────────────────────────────
-- WAL dipertahankan sampai slot consumer confirm sudah menerima
-- Jaminan lebih kuat: tidak ada WAL yang hilang sebelum dikonsumsi
-- ⚠️ Bahaya: jika consumer mati lama, disk bisa penuh

-- ── Rekomendasi: pakai keduanya ──────────────────────────────
wal_keep_size = 512MB          -- buffer minimum agar standby bisa reconnect
max_slot_wal_keep_size = 20GB  -- batas slot, cegah disk penuh

-- Primary slot name di standby (pakai slot):
-- postgresql.auto.conf:
-- primary_slot_name = 'standby1_slot'
-- recovery_min_apply_delay = 0  -- atau set delay untuk delayed standby

-- ── Monitoring total WAL directory size ──────────────────────
SELECT pg_size_pretty(sum(size)) AS wal_dir_size
FROM pg_ls_waldir();

-- Lihat semua file WAL dan ukurannya
SELECT name, pg_size_pretty(size), modification
FROM pg_ls_waldir()
ORDER BY modification DESC
LIMIT 20;`}
      </Code>
    </Block>
  </div>
)

const Monitoring = () => (
  <div>
    <h3 style={{ color: '#38bdf8', fontWeight: 'bold', fontSize: '20px', marginBottom: '16px' }}>📊 Monitoring Replikasi</h3>

    <Block title="pg_stat_replication — Status dari Sisi Primary" color="#38bdf8">
      <Code>
{`-- Tampilkan semua standby yang terhubung ke primary ini
SELECT
  pid,
  application_name,
  client_addr,
  state,           -- startup | catchup | streaming | backup | stopping
  sent_lsn,        -- LSN terakhir yang dikirim primary
  write_lsn,       -- LSN yang sudah ditulis standby ke disk
  flush_lsn,       -- LSN yang sudah di-fsync standby
  replay_lsn,      -- LSN yang sudah di-replay standby ke data files
  sync_state,      -- async | sync | potential | quorum
  -- Hitung lag dalam bytes:
  pg_wal_lsn_diff(sent_lsn, replay_lsn)  AS replay_lag_bytes,
  -- Hitung lag dalam waktu (PG 10+):
  write_lag,       -- delay antara commit di primary dan tulis di standby
  flush_lag,       -- delay antara commit di primary dan flush di standby
  replay_lag       -- delay antara commit di primary dan replay di standby
FROM pg_stat_replication
ORDER BY application_name;

-- Contoh output:
-- application_name | state     | sync_state | replay_lag_bytes | replay_lag
-- standby1         | streaming | async      | 0                | 00:00:00.012
-- standby2         | streaming | sync       | 0                | 00:00:00.001
-- standby3         | catchup   | async      | 524288000        | 00:01:23.456  ← lag!

-- Monitor lag dalam format yang mudah dibaca
SELECT
  application_name,
  client_addr,
  state,
  sync_state,
  pg_size_pretty(pg_wal_lsn_diff(pg_current_wal_lsn(), replay_lsn)) AS lag_size,
  replay_lag,
  CASE WHEN replay_lag > INTERVAL '1 minute' THEN '⚠️ LAG!' ELSE '✅ OK' END AS status
FROM pg_stat_replication;`}
      </Code>
    </Block>

    <Block title="pg_stat_wal_receiver — Status dari Sisi Standby" color="#4ade80">
      <Code>
{`-- Jalankan di STANDBY
SELECT
  pid,
  status,                -- streaming | catchup | stopped
  receive_start_lsn,     -- LSN awal mulai menerima WAL
  received_lsn,          -- LSN terakhir yang sudah diterima
  last_msg_send_time,    -- kapan terakhir standby kirim pesan ke primary
  last_msg_receipt_time, -- kapan terakhir menerima pesan dari primary
  latest_end_lsn,
  latest_end_time,
  sender_host,           -- IP primary
  sender_port,
  slot_name              -- nama slot yang dipakai (jika ada)
FROM pg_stat_wal_receiver \gx

-- Hitung lag dari sisi standby
SELECT
  now() - pg_last_xact_replay_timestamp() AS replication_lag,
  pg_is_in_recovery()                      AS is_standby,
  pg_last_wal_receive_lsn()               AS last_received_lsn,
  pg_last_wal_replay_lsn()                AS last_replayed_lsn,
  pg_wal_lsn_diff(
    pg_last_wal_receive_lsn(),
    pg_last_wal_replay_lsn()
  )                                        AS receive_to_replay_lag_bytes;`}
      </Code>
    </Block>

    <Block title="Monitoring Logical Replication" color="#a78bfa">
      <Code>
{`-- ── Di PUBLISHER: lihat slot status ─────────────────────────
SELECT
  slot_name,
  plugin,
  slot_type,
  database,
  active,
  active_pid,
  xmin,
  catalog_xmin,
  restart_lsn,
  confirmed_flush_lsn,
  pg_size_pretty(
    pg_wal_lsn_diff(pg_current_wal_lsn(), confirmed_flush_lsn)
  ) AS pending_wal_size   -- WAL yang belum di-ack subscriber
FROM pg_replication_slots
WHERE slot_type = 'logical';

-- ── Di SUBSCRIBER: status per tabel ──────────────────────────
SELECT
  s.subname,
  r.srrelid::regclass   AS table_name,
  r.srsubstate,
  -- Status:
  -- 'i' = initialize
  -- 'd' = data is being copied
  -- 'f' = finished table copy
  -- 's' = synchronized
  -- 'r' = ready (normal ongoing replication)
  CASE r.srsubstate
    WHEN 'r' THEN '✅ Ready'
    WHEN 's' THEN '🔄 Syncing'
    WHEN 'd' THEN '📥 Copying'
    WHEN 'i' THEN '⏳ Init'
    ELSE r.srsubstate::text
  END AS status
FROM pg_subscription s
JOIN pg_subscription_rel r ON r.srsubid = s.oid
ORDER BY s.subname, table_name;

-- ── Lag dari sisi subscriber ──────────────────────────────────
-- (Tidak ada pg_stat_wal_receiver untuk logical — gunakan ini)
SELECT
  now() - pg_last_xact_replay_timestamp() AS logical_apply_lag;`}
      </Code>
    </Block>

    <Block title="Script Monitoring Otomatis + Alert" color="#fbbf24">
      <Code color="#86efac">
{`#!/bin/bash
# /usr/local/bin/check_replication.sh
# Jalankan via cron setiap 1 menit

ALERT_EMAIL="ops@company.com"
LAG_THRESHOLD_MB=100
LAG_THRESHOLD_SEC=60
DB="mydb"

check_replication() {
  # Cek jumlah standby yang terhubung
  STANDBY_COUNT=$(psql -U postgres -t -c "
    SELECT count(*) FROM pg_stat_replication WHERE state = 'streaming';" 2>/dev/null)

  if [ -z "$STANDBY_COUNT" ] || [ "$STANDBY_COUNT" -lt 1 ]; then
    echo "CRITICAL: No streaming standby connected!" | \
      mail -s "[PG REPLICATION] No Standby" $ALERT_EMAIL
    return
  fi

  # Cek lag semua standby
  psql -U postgres -t -c "
    SELECT application_name,
      EXTRACT(EPOCH FROM replay_lag)::int AS lag_sec,
      pg_wal_lsn_diff(pg_current_wal_lsn(), replay_lsn) / 1048576 AS lag_mb
    FROM pg_stat_replication;" | while IFS='|' read name lag_sec lag_mb; do
      name=$(echo $name | xargs)
      lag_sec=$(echo $lag_sec | xargs)
      lag_mb=$(echo $lag_mb | xargs)

      if [ "${'lag_sec:-0'}" -gt "$LAG_THRESHOLD_SEC" ]; then
        echo "WARNING: Standby '$name' lag ${'lag_sec'}s (>${'LAG_THRESHOLD_SEC'}s)" | \
          mail -s "[PG REPLICATION] Lag Warning: $name" $ALERT_EMAIL
      fi
  done

  # Cek slot tidak aktif dengan WAL besar
  psql -U postgres -t -c "
    SELECT slot_name,
      pg_wal_lsn_diff(pg_current_wal_lsn(), restart_lsn) / 1048576 AS retained_mb
    FROM pg_replication_slots
    WHERE active = false
      AND pg_wal_lsn_diff(pg_current_wal_lsn(), restart_lsn) > 5368709120;" | \
  while IFS='|' read slot_name retained_mb; do
    [ -z "$slot_name" ] && continue
    echo "CRITICAL: Inactive slot '$slot_name' retaining ${'retained_mb'}MB WAL!" | \
      mail -s "[PG REPLICATION] Inactive Slot: $slot_name" $ALERT_EMAIL
  done
}

check_replication

# Crontab:
# * * * * * /usr/local/bin/check_replication.sh`}
      </Code>
    </Block>
  </div>
)

const Failover = () => (
  <div>
    <h3 style={{ color: '#e879f9', fontWeight: 'bold', fontSize: '20px', marginBottom: '4px' }}>🔁 Failover, Promote & Switchover</h3>
    <p style={{ color: '#708090', fontSize: '16px', marginBottom: '16px' }}>
      Failover adalah proses mempromosikan standby menjadi primary baru ketika primary down. Switchover adalah versi yang terencana (planned maintenance). Keduanya kritis dan harus dipahami dengan baik sebelum benar-benar dibutuhkan.
    </p>

    <Block title="Promote Standby — Manual Failover" color="#e879f9">
      <Code>
{`-- ── Skenario: Primary down mendadak, promosikan Standby ──────

-- ── Di STANDBY server: ────────────────────────────────────────

-- Cara 1: pg_ctl promote (paling umum)
pg_ctl promote -D /var/lib/postgresql/16/main
# atau:
sudo -u postgres pg_ctl promote -D /var/lib/postgresql/16/main

-- Cara 2: trigger file (metode lama, masih didukung)
touch /var/lib/postgresql/16/main/failover.trigger
# Nama file dikonfigurasi di recovery: trigger_file = '/path/to/failover.trigger'

-- Cara 3: pg_promote() via SQL (PG 12+)
-- Hubungkan ke standby, lalu:
SELECT pg_promote(wait => true, wait_seconds => 60);
-- Standby langsung jadi primary, return true jika berhasil

-- ── Verifikasi standby sudah jadi primary ─────────────────────
SELECT pg_is_in_recovery();   -- harus FALSE (primary = false)
SELECT pg_postmaster_start_time();   -- waktu server start
SELECT timeline_id FROM pg_control_checkpoint();  -- timeline bertambah 1

-- ── Apa yang terjadi saat promote: ───────────────────────────
-- 1. standby.signal dihapus otomatis
-- 2. recovery.conf / recovery settings dihapus
-- 3. Timeline baru dibuat (N+1)
-- 4. PostgreSQL mulai menerima write
-- 5. WAL baru menggunakan timeline baru`}
      </Code>
    </Block>

    <Block title="Switchover — Planned Failover (Tanpa Data Loss)" color="#4ade80">
      <Code>
{`-- ── Switchover: primary → standby, standby → primary baru ───
-- Gunakan saat maintenance, upgrade, dll.
-- Keunggulan: zero data loss karena terencana

-- ── STEP 1: Pastikan lag = 0 sebelum mulai ───────────────────
-- Di primary:
SELECT application_name, replay_lag, pg_size_pretty(
  pg_wal_lsn_diff(pg_current_wal_lsn(), replay_lsn)) AS lag_size
FROM pg_stat_replication;
-- Tunggu sampai lag = 00:00:00 dan lag_size = 0 bytes

-- ── STEP 2: Set primary ke read-only (cegah write baru) ──────
-- Di primary:
ALTER SYSTEM SET default_transaction_read_only = on;
SELECT pg_reload_conf();
-- Atau checkpoint terakhir:
CHECKPOINT;

-- ── STEP 3: Tunggu standby catch-up sepenuhnya ───────────────
-- Di standby:
SELECT pg_last_wal_receive_lsn() = pg_last_wal_replay_lsn() AS fully_caught_up;
-- Harus TRUE

-- ── STEP 4: Promote standby ──────────────────────────────────
pg_ctl promote -D /var/lib/postgresql/16/main
-- atau:
SELECT pg_promote();

-- ── STEP 5: Arahkan aplikasi ke standby (primary baru) ───────
-- Update connection string, HAProxy, pgBouncer, atau DNS

-- ── STEP 6: Jadikan primary lama sebagai standby baru ────────
-- Di primary lama: setup sebagai standby yang mengikuti primary baru
-- (gunakan pg_rewind untuk ini — lihat bagian bawah)
ALTER SYSTEM RESET default_transaction_read_only;`}
      </Code>
    </Block>

    <Block title="pg_rewind — Resync Primary Lama Jadi Standby" color="#fbbf24">
      <Code>
{`-- ── pg_rewind: sync ulang server lama ke timeline baru ───────
-- Digunakan setelah failover, agar primary lama bisa jadi standby
-- Jauh lebih cepat dari pg_basebackup karena hanya sync perubahan

-- ── Prasyarat ─────────────────────────────────────────────────
-- 1. wal_log_hints = on di postgresql.conf (atau data checksums enabled)
-- 2. pg_rewind butuh koneksi superuser ke primary baru

-- Di primary baru (cek setting):
SHOW wal_log_hints;     -- harus 'on'
SHOW data_checksums;    -- on juga cukup (alternatif wal_log_hints)

-- ── Jalankan pg_rewind di server primary LAMA ────────────────
-- (server lama harus dalam keadaan MATI / stopped)
sudo systemctl stop postgresql   -- stop server lama dulu!

sudo -u postgres pg_rewind \
  --target-pgdata=/var/lib/postgresql/16/main \
  --source-server='host=10.0.0.2 port=5432 user=postgres dbname=postgres' \
  -P \
  -n    # dry run dulu, lihat apa yang akan dilakukan

# Jika dry run ok, jalankan tanpa -n:
sudo -u postgres pg_rewind \
  --target-pgdata=/var/lib/postgresql/16/main \
  --source-server='host=10.0.0.2 port=5432 user=postgres dbname=postgres' \
  -P

-- ── Setup sebagai standby baru ───────────────────────────────
# Setelah pg_rewind selesai, tambahkan standby.signal
touch /var/lib/postgresql/16/main/standby.signal

# Update primary_conninfo ke primary baru
cat >> /var/lib/postgresql/16/main/postgresql.auto.conf << 'EOF'
primary_conninfo = 'host=10.0.0.2 port=5432 user=replicator password=...'
recovery_target_timeline = 'latest'
EOF

# Start server (sekarang jadi standby dari primary baru)
sudo systemctl start postgresql

# Verifikasi:
psql -c "SELECT pg_is_in_recovery();"   -- harus TRUE
psql -c "SELECT * FROM pg_stat_wal_receiver;" -- harus streaming`}
      </Code>
      <Note>pg_rewind hanya bekerja jika primary lama pernah punya data checksum aktif atau wal_log_hints = on. Aktifkan ini SEBELUM disaster — tidak bisa diaktifkan setelah kejadian tanpa rebuild.</Note>
    </Block>

    <Block title="Delayed Standby — Replica dengan Jeda Waktu" color="#38bdf8">
      <Code>
{`-- Delayed standby: sengaja di-delay beberapa jam di belakang primary
-- Berguna sebagai "time machine" — jika ada DROP TABLE, delayed replica
-- belum menjalankan perintah itu → bisa rescue data dari sana

-- ── Konfigurasi di standby ────────────────────────────────────
-- postgresql.auto.conf:
recovery_min_apply_delay = '1h'    -- standby selalu 1 jam di belakang primary
-- atau 30 menit, 2 jam, dll.

-- ── Cara rescue data dari delayed standby ────────────────────
-- Skenario: DROP TABLE terjadi jam 14:00, delayed replica delay 1 jam
-- Di jam 14:30: standby baru replay sampai jam 13:30 → tabel masih ada!

-- 1. Stop replay di delayed standby (sementara)
SELECT pg_wal_replay_pause();    -- PG 9.6+
-- Standby berhenti replay tapi masih menerima WAL

-- 2. Query / backup tabel dari delayed standby
pg_dump -h delayed-standby -U postgres -d mydb -t important_table \
  -Fc -f /tmp/rescued_table.dump

-- 3. Lanjutkan replay
SELECT pg_wal_replay_resume();

-- 4. Restore tabel ke primary
pg_restore -h primary -U postgres -d mydb -t important_table \
  /tmp/rescued_table.dump

-- ── Cek posisi delayed standby ───────────────────────────────
SELECT
  now() - pg_last_xact_replay_timestamp() AS lag_behind_realtime,
  pg_last_xact_replay_timestamp()          AS standby_current_time;`}
      </Code>
    </Block>
  </div>
)

const Compare = () => (
  <div>
    <h3 style={{ color: '#fbbf24', fontWeight: 'bold', fontSize: '20px', marginBottom: '16px' }}>⚖️ Perbandingan Solusi Replikasi</h3>

    <Block title="Streaming vs Logical — Kapan Memilih Mana?" color="#fbbf24">
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'rgba(0,0,0,0.2)' }}>
              {['Aspek', '📡 Streaming (Physical)', '🔀 Logical (Pub/Sub)'].map(h => (
                <th key={h} style={{ padding: '10px 12px', color: '#64c8ff', fontSize: '15px', textAlign: 'left' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Level replikasi',        'Byte (WAL binary)',                  'Row (logis: INSERT/UPDATE/DELETE)'],
              ['Versi PostgreSQL',       'Harus sama persis',                  'Subscriber bisa beda versi'],
              ['OS / arsitektur',        'Harus sama',                         'Bisa beda'],
              ['Apa yang direplikasi',   'Seluruh cluster (semua DB)',          'Tabel / schema yang dipilih'],
              ['DDL (CREATE TABLE dll)', 'Otomatis ikut',                      'Tidak — harus manual'],
              ['Sequence',               'Otomatis ikut',                      'Tidak direplikasi'],
              ['Replica bisa write?',    'Tidak (read-only)',                   'Ya, tabel yang tidak disubscribe'],
              ['Lag typical',            'Milidetik',                          'Milidetik – detik'],
              ['Setup complexity',       'Mudah',                              'Lebih kompleks'],
              ['HA / Failover',          'Ya, langsung promote',               'Tidak langsung (perlu setup tambahan)'],
              ['PITR',                   'Ya (dengan WAL archive)',             'Tidak'],
              ['Use case utama',         'HA, disaster recovery, read scaling', 'Migrasi versi, distribusi data, microservices'],
            ].map((row, i) => (
              <tr key={i}>
                <td style={{ padding: '8px 12px', color: '#a0c8ff', fontSize: '15px', borderBottom: '1px solid rgba(255,255,255,0.05)', fontWeight: '500' }}>{row[0]}</td>
                <td style={{ padding: '8px 12px', color: '#64c8ff', fontSize: '15px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>{row[1]}</td>
                <td style={{ padding: '8px 12px', color: '#4ade80', fontSize: '15px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>{row[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Block>

    <Block title="Ekosistem HA Berbasis Replikasi PostgreSQL" color="#a78bfa">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
        {[
          {
            name: 'Patroni',
            color: '#64c8ff',
            desc: 'HA solution berbasis streaming replication + distributed consensus (etcd/Consul/ZooKeeper). Auto failover, auto leader election. Standar industri untuk PostgreSQL HA.',
            tags: ['HA', 'Auto Failover', 'etcd'],
          },
          {
            name: 'Repmgr',
            color: '#4ade80',
            desc: 'Replication Manager dari EDB. Setup dan monitoring streaming replication, failover semi-otomatis, switchover. Lebih sederhana dari Patroni.',
            tags: ['Streaming', 'Monitoring', 'Failover'],
          },
          {
            name: 'pgPool-II',
            color: '#fbbf24',
            desc: 'Middleware yang bisa load balance read/write antara primary dan replica, connection pooling, dan watchdog untuk HA.',
            tags: ['Load Balance', 'Pooling', 'HA'],
          },
          {
            name: 'BDR (Bi-Directional)',
            color: '#f87171',
            desc: 'Logical replication multi-master dari EDB. Semua node bisa write. Conflict resolution. Cocok untuk multi-datacenter active-active.',
            tags: ['Multi-master', 'Active-Active', 'EDB'],
          },
          {
            name: 'Citus',
            color: '#a78bfa',
            desc: 'Distributed PostgreSQL. Sharding horizontal + replikasi per shard. Untuk skala OLTP/OLAP yang melampaui satu server.',
            tags: ['Sharding', 'Distributed', 'Scale-out'],
          },
          {
            name: 'pg_auto_failover',
            color: '#e879f9',
            desc: 'Extension Microsoft untuk auto failover sederhana. 1 monitor node, N data nodes. Lebih ringan dari Patroni.',
            tags: ['Auto Failover', 'Microsoft', 'Simple'],
          },
        ].map((tool, i) => (
          <div key={i} style={{ background: `${tool.color}0d`, border: `1px solid ${tool.color}30`, borderRadius: '8px', padding: '14px' }}>
            <p style={{ color: tool.color, fontWeight: 'bold', fontSize: '17px', marginBottom: '6px' }}>{tool.name}</p>
            <p style={{ color: '#a0c8ff', fontSize: '14px', lineHeight: '1.7', marginBottom: '8px' }}>{tool.desc}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {tool.tags.map((t, j) => <Badge key={j} color={tool.color}>{t}</Badge>)}
            </div>
          </div>
        ))}
      </div>
    </Block>

    <Block title="Decision Tree — Pilih Solusi Replikasi" color="#38bdf8">
      <Code color="#a0c8ff">
{`Pertanyaan 1: Apakah kamu butuh High Availability (auto failover)?
├── Ya →  Pertanyaan 2: Berapa banyak node?
│         ├── 2 node (1 primary + 1 standby sederhana)
│         │   → Streaming Replication + repmgr atau pg_auto_failover
│         └── 3+ node dengan auto leader election
│             → Streaming Replication + Patroni (standar production)
│
└── Tidak → Pertanyaan 3: Apa tujuan replikasi?
            ├── Read scaling (distribusi query SELECT)
            │   → Streaming Replication (async) + pgPool-II atau HAProxy
            │
            ├── Migrasi ke versi PostgreSQL baru
            │   → Logical Replication (Publisher lama, Subscriber baru)
            │
            ├── Distribusi data ke sistem lain / microservices
            │   → Logical Replication (subset tabel, bisa beda versi)
            │
            ├── Multi-datacenter active-active (semua node bisa write)
            │   → BDR / Citus (butuh lisensi atau setup kompleks)
            │
            └── Disaster recovery ke datacenter lain
                → Streaming Replication (async) + WAL archiving + PITR`}
      </Code>
    </Block>

    <Block title="Checklist Replikasi Production" color="#4ade80">
      {[
        { ok: true,  text: 'wal_level = replica (atau logical jika logical replication)' },
        { ok: true,  text: 'max_wal_senders cukup (minimal = jumlah standby + 2 buffer)' },
        { ok: true,  text: 'Replication user dengan password kuat dan hanya hak REPLICATION' },
        { ok: true,  text: 'pg_hba.conf hanya izinkan IP standby yang dikenal' },
        { ok: true,  text: 'hot_standby = on agar replica bisa serve SELECT' },
        { ok: true,  text: 'hot_standby_feedback = on untuk cegah cancel query di standby' },
        { ok: true,  text: 'Monitoring lag aktif — alert jika > 30 detik' },
        { ok: true,  text: 'Monitoring inactive replication slot — alert jika retained WAL > 5GB' },
        { ok: false, text: 'max_slot_wal_keep_size dikonfigurasi untuk cegah disk penuh' },
        { ok: false, text: 'wal_log_hints = on (atau data checksums) untuk enable pg_rewind' },
        { ok: false, text: 'Failover drill dilakukan — pastikan promote bisa dilakukan < 1 menit' },
        { ok: false, text: 'Runbook failover terdokumentasi dan mudah diakses saat darurat' },
        { ok: false, text: 'Uji pg_rewind setelah setiap planned failover' },
        { ok: false, text: 'Connection string aplikasi menggunakan multi-host atau load balancer' },
      ].map((item, i) => (
        <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '8px' }}>
          <span style={{ color: item.ok ? '#4ade80' : '#fbbf24', fontSize: '18px', flexShrink: 0, marginTop: '1px' }}>{item.ok ? '✅' : '⬜'}</span>
          <p style={{ color: '#a0c8ff', fontSize: '15px', lineHeight: '1.7', margin: 0 }}>{item.text}</p>
        </div>
      ))}
    </Block>
  </div>
)

// ─── CONTENT MAP ───────────────────────────────────────────────────────────────

const contentMap = {
  overview:   <Overview />,
  streaming:  <Streaming />,
  logical:    <Logical />,
  slots:      <Slots />,
  monitoring: <Monitoring />,
  failover:   <Failover />,
  compare:    <Compare />,
}

// ─── MODULE ROOT ───────────────────────────────────────────────────────────────

const ReplicationModule = () => {
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
            Replikasi PostgreSQL 📡
          </h1>
          <p style={{ color: '#a0c8ff', fontSize: '20px' }}>
            Streaming Replication, Logical Replication, Replication Slots, Failover & Promote — panduan lengkap replikasi untuk production
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
          📡 Replikasi PostgreSQL — Streaming · Logical · Replication Slots · Failover · pg_rewind · Patroni
        </p>
        <p style={{ color: '#708090', fontSize: '18px' }}>
          💡 Tip: Uji failover drill secara berkala — jangan tunggu disaster nyata untuk tahu apakah promote berjalan dalam 60 detik!
        </p>
      </footer>
    </div>
  )
}

export default ReplicationModule
