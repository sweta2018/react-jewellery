import React from 'react'
import { Link } from 'react-router-dom'

function HomeCollection() {
  return (
    <>
        <section className="collections-section">
            <div className="container">
                <h2 className="section-title" data-aos="fade-up">Our Collections</h2>
                <p className="section-subtitle" data-aos="fade-up">Explore our newly launched collection</p>
            <Link to="/collections">
                <div className="row g-4 mt-0">
                
                
                    <div className="col-md-6 col-lg-6 mt-0" data-aos="fade-up">
                        <div className="collection-card">
                        <img src="banner1.png" alt="Necklace"/>
                        
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-6 mt-0" data-aos="fade-up">
                        <div className="collection-card">
                        <img src="banner2.png" alt="Earrings"/>
                        
                        </div>
                    </div>
                
                    <div className="col-md-6 col-lg-6 mt-0" data-aos="fade-up">
                        <div className="collection-card">
                        <img src="banner3.png" alt="Rings"/>
                        
                        </div>
                    </div>

                
                    <div className="col-md-6 col-lg-6 d-flex align-items-center" data-aos="fade-up">
                        <div>
                        <h3 className="collection-heading">A Collection for you</h3>
                        <p className="collection-text">Discover how diverse jewellery design can be and choose the one that best expresses your unique style.</p>
                        <a href="#" className="see-all-btn">See all collections →</a>
                        </div>
                    </div>

                </div>
            </Link>
            </div>
        </section>
    </>
  )
}

export default HomeCollection