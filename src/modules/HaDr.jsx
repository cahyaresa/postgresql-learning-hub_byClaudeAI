import React, { useState } from 'react'

const tabs = [
  { id: 'overview',    label: '📖 Overview',          desc: 'Konsep HA & DR, RTO/RPO, threat model' },
  { id: 'patroni',    label: '🏛️ Patroni',            desc: 'Auto-failover cluster dengan Patroni + etcd' },
  { id: 'pgbouncer',  label: '🔀 Koneksi & VIP',      desc: 'pgBouncer, Keepalived, Virtual IP' },
  { id: 'failover',   label: '🔁 Failover & Promote', desc: 'Manual & otomatis promote, pg_rewind' },
  { id: 'monitoring', label: '📊 Monitoring',          desc: 'pg_stat_replication, Patronictl, alerting' },
  { id: 'dr',         label: '🌍 Disaster Recovery',  desc: 'Standby jauh, PITR, RTO drill' },
  { id: 'checklist',  label: '✅ Checklist',           desc: 'Production readiness checklist HA & DR' },
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
      High Availability & Disaster Recovery
    </h3>
    <p style={{ color: '#708090', fontSize: '16px', marginBottom: '20px' }}>
      HA memastikan sistem tetap berjalan meski satu node gagal. DR memastikan data dapat dipulihkan setelah bencana besar. Keduanya saling melengkapi dan diukur dengan RTO & RPO.
    </p>

    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
      <div style={{ background: 'rgba(100,200,255,0.07)', border: '1px solid rgba(100,200,255,0.25)', borderRadius: '10px', padding: '16px' }}>
        <p style={{ color: '#64c8ff', fontWeight: 'bold', fontSize: '17px', marginBottom: '8px' }}>High Availability (HA)</p>
        <p style={{ color: '#a0c8ff', fontSize: '15px', lineHeight: '1.8', margin: 0 }}>
          Kemampuan sistem untuk tetap <strong style={{ color: '#64c8ff' }}>melayani request</strong> secara otomatis saat primary node gagal — biasanya dalam hitungan detik hingga menit.<br /><br />
          Dicapai dengan: replikasi synchronous/asynchronous + auto-failover (Patroni, repmgr).
        </p>
      </div>
      <div style={{ background: 'rgba(248,113,113,0.07)', border: '1px solid rgba(248,113,113,0.25)', borderRadius: '10px', padding: '16px' }}>
        <p style={{ color: '#f87171', fontWeight: 'bold', fontSize: '17px', marginBottom: '8px' }}>Disaster Recovery (DR)</p>
        <p style={{ color: '#a0c8ff', fontSize: '15px', lineHeight: '1.8', margin: 0 }}>
          Kemampuan memulihkan data dan layanan setelah <strong style={{ color: '#f87171' }}>bencana total</strong> (datacenter down, korupsi data massal, bencana alam).<br /><br />
          Dicapai dengan: backup PITR + standby di region lain + runbook yang teruji.
        </p>
      </div>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
      <div style={{ background: 'rgba(74,222,128,0.07)', border: '1px solid rgba(74,222,128,0.25)', borderRadius: '10px', padding: '16px' }}>
        <p style={{ color: '#4ade80', fontWeight: 'bold', fontSize: '17px', marginBottom: '6px' }}>RTO — Recovery Time Objective</p>
        <p style={{ color: '#a0c8ff', fontSize: '15px', lineHeight: '1.8', margin: 0 }}>
          Berapa lama sistem boleh <em>down</em> setelah insiden.<br />
          <strong style={{ color: '#4ade80' }}>HA target:</strong> &lt; 30 detik (auto-failover)<br />
          <strong style={{ color: '#4ade80' }}>DR target:</strong> &lt; 4 jam (PITR + restore)
        </p>
      </div>
      <div style={{ background: 'rgba(251,191,36,0.07)', border: '1px solid rgba(251,191,36,0.25)', borderRadius: '10px', padding: '16px' }}>
        <p style={{ color: '#fbbf24', fontWeight: 'bold', fontSize: '17px', marginBottom: '6px' }}>RPO — Recovery Point Objective</p>
        <p style={{ color: '#a0c8ff', fontSize: '15px', lineHeight: '1.8', margin: 0 }}>
          Berapa banyak data yang boleh hilang.<br />
          <strong style={{ color: '#fbbf24' }}>Sync replication:</strong> RPO = 0 (zero data loss)<br />
          <strong style={{ color: '#fbbf24' }}>Async replication:</strong> RPO = lag (biasanya &lt; 1 detik)
        </p>
      </div>
    </div>

    <Block title="Arsitektur HA Tipikal PostgreSQL" color="#a78bfa">
      <Code color="#e2d9f3">{`
  ┌─────────────────────────────────────────────────────────┐
  │                   Load Balancer / VIP                    │
  │              (Keepalived / HAProxy / pgBouncer)          │
  └────────────────────┬────────────────────────────────────┘
                       │  koneksi aplikasi
           ┌───────────┴────────────┐
           ▼                        ▼
  ┌────────────────┐      ┌────────────────┐
  │  PRIMARY (R/W) │◄─────│ STANDBY 1 (RO) │
  │  node1         │ WAL  │  node2         │
  │  streaming     │─────►│  sync/async    │
  └────────────────┘      └────────────────┘
           │                        │
           │   ┌────────────────┐   │
           └──►│ STANDBY 2 (RO) │◄──┘
               │  node3 (async) │
               └────────────────┘
                       │  WAL stream / archive
                       ▼
               ┌───────────────┐
               │  DR STANDBY   │  ← region lain
               │  node-dr      │  (async, low latency OK)
               └───────────────┘
                       │
                       ▼
               ┌───────────────┐
               │  S3/Object    │  ← WAL archive + base backup
               │  Storage      │  (pgBackRest / WAL-G)
               └───────────────┘
`}</Code>
      <Note>Patroni + etcd mengelola leader election dan failover otomatis. HAProxy/pgBouncer sebagai connection router membedakan R/W vs RO.</Note>
    </Block>

    <Block title="Threat Model — Kapan HA vs DR?" color="#f97316">
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'rgba(249,115,22,0.15)' }}>
              {['Skenario', 'Severity', 'Solusi', 'RTO Tipikal'].map(h => (
                <th key={h} style={{ padding: '8px 12px', color: '#f97316', textAlign: 'left', fontSize: '14px' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Primary crash / OOM', 'High', 'HA auto-failover (Patroni)', '< 30 detik'],
              ['Hardware failure (disk/NIC)', 'High', 'HA promote standby', '30 detik – 2 menit'],
              ['Maintenance / upgrade', 'Medium', 'Planned switchover', '< 10 detik'],
              ['Data corruption / bad query', 'Critical', 'PITR ke titik sebelum korupsi', '30 menit – 4 jam'],
              ['Datacenter down', 'Critical', 'DR failover ke region lain', '1 – 4 jam'],
              ['Ransomware / deletion massal', 'Critical', 'Restore dari backup offline', '4 – 8 jam'],
            ].map(([s, sev, sol, rto]) => (
              <tr key={s} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '8px 12px', color: '#a0c8ff', fontSize: '14px' }}>{s}</td>
                <td style={{ padding: '8px 12px', fontSize: '14px' }}>
                  <Badge color={sev === 'Critical' ? '#f87171' : sev === 'High' ? '#fbbf24' : '#4ade80'}>{sev}</Badge>
                </td>
                <td style={{ padding: '8px 12px', color: '#a0c8ff', fontSize: '14px' }}>{sol}</td>
                <td style={{ padding: '8px 12px', color: '#4ade80', fontSize: '14px', fontFamily: 'monospace' }}>{rto}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Block>
  </div>
)

// ─── PATRONI ──────────────────────────────────────────────────────────────────

const Patroni = () => (
  <div>
    <h3 style={{ color: '#64c8ff', fontWeight: 'bold', fontSize: '20px', marginBottom: '4px' }}>Patroni — Auto-Failover Cluster</h3>
    <p style={{ color: '#708090', fontSize: '16px', marginBottom: '20px' }}>
      Patroni adalah HA solution paling populer untuk PostgreSQL. Ia menggunakan DCS (Distributed Configuration Store) seperti etcd, Consul, atau ZooKeeper untuk leader election dan menyimpan cluster state.
    </p>

    <Block title="Komponen Patroni Cluster" color="#64c8ff">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '10px', marginBottom: '10px' }}>
        {[
          { name: 'Patroni Agent', color: '#64c8ff', desc: 'Daemon Python di setiap node. Memantau PostgreSQL, berkomunikasi dengan DCS, melakukan promote/demote.' },
          { name: 'etcd / Consul', color: '#a78bfa', desc: 'DCS (Distributed Config Store). Menyimpan cluster state, leader key, dan config. Minimal 3 node untuk quorum.' },
          { name: 'HAProxy / pgBouncer', color: '#4ade80', desc: 'Connection router. Kirim write ke primary, read ke replica. Health check via Patroni REST API.' },
        ].map(c => (
          <div key={c.name} style={{ background: `${c.color}0d`, border: `1px solid ${c.color}33`, borderRadius: '8px', padding: '12px' }}>
            <p style={{ color: c.color, fontWeight: 'bold', fontSize: '15px', marginBottom: '6px' }}>{c.name}</p>
            <p style={{ color: '#a0c8ff', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>{c.desc}</p>
          </div>
        ))}
      </div>
    </Block>

    <Block title="Instalasi Patroni" color="#a78bfa">
      <Code>{`# ── Di semua node PostgreSQL ─────────────────────────────────
pip install patroni[etcd3]

# ── Instalasi etcd (minimal 3 node) ──────────────────────────
apt install etcd   # atau download binary dari github.com/etcd-io/etcd

# ── Verifikasi etcd cluster ───────────────────────────────────
etcdctl endpoint health --endpoints=node1:2379,node2:2379,node3:2379
etcdctl endpoint status --write-out=table \\
  --endpoints=node1:2379,node2:2379,node3:2379`}</Code>
    </Block>

    <Block title="patroni.yml — Konfigurasi Lengkap" color="#4ade80">
      <Code color="#bbf7d0">{`# /etc/patroni/patroni.yml  (di node1, sesuaikan name & connect_address)

scope: pg-cluster           # nama cluster, sama di semua node
name: node1                 # unik per node

restapi:
  listen: 0.0.0.0:8008
  connect_address: 10.0.0.1:8008

etcd3:
  hosts:
    - 10.0.0.10:2379
    - 10.0.0.11:2379
    - 10.0.0.12:2379

bootstrap:
  dcs:
    ttl: 30
    loop_wait: 10
    retry_timeout: 10
    maximum_lag_on_failover: 1048576   # 1 MB — replica lag maks sebelum boleh jadi primary
    synchronous_mode: false             # true = sync replication, RPO=0 tapi lebih lambat
    postgresql:
      use_pg_rewind: true
      use_slots: true
      parameters:
        wal_level: replica
        hot_standby: "on"
        max_wal_senders: 10
        max_replication_slots: 10
        wal_log_hints: "on"            # wajib untuk pg_rewind
        archive_mode: "on"
        archive_command: 'pgbackrest --stanza=main archive-push %p'

  initdb:
    - encoding: UTF8
    - data-checksums                   # deteksi korupsi halaman

  pg_hba:
    - host replication replicator 10.0.0.0/24 scram-sha-256
    - host all all 0.0.0.0/0 scram-sha-256

  users:
    admin:
      password: 'Adm1n@Secure!'
      options:
        - createrole
        - createdb
    replicator:
      password: 'R3pl1c@P@ss!'
      options:
        - replication

postgresql:
  listen: 0.0.0.0:5432
  connect_address: 10.0.0.1:5432       # IP node ini
  data_dir: /var/lib/postgresql/17/main
  bin_dir: /usr/lib/postgresql/17/bin
  pgpass: /tmp/pgpass
  authentication:
    replication:
      username: replicator
      password: 'R3pl1c@P@ss!'
    superuser:
      username: postgres
      password: 'Pgr00t@Secure!'

tags:
  nofailover: false       # true = node ini tidak pernah jadi primary
  noloadbalance: false    # true = tidak menerima load balanced read
  clonefrom: false
  nosync: false           # true = tidak masuk sync standby list`}</Code>
    </Block>

    <Block title="Menjalankan & Mengelola Patroni" color="#fbbf24">
      <Code color="#fef9c3">{`# ── Systemd unit /etc/systemd/system/patroni.service ─────────
[Unit]
Description=Patroni PostgreSQL HA
After=syslog.target network.target

[Service]
Type=simple
User=postgres
ExecStart=/usr/local/bin/patroni /etc/patroni/patroni.yml
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target

# ── Start cluster ─────────────────────────────────────────────
systemctl daemon-reload
systemctl enable patroni
systemctl start patroni

# ── Status cluster ────────────────────────────────────────────
patronictl -c /etc/patroni/patroni.yml list

# Contoh output:
# + Cluster: pg-cluster ----+----+-----------+
# | Member | Host           | Role    | State   | TL | Lag in MB |
# +--------+----------------+---------+---------+----+-----------+
# | node1  | 10.0.0.1:5432  | Leader  | running |  1 |           |
# | node2  | 10.0.0.2:5432  | Replica | running |  1 |       0.0 |
# | node3  | 10.0.0.3:5432  | Replica | running |  1 |       0.0 |

# ── Operasi cluster ───────────────────────────────────────────
patronictl -c /etc/patroni/patroni.yml switchover pg-cluster  # planned switchover
patronictl -c /etc/patroni/patroni.yml failover  pg-cluster   # force failover
patronictl -c /etc/patroni/patroni.yml pause     pg-cluster   # pause auto-failover (maintenance)
patronictl -c /etc/patroni/patroni.yml resume    pg-cluster   # resume
patronictl -c /etc/patroni/patroni.yml reinit    pg-cluster node2  # reinit replica

# ── Edit config DCS (berlaku ke semua node) ───────────────────
patronictl -c /etc/patroni/patroni.yml edit-config pg-cluster`}</Code>
    </Block>
  </div>
)

// ─── PGBOUNCER & VIP ─────────────────────────────────────────────────────────

const ConnectionVip = () => (
  <div>
    <h3 style={{ color: '#64c8ff', fontWeight: 'bold', fontSize: '20px', marginBottom: '4px' }}>Koneksi & Virtual IP</h3>
    <p style={{ color: '#708090', fontSize: '16px', marginBottom: '20px' }}>
      Aplikasi tidak boleh connect langsung ke IP node — karena IP node bisa berubah saat failover. Gunakan Virtual IP (VIP) via Keepalived atau HAProxy untuk transparansi, dan pgBouncer untuk connection pooling.
    </p>

    <Block title="HAProxy — Router R/W vs Read-Only" color="#64c8ff">
      <Code>{`# /etc/haproxy/haproxy.cfg

global
    maxconn 100

defaults
    log     global
    mode    tcp
    retries 2
    timeout client  30m
    timeout connect 4s
    timeout server  30m
    timeout check   5s

# ── Primary (READ/WRITE) ──────────────────────────────────────
listen postgres_primary
    bind *:5000
    option httpchk GET /master       # Patroni REST: 200 jika node adalah Leader
    http-check expect status 200
    default-server inter 3s fall 3 rise 2 on-marked-down shutdown-sessions
    server node1 10.0.0.1:5432 maxconn 100 check port 8008
    server node2 10.0.0.2:5432 maxconn 100 check port 8008
    server node3 10.0.0.3:5432 maxconn 100 check port 8008

# ── Replicas (READ-ONLY) ──────────────────────────────────────
listen postgres_replicas
    bind *:5001
    balance roundrobin
    option httpchk GET /replica      # Patroni REST: 200 jika node adalah Replica
    http-check expect status 200
    default-server inter 3s fall 3 rise 2 on-marked-down shutdown-sessions
    server node1 10.0.0.1:5432 maxconn 100 check port 8008
    server node2 10.0.0.2:5432 maxconn 100 check port 8008
    server node3 10.0.0.3:5432 maxconn 100 check port 8008

# ── Stats dashboard ───────────────────────────────────────────
listen stats
    bind *:7000
    stats enable
    stats uri /`}</Code>
      <Note>Patroni REST API endpoint: GET /master → 200 jika leader, 503 jika bukan. GET /replica → 200 jika replica sehat.</Note>
    </Block>

    <Block title="Keepalived — Virtual IP (VIP)" color="#a78bfa">
      <Code color="#e2d9f3">{`# /etc/keepalived/keepalived.conf  (di haproxy node 1 — MASTER)

vrrp_script chk_haproxy {
    script "killall -0 haproxy"   # cek apakah haproxy berjalan
    interval 2
    weight 2
}

vrrp_instance VI_1 {
    state MASTER                  # node2 pakai BACKUP
    interface eth0
    virtual_router_id 51
    priority 101                  # node2 pakai 100
    advert_int 1

    authentication {
        auth_type PASS
        auth_pass K33p@l1v3d!
    }

    virtual_ipaddress {
        10.0.0.100/24             # VIP — ini yang didaftarkan di DNS / aplikasi
    }

    track_script {
        chk_haproxy
    }
}

# ── Restart keepalived ────────────────────────────────────────
systemctl enable keepalived
systemctl start keepalived

# ── Cek VIP aktif di node mana ───────────────────────────────
ip addr show eth0 | grep 10.0.0.100`}</Code>
    </Block>

    <Block title="pgBouncer — Connection Pooling" color="#4ade80">
      <Code color="#bbf7d0">{`# /etc/pgbouncer/pgbouncer.ini

[databases]
# arahkan ke VIP haproxy port 5000 (primary)
myapp = host=10.0.0.100 port=5000 dbname=myapp

# read replica pool
myapp_ro = host=10.0.0.100 port=5001 dbname=myapp

[pgbouncer]
listen_addr = 0.0.0.0
listen_port = 6432
auth_type    = scram-sha-256
auth_file    = /etc/pgbouncer/userlist.txt
pool_mode    = transaction           # session | transaction | statement
max_client_conn = 1000
default_pool_size = 25
min_pool_size = 5
reserve_pool_size = 5
reserve_pool_timeout = 3
server_reset_query = DISCARD ALL
log_connections = 0
log_disconnections = 0
admin_users = pgbouncer_admin

# /etc/pgbouncer/userlist.txt
# "appuser" "md5hash_atau_scram_verifier"

# ── Reload tanpa restart ──────────────────────────────────────
psql -h 127.0.0.1 -p 6432 -U pgbouncer_admin pgbouncer -c "RELOAD;"

# ── Statistik pool ────────────────────────────────────────────
psql -h 127.0.0.1 -p 6432 -U pgbouncer_admin pgbouncer -c "SHOW POOLS;"
psql -h 127.0.0.1 -p 6432 -U pgbouncer_admin pgbouncer -c "SHOW STATS;"
psql -h 127.0.0.1 -p 6432 -U pgbouncer_admin pgbouncer -c "SHOW CLIENTS;"`}</Code>
    </Block>
  </div>
)

// ─── FAILOVER & PROMOTE ───────────────────────────────────────────────────────

const Failover = () => (
  <div>
    <h3 style={{ color: '#64c8ff', fontWeight: 'bold', fontSize: '20px', marginBottom: '4px' }}>Failover & Promote</h3>
    <p style={{ color: '#708090', fontSize: '16px', marginBottom: '20px' }}>
      Failover adalah proses mempromosikan standby menjadi primary baru. Bisa terjadi otomatis (Patroni) atau manual. pg_rewind digunakan untuk menyambungkan kembali old-primary yang tertinggal.
    </p>

    <Block title="Planned Switchover (Zero Downtime)" color="#4ade80">
      <div style={{ marginBottom: '12px' }}>
        {[
          { n: '1', t: 'Pause auto-failover', d: 'Patroni pause agar tidak ada failover tak terduga selama proses.' },
          { n: '2', t: 'Switchover via patronictl', d: 'Patroni drain koneksi, flush WAL, lalu promote standby target. Old primary menjadi replica baru.' },
          { n: '3', t: 'Verifikasi cluster', d: 'Pastikan leader baru aktif, semua replica terhubung, lag = 0.' },
          { n: '4', t: 'Resume auto-failover', d: 'Patroni resume untuk melanjutkan proteksi HA.' },
        ].map(s => <Step key={s.n} number={s.n} color="#4ade80" title={s.t} desc={s.d} />)}
      </div>
      <Code color="#bbf7d0">{`# Switchover ke node2 secara eksplisit
patronictl -c /etc/patroni/patroni.yml switchover pg-cluster \\
  --master node1 --candidate node2 --scheduled now

# Cek hasilnya
patronictl -c /etc/patroni/patroni.yml list`}</Code>
    </Block>

    <Block title="Manual Failover (Tanpa Patroni)" color="#fbbf24">
      <Code color="#fef9c3">{`# ── 1. Cek status WAL di semua standby ───────────────────────
-- Di setiap standby:
SELECT pg_last_wal_receive_lsn(),
       pg_last_wal_replay_lsn(),
       pg_last_xact_replay_timestamp();

-- Pilih standby dengan replay_lsn paling tinggi (paling sedikit lag)

# ── 2. Stop primary jika masih berjalan ──────────────────────
pg_ctl stop -D /var/lib/postgresql/17/main -m fast

# ── 3. Promote standby terpilih ──────────────────────────────
pg_ctl promote -D /var/lib/postgresql/17/main
-- atau buat file trigger:
touch /tmp/postgresql.trigger.5432

# ── 4. Cek standby sudah menjadi primary ─────────────────────
psql -c "SELECT pg_is_in_recovery();"
-- Harus mengembalikan: f (false)

# ── 5. Arahkan aplikasi ke primary baru ──────────────────────
-- Update DNS / VIP / pgBouncer config`}</Code>
    </Block>

    <Block title="pg_rewind — Sambungkan Kembali Old Primary" color="#f87171">
      <Note>Setelah failover, old primary memiliki timeline berbeda. Jangan start ulang tanpa pg_rewind — akan split-brain!</Note>
      <Code color="#fecaca">{`# ── Prasyarat: wal_log_hints=on atau data_checksums ──────────

# ── 1. Pastikan primary baru berjalan ────────────────────────
psql -h new_primary -c "SELECT pg_is_in_recovery();"  -- harus: f

# ── 2. Stop old primary jika belum ───────────────────────────
pg_ctl stop -D /var/lib/postgresql/17/main -m immediate

# ── 3. Jalankan pg_rewind ─────────────────────────────────────
pg_rewind \\
  --target-pgdata=/var/lib/postgresql/17/main \\
  --source-server="host=10.0.0.2 user=postgres dbname=postgres" \\
  --progress

# ── 4. Buat standby.signal & recovery config ─────────────────
touch /var/lib/postgresql/17/main/standby.signal

cat >> /var/lib/postgresql/17/main/postgresql.auto.conf << 'EOF'
primary_conninfo = 'host=10.0.0.2 port=5432 user=replicator password=R3pl1c@P@ss!'
EOF

# ── 5. Start sebagai replica baru ─────────────────────────────
pg_ctl start -D /var/lib/postgresql/17/main

# ── 6. Verifikasi terhubung ke primary baru ──────────────────
psql -c "SELECT * FROM pg_stat_wal_receiver;"`}</Code>
    </Block>
  </div>
)

// ─── MONITORING ───────────────────────────────────────────────────────────────

const Monitoring = () => (
  <div>
    <h3 style={{ color: '#64c8ff', fontWeight: 'bold', fontSize: '20px', marginBottom: '4px' }}>Monitoring HA Cluster</h3>
    <p style={{ color: '#708090', fontSize: '16px', marginBottom: '20px' }}>
      Monitoring replication lag, slot bloat, dan cluster state adalah kunci HA yang sehat. Alert harus terpasang sebelum masalah terjadi.
    </p>

    <Block title="pg_stat_replication — Di Primary" color="#64c8ff">
      <Code>{`-- Status semua replica yang terhubung
SELECT
  application_name,
  client_addr,
  state,                          -- startup | catchup | streaming
  sync_state,                     -- async | sync | potential | quorum
  sent_lsn,
  write_lsn,
  flush_lsn,
  replay_lsn,
  -- Hitung lag dalam bytes
  pg_wal_lsn_diff(sent_lsn,  replay_lsn) AS lag_bytes,
  -- Hitung lag dalam waktu
  now() - pg_last_xact_replay_timestamp() AS replay_lag,
  write_lag,
  flush_lag,
  replay_lag
FROM pg_stat_replication
ORDER BY lag_bytes DESC;

-- Alert jika ada replica lag > 64 MB
SELECT application_name, client_addr,
       pg_wal_lsn_diff(pg_current_wal_lsn(), replay_lsn) AS lag_bytes
FROM pg_stat_replication
WHERE pg_wal_lsn_diff(pg_current_wal_lsn(), replay_lsn) > 67108864;`}</Code>
    </Block>

    <Block title="pg_stat_wal_receiver — Di Replica" color="#a78bfa">
      <Code color="#e2d9f3">{`-- Status koneksi ke primary dari sisi replica
SELECT
  status,
  receive_start_lsn,
  received_lsn,
  last_msg_send_time,
  last_msg_receipt_time,
  latest_end_lsn,
  latest_end_time,
  sender_host,
  conninfo
FROM pg_stat_wal_receiver;`}</Code>
    </Block>

    <Block title="Replication Slots — Monitor Bloat" color="#f87171">
      <Code color="#fecaca">{`-- Semua slot dan lag-nya
SELECT
  slot_name,
  slot_type,
  active,
  active_pid,
  pg_wal_lsn_diff(pg_current_wal_lsn(), confirmed_flush_lsn) AS lag_bytes,
  pg_size_pretty(
    pg_wal_lsn_diff(pg_current_wal_lsn(), confirmed_flush_lsn)
  ) AS lag_pretty
FROM pg_replication_slots
ORDER BY lag_bytes DESC;

-- ⚠ Inactive slot dengan lag > 1 GB = bahaya! WAL tidak bisa dibersihkan
-- Drop slot yang tidak lagi dipakai:
SELECT pg_drop_replication_slot('slot_name_lama');`}</Code>
    </Block>

    <Block title="Patroni REST API & Alerting" color="#fbbf24">
      <Code color="#fef9c3">{`# ── Health check endpoint ────────────────────────────────────
# 200 OK  = node adalah Leader (primary)
curl -s http://10.0.0.1:8008/master

# 200 OK  = node adalah Replica sehat
curl -s http://10.0.0.1:8008/replica

# 200 OK  = node adalah Replica dengan lag < threshold
curl -s http://10.0.0.1:8008/replica?lag=1048576

# JSON status cluster
curl -s http://10.0.0.1:8008/cluster | python3 -m json.tool

# ── Prometheus metrics (patroni >= 2.1) ───────────────────────
curl -s http://10.0.0.1:8008/metrics

# Metrik penting:
# patroni_master         1 = node ini adalah leader
# patroni_replica        1 = node ini adalah replica
# patroni_xlog_location  posisi WAL saat ini
# patroni_replication_lag lag dalam bytes

# ── Alert rules (Prometheus AlertManager) ─────────────────────
# - patroni_master == 0 selama > 30 detik → no leader!
# - patroni_replication_lag > 104857600 → lag > 100 MB
# - pg_replication_slots inactive > 0 → slot tidak aktif`}</Code>
    </Block>
  </div>
)

// ─── DISASTER RECOVERY ───────────────────────────────────────────────────────

const DisasterRecovery = () => (
  <div>
    <h3 style={{ color: '#64c8ff', fontWeight: 'bold', fontSize: '20px', marginBottom: '4px' }}>Disaster Recovery</h3>
    <p style={{ color: '#708090', fontSize: '16px', marginBottom: '20px' }}>
      DR mencakup standby di region berbeda, strategi backup dengan pgBackRest/WAL-G, prosedur failover lintas datacenter, dan drill rutin untuk memvalidasi RTO/RPO.
    </p>

    <Block title="DR Standby — Region Lain" color="#64c8ff">
      <Code>{`# ── Di DR node (region lain): buat base backup dari primary ──
pg_basebackup \\
  -h 10.0.0.1 -U replicator \\
  -D /var/lib/postgresql/17/main \\
  -P -R --wal-method=stream \\
  --checkpoint=fast

# -R otomatis membuat standby.signal dan primary_conninfo

# Atau stream melalui WAL archive (tidak perlu direct connect):
# postgresql.auto.conf di DR node:
# primary_conninfo = '' (kosong — pakai archive)
# restore_command  = 'pgbackrest --stanza=main archive-get %f %p'

# ── Start DR standby ─────────────────────────────────────────
systemctl start postgresql

# ── Verifikasi ───────────────────────────────────────────────
psql -c "SELECT pg_is_in_recovery(), pg_last_wal_replay_lsn();"
psql -c "SELECT now() - pg_last_xact_replay_timestamp() AS dr_lag;"`}</Code>
    </Block>

    <Block title="pgBackRest — Backup & WAL Archive" color="#4ade80">
      <Code color="#bbf7d0">{`# /etc/pgbackrest/pgbackrest.conf

[global]
repo1-path=/var/lib/pgbackrest
repo1-retention-full=2          # simpan 2 full backup
repo1-retention-diff=7
repo1-cipher-type=aes-256-cbc
repo1-cipher-pass=B@ckupP@ss!

# S3 / Object Storage (opsional)
# repo1-type=s3
# repo1-s3-bucket=pg-backup-bucket
# repo1-s3-endpoint=s3.ap-southeast-1.amazonaws.com
# repo1-s3-region=ap-southeast-1

[global:archive-push]
compress-level=3

[main]                           # stanza name
pg1-path=/var/lib/postgresql/17/main
pg1-host=10.0.0.1               # primary host

# ── Inisialisasi stanza ───────────────────────────────────────
pgbackrest --stanza=main stanza-create

# ── Full backup ───────────────────────────────────────────────
pgbackrest --stanza=main --type=full backup

# ── Differential backup ───────────────────────────────────────
pgbackrest --stanza=main --type=diff backup

# ── Incremental backup ────────────────────────────────────────
pgbackrest --stanza=main --type=incr backup

# ── Lihat backup info ─────────────────────────────────────────
pgbackrest --stanza=main info

# ── PITR Restore ke waktu tertentu ───────────────────────────
pgbackrest --stanza=main --delta \\
  --type=time "--target=2025-06-15 14:30:00+07" \\
  --target-action=promote restore`}</Code>
      <Note>Archive command di postgresql.conf: archive_command = 'pgbackrest --stanza=main archive-push %p'</Note>
    </Block>

    <Block title="DR Failover Runbook" color="#f87171">
      <div style={{ marginBottom: '12px' }}>
        {[
          { n: '1', t: 'Konfirmasi primary datacenter down', d: 'Cek monitoring, coba ping semua node di DC primary. Minimal 2 orang on-call konfirmasi sebelum DR failover.' },
          { n: '2', t: 'Stop WAL archive (opsional)', d: 'Mencegah WAL dari DC lama masuk ke DR setelah promote.' },
          { n: '3', t: 'Promote DR standby', d: 'pg_ctl promote atau touch /tmp/failover.trigger di DR node.' },
          { n: '4', t: 'Update DNS / Load Balancer', d: 'Arahkan CNAME/A record ke IP DR node. TTL rendah (60s) mempercepat propagasi.' },
          { n: '5', t: 'Verifikasi aplikasi', d: 'Cek koneksi aplikasi, jalankan smoke test, monitor error rate.' },
          { n: '6', t: 'Catat waktu RTO aktual', d: 'Bandingkan dengan RTO target. Dokumen sebagai insiden untuk post-mortem.' },
        ].map(s => <Step key={s.n} number={s.n} color="#f87171" title={s.t} desc={s.d} />)}
      </div>
      <Code color="#fecaca">{`# Promote DR standby
pg_ctl promote -D /var/lib/postgresql/17/main

# Verifikasi
psql -h dr-node -c "SELECT pg_is_in_recovery();"    -- harus: f
psql -h dr-node -c "SELECT now(), version();"       -- pastikan bisa query

# Update DNS (contoh dengan AWS CLI)
aws route53 change-resource-record-sets \\
  --hosted-zone-id Z123456 \\
  --change-batch file://dr-dns-update.json`}</Code>
    </Block>

    <Block title="DR Drill — Latihan Rutin" color="#a78bfa">
      <Note>DR drill harus dilakukan minimal 2x setahun. Tanpa drill, runbook adalah fiksi.</Note>
      <Code color="#e2d9f3">{`# ── Checklist DR Drill ───────────────────────────────────────

□ Notifikasi semua stakeholder (DR drill terjadwal)
□ Buat snapshots / checkpoint backup sebelum drill
□ Simulate primary failure (stop primary atau block network)
□ Ukur waktu hingga DR standby promote otomatis / manual
□ Cek data integrity: checksum, row count di tabel kritis
□ Jalankan smoke test aplikasi di atas DR node
□ Catat RTO aktual vs target
□ Failback: restore primary asli, sync kembali dari DR
□ Post-mortem: apa yang lambat? apa yang gagal?

# ── Data integrity check setelah failover ────────────────────
-- Bandingkan row count tabel kritis antara backup terakhir vs DR
SELECT schemaname, tablename,
       n_live_tup AS approx_rows
FROM pg_stat_user_tables
ORDER BY n_live_tup DESC
LIMIT 20;

-- Cek pg_dump tanpa error
pg_dump -h dr-node -U postgres myapp --schema-only -f /dev/null && echo "Schema OK"`}</Code>
    </Block>
  </div>
)

// ─── CHECKLIST ────────────────────────────────────────────────────────────────

const Checklist = () => {
  const sections = [
    {
      title: 'Infrastruktur Cluster',
      color: '#64c8ff',
      items: [
        'Minimal 3 node PostgreSQL (1 primary + 2 standby) untuk quorum',
        'etcd / Consul cluster minimal 3 node terpisah dari PostgreSQL',
        'Patroni terinstall dan berjalan di semua node',
        'HAProxy / pgBouncer sebagai connection router',
        'Virtual IP (Keepalived) untuk transparansi failover ke aplikasi',
        'Semua node di availability zone berbeda',
      ],
    },
    {
      title: 'Replikasi & WAL',
      color: '#4ade80',
      items: [
        'wal_level = replica, wal_log_hints = on',
        'data_checksums diaktifkan saat initdb',
        'max_replication_slots dan max_wal_senders cukup',
        'Replication lag dipantau dan di-alert jika > 10 MB',
        'Tidak ada inactive replication slot',
        'archive_mode = on, archive_command berfungsi',
      ],
    },
    {
      title: 'Backup & DR',
      color: '#fbbf24',
      items: [
        'Full backup terjadwal minimal 1x seminggu (pgBackRest / WAL-G)',
        'WAL archive berjalan tanpa error setiap hari',
        'Backup disimpan di storage terpisah (S3 / off-site)',
        'PITR restore pernah diuji dan berhasil',
        'DR standby aktif di region / datacenter berbeda',
        'DR drill dilakukan minimal 2x setahun',
      ],
    },
    {
      title: 'Monitoring & Alerting',
      color: '#a78bfa',
      items: [
        'pg_stat_replication lag di-monitor real-time',
        'Patroni leader change di-alert ke Slack / PagerDuty',
        'Disk usage WAL dan data directory di-alert > 80%',
        'Connection pool utilization di-monitor',
        'Backup sukses/gagal di-alert setiap hari',
        'RTO drill result dicatat dan dibandingkan dengan target',
      ],
    },
    {
      title: 'Security',
      color: '#f87171',
      items: [
        'Replication user terpisah dengan password kuat',
        'pg_hba.conf hanya izinkan IP spesifik untuk replikasi',
        'Koneksi replikasi menggunakan scram-sha-256',
        'Backup dienkripsi (pgBackRest cipher-type)',
        'Akses ke DCS (etcd) dibatasi dan diamankan dengan TLS',
      ],
    },
  ]

  return (
    <div>
      <h3 style={{ color: '#64c8ff', fontWeight: 'bold', fontSize: '20px', marginBottom: '4px' }}>Production Readiness Checklist</h3>
      <p style={{ color: '#708090', fontSize: '16px', marginBottom: '20px' }}>
        Gunakan checklist ini sebelum go-live cluster HA/DR production.
      </p>
      {sections.map(sec => (
        <Block key={sec.title} title={sec.title} color={sec.color}>
          <ul style={{ margin: 0, paddingLeft: '18px' }}>
            {sec.items.map(item => (
              <li key={item} style={{ color: '#a0c8ff', fontSize: '15px', lineHeight: '2', listStyleType: 'none', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                <span style={{ color: sec.color, marginTop: '2px', flexShrink: 0 }}>▸</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Block>
      ))}
    </div>
  )
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function HaDr() {
  const [activeTab, setActiveTab] = useState('overview')

  const content = {
    overview:    <Overview />,
    patroni:     <Patroni />,
    pgbouncer:   <ConnectionVip />,
    failover:    <Failover />,
    monitoring:  <Monitoring />,
    dr:          <DisasterRecovery />,
    checklist:   <Checklist />,
  }

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '32px 0' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ color: '#ffffff', fontWeight: 'bold', fontSize: '28px', marginBottom: '8px' }}>
          🛡️ High Availability & Disaster Recovery
        </h1>
        <p style={{ color: '#708090', fontSize: '16px' }}>
          Patroni cluster, auto-failover, pg_rewind, DR standby, dan production readiness checklist.
        </p>
      </div>

      {/* Tab bar */}
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
