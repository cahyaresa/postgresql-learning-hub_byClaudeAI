import React, { useState, useEffect } from 'react';
import { ChevronDown, Play, Pause, RotateCcw } from 'lucide-react';

const PostgreSQLPgCtlVsSystemd = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedSection, setExpandedSection] = useState('difference');
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {}, 3500);
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
    
    .animate-float { animation: float-up 0.6s ease-out; }
    .animate-slide { animation: slide-in 0.5s ease-out; }
  `;

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0f1419 0%, #1a2332 100%)' }}>
      <style>{animationStyles}</style>

      {/* Header */}
      <header className="border-b" style={{ borderColor: 'rgba(100, 200, 255, 0.2)', background: 'rgba(15, 20, 25, 0.8)' }}>
        <div className="max-w-7xl mx-auto px-6 py-10">
          <h1 className="text-4xl font-bold mb-2" style={{ color: '#e0f2ff', fontFamily: 'Segoe UI' }}>
            pg_ctl vs systemd 🔄
          </h1>
          <p style={{ color: '#a0c8ff', fontSize: '16px' }}>
            Comprehensive comparison: Traditional pg_ctl vs Modern systemd Linux Administration
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 border-b overflow-x-auto pb-4" style={{ borderColor: 'rgba(100, 200, 255, 0.2)' }}>
          {[
            { id: 'overview', label: '📊 Overview', desc: 'High-level comparison' },
            { id: 'differences', label: '🔍 Differences', desc: 'Detailed differences' },
            { id: 'systemd-guide', label: '⚙️ systemd Guide', desc: 'How systemd works' },
            { id: 'unit-file', label: '📄 Unit File', desc: 'PostgreSQL unit file' },
            { id: 'commands', label: '📋 Commands', desc: 'Side-by-side comparison' },
            { id: 'migration', label: '🚀 Migration', desc: 'From pg_ctl to systemd' },
            { id: 'best-practices', label: '✅ Best Practices', desc: 'Production setup' }
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

        {/* Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-float">
            <div style={{ background: 'rgba(100, 200, 255, 0.08)', border: '1px solid rgba(100, 200, 255, 0.2)', borderRadius: '12px', padding: '20px' }}>
              <h3 className="text-lg font-bold mb-4" style={{ color: '#64c8ff' }}>🎯 What is systemd?</h3>
              <p style={{ color: '#a0c8ff', lineHeight: '1.8', fontSize: '14px', marginBottom: '12px' }}>
                <strong>systemd</strong> adalah modern service management system untuk Linux. Menggantikan traditional init.d scripts.
                Ini adalah the first process yang run (PID 1) ketika Linux boot, dan manage semua services.
              </p>
              <div style={{ background: 'rgba(0, 0, 0, 0.2)', padding: '12px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '12px', color: '#a0c8ff', lineHeight: '1.8' }}>
                <p>systemd adalah:</p>
                <p style={{ marginLeft: '20px' }}>✓ Service manager (start/stop/restart services)</p>
                <p style={{ marginLeft: '20px' }}>✓ Dependency manager (manage service order)</p>
                <p style={{ marginLeft: '20px' }}>✓ Socket activation (lazy start services)</p>
                <p style={{ marginLeft: '20px' }}>✓ Auto-restart (restart failed services)</p>
                <p style={{ marginLeft: '20px' }}>✓ Logging (journald - centralized logs)</p>
                <p style={{ marginLeft: '20px' }}>✓ Resource limiting (CPU, memory, disk)</p>
              </div>
            </div>

            <div style={{ background: 'rgba(74, 222, 128, 0.1)', border: '1px solid rgba(74, 222, 128, 0.3)', borderRadius: '12px', padding: '20px' }}>
              <h3 className="text-lg font-bold mb-4" style={{ color: '#4ade80' }}>📌 Quick Comparison</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid rgba(74, 222, 128, 0.3)' }}>
                    <th style={{ color: '#4ade80', textAlign: 'left', padding: '8px' }}>Aspect</th>
                    <th style={{ color: '#64c8ff', textAlign: 'left', padding: '8px' }}>pg_ctl</th>
                    <th style={{ color: '#10b981', textAlign: 'left', padding: '8px' }}>systemd</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { aspect: 'Type', pg_ctl: 'Direct process management', systemd: 'Service abstraction' },
                    { aspect: 'Usage', pg_ctl: 'Manual commands', systemd: 'Automatic management' },
                    { aspect: 'Startup', pg_ctl: 'Manual (pg_ctl start)', systemd: 'Auto on boot' },
                    { aspect: 'Failure handling', pg_ctl: 'Manual intervention', systemd: 'Auto restart' },
                    { aspect: 'Logging', pg_ctl: 'Custom log files', systemd: 'journalctl' },
                    { aspect: 'Dependencies', pg_ctl: 'Manual ordering', systemd: 'Automatic' },
                    { aspect: 'Production use', pg_ctl: '🟡 Possible', systemd: '🟢 Recommended' },
                    { aspect: 'Ease of use', pg_ctl: '🟡 Complex', systemd: '🟢 Simple' }
                  ].map((row, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid rgba(74, 222, 128, 0.2)' }}>
                      <td style={{ color: '#a0c8ff', padding: '8px', fontWeight: 'bold' }}>{row.aspect}</td>
                      <td style={{ color: '#64c8ff', padding: '8px' }}>{row.pg_ctl}</td>
                      <td style={{ color: '#10b981', padding: '8px' }}>{row.systemd}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ background: 'rgba(251, 191, 36, 0.1)', border: '1px solid rgba(251, 191, 36, 0.3)', borderRadius: '12px', padding: '20px' }}>
              <h3 className="text-lg font-bold mb-4" style={{ color: '#fbbf24' }}>🎓 When to use what?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div style={{ background: 'rgba(0, 0, 0, 0.2)', padding: '12px', borderRadius: '8px', borderLeft: '3px solid #64c8ff' }}>
                  <p style={{ color: '#64c8ff', fontWeight: 'bold', marginBottom: '8px' }}>Use pg_ctl when:</p>
                  <ul style={{ color: '#a0c8ff', fontSize: '12px', marginLeft: '12px' }}>
                    <li>• Development/testing locally</li>
                    <li>• Custom scripts need full control</li>
                    <li>• Legacy systems (old Linux)</li>
                    <li>• Interactive management</li>
                  </ul>
                </div>
                <div style={{ background: 'rgba(0, 0, 0, 0.2)', padding: '12px', borderRadius: '8px', borderLeft: '3px solid #10b981' }}>
                  <p style={{ color: '#10b981', fontWeight: 'bold', marginBottom: '8px' }}>Use systemd when:</p>
                  <ul style={{ color: '#a0c8ff', fontSize: '12px', marginLeft: '12px' }}>
                    <li>• Production servers (RECOMMENDED)</li>
                    <li>• Modern Linux (Ubuntu 16+, CentOS 7+)</li>
                    <li>• Want automatic restart/failover</li>
                    <li>• Need centralized logging</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'differences' && (
          <div className="space-y-8 animate-float">
            <h3 className="text-lg font-bold" style={{ color: '#64c8ff' }}>🔍 Detailed Differences</h3>

            {[
              {
                title: '🎯 Purpose & Design',
                items: [
                  {
                    aspect: 'pg_ctl',
                    desc: 'Direct control utility untuk PostgreSQL. Communicate directly dengan database process. Like: manual steering wheel untuk car.'
                  },
                  {
                    aspect: 'systemd',
                    desc: 'Universal service manager untuk Linux. Abstract service concept. Like: automatic transmission dengan cruise control.'
                  }
                ]
              },
              {
                title: '🚀 Startup & Initialization',
                items: [
                  {
                    aspect: 'pg_ctl',
                    desc: 'Manual: must explicitly run "pg_ctl start" every time. Need cron atau script untuk auto-start on boot.'
                  },
                  {
                    aspect: 'systemd',
                    desc: 'Automatic: enable service once, then auto-start on every boot. No manual intervention needed.'
                  }
                ]
              },
              {
                title: '⚠️ Failure Handling',
                items: [
                  {
                    aspect: 'pg_ctl',
                    desc: 'If server crash: nothing happen. Server stay down. Administrator must manually restart.'
                  },
                  {
                    aspect: 'systemd',
                    desc: 'If service fail: automatically restart (configurable). Restart=on-failure setting dalam unit file.'
                  }
                ]
              },
              {
                title: '📊 Logging & Monitoring',
                items: [
                  {
                    aspect: 'pg_ctl',
                    desc: 'Logs scattered: PostgreSQL logs, system logs, startup logs di berbagai files. Manual aggregation.'
                  },
                  {
                    aspect: 'systemd',
                    desc: 'Centralized: journalctl collect semua logs. Query dengan: journalctl -u postgresql'
                  }
                ]
              },
              {
                title: '🔗 Dependency Management',
                items: [
                  {
                    aspect: 'pg_ctl',
                    desc: 'Manual: must manually manage: start networking dulu, then PostgreSQL. Order di script atau cron.'
                  },
                  {
                    aspect: 'systemd',
                    desc: 'Automatic: After=network.target dalam unit file. systemd manage order automatically.'
                  }
                ]
              },
              {
                title: '⚙️ Configuration & Control',
                items: [
                  {
                    aspect: 'pg_ctl',
                    desc: 'Flexibility: full control. Can pass any option via -o flag. Complex untuk complex needs.'
                  },
                  {
                    aspect: 'systemd',
                    desc: 'Standardized: unit file format consistent. Less flexible tapi predictable. Use Environment= untuk variable.'
                  }
                ]
              },
              {
                title: '🔐 Permission & Security',
                items: [
                  {
                    aspect: 'pg_ctl',
                    desc: 'Must run as postgres user: sudo -u postgres pg_ctl. Risk jika sudoers misconfigured.'
                  },
                  {
                    aspect: 'systemd',
                    desc: 'User directive dalam unit file. systemd handle user switch automatically. User=postgres setting.'
                  }
                ]
              },
              {
                title: '🖥️ Resource Management',
                items: [
                  {
                    aspect: 'pg_ctl',
                    desc: 'No built-in limits. PostgreSQL use system resources freely. Might impact other services.'
                  },
                  {
                    aspect: 'systemd',
                    desc: 'Resource limits: MemoryLimit, CPUQuota, DiskIOMax dalam unit file. Isolate resources per service.'
                  }
                ]
              }
            ].map((section, idx) => (
              <div key={idx} style={{ background: 'rgba(100, 200, 255, 0.08)', border: '1px solid rgba(100, 200, 255, 0.2)', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
                <h4 className="text-base font-bold mb-4" style={{ color: '#64c8ff' }}>{section.title}</h4>
                <div className="space-y-3">
                  {section.items.map((item, itemIdx) => (
                    <div key={itemIdx} style={{ background: 'rgba(0, 0, 0, 0.2)', padding: '12px', borderRadius: '8px', borderLeft: '3px solid #64c8ff' }}>
                      <p style={{ color: '#64c8ff', fontWeight: 'bold', fontSize: '12px', marginBottom: '4px' }}>
                        {item.aspect}:
                      </p>
                      <p style={{ color: '#a0c8ff', fontSize: '12px' }}>{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'systemd-guide' && (
          <div className="space-y-8 animate-float">
            <h3 className="text-lg font-bold" style={{ color: '#64c8ff' }}>⚙️ How systemd Works</h3>

            <div style={{ background: 'rgba(100, 200, 255, 0.08)', border: '1px solid rgba(100, 200, 255, 0.2)', borderRadius: '12px', padding: '20px' }}>
              <h4 className="text-base font-bold mb-4" style={{ color: '#64c8ff' }}>Architecture</h4>
              <div style={{ background: 'rgba(0, 0, 0, 0.2)', padding: '16px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '12px', color: '#a0c8ff', lineHeight: '2' }}>
                <p style={{ color: '#64c8ff', marginBottom: '12px', fontWeight: 'bold' }}>Linux Boot Process:</p>
                <p>BIOS/UEFI</p>
                <p style={{ marginLeft: '20px', color: '#4ade80' }}>↓ Load bootloader</p>
                <p>Kernel load</p>
                <p style={{ marginLeft: '20px', color: '#4ade80' }}>↓ Initialize hardware</p>
                <p>systemd started (PID 1)</p>
                <p style={{ marginLeft: '20px', color: '#4ade80' }}>↓ Main process, manage everything</p>
                <p>Load unit files (/etc/systemd/system/*.service)</p>
                <p style={{ marginLeft: '20px', color: '#4ade80' }}>↓ Read unit file: postgresql.service</p>
                <p>Start enabled services</p>
                <p style={{ marginLeft: '20px', color: '#4ade80' }}>↓ If Enable=yes, systemctl start postgresql</p>
                <p>Boot complete, system ready!</p>
              </div>
            </div>

            <div style={{ background: 'rgba(74, 222, 128, 0.1)', border: '1px solid rgba(74, 222, 128, 0.3)', borderRadius: '12px', padding: '20px' }}>
              <h4 className="text-base font-bold mb-4" style={{ color: '#4ade80' }}>Unit Files</h4>
              <p style={{ color: '#a0c8ff', fontSize: '12px', marginBottom: '12px' }}>
                Unit file = configuration file yang describe service. Format: INI-style, human-readable.
              </p>
              <div style={{ background: 'rgba(0, 0, 0, 0.2)', padding: '12px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '11px', color: '#a0c8ff', lineHeight: '1.8' }}>
                <p style={{ color: '#64c8ff', marginBottom: '8px', fontWeight: 'bold' }}>Location:</p>
                <p>/etc/systemd/system/postgresql.service</p>
                <p style={{ marginTop: '12px', color: '#64c8ff', fontWeight: 'bold' }}>Contents:</p>
                <p style={{ color: '#fbbf24' }}>[Unit]</p>
                <p style={{ marginLeft: '20px', color: '#a0c8ff' }}>Description=PostgreSQL Database Server</p>
                <p style={{ marginLeft: '20px', color: '#a0c8ff' }}>After=network.target</p>
                <p style={{ color: '#fbbf24', marginTop: '8px' }}>[Service]</p>
                <p style={{ marginLeft: '20px', color: '#a0c8ff' }}>Type=notify</p>
                <p style={{ marginLeft: '20px', color: '#a0c8ff' }}>User=postgres</p>
                <p style={{ marginLeft: '20px', color: '#a0c8ff' }}>ExecStart=/usr/lib/postgresql/14/bin/postgres -D /var/lib/postgresql/14/main</p>
                <p style={{ marginLeft: '20px', color: '#a0c8ff' }}>Restart=on-failure</p>
                <p style={{ color: '#fbbf24', marginTop: '8px' }}>[Install]</p>
                <p style={{ marginLeft: '20px', color: '#a0c8ff' }}>WantedBy=multi-user.target</p>
              </div>
            </div>

            <div style={{ background: 'rgba(251, 191, 36, 0.1)', border: '1px solid rgba(251, 191, 36, 0.3)', borderRadius: '12px', padding: '20px' }}>
              <h4 className="text-base font-bold mb-4" style={{ color: '#fbbf24' }}>📚 Key Concepts</h4>
              <div className="space-y-3">
                {[
                  { term: 'Units', def: 'Objects systemd manage (services, timers, mounts, etc)' },
                  { term: '[Unit]', def: 'Metadata: description, dependencies (After=, Before=, Requires=)' },
                  { term: '[Service]', def: 'Service config: how to start, stop, restart, resource limits' },
                  { term: '[Install]', def: 'Enable/disable config: when to start (WantedBy=)' },
                  { term: 'Type=', def: 'Service type: simple, notify, forking, oneshot' },
                  { term: 'Restart=', def: 'Restart policy: no, always, on-failure, on-abnormal' },
                  { term: 'ExecStart=', def: 'Command to start service' },
                  { term: 'ExecStop=', def: 'Command to stop service (optional)' },
                  { term: 'User=', def: 'Run service as this user (postgres)' },
                  { term: 'Environment=', def: 'Set environment variables untuk service' }
                ].map((item, idx) => (
                  <div key={idx} style={{ background: 'rgba(0, 0, 0, 0.2)', padding: '10px', borderRadius: '6px' }}>
                    <p style={{ color: '#fbbf24', fontWeight: 'bold', fontSize: '11px', marginBottom: '3px' }}>
                      {item.term}
                    </p>
                    <p style={{ color: '#a0c8ff', fontSize: '11px' }}>{item.def}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'unit-file' && (
          <div className="space-y-8 animate-float">
            <h3 className="text-lg font-bold" style={{ color: '#64c8ff' }}>📄 PostgreSQL systemd Unit File</h3>

            <div style={{ background: 'rgba(100, 200, 255, 0.08)', border: '1px solid rgba(100, 200, 255, 0.2)', borderRadius: '12px', padding: '20px' }}>
              <h4 className="text-base font-bold mb-4" style={{ color: '#64c8ff' }}>Complete Example</h4>
              <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '16px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '11px', color: '#a0c8ff', lineHeight: '1.7', overflowX: 'auto' }}>
                <pre>{`[Unit]
