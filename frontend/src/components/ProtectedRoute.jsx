import { Navigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user, loading } = useCart();
  if (loading) return <div className="page"><p>Loading...</p></div>;
  if (!user) return <Navigate to="/login" replace />;
  if (adminOnly && user.role !== 'admin') return <Navigate to="/" replace />;
  return children;
}
