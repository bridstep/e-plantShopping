import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

const img = (n) => `https://picsum.photos/seed/${n}/200/200`; // replace with real plant images

const categories = [
  { category: 'Air Purifying', plants: [
    ['Snake Plant', 15], ['Spider Plant', 12], ['Peace Lily', 18],
    ['Boston Fern', 20], ['Rubber Plant', 17], ['Aloe Vera', 14] ] },
  { category: 'Aromatic', plants: [
    ['Lavender', 20], ['Jasmine', 18], ['Rosemary', 15],
    ['Mint', 12], ['Lemon Balm', 14], ['Basil', 10] ] },
  { category: 'Low Maintenance', plants: [
    ['ZZ Plant', 25], ['Pothos', 10], ['Cast Iron Plant', 22],
    ['Jade Plant', 13], ['Succulent Mix', 16], ['Chinese Evergreen', 19] ] },
].map(c => ({
  category: c.category,
  plants: c.plants.map(([name, cost]) => ({ name, cost, image: img(name) })),
}));

export default function ProductList({ onHomeClick }) {
  const dispatch = useDispatch();
  const items = useSelector(s => s.cart.items);
  const [showCart, setShowCart] = useState(false);
  const totalQty = items.reduce((sum, i) => sum + i.quantity, 0);
  const inCart = (name) => items.some(i => i.name === name);

  return (
    <div>
      <nav className="navbar">
        <span className="brand">Paradise Nursery</span>
        <div className="nav-links">
          <a href="#" onClick={e => { e.preventDefault(); onHomeClick(); }}>Home</a>
          <a href="#" onClick={e => { e.preventDefault(); setShowCart(false); }}>Plants</a>
          <a href="#" onClick={e => { e.preventDefault(); setShowCart(true); }}>
            🛒 <span className="cart-count">{totalQty}</span> Cart
          </a>
        </div>
      </nav>

      {showCart ? (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      ) : (
        <div className="product-grid">
          {categories.map(({ category, plants }) => (
            <section key={category}>
              <h2>{category}</h2>
              <div className="cards">
                {plants.map(p => (
                  <div className="card" key={p.name}>
                    <img src={p.image} alt={p.name} />
                    <h3>{p.name}</h3>
                    <p>${p.cost}</p>
                    <button
                      disabled={inCart(p.name)}
                      onClick={() => dispatch(addItem(p))}
                    >
                      {inCart(p.name) ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
