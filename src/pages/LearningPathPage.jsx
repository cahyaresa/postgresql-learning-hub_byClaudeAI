import React, { useState } from 'react'
import { ChevronRight, CheckCircle, Clock, Target } from 'lucide-react'
import { Link } from 'react-router-dom'

function LearningPathPage() {
  const [expandedPath, setExpandedPath] = useState('beginner')

  const paths = [
    {
      id: 'beginner',
      title: '🟢 Beginner Path',
      duration: '2-3 weeks',
      description: 'Start here if you\'re new to PostgreSQL administration',
      difficulty: 'Beginner',
      modules: [
        {
          order: 1,
          title: 'PostgreSQL pg_ctl',
          path: '/pg-ctl',
          description: 'Learn basic server control commands',
          estimatedTime: '2-3 hours',
          keyTopics: ['start', 'stop', 'restart', 'basic commands']
        }
      ]
    },
    {
      id: 'intermediate',
      title: '🟡 Intermediate Path',
      duration: '4-6 weeks',
      description: 'Build on basics and learn modern administration',
      difficulty: 'Intermediate',
      modules: [
        {
          order: 1,
          title: 'PostgreSQL pg_ctl',
          path: '/pg-ctl',
          description: 'Master all pg_ctl features',
          estimatedTime: '2-3 hours',
          keyTopics: ['all commands', 'signals', 'options']
        },
        {
          order: 2,
          title: 'pg_ctl vs systemd',
          path: '/pg-ctl-vs-systemd',
          description: 'Learn modern systemd approach',
          estimatedTime: '3-4 hours',
          keyTopics: ['systemd', 'unit files', 'modern administration']
        },
        {
          order: 3,
          title: 'Host-Based Authentication',
          path: '/host-based-auth',
          description: 'Control client connections',
          estimatedTime: '2-3 hours',
          keyTopics: ['pg_hba.conf', 'security', 'authentication']
        }
      ]
    },
    {
      id: 'advanced',
      title: '🔴 Advanced Path',
      duration: '8-10 weeks',
      description: 'Deep dive into PostgreSQL internals and optimization',
      difficulty: 'Advanced',
      modules: [
        {
          order: 1,
          title: 'PostgreSQL pg_ctl',
          path: '/pg-ctl',
          description: 'Master advanced server control',
          estimatedTime: '2-3 hours',
          keyTopics: ['all features', 'advanced options', 'production scenarios']
        },
        {
          order: 2,
          title: 'pg_ctl vs systemd',
          path: '/pg-ctl-vs-systemd',
          description: 'Advanced systemd integration',
          estimatedTime: '3-4 hours',
          keyTopics: ['system integration', 'monitoring', 'optimization']
        },
        {
          order: 3,
          title: 'Host-Based Authentication',
          path: '/host-based-auth',
          description: 'Advanced security configuration',
          estimatedTime: '2-3 hours',
          keyTopics: ['security hardening', 'LDAP', 'Kerberos']
        },
        {
          order: 4,
          title: 'Transaction Log (WAL)',
          path: '/transaction-log',
          description: 'Master durability and recovery',
          estimatedTime: '4-5 hours',
          keyTopics: ['WAL', 'MVCC', 'recovery', 'replication']
        },
        {
          order: 5,
          title: 'Memory Management & VAS',
          path: '/memory-management',
          description: 'Understanding system internals',
          estimatedTime: '3-4 hours',
          keyTopics: ['virtual memory', 'paging', 'optimization']
        }
      ]
    }
  ]

  return (
    <div style={{ minHeight: '100vh', padding: '40px 24px', background: 'linear-gradient(135deg, #0f1419 0%, #1a2332 100%)' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#e0f2ff', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
            <Target size={36} style={{ color: '#64c8ff' }} />
            Learning Paths 🎯
          </h1>
          <p style={{ color: '#a0c8ff', fontSize: '16px', maxWidth: '600px', margin: '0 auto' }}>
            Follow structured learning paths based on your experience level. Each path is designed to build your skills progressively.
          </p>
        </div>

        {/* Paths */}
        <div style={{ display: 'grid', gap: '20px' }}>
          {paths.map(path => (
            <div
              key={path.id}
              style={{
                background: 'rgba(26, 35, 50, 0.8)',
                border: '2px solid rgba(100, 200, 255, 0.2)',
                borderRadius: '12px',
                overflow: 'hidden',
                transition: 'all 0.3s'
              }}
            >
              {/* Header */}
              <button
                onClick={() => setExpandedPath(expandedPath === path.id ? null : path.id)}
                style={{
                  width: '100%',
                  padding: '20px',
                  background: 'rgba(100, 200, 255, 0.1)',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  textAlign: 'left',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(100, 200, 255, 0.15)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(100, 200, 255, 0.1)'
                }}
              >
                <div>
                  <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#e0f2ff', marginBottom: '8px' }}>
                    {path.title}
                  </h2>
                  <p style={{ color: '#a0c8ff', fontSize: '14px' }}>
                    {path.description}
                  </p>
                  <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
                    <span style={{ color: '#708090', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={14} /> {path.duration}
                    </span>
                    <span style={{ color: '#64c8ff', fontSize: '12px', fontWeight: 'bold' }}>
                      {path.modules.length} modules
                    </span>
                  </div>
                </div>
                <ChevronRight
                  size={24}
                  style={{
                    color: '#64c8ff',
                    transition: 'transform 0.3s',
                    transform: expandedPath === path.id ? 'rotate(90deg)' : 'rotate(0deg)'
                  }}
                />
              </button>

              {/* Modules List */}
              {expandedPath === path.id && (
                <div style={{ padding: '20px', background: 'rgba(0, 0, 0, 0.2)', borderTop: '1px solid rgba(100, 200, 255, 0.2)' }}>
                  <div style={{ display: 'grid', gap: '16px' }}>
                    {path.modules.map((module, idx) => (
                      <div key={module.order} style={{ display: 'flex', gap: '16px' }}>
                        {/* Step Number */}
                        <div style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          minWidth: '60px'
                        }}>
                          <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: 'rgba(100, 200, 255, 0.2)',
                            border: '2px solid rgba(100, 200, 255, 0.5)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#64c8ff',
                            fontWeight: 'bold',
                            fontSize: '16px'
                          }}>
                            {module.order}
                          </div>
                          {idx < path.modules.length - 1 && (
                            <div style={{
                              width: '2px',
                              height: '60px',
                              background: 'rgba(100, 200, 255, 0.2)',
                              margin: '8px 0'
                            }} />
                          )}
                        </div>

                        {/* Content */}
                        <Link
                          to={module.path}
                          style={{
                            flex: 1,
                            background: 'rgba(100, 200, 255, 0.08)',
                            border: '1px solid rgba(100, 200, 255, 0.2)',
                            borderRadius: '8px',
                            padding: '16px',
                            textDecoration: 'none',
                            transition: 'all 0.3s',
                            cursor: 'pointer'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = '#64c8ff'
                            e.currentTarget.style.background = 'rgba(100, 200, 255, 0.1)'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(100, 200, 255, 0.2)'
                            e.currentTarget.style.background = 'rgba(100, 200, 255, 0.08)'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#e0f2ff' }}>
                              {module.title}
                            </h3>
                            <span style={{
                              fontSize: '11px',
                              background: 'rgba(100, 200, 255, 0.2)',
                              color: '#64c8ff',
                              padding: '4px 8px',
                              borderRadius: '4px',
                              fontWeight: 'bold',
                              whiteSpace: 'nowrap'
                            }}>
                              <Clock size={12} style={{ display: 'inline', marginRight: '4px' }} />
                              {module.estimatedTime}
                            </span>
                          </div>

                          <p style={{ color: '#a0c8ff', fontSize: '13px', marginBottom: '8px' }}>
                            {module.description}
                          </p>

                          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            {module.keyTopics.map(topic => (
                              <span key={topic} style={{
                                fontSize: '11px',
                                background: 'rgba(74, 222, 128, 0.1)',
                                color: '#4ade80',
                                padding: '3px 8px',
                                borderRadius: '3px',
                                border: '1px solid rgba(74, 222, 128, 0.2)'
                              }}>
                                {topic}
                              </span>
                            ))}
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>

                  {/* Path Footer */}
                  <div style={{
                    marginTop: '24px',
                    padding: '16px',
                    background: 'rgba(74, 222, 128, 0.08)',
                    border: '1px solid rgba(74, 222, 128, 0.2)',
                    borderRadius: '8px',
                    textAlign: 'center'
                  }}>
                    <p style={{ color: '#4ade80', fontWeight: 'bold', marginBottom: '8px' }}>
                      ✅ Path Complete!
                    </p>
                    <p style={{ color: '#a0c8ff', fontSize: '12px' }}>
                      After completing this path, you'll have comprehensive knowledge in this area.
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Tips Section */}
        <div style={{
          marginTop: '40px',
          background: 'rgba(100, 200, 255, 0.08)',
          border: '1px solid rgba(100, 200, 255, 0.2)',
          borderRadius: '12px',
          padding: '24px'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#64c8ff', marginBottom: '16px' }}>
            💡 Learning Tips
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
            {[
              { icon: '📚', title: 'Read Carefully', desc: 'Take time to understand each concept thoroughly' },
              { icon: '🧪', title: 'Practice', desc: 'Apply what you learn in real or test environments' },
              { icon: '📝', title: 'Take Notes', desc: 'Document important concepts and examples' },
              { icon: '🔄', title: 'Review', desc: 'Revisit topics to reinforce your understanding' }
            ].map((tip, idx) => (
              <div key={idx} style={{ background: 'rgba(74, 222, 128, 0.08)', borderRadius: '8px', padding: '16px', border: '1px solid rgba(74, 222, 128, 0.2)' }}>
                <p style={{ fontSize: '24px', marginBottom: '8px' }}>{tip.icon}</p>
                <p style={{ color: '#4ade80', fontWeight: 'bold', marginBottom: '4px' }}>{tip.title}</p>
                <p style={{ color: '#a0c8ff', fontSize: '12px' }}>{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LearningPathPage