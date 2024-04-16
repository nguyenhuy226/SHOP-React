import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import "swiper/css";

import React from "react";

export const Slider = ({ children, sliderPerView = 1, spaceBetween = 0 }) => {
  return (
    <Swiper
      spaceBetween={spaceBetween}
      slidesPerView={sliderPerView}
      onSlideChange={() => console.log("slide change")}
      // onSwiper={(swiper) => console.log(swiper)}
      pagination={{ clickable: true }}
      modules={[Pagination]}
    >
      {React.Children.map(children, (child) => (
        <SwiperSlide>{child}</SwiperSlide>
      ))}
    </Swiper>
  );
};
