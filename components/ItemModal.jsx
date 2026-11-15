import { useState } from 'react';
import { useCart } from '../context/CartContext.jsx';
import { peso } from '../data/menu.js';

const SWEET = ['Less Sweet', 'Normal', 'Sweet'];
const OAT = 40;

export default function ItemModal({ item, onClose, onAdded }) {
  const { addItem } = useCart();
  const [sweetness, setSweetness] = useState('Less Sweet');
  const [oat, setOat] = useState(false);
  const [qty, setQty] = useState(1);
  const unitPrice = item.price + (oat ? OAT : 0);

  const add = () => {
    addItem({ id: item.id, name: item.name, sweetness, addon: oat ? 'Oatside' : null, unitPrice, qty });
    onAdded();
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-end justify-center bg-black/75 backdrop-blur-sm" onClick={onClose}>
      <div className="flex max-h-[90vh] w-full max-w-[600px] flex-col rounded-t-3xl border-t border-coffee-600 bg-coffee-800 p-5" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-bold">{item.name}</h2>
          <button className="h-8 w-8 rounded-full border border-coffee-600 bg-coffee-700" onClick={onClose}>✕</button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="mb-4 flex h-40 items-center justify-center overflow-hidden rounded-xl border border-coffee-600 bg-coffee-700 text-4xl">
            {item.img ? <img src={item.img.replace('w=500', 'w=800')} alt={item.name} className="h-full w-full object-cover" /> : '🍹'}
          </div>

          <div className="mb-3 rounded-xl border border-coffee-600 bg-coffee-700 p-4">
            <div className="mb-2 flex justify-between text-xs">
              <span>Sweetness / Preference</span>
              <span className="rounded-full bg-gold px-1.5 py-0.5 text-[9px] font-bold text-coffee-900">Required</span>
            </div>
            {SWEET.map((s) => (
              <label key={s} className="mt-2 flex items-center gap-2.5 text-[13px] text-cream">
                <input type="radio" name="sweetness" className="accent-[#d4a373]" checked={sweetness === s} onChange={() => setSweetness(s)} /> {s}
              </label>
            ))}
          </div>

          <div className="mb-3 rounded-xl border border-coffee-600 bg-coffee-700 p-4">
            <div className="mb-2 flex justify-between text-xs">
              <span>Milk / Add-ons</span>
              <span className="rounded-full bg-gold/20 px-1.5 py-0.5 text-[9px] font-bold text-muted">Optional</span>
            </div>
            <label className="mt-2 flex items-center gap-2.5 text-[13px] text-cream">
              <input type="checkbox" className="accent-[#d4a373]" checked={oat} onChange={(e) => setOat(e.target.checked)} /> Oatside
              <span className="ml-auto text-gold">+{peso(OAT)}</span>
            </label>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <div className="flex items-center gap-3 rounded-xl border border-coffee-600 bg-coffee-700 px-3.5 py-2">
            <button onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
            <span className="w-4 text-center">{qty}</span>
            <button onClick={() => setQty((q) => q + 1)}>+</button>
          </div>
          <button onClick={add} className="flex-1 rounded-full bg-gold py-3.5 text-[13px] font-extrabold text-coffee-900">
            Add to cart <span className="opacity-60">—</span> {peso(unitPrice * qty)}
          </button>
        </div>
      </div>
    </div>
  );
}
