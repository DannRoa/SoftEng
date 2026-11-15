import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-[radial-gradient(circle_at_center,#3d2721_0%,#2b1b17_70%,#1a100d_100%)] px-5 py-10 text-center">
      <div className="absolute left-0 top-0 flex w-full justify-end p-5">
        <button className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-coffee-700/60 px-4 py-2 text-[11px] font-bold tracking-wider text-gold backdrop-blur transition hover:bg-gold hover:text-coffee-900">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
          </svg>
          Login
        </button>
      </div>

      <header className="mb-12">
        <h1 className="font-serif text-[clamp(48px,14vw,72px)] font-normal leading-none tracking-[6px]">CAPO</h1>
        <div className="mt-2 flex items-center justify-center gap-3">
          <span className="h-px w-9 bg-white/40" />
          <span className="pl-2 text-[clamp(12px,3vw,16px)] font-light tracking-[8px]">RESTOBAR</span>
          <span className="h-px w-9 bg-white/40" />
        </div>
        <p className="mt-6 text-[11px] font-semibold uppercase tracking-[4px] text-gold">Good food · Better vibes</p>
      </header>

      <Link to="/order" className="mb-14 inline-flex items-center gap-2 rounded-full bg-gold px-10 py-3.5 text-[13px] font-extrabold tracking-[2.5px] text-black shadow-xl transition hover:-translate-y-0.5 hover:bg-gold-light">
        ORDER NOW <span>→</span>
      </Link>

      <nav className="flex flex-wrap justify-center gap-3.5">
        <Link to="/browse" className="flex h-[76px] w-[76px] flex-col items-center justify-center gap-1.5 rounded-2xl border border-coffee-600/60 bg-coffee-700/40 backdrop-blur transition hover:-translate-y-1 hover:border-gold hover:bg-coffee-600/70">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-cream">
            <path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
            <line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" />
          </svg>
          <span className="text-[9px] font-bold tracking-wider">MENU</span>
        </Link>
      </nav>

      <footer className="absolute bottom-6 flex flex-col gap-0.5">
        <span className="text-[8px] font-semibold tracking-[2px] text-cream/40">POWERED BY</span>
        <span className="text-[11px] font-bold tracking-wider text-gold">Capo</span>
      </footer>
    </main>
  );
}