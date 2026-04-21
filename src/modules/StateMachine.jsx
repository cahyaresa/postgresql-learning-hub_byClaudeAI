import React, { useState } from 'react'
import { Copy, Check, GitBranch, Zap, Shield, Database, Settings, BookOpen, Play } from 'lucide-react'

const TABS = [
  { id: 'overview',      label: '📖 Overview',          icon: <BookOpen size={14} /> },
  { id: 'concepts',      label: '🧩 Core Concepts',      icon: <GitBranch size={14} /> },
  { id: 'db-impl',       label: '🗄️ DB Implementation',  icon: <Database size={14} /> },
  { id: 'pg-impl',       label: '🐘 PostgreSQL Pattern',  icon: <Settings size={14} /> },
  { id: 'transitions',   label: '🔄 Transitions & Rules', icon: <Zap size={14} /> },
  { id: 'advanced',      label: '⚡ Advanced Patterns',   icon: <Shield size={14} /> },
  { id: 'simulator',     label: '▶️ Simulator',           icon: <Play size={14} /> },
]

function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <div style={{ position: 'relative', background: 'rgba(0,0,0,0.35)', borderRadius: '8px', padding: '16px', marginBottom: '14px', overflow: 'auto' }}>
      <button
        onClick={handleCopy}
        style={{
          position: 'absolute', top: '8px', right: '8px',
          background: copied ? '#4ade80' : 'rgba(100,200,255,0.2)',
          border: 'none', color: copied ? '#0f1419' : '#64c8ff',
          padding: '4px 10px', borderRadius: '4px', cursor: 'pointer',
          fontSize: '11px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px',
        }}
      >
        {copied ? <><Check size={12} /> Copied</> : <><Copy size={12} /> Copy</>}
      </button>
      <pre style={{ margin: 0, color: '#a0c8ff', fontFamily: 'monospace', fontSize: '12px', whiteSpace: 'pre-wrap', paddingRight: '80px' }}>
        {code}
      </pre>
    </div>
  )
}

function Section({ title, color = 'blue', children }) {
  const palette = {
    blue:   { bg: 'rgba(100,200,255,0.08)', border: 'rgba(100,200,255,0.3)', accent: '#64c8ff', left: '#64c8ff' },
    green:  { bg: 'rgba(74,222,128,0.08)',  border: 'rgba(74,222,128,0.3)',  accent: '#4ade80', left: '#4ade80' },
    yellow: { bg: 'rgba(251,191,36,0.08)',  border: 'rgba(251,191,36,0.3)',  accent: '#fbbf24', left: '#fbbf24' },
    red:    { bg: 'rgba(248,113,113,0.08)', border: 'rgba(248,113,113,0.3)', accent: '#f87171', left: '#f87171' },
    purple: { bg: 'rgba(167,139,250,0.08)', border: 'rgba(167,139,250,0.3)', accent: '#a78bfa', left: '#a78bfa' },
    orange: { bg: 'rgba(249,115,22,0.08)',  border: 'rgba(249,115,22,0.3)',  accent: '#f97316', left: '#f97316' },
  }
  const c = palette[color] || palette.blue
  return (
    <div style={{ background: c.bg, border: `1px solid ${c.border}`, borderLeft: `3px solid ${c.left}`, borderRadius: '10px', padding: '16px', marginBottom: '14px' }}>
      {title && <h4 style={{ color: c.accent, fontWeight: 'bold', marginBottom: '10px', fontSize: '14px' }}>{title}</h4>}
      {children}
    </div>
  )
}

