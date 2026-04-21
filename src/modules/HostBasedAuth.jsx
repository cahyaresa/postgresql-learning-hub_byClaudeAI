import React, { useState, useEffect } from 'react';
import { ChevronDown, Play, Pause, RotateCcw, Copy } from 'lucide-react';

const PostgreSQLHostBasedAuth = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedSection, setExpandedSection] = useState('what-is-hba');
  const [isPlaying, setIsPlaying] = useState(true);
  const [copiedCmd, setCopiedCmd] = useState(null);

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

  const RuleBox = ({ rule, description, example = null, color = '#64c8ff' }) => (
    <div style={{ background: 'rgba(0, 0, 0, 0.2)', padding: '12px', borderRadius: '8px', marginBottom: '10px', borderLeft: `3px solid ${color}` }}>
      <code style={{ color: color, fontFamily: 'monospace', fontWeight: 'bold', fontSize: '12px', display: 'block', marginBottom: '6px' }}>
        {rule}
      </code>
      <p style={{ color: '#a0c8ff', fontSize: '11px', marginBottom: '4px' }}>
        {description}
      </p>
      {example && (
        <p style={{ color: '#708090', fontSize: '10px', fontStyle: 'italic' }}>
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
            PostgreSQL Host-Based Authentication 🔐
          </h1>
          <p style={{ color: '#a0c8ff', fontSize: '16px' }}>
            pg_hba.conf: Controlling client connections, authentication methods, dan access policies
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 border-b overflow-x-auto pb-4" style={{ borderColor: 'rgba(100, 200, 255, 0.2)' }}>
          {[
            { id: 'overview', label: '📖 Overview', desc: 'What is HBA' },
            { id: 'structure', label: '📋 Structure', desc: 'pg_hba.conf format' },
            { id: 'connection-types', label: '🔗 Connection Types', desc: 'local, host, hostssl' },
            { id: 'auth-methods', label: '🔑 Auth Methods', desc: 'trust, md5, password, etc' },
            { id: 'examples', label: '💻 Examples', desc: 'Practical scenarios' },
            { id: 'security', label: '🛡️ Security', desc: 'Best practices' },
            { id: 'troubleshooting', label: '⚠️ Troubleshooting', desc: 'Common issues' },
            { id: 'hba-config', label: '📄 HBA Config', desc: 'Contoh konfigurasi pg_hba.conf' }
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
            <div
              onClick={() => setExpandedSection(expandedSection === 'what-is-hba' ? null : 'what-is-hba')}
              className="p-4 rounded-lg cursor-pointer transition-all"
              style={{
                background: expandedSection === 'what-is-hba' ? 'rgba(100, 200, 255, 0.15)' : 'rgba(100, 200, 255, 0.08)',
                border: expandedSection === 'what-is-hba' ? '2px solid #64c8ff' : '1px solid rgba(100, 200, 255, 0.2)'
              }}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold" style={{ color: '#64c8ff' }}>What is Host-Based Authentication?</h3>
                <ChevronDown
                  size={24}
                  style={{
                    color: '#64c8ff',
                    transform: expandedSection === 'what-is-hba' ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s'
                  }}
                />
              </div>

              {expandedSection === 'what-is-hba' && (
                <div className="mt-6 space-y-4">
                  <p style={{ color: '#a0c8ff', lineHeight: '1.8', fontSize: '15px' }}>
                    <strong>Host-Based Authentication (HBA)</strong> adalah PostgreSQL mechanism untuk control client connections. 
                    Config file <strong>pg_hba.conf</strong> define siapa boleh connect, dari mana, dan dengan method apa untuk authenticate.
                  </p>

                  <div style={{ background: 'rgba(74, 222, 128, 0.1)', padding: '16px', borderRadius: '8px', borderLeft: '3px solid #4ade80' }}>
                    <p style={{ color: '#4ade80', fontWeight: 'bold', marginBottom: '12px' }}>🎯 Purpose:</p>
                    <ul style={{ color: '#a0c8ff', fontSize: '13px', marginLeft: '16px' }}>
                      <li>✓ Control siapa boleh connect ke PostgreSQL</li>
                      <li>✓ Specify authentication method (password, certificate, etc)</li>
                      <li>✓ Allow/deny based on: user, host, database, IP range</li>
                      <li>✓ Enforce security policies (SSL/TLS, password rules)</li>
                      <li>✓ First line of defense sebelum database authentication</li>
                    </ul>
                  </div>

                  <div style={{ background: 'rgba(100, 200, 255, 0.1)', padding: '16px', borderRadius: '8px', borderLeft: '3px solid #64c8ff' }}>
                    <p style={{ color: '#64c8ff', fontWeight: 'bold', marginBottom: '12px' }}>📍 Location:</p>
                    <code style={{ color: '#86efac', fontFamily: 'monospace', display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                      {`$PGDATA/pg_hba.conf`}
                    </code>
                    <p style={{ color: '#a0c8ff', fontSize: '12px' }}>
                      Example: <code style={{ color: '#86efac', fontFamily: 'monospace' }}>/var/lib/postgresql/14/main/pg_hba.conf</code>
                    </p>
                  </div>

                  <div style={{ background: 'rgba(251, 191, 36, 0.1)', padding: '16px', borderRadius: '8px', borderLeft: '3px solid #fbbf24' }}>
                    <p style={{ color: '#fbbf24', fontWeight: 'bold', marginBottom: '12px' }}>⚡ How It Works:</p>
                    <div style={{ background: 'rgba(0, 0, 0, 0.2)', padding: '12px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '12px', color: '#a0c8ff', lineHeight: '2' }}>
                      <p>Client connection request</p>
                      <p style={{ marginLeft: '20px', color: '#4ade80' }}>↓ PostgreSQL read pg_hba.conf</p>
                      <p>Check FIRST MATCHING RULE:</p>
                      <p style={{ marginLeft: '20px' }}>· Connection type match? (local/host/hostssl)</p>
                      <p style={{ marginLeft: '20px' }}>· Database match?</p>
                      <p style={{ marginLeft: '20px' }}>· User match?</p>
                      <p style={{ marginLeft: '20px' }}>· Address/IP match?</p>
                      <p style={{ marginLeft: '20px', color: '#4ade80' }}>↓ If ALL match, use authentication method</p>
                      <p>Execute auth method (password prompt, certificate check, etc)</p>
                      <p style={{ marginLeft: '20px', color: '#4ade80' }}>↓ Success = connection allowed</p>
                      <p>Client connected! ✅</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div style={{ background: 'rgba(100, 200, 255, 0.08)', border: '1px solid rgba(100, 200, 255, 0.2)', borderRadius: '12px', padding: '20px' }}>
              <h3 className="text-lg font-bold mb-4" style={{ color: '#64c8ff' }}>🔍 Simple Example</h3>
              <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '12px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '12px', color: '#a0c8ff', lineHeight: '1.8' }}>
                <p style={{ color: '#fbbf24', marginBottom: '8px' }}>pg_hba.conf entry:</p>
                <p>host    database    user    192.168.1.0/24    md5</p>
                <p style={{ marginTop: '12px', color: '#4ade80' }}>Meaning:</p>
                <p style={{ marginLeft: '20px' }}>· Connection type: host (TCP/IP)</p>
                <p style={{ marginLeft: '20px' }}>· Untuk: all databases ("database")</p>
                <p style={{ marginLeft: '20px' }}>· Untuk user: semua users ("user")</p>
                <p style={{ marginLeft: '20px' }}>· Dari IP: 192.168.1.0 to 192.168.1.255</p>
                <p style={{ marginLeft: '20px' }}>· Auth method: md5 password</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'structure' && (
          <div className="space-y-8 animate-float">
            <h3 className="text-lg font-bold" style={{ color: '#64c8ff' }}>📋 pg_hba.conf Structure</h3>

            <div style={{ background: 'rgba(100, 200, 255, 0.08)', border: '1px solid rgba(100, 200, 255, 0.2)', borderRadius: '12px', padding: '20px' }}>
              <h4 className="text-base font-bold mb-4" style={{ color: '#64c8ff' }}>Format: 5 Required Fields</h4>
              <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '16px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '13px', color: '#64c8ff', lineHeight: '2', marginBottom: '20px' }}>
                <p style={{ color: '#fbbf24', marginBottom: '8px' }}>CONNECTION_TYPE  DATABASE  USER  ADDRESS  AUTH_METHOD</p>
                <p>├─ TYPE:         local | host | hostssl | hostnossl</p>
                <p>├─ DATABASE:     database_name | all | @include_file | replication</p>
                <p>├─ USER:         role_name | all | +group_name | @include_file</p>
                <p>├─ ADDRESS:      IP_ADDRESS | IP_MASK | HOSTNAME | local | samehost | samenet</p>
                <p>└─ AUTH_METHOD:  trust | reject | md5 | password | scram-sha-256 | gss | ldap | cert | pam | radius</p>
              </div>

              <h4 className="text-base font-bold mb-4" style={{ color: '#64c8ff' }}>Field Details</h4>
              <div className="space-y-3">
                {[
                  {
                    field: 'CONNECTION_TYPE',
                    options: 'local | host | hostssl | hostnossl',
                    desc: 'Local socket atau network connection'
                  },
                  {
                    field: 'DATABASE',
                    options: 'postgres | testdb | all | replication',
                    desc: 'Which database rules apply to. "all" = all databases'
                  },
                  {
                    field: 'USER',
                    options: 'postgres | appuser | all | +admin_group',
                    desc: 'Which user/role. "all" = all users. "+name" = group'
                  },
                  {
                    field: 'ADDRESS',
                    options: '192.168.1.0/24 | localhost | ::1 | samehost',
                    desc: 'Client IP/hostname. For local: omit. "samehost" = server hostname'
                  },
                  {
                    field: 'AUTH_METHOD',
                    options: 'trust | md5 | password | scram-sha-256 | cert',
                    desc: 'How to authenticate. trust=no password, md5=encrypted password'
                  }
                ].map((item, idx) => (
                  <div key={idx} style={{ background: 'rgba(0, 0, 0, 0.2)', padding: '12px', borderRadius: '8px', borderLeft: '3px solid #64c8ff' }}>
                    <p style={{ color: '#64c8ff', fontWeight: 'bold', fontSize: '12px', marginBottom: '4px' }}>
                      {item.field}
                    </p>
                    <p style={{ color: '#fbbf24', fontSize: '11px', fontFamily: 'monospace', marginBottom: '3px' }}>
                      {item.options}
                    </p>
                    <p style={{ color: '#a0c8ff', fontSize: '11px' }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: 'rgba(74, 222, 128, 0.1)', border: '1px solid rgba(74, 222, 128, 0.3)', borderRadius: '12px', padding: '20px' }}>
              <h4 className="text-base font-bold mb-4" style={{ color: '#4ade80' }}>💡 Important Rules</h4>
              <ul style={{ color: '#a0c8ff', fontSize: '12px', marginLeft: '12px' }}>
                <li>✓ Rules evaluated TOP to BOTTOM - FIRST match is used!</li>
                <li>✓ Order matters - put specific rules BEFORE general rules</li>
                <li>✓ Comments: # character (from # to end of line)</li>
                <li>✓ Whitespace separates fields (spaces atau tabs)</li>
                <li>✓ Reload config: SELECT pg_reload_conf(); (no restart needed!)</li>
                <li>✓ Must use "postgres" user untuk edit (permissions required)</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'connection-types' && (
          <div className="space-y-8 animate-float">
            <h3 className="text-lg font-bold" style={{ color: '#64c8ff' }}>🔗 Connection Types</h3>

            <div style={{ background: 'rgba(100, 200, 255, 0.08)', border: '1px solid rgba(100, 200, 255, 0.2)', borderRadius: '12px', padding: '20px' }}>
              {[
                {
                  type: 'local',
                  color: '#4ade80',
                  desc: 'Unix domain socket (local machine only)',
                  usage: 'Same server connections',
                  example: 'psql -U postgres (no -h needed)',
                  address: 'OMITTED - not applicable',
                  security: '🟢 Very secure (no network)',
                  when: 'Local admin tasks, maintenance'
                },
                {
                  type: 'host',
                  color: '#64c8ff',
                  desc: 'TCP/IP connection (unencrypted)',
                  usage: 'Network connections, any hostname/IP',
                  example: 'psql -h 192.168.1.10 -U postgres',
                  address: 'IPv4: 192.168.1.5 atau 192.168.1.0/24 | IPv6: ::1/128',
                  security: '🟡 Medium (password visible if no encryption)',
                  when: 'Internal network connections'
                },
                {
                  type: 'hostssl',
                  color: '#10b981',
                  desc: 'TCP/IP with SSL/TLS encryption (required)',
                  usage: 'Secure network connections',
                  example: 'psql -h remote.server.com --set=sslmode=require',
                  address: 'Same as host',
                  security: '🟢 Very secure (encrypted)',
                  when: 'Production, internet-facing servers'
                },
                {
                  type: 'hostnossl',
                  color: '#fbbf24',
                  desc: 'TCP/IP with SSL REJECTED (plaintext only)',
                  usage: 'Explicitly disallow SSL',
                  example: 'psql -h localhost -U postgres (no SSL)',
                  address: 'Same as host',
                  security: '⚠️ Risky (plaintext passwords)',
                  when: 'Rarely used, special cases only'
                }
              ].map((item, idx) => (
                <div key={idx} style={{ background: item.color === '#4ade80' ? 'rgba(74, 222, 128, 0.1)' : item.color === '#10b981' ? 'rgba(16, 185, 129, 0.1)' : item.color === '#fbbf24' ? 'rgba(251, 191, 36, 0.1)' : 'rgba(100, 200, 255, 0.1)', border: `1px solid ${item.color}`, borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
                  <h4 style={{ color: item.color, fontWeight: 'bold', fontSize: '14px', marginBottom: '8px' }}>
                    {item.type.toUpperCase()}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p style={{ color: '#a0c8ff', fontSize: '11px', marginBottom: '2px' }}>
                        <strong>Description:</strong> {item.desc}
                      </p>
                      <p style={{ color: '#a0c8ff', fontSize: '11px', marginBottom: '2px' }}>
                        <strong>Usage:</strong> {item.usage}
                      </p>
                      <p style={{ color: '#a0c8ff', fontSize: '11px', marginBottom: '2px' }}>
                        <strong>Example:</strong> <code style={{ color: item.color, fontFamily: 'monospace' }}>{item.example}</code>
                      </p>
                    </div>
                    <div>
                      <p style={{ color: '#a0c8ff', fontSize: '11px', marginBottom: '2px' }}>
                        <strong>Address:</strong> {item.address}
                      </p>
                      <p style={{ color: '#a0c8ff', fontSize: '11px', marginBottom: '2px' }}>
                        <strong>Security:</strong> {item.security}
                      </p>
                      <p style={{ color: '#a0c8ff', fontSize: '11px' }}>
                        <strong>When to use:</strong> {item.when}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'auth-methods' && (
          <div className="space-y-8 animate-float">
            <h3 className="text-lg font-bold" style={{ color: '#64c8ff' }}>🔑 Authentication Methods</h3>

            <div style={{ background: 'rgba(100, 200, 255, 0.08)', border: '1px solid rgba(100, 200, 255, 0.2)', borderRadius: '12px', padding: '20px' }}>
              {[
                {
                  method: 'trust',
                  security: '🔴 INSECURE',
                  desc: 'No password needed, always allow',
                  use: 'Local development ONLY, never production',
                  example: 'local   all    all    trust'
                },
                {
                  method: 'reject',
                  security: '✅ Explicit deny',
                  desc: 'Always reject connection',
                  use: 'Block specific users/IPs',
                  example: 'host    all    attacker    0.0.0.0/0    reject'
                },
                {
                  method: 'password',
                  security: '🟡 Medium (plaintext)',
                  desc: 'Password sent in plaintext',
                  use: 'Internal network only (never internet!)',
                  example: 'host    all    appuser    192.168.1.0/24    password'
                },
                {
                  method: 'md5',
                  security: '🟡 Better (hashed)',
                  desc: 'MD5-hashed password',
                  use: 'Legacy systems, non-critical',
                  example: 'host    all    appuser    192.168.1.0/24    md5'
                },
                {
                  method: 'scram-sha-256',
                  security: '🟢 SECURE (recommended)',
                  desc: 'SCRAM-SHA-256 hashing',
                  use: 'Production systems, RECOMMENDED',
                  example: 'host    all    appuser    0.0.0.0/0    scram-sha-256'
                },
                {
                  method: 'cert',
                  security: '🟢 VERY SECURE',
                  desc: 'Client certificate (X.509)',
                  use: 'High-security requirements',
                  example: 'hostssl all    appuser    0.0.0.0/0    cert'
                },
                {
                  method: 'gss',
                  security: '🟢 SECURE',
                  desc: 'GSSAPI/Kerberos authentication',
                  use: 'Enterprise environments dengan Kerberos',
                  example: 'host    all    all    0.0.0.0/0    gss'
                },
                {
                  method: 'ldap',
                  security: '🟢 SECURE',
                  desc: 'LDAP directory authentication',
                  use: 'Enterprise directory services',
                  example: 'host    all    all    0.0.0.0/0    ldap ldapserver=ldap.example.com'
                },
                {
                  method: 'pam',
                  security: '🟢 SECURE',
                  desc: 'PAM (Pluggable Auth Modules)',
                  use: 'System authentication integration',
                  example: 'local   all    all    pam'
                },
                {
                  method: 'radius',
                  security: '🟡 Medium',
                  desc: 'RADIUS server authentication',
                  use: 'Network device authentication',
                  example: 'host    all    all    0.0.0.0/0    radius radiusserver=radius.example.com'
                }
              ].map((item, idx) => (
                <div key={idx} style={{ background: 'rgba(0, 0, 0, 0.2)', padding: '12px', borderRadius: '8px', marginBottom: '10px', borderLeft: '3px solid #64c8ff' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <p style={{ color: '#64c8ff', fontWeight: 'bold', fontSize: '12px', fontFamily: 'monospace' }}>
                      {item.method}
                    </p>
                    <p style={{ color: '#a0c8ff', fontSize: '10px' }}>{item.security}</p>
                  </div>
                  <p style={{ color: '#a0c8ff', fontSize: '11px', marginBottom: '3px' }}>
                    <strong>Description:</strong> {item.desc}
                  </p>
                  <p style={{ color: '#a0c8ff', fontSize: '11px', marginBottom: '3px' }}>
                    <strong>Use:</strong> {item.use}
                  </p>
                  <code style={{ color: '#86efac', fontFamily: 'monospace', fontSize: '10px', display: 'block' }}>
                    {item.example}
                  </code>
                </div>
              ))}
            </div>

            <div style={{ background: 'rgba(74, 222, 128, 0.1)', border: '1px solid rgba(74, 222, 128, 0.3)', borderRadius: '12px', padding: '20px' }}>
              <h4 className="text-base font-bold mb-4" style={{ color: '#4ade80' }}>🎯 Recommendation</h4>
              <p style={{ color: '#a0c8ff', fontSize: '12px', marginBottom: '12px' }}>
                For modern PostgreSQL (12+): <strong>Use scram-sha-256</strong>
              </p>
              <ul style={{ color: '#a0c8ff', fontSize: '11px', marginLeft: '12px' }}>
                <li>✓ Secure: SCRAM-SHA-256 hashing, salted, iterated</li>
                <li>✓ Compatible: Supported oleh semua modern clients</li>
                <li>✓ Standard: Default recommendation dari PostgreSQL</li>
                <li>✓ Flexible: Works dengan host, hostssl</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'examples' && (
          <div className="space-y-8 animate-float">
            <h3 className="text-lg font-bold" style={{ color: '#64c8ff' }}>💻 Practical Examples</h3>

            <div style={{ background: 'rgba(100, 200, 255, 0.08)', border: '1px solid rgba(100, 200, 255, 0.2)', borderRadius: '12px', padding: '20px' }}>
              <h4 className="text-base font-bold mb-4" style={{ color: '#64c8ff' }}>Development Setup (localhost)</h4>
              <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '16px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '12px', color: '#a0c8ff', lineHeight: '2' }}>
                <p style={{ color: '#fbbf24' }}>pg_hba.conf:</p>
                <p>
                  <span style={{ color: '#4ade80' }}>local</span>   <span style={{ color: '#a0c8ff' }}>all</span>   <span style={{ color: '#a0c8ff' }}>all</span>   <span style={{ color: '#86efac' }}>trust</span>
                </p>
                <p>
                  <span style={{ color: '#4ade80' }}>host</span>    <span style={{ color: '#a0c8ff' }}>all</span>   <span style={{ color: '#a0c8ff' }}>all</span>   <span style={{ color: '#fbbf24' }}>127.0.0.1/32</span>   <span style={{ color: '#86efac' }}>trust</span>
                </p>
                <p>
                  <span style={{ color: '#4ade80' }}>host</span>    <span style={{ color: '#a0c8ff' }}>all</span>   <span style={{ color: '#a0c8ff' }}>all</span>   <span style={{ color: '#fbbf24' }}>::1/128</span>   <span style={{ color: '#86efac' }}>trust</span>
                </p>
                <p style={{ marginTop: '12px', color: '#4ade80', fontWeight: 'bold' }}>Meaning:</p>
                <p style={{ marginLeft: '20px' }}>✓ Local socket: trust (no password)</p>
                <p style={{ marginLeft: '20px' }}>✓ localhost IPv4: trust</p>
                <p style={{ marginLeft: '20px' }}>✓ localhost IPv6: trust</p>
              </div>
            </div>

            <div style={{ background: 'rgba(251, 191, 36, 0.1)', border: '1px solid rgba(251, 191, 36, 0.3)', borderRadius: '12px', padding: '20px' }}>
              <h4 className="text-base font-bold mb-4" style={{ color: '#fbbf24' }}>Production Setup (secure)</h4>
              <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '16px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '12px', color: '#a0c8ff', lineHeight: '2' }}>
                <p style={{ color: '#fbbf24' }}>pg_hba.conf:</p>
                <p>
                  <span style={{ color: '#f87171' }}># Local administrative access</span>
                </p>
                <p>
                  <span style={{ color: '#4ade80' }}>local</span>   <span style={{ color: '#a0c8ff' }}>all</span>   <span style={{ color: '#a0c8ff' }}>postgres</span>   <span style={{ color: '#86efac' }}>peer</span>
                </p>
                <p style={{ marginTop: '8px', color: '#f87171' }}># Application user on internal network</p>
                <p>
                  <span style={{ color: '#4ade80' }}>host</span>    <span style={{ color: '#a0c8ff' }}>appdb</span>   <span style={{ color: '#a0c8ff' }}>appuser</span>   <span style={{ color: '#fbbf24' }}>192.168.1.0/24</span>   <span style={{ color: '#86efac' }}>scram-sha-256</span>
                </p>
                <p style={{ marginTop: '8px', color: '#f87171' }}># SSL required for remote connections</p>
                <p>
                  <span style={{ color: '#4ade80' }}>hostssl</span>  <span style={{ color: '#a0c8ff' }}>appdb</span>   <span style={{ color: '#a0c8ff' }}>appuser</span>   <span style={{ color: '#fbbf24' }}>0.0.0.0/0</span>   <span style={{ color: '#86efac' }}>scram-sha-256</span>
                </p>
                <p style={{ marginTop: '8px', color: '#f87171' }}># Reject all other connections</p>
                <p>
                  <span style={{ color: '#4ade80' }}>host</span>    <span style={{ color: '#a0c8ff' }}>all</span>   <span style={{ color: '#a0c8ff' }}>all</span>   <span style={{ color: '#fbbf24' }}>0.0.0.0/0</span>   <span style={{ color: '#86efac' }}>reject</span>
                </p>
              </div>
            </div>

            <div style={{ background: 'rgba(74, 222, 128, 0.1)', border: '1px solid rgba(74, 222, 128, 0.3)', borderRadius: '12px', padding: '20px' }}>
              <h4 className="text-base font-bold mb-4" style={{ color: '#4ade80' }}>Complex Example (multiple rules)</h4>
              <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '16px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '11px', color: '#a0c8ff', lineHeight: '1.8' }}>
                <p style={{ color: '#f87171', marginBottom: '8px' }}># Admin user dapat connect dari localhost</p>
                <p>local   all   postgres   peer</p>
                <p>host    all   postgres   127.0.0.1/32   scram-sha-256</p>
                
                <p style={{ marginTop: '12px', color: '#f87171' }}># App user pada internal network</p>
                <p>host    webapp   appuser   192.168.1.0/24   scram-sha-256</p>
                
                <p style={{ marginTop: '12px', color: '#f87171' }}># Read-only user untuk analytics</p>
                <p>host    analytics   readonly   192.168.2.0/24   scram-sha-256</p>
                
                <p style={{ marginTop: '12px', color: '#f87171' }}># Remote connections MUST use SSL</p>
                <p>hostssl webapp   appuser   10.0.0.0/8   scram-sha-256</p>
                
                <p style={{ marginTop: '12px', color: '#f87171' }}># Certificate-based for services</p>
                <p>hostssl all   serviceuser   0.0.0.0/0   cert</p>
                
                <p style={{ marginTop: '12px', color: '#f87171' }}># Reject everything else (default deny)</p>
                <p>host    all   all   0.0.0.0/0   reject</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-8 animate-float">
            <h3 className="text-lg font-bold" style={{ color: '#64c8ff' }}>🛡️ Security Best Practices</h3>

            <div style={{ background: 'rgba(100, 200, 255, 0.08)', border: '1px solid rgba(100, 200, 255, 0.2)', borderRadius: '12px', padding: '20px' }}>
              <h4 className="text-base font-bold mb-4" style={{ color: '#64c8ff' }}>✅ Do's</h4>
              <div className="space-y-3">
                {[
                  {
                    practice: '🔒 Use scram-sha-256 for authentication',
                    reason: 'Secure hashing, salted, iterated. Modern standard'
                  },
                  {
                    practice: '🔐 Use hostssl untuk remote connections',
                    reason: 'Enforce SSL/TLS encryption for network traffic'
                  },
                  {
                    practice: '🔏 Restrict IP ranges dengan specificity',
                    reason: 'Use CIDR notation: 192.168.1.0/24 instead of 192.168.0.0/16'
                  },
                  {
                    practice: '👤 Create specific database + user combinations',
                    reason: 'Don\'t allow "all" unless absolutely necessary'
                  },
                  {
                    practice: '⛔ Always have a final "reject all" rule',
                    reason: 'Default deny principle - explicit what\'s allowed, reject rest'
                  },
                  {
                    practice: '🔄 Use peer authentication for local postgres user',
                    reason: 'Leverage OS authentication for admin access'
                  },
                  {
                    practice: '📋 Document your rules with comments',
                    reason: 'Future you will thank current you'
                  },
                  {
                    practice: '🔄 Regularly review and audit pg_hba.conf',
                    reason: 'Remove old rules, ensure compliance'
                  }
                ].map((item, idx) => (
                  <div key={idx} style={{ background: 'rgba(0, 0, 0, 0.2)', padding: '10px', borderRadius: '6px' }}>
                    <p style={{ color: '#4ade80', fontWeight: 'bold', fontSize: '11px', marginBottom: '3px' }}>
                      {item.practice}
                    </p>
                    <p style={{ color: '#a0c8ff', fontSize: '10px' }}>{item.reason}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: 'rgba(248, 113, 113, 0.1)', border: '1px solid rgba(248, 113, 113, 0.3)', borderRadius: '12px', padding: '20px' }}>
              <h4 className="text-base font-bold mb-4" style={{ color: '#f87171' }}>❌ Don'ts (Security Anti-Patterns)</h4>
              <div className="space-y-3">
                {[
                  {
                    bad: 'Never use "trust" in production',
                    risk: 'Anyone can connect pretending to be anyone!'
                  },
                  {
                    bad: 'Never use "password" (plaintext) on internet',
                    risk: 'Passwords visible in network traffic, easily intercepted'
                  },
                  {
                    bad: 'Never allow "all" databases untuk "all" users',
                    risk: 'Anyone can access any database, full breach'
                  },
                  {
                    bad: 'Never omit reject rules at end',
                    risk: 'Implicit allow, hard to audit what\'s really allowed'
                  },
                  {
                    bad: 'Never allow 0.0.0.0/0 for local services',
                    risk: 'Publicly exposed database, huge attack surface'
                  },
                  {
                    bad: 'Never skip SSL/TLS for remote connections',
                    risk: 'Man-in-the-middle attacks, credential theft'
                  },
                  {
                    bad: 'Never use weak passwords',
                    risk: 'Brute force attacks, simple password guessing'
                  }
                ].map((item, idx) => (
                  <div key={idx} style={{ background: 'rgba(0, 0, 0, 0.2)', padding: '10px', borderRadius: '6px' }}>
                    <p style={{ color: '#f87171', fontWeight: 'bold', fontSize: '11px', marginBottom: '3px' }}>
                      {item.bad}
                    </p>
                    <p style={{ color: '#fca5a5', fontSize: '10px' }}>Risk: {item.risk}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: 'rgba(74, 222, 128, 0.1)', border: '1px solid rgba(74, 222, 128, 0.3)', borderRadius: '12px', padding: '20px' }}>
              <h4 className="text-base font-bold mb-4" style={{ color: '#4ade80' }}>🎯 Security Checklist</h4>
              <ul style={{ color: '#a0c8ff', fontSize: '11px', marginLeft: '12px' }}>
                <li>☑️ Authentication method: scram-sha-256 (modern) atau md5 (legacy)</li>
                <li>☑️ SSL/TLS required untuk remote connections (hostssl)</li>
                <li>☑️ IP ranges restricted (not 0.0.0.0/0 unless intended)</li>
                <li>☑️ Specific database + user combinations (not "all")</li>
                <li>☑️ Final explicit reject rule at bottom</li>
                <li>☑️ Comments explain each rule purpose</li>
                <li>☑️ Reviewed within last 90 days</li>
                <li>☑️ Aligned dengan company security policy</li>
                <li>☑️ No "trust" authentication dalam production</li>
                <li>☑️ No "password" (plaintext) untuk remote connections</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'troubleshooting' && (
          <div className="space-y-8 animate-float">
            <h3 className="text-lg font-bold" style={{ color: '#64c8ff' }}>⚠️ Troubleshooting</h3>

            <div style={{ background: 'rgba(100, 200, 255, 0.08)', border: '1px solid rgba(100, 200, 255, 0.2)', borderRadius: '12px', padding: '20px' }}>
              {[
                {
                  error: 'FATAL: no pg_hba.conf entry for host',
                  cause: 'No matching rule dalam pg_hba.conf untuk your connection',
                  solution: [
                    'Check your connection parameters: host, port, user, database',
                    'Check pg_hba.conf: is there matching rule?',
                    'Remember: rules evaluated top-to-bottom, first match wins',
                    'Add appropriate rule (atau move it before reject rule)'
                  ]
                },
                {
                  error: 'FATAL: password authentication failed',
                  cause: 'Rule matched, but password incorrect atau auth method problem',
                  solution: [
                    'Verify password is correct',
                    'Check auth method dalam pg_hba.conf (md5? scram-sha-256? password?)',
                    'Password must be set dalam database: ALTER USER user WITH PASSWORD \'new_pass\'',
                    'For md5/scram-sha-256: PostgreSQL hashes password, can\'t see it'
                  ]
                },
                {
                  error: 'FATAL: trust authentication failed',
                  cause: 'Rule has "trust" but still connection denied',
                  solution: [
                    'Trust means: allow without password, but still match other fields',
                    'Check: connection type, database, user, address/IP',
                    'Debug: psql -h hostname -U user -d database -v',
                    'Check logs: tail -f /var/log/postgresql/postgresql.log'
                  ]
                },
                {
                  error: 'Connection works locally pero not from remote host',
                  cause: 'No rule for remote connections atau wrong IP address',
                  solution: [
                    'Add "host" or "hostssl" rule for remote IPs',
                    'Verify client IP: client perspective, check network topology',
                    'Check firewall: postgres port (5432) accessible from client?',
                    'Verify listen_addresses dalam postgresql.conf (not localhost only)'
                  ]
                },
                {
                  error: 'Connection require SSL pero I\'m not using SSL',
                  cause: 'pg_hba.conf require hostssl (SSL mandatory)',
                  solution: [
                    'Either: enable SSL pada client side',
                    'Or: change pg_hba.conf rule dari hostssl to host (less secure!)',
                    'Client command: psql --set=sslmode=require -h hostname',
                    'Or change rule to "host" jika SSL tidak available'
                  ]
                },
                {
                  error: 'Syntax error in pg_hba.conf',
                  cause: 'Invalid format atau typo dalam rule',
                  solution: [
                    'Check: 5 fields required (type, database, user, address, method)',
                    'Check: whitespace separate fields (spaces or tabs)',
                    'Check: IP format (IPv4: x.x.x.x/nn, IPv6: x::/nn)',
                    'Use: sudo -u postgres pg_ctlcluster VERSION main reload (test syntax)'
                  ]
                },
                {
                  error: 'Changes in pg_hba.conf not taking effect',
                  cause: 'Need to reload configuration, not restart full server',
                  solution: [
                    'Option 1: SELECT pg_reload_conf(); (dalam psql)',
                    'Option 2: pg_ctl reload -D /path/to/data',
                    'Option 3: systemctl reload postgresql (systemd)',
                    'NO need untuk restart server (disrupts connections)'
                  ]
                }
              ].map((item, idx) => (
                <div key={idx} style={{ background: 'rgba(0, 0, 0, 0.2)', padding: '12px', borderRadius: '8px', marginBottom: '12px', borderLeft: '3px solid #f87171' }}>
                  <p style={{ color: '#f87171', fontWeight: 'bold', fontSize: '12px', marginBottom: '6px' }}>
                    ❌ {item.error}
                  </p>
                  <p style={{ color: '#fbbf24', fontSize: '11px', marginBottom: '6px', fontWeight: 'bold' }}>
                    Cause: {item.cause}
                  </p>
                  <p style={{ color: '#4ade80', fontSize: '11px', fontWeight: 'bold', marginBottom: '4px' }}>
                    Solution:
                  </p>
                  <ul style={{ color: '#a0c8ff', fontSize: '10px', marginLeft: '12px' }}>
                    {item.solution.map((sol, sidx) => (
                      <li key={sidx}>· {sol}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div style={{ background: 'rgba(74, 222, 128, 0.1)', border: '1px solid rgba(74, 222, 128, 0.3)', borderRadius: '12px', padding: '20px' }}>
              <h4 className="text-base font-bold mb-4" style={{ color: '#4ade80' }}>🔍 Debugging Tips</h4>
              <div style={{ background: 'rgba(0, 0, 0, 0.2)', padding: '12px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '11px', color: '#a0c8ff', lineHeight: '1.8' }}>
                <p style={{ color: '#4ade80', marginBottom: '8px', fontWeight: 'bold' }}>1. Check current pg_hba.conf:</p>
                <p>cat /var/lib/postgresql/14/main/pg_hba.conf | grep -v "^#" | grep -v "^$"</p>
                
                <p style={{ marginTop: '12px', color: '#4ade80', fontWeight: 'bold' }}>2. Test connection verbose:</p>
                <p>psql -h hostname -U user -d database -v</p>
                
                <p style={{ marginTop: '12px', color: '#4ade80', fontWeight: 'bold' }}>3. Check PostgreSQL logs:</p>
                <p>tail -f /var/log/postgresql/postgresql.log</p>
                <p>OR: journalctl -u postgresql -f</p>
                
                <p style={{ marginTop: '12px', color: '#4ade80', fontWeight: 'bold' }}>4. Check listen_addresses (must be set!):</p>
                <p>grep "^listen_addresses" postgresql.conf</p>
                <p>Should be: listen_addresses = 'localhost,192.168.1.10'</p>
                
                <p style={{ marginTop: '12px', color: '#4ade80', fontWeight: 'bold' }}>5. Reload config (no restart):</p>
                <p>SELECT pg_reload_conf();</p>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'hba-config' && (
          <div className="space-y-8 animate-float">
            <h3 className="text-lg font-bold" style={{ color: '#64c8ff' }}>📄 Contoh Konfigurasi pg_hba.conf</h3>

            {/* Development */}
            <div style={{ background: 'rgba(74, 222, 128, 0.08)', border: '1px solid rgba(74, 222, 128, 0.3)', borderRadius: '12px', padding: '20px' }}>
              <h4 className="text-base font-bold mb-2" style={{ color: '#4ade80' }}>1. Development / Local Machine</h4>
              <p style={{ color: '#a0c8ff', fontSize: '12px', marginBottom: '12px' }}>
                Untuk environment development lokal — trust semua koneksi dari localhost. <strong>Jangan dipakai di production!</strong>
              </p>
              <pre style={{ background: 'rgba(0,0,0,0.35)', padding: '14px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '11px', color: '#a0c8ff', overflow: 'auto', lineHeight: '1.9' }}>
{`# TYPE  DATABASE        USER            ADDRESS                 METHOD

# Local Unix socket — admin tanpa password
local   all             postgres                                peer
local   all             all                                     trust

# IPv4 localhost
host    all             all             127.0.0.1/32            trust

# IPv6 localhost
host    all             all             ::1/128                 trust`}
              </pre>
            </div>

            {/* Staging */}
            <div style={{ background: 'rgba(251, 191, 36, 0.08)', border: '1px solid rgba(251, 191, 36, 0.3)', borderRadius: '12px', padding: '20px' }}>
              <h4 className="text-base font-bold mb-2" style={{ color: '#fbbf24' }}>2. Staging / Internal Network</h4>
              <p style={{ color: '#a0c8ff', fontSize: '12px', marginBottom: '12px' }}>
                Staging environment — hanya internal network, password wajib, belum perlu SSL.
              </p>
              <pre style={{ background: 'rgba(0,0,0,0.35)', padding: '14px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '11px', color: '#a0c8ff', overflow: 'auto', lineHeight: '1.9' }}>
{`# TYPE  DATABASE        USER            ADDRESS                 METHOD

# Admin via Unix socket (OS-level auth)
local   all             postgres                                peer

# App user dari internal network (VLAN 192.168.10.x)
host    stagingdb       appuser         192.168.10.0/24         scram-sha-256

# Read-only user untuk QA team
host    stagingdb       qa_reader       192.168.10.0/24         scram-sha-256

# DBA access dari subnet ops
host    all             dba             192.168.20.0/24         scram-sha-256

# Tolak semua koneksi lain
host    all             all             0.0.0.0/0               reject
host    all             all             ::/0                    reject`}
              </pre>
            </div>

            {/* Production */}
            <div style={{ background: 'rgba(100, 200, 255, 0.08)', border: '1px solid rgba(100, 200, 255, 0.3)', borderRadius: '12px', padding: '20px' }}>
              <h4 className="text-base font-bold mb-2" style={{ color: '#64c8ff' }}>3. Production (Recommended)</h4>
              <p style={{ color: '#a0c8ff', fontSize: '12px', marginBottom: '12px' }}>
                Production setup — SSL wajib untuk remote, scram-sha-256, principle of least privilege, default deny.
              </p>
              <pre style={{ background: 'rgba(0,0,0,0.35)', padding: '14px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '11px', color: '#a0c8ff', overflow: 'auto', lineHeight: '1.9' }}>
{`# TYPE  DATABASE        USER            ADDRESS                 METHOD

# =========================================================
# LOCAL CONNECTIONS (Unix socket)
# =========================================================

# Superuser via OS peer auth (no password needed)
local   all             postgres                                peer

# System-level maintenance user
local   all             pg_maintenance                          peer

# =========================================================
# LOCALHOST (127.0.0.1) — backend on same server
# =========================================================

# App backend pada server yang sama
host    appdb           appuser         127.0.0.1/32            scram-sha-256
host    appdb           appuser         ::1/128                 scram-sha-256

# =========================================================
# INTERNAL NETWORK — SSL optional (private subnet)
# =========================================================

# App servers cluster (private subnet AWS/GCP)
host    appdb           appuser         10.0.1.0/24             scram-sha-256

# Read replicas & analytics
host    appdb           readonly        10.0.2.0/24             scram-sha-256

# DBA team VPN subnet
host    all             dba_user        10.10.0.0/16            scram-sha-256

# =========================================================
# REMOTE CONNECTIONS — SSL WAJIB (hostssl)
# =========================================================

# External app partner dengan SSL
hostssl partnerdb       partner_user    203.0.113.10/32         scram-sha-256

# Certificate-based auth untuk microservices
hostssl appdb           svc_account     10.20.0.0/16            cert

# =========================================================
# REPLICATION
# =========================================================

# Streaming replication dari replica server
host    replication     replicator      10.0.3.5/32             scram-sha-256

# =========================================================
# DEFAULT DENY — harus ada di baris TERAKHIR
# =========================================================
host    all             all             0.0.0.0/0               reject
host    all             all             ::/0                    reject`}
              </pre>
            </div>

            {/* High Security */}
            <div style={{ background: 'rgba(167, 139, 250, 0.08)', border: '1px solid rgba(167, 139, 250, 0.3)', borderRadius: '12px', padding: '20px' }}>
              <h4 className="text-base font-bold mb-2" style={{ color: '#a78bfa' }}>4. High-Security (Certificate + MFA)</h4>
              <p style={{ color: '#a0c8ff', fontSize: '12px', marginBottom: '12px' }}>
                Untuk sistem yang membutuhkan keamanan tinggi — semua koneksi remote wajib SSL + client certificate.
              </p>
              <pre style={{ background: 'rgba(0,0,0,0.35)', padding: '14px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '11px', color: '#a0c8ff', overflow: 'auto', lineHeight: '1.9' }}>
{`# TYPE  DATABASE        USER            ADDRESS                 METHOD

# Admin lokal via peer (OS auth)
local   all             postgres                                peer

# Reject plaintext TCP localhost — paksa SSL
hostnossl all           all             127.0.0.1/32            reject

# SSL + cert untuk semua remote connections
hostssl all             all             10.0.0.0/8              cert

# SSL + scram untuk app user (cert optional)
hostssl appdb           appuser         10.0.1.0/24             scram-sha-256

# LDAP auth untuk internal staff (via SSL)
hostssl staffdb         all             10.10.0.0/16            ldap ldapserver=ldap.corp.local ldapbasedn="dc=corp,dc=local" ldapbinddn="cn=pgauth,dc=corp,dc=local" ldapbindpasswd="secret" ldapsearchattribute="uid"

# Semua sisanya: tolak
host    all             all             0.0.0.0/0               reject`}
              </pre>
            </div>

            {/* Multi-tenant */}
            <div style={{ background: 'rgba(248, 113, 113, 0.08)', border: '1px solid rgba(248, 113, 113, 0.3)', borderRadius: '12px', padding: '20px' }}>
              <h4 className="text-base font-bold mb-2" style={{ color: '#f87171' }}>5. Multi-Tenant SaaS</h4>
              <p style={{ color: '#a0c8ff', fontSize: '12px', marginBottom: '12px' }}>
                Setiap tenant punya database sendiri, user sendiri, subnet sendiri. Row-level isolation via pg_hba + schema.
              </p>
              <pre style={{ background: 'rgba(0,0,0,0.35)', padding: '14px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '11px', color: '#a0c8ff', overflow: 'auto', lineHeight: '1.9' }}>
{`# TYPE  DATABASE        USER            ADDRESS                 METHOD

# Superuser — local only
local   all             postgres                                peer

# Tenant A: database tenant_a, hanya dari app server A
hostssl tenant_a        tenant_a_user   10.1.1.0/24             scram-sha-256

# Tenant B: database tenant_b, hanya dari app server B
hostssl tenant_b        tenant_b_user   10.1.2.0/24             scram-sha-256

# Shared analytics DB — read-only dari data warehouse subnet
hostssl analytics       analyst         10.2.0.0/24             scram-sha-256

# Internal admin (platform team)
host    all             platform_admin  10.0.0.0/8              scram-sha-256

# Blokir cross-tenant: user tenant_a tidak bisa akses tenant_b
# (Pastikan GRANT di DB juga sudah diatur)

# Default deny
host    all             all             0.0.0.0/0               reject`}
              </pre>
            </div>

            {/* Tips */}
            <div style={{ background: 'rgba(74, 222, 128, 0.1)', border: '1px solid rgba(74, 222, 128, 0.3)', borderRadius: '12px', padding: '20px' }}>
              <h4 className="text-base font-bold mb-3" style={{ color: '#4ade80' }}>💡 Tips Menulis pg_hba.conf</h4>
              <ul style={{ color: '#a0c8ff', fontSize: '12px', marginLeft: '16px', lineHeight: '2' }}>
                <li>✓ Urutan <strong>paling spesifik di atas</strong>, paling umum di bawah — first match wins</li>
                <li>✓ Selalu akhiri dengan <code style={{ color: '#f87171', fontFamily: 'monospace' }}>host all all 0.0.0.0/0 reject</code> sebagai default deny</li>
                <li>✓ Gunakan komentar (<code style={{ color: '#86efac', fontFamily: 'monospace' }}>#</code>) untuk menjelaskan setiap blok rule</li>
                <li>✓ Reload tanpa restart: <code style={{ color: '#fbbf24', fontFamily: 'monospace' }}>SELECT pg_reload_conf();</code></li>
                <li>✓ Cek syntax sebelum reload: <code style={{ color: '#fbbf24', fontFamily: 'monospace' }}>pg_ctl reload -D $PGDATA</code></li>
                <li>✓ View active rules via: <code style={{ color: '#fbbf24', fontFamily: 'monospace' }}>SELECT * FROM pg_hba_file_rules;</code> (PG 10+)</li>
                <li>✓ Gunakan <code style={{ color: '#86efac', fontFamily: 'monospace' }}>hostssl</code> bukan <code style={{ color: '#86efac', fontFamily: 'monospace' }}>host</code> untuk semua koneksi production</li>
                <li>✓ Prefer <code style={{ color: '#86efac', fontFamily: 'monospace' }}>scram-sha-256</code> daripada <code style={{ color: '#f87171', fontFamily: 'monospace' }}>md5</code> — lebih aman</li>
              </ul>
            </div>
          </div>
        )}

      </div>

      {/* Footer */}
      <footer style={{ background: 'rgba(15, 20, 25, 0.5)', borderTop: '1px solid rgba(100, 200, 255, 0.2)', marginTop: '60px', padding: '40px 0', textAlign: 'center' }}>
        <p style={{ color: '#708090', fontSize: '14px', marginBottom: '8px' }}>
          🔐 pg_hba.conf = First line of defense untuk PostgreSQL security
        </p>
        <p style={{ color: '#708090', fontSize: '14px' }}>
          💡 Golden Rule: Be specific dengan rules, deny by default, reload untuk testing! 🛡️
        </p>
      </footer>
    </div>
  );
};

export default PostgreSQLHostBasedAuth;