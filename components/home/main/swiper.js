import React, { useRef, useState } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import styles from "./styles.module.scss";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function MainSwiper() {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        effect="fade"
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 5500,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className={`${styles.swiper} mainSwiper`}
      >
        {[...Array(7).keys()].map((i) => (
          <SwiperSlide key={i}>
            <img
              src={`/images/swiper/${i + 1}.jpg`}
              alt={`swiper-image-${i + 1}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
