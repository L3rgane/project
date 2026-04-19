const API_BASE = 'http://localhost/New%20folder/New%20folder/backend/api';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    method: options.method || 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    body: options.body || undefined
  });

  const text = await response.text();

  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    throw new Error(text || 'Invalid server response');
  }

  if (!response.ok) {
    throw new Error(data.error || `Request failed: ${response.status}`);
  }

  return data;
}

export const api = {
  getCategories: () => request('/categories.php'),
  getFoods: (categoryId = '') =>
    request(categoryId ? `/foods.php?category_id=${categoryId}` : '/foods.php'),
  getCart: () => request('/cart.php'),
  addToCart: (food_id, quantity = 1) =>
    request('/cart.php', {
      method: 'POST',
      body: JSON.stringify({ food_id, quantity })
    }),
  updateCart: (food_id, quantity) =>
    request('/cart.php', {
      method: 'PUT',
      body: JSON.stringify({ food_id, quantity })
    }),
  removeFromCart: (food_id) =>
    request(`/cart.php?food_id=${food_id}`, {
      method: 'DELETE'
    }),
  clearCart: () =>
    request('/cart.php', {
      method: 'DELETE'
    }),
  register: (payload) =>
    request('/auth/register.php', {
      method: 'POST',
      body: JSON.stringify(payload)
    }),
  login: (payload) =>
    request('/auth/login.php', {
      method: 'POST',
      body: JSON.stringify(payload)
    }),
  logout: () =>
    request('/auth/logout.php', {
      method: 'POST'
    }),
  me: () => request('/auth/me.php'),
  createOrder: (payload) =>
    request('/orders.php', {
      method: 'POST',
      body: JSON.stringify(payload)
    }),
  adminAddFood: (payload) =>
    request('/admin/add_food.php', {
      method: 'POST',
      body: JSON.stringify(payload)
    }),
  adminEditFood: (payload) =>
    request('/admin/edit_food.php', {
      method: 'PUT',
      body: JSON.stringify(payload)
    }),
  adminDeleteFood: (id) =>
    request(`/admin/delete_food.php?id=${id}`, {
      method: 'DELETE'
    })
};