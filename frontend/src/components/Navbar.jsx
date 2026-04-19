import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import logo from '../assets/logo.png';

export default function Navbar() {
  const { cartItems, user, logout } = useCart();
  const safeCartItems = Array.isArray(cartItems) ? cartItems : [];

  const cartCount = safeCartItems.reduce(
    (sum, item) => sum + (Number(item.quantity) || 0),
    0
  );

  return (
    <header className="navbar">
      <div className="brand-wrap">
        <img src={logo} alt="Prestige Events Logo" className="brand-logo" />
        <div>
          <Link className="brand-title" to="/">Prestige Events</Link>
          <p className="brand-sub">Wedding · Festival · Food Service</p>
        </div>
      </div>

      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/menu">Menu</Link>
        <Link to="/order">Order</Link>
        <Link to="/contact">Contact</Link>
        {user?.role === 'admin' && <Link to="/admin">Admin</Link>}
      </nav>

      <div className="nav-actions">
        <Link className="pill muted" to="/order">Cart ({cartCount})</Link>
        {user ? (
          <>
            <span className="hello">Hi, {user.name || 'User'}</span>
            <button className="pill" onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link className="pill light" to="/login">Login</Link>
            <Link className="pill" to="/register">Register</Link>
          </>
        )}
      </div>
    </header>
  );
}
