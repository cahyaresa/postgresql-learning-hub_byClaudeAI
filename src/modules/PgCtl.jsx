import React, { useState, useEffect } from 'react';
import { ChevronDown, Play, Pause, RotateCcw, Copy, Terminal } from 'lucide-react';

const PostgreSQLPgCtl = () => {
  const [activeTab, setActiveTab] = useState('what-is');
  const [expandedSection, setExpandedSection] = useState('pg-ctl-def');
  const [isPlaying, setIsPlaying] = useState(true);
  const [animState, setAnimState] = useState(0);
  const [copiedCmd, setCopiedCmd] = useState(null);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setAnimState(prev => (prev + 1) % 10);
    }, 3500);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const animationStyles = `
    @keyframes float-up {
      0% { transform: translateY(20px); opacity: 0; }
      100% { transform: translateY(0); opacity: 1; }
    }
    @keyframes slide-in {
      0% { transform: translateX(-50px); opacity: 0; }
      100% { transform: translateX(0); opacity: 1; }
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.6; }
    }
    @keyframes glow {
      0%, 100% { box-shadow: 0 0 0 rgba(100, 200, 255, 0.5); }
      50% { box-shadow: 0 0 15px rgba(100, 200, 255, 0.8); }
    }
    
    .animate-float { animation: float-up 0.6s ease-out; }
    .animate-slide { animation: slide-in 0.5s ease-out; }
    .animate-pulse { animation: pulse 1.5s ease-in-out infinite; }
    .animate-glow { animation: glow 2s ease-in-out infinite; }
  `;

  const CommandBox = ({ command, description, example = null }) => (
    <div style={{ background: 'rgba(0, 0, 0, 0.2)', padding: '12px', borderRadius: '8px', marginBottom: '10px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
        <code style={{ color: '#64c8ff', fontFamily: 'monospace', fontWeight: 'bold', fontSize: '16px' }}>
          {command}
        </code>
        <button
          onClick={() => {
            navigator.clipboard.writeText(command);
            setCopiedCmd(command);
            setTimeout(() => setCopiedCmd(null), 2000);
          }}
          style={{
            background: copiedCmd === command ? '#4ade80' : 'rgba(100, 200, 255, 0.2)',
            border: 'none',
            color: copiedCmd === command ? '#0f1419' : '#64c8ff',
            padding: '4px 8px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '15px',
            fontWeight: 'bold'
          }}
        >
          {copiedCmd === command ? '✓ Copied' : 'Copy'}
        </button>
      </div>
      <p style={{ color: '#a0c8ff', fontSize: '15px', marginBottom: '4px' }}>
        {description}
      </p>
      {example && (
        <p style={{ color: '#708090', fontSize: '14px', fontStyle: 'italic' }}>
          💡 {example}
        </p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0f1419 0%, #1a2332 100%)' }}>
      <style>{animationStyles}</style>

      {/* Header */}
      <header className="border-b" style={{ borderColor: 'rgba(100, 200, 255, 0.2)', background: 'rgba(15, 20, 25, 0.8)' }}>
        <div className="max-w-7xl mx-auto px-6 py-10">
          <h1 className="text-4xl font-bold mb-2" style={{ color: '#e0f2ff', fontFamily: 'Segoe UI' }}>
            pg_ctl - PostgreSQL Server Control 🎛️
          </h1>
          <p style={{ color: '#a0c8ff', fontSize: '20px' }}>
            Master PostgreSQL server start, stop, restart, reload, dan status management
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 border-b overflow-x-auto pb-4" style={{ borderColor: 'rgba(100, 200, 255, 0.2)' }}>
          {[
            { id: 'what-is', label: '📖 What is pg_ctl', icon: '?' },
            { id: 'commands', label: '⚙️ Commands', icon: '⚡' },
            { id: 'options', label: '🔧 Options', icon: '⚙' },
            { id: 'signals', label: '📢 Signals', icon: '📡' },
            { id: 'examples', label: '💻 Examples', icon: '📝' },
            { id: 'cheatsheet', label: '📋 Cheatsheet', icon: '✓' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="px-4 py-3 font-medium whitespace-nowrap transition-all text-sm"
              style={{
                color: activeTab === tab.id ? '#64c8ff' : '#708090',
                borderBottom: activeTab === tab.id ? '3px solid #64c8ff' : 'none'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Control Bar */}
        <div className="flex gap-3 mb-6 p-4 rounded-lg" style={{ background: 'rgba(100, 200, 255, 0.08)', border: '1px solid rgba(100, 200, 255, 0.2)' }}>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-2 px-4 py-2 rounded transition-all"
            style={{
              background: isPlaying ? '#64c8ff' : 'rgba(100, 200, 255, 0.2)',
              color: isPlaying ? '#0f1419' : '#64c8ff'
            }}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            {isPlaying ? 'Pause' : 'Play'}
          </button>
        </div>

        {/* Content */}
        {activeTab === 'what-is' && (
          <div className="space-y-8 animate-float">
            <div
              onClick={() => setExpandedSection(expandedSection === 'pg-ctl-def' ? null : 'pg-ctl-def')}
              className="p-4 rounded-lg cursor-pointer transition-all"
              style={{
                background: expandedSection === 'pg-ctl-def' ? 'rgba(100, 200, 255, 0.15)' : 'rgba(100, 200, 255, 0.08)',
                border: expandedSection === 'pg-ctl-def' ? '2px solid #64c8ff' : '1px solid rgba(100, 200, 255, 0.2)'
              }}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold" style={{ color: '#64c8ff' }}>What is pg_ctl?</h3>
                <ChevronDown
                  size={24}
                  style={{
                    color: '#64c8ff',
                    transform: expandedSection === 'pg-ctl-def' ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s'
                  }}
                />
              </div>

              {expandedSection === 'pg-ctl-def' && (
                <div className="mt-6 space-y-4">
                  <p style={{ color: '#a0c8ff', lineHeight: '1.8', fontSize: '19px' }}>
                    <strong>pg_ctl</strong> adalah utility command untuk manage PostgreSQL database server. 
                    Gunakan pg_ctl untuk start, stop, restart, reload, dan check status PostgreSQL instance.
                  </p>

                  <div style={{ background: 'rgba(74, 222, 128, 0.1)', padding: '16px', borderRadius: '8px', borderLeft: '3px solid #4ade80' }}>
                    <p style={{ color: '#4ade80', fontWeight: 'bold', marginBottom: '12px' }}>📍 Location:</p>
                    <code style={{ color: '#86efac', fontFamily: 'monospace', display: 'block' }}>
                      /usr/lib/postgresql/14/bin/pg_ctl
                    </code>
                    <p style={{ color: '#a0c8ff', fontSize: '16px', marginTop: '8px' }}>
                      (location vary by PostgreSQL version dan installation method)
                    </p>
                  </div>

                  <div style={{ background: 'rgba(100, 200, 255, 0.1)', padding: '16px', borderRadius: '8px', borderLeft: '3px solid #64c8ff' }}>
                    <p style={{ color: '#64c8ff', fontWeight: 'bold', marginBottom: '12px' }}>⚡ Common Use Cases:</p>
                    <ul style={{ color: '#a0c8ff', fontSize: '17px', marginLeft: '16px' }}>
                      <li>✓ Start PostgreSQL server untuk development</li>
                      <li>✓ Stop/restart untuk maintenance atau config changes</li>
                      <li>✓ Graceful shutdown untuk avoid data corruption</li>
                      <li>✓ Reload config tanpa restart</li>
                      <li>✓ Check server status dan PID</li>
                      <li>✓ Promote standby to primary (replication)</li>
                    </ul>
                  </div>

                  <div style={{ background: 'rgba(251, 191, 36, 0.1)', padding: '16px', borderRadius: '8px', borderLeft: '3px solid #fbbf24' }}>
                    <p style={{ color: '#fbbf24', fontWeight: 'bold', marginBottom: '12px' }}>💡 Key Requirements:</p>
                    <ul style={{ color: '#a0c8ff', fontSize: '17px', marginLeft: '16px' }}>
                      <li>✓ Must run as <code style={{ color: '#fbbf24' }}>postgres</code> user (or owner of PGDATA)</li>
                      <li>✓ Must have PGDATA environment variable set atau use -D option</li>
                      <li>✓ Data directory must exist dan be initialized (initdb)</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <div style={{ background: 'rgba(100, 200, 255, 0.08)', border: '1px solid rgba(100, 200, 255, 0.2)', borderRadius: '12px', padding: '20px' }}>
              <h3 className="text-lg font-bold mb-4" style={{ color: '#64c8ff' }}>Basic Syntax</h3>
              <div style={{ background: 'rgba(0, 0, 0, 0.2)', padding: '12px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '17px', color: '#64c8ff', lineHeight: '1.8' }}>
                <p>pg_ctl [OPTIONS] COMMAND</p>
                <p style={{ marginTop: '12px', color: '#a0c8ff' }}>Examples:</p>
                <p style={{ color: '#86efac' }}>pg_ctl -D /var/lib/postgresql/14/main start</p>
                <p style={{ color: '#86efac' }}>pg_ctl -D /var/lib/postgresql/14/main stop</p>
                <p style={{ color: '#86efac' }}>pg_ctl -D /var/lib/postgresql/14/main restart</p>
                <p style={{ color: '#86efac' }}>pg_ctl -D /var/lib/postgresql/14/main status</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'commands' && (
          <div className="space-y-8 animate-float">
            <h3 className="text-lg font-bold" style={{ color: '#64c8ff' }}>PostgreSQL pg_ctl Commands</h3>

            <div style={{ background: 'rgba(100, 200, 255, 0.08)', border: '1px solid rgba(100, 200, 255, 0.2)', borderRadius: '12px', padding: '20px' }}>
              <h4 className="text-base font-bold mb-4" style={{ color: '#64c8ff' }}>🎯 Main Commands</h4>

              <div className="space-y-3">
                {[
                  {
                    cmd: 'pg_ctl start',
                    desc: 'Start PostgreSQL server',
                    detail: 'Initialize POSTMASTER process, fork background workers. Server start listening on port.',
                    modes: ['default (fast)', 'smart (wait clients disconnect)', 'fast (immediate)']
                  },
                  {
                    cmd: 'pg_ctl stop',
                    desc: 'Stop PostgreSQL server',
                    detail: 'Graceful shutdown. Disallow new connections, wait existing finish, then stop.',
                    modes: ['smart (default)', 'fast (terminate clients)', 'immediate (crash recovery)']
                  },
                  {
                    cmd: 'pg_ctl restart',
                    desc: 'Restart PostgreSQL server',
                    detail: 'Stop server gracefully, then start again. Used for config changes.',
                    modes: ['smart', 'fast', 'immediate']
                  },
                  {
                    cmd: 'pg_ctl reload',
                    desc: 'Reload configuration',
                    detail: 'Reload postgresql.conf tanpa stop server. Only some parameters affected (runtime parameters).',
                    modes: ['N/A (no mode options)']
                  },
                  {
                    cmd: 'pg_ctl status',
                    desc: 'Check server status',
                    detail: 'Show if server running, PID, port, data directory.',
                    modes: ['N/A']
                  },
                  {
                    cmd: 'pg_ctl promote',
                    desc: 'Promote standby to primary',
                    detail: 'Used in replication setup. Promote standby server to become primary.',
                    modes: ['N/A']
                  },
                  {
                    cmd: 'pg_ctl logrotate',
                    desc: 'Rotate log files',
                    detail: 'Request server to rotate log file (if using logging_collector).',
                    modes: ['N/A']
                  },
                  {
                    cmd: 'pg_ctl kill',
                    desc: 'Send signal to process',
                    detail: 'Send arbitrary signal to backend processes.',
                    modes: ['N/A']
                  }
                ].map((item, idx) => (
                  <div key={idx} style={{ background: 'rgba(0, 0, 0, 0.2)', padding: '12px', borderRadius: '8px', borderLeft: '3px solid #64c8ff' }}>
                    <p style={{ color: '#64c8ff', fontWeight: 'bold', fontSize: '16px', marginBottom: '4px' }}>
                      {item.cmd}
                    </p>
                    <p style={{ color: '#fbbf24', fontSize: '15px', marginBottom: '4px' }}>
                      {item.desc}
                    </p>
                    <p style={{ color: '#a0c8ff', fontSize: '14px', marginBottom: '4px' }}>
                      {item.detail}
                    </p>
                    <p style={{ color: '#708090', fontSize: '13px' }}>
                      Modes: {item.modes.join(', ')}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'options' && (
          <div className="space-y-8 animate-float">
            <h3 className="text-lg font-bold" style={{ color: '#64c8ff' }}>pg_ctl Options</h3>

            <div style={{ background: 'rgba(100, 200, 255, 0.08)', border: '1px solid rgba(100, 200, 255, 0.2)', borderRadius: '12px', padding: '20px' }}>
              <h4 className="text-base font-bold mb-4" style={{ color: '#64c8ff' }}>📌 Essential Options</h4>

              {[
                {
                  opt: '-D DATADIR, --pgdata DATADIR',
                  desc: 'Location of database storage area',
                  example: '-D /var/lib/postgresql/14/main'
                },
                {
                  opt: '-l LOGFILE, --log LOGFILE',
                  desc: 'Write startup messages to logfile',
                  example: '-l /var/log/postgresql/server.log'
                },
                {
                  opt: '-w, --wait',
                  desc: 'Wait untuk command to complete (recommended)',
                  example: 'default behavior for start/stop/restart'
                },
                {
                  opt: '-W, --no-wait',
                  desc: 'Do not wait, return immediately',
                  example: 'useful untuk scripts'
                },
                {
                  opt: '-t SECS, --timeout SECS',
                  desc: 'Timeout untuk waiting (default 60 seconds)',
                  example: '-t 120 (wait max 120 seconds)'
                },
                {
                  opt: '-m MODE, --mode MODE',
                  desc: 'Stop mode: smart (default), fast, immediate',
                  example: '-m fast (force terminate clients)'
                },
                {
                  opt: '-s, --silent',
                  desc: 'Suppress output messages',
                  example: 'useful untuk scripts, quiet mode'
                },
                {
                  opt: '-o OPTIONS',
                  desc: 'Pass options to server (postmaster)',
                  example: '-o "-c max_connections=200"'
                },
                {
                  opt: '-e ENCODING',
                  desc: 'Specify encoding for startup',
                  example: '-e UTF-8'
                }
              ].map((item, idx) => (
                <div key={idx} style={{ background: 'rgba(0, 0, 0, 0.2)', padding: '12px', borderRadius: '8px', marginBottom: '8px', borderLeft: '3px solid #64c8ff' }}>
                  <p style={{ color: '#64c8ff', fontWeight: 'bold', fontSize: '15px', marginBottom: '3px', fontFamily: 'monospace' }}>
                    {item.opt}
                  </p>
                  <p style={{ color: '#a0c8ff', fontSize: '15px', marginBottom: '3px' }}>{item.desc}</p>
                  <p style={{ color: '#708090', fontSize: '14px', fontStyle: 'italic' }}>Example: {item.example}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'signals' && (
          <div className="space-y-8 animate-float">
            <h3 className="text-lg font-bold" style={{ color: '#64c8ff' }}>🔔 Shutdown Modes & Signals</h3>

            <div style={{ background: 'rgba(100, 200, 255, 0.08)', border: '1px solid rgba(100, 200, 255, 0.2)', borderRadius: '12px', padding: '20px' }}>
              <h4 className="text-base font-bold mb-4" style={{ color: '#64c8ff' }}>Shutdown Modes untuk STOP/RESTART</h4>

              <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid rgba(100, 200, 255, 0.3)' }}>
                    <th style={{ color: '#64c8ff', textAlign: 'left', padding: '8px' }}>Mode</th>
                    <th style={{ color: '#64c8ff', textAlign: 'left', padding: '8px' }}>Signal</th>
                    <th style={{ color: '#64c8ff', textAlign: 'left', padding: '8px' }}>Behavior</th>
                    <th style={{ color: '#64c8ff', textAlign: 'left', padding: '8px' }}>Safety</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      mode: 'smart (default)',
                      signal: 'SIGTERM',
                      behavior: 'Disallow new connections, wait existing finish, then shutdown',
                      safety: '🟢 SAFE'
                    },
                    {
                      mode: 'fast',
                      signal: 'SIGINT',
                      behavior: 'Terminate all clients forcefully, rollback active transactions, shutdown',
                      safety: '🟡 RISKY'
                    },
                    {
                      mode: 'immediate',
                      signal: 'SIGQUIT',
                      behavior: 'Crash immediately, no cleanup. Crash recovery on next start',
                      safety: '🔴 DANGEROUS'
                    }
                  ].map((item, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid rgba(100, 200, 255, 0.2)' }}>
                      <td style={{ color: '#a0c8ff', padding: '8px', fontWeight: 'bold' }}>{item.mode}</td>
                      <td style={{ color: '#4ade80', padding: '8px', fontFamily: 'monospace' }}>{item.signal}</td>
                      <td style={{ color: '#a0c8ff', padding: '8px', fontSize: '16px' }}>{item.behavior}</td>
                      <td style={{ color: '#a0c8ff', padding: '8px' }}>{item.safety}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div style={{ background: 'rgba(251, 191, 36, 0.1)', padding: '12px', borderRadius: '8px', borderLeft: '3px solid #fbbf24' }}>
                <p style={{ color: '#fbbf24', fontWeight: 'bold', marginBottom: '8px' }}>⚠️ Recommendation:</p>
                <ul style={{ color: '#a0c8ff', fontSize: '16px', marginLeft: '16px' }}>
                  <li>✓ <strong>Default to smart mode:</strong> safest, guaranteed consistency</li>
                  <li>✓ <strong>Use fast mode:</strong> jika smart timeout (jangan sering)</li>
                  <li>✓ <strong>Avoid immediate mode:</strong> only untuk emergency (power failure simulation)</li>
                </ul>
              </div>
            </div>

            <div style={{ background: 'rgba(74, 222, 128, 0.1)', border: '1px solid rgba(74, 222, 128, 0.3)', borderRadius: '12px', padding: '20px' }}>
              <h4 className="text-base font-bold mb-4" style={{ color: '#4ade80' }}>Shutdown Mode Comparison Timeline</h4>
              <div style={{ background: 'rgba(0, 0, 0, 0.2)', padding: '12px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '15px', color: '#a0c8ff', lineHeight: '2' }}>
                <p style={{ color: '#fbbf24', marginBottom: '8px' }}>Command: pg_ctl stop -m smart</p>
                <p>T=0ms:    Receive SIGTERM</p>
                <p style={{ marginLeft: '20px', color: '#4ade80' }}>↓ Disallow new connections</p>
                <p>T=100ms:  Wait existing connections gracefully finish</p>
                <p style={{ marginLeft: '20px', color: '#4ade80' }}>↓ Backends commit/rollback transactions</p>
                <p>T=5000ms: All clients disconnected</p>
                <p style={{ marginLeft: '20px', color: '#4ade80' }}>↓ Flush buffers to disk</p>
                <p>T=5100ms: Shutdown complete ✅</p>

                <p style={{ marginTop: '12px', color: '#fbbf24' }}>Command: pg_ctl stop -m fast</p>
                <p>T=0ms:    Receive SIGINT</p>
                <p style={{ marginLeft: '20px', color: '#f87171' }}>↓ Kill all backend processes (FORCE)</p>
                <p>T=50ms:   Rollback active transactions</p>
                <p style={{ marginLeft: '20px', color: '#f87171' }}>↓ Clients disconnected forcefully</p>
                <p>T=100ms:  Flush buffers</p>
                <p>T=150ms:  Shutdown complete ⚠️</p>

                <p style={{ marginTop: '12px', color: '#fbbf24' }}>Command: pg_ctl stop -m immediate</p>
                <p>T=0ms:    Receive SIGQUIT</p>
                <p style={{ marginLeft: '20px', color: '#f87171' }}>↓ CRASH! No cleanup</p>
                <p>T=10ms:   Process killed</p>
                <p style={{ marginLeft: '20px', color: '#f87171' }}>↓ Crash recovery on next start</p>
                <p>T=?ms:    On next start - run crash recovery 🔴</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'examples' && (
          <div className="space-y-8 animate-float">
            <h3 className="text-lg font-bold" style={{ color: '#64c8ff' }}>💻 Practical Examples</h3>

            <div style={{ background: 'rgba(100, 200, 255, 0.08)', border: '1px solid rgba(100, 200, 255, 0.2)', borderRadius: '12px', padding: '20px' }}>
              <h4 className="text-base font-bold mb-4" style={{ color: '#64c8ff' }}>Scenario 1: Development Setup (Local)</h4>
              <CommandBox
                command="pg_ctl -D ~/postgres_data start -l ~/postgres.log"
                description="Start PostgreSQL for development"
                example="Data in home directory, logs to ~/postgres.log"
              />
              <CommandBox
                command="pg_ctl -D ~/postgres_data status"
                description="Check if server running"
              />
              <CommandBox
                command="pg_ctl -D ~/postgres_data stop -m smart"
                description="Stop gracefully"
              />
            </div>

            <div style={{ background: 'rgba(251, 191, 36, 0.1)', border: '1px solid rgba(251, 191, 36, 0.3)', borderRadius: '12px', padding: '20px' }}>
              <h4 className="text-base font-bold mb-4" style={{ color: '#fbbf24' }}>Scenario 2: Production Server (System Installation)</h4>
              <CommandBox
                command="sudo -u postgres pg_ctl -D /var/lib/postgresql/14/main start"
                description="Start as postgres user (required for system PostgreSQL)"
              />
              <CommandBox
                command="sudo -u postgres pg_ctl -D /var/lib/postgresql/14/main status"
                description="Check status with proper permissions"
              />
              <CommandBox
                command="sudo -u postgres pg_ctl -D /var/lib/postgresql/14/main restart"
                description="Restart PostgreSQL (graceful)"
              />
              <CommandBox
                command="sudo -u postgres pg_ctl -D /var/lib/postgresql/14/main reload"
                description="Reload config without restart (for parameter changes)"
                example="Some parameters require restart (shared_buffers, max_connections, etc)"
              />
            </div>

            <div style={{ background: 'rgba(74, 222, 128, 0.1)', border: '1px solid rgba(74, 222, 128, 0.3)', borderRadius: '12px', padding: '20px' }}>
              <h4 className="text-base font-bold mb-4" style={{ color: '#4ade80' }}>Scenario 3: Maintenance & Config Changes</h4>
              <CommandBox
                command="# Edit postgresql.conf"
                description="Change runtime parameters"
              />
              <CommandBox
                command="sudo -u postgres pg_ctl -D /var/lib/postgresql/14/main reload"
                description="Reload config for runtime parameters (no restart needed)"
                example="Parameters like max_connections require RESTART, not reload"
              />
              <CommandBox
                command="sudo -u postgres pg_ctl -D /var/lib/postgresql/14/main restart -m fast"
                description="For parameters requiring restart (max_connections, shared_buffers, etc)"
                example="Use 'fast' mode to terminate clients quickly (avoid prolonged downtime)"
              />
            </div>

            <div style={{ background: 'rgba(248, 113, 113, 0.1)', border: '1px solid rgba(248, 113, 113, 0.3)', borderRadius: '12px', padding: '20px' }}>
              <h4 className="text-base font-bold mb-4" style={{ color: '#f87171' }}>Scenario 4: Emergency Shutdown</h4>
              <CommandBox
                command="sudo -u postgres pg_ctl -D /var/lib/postgresql/14/main stop -m immediate"
                description="Emergency crash (only for power failure/hardware issue simulation)"
                example="DANGER: Will cause crash recovery on next start. Use ONLY if necessary"
              />
              <CommandBox
                command="pg_ctl -D /var/lib/postgresql/14/main start"
                description="Start after crash recovery"
                example="PostgreSQL will automatically run crash recovery, then start normally"
              />
            </div>

            <div style={{ background: 'rgba(167, 139, 250, 0.1)', border: '1px solid rgba(167, 139, 250, 0.3)', borderRadius: '12px', padding: '20px' }}>
              <h4 className="text-base font-bold mb-4" style={{ color: '#a78bfa' }}>Scenario 5: Replication (Standby Promotion)</h4>
              <CommandBox
                command="sudo -u postgres pg_ctl -D /var/lib/postgresql/14/main promote"
                description="Promote standby to primary (during failover)"
                example="Used in HA setup when primary fails"
              />
            </div>
          </div>
        )}

        {activeTab === 'cheatsheet' && (
          <div className="space-y-8 animate-float">
            <h3 className="text-lg font-bold" style={{ color: '#64c8ff' }}>📋 pg_ctl Quick Cheatsheet</h3>

            <div style={{ background: 'rgba(100, 200, 255, 0.08)', border: '1px solid rgba(100, 200, 255, 0.2)', borderRadius: '12px', padding: '20px' }}>
              <h4 className="text-base font-bold mb-4" style={{ color: '#64c8ff' }}>⚡ Most Common Commands</h4>

              <div className="space-y-2" style={{ marginBottom: '20px' }}>
                <CommandBox
                  command="pg_ctl -D /path/to/data start"
                  description="Start PostgreSQL server"
                />
                <CommandBox
                  command="pg_ctl -D /path/to/data stop"
                  description="Stop PostgreSQL server (graceful, smart mode)"
                />
                <CommandBox
                  command="pg_ctl -D /path/to/data restart"
                  description="Restart PostgreSQL (stop + start)"
                />
                <CommandBox
                  command="pg_ctl -D /path/to/data status"
                  description="Check server status"
                />
                <CommandBox
                  command="pg_ctl -D /path/to/data reload"
                  description="Reload configuration without restart"
                />
              </div>

              <h4 className="text-base font-bold mb-4" style={{ color: '#64c8ff' }}>🔧 Options Quick Reference</h4>
              <div style={{ background: 'rgba(0, 0, 0, 0.2)', padding: '12px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '15px', color: '#a0c8ff', lineHeight: '1.8' }}>
                <p><span style={{ color: '#64c8ff' }}>-D DATADIR</span>     Data directory path (required)</p>
                <p><span style={{ color: '#64c8ff' }}>-l LOGFILE</span>     Log file path</p>
                <p><span style={{ color: '#64c8ff' }}>-w</span>             Wait for command (default)</p>
                <p><span style={{ color: '#64c8ff' }}>-W</span>             Don't wait</p>
                <p><span style={{ color: '#64c8ff' }}>-t SECS</span>        Timeout (default 60)</p>
                <p><span style={{ color: '#64c8ff' }}>-m smart|fast|immediate</span>  Shutdown mode</p>
                <p><span style={{ color: '#64c8ff' }}>-s</span>             Silent mode</p>
              </div>
            </div>

            <div style={{ background: 'rgba(251, 191, 36, 0.1)', border: '1px solid rgba(251, 191, 36, 0.3)', borderRadius: '12px', padding: '20px' }}>
              <h4 className="text-base font-bold mb-4" style={{ color: '#fbbf24' }}>🐧 Linux System-wide Installation</h4>

              <div className="space-y-2">
                <CommandBox
                  command="sudo systemctl start postgresql"
                  description="Start via systemd (recommended for production)"
                />
                <CommandBox
                  command="sudo systemctl stop postgresql"
                  description="Stop via systemd"
                />
                <CommandBox
                  command="sudo systemctl restart postgresql"
                  description="Restart via systemd"
                />
                <CommandBox
                  command="sudo systemctl status postgresql"
                  description="Check status via systemd"
                />
                <CommandBox
                  command="sudo systemctl reload postgresql"
                  description="Reload config via systemd"
                />
              </div>

              <p style={{ color: '#a0c8ff', fontSize: '16px', marginTop: '12px', fontStyle: 'italic' }}>
                💡 Note: Modern Linux distributions use systemd instead of direct pg_ctl. Use systemctl commands above instead.
              </p>
            </div>

            <div style={{ background: 'rgba(74, 222, 128, 0.1)', border: '1px solid rgba(74, 222, 128, 0.3)', borderRadius: '12px', padding: '20px' }}>
              <h4 className="text-base font-bold mb-4" style={{ color: '#4ade80' }}>📊 Shutdown Modes Comparison</h4>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  {[
                    {
                      mode: 'smart',
                      time: 'Slow (wait for clients)',
                      safety: '🟢 Safe',
                      when: 'Maintenance windows, planned downtime'
                    },
                    {
                      mode: 'fast',
                      time: 'Fast (kill clients)',
                      safety: '🟡 Risky',
                      when: 'Time-sensitive, acceptable client disruption'
                    },
                    {
                      mode: 'immediate',
                      time: 'Very fast (crash)',
                      safety: '🔴 Dangerous',
                      when: 'Emergency only'
                    }
                  ].map((row, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid rgba(74, 222, 128, 0.2)' }}>
                      <td style={{ color: '#4ade80', padding: '8px', fontWeight: 'bold' }}>{row.mode}</td>
                      <td style={{ color: '#a0c8ff', padding: '8px' }}>{row.time}</td>
                      <td style={{ color: '#a0c8ff', padding: '8px' }}>{row.safety}</td>
                      <td style={{ color: '#a0c8ff', padding: '8px', fontSize: '16px' }}>{row.when}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ background: 'rgba(100, 200, 255, 0.1)', border: '1px solid rgba(100, 200, 255, 0.2)', borderRadius: '12px', padding: '20px' }}>
              <h4 className="text-base font-bold mb-4" style={{ color: '#64c8ff' }}>✅ Best Practices</h4>
              <ul style={{ color: '#a0c8ff', fontSize: '16px', marginLeft: '16px' }}>
                <li>✓ <strong>Default to smart mode:</strong> Always use graceful shutdown</li>
                <li>✓ <strong>Use -w (wait) option:</strong> Ensure command completes before proceeding</li>
                <li>✓ <strong>Log restart events:</strong> Track when server restarted</li>
                <li>✓ <strong>Check status first:</strong> Verify server state before operations</li>
                <li>✓ <strong>Avoid immediate mode:</strong> Only for testing/emergency</li>
                <li>✓ <strong>Use systemd/service:</strong> Preferred over direct pg_ctl</li>
                <li>✓ <strong>Run as postgres user:</strong> Never as root (security risk)</li>
                <li>✓ <strong>Test reload:</strong> Verify config changes work before restart</li>
              </ul>
            </div>

            <div style={{ background: 'rgba(248, 113, 113, 0.1)', border: '1px solid rgba(248, 113, 113, 0.3)', borderRadius: '12px', padding: '20px' }}>
              <h4 className="text-base font-bold mb-4" style={{ color: '#f87171' }}>⚠️ Common Mistakes to Avoid</h4>
              <ul style={{ color: '#fca5a5', fontSize: '16px', marginLeft: '16px' }}>
                <li>✗ Running pg_ctl as root (causes permission issues)</li>
                <li>✗ Using immediate mode routinely (causes crash recovery)</li>
                <li>✗ Forgetting -D option (must specify data directory)</li>
                <li>✗ Not waiting for stop command (-W flag risks data corruption)</li>
                <li>✗ Restarting without checking config errors first</li>
                <li>✗ Using fast mode in production (data loss risk)</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer style={{ background: 'rgba(15, 20, 25, 0.5)', borderTop: '1px solid rgba(100, 200, 255, 0.2)', marginTop: '60px', padding: '40px 0', textAlign: 'center' }}>
        <p style={{ color: '#708090', fontSize: '18px', marginBottom: '8px' }}>
          🎛️ pg_ctl = Your primary tool untuk manage PostgreSQL server lifecycle
        </p>
        <p style={{ color: '#708090', fontSize: '18px' }}>
          💡 Remember: Always use graceful shutdown (smart mode) untuk production environments! 🚀
        </p>
      </footer>
    </div>
  );
};

export default PostgreSQLPgCtl;