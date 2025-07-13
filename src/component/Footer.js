import React from 'react'

function Footer() {
  return (
    <>
        <footer className="site-footer">
            <div className="container">
                <div className="row">
                    <div className="footer-col logo-col col-md-4">
                    <h2><img src="/logo-jewel.png" className="img-fluid" /></h2>
                    <p>Dive into the world of luxury and discover exceptionally elaborate, full of shine and splendor gold jewellery with diamonds</p>
                    <div className="subscribe-box">
                        <input type="email" placeholder="youremail@gmail.com" />
                        <button>Subscribe</button>
                    </div>
                    </div>
                    <div className="footer-col logo-col col-md-1"></div>
                    <div className="footer-col col-md-2">
                    <h4>Company</h4>
                    <ul>
                        <li><a href="#">Our Story</a></li>
                        <li><a href="#">Terms of Service</a></li>
                        <li><a href="#">Retail Stores</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                    </ul>
                    </div>

                    <div className="footer-col col-md-2">
                    <h4>Get in Touch</h4>
                    <ul>
                        <li><a href="#">Contact Us</a></li>
                        <li><a href="#">Return & Exchanges</a></li>
                        <li><a href="#">Blogs</a></li>
                        <li><a href="#">Help & FAQs</a></li>
                    </ul>
                    </div>

                    <div className="footer-col col-md-3">
                    <h4>Popular Categories</h4>
                    <ul>
                        <li><a href="#">Necklace</a></li>
                        <li><a href="#">Earrings</a></li>
                        <li><a href="#">Rings</a></li>
                        <li><a href="#">Bracelet</a></li>
                    </ul>
                    </div>
                </div>

                <div className="footer-socials mt-4">
                    <h4>JOIN US ON SOCIALS</h4>
                    <div className="social-icons">
                    <a href="#"><i className="fab fa-facebook-f"></i></a>
                    <a href="#"><i className="fab fa-instagram"></i></a>
                    <a href="#"><i className="fab fa-twitter"></i></a>
                    </div>
                    <p>
                    For Queries on your order, Checking order status or for Returns/Exchange Email at
                    <a href="mailto:orders@pandora.com">orders@pandora.com</a>
                    </p>
                </div>
            </div>
            <div className="footer-bottom bg-dark text-white">
                <div className="container"> 
                <div className="d-flex justify-content-between">
                        <div className="footer-links">
                        <a href="#">Trust & Legal Centre</a>
                        <a href="#">Terms & Conditions</a>
                        <a href="#">Privacy Policy</a>
                        </div>
                        <p>&copy; All Rights Reserved © Copyright 2025</p>
                </div>

                </div>
                
            </div>
        </footer>

    </>
  )
}

export default Footer