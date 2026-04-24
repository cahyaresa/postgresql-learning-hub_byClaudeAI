import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const PostgreSQLTransactionLog = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabConfigs = [
    { id: 'overview', label: '📖 Overview', desc: 'WAL konsep' },
    { id: 'wal-structure', label: '🗂️ WAL Structure', desc: 'Files & LSN' },
    { id: 'waldump', label: '🔬 pg_waldump', desc: 'Baca & analisis WAL records' },
    { id: 'transaction-ids', label: '🔢 Transaction IDs', desc: 'XID, XMIN, XMAX' },
    { id: 'mvcc-wal', label: '🔄 MVCC & WAL', desc: 'Integrasi' },
    { id: 'checkpoint', label: '🏁 Checkpoint', desc: 'Flush mechanism' },
    { id: 'recovery', label: '🔄 Recovery', desc: 'Crash recovery' },
    { id: 'replication', label: '🔗 Replication', desc: 'WAL streaming' },
    { id: 'monitoring', label: '📊 Monitoring', desc: 'Health check' },
  ];

  const renderContent = () => {
    switch(activeTab) {
      case 'overview':
        return (
          <div style={{ animation: 'float-up 0.6s ease-out' }}>
            <div style={{ background: 'rgba(100, 200, 255, 0.08)', border: '1px solid rgba(100, 200, 255, 0.2)', borderRadius: '12px', padding: '20px' }}>
              <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#64c8ff', marginBottom: '16px' }}>
                Write-Ahead Logging (WAL)
              </h3>
              <p style={{ color: '#a0c8ff', lineHeight: '1.8', fontSize: '18px', marginBottom: '16px' }}>
                Write-Ahead Logging (WAL) adalah fundamental mechanism dalam PostgreSQL untuk menjamin ACID properties. 
                Sebelum data page ditulis ke disk, PostgreSQL HARUS write transaction log (WAL record) terlebih dahulu.
              </p>
              
              <div style={{ background: 'rgba(74, 222, 128, 0.1)', padding: '16px', borderRadius: '8px', borderLeft: '3px solid #4ade80', marginBottom: '16px' }}>
                <p style={{ color: '#4ade80', fontWeight: 'bold', marginBottom: '12px' }}>🎯 Core Principle:</p>
                <p style={{ color: '#a0c8ff', fontFamily: 'monospace', fontSize: '17px', fontWeight: 'bold', marginBottom: '8px' }}>
                  "Write the log BEFORE writing the data"
                </p>
                <ul style={{ color: '#a0c8ff', fontSize: '17px', marginLeft: '16px' }}>
                  <li>① Transaction modify data page dalam shared buffers</li>
                  <li>② SEBELUM apply, write WAL record to disk ← CRITICAL!</li>
                  <li>③ After WAL durable, data page can apply</li>
                  <li>④ If crash: WAL on disk guarantee recovery</li>
                </ul>
              </div>

              <div style={{ background: 'rgba(100, 200, 255, 0.1)', padding: '16px', borderRadius: '8px', borderLeft: '3px solid #64c8ff' }}>
                <p style={{ color: '#64c8ff', fontWeight: 'bold', marginBottom: '12px' }}>📍 Location:</p>
                <code style={{ color: '#86efac', fontFamily: 'monospace', display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                  $PGDATA/pg_wal/
                </code>
                <p style={{ color: '#a0c8ff', fontSize: '16px' }}>
                  Example: <code style={{ color: '#86efac', fontFamily: 'monospace' }}>/var/lib/postgresql/14/main/pg_wal/</code>
                </p>
              </div>
            </div>
          </div>
        );

      case 'wal-structure':
        return (
          <div style={{ animation: 'float-up 0.6s ease-out' }}>
            <div style={{ background: 'rgba(100, 200, 255, 0.08)', border: '1px solid rgba(100, 200, 255, 0.2)', borderRadius: '12px', padding: '20px' }}>
              <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#64c8ff', marginBottom: '16px' }}>
                WAL File Structure
              </h3>
              <p style={{ color: '#a0c8ff', fontSize: '17px', marginBottom: '12px' }}>
                WAL files terorganisir dalam $PGDATA/pg_wal/ directory dengan naming convention hexadecimal.
              </p>
              
              <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '16px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '16px', color: '#a0c8ff', marginBottom: '16px' }}>
                <p style={{ color: '#fbbf24', marginBottom: '8px' }}>Directory structure:</p>
                <p>$PGDATA/pg_wal/</p>
                <p style={{ marginLeft: '20px' }}>├─ 000000010000000000000001 (16 MB)</p>
                <p style={{ marginLeft: '20px' }}>├─ 000000010000000000000002 (16 MB)</p>
                <p style={{ marginLeft: '20px' }}>├─ 000000010000000000000003 (16 MB)</p>
                <p style={{ marginLeft: '20px' }}>└─ 000000010000000000000004 (16 MB)</p>
              </div>

              <div style={{ background: 'rgba(74, 222, 128, 0.1)', padding: '16px', borderRadius: '8px', borderLeft: '3px solid #4ade80' }}>
                <p style={{ color: '#4ade80', fontWeight: 'bold', marginBottom: '8px' }}>LSN (Log Sequence Number)</p>
                <p style={{ color: '#a0c8ff', fontSize: '16px' }}>
                  LSN = unique position dalam WAL stream (8-byte number, monotonically increasing)
                </p>
                <p style={{ color: '#a0c8ff', fontSize: '16px', marginTop: '8px' }}>
                  Format: <code style={{ color: '#64c8ff', fontFamily: 'monospace' }}>0/00001234</code> (high/low 32-bit hex)
                </p>
              </div>
            </div>
          </div>
        );

      case 'transaction-ids':
        return (
          <div style={{ animation: 'float-up 0.6s ease-out' }}>
            <div style={{ background: 'rgba(100, 200, 255, 0.08)', border: '1px solid rgba(100, 200, 255, 0.2)', borderRadius: '12px', padding: '20px' }}>
              <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#64c8ff', marginBottom: '16px' }}>
                Transaction IDs (XID)
              </h3>
              
              <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '16px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '16px', color: '#a0c8ff', marginBottom: '16px' }}>
                <p style={{ color: '#fbbf24', marginBottom: '8px' }}>XID Properties:</p>
                <p>• 32-bit unsigned integer (0 to 4,294,967,295)</p>
                <p>• Assigned sequentially, monotonically increasing</p>
                <p>• Unique identifier untuk each transaction</p>
                <p>• Wraparound jika exceed max (every ~4 billion transactions)</p>
              </div>

              <div style={{ background: 'rgba(251, 191, 36, 0.1)', padding: '16px', borderRadius: '8px', borderLeft: '3px solid #fbbf24' }}>
                <p style={{ color: '#fbbf24', fontWeight: 'bold', marginBottom: '8px' }}>XMIN & XMAX</p>
                <ul style={{ color: '#a0c8ff', fontSize: '16px', marginLeft: '16px' }}>
                  <li>xmin = XID yang created row</li>
                  <li>xmax = XID yang deleted row (NULL jika tidak deleted)</li>
                  <li>Digunakan untuk MVCC visibility determination</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'mvcc-wal':
        return (
          <div style={{ animation: 'float-up 0.6s ease-out' }}>
            <div style={{ background: 'rgba(100, 200, 255, 0.08)', border: '1px solid rgba(100, 200, 255, 0.2)', borderRadius: '12px', padding: '20px' }}>
              <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#64c8ff', marginBottom: '16px' }}>
                MVCC & WAL Integration
              </h3>
              
              <p style={{ color: '#a0c8ff', fontSize: '17px', marginBottom: '16px' }}>
                MVCC (Multi-Version Concurrency Control) dan WAL bekerja together untuk provide consistency dan durability:
              </p>

              <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '16px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '16px', color: '#a0c8ff', marginBottom: '16px' }}>
                <p style={{ color: '#fbbf24', marginBottom: '8px' }}>Scenario: Transaction 1000 UPDATE row</p>
                <p>Old version: xmin=999, xmax=1000 ← marked for deletion</p>
                <p>New version: xmin=1000, xmax=NULL ← new data</p>
                <p style={{ marginTop: '8px', color: '#4ade80' }}>WAL record: [XID=1000, UPDATE, new_age=25]</p>
                <p style={{ color: '#4ade80' }}>Each transaction see consistent snapshot!</p>
              </div>

              <div style={{ background: 'rgba(74, 222, 128, 0.1)', padding: '16px', borderRadius: '8px', borderLeft: '3px solid #4ade80' }}>
                <p style={{ color: '#4ade80', fontWeight: 'bold', marginBottom: '8px' }}>Why WAL Essential untuk MVCC?</p>
                <ul style={{ color: '#a0c8ff', fontSize: '16px', marginLeft: '16px' }}>
                  <li>✓ Consistency: WAL guarantee all versions durable</li>
                  <li>✓ Atomicity: Multiple versions created atomically</li>
                  <li>✓ Isolation: Each transaction see consistent snapshot</li>
                  <li>✓ Durability: Recovery replay WAL, recreate versions</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'checkpoint':
        return (
          <div style={{ animation: 'float-up 0.6s ease-out' }}>
            <div style={{ background: 'rgba(100, 200, 255, 0.08)', border: '1px solid rgba(100, 200, 255, 0.2)', borderRadius: '12px', padding: '20px' }}>
              <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#64c8ff', marginBottom: '16px' }}>
                Checkpoint Mechanism
              </h3>
              
              <p style={{ color: '#a0c8ff', fontSize: '17px', marginBottom: '16px' }}>
                Checkpoint = moment untuk flush semua dirty pages to disk. Create stable recovery point.
              </p>

              <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '16px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '16px', color: '#a0c8ff', marginBottom: '16px', lineHeight: '1.8' }}>
                <p style={{ color: '#fbbf24', marginBottom: '8px' }}>Checkpoint trigger:</p>
                <p>Time interval: checkpoint_timeout (default 5 min)</p>
                <p>WAL size: max_wal_size (default 1 GB)</p>
                <p>Manual: CHECKPOINT command</p>
                <p style={{ marginTop: '12px', color: '#4ade80' }}>Execution:</p>
                <p>1. Log CHECKPOINT START</p>
                <p>2. Flush ALL dirty pages to disk</p>
                <p>3. Log CHECKPOINT END</p>
                <p>4. Update pg_control file</p>
              </div>

              <div style={{ background: 'rgba(251, 191, 36, 0.1)', padding: '16px', borderRadius: '8px', borderLeft: '3px solid #fbbf24' }}>
                <p style={{ color: '#fbbf24', fontWeight: 'bold', marginBottom: '8px' }}>Performance Impact:</p>
                <ul style={{ color: '#a0c8ff', fontSize: '16px', marginLeft: '16px' }}>
                  <li>⚠️ I/O spike: intensive disk I/O when flushing</li>
                  <li>⚠️ Latency: queries slower during checkpoint</li>
                  <li>🟢 Recovery faster: skip old WAL</li>
                  <li>🟢 Disk space: can archive old WAL</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'recovery':
        return (
          <div style={{ animation: 'float-up 0.6s ease-out' }}>
            <div style={{ background: 'rgba(100, 200, 255, 0.08)', border: '1px solid rgba(100, 200, 255, 0.2)', borderRadius: '12px', padding: '20px' }}>
              <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#64c8ff', marginBottom: '16px' }}>
                Crash Recovery
              </h3>
              
              <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '16px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '16px', color: '#a0c8ff', marginBottom: '16px', lineHeight: '1.8' }}>
                <p style={{ color: '#f87171', marginBottom: '8px' }}>Scenario: Server Crash</p>
                <p>Normal operation:</p>
                <p style={{ marginLeft: '20px', color: '#4ade80' }}>Transaction 1000: INSERT, WAL logged, data in memory</p>
                <p style={{ marginLeft: '20px', color: '#4ade80' }}>💥 POWER FAILURE!</p>
                <p style={{ marginLeft: '20px', color: '#f87171' }}>But WAL on disk = SAFE ✅</p>
                
                <p style={{ marginTop: '12px', color: '#4ade80', fontWeight: 'bold' }}>Recovery on Startup:</p>
                <p>1. Read pg_control: find last checkpoint LSN</p>
                <p>2. Read WAL from checkpoint to end</p>
                <p>3. REDO phase: replay all WAL records</p>
                <p>4. UNDO phase: rollback incomplete transactions</p>
                <p>5. Write new checkpoint: recovery complete</p>
                <p>6. Server ready untuk connections!</p>
              </div>

              <div style={{ background: 'rgba(74, 222, 128, 0.1)', padding: '16px', borderRadius: '8px', borderLeft: '3px solid #4ade80' }}>
                <p style={{ color: '#4ade80', fontWeight: 'bold', marginBottom: '8px' }}>Point-in-Time Recovery (PITR)</p>
                <p style={{ color: '#a0c8ff', fontSize: '16px' }}>
                  Recover database to specific point in time (not just crash):
                </p>
                <ul style={{ color: '#a0c8ff', fontSize: '16px', marginLeft: '16px', marginTop: '8px' }}>
                  <li>1. Restore base backup</li>
                  <li>2. Replay archived WAL files</li>
                  <li>3. Stop at target time</li>
                  <li>4. Database recovered to exact state!</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'replication':
        return (
          <div style={{ animation: 'float-up 0.6s ease-out' }}>
            <div style={{ background: 'rgba(100, 200, 255, 0.08)', border: '1px solid rgba(100, 200, 255, 0.2)', borderRadius: '12px', padding: '20px' }}>
              <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#64c8ff', marginBottom: '16px' }}>
                WAL Streaming Replication
              </h3>
              
              <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '16px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '16px', color: '#a0c8ff', marginBottom: '16px', lineHeight: '1.8' }}>
                <p style={{ color: '#fbbf24', marginBottom: '8px' }}>Architecture:</p>
                <p>PRIMARY SERVER:</p>
                <p style={{ marginLeft: '20px', color: '#4ade80' }}>Transactions → WAL Writer → pg_wal/</p>
                <p style={{ marginLeft: '20px', color: '#4ade80' }}>WAL SENDER → Stream to STANDBY</p>
                
                <p style={{ marginTop: '12px' }}>STANDBY SERVER:</p>
                <p style={{ marginLeft: '20px', color: '#4ade80' }}>WAL RECEIVER ← Receive WAL stream</p>
                <p style={{ marginLeft: '20px', color: '#4ade80' }}>RECOVERY PROCESS ← Replay WAL</p>
              </div>

              <div style={{ background: 'rgba(74, 222, 128, 0.1)', padding: '16px', borderRadius: '8px', borderLeft: '3px solid #4ade80' }}>
                <p style={{ color: '#4ade80', fontWeight: 'bold', marginBottom: '8px' }}>Synchronous vs Asynchronous</p>
                <ul style={{ color: '#a0c8ff', fontSize: '16px', marginLeft: '16px' }}>
                  <li><strong>Async (default):</strong> Commit immediately, STANDBY apply in background. Low latency, risk data loss.</li>
                  <li><strong>Sync:</strong> Commit wait untuk STANDBY ack. Zero data loss, slower.</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'monitoring':
        return (
          <div style={{ animation: 'float-up 0.6s ease-out' }}>
            <div style={{ background: 'rgba(100, 200, 255, 0.08)', border: '1px solid rgba(100, 200, 255, 0.2)', borderRadius: '12px', padding: '20px' }}>
              <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#64c8ff', marginBottom: '16px' }}>
                Monitoring WAL & Transaction Log
              </h3>
              
              <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '16px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '15px', color: '#a0c8ff', marginBottom: '16px' }}>
                <p style={{ color: '#4ade80', marginBottom: '8px' }}>Useful Queries:</p>
                <p>1. SELECT pg_current_wal_lsn();</p>
                <p style={{ marginTop: '8px' }}>2. du -sh $PGDATA/pg_wal/</p>
                <p style={{ marginTop: '8px' }}>3. SELECT * FROM pg_stat_bgwriter;</p>
                <p style={{ marginTop: '8px' }}>4. SELECT * FROM pg_stat_archiver;</p>
                <p style={{ marginTop: '8px' }}>5. SELECT * FROM pg_stat_replication;</p>
              </div>

              <div style={{ background: 'rgba(74, 222, 128, 0.1)', padding: '16px', borderRadius: '8px', borderLeft: '3px solid #4ade80' }}>
                <p style={{ color: '#4ade80', fontWeight: 'bold', marginBottom: '8px' }}>Health Checks:</p>
                <ul style={{ color: '#a0c8ff', fontSize: '16px', marginLeft: '16px' }}>
                  <li>🔍 WAL disk space (alert if 80%+ full)</li>
                  <li>🔍 Checkpoint frequency (alert if too frequent)</li>
                  <li>🔍 Replication lag (alert if behind threshold)</li>
                  <li>🔍 Archive queue (alert if queue &gt; 0)</li>
                  <li>🔍 Test PITR recovery regularly</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'waldump':
        return (
          <div style={{ animation: 'float-up 0.6s ease-out' }}>
            <div style={{ background: 'rgba(100, 200, 255, 0.08)', border: '1px solid rgba(100, 200, 255, 0.2)', borderRadius: '12px', padding: '20px' }}>
              <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#64c8ff', marginBottom: '8px' }}>
                pg_waldump — Membaca & Menganalisis WAL Records
              </h3>
              <p style={{ color: '#a0c8ff', fontSize: '17px', lineHeight: '1.8', marginBottom: '20px' }}>
                <code style={{ color: '#86efac', fontFamily: 'monospace' }}>pg_waldump</code> adalah tool bawaan PostgreSQL
                untuk membaca isi WAL file secara human-readable. Sangat berguna untuk debugging, forensik transaksi,
                dan memahami apa yang terjadi di database.
              </p>

              {/* Cara pakai */}
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '8px', marginBottom: '16px' }}>
                <p style={{ color: '#fbbf24', fontWeight: 'bold', fontSize: '16px', marginBottom: '10px' }}>🖥️ Cara Penggunaan</p>
                <pre style={{ color: '#a0c8ff', fontFamily: 'monospace', fontSize: '15px', overflow: 'auto', lineHeight: '2', margin: 0 }}>
{`# Baca WAL segment tertentu
pg_waldump $PGDATA/pg_wal/000000010000000000000001

# Dari LSN tertentu sampai LSN lain
pg_waldump --start=0/1F4CE80 --end=0/1F4FBE8 $PGDATA/pg_wal/000000010000000000000001

# Filter hanya transaksi tertentu
pg_waldump -x 765 $PGDATA/pg_wal/000000010000000000000001

# Filter resource manager tertentu (Heap, Btree, Transaction, dll)
pg_waldump -r Heap $PGDATA/pg_wal/000000010000000000000001

# Tampilkan statistik ringkasan saja
pg_waldump --stats $PGDATA/pg_wal/000000010000000000000001`}
                </pre>
              </div>

              {/* Anatomi satu record */}
              <div style={{ background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.2)', borderRadius: '8px', padding: '16px', marginBottom: '16px' }}>
                <p style={{ color: '#fbbf24', fontWeight: 'bold', fontSize: '16px', marginBottom: '12px' }}>🔍 Anatomi Satu WAL Record</p>
                <pre style={{ color: '#a0c8ff', fontFamily: 'monospace', fontSize: '15px', overflow: 'auto', lineHeight: '1.7', margin: 0 }}>
{`rmgr: Heap   len (rec/tot): 258/ 258, tx: 765,
  lsn: 0/01F4D030, prev 0/01F4CFA0,
  desc: INPLACE off: 3; inval msgs: catcache 57 ...`}
                </pre>
                <div style={{ marginTop: '14px', display: 'grid', gap: '6px' }}>
                  {[
                    { field: 'rmgr', color: '#64c8ff', val: 'Resource Manager — siapa yang menulis record ini (Heap, Btree, Transaction, XLOG, Standby, dll)' },
                    { field: 'len (rec/tot)', color: '#4ade80', val: 'Ukuran record: rec = data murni, tot = total termasuk header' },
                    { field: 'tx', color: '#fbbf24', val: 'Transaction ID (XID) yang menghasilkan record ini. tx: 0 = background process' },
                    { field: 'lsn', color: '#a78bfa', val: 'Log Sequence Number — posisi unik record ini dalam WAL stream' },
                    { field: 'prev', color: '#f87171', val: 'LSN record sebelumnya — membentuk linked list WAL records' },
                    { field: 'desc', color: '#38bdf8', val: 'Deskripsi aksi yang dilakukan beserta parameter spesifik' },
                  ].map((r, i) => (
                    <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <code style={{ color: r.color, fontFamily: 'monospace', fontSize: '15px', minWidth: '100px', flexShrink: 0 }}>{r.field}</code>
                      <p style={{ color: '#a0c8ff', fontSize: '15px', lineHeight: '1.6', margin: 0 }}>{r.val}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resource Managers */}
              <div style={{ background: 'rgba(167,139,250,0.08)', border: '1px solid rgba(167,139,250,0.2)', borderRadius: '8px', padding: '16px', marginBottom: '16px' }}>
                <p style={{ color: '#a78bfa', fontWeight: 'bold', fontSize: '16px', marginBottom: '12px' }}>📦 Resource Managers (rmgr) & Artinya</p>
                {[
                  { rmgr: 'Heap', color: '#4ade80', ops: 'INSERT, UPDATE, DELETE, HOT_UPDATE, INPLACE, MULTI_INSERT, INSERT+INIT', desc: 'Operasi baris data di tabel (heap pages)' },
                  { rmgr: 'Heap2', color: '#4ade80', ops: 'MULTI_INSERT, CLEAN, FREEZE_PAGE, VISIBLE', desc: 'Operasi heap lanjutan — vacuum, freeze, multi-insert' },
                  { rmgr: 'Btree', color: '#fbbf24', ops: 'INSERT_LEAF, DELETE, SPLIT, VACUUM', desc: 'Operasi pada B-Tree index (index paling umum)' },
                  { rmgr: 'Transaction', color: '#64c8ff', ops: 'COMMIT, ABORT, PREPARE, COMMIT_PREPARED', desc: 'Lifecycle transaksi — commit dengan timestamp & catcache invalidation' },
                  { rmgr: 'XLOG', color: '#f87171', ops: 'CHECKPOINT_REDO, CHECKPOINT_ONLINE, FPI, FPI_FOR_HINT', desc: 'Internal WAL: checkpoint events dan Full Page Images' },
                  { rmgr: 'Standby', color: '#38bdf8', ops: 'RUNNING_XACTS, INVALIDATIONS, HOT_STANDBY_FEEDBACK', desc: 'Info untuk standby/replica: daftar transaksi aktif, snapshot' },
                ].map((r, i) => (
                  <div key={i} style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '6px', padding: '10px 12px', marginBottom: '8px', borderLeft: `3px solid ${r.color}` }}>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'baseline', marginBottom: '4px' }}>
                      <code style={{ color: r.color, fontFamily: 'monospace', fontWeight: 'bold', fontSize: '16px' }}>{r.rmgr}</code>
                      <code style={{ color: '#708090', fontFamily: 'monospace', fontSize: '14px' }}>{r.ops}</code>
                    </div>
                    <p style={{ color: '#a0c8ff', fontSize: '15px', margin: 0 }}>{r.desc}</p>
                  </div>
                ))}
              </div>

              {/* Anotasi log dari screenshot */}
              <div style={{ background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.25)', borderRadius: '8px', padding: '16px', marginBottom: '16px' }}>
                <p style={{ color: '#4ade80', fontWeight: 'bold', fontSize: '16px', marginBottom: '12px' }}>🧪 Bedah Log Nyata — Urutan Kejadian tx: 765</p>
                {[
                  { lsn: '0/01F4CE80', rmgr: 'Btree INSERT_LEAF', color: '#fbbf24', explain: 'PostgreSQL insert entry ke B-Tree index (OID 2673) — ini adalah index update akibat INSERT data baru' },
                  { lsn: '0/01F4CEC8', rmgr: 'Btree INSERT_LEAF', color: '#fbbf24', explain: 'Update B-Tree index kedua (OID 2674) — tabel dengan 2 index, keduanya harus diupdate' },
                  { lsn: '0/01F4CF10', rmgr: 'Btree INSERT_LEAF', color: '#fbbf24', explain: 'Insert lagi ke OID 2673 (off: 112) — kemungkinan insert ke leaf page berbeda' },
                  { lsn: '0/01F4CF58', rmgr: 'Btree INSERT_LEAF', color: '#fbbf24', explain: 'Insert lagi ke OID 2674 (off: 126)' },
                  { lsn: '0/01F4CFA0', rmgr: 'XLOG FPI', color: '#f87171', explain: 'Full Page Image — PostgreSQL backup seluruh halaman ke WAL (terjadi pertama kali setelah checkpoint, untuk proteksi partial write)' },
                  { lsn: '0/01F4D030', rmgr: 'Heap INPLACE off:3', color: '#64c8ff', explain: 'Update in-place di system catalog (pg_class/pg_attribute) — invalidasi catcache 57 dan relcache 16394, 16395' },
                  { lsn: '0/01F4D138', rmgr: 'Heap INPLACE off:4', color: '#64c8ff', explain: 'Update in-place kedua di system catalog — metadata tabel diupdate' },
                  { lsn: '0/01F4D240', rmgr: 'Heap HOT_UPDATE', color: '#a78bfa', explain: 'HOT_UPDATE (Heap Only Tuple) — update row tanpa sentuh index karena kolom index tidak berubah. old_xmax: 765 menandai versi lama, new_off: 5 adalah lokasi versi baru' },
                  { lsn: '0/01F4D290', rmgr: 'Heap2 MULTI_INSERT', color: '#a78bfa', explain: 'Insert 1 tuple ke blok 3 (ntuples: 1) — bagian dari operasi yang sama' },
                  { lsn: '0/01F4D378', rmgr: 'Transaction COMMIT', color: '#4ade80', explain: 'COMMIT tx 765 pada 2026-04-21 10:54:50.048889 WIB. Panjang record 1093 byte karena membawa daftar invalidasi catcache/relcache yang panjang' },
                ].map((r, i) => (
                  <div key={i} style={{ display: 'flex', gap: '10px', marginBottom: '8px', alignItems: 'flex-start' }}>
                    <code style={{ color: '#708090', fontFamily: 'monospace', fontSize: '14px', minWidth: '100px', flexShrink: 0, paddingTop: '1px' }}>{r.lsn}</code>
                    <div>
                      <code style={{ color: r.color, fontFamily: 'monospace', fontSize: '15px', fontWeight: 'bold' }}>{r.rmgr}</code>
                      <p style={{ color: '#a0c8ff', fontSize: '15px', margin: '2px 0 0 0', lineHeight: '1.6' }}>{r.explain}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Checkpoint records */}
              <div style={{ background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.2)', borderRadius: '8px', padding: '16px', marginBottom: '16px' }}>
                <p style={{ color: '#38bdf8', fontWeight: 'bold', fontSize: '16px', marginBottom: '12px' }}>🏁 Checkpoint Records (tx: 0 — Background Process)</p>
                {[
                  { op: 'Standby RUNNING_XACTS', explain: 'Broadcast snapshot ke standby: nextXid 766, latestCompletedXid 765, oldestRunningXid 766. Diulang periodik agar replica tahu transaksi apa yang aktif' },
                  { op: 'XLOG CHECKPOINT_REDO', explain: 'Mencatat titik awal checkpoint — jika crash, recovery mulai REDO dari LSN ini' },
                  { op: 'XLOG FPI_FOR_HINT', explain: 'Full Page Image untuk hint bits — halaman yang perlu di-hint (visibility info) di-backup dulu sebelum dimodifikasi' },
                  { op: 'XLOG CHECKPOINT_ONLINE', explain: 'Checkpoint selesai. Parameter penting: redo 0/1F4FAE0, tli 1 (timeline), fpw true (full_page_writes aktif), wal_level replica' },
                ].map((r, i) => (
                  <div key={i} style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '6px', padding: '8px 12px', marginBottom: '8px' }}>
                    <code style={{ color: '#38bdf8', fontFamily: 'monospace', fontSize: '15px', fontWeight: 'bold' }}>{r.op}</code>
                    <p style={{ color: '#a0c8ff', fontSize: '15px', margin: '4px 0 0 0', lineHeight: '1.6' }}>{r.explain}</p>
                  </div>
                ))}
              </div>

              {/* Error WAL corrupt */}
              <div style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)', borderRadius: '8px', padding: '16px' }}>
                <p style={{ color: '#f87171', fontWeight: 'bold', fontSize: '16px', marginBottom: '10px' }}>⚠️ Error: invalid record length — Apa Artinya?</p>
                <pre style={{ background: 'rgba(0,0,0,0.3)', padding: '10px', borderRadius: '6px', fontFamily: 'monospace', fontSize: '15px', color: '#fca5a5', overflow: 'auto', marginBottom: '12px' }}>
{`pg_waldump: error in WAL record at 0/1F4FBB0:
  invalid record length at 0/1F4FBE8: expected at least 24, got 0`}
                </pre>
                <ul style={{ color: '#a0c8ff', fontSize: '16px', marginLeft: '16px', lineHeight: '2' }}>
                  <li>✓ <strong>Artinya:</strong> WAL record di LSN <code style={{ color: '#fbbf24', fontFamily: 'monospace' }}>0/1F4FBE8</code> hanya berisi 0 byte — WAL segment terpotong di sana</li>
                  <li>✓ <strong>Normal jika</strong> server masih running — WAL segment belum penuh, sisa halaman masih berisi nol</li>
                  <li>✓ <strong>Normal jika</strong> terjadi crash — WAL terakhir belum sempat di-flush ke disk sepenuhnya</li>
                  <li>✓ <strong>Perlu investigasi jika</strong> terjadi pada WAL yang seharusnya sudah complete (untuk archive/backup)</li>
                  <li>✓ <strong>Recovery PostgreSQL</strong> akan stop di LSN ini dan rollback transaksi yang belum commit — aman</li>
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
          <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '8px', color: '#e0f2ff', fontFamily: 'Segoe UI' }}>
            PostgreSQL Transaction Log 📝
          </h1>
          <p style={{ color: '#a0c8ff', fontSize: '20px' }}>
            Write-Ahead Logging (WAL), transaction IDs, MVCC, checkpoints, dan recovery konsep
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
                fontSize: '18px',
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
          📝 Transaction Log = Heart of PostgreSQL durability, consistency, dan reliability
        </p>
        <p style={{ color: '#708090', fontSize: '18px' }}>
          💡 Key insight: WAL guarantee ACID properties, recovery, replication - semua via clever logging! 🚀
        </p>
      </footer>
    </div>
  );
};

export default PostgreSQLTransactionLog;