import { useState } from "react";
import DarkModeToggle from "../components/DarkModeToggle";
import ProductList from "../components/ProductList";
import Cart from "../components/Cart";
import { products } from "./data";
import "./App.css";

function App() {
  const [darkMode, setDarkMode]   = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [category, setCategory]   = useState("All");

  function handleAddToCart(product) {
    // Prevent duplicates
    if (!cartItems.find(item => item.id === product.id)) {
      setCartItems([...cartItems, product]);
    }
  }

  return (
    <div className={`app ${darkMode ? "dark" : "light"}`}>
      {/* Header */}
      <header className="app-header">
        <div className="header-brand">
          <span className="header-logo">🛍️</span>
          <h1 className="header-title">FreshMart</h1>
        </div>
        <div className="header-actions">
          <span className="cart-count">
            🛒 {cartItems.length} item{cartItems.length !== 1 ? "s" : ""}
          </span>
          <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        </div>
      </header>

      {/* Main layout */}
      <main className="app-main">
        <ProductList
          products={products}
          category={category}
          setCategory={setCategory}
          cartItems={cartItems}
          onAddToCart={handleAddToCart}
        />
        <Cart cartItems={cartItems} />
      </main>
    </div>
  );
}

export default App;

