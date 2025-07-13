import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProducts } from './features/product/productSlice';
import { addToCart } from './features/cart/cartSlice';
import { toggleWishlist } from './features/wishlist/wishlistSlice';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Testimonial from './component/Testimonial';
import Trust from './component/Trust';
import Instagram from './component/Instagram';

const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { items, status } = useSelector(state => state.product);
  const wishlist = useSelector(state => state.wishlist);

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);

  // ✅ Fetch products on first load if needed
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  // ✅ Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const product = items.find(p => p.id === parseInt(id));

  // ✅ Handle loading or error states
  if (status === 'loading') {
    return <div className="container py-5 text-center">Loading product...</div>;
  }

  if (status === 'failed') {
    return <div className="container py-5 text-center text-danger">Failed to load product.</div>;
  }

  if (!product) {
    return <div className="container py-5 text-center">Product not found.</div>;
  }

  const isWished = wishlist.find(item => item.id === product.id);

const handleAddToCart = () => {
  dispatch(addToCart({ ...product, quantity }));
  toast.success('Product added to cart ✅');
  navigate('/cart');
};

const handleBuyNow = () => {
  dispatch(addToCart({ ...product, quantity }));
  toast.success('Redirecting to checkout...');
  navigate('/checkout');
};

  return (
    <>
   
    <div className="container my-5 product-details">
      <div className="row">
        {/* Image Gallery */}
        <div className="col-md-6">
          <div className="main-image mb-3">
            <img
              src={selectedImage || product.image}
              alt={product.name}
              className="img-fluid rounded"
            />
          </div>
          <div className="thumbnail-gallery d-flex gap-2">
            {product.images?.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`thumb-${idx}`}
                className={`thumbnail ${selectedImage === img ? 'active' : ''}`}
                onClick={() => setSelectedImage(img)}
                style={{
                  width: 100,
                  height: 100,
                  objectFit: 'cover',
                  cursor: 'pointer',
                  border: selectedImage === img ? '2px solid black' : '1px solid #ccc',
                }}
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="col-md-6">
          <h5 className="text-success">{product.inStock} in Stock</h5>
          <h2>{product.name}</h2>
           <div className="d-flex align-items-center mt-2 justify-content-between">
            <div className="fs-4">
              <del>
              ₹{product.cutOffPrice}
              </del>
                <span className="text-danger fw-bold">₹{product.price}</span>{' '}
               
            </div>
            <div className="sold_out d-flex align-items-center gap-2">
  <span className="text-warning">
    {[...Array(5)].map((_, i) => {
      const fullStar = product.rating >= i + 1;
      const halfStar = product.rating >= i + 0.5 && product.rating < i + 1;
      return (
        <i
          key={i}
          className={
            fullStar
              ? 'fas fa-star'
              : halfStar
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      );
    })}
  </span>
  <span className="text-muted small">({product.rating} / 5)</span>
</div>

            
          </div>
           {/* Bootstrap Tabs */}
          <ul className="nav nav-tabs mt-2 tabs" id="productTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="description-tab"
                data-bs-toggle="tab"
                data-bs-target="#description"
                type="button"
                role="tab"
                aria-controls="description"
                aria-selected="true"
              >
                Description
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="shipping-tab"
                data-bs-toggle="tab"
                data-bs-target="#shipping"
                type="button"
                role="tab"
                aria-controls="shipping"
                aria-selected="false"
              >
                Shipping & Returns
              </button>
            </li>
          </ul>

          <div className="tab-content  py-3 mt-0 pb-0" id="productTabContent">
            <div
              className="tab-pane fade show active"
              id="description"
              role="tabpanel"
              aria-labelledby="description-tab"
            >
              <p>{product.description}</p>
            </div>
            <div
              className="tab-pane fade"
              id="shipping"
              role="tabpanel"
              aria-labelledby="shipping-tab"
            >
              <p>
                Free delivery on all orders above ₹2000. Returns accepted within 14 days of delivery.
                Item must be unused and in original packaging. You will be responsible for return shipping costs.
              </p>
            </div>
          </div>
         
           <div className="mt-0">
            <label className="form-label">Category</label>
            <div><button className="btn btn-dark p-2">{product.category}</button></div>
          </div>
          

          {/* Stock */}
          

          {/* Quantity Controls */}
          <div className="d-flex align-items-center my-3">
            <label className="me-3">Quantity:</label>
            <button
              className="btn btn-outline-secondary incr_btn"
              onClick={() => quantity > 1 && setQuantity(quantity - 1)}
            >
              −
            </button>
            <span className="qnty_feild">{quantity}</span>
            <button
              className="btn btn-outline-secondary dec_btn"
              onClick={() => quantity < product.inStock && setQuantity(quantity + 1)}
              disabled={quantity >= product.inStock}
            >
              +
            </button>
          </div>

          {/* Action Buttons */}
         <div className="mt-4 d-flex gap-2">
            <button
              className="btn btn-dark w-50"
              disabled={product.inStock === 0}
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            <button
              className="btn btn-outline-dark w-50"
              disabled={product.inStock === 0}
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
            <button
              className="btn btn-light"
              onClick={() => dispatch(toggleWishlist(product))}
              title={isWished ? 'Remove from Wishlist' : 'Add to Wishlist'}
            >
              {isWished ? <FaHeart color="red" /> : <FaRegHeart />}
            </button>
          </div>

          {/* Shipping Icons */}
          <div className="mt-4">
            <div className="icon-box"><i className="fas fa-shield-alt"></i> 1 year warranty</div>
            <div className="icon-box"><i className="fas fa-truck"></i> Free Shipping on orders above ₹2000</div>
            <div className="icon-box"><i className="fas fa-undo"></i> Easy returns within 14 Days</div>
          </div>

         
        </div>
      </div>
     
    </div>
     <Testimonial />
      <Trust/>
      <Instagram/>
     </>
  );
};
//  <div className="container my-5">
//       <h4 className="mb-4">Product Reviews</h4>
//       <div className="row">
    
