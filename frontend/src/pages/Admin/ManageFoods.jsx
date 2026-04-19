import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../api';

function normalizeFoods(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.foods)) return data.foods;
  if (Array.isArray(data?.items)) return data.items;
  return [];
}

export default function ManageFoods() {
  const [foods, setFoods] = useState([]);
  const [error, setError] = useState('');

  const load = () => {
    api.getFoods()
      .then((data) => setFoods(normalizeFoods(data)))
      .catch((e) => setError(e.message));
  };

  useEffect(() => { load(); }, []);

  const remove = async (id) => {
    if (!window.confirm('Delete this food?')) return;
    try {
      await api.adminDeleteFood(id);
      load();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="page">
      <div className="between">
        <h1>Manage foods</h1>
        <Link className="pill" to="/admin/foods/new">Add new food</Link>
      </div>
      {error && <p className="error">{error}</p>}
      <div className="table-wrap">
        <table>
          <thead>
            <tr><th>ID</th><th>Name</th><th>Category</th><th>Price</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {foods.map((food) => (
              <tr key={food.id}>
                <td>{food.id}</td>
                <td>{food.name}</td>
                <td>{food.category_name}</td>
                <td>{Number(food.price).toFixed(2)} DH</td>
                <td>
                  <Link className="table-link" to={`/admin/foods/${food.id}`}>Edit</Link>
                  <button className="table-link danger-text" onClick={() => remove(food.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
