import React, { useState, useEffect } from 'react';
import { ChevronDown, Lock, Play, Pause, RotateCcw, AlertCircle, Info } from 'lucide-react';

const AnimatedLockACIDModule = () => {
  const [activeTab, setActiveTab] = useState('acid');
  const [expandedSection, setExpandedSection] = useState('atomicity');
  const [isPlaying, setIsPlaying] = useState(true);
  const [lockDemoState, setLockDemoState] = useState(0);
  const [isolationDemoState, setIsolationDemoState] = useState(0);
  const [deadlockDemoState, setDeadlockDemoState] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      if (activeTab === 'acid') return;
      if (activeTab === 'locks') setLockDemoState(prev => (prev + 1) % 7);
      else if (activeTab === 'isolation') setIsolationDemoState(prev => (prev + 1) % 6);
      else if (activeTab === 'deadlock') setDeadlockDemoState(prev => (prev + 1) % 5);
    }, 2000);
    return () => clearInterval(timer);
  }, [isPlaying, activeTab]);

  const animationStyles = `
    @keyframes float-up {
      0% { transform: translateY(20px); opacity: 0; }
      100% { transform: translateY(0); opacity: 1; }
    }
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    @keyframes scale-pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
    }
    .animate-float { animation: float-up 0.6s ease-out; }
    .animate-bounce { animation: bounce 1s ease-in-out infinite; }
    .animate-scale { animation: scale-pulse 2s ease-in-out infinite; }
  `;

  // ── Data ───────────────────────────────────────────────────────────────────

  const acidData = [
    {
      id: 'atomicity',
      title: 'Atomicity (Atomisitas)',
      subtitle: 'Semua atau Tidak Sama Sekali',
      description: 'Properti ini menjamin bahwa transaksi adalah sebuah unit kerja yang tidak dapat dibagi (atomic). Transaksi harus selesai sepenuhnya atau tidak sama sekali. Tidak boleh ada kondisi setengah jadi.',
      example: 'Transfer uang dari rekening A ke B: jika mengurangi saldo A berhasil tetapi menambah B gagal, maka sistem harus membatalkan pengurangan A (ROLLBACK).',
      steps: [
        { step: 1, action: 'Kurangi saldo A', ok: true,  note: 'A: 9.000.000' },
        { step: 2, action: 'Tambah saldo B',  ok: false, note: 'B: masih 5.000.000' },
        { step: 3, action: 'ROLLBACK ke awal',ok: true,  note: 'A: 10.000.000' },
      ],
    },
    {
      id: 'consistency',
      title: 'Consistency (Konsistensi)',
      subtitle: 'Data Selalu Konsisten',
      description: 'Konsistensi memastikan bahwa database bergerak dari satu state yang valid ke state valid lainnya. Semua rule bisnis dan constraint harus terpenuhi sebelum dan sesudah transaksi.',
      example: 'Jika ada constraint "saldo tidak boleh negatif", database tidak akan pernah membiarkan saldo menjadi negatif, bahkan di tengah-tengah proses transaksi.',
      rules: [
        'Total debit = Total kredit di setiap saat',
        'Saldo tidak boleh negatif',
        'Foreign key harus valid',
      ],
    },
    {
      id: 'isolation',
      title: 'Isolation (Isolasi)',
      subtitle: 'Transaksi Berjalan Independen',
      description: 'Properti isolasi memastikan transaksi satu tidak mengganggu transaksi lain. Setiap transaksi berjalan seolah-olah berjalan sendiri tanpa transaksi lain yang berjalan bersamaan.',
      example: 'Ketika Anda melakukan transfer, transaksi lain tidak akan melihat saldo setengah jadi atau data yang belum konsisten dari transaksi Anda yang sedang berjalan.',
      timeline: [
        { id: 'T1', time: '10:00:00', action: 'Cek saldo',      sees: 'Rp 10.000.000' },
        { id: 'T2', time: '10:00:05', action: 'Transfer keluar', sees: 'Rp 5.000.000' },
        { id: 'T1', time: '10:00:10', action: 'Cek saldo lagi', sees: 'Rp 5.000.000 (BUKAN 10M)' },
      ],
    },
    {
      id: 'durability',
      title: 'Durability (Durabilitas)',
      subtitle: 'Data Bersifat Permanen',
      description: 'Data yang telah di-commit (diselesaikan) harus bersifat permanen dan tidak akan hilang meski terjadi bencana seperti mati listrik, crash sistem, atau error hardware.',
      example: 'Setelah sistem mengkonfirmasi transfer Anda berhasil, data itu sudah tersimpan dengan aman. Bahkan jika server dimatikan, data tetap aman ketika server dinyalakan kembali.',
      storage: [
        { level: 'RAM (Memory)',       status: 'Volatile', desc: 'Hilang jika mati listrik' },
        { level: 'WAL (Write-Ahead Log)', status: 'Durable', desc: 'Disimpan ke disk sebelum commit' },
        { level: 'Disk Permanen',      status: 'Durable', desc: 'Backup dan archival' },
      ],
    },
  ];

  const lockTypes = [
    {
      id: 'shared',
      icon: '🔓',
      title: 'Shared Lock (Kunci Bersama)',
      notation: 'S-Lock / Read Lock',
      description: 'Memungkinkan banyak transaksi membaca data yang sama secara bersamaan. Digunakan saat transaksi hanya membaca, tidak mengubah data.',
      advantages: ['Tingkat konkurensi tinggi', 'Banyak pembaca bisa akses sama waktu'],
      disadvantages: ['Tidak bisa menulis saat ada shared lock'],
      example: 'SELECT statement — bisa dibaca bersama-sama tanpa masalah',
    },
    {
      id: 'exclusive',
      icon: '🔒',
      title: 'Exclusive Lock (Kunci Eksklusif)',
      notation: 'X-Lock / Write Lock',
      description: 'Transaksi mendapat akses eksklusif ke data. Tidak ada transaksi lain yang bisa membaca atau menulis data tersebut saat locked.',
      advantages: ['Keamanan data terjamin', 'Tidak ada race condition'],
      disadvantages: ['Tingkat konkurensi rendah', 'Potensi deadlock lebih tinggi'],
      example: 'UPDATE, DELETE, INSERT — harus eksklusif untuk keamanan',
    },
    {
      id: 'intent',
      icon: '📌',
      title: 'Intent Lock (Kunci Niat)',
      notation: 'IS-Lock / IX-Lock',
      description: 'Digunakan pada level hierarchi lebih tinggi (tabel) untuk menunjukkan niat mengunci pada level yang lebih rendah (baris). Membantu menghindari deadlock.',
      advantages: ['Mencegah deadlock', 'Efisiensi lock di level hierarchi'],
      disadvantages: ['Lebih kompleks untuk dipahami'],
      example: 'Sebelum lock baris, kunci tabel dulu dengan intent lock',
    },
  ];

  const lockTimeline = [
    { time: '10:00:00', event: 'Transaksi T1 mulai',       detail: 'BEGIN TRANSACTION' },
    { time: '10:00:05', event: 'T1 membaca data X',         detail: 'Acquire SHARED LOCK pada X' },
    { time: '10:00:10', event: 'Transaksi T2 mulai',        detail: 'BEGIN TRANSACTION' },
    { time: '10:00:15', event: 'T2 mencoba ubah data X',    detail: 'Minta EXCLUSIVE LOCK → MENUNGGU (T1 masih hold shared lock)' },
    { time: '10:00:20', event: 'T1 commit',                 detail: 'SHARED LOCK dilepas' },
    { time: '10:00:25', event: 'T2 mendapat lock',          detail: 'Sekarang T2 bisa ubah data X dengan EXCLUSIVE LOCK' },
    { time: '10:00:30', event: 'T2 commit',                 detail: 'EXCLUSIVE LOCK dilepas, data disimpan' },
  ];

  const isolationLevels = [
    {
      level: 'Read Uncommitted',
      protection: 'Minimal',
      protectionColor: '#f87171',
      dirty: false, nonRepeatable: false, phantom: false,
      description: 'Transaksi bisa membaca data yang belum di-commit oleh transaksi lain (Dirty Read). Tingkat isolasi paling rendah.',
      useCase: 'Data tidak kritis, perlu performa tinggi',
    },
    {
      level: 'Read Committed',
      protection: 'Rendah-Sedang',
      protectionColor: '#fbbf24',
      dirty: true, nonRepeatable: false, phantom: false,
      description: 'Hanya membaca data yang sudah di-commit. Mencegah Dirty Read tapi rentan Non-Repeatable Read dan Phantom Read.',
      useCase: 'Kebanyakan aplikasi web dan bisnis standar (default PostgreSQL)',
    },
    {
      level: 'Repeatable Read',
      protection: 'Sedang-Tinggi',
      protectionColor: '#64c8ff',
      dirty: true, nonRepeatable: true, phantom: false,
      description: 'Transaksi tidak melihat perubahan dari transaksi lain yang sedang berjalan. Mencegah Dirty Read dan Non-Repeatable Read.',
      useCase: 'Aplikasi perbankan, e-commerce',
    },
    {
      level: 'Serializable',
      protection: 'Maksimal',
      protectionColor: '#4ade80',
      dirty: true, nonRepeatable: true, phantom: true,
      description: 'Tingkat isolasi tertinggi. Transaksi sepenuhnya terisolasi seolah-olah berjalan secara serial satu per satu.',
      useCase: 'Data sangat kritis, tidak keberatan performa lambat',
    },
  ];

  const deadlockScenario = [
    { time: '10:00:00', tx: 'T1',    action: 'Lock Table A',       status: '✅ Berhasil',       ok: 'green' },
    { time: '10:00:05', tx: 'T2',    action: 'Lock Table B',       status: '✅ Berhasil',       ok: 'green' },
    { time: '10:00:10', tx: 'T1',    action: 'Coba Lock Table B',  status: '⏳ Menunggu T2...', ok: 'yellow' },
    { time: '10:00:15', tx: 'T2',    action: 'Coba Lock Table A',  status: '⏳ Menunggu T1...', ok: 'yellow' },
    { time: '10:00:20', tx: 'Sistem',action: 'Deteksi DEADLOCK!',  status: '🚨 Rollback T2',    ok: 'red' },
  ];

  const strategies = [
    { title: 'Konsistensi Urutan',  desc: 'Selalu lock resources dalam urutan yang sama di semua transaksi' },
    { title: 'Timeout',             desc: 'Set timeout untuk operasi yang terlalu lama menunggu lock' },
    { title: 'Lock Granularity',    desc: 'Gunakan lock di level terkecil yang mungkin (row bukan table)' },
    { title: 'Minimalisir Durasi',  desc: 'Kurangi waktu transaksi memegang lock' },
    { title: 'Deadlock Detection',  desc: 'Sistem otomatis deteksi dan rollback salah satu transaksi' },
    { title: 'MVCC',                desc: 'Gunakan MVCC (Multi-Version Concurrency Control) jika tersedia' },
  ];

  // ── SVG Animations ─────────────────────────────────────────────────────────

  const AtomicityAnimation = () => (
    <svg viewBox="0 0 400 300" style={{ width: '100%', height: '300px', background: 'rgba(100,200,255,0.05)', borderRadius: '10px' }}>
      <style>{animationStyles}</style>
      <text x="200" y="28" textAnchor="middle" fill="#e0f2ff" fontSize="16" fontWeight="bold">Atomicity: Transfer Dana</text>
      <g>
        <rect x="30" y="60" width="120" height="75" fill="rgba(100,200,255,0.2)" stroke="#64c8ff" strokeWidth="2" rx="8" />
        <text x="90" y="85" textAnchor="middle" fill="#64c8ff" fontSize="13" fontWeight="bold">Akun A</text>
        <text x="90" y="120" textAnchor="middle" fill="#a0c8ff" fontSize="18" fontWeight="bold">Rp 10M</text>
      </g>
      <g>
        <rect x="250" y="60" width="120" height="75" fill="rgba(100,200,255,0.2)" stroke="#64c8ff" strokeWidth="2" rx="8" />
        <text x="310" y="85" textAnchor="middle" fill="#64c8ff" fontSize="13" fontWeight="bold">Akun B</text>
        <text x="310" y="120" textAnchor="middle" fill="#a0c8ff" fontSize="18" fontWeight="bold">Rp 5M</text>
      </g>
      <g>
        <defs>
          <marker id="arrowAcid" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <polygon points="0 0,10 3,0 6" fill="#fbbf24" />
          </marker>
        </defs>
        <line x1="150" y1="97" x2="250" y2="97" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrowAcid)" />
        <text x="200" y="85" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">- Rp 1M</text>
        <text x="200" y="113" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">+ Rp 1M</text>
      </g>
      <g>
        <rect x="40" y="175" width="320" height="100" fill="rgba(0,0,0,0.3)" rx="8" />
        <text x="200" y="198" textAnchor="middle" fill="#e0f2ff" fontSize="12" fontWeight="bold">Status Transaksi:</text>
        <text x="60" y="222" fill="#4ade80" fontSize="11">① Kurangi A → ✅ sukses (A: 9M)</text>
        <text x="60" y="242" fill="#f87171" fontSize="11">② Tambah B  → ❌ gagal  (B: masih 5M)</text>
        <text x="60" y="262" fill="#fbbf24" fontSize="11">③ ROLLBACK  → ✅ A kembali 10M</text>
      </g>
    </svg>
  );

  const ConsistencyAnimation = () => (
    <svg viewBox="0 0 400 280" style={{ width: '100%', height: '280px', background: 'rgba(100,200,255,0.05)', borderRadius: '10px' }}>
      <style>{animationStyles}</style>
      <text x="200" y="28" textAnchor="middle" fill="#e0f2ff" fontSize="16" fontWeight="bold">Consistency: Validasi Constraint</text>
      <g>
        <text x="100" y="65" textAnchor="middle" fill="#64c8ff" fontSize="13" fontWeight="bold">SEBELUM</text>
        <circle cx="100" cy="115" r="42" fill="rgba(74,222,128,0.2)" stroke="#4ade80" strokeWidth="2" />
        <text x="100" y="123" textAnchor="middle" fill="#4ade80" fontSize="22" fontWeight="bold">✓</text>
        <text x="100" y="172" textAnchor="middle" fill="#a0c8ff" fontSize="11">Valid State</text>
      </g>
      <g>
        <line x1="143" y1="115" x2="257" y2="115" stroke="#64c8ff" strokeWidth="2" />
        <polygon points="257,115 247,110 247,120" fill="#64c8ff" />
        <text x="200" y="108" textAnchor="middle" fill="#fbbf24" fontSize="10">Transaksi</text>
      </g>
      <g>
        <text x="300" y="65" textAnchor="middle" fill="#64c8ff" fontSize="13" fontWeight="bold">SESUDAH</text>
        <circle cx="300" cy="115" r="42" fill="rgba(74,222,128,0.2)" stroke="#4ade80" strokeWidth="2" />
        <text x="300" y="123" textAnchor="middle" fill="#4ade80" fontSize="22" fontWeight="bold">✓</text>
        <text x="300" y="172" textAnchor="middle" fill="#a0c8ff" fontSize="11">Valid State</text>
      </g>
      <g>
        <rect x="30" y="195" width="340" height="68" fill="rgba(100,200,255,0.08)" stroke="rgba(100,200,255,0.25)" rx="8" />
        <text x="48" y="216" fill="#4ade80" fontSize="11">✓ Total debit = Total kredit di setiap saat</text>
        <text x="48" y="234" fill="#4ade80" fontSize="11">✓ Saldo tidak boleh negatif</text>
        <text x="48" y="252" fill="#4ade80" fontSize="11">✓ Foreign key harus valid</text>
      </g>
    </svg>
  );

  const IsolationAnimation = () => {
    const getOpacity = (i) => Math.abs(isolationDemoState - i) <= 1 ? 1 : 0.3;
    return (
      <svg viewBox="0 0 400 300" style={{ width: '100%', height: '300px', background: 'rgba(100,200,255,0.05)', borderRadius: '10px' }}>
        <style>{animationStyles}</style>
        <text x="200" y="28" textAnchor="middle" fill="#e0f2ff" fontSize="16" fontWeight="bold">Isolation: Transaksi Terpisah</text>
        <g opacity={getOpacity(0)}>
          <rect x="15" y="50" width="165" height="95" fill="rgba(167,139,250,0.12)" stroke="#a78bfa" strokeWidth="2" rx="8" />
          <text x="97" y="74" textAnchor="middle" fill="#a78bfa" fontSize="13" fontWeight="bold">Transaksi T1</text>
          <rect x="28" y="84" width="138" height="26" fill="rgba(167,139,250,0.3)" rx="4" />
          <text x="97" y="102" textAnchor="middle" fill="#d0e8ff" fontSize="11">SELECT saldo = Rp 10M</text>
          <rect x="28" y="118" width="138" height="22" fill="rgba(100,200,255,0.2)" rx="4" />
          <text x="97" y="134" textAnchor="middle" fill="#a0c8ff" fontSize="10">(Sedang berjalan...)</text>
        </g>
        <g opacity={getOpacity(1)}>
          <rect x="220" y="50" width="165" height="95" fill="rgba(167,139,250,0.12)" stroke="#a78bfa" strokeWidth="2" rx="8" />
          <text x="302" y="74" textAnchor="middle" fill="#a78bfa" fontSize="13" fontWeight="bold">Transaksi T2</text>
          <rect x="233" y="84" width="138" height="26" fill="rgba(248,113,113,0.3)" rx="4" />
          <text x="302" y="102" textAnchor="middle" fill="#f87171" fontSize="11">UPDATE -Rp 5M</text>
          <rect x="233" y="118" width="138" height="22" fill="rgba(100,200,255,0.2)" rx="4" />
          <text x="302" y="134" textAnchor="middle" fill="#a0c8ff" fontSize="10">(Sedang berjalan...)</text>
        </g>
        <g>
          <line x1="40" y1="200" x2="360" y2="200" stroke="rgba(100,200,255,0.3)" strokeWidth="2" />
          {[0,1,2,3,4,5].map(i => (
            <g key={i}>
              <circle cx={40 + i * 56} cy="200" r="4" fill={isolationDemoState === i ? '#64c8ff' : 'rgba(100,200,255,0.3)'} />
              <text x={40 + i * 56} y="220" textAnchor="middle" fill="#708090" fontSize="9">
                {['T1:Read','T2:Write','T1:Read','T2:Done','T1:Still','Isolated'][i]}
              </text>
            </g>
          ))}
        </g>
        <g>
          <rect x="30" y="240" width="340" height="40" fill="rgba(74,222,128,0.08)" stroke="rgba(74,222,128,0.3)" rx="8" />
          <text x="200" y="265" textAnchor="middle" fill="#4ade80" fontSize="12" fontWeight="bold">
            ✓ T1 tidak melihat perubahan T2 yang sedang berjalan
          </text>
        </g>
      </svg>
    );
  };

  const DurabilityAnimation = () => (
    <svg viewBox="0 0 400 270" style={{ width: '100%', height: '270px', background: 'rgba(100,200,255,0.05)', borderRadius: '10px' }}>
      <style>{animationStyles}</style>
      <text x="200" y="28" textAnchor="middle" fill="#e0f2ff" fontSize="16" fontWeight="bold">Durability: Penyimpanan Bertingkat</text>
      <g>
        <rect x="20" y="55" width="105" height="60" fill="rgba(248,113,113,0.2)" stroke="#f87171" strokeWidth="2" rx="6" />
        <text x="72" y="76" textAnchor="middle" fill="#f87171" fontSize="12" fontWeight="bold">RAM</text>
        <text x="72" y="94" textAnchor="middle" fill="#fca5a5" fontSize="10">Volatile</text>
        <text x="72" y="108" textAnchor="middle" fill="#fca5a5" fontSize="9">⚡ Cepat, hilang jika mati</text>
      </g>
      <g>
        <rect x="148" y="55" width="105" height="60" fill="rgba(251,191,36,0.2)" stroke="#fbbf24" strokeWidth="2" rx="6" />
        <text x="200" y="76" textAnchor="middle" fill="#fbbf24" fontSize="12" fontWeight="bold">WAL Log</text>
        <text x="200" y="94" textAnchor="middle" fill="#fde047" fontSize="10">Durable</text>
        <text x="200" y="108" textAnchor="middle" fill="#fde047" fontSize="9">💾 Disimpan sebelum commit</text>
      </g>
      <g>
        <rect x="275" y="55" width="105" height="60" fill="rgba(74,222,128,0.2)" stroke="#4ade80" strokeWidth="2" rx="6" />
        <text x="327" y="76" textAnchor="middle" fill="#4ade80" fontSize="12" fontWeight="bold">Disk</text>
        <text x="327" y="94" textAnchor="middle" fill="#86efac" fontSize="10">Durable</text>
        <text x="327" y="108" textAnchor="middle" fill="#86efac" fontSize="9">🔒 Permanen & aman</text>
      </g>
      <g stroke="rgba(100,200,255,0.5)" strokeWidth="2" fill="none">
        <path d="M 125 85 L 148 85" />
        <path d="M 253 85 L 275 85" />
      </g>
      <g>
        <rect x="20" y="150" width="360" height="95" fill="rgba(100,200,255,0.08)" rx="8" />
        <text x="38" y="172" fill="#64c8ff" fontSize="12" fontWeight="bold">Data setelah COMMIT:</text>
        <text x="38" y="192" fill="#a0c8ff" fontSize="11">① Ditulis ke WAL — segera persisten ke disk sebelum reply ke client</text>
        <text x="38" y="210" fill="#a0c8ff" fontSize="11">② Buffer cache diupdate — data tersedia di RAM untuk query berikut</text>
        <text x="38" y="228" fill="#a0c8ff" fontSize="11">③ Aman dari crash, power loss, atau hardware failure</text>
      </g>
    </svg>
  );

  const LockMechanismAnimation = () => (
    <svg viewBox="0 0 500 360" style={{ width: '100%', height: '360px', background: 'rgba(100,200,255,0.05)', borderRadius: '10px' }}>
      <style>{animationStyles}</style>
      <text x="250" y="28" textAnchor="middle" fill="#e0f2ff" fontSize="16" fontWeight="bold">Lock Mechanism: Shared vs Exclusive</text>
      <g>
        <text x="125" y="62" textAnchor="middle" fill="#64c8ff" fontSize="13" fontWeight="bold">Shared Lock (READ)</text>
        {[70,125,180].map((cx, i) => (
          <g key={i}>
            <circle cx={cx} cy="120" r="28" fill="rgba(100,200,255,0.2)" stroke="#64c8ff" strokeWidth="2" />
            <text x={cx} y="128" textAnchor="middle" fill="#64c8ff" fontSize="11" fontWeight="bold">T{i+1}</text>
          </g>
        ))}
        <rect x="28" y="166" width="195" height="48" fill="rgba(100,200,255,0.1)" stroke="#64c8ff" strokeWidth="1.5" rx="6" />
        <text x="125" y="189" textAnchor="middle" fill="#a0c8ff" fontSize="12">🔓 Multiple readers OK</text>
        <text x="125" y="205" textAnchor="middle" fill="#a0c8ff" fontSize="11">SELECT bisa bersama-sama</text>
      </g>
      <g>
        <text x="375" y="62" textAnchor="middle" fill="#f87171" fontSize="13" fontWeight="bold">Exclusive Lock (WRITE)</text>
        <circle cx="320" cy="120" r="28" fill="rgba(248,113,113,0.3)" stroke="#f87171" strokeWidth="2" />
        <text x="320" y="128" textAnchor="middle" fill="#f87171" fontSize="11" fontWeight="bold">T1</text>
        {[375,430].map((cx, i) => (
          <g key={i}>
            <circle cx={cx} cy="120" r="28" fill="rgba(100,100,100,0.3)" stroke="#808080" strokeWidth="2" />
            <text x={cx} y="128" textAnchor="middle" fill="#a0a0a0" fontSize="10" fontWeight="bold">T{i+2}⏳</text>
          </g>
        ))}
        <rect x="278" y="166" width="195" height="48" fill="rgba(248,113,113,0.1)" stroke="#f87171" strokeWidth="1.5" rx="6" />
        <text x="375" y="189" textAnchor="middle" fill="#fca5a5" fontSize="12">🔒 Exclusive access</text>
        <text x="375" y="205" textAnchor="middle" fill="#fca5a5" fontSize="11">UPDATE/DELETE hanya T1</text>
      </g>
      <line x1="50" y1="260" x2="450" y2="260" stroke="rgba(100,200,255,0.3)" strokeWidth="2" />
      {[0,1,2,3,4,5,6].map(i => (
        <circle key={i} cx={50 + i * 58} cy="260" r="5"
          fill={lockDemoState === i ? '#64c8ff' : 'rgba(100,200,255,0.2)'} />
      ))}
      <rect x="28" y="285" width="444" height="50" fill="rgba(100,200,255,0.08)" rx="8" />
      <text x="48" y="315" fill="#a0c8ff" fontSize="12" fontWeight="bold">
        {lockDemoState === 0 && '① T1 mengambil Shared Lock pada data X'}
        {lockDemoState === 1 && '② T2, T3 juga mengambil Shared Lock (boleh)'}
        {lockDemoState === 2 && '③ T1 selesai, melepas Shared Lock'}
        {lockDemoState === 3 && '④ T1 akan UPDATE → meminta Exclusive Lock'}
        {lockDemoState === 4 && '④ T1 akan UPDATE → meminta Exclusive Lock'}
        {lockDemoState === 5 && '⑤ T1 mendapat Exclusive Lock, T2/T3 menunggu'}
        {lockDemoState === 6 && '⑥ T1 selesai, Exclusive Lock dilepas'}
      </text>
    </svg>
  );

  const DeadlockAnimation = () => {
    const op = (step) => deadlockDemoState >= step ? 1 : 0.3;
    return (
      <svg viewBox="0 0 450 380" style={{ width: '100%', height: '380px', background: 'rgba(100,200,255,0.05)', borderRadius: '10px' }}>
        <style>{animationStyles}</style>
        <text x="225" y="28" textAnchor="middle" fill="#e0f2ff" fontSize="16" fontWeight="bold">Deadlock: Saling Tunggu</text>
        {[{x:30,label:'TABLE A',by:'T1'},{x:270,label:'TABLE B',by:'T2'}].map((t,i) => (
          <g key={i} opacity={op(0)}>
            <rect x={t.x} y="60" width="150" height="75" fill="rgba(100,200,255,0.12)" stroke="#64c8ff" strokeWidth="2" rx="8" />
            <text x={t.x+75} y="96" textAnchor="middle" fill="#64c8ff" fontSize="13" fontWeight="bold">{t.label}</text>
            <text x={t.x+75} y="118" textAnchor="middle" fill="#a0c8ff" fontSize="11">(Locked by {t.by})</text>
          </g>
        ))}
        {[{cx:80,label:'T1'},{cx:370,label:'T2'}].map((t,i) => (
          <g key={i} opacity={op(1)}>
            <circle cx={t.cx} cy="240" r="38" fill="rgba(167,139,250,0.2)" stroke="#a78bfa" strokeWidth="2" />
            <text x={t.cx} y="248" textAnchor="middle" fill="#a78bfa" fontSize="14" fontWeight="bold">{t.label}</text>
          </g>
        ))}
        <g opacity={op(2)}>
          <path d="M 138 248 Q 195 210 270 135" stroke="#fbbf24" strokeWidth="2" fill="none" strokeDasharray="5,5" />
          <text x="195" y="205" fill="#fbbf24" fontSize="11" fontWeight="bold">Minta B</text>
        </g>
        <g opacity={op(3)}>
          <path d="M 312 248 Q 245 210 180 135" stroke="#f87171" strokeWidth="2" fill="none" strokeDasharray="5,5" />
          <text x="248" y="205" fill="#f87171" fontSize="11" fontWeight="bold">Minta A</text>
        </g>
        <g opacity={op(4)}>
          <rect x="38" y="315" width="375" height="48" fill="rgba(248,113,113,0.12)" stroke="#f87171" strokeWidth="2" rx="8" />
          <text x="225" y="338" textAnchor="middle" fill="#f87171" fontSize="14" fontWeight="bold">💥 DEADLOCK DETECTED!</text>
          <text x="225" y="354" textAnchor="middle" fill="#fca5a5" fontSize="11">Sistem rollback T2 untuk membebaskan lock</text>
        </g>
      </svg>
    );
  };

  const IsolationComparisonChart = () => (
    <svg viewBox="0 0 500 320" style={{ width: '100%', height: '320px', background: 'rgba(100,200,255,0.05)', borderRadius: '10px' }}>
      <style>{animationStyles}</style>
      <text x="250" y="28" textAnchor="middle" fill="#e0f2ff" fontSize="16" fontWeight="bold">Isolation Levels: Keamanan vs Performa</text>
      <text x="28" y="55" fill="#708090" fontSize="11">▲ Keamanan</text>
      <text x="28" y="290" fill="#708090" fontSize="11">▼ Performa</text>
      <line x1="50" y1="60" x2="50" y2="280" stroke="rgba(100,200,255,0.3)" strokeWidth="2" />
      <line x1="50" y1="280" x2="470" y2="280" stroke="rgba(100,200,255,0.3)" strokeWidth="2" />
      {[
        {cx:100,cy:240,r:28,fill:'rgba(248,113,113,0.3)',stroke:'#f87171',label1:'Read',label2:'Uncommitted'},
        {cx:185,cy:190,r:28,fill:'rgba(251,191,36,0.3)',stroke:'#fbbf24',label1:'Read',label2:'Committed'},
        {cx:290,cy:135,r:28,fill:'rgba(100,200,255,0.3)',stroke:'#64c8ff',label1:'Repeatable',label2:'Read'},
        {cx:390,cy:80, r:28,fill:'rgba(74,222,128,0.3)', stroke:'#4ade80',label1:'Serial',label2:'izable'},
      ].map((c,i) => (
        <g key={i} opacity="0.9">
          <circle cx={c.cx} cy={c.cy} r={c.r} fill={c.fill} stroke={c.stroke} strokeWidth="2" />
          <text x={c.cx} y={c.cy + c.r + 14} textAnchor="middle" fill="#a0c8ff" fontSize="10">{c.label1}</text>
          <text x={c.cx} y={c.cy + c.r + 26} textAnchor="middle" fill="#a0c8ff" fontSize="10">{c.label2}</text>
        </g>
      ))}
      <text x="50" y="308" fill="#708090" fontSize="10">← Lebih cepat</text>
      <text x="390" y="308" fill="#708090" fontSize="10">Lebih aman →</text>
    </svg>
  );

  // ── Shared styles ──────────────────────────────────────────────────────────

  const card = (extra = {}) => ({
    background: 'rgba(100,200,255,0.08)',
    border: '1px solid rgba(100,200,255,0.2)',
    borderRadius: '12px',
    padding: '20px',
    ...extra,
  });

  const infoBox = {
    background: 'rgba(100,200,255,0.05)',
    border: '1px solid rgba(100,200,255,0.2)',
    borderRadius: '12px',
    padding: '18px',
  };

  const tabs = [
    { id: 'acid',      label: '⚛️ ACID Properties' },
    { id: 'locks',     label: '🔐 Lock Mechanisms' },
    { id: 'isolation', label: '🛡️ Isolation Levels' },
    { id: 'deadlock',  label: '💥 Deadlock' },
  ];

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f1419 0%, #1a2332 100%)' }}>
      <style>{animationStyles}</style>

      {/* Header */}
      <header style={{ borderBottom: '1px solid rgba(100,200,255,0.2)', background: 'rgba(15,20,25,0.8)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Lock size={32} style={{ color: '#64c8ff', flexShrink: 0 }} />
            <div>
              <h1 style={{ color: '#e0f2ff', fontSize: '28px', fontWeight: 'bold', margin: 0 }}>
                Lock & ACID dalam RDBMS 🎬
              </h1>
              <p style={{ color: '#a0c8ff', fontSize: '15px', margin: '4px 0 0' }}>
                Penjelasan lengkap + visualisasi interaktif konsep fundamental database
              </p>
            </div>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' }}>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: '4px', marginBottom: '28px', borderBottom: '1px solid rgba(100,200,255,0.2)', overflowX: 'auto' }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '10px 20px', background: 'none', border: 'none',
                borderBottom: activeTab === tab.id ? '3px solid #64c8ff' : '3px solid transparent',
                color: activeTab === tab.id ? '#64c8ff' : '#708090',
                fontWeight: '500', fontSize: '14px', cursor: 'pointer',
                whiteSpace: 'nowrap', transition: 'color 0.2s', marginBottom: '-1px',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Animation control bar — only for non-acid tabs */}
        {activeTab !== 'acid' && (
          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', padding: '12px 16px', background: 'rgba(100,200,255,0.06)', border: '1px solid rgba(100,200,255,0.15)', borderRadius: '10px' }}>
            <button
              onClick={() => setIsPlaying(p => !p)}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 14px',
                borderRadius: '6px', border: 'none', cursor: 'pointer', fontWeight: '600', fontSize: '13px',
                background: isPlaying ? '#64c8ff' : 'rgba(100,200,255,0.2)',
                color: isPlaying ? '#0f1419' : '#64c8ff',
              }}
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} />}
              {isPlaying ? 'Pause' : 'Play'}
            </button>
            <button
              onClick={() => { setLockDemoState(0); setIsolationDemoState(0); setDeadlockDemoState(0); }}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 14px',
                borderRadius: '6px', border: 'none', cursor: 'pointer', fontWeight: '600', fontSize: '13px',
                background: 'rgba(100,200,255,0.15)', color: '#64c8ff',
              }}
            >
              <RotateCcw size={14} /> Reset
            </button>
          </div>
        )}

        {/* ── ACID TAB ────────────────────────────────────────────────────── */}
        {activeTab === 'acid' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* Intro box */}
            <div style={infoBox}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <Info size={22} style={{ color: '#64c8ff', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <p style={{ color: '#64c8ff', fontWeight: 'bold', marginBottom: '6px', fontSize: '15px' }}>Apa itu ACID?</p>
                  <p style={{ color: '#a0c8ff', lineHeight: '1.65', margin: 0 }}>
                    ACID adalah singkatan dari empat properti fundamental yang menjamin reliabilitas transaksi database.
                    Setiap database relasional harus memenuhi keempat properti ini untuk menjamin integritas dan konsistensi data.
                  </p>
                </div>
              </div>
            </div>

            {/* 2-column grid for cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))', gap: '16px' }}>
              {acidData.map((prop) => {
                const isOpen = expandedSection === prop.id;
                return (
                  <div
                    key={prop.id}
                    onClick={() => setExpandedSection(isOpen ? null : prop.id)}
                    style={{
                      cursor: 'pointer', borderRadius: '12px', padding: '20px',
                      background: isOpen ? 'rgba(100,200,255,0.12)' : 'rgba(100,200,255,0.05)',
                      border: isOpen ? '2px solid #64c8ff' : '1px solid rgba(100,200,255,0.2)',
                      transition: 'all 0.2s',
                    }}
                  >
                    {/* Card header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                      <div>
                        <h3 style={{ color: '#64c8ff', fontSize: '17px', fontWeight: 'bold', margin: 0 }}>{prop.title}</h3>
                        <p style={{ color: '#708090', fontSize: '13px', margin: '3px 0 0' }}>{prop.subtitle}</p>
                      </div>
                      <ChevronDown size={20} style={{ color: '#64c8ff', flexShrink: 0, transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }} />
                    </div>

                    {/* Expanded content */}
                    {isOpen && (
                      <div className="animate-float" onClick={e => e.stopPropagation()} style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(100,200,255,0.2)' }}>
                        {/* Description */}
                        <p style={{ color: '#d0e8ff', lineHeight: '1.65', marginBottom: '14px', fontSize: '14px' }}>
                          {prop.description}
                        </p>

                        {/* Example */}
                        <div style={{ background: 'rgba(0,0,0,0.25)', borderRadius: '8px', padding: '12px', borderLeft: '3px solid #64c8ff', marginBottom: '16px' }}>
                          <p style={{ color: '#a0c8ff', fontSize: '12px', fontWeight: '600', marginBottom: '6px' }}>📌 Contoh:</p>
                          <p style={{ color: '#d0e8ff', fontSize: '13px', margin: 0, lineHeight: '1.6' }}>{prop.example}</p>
                        </div>

                        {/* Per-prop detail blocks */}
                        {prop.id === 'atomicity' && (
                          <div style={{ background: 'rgba(0,0,0,0.18)', borderRadius: '8px', padding: '12px', marginBottom: '14px' }}>
                            <p style={{ color: '#64c8ff', fontWeight: 'bold', marginBottom: '10px', fontSize: '13px' }}>Skenario Transfer Dana Rp 1.000.000:</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                              {prop.steps.map(s => (
                                <div key={s.step} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                  <span style={{ color: '#708090', fontSize: '12px', minWidth: '16px' }}>{s.step}.</span>
                                  <span style={{ color: '#a0c8ff', fontSize: '13px', flex: 1 }}>{s.action}</span>
                                  <span style={{ color: s.ok ? '#4ade80' : '#f87171', fontSize: '12px', fontWeight: 'bold', minWidth: '28px' }}>{s.ok ? '✅' : '❌'}</span>
                                  <span style={{ color: '#708090', fontSize: '12px', minWidth: '120px', textAlign: 'right' }}>{s.note}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {prop.id === 'consistency' && (
                          <div style={{ background: 'rgba(0,0,0,0.18)', borderRadius: '8px', padding: '12px', marginBottom: '14px' }}>
                            <p style={{ color: '#64c8ff', fontWeight: 'bold', marginBottom: '10px', fontSize: '13px' }}>Aturan yang Selalu Dijaga:</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                              {prop.rules.map((r, i) => (
                                <div key={i} style={{ display: 'flex', gap: '8px' }}>
                                  <span style={{ color: '#4ade80', fontSize: '13px' }}>✓</span>
                                  <span style={{ color: '#a0c8ff', fontSize: '13px' }}>{r}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {prop.id === 'isolation' && (
                          <div style={{ background: 'rgba(0,0,0,0.18)', borderRadius: '8px', padding: '12px', marginBottom: '14px' }}>
                            <p style={{ color: '#64c8ff', fontWeight: 'bold', marginBottom: '10px', fontSize: '13px' }}>Timeline Dua Transaksi Bersamaan:</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                              {prop.timeline.map((t, i) => (
                                <div key={i} style={{ display: 'flex', gap: '10px', fontSize: '12px' }}>
                                  <span style={{ color: '#708090', minWidth: '68px' }}>{t.time}</span>
                                  <span style={{ color: '#64c8ff', minWidth: '24px', fontWeight: 'bold' }}>{t.id}</span>
                                  <span style={{ color: '#a0c8ff', flex: 1 }}>{t.action}</span>
                                  <span style={{ color: '#d0e8ff', textAlign: 'right' }}>{t.sees}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {prop.id === 'durability' && (
                          <div style={{ background: 'rgba(0,0,0,0.18)', borderRadius: '8px', padding: '12px', marginBottom: '14px' }}>
                            <p style={{ color: '#64c8ff', fontWeight: 'bold', marginBottom: '10px', fontSize: '13px' }}>Lapisan Penyimpanan:</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                              {prop.storage.map((s, i) => (
                                <div key={i} style={{ padding: '8px 10px', background: 'rgba(100,200,255,0.08)', borderRadius: '6px' }}>
                                  <span style={{ color: '#64c8ff', fontSize: '13px', fontWeight: 'bold' }}>{s.level}</span>
                                  <span style={{ color: '#708090', fontSize: '12px', marginLeft: '8px' }}>{s.status} — {s.desc}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* SVG Animation */}
                        <div style={{ marginTop: '4px' }}>
                          {prop.id === 'atomicity'   && <AtomicityAnimation />}
                          {prop.id === 'consistency' && <ConsistencyAnimation />}
                          {prop.id === 'isolation'   && <IsolationAnimation />}
                          {prop.id === 'durability'  && <DurabilityAnimation />}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── LOCKS TAB ───────────────────────────────────────────────────── */}
        {activeTab === 'locks' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="animate-float">

            {/* Intro */}
            <div style={infoBox}>
              <p style={{ color: '#64c8ff', fontWeight: 'bold', marginBottom: '6px' }}>🔐 Mekanisme Lock</p>
              <p style={{ color: '#a0c8ff', lineHeight: '1.65', margin: 0 }}>
                Lock adalah mekanisme yang mengontrol akses concurrent ke resource database. Tanpa lock,
                multiple transaksi bisa mengubah data yang sama secara bersamaan dan menyebabkan inkonsistensi.
              </p>
            </div>

            {/* SVG Animation */}
            <div style={card()}>
              <p style={{ color: '#64c8ff', fontWeight: 'bold', marginBottom: '14px' }}>🎬 Visualisasi Animasi</p>
              <LockMechanismAnimation />
              <div style={{ marginTop: '14px', padding: '12px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
                <p style={{ color: '#a0c8ff', fontSize: '14px', margin: 0 }}>
                  <strong>Keterangan:</strong> Shared Lock memungkinkan multiple readers bersamaan.
                  Exclusive Lock memberikan akses eksklusif untuk writer dan mem-block semua transaksi lain.
                </p>
              </div>
            </div>

            {/* 3 lock type cards */}
            {lockTypes.map(lock => (
              <div key={lock.id} style={card()}>
                <div style={{ display: 'flex', gap: '14px', marginBottom: '14px', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '28px', lineHeight: 1 }}>{lock.icon}</span>
                  <div>
                    <h3 style={{ color: '#64c8ff', fontSize: '17px', fontWeight: 'bold', margin: 0 }}>{lock.title}</h3>
                    <p style={{ color: '#708090', fontSize: '12px', margin: '3px 0 0' }}>{lock.notation}</p>
                  </div>
                </div>
                <p style={{ color: '#a0c8ff', lineHeight: '1.65', marginBottom: '14px', fontSize: '14px' }}>{lock.description}</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
                  <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '8px', padding: '12px' }}>
                    <p style={{ color: '#4ade80', fontWeight: 'bold', fontSize: '12px', marginBottom: '8px' }}>✅ Keuntungan</p>
                    {lock.advantages.map((a, i) => <p key={i} style={{ color: '#a0c8ff', fontSize: '13px', margin: '4px 0' }}>• {a}</p>)}
                  </div>
                  <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '8px', padding: '12px' }}>
                    <p style={{ color: '#f87171', fontWeight: 'bold', fontSize: '12px', marginBottom: '8px' }}>⚠️ Kekurangan</p>
                    {lock.disadvantages.map((d, i) => <p key={i} style={{ color: '#a0c8ff', fontSize: '13px', margin: '4px 0' }}>• {d}</p>)}
                  </div>
                </div>
                <div style={{ background: 'rgba(100,200,255,0.08)', borderRadius: '8px', padding: '10px 12px', borderLeft: '3px solid #64c8ff' }}>
                  <p style={{ color: '#a0c8ff', fontSize: '13px', margin: 0 }}><strong>Contoh:</strong> {lock.example}</p>
                </div>
              </div>
            ))}

            {/* Timeline */}
            <div style={card()}>
              <p style={{ color: '#64c8ff', fontWeight: 'bold', marginBottom: '16px', fontSize: '16px' }}>
                📋 Timeline: Bagaimana Lock Bekerja
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {lockTimeline.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '14px', paddingBottom: '12px', marginBottom: '12px', borderBottom: idx < lockTimeline.length - 1 ? '1px solid rgba(100,200,255,0.1)' : 'none' }}>
                    <span style={{ color: '#64c8ff', fontWeight: 'bold', minWidth: '72px', fontSize: '12px' }}>{item.time}</span>
                    <div>
                      <p style={{ color: '#d0e8ff', fontSize: '14px', fontWeight: '500', margin: '0 0 2px' }}>{item.event}</p>
                      <p style={{ color: '#708090', fontSize: '12px', margin: 0 }}>{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── ISOLATION TAB ───────────────────────────────────────────────── */}
        {activeTab === 'isolation' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="animate-float">

            {/* Intro */}
            <div style={infoBox}>
              <p style={{ color: '#64c8ff', fontWeight: 'bold', marginBottom: '6px' }}>🛡️ Isolation Levels</p>
              <p style={{ color: '#a0c8ff', lineHeight: '1.65', margin: 0 }}>
                Isolation levels menentukan seberapa ketat isolasi transaksi.
                Level lebih tinggi = keamanan lebih baik, tapi performa lebih rendah.
              </p>
            </div>

            {/* Concurrency problems */}
            <div style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(100,200,255,0.15)', borderRadius: '12px', padding: '18px' }}>
              <p style={{ color: '#64c8ff', fontWeight: 'bold', marginBottom: '12px' }}>Masalah Konkurensi yang Bisa Terjadi:</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                {[
                  { color: '#f87171', label: 'Dirty Read',           desc: 'Membaca data yang belum di-commit oleh transaksi lain' },
                  { color: '#fbbf24', label: 'Non-Repeatable Read',  desc: 'Data berubah di tengah transaksi saat dibaca ulang' },
                  { color: '#a78bfa', label: 'Phantom Read',         desc: 'Baris baru muncul dalam range yang sama saat dibaca ulang' },
                ].map((p, i) => (
                  <div key={i} style={{ background: 'rgba(100,200,255,0.05)', padding: '12px', borderRadius: '8px', borderLeft: `3px solid ${p.color}` }}>
                    <p style={{ color: p.color, fontWeight: 'bold', fontSize: '13px', marginBottom: '6px' }}>{p.label}</p>
                    <p style={{ color: '#a0c8ff', fontSize: '12px', lineHeight: '1.5', margin: 0 }}>{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* SVG chart */}
            <div style={card()}>
              <p style={{ color: '#64c8ff', fontWeight: 'bold', marginBottom: '14px' }}>📊 Visualisasi Perbandingan</p>
              <IsolationComparisonChart />
            </div>

            {/* 4 level detail cards */}
            {isolationLevels.map((iso, idx) => (
              <div key={idx} style={card()}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
                  <h3 style={{ color: '#64c8ff', fontSize: '16px', fontWeight: 'bold', margin: 0 }}>
                    Level {idx + 1}: {iso.level}
                  </h3>
                  <span style={{
                    padding: '4px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold',
                    background: `${iso.protectionColor}20`, color: iso.protectionColor,
                  }}>
                    {iso.protection}
                  </span>
                </div>
                <p style={{ color: '#a0c8ff', lineHeight: '1.65', marginBottom: '12px', fontSize: '14px' }}>{iso.description}</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '12px' }}>
                  {[
                    { label: 'Dirty Read',    safe: iso.dirty,          color: '#f87171' },
                    { label: 'Non-Repeatable',safe: iso.nonRepeatable,   color: '#fbbf24' },
                    { label: 'Phantom Read',  safe: iso.phantom,         color: '#a78bfa' },
                  ].map((a, i) => (
                    <div key={i} style={{ background: 'rgba(0,0,0,0.2)', padding: '10px', borderRadius: '6px' }}>
                      <p style={{ color: a.color, fontSize: '11px', marginBottom: '4px' }}>{a.label}</p>
                      <p style={{ color: a.safe ? '#4ade80' : '#f87171', fontWeight: 'bold', fontSize: '13px', margin: 0 }}>
                        {a.safe ? '✅ Aman' : '❌ Rentan'}
                      </p>
                    </div>
                  ))}
                </div>
                <div style={{ background: 'rgba(100,200,255,0.08)', borderRadius: '6px', padding: '10px 12px', borderLeft: '3px solid #64c8ff' }}>
                  <p style={{ color: '#a0c8ff', fontSize: '13px', margin: 0 }}>
                    <strong>Kapan digunakan:</strong> {iso.useCase}
                  </p>
                </div>
              </div>
            ))}

            {/* PostgreSQL default note */}
            <div style={{ background: 'rgba(74,222,128,0.08)', border: '2px solid rgba(74,222,128,0.4)', borderRadius: '12px', padding: '18px' }}>
              <p style={{ color: '#4ade80', fontWeight: 'bold', marginBottom: '6px' }}>💡 PostgreSQL Default Isolation Level</p>
              <p style={{ color: '#a0c8ff', margin: 0 }}>
                PostgreSQL menggunakan <strong>"Read Committed"</strong> sebagai default isolation level —
                keseimbangan baik antara keamanan dan performa untuk kebanyakan aplikasi.
              </p>
            </div>

            {/* SVG simulation */}
            <div style={card()}>
              <p style={{ color: '#64c8ff', fontWeight: 'bold', marginBottom: '14px' }}>🎬 Simulasi Isolasi Transaksi</p>
              <IsolationAnimation />
            </div>
          </div>
        )}

        {/* ── DEADLOCK TAB ────────────────────────────────────────────────── */}
        {activeTab === 'deadlock' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="animate-float">

            {/* Intro */}
            <div style={{ ...infoBox, borderColor: 'rgba(248,113,113,0.3)' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <AlertCircle size={22} style={{ color: '#f87171', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <p style={{ color: '#f87171', fontWeight: 'bold', marginBottom: '6px' }}>💥 Apa itu Deadlock?</p>
                  <p style={{ color: '#a0c8ff', lineHeight: '1.65', margin: 0 }}>
                    Deadlock terjadi ketika dua atau lebih transaksi saling menunggu resource (lock) yang sedang dipegang
                    transaksi lain, menciptakan situasi tunggu melingkar yang tak terselesaikan.
                  </p>
                </div>
              </div>
            </div>

            {/* Scenario table */}
            <div style={card()}>
              <p style={{ color: '#f87171', fontWeight: 'bold', marginBottom: '16px', fontSize: '16px' }}>
                Skenario: Transaksi Saling Tunggu
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {deadlockScenario.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <span style={{ color: '#64c8ff', fontWeight: 'bold', minWidth: '76px', fontSize: '12px' }}>{item.time}</span>
                    <span style={{ color: '#a78bfa', fontWeight: 'bold', minWidth: '44px', fontSize: '13px' }}>{item.tx}</span>
                    <span style={{ color: '#a0c8ff', flex: 1, fontSize: '13px' }}>{item.action}</span>
                    <span style={{
                      fontSize: '12px', fontWeight: 'bold', minWidth: '130px', textAlign: 'right',
                      color: item.ok === 'green' ? '#4ade80' : item.ok === 'yellow' ? '#fbbf24' : '#f87171',
                    }}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* SVG Animation */}
            <div style={card()}>
              <p style={{ color: '#64c8ff', fontWeight: 'bold', marginBottom: '14px' }}>🎬 Visualisasi Animasi</p>
              <DeadlockAnimation />
            </div>

            {/* Diagram visual */}
            <div style={card()}>
              <p style={{ color: '#64c8ff', fontWeight: 'bold', marginBottom: '20px', fontSize: '16px' }}>Diagram Deadlock</p>
              <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                {[{label:'T1', hold:'Table A', wait:'Table B'},{label:'T2', hold:'Table B', wait:'Table A'}].map((t, i) => (
                  <div key={i} style={{ textAlign: 'center' }}>
                    <div style={{
                      width: '80px', height: '80px', background: 'rgba(167,139,250,0.2)',
                      border: '2px solid #a78bfa', borderRadius: '8px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#a78bfa', fontWeight: 'bold', fontSize: '18px', margin: '0 auto 8px',
                    }}>{t.label}</div>
                    <p style={{ color: '#a0c8ff', fontSize: '12px', margin: '2px 0' }}>Hold: {t.hold}</p>
                    <p style={{ color: '#f87171', fontSize: '12px', margin: 0 }}>Wait: {t.wait}</p>
                  </div>
                ))}
                <div style={{ color: '#f87171', fontSize: '32px', fontWeight: 'bold', textAlign: 'center' }}>↻</div>
              </div>
              <p style={{ color: '#f87171', textAlign: 'center', marginTop: '16px', fontSize: '14px', fontWeight: 'bold' }}>
                🚨 DEADLOCK — Salah satu transaksi akan di-ROLLBACK
              </p>
            </div>

            {/* Prevention */}
            <div style={{ background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.25)', borderRadius: '12px', padding: '20px' }}>
              <p style={{ color: '#4ade80', fontWeight: 'bold', marginBottom: '14px', fontSize: '16px' }}>✅ Cara Mencegah Deadlock</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
                {strategies.map((s, i) => (
                  <div key={i} style={{ background: 'rgba(0,0,0,0.2)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(74,222,128,0.15)' }}>
                    <p style={{ color: '#4ade80', fontWeight: 'bold', fontSize: '13px', marginBottom: '4px' }}>{s.title}</p>
                    <p style={{ color: '#a0c8ff', fontSize: '12px', margin: 0 }}>{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer style={{ background: 'rgba(15,20,25,0.5)', borderTop: '1px solid rgba(100,200,255,0.2)', marginTop: '60px', padding: '28px 0', textAlign: 'center' }}>
        <p style={{ color: '#708090', fontSize: '14px' }}>
          Lock dan ACID adalah fondasi keandalan database. Memahami konsep ini memastikan aplikasi robust dan data selalu konsisten.
        </p>
      </footer>
    </div>
  );
};

export default AnimatedLockACIDModule;
