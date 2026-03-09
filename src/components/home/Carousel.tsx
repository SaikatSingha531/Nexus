"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/swiper.css";
import "swiper/css/pagination";

const slideData = [
  { id: 1, src: "/slide1.png", alt: "Description 1" },
  { id: 2, src: "/slide2.png", alt: "Description 2" },
  { id: 3, src: "/slide3.png", alt: "Description 3" },
  { id: 4, src: "/slide4.jpg", alt: "Description 4" },
  { id: 5, src: "/slide5.png", alt: "Description 5" },
];

const Carousel = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
      
      {/* Heading */}
      <h1 className="mb-6 md:mb-8 font-extralight text-3xl sm:text-4xl md:text-5xl">
        Welcome Learner
      </h1>

      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="rounded-xl md:rounded-2xl overflow-hidden shadow-xl"
      >
        {slideData.map((slide) => (
          <SwiperSlide key={`slide-${slide.id}`}>
            {/* Responsive height */}
            <div className="relative w-full h-[220px] sm:h-[280px] md:h-[360px] lg:h-[420px] xl:h-[460px] overflow-hidden">

              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                className="object-cover"
                priority={slide.id === 1}
                sizes="(max-width: 768px) 100vw,
                       (max-width: 1200px) 100vw,
                       1280px"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />

              {/* Text Content */}
              <div className="absolute inset-0 flex items-center px-4 sm:px-8 md:px-14 lg:px-20 text-white">
                <div className="max-w-xs sm:max-w-sm md:max-w-md">

                  <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-3 drop-shadow-lg">
                    Master Your Skills
                  </h2>

                  <p className="text-sm sm:text-base md:text-lg opacity-90 mb-3 md:mb-5 drop-shadow-md">
                    Start your learning journey with our expert-led courses.
                  </p>

                </div>
              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;