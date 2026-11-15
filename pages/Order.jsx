import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import StepHeader from '../components/StepHeader.jsx';

const TYPES = [
  { id: 'dine-in', icon: '🍽️', label: 'Dine in' },
  { id: 'pickup', icon: '🛍️', label: 'Pickup' },
];

export default function Order() {
  const navigate = useNavigate();
  const { order, updateOrder } = useCart();

  const next = (e) => {
    e.preventDefault();
    updateOrder({ setupDone: true });
    navigate(order.type === 'dine-in' ? '/table' : '/menu');
  };

  return (
    <form onSubmit={next} className="mx-auto flex min-h-screen max-w-[540px] flex-col px-5 py-6">
      <StepHeader title="HOW" step={1} />

      <div className="mb-6 flex flex-col gap-3">
        {TYPES.map((t) => {
          const active = order.type === t.id;
          return (
            <button type="button" key={t.id} onClick={() => updateOrder({ type: t.id })}
              className={`flex items-center justify-between rounded-xl border p-4 transition ${active ? 'border-gold bg-coffee-650' : 'border-coffee-600 bg-coffee-700'}`}>
              <span className="flex items-center gap-3 text-sm font-semibold"><span>{t.icon}</span>{t.label}</span>
              <span className={`flex h-[22px] w-[22px] items-center justify-center rounded-full border text-[11px] font-bold text-coffee-900 ${active ? 'border-gold bg-gold' : 'border-coffee-500'}`}>
                {active && '✓'}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mb-4">
        <label className="label">YOUR NAME *</label>
        <input className="field" required placeholder="Enter your full name" value={order.name} onChange={(e) => updateOrder({ name: e.target.value })} />
      </div>
      <div className="mb-4">
        <label className="label">MOBILE NUMBER (OPTIONAL)</label>
        <input className="field" type="tel" placeholder="09XX XXX XXXX" value={order.mobile} onChange={(e) => updateOrder({ mobile: e.target.value })} />
      </div>

      <div className="mb-10 rounded-xl border border-coffee-600 bg-coffee-700 p-4">
        <p className="mb-3 text-xs leading-snug text-muted">Want to save your address and see all your orders from any phone?</p>
        <button type="button" onClick={() => alert('Redirecting to sign up...')}
          className="rounded-lg border border-coffee-500 bg-coffee-800 px-3.5 py-2 text-[11px] font-semibold text-gold transition hover:border-gold hover:bg-coffee-600">
          Create an account
        </button>
      </div>

      <div className="mt-auto pb-5"><button type="submit" className="btn-gold">CONTINUE →</button></div>
    </form>
  );
}
