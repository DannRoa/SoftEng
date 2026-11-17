import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { peso } from '../data/menu.js';

export default function CartDrawer({ onClose }) {
  const navigate = useNavigate();
  const { cart, removeItem, placeOrder, lastOrder, subtotal, order } = useCart();
  const [showReceipt, setShowReceipt] = useState(false);

  const checkout = () => {
    if (!cart.length) return;
    if (!order.setupDone) { onClose(); navigate('/order'); return; }
    placeOrder();
    setShowReceipt(true);
  };

  const Shell = ({ title, children }) => (
    <div className="fixed inset-0 z-[1000] flex items-end justify-center bg-black/75 backdrop-blur-sm" onClick={onClose}>
      <div className="flex max-h-[90vh] w-full max-w-[600px] flex-col rounded-t-3xl border-t border-coffee-600 bg-coffee-800 p-5" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-bold">{title}</h2>
          <button className="h-8 w-8 rounded-full border border-coffee-600 bg-coffee-700" onClick={onClose}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );

  // ORDER RECEIPT (shown after checkout)
  if (showReceipt && lastOrder) {
    return (
      <Shell title="Order placed ✅">
        <div className="flex-1 overflow-y-auto">
          <div className="mb-4 rounded-xl border border-coffee-600 bg-coffee-700 p-4 text-[13px]">
            <div className="flex justify-between"><span className="text-muted">Order #</span><strong>{lastOrder.id}</strong></div>
            <div className="mt-1 flex justify-between"><span className="text-muted">Name</span><span>{lastOrder.name || 'Guest'}</span></div>
            <div className="mt-1 flex justify-between">
              <span className="text-muted">{lastOrder.type === 'dine-in' ? 'Dine in' : 'Pickup'}</span>
              <span>{lastOrder.type === 'dine-in' ? `Table ${lastOrder.table}` : '—'}</span>
            </div>
            <div className="mt-1 flex justify-between"><span className="text-muted">Time</span><span>{lastOrder.placedAt}</span></div>
          </div>

          <p className="mb-2 text-[11px] font-bold tracking-[2px] text-muted">YOUR ORDER</p>
          {lastOrder.items.map((i) => (
            <div key={i.key} className="flex items-start justify-between border-b border-coffee-700 py-2.5 text-[13px]">
              <div>
                <strong>{i.qty}× {i.name}</strong><br />
                <small className="text-muted">{i.sweetness}{i.addon && ` · ${i.addon}`}</small>
              </div>
              <span className="text-gold">{peso(i.unitPrice * i.qty)}</span>
            </div>
          ))}

          <div className="mt-3 flex justify-between font-bold"><span>Total</span><span>{peso(lastOrder.total)}</span></div>
          <p className="mb-2 text-[10px] text-muted">Prices include VAT.</p>
        </div>
        <button onClick={onClose} className="mt-3 rounded-full bg-gold py-3.5 text-[13px] font-extrabold text-coffee-900">Done</button>
      </Shell>
    );
  }

  // CART
  return (
    <Shell title="Your cart">
      <div className="mb-4 max-h-60 overflow-y-auto">
        {cart.length === 0 ? (
          <div className="p-5 text-center">
            <p className="text-muted">Your cart is empty.</p>
            {lastOrder && (
              <button onClick={() => setShowReceipt(true)} className="mt-3 text-xs font-semibold text-gold underline">
                View my last order (#{lastOrder.id})
              </button>
            )}
          </div>
        ) : (
          cart.map((i) => (
            <div key={i.key} className="flex items-center justify-between border-b border-coffee-700 py-2.5">
              <div>
                <strong>{i.name}</strong><br />
                <small className="text-muted">{i.sweetness}{i.addon && ` · ${i.addon}`}</small><br />
                <span className="text-gold">{peso(i.unitPrice * i.qty)}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>x{i.qty}</span>
                <button onClick={() => removeItem(i.key)} className="rounded-md border border-coffee-600 bg-coffee-700 px-2 py-1" aria-label="Remove">🗑️</button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mb-3 space-y-2 text-[13px] text-cream">
        <label className="flex items-center gap-2.5"><input type="checkbox" className="accent-[#d4a373]" /> Need Physical Receipt</label>
        <label className="flex items-center gap-2.5"><input type="checkbox" className="accent-[#d4a373]" /> Issue Official Tax Invoice</label>
      </div>

      <div className="flex justify-between font-bold"><span>Subtotal</span><span>{peso(subtotal)}</span></div>
      <p className="mb-3 text-[10px] text-muted">Prices include VAT.</p>
      <button onClick={checkout} disabled={!cart.length} className="rounded-full bg-gold py-3.5 text-[13px] font-extrabold text-coffee-900 disabled:opacity-40">
        {order.setupDone ? 'Checkout' : 'Continue to order details'}
      </button>
    </Shell>
  );
}