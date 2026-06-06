function Cart({ cartItems }) {
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <aside className="cart">
      <h2 className="cart-title">🛒 Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="cart-empty">Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cartItems.map((item, i) => (
              <li key={i} className="cart-item">
                <span className="cart-emoji">{item.emoji}</span>
                <span>{item.name} is in your cart.</span>
                <span className="cart-price">${item.price.toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            Total: <strong>${total.toFixed(2)}</strong>
          </div>
        </>
      )}
    </aside>
  );
}

export default Cart;