function Badge({ text, color = '#64c8ff' }) {
  return (
    <span style={{ background: `${color}22`, color, border: `1px solid ${color}55`, padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold', display: 'inline-block', margin: '3px' }}>
      {text}
    </span>
  )
}

function StateNode({ label, color, active, onClick }) {
  const isActive = active === label
  return (
    <button
      onClick={() => onClick(label)}
      style={{
        background: isActive ? `${color}33` : 'rgba(26,35,50,0.8)',
        border: `2px solid ${isActive ? color : 'rgba(100,200,255,0.2)'}`,
        borderRadius: '50px',
        padding: '10px 20px',
        color: isActive ? color : '#a0c8ff',
        fontWeight: 'bold',
        fontSize: '13px',
        cursor: 'pointer',
        transition: 'all 0.2s',
        boxShadow: isActive ? `0 0 16px ${color}44` : 'none',
      }}
    >
      {label}
    </button>
  )
}

// ─── TAB CONTENT ─────────────────────────────────────────────────────────────

function TabOverview() {
  const concepts = [
    { icon: '🔵', title: 'States', desc: 'Kondisi diskrit yang dapat dimiliki sebuah entitas. Contoh: Order bisa PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED.' },
    { icon: '🔀', title: 'Transitions', desc: 'Perpindahan dari satu state ke state lain. Transition hanya boleh terjadi jika kondisi (guard) terpenuhi.' },
    { icon: '🎯', title: 'Events / Triggers', desc: 'Aksi yang memicu transition. Bisa berupa user action, sistem event, atau time-based trigger.' },
    { icon: '🛡️', title: 'Guards / Conditions', desc: 'Kondisi boolean yang harus TRUE agar transition diperbolehkan. Jaga business rule tetap konsisten.' },
    { icon: '⚡', title: 'Actions / Side Effects', desc: 'Operasi yang dijalankan saat transition terjadi: kirim email, update audit log, trigger webhook.' },
    { icon: '🏁', title: 'Initial & Final States', desc: 'Setiap state machine punya initial state (entry point) dan bisa punya satu atau lebih final states (terminal).' },
  ]

  return (
    <div style={{ animation: 'float-up 0.5s ease-out' }}>
      <Section title="🤖 Apa itu State Machine?" color="blue">
        <p style={{ color: '#a0c8ff', fontSize: '13px', lineHeight: 1.7 }}>
          State Machine (Finite State Machine / FSM) adalah model komputasi yang mendefinisikan bagaimana sebuah sistem
          berpindah dari satu <strong style={{ color: '#64c8ff' }}>state</strong> ke state lain berdasarkan{' '}
          <strong style={{ color: '#4ade80' }}>events</strong> tertentu, sambil menjaga{' '}
          <strong style={{ color: '#fbbf24' }}>invariants</strong> dan menjalankan <strong style={{ color: '#a78bfa' }}>side effects</strong>.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px' }}>
          {['FSM', 'Workflow Engine', 'Order Management', 'Status Tracking', 'Business Rules', 'Audit Trail'].map(t => (
            <Badge key={t} text={t} />
          ))}
        </div>
      </Section>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px', marginBottom: '14px' }}>
        {concepts.map(({ icon, title, desc }) => (
          <div key={title} style={{ background: 'rgba(26,35,50,0.8)', border: '1px solid rgba(100,200,255,0.15)', borderRadius: '10px', padding: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span style={{ fontSize: '20px' }}>{icon}</span>
              <span style={{ color: '#e0f2ff', fontWeight: 'bold', fontSize: '13px' }}>{title}</span>
            </div>
            <p style={{ color: '#a0c8ff', fontSize: '12px', lineHeight: 1.6, margin: 0 }}>{desc}</p>
          </div>
        ))}
      </div>

      <Section title="📦 Contoh Real-World: Order Lifecycle" color="green">
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
          {[
            { state: 'DRAFT', color: '#708090' },
            { arrow: '→ place_order →' },
            { state: 'PENDING', color: '#fbbf24' },
            { arrow: '→ confirm_payment →' },
            { state: 'PROCESSING', color: '#64c8ff' },
            { arrow: '→ ship →' },
            { state: 'SHIPPED', color: '#a78bfa' },
            { arrow: '→ deliver →' },
            { state: 'DELIVERED', color: '#4ade80' },
          ].map((item, i) =>
            item.arrow
              ? <span key={i} style={{ color: '#708090' }}>{item.arrow}</span>
              : <span key={i} style={{ background: `${item.color}22`, border: `1px solid ${item.color}55`, color: item.color, padding: '4px 12px', borderRadius: '20px', fontWeight: 'bold' }}>{item.state}</span>
          )}
        </div>
        <p style={{ color: '#a0c8ff', fontSize: '12px', marginTop: '12px', marginBottom: 0 }}>
          Setiap panah adalah sebuah <strong style={{ color: '#64c8ff' }}>event</strong>. State machine memastikan
          SHIPPED tidak bisa langsung pindah ke DRAFT — hanya transisi yang valid yang diperbolehkan.
        </p>
      </Section>

      <Section title="✅ Mengapa Gunakan State Machine di Database?" color="purple">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {[
            ['🔒 Data Integrity', 'State yang invalid tidak bisa tersimpan di DB'],
            ['📋 Self-documenting', 'Schema menjelaskan flow bisnis secara eksplisit'],
            ['🔍 Queryable History', 'Bisa query "semua order yang pernah di-cancel"'],
            ['⚡ Atomic Transitions', 'Transition + side effects dalam satu transaction'],
            ['🛡️ Business Rule Enforcement', 'DB constraint dan trigger jaga konsistensi'],
            ['📊 Analytics Ready', 'Mudah hitung time-in-state, conversion rate, dll'],
          ].map(([title, desc]) => (
            <div key={title} style={{ background: 'rgba(167,139,250,0.06)', borderRadius: '8px', padding: '10px' }}>
              <p style={{ color: '#a78bfa', fontWeight: 'bold', fontSize: '12px', marginBottom: '4px' }}>{title}</p>
              <p style={{ color: '#a0c8ff', fontSize: '11px', margin: 0 }}>{desc}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}

function TabConcepts() {
  return (
    <div style={{ animation: 'float-up 0.5s ease-out' }}>
      <Section title="🔵 States: Mendefinisikan Kondisi" color="blue">
        <p style={{ color: '#a0c8ff', fontSize: '12px', marginBottom: '12px' }}>
          State harus bersifat <strong style={{ color: '#64c8ff' }}>mutually exclusive</strong> (entitas tidak bisa berada
          di dua state sekaligus) dan <strong style={{ color: '#4ade80' }}>collectively exhaustive</strong> (semua kondisi valid tercakup).
        </p>
        <CodeBlock code={`-- Definisi states sebagai ENUM (PostgreSQL)
CREATE TYPE order_status AS ENUM (
  'draft',        -- Belum di-submit
  'pending',      -- Menunggu pembayaran
  'processing',   -- Pembayaran confirmed, sedang diproses
  'shipped',      -- Sudah dikirim
  'delivered',    -- Sampai ke customer
  'cancelled',    -- Dibatalkan
  'refunded'      -- Refund diproses
);

-- Atau sebagai lookup table (lebih fleksibel untuk runtime changes)
CREATE TABLE order_statuses (
  code        VARCHAR(30) PRIMARY KEY,
  label       VARCHAR(100) NOT NULL,
  description TEXT,
  is_terminal BOOLEAN DEFAULT FALSE,  -- Apakah state akhir?
  sort_order  INT
);

INSERT INTO order_statuses VALUES
  ('draft',       'Draft',       'Order belum final',          FALSE, 1),
  ('pending',     'Pending',     'Menunggu pembayaran',         FALSE, 2),
  ('processing',  'Processing',  'Sedang diproses',             FALSE, 3),
  ('shipped',     'Shipped',     'Dalam pengiriman',            FALSE, 4),
  ('delivered',   'Delivered',   'Terkirim ke customer',        TRUE,  5),
  ('cancelled',   'Cancelled',   'Dibatalkan',                  TRUE,  6),
  ('refunded',    'Refunded',    'Refund selesai',              TRUE,  7);`} />
      </Section>

      <Section title="🔀 Transitions: Aturan Perpindahan State" color="yellow">
        <p style={{ color: '#a0c8ff', fontSize: '12px', marginBottom: '12px' }}>
          Transition matrix mendefinisikan <strong style={{ color: '#fbbf24' }}>from_state → to_state</strong> yang valid beserta event dan guard condition-nya.
        </p>
        <CodeBlock code={`-- Transition table: mendefinisikan semua perpindahan yang legal
CREATE TABLE order_transitions_allowed (
  id           SERIAL PRIMARY KEY,
  from_status  VARCHAR(30) REFERENCES order_statuses(code),
  to_status    VARCHAR(30) REFERENCES order_statuses(code),
  event_name   VARCHAR(50) NOT NULL,  -- 'place_order', 'confirm_payment', dll
  requires_role VARCHAR(50),           -- 'admin', 'system', 'customer'
  description  TEXT
);

INSERT INTO order_transitions_allowed (from_status, to_status, event_name, requires_role) VALUES
  ('draft',       'pending',     'place_order',       'customer'),
  ('draft',       'cancelled',   'cancel',            'customer'),
  ('pending',     'processing',  'confirm_payment',   'system'),
  ('pending',     'cancelled',   'cancel',            'customer'),
  ('pending',     'cancelled',   'payment_expired',   'system'),
  ('processing',  'shipped',     'ship',              'admin'),
  ('processing',  'cancelled',   'cancel',            'admin'),
  ('shipped',     'delivered',   'mark_delivered',    'system'),
  ('shipped',     'processing',  'return_to_sender',  'admin'),
  ('delivered',   'refunded',    'issue_refund',      'admin'),
  ('cancelled',   'refunded',    'issue_refund',      'admin');`} />
      </Section>

      <Section title="📋 Transition History: Audit Log" color="green">
        <p style={{ color: '#a0c8ff', fontSize: '12px', marginBottom: '12px' }}>
          Setiap transition harus dicatat. Ini memberikan full audit trail, memungkinkan debugging,
          dan membuka kemungkinan analitik time-in-state.
        </p>
        <CodeBlock code={`-- Tabel utama order (current state saja)
CREATE TABLE orders (
  id              BIGSERIAL PRIMARY KEY,
  customer_id     BIGINT NOT NULL REFERENCES customers(id),
  status          VARCHAR(30) NOT NULL DEFAULT 'draft'
                    REFERENCES order_statuses(code),
  total_amount    NUMERIC(12, 2),
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);

-- Audit log: semua riwayat perpindahan state
CREATE TABLE order_status_history (
  id              BIGSERIAL PRIMARY KEY,
  order_id        BIGINT NOT NULL REFERENCES orders(id),
  from_status     VARCHAR(30),              -- NULL berarti initial creation
  to_status       VARCHAR(30) NOT NULL,
  event_name      VARCHAR(50) NOT NULL,
  triggered_by    BIGINT REFERENCES users(id),
  triggered_at    TIMESTAMPTZ DEFAULT now(),
  metadata        JSONB,                    -- Data tambahan (reason, notes, dll)
  duration_seconds INT                     -- Berapa lama di from_status
);

CREATE INDEX idx_order_status_history_order_id ON order_status_history(order_id);
CREATE INDEX idx_order_status_history_triggered_at ON order_status_history(triggered_at);`} />
      </Section>
    </div>
  )
}

function TabDbImpl() {
  return (
    <div style={{ animation: 'float-up 0.5s ease-out' }}>
      <Section title="🏗️ Complete Schema: Order State Machine" color="blue">
        <CodeBlock code={`-- ============================================================
-- COMPLETE STATE MACHINE IMPLEMENTATION
-- ============================================================

-- 1. Status definitions
CREATE TYPE order_status AS ENUM (
  'draft', 'pending', 'processing',
  'shipped', 'delivered', 'cancelled', 'refunded'
);

-- 2. Orders table
CREATE TABLE orders (
  id             BIGSERIAL PRIMARY KEY,
  order_number   VARCHAR(20) UNIQUE NOT NULL,
  customer_id    BIGINT NOT NULL REFERENCES customers(id),
  status         order_status NOT NULL DEFAULT 'draft',
  total_amount   NUMERIC(12,2) NOT NULL DEFAULT 0,
  notes          TEXT,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. History / audit log
CREATE TABLE order_history (
  id              BIGSERIAL PRIMARY KEY,
  order_id        BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  from_status     order_status,
  to_status       order_status NOT NULL,
  event           VARCHAR(50) NOT NULL,
  actor_id        BIGINT REFERENCES users(id),
  actor_type      VARCHAR(20) DEFAULT 'user',  -- 'user', 'system', 'cron'
  reason          TEXT,
  metadata        JSONB DEFAULT '{}',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. Auto-update updated_at
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER orders_set_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();`} />
      </Section>

      <Section title="⚙️ Transition Function: Safe State Change" color="purple">
        <p style={{ color: '#a0c8ff', fontSize: '12px', marginBottom: '12px' }}>
          Bungkus semua transition dalam satu function. Ini memastikan validasi, update, dan history insert selalu atomic.
        </p>
        <CodeBlock code={`-- Transition function dengan validasi
CREATE OR REPLACE FUNCTION transition_order(
  p_order_id    BIGINT,
  p_event       VARCHAR(50),
  p_new_status  order_status,
  p_actor_id    BIGINT DEFAULT NULL,
  p_reason      TEXT DEFAULT NULL,
  p_metadata    JSONB DEFAULT '{}'
)
RETURNS orders LANGUAGE plpgsql AS $$
DECLARE
  v_order        orders%ROWTYPE;
  v_old_status   order_status;
  v_duration_sec INT;
BEGIN
  -- Lock row untuk mencegah race condition
  SELECT * INTO v_order FROM orders
  WHERE id = p_order_id FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Order % tidak ditemukan', p_order_id;
  END IF;

  v_old_status := v_order.status;

  -- Validasi: apakah transition ini legal?
  -- (Bisa juga query ke transition table jika pakai lookup table approach)
  IF NOT (
    (v_old_status = 'draft'      AND p_new_status IN ('pending', 'cancelled')) OR
    (v_old_status = 'pending'    AND p_new_status IN ('processing', 'cancelled')) OR
    (v_old_status = 'processing' AND p_new_status IN ('shipped', 'cancelled')) OR
    (v_old_status = 'shipped'    AND p_new_status IN ('delivered', 'processing')) OR
    (v_old_status = 'delivered'  AND p_new_status = 'refunded') OR
    (v_old_status = 'cancelled'  AND p_new_status = 'refunded')
  ) THEN
    RAISE EXCEPTION 'Transition % → % tidak valid untuk event "%"',
      v_old_status, p_new_status, p_event;
  END IF;

  -- Hitung durasi di state sebelumnya
  SELECT EXTRACT(EPOCH FROM (now() - created_at))::INT
  INTO v_duration_sec
  FROM order_history
  WHERE order_id = p_order_id
  ORDER BY created_at DESC LIMIT 1;

  -- Update status order
  UPDATE orders SET status = p_new_status WHERE id = p_order_id
  RETURNING * INTO v_order;

  -- Catat history
  INSERT INTO order_history (order_id, from_status, to_status, event, actor_id, reason, metadata)
  VALUES (p_order_id, v_old_status, p_new_status, p_event, p_actor_id, p_reason, p_metadata);

  RETURN v_order;
END;
$$;

-- Penggunaan:
SELECT * FROM transition_order(
  42,               -- order_id
  'confirm_payment', -- event
  'processing',     -- new status
  1,               -- actor_id (user yang melakukan aksi)
  'Payment verified via Midtrans',
  '{"payment_id": "PAY-XYZ123", "method": "bank_transfer"}'::jsonb
);`} />
      </Section>

      <Section title="🚦 Trigger: Auto-Guard di Database Level" color="yellow">
        <CodeBlock code={`-- Trigger untuk reject transition yang tidak valid
-- (Layer tambahan di atas application-level validation)
CREATE OR REPLACE FUNCTION validate_order_transition()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  -- Hanya validasi jika status berubah
  IF OLD.status = NEW.status THEN
    RETURN NEW;
  END IF;

  -- Cek apakah terminal state (tidak bisa berubah)
  IF OLD.status IN ('delivered', 'refunded') THEN
    RAISE EXCEPTION 'Order di state "%" adalah terminal state dan tidak dapat diubah', OLD.status;
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER orders_validate_transition
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION validate_order_transition();`} />
      </Section>
    </div>
  )
}

function TabPgImpl() {
  return (
    <div style={{ animation: 'float-up 0.5s ease-out' }}>
      <Section title="🐘 PostgreSQL-Specific: ENUM vs CHECK vs Lookup Table" color="blue">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px', marginBottom: '12px' }}>
          {[
            { title: 'ENUM Type', pros: ['Type-safe', 'Storage efficient', 'Fast comparison'], cons: ['ALTER TYPE mahal', 'Tidak fleksibel runtime', 'Tidak bisa add metadata'], color: '#64c8ff' },
            { title: 'CHECK Constraint', pros: ['Simple', 'Easy to alter', 'Works with VARCHAR'], cons: ['No metadata', 'Tidak self-documenting', 'Validation di app layer'], color: '#fbbf24' },
            { title: 'Lookup Table', pros: ['Full metadata', 'Runtime configurable', 'FK integrity'], cons: ['JOIN overhead', 'More schema complexity'], color: '#4ade80' },
          ].map(({ title, pros, cons, color }) => (
            <div key={title} style={{ background: `${color}11`, border: `1px solid ${color}33`, borderRadius: '10px', padding: '12px' }}>
              <p style={{ color, fontWeight: 'bold', fontSize: '13px', marginBottom: '8px' }}>{title}</p>
              <p style={{ color: '#4ade80', fontSize: '11px', marginBottom: '4px' }}>✅ Pros</p>
              {pros.map(p => <p key={p} style={{ color: '#a0c8ff', fontSize: '11px', margin: '2px 0' }}>• {p}</p>)}
              <p style={{ color: '#f87171', fontSize: '11px', marginTop: '8px', marginBottom: '4px' }}>❌ Cons</p>
              {cons.map(c => <p key={c} style={{ color: '#a0c8ff', fontSize: '11px', margin: '2px 0' }}>• {c}</p>)}
            </div>
          ))}
        </div>
      </Section>

      <Section title="📊 Query Patterns: Analytics pada State Machine" color="green">
        <CodeBlock code={`-- 1. Semua order yang saat ini PROCESSING
SELECT o.*, c.name as customer_name
FROM orders o
JOIN customers c ON c.id = o.customer_id
WHERE o.status = 'processing'
ORDER BY o.updated_at;

-- 2. Time-in-state: Berapa lama rata-rata order di PENDING?
SELECT
  AVG(
    EXTRACT(EPOCH FROM (
      next_event.created_at - first_event.created_at
    )) / 3600
  ) AS avg_hours_in_pending
FROM order_history first_event
JOIN LATERAL (
  SELECT created_at FROM order_history
  WHERE order_id = first_event.order_id
    AND created_at > first_event.created_at
  ORDER BY created_at ASC LIMIT 1
) next_event ON TRUE
WHERE first_event.to_status = 'pending';

-- 3. Funnel: Berapa % order yang reach delivered?
WITH funnel AS (
  SELECT
    COUNT(*) FILTER (WHERE status IN ('pending','processing','shipped','delivered','cancelled')) AS placed,
    COUNT(*) FILTER (WHERE status IN ('processing','shipped','delivered')) AS paid,
    COUNT(*) FILTER (WHERE status IN ('shipped','delivered')) AS shipped,
    COUNT(*) FILTER (WHERE status = 'delivered') AS delivered
  FROM orders
  WHERE created_at >= now() - INTERVAL '30 days'
)
SELECT
  placed,
  paid,   ROUND(paid::numeric/placed*100, 1) AS paid_pct,
  shipped, ROUND(shipped::numeric/placed*100, 1) AS shipped_pct,
  delivered, ROUND(delivered::numeric/placed*100, 1) AS delivered_pct
FROM funnel;

-- 4. Orders yang "stuck" di PROCESSING > 2 hari
SELECT o.id, o.order_number, o.status,
       now() - o.updated_at AS stuck_for
FROM orders o
WHERE o.status = 'processing'
  AND o.updated_at < now() - INTERVAL '2 days'
ORDER BY o.updated_at;`} />
      </Section>

      <Section title="🔔 NOTIFY: Real-time Transition Events" color="purple">
        <p style={{ color: '#a0c8ff', fontSize: '12px', marginBottom: '12px' }}>
          PostgreSQL <code style={{ color: '#a78bfa' }}>LISTEN/NOTIFY</code> bisa digunakan untuk push events ke aplikasi
          setiap kali state berubah — tanpa polling.
        </p>
        <CodeBlock code={`-- Trigger untuk NOTIFY saat status berubah
CREATE OR REPLACE FUNCTION notify_order_status_change()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
DECLARE
  payload JSONB;
BEGIN
  IF OLD.status != NEW.status THEN
    payload := jsonb_build_object(
      'order_id',    NEW.id,
      'order_number', NEW.order_number,
      'from_status', OLD.status,
      'to_status',   NEW.status,
      'changed_at',  now()
    );
    PERFORM pg_notify('order_status_changed', payload::text);
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER orders_notify_status_change
  AFTER UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION notify_order_status_change();

-- Di aplikasi (Node.js / Python), listen channel ini:
-- LISTEN order_status_changed;
-- Setiap status change, aplikasi dapat notifikasi real-time`} />
      </Section>
    </div>
  )
}

function TabTransitions() {
  return (
    <div style={{ animation: 'float-up 0.5s ease-out' }}>
      <Section title="🛡️ Guard Conditions: Validasi Sebelum Transition" color="yellow">
        <p style={{ color: '#a0c8ff', fontSize: '12px', marginBottom: '12px' }}>
          Guard conditions memastikan business rules terpenuhi sebelum state berubah.
          Implementasikan di function level, bukan hanya di UI.
        </p>
        <CodeBlock code={`-- Guard function: cek apakah order bisa di-ship
CREATE OR REPLACE FUNCTION can_ship_order(p_order_id BIGINT)
RETURNS BOOLEAN LANGUAGE plpgsql AS $$
DECLARE
  v_order      orders%ROWTYPE;
  v_item_count INT;
  v_has_address BOOLEAN;
BEGIN
  SELECT * INTO v_order FROM orders WHERE id = p_order_id;

  -- Guard 1: Status harus PROCESSING
  IF v_order.status != 'processing' THEN
    RETURN FALSE;
  END IF;

  -- Guard 2: Harus ada minimal 1 item
  SELECT COUNT(*) INTO v_item_count
  FROM order_items WHERE order_id = p_order_id;
  IF v_item_count = 0 THEN RETURN FALSE; END IF;

  -- Guard 3: Alamat pengiriman harus ada
  SELECT EXISTS(
    SELECT 1 FROM shipping_addresses WHERE order_id = p_order_id
  ) INTO v_has_address;
  IF NOT v_has_address THEN RETURN FALSE; END IF;

  -- Guard 4: Tidak ada item yang out-of-stock
  IF EXISTS(
    SELECT 1 FROM order_items oi
    JOIN products p ON p.id = oi.product_id
    WHERE oi.order_id = p_order_id
      AND p.stock_quantity < oi.quantity
  ) THEN RETURN FALSE; END IF;

  RETURN TRUE;
END;
$$;`} />
      </Section>

      <Section title="⚡ Actions: Side Effects saat Transition" color="purple">
        <CodeBlock code={`-- Action function: jalankan side effects setelah transition
CREATE OR REPLACE FUNCTION on_order_shipped(p_order_id BIGINT)
RETURNS VOID LANGUAGE plpgsql AS $$
DECLARE
  v_order orders%ROWTYPE;
BEGIN
  SELECT * INTO v_order FROM orders WHERE id = p_order_id;

  -- Action 1: Update estimated delivery date
  UPDATE orders
  SET metadata = metadata || jsonb_build_object(
    'estimated_delivery', (now() + INTERVAL '3 days')::date
  )
  WHERE id = p_order_id;

  -- Action 2: Deduct inventory
  UPDATE products p
  SET stock_quantity = stock_quantity - oi.quantity
  FROM order_items oi
  WHERE oi.order_id = p_order_id
    AND p.id = oi.product_id;

  -- Action 3: Insert notification record
  INSERT INTO notifications (user_id, type, reference_id, message)
  SELECT v_order.customer_id, 'order_shipped', v_order.id,
         format('Order #%s Anda telah dikirim!', v_order.order_number);

  -- NOTIFY ke channel (real-time push)
  PERFORM pg_notify('order_shipped', v_order.id::text);
END;
$$;

-- Trigger untuk auto-call action setelah status berubah ke 'shipped'
CREATE OR REPLACE FUNCTION after_order_status_change()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  IF NEW.status = 'shipped' AND OLD.status = 'processing' THEN
    PERFORM on_order_shipped(NEW.id);
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER orders_after_status_change
  AFTER UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION after_order_status_change();`} />
      </Section>

      <Section title="📏 Idempotent Transitions" color="green">
        <p style={{ color: '#a0c8ff', fontSize: '12px', marginBottom: '12px' }}>
          Transition function harus idempotent: jika event yang sama dikirim dua kali, hasilnya tetap konsisten.
        </p>
        <CodeBlock code={`-- Idempotent transition: jika sudah di target state, return sukses (no-op)
CREATE OR REPLACE FUNCTION transition_order_idempotent(
  p_order_id   BIGINT,
  p_event      VARCHAR(50),
  p_new_status order_status,
  p_actor_id   BIGINT DEFAULT NULL
)
RETURNS orders LANGUAGE plpgsql AS $$
DECLARE
  v_order orders%ROWTYPE;
BEGIN
  SELECT * INTO v_order FROM orders WHERE id = p_order_id FOR UPDATE;

  -- Sudah di target state → return as-is (idempotent)
  IF v_order.status = p_new_status THEN
    RETURN v_order;
  END IF;

  -- Lanjut ke transition normal
  RETURN transition_order(p_order_id, p_event, p_new_status, p_actor_id);
END;
$$;`} />
      </Section>
    </div>
  )
}

function TabAdvanced() {
  return (
    <div style={{ animation: 'float-up 0.5s ease-out' }}>
      <Section title="🏗️ Hierarchical State Machine" color="blue">
        <p style={{ color: '#a0c8ff', fontSize: '12px', marginBottom: '12px' }}>
          State machine dapat bersarang (hierarchical / statechart). Berguna untuk workflow multi-level
          seperti Order → Payment → Shipment yang masing-masing punya state sendiri.
        </p>
        <CodeBlock code={`-- Parent: Order state machine
CREATE TYPE order_status AS ENUM ('draft','pending','processing','shipped','delivered','cancelled');

-- Child: Payment sub-state machine
CREATE TYPE payment_status AS ENUM ('unpaid','pending','authorized','captured','failed','refunded');

-- Child: Shipment sub-state machine
CREATE TYPE shipment_status AS ENUM ('not_created','created','picked_up','in_transit','delivered','returned');

CREATE TABLE orders (
  id              BIGSERIAL PRIMARY KEY,
  status          order_status NOT NULL DEFAULT 'draft',
  payment_status  payment_status NOT NULL DEFAULT 'unpaid',
  shipment_status shipment_status NOT NULL DEFAULT 'not_created',
  created_at      TIMESTAMPTZ DEFAULT now()
);

-- Rule: order baru bisa SHIPPED jika payment_status = 'captured'
CREATE OR REPLACE FUNCTION validate_order_ship_guard()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  IF NEW.status = 'shipped' AND NEW.payment_status != 'captured' THEN
    RAISE EXCEPTION 'Order tidak bisa SHIPPED sebelum payment CAPTURED';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER orders_ship_guard
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION validate_order_ship_guard();`} />
      </Section>

      <Section title="⏰ Time-Based Automatic Transitions" color="yellow">
        <p style={{ color: '#a0c8ff', fontSize: '12px', marginBottom: '12px' }}>
          Beberapa transition terjadi otomatis berdasarkan waktu — misalnya pembayaran yang expire setelah 24 jam.
          Implementasikan dengan pg_cron atau background job.
        </p>
        <CodeBlock code={`-- Fungsi untuk auto-cancel order yang payment-nya expired
CREATE OR REPLACE FUNCTION auto_cancel_expired_orders()
RETURNS INT LANGUAGE plpgsql AS $$
DECLARE
  v_count INT := 0;
  v_order_id BIGINT;
BEGIN
  FOR v_order_id IN
    SELECT id FROM orders
    WHERE status = 'pending'
      AND created_at < now() - INTERVAL '24 hours'
  LOOP
    PERFORM transition_order(
      v_order_id,
      'payment_expired',
      'cancelled',
      NULL,
      'Auto-cancelled: payment expired after 24 hours',
      '{"source": "cron_job"}'::jsonb
    );
    v_count := v_count + 1;
  END LOOP;

  RETURN v_count;
END;
$$;

-- Jadwalkan dengan pg_cron (jika extension tersedia)
-- SELECT cron.schedule('cancel-expired-orders', '*/15 * * * *',
--   'SELECT auto_cancel_expired_orders()');

-- Atau buat view untuk monitoring
CREATE VIEW pending_expiry_watch AS
SELECT id, order_number, status,
       created_at,
       created_at + INTERVAL '24 hours' AS expires_at,
       EXTRACT(EPOCH FROM (created_at + INTERVAL '24 hours' - now()))/3600 AS hours_remaining
FROM orders
WHERE status = 'pending'
ORDER BY expires_at;`} />
      </Section>

      <Section title="🔀 Parallel State Machines" color="purple">
        <p style={{ color: '#a0c8ff', fontSize: '12px', marginBottom: '12px' }}>
          Beberapa entitas bisa berjalan secara paralel dan saling mempengaruhi state masing-masing.
        </p>
        <CodeBlock code={`-- Contoh: Workflow approval multi-level
-- Order perlu approval dari Finance DAN Compliance sebelum APPROVED

CREATE TYPE approval_status AS ENUM ('pending', 'approved', 'rejected');

CREATE TABLE order_approvals (
  id          BIGSERIAL PRIMARY KEY,
  order_id    BIGINT NOT NULL REFERENCES orders(id),
  role        VARCHAR(30) NOT NULL,    -- 'finance', 'compliance', 'manager'
  status      approval_status NOT NULL DEFAULT 'pending',
  approver_id BIGINT REFERENCES users(id),
  note        TEXT,
  decided_at  TIMESTAMPTZ
);

-- Auto-advance order ke APPROVED jika semua approvals selesai
CREATE OR REPLACE FUNCTION check_all_approvals()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
DECLARE
  v_total    INT;
  v_approved INT;
  v_rejected INT;
BEGIN
  SELECT
    COUNT(*),
    COUNT(*) FILTER (WHERE status = 'approved'),
    COUNT(*) FILTER (WHERE status = 'rejected')
  INTO v_total, v_approved, v_rejected
  FROM order_approvals
  WHERE order_id = NEW.order_id;

  -- Jika ada yang rejected → cancel order
  IF v_rejected > 0 THEN
    PERFORM transition_order(NEW.order_id, 'approval_rejected', 'cancelled', NEW.approver_id);

  -- Jika semua approved → advance ke processing
  ELSIF v_approved = v_total THEN
    PERFORM transition_order(NEW.order_id, 'all_approved', 'processing', NEW.approver_id);
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER order_approvals_check
  AFTER UPDATE ON order_approvals
  FOR EACH ROW EXECUTE FUNCTION check_all_approvals();`} />
      </Section>

      <Section title="📈 State Machine Metrics" color="green">
        <CodeBlock code={`-- Conversion rate per state transition
SELECT
  from_status,
  to_status,
  COUNT(*) AS transition_count,
  COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (PARTITION BY from_status) AS pct_of_from_state
FROM order_history
WHERE created_at >= now() - INTERVAL '30 days'
GROUP BY from_status, to_status
ORDER BY from_status, transition_count DESC;

-- Average time-in-state per status
SELECT
  h1.to_status AS state,
  AVG(
    EXTRACT(EPOCH FROM (
      COALESCE(h2.created_at, now()) - h1.created_at
    )) / 3600
  )::NUMERIC(10,2) AS avg_hours_in_state,
  COUNT(*) AS sample_count
FROM order_history h1
LEFT JOIN LATERAL (
  SELECT created_at FROM order_history
  WHERE order_id = h1.order_id AND created_at > h1.created_at
  ORDER BY created_at LIMIT 1
) h2 ON TRUE
GROUP BY h1.to_status
ORDER BY avg_hours_in_state DESC;`} />
      </Section>
    </div>
  )
}

// ─── INTERACTIVE SIMULATOR ────────────────────────────────────────────────────

const ORDER_FSM = {
  initial: 'draft',
  states: {
    draft:      { color: '#708090', label: 'Draft',      terminal: false },
    pending:    { color: '#fbbf24', label: 'Pending',    terminal: false },
    processing: { color: '#64c8ff', label: 'Processing', terminal: false },
    shipped:    { color: '#a78bfa', label: 'Shipped',    terminal: false },
    delivered:  { color: '#4ade80', label: 'Delivered',  terminal: true  },
    cancelled:  { color: '#f87171', label: 'Cancelled',  terminal: true  },
    refunded:   { color: '#f97316', label: 'Refunded',   terminal: true  },
  },
  transitions: [
    { from: 'draft',      to: 'pending',    event: 'place_order' },
    { from: 'draft',      to: 'cancelled',  event: 'cancel' },
    { from: 'pending',    to: 'processing', event: 'confirm_payment' },
    { from: 'pending',    to: 'cancelled',  event: 'cancel / payment_expired' },
    { from: 'processing', to: 'shipped',    event: 'ship' },
    { from: 'processing', to: 'cancelled',  event: 'cancel' },
    { from: 'shipped',    to: 'delivered',  event: 'mark_delivered' },
    { from: 'shipped',    to: 'processing', event: 'return_to_sender' },
    { from: 'delivered',  to: 'refunded',   event: 'issue_refund' },
    { from: 'cancelled',  to: 'refunded',   event: 'issue_refund' },
  ]
}

function TabSimulator() {
  const [currentState, setCurrentState] = useState(ORDER_FSM.initial)
  const [log, setLog] = useState([{ from: null, to: ORDER_FSM.initial, event: 'init', at: new Date().toLocaleTimeString() }])

  const availableTransitions = ORDER_FSM.transitions.filter(t => t.from === currentState)
  const stateInfo = ORDER_FSM.states[currentState]

  const applyTransition = (t) => {
    setCurrentState(t.to)
    setLog(prev => [...prev, { from: t.from, to: t.to, event: t.event, at: new Date().toLocaleTimeString() }])
  }

  const reset = () => {
    setCurrentState(ORDER_FSM.initial)
    setLog([{ from: null, to: ORDER_FSM.initial, event: 'init', at: new Date().toLocaleTimeString() }])
  }

  return (
    <div style={{ animation: 'float-up 0.5s ease-out' }}>
      <Section title="▶️ Interactive Order State Machine" color="blue">
        <p style={{ color: '#a0c8ff', fontSize: '12px', marginBottom: '16px' }}>
          Klik event untuk melakukan state transition. Hanya transisi yang valid yang ditampilkan.
        </p>

        {/* Current state display */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{
            display: 'inline-block',
            background: `${stateInfo.color}22`,
            border: `2px solid ${stateInfo.color}`,
            borderRadius: '50px',
            padding: '12px 32px',
            boxShadow: `0 0 24px ${stateInfo.color}44`,
          }}>
            <p style={{ color: '#708090', fontSize: '11px', marginBottom: '4px' }}>CURRENT STATE</p>
            <p style={{ color: stateInfo.color, fontSize: '22px', fontWeight: 'bold', margin: 0 }}>
              {stateInfo.label.toUpperCase()}
            </p>
            {stateInfo.terminal && (
              <p style={{ color: '#f87171', fontSize: '11px', marginTop: '4px', marginBottom: 0 }}>🏁 Terminal State</p>
            )}
          </div>
        </div>

        {/* Available transitions */}
        <div style={{ marginBottom: '16px' }}>
          <p style={{ color: '#708090', fontSize: '12px', marginBottom: '10px' }}>
            {availableTransitions.length > 0
              ? '🔀 Available Transitions:'
              : '🏁 No more transitions — terminal state reached.'}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {availableTransitions.map((t) => {
              const targetInfo = ORDER_FSM.states[t.to]
              return (
                <button
                  key={t.to}
                  onClick={() => applyTransition(t)}
                  style={{
                    background: `${targetInfo.color}22`,
                    border: `1px solid ${targetInfo.color}55`,
                    borderRadius: '8px',
                    padding: '10px 16px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    textAlign: 'left',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = `${targetInfo.color}33`; e.currentTarget.style.borderColor = targetInfo.color }}
                  onMouseLeave={e => { e.currentTarget.style.background = `${targetInfo.color}22`; e.currentTarget.style.borderColor = `${targetInfo.color}55` }}
                >
                  <p style={{ color: '#a0c8ff', fontSize: '11px', marginBottom: '2px' }}>event: <strong style={{ color: '#e0f2ff' }}>{t.event}</strong></p>
                  <p style={{ color: targetInfo.color, fontWeight: 'bold', fontSize: '13px', margin: 0 }}>
                    → {targetInfo.label}
                  </p>
                </button>
              )
            })}
          </div>
        </div>

        <button
          onClick={reset}
          style={{ background: 'rgba(248,113,113,0.2)', border: '1px solid rgba(248,113,113,0.4)', color: '#f87171', padding: '8px 20px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold', marginBottom: '16px' }}
        >
          🔄 Reset to Draft
        </button>
      </Section>

      {/* All states diagram */}
      <Section title="🗺️ State Diagram" color="purple">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '12px' }}>
          {Object.entries(ORDER_FSM.states).map(([key, info]) => (
            <div
              key={key}
              style={{
                background: currentState === key ? `${info.color}33` : `${info.color}11`,
                border: `2px solid ${currentState === key ? info.color : `${info.color}44`}`,
                borderRadius: '8px',
                padding: '8px 14px',
                boxShadow: currentState === key ? `0 0 12px ${info.color}44` : 'none',
                transition: 'all 0.3s',
              }}
            >
              <p style={{ color: info.color, fontWeight: 'bold', fontSize: '12px', margin: 0 }}>
                {info.label}
                {info.terminal ? ' 🏁' : ''}
              </p>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {ORDER_FSM.transitions.map((t, i) => (
            <span key={i} style={{ fontSize: '11px', color: '#708090', background: 'rgba(255,255,255,0.04)', borderRadius: '4px', padding: '2px 8px' }}>
              <span style={{ color: ORDER_FSM.states[t.from].color }}>{t.from}</span>
              {' → '}
              <span style={{ color: '#a0c8ff' }}>{t.event}</span>
              {' → '}
              <span style={{ color: ORDER_FSM.states[t.to].color }}>{t.to}</span>
            </span>
          ))}
        </div>
      </Section>

      {/* Transition log */}
      <Section title="📋 Transition Log" color="green">
        <div style={{ maxHeight: '220px', overflowY: 'auto' }}>
          {log.slice().reverse().map((entry, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 0', borderBottom: '1px solid rgba(100,200,255,0.08)' }}>
              <span style={{ color: '#708090', fontSize: '10px', minWidth: '55px' }}>{entry.at}</span>
              {entry.from
                ? <span style={{ color: ORDER_FSM.states[entry.from]?.color, fontSize: '11px', fontWeight: 'bold' }}>{entry.from}</span>
                : <span style={{ color: '#708090', fontSize: '11px' }}>—</span>}
              <span style={{ color: '#708090', fontSize: '11px' }}>→</span>
              <span style={{ color: '#a0c8ff', fontSize: '11px', fontStyle: 'italic' }}>{entry.event}</span>
              <span style={{ color: '#708090', fontSize: '11px' }}>→</span>
              <span style={{ color: ORDER_FSM.states[entry.to]?.color, fontSize: '11px', fontWeight: 'bold' }}>{entry.to}</span>
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

function StateMachine() {
  const [activeTab, setActiveTab] = useState('overview')

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':    return <TabOverview />
      case 'concepts':    return <TabConcepts />
      case 'db-impl':     return <TabDbImpl />
      case 'pg-impl':     return <TabPgImpl />
      case 'transitions': return <TabTransitions />
      case 'advanced':    return <TabAdvanced />
      case 'simulator':   return <TabSimulator />
      default:            return <TabOverview />
    }
  }

  return (
    <div style={{ minHeight: '100vh', padding: '32px 16px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px', animation: 'float-up 0.5s ease-out' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
            <span style={{ fontSize: '48px' }}>🔄</span>
            <div>
              <h1 style={{ color: '#e0f2ff', fontSize: '28px', fontWeight: 'bold', margin: 0 }}>
                State Machine Pattern
              </h1>
              <p style={{ color: '#a0c8ff', fontSize: '14px', margin: '4px 0 0' }}>
                Modeling, implementing, and querying finite state machines in PostgreSQL
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {['FSM', 'Workflow', 'Order Management', 'Audit Trail', 'PostgreSQL', 'Advanced'].map(tag => (
              <Badge key={tag} text={tag} color={tag === 'Advanced' ? '#f87171' : '#64c8ff'} />
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '24px', borderBottom: '1px solid rgba(100,200,255,0.15)', paddingBottom: '12px' }}>
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: activeTab === tab.id ? 'rgba(100,200,255,0.15)' : 'transparent',
                border: activeTab === tab.id ? '1px solid rgba(100,200,255,0.4)' : '1px solid transparent',
                borderRadius: '8px',
                color: activeTab === tab.id ? '#64c8ff' : '#708090',
                padding: '8px 14px',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: activeTab === tab.id ? 'bold' : 'normal',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
              onMouseEnter={e => { if (activeTab !== tab.id) e.currentTarget.style.color = '#a0c8ff' }}
              onMouseLeave={e => { if (activeTab !== tab.id) e.currentTarget.style.color = '#708090' }}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {renderContent()}
      </div>
    </div>
  )
}

export default StateMachine
