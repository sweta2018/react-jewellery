import React from 'react'

function Trust() {
  return (
    <>
        <section className="trust-bar">
            <div className="trust-container">
                <div className="trust-item">
                <i className="fas fa-undo"></i>
                <div>
                    <h4>14-Day Returns</h4>
                    <p>Risk-Free Shopping With Easy Returns.</p>
                </div>
                </div>
                <div className="trust-item">
                <i className="fas fa-shipping-fast"></i>
                <div>
                    <h4>Free Shipping</h4>
                    <p>No Extra Costs, Just The Price You See.</p>
                </div>
                </div>
                <div className="trust-item">
                <img src="headset-solid.svg" alt='support'/>
                <div>
                    <h4>Support 24/7</h4>
                    <p>24/7 Support, Always Here Just For You.</p>
                </div>
                </div>
                <div className="trust-item">
                <i className="fas fa-percent"></i>
                <div>
                    <h4>Member Discounts</h4>
                    <p>Special Prices For Our Loyal Customers.</p>
                </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default Trust