//         <div className="col-md-8">
//           <div className="rating-summary d-flex align-items-center justify-content-between">
//             <div className="d-flex align-items-center gap-3">
//               <div className="score">4.5</div>
//               <div>
//                 <div className="star-rating mb-1">
//                   <i className="fas fa-star"></i>
//                   <i className="fas fa-star"></i>
//                   <i className="fas fa-star"></i>
//                   <i className="fas fa-star"></i>
//                   <i className="fas fa-star-half-alt"></i>
//                 </div>
//                 <p className="mb-0 text-muted small">from 1.25k reviews</p>
//               </div>
//             </div>

//             <div className="w-50">
//               <div className="d-flex align-items-center mb-1">
//                 <div className="me-2">5.0</div>
//                 <div className="flex-grow-1 rating-bar"><div className="rating-bar-fill" style="width: 90%"></div></div>
//                 <div className="ms-2 small">2823</div>
//               </div>
//               <div className="d-flex align-items-center mb-1">
//                 <div className="me-2">4.0</div>
//                 <div className="flex-grow-1 rating-bar"><div className="rating-bar-fill" style="width: 60%"></div></div>
//                 <div className="ms-2 small">38</div>
//               </div>
//               <div className="d-flex align-items-center mb-1">
//                 <div className="me-2">3.0</div>
//                 <div className="flex-grow-1 rating-bar"><div className="rating-bar-fill" style="width: 20%"></div></div>
//                 <div className="ms-2 small">4</div>
//               </div>
//               <div className="d-flex align-items-center mb-1">
//                 <div className="me-2">2.0</div>
//                 <div className="flex-grow-1 rating-bar"><div className="rating-bar-fill" style="width: 0%"></div></div>
//                 <div className="ms-2 small">0</div>
//               </div>
//               <div className="d-flex align-items-center">
//                 <div className="me-2">1.0</div>
//                 <div className="flex-grow-1 rating-bar"><div className="rating-bar-fill" style="width: 0%"></div></div>
//                 <div className="ms-2 small">0</div>
//               </div>
//             </div>
//           </div>
//         </div>

    
//         <div className="col-md-4">
//           <div className="filter-box">
//             <h6>Reviews Filter</h6>
//             <p className="mb-1 fw-bold">Rating</p>
//             <div className="form-check"><input className="form-check-input" type="checkbox" id="r5"/><label className="form-check-label" for="r5">5</label></div>
//             <div className="form-check"><input className="form-check-input" type="checkbox" id="r4"/><label className="form-check-label" for="r4">4</label></div>
//             <div className="form-check"><input className="form-check-input" type="checkbox" id="r3"/><label className="form-check-label" for="r3">3</label></div>
//             <div className="form-check"><input className="form-check-input" type="checkbox" id="r2"/><label className="form-check-label" for="r2">2</label></div>
//             <div className="form-check"><input className="form-check-input" type="checkbox" id="r1"/><label className="form-check-label" for="r1">1</label></div>