# Metadata tentang service
Description=PostgreSQL Database Server
Documentation=man:postgres(1)
# Start setelah network ready
After=network.target
# Jangan start jika filesystem read-only
ConditionVirtualization=!container

[Service]
# Type: simple = ExecStart tidak fork
Type=notify
# Restart otomatis jika crash
Restart=on-failure
RestartSec=5s

# User dan group untuk run PostgreSQL
User=postgres
Group=postgres

# Environment variables
Environment="PGDATA=/var/lib/postgresql/14/main"
Environment="PGPORT=5432"

# Start command (ExecStart)
ExecStart=/usr/lib/postgresql/14/bin/postgres \\
    -D /var/lib/postgresql/14/main \\
    -c config_file=/etc/postgresql/14/main/postgresql.conf

# Pre-start script (optional)
ExecStartPre=/usr/lib/postgresql/14/bin/initdb -D /var/lib/postgresql/14/main
    (only if not initialized)

# Stop command (graceful shutdown)
ExecStop=/usr/lib/postgresql/14/bin/pg_ctl stop -D /var/lib/postgresql/14/main -m fast

# Reload config tanpa restart
ExecReload=/bin/kill -HUP $MAINPID

# Resource limits
MemoryLimit=2G           # Max 2GB RAM
CPUQuota=80%             # Max 80% CPU
DiskIOMax=disk1:50M      # Disk I/O limit

