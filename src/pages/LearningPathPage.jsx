import React, { useState } from 'react'
import { ChevronRight, Clock, Target, ClipboardCheck } from 'lucide-react'
import { Link } from 'react-router-dom'

const paths = [
  {
    id: 'beginner',
    title: '🟢 Beginner Path',
    duration: '3–4 minggu',
    description: 'Mulai di sini jika kamu baru mengenal PostgreSQL — dari instalasi hingga query dasar',
    color: '#4ade80',
    modules: [
      {
        order: 1,
        title: '🎛️ Install PostgreSQL',
        path: '/install-postgres',
        description: 'Instalasi PostgreSQL dari source code — download, configure, make, initdb',
        estimatedTime: '2–3 jam',
        keyTopics: ['./configure', 'make install', 'initdb', 'PGDATA'],
      },
      {
        order: 2,
        title: '🔢 RDBMS & Data Types',
        path: '/rdbms-types',
        description: 'Tipe data PostgreSQL — numeric, text, date/time, boolean, JSON, array',
        estimatedTime: '2–3 jam',
        keyTopics: ['INTEGER', 'TEXT', 'TIMESTAMPTZ', 'JSONB', 'UUID', 'BOOLEAN'],
      },
      {
        order: 3,
        title: '📝 SQL Syntax',
        path: '/sql-syntax',
        description: 'DDL, DML, SELECT, JOIN, agregasi, CTE, index, constraint, transaksi dasar',
        estimatedTime: '4–6 jam',
        keyTopics: ['CREATE/ALTER/DROP', 'INSERT/UPDATE/DELETE', 'JOIN', 'GROUP BY', 'WITH', 'INDEX'],
      },
      {
        order: 4,
        title: '🎛️ pg_ctl',
        path: '/pg-ctl',
        description: 'Kontrol server PostgreSQL — start, stop, reload, status, signals',
        estimatedTime: '2 jam',
        keyTopics: ['start', 'stop -m smart/fast/immediate', 'reload', 'promote', 'SIGHUP'],
      },
      {
        order: 5,
        title: '🔐 Host-Based Authentication',
        path: '/host-based-auth',
        description: 'Konfigurasi pg_hba.conf — tipe koneksi, auth method, keamanan dasar',
        estimatedTime: '2 jam',
        keyTopics: ['pg_hba.conf', 'local/host/hostssl', 'trust/md5/scram-sha-256', 'reload'],
      },
      {
        order: 6,
        title: '🔄 State Machine',
        path: '/state-machine',
        description: 'State machine pattern di database — implementasi status dengan CHECK constraint',
        estimatedTime: '2–3 jam',
        keyTopics: ['states', 'transitions', 'guards', 'CHECK constraint', 'trigger'],
      },
    ],
  },
  {
    id: 'intermediate',
    title: '🟡 Intermediate Path',
    duration: '5–7 minggu',
    description: 'Perdalam desain, performa, dan operasional PostgreSQL sehari-hari',
    color: '#fbbf24',
    modules: [
      {
        order: 1,
        title: '🏗️ Database Design',
        path: '/database-design',
        description: 'Prinsip desain schema — normalisasi, relasi, tipe data tepat, naming convention',
        estimatedTime: '3–4 jam',
        keyTopics: ['normalisasi 1NF–3NF', 'FK & referential integrity', 'ER diagram', 'physical design'],
      },
      {
        order: 2,
        title: '📝 SQL Syntax (lanjutan)',
        path: '/sql-syntax',
        description: 'Window function, CTE rekursif, UPSERT, EXPLAIN, PL/pgSQL, JSON operator',
        estimatedTime: '4–5 jam',
        keyTopics: ['OVER()', 'WITH RECURSIVE', 'ON CONFLICT', 'EXPLAIN ANALYZE', 'JSONB operator'],
      },
      {
        order: 3,
        title: '⚗️ ACID & Locking',
        path: '/acid-concepts',
        description: 'Transaksi ACID, isolation level, lock, deadlock, MVCC',
        estimatedTime: '3–4 jam',
        keyTopics: ['Atomicity', 'Isolation levels', 'SELECT FOR UPDATE', 'deadlock', 'dirty read'],
      },
      {
        order: 4,
        title: '🔄 pg_ctl vs systemd',
        path: '/pg-ctl-vs-systemd',
        description: 'Perbandingan mendalam — kapan pakai pg_ctl vs systemd di production',
        estimatedTime: '2–3 jam',
        keyTopics: ['systemctl enable/start', 'unit file', 'Restart=on-failure', 'journalctl'],
      },
      {
        order: 5,
        title: '🗂️ Tablespaces',
        path: '/tablespaces',
        description: 'Pemetaan lokasi fisik data — strategi SSD/HDD, hirarki cluster',
        estimatedTime: '2–3 jam',
        keyTopics: ['pg_default', 'pg_global', 'CREATE TABLESPACE', 'symlink', 'OLTP vs OLAP'],
      },
      {
        order: 6,
        title: '🗂️ Data Partitioning',
        path: '/data-partitioning',
        description: 'Range, List, Hash partitioning — partition pruning, index lokal, TOAST',
        estimatedTime: '3–4 jam',
        keyTopics: ['PARTITION BY RANGE/LIST/HASH', 'partition pruning', 'local index', 'TOAST'],
      },
      {
        order: 7,
        title: '💾 Backup & Restore',
        path: '/backup-restore',
        description: 'Cold/warm/hot backup, pg_dump, pg_basebackup, PITR',
        estimatedTime: '4–5 jam',
        keyTopics: ['cold/warm/hot backup', 'pg_dump', 'pg_basebackup', 'PITR', 'WAL archive'],
      },
      {
        order: 8,
        title: '⚡ Benchmarking',
        path: '/benchmarking',
        description: 'pgbench, EXPLAIN ANALYZE, pg_stat_statements, auto_explain',
        estimatedTime: '3–4 jam',
        keyTopics: ['pgbench -i -s', 'TPS', 'EXPLAIN ANALYZE', 'buffer hit ratio', 'pg_stat_statements'],
      },
    ],
  },
  {
    id: 'advanced',
    title: '🔴 Advanced Path',
    duration: '8–12 minggu',
    description: 'Internals PostgreSQL, HA/DR, replikasi, scaling, monitoring production',
    color: '#f87171',
    modules: [
      {
        order: 1,
        title: '🧠 Memory Management',
        path: '/memory-management',
        description: 'Virtual Address Space, segmen memori, paging, TLB, kernel vs user space',
        estimatedTime: '3–4 jam',
        keyTopics: ['VAS', 'heap vs stack', 'BSS/Text/Data segment', 'paging', 'TLB', 'process isolation'],
      },
      {
        order: 2,
        title: '📝 Transaction Log (WAL)',
        path: '/transaction-log',
        description: 'WAL internals, LSN, MVCC, checkpoint, crash recovery, pg_waldump',
        estimatedTime: '4–5 jam',
        keyTopics: ['WAL', 'LSN', 'XMIN/XMAX', 'checkpoint', 'MVCC', 'pg_waldump', 'XID wraparound'],
      },
      {
        order: 3,
        title: '📡 Replication',
        path: '/replication',
        description: 'Streaming & logical replication, replication slot, failover, pg_rewind',
        estimatedTime: '4–6 jam',
        keyTopics: ['streaming replication', 'logical replication', 'replication slot', 'pg_promote', 'WAL sender/receiver'],
      },
      {
        order: 4,
        title: '🛡️ High Availability & DR',
        path: '/ha-dr',
        description: 'Patroni, etcd, pgBouncer, VIP, RTO/RPO, disaster recovery drill',
        estimatedTime: '5–7 jam',
        keyTopics: ['RTO/RPO', 'Patroni', 'etcd', 'pgBouncer', 'VIP', 'pg_rewind', 'DR drill'],
      },
      {
        order: 5,
        title: '📈 Scaling',
        path: '/scaling',
        description: 'Vertical & horizontal scaling, connection pooling, read replica, sharding, FDW',
        estimatedTime: '4–5 jam',
        keyTopics: ['scale up/out', 'pgBouncer pool mode', 'read replica', 'sharding', 'FDW', 'shared_buffers'],
      },
      {
        order: 6,
        title: '📊 Monitoring',
        path: '/monitoring',
        description: 'pg_stat_activity, locks, vacuum, bloat, Prometheus/Grafana, alerting',
        estimatedTime: '4–5 jam',
        keyTopics: ['pg_stat_activity', 'pg_stat_statements', 'cache hit ratio', 'autovacuum', 'postgres_exporter', 'alert rules'],
      },
    ],
  },
]

