import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useLiveStore, setOrderStatus, ackRequest, getStaff, staffLogout } from '../lib/livestore.js';

const COLUMNS = [
  { key: 'new', label: 'NEW', dot: 'bg-gold', next: 'preparing', action: 'START PREPARING' },
  { key: 'preparing', label: 'PREPARING', dot: 'bg-yellow-400', next: 'ready', action: 'MARK READY' },
  { key: 'ready', label: 'READY', dot: 'bg-green-400', next: 'served', action: 'COMPLETE' },
  { key: 'served', label: 'SERVED', dot: 'bg-muted', next: null },
];

const REQ = {
  water: { icon: '💧', label: 'Water request' },
  bill: { icon: '🧾', label: 'Request bill' },
  invoice: { icon: '📄', label: 'Official invoice' },
  assist: { icon: '🛎️', label: 'Needs assistance' },
};

const pad = (n) => String(n).padStart(2, '0');
const ago = (t, now) => {
  const m = Math.floor((now - t) / 60000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m}m ago`;
  return `${Math.floor(m / 60)}h ago`;
};

export default function Staff() {
  const navigate = useNavigate();
  const staff = getStaff();
  const { orders, requests } = useLiveStore();
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  if (!staff) return <Navigate to="/staff/login" replace />;

  const logout = () => { staffLogout(); navigate('/staff/login'); };

  // header + greeting
  const secs = Math.floor((now - staff.startedAt) / 1000);
  const shift = `${pad(Math.floor(secs / 3600))}:${pad(Math.floor((secs % 3600) / 60))}:${pad(secs % 60)}`;
  const hour = new Date(now).getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  const dateText = new Date(now).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' }).toUpperCase();
  const initials = staff.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();

  // stats
  const open = orders.filter((o) => o.status !== 'served');
  const activeTables = new Set(open.filter((o) => o.type === 'dine-in').map((o) => o.table)).size;
  const served = orders.filter((o) => o.status === 'served' && o.servedAt);
  const avg = served.length ? Math.round(served.reduce((s, o) => s + (o.servedAt - o.createdAt), 0) / served.length / 60000) : null;

  const stats = [
    { label: 'ACTIVE TABLES', value: pad(activeTables), sub: '/ 12' },
    { label: 'OPEN ORDERS', value: pad(open.length) },
    { label: 'AVG. SERVE TIME', value: avg === null ? '—' : String(avg), sub: avg === null ? '' : 'm' },
  ];

  return (
    <div className="min-h-screen bg-coffee-800">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-coffee-700 px-5 py-4 sm:px-8">
        <div>
          <h1 className="font-serif text-2xl leading-none tracking-[6px]">CAPO</h1>
          <span className="mt-1 block text-[8px] tracking-[5px] text-muted">RESTOBAR</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-2 text-[9px] font-bold tracking-wider sm:flex">
            <i className="h-1.5 w-1.5 rounded-full bg-green-400" />
            <span className="text-muted">LIVE SHIFT</span>
            <span className="text-sm text-white">{shift}</span>
          </div>
          <div className="flex items-center gap-3 border-l border-coffee-700 pl-4">
            <div className="text-right leading-tight">
              <div className="text-xs font-bold">{staff.name}</div>
              <div className="text-[9px] text-muted">{staff.role}</div>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold text-[11px] font-extrabold text-coffee-900">{initials}</div>
            <button onClick={logout} className="text-muted transition hover:text-gold" aria-label="Logout" title="Logout">↗</button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] px-5 py-8 sm:px-8">
        {/* Greeting + stats */}
        <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mb-3 text-[10px] font-semibold tracking-[2px] text-gold/80">{dateText}</p>
            <h2 className="font-serif text-4xl sm:text-5xl">{greeting}, {staff.name.split(' ')[0]}.</h2>
            <p className="mt-3 text-xs text-muted">Here's what's happening on the floor.</p>
          </div>
          <div className="flex divide-x divide-coffee-600">
            {stats.map((s) => (
              <div key={s.label} className="px-5 first:pl-0 last:pr-0">
                <div className="text-[8px] tracking-[1.5px] text-muted">{s.label}</div>
                <div className="mt-1 font-serif text-3xl">{s.value}<span className="ml-1 text-xs text-muted">{s.sub}</span></div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
          {/* Order queue */}
          <section className="rounded-3xl border border-coffee-700 bg-coffee-800">
            <div className="flex items-start justify-between border-b border-coffee-700 p-6">
              <div>
                <p className="text-[9px] font-semibold tracking-[2px] text-gold/80">LIVE OPERATIONS</p>
                <h3 className="mt-2 font-serif text-2xl">Order queue</h3>
              </div>
              <span className="flex items-center gap-1.5 text-[8px] tracking-wider text-muted">
                <i className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />AUTO-REFRESHING
              </span>
            </div>

            <div className="grid gap-3 p-4 sm:grid-cols-2 xl:grid-cols-4">
              {COLUMNS.map((col) => {
                let list = orders.filter((o) => o.status === col.key);
                if (col.key === 'served') list = list.slice(-8).reverse();
                return (
                  <div key={col.key} className="min-h-[200px] rounded-2xl bg-coffee-900/60 p-3">
                    <div className="mb-3 flex items-center justify-between px-1 text-[9px] font-bold tracking-[1.5px] text-cream">
                      <span className="flex items-center gap-2"><i className={`h-1.5 w-1.5 rounded-full ${col.dot}`} />{col.label}</span>
                      <span className="rounded-full bg-coffee-700 px-1.5 py-0.5 text-[9px]">{list.length}</span>
                    </div>

                    {list.length === 0 && <p className="py-6 text-center text-[10px] text-muted/50">No orders</p>}

                    {list.map((o) => (
                      <div key={o.id} className="mb-3 rounded-xl border border-coffee-600 bg-coffee-700 p-3.5">
                        <div className="mb-3 flex items-start justify-between border-b border-coffee-600/60 pb-3">
                          <div>
                            <span className="text-[8px] tracking-wider text-gold/80">{o.type === 'dine-in' ? 'TABLE' : 'PICKUP'}</span>
                            <div className="font-serif text-2xl leading-none">
                              {o.type === 'dine-in' ? pad(o.table) : (o.name || 'Guest').split(' ')[0]}
                            </div>
                          </div>
                          <span className="text-[9px] text-muted">🕒 {ago(o.createdAt, now)}</span>
                        </div>

                        <div className="mb-3 space-y-1.5 text-[11px] font-semibold">
                          {o.items.map((i) => (
                            <div key={i.key}>
                              {i.qty}× {i.name}
                              {(i.sweetness || i.addon) && (
                                <div className="text-[9px] font-normal text-muted">{i.sweetness}{i.addon && ` · ${i.addon}`}</div>
                              )}
                            </div>
                          ))}
                          {o.name && <div className="pt-1 text-[9px] font-normal text-muted">for {o.name}</div>}
                        </div>

                        {col.next && (
                          <button onClick={() => setOrderStatus(o.id, col.next)}
                            className="w-full rounded-lg bg-gold py-2.5 text-[9px] font-extrabold tracking-[1.5px] text-coffee-900 transition hover:bg-gold-light">
                            {col.action} →
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Service requests */}
          <aside className="self-start rounded-3xl border border-coffee-700 bg-coffee-800">
            <div className="flex items-start justify-between border-b border-coffee-700 p-6">
              <div>
                <p className="text-[9px] font-semibold tracking-[2px] text-gold/80">NEEDS ATTENTION</p>
                <h3 className="mt-2 font-serif text-2xl">Service requests</h3>
              </div>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#b5654a] text-[10px] font-bold">{requests.length}</span>
            </div>

            {requests.length === 0 && <p className="p-8 text-center text-xs text-muted/60">No requests right now.</p>}

            {[...requests].reverse().map((r) => {
              const meta = REQ[r.type] || REQ.assist;
              return (
                <div key={r.id} className="flex gap-3 border-b border-coffee-700 p-4 last:border-0">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-coffee-700 text-lg">{meta.icon}</div>
                  <div className="flex-1">
                    <div className="text-[9px] tracking-wider text-gold/80">Table {r.table}</div>
                    <div className="font-serif text-lg leading-tight">{meta.label}</div>
                    <div className="mb-3 text-[9px] text-muted">{ago(r.createdAt, now)}</div>
                    <button onClick={() => ackRequest(r.id)}
                      className="w-full rounded-lg bg-gold py-2.5 text-[9px] font-extrabold tracking-[1.5px] text-coffee-900 transition hover:bg-gold-light">
                      ACKNOWLEDGE
                    </button>
                  </div>
                </div>
              );
            })}
          </aside>
        </div>
      </main>
    </div>
  );
}