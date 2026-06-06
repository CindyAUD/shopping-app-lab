import ProductCard from "./ProductCard";
import { categories } from "../src/data";

function ProductList({ products, category, setCategory, cartItems, onAddToCart }) {
  const filtered = category === "All"
    ? products
    : products.filter(p => p.category === category);

  return (
    <section className="product-list-section">
      <div className="filter-bar">
        <label htmlFor="category-filter" className="filter-label">Filter by Category:</label>
        <select
          id="category-filter"
          className="filter-select"
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="product-grid">
        {filtered.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            isInCart={cartItems.some(item => item.id === product.id)}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="no-products">No products available.</p>
      )}
    </section>
  );
}

export default ProductList;