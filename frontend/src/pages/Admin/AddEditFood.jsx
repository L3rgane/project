import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../api';

function normalizeCategories(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.categories)) return data.categories;
  return [];
}

function normalizeFoods(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.foods)) return data.foods;
  if (Array.isArray(data?.items)) return data.items;
  return [];
}

export default function AddEditFood() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [foods, setFoods] = useState([]);
  const [form, setForm] = useState({ name: '', category_id: '', description: '', price: '', image: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    api.getCategories().then((data) => setCategories(normalizeCategories(data))).catch((e) => setError(e.message));
    api.getFoods().then((data) => setFoods(normalizeFoods(data))).catch((e) => setError(e.message));
  }, []);

  useEffect(() => {
    if (!id || id === 'new') return;
    const item = foods.find((f) => String(f.id) === String(id));
    if (item) {
      setForm({
        name: item.name || '',
        category_id: item.category_id || '',
        description: item.description || '',
        price: item.price || '',
        image: item.image || ''
      });
    }
  }, [id, foods]);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        category_id: Number(form.category_id)
      };

      if (id && id !== 'new') {
        await api.adminEditFood({ ...payload, id: Number(id) });
      } else {
        await api.adminAddFood(payload);
      }
      navigate('/admin/foods');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="page">
      <form className="form-card" onSubmit={submit}>
        <h1>{id && id !== 'new' ? 'Edit food' : 'Add food'}</h1>
        <input placeholder="Food name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <select value={form.category_id} onChange={(e) => setForm({ ...form, category_id: e.target.value })}>
          <option value="">Choose category</option>
          {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <input type="number" step="0.01" placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
        <input placeholder="Image file name only, example: baklava.jpg" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
        <p style={{ marginTop: '-6px', color: '#7d665d' }}>Put the image file inside: backend/uploads/</p>
        {error && <p className="error">{error}</p>}
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
