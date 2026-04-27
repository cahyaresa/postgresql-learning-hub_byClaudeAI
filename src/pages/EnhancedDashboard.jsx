import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Heart, BookOpen, Clock, Star } from 'lucide-react'
import { favorites, progress, getTimeGreeting } from '@utils/helpers'

function EnhancedDashboard() {
  const [favs, setFavs] = useState([])
  const [prog, setProg] = useState({})

  useEffect(() => {
    setFavs(favorites.get())
    setProg(progress.get())
  }, [])

  const modules = [
    {
      id: 'install-postgres',
      title: '🎛️ PostgreSQL install',
      description: 'Step-by-step guide untuk install PostgreSQL di Windows, Linux, dan macOS dengan best practices.',
      path: '/install-postgres',
      icon: '⚙️',
      tags: ['install', 'PostgreSQL', 'Best Practices'],
      difficulty: 'Beginner'
    },
    {
      id: 'pg-ctl',
      title: '🎛️ PostgreSQL pg_ctl',
      description: 'Master PostgreSQL server start, stop, restart dengan pg_ctl command dan cheatsheet.',
      path: '/pg-ctl',
      icon: '⚙️',
      tags: ['pg_ctl', 'Server Management', 'PostgreSQL'],
      difficulty: 'Intermediate'
    },
    {
      id: 'pg-ctl-vs-systemd',
      title: '🔄 pg_ctl vs systemd',
      description: 'Comprehensive comparison antara traditional pg_ctl vs modern systemd Linux administration.',
      path: '/pg-ctl-vs-systemd',
      icon: '🔀',
      tags: ['systemd', 'Linux Administration', 'Modern vs Legacy'],
      difficulty: 'Advanced'
    },
    {
      id: 'host-based-auth',
      title: '🔐 Host-Based Authentication',
      description: 'pg_hba.conf control: client connections, authentication methods, dan security policies.',
      path: '/host-based-auth',
      icon: '🛡️',
      tags: ['pg_hba.conf', 'Security', 'Authentication'],
      difficulty: 'Intermediate'
    },
    {
      id: 'transaction-log',
      title: '📝 Transaction Log (WAL)',
      description: 'Write-Ahead Logging, MVCC, transaction IDs, checkpoints, recovery, dan replication.',
      path: '/transaction-log',
      icon: '📋',
      tags: ['WAL', 'MVCC', 'Recovery', 'Durability'],
      difficulty: 'Advanced'
    },
    {
      id: 'memory-management',
      title: '🗺️ Memory Management & VAS',
      description: 'Virtual Address Space, kernel space, user space, memory segments, paging, dan process isolation.',
      path: '/memory-management',
      icon: '💾',
      tags: ['Memory', 'Virtual Memory', 'Paging', 'Process Isolation'],
      difficulty: 'Advanced'
    },
    {
      id: 'tablespaces',
      title: '📁 PostgreSQL Tablespaces',
      description: 'Master tablespace management untuk optimization, performance tuning, dan storage management.',
      path: '/tablespaces',
      icon: '💾',
      tags: ['Tablespaces', 'Storage', 'Performance', 'Optimization'],
      difficulty: 'Intermediate'
    },
    {
      id: 'data-partitioning',
      title: '📊 Data Partitioning',
      description: 'Table partitioning untuk massive scalability, performance optimization, dan efficient data management.',
      path: '/data-partitioning',
      icon: '🔀',
      tags: ['Partitioning', 'Scalability', 'Performance', 'BigData'],
      difficulty: 'Advanced'
    },
    {
      id: 'rdbms-types',
      title: '🗂️ RDBMS Data Types & Table Types',
      description: 'Numeric, string, datetime, JSONB, UUID, ARRAY, dan semua jenis table di PostgreSQL.',
      path: '/rdbms-types',
      icon: '🗂️',
      tags: ['Data Types', 'Table Types', 'JSONB', 'Views'],
      difficulty: 'Intermediate'
    },
    {
      id: 'state-machine',
      title: '🔄 State Machine Pattern',
      description: 'Model, implement, and query finite state machines in PostgreSQL with transitions, guards, and audit trails.',
      path: '/state-machine',
      icon: '🔄',
      tags: ['FSM', 'Workflow', 'Transitions', 'Audit Trail'],
      difficulty: 'Advanced'
    },
    {
      id: 'database-design',
      title: '🗄️ Database Design Principles',
      description: 'Normalization, keys & constraints, relationships, indexes, design patterns & anti-patterns.',
      path: '/database-design',
      icon: '🗄️',
      tags: ['Normalization', 'Schema Design', 'Indexing', 'Best Practice'],
      difficulty: 'Intermediate'
    },
    {
      id: 'sql-syntax',
      title: '💻 SQL Syntax & Querying',
      description: 'Comprehensive SQL syntax guide with examples for SELECT, JOINs, CTEs, window functions, and more.',
      path: '/sql-syntax',
      icon: '📘',
      tags: ['SQL', 'DDL', 'DML', 'SELECT', 'JOIN', 'CTE', 'functions', 'JSONB'],
      difficulty: 'Beginner'
    },
    {
      id: 'scaling',
      title: '🚀 Scaling PostgreSQL',
      description: 'Strategies for scaling PostgreSQL: vertical scaling, read replicas, sharding, and connection pooling.',
      path: '/scaling',
      icon: '📈',
      tags: ['scaling', 'replication', 'pgBouncer', 'FDW', 'partitioning', 'read-replica'],
      difficulty: 'Advanced'
    },
    {
      id: 'acid-concept',
      title: '🔐 ACID Concept',
      description: 'Atomicity, Consistency, Isolation, Durability - the core principles of reliable transactions.',
      path: '/acid-concepts',
      icon: '🔒',
      tags: ['ACID', 'transactions', 'isolation-levels', 'MVCC'],
      difficulty: 'Intermediate'

    },
    {
      id: 'benchmarking',
      title: '⚡ Benchmarking PostgreSQL',
      description: 'Tools and techniques for benchmarking PostgreSQL performance under various workloads.',
      path: '/benchmarking',
      icon: '📊',
      tags: ['benchmarking', 'pgbench', 'EXPLAIN', 'performance', 'pg_stat_statements', 'TPS', 'latency'],
      difficulty: 'Intermediate'
    },
    {
      id: 'backup-restore',
      title: '💾 Backup & Restore',
      description: 'Comprehensive guide to PostgreSQL backup and restore strategies for data safety and disaster recovery.',
      path: '/backup-restore',
      icon: '💾',
      tags: ['backup', 'restore', 'pg_dump', 'pg_basebackup', 'WAL', 'PITR', 'cold', 'warm', 'hot'],
      difficulty: 'Intermediate'

    },
    {
      id: 'replication',
      title: '📡 Replication',
      description: 'In-depth guide to PostgreSQL replication methods for high availability and load balancing.',
      path: '/replication',
      icon: '📡',
      tags: ['replication', 'high-availability', 'load-balancing'],
      difficulty: 'Advanced'
    },
    {
      id: 'ha-dr',
      title: '🛡️ High Availability & Disaster Recovery',
      description: 'Strategies for ensuring PostgreSQL availability and data integrity during disasters.',
      path: '/ha-dr',
      icon: '🛡️',
      tags: ['HA', 'DR', 'Patroni', 'etcd', 'failover', 'pg_rewind', 'pgBackRest', 'VIP', 'HAProxy', 'RTO', 'RPO'],
      difficulty: 'Advanced'
    }, 
    {
      id: 'monitoring',
      title: '📊 Monitoring PostgreSQL',
      description: 'Tools and techniques for monitoring PostgreSQL performance and health in production.',
      path: '/monitoring',
      icon: '📊',
      tags: ['monitoring', 'pg_stat_activity', 'pg_stat_statements', 'locks', 'vacuum', 'bloat', 'prometheus', 'grafana', 'alerting', 'slow-query'],
      difficulty: 'Intermediate'
    }
  ]

  const toggleFavorite = (moduleId) => {
    favorites.toggle(moduleId)
    setFavs(favorites.get())
  }

  const favoriteModules = modules.filter(m => favs.includes(m.id))
  const getDifficultyColor = (level) => {
    return level === 'Beginner' ? 'text-green-400' : level === 'Intermediate' ? 'text-yellow-400' : 'text-red-400'
  }

  const totalProgress = Object.values(prog).length > 0 
    ? Math.round(Object.values(prog).reduce((a, b) => a + b, 0) / Object.values(prog).length)
    : 0

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Greeting Section */}
        <div className="mb-12 animate-float">
          <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#e0f2ff', marginBottom: '8px' }}>
            {getTimeGreeting()}! 👋
          </h1>
          <p style={{ color: '#a0c8ff', fontSize: '20px', marginBottom: '16px' }}>
            Welcome back to PostgreSQL Learning Hub. Continue your learning journey today!
          </p>

          {/* Quick Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginTop: '12px' }}>
            <div style={{ background: 'rgba(74, 222, 128, 0.1)', border: '1px solid rgba(74, 222, 128, 0.3)', borderRadius: '8px', padding: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <BookOpen size={24} style={{ color: '#4ade80' }} />
                <div>
                  <p style={{ color: '#708090', fontSize: '16px' }}>Total Modules</p>
                  <p style={{ color: '#4ade80', fontSize: '24px', fontWeight: 'bold' }}>{modules.length}</p>
                </div>
              </div>
            </div>

            <div style={{ background: 'rgba(100, 200, 255, 0.1)', border: '1px solid rgba(100, 200, 255, 0.3)', borderRadius: '8px', padding: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Heart size={24} style={{ color: '#64c8ff' }} />
                <div>
                  <p style={{ color: '#708090', fontSize: '16px' }}>Favorites</p>
                  <p style={{ color: '#64c8ff', fontSize: '24px', fontWeight: 'bold' }}>{favs.length}</p>
                </div>
              </div>
            </div>

            <div style={{ background: 'rgba(251, 191, 36, 0.1)', border: '1px solid rgba(251, 191, 36, 0.3)', borderRadius: '8px', padding: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Clock size={24} style={{ color: '#fbbf24' }} />
                <div>
                  <p style={{ color: '#708090', fontSize: '16px' }}>Progress</p>
                  <p style={{ color: '#fbbf24', fontSize: '24px', fontWeight: 'bold' }}>{totalProgress}%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Favorite Modules Section */}
        {favoriteModules.length > 0 && (
          <div style={{ marginBottom: '32px', animate: 'float-up 0.6s ease-out' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Star size={24} style={{ color: '#fbbf24' }} />
              <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#e0f2ff' }}>
                Your Favorite Modules ⭐
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
              {favoriteModules.map((module) => (
                <Link
                  key={module.id}
                  to={module.path}
                  style={{
                    background: 'rgba(251, 191, 36, 0.08)',
                    border: '2px solid #fbbf24',
                    borderRadius: '12px',
                    padding: '20px',
                    textDecoration: 'none',
                    transition: 'all 0.3s',
                    transform: 'scale(1)',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                    <span style={{ fontSize: '36px' }}>{module.icon}</span>
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        toggleFavorite(module.id)
                      }}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '24px'
                      }}
                    >
                      ❤️
                    </button>
                  </div>
                  <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#e0f2ff', marginBottom: '8px' }}>
                    {module.title}
                  </h3>
                  <p style={{ color: '#a0c8ff', fontSize: '16px', marginBottom: '12px' }}>
                    {module.description}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid rgba(251, 191, 36, 0.2)' }}>
                    <span style={{ color: '#fbbf24', fontSize: '15px', fontWeight: 'bold' }}>
                      {module.difficulty}
                    </span>
                    <span style={{ color: '#fbbf24', fontWeight: 'bold' }}>
                      Learn More →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Mock Test Banner */}
        <div style={{ margin: '32px 0px' }}>
          <Link
            to="/mock-test"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'linear-gradient(135deg, rgba(100,200,255,0.12) 0%, rgba(167,139,250,0.12) 100%)',
              border: '1px solid rgba(100,200,255,0.35)',
              borderRadius: '12px',
              padding: '20px 28px',
              textDecoration: 'none',
              transition: 'box-shadow 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 24px rgba(100,200,255,0.18)')}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontSize: '36px' }}>📝</span>
              <div>
                <p style={{ color: '#64c8ff', fontWeight: 'bold', fontSize: '18px', margin: 0 }}>
                  Mock Test — Uji Pemahamanmu
                </p>
                <p style={{ color: '#a0c8ff', fontSize: '14px', margin: '4px 0 0' }}>
                  19 modul × 10 soal pilihan ganda · feedback instan · review jawaban
                </p>
              </div>
            </div>
            <span style={{ color: '#64c8ff', fontWeight: 'bold', fontSize: '15px', flexShrink: 0 }}>
              Mulai Tes →
            </span>
          </Link>
        </div>

        {/* All Modules Section */}
        <div style={{ animate: 'float-up 0.6s ease-out' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#e0f2ff', marginBottom: '16px' }}>
            📚 All Modules
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
            {modules.map((module) => {
              const moduleProgress = prog[module.id] || 0
              const isFavorite = favs.includes(module.id)

              return (
                <Link
                  key={module.id}
                  to={module.path}
                  style={{
                    background: 'rgba(26, 35, 50, 0.8)',
                    border: '1px solid rgba(100, 200, 255, 0.2)',
                    borderRadius: '12px',
                    padding: '20px',
                    textDecoration: 'none',
                    transition: 'all 0.3s',
                    transform: 'scale(1)',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#64c8ff'
                    e.currentTarget.style.transform = 'scale(1.02)'
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(100, 200, 255, 0.2)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(100, 200, 255, 0.2)'
                    e.currentTarget.style.transform = 'scale(1)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                    <span style={{ fontSize: '36px' }}>{module.icon}</span>
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        toggleFavorite(module.id)
                      }}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '24px',
                        opacity: isFavorite ? 1 : 0.5,
                        transition: 'opacity 0.2s'
                      }}
                    >
                      {isFavorite ? '❤️' : '🤍'}
                    </button>
                  </div>

                  <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#e0f2ff', marginBottom: '8px' }}>
                    {module.title}
                  </h3>

                  <p style={{ color: '#a0c8ff', fontSize: '16px', marginBottom: '12px' }}>
                    {module.description}
                  </p>

                  {/* Progress Bar */}
                  {moduleProgress > 0 && (
                    <div style={{ marginBottom: '12px' }}>
                      <p style={{ color: '#a0c8ff', fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>
                        Progress: {moduleProgress}%
                      </p>
                      <div style={{
                        background: 'rgba(100, 200, 255, 0.1)',
                        borderRadius: '4px',
                        overflow: 'hidden',
                        height: '6px'
                      }}>
                        <div style={{
                          background: '#64c8ff',
                          height: '100%',
                          width: `${moduleProgress}%`,
                          transition: 'width 0.3s'
                        }} />
                      </div>
                    </div>
                  )}

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
                    {module.tags.slice(0, 2).map((tag, idx) => (
                      <span key={idx} style={{ fontSize: '14px', background: 'rgba(100, 200, 255, 0.2)', color: '#64c8ff', padding: '3px 8px', borderRadius: '12px' }}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid rgba(100, 200, 255, 0.2)' }}>
                    <span style={{ color: '#a0c8ff', fontSize: '15px', fontWeight: 'bold' }}>
                      {module.difficulty}
                    </span>
                    <span style={{ color: '#64c8ff', fontWeight: 'bold' }}>
                      Learn More →
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EnhancedDashboard