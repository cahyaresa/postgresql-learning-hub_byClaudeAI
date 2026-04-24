import React, { useState, useMemo } from 'react'
import { Search, Filter, X } from 'lucide-react'
import { Link } from 'react-router-dom'

function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const [selectedTags, setSelectedTags] = useState([])

  const modules = [
    {
      id: 'pg-ctl',
      title: 'PostgreSQL pg_ctl',
      description: 'Master PostgreSQL server start, stop, restart dengan pg_ctl command dan cheatsheet.',
      path: '/pg-ctl',
      difficulty: 'Intermediate',
      tags: ['pg_ctl', 'Server Management', 'PostgreSQL', 'Commands'],
      keywords: ['start', 'stop', 'restart', 'reload', 'postgres', 'server']
    },
    {
      id: 'pg-ctl-vs-systemd',
      title: 'pg_ctl vs systemd',
      description: 'Comprehensive comparison antara traditional pg_ctl vs modern systemd.',
      path: '/pg-ctl-vs-systemd',
      difficulty: 'Advanced',
      tags: ['systemd', 'Linux', 'Administration', 'Comparison'],
      keywords: ['systemd', 'unit', 'service', 'linux', 'daemon']
    },
    {
      id: 'host-based-auth',
      title: 'Host-Based Authentication',
      description: 'pg_hba.conf control: client connections, authentication methods, security.',
      path: '/host-based-auth',
      difficulty: 'Intermediate',
      tags: ['pg_hba.conf', 'Security', 'Authentication', 'Configuration'],
      keywords: ['authentication', 'security', 'hba', 'connection', 'password']
    },
    {
      id: 'transaction-log',
      title: 'Transaction Log (WAL)',
      description: 'Write-Ahead Logging, MVCC, transaction IDs, checkpoints, recovery.',
      path: '/transaction-log',
      difficulty: 'Advanced',
      tags: ['WAL', 'MVCC', 'Recovery', 'Durability', 'Transactions'],
      keywords: ['wal', 'log', 'transaction', 'recovery', 'mvcc']
    },
    {
      id: 'memory-management',
      title: 'Memory Management & VAS',
      description: 'Virtual Address Space, kernel space, memory segments, paging.',
      path: '/memory-management',
      difficulty: 'Advanced',
      tags: ['Memory', 'Virtual Memory', 'Paging', 'System', 'Architecture'],
      keywords: ['memory', 'virtual', 'paging', 'kernel', 'heap', 'stack']
    }
  ]

  const allTags = [...new Set(modules.flatMap(m => m.tags))]
  const difficulties = ['Beginner', 'Intermediate', 'Advanced']

  const filteredModules = useMemo(() => {
    return modules.filter(module => {
      // Text search
      const searchLower = searchQuery.toLowerCase()
      const matchesSearch = !searchQuery || 
        module.title.toLowerCase().includes(searchLower) ||
        module.description.toLowerCase().includes(searchLower) ||
        module.keywords.some(kw => kw.includes(searchLower))

      // Difficulty filter
      const matchesDifficulty = selectedDifficulty === 'all' || module.difficulty === selectedDifficulty

      // Tags filter
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.some(tag => module.tags.includes(tag))

      return matchesSearch && matchesDifficulty && matchesTags
    })
  }, [searchQuery, selectedDifficulty, selectedTags])

  const toggleTag = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedDifficulty('all')
    setSelectedTags([])
  }

  return (
    <div style={{ minHeight: '100vh', padding: '40px 24px', background: 'linear-gradient(135deg, #0f1419 0%, #1a2332 100%)' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#e0f2ff', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Search size={32} style={{ color: '#64c8ff' }} />
            Search Modules 🔍
          </h1>
          <p style={{ color: '#a0c8ff', fontSize: '18px' }}>
            Find the perfect learning module for your needs
          </p>
        </div>

        {/* Search Bar */}
        <div style={{ marginBottom: '24px', position: 'relative' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            background: 'rgba(100, 200, 255, 0.08)',
            border: '2px solid rgba(100, 200, 255, 0.3)',
            borderRadius: '12px',
            padding: '12px 16px',
            gap: '12px'
          }}>
            <Search size={20} style={{ color: '#64c8ff' }} />
            <input
              type="text"
              placeholder="Search by title, topic, or keyword... (e.g., 'memory', 'security', 'postgres')"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                color: '#a0c8ff',
                fontSize: '18px',
                outline: 'none'
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#64c8ff',
                  cursor: 'pointer',
                  fontSize: '22px'
                }}
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div style={{ marginBottom: '32px', background: 'rgba(100, 200, 255, 0.08)', border: '1px solid rgba(100, 200, 255, 0.2)', borderRadius: '12px', padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#64c8ff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Filter size={18} /> Filters
            </h3>
            {(selectedDifficulty !== 'all' || selectedTags.length > 0 || searchQuery) && (
              <button
                onClick={clearFilters}
                style={{
                  background: 'rgba(248, 113, 113, 0.2)',
                  color: '#f87171',
                  border: 'none',
                  padding: '6px 12px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold'
                }}
              >
                Clear All
              </button>
            )}
          </div>

          {/* Difficulty Filter */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ color: '#a0c8ff', fontWeight: 'bold', fontSize: '16px', display: 'block', marginBottom: '8px' }}>
              DIFFICULTY LEVEL
            </label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button
                onClick={() => setSelectedDifficulty('all')}
                style={{
                  padding: '6px 12px',
                  background: selectedDifficulty === 'all' ? 'rgba(100, 200, 255, 0.3)' : 'rgba(100, 200, 255, 0.1)',
                  border: '1px solid rgba(100, 200, 255, 0.3)',
                  color: '#64c8ff',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  transition: 'all 0.2s'
                }}
              >
                All Levels
              </button>
              {difficulties.map(diff => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  style={{
                    padding: '6px 12px',
                    background: selectedDifficulty === diff ? 'rgba(100, 200, 255, 0.3)' : 'rgba(100, 200, 255, 0.1)',
                    border: '1px solid rgba(100, 200, 255, 0.3)',
                    color: '#64c8ff',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    transition: 'all 0.2s'
                  }}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          {/* Tags Filter */}
          <div>
            <label style={{ color: '#a0c8ff', fontWeight: 'bold', fontSize: '16px', display: 'block', marginBottom: '8px' }}>
              TOPICS
            </label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  style={{
                    padding: '6px 12px',
                    background: selectedTags.includes(tag) ? 'rgba(74, 222, 128, 0.3)' : 'rgba(100, 200, 255, 0.1)',
                    border: `1px solid ${selectedTags.includes(tag) ? '#4ade80' : 'rgba(100, 200, 255, 0.3)'}`,
                    color: selectedTags.includes(tag) ? '#4ade80' : '#64c8ff',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    transition: 'all 0.2s'
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#64c8ff', marginBottom: '16px' }}>
            Results: {filteredModules.length} module{filteredModules.length !== 1 ? 's' : ''}
          </h2>

          {filteredModules.length > 0 ? (
            <div style={{ display: 'grid', gap: '16px' }}>
              {filteredModules.map(module => (
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
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#64c8ff'
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(100, 200, 255, 0.2)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(100, 200, 255, 0.2)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                    <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#e0f2ff' }}>
                      {module.title}
                    </h3>
                    <span style={{
                      fontSize: '16px',
                      fontWeight: 'bold',
                      padding: '4px 12px',
                      borderRadius: '12px',
                      background: module.difficulty === 'Beginner' ? 'rgba(74, 222, 128, 0.2)' : module.difficulty === 'Intermediate' ? 'rgba(251, 191, 36, 0.2)' : 'rgba(248, 113, 113, 0.2)',
                      color: module.difficulty === 'Beginner' ? '#4ade80' : module.difficulty === 'Intermediate' ? '#fbbf24' : '#f87171'
                    }}>
                      {module.difficulty}
                    </span>
                  </div>

                  <p style={{ color: '#a0c8ff', fontSize: '18px', marginBottom: '12px', lineHeight: '1.5' }}>
                    {module.description}
                  </p>

                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {module.tags.map(tag => (
                      <span key={tag} style={{
                        fontSize: '15px',
                        background: 'rgba(100, 200, 255, 0.1)',
                        color: '#64c8ff',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        border: '1px solid rgba(100, 200, 255, 0.2)'
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div style={{
              background: 'rgba(248, 113, 113, 0.08)',
              border: '1px solid rgba(248, 113, 113, 0.2)',
              borderRadius: '12px',
              padding: '40px',
              textAlign: 'center'
            }}>
              <p style={{ color: '#f87171', fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>
                😕 No modules found
              </p>
              <p style={{ color: '#a0c8ff', fontSize: '18px' }}>
                Try adjusting your filters or search query
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchPage