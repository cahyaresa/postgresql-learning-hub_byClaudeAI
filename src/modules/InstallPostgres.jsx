import React, { useState } from 'react'

const steps = [
  {
    id: 0,
    title: 'Download PostgreSQL Source',
    icon: '⬇️',
    color: '#64c8ff',
    desc: 'Download source tarball dari website resmi PostgreSQL.',
    commands: [],
    notes: [
      'Buka https://www.postgresql.org/ftp/source/',
      'Pilih versi yang diinginkan (contoh: v18.3)',
      'Download file postgresql-18.3.tar.gz',
      'Simpan ke direktori kerja, misalnya ~/Downloads atau ~/Documents/postgres-training/',
    ],
    detail: `File yang didownload adalah source code PostgreSQL dalam format .tar.gz.
Kompilasi dari source memberikan kontrol penuh atas lokasi instalasi dan fitur yang dikompilasi,
berbeda dengan instalasi dari package manager (apt/yum) yang menggunakan path default sistem.`,
  },
  {
    id: 1,
    title: 'Extract Source Tarball',
    icon: '📦',
    color: '#4ade80',
    desc: 'Extract file .tar.gz ke direktori saat ini.',
    commands: [
      { cmd: 'tar -xf postgresql-18.3.tar.gz', note: 'Extract tanpa verbose. Hasilkan folder postgresql-18.3/' },
      { cmd: 'ls -lh', note: 'Verifikasi folder hasil extract' },
    ],
    notes: [
      'Flag -x = extract, -f = file input',
      'Tambah -v untuk verbose (tampilkan setiap file saat diekstrak)',
      'Hasilkan direktori postgresql-18.3/ berisi seluruh source code',
    ],
    detail: `Setelah extract, direktori postgresql-18.3/ berisi:
- configure       : script autoconf untuk deteksi environment
- src/            : source code C utama PostgreSQL
- doc/            : dokumentasi
- contrib/        : modul-modul tambahan (pg_stat_statements, dll)`,
  },
  {
    id: 2,
    title: 'Masuk ke Direktori Source',
    icon: '📂',
    color: '#fbbf24',
    desc: 'Pindah ke direktori source PostgreSQL.',
    commands: [
      { cmd: 'cd postgresql-18.3/', note: 'Masuk ke direktori source' },
      { cmd: 'ls', note: 'Lihat isi direktori — pastikan ada file configure' },
    ],
    notes: [
      'Semua perintah selanjutnya dijalankan dari dalam direktori ini',
      'File configure adalah entry point proses build',
      'Jangan pindah direktori di tengah proses build',
    ],
    detail: null,
  },
  {
    id: 3,
    title: 'Eksplorasi Opsi Configure',
    icon: '🔍',
    color: '#a78bfa',
    desc: 'Lihat semua opsi ./configure sebelum menjalankannya.',
    commands: [
      { cmd: './configure --help | less', note: 'Tampilkan semua opsi, gunakan q untuk keluar dari less' },
      { cmd: './configure --help | grep prefix', note: 'Cari opsi --prefix saja' },
    ],
    notes: [
      '--prefix     : direktori instalasi target',
      '--with-openssl: aktifkan SSL support',
      '--without-icu: nonaktifkan ICU (International Components for Unicode)',
      '--enable-debug: aktifkan debug symbols (untuk development)',
      '--with-python : tambahkan PL/Python language',
    ],
    detail: `Beberapa opsi penting:
--prefix=DIR          Lokasi instalasi (default: /usr/local/pgsql)
--without-icu         Tidak perlu library ICU (lebih sederhana untuk training)
--with-openssl        Aktifkan SSL (butuh libssl-dev)
--enable-debug        Compile dengan debug info (memperbesar binary)
--with-pgport=PORT    Port default (default: 5432)`,
  },
  {
    id: 4,
    title: 'Jalankan ./configure',
    icon: '⚙️',
    color: '#f87171',
    desc: 'Konfigurasi build system dengan prefix instalasi kustom.',
    commands: [
      {
        cmd: './configure --prefix=/home/$(whoami)/Documents/postgres-training/training/apps/psql/18.3 --without-icu',
        note: '$(whoami) otomatis diganti username Anda'
      },
      {
        cmd: './configure --prefix=/home/agrresac9704/Documents/postgres-training/training/apps/psql/18.3 --without-icu',
        note: 'Atau ganti manual dengan username Anda'
      },
    ],
    notes: [
      '--prefix menentukan lokasi install: bin/, lib/, share/ akan ada di sana',
      '--without-icu menghindari dependency ICU library (opsional)',
      'Jika configure gagal, baca error terakhir — biasanya missing dependency',
      'configure berhasil jika muncul: "config.status: linking src/backend/port/..."',
    ],
    detail: `Perintah configure melakukan:
1. Deteksi compiler (gcc/clang)
2. Cek semua library yang diperlukan (readline, zlib, dll)
3. Generate Makefile yang sesuai dengan environment
4. Set --prefix sebagai target instalasi

Jika muncul error "configure: error: readline library not found",
jalankan langkah 8 (install libreadline-dev) lalu ulangi configure.`,
  },
  {
    id: 5,
    title: 'Install Dependency: bison',
    icon: '🔧',
    color: '#38bdf8',
    desc: 'Install GNU Bison — parser generator yang dibutuhkan untuk kompilasi SQL grammar PostgreSQL.',
    commands: [
      { cmd: 'sudo apt-get install bison', note: 'Install bison via apt' },
      { cmd: 'bison --version', note: 'Verifikasi instalasi berhasil' },
    ],
    notes: [
      'Bison digunakan untuk generate SQL parser dari gram.y',
      'Dibutuhkan saat kompilasi, tidak dibutuhkan saat runtime',
      'Versi minimum: bison 2.3',
      'Jika sudah terinstall, apt akan menampilkan "bison is already the newest version"',
    ],
    detail: `PostgreSQL menggunakan Bison untuk mengkompilasi file src/backend/parser/gram.y
menjadi C code yang bisa mem-parse SQL query.
Tanpa Bison, proses make akan gagal dengan error "gram.y not found" atau "bison not found".`,
  },
  {
    id: 6,
    title: 'Install Dependency: flex',
    icon: '🔧',
    color: '#34d399',
    desc: 'Install Flex — lexical scanner generator untuk tokenisasi SQL input.',
    commands: [
      { cmd: 'sudo apt-get install flex', note: 'Install flex via apt' },
      { cmd: 'flex --version', note: 'Verifikasi instalasi berhasil' },
    ],
    notes: [
      'Flex digunakan bersama Bison untuk parsing SQL',
      'Generate lexer dari file .l (scan.l, dst)',
      'Versi minimum: flex 2.5.31',
      'Bison + Flex bekerja bersama: Flex tokenize, Bison parse',
    ],
    detail: `Flex memproses file seperti src/backend/parser/scan.l untuk
menghasilkan C code yang memecah raw SQL text menjadi token-token
(keyword, identifier, literal, operator, dll) sebelum dikirim ke Bison parser.`,
  },
  {
    id: 7,
    title: 'Install Dependency: libreadline-dev',
    icon: '🔧',
    color: '#fb923c',
    desc: 'Install GNU Readline development headers — dibutuhkan untuk psql interactive shell.',
    commands: [
      { cmd: 'sudo apt-get install libreadline-dev', note: 'Install readline dev headers' },
      { cmd: 'dpkg -l | grep libreadline', note: 'Verifikasi package terinstall' },
    ],
    notes: [
      'Readline memberi fitur: history (↑↓), tab completion, line editing di psql',
      'Tanpa readline, psql masih bisa jalan tapi tanpa fitur interaktif',
      'Bisa bypass dengan --without-readline pada configure, tapi tidak disarankan',
      'Package -dev berisi header (.h) yang dibutuhkan saat kompilasi',
    ],
    detail: `libreadline-dev menyediakan:
- Header file readline/readline.h untuk kompilasi
- Library libreadline.so untuk linking

Hasilnya: psql bisa menggunakan arrow keys, Ctrl+R history search,
Tab completion untuk nama tabel/kolom, dan riwayat command antar sesi.`,
  },
  {
    id: 8,
    title: 'Kompilasi Source (make)',
    icon: '🔨',
    color: '#e879f9',
    desc: 'Kompilasi seluruh source code PostgreSQL menjadi binary.',
    commands: [
      { cmd: 'make', note: 'Kompilasi single-thread (lambat, tapi aman)' },
      { cmd: 'make -j$(nproc)', note: 'Kompilasi parallel (lebih cepat) — gunakan semua CPU core' },
    ],
    notes: [
      'Proses ini memakan waktu 5–20 menit tergantung spesifikasi mesin',
      '-j$(nproc) menggunakan semua core CPU untuk kompilasi parallel',
      'Output terakhir yang sukses: "All of PostgreSQL successfully made. Ready to install."',
      'Jika ada error, scroll ke atas untuk melihat pesan error pertama',
    ],
    detail: `make membaca Makefile yang dihasilkan oleh configure dan:
1. Kompilasi semua file .c menjadi .o (object files)
2. Link object files menjadi binary (postgres, psql, pg_ctl, dll)
3. Build semua contrib modules

Jika make gagal karena missing dependency, install dependency tersebut,
lalu jalankan ulang ./configure dan make dari awal.`,
  },
  {
    id: 9,
    title: 'Install Binary (make install)',
    icon: '✅',
    color: '#4ade80',
    desc: 'Salin binary, library, dan file konfigurasi ke direktori --prefix.',
    commands: [
      { cmd: 'make install', note: 'Install ke path yang ditentukan --prefix' },
      { cmd: 'ls ~/Documents/postgres-training/training/apps/psql/18.3/', note: 'Verifikasi struktur direktori instalasi' },
      { cmd: 'ls ~/Documents/postgres-training/training/apps/psql/18.3/bin/', note: 'Cek binary yang terinstall' },
    ],
    notes: [
      'Tidak perlu sudo karena prefix ada di home directory user',
      'Hasilkan struktur: bin/ lib/ include/ share/',
      'bin/ berisi: postgres, psql, pg_ctl, initdb, pg_dump, dll',
      'Langkah selanjutnya: initdb untuk inisialisasi cluster database',
    ],
    detail: `Setelah make install berhasil, struktur direktori:
~/Documents/postgres-training/training/apps/psql/18.3/
├── bin/          ← postgres, psql, pg_ctl, initdb, pg_dump, ...
├── include/      ← header files (untuk develop extension)
├── lib/          ← library files (.so)
└── share/        ← timezone data, locale, SQL templates

Langkah selanjutnya setelah install:
1. export PATH=~/.../.../18.3/bin:$PATH
2. initdb -D ~/.../.../18.3/data
3. pg_ctl -D ~/.../.../18.3/data start`,
  },
]

