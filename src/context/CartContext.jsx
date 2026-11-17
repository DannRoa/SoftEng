import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { addOrder } from '../lib/livestore.js';

const CartContext = createContext(null);
export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [lastOrder, setLastOrder] = useState(null);
  const [order, setOrder] = useState({ type: 'dine-in', name: '', mobile: '', table: 1, setupDone: false });

  const addItem = useCallback((item) => setCart((c) => [...c, { ...item, key: crypto.randomUUID() }]), []);
  const removeItem = useCallback((key) => setCart((c) => c.filter((i) => i.key !== key)), []);
  const updateOrder = useCallback((patch) => setOrder((o) => ({ ...o, ...patch })), []);

  const subtotal = useMemo(() => cart.reduce((s, i) => s + i.unitPrice * i.qty, 0), [cart]);
  const count = useMemo(() => cart.reduce((s, i) => s + i.qty, 0), [cart]);

  const placeOrder = useCallback(() => {
    const placed = {
      id: String(Date.now()).slice(-6),
      createdAt: Date.now(),
      placedAt: new Date().toLocaleString(),
      status: 'new',
      items: cart,
      total: cart.reduce((s, i) => s + i.unitPrice * i.qty, 0),
      type: order.type,
      table: order.table,
      name: order.name,
      mobile: order.mobile,
    };
    addOrder(placed); // goes live to the staff dashboard
    setLastOrder(placed);
    setOrders((o) => [placed, ...o]);
    setCart([]);
    return placed;
  }, [cart, order]);

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, placeOrder, orders, lastOrder, subtotal, count, order, updateOrder }}>
      {children}
    </CartContext.Provider>
  );
}