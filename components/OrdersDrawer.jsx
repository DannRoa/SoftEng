import { useCart } from '../context/CartContext.jsx';
import { peso } from '../data/menu.js';

export default function OrdersDrawer({ onClose }) {
  const { orders } = useCart();

  return (
    <div className="fixed inset-0 z-[1000] flex items-end justify-center bg-black/75 backdrop-blur-sm" onClick={onClose}>
      <div className="flex max-h-[90vh] w-full max-w-[600px] flex-col rounded-t-3xl border-t border-coffee-600 bg-coffee-800 p-5" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-bold">My orders</h2>
          <button className="h-8 w-8 rounded-full border border-coffee-600 bg-coffee-700" onClick={onClose}>✕</button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {orders.length === 0 ? (
            <p className="p-8 text-center text-muted">You haven't placed an order yet.</p>
          ) : (
            orders.map((o) => (
              <div key={o.id} className="mb-3 rounded-xl border border-coffee-600 bg-coffee-700 p-4 text-[13px]">
                <div className="mb-2 flex items-center justify-between">
                  <strong>Order #{o.id}</strong>
                  <span className="rounded-full bg-gold/20 px-2 py-0.5 text-[10px] font-bold text-gold">PLACED</span>
                </div>
                <div className="mb-2 text-[11px] text-muted">
                  {o.placedAt} · {o.type === 'dine-in' ? `Dine in, Table ${o.table}` : 'Pickup'} · {o.name || 'Guest'}
                </div>

                {o.items.map((i) => (
                  <div key={i.key} className="flex items-start justify-between border-t border-coffee-600/50 py-2">
                    <div>
                      <strong>{i.qty}× {i.name}</strong><br />
                      <small className="text-muted">{i.sweetness}{i.addon && ` · ${i.addon}`}</small>
                    </div>
                    <span className="text-gold">{peso(i.unitPrice * i.qty)}</span>
                  </div>
                ))}

                <div className="mt-2 flex justify-between border-t border-coffee-600/50 pt-2 font-bold">
                  <span>Total</span><span>{peso(o.total)}</span>
                </div>
              </div>
            ))
          )}
        </div>

        <button onClick={onClose} className="mt-3 rounded-full bg-gold py-3.5 text-[13px] font-extrabold text-coffee-900">Close</button>
      </div>
    </div>
  );
}