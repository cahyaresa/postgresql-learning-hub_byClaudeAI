import React from 'react'
import { Copy, Check } from 'lucide-react'

// Tab Component
export function Tabs({ activeTab, onTabChange, tabs }) {
  return (
    <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', borderBottom: '1px solid rgba(100, 200, 255, 0.2)', paddingBottom: '16px', overflowX: 'auto' }}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          style={{
            padding: '12px 16px',
            fontWeight: '500',
            whiteSpace: 'nowrap',
            fontSize: '13px',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            color: activeTab === tab.id ? '#64c8ff' : '#708090',
            borderBottom: activeTab === tab.id ? '3px solid #64c8ff' : 'none',
            transition: 'all 0.3s'
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

// Card Component
export function Card({ children, border = 'primary-blue', hover = true }) {
  const borderColor = {
    'primary-blue': 'rgba(100, 200, 255, 0.2)',
    'primary-green': 'rgba(74, 222, 128, 0.3)',
    'primary-yellow': 'rgba(251, 191, 36, 0.3)',
    'primary-red': 'rgba(248, 113, 113, 0.3)',
  }[border]

  return (
    <div style={{
      background: 'rgba(100, 200, 255, 0.08)',
      border: `1px solid ${borderColor}`,
      borderRadius: '12px',
      padding: '20px',
      ...(hover && { transition: 'all 0.3s', cursor: 'pointer' })
    }}>
      {children}
    </div>
  )
}

// Code Block with Copy Button
export function CodeBlock({ code, language = 'bash' }) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{
      background: 'rgba(0, 0, 0, 0.3)',
      padding: '16px',
      borderRadius: '8px',
      fontFamily: 'monospace',
      fontSize: '12px',
      color: '#a0c8ff',
      marginBottom: '16px',
      position: 'relative',
      overflow: 'auto'
    }}>
      <button
        onClick={handleCopy}
        style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          background: copied ? '#4ade80' : 'rgba(100, 200, 255, 0.2)',
          border: 'none',
          color: copied ? '#0f1419' : '#64c8ff',
          padding: '6px 12px',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '15px',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          transition: 'all 0.2s'
        }}
      >
        {copied ? (
          <>
            <Check size={14} /> Copied
          </>
        ) : (
          <>
            <Copy size={14} /> Copy
          </>
        )}
      </button>
      <pre style={{ margin: '0', whiteSpace: 'pre-wrap', wordBreak: 'break-word', paddingRight: '120px' }}>
        {code}
      </pre>
    </div>
  )
}

// Section Component
export function Section({ title, icon = '', children, color = 'blue' }) {
  const colors = {
    blue: { bg: 'rgba(100, 200, 255, 0.1)', border: 'rgba(100, 200, 255, 0.3)', text: '#64c8ff' },
    green: { bg: 'rgba(74, 222, 128, 0.1)', border: 'rgba(74, 222, 128, 0.3)', text: '#4ade80' },
    yellow: { bg: 'rgba(251, 191, 36, 0.1)', border: 'rgba(251, 191, 36, 0.3)', text: '#fbbf24' },
    red: { bg: 'rgba(248, 113, 113, 0.1)', border: 'rgba(248, 113, 113, 0.3)', text: '#f87171' },
  }

  const colorScheme = colors[color]

  return (
    <div style={{
      background: colorScheme.bg,
      border: `1px solid ${colorScheme.border}`,
      borderRadius: '12px',
      padding: '16px',
      marginBottom: '16px',
      borderLeft: `3px solid ${colorScheme.text}`
    }}>
      {title && (
        <h4 style={{ color: colorScheme.text, fontWeight: 'bold', marginBottom: '12px', fontSize: '14px' }}>
          {icon} {title}
        </h4>
      )}
      {children}
    </div>
  )
}

