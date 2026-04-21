import React from 'react'
import { Link } from 'react-router-dom'

function Dashboard() {
  const modules = [
    {
      id: 1,
      title: '🎛️ PostgreSQL pg_ctl',
      description: 'Master PostgreSQL server start, stop, restart dengan pg_ctl command dan cheatsheet.',
      path: '/pg-ctl',
      color: 'border-primary-blue',
      icon: '⚙️',
      tags: ['pg_ctl', 'Server Management', 'PostgreSQL']
    },
    {
      id: 2,
      title: '🔄 pg_ctl vs systemd',
      description: 'Comprehensive comparison antara traditional pg_ctl vs modern systemd Linux administration.',
      path: '/pg-ctl-vs-systemd',
      color: 'border-primary-green',
      icon: '🔀',
      tags: ['systemd', 'Linux Administration', 'Modern vs Legacy']
    },
    {
      id: 3,
      title: '🔐 Host-Based Authentication',
      description: 'pg_hba.conf control: client connections, authentication methods, dan security policies.',
      path: '/host-based-auth',
      color: 'border-primary-yellow',
      icon: '🛡️',
      tags: ['pg_hba.conf', 'Security', 'Authentication']
    },
    {
      id: 4,
      title: '📝 Transaction Log (WAL)',
      description: 'Write-Ahead Logging, MVCC, transaction IDs, checkpoints, recovery, dan replication.',
      path: '/transaction-log',
      color: 'border-primary-red',
      icon: '📋',
      tags: ['WAL', 'MVCC', 'Recovery', 'Durability']
    },
    {
      id: 5,
      title: '🗺️ Memory Management & VAS',
      description: 'Virtual Address Space, kernel space, user space, memory segments, paging, dan process isolation.',
      path: '/memory-management',
      color: 'border-primary-purple',
      icon: '💾',
      tags: ['Memory', 'Virtual Memory', 'Paging', 'Process Isolation']
    }
  ]

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-float">
          <h1 className="text-5xl font-bold text-text-primary mb-4">
            PostgreSQL Learning Hub 🚀
          </h1>
          <p className="text-xl text-text-secondary mb-8">
            Complete educational resource untuk PostgreSQL database dan system administration
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-text-secondary">
            <div className="bg-dark-card/50 p-4 rounded-lg border border-primary-blue/20">
              <div className="text-2xl mb-2">📚</div>
              <div className="font-bold text-primary-blue">5+ Modules</div>
              <div>Comprehensive topics</div>
            </div>
            <div className="bg-dark-card/50 p-4 rounded-lg border border-primary-green/20">
              <div className="text-2xl mb-2">🎯</div>
              <div className="font-bold text-primary-green">Interactive</div>
              <div>Tabbed interface</div>
            </div>
            <div className="bg-dark-card/50 p-4 rounded-lg border border-primary-yellow/20">
              <div className="text-2xl mb-2">🔍</div>
              <div className="font-bold text-primary-yellow">In-depth</div>
              <div>Professional content</div>
            </div>
          </div>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide">
          {modules.map((module) => (
            <Link
              key={module.id}
              to={module.path}
              className={`group card border-2 ${module.color} hover:shadow-lg hover:shadow-primary-blue/20 transform hover:scale-105 transition-all`}
            >
              <div className="text-4xl mb-4">{module.icon}</div>
              <h2 className="text-xl font-bold text-text-primary mb-3 group-hover:text-primary-blue transition-colors">
                {module.title}
              </h2>
              <p className="text-text-secondary mb-4 text-sm">
                {module.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {module.tags.map((tag, idx) => (
                  <span key={idx} className="text-xs bg-dark-bg px-2 py-1 rounded-full border border-primary-blue/30 text-primary-blue">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-4 text-primary-blue font-bold group-hover:translate-x-2 transition-transform">
                Learn More →
              </div>
            </Link>
          ))}
        </div>

        {/* Features Section */}
        <div className="mt-20 bg-dark-card/50 border border-primary-blue/20 rounded-lg p-12">
          <h2 className="text-3xl font-bold text-text-primary mb-8 text-center">
            📖 Fitur & Highlights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="text-3xl">⚙️</div>
              <div>
                <h3 className="text-primary-blue font-bold mb-2">PostgreSQL Server Management</h3>
                <p className="text-text-secondary text-sm">
                  Master pg_ctl, systemd integration, configuration management, dan server lifecycle.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-3xl">🔐</div>
              <div>
                <h3 className="text-primary-green font-bold mb-2">Security & Authentication</h3>
                <p className="text-text-secondary text-sm">
                  pg_hba.conf configuration, connection control, authentication methods, dan security best practices.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-3xl">📝</div>
              <div>
                <h3 className="text-primary-yellow font-bold mb-2">Data Durability & Recovery</h3>
                <p className="text-text-secondary text-sm">
                  WAL (Write-Ahead Logging), MVCC, transaction management, checkpoints, dan crash recovery.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-3xl">🗺️</div>
              <div>
                <h3 className="text-primary-red font-bold mb-2">System Administration</h3>
                <p className="text-text-secondary text-sm">
                  Virtual memory, process isolation, memory management, paging, dan kernel concepts.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-text-primary mb-6">
            Siap untuk belajar? 🚀
          </h2>
          <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
            Pilih module di atas untuk mulai pembelajaran mendalam tentang PostgreSQL dan system administration.
            Setiap module dilengkapi dengan penjelasan detail, examples, dan best practices.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/pg-ctl" className="btn-primary">
              Mulai dari pg_ctl →
            </Link>
            <a href="#modules" className="btn-secondary">
              Lihat semua modules ↓
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard