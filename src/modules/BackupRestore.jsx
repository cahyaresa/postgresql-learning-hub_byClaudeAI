import React, { useState } from 'react'

const tabs = [
  { id: 'overview',   label: '📖 Overview',        desc: 'Jenis backup & kapan dipakai' },
  { id: 'cold',       label: '🧊 Cold Backup',      desc: 'Backup saat server mati' },
  { id: 'warm',       label: '🌤️ Warm Backup',      desc: 'Backup dengan server read-only' },
  { id: 'hot',        label: '🔥 Hot Backup',       desc: 'Backup saat server berjalan penuh (pg_basebackup, PITR)' },
  { id: 'pitr',       label: '⏱️ PITR',             desc: 'Point-in-Time Recovery — restore ke detik tertentu' },
  { id: 'pgdump',     label: '🗂️ pg_dump',          desc: 'Logical backup per database / tabel' },
  { id: 'restore',    label: '♻️ Restore',           desc: 'Restore dari pg_dump, pg_basebackup, PITR' },
  { id: 'strategy',   label: '✅ Strategy',          desc: 'Strategi backup production & checklist' },
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

const CompareRow = ({ label, cold, warm, hot }) => (
  <tr>
    <td style={{ padding: '8px 12px', color: '#a0c8ff', fontSize: '15px', borderBottom: '1px solid rgba(255,255,255,0.05)', fontWeight: '500' }}>{label}</td>
    <td style={{ padding: '8px 12px', color: '#38bdf8', fontSize: '15px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>{cold}</td>
    <td style={{ padding: '8px 12px', color: '#fbbf24', fontSize: '15px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>{warm}</td>
    <td style={{ padding: '8px 12px', color: '#f87171', fontSize: '15px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>{hot}</td>
  </tr>
)

// ─── TAB CONTENTS ──────────────────────────────────────────────────────────────

const Overview = () => (
  <div>
    <h3 style={{ color: '#64c8ff', fontWeight: 'bold', fontSize: '20px', marginBottom: '4px' }}>
      Backup & Restore PostgreSQL
    </h3>
    <p style={{ color: '#708090', fontSize: '16px', marginBottom: '20px' }}>
      Backup adalah satu-satunya perlindungan nyata terhadap data loss. PostgreSQL menyediakan berbagai strategi backup — pilih yang sesuai dengan kebutuhan RTO dan RPO sistem kamu.
    </p>

    {/* RTO / RPO */}
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
      <div style={{ background: 'rgba(100,200,255,0.07)', border: '1px solid rgba(100,200,255,0.25)', borderRadius: '10px', padding: '16px' }}>
        <p style={{ color: '#64c8ff', fontWeight: 'bold', fontSize: '17px', marginBottom: '8px' }}>RTO — Recovery Time Objective</p>
        <p style={{ color: '#a0c8ff', fontSize: '15px', lineHeight: '1.8', margin: 0 }}>
          Berapa lama maksimal waktu yang diperbolehkan untuk sistem kembali online setelah disaster.
          <br /><br />
          <strong style={{ color: '#64c8ff' }}>Contoh:</strong> RTO = 1 jam artinya sistem harus bisa kembali berjalan dalam 1 jam setelah insiden.
        </p>
      </div>
      <div style={{ background: 'rgba(248,113,113,0.07)', border: '1px solid rgba(248,113,113,0.25)', borderRadius: '10px', padding: '16px' }}>
        <p style={{ color: '#f87171', fontWeight: 'bold', fontSize: '17px', marginBottom: '8px' }}>RPO — Recovery Point Objective</p>
        <p style={{ color: '#a0c8ff', fontSize: '15px', lineHeight: '1.8', margin: 0 }}>
          Berapa banyak data yang boleh hilang — diukur dalam satuan waktu sejak backup terakhir.
          <br /><br />
          <strong style={{ color: '#f87171' }}>Contoh:</strong> RPO = 1 jam artinya kamu boleh kehilangan maksimal data 1 jam terakhir.
        </p>
      </div>
    </div>

    {/* Tiga Jenis Backup */}
    <Block title="Tiga Jenis Backup PostgreSQL" color="#a78bfa">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
        {[
          {
            type: 'Cold Backup',
            icon: '🧊',
            color: '#38bdf8',
            server: 'Server MATI',
            method: 'Copy file $PGDATA',
            rto: 'Tinggi (restore = copy balik)',
            rpo: 'Sejak backup terakhir',
            pros: ['Paling sederhana', 'Konsisten 100%', 'Tidak butuh tool khusus'],
            cons: ['Downtime diperlukan', 'Tidak cocok production 24/7'],
          },
          {
            type: 'Warm Backup',
            icon: '🌤️',
            color: '#fbbf24',
            server: 'Server BERJALAN (read-only)',
            method: 'pg_basebackup atau rsync + WAL',
            rto: 'Menengah',
            rpo: 'Sejak backup terakhir + WAL',
            pros: ['Tidak perlu full downtime', 'Data konsisten via WAL', 'Cocok untuk replica'],
            cons: ['Write harus distop sementara', 'Setup lebih rumit dari cold'],
          },
          {
            type: 'Hot Backup',
            icon: '🔥',
            color: '#f87171',
            server: 'Server BERJALAN PENUH',
            method: 'pg_basebackup + WAL archiving (PITR)',
            rto: 'Rendah (restore ke titik tertentu)',
            rpo: 'Mendekati nol (tergantung WAL archive lag)',
            pros: ['Zero downtime', 'Point-in-Time Recovery (PITR)', 'Standar production'],
            cons: ['Butuh WAL archiving', 'Storage lebih besar', 'Setup lebih kompleks'],
          },
        ].map((b, i) => (
          <div key={i} style={{ background: `${b.color}0d`, border: `1px solid ${b.color}35`, borderRadius: '8px', padding: '14px' }}>
            <div style={{ fontSize: '24px', marginBottom: '6px' }}>{b.icon}</div>
            <p style={{ color: b.color, fontWeight: 'bold', fontSize: '17px', marginBottom: '8px' }}>{b.type}</p>
            <p style={{ color: '#708090', fontSize: '14px', marginBottom: '2px' }}>Status server</p>
            <p style={{ color: '#a0c8ff', fontSize: '15px', marginBottom: '8px' }}>{b.server}</p>
            <p style={{ color: '#708090', fontSize: '14px', marginBottom: '2px' }}>Method</p>
            <p style={{ color: '#a0c8ff', fontSize: '15px', marginBottom: '8px' }}>{b.method}</p>
            <p style={{ color: '#708090', fontSize: '14px', marginBottom: '2px' }}>RTO</p>
            <p style={{ color: '#a0c8ff', fontSize: '15px', marginBottom: '8px' }}>{b.rto}</p>
            <p style={{ color: '#708090', fontSize: '14px', marginBottom: '4px' }}>Kelebihan</p>
            {b.pros.map((p, j) => <p key={j} style={{ color: '#4ade80', fontSize: '14px', margin: '0 0 2px 0' }}>✓ {p}</p>)}
            <div style={{ marginTop: '8px' }} />
            <p style={{ color: '#708090', fontSize: '14px', marginBottom: '4px' }}>Kekurangan</p>
            {b.cons.map((c, j) => <p key={j} style={{ color: '#f87171', fontSize: '14px', margin: '0 0 2px 0' }}>✗ {c}</p>)}
          </div>
        ))}
      </div>
    </Block>

    {/* Comparison Table */}
    <Block title="Perbandingan Lengkap" color="#4ade80">
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'rgba(0,0,0,0.2)' }}>
              <th style={{ padding: '10px 12px', color: '#64c8ff', fontSize: '15px', textAlign: 'left' }}>Aspek</th>
              <th style={{ padding: '10px 12px', color: '#38bdf8', fontSize: '15px', textAlign: 'left' }}>🧊 Cold</th>
              <th style={{ padding: '10px 12px', color: '#fbbf24', fontSize: '15px', textAlign: 'left' }}>🌤️ Warm</th>
              <th style={{ padding: '10px 12px', color: '#f87171', fontSize: '15px', textAlign: 'left' }}>🔥 Hot</th>
            </tr>
          </thead>
          <tbody>
            <CompareRow label="Downtime diperlukan?"   cold="Ya, server harus mati"     warm="Sebagian (write stop)"     hot="Tidak sama sekali" />
            <CompareRow label="Konsistensi data"       cold="Sempurna"                  warm="Konsisten via WAL"         hot="Konsisten via WAL" />
            <CompareRow label="Kompleksitas setup"     cold="Sangat rendah"             warm="Menengah"                  hot="Tinggi" />
            <CompareRow label="RPO"                    cold="Sejak backup terakhir"     warm="Menit (+ WAL lag)"         hot="Detik–menit (PITR)" />
            <CompareRow label="RTO"                    cold="Lama (copy file besar)"    warm="Menengah"                  hot="Rendah (target point)" />
            <CompareRow label="Kebutuhan storage"      cold="= ukuran PGDATA"           warm="= PGDATA + WAL"            hot="= PGDATA + semua WAL archive" />
            <CompareRow label="Cocok untuk"            cold="Dev / staging"             warm="Replica, low-traffic"      hot="Production 24/7" />
            <CompareRow label="Tools"                  cold="cp, rsync, tar"            warm="pg_basebackup, rsync"      hot="pg_basebackup + WAL archive" />
            <CompareRow label="PITR support"           cold="Tidak"                     warm="Terbatas"                  hot="Ya (ke detik tertentu)" />
          </tbody>
        </table>
      </div>
    </Block>

    {/* Logical vs Physical */}
    <Block title="Logical Backup vs Physical Backup" color="#e879f9">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div style={{ background: 'rgba(232,121,249,0.06)', border: '1px solid rgba(232,121,249,0.25)', borderRadius: '8px', padding: '14px' }}>
          <p style={{ color: '#e879f9', fontWeight: 'bold', fontSize: '16px', marginBottom: '8px' }}>Logical Backup</p>
          <p style={{ color: '#a0c8ff', fontSize: '15px', lineHeight: '1.7', marginBottom: '8px' }}>Backup isi data dalam format SQL / binary portable. Bisa restore ke versi PostgreSQL berbeda atau OS berbeda.</p>
          <p style={{ color: '#4ade80', fontSize: '14px' }}>✓ Portable antar versi & OS</p>
          <p style={{ color: '#4ade80', fontSize: '14px' }}>✓ Bisa backup 1 tabel / schema saja</p>
          <p style={{ color: '#4ade80', fontSize: '14px' }}>✓ Output bisa diinspeksi / diedit</p>
          <p style={{ color: '#f87171', fontSize: '14px' }}>✗ Lebih lambat untuk DB besar</p>
          <p style={{ color: '#f87171', fontSize: '14px' }}>✗ Tidak support PITR</p>
          <p style={{ color: '#708090', fontSize: '14px', marginTop: '8px' }}>Tools: <strong style={{ color: '#e879f9' }}>pg_dump, pg_dumpall</strong></p>
        </div>
        <div style={{ background: 'rgba(248,113,113,0.06)', border: '1px solid rgba(248,113,113,0.25)', borderRadius: '8px', padding: '14px' }}>
          <p style={{ color: '#f87171', fontWeight: 'bold', fontSize: '16px', marginBottom: '8px' }}>Physical Backup</p>
          <p style={{ color: '#a0c8ff', fontSize: '15px', lineHeight: '1.7', marginBottom: '8px' }}>Backup file fisik PostgreSQL ($PGDATA) secara byte-for-byte. Restore harus ke versi PostgreSQL & arsitektur yang sama.</p>
          <p style={{ color: '#4ade80', fontSize: '14px' }}>✓ Jauh lebih cepat untuk DB besar</p>
          <p style={{ color: '#4ade80', fontSize: '14px' }}>✓ Support PITR (dengan WAL archive)</p>
          <p style={{ color: '#4ade80', fontSize: '14px' }}>✓ Bisa langsung jadi streaming replica</p>
          <p style={{ color: '#f87171', fontSize: '14px' }}>✗ Harus versi & arsitektur sama</p>
          <p style={{ color: '#f87171', fontSize: '14px' }}>✗ Tidak bisa restore sebagian tabel</p>
          <p style={{ color: '#708090', fontSize: '14px', marginTop: '8px' }}>Tools: <strong style={{ color: '#f87171' }}>pg_basebackup, rsync, cp</strong></p>
        </div>
      </div>
    </Block>
  </div>
)

const ColdBackup = () => (
  <div>
    <h3 style={{ color: '#38bdf8', fontWeight: 'bold', fontSize: '20px', marginBottom: '4px' }}>🧊 Cold Backup — Backup Saat Server Mati</h3>
    <p style={{ color: '#708090', fontSize: '16px', marginBottom: '16px' }}>
      Cold backup adalah cara paling sederhana: matikan PostgreSQL, copy seluruh direktori <code style={{ color: '#86efac', fontFamily: 'monospace' }}>$PGDATA</code>, lalu nyalakan lagi. Konsistensi data dijamin 100% karena tidak ada perubahan saat backup berlangsung.
    </p>

    <Block title="Alur Cold Backup" color="#38bdf8">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
        {[
          { step: '1', label: 'Jadwalkan maintenance window', desc: 'Informasikan ke user bahwa server akan down. Cold backup memerlukan downtime nyata.' },
          { step: '2', label: 'Matikan PostgreSQL dengan bersih', desc: 'Gunakan pg_ctl stop -m fast atau systemctl stop postgresql — pastikan semua transaksi selesai.' },
          { step: '3', label: 'Verifikasi server benar-benar berhenti', desc: 'Cek tidak ada proses postgres yang masih berjalan sebelum copy.' },
          { step: '4', label: 'Copy seluruh direktori $PGDATA', desc: 'Salin semua file termasuk pg_wal, pg_xact, global, base, postgresql.conf, pg_hba.conf.' },
          { step: '5', label: 'Verifikasi hasil backup', desc: 'Cek ukuran backup = ukuran PGDATA, tidak ada error selama copy.' },
          { step: '6', label: 'Nyalakan kembali PostgreSQL', desc: 'Start server dan verifikasi database berfungsi normal.' },
        ].map((s, i) => (
          <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <div style={{ background: '#38bdf8', color: '#0f1419', fontWeight: 'bold', fontSize: '15px', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>{s.step}</div>
            <div>
              <p style={{ color: '#38bdf8', fontWeight: 'bold', fontSize: '15px', margin: '0 0 2px 0' }}>{s.label}</p>
              <p style={{ color: '#708090', fontSize: '14px', margin: 0 }}>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </Block>

    <Block title="Eksekusi Cold Backup" color="#4ade80">
      <Code>
{`# ── 1. Matikan PostgreSQL ────────────────────────────────────
sudo systemctl stop postgresql
# atau dengan pg_ctl:
pg_ctl stop -D /var/lib/postgresql/16/main -m fast

# Verifikasi sudah benar-benar berhenti
pg_ctl status -D /var/lib/postgresql/16/main
# Output: pg_ctl: no server running

# ── 2. Cek lokasi PGDATA ─────────────────────────────────────
# Biasanya di salah satu:
# /var/lib/postgresql/16/main     (Debian/Ubuntu)
# /var/lib/pgsql/16/data          (RHEL/CentOS)
# /usr/local/pgsql/data           (compile from source)

echo $PGDATA    # jika env variable sudah di-set

# ── 3. Backup dengan tar (compressed) ────────────────────────
BACKUP_DIR="/backup/postgresql"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
PGDATA="/var/lib/postgresql/16/main"

mkdir -p $BACKUP_DIR

tar -czf $BACKUP_DIR/pgdata_cold_$TIMESTAMP.tar.gz \
  --exclude='$PGDATA/postmaster.pid' \
  -C $(dirname $PGDATA) $(basename $PGDATA)

# ── 4. Atau copy dengan rsync (lebih cepat untuk incremental) ─
rsync -av --delete \
  --exclude='postmaster.pid' \
  /var/lib/postgresql/16/main/ \
  $BACKUP_DIR/pgdata_cold_$TIMESTAMP/

# ── 5. Verifikasi backup ─────────────────────────────────────
# Cek ukuran
du -sh $BACKUP_DIR/pgdata_cold_$TIMESTAMP.tar.gz

# Verifikasi isi tar (list tanpa extract)
tar -tzf $BACKUP_DIR/pgdata_cold_$TIMESTAMP.tar.gz | head -20

# Cek integrity (tidak corrupt)
tar -tzf $BACKUP_DIR/pgdata_cold_$TIMESTAMP.tar.gz > /dev/null && echo "OK"

# ── 6. Nyalakan kembali ──────────────────────────────────────
sudo systemctl start postgresql
psql -c "SELECT version();"   # verify bisa connect`}
      </Code>
      <Note>Jangan copy file saat PostgreSQL masih berjalan tanpa pg_start_backup() — hasilnya adalah backup yang tidak konsisten dan tidak bisa digunakan untuk restore.</Note>
    </Block>

    <Block title="Restore dari Cold Backup" color="#f87171">
      <Code>
{`# ── Restore dari cold backup (tar) ──────────────────────────

# 1. Matikan PostgreSQL di target server
sudo systemctl stop postgresql

# 2. Backup direktori data lama (jaga-jaga)
sudo mv /var/lib/postgresql/16/main /var/lib/postgresql/16/main.old

# 3. Extract backup
sudo mkdir -p /var/lib/postgresql/16/main
sudo tar -xzf /backup/postgresql/pgdata_cold_20260101_020000.tar.gz \
  -C /var/lib/postgresql/16/

# 4. Perbaiki ownership (penting!)
sudo chown -R postgres:postgres /var/lib/postgresql/16/main
sudo chmod 700 /var/lib/postgresql/16/main

# 5. Hapus postmaster.pid jika ada (sisa dari server lama)
sudo rm -f /var/lib/postgresql/16/main/postmaster.pid

# 6. Nyalakan PostgreSQL
sudo systemctl start postgresql

# 7. Verifikasi
psql -U postgres -c "SELECT count(*) FROM pg_database;"
psql -U postgres -c "SELECT pg_postmaster_start_time();"

# ── Restore dari rsync backup ────────────────────────────────
sudo systemctl stop postgresql
sudo rsync -av --delete \
  /backup/postgresql/pgdata_cold_20260101_020000/ \
  /var/lib/postgresql/16/main/
sudo chown -R postgres:postgres /var/lib/postgresql/16/main
sudo rm -f /var/lib/postgresql/16/main/postmaster.pid
sudo systemctl start postgresql`}
      </Code>
    </Block>

    <Block title="Automasi Cold Backup dengan Cron" color="#a78bfa">
      <Code>
{`#!/bin/bash
# /usr/local/bin/cold_backup.sh
# Jalankan saat maintenance window (misalnya Minggu dini hari)

set -euo pipefail

PGDATA="/var/lib/postgresql/16/main"
BACKUP_BASE="/backup/postgresql/cold"
RETENTION_DAYS=7
LOG="/var/log/pg_cold_backup.log"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_PATH="$BACKUP_BASE/$TIMESTAMP"

log() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a $LOG; }

log "=== Cold Backup Dimulai ==="

# Stop PostgreSQL
log "Menghentikan PostgreSQL..."
systemctl stop postgresql
sleep 3

if pg_ctl status -D $PGDATA | grep -q "running"; then
  log "ERROR: PostgreSQL masih berjalan!"
  exit 1
fi

# Backup
log "Memulai backup ke $BACKUP_PATH ..."
mkdir -p $BACKUP_PATH
rsync -a --exclude='postmaster.pid' $PGDATA/ $BACKUP_PATH/
log "Backup selesai. Ukuran: $(du -sh $BACKUP_PATH | cut -f1)"

# Start kembali
log "Menjalankan kembali PostgreSQL..."
systemctl start postgresql
sleep 5
psql -U postgres -c "SELECT 1" > /dev/null && log "PostgreSQL berjalan normal." || log "ERROR: PostgreSQL gagal start!"

# Hapus backup lama
log "Membersihkan backup lebih dari $RETENTION_DAYS hari..."
find $BACKUP_BASE -maxdepth 1 -type d -mtime +$RETENTION_DAYS -exec rm -rf {} +

log "=== Cold Backup Selesai ==="

# Crontab: jalankan tiap Minggu jam 02:00
# 0 2 * * 0 /usr/local/bin/cold_backup.sh`}
      </Code>
    </Block>
  </div>
)

const WarmBackup = () => (
  <div>
    <h3 style={{ color: '#fbbf24', fontWeight: 'bold', fontSize: '20px', marginBottom: '4px' }}>🌤️ Warm Backup — Backup dengan Server Berjalan Read-Only</h3>
    <p style={{ color: '#708090', fontSize: '16px', marginBottom: '16px' }}>
      Warm backup adalah titik tengah antara cold dan hot. Server tetap berjalan, tapi operasi write dihentikan sementara — bisa menggunakan mode standby, atau dengan memanfaatkan replica untuk backup tanpa menyentuh primary sama sekali.
    </p>

    <Block title="Strategi Warm Backup" color="#fbbf24">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '0' }}>
        {[
          {
            title: 'Backup dari Standby / Replica',
            color: '#fbbf24',
            desc: 'Backup diambil dari streaming replica — primary tidak terganggu sama sekali. Ini adalah pendekatan warm backup yang paling umum di production.',
            steps: ['Setup streaming replication ke standby', 'Jalankan pg_basebackup di standby', 'Primary terus menerima write tanpa gangguan', 'Standby WAL catch up setelah backup selesai'],
          },
          {
            title: 'Exclusive Backup Mode (pg 14 ke bawah)',
            color: '#f97316',
            desc: 'pg_start_backup() menandai titik backup di WAL, server tetap menerima read, write diteruskan. File di-copy saat server berjalan. Deprecated sejak PG 15.',
            steps: ['SELECT pg_start_backup(\'label\', false)', 'Salin file PGDATA (rsync / cp)', 'SELECT pg_stop_backup()', 'Simpan WAL dari start sampai stop LSN'],
          },
        ].map((s, i) => (
          <div key={i} style={{ background: `${s.color}0d`, border: `1px solid ${s.color}30`, borderRadius: '8px', padding: '14px' }}>
            <p style={{ color: s.color, fontWeight: 'bold', fontSize: '16px', marginBottom: '8px' }}>{s.title}</p>
            <p style={{ color: '#a0c8ff', fontSize: '15px', lineHeight: '1.7', marginBottom: '8px' }}>{s.desc}</p>
            {s.steps.map((step, j) => (
              <p key={j} style={{ color: '#708090', fontSize: '14px', margin: '0 0 3px 0' }}>→ {step}</p>
            ))}
          </div>
        ))}
      </div>
    </Block>

    <Block title="Warm Backup dari Streaming Replica (Direkomendasikan)" color="#4ade80">
      <Code>
{`# ── Setup di Primary: aktifkan replication ───────────────────
# postgresql.conf:
wal_level = replica
max_wal_senders = 5
wal_keep_size = 1GB

# pg_hba.conf: izinkan koneksi replication
# host replication replicator 10.0.0.2/32 scram-sha-256

CREATE ROLE replicator LOGIN REPLICATION PASSWORD 'repl_pass';

# ── Setup di Standby: buat replica ───────────────────────────
# Di server standby:
pg_basebackup \
  -h primary_host \
  -U replicator \
  -D /var/lib/postgresql/16/main \
  -Fp -Xs -P -R
# -Fp : format plain (directory)
# -Xs : streaming WAL selama backup
# -P  : tampilkan progress
# -R  : buat standby.signal + recovery config otomatis

# Nyalakan standby
sudo systemctl start postgresql   # standby mode otomatis karena ada standby.signal

# Verifikasi replikasi berjalan (di primary):
SELECT client_addr, state, sent_lsn, write_lsn, flush_lsn, replay_lsn
FROM pg_stat_replication;

# ── Ambil backup dari standby (tanpa ganggu primary) ─────────
# Di server backup (atau di standby itu sendiri):
pg_basebackup \
  -h standby_host \
  -U replicator \
  -D /backup/postgresql/warm_$(date +%Y%m%d) \
  -Fp -Xs -P \
  --checkpoint=fast \
  --wal-method=stream

# Kompresi langsung saat backup
pg_basebackup \
  -h standby_host \
  -U replicator \
  -D /backup/postgresql/warm_$(date +%Y%m%d) \
  -Ft -z -P \
  --checkpoint=fast
# -Ft : format tar
# -z  : compress (gzip)`}
      </Code>
    </Block>

    <Block title="Non-Exclusive Backup Mode (PostgreSQL 9.6–14)" color="#f97316">
      <Code>
{`-- ── Di primary: tandai awal backup ─────────────────────────
-- Jalankan di session psql yang SAMA selama backup berlangsung
SELECT pg_start_backup('warm_backup_20260101', false, false);
-- Parameter: label, fast (checkpoint), exclusive (false = non-exclusive)

-- ── Di terminal lain: salin PGDATA saat server berjalan ──────
# rsync akan copy file yang mungkin sedang diubah, tapi itu OK
# karena PostgreSQL akan handle konsistensi via WAL
rsync -avz --exclude='postmaster.pid' \
  --exclude='pg_wal/*' \
  /var/lib/postgresql/16/main/ \
  /backup/postgresql/warm_$(date +%Y%m%d)/

# Salin pg_wal terpisah (WAL yang dibutuhkan untuk konsistensi)
rsync -avz /var/lib/postgresql/16/main/pg_wal/ \
  /backup/postgresql/warm_$(date +%Y%m%d)/pg_wal/

-- ── Kembali ke session psql tadi: tandai akhir backup ────────
SELECT * FROM pg_stop_backup(false);
-- Return: lsn, labelfile, spcmapfile
-- Simpan output ini! Informasi WAL yang dibutuhkan untuk restore

-- ── Penting: simpan backup_label ─────────────────────────────
-- pg_stop_backup menghasilkan file backup_label yang WAJIB ada saat restore
-- Tanpa backup_label, restore tidak bisa menentukan titik awal WAL replay`}
      </Code>
      <Note>Non-exclusive backup mode lebih aman dari exclusive karena tidak menyimpan state di server. Jika koneksi terputus, backup tidak meninggalkan server dalam state aneh.</Note>
    </Block>

    <Block title="Verifikasi Konsistensi Warm Backup" color="#a78bfa">
      <Code>
{`# Setelah backup selesai, verifikasi dengan mencoba restore di server test

# 1. Extract backup
rsync -av /backup/postgresql/warm_20260101/ /tmp/pg_restore_test/

# 2. Pastikan backup_label ada
ls -la /tmp/pg_restore_test/backup_label

# 3. Coba start PostgreSQL dari backup (di server test!)
pg_ctl start -D /tmp/pg_restore_test -l /tmp/pg_restore_test.log

# 4. Cek log — harus ada "database system is ready to accept connections"
tail -20 /tmp/pg_restore_test.log

# 5. Connect dan verifikasi data
psql -h localhost -p 5432 -U postgres -c "SELECT count(*) FROM pg_database;"

# 6. Matikan server test
pg_ctl stop -D /tmp/pg_restore_test

# Jadwal: lakukan restore test setidaknya sebulan sekali!
# Backup yang tidak pernah dicoba restore adalah backup yang tidak berguna.`}
      </Code>
    </Block>
  </div>
)

const HotBackup = () => (
  <div>
    <h3 style={{ color: '#f87171', fontWeight: 'bold', fontSize: '20px', marginBottom: '4px' }}>🔥 Hot Backup — Backup Tanpa Downtime + Point-in-Time Recovery</h3>
    <p style={{ color: '#708090', fontSize: '16px', marginBottom: '16px' }}>
      Hot backup adalah standar emas untuk production. Server berjalan penuh tanpa gangguan, backup diambil via <code style={{ color: '#86efac', fontFamily: 'monospace' }}>pg_basebackup</code> + WAL archiving, dan bisa restore ke titik waktu mana pun (PITR).
    </p>

    <Block title="Cara Kerja Hot Backup + WAL Archiving" color="#f87171">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
        {[
          { step: '1', color: '#64c8ff',  label: 'Aktifkan WAL Archiving', desc: 'Setiap WAL segment (16MB) yang selesai ditulis, di-copy ke archive location (local, NFS, S3, dll.)' },
          { step: '2', color: '#4ade80',  label: 'Jalankan pg_basebackup', desc: 'Ambil snapshot fisik database. pg_basebackup mencatat start LSN dan stream WAL selama backup.' },
          { step: '3', color: '#fbbf24',  label: 'WAL terus di-archive', desc: 'Selama pg_basebackup berjalan, semua perubahan masuk ke WAL dan di-archive. Tidak ada data yang hilang.' },
          { step: '4', color: '#f87171',  label: 'Base backup selesai', desc: 'pg_basebackup selesai, catat end LSN. Gabungan base backup + WAL archive = backup lengkap.' },
          { step: '5', color: '#a78bfa',  label: 'Saat Restore (PITR)', desc: 'Restore base backup, lalu replay WAL archive dari start LSN sampai titik waktu yang diinginkan.' },
        ].map((s, i) => (
          <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <div style={{ background: s.color, color: '#0f1419', fontWeight: 'bold', fontSize: '15px', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>{s.step}</div>
            <div>
              <p style={{ color: s.color, fontWeight: 'bold', fontSize: '15px', margin: '0 0 2px 0' }}>{s.label}</p>
              <p style={{ color: '#708090', fontSize: '14px', margin: 0 }}>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </Block>

    <Block title="Konfigurasi WAL Archiving" color="#64c8ff">
      <Code>
{`# ── postgresql.conf ──────────────────────────────────────────
wal_level = replica           # minimal 'replica' untuk archiving
archive_mode = on             # aktifkan WAL archiving
archive_command = 'test ! -f /wal_archive/%f && cp %p /wal_archive/%f'
# %p = path file WAL lengkap
# %f = nama file WAL saja
# test ! -f = jangan overwrite jika sudah ada (safety)

# Untuk copy ke remote via rsync:
archive_command = 'rsync -a %p backup-server:/wal_archive/%f'

# Untuk upload ke S3 (pakai pgBackRest atau WAL-G):
archive_command = 'wal-g wal-push %p'

# Timeout jika archive_command tidak selesai (PostgreSQL 16+)
archive_timeout = 60    # paksa switch WAL setiap 60 detik meski belum penuh
                        # berguna agar RPO tidak terlalu besar di saat low activity

# ── Buat direktori archive ───────────────────────────────────
sudo mkdir -p /wal_archive
sudo chown postgres:postgres /wal_archive
sudo chmod 700 /wal_archive

# ── Reload config tanpa restart ─────────────────────────────
SELECT pg_reload_conf();

# ── Verifikasi archiving berjalan ───────────────────────────
SELECT archived_count, failed_count, last_archived_wal, last_archived_time
FROM pg_stat_archiver;

-- Paksakan switch WAL untuk test archive:
SELECT pg_switch_wal();

-- Setelah beberapa detik, cek:
SELECT last_archived_wal, last_archived_time, failed_count FROM pg_stat_archiver;
-- failed_count harus 0!`}
      </Code>
    </Block>

    <Block title="pg_basebackup — Hot Physical Backup" color="#4ade80">
      <Code>
{`# ── Backup sederhana ke direktori ───────────────────────────
pg_basebackup \
  -h localhost \
  -U replicator \
  -D /backup/postgresql/base_$(date +%Y%m%d_%H%M%S) \
  -Fp \
  --checkpoint=fast \
  --wal-method=stream \
  -P \
  -v

# Penjelasan flag:
# -Fp              : format plain (direktori biasa, bisa langsung dipakai)
# --checkpoint=fast: paksa checkpoint segera (tidak tunggu jadwal normal)
# --wal-method=stream : stream WAL selama backup (tidak perlu rely pada archive)
#                       Alternatif: fetch (ambil WAL dari archive setelah selesai)
# -P               : tampilkan progress bar
# -v               : verbose

# ── Backup dalam format tar + compressed ─────────────────────
pg_basebackup \
  -h localhost \
  -U replicator \
  -D /backup/postgresql/base_$(date +%Y%m%d) \
  -Ft -z \
  --checkpoint=fast \
  --wal-method=stream \
  -P

# Output:
# base.tar.gz  (data utama)
# pg_wal.tar.gz (WAL yang di-stream selama backup)

# ── Estimasi ukuran backup sebelum jalan ────────────────────
psql -c "SELECT pg_size_pretty(sum(pg_database_size(datname))) FROM pg_database;"

# ── Backup dengan rate limit (agar tidak membebani I/O) ──────
pg_basebackup \
  -h localhost \
  -U replicator \
  -D /backup/postgresql/base_$(date +%Y%m%d) \
  -Fp --checkpoint=fast --wal-method=stream \
  -r 100M \
  -P
# -r 100M: limit transfer rate 100MB/s`}
      </Code>
    </Block>

    <Block title="Point-in-Time Recovery (PITR) — Restore ke Detik Tertentu" color="#a78bfa">
      <Code>
{`# Skenario: database rusak karena DROP TABLE jam 14:32:00
# Tujuan: restore ke kondisi jam 14:31:59 (tepat sebelum DROP)

# ── STEP 1: Matikan PostgreSQL yang bermasalah ───────────────
sudo systemctl stop postgresql

# ── STEP 2: Amankan data lama (jangan langsung dihapus!) ─────
sudo mv /var/lib/postgresql/16/main /var/lib/postgresql/16/main.broken

# ── STEP 3: Restore base backup ──────────────────────────────
sudo mkdir /var/lib/postgresql/16/main

# Jika backup dalam format plain:
sudo rsync -av /backup/postgresql/base_20260422_020000/ \
  /var/lib/postgresql/16/main/

# Jika backup dalam format tar:
sudo tar -xzf /backup/postgresql/base_20260422_020000/base.tar.gz \
  -C /var/lib/postgresql/16/main/

# ── STEP 4: Buat recovery configuration ──────────────────────
# PostgreSQL 12+: buat file recovery.conf sudah tidak ada
# Gunakan postgresql.conf + recovery.signal

# Buat file recovery.conf sebagai standby.signal lama → gunakan recovery.signal
touch /var/lib/postgresql/16/main/recovery.signal

# Edit postgresql.conf (atau buat recovery.conf terpisah):
cat >> /var/lib/postgresql/16/main/postgresql.conf << 'EOF'

# PITR Recovery Settings
restore_command = 'cp /wal_archive/%f %p'
recovery_target_time = '2026-04-22 14:31:59'
recovery_target_action = 'promote'  # promote jadi primary setelah target tercapai
# Alternatif recovery_target:
# recovery_target_lsn  = '0/15D5678'          # target LSN tertentu
# recovery_target_name = 'before_drop_table'   # named restore point
# recovery_target_xid  = '12345'               # transaction ID tertentu
EOF

# ── STEP 5: Perbaiki permission ──────────────────────────────
sudo chown -R postgres:postgres /var/lib/postgresql/16/main
sudo chmod 700 /var/lib/postgresql/16/main
sudo rm -f /var/lib/postgresql/16/main/postmaster.pid

# ── STEP 6: Start PostgreSQL (akan mulai replay WAL) ─────────
sudo systemctl start postgresql

# Monitor progress recovery:
tail -f /var/log/postgresql/postgresql-16-main.log
# Cari baris: "recovery stopping before commit..."
# Dan: "database system is ready to accept connections"

# ── STEP 7: Verifikasi data sudah kembali ────────────────────
psql -U postgres -c "SELECT count(*) FROM important_table;"
psql -U postgres -c "SELECT now();"`}
      </Code>
      <Note>Setelah PITR berhasil, file recovery.signal otomatis dihapus dan PostgreSQL masuk mode normal. Hapus juga baris recovery settings dari postgresql.conf agar tidak aktif lagi saat restart berikutnya.</Note>
    </Block>

    <Block title="Named Restore Point — Tandai Momen Penting" color="#e879f9">
      <Code>
{`-- Buat named restore point sebelum operasi berisiko
-- (contoh: sebelum deploy, sebelum migrasi data besar)

SELECT pg_create_restore_point('before_migration_v2');
-- Simpan nama ini!

-- Lakukan operasi berisiko...
ALTER TABLE orders ADD COLUMN new_field TEXT;
UPDATE orders SET new_field = expensive_function(id);   -- bisa lama

-- Jika ada masalah → restore ke titik ini:
-- Di recovery.conf:
-- restore_command = 'cp /wal_archive/%f %p'
-- recovery_target_name = 'before_migration_v2'
-- recovery_target_action = 'promote'`}
      </Code>
    </Block>
  </div>
)

const PgDump = () => (
  <div>
    <h3 style={{ color: '#e879f9', fontWeight: 'bold', fontSize: '20px', marginBottom: '4px' }}>🗂️ pg_dump & pg_dumpall — Logical Backup</h3>
    <p style={{ color: '#708090', fontSize: '16px', marginBottom: '16px' }}>
      pg_dump menghasilkan backup logical — output SQL atau binary yang bisa di-restore ke versi PostgreSQL berbeda, OS berbeda, atau bahkan ke cloud. Bisa backup satu database, satu schema, atau satu tabel saja.
    </p>

    <Block title="pg_dump — Backup Satu Database" color="#e879f9">
      <Code>
{`# ── Format SQL plain (paling portabel, bisa dibaca manusia) ──
pg_dump -U postgres -d mydb > /backup/mydb_$(date +%Y%m%d).sql

# Dengan kompresi
pg_dump -U postgres -d mydb | gzip > /backup/mydb_$(date +%Y%m%d).sql.gz

# ── Format custom (paling direkomendasikan untuk production) ──
# Binary, compressed, support parallel restore, bisa restore sebagian
pg_dump -U postgres -d mydb \
  -Fc \
  -f /backup/mydb_$(date +%Y%m%d).dump
# -Fc : format custom (binary)

# ── Format directory (support parallel dump) ──────────────────
pg_dump -U postgres -d mydb \
  -Fd \
  -j 4 \
  -f /backup/mydb_$(date +%Y%m%d)_dir/
# -Fd : format directory
# -j 4: pakai 4 thread paralel (lebih cepat untuk DB besar)

# ── Format tar ────────────────────────────────────────────────
pg_dump -U postgres -d mydb \
  -Ft \
  -f /backup/mydb_$(date +%Y%m%d).tar

# ── Opsi berguna ──────────────────────────────────────────────
pg_dump -U postgres -d mydb \
  -Fc \
  --no-owner \         # jangan sertakan perintah OWNER (berguna jika restore ke user berbeda)
  --no-privileges \    # jangan sertakan GRANT/REVOKE
  --no-comments \      # jangan sertakan COMMENT
  --schema=public \    # hanya schema public
  -f /backup/mydb_schema_public.dump

# ── Backup hanya schema (DDL saja, tanpa data) ───────────────
pg_dump -U postgres -d mydb \
  -Fc \
  --schema-only \
  -f /backup/mydb_schema_only.dump

# ── Backup hanya data (tanpa DDL) ────────────────────────────
pg_dump -U postgres -d mydb \
  -Fc \
  --data-only \
  -f /backup/mydb_data_only.dump

# ── Backup tabel tertentu ─────────────────────────────────────
pg_dump -U postgres -d mydb \
  -Fc \
  -t orders \
  -t order_items \
  -f /backup/mydb_orders.dump

# ── Exclude tabel tertentu ────────────────────────────────────
pg_dump -U postgres -d mydb \
  -Fc \
  --exclude-table=audit_logs \
  --exclude-table=temp_* \
  -f /backup/mydb_no_logs.dump

# ── Cek ukuran sebelum dump ──────────────────────────────────
psql -U postgres -c "SELECT pg_size_pretty(pg_database_size('mydb'));"

# ── Verifikasi dump (list isi tanpa extract) ──────────────────
pg_restore --list /backup/mydb_20260422.dump | head -30`}
      </Code>
    </Block>

    <Block title="pg_dumpall — Backup Semua Database + Roles" color="#64c8ff">
      <Code>
{`# pg_dumpall: backup SEMUA database + global objects (roles, tablespace)
# Output selalu berupa SQL plain (tidak bisa format custom)

pg_dumpall -U postgres > /backup/all_databases_$(date +%Y%m%d).sql

# Dengan kompresi
pg_dumpall -U postgres | gzip > /backup/all_databases_$(date +%Y%m%d).sql.gz

# ── Hanya backup global objects (roles & tablespaces) ─────────
# Berguna saat mau restore roles ke server baru sebelum restore database
pg_dumpall -U postgres --globals-only > /backup/globals_$(date +%Y%m%d).sql

# ── Hanya backup schema (DDL semua database, tanpa data) ──────
pg_dumpall -U postgres --schema-only > /backup/all_schema_$(date +%Y%m%d).sql

# ── Backup database individual dalam satu script ──────────────
for DB in $(psql -U postgres -t -c "SELECT datname FROM pg_database WHERE datistemplate = false AND datname != 'postgres';"); do
  echo "Backing up $DB..."
  pg_dump -U postgres -Fc -d $DB -f /backup/${'DB'}_$(date +%Y%m%d).dump
done`}
      </Code>
    </Block>

    <Block title="pg_dump dengan Koneksi Remote & SSL" color="#4ade80">
      <Code>
{`# Koneksi ke server remote
pg_dump \
  -h db.production.internal \
  -p 5432 \
  -U backup_user \
  -d mydb \
  -Fc \
  -f /backup/mydb_$(date +%Y%m%d).dump

# Dengan SSL (wajib untuk production remote)
PGSSLMODE=require pg_dump \
  -h db.production.internal \
  -U backup_user \
  -d mydb \
  -Fc \
  -f /backup/mydb_remote.dump

# Menggunakan connection string (URL format)
pg_dump "postgresql://backup_user:password@db.host:5432/mydb?sslmode=require" \
  -Fc \
  -f /backup/mydb.dump

# ── Gunakan .pgpass untuk password tanpa prompt ───────────────
# File: ~/.pgpass (permission harus 600)
# Format: hostname:port:database:username:password
echo "db.production.internal:5432:mydb:backup_user:secret_pass" >> ~/.pgpass
chmod 600 ~/.pgpass

# Sekarang tidak perlu masukkan password:
pg_dump -h db.production.internal -U backup_user -d mydb -Fc -f /backup/mydb.dump`}
      </Code>
    </Block>

    <Block title="Backup ke S3 / Object Storage" color="#fbbf24">
      <Code>
{`# ── Upload langsung ke S3 (tanpa simpan ke disk dulu) ────────
pg_dump -U postgres -d mydb -Fc | \
  aws s3 cp - s3://my-backups/postgresql/mydb_$(date +%Y%m%d_%H%M%S).dump

# Download dari S3 untuk restore:
aws s3 cp s3://my-backups/postgresql/mydb_20260422_020000.dump - | \
  pg_restore -U postgres -d mydb_restore

# ── Upload ke MinIO / compatible S3 ──────────────────────────
pg_dump -U postgres -d mydb -Fc | \
  aws s3 cp - s3://backups/pg/mydb_$(date +%Y%m%d).dump \
    --endpoint-url http://minio:9000

# ── Dengan enkripsi GPG sebelum upload ───────────────────────
pg_dump -U postgres -d mydb -Fc | \
  gpg --encrypt --recipient backup@company.com | \
  aws s3 cp - s3://my-backups/pg/mydb_$(date +%Y%m%d).dump.gpg

# Decrypt dan restore:
aws s3 cp s3://my-backups/pg/mydb_20260422.dump.gpg - | \
  gpg --decrypt | \
  pg_restore -U postgres -d mydb_restore`}
      </Code>
    </Block>
  </div>
)

const Restore = () => (
  <div>
    <h3 style={{ color: '#4ade80', fontWeight: 'bold', fontSize: '20px', marginBottom: '4px' }}>♻️ Restore — Mengembalikan Data</h3>
    <p style={{ color: '#708090', fontSize: '16px', marginBottom: '16px' }}>
      Kemampuan restore sama pentingnya dengan backup. Selalu uji restore di lingkungan staging sebelum benar-benar butuh di production.
    </p>

    <Block title="Restore dari pg_dump (Format SQL)" color="#4ade80">
      <Code>
{`# ── Restore format SQL plain ─────────────────────────────────
# Buat database target dulu (pg_dump tidak include CREATE DATABASE)
createdb -U postgres mydb_restored

psql -U postgres -d mydb_restored < /backup/mydb_20260422.sql

# Dari compressed backup:
gunzip -c /backup/mydb_20260422.sql.gz | psql -U postgres -d mydb_restored

# ── Restore pg_dumpall ────────────────────────────────────────
# Restore globals dulu (roles, tablespaces)
psql -U postgres < /backup/globals_20260422.sql

# Lalu restore semua database
psql -U postgres < /backup/all_databases_20260422.sql

# Dari compressed:
gunzip -c /backup/all_databases_20260422.sql.gz | psql -U postgres`}
      </Code>
    </Block>

    <Block title="pg_restore — Restore Format Custom/Tar/Directory" color="#64c8ff">
      <Code>
{`# ── Restore ke database yang sudah ada ───────────────────────
pg_restore -U postgres -d mydb_restored /backup/mydb_20260422.dump

# ── Buat database baru sekalian saat restore ─────────────────
pg_restore -U postgres \
  --create \
  -d postgres \
  /backup/mydb_20260422.dump

# ── Restore dengan opsi berguna ───────────────────────────────
pg_restore -U postgres -d mydb_restored \
  --no-owner \           # jangan set OWNER (berguna jika user berbeda)
  --no-privileges \      # jangan apply GRANT/REVOKE
  --clean \              # DROP objects sebelum CREATE (untuk overwrite)
  --if-exists \          # kombinasikan dengan --clean, tidak error jika objek tidak ada
  -v \                   # verbose
  /backup/mydb_20260422.dump

# ── Parallel restore (jauh lebih cepat untuk DB besar) ────────
pg_restore -U postgres -d mydb_restored \
  -j 8 \                 # 8 thread paralel
  /backup/mydb_20260422.dump
# PENTING: hanya bekerja untuk format -Fc (custom) dan -Fd (directory)!

# ── Restore hanya schema tertentu ────────────────────────────
pg_restore -U postgres -d mydb_restored \
  --schema=analytics \
  /backup/mydb_20260422.dump

# ── Restore hanya tabel tertentu ─────────────────────────────
pg_restore -U postgres -d mydb_restored \
  -t orders \
  -t order_items \
  /backup/mydb_20260422.dump

# ── Restore hanya data (skip DDL) ────────────────────────────
pg_restore -U postgres -d mydb_restored \
  --data-only \
  --disable-triggers \   # nonaktifkan trigger saat insert massal
  /backup/mydb_20260422.dump

# ── List isi backup tanpa restore ─────────────────────────────
pg_restore --list /backup/mydb_20260422.dump
pg_restore --list /backup/mydb_20260422.dump | grep -i "table orders"`}
      </Code>
    </Block>

    <Block title="Restore Selektif — Rescue Tabel yang Ter-DROP" color="#fbbf24">
      <Code>
{`# Skenario: tabel "customers" ter-DROP di production
# Ada pg_dump backup dari semalam

# ── Cara 1: Restore ke database terpisah, lalu copy ──────────
# Buat database temporary untuk restore
createdb -U postgres db_rescue

# Restore HANYA tabel customers dari backup
pg_restore -U postgres -d db_rescue \
  -t customers \
  /backup/mydb_20260421.dump

# Verify data ada
psql -U postgres -d db_rescue -c "SELECT count(*) FROM customers;"

# Copy data ke production database
psql -U postgres -d mydb << 'EOF'
INSERT INTO customers
SELECT * FROM dblink(
  'dbname=db_rescue user=postgres',
  'SELECT * FROM customers'
) AS t(id bigint, name text, email text, created_at timestamptz);
EOF

# Hapus database rescue
dropdb -U postgres db_rescue

# ── Cara 2: Restore ke file SQL, edit, lalu apply ────────────
# Extract tabel tertentu ke SQL plain
pg_restore -t customers /backup/mydb_20260421.dump > /tmp/customers_rescue.sql

# Periksa isi SQL
head -50 /tmp/customers_rescue.sql

# Apply ke production (dengan TRUNCATE dulu jika perlu)
psql -U postgres -d mydb < /tmp/customers_rescue.sql`}
      </Code>
    </Block>

    <Block title="Monitoring Progress Restore" color="#a78bfa">
      <Code>
{`# Restore database besar bisa memakan waktu lama
# Monitor progress dari terminal lain:

# Cek ukuran database saat restore berlangsung (besar = sudah banyak masuk)
watch -n 5 "psql -U postgres -c \"
SELECT pg_size_pretty(pg_database_size('mydb_restored')) AS current_size;\""

# Lihat tabel apa yang sudah di-restore
watch -n 5 "psql -U postgres -d mydb_restored -c \"
SELECT schemaname, tablename, pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC
LIMIT 20;\""

# Monitor di pg_stat_activity
watch -n 2 "psql -U postgres -c \"
SELECT pid, state, left(query, 80) AS q,
       now() - query_start AS duration
FROM pg_stat_activity WHERE state != 'idle';\""

# Estimasi total ukuran dari backup (sebelum restore)
pg_restore --list /backup/mydb_20260422.dump | wc -l   # jumlah objek
du -sh /backup/mydb_20260422.dump                       # ukuran backup file`}
      </Code>
    </Block>

    <Block title="Checklist Verifikasi Setelah Restore" color="#f87171">
      <Code>
{`-- ── Jalankan setelah restore selesai ─────────────────────────

-- 1. Cek semua database ada
SELECT datname, pg_size_pretty(pg_database_size(datname)) AS size
FROM pg_database WHERE datistemplate = false ORDER BY datname;

-- 2. Cek jumlah tabel per schema
SELECT schemaname, count(*) AS tables
FROM pg_tables
WHERE schemaname NOT IN ('pg_catalog', 'information_schema')
GROUP BY schemaname;

-- 3. Cek jumlah baris tabel penting (bandingkan dengan sebelum backup)
SELECT
  schemaname, relname,
  n_live_tup AS estimated_rows,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||relname)) AS size
FROM pg_stat_user_tables
ORDER BY n_live_tup DESC
LIMIT 20;

-- 4. Verifikasi constraint masih aktif
SELECT conname, contype, conrelid::regclass AS table
FROM pg_constraint
WHERE contype IN ('p', 'f', 'u', 'c')  -- pk, fk, unique, check
ORDER BY conrelid::regclass::text;

-- 5. Cek semua index ada dan valid
SELECT schemaname, tablename, indexname, idx_scan
FROM pg_stat_user_indexes
WHERE pg_relation_size(indexrelid) > 0
ORDER BY tablename;

-- 6. ANALYZE setelah restore (statistik planner perlu diupdate)
ANALYZE;

-- 7. Test koneksi dari aplikasi ke database hasil restore`}
      </Code>
    </Block>
  </div>
)

const Strategy = () => (
  <div>
    <h3 style={{ color: '#a78bfa', fontWeight: 'bold', fontSize: '20px', marginBottom: '16px' }}>✅ Strategi Backup Production & Checklist</h3>

    <Block title="Strategi Backup 3-2-1" color="#a78bfa">
      <div style={{ background: 'rgba(167,139,250,0.06)', border: '1px solid rgba(167,139,250,0.2)', borderRadius: '8px', padding: '16px', marginBottom: '12px' }}>
        <p style={{ color: '#a0c8ff', fontSize: '16px', lineHeight: '1.9', margin: 0 }}>
          <strong style={{ color: '#a78bfa' }}>3</strong> salinan data (1 production + 2 backup)<br />
          <strong style={{ color: '#a78bfa' }}>2</strong> media penyimpanan berbeda (misalnya: disk lokal + object storage)<br />
          <strong style={{ color: '#a78bfa' }}>1</strong> salinan offsite / cloud (geografis berbeda dari server production)
        </p>
      </div>
      <Code>
{`# Contoh implementasi strategi 3-2-1:

# Salinan 1: WAL archive lokal (hot backup continuous)
archive_command = 'cp %p /local_wal_archive/%f'

# Salinan 2: pg_basebackup harian + WAL ke NAS/NFS
# (cron jam 02:00 setiap hari)
0 2 * * * pg_basebackup -D /nas/backup/pg/base_$(date +%Y%m%d) \
  -Fp --checkpoint=fast --wal-method=stream -P >> /var/log/pg_backup.log 2>&1

# Salinan 3: pg_dump mingguan ke S3 (offsite)
# (cron Minggu jam 03:00)
0 3 * * 0 pg_dump -U postgres -d mydb -Fc | \
  aws s3 cp - s3://offsite-backups/pg/mydb_$(date +%Y%m%d).dump \
  >> /var/log/pg_backup_s3.log 2>&1`}
      </Code>
    </Block>

    <Block title="Jadwal Backup yang Direkomendasikan" color="#4ade80">
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'rgba(0,0,0,0.2)' }}>
              {['Jenis', 'Frekuensi', 'Method', 'Retensi', 'Tujuan'].map(h => (
                <th key={h} style={{ padding: '10px 12px', color: '#64c8ff', fontSize: '15px', textAlign: 'left' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['WAL Archive',         'Continuous',  'archive_command',             '7–30 hari',  'RPO menit/detik, support PITR'],
              ['pg_basebackup',       'Harian',      'pg_basebackup -Fp',           '7–14 hari',  'Physical snapshot, base untuk PITR'],
              ['pg_dump (per DB)',     'Harian',      'pg_dump -Fc',                 '30 hari',    'Logical, portable, restore sebagian'],
              ['pg_dumpall (semua)',   'Mingguan',    'pg_dumpall + S3',             '90 hari',    'Full logical + roles ke offsite'],
              ['Cold backup',         'Bulanan',     'systemctl stop + rsync',      '3 bulan',    'Arsip jangka panjang / audit'],
            ].map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j} style={{ padding: '8px 12px', color: j === 0 ? '#a78bfa' : '#a0c8ff', fontSize: '15px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Block>

    <Block title="Monitoring & Alerting Backup" color="#f87171">
      <Code>
{`-- ── Cek status WAL archiver ──────────────────────────────────
SELECT
  archived_count,
  failed_count,            -- harus selalu 0!
  last_archived_wal,
  last_archived_time,
  now() - last_archived_time AS archive_lag   -- alert jika > 5 menit
FROM pg_stat_archiver;

-- ── Script monitoring (jalankan via cron tiap 5 menit) ────────`}
      </Code>
      <Code color="#86efac">
{`#!/bin/bash
# /usr/local/bin/check_backup.sh

FAILED=$(psql -U postgres -t -c "SELECT failed_count FROM pg_stat_archiver;")
LAG=$(psql -U postgres -t -c "
  SELECT EXTRACT(EPOCH FROM (now() - last_archived_time))
  FROM pg_stat_archiver;")

if [ "$FAILED" -gt "0" ]; then
  echo "ALERT: WAL archive failed! Count: $FAILED" | \
    mail -s "[PG BACKUP] WAL Archive Failure" ops@company.com
fi

if (( $(echo "$LAG > 300" | bc -l) )); then
  echo "ALERT: WAL archive lag ${'LAG'}s (> 5 minutes)" | \
    mail -s "[PG BACKUP] Archive Lag Warning" ops@company.com
fi

# Cek backup harian ada
YESTERDAY=$(date -d "yesterday" +%Y%m%d)
if [ ! -d "/backup/postgresql/base_$YESTERDAY" ]; then
  echo "ALERT: No daily backup found for $YESTERDAY" | \
    mail -s "[PG BACKUP] Missing Daily Backup" ops@company.com
fi`}
      </Code>
    </Block>

    <Block title="Tools Backup PostgreSQL Tingkat Lanjut" color="#38bdf8">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px', marginBottom: '10px' }}>
        {[
          {
            name: 'pgBackRest',
            color: '#38bdf8',
            desc: 'Tool backup paling lengkap. Support full/differential/incremental backup, parallel, S3, enkripsi, retention policy, verify backup.',
            cmd: 'pgbackrest --stanza=mydb backup --type=full',
          },
          {
            name: 'WAL-G',
            color: '#4ade80',
            desc: 'Backup ke cloud-native (S3, GCS, Azure). Cepat, ringan, support PITR. Cocok untuk deployment cloud.',
            cmd: 'wal-g backup-push $PGDATA',
          },
          {
            name: 'Barman',
            color: '#fbbf24',
            desc: 'Backup & recovery manager dari 2ndQuadrant. Mendukung streaming replication, PITR, monitoring.',
            cmd: 'barman backup main',
          },
          {
            name: 'pg_probackup',
            color: '#a78bfa',
            desc: 'Incremental backup level page. Hanya backup page yang berubah sejak backup terakhir — hemat storage.',
            cmd: 'pg_probackup backup --backup-mode=DELTA',
          },
        ].map((tool, i) => (
          <div key={i} style={{ background: `${tool.color}0d`, border: `1px solid ${tool.color}30`, borderRadius: '8px', padding: '14px' }}>
            <p style={{ color: tool.color, fontWeight: 'bold', fontSize: '17px', marginBottom: '6px' }}>{tool.name}</p>
            <p style={{ color: '#a0c8ff', fontSize: '14px', lineHeight: '1.7', marginBottom: '8px' }}>{tool.desc}</p>
            <pre style={{ background: 'rgba(0,0,0,0.3)', padding: '6px 8px', borderRadius: '4px', fontFamily: 'monospace', fontSize: '14px', color: '#86efac', margin: 0, overflow: 'auto' }}>{tool.cmd}</pre>
          </div>
        ))}
      </div>
      <Note>Untuk production serius: pgBackRest atau WAL-G sangat direkomendasikan dibandingkan pg_dump manual. Keduanya support incremental backup, enkripsi, dan integrasi cloud storage out of the box.</Note>
    </Block>

    <Block title="Checklist Backup Production" color="#fbbf24">
      {[
        { ok: true,  text: 'WAL archiving aktif dan failed_count = 0 di pg_stat_archiver' },
        { ok: true,  text: 'pg_basebackup harian berjalan via cron, hasilnya ada di storage' },
        { ok: true,  text: 'pg_dump mingguan ke offsite storage (S3 / GCS / remote)' },
        { ok: true,  text: 'Retensi backup dikonfigurasi — backup lama otomatis dihapus' },
        { ok: true,  text: 'Monitoring archive lag — alert jika > 5 menit' },
        { ok: true,  text: 'Alert jika backup harian tidak ada' },
        { ok: false, text: 'Restore test dilakukan setidaknya sekali sebulan ke server staging' },
        { ok: false, text: 'Waktu restore diukur dan dicatat — pastikan RTO terpenuhi' },
        { ok: false, text: 'Backup dienkripsi jika berisi data sensitif / PII' },
        { ok: false, text: 'Access ke backup storage dibatasi (prinsip least privilege)' },
        { ok: false, text: 'Runbook restore terdokumentasi dan mudah diakses saat darurat' },
        { ok: false, text: 'Disaster recovery drill dilakukan minimal setahun sekali' },
      ].map((item, i) => (
        <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '8px' }}>
          <span style={{ color: item.ok ? '#4ade80' : '#fbbf24', fontSize: '18px', flexShrink: 0, marginTop: '1px' }}>{item.ok ? '✅' : '⬜'}</span>
          <p style={{ color: '#a0c8ff', fontSize: '15px', lineHeight: '1.7', margin: 0 }}>{item.text}</p>
        </div>
      ))}
    </Block>
  </div>
)

const PITR = () => (
  <div>
    <h3 style={{ color: '#a78bfa', fontWeight: 'bold', fontSize: '20px', marginBottom: '4px' }}>⏱️ Point-in-Time Recovery (PITR)</h3>
    <p style={{ color: '#708090', fontSize: '16px', marginBottom: '20px' }}>
      PITR memungkinkan kamu memutar balik database ke kondisi tepat sebelum sebuah kesalahan terjadi — bahkan ke detik tertentu. Fondasi PITR adalah WAL (Write-Ahead Log): setiap perubahan data selalu dicatat di WAL sebelum ditulis ke data file. Dengan menyimpan WAL archive + base backup, kamu bisa "replay" semua perubahan hingga titik waktu manapun.
    </p>

    {/* Konsep */}
    <Block title="Konsep: Bagaimana PITR Bekerja" color="#a78bfa">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '14px' }}>
        {[
          { step: '1', color: '#64c8ff',  label: 'WAL Archiving Berjalan Terus', desc: 'Setiap WAL segment (16 MB) yang selesai ditulis langsung di-copy ke archive location. Ini mencatat SEMUA perubahan secara berurutan.' },
          { step: '2', color: '#4ade80',  label: 'Base Backup Diambil Berkala', desc: 'pg_basebackup mengambil snapshot fisik seluruh PGDATA. Ini adalah "titik awal" replay WAL. Tanpa base backup, WAL archive saja tidak cukup.' },
          { step: '3', color: '#fbbf24',  label: 'Terjadi Kesalahan', desc: 'DROP TABLE, korupsi data, INSERT salah, dsb. Kamu tahu kira-kira kapan kejadiannya.' },
          { step: '4', color: '#f87171',  label: 'Restore Base Backup', desc: 'Salin base backup ke PGDATA baru. Ini mengembalikan state database ke saat backup diambil.' },
          { step: '5', color: '#e879f9',  label: 'Replay WAL Archive', desc: 'PostgreSQL menjalankan restore_command untuk mengambil WAL satu per satu dari archive dan mem-apply-nya — sampai recovery_target tercapai.' },
          { step: '6', color: '#a78bfa',  label: 'Database Promote', desc: 'Setelah target tercapai, PostgreSQL berhenti replay dan promote jadi database normal (read-write). recovery.signal dihapus otomatis.' },
        ].map((s, i) => (
          <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <div style={{ background: s.color, color: '#0f1419', fontWeight: 'bold', fontSize: '15px', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>{s.step}</div>
            <div>
              <p style={{ color: s.color, fontWeight: 'bold', fontSize: '15px', margin: '0 0 2px 0' }}>{s.label}</p>
              <p style={{ color: '#708090', fontSize: '14px', margin: 0 }}>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </Block>

    {/* Prasyarat */}
    <Block title="Prasyarat — Yang Harus Sudah Ada Sebelum Insiden" color="#64c8ff">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '10px' }}>
        {[
          { color: '#4ade80', label: 'WAL Archiving aktif', body: 'wal_level = replica\narchive_mode = on\narchive_command = \'cp %p /wal_archive/%f\'' },
          { color: '#64c8ff', label: 'Base backup tersedia', body: 'pg_basebackup harian via cron.\nBase backup menentukan seberapa jauh kamu harus replay WAL.' },
          { color: '#fbbf24', label: 'archive_timeout dikonfigurasi', body: 'archive_timeout = 60\nPaksa switch WAL tiap N detik.\nPenting di low-traffic: WAL lama tidak ter-archive jika belum penuh.' },
          { color: '#a78bfa', label: 'WAL archive tidak pernah dihapus sembarangan', body: 'Jangan hapus WAL archive sebelum ada base backup yang lebih baru.\nJika ada gap di WAL, PITR akan berhenti di situ.' },
        ].map((item, i) => (
          <div key={i} style={{ background: `${item.color}0d`, border: `1px solid ${item.color}30`, borderRadius: '8px', padding: '12px' }}>
            <p style={{ color: item.color, fontWeight: 'bold', fontSize: '15px', marginBottom: '6px' }}>{item.label}</p>
            <pre style={{ color: '#a0c8ff', fontSize: '13px', fontFamily: 'monospace', margin: 0, whiteSpace: 'pre-wrap', lineHeight: '1.7' }}>{item.body}</pre>
          </div>
        ))}
      </div>
      <Note>Tanpa WAL archiving aktif + base backup yang valid, PITR tidak bisa dilakukan. Setup ini harus ada SEBELUM terjadi insiden, bukan sesudah.</Note>
    </Block>

    {/* Empat Jenis Recovery Target */}
    <Block title="Empat Jenis Recovery Target" color="#fbbf24">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {[
          {
            param: 'recovery_target_time',
            color: '#fbbf24',
            example: "recovery_target_time = '2026-04-23 09:14:59.999'",
            desc: 'Paling umum dipakai. Restore ke titik waktu tertentu (timestamp). Cocok jika kamu tahu "kapan" insiden terjadi dari log aplikasi atau monitoring.',
          },
          {
            param: 'recovery_target_lsn',
            color: '#64c8ff',
            example: "recovery_target_lsn = '0/1A3F8B0'",
            desc: 'Restore ke Log Sequence Number tertentu. Presisi tinggi, tapi butuh tahu LSN-nya. Dapatkan dari pg_current_wal_lsn() sebelum insiden, atau dari output pg_waldump.',
          },
          {
            param: 'recovery_target_name',
            color: '#4ade80',
            example: "recovery_target_name = 'before_migration_v3'",
            desc: 'Restore ke named restore point yang sudah dibuat sebelumnya via pg_create_restore_point(). Cara paling aman — tandai sebelum operasi berisiko.',
          },
          {
            param: 'recovery_target_xid',
            color: '#e879f9',
            example: "recovery_target_xid = '7483921'",
            desc: 'Restore ke Transaction ID tertentu. Berguna jika kamu tahu XID transaksi yang merusak data (dari log audit, pgaudit, dll.).',
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'rgba(0,0,0,0.25)', border: `1px solid ${item.color}25`, borderRadius: '8px', padding: '12px' }}>
            <p style={{ color: item.color, fontWeight: 'bold', fontFamily: 'monospace', fontSize: '15px', marginBottom: '4px' }}>{item.param}</p>
            <pre style={{ background: 'rgba(0,0,0,0.3)', padding: '6px 10px', borderRadius: '4px', color: '#86efac', fontFamily: 'monospace', fontSize: '14px', margin: '0 0 6px 0', overflow: 'auto' }}>{item.example}</pre>
            <p style={{ color: '#a0c8ff', fontSize: '14px', margin: 0, lineHeight: '1.6' }}>{item.desc}</p>
          </div>
        ))}
      </div>
    </Block>

    {/* recovery_target_action */}
    <Block title="recovery_target_action — Apa yang Dilakukan Setelah Target Tercapai" color="#38bdf8">
      <Code>
{`# Tiga pilihan nilai:

recovery_target_action = 'promote'    # DEFAULT — promote jadi primary, terima koneksi read-write
recovery_target_action = 'pause'      # Pause di titik target, tunggu konfirmasi manual
                                      # Berguna: cek data dulu sebelum commit ke state ini
                                      # Lanjutkan dengan: SELECT pg_wal_replay_resume();
recovery_target_action = 'shutdown'   # Shutdown setelah target tercapai
                                      # Berguna: cegah koneksi masuk sampai kamu siap

# Opsi lain yang sering dikombinasikan:
recovery_target_inclusive = on        # DEFAULT: include transaksi tepat di target (true)
                                      # false: stop SEBELUM transaksi di target

# Contoh: pause dulu untuk verifikasi, lalu promote manual
recovery_target_time   = '2026-04-23 09:14:59'
recovery_target_action = 'pause'

# Setelah cek data:
SELECT pg_wal_replay_resume();   -- lanjut replay sampai habis, lalu promote`}
      </Code>
    </Block>

    {/* Implementasi Lengkap */}
    <Block title="Implementasi PITR — Langkah Demi Langkah" color="#f87171">
      <Code>
{`# ════════════════════════════════════════════════════════════
# SKENARIO: tabel "orders" ter-TRUNCATE jam 09:15 WIB
# Target   : restore ke kondisi jam 09:14:59
# Base backup terakhir: tadi malam jam 02:00
# ════════════════════════════════════════════════════════════

# ── FASE 1: STOP & AMANKAN ───────────────────────────────────

# 1a. Hentikan PostgreSQL yang bermasalah
sudo systemctl stop postgresql

# 1b. Simpan data rusak — JANGAN langsung dihapus!
sudo mv /var/lib/postgresql/16/main \
        /var/lib/postgresql/16/main.broken_$(date +%Y%m%d_%H%M%S)

# 1c. Catat WAL LSN terakhir dari data rusak (untuk referensi)
# (lakukan SEBELUM stop jika memungkinkan, dari psql)
# SELECT pg_current_wal_lsn();


# ── FASE 2: SIAPKAN DIREKTORI RESTORE ───────────────────────

# 2a. Buat direktori PGDATA baru
sudo mkdir -p /var/lib/postgresql/16/main
sudo chown postgres:postgres /var/lib/postgresql/16/main
sudo chmod 700 /var/lib/postgresql/16/main

# 2b. Restore base backup (sesuaikan path dengan backup kamu)
# Jika format plain (direktori):
sudo -u postgres rsync -av --delete \
  /backup/postgresql/base_20260423_020000/ \
  /var/lib/postgresql/16/main/

# Jika format tar+gz:
sudo -u postgres tar -xzf \
  /backup/postgresql/base_20260423_020000/base.tar.gz \
  -C /var/lib/postgresql/16/main/

# 2c. Restore pg_wal dari backup juga (jika disimpan terpisah)
sudo -u postgres tar -xzf \
  /backup/postgresql/base_20260423_020000/pg_wal.tar.gz \
  -C /var/lib/postgresql/16/main/pg_wal/


# ── FASE 3: KONFIGURASI RECOVERY ────────────────────────────

# 3a. Buat recovery.signal — tanda bahwa ini mode recovery
sudo -u postgres touch /var/lib/postgresql/16/main/recovery.signal

# 3b. Tambahkan konfigurasi PITR ke postgresql.conf
sudo -u postgres tee -a /var/lib/postgresql/16/main/postgresql.conf << 'EOF'

# ── PITR Recovery Settings (hapus setelah recovery berhasil) ──
restore_command       = 'cp /wal_archive/%f %p'
recovery_target_time  = '2026-04-23 09:14:59'
recovery_target_action = 'promote'
EOF

# Jika WAL archive di remote:
# restore_command = 'scp backup-server:/wal_archive/%f %p'
# Jika pakai WAL-G:
# restore_command = 'wal-g wal-fetch %f %p'
# Jika pakai pgBackRest:
# restore_command = 'pgbackrest --stanza=mydb archive-get %f %p'

# 3c. Hapus postmaster.pid jika masih ada dari instance lama
sudo rm -f /var/lib/postgresql/16/main/postmaster.pid

# 3d. Pastikan permission benar
sudo chown -R postgres:postgres /var/lib/postgresql/16/main
sudo chmod 700 /var/lib/postgresql/16/main


# ── FASE 4: JALANKAN & MONITOR RECOVERY ─────────────────────

# 4a. Start PostgreSQL — akan otomatis masuk mode recovery
sudo systemctl start postgresql

# 4b. Monitor log recovery secara real-time
tail -f /var/log/postgresql/postgresql-16-main.log

# Baris yang diharapkan muncul:
# LOG:  starting point-in-time recovery to 2026-04-23 09:14:59+07
# LOG:  restored log file "000000010000000000000001" from archive
# LOG:  redo starts at 0/1000028
# LOG:  consistent recovery state reached at 0/1000100
# LOG:  recovery stopping before commit of transaction ..., time 2026-04-23 09:15:00
# LOG:  pausing at the end of recovery
#   (jika recovery_target_action = pause)
# LOG:  database system is ready to accept read only connections
#   lalu:
# LOG:  database system is ready to accept connections
#   (setelah promote)


# ── FASE 5: VERIFIKASI DATA ──────────────────────────────────

# 5a. Cek tabel yang ter-TRUNCATE sudah kembali
psql -U postgres -d mydb -c "SELECT count(*) FROM orders;"
psql -U postgres -d mydb -c "SELECT max(created_at) FROM orders;"

# 5b. Verifikasi timestamp data terakhir sesuai target
psql -U postgres -d mydb -c "
  SELECT max(created_at) AS latest_order FROM orders;
  -- Harus < 09:15:00"


# ── FASE 6: BERSIHKAN KONFIGURASI RECOVERY ──────────────────

# 6a. recovery.signal sudah otomatis dihapus PostgreSQL saat promote
# Verifikasi tidak ada:
ls -la /var/lib/postgresql/16/main/recovery.signal
# Harus: "No such file or directory"

# 6b. Hapus baris PITR settings dari postgresql.conf
# (edit manual, hapus blok "PITR Recovery Settings" yang tadi ditambahkan)
nano /var/lib/postgresql/16/main/postgresql.conf

# 6c. Reload config
psql -U postgres -c "SELECT pg_reload_conf();"

# 6d. Verifikasi tidak ada restore_command aktif
psql -U postgres -c "SHOW restore_command;"
# Harus: empty string`}
      </Code>
    </Block>

    {/* Named Restore Point */}
    <Block title="Best Practice: Named Restore Point Sebelum Operasi Berisiko" color="#4ade80">
      <Code>
{`-- ── Buat restore point SEBELUM operasi berisiko ──────────────
-- (deploy, migrasi data besar, ALTER TABLE masif, dsb.)

BEGIN;
-- Catat restore point + waktu + LSN untuk dokumentasi
SELECT
  pg_create_restore_point('before_migration_v4') AS restore_point_lsn,
  now()                                          AS created_at,
  pg_current_wal_lsn()                           AS current_lsn;
COMMIT;

-- Output contoh:
--  restore_point_lsn | created_at                    | current_lsn
-- -------------------+-------------------------------+-------------
--  0/2A1F000         | 2026-04-23 10:00:00.123+07    | 0/2A1F000

-- Simpan nilai ini di runbook / tiket deploy!

-- ── Lakukan operasi berisiko ──────────────────────────────────
TRUNCATE staging.import_temp;
INSERT INTO orders SELECT * FROM staging.new_orders;
UPDATE products SET price = price * 1.1 WHERE category = 'premium';

-- ── Jika ada masalah → PITR ke nama tersebut ─────────────────
-- Di postgresql.conf tambahkan:
-- restore_command      = 'cp /wal_archive/%f %p'
-- recovery_target_name = 'before_migration_v4'
-- recovery_target_action = 'promote'`}
      </Code>
    </Block>

    {/* pg_waldump untuk investigasi */}
    <Block title="Investigasi WAL dengan pg_waldump" color="#e879f9">
      <Code>
{`# pg_waldump membaca WAL archive secara human-readable
# Berguna untuk: menemukan LSN tepat sebelum query destruktif

# ── Lihat isi WAL segment tertentu ───────────────────────────
pg_waldump /wal_archive/000000010000000000000042

# ── Filter hanya operasi pada tabel tertentu ─────────────────
pg_waldump /wal_archive/000000010000000000000042 \
  | grep -i "orders"

# ── Lihat range WAL dari LSN ke LSN ──────────────────────────
pg_waldump \
  --start=0/2A000000 \
  --end=0/2B000000 \
  /wal_archive/

# ── Cari TRUNCATE / DROP TABLE ───────────────────────────────
pg_waldump /wal_archive/000000010000000000000042 \
  | grep -i "truncate\|drop"

# Output contoh:
# rmgr: Heap2    len (rec/tot):     59/    59, tx:       7483921,
#   lsn: 0/2A1F4B8, prev 0/2A1F470,
#   desc: TRUNCATE: number of relations: 1, isTruncCascade: 0,
#   blkref #0: rel 1663/16384/16389 fork main blk 0

# TX 7483921 adalah pelakunya → gunakan recovery_target_xid = '7483921'`}
      </Code>
      <Note>pg_waldump hanya bisa membaca WAL dengan timeline yang sama. Jika sudah ada failover (timeline berubah), pastikan kamu membaca WAL dari timeline yang benar.</Note>
    </Block>

    {/* Troubleshooting */}
    <Block title="Troubleshooting PITR Umum" color="#f87171">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {[
          {
            problem: 'LOG: requested WAL segment ... has already been removed',
            color: '#f87171',
            cause: 'WAL archive gap — file WAL yang dibutuhkan tidak ada di archive.',
            fix: 'Cek direktori archive. Jika ada gap, PITR hanya bisa maju sampai gap tersebut. Pertimbangkan restore dari base backup yang lebih dekat ke target.',
          },
          {
            problem: 'FATAL: could not find a valid checkpoint record',
            color: '#fbbf24',
            cause: 'Base backup corrupt atau pg_wal di dalam base backup tidak lengkap.',
            fix: 'Gunakan base backup lain yang lebih lama. Pastikan pg_basebackup selesai tanpa error. Jalankan pg_verifybackup untuk memvalidasi backup.',
          },
          {
            problem: 'Recovery berhenti terlalu awal / melampaui target',
            color: '#4ade80',
            cause: 'recovery_target_time tidak presisi, atau zone waktu tidak cocok.',
            fix: 'Gunakan timestamp lengkap dengan timezone: \'2026-04-23 09:14:59+07\'. Cek log untuk melihat di mana persis PostgreSQL berhenti.',
          },
          {
            problem: 'restore_command gagal (exit code non-zero)',
            color: '#a78bfa',
            cause: 'File WAL tidak ditemukan di archive, atau permission masalah.',
            fix: 'Test restore_command manual: cp /wal_archive/000000010000000000000001 /tmp/test_wal. Cek permission direktori archive (harus bisa dibaca oleh user postgres).',
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'rgba(0,0,0,0.2)', border: `1px solid ${item.color}25`, borderRadius: '8px', padding: '12px' }}>
            <p style={{ color: item.color, fontWeight: 'bold', fontFamily: 'monospace', fontSize: '14px', marginBottom: '6px' }}>⚠ {item.problem}</p>
            <p style={{ color: '#708090', fontSize: '14px', margin: '0 0 4px 0' }}><strong style={{ color: '#a0c8ff' }}>Penyebab:</strong> {item.cause}</p>
            <p style={{ color: '#708090', fontSize: '14px', margin: 0 }}><strong style={{ color: '#4ade80' }}>Solusi:</strong> {item.fix}</p>
          </div>
        ))}
      </div>
    </Block>

    {/* Ringkasan */}
    <Block title="Ringkasan: Kapan Pakai Jenis Recovery Target" color="#38bdf8">
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15px' }}>
          <thead>
            <tr style={{ background: 'rgba(56,189,248,0.1)' }}>
              {['Situasi', 'Recovery Target yang Dipakai', 'Catatan'].map((h, i) => (
                <th key={i} style={{ padding: '10px 14px', color: '#38bdf8', textAlign: 'left', fontWeight: '600', borderBottom: '1px solid rgba(56,189,248,0.3)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['"DROP terjadi jam 09:15"',      'recovery_target_time',  'Paling umum, mudah ditentukan dari log'],
              ['"Sebelum deploy v4"',            'recovery_target_name',  'Butuh pg_create_restore_point() sebelumnya'],
              ['"Sebelum TX #7483921"',          'recovery_target_xid',   'Butuh tahu XID dari audit log / pg_waldump'],
              ['"Tepat sebelum LSN 0/2A1F000"', 'recovery_target_lsn',   'Presisi tertinggi, butuh tahu LSN-nya'],
              ['Restore ke paling mutakhir',     'tidak ada target',      'Hapus semua recovery_target_* dari conf'],
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                {row.map((cell, j) => (
                  <td key={j} style={{ padding: '9px 14px', color: j === 0 ? '#fbbf24' : j === 1 ? '#4ade80' : '#708090', fontFamily: j === 1 ? 'monospace' : 'inherit', fontSize: j === 1 ? '14px' : '15px' }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Block>
  </div>
)

// ─── CONTENT MAP ───────────────────────────────────────────────────────────────

const contentMap = {
  overview: <Overview />,
  cold:     <ColdBackup />,
  warm:     <WarmBackup />,
  hot:      <HotBackup />,
  pitr:     <PITR />,
  pgdump:   <PgDump />,
  restore:  <Restore />,
  strategy: <Strategy />,
}

// ─── MODULE ROOT ───────────────────────────────────────────────────────────────

const BackupRestoreModule = () => {
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
            Backup & Restore PostgreSQL 💾
          </h1>
          <p style={{ color: '#a0c8ff', fontSize: '20px' }}>
            Cold, Warm & Hot Backup — pg_dump, pg_basebackup, WAL Archiving, dan Point-in-Time Recovery (PITR)
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
          💾 PostgreSQL Backup & Restore — Cold · Warm · Hot · pg_dump · pg_basebackup · WAL Archiving · PITR
        </p>
        <p style={{ color: '#708090', fontSize: '18px' }}>
          💡 Tip: Backup yang belum pernah dicoba restore adalah backup yang tidak berguna. Selalu uji restore secara berkala!
        </p>
      </footer>
    </div>
  )
}

export default BackupRestoreModule
