import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useCart();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const result = await login(form);
      navigate(result.user.role === 'admin' ? '/admin' : '/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-wrap">
      <form className="form-card auth-card" onSubmit={submit}>
        <div className="auth-top">Sign in to your account</div>
        <h1>Login</h1>
        <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
        <p>Don't have an account? <Link to="/register">Register</Link></p>
        <div className="demo-box">
          <strong>Admin demo</strong>
          <p>admin@catering.com / admin123</p>
        </div>
      </form>
    </div>
  );
}
