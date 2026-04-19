import { useCart } from '../context/CartContext';

const DEFAULT_IMAGE = 'http://localhost/New%20folder/New%20folder/backend/uploads/default-menu.jpg';

export default function FoodCard({ food }) {
  const { addToCart } = useCart();

  return (
    <div className="food-card">
      <div className="food-image-wrap">
        <img
          src={food.image_url || DEFAULT_IMAGE}
          alt={food.name}
          className="food-image"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = DEFAULT_IMAGE;
          }}
        />
      </div>

      <div className="food-content">
        <span className="chip">{food.category_name || 'Food'}</span>
        <h3>{food.name}</h3>
        <p>{food.description}</p>
        <div className="food-bottom">
          <strong>{Number(food.price).toFixed(2)} DH</strong>
          <button onClick={() => addToCart(food.id)}>Add to cart</button>
        </div>
      </div>
    </div>
  );
}