import React, { useState } from 'react'

const TablespacesModule = () => {
  const [activeTab, setActiveTab] = useState('overview')

  const tabConfigs = [
    { id: 'overview', label: '📖 Overview', desc: 'Tablespace fundamentals' },
    { id: 'concepts', label: '🎯 Core Concepts', desc: 'Understanding tablespaces' },
    { id: 'creation', label: '➕ Create & Manage', desc: 'Creating tablespaces' },
    { id: 'optimization', label: '⚡ Optimization', desc: 'Performance tuning' },
    { id: 'strategies', label: '🏗️ Strategies', desc: 'Best practices' },
    { id: 'examples', label: '💻 Practical Examples', desc: 'Real-world scenarios' },
    { id: 'troubleshooting', label: '🔧 Troubleshooting', desc: 'Common issues' },
    { id: 'cheatsheet', label: '📋 Cheatsheet', desc: 'Quick reference' },
  ]

  const renderContent = () => {
    switch(activeTab) {
      case 'overview':
        return (
          <div style={{ animation: 'float-up 0.6s ease-out' }}>
            <div style={{ background: 'rgba(100, 200, 255, 0.08)', border: '1px solid rgba(100, 200, 255, 0.2)', borderRadius: '12px', padding: '20px' }}>
              <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#64c8ff', marginBottom: '16px' }}>
                PostgreSQL Tablespaces Overview
              </h3>
              
              <p style={{ color: '#a0c8ff', lineHeight: '1.8', fontSize: '18px', marginBottom: '16px' }}>
                <strong>Tablespace</strong> adalah lokasi filesystem tempat PostgreSQL menyimpan data files (tables, indexes, sequences). 
                Dengan default, semua data disimpan di cluster's primary data directory, tetapi tablespaces memungkinkan Anda 
                untuk mendistribusikan data ke multiple physical locations untuk optimization dan performance tuning.
              </p>

              <div style={{ background: 'rgba(100, 200, 255, 0.1)', padding: '16px', borderRadius: '8px', borderLeft: '3px solid #64c8ff', marginBottom: '16px' }}>
                <p style={{ color: '#64c8ff', fontWeight: 'bold', marginBottom: '12px' }}>💡 What is a Tablespace?</p>
                <ul style={{ color: '#a0c8ff', fontSize: '17px', marginLeft: '16px' }}>
                  <li>✓ Logical mapping ke filesystem directories</li>
                  <li>✓ Allows data distribution across multiple disks</li>
                  <li>✓ Separate I/O paths untuk different workloads</li>
                  <li>✓ Improve performance by load balancing</li>
                  <li>✓ Manage storage capacity efficiently</li>
                </ul>
              </div>

              <div style={{ background: 'rgba(74, 222, 128, 0.1)', padding: '16px', borderRadius: '8px', borderLeft: '3px solid #4ade80', marginBottom: '16px' }}>
                <p style={{ color: '#4ade80', fontWeight: 'bold', marginBottom: '12px' }}>🎯 Key Benefits</p>
                <ul style={{ color: '#a0c8ff', fontSize: '17px', marginLeft: '16px' }}>
                  <li>✓ <strong>Performance:</strong> Separate hot/cold data</li>
                  <li>✓ <strong>Capacity:</strong> Utilize multiple storage devices</li>
                  <li>✓ <strong>Flexibility:</strong> Move tables without recreating cluster</li>
                  <li>✓ <strong>Isolation:</strong> Separate user data from indexes</li>
                  <li>✓ <strong>Maintenance:</strong> Scheduled maintenance per tablespace</li>
                </ul>
              </div>

              <div style={{ background: 'rgba(251, 191, 36, 0.1)', padding: '16px', borderRadius: '8px', borderLeft: '3px solid #fbbf24' }}>
                <p style={{ color: '#fbbf24', fontWeight: 'bold', marginBottom: '12px' }}>⚠️ Default Tablespace</p>
                <p style={{ color: '#a0c8ff', fontSize: '16px', marginBottom: '8px' }}>
                  PostgreSQL provides two default tablespaces:
                </p>
                <ul style={{ color: '#a0c8ff', fontSize: '16px', marginLeft: '16px' }}>
                  <li>✓ <strong>pg_default:</strong> Database cluster default (PGDATA)</li>
                  <li>✓ <strong>pg_global:</strong> Shared system catalogs</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'concepts':
        return (
          <div style={{ animation: 'float-up 0.6s ease-out' }}>
            <div style={{ background: 'rgba(100, 200, 255, 0.08)', border: '1px solid rgba(100, 200, 255, 0.2)', borderRadius: '12px', padding: '20px' }}>
              <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#64c8ff', marginBottom: '16px' }}>
                Tablespace Concepts & Architecture
              </h3>

              {[
                {
                  title: '📁 Physical vs Logical',
                  color: 'blue',
                  content: `Physical: Actual directory on filesystem
Logical: PostgreSQL naming/mapping
A tablespace name is logical; actual location is physical disk`
                },
                {
                  title: '🗂️ Tablespace Hierarchy',
                  color: 'green',
                  content: `Cluster (Database Server)
├─ Tablespace 1 (pg_default)
│  ├─ Database 1
│  │  ├─ Table A
│  │  ├─ Index A1
│  │  └─ Sequence A1
│  └─ Database 2
├─ Tablespace 2 (Custom - SSD)
│  ├─ Table B (Hot data)
│  └─ Index B1
└─ Tablespace 3 (Custom - HDD)
   └─ Table C (Archive data)`
                },
                {
                  title: '⚙️ How It Works',
                  color: 'yellow',
                  content: `1. Create physical directory with proper permissions
2. CREATE TABLESPACE ... LOCATION '/path/to/dir'
3. PostgreSQL creates version subfolder
4. Assign databases/tables to tablespace
5. PostgreSQL stores data in that location`
                },
                {
                  title: '💾 Storage Layout',
                  color: 'red',
                  content: `/custom_tablespace/
├── PG_VERSION          # PostgreSQL version
├── PG_16_202311020     # Version-specific directory
│   ├── 1/              # Database OID 1
│   │   ├── 1663/       # Relfilenode of table/index
│   │   └── 1664/       # Another relation
│   └── 2/              # Database OID 2
└── pg_tblspc/          # Symlinks for replication`
                }
              ].map((item, idx) => (
                <div key={idx} style={{ 
                  background: idx % 2 === 0 ? 'rgba(74, 222, 128, 0.1)' : 'rgba(251, 191, 36, 0.1)', 
                  padding: '16px', 
                  borderRadius: '8px', 
                  marginBottom: '12px',
                  borderLeft: `3px solid ${idx % 2 === 0 ? '#4ade80' : '#fbbf24'}`
                }}>
                  <p style={{ color: idx % 2 === 0 ? '#4ade80' : '#fbbf24', fontWeight: 'bold', marginBottom: '8px', fontSize: '17px' }}>
                    {item.title}
                  </p>
                  <pre style={{ color: '#a0c8ff', fontSize: '15px', background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: '4px', overflow: 'auto', margin: 0 }}>
                    {item.content}
                  </pre>
                </div>
              ))}
            </div>
          </div>
        );

      case 'creation':
        return (
          <div style={{ animation: 'float-up 0.6s ease-out' }}>
            <div style={{ background: 'rgba(100, 200, 255, 0.08)', border: '1px solid rgba(100, 200, 255, 0.2)', borderRadius: '12px', padding: '20px' }}>
              <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#64c8ff', marginBottom: '16px' }}>
                Creating & Managing Tablespaces
              </h3>

              <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '16px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '16px', color: '#a0c8ff', marginBottom: '16px' }}>
                <p style={{ color: '#fbbf24', marginBottom: '12px', fontWeight: 'bold' }}>Step 1: Create Physical Directory (as root/sudo)</p>
                <pre style={{ background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: '4px', margin: '0 0 12px 0', overflow: 'auto' }}>
{`sudo mkdir -p /data/tablespace_ssd
sudo mkdir -p /data/tablespace_hdd
sudo chown postgres:postgres /data/tablespace_ssd
sudo chown postgres:postgres /data/tablespace_hdd
sudo chmod 700 /data/tablespace_ssd
sudo chmod 700 /data/tablespace_hdd
sudo ls -l /data/tablespace_ssd  # Verify empty`}
                </pre>

                <p style={{ color: '#fbbf24', marginBottom: '12px', fontWeight: 'bold' }}>Step 2: Create Tablespace (as postgres)</p>
                <pre style={{ background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: '4px', margin: '0 0 12px 0', overflow: 'auto' }}>
{`CREATE TABLESPACE ssd_space LOCATION '/data/tablespace_ssd';
CREATE TABLESPACE hdd_space LOCATION '/data/tablespace_hdd';`}
                </pre>

                <p style={{ color: '#fbbf24', marginBottom: '12px', fontWeight: 'bold' }}>Step 3: List Tablespaces</p>
                <pre style={{ background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: '4px', margin: '0 0 12px 0', overflow: 'auto' }}>
{`\\db                    # psql command
SELECT * FROM pg_tablespace;`}
                </pre>

                <p style={{ color: '#fbbf24', marginBottom: '12px', fontWeight: 'bold' }}>Step 4: Assign to Database</p>
                <pre style={{ background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: '4px', margin: '0 0 12px 0', overflow: 'auto' }}>
{`CREATE DATABASE hotdb TABLESPACE ssd_space;
CREATE DATABASE colddb TABLESPACE hdd_space;`}
                </pre>

                <p style={{ color: '#fbbf24', marginBottom: '12px', fontWeight: 'bold' }}>Step 5: Assign to Table/Index</p>
                <pre style={{ background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: '4px', margin: '0 0 12px 0', overflow: 'auto' }}>
{`CREATE TABLE hot_table (id INT, data TEXT) 
  TABLESPACE ssd_space;

CREATE INDEX idx_hot ON hot_table(id) 
  TABLESPACE ssd_space;`}
                </pre>
              </div>

              <div style={{ background: 'rgba(74, 222, 128, 0.1)', padding: '16px', borderRadius: '8px', borderLeft: '3px solid #4ade80' }}>
                <p style={{ color: '#4ade80', fontWeight: 'bold', marginBottom: '12px' }}>✅ Move Table to Different Tablespace</p>
                <pre style={{ background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: '4px', color: '#86efac', fontSize: '15px', overflow: 'auto' }}>
{`ALTER TABLE existing_table SET TABLESPACE hdd_space;
-- Wait: This locks table! Plan carefully.`}
                </pre>
              </div>

              <div style={{ background: 'rgba(248, 113, 113, 0.1)', padding: '16px', borderRadius: '8px', borderLeft: '3px solid #f87171' }}>
                <p style={{ color: '#f87171', fontWeight: 'bold', marginBottom: '12px' }}>🗑️ Drop Tablespace</p>
                <pre style={{ background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: '4px', color: '#f87171', fontSize: '15px', overflow: 'auto' }}>
{`-- Must be empty first!
DROP TABLESPACE ssd_space;  -- Error if not empty

-- Check what's in tablespace
SELECT * FROM pg_tables 
WHERE schemaname NOT IN ('pg_catalog', 'information_schema')`}
                </pre>
              </div>
            </div>
          </div>
        );

      case 'optimization':
        return (
          <div style={{ animation: 'float-up 0.6s ease-out' }}>
            <div style={{ background: 'rgba(100, 200, 255, 0.08)', border: '1px solid rgba(100, 200, 255, 0.2)', borderRadius: '12px', padding: '20px' }}>
              <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#64c8ff', marginBottom: '16px' }}>
                Performance Optimization with Tablespaces
              </h3>

              <div style={{ background: 'rgba(74, 222, 128, 0.1)', padding: '16px', borderRadius: '8px', borderLeft: '3px solid #4ade80', marginBottom: '16px' }}>
                <p style={{ color: '#4ade80', fontWeight: 'bold', marginBottom: '12px' }}>🚀 Optimization Strategies</p>
                <ul style={{ color: '#a0c8ff', fontSize: '16px', marginLeft: '16px' }}>
                  <li><strong>Separate Hot/Cold Data:</strong> SSD for hot tables, HDD for archives</li>
                  <li><strong>Index Separation:</strong> Put indexes on faster SSD</li>
                  <li><strong>Log Separation:</strong> WAL on separate disk for durability</li>
                  <li><strong>Temp Space:</strong> Temporary tables on fast NVMe</li>
                  <li><strong>Load Balancing:</strong> Distribute I/O across multiple spindles</li>
                </ul>
              </div>

              <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '16px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '15px', color: '#a0c8ff', marginBottom: '16px' }}>
                <p style={{ color: '#fbbf24', marginBottom: '8px', fontWeight: 'bold' }}>Practical Example: Multi-Tier Storage</p>
                <pre style={{ background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: '4px', margin: 0, overflow: 'auto' }}>
{`-- Tier 1: Ultra-fast NVMe (hot OLTP)
CREATE TABLESPACE nvme_hot LOCATION '/nvme/tablespace1';

-- Tier 2: SSD (general purpose)
CREATE TABLESPACE ssd_general LOCATION '/ssd/tablespace1';

-- Tier 3: HDD (cold data/archives)
CREATE TABLESPACE hdd_archive LOCATION '/hdd/tablespace1';

-- Create tables accordingly:
CREATE TABLE orders (...)      TABLESPACE nvme_hot;    -- High traffic
CREATE TABLE products (...) TABLESPACE ssd_general;  -- Moderate
CREATE TABLE audit_log (...) TABLESPACE hdd_archive; -- Read-only

-- Create indexes on fast storage:
CREATE INDEX idx_orders_date ON orders(order_date) 
  TABLESPACE nvme_hot;`}
                </pre>
              </div>

              <div style={{ background: 'rgba(251, 191, 36, 0.1)', padding: '16px', borderRadius: '8px', borderLeft: '3px solid #fbbf24' }}>
                <p style={{ color: '#fbbf24', fontWeight: 'bold', marginBottom: '12px' }}>📊 I/O Impact Analysis</p>
                <table style={{ width: '100%', color: '#a0c8ff', fontSize: '16px', marginTop: '8px' }}>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid rgba(251, 191, 36, 0.3)' }}>
                      <td style={{ padding: '4px' }}><strong>Scenario</strong></td>
                      <td style={{ padding: '4px' }}><strong>I/O Impact</strong></td>
                      <td style={{ padding: '4px' }}><strong>Speed Gain</strong></td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid rgba(251, 191, 36, 0.3)' }}>
                      <td style={{ padding: '4px' }}>All on HDD</td>
                      <td style={{ padding: '4px' }}>High contention</td>
                      <td style={{ padding: '4px' }}>Baseline</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid rgba(251, 191, 36, 0.3)' }}>
                      <td style={{ padding: '4px' }}>Tables on SSD</td>
                      <td style={{ padding: '4px' }}>Reduced</td>
                      <td style={{ padding: '4px' }}>2-5x faster</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '4px' }}>Separate indexes</td>
                      <td style={{ padding: '4px' }}>Minimal</td>
                      <td style={{ padding: '4px' }}>5-10x faster</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'strategies':
        return (
          <div style={{ animation: 'float-up 0.6s ease-out' }}>
            <div style={{ background: 'rgba(100, 200, 255, 0.08)', border: '1px solid rgba(100, 200, 255, 0.2)', borderRadius: '12px', padding: '20px' }}>
              <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#64c8ff', marginBottom: '16px' }}>
                Tablespace Strategies & Best Practices
              </h3>

              {[
                {
                  title: '🏗️ Strategy 1: OLTP Optimization',
                  color: 'green',
                  items: [
                    'Hot tables on NVMe/SSD for fast access',
                    'Indexes on separate SSD for parallel I/O',
                    'WAL on dedicated disk (no sharing)',
                    'Temp tables on fast SSD',
                    'Regularly monitor table size/growth'
                  ]
                },
                {
                  title: '📊 Strategy 2: OLAP/Analytics',
                  color: 'yellow',
                  items: [
                    'Large fact tables on HDD (sequential scans)',
                    'Dimension tables on SSD (lookups)',
                    'Aggregate results/materialized views on fast storage',
                    'Separate reporting database tablespace',
                    'Archive old data to HDD'
                  ]
                },
                {
                  title: '🔄 Strategy 3: Workload Separation',
                  color: 'blue',
                  items: [
                    'Production DB on SSD (primary workload)',
                    'Reporting DB on HDD (secondary)',
                    'Temp/staging on NVMe',
                    'Backups on separate storage',
                    'Dedicated WAL disk'
                  ]
                },
                {
                  title: '⚠️ Strategy 4: Risk Mitigation',
                  color: 'red',
                  items: [
                    'Never fill disk to 100% (leave 10% free)',
                    'Monitor disk I/O and space regularly',
                    'Test migration before production',
                    'Have rollback plan for ALTER TABLE',
                    'Backup before major changes'
                  ]
                }
              ].map((strategy, idx) => (
                <div key={idx} style={{ 
                  background: idx % 2 === 0 ? 'rgba(74, 222, 128, 0.1)' : 'rgba(251, 191, 36, 0.1)', 
                  padding: '16px', 
                  borderRadius: '8px', 
                  marginBottom: '12px',
                  borderLeft: `3px solid ${idx % 2 === 0 ? '#4ade80' : '#fbbf24'}`
                }}>
                  <p style={{ color: idx % 2 === 0 ? '#4ade80' : '#fbbf24', fontWeight: 'bold', marginBottom: '8px', fontSize: '17px' }}>
                    {strategy.title}
                  </p>
                  <ul style={{ color: '#a0c8ff', fontSize: '16px', marginLeft: '16px', margin: 0 }}>
                    {strategy.items.map((item, i) => (
                      <li key={i}>✓ {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        );

      case 'examples':
        return (
          <div style={{ animation: 'float-up 0.6s ease-out' }}>
            <div style={{ background: 'rgba(100, 200, 255, 0.08)', border: '1px solid rgba(100, 200, 255, 0.2)', borderRadius: '12px', padding: '20px' }}>
              <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#64c8ff', marginBottom: '16px' }}>
                Practical Examples & Scenarios
              </h3>

              <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '16px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '15px', color: '#a0c8ff', marginBottom: '16px' }}>
                <p style={{ color: '#fbbf24', marginBottom: '8px', fontWeight: 'bold' }}>Example 1: E-commerce Application</p>
                <pre style={{ background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: '4px', margin: 0, overflow: 'auto' }}>
{`-- Setup storage tiers
CREATE TABLESPACE nvme_hot LOCATION '/nvme/hot';
CREATE TABLESPACE ssd_warm LOCATION '/ssd/warm';
CREATE TABLESPACE hdd_cold LOCATION '/hdd/cold';

-- Hot data (orders, cart, users)
CREATE TABLE orders (...) TABLESPACE nvme_hot;
CREATE TABLE cart_items (...) TABLESPACE nvme_hot;
CREATE INDEX idx_orders_user ON orders(user_id) 
  TABLESPACE nvme_hot;

-- Warm data (products, inventory)
CREATE TABLE products (...) TABLESPACE ssd_warm;
CREATE TABLE inventory (...) TABLESPACE ssd_warm;

-- Cold data (archives, history)
CREATE TABLE order_history (...) TABLESPACE hdd_cold;
CREATE TABLE user_activity_log (...) TABLESPACE hdd_cold;`}
                </pre>

                <p style={{ color: '#4ade80', marginBottom: '8px', fontWeight: 'bold', marginTop: '16px' }}>Example 2: Monitor Tablespace Usage</p>
                <pre style={{ background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: '4px', margin: 0, overflow: 'auto' }}>
{`-- Check tablespace sizes
SELECT spcname as tablespace_name,
       pg_size_pretty(pg_tablespace_size(spcoid)) as size
FROM pg_tablespace
ORDER BY pg_tablespace_size(spcoid) DESC;

-- Find tables in specific tablespace
SELECT schemaname, tablename, spcname
FROM pg_tables
JOIN pg_tablespace ON pg_tables.tableoid = pg_tablespace.oid
WHERE spcname = 'ssd_space'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;`}
                </pre>

                <p style={{ color: '#fbbf24', marginBottom: '8px', fontWeight: 'bold', marginTop: '16px' }}>Example 3: Rebalance After Adding Disk</p>
                <pre style={{ background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: '4px', margin: 0, overflow: 'auto' }}>
{`-- Create new fast tablespace
CREATE TABLESPACE nvme_new LOCATION '/nvme2/hot';

-- Migrate table (during low traffic!)
BEGIN;
ALTER TABLE large_hot_table SET TABLESPACE nvme_new;
COMMIT;

-- Verify migration
SELECT pg_relation_filepath('large_hot_table');`}
                </pre>
              </div>

              <div style={{ background: 'rgba(248, 113, 113, 0.1)', padding: '16px', borderRadius: '8px', borderLeft: '3px solid #f87171' }}>
                <p style={{ color: '#f87171', fontWeight: 'bold', marginBottom: '8px' }}>⚠️ Important Notes</p>
                <ul style={{ color: '#a0c8ff', fontSize: '16px', marginLeft: '16px' }}>
                  <li>ALTER TABLE locks the table! Schedule during maintenance window</li>
                  <li>Large table migration can take hours/days</li>
                  <li>Monitor disk space during migration</li>
                  <li>Consider using pg_repack for online migration</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'troubleshooting':
        return (
          <div style={{ animation: 'float-up 0.6s ease-out' }}>
            <div style={{ background: 'rgba(100, 200, 255, 0.08)', border: '1px solid rgba(100, 200, 255, 0.2)', borderRadius: '12px', padding: '20px' }}>
              <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#64c8ff', marginBottom: '16px' }}>
                Troubleshooting & Common Issues
              </h3>

              {[
                {
                  problem: '❌ ERROR: Directory not empty',
                  solution: 'Directory must be empty and have correct permissions (700). PostgreSQL will create version subdirectory.',
                  fix: 'sudo rm -rf /path/to/tablespace/* && sudo chmod 700 /path/to/tablespace'
                },
                {
                  problem: '❌ Permission denied on tablespace location',
                  solution: 'The directory must be owned by postgres:postgres user.',
                  fix: 'sudo chown postgres:postgres /data/tablespace && sudo chmod 700 /data/tablespace'
                },
                {
                  problem: '❌ Table cannot find data after migration',
                  solution: 'ALTER TABLE uncommitted or failed. Check transaction status.',
                  fix: 'ROLLBACK; or COMMIT; depending on status'
                },
                {
                  problem: '⚠️ Tablespace running out of space',
                  solution: 'Move large tables to another tablespace or add more disk space.',
                  fix: 'ALTER TABLE big_table SET TABLESPACE new_space;'
                },
                {
                  problem: '❌ Cannot drop tablespace',
                  solution: 'Tablespace must be empty. Move all objects first.',
                  fix: 'ALTER TABLE table_name SET TABLESPACE pg_default; then DROP TABLESPACE;'
                }
              ].map((item, idx) => (
                <div key={idx} style={{ 
                  background: 'rgba(248, 113, 113, 0.1)', 
                  padding: '16px', 
                  borderRadius: '8px', 
                  marginBottom: '12px',
                  borderLeft: '3px solid #f87171'
                }}>
                  <p style={{ color: '#f87171', fontWeight: 'bold', marginBottom: '4px', fontSize: '17px' }}>
                    {item.problem}
                  </p>
                  <p style={{ color: '#a0c8ff', fontSize: '16px', marginBottom: '8px' }}>
                    {item.solution}
                  </p>
                  <pre style={{ background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: '4px', color: '#86efac', fontSize: '15px', margin: 0, overflow: 'auto' }}>
                    {item.fix}
                  </pre>
                </div>
              ))}
            </div>
          </div>
        );

      case 'cheatsheet':
        return (
          <div style={{ animation: 'float-up 0.6s ease-out' }}>
            <div style={{ background: 'rgba(100, 200, 255, 0.08)', border: '1px solid rgba(100, 200, 255, 0.2)', borderRadius: '12px', padding: '20px' }}>
              <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#64c8ff', marginBottom: '16px' }}>
                Tablespaces Cheatsheet
              </h3>

              <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '16px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '15px', color: '#a0c8ff', marginBottom: '16px' }}>
                <p style={{ color: '#fbbf24', marginBottom: '8px', fontWeight: 'bold' }}>🗂️ Common Commands</p>
                <pre style={{ background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: '4px', margin: 0, overflow: 'auto' }}>
{`-- List tablespaces
\\db
SELECT * FROM pg_tablespace;

-- Create tablespace
CREATE TABLESPACE space_name LOCATION '/path/to/dir';

-- Create database in tablespace
CREATE DATABASE db_name TABLESPACE space_name;

-- Create table in tablespace
CREATE TABLE table_name (...) TABLESPACE space_name;

-- Create index in tablespace
CREATE INDEX idx_name ON table(col) TABLESPACE space_name;

-- Alter table to different tablespace
ALTER TABLE table_name SET TABLESPACE space_name;

-- Tablespace sizes
SELECT spcname, pg_size_pretty(pg_tablespace_size(spcoid))
FROM pg_tablespace;

-- Tables in tablespace
SELECT tablename FROM pg_tables WHERE spcname = 'space_name';

-- Drop tablespace
DROP TABLESPACE space_name;  -- Must be empty`}
                </pre>

                <p style={{ color: '#4ade80', marginBottom: '8px', fontWeight: 'bold', marginTop: '16px' }}>📋 Setup Checklist</p>
                <pre style={{ background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: '4px', margin: 0, overflow: 'auto' }}>
{`☐ Create physical directory as root
☐ Set ownership to postgres:postgres
☐ Set permissions to 700
☐ CREATE TABLESPACE in PostgreSQL
☐ Verify with \\db or pg_tablespace
☐ Assign database/table to tablespace
☐ Monitor space with queries
☐ Plan for growth and maintenance`}
                </pre>
              </div>

              <div style={{ background: 'rgba(74, 222, 128, 0.1)', padding: '16px', borderRadius: '8px', borderLeft: '3px solid #4ade80' }}>
                <p style={{ color: '#4ade80', fontWeight: 'bold', marginBottom: '8px' }}>✅ Best Practices</p>
                <ul style={{ color: '#a0c8ff', fontSize: '16px', marginLeft: '16px' }}>
                  <li>Use descriptive names (ssd_hot, hdd_archive, etc)</li>
                  <li>Reserve 10% disk space free</li>
                  <li>Monitor with regular queries</li>
                  <li>Plan migrations during low-traffic periods</li>
                  <li>Test on staging first</li>
                  <li>Document tablespace layout</li>
                  <li>Include in backup/recovery plans</li>
                </ul>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Unknown tab</div>;
    }
  };

  return (
    <div style={{ background: 'linear-gradient(135deg, #0f1419 0%, #1a2332 100%)', minHeight: '100vh' }}>
      <style>{`
        @keyframes float-up {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
      `}</style>

      {/* Header */}
      <header style={{ borderBottom: '1px solid rgba(100, 200, 255, 0.2)', background: 'rgba(15, 20, 25, 0.8)' }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '40px 24px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '8px', color: '#e0f2ff' }}>
            PostgreSQL Tablespaces 💾
          </h1>
          <p style={{ color: '#a0c8ff', fontSize: '20px' }}>
            Master tablespace management untuk optimization, performance tuning, dan storage management
          </p>
        </div>
      </header>

      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '40px 24px' }}>
        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', borderBottom: '1px solid rgba(100, 200, 255, 0.2)', paddingBottom: '16px', overflowX: 'auto' }}>
          {tabConfigs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '12px 16px',
                fontWeight: '500',
                whiteSpace: 'nowrap',
                fontSize: '17px',
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

        {/* Content */}
        {renderContent()}
      </div>

      {/* Footer */}
      <footer style={{ background: 'rgba(15, 20, 25, 0.5)', borderTop: '1px solid rgba(100, 200, 255, 0.2)', marginTop: '60px', padding: '40px 0', textAlign: 'center' }}>
        <p style={{ color: '#708090', fontSize: '18px', marginBottom: '8px' }}>
          💾 Tablespaces = Flexible Storage Management & Performance Optimization
        </p>
        <p style={{ color: '#708090', fontSize: '18px' }}>
          💡 Tip: Plan your tablespace layout before storing production data! 🚀
        </p>
      </footer>
    </div>
  );
};

export default TablespacesModule;