const colorMap = {
  '#4ade80': { bg: 'rgba(74,222,128,0.08)', border: 'rgba(74,222,128,0.25)', header: 'rgba(74,222,128,0.12)' },
  '#fbbf24': { bg: 'rgba(251,191,36,0.08)', border: 'rgba(251,191,36,0.25)', header: 'rgba(251,191,36,0.12)' },
  '#f87171': { bg: 'rgba(248,113,113,0.08)', border: 'rgba(248,113,113,0.25)', header: 'rgba(248,113,113,0.12)' },
}

export default function LearningPathPage() {
  const [expanded, setExpanded] = useState('beginner')

  const totalModules = paths.reduce((s, p) => s + p.modules.length, 0)

  return (
    <div style={{ minHeight: '100vh', padding: '40px 24px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#e0f2ff', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
            <Target size={36} style={{ color: '#64c8ff' }} />
            Learning Paths 🎯
          </h1>
          <p style={{ color: '#a0c8ff', fontSize: '18px', maxWidth: '600px', margin: '0 auto 16px' }}>
            Ikuti jalur belajar terstruktur sesuai level — dari instalasi PostgreSQL hingga HA & monitoring production.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap' }}>
            {paths.map(p => (
              <span key={p.id} style={{ color: p.color, fontSize: '14px', fontWeight: '600' }}>
                {p.title.split(' ')[0]} {p.modules.length} modul
              </span>
            ))}
            <span style={{ color: '#708090', fontSize: '14px' }}>· Total {totalModules} modul</span>
          </div>
        </div>

        {/* Paths */}
        <div style={{ display: 'grid', gap: '20px' }}>
          {paths.map(path => {
            const c = colorMap[path.color]
            const isOpen = expanded === path.id

            return (
              <div
                key={path.id}
                style={{
                  background: 'rgba(26,35,50,0.8)',
                  border: `2px solid ${isOpen ? path.color : c.border}`,
                  borderRadius: '12px',
                  overflow: 'hidden',
                  transition: 'border-color 0.2s',
                }}
              >
                {/* Accordion header */}
                <button
                  onClick={() => setExpanded(isOpen ? null : path.id)}
                  style={{
                    width: '100%',
                    padding: '20px 24px',
                    background: isOpen ? c.header : 'rgba(26,35,50,0.8)',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    textAlign: 'left',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = c.header)}
                  onMouseLeave={e => (e.currentTarget.style.background = isOpen ? c.header : 'rgba(26,35,50,0.8)')}
                >
                  <div>
                    <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#e0f2ff', marginBottom: '4px' }}>
                      {path.title}
                    </h2>
                    <p style={{ color: '#a0c8ff', fontSize: '15px', marginBottom: '8px' }}>{path.description}</p>
                    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                      <span style={{ color: '#708090', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={13} /> {path.duration}
                      </span>
                      <span style={{ color: path.color, fontSize: '14px', fontWeight: '600' }}>
                        {path.modules.length} modul
                      </span>
                    </div>
                  </div>
                  <ChevronRight
                    size={22}
                    style={{ color: path.color, flexShrink: 0, transition: 'transform 0.25s', transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}
                  />
                </button>

                {/* Module list */}
                {isOpen && (
                  <div style={{ padding: '20px 24px', background: 'rgba(0,0,0,0.15)', borderTop: `1px solid ${c.border}` }}>
                    <div style={{ display: 'grid', gap: '14px' }}>
                      {path.modules.map((mod, idx) => (
                        <div key={mod.order} style={{ display: 'flex', gap: '14px' }}>
                          {/* Step indicator */}
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '44px' }}>
                            <div style={{
                              width: '36px', height: '36px', borderRadius: '50%',
                              background: c.bg, border: `2px solid ${path.color}`,
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              color: path.color, fontWeight: 'bold', fontSize: '15px', flexShrink: 0,
                            }}>
                              {mod.order}
                            </div>
                            {idx < path.modules.length - 1 && (
                              <div style={{ width: '2px', flex: 1, minHeight: '20px', background: c.border, margin: '6px 0' }} />
                            )}
                          </div>

                          {/* Card */}
                          <Link
                            to={mod.path}
                            style={{
                              flex: 1,
                              background: c.bg,
                              border: `1px solid ${c.border}`,
                              borderRadius: '8px',
                              padding: '14px 16px',
                              textDecoration: 'none',
                              transition: 'border-color 0.15s, background 0.15s',
                              marginBottom: idx < path.modules.length - 1 ? '0' : '0',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = path.color; e.currentTarget.style.background = `${path.color}18` }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = c.border; e.currentTarget.style.background = c.bg }}
                          >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', marginBottom: '6px' }}>
                              <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#e0f2ff', margin: 0 }}>{mod.title}</h3>
                              <span style={{
                                fontSize: '12px', background: `${path.color}20`, color: path.color,
                                padding: '3px 8px', borderRadius: '4px', fontWeight: '600', whiteSpace: 'nowrap', flexShrink: 0,
                              }}>
                                <Clock size={11} style={{ display: 'inline', marginRight: '3px' }} />
                                {mod.estimatedTime}
                              </span>
                            </div>
                            <p style={{ color: '#a0c8ff', fontSize: '14px', margin: '0 0 8px', lineHeight: 1.5 }}>{mod.description}</p>
                            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                              {mod.keyTopics.map(t => (
                                <span key={t} style={{
                                  fontSize: '12px', background: 'rgba(100,200,255,0.1)', color: '#64c8ff',
                                  padding: '2px 7px', borderRadius: '3px', border: '1px solid rgba(100,200,255,0.2)',
                                }}>
                                  {t}
                                </span>
                              ))}
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>

                    {/* Path footer */}
                    <div style={{
                      marginTop: '20px', padding: '14px 16px',
                      background: c.bg, border: `1px solid ${c.border}`,
                      borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px',
                    }}>
                      <p style={{ color: path.color, fontWeight: '600', fontSize: '14px', margin: 0 }}>
                        ✅ Selesaikan semua {path.modules.length} modul untuk menguasai level ini
                      </p>
                      <Link
                        to="/mock-test"
                        style={{
                          display: 'flex', alignItems: 'center', gap: '6px',
                          background: `${path.color}20`, border: `1px solid ${path.color}`,
                          color: path.color, borderRadius: '6px', padding: '6px 14px',
                          textDecoration: 'none', fontSize: '13px', fontWeight: '600',
                        }}
                      >
                        <ClipboardCheck size={14} /> Tes Pengetahuan
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Tips */}
        <div style={{
          marginTop: '40px',
          background: 'rgba(100,200,255,0.06)',
          border: '1px solid rgba(100,200,255,0.2)',
          borderRadius: '12px',
          padding: '24px',
        }}>
          <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#64c8ff', marginBottom: '16px' }}>
            💡 Tips Belajar
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
            {[
              { icon: '📚', title: 'Baca Dulu', desc: 'Pahami konsep sebelum langsung praktek' },
              { icon: '🧪', title: 'Praktek', desc: 'Jalankan setiap contoh di instance lokal' },
              { icon: '📝', title: 'Mock Test', desc: 'Uji pemahaman tiap modul lewat quiz' },
              { icon: '🔄', title: 'Ulangi', desc: 'Review modul yang masih ada keraguan' },
            ].map((tip, i) => (
              <div key={i} style={{ background: 'rgba(74,222,128,0.06)', borderRadius: '8px', padding: '14px', border: '1px solid rgba(74,222,128,0.15)' }}>
                <p style={{ fontSize: '26px', marginBottom: '6px' }}>{tip.icon}</p>
                <p style={{ color: '#4ade80', fontWeight: '600', marginBottom: '4px', fontSize: '14px' }}>{tip.title}</p>
                <p style={{ color: '#a0c8ff', fontSize: '13px', margin: 0 }}>{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
