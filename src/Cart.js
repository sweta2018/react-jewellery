import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  addToCart,
  removeFromCart,
  clearCart,
  decrementQty,
} from './features/cart/cartSlice';

const Cart = () => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const shippingCharge = 100;
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const totalAmount = subtotal + shippingCharge;

  if (cart.length === 0) {
    return <h2 className="text-center mt-5 mb-5"><strong>🛒 Your cart is empty</strong></h2>;
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">Your Cart</h2>
      <div className="row">
        <div className="col-lg-8">
          <h5 className="fw-bold mb-2">Shopping Cart</h5>
          <p className="text-muted mb-4">You have {cart.length} item(s) in your cart</p>

          {cart.map(item => (
            <div className="cart-item d-flex align-items-center justify-content-between mb-3" key={item.id}>
              <img
                src={item.image}
                alt={item.name}
                style={{ width: '60px', height: '60px', objectFit: 'cover' }}
              />
              <div className="cart-info flex-grow-1 px-3">
                <h6 className="mb-1">{item.name}</h6>
                <small className="text-muted">{item.category}</small>
              </div>
              <div className="qty-control d-flex align-items-center gap-2">
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => dispatch(decrementQty(item.id))}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => dispatch(addToCart(item))}
                >
                  +
                </button>
              </div>
              <div className="price mx-3">₹{(item.price * item.quantity).toFixed(2)}</div>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => dispatch(removeFromCart(item.id))}
              >
                <i className="far fa-trash-alt"></i>
              </button>
            </div>
          ))}

          <button
            className="btn btn-outline-danger mt-3"
            onClick={() => dispatch(clearCart())}
          >
            Clear Cart
          </button>
        </div>

        <div className="col-lg-4">
          <div className="order-summary p-4 border rounded shadow-sm">
            <h5 className="mb-4">Order Summary</h5>
            <div className="d-flex justify-content-between mb-2">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between mb-3">
              <span>Shipping</span>
              <span>₹{shippingCharge.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between fw-bold mb-4">
              <span>Total (Tax incl.)</span>
              <span>₹{totalAmount.toFixed(2)}</span>
            </div>
            <button className="btn btn-dark w-100">
             <Link to="/checkout"> ₹{totalAmount.toFixed(2)} Checkout <i className="fas fa-arrow-right ms-2"></i></Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
