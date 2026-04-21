import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Home, BookOpen, Search, Target, Settings } from 'lucide-react'

const NAV_ITEMS = [
  { path: '/', icon: <Home size={18} />, label: 'Dashboard' },
  { path: '/learning-paths', icon: <Target size={18} />, label: 'Learning Paths' },
  { path: '/search', icon: <Search size={18} />, label: 'Search' },
  { path: '/settings', icon: <Settings size={18} />, label: 'Settings' },
]

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  const linkStyle = (active) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 16px',
    borderRadius: '6px',
    textDecoration: 'none',
    color: active ? '#64c8ff' : '#a0c8ff',
    fontWeight: active ? 'bold' : '500',
    fontSize: '14px',
    background: active ? 'rgba(100, 200, 255, 0.1)' : 'transparent',
    border: active ? '1px solid rgba(100, 200, 255, 0.3)' : '1px solid transparent',
    transition: 'all 0.2s',
    cursor: 'pointer',
  })

  return (
    <nav style={{
      background: 'rgba(15, 20, 25, 0.95)',
      borderBottom: '1px solid rgba(100, 200, 255, 0.2)',
      backdropFilter: 'blur(10px)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
    }}>
      <div style={{ maxWidth: '100%', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '70px' }}>
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '28px' }}>🚀</span>
            <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#64c8ff' }}>PostgreSQL Hub</span>
          </Link>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {NAV_ITEMS.map((item) => (
              <Link key={item.path} to={item.path} style={linkStyle(isActive(item.path))}>
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ display: 'none', background: 'transparent', border: 'none', color: '#64c8ff', cursor: 'pointer' }}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '16px 0', borderTop: '1px solid rgba(100, 200, 255, 0.2)' }}>
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                style={{ ...linkStyle(isActive(item.path)), padding: '12px 16px' }}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
