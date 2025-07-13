import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addToCart } from '../features/cart/cartSlice';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { toggleWishlist } from '../features/wishlist/wishlistSlice';

const ProductCard = ({ products }) => {
  const dispatch = useDispatch();

  const wishlist = useSelector(state => state.wishlist);
  const cart = useSelector(state => state.cart); // ✅ access cart state

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    window.scrollTo({ top: 0, behavior: 'smooth' });
    toast.success(`${product.name} added to cart! ✅`, {
      position: "top-center",
      autoClose: 2000,
    });
  };

  return (
    <section className="product-carousel-section py-3">
      <div className="container">
        <h2 className="text-center mb-4 section-title">Find Your Perfect Match</h2>
        <Swiper
        modules={[Navigation]} 
        spaceBetween={30}
        slidesPerView={4}
        loop={true}
        navigation={true}
        breakpoints={{
          320: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}

        >
          {products.map(product => {
            const isWished = wishlist?.some(item => item.id === product.id);
            const isInCart = cart?.some(item => item.id === product.id); // ✅ check if already in cart

            return (
              <SwiperSlide key={product.id}>
                <div className="product-item position-relative">
                  <div className="image-wrapper">
                    <Link to={`/product/${product.id}`}><img
                      src={product.image}
                      alt={product.name}
                      className="img-fluid product-img"
                    /></Link>
                    <div
                      className="wishlist-icon"
                      onClick={() => dispatch(toggleWishlist(product))}
                    >
                      {isWished ? <FaHeart color="red" /> : <FaRegHeart />}
                    </div>
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={isInCart || !product.inStock} // ✅ disable if already in cart or out of stock
                      className={`add-to-cart btn ${isInCart ? 'btn-success' : 'btn-primary'}`}
                    >
                      {isInCart ? "Added" : "Add to Cart"} {/* ✅ button label */}
                    </button>
                  </div>
                  <div className="product-details text-center mt-2">
                    <Link to={`/product/${product.id}`}><h5 className="product-title">{product.name}</h5></Link>
                    <p className="product-price">
                      <span
                        className="old-price"
                        style={{
                          textDecoration: 'line-through',
                          color: 'gray',
                        }}
                      >
                        ₹{product.cutOffPrice}
                      </span>
                      <span className="new-price">
                        <strong> ₹{product.price}</strong>
                      </span>
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};

export default ProductCard;