// Alert Component
export function Alert({ type = 'info', title, message }) {
  const types = {
    info: { bg: 'rgba(100, 200, 255, 0.1)', border: '#64c8ff', icon: 'ℹ️' },
    success: { bg: 'rgba(74, 222, 128, 0.1)', border: '#4ade80', icon: '✅' },
    warning: { bg: 'rgba(251, 191, 36, 0.1)', border: '#fbbf24', icon: '⚠️' },
    error: { bg: 'rgba(248, 113, 113, 0.1)', border: '#f87171', icon: '❌' },
  }

  const style = types[type]

  return (
    <div style={{
      background: style.bg,
      border: `1px solid ${style.border}`,
      borderRadius: '8px',
      padding: '12px 16px',
      marginBottom: '12px',
      display: 'flex',
      gap: '12px',
      alignItems: 'flex-start'
    }}>
      <span style={{ fontSize: '18px', minWidth: '24px' }}>{style.icon}</span>
      <div>
        {title && <p style={{ color: '#a0c8ff', fontWeight: 'bold', marginBottom: '4px' }}>{title}</p>}
        <p style={{ color: '#a0c8ff', fontSize: '12px' }}>{message}</p>
      </div>
    </div>
  )
}

// Button Components
export function Button({ variant = 'primary', children, onClick, ...props }) {
  const variants = {
    primary: {
      background: '#64c8ff',
      color: '#0f1419',
      border: 'none',
      padding: '10px 16px',
      borderRadius: '6px',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'all 0.2s',
    },
    secondary: {
      background: 'transparent',
      color: '#64c8ff',
      border: '1px solid #64c8ff',
      padding: '10px 16px',
      borderRadius: '6px',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'all 0.2s',
    },
    ghost: {
      background: 'transparent',
      color: '#a0c8ff',
      border: 'none',
      padding: '10px 16px',
      borderRadius: '6px',
      cursor: 'pointer',
      transition: 'all 0.2s',
    }
  }

  return (
    <button style={variants[variant]} onClick={onClick} {...props}>
      {children}
    </button>
  )
}

// Badge Component
export function Badge({ children, variant = 'default' }) {
  const variants = {
    default: { bg: 'rgba(100, 200, 255, 0.2)', text: '#64c8ff' },
    success: { bg: 'rgba(74, 222, 128, 0.2)', text: '#4ade80' },
    warning: { bg: 'rgba(251, 191, 36, 0.2)', text: '#fbbf24' },
    error: { bg: 'rgba(248, 113, 113, 0.2)', text: '#f87171' },
  }

  const style = variants[variant]

  return (
    <span style={{
      background: style.bg,
      color: style.text,
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '15px',
      fontWeight: 'bold',
      display: 'inline-block'
    }}>
      {children}
    </span>
  )
}

// Feature List Component
export function FeatureList({ items }) {
  return (
    <ul style={{ marginLeft: '16px', color: '#a0c8ff', fontSize: '12px' }}>
      {items.map((item, idx) => (
        <li key={idx} style={{ marginBottom: '8px' }}>
          ✓ {item}
        </li>
      ))}
    </ul>
  )
}

// Table Component
export function Table({ headers, rows }) {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '12px' }}>
      <thead>
        <tr style={{ borderBottom: '1px solid rgba(100, 200, 255, 0.3)' }}>
          {headers.map((header, idx) => (
            <th key={idx} style={{ color: '#64c8ff', textAlign: 'left', padding: '8px', fontSize: '12px', fontWeight: 'bold' }}>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, ridx) => (
          <tr key={ridx} style={{ borderBottom: '1px solid rgba(100, 200, 255, 0.2)' }}>
            {row.map((cell, cidx) => (
              <td key={cidx} style={{ color: '#a0c8ff', padding: '8px', fontSize: '12px' }}>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

// Progress Component
export function ProgressBar({ value = 0, max = 100, label = '' }) {
  const percentage = (value / max) * 100

  return (
    <div style={{ marginBottom: '12px' }}>
      {label && <p style={{ color: '#a0c8ff', fontSize: '12px', marginBottom: '4px', fontWeight: 'bold' }}>{label}</p>}
      <div style={{
        background: 'rgba(100, 200, 255, 0.1)',
        border: '1px solid rgba(100, 200, 255, 0.3)',
        borderRadius: '4px',
        overflow: 'hidden',
        height: '24px',
        position: 'relative'
      }}>
        <div style={{
          background: 'linear-gradient(90deg, #64c8ff, #4ade80)',
          height: '100%',
          width: `${percentage}%`,
          transition: 'width 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '15px',
          color: '#0f1419',
          fontWeight: 'bold'
        }}>
          {percentage > 10 && `${Math.round(percentage)}%`}
        </div>
      </div>
    </div>
  )
}