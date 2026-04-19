import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Order from './pages/Order';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Admin/Dashboard';
import ManageFoods from './pages/Admin/ManageFoods';
import AddEditFood from './pages/Admin/AddEditFood';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="app-shell">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/order" element={<Order />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<ProtectedRoute adminOnly><Dashboard /></ProtectedRoute>} />
          <Route path="/admin/foods" element={<ProtectedRoute adminOnly><ManageFoods /></ProtectedRoute>} />
          <Route path="/admin/foods/new" element={<ProtectedRoute adminOnly><AddEditFood /></ProtectedRoute>} />
          <Route path="/admin/foods/:id" element={<ProtectedRoute adminOnly><AddEditFood /></ProtectedRoute>} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
