import React from 'react'

function Instagram() {
  return (
    <>
        <section className="instagram-section">
            <div className="container-fluid">
                <h2>Shop Instagram</h2>
                <p>Elevate your wardrobe with fresh finds today!</p>
                <div className="insta-grid">
                <div className="insta-img"><img src="/insta-pic1.png" alt="Instagram 1"/></div>
                <div className="insta-img"><img src="/insta-pic2.png" alt="Instagram 2"/></div>
                <div className="insta-img"><img src="/insta-pic3.png" alt="Instagram 3"/></div>
                <div className="insta-img"><img src="/insta-pic4.png" alt="Instagram 4"/></div>
                </div>
            </div>
        </section>
    </>
  )
}

export default Instagram