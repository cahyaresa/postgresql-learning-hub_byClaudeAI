import React, { useState } from 'react'

const DataPartitioningModule = () => {
  const [activeTab, setActiveTab] = useState('overview')

  const tabConfigs = [
    { id: 'overview', label: '📖 Overview', desc: 'Partitioning fundamentals' },
    { id: 'types', label: '🎯 Partition Types', desc: 'Range, List, Hash' },
    { id: 'range', label: '📅 Range Partitioning', desc: 'Time-based data' },
    { id: 'list', label: '📋 List Partitioning', desc: 'Discrete values' },
    { id: 'hash', label: '#️⃣ Hash Partitioning', desc: 'Balanced distribution' },
    { id: 'performance', label: '⚡ Performance Benefits', desc: 'Query optimization' },
    { id: 'examples', label: '💻 Practical Examples', desc: 'Real scenarios' },
    { id: 'maintenance', label: '🔧 Maintenance', desc: 'Adding/dropping partitions' },
    { id: 'indexing', label: '🔍 Indexing', desc: 'Index types & strategies' },
    { id: 'toast', label: '🍞 TOAST', desc: 'Large value storage' },
  ]

  const renderContent = () => {
    switch(activeTab) {
      case 'overview':
        return (
          <div style={{ animation: 'float-up 0.6s ease-out' }}>
            <div style={{ background: 'rgba(100, 200, 255, 0.08)', border: '1px solid rgba(100, 200, 255, 0.2)', borderRadius: '12px', padding: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#64c8ff', marginBottom: '16px' }}>
                PostgreSQL Data Partitioning
              </h3>
              
              <p style={{ color: '#a0c8ff', lineHeight: '1.8', fontSize: '14px', marginBottom: '16px' }}>
                <strong>Table Partitioning</strong> memecah satu tabel besar menjadi multiple smaller physical tables 
                (partitions) berdasarkan criteria tertentu (range, list, hash). Logically masih terlihat sebagai satu tabel, 
                tetapi physically data tersebar. PostgreSQL 10+ mendukung declarative partitioning dengan performance benefits signifikan.
              </p>

              <div style={{ background: 'rgba(100, 200, 255, 0.1)', padding: '16px', borderRadius: '8px', borderLeft: '3px solid #64c8ff', marginBottom: '16px' }}>
                <p style={{ color: '#64c8ff', fontWeight: 'bold', marginBottom: '12px' }}>💡 What is Partitioning?</p>
                <ul style={{ color: '#a0c8ff', fontSize: '13px', marginLeft: '16px' }}>
                  <li>✓ Split one large table into smaller partitions</li>
                  <li>✓ Partitions are separate physical tables</li>
                  <li>✓ Logical view is still single table</li>
                  <li>✓ Data distributed by partition key (date, region, etc)</li>
                  <li>✓ Queries leverage partition elimination</li>
                </ul>
              </div>

              <div style={{ background: 'rgba(74, 222, 128, 0.1)', padding: '16px', borderRadius: '8px', borderLeft: '3px solid #4ade80', marginBottom: '16px' }}>
                <p style={{ color: '#4ade80', fontWeight: 'bold', marginBottom: '12px' }}>🎯 Key Benefits</p>
                <ul style={{ color: '#a0c8ff', fontSize: '13px', marginLeft: '16px' }}>
                  <li>✓ <strong>Speed:</strong> Partition elimination (scan fewer rows)</li>
                  <li>✓ <strong>Scalability:</strong> Handle billions of rows efficiently</li>
                  <li>✓ <strong>Maintenance:</strong> Manage old partitions separately</li>
                  <li>✓ <strong>Concurrency:</strong> Parallel scans across partitions</li>
                  <li>✓ <strong>Indexes:</strong> Smaller indexes per partition</li>
                  <li>✓ <strong>Bulk loading:</strong> Load data into specific partition</li>
                </ul>
              </div>

              <div style={{ background: 'rgba(251, 191, 36, 0.1)', padding: '16px', borderRadius: '8px', borderLeft: '3px solid #fbbf24' }}>
                <p style={{ color: '#fbbf24', fontWeight: 'bold', marginBottom: '12px' }}>⚠️ When to Use Partitioning</p>
                <ul style={{ color: '#a0c8ff', fontSize: '12px', marginLeft: '16px' }}>
                  <li>✓ Tables &gt; 1GB (significant performance gains)</li>
                  <li>✓ Natural partition key exists (date, region, user_id)</li>
                  <li>✓ Queries filter by partition key</li>
                  <li>✓ Need to manage old data separately</li>
                  <li>✓ Parallel query processing beneficial</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'types':
        return (
          <div style={{ animation: 'float-up 0.6s ease-out' }}>
            <div style={{ background: 'rgba(100, 200, 255, 0.08)', border: '1px solid rgba(100, 200, 255, 0.2)', borderRadius: '12px', padding: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#64c8ff', marginBottom: '16px' }}>
                Partition Types Overview
              </h3>

              {[
                {
                  name: '📅 RANGE Partitioning',
                  description: 'Partition by value range (date, timestamp, numeric)',
                  example: 'Partition orders by year: 2022, 2023, 2024',
                  pros: 'Natural time-based partitioning, easy maintenance',
                  cons: 'Unbalanced partitions if ranges vary',
                  use: 'Time-series, logs, transactions by date'
                },
                {
                  name: '📋 LIST Partitioning',
                  description: 'Partition by discrete value list',
                  example: 'Partition by region: US, EU, ASIA',
                  pros: 'Clear business logic, good for categories',
                  cons: 'Must know all values upfront',
                  use: 'Geographic regions, product categories'
                },
                {
                  name: '#️⃣ HASH Partitioning',
                  description: 'Partition by hash of key (distributes evenly)',
                  example: 'Partition users by hash(user_id) into 4 buckets',
                  pros: 'Even distribution, no unbalanced partitions',
                  cons: 'Cannot eliminate partitions based on values',
                  use: 'Load balancing, no natural partition key'
                }
              ].map((type, idx) => (
                <div key={idx} style={{ 
                  background: idx % 2 === 0 ? 'rgba(74, 222, 128, 0.1)' : 'rgba(251, 191, 36, 0.1)', 
                  padding: '16px', 
                  borderRadius: '8px', 
                  marginBottom: '12px',
                  borderLeft: `3px solid ${idx % 2 === 0 ? '#4ade80' : '#fbbf24'}`
                }}>
                  <p style={{ color: idx % 2 === 0 ? '#4ade80' : '#fbbf24', fontWeight: 'bold', marginBottom: '4px', fontSize: '13px' }}>
                    {type.name}
                  </p>
                  <p style={{ color: '#a0c8ff', fontSize: '12px', marginBottom: '8px' }}>
                    <strong>Description:</strong> {type.description}
                  </p>
                  <p style={{ color: '#a0c8ff', fontSize: '12px', marginBottom: '4px' }}>
                    <strong>Example:</strong> {type.example}
                  </p>
                  <p style={{ color: '#a0c8ff', fontSize: '12px', marginBottom: '4px' }}>
                    <strong>Pros:</strong> {type.pros}
                  </p>
                  <p style={{ color: '#a0c8ff', fontSize: '12px', marginBottom: '4px' }}>
                    <strong>Cons:</strong> {type.cons}
                  </p>
                  <p style={{ color: '#a0c8ff', fontSize: '12px' }}>
                    <strong>Best for:</strong> {type.use}
                  </p>
                </div>
              ))}

              <div style={{ background: 'rgba(167, 139, 250, 0.1)', padding: '16px', borderRadius: '8px', borderLeft: '3px solid #a78bfa', marginTop: '16px' }}>
                <p style={{ color: '#a78bfa', fontWeight: 'bold', marginBottom: '8px' }}>🔀 Comparison Table</p>
                <table style={{ width: '100%', color: '#a0c8ff', fontSize: '11px', marginTop: '8px' }}>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid rgba(100, 200, 255, 0.3)' }}>
                      <td style={{ padding: '4px' }}><strong>Aspect</strong></td>
                      <td style={{ padding: '4px' }}><strong>RANGE</strong></td>
                      <td style={{ padding: '4px' }}><strong>LIST</strong></td>
                      <td style={{ padding: '4px' }}><strong>HASH</strong></td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid rgba(100, 200, 255, 0.3)' }}>
                      <td style={{ padding: '4px' }}>Data Type</td>
                      <td style={{ padding: '4px' }}>Numeric/Date</td>
                      <td style={{ padding: '4px' }}>Discrete</td>
                      <td style={{ padding: '4px' }}>Any</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid rgba(100, 200, 255, 0.3)' }}>
                      <td style={{ padding: '4px' }}>Balance</td>
                      <td style={{ padding: '4px' }}>Variable</td>
                      <td style={{ padding: '4px' }}>Variable</td>
                      <td style={{ padding: '4px' }}>Excellent</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid rgba(100, 200, 255, 0.3)' }}>
                      <td style={{ padding: '4px' }}>Maintenance</td>
                      <td style={{ padding: '4px' }}>High</td>
                      <td style={{ padding: '4px' }}>Medium</td>
                      <td style={{ padding: '4px' }}>Low</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '4px' }}>Elimination</td>
                      <td style={{ padding: '4px' }}>Yes</td>
                      <td style={{ padding: '4px' }}>Yes</td>
                      <td style={{ padding: '4px' }}>No</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'range':
        return (
          <div style={{ animation: 'float-up 0.6s ease-out' }}>
            <div style={{ background: 'rgba(100, 200, 255, 0.08)', border: '1px solid rgba(100, 200, 255, 0.2)', borderRadius: '12px', padding: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#64c8ff', marginBottom: '16px' }}>
                RANGE Partitioning (Most Common)
              </h3>

              <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '16px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '12px', color: '#a0c8ff', marginBottom: '16px' }}>
                <p style={{ color: '#fbbf24', marginBottom: '12px', fontWeight: 'bold' }}>Syntax & Example</p>
                <pre style={{ background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: '4px', margin: '0 0 12px 0', overflow: 'auto' }}>
{`CREATE TABLE orders (
  order_id BIGSERIAL,
  user_id INT,
  order_date DATE,
  amount DECIMAL,
  status VARCHAR(20)
) PARTITION BY RANGE (YEAR(order_date));

-- Create partitions for each year
CREATE TABLE orders_2022 PARTITION OF orders
  FOR VALUES FROM ('2022-01-01') TO ('2023-01-01');

CREATE TABLE orders_2023 PARTITION OF orders
  FOR VALUES FROM ('2023-01-01') TO ('2024-01-01');

CREATE TABLE orders_2024 PARTITION OF orders
  FOR VALUES FROM ('2024-01-01') TO ('2025-01-01');

-- Insert data (PostgreSQL routes automatically)
INSERT INTO orders VALUES (1, 100, '2023-05-15', 99.99, 'completed');`}
                </pre>

                <p style={{ color: '#4ade80', marginBottom: '12px', fontWeight: 'bold' }}>Query Performance</p>
                <pre style={{ background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: '4px', margin: 0, overflow: 'auto' }}>
{`-- Only scans orders_2024 partition! (Partition elimination)
SELECT * FROM orders WHERE order_date >= '2024-01-01'
  AND order_date < '2024-12-31';

-- EXPLAIN SHOW:
-- Seq Scan on orders_2024 (instead of full table scan)
-- Much faster for large tables!`}
                </pre>
              </div>

              <div style={{ background: 'rgba(74, 222, 128, 0.1)', padding: '16px', borderRadius: '8px', borderLeft: '3px solid #4ade80', marginBottom: '16px' }}>
                <p style={{ color: '#4ade80', fontWeight: 'bold', marginBottom: '8px' }}>✅ Range Partitioning Use Cases</p>
                <ul style={{ color: '#a0c8ff', fontSize: '12px', marginLeft: '16px' }}>
                  <li>✓ Time-series data (daily, monthly, yearly partitions)</li>
                  <li>✓ Log files (partition by timestamp)</li>
                  <li>✓ Transactions (partition by date)</li>
                  <li>✓ Sales data (partition by quarter/year)</li>
                  <li>✓ Easy to archive old partitions</li>
                  <li>✓ Can drop old data: DROP TABLE orders_2022</li>
                </ul>
              </div>

              <div style={{ background: 'rgba(251, 191, 36, 0.1)', padding: '16px', borderRadius: '8px', borderLeft: '3px solid #fbbf24' }}>
                <p style={{ color: '#fbbf24', fontWeight: 'bold', marginBottom: '8px' }}>⚠️ Maintenance: Adding Partitions</p>
                <pre style={{ background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: '4px', color: '#fbbf24', fontSize: '11px', overflow: 'auto' }}>
{`-- For 2025 data (add before year starts)
CREATE TABLE orders_2025 PARTITION OF orders
  FOR VALUES FROM ('2025-01-01') TO ('2026-01-01');

-- Can also create with default partition
CREATE TABLE orders_future PARTITION OF orders
  FOR VALUES FROM (MAXVALUE);`}
                </pre>
              </div>
            </div>
          </div>
        );

      case 'list':
        return (
          <div style={{ animation: 'float-up 0.6s ease-out' }}>
            <div style={{ background: 'rgba(100, 200, 255, 0.08)', border: '1px solid rgba(100, 200, 255, 0.2)', borderRadius: '12px', padding: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#64c8ff', marginBottom: '16px' }}>
                LIST Partitioning (Discrete Values)
              </h3>

              <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '16px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '12px', color: '#a0c8ff', marginBottom: '16px' }}>
                <p style={{ color: '#fbbf24', marginBottom: '12px', fontWeight: 'bold' }}>Example: Partition by Region</p>
                <pre style={{ background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: '4px', margin: '0 0 12px 0', overflow: 'auto' }}>
{`CREATE TABLE users (
  user_id BIGSERIAL,
  username VARCHAR(100),
  region VARCHAR(20),
  created_at TIMESTAMP
) PARTITION BY LIST (region);

-- Create partitions for each region
CREATE TABLE users_us PARTITION OF users
  FOR VALUES IN ('US', 'CA', 'MX');

CREATE TABLE users_eu PARTITION OF users
  FOR VALUES IN ('UK', 'DE', 'FR', 'IT', 'ES');

CREATE TABLE users_asia PARTITION OF users
  FOR VALUES IN ('JP', 'CN', 'IN', 'SG');

CREATE TABLE users_other PARTITION OF users
  FOR VALUES IN (DEFAULT);  -- Catch-all`}
                </pre>

                <p style={{ color: '#4ade80', marginBottom: '12px', fontWeight: 'bold' }}>Efficient Queries</p>
                <pre style={{ background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: '4px', margin: 0, overflow: 'auto' }}>
{`-- Only scans users_eu partition
SELECT * FROM users WHERE region = 'FR';

-- Scans users_us and users_eu
SELECT * FROM users WHERE region IN ('US', 'FR');`}
                </pre>
              </div>

              <div style={{ background: 'rgba(74, 222, 128, 0.1)', padding: '16px', borderRadius: '8px', borderLeft: '3px solid #4ade80' }}>
                <p style={{ color: '#4ade80', fontWeight: 'bold', marginBottom: '8px' }}>✅ LIST Partitioning Use Cases</p>
                <ul style={{ color: '#a0c8ff', fontSize: '12px', marginLeft: '16px' }}>
                  <li>✓ Geographic regions (US, EU, ASIA)</li>
                  <li>✓ Product categories (Electronics, Clothing, Food)</li>
                  <li>✓ Status values (active, inactive, archived)</li>
                  <li>✓ Data that naturally clusters by specific values</li>
                  <li>✓ Good partition elimination for exact matches</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'hash':
        return (
          <div style={{ animation: 'float-up 0.6s ease-out' }}>
            <div style={{ background: 'rgba(100, 200, 255, 0.08)', border: '1px solid rgba(100, 200, 255, 0.2)', borderRadius: '12px', padding: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#64c8ff', marginBottom: '16px' }}>
                HASH Partitioning (Even Distribution)
              </h3>

              <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '16px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '12px', color: '#a0c8ff', marginBottom: '16px' }}>
                <p style={{ color: '#fbbf24', marginBottom: '12px', fontWeight: 'bold' }}>Example: Even Load Distribution</p>
                <pre style={{ background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: '4px', margin: '0 0 12px 0', overflow: 'auto' }}>
{`CREATE TABLE sessions (
  session_id UUID,
  user_id BIGINT,
  ip_address INET,
  created_at TIMESTAMP
) PARTITION BY HASH (session_id);

-- Create 4 partitions (hash into buckets)
CREATE TABLE sessions_0 PARTITION OF sessions
  FOR VALUES WITH (MODULUS 4, REMAINDER 0);

CREATE TABLE sessions_1 PARTITION OF sessions
  FOR VALUES WITH (MODULUS 4, REMAINDER 1);

CREATE TABLE sessions_2 PARTITION OF sessions
  FOR VALUES WITH (MODULUS 4, REMAINDER 2);

CREATE TABLE sessions_3 PARTITION OF sessions
  FOR VALUES WITH (MODULUS 4, REMAINDER 3);

-- Data automatically distributed evenly`}
                </pre>

                <p style={{ color: '#4ade80', marginBottom: '12px', fontWeight: 'bold' }}>Hash Distribution</p>
                <pre style={{ background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: '4px', margin: 0, overflow: 'auto' }}>
{`-- Data distributed evenly:
-- session_id hash % 4 = 0 → sessions_0
-- session_id hash % 4 = 1 → sessions_1
-- session_id hash % 4 = 2 → sessions_2
-- session_id hash % 4 = 3 → sessions_3

-- Example:
-- UUID 'xxx-yyy-zzz' hash = 12345
-- 12345 % 4 = 1 → goes to sessions_1`}
                </pre>
              </div>

              <div style={{ background: 'rgba(74, 222, 128, 0.1)', padding: '16px', borderRadius: '8px', borderLeft: '3px solid #4ade80' }}>
                <p style={{ color: '#4ade80', fontWeight: 'bold', marginBottom: '8px' }}>✅ HASH Partitioning Benefits</p>
                <ul style={{ color: '#a0c8ff', fontSize: '12px', marginLeft: '16px' }}>
                  <li>✓ Perfect even distribution (no unbalanced partitions)</li>
                  <li>✓ Good for parallel processing</li>
                  <li>✓ No need to know all values upfront</li>
                  <li>✓ Automatically spreads load</li>
                  <li>✓ Good for UUIDs, user IDs, etc</li>
                  <li>⚠️ No partition elimination by value</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'performance':
        return (
          <div style={{ animation: 'float-up 0.6s ease-out' }}>
            <div style={{ background: 'rgba(100, 200, 255, 0.08)', border: '1px solid rgba(100, 200, 255, 0.2)', borderRadius: '12px', padding: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#64c8ff', marginBottom: '16px' }}>
                Performance Benefits & Optimization
              </h3>

              <div style={{ background: 'rgba(74, 222, 128, 0.1)', padding: '16px', borderRadius: '8px', borderLeft: '3px solid #4ade80', marginBottom: '16px' }}>
                <p style={{ color: '#4ade80', fontWeight: 'bold', marginBottom: '12px' }}>🚀 Key Performance Improvements</p>
                <ul style={{ color: '#a0c8ff', fontSize: '12px', marginLeft: '16px' }}>
                  <li><strong>Partition Elimination:</strong> Skip partitions not matching WHERE clause (2-10x faster)</li>
                  <li><strong>Smaller Indexes:</strong> Indexes on small partition vs large table (faster lookups)</li>
                  <li><strong>Parallel Execution:</strong> Query across multiple partitions in parallel</li>
                  <li><strong>Cache Efficiency:</strong> Smaller working set fits in cache better</li>
                  <li><strong>Concurrent Access:</strong> Different partitions, less lock contention</li>
                </ul>
              </div>

              <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '16px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '11px', color: '#a0c8ff', marginBottom: '16px' }}>
                <p style={{ color: '#fbbf24', marginBottom: '8px', fontWeight: 'bold' }}>Partition Elimination Example</p>
                <pre style={{ background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: '4px', margin: 0, overflow: 'auto' }}>
{`-- Table: 1 BILLION rows total
-- Partitioned by date (2024 partition: 100M rows)

-- WITHOUT partitioning:
SELECT * FROM orders WHERE order_date = '2024-05-15';
-- Scans 1 BILLION rows!

-- WITH partitioning:
SELECT * FROM orders WHERE order_date = '2024-05-15';
-- Partition elimination: Only scans 100M rows in orders_2024
-- 10x faster!

-- EXPLAIN shows:
-- Seq Scan on orders_2024 (not Append of all partitions)`}
                </pre>
              </div>

              <div style={{ background: 'rgba(251, 191, 36, 0.1)', padding: '16px', borderRadius: '8px', borderLeft: '3px solid #fbbf24' }}>
                <p style={{ color: '#fbbf24', fontWeight: 'bold', marginBottom: '12px' }}>📊 Performance Metrics</p>
                <table style={{ width: '100%', color: '#a0c8ff', fontSize: '11px', marginTop: '8px' }}>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid rgba(251, 191, 36, 0.3)' }}>
                      <td style={{ padding: '4px' }}><strong>Scenario</strong></td>
                      <td style={{ padding: '4px' }}><strong>Without Partition</strong></td>
                      <td style={{ padding: '4px' }}><strong>With Partition</strong></td>
                      <td style={{ padding: '4px' }}><strong>Speed Gain</strong></td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid rgba(251, 191, 36, 0.3)' }}>
                      <td style={{ padding: '4px' }}>Search by date</td>
                      <td style={{ padding: '4px' }}>1000ms</td>
                      <td style={{ padding: '4px' }}>100ms</td>
                      <td style={{ padding: '4px' }}>10x faster</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid rgba(251, 191, 36, 0.3)' }}>
                      <td style={{ padding: '4px' }}>Scan index</td>
                      <td style={{ padding: '4px' }}>500ms</td>
                      <td style={{ padding: '4px' }}>50ms</td>
                      <td style={{ padding: '4px' }}>10x faster</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid rgba(251, 191, 36, 0.3)' }}>
                      <td style={{ padding: '4px' }}>Update old data</td>
                      <td style={{ padding: '4px' }}>2000ms</td>
                      <td style={{ padding: '4px' }}>100ms</td>
                      <td style={{ padding: '4px' }}>20x faster</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '4px' }}>Delete old rows</td>
                      <td style={{ padding: '4px' }}>5000ms</td>
                      <td style={{ padding: '4px' }}>10ms (DROP)</td>
                      <td style={{ padding: '4px' }}>500x faster</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'examples':
        return (
          <div style={{ animation: 'float-up 0.6s ease-out' }}>
            <div style={{ background: 'rgba(100, 200, 255, 0.08)', border: '1px solid rgba(100, 200, 255, 0.2)', borderRadius: '12px', padding: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#64c8ff', marginBottom: '16px' }}>
                Practical Examples
              </h3>

              <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '16px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '11px', color: '#a0c8ff', marginBottom: '16px' }}>
                <p style={{ color: '#fbbf24', marginBottom: '8px', fontWeight: 'bold' }}>Example 1: E-commerce Orders by Year</p>
                <pre style={{ background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: '4px', margin: '0 0 12px 0', overflow: 'auto' }}>
{`-- Range partition by order date
CREATE TABLE orders (
  order_id BIGSERIAL PRIMARY KEY,
  user_id INT,
  order_date DATE NOT NULL,
  total_amount DECIMAL(10,2)
) PARTITION BY RANGE (YEAR(order_date));

-- Auto-create yearly partitions
CREATE TABLE orders_2023 PARTITION OF orders
  FOR VALUES FROM ('2023-01-01') TO ('2024-01-01');
CREATE TABLE orders_2024 PARTITION OF orders
  FOR VALUES FROM ('2024-01-01') TO ('2025-01-01');

-- Efficient queries:
-- This ONLY scans orders_2024!
SELECT * FROM orders 
WHERE order_date >= '2024-01-01' 
  AND order_date < '2025-01-01'
  AND total_amount > 100;

-- Archive old data (instant!):
DROP TABLE orders_2023;  -- Removes 10M rows instantly!`}
                </pre>

                <p style={{ color: '#4ade80', marginBottom: '8px', fontWeight: 'bold', marginTop: '16px' }}>Example 2: User Activity by Region</p>
                <pre style={{ background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: '4px', margin: '0 0 12px 0', overflow: 'auto' }}>
{`-- List partition by region
CREATE TABLE user_activity (
  activity_id BIGSERIAL,
  user_id INT,
  region VARCHAR(20) NOT NULL,
  event_type VARCHAR(50),
  created_at TIMESTAMP
) PARTITION BY LIST (region);

CREATE TABLE activity_us PARTITION OF user_activity
  FOR VALUES IN ('US', 'CA', 'MX');
CREATE TABLE activity_eu PARTITION OF user_activity
  FOR VALUES IN ('UK', 'DE', 'FR', 'IT', 'ES');
CREATE TABLE activity_asia PARTITION OF user_activity
  FOR VALUES IN ('JP', 'SG', 'AU', 'IN');

-- Queries automatically route to right partition:
INSERT INTO user_activity VALUES 
  (1, 101, 'FR', 'login', NOW());  -- Goes to activity_eu

SELECT * FROM user_activity WHERE region = 'JP';  
-- Only scans activity_asia partition`}
                </pre>

                <p style={{ color: '#f87171', marginBottom: '8px', fontWeight: 'bold', marginTop: '16px' }}>Example 3: Monitor Partitions</p>
                <pre style={{ background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: '4px', margin: 0, overflow: 'auto' }}>
{`-- Check partition sizes
SELECT 
  schemaname,
  tablename as partition_name,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size
FROM pg_tables
WHERE tablename LIKE 'orders_%'
ORDER BY tablename;

-- Count rows per partition
SELECT 
  schemaname,
  tablename,
  n_live_tup as row_count
FROM pg_stat_user_tables
WHERE tablename LIKE 'orders_%'
ORDER BY tablename;`}
                </pre>
              </div>
            </div>
          </div>
        );

      case 'maintenance':
        return (
          <div style={{ animation: 'float-up 0.6s ease-out' }}>
            <div style={{ background: 'rgba(100, 200, 255, 0.08)', border: '1px solid rgba(100, 200, 255, 0.2)', borderRadius: '12px', padding: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#64c8ff', marginBottom: '16px' }}>
                Partition Maintenance & Operations
              </h3>

              <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '16px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '11px', color: '#a0c8ff', marginBottom: '16px' }}>
                <p style={{ color: '#fbbf24', marginBottom: '8px', fontWeight: 'bold' }}>Adding New Partitions (Before data needed!)</p>
                <pre style={{ background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: '4px', margin: '0 0 12px 0', overflow: 'auto' }}>
{`-- Create 2025 partition before year starts
CREATE TABLE orders_2025 PARTITION OF orders
  FOR VALUES FROM ('2025-01-01') TO ('2026-01-01');

-- Pro tip: Create future partition automatically
CREATE TABLE orders_future PARTITION OF orders
  FOR VALUES FROM (MAXVALUE);  -- Catch-all`}
                </pre>

                <p style={{ color: '#4ade80', marginBottom: '8px', fontWeight: 'bold', marginTop: '16px' }}>Dropping Old Partitions (Archive data first!)</p>
                <pre style={{ background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: '4px', margin: '0 0 12px 0', overflow: 'auto' }}>
{`-- Archive 2022 data to backup first!
COPY orders_2022 TO PROGRAM 'gzip > /backup/orders_2022.sql.gz';

-- Then drop (instant deletion of 100M rows!)
DROP TABLE orders_2022;

-- Or detach and archive
ALTER TABLE orders DETACH PARTITION orders_2022;
-- orders_2022 still exists as independent table
-- But no longer part of orders parent table`}
                </pre>

                <p style={{ color: '#f87171', marginBottom: '8px', fontWeight: 'bold', marginTop: '16px' }}>Truncate Partition</p>
                <pre style={{ background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: '4px', margin: 0, overflow: 'auto' }}>
{`-- Remove all data from partition (keep structure)
TRUNCATE TABLE orders_2023;

-- Re-attach if detached
ALTER TABLE orders ATTACH PARTITION orders_2022
  FOR VALUES FROM ('2022-01-01') TO ('2023-01-01');`}
                </pre>
              </div>

              <div style={{ background: 'rgba(74, 222, 128, 0.1)', padding: '16px', borderRadius: '8px', borderLeft: '3px solid #4ade80' }}>
                <p style={{ color: '#4ade80', fontWeight: 'bold', marginBottom: '8px' }}>✅ Maintenance Checklist</p>
                <ul style={{ color: '#a0c8ff', fontSize: '12px', marginLeft: '16px' }}>
                  <li>✓ Create next month/year partition in advance</li>
                  <li>✓ Archive old data before dropping partitions</li>
                  <li>✓ Monitor partition sizes regularly</li>
                  <li>✓ Test partition strategy on staging</li>
                  <li>✓ Document partitioning scheme</li>
                  <li>✓ Automate partition creation with pg_partman extension</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'indexing':
        return (
          <div style={{ animation: 'float-up 0.6s ease-out' }}>
            <div style={{ background: 'rgba(100, 200, 255, 0.08)', border: '1px solid rgba(100, 200, 255, 0.2)', borderRadius: '12px', padding: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#64c8ff', marginBottom: '16px' }}>
                PostgreSQL Indexing Strategies
              </h3>

              <p style={{ color: '#a0c8ff', lineHeight: '1.8', fontSize: '14px', marginBottom: '16px' }}>
                Index adalah struktur data tambahan yang mempercepat query dengan menghindari full table scan.
                PostgreSQL menyediakan berbagai tipe index untuk use case berbeda — memilih tipe yang tepat
                sangat krusial untuk performance optimal.
              </p>

              {[
                {
                  name: 'B-Tree (Default)',
                  color: '#4ade80',
                  desc: 'General-purpose index. Mendukung =, <, >, BETWEEN, LIKE prefix. Default saat CREATE INDEX.',
                  sql: `-- Create B-Tree index (default)
CREATE INDEX idx_orders_date ON orders (order_date);
CREATE INDEX idx_users_email ON users (email);

-- Composite B-Tree
CREATE INDEX idx_orders_user_date ON orders (user_id, order_date);

-- Partial index (only active rows)
CREATE INDEX idx_active_users ON users (email)
  WHERE status = 'active';

-- Used by: =, <, >, BETWEEN, ORDER BY, LIKE 'prefix%'`,
                },
                {
                  name: 'Hash Index',
                  color: '#fbbf24',
                  desc: 'Hanya untuk equality (=). Lebih cepat dari B-Tree untuk exact match, tapi tidak mendukung range queries.',
                  sql: `-- Hash index: faster for = only
CREATE INDEX idx_sessions_token ON sessions USING HASH (token);

-- Good for: high-cardinality columns with only = queries
-- NOT for: <, >, BETWEEN, ORDER BY, LIKE

-- Example query that uses hash index:
SELECT * FROM sessions WHERE token = 'abc123';`,
                },
                {
                  name: 'GIN (Generalized Inverted Index)',
                  color: '#a78bfa',
                  desc: 'Untuk tipe komposit: array, jsonb, full-text search. Satu entry index bisa point ke banyak rows.',
                  sql: `-- GIN for JSONB columns
CREATE INDEX idx_products_attrs ON products USING GIN (attributes);

-- GIN for full-text search
CREATE INDEX idx_articles_fts ON articles
  USING GIN (to_tsvector('english', title || ' ' || body));

-- GIN for arrays
CREATE INDEX idx_posts_tags ON posts USING GIN (tags);

-- Queries that use GIN:
SELECT * FROM products WHERE attributes @> '{"color": "red"}';
SELECT * FROM articles WHERE to_tsvector('english', title) @@ to_tsquery('postgresql');
SELECT * FROM posts WHERE tags @> ARRAY['postgres'];`,
                },
                {
                  name: 'GiST (Generalized Search Tree)',
                  color: '#f87171',
                  desc: 'Untuk geometric types, range types, full-text search. Lossy index — may require recheck.',
                  sql: `-- GiST for range types
CREATE INDEX idx_events_period ON events USING GiST (period);

-- GiST for geometric/PostGIS
CREATE INDEX idx_locations_geo ON locations USING GiST (coordinates);

-- Queries using GiST:
-- Range overlap
SELECT * FROM events WHERE period && '[2024-01-01, 2024-12-31]';
-- Geographic proximity
SELECT * FROM locations
  ORDER BY coordinates <-> ST_Point(106.8, -6.2) LIMIT 10;`,
                },
                {
                  name: 'BRIN (Block Range Index)',
                  color: '#38bdf8',
                  desc: 'Sangat kecil — hanya menyimpan min/max per blok data. Ideal untuk tabel besar dengan data naturally ordered.',
                  sql: `-- BRIN for huge naturally-sorted tables
CREATE INDEX idx_logs_created ON logs USING BRIN (created_at);

-- Very small index size (vs B-Tree)
-- B-Tree on 1B rows: ~20GB
-- BRIN on 1B rows: ~1MB

-- Best for: time-series/append-only tables
-- WHERE clause must match insert order
SELECT * FROM logs WHERE created_at BETWEEN '2024-01-01' AND '2024-02-01';`,
                },
              ].map((idx, i) => (
                <div key={i} style={{ background: 'rgba(0,0,0,0.25)', borderRadius: '8px', marginBottom: '14px', overflow: 'hidden', border: `1px solid ${idx.color}33` }}>
                  <div style={{ padding: '10px 14px', background: `${idx.color}18`, borderBottom: `1px solid ${idx.color}33` }}>
                    <span style={{ color: idx.color, fontWeight: 'bold', fontSize: '13px' }}>{idx.name}</span>
                    <p style={{ color: '#a0c8ff', fontSize: '12px', margin: '4px 0 0 0' }}>{idx.desc}</p>
                  </div>
                  <pre style={{ background: 'rgba(0,0,0,0.3)', padding: '12px 14px', margin: 0, fontSize: '11px', color: '#a0c8ff', overflow: 'auto', fontFamily: 'monospace' }}>
                    {idx.sql}
                  </pre>
                </div>
              ))}

              <div style={{ background: 'rgba(251, 191, 36, 0.1)', padding: '16px', borderRadius: '8px', borderLeft: '3px solid #fbbf24', marginTop: '8px' }}>
                <p style={{ color: '#fbbf24', fontWeight: 'bold', marginBottom: '10px' }}>📊 Index Type Comparison</p>
                <table style={{ width: '100%', color: '#a0c8ff', fontSize: '11px' }}>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid rgba(251,191,36,0.3)' }}>
                      <td style={{ padding: '4px 6px' }}><strong>Type</strong></td>
                      <td style={{ padding: '4px 6px' }}><strong>Best For</strong></td>
                      <td style={{ padding: '4px 6px' }}><strong>Operators</strong></td>
                      <td style={{ padding: '4px 6px' }}><strong>Size</strong></td>
                    </tr>
                    {[
                      ['B-Tree', 'General queries', '=, <, >, BETWEEN, LIKE', 'Medium'],
                      ['Hash', 'Exact match only', '= only', 'Small'],
                      ['GIN', 'JSONB, Arrays, FTS', '@>, @@, &&', 'Large'],
                      ['GiST', 'Ranges, Geometry', '&&, @>, <->', 'Medium'],
                      ['BRIN', 'Huge sorted tables', '=, <, >', 'Tiny'],
                    ].map(([type, best, ops, size], i) => (
                      <tr key={i} style={{ borderBottom: '1px solid rgba(100,200,255,0.1)' }}>
                        <td style={{ padding: '4px 6px', color: '#64c8ff' }}>{type}</td>
                        <td style={{ padding: '4px 6px' }}>{best}</td>
                        <td style={{ padding: '4px 6px', fontFamily: 'monospace' }}>{ops}</td>
                        <td style={{ padding: '4px 6px' }}>{size}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div style={{ background: 'rgba(74, 222, 128, 0.1)', padding: '16px', borderRadius: '8px', borderLeft: '3px solid #4ade80', marginTop: '14px' }}>
                <p style={{ color: '#4ade80', fontWeight: 'bold', marginBottom: '8px' }}>✅ Index Best Practices</p>
                <ul style={{ color: '#a0c8ff', fontSize: '12px', marginLeft: '16px' }}>
                  <li>✓ Use <strong>EXPLAIN ANALYZE</strong> to verify index is used</li>
                  <li>✓ Partial indexes for filtered subsets (WHERE status = 'active')</li>
                  <li>✓ Composite index: put most selective column first</li>
                  <li>✓ Too many indexes slow down INSERT/UPDATE — index only what you query</li>
                  <li>✓ Use <strong>CREATE INDEX CONCURRENTLY</strong> on production (no table lock)</li>
                  <li>✓ Run <strong>VACUUM ANALYZE</strong> after bulk inserts to update statistics</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'toast':
        return (
          <div style={{ animation: 'float-up 0.6s ease-out' }}>
            <div style={{ background: 'rgba(100, 200, 255, 0.08)', border: '1px solid rgba(100, 200, 255, 0.2)', borderRadius: '12px', padding: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#64c8ff', marginBottom: '16px' }}>
                TOAST — The Oversized Attribute Storage Technique
              </h3>

              <p style={{ color: '#a0c8ff', lineHeight: '1.8', fontSize: '14px', marginBottom: '16px' }}>
                TOAST adalah mekanisme PostgreSQL untuk menyimpan nilai yang terlalu besar untuk satu page (8KB).
                PostgreSQL secara otomatis memecah nilai besar ke tabel TOAST tersendiri, transparan bagi aplikasi.
                Memahami TOAST penting untuk optimasi kolom TEXT, BYTEA, JSONB, dan array besar.
              </p>

              <div style={{ background: 'rgba(100, 200, 255, 0.1)', padding: '16px', borderRadius: '8px', borderLeft: '3px solid #64c8ff', marginBottom: '16px' }}>
                <p style={{ color: '#64c8ff', fontWeight: 'bold', marginBottom: '10px' }}>💡 How TOAST Works</p>
                <ul style={{ color: '#a0c8ff', fontSize: '13px', marginLeft: '16px', lineHeight: '1.9' }}>
                  <li>✓ PostgreSQL page size = <strong>8KB</strong></li>
                  <li>✓ Row must fit in one page — large values trigger TOAST</li>
                  <li>✓ TOAST threshold: ~2KB per value (¼ of page)</li>
                  <li>✓ Each table with large columns has a hidden <strong>pg_toast.pg_toast_NNNN</strong> table</li>
                  <li>✓ Large values are <strong>compressed and/or chunked</strong> (2KB chunks)</li>
                  <li>✓ Main table stores a pointer; TOAST table stores actual data</li>
                  <li>✓ Fully transparent — SELECT returns the reassembled value</li>
                </ul>
              </div>

              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '11px', color: '#a0c8ff', marginBottom: '16px' }}>
                <p style={{ color: '#fbbf24', marginBottom: '8px', fontWeight: 'bold' }}>TOAST Storage Strategies</p>
                <pre style={{ background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: '4px', margin: '0 0 12px 0', overflow: 'auto' }}>
{`-- View current storage strategy for each column
SELECT attname, attstorage
FROM pg_attribute
WHERE attrelid = 'articles'::regclass AND attlen = -1;

-- Storage strategy codes:
-- p = PLAIN    : Never compress or TOAST (short values)
-- e = EXTERNAL : TOAST without compression (fast retrieval)
-- x = EXTENDED : Compress then TOAST if needed (default)
-- m = MAIN     : Compress in-line, TOAST only as last resort`}
                </pre>

                <p style={{ color: '#4ade80', marginBottom: '8px', fontWeight: 'bold' }}>Changing Storage Strategy</p>
                <pre style={{ background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: '4px', margin: '0 0 12px 0', overflow: 'auto' }}>
{`-- EXTERNAL: store out-of-line without compression
-- Good for binary data (BYTEA) you need to slice efficiently
ALTER TABLE documents
  ALTER COLUMN content SET STORAGE EXTERNAL;

-- MAIN: try to keep inline, compress first
-- Good for frequently-accessed moderate-size text
ALTER TABLE articles
  ALTER COLUMN body SET STORAGE MAIN;

-- PLAIN: never TOAST (only for small fixed-width types)
-- PostgreSQL does not allow PLAIN on variable-length if it won't fit
ALTER TABLE products
  ALTER COLUMN sku SET STORAGE PLAIN;`}
                </pre>

                <p style={{ color: '#a78bfa', marginBottom: '8px', fontWeight: 'bold' }}>Inspect TOAST Table</p>
                <pre style={{ background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: '4px', margin: '0 0 12px 0', overflow: 'auto' }}>
{`-- Find the TOAST table for a given table
SELECT relname, reltoastrelid::regclass AS toast_table
FROM pg_class
WHERE relname = 'articles';

-- Check TOAST table size
SELECT
  pg_size_pretty(pg_total_relation_size('pg_toast.pg_toast_12345')) AS toast_size;

-- How much data is TOASTed?
SELECT
  schemaname, tablename,
  pg_size_pretty(pg_relation_size(schemaname||'.'||tablename)) AS table_size,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)
    - pg_relation_size(schemaname||'.'||tablename)) AS toast_size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;`}
                </pre>

                <p style={{ color: '#f87171', marginBottom: '8px', fontWeight: 'bold' }}>Performance Impact & Tips</p>
                <pre style={{ background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: '4px', margin: 0, overflow: 'auto' }}>
{`-- Selecting only non-TOASTed columns is MUCH faster
-- Bad: fetches all TOAST data even if unused
SELECT * FROM articles WHERE category = 'tech';

-- Good: avoids TOAST fetch entirely
SELECT id, title, created_at FROM articles WHERE category = 'tech';

-- Index on expression to avoid TOAST reads
CREATE INDEX idx_articles_title ON articles (title);
-- title stored MAIN: compressed inline, no TOAST fetch for index scan

-- For JSONB: index specific paths to avoid loading full TOAST value
CREATE INDEX idx_products_color ON products
  USING GIN ((attributes -> 'color'));`}
                </pre>
              </div>

              <div style={{ background: 'rgba(167, 139, 250, 0.1)', padding: '16px', borderRadius: '8px', borderLeft: '3px solid #a78bfa', marginBottom: '14px' }}>
                <p style={{ color: '#a78bfa', fontWeight: 'bold', marginBottom: '10px' }}>📊 TOAST Strategy Comparison</p>
                <table style={{ width: '100%', color: '#a0c8ff', fontSize: '11px' }}>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid rgba(167,139,250,0.3)' }}>
                      <td style={{ padding: '4px 6px' }}><strong>Strategy</strong></td>
                      <td style={{ padding: '4px 6px' }}><strong>Compress?</strong></td>
                      <td style={{ padding: '4px 6px' }}><strong>Out-of-line?</strong></td>
                      <td style={{ padding: '4px 6px' }}><strong>Best For</strong></td>
                    </tr>
                    {[
                      ['PLAIN', 'No', 'No', 'Short fixed values (int, bool)'],
                      ['EXTERNAL', 'No', 'Yes (if large)', 'BYTEA, binary blobs (fast slice)'],
                      ['EXTENDED', 'Yes', 'Yes (if needed)', 'TEXT, JSONB — default, best compression'],
                      ['MAIN', 'Yes', 'Last resort', 'Medium text, keep in main heap'],
                    ].map(([strat, compress, outline, best], i) => (
                      <tr key={i} style={{ borderBottom: '1px solid rgba(100,200,255,0.1)' }}>
                        <td style={{ padding: '4px 6px', color: '#64c8ff', fontFamily: 'monospace' }}>{strat}</td>
                        <td style={{ padding: '4px 6px' }}>{compress}</td>
                        <td style={{ padding: '4px 6px' }}>{outline}</td>
                        <td style={{ padding: '4px 6px' }}>{best}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div style={{ background: 'rgba(74, 222, 128, 0.1)', padding: '16px', borderRadius: '8px', borderLeft: '3px solid #4ade80' }}>
                <p style={{ color: '#4ade80', fontWeight: 'bold', marginBottom: '8px' }}>✅ TOAST Best Practices</p>
                <ul style={{ color: '#a0c8ff', fontSize: '12px', marginLeft: '16px' }}>
                  <li>✓ <strong>SELECT only columns you need</strong> — avoids unnecessary TOAST reads</li>
                  <li>✓ Use <strong>EXTERNAL</strong> for BYTEA if you need substring/slice access</li>
                  <li>✓ Use <strong>EXTENDED</strong> (default) for TEXT/JSONB — best compression ratio</li>
                  <li>✓ Index specific JSONB paths to skip full TOAST value reads</li>
                  <li>✓ Monitor TOAST table size separately — it can dwarf the main table</li>
                  <li>✓ VACUUM cleans TOAST tables too — run regularly on high-churn tables</li>
                  <li>✓ Consider chunking very large blobs at application level (&gt;1MB)</li>
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
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px', color: '#e0f2ff' }}>
            Data Partitioning 📊
          </h1>
          <p style={{ color: '#a0c8ff', fontSize: '16px' }}>
            Master table partitioning untuk massive scalability dan performance optimization
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

        {/* Content */}
        {renderContent()}
      </div>

      {/* Footer */}
      <footer style={{ background: 'rgba(15, 20, 25, 0.5)', borderTop: '1px solid rgba(100, 200, 255, 0.2)', marginTop: '60px', padding: '40px 0', textAlign: 'center' }}>
        <p style={{ color: '#708090', fontSize: '14px', marginBottom: '8px' }}>
          📊 Partitioning = Scalability & Performance for Billion-Row Tables
        </p>
        <p style={{ color: '#708090', fontSize: '14px' }}>
          💡 Tip: Partition early, scale indefinitely! 🚀
        </p>
      </footer>
    </div>
  );
};

export default DataPartitioningModule;