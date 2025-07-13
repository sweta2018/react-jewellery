import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWishlist } from './features/wishlist/wishlistSlice';
import { addToCart } from './features/cart/cartSlice';
// import { FaHeart } from 'react-icons/fa';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const wishlist = useSelector(state => state.wishlist);
  const dispatch = useDispatch();

  if (wishlist.length === 0) {
    return <h2 className="text-center mt-5 mb-5">Your wishlist is empty 💔</h2>;
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center m">Your Wishlist</h2>
      <div className="row">
        {wishlist.map(product => (
          <div className="col-md-3 mb-4" key={product.id}>
            <div className="card h-100 position-relative">
              <img src={product.image} alt={product.name} className="card-img-top" />
              <div className="card-body text-center">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">${product.price}</p>
                <button
                  className="btn btn-dark btn-sm w-100 py-2"
                  onClick={() => dispatch(addToCart(product))}
                  disabled={!product.inStock}
                >
                  Add to Cart
                </button>
              </div>
              <div className="wishlist-icon">
                  <button style={{ top: '10px', right: '10px' }}
                onClick={() => dispatch(toggleWishlist(product))}
              >
                <FaHeart color="red" />
              </button>
              </div>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
