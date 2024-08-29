import React from 'react';
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import LeftNavigationButton from '../LeftNavigationButton/LeftNavigationButton';
import RightNavigationButton from '../RightNavigationButton/RightNavigationButton';
import styles from '../Carousel/Carousel.module.css'; // Import CSS module

const Carousel = ({ items, renderItem }) => {
  if (!Array.isArray(items) || typeof renderItem !== 'function') {
    return <div>Error: Invalid props provided.</div>;
  }

  return (
    <Swiper
      modules={[Navigation]}
      spaceBetween={20}
      slidesPerView={3}
      navigation={{
        nextEl: `.${styles.swiperButtonNext}`,
        prevEl: `.${styles.swiperButtonPrev}`,
      }}
      breakpoints={{
        320: {
          slidesPerView: 1,
        },
        480: {
            slidesPerView: 2,
          },
        640: {
          slidesPerView: 3,
        },
        768: {
          slidesPerView: 4,
        },
        1024: {
          slidesPerView: 5,
        },
        1200: {
          slidesPerView: 6,
        },
      }}
    >
      {items.map((item, index) => (
        <SwiperSlide key={index}>
          {renderItem(item)}
        </SwiperSlide>
      ))}
      <div className={styles.swiperButtonPrev} aria-label="Previous slide">
        <LeftNavigationButton />
      </div>
      <div className={styles.swiperButtonNext} aria-label="Next slide">
        <RightNavigationButton />
      </div>
    </Swiper>
  );
};

Carousel.propTypes = {
  items: PropTypes.array.isRequired,
  renderItem: PropTypes.func.isRequired,
};

export default Carousel;
