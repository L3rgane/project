import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api } from '../api';

const CartContext = createContext(null);
const CART_STORAGE_KEY = 'catering_cart_items';

function normalizeArray(data, keys = []) {
  if (Array.isArray(data)) return data;
  for (const key of keys) {
    if (Array.isArray(data?.[key])) return data[key];
  }
  return [];
}

function readStoredCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeStoredCart(items) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(Array.isArray(items) ? items : []));
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshCart = async () => {
    const stored = readStoredCart();
    setCartItems(stored);
    return stored;
  };

  const refreshUser = async () => {
    try {
      const result = await api.me();
      setUser(result?.user || null);
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setCartItems(readStoredCart());
        await refreshUser();
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const setAndStoreCart = (items) => {
    const safeItems = Array.isArray(items) ? items : [];
    setCartItems(safeItems);
    writeStoredCart(safeItems);
  };

  const addToCart = async (foodId) => {
    const current = readStoredCart();
    const existingIndex = current.findIndex((item) => Number(item.id) === Number(foodId));

    if (existingIndex !== -1) {
      const updated = [...current];
      updated[existingIndex] = {
        ...updated[existingIndex],
        quantity: Number(updated[existingIndex].quantity || 0) + 1,
      };
      setAndStoreCart(updated);
      return;
    }

    const foodsData = await api.getFoods();
    const foods = normalizeArray(foodsData, ['foods', 'items']);
    const food = foods.find((item) => Number(item.id) === Number(foodId));

    if (!food) {
      throw new Error('Food not found');
    }

    const itemToAdd = {
      id: food.id,
      name: food.name,
      description: food.description,
      price: Number(food.price || 0),
      image: food.image || '',
      image_url: food.image_url || '',
      quantity: 1,
    };

    setAndStoreCart([...current, itemToAdd]);
  };

  const updateCart = async (foodId, quantity) => {
    const current = readStoredCart();
    const nextQty = Number(quantity || 0);

    if (nextQty <= 0) {
      const filtered = current.filter((item) => Number(item.id) !== Number(foodId));
      setAndStoreCart(filtered);
      return;
    }

    const updated = current.map((item) =>
      Number(item.id) === Number(foodId)
        ? { ...item, quantity: nextQty }
        : item
    );

    setAndStoreCart(updated);
  };

  const removeFromCart = async (foodId) => {
    const current = readStoredCart();
    const filtered = current.filter((item) => Number(item.id) !== Number(foodId));
    setAndStoreCart(filtered);
  };

  const clearCart = async () => {
    setAndStoreCart([]);
  };

  const value = useMemo(() => ({
    cartItems: Array.isArray(cartItems) ? cartItems : [],
    user,
    loading,
    refreshCart,
    refreshUser,
    addToCart,
    updateCart,
    removeFromCart,
    clearCart,
    login: async (payload) => {
      const data = await api.login(payload);
      setUser(data?.user || null);
      return data;
    },
    register: async (payload) => {
      const data = await api.register(payload);
      setUser(data?.user || null);
      return data;
    },
    logout: async () => {
      await api.logout();
      setUser(null);
    }
  }), [cartItems, user, loading]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}