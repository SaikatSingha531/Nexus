"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const slideData = [
  { id: 1, src: "/slide1.png", title: "Future of Design", subtitle: "01 / INNOVATION" },
  { id: 2, src: "/slide2.png", title: "Mastering React", subtitle: "02 / DEVELOPMENT" },
  { id: 3, src: "/slide3.png", title: "Cloud Systems", subtitle: "03 / INFRASTRUCTURE" },
  { id: 4, src: "/slide4.jpg", title: "Data Analytics", subtitle: "04 / INSIGHTS" },
  { id: 5, src: "/slide5.png", title: "Neural Networks", subtitle: "05 / INTELLIGENCE" },
];

const Carousel = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Clean, Thin Heading */}
      <header className="mb-10 border-l-2 border-blue-600 pl-6">
        <p className="text-xs font-bold tracking-[0.2em] text-blue-600 uppercase mb-1">Platform</p>
        <h1 className="text-4xl md:text-5xl font-light tracking-tight text-gray-900">
          Welcome <span className="font-semibold text-gray-400 italic">Learner</span>
        </h1>
      </header>

      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        speed={1000}
        loop={true}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        pagination={{ 
          clickable: true,
          el: '.custom-pagination'
        }}
        className="rounded-lg overflow-hidden"
      >
        {slideData.map((slide) => (
          <SwiperSlide key={`slide-${slide.id}`}>
            <div className="relative w-full aspect-[16/10] md:aspect-[21/9]">
              
              <Image
                src={slide.src}
                alt={slide.title}
                fill
                className="object-cover"
                priority={slide.id === 1}
                sizes="(max-width: 1280px) 100vw, 1280px"
              />

              {/* Minimal Bottom-Weighted Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t rounded-md from-black/80 via-black/20 to-transparent" />

              {/* Clean Bottom-Left Text */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 text-white">
                <div className="max-w-2xl space-y-2">
                  <span className="text-xs md:text-sm font-medium tracking-widest text-blue-400 uppercase">
                    {slide.subtitle}
                  </span>
                  
                  <h2 className="text-3xl md:text-6xl font-bold tracking-tight">
                    {slide.title}
                  </h2>
                  
                  <p className="text-sm md:text-lg text-gray-300 font-light">
                    Elevate your professional trajectory with curated industry content.
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Custom Bottom Pagination Container */}
        <div className="custom-pagination flex justify-center mt-6 gap-2" />
      </Swiper>

      {/* Modern Slim Pagination Styling */}
      <style jsx global>{`
        .custom-pagination .swiper-pagination-bullet {
          width: 40px;
          height: 3px;
          border-radius: 0;
          background: #e2e8f0;
          opacity: 1;
          transition: all 0.3s ease;
          margin: 0 !important;
        }
        .custom-pagination .swiper-pagination-bullet-active {
          background: #2563eb;
        }
      `}</style>
    </div>
  );
};

export default Carousel;