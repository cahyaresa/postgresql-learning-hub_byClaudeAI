import React, { useState, useEffect } from 'react';
import { ChevronDown, Play, Pause, RotateCcw } from 'lucide-react';

const AnimatedLockACIDModule = () => {
  const [activeTab, setActiveTab] = useState('acid');
  const [expandedSection, setExpandedSection] = useState('atomicity');
  const [isPlaying, setIsPlaying] = useState(true);
  const [lockDemoState, setLockDemoState] = useState(0);
  const [isolationDemoState, setIsolationDemoState] = useState(0);
  const [deadlockDemoState, setDeadlockDemoState] = useState(0);

  // Auto-advance animations
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      if (activeTab === 'acid') return;
      if (activeTab === 'locks') {
        setLockDemoState(prev => (prev + 1) % 7);
      } else if (activeTab === 'isolation') {
        setIsolationDemoState(prev => (prev + 1) % 6);
      } else if (activeTab === 'deadlock') {
        setDeadlockDemoState(prev => (prev + 1) % 5);
      }
    }, 2000);
    return () => clearInterval(timer);
  }, [isPlaying, activeTab]);

  // CSS Animations
  const animationStyles = `
    @keyframes float-up {
      0% { transform: translateY(20px); opacity: 0; }
      100% { transform: translateY(0); opacity: 1; }
    }
    @keyframes pulse-ring {
      0% { r: 40px; opacity: 1; }
      100% { r: 80px; opacity: 0; }
    }
    @keyframes slide-in {
      0% { transform: translateX(-100%); opacity: 0; }
      100% { transform: translateX(0); opacity: 1; }
    }
    @keyframes slide-out {
      0% { transform: translateX(0); opacity: 1; }
      100% { transform: translateX(100%); opacity: 0; }
    }
    @keyframes rotate-360 {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    @keyframes scale-pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
    }
    @keyframes fade-in-out {
      0%, 100% { opacity: 0; }
      50% { opacity: 1; }
    }
    
    .animate-float { animation: float-up 0.6s ease-out; }
    .animate-pulse-ring { animation: pulse-ring 1.5s ease-out infinite; }
    .animate-slide-in { animation: slide-in 0.5s ease-out; }
    .animate-slide-out { animation: slide-out 0.5s ease-out; }
    .animate-rotate { animation: rotate-360 2s linear infinite; }
    .animate-bounce { animation: bounce 1s ease-in-out infinite; }
    .animate-scale { animation: scale-pulse 2s ease-in-out infinite; }
    .animate-fade { animation: fade-in-out 2s ease-in-out infinite; }
  `;

  // ACID Atomicity Visualization
  const AtomicityAnimation = () => (
    <svg viewBox="0 0 400 300" className="w-full h-80" style={{ background: 'rgba(100, 200, 255, 0.05)', borderRadius: '12px' }}>
      <style>{animationStyles}</style>
      <defs>
        <linearGradient id="acidGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#64c8ff" />
          <stop offset="100%" stopColor="#4ade80" />
        </linearGradient>
      </defs>

      {/* Title */}
      <text x="200" y="30" textAnchor="middle" fill="#e0f2ff" fontSize="18" fontWeight="bold">
        Atomicity: Transaksi Transfer Dana
      </text>

      {/* Source Account */}
      <g>
        <rect x="30" y="80" width="120" height="80" fill="rgba(100, 200, 255, 0.2)" stroke="#64c8ff" strokeWidth="2" rx="8" />
        <text x="90" y="105" textAnchor="middle" fill="#64c8ff" fontSize="14" fontWeight="bold">Akun A</text>
        <text x="90" y="145" textAnchor="middle" fill="#a0c8ff" fontSize="20" fontWeight="bold">Rp 10M</text>
      </g>

      {/* Target Account */}
      <g>
        <rect x="250" y="80" width="120" height="80" fill="rgba(100, 200, 255, 0.2)" stroke="#64c8ff" strokeWidth="2" rx="8" />
        <text x="310" y="105" textAnchor="middle" fill="#64c8ff" fontSize="14" fontWeight="bold">Akun B</text>
        <text x="310" y="145" textAnchor="middle" fill="#a0c8ff" fontSize="20" fontWeight="bold">Rp 5M</text>
      </g>

      {/* Arrow Animation */}
      <g opacity={expandedSection === 'atomicity' && [0, 1, 2].includes(expandedSection) ? 1 : 0.3}>
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <polygon points="0 0, 10 3, 0 6" fill="#fbbf24" />
          </marker>
        </defs>
        <line x1="150" y1="120" x2="250" y2="120" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <text x="200" y="105" textAnchor="middle" fill="#fbbf24" fontSize="12" fontWeight="bold">- Rp 1M</text>
        <text x="200" y="140" textAnchor="middle" fill="#fbbf24" fontSize="12" fontWeight="bold">+ Rp 1M</text>
      </g>

      {/* Status */}
      <g>
        <rect x="50" y="200" width="300" height="70" fill="rgba(0, 0, 0, 0.3)" rx="8" />
        <text x="200" y="225" textAnchor="middle" fill="#e0f2ff" fontSize="12" fontWeight="bold">
          Status Transaksi:
        </text>
        <text x="200" y="250" textAnchor="middle" fill="#4ade80" fontSize="16" fontWeight="bold">
          ✅ COMMITTED (Semua perubahan selesai)
        </text>
      </g>
    </svg>
  );

  // Consistency Animation
  const ConsistencyAnimation = () => (
    <svg viewBox="0 0 400 300" className="w-full h-80" style={{ background: 'rgba(100, 200, 255, 0.05)', borderRadius: '12px' }}>
      <style>{animationStyles}</style>

      <text x="200" y="30" textAnchor="middle" fill="#e0f2ff" fontSize="18" fontWeight="bold">
        Consistency: Validasi Constraint
      </text>

      {/* Before State */}
      <g>
        <text x="100" y="70" textAnchor="middle" fill="#64c8ff" fontSize="14" fontWeight="bold">SEBELUM</text>
        <circle cx="100" cy="120" r="45" fill="rgba(74, 222, 128, 0.2)" stroke="#4ade80" strokeWidth="2" />
        <text x="100" y="130" textAnchor="middle" fill="#4ade80" fontSize="24" fontWeight="bold">✓</text>
        <text x="100" y="180" textAnchor="middle" fill="#a0c8ff" fontSize="12">Valid State</text>
      </g>

      {/* Arrow */}
      <g>
        <line x1="145" y1="120" x2="255" y2="120" stroke="#64c8ff" strokeWidth="2" />
        <polygon points="255,120 245,115 245,125" fill="#64c8ff" />
      </g>

      {/* After State */}
      <g>
        <text x="300" y="70" textAnchor="middle" fill="#64c8ff" fontSize="14" fontWeight="bold">SESUDAH</text>
        <circle cx="300" cy="120" r="45" fill="rgba(74, 222, 128, 0.2)" stroke="#4ade80" strokeWidth="2" />
        <text x="300" y="130" textAnchor="middle" fill="#4ade80" fontSize="24" fontWeight="bold">✓</text>
        <text x="300" y="180" textAnchor="middle" fill="#a0c8ff" fontSize="12">Valid State</text>
      </g>

      {/* Rules */}
      <g>
        <rect x="40" y="220" width="320" height="60" fill="rgba(100, 200, 255, 0.1)" stroke="rgba(100, 200, 255, 0.3)" rx="8" />
        <text x="60" y="245" fill="#a0c8ff" fontSize="12">✓ Saldo tidak negatif  ✓ Debit = Kredit  ✓ FK valid</text>
        <text x="60" y="265" fill="#a0c8ff" fontSize="12">✓ Integritas data terjaga di setiap waktu</text>
      </g>
    </svg>
  );

  // Isolation Animation
  const IsolationAnimation = () => {
    const getOpacity = (index) => {
      return Math.abs(isolationDemoState - index) <= 1 ? 1 : 0.3;
    };

    return (
      <svg viewBox="0 0 400 320" className="w-full h-96" style={{ background: 'rgba(100, 200, 255, 0.05)', borderRadius: '12px' }}>
        <style>{animationStyles}</style>

        <text x="200" y="30" textAnchor="middle" fill="#e0f2ff" fontSize="18" fontWeight="bold">
          Isolation: Transaksi Terpisah
        </text>

        {/* T1 */}
        <g opacity={getOpacity(0)}>
          <rect x="20" y="70" width="160" height="100" fill="rgba(167, 139, 250, 0.15)" stroke="#a78bfa" strokeWidth="2" rx="8" />
          <text x="100" y="95" textAnchor="middle" fill="#a78bfa" fontSize="14" fontWeight="bold">Transaksi T1</text>
          <rect x="35" y="110" width="130" height="30" fill="rgba(167, 139, 250, 0.3)" rx="4" />
          <text x="100" y="132" textAnchor="middle" fill="#d0e8ff" fontSize="11">SELECT saldo = Rp 10M</text>
          <rect x="35" y="150" width="130" height="25" fill="rgba(100, 200, 255, 0.2)" rx="4" />
          <text x="100" y="169" textAnchor="middle" fill="#a0c8ff" fontSize="10">(Sedang berjalan...)</text>
        </g>

        {/* T2 */}
        <g opacity={getOpacity(1)}>
          <rect x="220" y="70" width="160" height="100" fill="rgba(167, 139, 250, 0.15)" stroke="#a78bfa" strokeWidth="2" rx="8" />
          <text x="300" y="95" textAnchor="middle" fill="#a78bfa" fontSize="14" fontWeight="bold">Transaksi T2</text>
          <rect x="235" y="110" width="130" height="30" fill="rgba(248, 113, 113, 0.3)" rx="4" />
          <text x="300" y="132" textAnchor="middle" fill="#f87171" fontSize="11">UPDATE -Rp 5M</text>
          <rect x="235" y="150" width="130" height="25" fill="rgba(100, 200, 255, 0.2)" rx="4" />
          <text x="300" y="169" textAnchor="middle" fill="#a0c8ff" fontSize="10">(Sedang berjalan...)</text>
        </g>

        {/* Timeline */}
        <g>
          <line x1="50" y1="220" x2="350" y2="220" stroke="rgba(100, 200, 255, 0.3)" strokeWidth="2" />
          
          {[0, 1, 2, 3, 4, 5].map((idx) => (
            <g key={idx}>
              <circle cx={50 + idx * 50} cy="220" r="4" fill={isolationDemoState === idx ? '#64c8ff' : 'rgba(100, 200, 255, 0.3)'} />
              <text x={50 + idx * 50} y="245" textAnchor="middle" fill="#708090" fontSize="10">
                {idx === 0 && 'T1: Read'}
                {idx === 1 && 'T2: Write'}
                {idx === 2 && 'T1: Read'}
                {idx === 3 && 'T2: Done'}
                {idx === 4 && 'T1: Still'}
                {idx === 5 && 'Isolated'}
              </text>
            </g>
          ))}
        </g>

        {/* Result */}
        <g>
          <rect x="40" y="270" width="320" height="40" fill="rgba(74, 222, 128, 0.1)" stroke="rgba(74, 222, 128, 0.3)" rx="8" />
          <text x="200" y="297" textAnchor="middle" fill="#4ade80" fontSize="13" fontWeight="bold">
            ✓ T1 tidak melihat perubahan T2 yang sedang berjalan
          </text>
        </g>
      </svg>
    );
  };

  // Durability Animation
  const DurabilityAnimation = () => (
    <svg viewBox="0 0 400 300" className="w-full h-80" style={{ background: 'rgba(100, 200, 255, 0.05)', borderRadius: '12px' }}>
      <style>{animationStyles}</style>

      <text x="200" y="30" textAnchor="middle" fill="#e0f2ff" fontSize="18" fontWeight="bold">
        Durability: Penyimpanan Bertingkat
      </text>

      {/* RAM */}
      <g className={expandedSection === 'durability' ? 'animate-float' : ''}>
        <rect x="30" y="70" width="100" height="60" fill="rgba(248, 113, 113, 0.2)" stroke="#f87171" strokeWidth="2" rx="6" />
        <text x="80" y="90" textAnchor="middle" fill="#f87171" fontSize="12" fontWeight="bold">RAM</text>
        <text x="80" y="110" textAnchor="middle" fill="#fca5a5" fontSize="10">Volatile</text>
        <text x="80" y="125" textAnchor="middle" fill="#fca5a5" fontSize="9">⚡ Cepat</text>
      </g>

      {/* WAL */}
      <g className={expandedSection === 'durability' ? 'animate-float' : ''} style={{ animationDelay: '0.2s' }}>
        <rect x="150" y="70" width="100" height="60" fill="rgba(251, 191, 36, 0.2)" stroke="#fbbf24" strokeWidth="2" rx="6" />
        <text x="200" y="90" textAnchor="middle" fill="#fbbf24" fontSize="12" fontWeight="bold">WAL Log</text>
        <text x="200" y="110" textAnchor="middle" fill="#fde047" fontSize="10">Durable</text>
        <text x="200" y="125" textAnchor="middle" fill="#fde047" fontSize="9">💾 Persisten</text>
      </g>

      {/* Disk */}
      <g className={expandedSection === 'durability' ? 'animate-float' : ''} style={{ animationDelay: '0.4s' }}>
        <rect x="270" y="70" width="100" height="60" fill="rgba(74, 222, 128, 0.2)" stroke="#4ade80" strokeWidth="2" rx="6" />
        <text x="320" y="90" textAnchor="middle" fill="#4ade80" fontSize="12" fontWeight="bold">Disk</text>
        <text x="320" y="110" textAnchor="middle" fill="#86efac" fontSize="10">Durable</text>
        <text x="320" y="125" textAnchor="middle" fill="#86efac" fontSize="9">🔒 Aman</text>
      </g>

      {/* Flow Arrows */}
      <g stroke="rgba(100, 200, 255, 0.5)" strokeWidth="2" fill="none">
        <path d="M 130 100 L 150 100" markerEnd="url(#arrow)" />
        <path d="M 250 100 L 270 100" markerEnd="url(#arrow)" />
      </g>

      {/* Info */}
      <g>
        <rect x="30" y="180" width="340" height="90" fill="rgba(100, 200, 255, 0.1)" rx="8" />
        <text x="50" y="205" fill="#64c8ff" fontSize="12" fontWeight="bold">Data setelah COMMIT:</text>
        <text x="50" y="227" fill="#a0c8ff" fontSize="11">1. Ditulis ke WAL (Write-Ahead Log) - segera disimpan ke disk</text>
        <text x="50" y="247" fill="#a0c8ff" fontSize="11">2. Database buffer diupdate - segera tersedia di RAM</text>
        <text x="50" y="267" fill="#a0c8ff" fontSize="11">3. Data persisten - aman dari crash, power loss, atau bencana</text>
      </g>
    </svg>
  );

  // Lock Mechanism Animation
  const LockMechanismAnimation = () => {
    const getLockStatus = (step) => {
      if (step < lockDemoState) return 'released';
      if (step === lockDemoState) return 'active';
      return 'waiting';
    };

    return (
      <svg viewBox="0 0 500 380" className="w-full h-96" style={{ background: 'rgba(100, 200, 255, 0.05)', borderRadius: '12px' }}>
        <style>{animationStyles}</style>

        <text x="250" y="30" textAnchor="middle" fill="#e0f2ff" fontSize="18" fontWeight="bold">
          Lock Mechanism: Shared & Exclusive
        </text>

        {/* Shared Lock Section */}
        <g>
          <text x="125" y="70" textAnchor="middle" fill="#64c8ff" fontSize="14" fontWeight="bold">Shared Lock (READ)</text>
          <circle cx="70" cy="130" r="30" fill="rgba(100, 200, 255, 0.2)" stroke="#64c8ff" strokeWidth="2" />
          <text x="70" y="138" textAnchor="middle" fill="#64c8ff" fontSize="11" fontWeight="bold">T1</text>
          
          <circle cx="125" cy="130" r="30" fill="rgba(100, 200, 255, 0.2)" stroke="#64c8ff" strokeWidth="2" />
          <text x="125" y="138" textAnchor="middle" fill="#64c8ff" fontSize="11" fontWeight="bold">T2</text>
          
          <circle cx="180" cy="130" r="30" fill="rgba(100, 200, 255, 0.2)" stroke="#64c8ff" strokeWidth="2" />
          <text x="180" y="138" textAnchor="middle" fill="#64c8ff" fontSize="11" fontWeight="bold">T3</text>

          <rect x="30" y="180" width="190" height="50" fill="rgba(100, 200, 255, 0.1)" stroke="#64c8ff" strokeWidth="2" rx="6" />
          <text x="125" y="205" textAnchor="middle" fill="#a0c8ff" fontSize="12">🔓 Multiple readers</text>
          <text x="125" y="223" textAnchor="middle" fill="#a0c8ff" fontSize="11">Data: SELECT dapat bersama-sama</text>
        </g>

        {/* Exclusive Lock Section */}
        <g>
          <text x="375" y="70" textAnchor="middle" fill="#f87171" fontSize="14" fontWeight="bold">Exclusive Lock (WRITE)</text>
          <circle cx="320" cy="130" r="30" fill="rgba(248, 113, 113, 0.3)" stroke="#f87171" strokeWidth="2" />
          <text x="320" y="138" textAnchor="middle" fill="#f87171" fontSize="11" fontWeight="bold">T1</text>
          
          <circle cx="375" cy="130" r="30" fill="rgba(100, 100, 100, 0.3)" stroke="#808080" strokeWidth="2" />
          <text x="375" y="138" textAnchor="middle" fill="#a0a0a0" fontSize="10" fontWeight="bold">T2⏳</text>
          
          <circle cx="430" cy="130" r="30" fill="rgba(100, 100, 100, 0.3)" stroke="#808080" strokeWidth="2" />
          <text x="430" y="138" textAnchor="middle" fill="#a0a0a0" fontSize="10" fontWeight="bold">T3⏳</text>

          <rect x="280" y="180" width="190" height="50" fill="rgba(248, 113, 113, 0.1)" stroke="#f87171" strokeWidth="2" rx="6" />
          <text x="375" y="205" textAnchor="middle" fill="#fca5a5" fontSize="12">🔒 Exclusive access</text>
          <text x="375" y="223" textAnchor="middle" fill="#fca5a5" fontSize="11">UPDATE/DELETE hanya T1 bisa</text>
        </g>

        {/* Timeline */}
        <line x1="50" y1="280" x2="450" y2="280" stroke="rgba(100, 200, 255, 0.3)" strokeWidth="2" />
        
        {[0, 1, 2, 3, 4, 5, 6].map((idx) => (
          <g key={idx}>
            <circle 
              cx={50 + idx * 60} 
              cy="280" 
              r="5" 
              fill={lockDemoState === idx ? '#64c8ff' : 'rgba(100, 200, 255, 0.2)'} 
            />
          </g>
        ))}

        {/* Status Text */}
        <g>
          <rect x="30" y="310" width="440" height="50" fill="rgba(100, 200, 255, 0.1)" rx="8" />
          <text x="50" y="335" fill="#a0c8ff" fontSize="12" fontWeight="bold">
            {lockDemoState === 0 && '① T1 mengambil Shared Lock pada data X'}
            {lockDemoState === 1 && '② T2, T3 juga mengambil Shared Lock (boleh)'}
            {lockDemoState === 2 && '③ T1 selesai, melepas Shared Lock'}
            {lockDemoState === 3 && '④ T1 akan UPDATE → meminta Exclusive Lock'}
            {lockDemoState === 5 && '⑤ T1 mendapat Exclusive Lock, T2/T3 menunggu'}
            {lockDemoState === 6 && '⑥ T1 selesai, Exclusive Lock dilepas'}
          </text>
        </g>
      </svg>
    );
  };

  // Deadlock Animation
  const DeadlockAnimation = () => {
    const getDeadlockStep = (stepNum) => {
      return deadlockDemoState >= stepNum ? 1 : 0.3;
    };

    return (
      <svg viewBox="0 0 450 400" className="w-full h-96" style={{ background: 'rgba(100, 200, 255, 0.05)', borderRadius: '12px' }}>
        <style>{animationStyles}</style>

        <text x="225" y="30" textAnchor="middle" fill="#e0f2ff" fontSize="18" fontWeight="bold">
          Deadlock: Saling Tunggu
        </text>

        {/* Table A */}
        <g opacity={getDeadlockStep(0)}>
          <rect x="30" y="80" width="150" height="80" fill="rgba(100, 200, 255, 0.15)" stroke="#64c8ff" strokeWidth="2" rx="8" />
          <text x="105" y="110" textAnchor="middle" fill="#64c8ff" fontSize="14" fontWeight="bold">TABLE A</text>
          <text x="105" y="140" textAnchor="middle" fill="#a0c8ff" fontSize="12">(Locked by T1)</text>
        </g>

        {/* Table B */}
        <g opacity={getDeadlockStep(0)}>
          <rect x="270" y="80" width="150" height="80" fill="rgba(100, 200, 255, 0.15)" stroke="#64c8ff" strokeWidth="2" rx="8" />
          <text x="345" y="110" textAnchor="middle" fill="#64c8ff" fontSize="14" fontWeight="bold">TABLE B</text>
          <text x="345" y="140" textAnchor="middle" fill="#a0c8ff" fontSize="12">(Locked by T2)</text>
        </g>

        {/* T1 */}
        <g opacity={getDeadlockStep(1)}>
          <circle cx="80" cy="250" r="40" fill="rgba(167, 139, 250, 0.2)" stroke="#a78bfa" strokeWidth="2" />
          <text x="80" y="258" textAnchor="middle" fill="#a78bfa" fontSize="14" fontWeight="bold">T1</text>
        </g>

        {/* T2 */}
        <g opacity={getDeadlockStep(1)}>
          <circle cx="370" cy="250" r="40" fill="rgba(167, 139, 250, 0.2)" stroke="#a78bfa" strokeWidth="2" />
          <text x="370" y="258" textAnchor="middle" fill="#a78bfa" fontSize="14" fontWeight="bold">T2</text>
        </g>

        {/* Arrows T1 -> B */}
        <g opacity={getDeadlockStep(2)}>
          <path d="M 140 260 Q 200 220 270 140" stroke="#fbbf24" strokeWidth="2" fill="none" strokeDasharray="5,5" />
          <text x="200" y="210" fill="#fbbf24" fontSize="11" fontWeight="bold">Minta B</text>
        </g>

        {/* Arrows T2 -> A */}
        <g opacity={getDeadlockStep(3)}>
          <path d="M 310 260 Q 240 220 180 140" stroke="#f87171" strokeWidth="2" fill="none" strokeDasharray="5,5" />
          <text x="250" y="210" fill="#f87171" fontSize="11" fontWeight="bold">Minta A</text>
        </g>

        {/* Deadlock Alert */}
        <g opacity={getDeadlockStep(4)}>
          <rect x="40" y="330" width="370" height="50" fill="rgba(248, 113, 113, 0.15)" stroke="#f87171" strokeWidth="2" rx="8" />
          <text x="225" y="355" textAnchor="middle" fill="#f87171" fontSize="14" fontWeight="bold">
            💥 DEADLOCK DETECTED!
          </text>
          <text x="225" y="372" textAnchor="middle" fill="#fca5a5" fontSize="11">
            Sistem rollback T2 untuk membebaskan lock
          </text>
        </g>
      </svg>
    );
  };

  // Isolation Levels Comparison Chart
  const IsolationComparisonChart = () => (
    <svg viewBox="0 0 500 350" className="w-full h-96" style={{ background: 'rgba(100, 200, 255, 0.05)', borderRadius: '12px' }}>
      <style>{animationStyles}</style>

      <text x="250" y="30" textAnchor="middle" fill="#e0f2ff" fontSize="18" fontWeight="bold">
        Isolation Levels: Security vs Performance
      </text>

      {/* Y-Axis Label */}
      <text x="25" y="60" fill="#708090" fontSize="12" textAnchor="middle">Keamanan</text>
      <text x="25" y="300" fill="#708090" fontSize="12" textAnchor="middle">Performa</text>

      {/* Axis */}
      <line x1="50" y1="60" x2="50" y2="300" stroke="rgba(100, 200, 255, 0.3)" strokeWidth="2" />
      <line x1="50" y1="300" x2="480" stroke="rgba(100, 200, 255, 0.3)" strokeWidth="2" />

      {/* Level 1: Read Uncommitted */}
      <g opacity="0.8" className="animate-float" style={{ animationDelay: '0s' }}>
        <circle cx="100" cy="250" r="30" fill="rgba(248, 113, 113, 0.3)" stroke="#f87171" strokeWidth="2" />
        <text x="100" y="295" textAnchor="middle" fill="#a0c8ff" fontSize="11">Read</text>
        <text x="100" y="310" textAnchor="middle" fill="#a0c8ff" fontSize="11">Uncommitted</text>
      </g>

      {/* Level 2: Read Committed */}
      <g opacity="0.8" className="animate-float" style={{ animationDelay: '0.2s' }}>
        <circle cx="175" cy="200" r="30" fill="rgba(251, 191, 36, 0.3)" stroke="#fbbf24" strokeWidth="2" />
        <text x="175" y="245" textAnchor="middle" fill="#a0c8ff" fontSize="11">Read</text>
        <text x="175" y="260" textAnchor="middle" fill="#a0c8ff" fontSize="11">Committed</text>
      </g>

      {/* Level 3: Repeatable Read */}
      <g opacity="0.8" className="animate-float" style={{ animationDelay: '0.4s' }}>
        <circle cx="280" cy="140" r="30" fill="rgba(100, 200, 255, 0.3)" stroke="#64c8ff" strokeWidth="2" />
        <text x="280" y="185" textAnchor="middle" fill="#a0c8ff" fontSize="11">Repeatable</text>
        <text x="280" y="200" textAnchor="middle" fill="#a0c8ff" fontSize="11">Read</text>
      </g>

      {/* Level 4: Serializable */}
      <g opacity="0.8" className="animate-float" style={{ animationDelay: '0.6s' }}>
        <circle cx="380" cy="80" r="30" fill="rgba(74, 222, 128, 0.3)" stroke="#4ade80" strokeWidth="2" />
        <text x="380" y="125" textAnchor="middle" fill="#a0c8ff" fontSize="11">Serializable</text>
      </g>

      {/* Legend */}
      <g>
        <text x="50" y="340" fill="#708090" fontSize="11">← Rendah</text>
        <text x="440" y="340" fill="#708090" fontSize="11">Tinggi →</text>
      </g>
    </svg>
  );

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0f1419 0%, #1a2332 100%)' }}>
      <style>{animationStyles}</style>

      {/* Header */}
      <header className="border-b" style={{ borderColor: 'rgba(100, 200, 255, 0.2)', background: 'rgba(15, 20, 25, 0.8)' }}>
        <div className="max-w-7xl mx-auto px-6 py-10">
          <h1 className="text-4xl font-bold mb-2" style={{ color: '#e0f2ff', fontFamily: 'Segoe UI' }}>
            Lock & ACID dengan Animasi Interaktif 🎬
          </h1>
          <p style={{ color: '#a0c8ff', fontSize: '20px' }}>
            Visualisasi dinamis konsep fundamental database - klik untuk mempelajari setiap properti
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 border-b overflow-x-auto pb-4" style={{ borderColor: 'rgba(100, 200, 255, 0.2)' }}>
          {[
            { id: 'acid', label: '⚛️ ACID Properties', icon: 'ACID' },
            { id: 'locks', label: '🔐 Lock Mechanisms', icon: 'Locks' },
            { id: 'isolation', label: '🛡️ Isolation Levels', icon: 'Isolation' },
            { id: 'deadlock', label: '💥 Deadlock & Prevention', icon: 'Deadlock' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="px-6 py-3 font-medium whitespace-nowrap transition-all"
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
            {isPlaying ? 'Pause Animation' : 'Play Animation'}
          </button>
          <button
            onClick={() => {
              setLockDemoState(0);
              setIsolationDemoState(0);
              setDeadlockDemoState(0);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded transition-all"
            style={{
              background: 'rgba(100, 200, 255, 0.2)',
              color: '#64c8ff'
            }}
          >
            <RotateCcw size={16} />
            Reset
          </button>
        </div>

        {/* ACID Tab */}
        {activeTab === 'acid' && (
          <div className="space-y-8">
            {[
              { id: 'atomicity', title: 'Atomicity', subtitle: 'Semua atau Tidak Sama Sekali', component: AtomicityAnimation },
              { id: 'consistency', title: 'Consistency', subtitle: 'Data Selalu Konsisten', component: ConsistencyAnimation },
              { id: 'isolation', title: 'Isolation', subtitle: 'Transaksi Independen', component: IsolationAnimation },
              { id: 'durability', title: 'Durability', subtitle: 'Data Permanen', component: DurabilityAnimation }
            ].map((prop) => (
              <div key={prop.id}>
                <button
                  onClick={() => setExpandedSection(expandedSection === prop.id ? null : prop.id)}
                  className="w-full text-left p-4 rounded-lg transition-all mb-4"
                  style={{
                    background: expandedSection === prop.id ? 'rgba(100, 200, 255, 0.15)' : 'rgba(100, 200, 255, 0.08)',
                    border: expandedSection === prop.id ? '2px solid #64c8ff' : '1px solid rgba(100, 200, 255, 0.2)'
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold" style={{ color: '#64c8ff' }}>{prop.title}</h3>
                      <p style={{ color: '#708090', marginTop: '4px' }}>{prop.subtitle}</p>
                    </div>
                    <ChevronDown
                      size={24}
                      style={{
                        color: '#64c8ff',
                        transform: expandedSection === prop.id ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s'
                      }}
                    />
                  </div>
                </button>

                {expandedSection === prop.id && (
                  <div className="mb-8 animate-float">
                    <prop.component />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Locks Tab */}
        {activeTab === 'locks' && (
          <div className="space-y-8 animate-float">
            <div style={{ background: 'rgba(100, 200, 255, 0.08)', border: '1px solid rgba(100, 200, 255, 0.2)', borderRadius: '12px', padding: '20px' }}>
              <h3 className="text-lg font-bold mb-4" style={{ color: '#64c8ff' }}>🔐 Visualisasi Lock Mekanisme</h3>
              <LockMechanismAnimation />
              <div className="mt-4 p-4" style={{ background: 'rgba(0, 0, 0, 0.2)', borderRadius: '8px' }}>
                <p style={{ color: '#a0c8ff', fontSize: '18px' }}>
                  <strong>Keterangan:</strong> Animasi di atas menunjukkan bagaimana Shared Lock memungkinkan multiple readers,
                  sementara Exclusive Lock memberikan akses eksklusif untuk writer dan mem-block readers lain.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Isolation Tab */}
        {activeTab === 'isolation' && (
          <div className="space-y-8 animate-float">
            <div style={{ background: 'rgba(100, 200, 255, 0.08)', border: '1px solid rgba(100, 200, 255, 0.2)', borderRadius: '12px', padding: '20px' }}>
              <h3 className="text-lg font-bold mb-4" style={{ color: '#64c8ff' }}>📊 Isolation Levels Comparison</h3>
              <IsolationComparisonChart />
            </div>

            <div style={{ background: 'rgba(100, 200, 255, 0.08)', border: '1px solid rgba(100, 200, 255, 0.2)', borderRadius: '12px', padding: '20px' }}>
              <h3 className="text-lg font-bold mb-4" style={{ color: '#64c8ff' }}>🎬 Simulasi Isolasi Transaksi</h3>
              <IsolationAnimation />
            </div>
          </div>
        )}

        {/* Deadlock Tab */}
        {activeTab === 'deadlock' && (
          <div className="space-y-8 animate-float">
            <div style={{ background: 'rgba(100, 200, 255, 0.08)', border: '1px solid rgba(100, 200, 255, 0.2)', borderRadius: '12px', padding: '20px' }}>
              <h3 className="text-lg font-bold mb-4" style={{ color: '#f87171' }}>💥 Visualisasi Deadlock</h3>
              <DeadlockAnimation />
            </div>

            <div style={{ background: 'rgba(74, 222, 128, 0.1)', border: '1px solid rgba(74, 222, 128, 0.3)', borderRadius: '12px', padding: '20px' }}>
              <h3 className="text-lg font-bold mb-4" style={{ color: '#4ade80' }}>✅ Strategi Pencegahan</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: '1. Konsistensi Urutan', desc: 'Selalu lock dalam urutan yang sama' },
                  { title: '2. Timeout Mekanisme', desc: 'Set timeout untuk menghindari tunggu infinite' },
                  { title: '3. Lock Granularity', desc: 'Gunakan row-level lock daripada table-level' },
                  { title: '4. Durasi Minimal', desc: 'Kurangi waktu transaksi memegang lock' },
                  { title: '5. Deteksi Otomatis', desc: 'Sistem rollback transaksi jika deadlock' },
                  { title: '6. MVCC', desc: 'Multi-version concurrency control untuk concurrency' }
                ].map((strategy, idx) => (
                  <div key={idx} style={{ background: 'rgba(0, 0, 0, 0.2)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(74, 222, 128, 0.2)', animationDelay: `${idx * 0.1}s`}} className="animate-float" >
                    <p style={{ color: '#4ade80', fontWeight: 'bold', marginBottom: '6px' }}>{strategy.title}</p>
                    <p style={{ color: '#a0c8ff', fontSize: '17px' }}>{strategy.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer style={{ background: 'rgba(15, 20, 25, 0.5)', borderTop: '1px solid rgba(100, 200, 255, 0.2)', marginTop: '60px', padding: '40px 0', textAlign: 'center' }}>
        <p style={{ color: '#708090', fontSize: '18px' }}>
          💡 Animasi interaktif membantu memahami konsep Lock & ACID yang kompleks menjadi lebih visual dan intuitif
        </p>
      </footer>
    </div>
  );
};

export default AnimatedLockACIDModule;