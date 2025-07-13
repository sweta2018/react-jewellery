import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import testimonials from '../data/testimonials.json';

function Testimonial() {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    setSlides(testimonials);
  }, []);

  return (
    <section className="testimonial-section">
      <div className="container">
        <h2 className="text-center section-title mb-0">What Our Customers Say</h2>
        <p className="subtitle">Our customers adore our products, and we constantly aim to delight them.</p>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          navigation={false}
          pagination={{ clickable: true }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {slides.map((t) => (
            <SwiperSlide key={t.id}>
              <div className="testimonial-carousel">
                <div className="testimonial-card">
                  <div className="profile-rating-wrap">
                    <div className="profile text-center">
                      <img
                        src={t.photo}
                        alt={t.name}
                        className="rounded-circle mx-auto mb-3"
                      />
                      <div className="name">{t.name}</div>
                    </div>
                    <div className="rating text-center mt-0">
                      <div className="mb-1 text-warning">
                        {[...Array(5)].map((_, i) => (
                            <i
                            key={i}
                            className={`fa-star ${t.rating && i < t.rating ? 'fas' : 'far'}`}
                            ></i>
                        ))}
                      </div>
                     <span className="rating-score">
                        {t.rating ? t.rating.toFixed(1) : 'N/A'}
                    </span>

                    </div>
                  </div>
                  <hr />
                  <p className="review text-center">“{t.message}”</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default Testimonial;
