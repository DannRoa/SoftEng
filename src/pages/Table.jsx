import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import StepHeader from "../components/StepHeader.jsx";

export default function Table() {
  const navigate = useNavigate();
  const { order, updateOrder } = useCart();

  return (
    <main className="mx-auto flex min-h-screen max-w-[600px] flex-col p-5">
      <StepHeader title="TABLE" step={2} />

      <div className="mb-4 flex gap-5 text-[10px] tracking-wider text-muted">
        <span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-coffee-600" />AVAILABLE</span>
        <span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-gold" />YOUR TABLE</span>
      </div>

      <div className="mb-8 grid grid-cols-3 gap-2.5 sm:grid-cols-4">
        {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => {
          const sel = order.table === n;
          return (
            <button key={n} onClick={() => updateOrder({ table: n })}
              className={`flex h-24 flex-col items-center justify-center rounded-xl border transition ${sel ? 'border-gold bg-coffee-650 shadow-[0_0_12px_rgba(212,163,115,0.15)]' : 'border-coffee-600 bg-coffee-700 hover:border-coffee-500'}`}>
              <span className="mb-1 text-base font-bold">{n}</span>
              <span className="text-[9px] font-semibold tracking-wider text-muted">4 SEATS</span>
            </button>
          );
        })}
      </div>

      <div className="mt-auto pb-5"><button className="btn-gold" onClick={() => navigate('/menu')}>CONTINUE →</button></div>
    </main>
  );
}
