import React, { useState } from 'react'
import { Settings, RotateCcw, Trash2 } from 'lucide-react'
import { progress, favorites, storage } from '@utils/helpers'

function SettingsPage() {
  const [settings, setSettings] = useState({
    theme: storage.get('theme', 'dark'),
    notifications: storage.get('notifications', true),
    autoSave: storage.get('autoSave', true),
    fontSize: storage.get('fontSize', 'medium'),
  })

  const [message, setMessage] = useState('')

  const handleSettingChange = (key, value) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    storage.set(key, value)
    setMessage(`✅ ${key} updated!`)
    setTimeout(() => setMessage(''), 3000)
  }

  const handleClearData = (type) => {
    if (window.confirm(`Are you sure? This cannot be undone.`)) {
      if (type === 'progress') {
        progress.reset()
        setMessage('✅ Progress cleared!')
      } else if (type === 'favorites') {
        storage.set('favorites', [])
        setMessage('✅ Favorites cleared!')
      } else if (type === 'all') {
        storage.clear()
        setMessage('✅ All data cleared!')
      }
      setTimeout(() => setMessage(''), 3000)
    }
  }

  const handleExportData = () => {
    const data = {
      progress: progress.get(),
      favorites: favorites.get(),
      settings: settings,
      exportedAt: new Date().toISOString()
    }
    const dataStr = JSON.stringify(data, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `postgres-learning-hub-data-${new Date().toISOString().split('T')[0]}.json`
    link.click()
    setMessage('✅ Data exported!')
    setTimeout(() => setMessage(''), 3000)
  }

  return (
    <div style={{ minHeight: '100vh', padding: '40px 24px', background: 'linear-gradient(135deg, #0f1419 0%, #1a2332 100%)' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
          <Settings size={32} style={{ color: '#64c8ff' }} />
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#e0f2ff' }}>
            Settings & Preferences ⚙️
          </h1>
        </div>

        {/* Message */}
        {message && (
          <div style={{
            background: 'rgba(74, 222, 128, 0.1)',
            border: '1px solid rgba(74, 222, 128, 0.3)',
            borderRadius: '8px',
            padding: '12px 16px',
            marginBottom: '20px',
            color: '#4ade80',
            fontSize: '14px'
          }}>
            {message}
          </div>
        )}

        {/* Display Settings */}
        <div style={{
          background: 'rgba(100, 200, 255, 0.08)',
          border: '1px solid rgba(100, 200, 255, 0.2)',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '20px'
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#64c8ff', marginBottom: '16px' }}>
            📺 Display Settings
          </h2>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', color: '#a0c8ff', marginBottom: '8px', fontWeight: 'bold' }}>
              Theme
            </label>
            <select
              value={settings.theme}
              onChange={(e) => handleSettingChange('theme', e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                background: 'rgba(0, 0, 0, 0.2)',
                border: '1px solid rgba(100, 200, 255, 0.3)',
                borderRadius: '6px',
                color: '#a0c8ff',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              <option value="dark">🌙 Dark (Default)</option>
              <option value="light">☀️ Light</option>
              <option value="auto">🔄 Auto (System)</option>
            </select>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', color: '#a0c8ff', marginBottom: '8px', fontWeight: 'bold' }}>
              Font Size
            </label>
            <select
              value={settings.fontSize}
              onChange={(e) => handleSettingChange('fontSize', e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                background: 'rgba(0, 0, 0, 0.2)',
                border: '1px solid rgba(100, 200, 255, 0.3)',
                borderRadius: '6px',
                color: '#a0c8ff',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              <option value="small">Aa Small</option>
              <option value="medium">Aa Medium (Default)</option>
              <option value="large">Aa Large</option>
            </select>
          </div>
        </div>

        {/* General Settings */}
        <div style={{
          background: 'rgba(74, 222, 128, 0.08)',
          border: '1px solid rgba(74, 222, 128, 0.2)',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '20px'
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#4ade80', marginBottom: '16px' }}>
            ⚡ General Settings
          </h2>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={settings.notifications}
                onChange={(e) => handleSettingChange('notifications', e.target.checked)}
                style={{ cursor: 'pointer', width: '18px', height: '18px' }}
              />
              <span style={{ color: '#a0c8ff', fontWeight: 'bold' }}>Enable Notifications</span>
            </label>
            <p style={{ color: '#708090', fontSize: '12px', marginLeft: '30px', marginTop: '4px' }}>
              Get notified about new modules and updates
            </p>
          </div>

          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={settings.autoSave}
                onChange={(e) => handleSettingChange('autoSave', e.target.checked)}
                style={{ cursor: 'pointer', width: '18px', height: '18px' }}
              />
              <span style={{ color: '#a0c8ff', fontWeight: 'bold' }}>Auto-Save Progress</span>
            </label>
            <p style={{ color: '#708090', fontSize: '12px', marginLeft: '30px', marginTop: '4px' }}>
              Automatically save learning progress locally
            </p>
          </div>
        </div>

        {/* Data Management */}
        <div style={{
          background: 'rgba(251, 191, 36, 0.08)',
          border: '1px solid rgba(251, 191, 36, 0.2)',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '20px'
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#fbbf24', marginBottom: '16px' }}>
            💾 Data Management
          </h2>

          <div style={{ display: 'grid', gap: '12px', marginBottom: '16px' }}>
            <button
              onClick={handleExportData}
              style={{
                padding: '12px 16px',
                background: 'rgba(251, 191, 36, 0.2)',
                border: '1px solid rgba(251, 191, 36, 0.3)',
                color: '#fbbf24',
                borderRadius: '6px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontSize: '14px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(251, 191, 36, 0.3)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(251, 191, 36, 0.2)'
              }}
            >
              📥 Export My Data
            </button>

            <button
              onClick={() => handleClearData('progress')}
              style={{
                padding: '12px 16px',
                background: 'rgba(248, 113, 113, 0.1)',
                border: '1px solid rgba(248, 113, 113, 0.3)',
                color: '#f87171',
                borderRadius: '6px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <RotateCcw size={16} /> Reset Progress
            </button>

            <button
              onClick={() => handleClearData('favorites')}
              style={{
                padding: '12px 16px',
                background: 'rgba(248, 113, 113, 0.1)',
                border: '1px solid rgba(248, 113, 113, 0.3)',
                color: '#f87171',
                borderRadius: '6px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <Trash2 size={16} /> Clear Favorites
            </button>

            <button
              onClick={() => handleClearData('all')}
              style={{
                padding: '12px 16px',
                background: 'rgba(248, 113, 113, 0.15)',
                border: '2px solid rgba(248, 113, 113, 0.3)',
                color: '#ff6b6b',
                borderRadius: '6px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <Trash2 size={16} /> Clear All Data
            </button>
          </div>

          <p style={{ color: '#708090', fontSize: '12px', textAlign: 'center' }}>
            💡 Tip: Export your data before clearing for backup
          </p>
        </div>

        {/* About Section */}
        <div style={{
          background: 'rgba(167, 139, 250, 0.08)',
          border: '1px solid rgba(167, 139, 250, 0.2)',
          borderRadius: '12px',
          padding: '20px',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#a78bfa', marginBottom: '12px' }}>
            ℹ️ About
          </h2>
          <p style={{ color: '#a0c8ff', fontSize: '13px', marginBottom: '8px' }}>
            PostgreSQL Learning Hub v1.0.0
          </p>
          <p style={{ color: '#708090', fontSize: '12px' }}>
            Comprehensive educational platform for PostgreSQL & System Administration
          </p>
          <p style={{ color: '#708090', fontSize: '11px', marginTop: '12px' }}>
            © 2024 PostgreSQL Learning Hub. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage