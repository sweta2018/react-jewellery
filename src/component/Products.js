import React from 'react'

function Products() {
  return (
    <>
        <section className="product-carousel-section py-5">
            <div className="container">
                <h2 className="text-center mb-4">Find Your Perfect Match</h2>
                <div className="product-carousel">
                
                <div className="product-item position-relative">
                    <div className="image-wrapper">
                    <img src="product1.png" className="img-fluid product-img" alt="Product 1"/>
                    <div className="wishlist-icon">
                        <i className="far fa-heart"></i>
                    </div>
                    <button className="add-to-cart">ADD TO CART</button>
                    </div>
                    <div className="product-details text-center mt-2">
                    <h5 className="product-title">Penelope Recycled Earrings</h5>
                    <p className="product-price">
                        <span className="old-price">₹ 1500</span>
                        <span className="new-price">₹ 1000</span>
                    </p>
                    </div>
                </div>

                
                <div className="product-item position-relative">
                    <div className="image-wrapper">
                    <img src="product2.png" className="img-fluid product-img" alt="Product 2"/>
                    <div className="wishlist-icon">
                        <i className="far fa-heart"></i>
                    </div>
                    <button className="add-to-cart">ADD TO CART</button>
                    </div>
                    <div className="product-details text-center mt-2">
                    <h5 className="product-title">Radiant White Stone Chain</h5>
                    <p className="product-price">
                        <span className="old-price">₹ 1500</span>
                        <span className="new-price">₹ 1000</span>
                    </p>
                    </div>
                </div>

                <div className="product-item position-relative">
                    <div className="image-wrapper">
                    <img src="product3.png" className="img-fluid product-img" alt="Product 2"/>
                    <div className="wishlist-icon">
                        <i className="far fa-heart"></i>
                    </div>
                    <button className="add-to-cart">ADD TO CART</button>
                    </div>
                    <div className="product-details text-center mt-2">
                    <h5 className="product-title">Radiant White Stone Chain</h5>
                    <p className="product-price">
                        <span className="old-price">₹ 1500</span>
                        <span className="new-price">₹ 1000</span>
                    </p>
                    </div>
                </div>
                <div className="product-item position-relative">
                    <div className="image-wrapper">
                    <img src="product4.png" className="img-fluid product-img" alt="Product 2"/>
                    <div className="wishlist-icon">
                        <i className="far fa-heart"></i>
                    </div>
                    <button className="add-to-cart">ADD TO CART</button>
                    </div>
                    <div className="product-details text-center mt-2">
                    <h5 className="product-title">Radiant White Stone Chain</h5>
                    <p className="product-price">
                        <span className="old-price">₹ 1500</span>
                        <span className="new-price">₹ 1000</span>
                    </p>
                    </div>
                </div>
                
                </div>
            </div>
        </section>
    </>
  )
}

export default Products