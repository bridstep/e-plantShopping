import { useState } from 'react';
import ProductList from './ProductList';
import AboutUs from './AboutUs';
import './App.css';

function App() {
  const [showProducts, setShowProducts] = useState(false);

  if (showProducts) return <ProductList onHomeClick={() => setShowProducts(false)} />;

  return (
    <div className="landing-page">
      <div className="landing-overlay">
        <h1>Paradise Nursery</h1>
        <AboutUs />
        <button className="get-started" onClick={() => setShowProducts(true)}>
          Get Started
        </button>
      </div>
    </div>
  );
}
export default App;
