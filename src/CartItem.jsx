import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './ProductList.css';

export default function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const items = useSelector(s => s.cart.items);

  const totalAmount = items.reduce((s, i) => s + i.cost * i.quantity, 0);
  const totalQty = items.reduce((s, i) => s + i.quantity, 0);

  const increase = (i) => dispatch(updateQuantity({ name: i.name, quantity: i.quantity + 1 }));
  const decrease = (i) =>
    i.quantity > 1
      ? dispatch(updateQuantity({ name: i.name, quantity: i.quantity - 1 }))
      : dispatch(removeItem(i.name));

  return (
    <div className="cart">
      <h2>Total Plants: {totalQty}</h2>
      <h2>Total Cart Amount: ${totalAmount}</h2>

      {items.map(i => (
        <div className="cart-item" key={i.name}>
          <img src={i.image} alt={i.name} />
          <div className="cart-details">
            <h3>{i.name}</h3>
            <p>Unit price: ${i.cost}</p>
            <div className="qty">
              <button onClick={() => decrease(i)}>−</button>
              <span>{i.quantity}</span>
              <button onClick={() => increase(i)}>+</button>
            </div>
            <p>Subtotal: ${i.cost * i.quantity}</p>
            <button className="delete" onClick={() => dispatch(removeItem(i.name))}>Delete</button>
          </div>
        </div>
      ))}

      <div className="cart-actions">
        <button onClick={onContinueShopping}>Continue Shopping</button>
        <button onClick={() => alert('Coming Soon')}>Checkout</button>
      </div>
    </div>
  );
}
