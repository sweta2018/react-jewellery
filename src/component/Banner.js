import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
function Banner() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 4000,
    arrows: true,
    pauseOnHover: false
  };

  const slides = [
    {
      id: 1,
      image: 'banner1.jpg',
      logo: 'logo-jewel.png',
     heading: (
      <>
        <span>Luxury</span> in Full Bloom
      </>
    ),
      subHeading: 'Summer Sale Now On',
      text: 'Because every summer look needs a little shine.',
    },
    {
      id: 2,
      image: 'banner2.jpg',
      logo: 'logo-jewel.png',
       heading: (
      <>
        Shine with <span>every step</span> you take.
      </>
    ),
      subHeading: '',
      text: 'A jewel for every journey.',
    },
  ];

  return (
    <section className="hero-section">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id}>
            <div
              className="banner-slide"
              style={{
                background: `url('${slide.image}') center center/cover no-repeat`,
                height: '90vh',
              }}
            >
              <div className="container text-white text-center d-flex flex-column justify-content-center align-items-center h-100">
               
                  <div className="offset-md-6 col-md-6 mb_banner_light">
                    <img
                      src={slide.logo}
                      alt="pandora"
                      className="mb-3 mx-auto"
                      style={{ maxHeight: "50px" }}
                    />
                    <h1 className="mb-2">{slide.heading}</h1>
                    {slide.subHeading && <h2 className="mb-2">{slide.subHeading}</h2>}
                    <p>{slide.text}</p>
                    <Link to="/collections" className="btn btn-light mt-3">
                      Shop Now
                    </Link>
                  </div>
               
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}

export default Banner;
