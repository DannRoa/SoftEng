import { useMemo, useState } from 'react';
import { MENU, TIER1, TIER2, SECTIONS, peso } from '../data/menu.js';
import { useCart } from '../context/CartContext.jsx';
import ItemModal from '../components/ItemModal.jsx';
import CartDrawer from '../components/CartDrawer.jsx';
import OrdersDrawer from '../components/OrdersDrawer.jsx';

export default function Menu() {
  const { count, subtotal, orders } = useCart();
  const [query, setQuery] = useState('');
  const [t1, setT1] = useState('all');
  const [t2, setT2] = useState('all');
  const [active, setActive] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [ordersOpen, setOrdersOpen] = useState(false);

  const sections = useMemo(() => {
    const q = query.trim().toLowerCase();
    const items = MENU.filter((m) =>
      (t1 === 'all' || m.tier1 === t1) && (t2 === 'all' || m.tier2 === t2) && m.name.toLowerCase().includes(q));
    return Object.keys(SECTIONS)
      .map((k) => ({ key: k, items: items.filter((m) => m.tier2 === k) }))
      .filter((s) => s.items.length);
  }, [query, t1, t2]);

  return (
    <>
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-coffee-700 bg-coffee-800 px-5 py-4">
        <div>
          <h1 className="font-serif text-xl leading-none tracking-[3px]">CAPO</h1>
          <span className="mt-0.5 block text-[8px] tracking-[4px] text-muted">RESTOBAR</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-gold px-3.5 py-1.5 text-[10px] font-extrabold tracking-wider text-coffee-900">OPEN</span>

          {/* My orders button */}
          <button className="icon-btn relative" onClick={() => setOrdersOpen(true)} aria-label="My orders" title="My orders">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
            {orders.length > 0 && <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[9px] font-bold text-coffee-900">{orders.length}</span>}
          </button>

          {/* Cart button */}
          <button className="icon-btn relative" onClick={() => setCartOpen(true)} aria-label="Cart" title="Cart">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {count > 0 && <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[9px] font-bold text-coffee-900">{count}</span>}
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-[1200px] px-5 pb-16 pt-5">
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search the menu..."
          className="mb-4 w-full rounded-full border border-coffee-600 bg-coffee-700 px-5 py-3 text-[13px] outline-none placeholder:text-muted/50 focus:border-gold" />

        <nav className="mb-3 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none]">
          {TIER1.map((t) => (
            <button key={t.id} onClick={() => setT1(t.id)}
              className={`whitespace-nowrap rounded-full border px-4 py-2 text-xs font-bold transition ${t1 === t.id ? 'border-gold bg-gold text-coffee-900' : 'border-coffee-600 bg-coffee-700 text-cream'}`}>{t.label}</button>
          ))}
        </nav>
        <nav className="mb-3 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none]">
          {TIER2.map((t) => (
            <button key={t.id} onClick={() => setT2(t.id)}
              className={`whitespace-nowrap rounded-full border px-3.5 py-1.5 text-[11px] transition ${t2 === t.id ? 'border-coffee-500 bg-coffee-600 text-white' : 'border-coffee-600 bg-coffee-700/40 text-muted'}`}>{t.label}</button>
          ))}
        </nav>

        {sections.length === 0 && <p className="mt-10 text-center text-muted">No items found.</p>}

        {sections.map((s) => (
          <section key={s.key} className="mt-6">
            <div className="mb-3.5 flex items-center justify-between border-b border-coffee-600/40 pb-1.5">
              <h2 className="text-[11px] font-bold tracking-[2px] text-muted">{SECTIONS[s.key]}</h2>
              <span className="text-[10px] text-muted/60">{s.items.length} Items</span>
            </div>
            <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-5">
              {s.items.map((m) => (
                <article key={m.id} onClick={() => setActive(m)}
                  className="relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-coffee-600 bg-coffee-700 transition hover:-translate-y-0.5 hover:border-coffee-500">
                  <div className="h-32 w-full bg-[radial-gradient(circle_at_center,#483029,#2b1b17)]">
                    {m.img && <img src={m.img} alt={m.name} loading="lazy" className="h-full w-full object-cover" />}
                  </div>
                  <div className="flex flex-1 flex-col p-3">
                    <h3 className="mb-2 text-xs font-semibold leading-snug">{m.name}</h3>
                    <span className="text-xs font-bold text-gold">{peso(m.price)}</span>
                    <button className="absolute bottom-2.5 right-2.5 flex h-[26px] w-[26px] items-center justify-center rounded-full bg-gold font-bold text-coffee-900 shadow-md" aria-label="Add">+</button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </main>

      {count > 0 && !cartOpen && (
        <button onClick={() => setCartOpen(true)} className="fixed inset-x-5 bottom-5 z-40 mx-auto flex max-w-[560px] items-center justify-between rounded-full bg-gold px-6 py-3.5 text-[13px] font-extrabold text-coffee-900 shadow-xl">
          <span>View cart · {count} item{count > 1 ? 's' : ''}</span><span>{peso(subtotal)}</span>
        </button>
      )}

      {active && <ItemModal key={active.id} item={active} onClose={() => setActive(null)} onAdded={() => { setActive(null); setCartOpen(true); }} />}
      {cartOpen && <CartDrawer onClose={() => setCartOpen(false)} />}
      {ordersOpen && <OrdersDrawer onClose={() => setOrdersOpen(false)} />}
    </>
  );
}