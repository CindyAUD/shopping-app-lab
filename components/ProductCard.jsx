function ProductCard({ product, onAddToCart, isInCart }) {
  return (
    <div className={`product-card ${isInCart ? "in-cart" : ""}`}>
      <div className="product-emoji">{product.emoji}</div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <span className="product-category">{product.category}</span>
        <span className="product-price">${product.price.toFixed(2)}</span>
      </div>
      {isInCart ? (
        <span className="in-cart-badge">✓ In Cart</span>
      ) : (
        <button
          className="add-btn"
          onClick={() => onAddToCart(product)}
        >
          Add to Cart
        </button>
      )}
    </div>
  );
}

export default ProductCard;