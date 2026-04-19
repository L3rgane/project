import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cartItems, updateCart, removeFromCart } = useCart();
  const safeCartItems = Array.isArray(cartItems) ? cartItems : [];

  const total = safeCartItems.reduce(
    (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0),
    0
  );

  if (!safeCartItems.length) {
    return <div className="empty-box">Your cart is empty.</div>;
  }

  return (
    <div className="cart-box">
      {safeCartItems.map((item) => (
        <div className="cart-row" key={item.id}>
          <div>
            <h4>{item.name}</h4>
            <p>{Number(item.price).toFixed(2)} DH</p>
          </div>
          <div className="cart-actions">
            <button onClick={() => updateCart(item.id, Number(item.quantity) - 1)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => updateCart(item.id, Number(item.quantity) + 1)}>+</button>
            <button className="danger" onClick={() => removeFromCart(item.id)}>Remove</button>
          </div>
        </div>
      ))}
      <div className="cart-total">Total: {total.toFixed(2)} DH</div>
    </div>
  );
}
