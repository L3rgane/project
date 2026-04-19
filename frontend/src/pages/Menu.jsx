import { useEffect, useState } from 'react';
import { api } from '../api';
import FoodCard from '../components/FoodCard';

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

export default function Menu() {
  const [categories, setCategories] = useState([]);
  const [foods, setFoods] = useState([]);
  const [selected, setSelected] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    api.getCategories()
      .then((data) => setCategories(normalizeCategories(data)))
      .catch((e) => {
        setCategories([]);
        setError(e.message);
      });
  }, []);

  useEffect(() => {
    api.getFoods(selected)
      .then((data) => setFoods(normalizeFoods(data)))
      .catch((e) => {
        setFoods([]);
        setError(e.message);
      });
  }, [selected]);

  return (
    <div className="page">
      <h1>Our menu</h1>
      <div className="filters">
        <button className={!selected ? 'active' : ''} onClick={() => setSelected('')}>All</button>
        {categories.map((category) => (
          <button
            key={category.id}
            className={String(selected) === String(category.id) ? 'active' : ''}
            onClick={() => setSelected(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>
      {error && <p className="error">{error}</p>}
      <div className="food-grid">
        {foods.length > 0 ? foods.map((food) => <FoodCard key={food.id} food={food} />) : <p>No foods found.</p>}
      </div>
    </div>
  );
}
