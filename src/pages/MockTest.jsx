import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle, XCircle, RotateCcw, ChevronRight, Trophy, BookOpen, Clock } from 'lucide-react'

// ─── Question bank — 10 questions per module ────────────────────────────────
const MODULES = [
  {
    id: 'install-postgres',
    title: '🎛️ Install PostgreSQL',
    path: '/install-postgres',
    questions: [
      {
        q: 'Perintah apa yang digunakan untuk mengecek semua opsi konfigurasi sebelum build dari source?',
        options: ['make configure', './configure --help', 'cmake --list-options', 'pg_config --show-all'],
        answer: 1,
      },
      {
        q: 'Setelah ./configure berhasil, langkah berikutnya yang benar adalah…',
        options: ['make install', 'make && make install', 'sudo apt install postgresql', 'initdb -D /pgdata'],
        answer: 1,
      },
      {
        q: 'Flag ./configure mana yang menentukan direktori instalasi utama PostgreSQL?',
        options: ['--with-pgdata', '--prefix=/usr/local/pgsql', '--datadir=/pgdata', '--bindir=/usr/bin'],
        answer: 1,
      },
      {
        q: 'Perintah apa yang dijalankan untuk menginisialisasi cluster database baru setelah instalasi?',
        options: ['pg_ctl init', 'initdb -D /pgdata', 'postgresql-setup initdb', 'createdb postgres'],
        answer: 1,
      },
      {
        q: 'File tarball source PostgreSQL biasanya diunduh dari…',
        options: ['github.com/postgres/postgres/releases', 'postgresql.org/ftp/source/', 'pgadmin.org/download', 'apt.postgresql.org'],
        answer: 1,
      },
      {
        q: 'Flag apa yang ditambahkan ke ./configure agar PostgreSQL mendukung enkripsi SSL?',
        options: ['--enable-ssl', '--with-openssl', '--with-ssl=openssl', '--tls-support'],
        answer: 1,
      },
      {
        q: 'Setelah make install, perintah apa yang memverifikasi versi PostgreSQL yang baru diinstall?',
        options: ['psql --version', 'postgres -V', 'pg_config --version', 'Semua jawaban di atas benar'],
        answer: 3,
      },
      {
        q: 'Direktori $PGDATA menyimpan apa?',
        options: ['Binary executable PostgreSQL', 'Data cluster (tabel, WAL, konfigurasi)', 'Log server', 'Extension library'],
        answer: 1,
      },
      {
        q: 'Dependensi build wajib untuk kompilasi PostgreSQL dari source adalah…',
        options: ['cmake, ninja, clang', 'gcc, make, readline, zlib', 'python3, pip, setuptools', 'go, cargo, node'],
        answer: 1,
      },
      {
        q: 'Perintah apa yang digunakan untuk mengekstrak file tar.gz dari source PostgreSQL?',
        options: ['unzip postgresql.zip', 'tar xf postgresql-*.tar.gz', 'gunzip postgresql.tar.gz', 'tar czf postgresql.tar.gz'],
        answer: 1,
      },
    ],
  },
  {
    id: 'pg-ctl',
    title: '🎛️ pg_ctl',
    path: '/pg-ctl',
    questions: [
      {
        q: 'Perintah pg_ctl mana yang menghentikan server PostgreSQL dan menunggu semua koneksi selesai?',
        options: ['pg_ctl stop -m fast', 'pg_ctl stop -m smart', 'pg_ctl stop -m immediate', 'pg_ctl shutdown'],
        answer: 1,
      },
      {
        q: 'Flag -D pada pg_ctl merujuk ke…',
        options: ['Debug mode', 'Data directory (PGDATA)', 'Database name', 'Daemon mode'],
        answer: 1,
      },
      {
        q: 'Mode stop apa yang paling cepat tetapi berisiko kehilangan transaksi uncommitted?',
        options: ['smart', 'fast', 'immediate', 'force'],
        answer: 2,
      },
      {
        q: 'Perintah pg_ctl untuk memuat ulang konfigurasi tanpa restart server adalah…',
        options: ['pg_ctl restart', 'pg_ctl reload', 'pg_ctl refresh', 'pg_ctl reconfigure'],
        answer: 1,
      },
      {
        q: 'Sinyal Unix mana yang setara dengan pg_ctl reload?',
        options: ['SIGTERM', 'SIGKILL', 'SIGHUP', 'SIGINT'],
        answer: 2,
      },
      {
        q: 'Flag -l pada pg_ctl digunakan untuk…',
        options: ['List semua database', 'Menentukan file log', 'Lock mode', 'Level log'],
        answer: 1,
      },
      {
        q: 'Perintah apa yang digunakan untuk mengecek status server PostgreSQL via pg_ctl?',
        options: ['pg_ctl info', 'pg_ctl check', 'pg_ctl status', 'pg_ctl ping'],
        answer: 2,
      },
      {
        q: 'Apa yang dilakukan pg_ctl promote?',
        options: ['Menaikkan privilege user', 'Mempromosikan standby menjadi primary', 'Meningkatkan max_connections', 'Mengaktifkan superuser'],
        answer: 1,
      },
      {
        q: 'pg_ctl start -w berarti…',
        options: ['Start dalam mode write-only', 'Tunggu hingga server benar-benar siap menerima koneksi', 'Start tanpa WAL', 'Start dengan timeout 1 detik'],
        answer: 1,
      },
      {
        q: 'Sinyal SIGTERM dikirim ke postmaster proses menghasilkan efek yang sama dengan…',
        options: ['pg_ctl stop -m immediate', 'pg_ctl stop -m smart', 'pg_ctl stop -m fast', 'pg_ctl reload'],
        answer: 1,
      },
    ],
  },
  {
    id: 'pg-ctl-vs-systemd',
    title: '🔄 pg_ctl vs systemd',
    path: '/pg-ctl-vs-systemd',
    questions: [
      {
        q: 'Keunggulan utama systemd dibandingkan pg_ctl untuk production adalah…',
        options: ['Lebih cepat startup', 'Auto-restart saat crash dan integrasi dengan boot system', 'Mendukung lebih banyak database', 'Output log lebih berwarna'],
        answer: 1,
      },
      {
        q: 'Perintah systemd untuk memulai PostgreSQL adalah…',
        options: ['systemd start postgresql', 'systemctl start postgresql', 'service postgresql start', 'init postgresql start'],
        answer: 1,
      },
      {
        q: 'Pada systemd unit file PostgreSQL, directive apa yang mendefinisikan kondisi restart otomatis?',
        options: ['AutoRestart=yes', 'Restart=on-failure', 'RestartOnCrash=true', 'RecoverMode=auto'],
        answer: 1,
      },
      {
        q: 'Perintah systemctl mana yang mengaktifkan PostgreSQL agar start otomatis saat boot?',
        options: ['systemctl activate postgresql', 'systemctl autostart postgresql', 'systemctl enable postgresql', 'systemctl boot postgresql'],
        answer: 2,
      },
      {
        q: 'pg_ctl cocok digunakan untuk lingkungan…',
        options: ['Production multi-server', 'Development dan testing lokal', 'Kubernetes deployment', 'Cloud managed database'],
        answer: 1,
      },
      {
        q: 'Perintah untuk melihat log PostgreSQL yang dikelola systemd adalah…',
        options: ['cat /var/log/postgresql.log', 'journalctl -u postgresql', 'pg_ctl log --show', 'syslog postgresql'],
        answer: 1,
      },
      {
        q: 'Dependency management (misalnya, tunggu network sebelum start) lebih mudah diimplementasi dengan…',
        options: ['pg_ctl', 'systemd unit file directives (After=, Wants=)', 'crontab @reboot', 'pg_hba.conf'],
        answer: 1,
      },
      {
        q: 'Perintah pg_ctl setara dengan "systemctl restart postgresql" adalah…',
        options: ['pg_ctl reload', 'pg_ctl stop && pg_ctl start', 'pg_ctl restart', 'pg_ctl stop -m fast && pg_ctl start'],
        answer: 2,
      },
      {
        q: 'Mengapa systemd direkomendasikan untuk production dibandingkan pg_ctl?',
        options: [
          'Systemd lebih mudah digunakan',
          'Systemd menyediakan lifecycle management, cgroups, restart policy, dan logging terpusat',
          'pg_ctl tidak bisa menangani crash',
          'Systemd mendukung PostgreSQL versi terbaru saja',
        ],
        answer: 1,
      },
      {
        q: 'Perintah untuk melihat status detail unit systemd PostgreSQL termasuk proses-nya adalah…',
        options: ['systemctl info postgresql', 'systemctl status postgresql', 'pg_ctl status -D /pgdata', 'ps aux | grep postgres'],
        answer: 1,
      },
    ],
  },
  {
    id: 'host-based-auth',
    title: '🔐 Host-Based Auth (HBA)',
    path: '/host-based-auth',
    questions: [
      {
        q: 'File konfigurasi mana yang mengontrol autentikasi koneksi client di PostgreSQL?',
        options: ['postgresql.conf', 'pg_hba.conf', 'pg_ident.conf', 'pg_auth.conf'],
        answer: 1,
      },
      {
        q: 'Pada baris pg_hba.conf, urutan field yang benar adalah…',
        options: ['host database user address method', 'type database user address auth-method', 'connection user database host method', 'auth host database user method'],
        answer: 1,
      },
      {
        q: 'Connection type "local" pada pg_hba.conf berarti koneksi via…',
        options: ['TCP/IP lokal (127.0.0.1)', 'Unix domain socket', 'SSL localhost', 'IPv6 loopback'],
        answer: 1,
      },
      {
        q: 'Auth method "trust" pada pg_hba.conf artinya…',
        options: ['Harus pakai SSL', 'Izin masuk tanpa password', 'Gunakan autentikasi LDAP', 'Hanya user tertentu yang boleh'],
        answer: 1,
      },
      {
        q: 'Connection type apa yang digunakan untuk koneksi TCP/IP terenkripsi SSL?',
        options: ['host', 'hostssl', 'hosttls', 'tcpssl'],
        answer: 1,
      },
      {
        q: 'Karakter wildcard apa yang digunakan di pg_hba.conf untuk mengizinkan semua database?',
        options: ['*', 'all', '%', 'ANY'],
        answer: 1,
      },
      {
        q: 'pg_hba.conf dibaca dengan urutan bagaimana?',
        options: ['Bottom-up, baris terakhir menang', 'Acak tiap koneksi', 'Top-down, baris pertama yang cocok dipakai', 'Berdasarkan prioritas auth method'],
        answer: 2,
      },
      {
        q: 'Auth method "scram-sha-256" adalah…',
        options: ['Metode deprecated sejak PostgreSQL 14', 'Metode password hashing yang direkomendasikan (lebih aman dari md5)', 'Enkripsi SSL level transport', 'Plugin autentikasi pihak ketiga'],
        answer: 1,
      },
      {
        q: 'Apa yang harus dilakukan setelah mengubah pg_hba.conf agar perubahan aktif?',
        options: ['Restart PostgreSQL', 'pg_ctl reload atau SELECT pg_reload_conf()', 'Edit postgresql.conf juga', 'Tidak perlu tindakan apapun'],
        answer: 1,
      },
      {
        q: 'Entry pg_hba.conf mana yang mengizinkan user "app" dari subnet 10.0.1.0/24 dengan autentikasi scram-sha-256?',
        options: [
          'local all app 10.0.1.0/24 scram-sha-256',
          'host all app 10.0.1.0/24 scram-sha-256',
          'hostssl all app 10.0.1.0/24 scram-sha-256',
          'tcp all app 10.0.1.0/24 scram-sha-256',
        ],
        answer: 1,
      },
    ],
  },
  {
    id: 'transaction-log',
    title: '📝 Transaction Log (WAL)',
    path: '/transaction-log',
    questions: [
      {
        q: 'WAL singkatan dari…',
        options: ['Write After Log', 'Write-Ahead Logging', 'Write Append Locking', 'Wal Archive Log'],
        answer: 1,
      },
      {
        q: 'Tujuan utama WAL di PostgreSQL adalah…',
        options: ['Mempercepat query SELECT', 'Menjamin durabilitas dan memungkinkan crash recovery', 'Mengompres data tabel', 'Mengelola koneksi client'],
        answer: 1,
      },
      {
        q: 'LSN singkatan dari apa dan digunakan untuk…',
        options: ['Log Sequence Name — nama file WAL', 'Log Segment Number — nomor segment WAL', 'Log Sequence Number — posisi byte unik dalam WAL stream', 'Last Sync Notification — event sinkronisasi'],
        answer: 2,
      },
      {
        q: 'Checkpoint dalam PostgreSQL berfungsi untuk…',
        options: ['Menghapus semua data lama', 'Menulis dirty pages dari shared_buffers ke disk dan menandai titik pemulihan yang aman', 'Membuat snapshot tabel', 'Menutup semua koneksi idle'],
        answer: 1,
      },
      {
        q: 'File WAL disimpan di direktori…',
        options: ['$PGDATA/pg_log', '$PGDATA/pg_wal', '$PGDATA/pg_archive', '$PGDATA/wal_files'],
        answer: 1,
      },
      {
        q: 'Perintah untuk menganalisis isi file WAL secara langsung adalah…',
        options: ['pg_walread', 'pg_waldump', 'psql --wal-inspect', 'pg_filedump --wal'],
        answer: 1,
      },
      {
        q: 'XMIN pada sebuah baris tuple merujuk ke…',
        options: ['Minimum nilai kolom', 'Transaction ID yang menginsert baris tersebut', 'Versi minimum PostgreSQL', 'Waktu minimum retensi data'],
        answer: 1,
      },
      {
        q: 'MVCC (Multi-Version Concurrency Control) di PostgreSQL bekerja dengan cara…',
        options: ['Lock eksklusif di setiap baris yang diakses', 'Menyimpan versi lama baris (tuple) sehingga reader tidak memblokir writer', 'Menyalin seluruh tabel untuk setiap transaksi', 'Menggunakan snapshot tabel di RAM'],
        answer: 1,
      },
      {
        q: 'Parameter postgresql.conf mana yang mengontrol seberapa sering checkpoint terjadi berdasarkan waktu?',
        options: ['checkpoint_interval', 'checkpoint_timeout', 'checkpoint_frequency', 'wal_checkpoint_time'],
        answer: 1,
      },
      {
        q: 'Transaction ID Wraparound adalah masalah ketika…',
        options: ['Terlalu banyak transaksi simultan', 'XID 32-bit habis dan kembali ke 0, berpotensi membuat data lama tampak "di masa depan"', 'Ukuran WAL melebihi disk', 'Checkpoint terlalu sering terjadi'],
        answer: 1,
      },
    ],
  },
  {
    id: 'memory-management',
    title: '🧠 Memory Management',
    path: '/memory-management',
    questions: [
      {
        q: 'Apa yang dimaksud dengan Virtual Address Space (VAS)?',
        options: ['RAM fisik yang tersedia di server', 'Ruang alamat logis yang dilihat setiap proses, dimap ke memori fisik oleh OS', 'Ukuran swap partition', 'Kapasitas L1/L2 CPU cache'],
        answer: 1,
      },
      {
        q: 'Segmen memori "BSS" menyimpan…',
        options: ['Kode executable program', 'Variabel statis/global yang belum diinisialisasi (zero-filled saat startup)', 'Data heap dari malloc', 'Stack function calls'],
        answer: 1,
      },
      {
        q: 'Perbedaan utama antara heap memory dan stack memory adalah…',
        options: [
          'Heap lebih cepat dari stack',
          'Stack untuk alokasi dinamis (malloc), heap untuk rekursi',
          'Heap untuk alokasi dinamis (malloc/new), stack untuk function calls & variabel lokal',
          'Keduanya identik di sistem modern',
        ],
        answer: 2,
      },
      {
        q: 'Page fault terjadi ketika…',
        options: ['CPU melakukan division by zero', 'Proses mengakses halaman memori virtual yang belum dipetakan ke memori fisik', 'RAM penuh dan swap aktif', 'Stack overflow terdeteksi'],
        answer: 1,
      },
      {
        q: 'TLB (Translation Lookaside Buffer) berfungsi sebagai…',
        options: ['Cache untuk terjemahan alamat virtual ke fisik agar tidak selalu query page table', 'Buffer WAL di CPU', 'L3 CPU cache', 'Swap cache di disk'],
        answer: 0,
      },
      {
        q: 'Kernel space vs User space — perbedaannya adalah…',
        options: [
          'Kernel space untuk database, user space untuk aplikasi web',
          'Kernel space memiliki akses penuh ke hardware, user space terisolasi dan harus syscall untuk akses hardware',
          'User space lebih cepat karena tidak ada proteksi',
          'Keduanya identik di Linux modern',
        ],
        answer: 1,
      },
      {
        q: 'Process isolation dalam konteks memori berarti…',
        options: ['Setiap proses berbagi address space yang sama', 'Setiap proses memiliki virtual address space sendiri yang terisolasi dari proses lain', 'Proses tidak bisa berkomunikasi satu sama lain', 'OS memblokir semua akses memori antar proses'],
        answer: 1,
      },
      {
        q: 'Segmen "Text" (code segment) bersifat read-only karena…',
        options: ['Keterbatasan hardware CPU lama', 'Mencegah self-modifying code dan memungkinkan sharing kode yang sama antar proses', 'Menghemat RAM', 'Syarat ABI (Application Binary Interface)'],
        answer: 1,
      },
      {
        q: 'Apa yang terjadi ketika stack overflow terjadi?',
        options: ['Data heap ikut rusak', 'Proses menerima sinyal SIGSEGV (segmentation fault) dan biasanya crash', 'OS otomatis memperbesar stack', 'Program pindah ke heap'],
        answer: 1,
      },
      {
        q: 'Paging di OS modern memungkinkan…',
        options: ['Program menggunakan memori virtual lebih besar dari RAM fisik yang tersedia', 'CPU akses disk langsung', 'Proses berbagi stack memory', 'Zero-copy network'],
        answer: 0,
      },
    ],
  },
  {
    id: 'tablespaces',
    title: '🗂️ Tablespaces',
    path: '/tablespaces',
    questions: [
      {
        q: 'Tablespace di PostgreSQL adalah…',
        options: ['Nama lain untuk schema', 'Pemetaan nama logis ke lokasi direktori fisik di filesystem', 'Partisi disk khusus PostgreSQL', 'Tabel metadata internal'],
        answer: 1,
      },
      {
        q: 'Dua tablespace default yang selalu ada di setiap cluster PostgreSQL adalah…',
        options: ['public dan private', 'pg_default dan pg_global', 'main dan temp', 'data dan index'],
        answer: 1,
      },
      {
        q: 'pg_global tablespace menyimpan…',
        options: ['Data tabel user', 'Katalog sistem yang shared di seluruh cluster (pg_database, pg_roles)', 'File WAL', 'Index dari tabel user'],
        answer: 1,
      },
      {
        q: 'Perintah SQL untuk membuat tablespace baru adalah…',
        options: ['CREATE TABLESPACE fast_ssd LOCATION \'/mnt/ssd/pg\'', 'ADD TABLESPACE fast_ssd AT \'/mnt/ssd/pg\'', 'MAKE TABLESPACE fast_ssd PATH \'/mnt/ssd/pg\'', 'INIT TABLESPACE fast_ssd \'/mnt/ssd/pg\''],
        answer: 0,
      },
      {
        q: 'Kapan tablespace berguna untuk performance?',
        options: ['Selalu — semua tabel harus di tablespace custom', 'Menempatkan index panas di SSD NVMe dan data lama di HDD untuk trade-off cost/performance', 'Hanya untuk database > 1TB', 'Tablespace tidak mempengaruhi performance'],
        answer: 1,
      },
      {
        q: 'Untuk membuat tabel di tablespace tertentu, sintaks SQL-nya adalah…',
        options: [
          'CREATE TABLE t (...) IN TABLESPACE fast_ssd',
          'CREATE TABLE t (...) TABLESPACE fast_ssd',
          'CREATE TABLE t (...) AT TABLESPACE fast_ssd',
          'CREATE TABLE t (...) LOCATION fast_ssd',
        ],
        answer: 1,
      },
      {
        q: 'Hirarki storage PostgreSQL dari level tertinggi ke terendah adalah…',
        options: ['Page → Block → Table → Database → Cluster', 'Cluster → Database → Table → Page → Block', 'Database → Cluster → Table → Block', 'Block → Page → Table → Database'],
        answer: 1,
      },
      {
        q: 'Symlink digunakan di implementasi tablespace untuk…',
        options: ['Mempercepat query', 'Menghubungkan $PGDATA/pg_tblspc/<OID> ke direktori fisik tablespace', 'Backup otomatis', 'Enkripsi data'],
        answer: 1,
      },
      {
        q: 'Perintah untuk melihat semua tablespace yang ada adalah…',
        options: ['\\dt tablespaces', '\\db', 'SELECT * FROM pg_tablespace', 'Opsi b dan c benar'],
        answer: 3,
      },
      {
        q: 'Strategi "workload separation" menggunakan tablespace berarti…',
        options: ['Memisahkan OLTP dan OLAP ke server berbeda', 'Menempatkan tabel OLTP dan analytics di tablespace berbeda (SSD vs HDD) untuk menghindari resource contention', 'Menggunakan read replica', 'Membatasi max_connections per database'],
        answer: 1,
      },
    ],
  },
  {
    id: 'data-partitioning',
    title: '🗂️ Data Partitioning',
    path: '/data-partitioning',
    questions: [
      {
        q: 'Tiga jenis partitioning bawaan PostgreSQL adalah…',
        options: ['Row, Column, Hash', 'Range, List, Hash', 'Date, String, Integer', 'Horizontal, Vertical, Diagonal'],
        answer: 1,
      },
      {
        q: 'Range partitioning paling cocok untuk data yang…',
        options: ['Terdistribusi merata tanpa pola', 'Bersifat time-series (per tanggal/bulan/tahun)', 'Bertipe teks pendek', 'Diakses acak oleh banyak user'],
        answer: 1,
      },
      {
        q: 'Hash partitioning digunakan ketika…',
        options: ['Ada nilai diskrit yang jumlahnya terbatas', 'Tidak ada natural partition key dan ingin distribusi merata', 'Data diakses berurutan', 'Partition pruning berdasarkan tanggal'],
        answer: 1,
      },
      {
        q: 'Partition pruning adalah…',
        options: ['Menghapus partisi lama secara otomatis', 'PostgreSQL melewati scan partisi yang tidak relevan berdasarkan WHERE clause', 'Defragmentasi data dalam partisi', 'Rebalancing data antar partisi'],
        answer: 1,
      },
      {
        q: 'Sintaks SQL untuk membuat tabel dengan range partitioning pada kolom created_at adalah…',
        options: [
          'CREATE TABLE orders (...) PARTITION BY RANGE (created_at)',
          'CREATE TABLE orders (...) RANGE PARTITION ON created_at',
          'CREATE TABLE orders (...) WITH PARTITIONS RANGE (created_at)',
          'PARTITION TABLE orders BY RANGE created_at',
        ],
        answer: 0,
      },
      {
        q: 'TOAST (The Oversized-Attribute Storage Technique) digunakan untuk…',
        options: ['Mempercepat JOIN', 'Menyimpan nilai kolom yang terlalu besar untuk masuk satu page (8KB)', 'Backup otomatis data besar', 'Kompresi index'],
        answer: 1,
      },
      {
        q: 'Manfaat utama partitioning untuk maintenance adalah…',
        options: ['Hapus data lama sangat cepat via DROP TABLE partition vs DELETE baris satu per satu', 'Tidak perlu VACUUM', 'Index otomatis lebih kecil', 'Koneksi lebih efisien'],
        answer: 0,
      },
      {
        q: 'List partitioning cocok digunakan untuk…',
        options: ['Data time-series', 'Nilai diskrit seperti region, status, atau kategori (\'ASIA\', \'EUROPE\')', 'Load balancing merata', 'Data numerik kontinu'],
        answer: 1,
      },
      {
        q: 'Index pada tabel terpartisi di PostgreSQL bersifat…',
        options: ['Global — satu index untuk semua partisi', 'Local — index dibuat per-partisi secara terpisah', 'Tidak didukung pada tabel terpartisi', 'Hanya mendukung B-tree'],
        answer: 1,
      },
      {
        q: 'Cara menambah partisi baru pada tabel terpartisi adalah…',
        options: [
          'ALTER TABLE parent ADD PARTITION child',
          'CREATE TABLE child PARTITION OF parent FOR VALUES FROM (\'2025-01-01\') TO (\'2026-01-01\')',
          'INSERT PARTITION INTO parent',
          'EXTEND TABLE parent WITH PARTITION',
        ],
        answer: 1,
      },
    ],
  },
  {
    id: 'database-design',
    title: '🏗️ Database Design',
    path: '/database-design',
    questions: [
      {
        q: '"Single Source of Truth" dalam database design artinya…',
        options: ['Hanya satu server database yang boleh digunakan', 'Setiap data hanya disimpan di satu tempat, menghindari redundansi dan inkonsistensi', 'Satu tabel menyimpan semua data', 'Selalu pakai primary key integer'],
        answer: 1,
      },
      {
        q: 'Normalisasi 1NF (First Normal Form) mensyaratkan…',
        options: ['Semua kolom harus NOT NULL', 'Setiap kolom atomic (satu nilai), tidak ada repeating groups, dan ada primary key', 'Tidak ada foreign key', 'Semua tabel punya kolom "id"'],
        answer: 1,
      },
      {
        q: 'Foreign key constraint berfungsi untuk…',
        options: ['Mempercepat query JOIN', 'Menjaga referential integrity — nilai FK harus selalu merujuk ke baris valid di tabel parent', 'Membuat index otomatis', 'Menduplikasi data untuk redundansi'],
        answer: 1,
      },
      {
        q: 'Tahap "Conceptual Design" dalam proses database design menghasilkan…',
        options: ['DDL SQL langsung siap dieksekusi', 'ER Diagram — representasi entitas dan relasi tanpa memikirkan implementasi fisik', 'Index dan partisi', 'Tipe data kolom yang dipilih'],
        answer: 1,
      },
      {
        q: 'Kapan denormalisasi (de-normalization) bisa dibenarkan?',
        options: ['Selalu — denormalisasi meningkatkan performa', 'Saat query JOIN sangat berat di produksi dan ada trade-off konsisten yang dapat dikelola', 'Tidak pernah dibenarkan', 'Hanya untuk database < 1GB'],
        answer: 1,
      },
      {
        q: 'Konvensi penamaan "snake_case" untuk kolom dipilih karena…',
        options: ['PostgreSQL tidak mendukung camelCase', 'Konsistensi dan keterbacaan; PostgreSQL case-insensitive untuk identifier tanpa quotes', 'Performa lebih baik', 'Standar ISO SQL mengharuskannya'],
        answer: 1,
      },
      {
        q: '"Constraints as Documentation" berarti…',
        options: ['Tulis komentar SQL untuk setiap constraint', 'NOT NULL, UNIQUE, CHECK constraints adalah kontrak yang dienforce otomatis oleh database', 'Export constraint ke file Markdown', 'Gunakan trigger sebagai pengganti constraint'],
        answer: 1,
      },
      {
        q: 'Tipe data yang tepat untuk menyimpan harga keuangan (hindari floating point error) adalah…',
        options: ['FLOAT', 'DOUBLE PRECISION', 'NUMERIC(10,2)', 'REAL'],
        answer: 2,
      },
      {
        q: 'Physical design database mencakup…',
        options: ['Menggambar ER diagram', 'Pemilihan tipe data, definisi index, partitioning, dan tablespace', 'Wawancara stakeholder untuk requirements', 'Normalisasi tabel'],
        answer: 1,
      },
      {
        q: '"Plan for Change" dalam database design berarti…',
        options: ['Selalu redesign schema setiap tahun', 'Desain schema agar ALTER TABLE mudah: hindari tabel sangat lebar, gunakan migration versioning', 'Gunakan schema-less (NoSQL) saja', 'Simpan semua data dalam satu tabel besar'],
        answer: 1,
      },
    ],
  },
  {
    id: 'rdbms-types',
    title: '🔢 RDBMS & Data Types',
    path: '/rdbms-types',
    questions: [
      {
        q: 'Tipe data mana yang harus digunakan untuk menyimpan ID yang mungkin melebihi 2.1 miliar?',
        options: ['INTEGER', 'SMALLINT', 'BIGINT', 'NUMERIC'],
        answer: 2,
      },
      {
        q: 'Perbedaan antara CHAR(n) dan VARCHAR(n) di PostgreSQL adalah…',
        options: ['CHAR lebih cepat karena fixed-length; VARCHAR lebih fleksibel', 'Keduanya identik di PostgreSQL modern', 'CHAR hanya untuk single character', 'VARCHAR tidak mendukung index'],
        answer: 1,
      },
      {
        q: 'Mengapa TEXT lebih direkomendasikan daripada VARCHAR(n) untuk kolom teks bebas di PostgreSQL?',
        options: ['TEXT lebih cepat', 'TEXT tidak perlu mendefinisikan panjang maksimum dan performance-nya sama dengan VARCHAR di PostgreSQL', 'TEXT menggunakan lebih sedikit storage', 'VARCHAR(n) deprecated di PostgreSQL 15'],
        answer: 1,
      },
      {
        q: 'Tipe TIMESTAMPTZ berbeda dari TIMESTAMP karena…',
        options: ['TIMESTAMPTZ menyimpan timezone info sehingga aman untuk aplikasi multi-zona waktu', 'TIMESTAMPTZ lebih presisi (nanosecond)', 'TIMESTAMP tidak bisa diindeks', 'TIMESTAMPTZ menggunakan lebih sedikit storage'],
        answer: 0,
      },
      {
        q: 'Kapan menggunakan JSONB daripada JSON di PostgreSQL?',
        options: ['Saat data JSON sering diinsert tapi jarang dibaca', 'Saat perlu indexing dan query GIN pada field JSON — JSONB disimpan dalam format binary dan bisa diindeks', 'JSON dan JSONB identik performanya', 'JSONB hanya tersedia di PostgreSQL 16+'],
        answer: 1,
      },
      {
        q: 'Tipe UUID paling cocok digunakan sebagai primary key ketika…',
        options: ['Selalu lebih baik dari BIGINT', 'Perlu ID yang globally unique tanpa koordinasi (distributed system, merge dari banyak sumber)', 'Data berukuran besar', 'Query membutuhkan range scan'],
        answer: 1,
      },
      {
        q: 'Array type di PostgreSQL memungkinkan…',
        options: ['Menyimpan multiple nilai dalam satu kolom (misalnya tags TEXT[])', 'Hanya untuk tipe integer', 'Tidak mendukung indexing', 'Dipakai sebagai pengganti foreign key'],
        answer: 0,
      },
      {
        q: 'CITEXT berbeda dari TEXT dalam hal…',
        options: ['CITEXT tidak bisa diindeks', 'CITEXT case-insensitive dalam perbandingan string, berguna untuk email lookup', 'CITEXT hanya mendukung ASCII', 'CITEXT menggunakan encoding berbeda'],
        answer: 1,
      },
      {
        q: 'Tipe BOOLEAN di PostgreSQL menerima nilai…',
        options: ['Hanya 0 dan 1', 'TRUE, FALSE, dan NULL', 'true, false, yes, no, on, off, 1, 0 (case-insensitive)', 'Opsi b dan c keduanya benar'],
        answer: 3,
      },
      {
        q: 'Tipe NUMERIC(p, s) — p dan s masing-masing berarti…',
        options: ['p = presisi total digit, s = jumlah digit desimal (scale)', 'p = panjang string, s = storage bytes', 'p = max nilai, s = min nilai', 'p = primary, s = secondary precision'],
        answer: 0,
      },
    ],
  },
  {
    id: 'sql-syntax',
    title: '📝 SQL Syntax',
    path: '/sql-syntax',
    questions: [
      {
        q: 'DDL (Data Definition Language) mencakup perintah…',
        options: ['SELECT, INSERT, UPDATE, DELETE', 'CREATE, ALTER, DROP, TRUNCATE', 'BEGIN, COMMIT, ROLLBACK', 'GRANT, REVOKE, DENY'],
        answer: 1,
      },
      {
        q: 'Perbedaan antara DELETE dan TRUNCATE adalah…',
        options: ['TRUNCATE lebih lambat karena menghapus baris satu per satu', 'DELETE bisa di-WHERE-filter dan bisa di-rollback; TRUNCATE menghapus semua baris sekaligus dan lebih cepat', 'TRUNCATE tidak bisa dipakai di tabel dengan FK', 'Opsi b dan c keduanya benar'],
        answer: 3,
      },
      {
        q: 'LEFT JOIN mengembalikan…',
        options: ['Hanya baris yang cocok di kedua tabel', 'Semua baris dari tabel kiri + baris yang cocok dari tabel kanan (NULL jika tidak ada)', 'Semua baris dari kedua tabel', 'Baris yang tidak cocok dari tabel kanan'],
        answer: 1,
      },
      {
        q: 'Perbedaan HAVING dan WHERE adalah…',
        options: ['HAVING untuk filter sebelum GROUP BY, WHERE sesudah', 'WHERE memfilter baris sebelum agregasi; HAVING memfilter hasil grup setelah GROUP BY', 'Keduanya identik di PostgreSQL', 'HAVING hanya untuk COUNT'],
        answer: 1,
      },
      {
        q: 'CTE (Common Table Expression) didefinisikan dengan kata kunci…',
        options: ['DEFINE', 'WITH', 'TEMP AS', 'COMMON'],
        answer: 1,
      },
      {
        q: 'Perintah untuk membuat index pada kolom email di tabel users adalah…',
        options: ['ADD INDEX ON users(email)', 'CREATE INDEX ON users(email)', 'MAKE INDEX users_email ON users(email)', 'INDEX CREATE users(email)'],
        answer: 1,
      },
      {
        q: 'Window function dengan OVER() digunakan untuk…',
        options: ['Menggabungkan tabel', 'Menghitung agregat terhadap baris-baris terkait tanpa collapse hasilnya (row tetap ada)', 'Mengurutkan hasil query', 'Membuat view sementara'],
        answer: 1,
      },
      {
        q: 'Perintah INSERT ... ON CONFLICT DO UPDATE dikenal sebagai…',
        options: ['Merge Insert', 'UPSERT — insert jika belum ada, update jika sudah ada', 'Conditional Insert', 'Safe Insert'],
        answer: 1,
      },
      {
        q: 'SAVEPOINT digunakan dalam transaksi untuk…',
        options: ['Menyimpan seluruh transaksi ke file', 'Membuat titik rollback parsial tanpa membatalkan seluruh transaksi', 'Commit parsial', 'Snapshot tabel'],
        answer: 1,
      },
      {
        q: 'EXPLAIN ANALYZE berbeda dari EXPLAIN biasa karena…',
        options: ['EXPLAIN ANALYZE lebih cepat', 'EXPLAIN ANALYZE benar-benar mengeksekusi query dan menampilkan actual rows & actual time, bukan estimasi', 'EXPLAIN hanya untuk SELECT', 'EXPLAIN ANALYZE tidak bisa dijalankan di production'],
        answer: 1,
      },
    ],
  },
  {
    id: 'acid-concepts',
    title: '⚗️ ACID & Locking',
    path: '/acid-concepts',
    questions: [
      {
        q: 'ACID dalam konteks database adalah singkatan dari…',
        options: ['Availability, Consistency, Integrity, Durability', 'Atomicity, Consistency, Isolation, Durability', 'Atomicity, Concurrency, Integrity, Distribution', 'Availability, Concurrency, Isolation, Durability'],
        answer: 1,
      },
      {
        q: 'Atomicity berarti…',
        options: ['Transaksi dieksekusi sekecil mungkin', 'Seluruh transaksi berhasil atau seluruhnya dibatalkan (all-or-nothing)', 'Data konsisten setelah transaksi', 'Transaksi tidak mempengaruhi satu sama lain'],
        answer: 1,
      },
      {
        q: 'Isolation level "READ COMMITTED" (default PostgreSQL) mencegah…',
        options: ['Phantom reads', 'Dirty reads — membaca data yang belum dicommit', 'Non-repeatable reads', 'Semua anomali concurrency'],
        answer: 1,
      },
      {
        q: 'Isolation level "SERIALIZABLE" memberikan jaminan…',
        options: ['Paling longgar', 'Transaksi concurrent seolah dijalankan berurutan (serial), mencegah semua anomali', 'Hanya mencegah dirty reads', 'Hanya tersedia di PostgreSQL Enterprise'],
        answer: 1,
      },
      {
        q: 'Deadlock terjadi ketika…',
        options: ['Query berjalan terlalu lama', 'Dua atau lebih transaksi saling menunggu lock yang dipegang satu sama lain', 'Server kehabisan koneksi', 'Checkpoint terlalu sering'],
        answer: 1,
      },
      {
        q: 'Durability dijamin di PostgreSQL oleh…',
        options: ['Replikasi ke replica', 'WAL — perubahan ditulis ke WAL sebelum dianggap committed, aman dari crash', 'Autovacuum', 'pg_basebackup'],
        answer: 1,
      },
      {
        q: 'SELECT ... FOR UPDATE digunakan untuk…',
        options: ['Memilih dan langsung mengupdate baris', 'Mengunci baris yang dipilih agar tidak bisa diubah transaksi lain sampai commit', 'Optimasi query UPDATE', 'Membuat read-only snapshot'],
        answer: 1,
      },
      {
        q: '"Dirty read" adalah anomali dimana…',
        options: ['Data corrupt karena disk error', 'Transaksi membaca data yang diubah transaksi lain yang belum dicommit', 'Query SELECT lambat', 'Data duplikat akibat race condition'],
        answer: 1,
      },
      {
        q: 'Isolation level REPEATABLE READ mencegah…',
        options: ['Dirty reads dan non-repeatable reads (baca ulang baris sama mendapat hasil berbeda)', 'Hanya phantom reads', 'Semua anomali termasuk phantom reads', 'Tidak mencegah anomali apapun'],
        answer: 0,
      },
      {
        q: 'Consistency dalam ACID berarti…',
        options: ['Semua replica harus sinkron', 'Transaksi membawa database dari satu valid state ke valid state lain sesuai semua constraints', 'Setiap transaksi mendapat snapshot konsisten', 'Data sama di semua server'],
        answer: 1,
      },
    ],
  },
  {
    id: 'scaling',
    title: '📈 Scaling',
    path: '/scaling',
    questions: [
      {
        q: 'Vertical scaling (scale up) berarti…',
        options: ['Menambah lebih banyak server', 'Menambah resource (CPU, RAM, disk) ke server yang sudah ada', 'Mendistribusi data ke banyak node', 'Sharding database'],
        answer: 1,
      },
      {
        q: 'Horizontal scaling (scale out) berarti…',
        options: ['Upgrade CPU ke yang lebih kuat', 'Menambah lebih banyak server/node untuk mendistribusikan beban', 'Menambah RAM', 'Defragmentasi disk'],
        answer: 1,
      },
      {
        q: 'Connection pooling (misalnya pgBouncer) membantu PostgreSQL karena…',
        options: ['Menambah max_connections secara otomatis', 'Mengurangi overhead spawn proses untuk setiap koneksi baru — PostgreSQL buat proses per koneksi', 'Mengompresi data network', 'Mempercepat query SELECT'],
        answer: 1,
      },
      {
        q: 'Mode pool pgBouncer yang paling efisien namun paling restriktif adalah…',
        options: ['session mode', 'transaction mode', 'statement mode', 'connection mode'],
        answer: 2,
      },
      {
        q: 'shared_buffers direkomendasikan diset ke berapa persen dari total RAM?',
        options: ['10%', '25%', '50%', '75%'],
        answer: 1,
      },
      {
        q: 'Read scaling dengan read replica bekerja dengan cara…',
        options: ['Primary menangani SELECT; replica menangani INSERT/UPDATE', 'Semua write dikirim ke semua node', 'Query SELECT diarahkan ke replica, write ke primary — replica bersifat read-only', 'Load balancer membagi semua query merata'],
        answer: 2,
      },
      {
        q: 'FDW (Foreign Data Wrapper) memungkinkan…',
        options: ['Enkripsi data asing', 'Akses tabel di server PostgreSQL (atau database lain) dari satu cluster seolah tabel lokal', 'Firewall untuk koneksi asing', 'Validasi data dari sumber eksternal'],
        answer: 1,
      },
      {
        q: 'Sharding berarti…',
        options: ['Membagi satu tabel besar ke banyak server (horizontal partitioning across nodes)', 'Backup setiap shard secara terpisah', 'Index khusus untuk dataset besar', 'Kompresi data tabel'],
        answer: 0,
      },
      {
        q: 'Parameter work_mem mempengaruhi…',
        options: ['Total RAM yang digunakan PostgreSQL', 'Memori yang dialokasikan per operasi sort/hash (per query, bisa ada banyak)', 'Ukuran shared buffer', 'Ukuran WAL buffer'],
        answer: 1,
      },
      {
        q: 'Bottleneck paling umum yang diatasi lebih dulu sebelum scale out adalah…',
        options: ['Network bandwidth', 'Query optimization, indexing, dan tuning konfigurasi server', 'Hardware upgrade', 'Mengganti ke database lain'],
        answer: 1,
      },
    ],
  },
  {
    id: 'benchmarking',
    title: '⚡ Benchmarking',
    path: '/benchmarking',
    questions: [
      {
        q: 'Tool benchmarking yang merupakan bawaan resmi PostgreSQL adalah…',
        options: ['sysbench', 'pgbench', 'wrk', 'hyperfine'],
        answer: 1,
      },
      {
        q: 'TPS dalam konteks pgbench berarti…',
        options: ['Total Page Scans', 'Transactions Per Second', 'Tuple Processed Size', 'Table Partition Strategy'],
        answer: 1,
      },
      {
        q: 'Perintah pgbench untuk inisialisasi database benchmark dengan scale factor 100 adalah…',
        options: ['pgbench -i -s 100 mydb', 'pgbench --init --scale=100 mydb', 'pgbench -i -s 100 mydb', 'Opsi a dan b keduanya benar'],
        answer: 3,
      },
      {
        q: 'EXPLAIN ANALYZE menampilkan…',
        options: ['Hanya rencana query (plan), bukan eksekusi nyata', 'Query plan dan statistik eksekusi aktual (actual rows, actual time, buffer hits)', 'Statistik tabel saja', 'Rekomendasi index otomatis'],
        answer: 1,
      },
      {
        q: 'Buffer hit ratio yang ideal di EXPLAIN ANALYZE adalah…',
        options: ['Sesedikit mungkin hits (kurangi cache)', 'Setinggi mungkin (shared hits >> reads — data dari cache, bukan disk)', 'Tidak relevan untuk performa', 'Tepat 50% hits'],
        answer: 1,
      },
      {
        q: 'pg_stat_statements extension digunakan untuk…',
        options: ['Memonitor koneksi aktif', 'Menyimpan statistik agregat semua query (total time, mean time, calls) untuk analisis slow query', 'Backup konfigurasi', 'Mengelola statement timeout'],
        answer: 1,
      },
      {
        q: 'Kapan benchmarking TIDAK direkomendasikan?',
        options: ['Setelah upgrade PostgreSQL versi baru', 'Saat server production sedang peak hours — benchmark menurunkan performa user nyata', 'Setelah ganti SSD', 'Sebelum go-live'],
        answer: 1,
      },
      {
        q: '"Seq Scan" pada output EXPLAIN berarti…',
        options: ['Query menggunakan index', 'Query melakukan full table scan baris per baris — pertanda index mungkin diperlukan', 'Sequential write ke WAL', 'Partition scan berurutan'],
        answer: 1,
      },
      {
        q: 'Flag pgbench -c menentukan…',
        options: ['Jumlah CPU yang digunakan', 'Jumlah client (koneksi simultan)', 'Cache size', 'Jumlah kolom di tabel test'],
        answer: 1,
      },
      {
        q: 'auto_explain extension berguna untuk…',
        options: ['Penjelasan otomatis error query', 'Secara otomatis log EXPLAIN ANALYZE untuk query yang melebihi threshold waktu tertentu', 'Membuat dokumentasi schema', 'Analisis bloat otomatis'],
        answer: 1,
      },
    ],
  },
  {
    id: 'backup-restore',
    title: '💾 Backup & Restore',
    path: '/backup-restore',
    questions: [
      {
        q: 'Tiga jenis backup PostgreSQL berdasarkan status server adalah…',
        options: ['Full, Incremental, Differential', 'Cold, Warm, Hot', 'Logical, Physical, Hybrid', 'Offline, Online, Streaming'],
        answer: 1,
      },
      {
        q: 'Cold backup memerlukan…',
        options: ['Server berjalan penuh', 'Server dalam mode read-only', 'Server benar-benar dimatikan (downtime)', 'Hanya akses ke WAL'],
        answer: 2,
      },
      {
        q: 'Tool resmi untuk hot physical backup PostgreSQL adalah…',
        options: ['pg_dump', 'pg_basebackup', 'pg_restore', 'pg_cold'],
        answer: 1,
      },
      {
        q: 'PITR (Point-in-Time Recovery) memungkinkan…',
        options: ['Backup setiap menit otomatis', 'Restore database ke titik waktu spesifik menggunakan base backup + WAL archive', 'Partisi data secara otomatis', 'Replikasi real-time'],
        answer: 1,
      },
      {
        q: 'pg_dump menghasilkan jenis backup…',
        options: ['Physical backup seluruh cluster', 'Logical backup berisi SQL statements atau custom format untuk satu database', 'Backup WAL saja', 'Binary snapshot'],
        answer: 1,
      },
      {
        q: 'pg_dumpall berbeda dari pg_dump karena…',
        options: ['pg_dumpall lebih cepat', 'pg_dumpall membackup seluruh cluster termasuk global objects (roles, tablespaces)', 'pg_dumpall hanya backup skema', 'pg_dump tidak bisa restore'],
        answer: 1,
      },
      {
        q: 'Perintah untuk restore dari pg_dump custom format adalah…',
        options: ['pg_restore -d mydb backup.dump', 'psql -f backup.sql mydb', 'pg_apply backup.dump mydb', 'pg_load -d mydb backup.dump'],
        answer: 0,
      },
      {
        q: 'WAL archiving diperlukan untuk PITR karena…',
        options: ['WAL archive menyimpan binary snapshot tabel', 'WAL archive menyimpan semua perubahan sehingga bisa memutar ulang perubahan setelah base backup', 'PITR tidak butuh base backup', 'WAL archive menggantikan pg_dump'],
        answer: 1,
      },
      {
        q: 'Parameter postgresql.conf untuk mengaktifkan WAL archiving adalah…',
        options: ['wal_level = archive, archive_mode = on', 'archive_mode = on, archive_command = \'cp %p /archive/%f\'', 'Kedua jawaban a dan b diperlukan bersama', 'backup_mode = pitr'],
        answer: 2,
      },
      {
        q: 'Best practice backup production PostgreSQL yang paling direkomendasikan adalah…',
        options: [
          'Hanya cold backup mingguan',
          'pg_dump harian tanpa WAL archiving',
          'pg_basebackup + WAL archiving + uji restore secara berkala',
          'Replikasi saja sudah cukup',
        ],
        answer: 2,
      },
    ],
  },
  {
    id: 'replication',
    title: '📡 Replication',
    path: '/replication',
    questions: [
      {
        q: 'Dua jenis utama replikasi PostgreSQL adalah…',
        options: ['Full dan Partial', 'Streaming (Physical) dan Logical', 'Synchronous dan Asynchronous saja', 'Primary dan Secondary'],
        answer: 1,
      },
      {
        q: 'Streaming replication mengirimkan…',
        options: ['SQL statements ke replica', 'WAL records (perubahan fisik binary) dari primary ke standby', 'Snapshot tabel periodik', 'Hanya metadata perubahan'],
        answer: 1,
      },
      {
        q: 'Logical replication menggunakan model…',
        options: ['Physical WAL streaming', 'Publish/Subscribe — publisher mempublikasi perubahan, subscriber berlangganan', 'File copy langsung', 'SQL statement replay'],
        answer: 1,
      },
      {
        q: 'Keunggulan logical replication dibanding streaming adalah…',
        options: ['Lebih cepat', 'Bisa replikasi subset tabel, cross-versi PostgreSQL, dan ke database non-PostgreSQL', 'Lebih mudah dikonfigurasi', 'Tidak memerlukan primary key'],
        answer: 1,
      },
      {
        q: 'Replication slot berfungsi untuk…',
        options: ['Mempercepat replikasi', 'Memastikan primary menyimpan WAL yang dibutuhkan replica meski replica tertinggal — mencegah WAL dihapus terlalu awal', 'Enkripsi data replikasi', 'Autentikasi replica'],
        answer: 1,
      },
      {
        q: 'Risiko utama replication slot yang tidak aktif adalah…',
        options: ['Koneksi terputus otomatis', 'WAL menumpuk di primary karena tidak dihapus, berpotensi mengisi disk', 'Replica tidak bisa promote', 'Data corrupt di primary'],
        answer: 1,
      },
      {
        q: 'View untuk memonitor status replica dari sisi primary adalah…',
        options: ['pg_stat_replica', 'pg_stat_replication', 'pg_replication_status', 'pg_standby_info'],
        answer: 1,
      },
      {
        q: 'Promote standby menjadi primary dilakukan dengan…',
        options: ['Restart primary server', 'pg_ctl promote atau SELECT pg_promote()', 'ALTER SYSTEM SET role = primary', 'pg_basebackup --promote'],
        answer: 1,
      },
      {
        q: 'Synchronous replication (synchronous_commit = on) menjamin…',
        options: ['Performa lebih baik', 'Primary tidak commit sebelum replica mengkonfirmasi WAL sudah diterima — RPO = 0', 'Replica selalu siap jadi primary', 'Tidak ada lag sama sekali'],
        answer: 1,
      },
      {
        q: 'wal_level harus diset ke apa agar streaming replication bisa berjalan?',
        options: ['minimal', 'replica', 'logical', 'archive'],
        answer: 1,
      },
    ],
  },
  {
    id: 'ha-dr',
    title: '🛡️ HA & DR',
    path: '/ha-dr',
    questions: [
      {
        q: 'RTO (Recovery Time Objective) mengukur…',
        options: ['Berapa banyak data yang boleh hilang', 'Berapa lama waktu maksimal yang diizinkan untuk recovery setelah insiden', 'Biaya downtime per jam', 'Frekuensi backup'],
        answer: 1,
      },
      {
        q: 'RPO (Recovery Point Objective) mengukur…',
        options: ['Waktu yang dibutuhkan untuk restore', 'Berapa banyak data (dalam satuan waktu) yang boleh hilang saat disaster', 'Jumlah replica minimum', 'Uptime target (SLA)'],
        answer: 1,
      },
      {
        q: 'Patroni adalah…',
        options: ['Tool backup PostgreSQL', 'Framework auto-failover cluster PostgreSQL yang menggunakan DCS (etcd/Consul) untuk koordinasi', 'Extension monitoring', 'Connection pooler'],
        answer: 1,
      },
      {
        q: 'DCS (Distributed Configuration Store) dalam arsitektur Patroni digunakan untuk…',
        options: ['Menyimpan backup WAL', 'Menyimpan state cluster dan leader lock untuk konsensus siapa yang menjadi primary', 'Connection routing', 'Memonitor query'],
        answer: 1,
      },
      {
        q: 'pgBouncer dalam konteks HA digunakan sebagai…',
        options: ['Auto-failover agent', 'Connection pooler dan traffic router antara aplikasi dan database primary/replica', 'Monitoring dashboard', 'Backup tool'],
        answer: 1,
      },
      {
        q: 'Virtual IP (VIP) dalam arsitektur HA PostgreSQL memastikan…',
        options: ['Enkripsi koneksi', 'Aplikasi selalu terhubung ke node yang tepat tanpa mengubah konfigurasi saat failover', 'Load balancing query merata', 'Autentikasi multi-faktor'],
        answer: 1,
      },
      {
        q: 'pg_rewind digunakan setelah failover untuk…',
        options: ['Mempromosikan standby', 'Menyinkronkan mantan primary ke state baru agar bisa dijadikan replica baru tanpa pg_basebackup ulang', 'Menghapus WAL lama', 'Konfigurasi ulang replikasi'],
        answer: 1,
      },
      {
        q: 'Perbedaan HA (High Availability) dan DR (Disaster Recovery) adalah…',
        options: ['Tidak ada perbedaan', 'HA menangani kegagalan lokal (node tunggal down); DR menangani kegagalan regional (seluruh datacenter)', 'HA untuk database, DR untuk aplikasi', 'DR lebih cepat dari HA'],
        answer: 1,
      },
      {
        q: 'Jumlah minimum node etcd untuk toleransi kegagalan 1 node adalah…',
        options: ['2', '3', '4', '5'],
        answer: 1,
      },
      {
        q: 'Production readiness checklist HA mencakup…',
        options: ['Pastikan ada setidaknya 1 replica', 'Uji failover berkala, monitoring lag replikasi, alert otomatis, dan RTO/RPO sudah diuji', 'Cukup backup harian', 'Install Patroni saja'],
        answer: 1,
      },
    ],
  },
  {
    id: 'monitoring',
    title: '📊 Monitoring',
    path: '/monitoring',
    questions: [
      {
        q: 'Lima area monitoring kritis PostgreSQL meliputi…',
        options: [
          'CPU, RAM, Disk, Network, Swap',
          'Connections, Query Health, Storage & I/O, Vacuum & MVCC, Replication',
          'Tabel, Index, View, Sequence, Function',
          'pg_ctl, systemd, pgBouncer, Patroni, etcd',
        ],
        answer: 1,
      },
      {
        q: 'View pg_stat_activity menampilkan…',
        options: ['Statistik tabel dan index', 'Semua koneksi aktif, state koneksi, query yang sedang berjalan, dan lock wait', 'Statistik VACUUM', 'Performa replikasi'],
        answer: 1,
      },
      {
        q: 'pg_stat_statements menyimpan…',
        options: ['Log semua query mentah', 'Statistik agregat per query: total time, mean time, calls, rows — untuk analisis slow query', 'Konfigurasi server saat ini', 'Status koneksi'],
        answer: 1,
      },
      {
        q: 'Cache hit ratio yang rendah mengindikasikan…',
        options: ['CPU terlalu sibuk', 'Banyak query harus baca dari disk (bukan shared_buffers) — mungkin perlu tambah shared_buffers atau RAM', 'Index tidak digunakan', 'Terlalu banyak koneksi'],
        answer: 1,
      },
      {
        q: 'Dead tuples yang menumpuk tanpa VACUUM menyebabkan…',
        options: ['Query lebih cepat karena data lebih sedikit', 'Table bloat, scan lebih lambat, dan risiko transaction ID wraparound', 'Replikasi terputus', 'Koneksi terblokir'],
        answer: 1,
      },
      {
        q: 'Perintah SQL untuk melihat query yang sedang blocking (blocking queries) adalah…',
        options: [
          'SELECT * FROM pg_blocking_queries',
          'Query yang menggunakan pg_stat_activity dengan join pada pg_locks untuk deteksi lock wait',
          'SHOW LOCKS',
          'pg_ctl show-locks',
        ],
        answer: 1,
      },
      {
        q: 'postgres_exporter digunakan bersama…',
        options: ['pgAdmin', 'Prometheus + Grafana untuk visualisasi metrik PostgreSQL', 'pgBouncer', 'Patroni'],
        answer: 1,
      },
      {
        q: 'log_min_duration_statement = 1000 berarti…',
        options: ['Log semua query yang berjalan > 1 detik (1000ms)', 'Batasi query berjalan maksimal 1000ms', 'Log 1000 query terakhir', 'Minimum 1000 statement per batch'],
        answer: 0,
      },
      {
        q: 'Autovacuum berjalan terlalu sering bisa disebabkan oleh…',
        options: ['Server terlalu cepat', 'Banyak UPDATE/DELETE menghasilkan dead tuples yang terus memenuhi threshold autovacuum', 'Terlalu banyak index', 'RAM tidak cukup'],
        answer: 1,
      },
      {
        q: 'Alert replication lag penting karena…',
        options: ['Lag tinggi tidak berbahaya', 'Lag tinggi berarti replica jauh tertinggal dari primary — meningkatkan RPO saat failover', 'Lag hanya mempengaruhi performa SELECT', 'Lag otomatis diperbaiki tanpa intervensi'],
        answer: 1,
      },
    ],
  },
  {
    id: 'state-machine',
    title: '🔄 State Machine',
    path: '/state-machine',
    questions: [
      {
        q: 'State machine (finite state machine) adalah…',
        options: [
          'Tabel database dengan kolom status',
          'Model komputasi dengan sejumlah state diskrit, transisi antar state, dan aturan yang mengaturnya',
          'Pattern untuk optimasi query',
          'Tool monitoring status PostgreSQL',
        ],
        answer: 1,
      },
      {
        q: 'Guard/Condition dalam state machine berfungsi sebagai…',
        options: ['Nama event yang memicu transisi', 'Kondisi boolean yang harus TRUE agar transisi diizinkan — menjaga business rule', 'Daftar semua state yang valid', 'Callback setelah transisi'],
        answer: 1,
      },
      {
        q: 'Cara implementasi state machine di PostgreSQL yang paling robust adalah…',
        options: [
          'Kolom status TEXT tanpa constraint apapun',
          'Kolom status dengan CHECK constraint yang mendefinisikan state valid + trigger untuk validasi transisi',
          'Enum type saja',
          'Tabel terpisah untuk setiap state',
        ],
        answer: 1,
      },
      {
        q: 'PostgreSQL CHECK constraint untuk state machine berfungsi…',
        options: ['Mempercepat query', 'Memastikan nilai kolom status hanya berisi nilai yang valid (state yang terdefinisi)', 'Membuat index otomatis', 'Logging perubahan state'],
        answer: 1,
      },
      {
        q: 'Manfaat menggunakan state machine pattern di aplikasi database adalah…',
        options: [
          'Tidak ada manfaat khusus',
          'Mencegah transisi state yang tidak valid, menjaga konsistensi bisnis, dan membuat kode lebih mudah di-audit',
          'Mempercepat semua query',
          'Mengurangi kebutuhan indexing',
        ],
        answer: 1,
      },
      {
        q: '"Entry action" dalam state machine adalah…',
        options: ['Event yang memicu state pertama', 'Aksi yang dieksekusi saat memasuki sebuah state', 'State awal (initial state)', 'Log entry perubahan'],
        answer: 1,
      },
      {
        q: 'Contoh state machine yang umum dalam aplikasi e-commerce adalah…',
        options: ['Order status: PENDING → PROCESSING → SHIPPED → DELIVERED (atau CANCELLED dari berbagai state)', 'User login flow', 'Query execution plan', 'Backup status tracking'],
        answer: 0,
      },
      {
        q: 'History table dalam implementasi state machine digunakan untuk…',
        options: ['Menyimpan hanya state terkini', 'Audit trail — menyimpan setiap perubahan state beserta timestamp dan user yang mengubah', 'Rollback otomatis state', 'Backup state machine'],
        answer: 1,
      },
      {
        q: 'Trigger PostgreSQL dalam context state machine digunakan untuk…',
        options: ['Membuat tabel baru per state', 'Memvalidasi bahwa transisi state yang diminta adalah transisi yang sah sebelum commit', 'Mengirim email notifikasi saja', 'Enkripsi nilai status'],
        answer: 1,
      },
      {
        q: 'State "terminal" dalam state machine adalah…',
        options: ['State dengan nama yang dimulai huruf T', 'State akhir yang tidak memiliki transisi keluar (misalnya COMPLETED, CANCELLED)', 'State yang butuh timeout', 'State yang butuh human approval'],
        answer: 1,
      },
    ],
  },
]

