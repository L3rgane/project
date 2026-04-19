import { useState } from 'react';
import { api } from '../api';
import Cart from '../components/Cart';
import { useCart } from '../context/CartContext';

export default function Order() {
  const { cartItems, clearCart } = useCart();
  const safeCartItems = Array.isArray(cartItems) ? cartItems : [];
  const [form, setForm] = useState({ name: '', phone: '', address: '', event_date: '', event_type: 'Wedding' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const total = safeCartItems.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0), 0);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      const payload = { ...form, items: safeCartItems, total };
      const result = await api.createOrder(payload);
      setMessage(`Order created successfully. Order ID: ${result.order_id}`);
      await clearCart();
      setForm({ name: '', phone: '', address: '', event_date: '', event_type: 'Wedding' });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="page two-col">
      <div>
        <h1>Your order</h1>
        <Cart />
      </div>
      <form className="form-card" onSubmit={submit}>
        <h2>Checkout</h2>
        <input placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <textarea placeholder="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
        <input type="date" value={form.event_date} onChange={(e) => setForm({ ...form, event_date: e.target.value })} />
        <select value={form.event_type} onChange={(e) => setForm({ ...form, event_type: e.target.value })}>
          <option>Wedding</option>
          <option>Festival</option>
          <option>Birthday</option>
          <option>Business event</option>
          <option>Private party</option>
        </select>
        <div className="cart-total">Total: {total.toFixed(2)} DH</div>
        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}
        <button type="submit">Confirm order</button>
      </form>
    </div>
  );
}