# Process management
KillMode=mixed           # Graceful stop, then force kill
KillSignal=SIGINT        # Signal untuk stop
TimeoutStopSec=30        # Wait 30s before force kill

# Crash recovery
StandardOutput=journal
StandardError=journal
SyslogIdentifier=postgres

# Security
NoNewPrivileges=true
ProtectSystem=strict
ProtectHome=true
PrivateTmp=true

[Install]
# Auto-start on boot
WantedBy=multi-user.target
# Start before graphical target
Before=graphical.target`}</pre>
              </div>
            </div>

            <div style={{ background: 'rgba(74, 222, 128, 0.1)', border: '1px solid rgba(74, 222, 128, 0.3)', borderRadius: '12px', padding: '20px' }}>
              <h4 className="text-base font-bold mb-4" style={{ color: '#4ade80' }}>Minimal Version (Simple)</h4>
              <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '16px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '11px', color: '#a0c8ff', lineHeight: '1.8' }}>
                <pre>{`[Unit]
Description=PostgreSQL Database Server
After=network.target

[Service]
Type=notify
User=postgres
ExecStart=/usr/lib/postgresql/14/bin/postgres -D /var/lib/postgresql/14/main
Restart=on-failure

[Install]
WantedBy=multi-user.target`}</pre>
              </div>
            </div>

            <div style={{ background: 'rgba(251, 191, 36, 0.1)', border: '1px solid rgba(251, 191, 36, 0.3)', borderRadius: '12px', padding: '20px' }}>
              <h4 className="text-base font-bold mb-4" style={{ color: '#fbbf24' }}>📝 How to Create/Edit</h4>
              <div style={{ background: 'rgba(0, 0, 0, 0.2)', padding: '12px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '12px', color: '#a0c8ff', lineHeight: '2' }}>
                <p># Edit atau create unit file</p>
                <p style={{ color: '#4ade80' }}>sudo nano /etc/systemd/system/postgresql.service</p>
                <p style={{ marginTop: '12px' }}># Reload systemd to read new/changed unit files</p>
                <p style={{ color: '#4ade80' }}>sudo systemctl daemon-reload</p>
                <p style={{ marginTop: '12px' }}># Enable service (auto-start on boot)</p>
                <p style={{ color: '#4ade80' }}>sudo systemctl enable postgresql</p>
                <p style={{ marginTop: '12px' }}># Start service</p>
                <p style={{ color: '#4ade80' }}>sudo systemctl start postgresql</p>
                <p style={{ marginTop: '12px' }}># Check status</p>
                <p style={{ color: '#4ade80' }}>sudo systemctl status postgresql</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'commands' && (
          <div className="space-y-8 animate-float">
            <h3 className="text-lg font-bold" style={{ color: '#64c8ff' }}>📋 Command Comparison</h3>

            <div style={{ background: 'rgba(100, 200, 255, 0.08)', border: '1px solid rgba(100, 200, 255, 0.2)', borderRadius: '12px', padding: '20px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid rgba(100, 200, 255, 0.3)' }}>
                    <th style={{ color: '#64c8ff', textAlign: 'left', padding: '8px', width: '25%' }}>Task</th>
                    <th style={{ color: '#64c8ff', textAlign: 'left', padding: '8px', width: '40%' }}>pg_ctl Way</th>
                    <th style={{ color: '#10b981', textAlign: 'left', padding: '8px', width: '35%' }}>systemd Way</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      task: 'Start server',
                      pg_ctl: 'pg_ctl -D /path start',
                      systemd: 'systemctl start postgresql'
                    },
                    {
                      task: 'Stop server',
                      pg_ctl: 'pg_ctl -D /path stop',
                      systemd: 'systemctl stop postgresql'
                    },
                    {
                      task: 'Restart server',
                      pg_ctl: 'pg_ctl -D /path restart',
                      systemd: 'systemctl restart postgresql'
                    },
                    {
                      task: 'Reload config',
                      pg_ctl: 'pg_ctl -D /path reload',
                      systemd: 'systemctl reload postgresql'
                    },
                    {
                      task: 'Check status',
                      pg_ctl: 'pg_ctl -D /path status',
                      systemd: 'systemctl status postgresql'
                    },
                    {
                      task: 'Enable auto-start',
                      pg_ctl: 'Add to /etc/rc.local atau cron',
                      systemd: 'systemctl enable postgresql'
                    },
                    {
                      task: 'Disable auto-start',
                      pg_ctl: 'Remove from rc.local atau cron',
                      systemd: 'systemctl disable postgresql'
                    },
                    {
                      task: 'View logs',
                      pg_ctl: 'tail -f /var/log/postgresql.log',
                      systemd: 'journalctl -u postgresql -f'
                    },
                    {
                      task: 'View error logs',
                      pg_ctl: 'grep ERROR /var/log/postgresql.log',
                      systemd: 'journalctl -u postgresql -p err'
                    },
                    {
                      task: 'Get last 100 lines',
                      pg_ctl: 'tail -100 /var/log/postgresql.log',
                      systemd: 'journalctl -u postgresql -n 100'
                    },
                    {
                      task: 'List all services',
                      pg_ctl: 'ps aux | grep postgres',
                      systemd: 'systemctl list-units --type service'
                    },
                    {
                      task: 'Force stop (kill)',
                      pg_ctl: 'killall postgres',
                      systemd: 'systemctl kill postgresql'
                    }
                  ].map((row, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid rgba(100, 200, 255, 0.2)' }}>
                      <td style={{ color: '#a0c8ff', padding: '8px', fontWeight: 'bold' }}>{row.task}</td>
                      <td style={{ color: '#64c8ff', padding: '8px', fontFamily: 'monospace', fontSize: '11px' }}>{row.pg_ctl}</td>
                      <td style={{ color: '#10b981', padding: '8px', fontFamily: 'monospace', fontSize: '11px' }}>{row.systemd}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ background: 'rgba(74, 222, 128, 0.1)', border: '1px solid rgba(74, 222, 128, 0.3)', borderRadius: '12px', padding: '20px' }}>
              <h4 className="text-base font-bold mb-4" style={{ color: '#4ade80' }}>systemctl Advanced Commands</h4>
              <div className="space-y-2">
                {[
                  { cmd: 'systemctl is-active postgresql', desc: 'Check if service currently running (exit 0=yes, 1=no)' },
                  { cmd: 'systemctl is-enabled postgresql', desc: 'Check if service enabled for auto-start (exit 0=yes, 1=no)' },
                  { cmd: 'systemctl show postgresql', desc: 'Show detailed unit properties' },
                  { cmd: 'systemctl mask postgresql', desc: 'Prevent service dari start (even jika enabled)' },
                  { cmd: 'systemctl unmask postgresql', desc: 'Allow service start again (after mask)' },
                  { cmd: 'systemctl isolate multi-user.target', desc: 'Boot ke level (hati-hati, stop GUI)' },
                  { cmd: 'systemctl list-dependencies postgresql', desc: 'Show dependencies graph' },
                  { cmd: 'journalctl -u postgresql --since "1 hour ago"', desc: 'View logs since 1 hour ago' },
                  { cmd: 'journalctl -u postgresql -S 2024-01-15 -U 2024-01-16', desc: 'View logs untuk specific date range' }
                ].map((item, idx) => (
                  <div key={idx} style={{ background: 'rgba(0, 0, 0, 0.2)', padding: '10px', borderRadius: '6px' }}>
                    <p style={{ color: '#4ade80', fontWeight: 'bold', fontSize: '11px', fontFamily: 'monospace', marginBottom: '3px' }}>
                      {item.cmd}
                    </p>
                    <p style={{ color: '#a0c8ff', fontSize: '11px' }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'migration' && (
          <div className="space-y-8 animate-float">
            <h3 className="text-lg font-bold" style={{ color: '#64c8ff' }}>🚀 Migration from pg_ctl to systemd</h3>

            <div style={{ background: 'rgba(100, 200, 255, 0.08)', border: '1px solid rgba(100, 200, 255, 0.2)', borderRadius: '12px', padding: '20px' }}>
              <h4 className="text-base font-bold mb-4" style={{ color: '#64c8ff' }}>Step-by-Step Migration</h4>
              <div className="space-y-4">
                {[
                  {
                    step: '1️⃣ Preparation',
                    tasks: [
                      'Check PostgreSQL version: postgres --version',
                      'Check Linux version: lsb_release -a',
                      'Backup database: pg_dump backup.sql',
                      'Backup postgresql.conf: cp postgresql.conf postgresql.conf.bak'
                    ]
                  },
                  {
                    step: '2️⃣ Check systemd Support',
                    tasks: [
                      'Check if postgresql.service already exist:',
                      '  ls -la /etc/systemd/system/postgresql.service',
                      'Check if package install service file:',
                      '  dpkg -L postgresql-14 | grep systemd'
                    ]
                  },
                  {
                    step: '3️⃣ Stop Current pg_ctl',
                    tasks: [
                      'Gracefully stop using pg_ctl:',
                      '  sudo -u postgres pg_ctl -D /path stop',
                      'Verify stopped:',
                      '  pg_ctl -D /path status'
                    ]
                  },
                  {
                    step: '4️⃣ Create/Configure Unit File',
                    tasks: [
                      'Create unit file: /etc/systemd/system/postgresql.service',
                      'OR copy from package: cp /usr/share/postgresql/postgresql.service /etc/systemd/system/',
                      'Edit untuk custom settings (PGDATA, port, etc)',
                      'sudo nano /etc/systemd/system/postgresql.service'
                    ]
                  },
                  {
                    step: '5️⃣ Reload systemd',
                    tasks: [
                      'Tell systemd to re-read config files:',
                      '  sudo systemctl daemon-reload',
                      'Verify service registered:',
                      '  sudo systemctl list-unit-files | grep postgresql'
                    ]
                  },
                  {
                    step: '6️⃣ Test Start via systemd',
                    tasks: [
                      'Start service:',
                      '  sudo systemctl start postgresql',
                      'Check status:',
                      '  sudo systemctl status postgresql',
                      'Verify data loaded:',
                      '  psql -l'
                    ]
                  },
                  {
                    step: '7️⃣ Enable Auto-Start',
                    tasks: [
                      'Enable service untuk auto-start on boot:',
                      '  sudo systemctl enable postgresql',
                      'Verify enabled:',
                      '  sudo systemctl is-enabled postgresql'
                    ]
                  },
                  {
                    step: '8️⃣ Remove Old Startup Methods',
                    tasks: [
                      'Remove dari rc.local if exists:',
                      '  Remove pg_ctl start lines dari /etc/rc.local',
                      'Remove dari cron if exists:',
                      '  Remove pg_ctl start dari crontab',
                      'Remove dari supervisord/monit if used:',
                      '  Remove postgresql configuration'
                    ]
                  },
                  {
                    step: '9️⃣ Test Reboot',
                    tasks: [
                      'Reboot server:',
                      '  sudo reboot',
                      'Verify auto-started:',
                      '  sudo systemctl status postgresql',
                      'Verify data accessible:',
                      '  psql -l'
                    ]
                  }
                ].map((item, idx) => (
                  <div key={idx} style={{ background: 'rgba(0, 0, 0, 0.2)', padding: '12px', borderRadius: '8px', borderLeft: '3px solid #64c8ff' }}>
                    <p style={{ color: '#64c8ff', fontWeight: 'bold', marginBottom: '8px' }}>{item.step}</p>
                    <ul style={{ color: '#a0c8ff', fontSize: '12px', marginLeft: '16px' }}>
                      {item.tasks.map((task, tidx) => (
                        <li key={tidx}>{task}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: 'rgba(251, 191, 36, 0.1)', border: '1px solid rgba(251, 191, 36, 0.3)', borderRadius: '12px', padding: '20px' }}>
              <h4 className="text-base font-bold mb-4" style={{ color: '#fbbf24' }}>⚠️ Common Migration Issues</h4>
              <div className="space-y-3">
                {[
                  {
                    issue: 'Unit file tidak found',
                    solution: 'Check path: /etc/systemd/system/postgresql.service. Create if missing dengan template di atas.'
                  },
                  {
                    issue: 'Service start failure',
                    solution: 'Check logs: journalctl -u postgresql -n 50. Usually permission issues atau config error.'
                  },
                  {
                    issue: 'Database port in use',
                    solution: 'Check if old instance still running: ps aux | grep postgres. Kill if orphaned: pkill postgres'
                  },
                  {
                    issue: 'ExecStart command wrong',
                    solution: 'Verify path ke postgres binary: which postgres atau /usr/lib/postgresql/14/bin/postgres --version'
                  },
                  {
                    issue: 'PGDATA permission denied',
                    solution: 'Check ownership: ls -la /var/lib/postgresql/. Should be: postgres:postgres'
                  }
                ].map((item, idx) => (
                  <div key={idx} style={{ background: 'rgba(0, 0, 0, 0.2)', padding: '10px', borderRadius: '6px' }}>
                    <p style={{ color: '#fbbf24', fontWeight: 'bold', fontSize: '11px', marginBottom: '3px' }}>
                      ❌ {item.issue}
                    </p>
                    <p style={{ color: '#a0c8ff', fontSize: '11px' }}>✓ Solution: {item.solution}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'best-practices' && (
          <div className="space-y-8 animate-float">
            <h3 className="text-lg font-bold" style={{ color: '#64c8ff' }}>✅ Best Practices for Production</h3>

            <div style={{ background: 'rgba(74, 222, 128, 0.1)', border: '1px solid rgba(74, 222, 128, 0.3)', borderRadius: '12px', padding: '20px' }}>
              <h4 className="text-base font-bold mb-4" style={{ color: '#4ade80' }}>🎯 systemd Best Practices</h4>
              <div className="space-y-3">
                {[
                  {
                    title: '1. Use Official Unit Files',
                    desc: 'Use unit files dari PostgreSQL package jika available, atau from official documentation. Tested dan maintained.'
                  },
                  {
                    title: '2. Resource Limits',
                    desc: 'Set appropriate limits: MemoryLimit, CPUQuota. Prevent runaway processes affecting server.'
                  },
                  {
                    title: '3. Auto-Restart',
                    desc: 'Set Restart=on-failure untuk automatic recovery. Enable service reliability.'
                  },
                  {
                    title: '4. Proper Signals',
                    desc: 'Use KillSignal=SIGINT untuk graceful stop. SIGKILL=hard kill. Avoid data corruption.'
                  },
                  {
                    title: '5. Timeouts',
                    desc: 'Set TimeoutStopSec=30 untuk graceful shutdown window. Long enough untuk clean shutdown.'
                  },
                  {
                    title: '6. Logging',
                    desc: 'Use StandardOutput=journal, StandardError=journal. Centralized logging via journalctl.'
                  },
                  {
                    title: '7. Dependencies',
                    desc: 'Set After=network.target untuk proper boot order. Ensure networking ready before PostgreSQL.'
                  },
                  {
                    title: '8. Monitoring',
                    desc: 'Monitor service: journalctl -u postgresql -f. Setup alerts untuk restart events.'
                  },
                  {
                    title: '9. Security',
                    desc: 'Set User=postgres, ProtectSystem=strict, PrivateTmp=true. Limit service privileges.'
                  },
                  {
                    title: '10. Documentation',
                    desc: 'Add comments dalam unit file. Document any custom configurations untuk future reference.'
                  }
                ].map((item, idx) => (
                  <div key={idx} style={{ background: 'rgba(0, 0, 0, 0.2)', padding: '12px', borderRadius: '8px' }}>
                    <p style={{ color: '#4ade80', fontWeight: 'bold', fontSize: '12px', marginBottom: '4px' }}>
                      {item.title}
                    </p>
                    <p style={{ color: '#a0c8ff', fontSize: '11px' }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: 'rgba(100, 200, 255, 0.1)', border: '1px solid rgba(100, 200, 255, 0.2)', borderRadius: '12px', padding: '20px' }}>
              <h4 className="text-base font-bold mb-4" style={{ color: '#64c8ff' }}>📋 Production Checklist</h4>
              <ul style={{ color: '#a0c8ff', fontSize: '12px', marginLeft: '12px' }}>
                <li>☑️ PostgreSQL version tested on production Linux version</li>
                <li>☑️ Unit file reviewed dan customized untuk environment</li>
                <li>☑️ Database backup exist before migration</li>
                <li>☑️ PGDATA permissions correct (postgres:postgres)</li>
                <li>☑️ Unit file tested: systemctl start/stop/restart</li>
                <li>☑️ Service enabled: systemctl enable postgresql</li>
                <li>☑️ Auto-restart configured: Restart=on-failure</li>
                <li>☑️ Logging working: journalctl -u postgresql</li>
                <li>☑️ Resource limits appropriate: MemoryLimit, CPUQuota</li>
                <li>☑️ Reboot tested: verify auto-start after reboot</li>
                <li>☑️ Monitoring setup: alerts untuk restart events</li>
                <li>☑️ Documentation updated: how to manage PostgreSQL on this server</li>
              </ul>
            </div>

            <div style={{ background: 'rgba(248, 113, 113, 0.1)', border: '1px solid rgba(248, 113, 113, 0.3)', borderRadius: '12px', padding: '20px' }}>
              <h4 className="text-base font-bold mb-4" style={{ color: '#f87171' }}>⚠️ Avoid These Mistakes</h4>
              <ul style={{ color: '#fca5a5', fontSize: '12px', marginLeft: '12px' }}>
                <li>✗ Running pg_ctl directly in production (use systemd)</li>
                <li>✗ Forgetting systemctl daemon-reload after unit changes</li>
                <li>✗ Not enabling service (system reboot lose PostgreSQL!)</li>
                <li>✗ Using Restart=always (endless loop on persistent errors)</li>
                <li>✗ Forgetting backup before migration</li>
                <li>✗ Using hard kill signals (SIGKILL) unnecessarily</li>
                <li>✗ Not monitoring service health dopo migration</li>
                <li>✗ Keeping old pg_ctl startup methods after migration</li>
                <li>✗ Running unit file as root (use User=postgres)</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer style={{ background: 'rgba(15, 20, 25, 0.5)', borderTop: '1px solid rgba(100, 200, 255, 0.2)', marginTop: '60px', padding: '40px 0', textAlign: 'center' }}>
        <p style={{ color: '#708090', fontSize: '14px', marginBottom: '8px' }}>
          🔄 pg_ctl = Legacy approach. systemd = Modern, recommended way untuk manage PostgreSQL
        </p>
        <p style={{ color: '#708090', fontSize: '14px' }}>
          💡 Use systemd in production! Auto-restart, logging, dependencies, reliability - semua built-in! 🚀
        </p>
      </footer>
    </div>
  );
};

export default PostgreSQLPgCtlVsSystemd;