// ─── Colour palette ──────────────────────────────────────────────────────────
const COLORS = {
  bg: '#0f1419',
  card: '#1a2332',
  border: '#243044',
  blue: '#64c8ff',
  green: '#4ade80',
  red: '#f87171',
  yellow: '#fbbf24',
  purple: '#a78bfa',
  text: '#e2e8f0',
  muted: '#708090',
}

const cardStyle = {
  background: COLORS.card,
  border: `1px solid ${COLORS.border}`,
  borderRadius: '12px',
  padding: '24px',
}

// ─── Module Selector ─────────────────────────────────────────────────────────
function ModuleSelector({ onSelect }) {
  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1 style={{ color: COLORS.blue, fontSize: '28px', fontWeight: 'bold', margin: '0 0 8px' }}>
          PostgreSQL Mock Test
        </h1>
        <p style={{ color: COLORS.muted, margin: 0 }}>
          Pilih modul untuk mengukur pemahamanmu — 10 soal per modul
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '12px' }}>
        {MODULES.map(mod => (
          <button
            key={mod.id}
            onClick={() => onSelect(mod)}
            style={{
              ...cardStyle,
              padding: '16px 20px',
              cursor: 'pointer',
              textAlign: 'left',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              transition: 'border-color 0.2s',
              width: '100%',
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = COLORS.blue)}
            onMouseLeave={e => (e.currentTarget.style.borderColor = COLORS.border)}
          >
            <div>
              <div style={{ color: COLORS.text, fontWeight: '600', fontSize: '15px', marginBottom: '4px' }}>
                {mod.title}
              </div>
              <div style={{ color: COLORS.muted, fontSize: '13px' }}>{mod.questions.length} soal</div>
            </div>
            <ChevronRight size={18} color={COLORS.muted} />
          </button>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <button
          onClick={() => onSelect('all')}
          style={{
            background: `linear-gradient(135deg, ${COLORS.blue}22, ${COLORS.purple}22)`,
            border: `1px solid ${COLORS.blue}`,
            borderRadius: '10px',
            color: COLORS.blue,
            padding: '12px 32px',
            fontSize: '15px',
            fontWeight: '600',
            cursor: 'pointer',
          }}
        >
          🎯 Semua Modul (Mixed Quiz — {MODULES.reduce((s, m) => s + m.questions.length, 0)} soal)
        </button>
      </div>
    </div>
  )
}

// ─── Quiz Engine ─────────────────────────────────────────────────────────────
function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function buildQuestions(modOrAll) {
  if (modOrAll === 'all') {
    return shuffle(MODULES.flatMap(m => m.questions.map(q => ({ ...q, module: m.title }))))
  }
  return shuffle(modOrAll.questions.map(q => ({ ...q, module: modOrAll.title })))
}

function QuizScreen({ mod, onFinish, onBack }) {
  const [questions] = useState(() => buildQuestions(mod))
  const [idx, setIdx] = useState(0)
  const [selected, setSelected] = useState(null)
  const [confirmed, setConfirmed] = useState(false)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState([])
  const [startTime] = useState(Date.now())
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setElapsed(Math.floor((Date.now() - startTime) / 1000)), 1000)
    return () => clearInterval(t)
  }, [startTime])

  const current = questions[idx]
  const total = questions.length
  const progress = ((idx) / total) * 100

  const fmt = s => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

  function confirm() {
    if (selected === null) return
    const correct = selected === current.answer
    if (correct) setScore(s => s + 1)
    setAnswers(a => [...a, { question: current.q, selected, correct: current.answer, isCorrect: correct, module: current.module }])
    setConfirmed(true)
  }

  function next() {
    if (idx + 1 >= total) {
      onFinish({ score: score + (confirmed && selected === current.answer && answers.length === idx ? 0 : 0), answers, total, elapsed, mod })
      return
    }
    setIdx(i => i + 1)
    setSelected(null)
    setConfirmed(false)
  }

  // recalculate correctly on finish
  function handleNext() {
    const finalScore = answers.filter(a => a.isCorrect).length + (confirmed && selected === current.answer ? 0 : 0)
    if (idx + 1 >= total) {
      onFinish({ score: answers.filter(a => a.isCorrect).length + (confirmed && selected === current.answer ? 1 : 0), answers: [...answers], total, elapsed, mod })
      return
    }
    next()
  }

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', color: COLORS.muted, cursor: 'pointer', fontSize: '14px' }}>
          ← Kembali
        </button>
        <div style={{ color: COLORS.muted, fontSize: '14px', display: 'flex', gap: '16px' }}>
          <span style={{ color: COLORS.yellow }}>
            <Clock size={14} style={{ display: 'inline', marginRight: '4px' }} />
            {fmt(elapsed)}
          </span>
          <span style={{ color: COLORS.blue }}>{idx + 1} / {total}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ background: COLORS.border, borderRadius: '4px', height: '6px', marginBottom: '24px' }}>
        <div style={{ width: `${progress}%`, height: '100%', background: COLORS.blue, borderRadius: '4px', transition: 'width 0.3s' }} />
      </div>

      {/* Module badge */}
      {mod === 'all' && (
        <div style={{ marginBottom: '12px' }}>
          <span style={{ background: `${COLORS.purple}22`, border: `1px solid ${COLORS.purple}44`, borderRadius: '6px', color: COLORS.purple, padding: '3px 10px', fontSize: '12px' }}>
            {current.module}
          </span>
        </div>
      )}

      {/* Question */}
      <div style={{ ...cardStyle, marginBottom: '16px' }}>
        <p style={{ color: COLORS.text, fontSize: '17px', lineHeight: 1.6, margin: 0, fontWeight: '500' }}>
          {current.q}
        </p>
      </div>

      {/* Options */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
        {current.options.map((opt, i) => {
          let borderColor = COLORS.border
          let bg = COLORS.card
          let textColor = COLORS.text

          if (confirmed) {
            if (i === current.answer) { borderColor = COLORS.green; bg = `${COLORS.green}15`; textColor = COLORS.green }
            else if (i === selected && i !== current.answer) { borderColor = COLORS.red; bg = `${COLORS.red}15`; textColor = COLORS.red }
          } else if (i === selected) {
            borderColor = COLORS.blue
            bg = `${COLORS.blue}15`
          }

          return (
            <button
              key={i}
              disabled={confirmed}
              onClick={() => setSelected(i)}
              style={{
                background: bg,
                border: `1px solid ${borderColor}`,
                borderRadius: '10px',
                padding: '14px 18px',
                textAlign: 'left',
                cursor: confirmed ? 'default' : 'pointer',
                display: 'flex',
                gap: '12px',
                alignItems: 'flex-start',
                transition: 'all 0.15s',
                width: '100%',
              }}
            >
              <span style={{
                width: '24px', height: '24px', borderRadius: '50%',
                background: i === selected ? (confirmed ? (i === current.answer ? COLORS.green : COLORS.red) : COLORS.blue) : COLORS.border,
                color: '#fff', fontSize: '12px', fontWeight: 'bold',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                {String.fromCharCode(65 + i)}
              </span>
              <span style={{ color: textColor, fontSize: '15px', lineHeight: 1.5 }}>{opt}</span>
              {confirmed && i === current.answer && <CheckCircle size={18} color={COLORS.green} style={{ marginLeft: 'auto', flexShrink: 0 }} />}
              {confirmed && i === selected && i !== current.answer && <XCircle size={18} color={COLORS.red} style={{ marginLeft: 'auto', flexShrink: 0 }} />}
            </button>
          )
        })}
      </div>

      {/* Action */}
      {!confirmed ? (
        <button
          onClick={confirm}
          disabled={selected === null}
          style={{
            width: '100%', padding: '14px',
            background: selected !== null ? COLORS.blue : COLORS.border,
            color: selected !== null ? '#0f1419' : COLORS.muted,
            border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: '600',
            cursor: selected !== null ? 'pointer' : 'not-allowed', transition: 'all 0.2s',
          }}
        >
          Konfirmasi Jawaban
        </button>
      ) : (
        <button
          onClick={handleNext}
          style={{
            width: '100%', padding: '14px',
            background: COLORS.blue, color: '#0f1419',
            border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: '600', cursor: 'pointer',
          }}
        >
          {idx + 1 >= total ? 'Lihat Hasil →' : 'Soal Berikutnya →'}
        </button>
      )}
    </div>
  )
}

// ─── Results Screen ───────────────────────────────────────────────────────────
function ResultScreen({ result, onRetry, onBack }) {
  const { score, answers, total, elapsed, mod } = result
  const pct = Math.round((score / total) * 100)
  const [showReview, setShowReview] = useState(false)
  const fmt = s => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

  const grade = pct >= 90 ? { label: 'Sangat Baik!', color: COLORS.green, icon: '🏆' }
    : pct >= 70 ? { label: 'Baik', color: COLORS.blue, icon: '👍' }
    : pct >= 50 ? { label: 'Cukup — terus belajar!', color: COLORS.yellow, icon: '📚' }
    : { label: 'Perlu Belajar Lagi', color: COLORS.red, icon: '💪' }

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto' }}>
      {/* Score card */}
      <div style={{ ...cardStyle, textAlign: 'center', marginBottom: '20px' }}>
        <div style={{ fontSize: '48px', marginBottom: '8px' }}>{grade.icon}</div>
        <div style={{ color: grade.color, fontSize: '22px', fontWeight: 'bold', marginBottom: '4px' }}>{grade.label}</div>
        <div style={{ color: COLORS.text, fontSize: '48px', fontWeight: 'bold', lineHeight: 1 }}>{pct}%</div>
        <div style={{ color: COLORS.muted, fontSize: '15px', marginTop: '8px' }}>
          {score} / {total} jawaban benar · {fmt(elapsed)}
        </div>
        {mod !== 'all' && (
          <Link to={mod.path} style={{ display: 'inline-block', marginTop: '12px', color: COLORS.blue, fontSize: '14px' }}>
            → Kunjungi modul {mod.title} untuk review materi
          </Link>
        )}
      </div>

      {/* Stat row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '20px' }}>
        {[
          { label: 'Benar', value: score, color: COLORS.green },
          { label: 'Salah', value: total - score, color: COLORS.red },
          { label: 'Skor', value: `${pct}%`, color: grade.color },
        ].map(s => (
          <div key={s.label} style={{ ...cardStyle, padding: '14px', textAlign: 'center' }}>
            <div style={{ color: s.color, fontSize: '28px', fontWeight: 'bold' }}>{s.value}</div>
            <div style={{ color: COLORS.muted, fontSize: '13px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button onClick={onRetry} style={{ flex: 1, padding: '12px', background: COLORS.blue, color: '#0f1419', border: 'none', borderRadius: '10px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          <RotateCcw size={16} /> Ulangi Tes
        </button>
        <button onClick={onBack} style={{ flex: 1, padding: '12px', background: COLORS.card, color: COLORS.text, border: `1px solid ${COLORS.border}`, borderRadius: '10px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          <BookOpen size={16} /> Pilih Modul Lain
        </button>
      </div>

      {/* Review toggle */}
      <button
        onClick={() => setShowReview(v => !v)}
        style={{ width: '100%', padding: '12px', background: 'none', border: `1px solid ${COLORS.border}`, borderRadius: '10px', color: COLORS.muted, cursor: 'pointer', marginBottom: '12px' }}
      >
        {showReview ? '▲ Sembunyikan' : '▼ Tampilkan'} Review Semua Jawaban
      </button>

      {showReview && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {answers.map((a, i) => (
            <div key={i} style={{ ...cardStyle, padding: '16px', borderColor: a.isCorrect ? `${COLORS.green}44` : `${COLORS.red}44` }}>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '10px', alignItems: 'flex-start' }}>
                {a.isCorrect
                  ? <CheckCircle size={16} color={COLORS.green} style={{ flexShrink: 0, marginTop: '2px' }} />
                  : <XCircle size={16} color={COLORS.red} style={{ flexShrink: 0, marginTop: '2px' }} />}
                <p style={{ color: COLORS.text, margin: 0, fontSize: '14px', lineHeight: 1.5 }}>{a.question}</p>
              </div>
              {!a.isCorrect && (
                <div style={{ paddingLeft: '24px' }}>
                  <div style={{ color: COLORS.red, fontSize: '13px', marginBottom: '4px' }}>
                    Jawabanmu: {String.fromCharCode(65 + a.selected)}
                  </div>
                  <div style={{ color: COLORS.green, fontSize: '13px' }}>
                    Jawaban benar: {String.fromCharCode(65 + a.correct)}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function MockTest() {
  const [screen, setScreen] = useState('select')   // select | quiz | result
  const [selectedMod, setSelectedMod] = useState(null)
  const [result, setResult] = useState(null)

  const handleSelect = useCallback(mod => {
    setSelectedMod(mod)
    setScreen('quiz')
  }, [])

  const handleFinish = useCallback(res => {
    setResult(res)
    setScreen('result')
  }, [])

  const handleRetry = useCallback(() => {
    setScreen('quiz')
  }, [])

  const handleBack = useCallback(() => {
    setScreen('select')
    setSelectedMod(null)
    setResult(null)
  }, [])

  return (
    <div style={{ minHeight: '100vh', paddingTop: '24px', paddingBottom: '48px' }}>
      {screen === 'select' && <ModuleSelector onSelect={handleSelect} />}
      {screen === 'quiz' && selectedMod !== null && (
        <QuizScreen mod={selectedMod} onFinish={handleFinish} onBack={handleBack} />
      )}
      {screen === 'result' && result && (
        <ResultScreen result={result} onRetry={handleRetry} onBack={handleBack} />
      )}
    </div>
  )
}