//             <p className="mb-1 mt-3 fw-bold">Review Topics</p>
//             <div className="form-check"><input className="form-check-input" type="checkbox" id="q1"/><label className="form-check-label" for="q1">Product Quality</label></div>
//             <div className="form-check"><input className="form-check-input" type="checkbox" id="q2"/><label className="form-check-label" for="q2">Seller Services</label></div>
//             <div className="form-check"><input className="form-check-input" type="checkbox" id="q3"/><label className="form-check-label" for="q3">Product Price</label></div>
//             <div className="form-check"><input className="form-check-input" type="checkbox" id="q4"/><label className="form-check-label" for="q4">Shipment</label></div>
//             <div className="form-check"><input className="form-check-input" type="checkbox" id="q5"/><label className="form-check-label" for="q5">Match with Description</label></div>
//           </div>
//         </div>
//       </div>

      
//       <div className="review-tabs my-4">
//         <button className="btn btn-outline-dark me-2">All Reviews</button>
//         <button className="btn btn-outline-dark me-2">With Photo & Video</button>
//         <button className="btn btn-outline-dark">With Description</button>
//       </div>


//       <div className="review-box">
//         <div className="star-rating mb-2">
//           <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
//         </div>
//         <p className="fw-bold mb-1">This is amazing product I have.</p>
//         <p className="text-muted small mb-1">July 2, 2020 03:29 PM</p>
//         <div className="d-flex justify-content-between">
//           <div className="d-flex align-items-center gap-2">
//             <img src="https://randomuser.me/api/portraits/men/32.jpg" className="review-avatar" alt=""/>
//             <span className="small">Darrell Steward</span>
//           </div>
//           <div className="review-buttons d-flex gap-2">
//             <button className="btn btn-sm"><i className="fas fa-thumbs-up"></i> 128</button>
//             <button className="btn btn-sm"><i className="fas fa-thumbs-down"></i></button>
//           </div>
//         </div>
//       </div>

//       <div className="review-box">
//         <div className="star-rating mb-2">
//           <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
//         </div>
//         <p className="fw-bold mb-1">This is amazing product I have.</p>
//         <p className="text-muted small mb-1">July 2, 2020 1:04 PM</p>
//         <div className="d-flex justify-content-between">
//           <div className="d-flex align-items-center gap-2">
//             <img src="https://randomuser.me/api/portraits/women/44.jpg" className="review-avatar" alt=""/>
//             <span className="small">Darlene Robertson</span>
//           </div>
//           <div className="review-buttons d-flex gap-2">
//             <button className="btn btn-sm"><i className="fas fa-thumbs-up"></i> 82</button>
//             <button className="btn btn-sm"><i className="fas fa-thumbs-down"></i></button>
//           </div>
//         </div>
//       </div>

      


//       <nav className="mt-4">
//         <ul className="pagination justify-content-center gap-2">
//           <li className="page-item active"><a className="page-link" href="#">1</a></li>
//           <li className="page-item"><a className="page-link" href="#">2</a></li>
//           <li className="page-item disabled"><a className="page-link" href="#">...</a></li>
//           <li className="page-item"><a className="page-link" href="#">10</a></li>
//           <li className="page-item"><a className="page-link" href="#"><i className="fas fa-chevron-right"></i></a></li>
//         </ul>
//       </nav>
//       </div>
export default ProductDetails;
