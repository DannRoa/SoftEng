import { useState } from 'react';
import { useCart } from '../context/CartContext.jsx';
import { useLiveStore, addRequest } from '../lib/livestore.js';
import { peso } from '../data/menu.js';

const STATUS = {
  new: 'RECEIVED',
  preparing: 'PREPARING',
  ready: 'READY',
  served: 'SERVED',
};

const HELP = [
  { type: 'water', label: '💧 Water' },
  { type: 'bill', label: '🧾 Bill' },
  { type: 'invoice', label: '📄 Invoice' },
  { type: 'assist', label: '🛎️ Staff' },
];

export default function OrdersDrawer({ onClose }) {
  const { orders, order } = useCart();
  const live = useLiveStore();
  const [sent, setSent] = useState('');

  const call = (type) => {
    addRequest({ type, table: order.table });
    setSent(type);
    setTimeout(() => setSent(''), 2500);
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-end justify-center bg-black/75 backdrop-blur-sm" onClick={onClose}>
      <div className="flex max-h-[90vh] w-full max-w-[600px] flex-col rounded-t-3xl border-t border-coffee-600 bg-coffee-800 p-5" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-bold">My orders</h2>
          <button className="h-8 w-8 rounded-full border border-coffee-600 bg-coffee-700" onClick={onClose}>✕</button>
        </div>

        {order.type === 'dine-in' && order.setupDone && (
          <div className="mb-4 rounded-xl border border-coffee-600 bg-coffee-700 p-3">
            <p className="mb-2 text-[10px] font-bold tracking-[1.5px] text-muted">NEED SOMETHING? (TABLE {order.table})</p>
            <div className="grid grid-cols-4 gap-2">
              {HELP.map((h) => (
                <button key={h.type} onClick={() => call(h.type)}
                  className="rounded-lg border border-coffee-600 bg-coffee-800 py-2 text-[10px] font-semibold transition hover:border-gold">
                  {h.label}
                </button>
              ))}
            </div>
            {sent && <p className="mt-2 text-center text-[11px] text-gold">Request sent ✓ Staff will be right with you.</p>}
          </div>
        )}

        <div className="flex-1 overflow-y-auto">
          {orders.length === 0 ? (
            <p className="p-8 text-center text-muted">You haven't placed an order yet.</p>
          ) : (
            orders.map((o) => {
              const status = live.orders.find((x) => x.id === o.id)?.status || o.status || 'new';
              return (
                <div key={o.id} className="mb-3 rounded-xl border border-coffee-600 bg-coffee-700 p-4 text-[13px]">
                  <div className="mb-2 flex items-center justify-between">
                    <strong>Order #{o.id}</strong>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${status === 'ready' ? 'bg-green-400/20 text-green-300' : 'bg-gold/20 text-gold'}`}>
                      {STATUS[status]}
                    </span>
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
              );
            })
          )}
        </div>

        <button onClick={onClose} className="mt-3 rounded-full bg-gold py-3.5 text-[13px] font-extrabold text-coffee-900">Close</button>
      </div>
    </div>
  );
}