const InstallPostgresModule = () => {
  const [activeStep, setActiveStep] = useState(null)
  const [copied, setCopied] = useState(null)

  const copyCmd = (cmd, idx) => {
    navigator.clipboard.writeText(cmd)
    setCopied(idx)
    setTimeout(() => setCopied(null), 1500)
  }

  return (
    <div style={{ background: 'linear-gradient(135deg, #0f1419 0%, #1a2332 100%)', minHeight: '100vh' }}>
      <style>{`
        @keyframes float-up {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .step-card { transition: all 0.25s ease; }
        .step-card:hover { transform: translateX(4px); }
      `}</style>

      {/* Header */}
      <header style={{ borderBottom: '1px solid rgba(100, 200, 255, 0.2)', background: 'rgba(15, 20, 25, 0.8)' }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '40px 24px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '8px', color: '#e0f2ff' }}>
            Install PostgreSQL dari Source 🐘
          </h1>
          <p style={{ color: '#a0c8ff', fontSize: '20px' }}>
            Kompilasi dan instalasi PostgreSQL 18.3 dari source code ke direktori kustom
          </p>
        </div>
      </header>

      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '40px 24px', animation: 'float-up 0.5s ease-out' }}>

        {/* Progress bar */}
        <div style={{ display: 'flex', gap: '6px', marginBottom: '36px', flexWrap: 'wrap' }}>
          {steps.map(s => (
            <div
              key={s.id}
              onClick={() => setActiveStep(activeStep === s.id ? null : s.id)}
              style={{
                flex: '1 1 0',
                minWidth: '60px',
                padding: '8px 4px',
                borderRadius: '8px',
                background: activeStep === s.id ? `${s.color}33` : 'rgba(255,255,255,0.04)',
                border: `2px solid ${activeStep === s.id ? s.color : 'rgba(255,255,255,0.08)'}`,
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.2s',
              }}
            >
              <div style={{ fontSize: '22px', marginBottom: '2px' }}>{s.icon}</div>
              <div style={{ fontSize: '14px', color: activeStep === s.id ? s.color : '#708090', fontWeight: 'bold' }}>
                Step {s.id}
              </div>
            </div>
          ))}
        </div>

        {/* Steps list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {steps.map(step => {
            const isOpen = activeStep === step.id
            return (
              <div
                key={step.id}
                className="step-card"
                style={{
                  background: isOpen ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${isOpen ? step.color : 'rgba(255,255,255,0.08)'}`,
                  borderRadius: '12px',
                  overflow: 'hidden',
                }}
              >
                {/* Step header */}
                <div
                  onClick={() => setActiveStep(isOpen ? null : step.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '16px 20px',
                    cursor: 'pointer',
                    borderLeft: `4px solid ${step.color}`,
                  }}
                >
                  <div style={{
                    width: '32px', height: '32px', borderRadius: '50%',
                    background: `${step.color}22`, display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: '20px', flexShrink: 0,
                  }}>
                    {step.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ color: step.color, fontWeight: 'bold', fontSize: '16px' }}>
                        STEP {step.id}
                      </span>
                      <span style={{ color: '#e0f2ff', fontWeight: 'bold', fontSize: '18px' }}>
                        {step.title}
                      </span>
                    </div>
                    <p style={{ color: '#708090', fontSize: '16px', marginTop: '2px' }}>{step.desc}</p>
                  </div>
                  <span style={{ color: step.color, fontSize: '22px', transition: 'transform 0.25s', transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}>›</span>
                </div>

                {/* Step detail */}
                {isOpen && (
                  <div style={{ padding: '0 20px 20px 20px', borderTop: `1px solid ${step.color}22` }}>

                    {/* Commands */}
                    {step.commands.length > 0 && (
                      <div style={{ marginTop: '16px' }}>
                        <p style={{ color: step.color, fontWeight: 'bold', fontSize: '16px', marginBottom: '10px' }}>
                          🖥️ Command
                        </p>
                        {step.commands.map((c, i) => (
                          <div key={i} style={{ background: 'rgba(0,0,0,0.4)', borderRadius: '8px', marginBottom: '8px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', gap: '12px' }}>
                              <code style={{ color: '#86efac', fontFamily: 'monospace', fontSize: '16px', flex: 1, wordBreak: 'break-all' }}>
                                $ {c.cmd}
                              </code>
                              <button
                                onClick={() => copyCmd(c.cmd, `${step.id}-${i}`)}
                                style={{
                                  background: copied === `${step.id}-${i}` ? `${step.color}33` : 'rgba(255,255,255,0.06)',
                                  border: `1px solid ${copied === `${step.id}-${i}` ? step.color : 'rgba(255,255,255,0.1)'}`,
                                  borderRadius: '6px', padding: '4px 10px', cursor: 'pointer',
                                  color: copied === `${step.id}-${i}` ? step.color : '#708090', fontSize: '15px',
                                  flexShrink: 0, transition: 'all 0.2s',
                                }}
                              >
                                {copied === `${step.id}-${i}` ? '✓ Copied' : 'Copy'}
                              </button>
                            </div>
                            {c.note && (
                              <div style={{ padding: '6px 14px 10px', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                                <p style={{ color: '#708090', fontSize: '15px' }}>💬 {c.note}</p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Notes */}
                    {step.notes.length > 0 && (
                      <div style={{ marginTop: '14px', background: `${step.color}0d`, border: `1px solid ${step.color}22`, borderRadius: '8px', padding: '12px 16px' }}>
                        <p style={{ color: step.color, fontWeight: 'bold', fontSize: '16px', marginBottom: '8px' }}>📌 Notes</p>
                        <ul style={{ color: '#a0c8ff', fontSize: '16px', marginLeft: '12px', lineHeight: '1.9' }}>
                          {step.notes.map((n, i) => <li key={i}>· {n}</li>)}
                        </ul>
                      </div>
                    )}

                    {/* Detail */}
                    {step.detail && (
                      <div style={{ marginTop: '14px', background: 'rgba(0,0,0,0.25)', borderRadius: '8px', padding: '12px 16px', borderLeft: `3px solid ${step.color}` }}>
                        <p style={{ color: step.color, fontWeight: 'bold', fontSize: '16px', marginBottom: '8px' }}>ℹ️ Detail</p>
                        <pre style={{ color: '#a0c8ff', fontSize: '15px', whiteSpace: 'pre-wrap', fontFamily: 'inherit', lineHeight: '1.8', margin: 0 }}>
                          {step.detail}
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Summary quick reference */}
        <div style={{ marginTop: '40px', background: 'rgba(100, 200, 255, 0.06)', border: '1px solid rgba(100, 200, 255, 0.2)', borderRadius: '12px', padding: '20px' }}>
          <h4 style={{ color: '#64c8ff', fontWeight: 'bold', fontSize: '18px', marginBottom: '14px' }}>
            ⚡ Quick Reference — Semua Perintah
          </h4>
          <pre style={{ background: 'rgba(0,0,0,0.4)', padding: '16px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '15px', color: '#a0c8ff', overflow: 'auto', lineHeight: '2' }}>
{`# Step 1 — Extract
tar -xf postgresql-18.3.tar.gz

# Step 2 — Masuk direktori
cd postgresql-18.3/

# Step 3 — Lihat opsi (opsional)
./configure --help | less

# Step 4 — Configure dengan prefix kustom
./configure --prefix=/home/$(whoami)/Documents/postgres-training/training/apps/psql/18.3 --without-icu

# Step 5-7 — Install dependencies
sudo apt-get install bison flex libreadline-dev

# Step 8 — Kompilasi (gunakan -j untuk parallel)
make -j$(nproc)

# Step 9 — Install
make install

# === Setelah install ===
export PATH=/home/$(whoami)/Documents/postgres-training/training/apps/psql/18.3/bin:$PATH
initdb -D /home/$(whoami)/Documents/postgres-training/training/apps/psql/18.3/data
pg_ctl -D /home/$(whoami)/Documents/postgres-training/training/apps/psql/18.3/data start`}
          </pre>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ background: 'rgba(15, 20, 25, 0.5)', borderTop: '1px solid rgba(100, 200, 255, 0.2)', marginTop: '60px', padding: '40px 0', textAlign: 'center' }}>
        <p style={{ color: '#708090', fontSize: '18px', marginBottom: '8px' }}>
          🐘 PostgreSQL Build from Source — Full Control Over Installation
        </p>
        <p style={{ color: '#708090', fontSize: '18px' }}>
          💡 Tip: Simpan path prefix ke ~/.bashrc agar bisa dipakai setiap sesi! 🚀
        </p>
      </footer>
    </div>
  )
}

export default InstallPostgresModule
