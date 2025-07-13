import React from 'react'
import { Link } from 'react-router-dom'

function ThankYou() {
  return (
    <>
        <section className="thank-you text-center py-5">
            <div className="container">
                <div className="checkmark mx-auto">
                <img src="order-details-order-status 1.svg" alt="Success" />
                </div>
                <h2 className="fw-bold">Thank you</h2>
                <h1 className="fw-bold mb-3">Your order is on the way!</h1>
                <p className="lead mb-4">Great news! Your order is all set to hit the road. We're packing it up with care<br/> and it'll be on its way to you in no time.</p>
                <Link to="/collections" className="btn btn-dark">Keep Shopping</Link>
               
            </div>
        </section>
    </>
  )
}

export default ThankYou