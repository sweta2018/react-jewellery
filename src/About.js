import React from 'react'

function About() {
  return (
    <>
      <section className="about_us">
        <div className="container py-5">
          <div className="row align-items-center">
            
            <div className="col-lg-4 mb-4 mb-lg-0">
              <div className="year">About Pandora</div>
              <p className="mb-3">Vestibulum lorem sed risus ultricies tristique nulla aliquet enim. Mauris pharetra et ultrices neque ornare.</p>
              <button className="desc-btn">DISCOVER NOW</button>
            </div>
            <div className="col-lg-5 mb-4 mb-lg-0 text-center">
              <img src="about2.png" className="img-fluid rounded" alt="Jewelry Image"/>
            </div>

            
            <div className="col-lg-3 text-center text-lg-start">
              <div className="mb-5">
                <div className="stats-number">35+</div>
                <div className="stats-label">Shops All Over The World</div>
              </div>
              <div className="mb-5">
                <div className="stats-number">100%</div>
                <div className="stats-label">Happy Clients</div>
              </div>
              <div>
                <div className="stats-number">65+</div>
                <div className="stats-label">Years of Experience</div>
              </div>
            </div>
          </div>    
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="feature-section">
      
                  <div className="feature-img"></div>

      
                  <div className="feature-content">
                    <h2>The Most Exquisite And Opulent Designer Jewelry</h2>
                    <p>
                      A scelerisque purus semper eget duis. Ac turpis egestas maecenas pharetra convallis posuere morbi leo urna. 
                      Vel quam elementum pulvinar etiam non quam. Urna id volutpat lacus laoreet non curabitur gravida. Pretium 
                      viverra suspendisse potenti nullam ac tortor.
                    </p>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="icon-box">
                          <div className="icon-circle"><img src="abt1.png" alt='icon1'/></div>
                          <div className="icon-text">100% Custom-Made Jewelry</div>
                        </div>
                        <div className="icon-box">
                          <div className="icon-circle"><img src="abt2.png" alt='icon2'/></div>
                          <div className="icon-text">Certified Diamonds</div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="icon-box">
                          <div className="icon-circle"><img src="abt3.png" alt='icon3'/></div>
                          <div className="icon-text">Internal Quality Tested</div>
                        </div>
                        <div className="icon-box">
                          <div className="icon-circle"><img src="abt4.png" alt='icon4'/></div>
                          <div className="icon-text">Guarantee For Gold Purity</div>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default About