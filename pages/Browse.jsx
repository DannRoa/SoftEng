import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { MENU, TIER1, TIER2, SECTIONS, peso } from '../data/menu.js';

export default function MenuView() {
  const [query, setQuery] = useState('');
  const [t1, setT1] = useState('all');
  const [t2, setT2] = useState('all');

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
        <div className="flex items-center gap-3">
          <Link to="/" className="icon-btn" aria-label="Back">←</Link>
          <div>
            <h1 className="font-serif text-xl leading-none tracking-[3px]">CAPO</h1>
            <span className="mt-0.5 block text-[8px] tracking-[4px] text-muted">RESTOBAR</span>
          </div>
        </div>
        <span className="rounded-full bg-gold px-3.5 py-1.5 text-[10px] font-extrabold tracking-wider text-coffee-900">OPEN</span>
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
                <article key={m.id} className="flex flex-col overflow-hidden rounded-2xl border border-coffee-600 bg-coffee-700">
                  <div className="h-32 w-full bg-[radial-gradient(circle_at_center,#483029,#2b1b17)]">
                    {m.img && <img src={m.img} alt={m.name} loading="lazy" className="h-full w-full object-cover" />}
                  </div>
                  <div className="flex flex-1 flex-col p-3">
                    <h3 className="mb-2 text-xs font-semibold leading-snug">{m.name}</h3>
                    <span className="text-xs font-bold text-gold">{peso(m.price)}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </main>
    </>
  );
}