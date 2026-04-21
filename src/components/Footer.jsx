import React from 'react'

export function Footer() {
  return (
    <footer style={{
      background: 'rgba(15, 20, 25, 0.5)',
      borderTop: '1px solid rgba(100, 200, 255, 0.2)',
      marginTop: '60px',
      padding: '40px 0',
      textAlign: 'center',
    }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 24px' }}>
        <p style={{ color: '#a0c8ff', marginBottom: '8px' }}>
          📚 PostgreSQL Learning Hub - Complete Educational Resource
        </p>
        <p style={{ color: '#708090', fontSize: '14px' }}>
          Created for comprehensive understanding of PostgreSQL & System Administration
        </p>
        <p style={{ color: '#708090', fontSize: '12px', marginTop: '16px' }}>
          © {new Date().getFullYear()} PostgreSQL Learning Hub. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
