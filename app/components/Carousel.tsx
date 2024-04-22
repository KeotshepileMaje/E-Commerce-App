import React, { useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled, RxShadowOuter } from "react-icons/rx";

const Carousel = () => {
  const slides = [
    {
      isBanner: true,
      content: (
        <div className="h-full relative bg-gradient-to-r from-sky-500 to-sky-700 mb-8">
          <div className="mx-auto px-8 py-12 flex flex-col gap-2 md:flex-row items-center justify-evenly">
            <div className="mb-8 md:mb-0 text-center">
              <h1 className="text-4xl md:text-6xl text-white mb-4">
                Summer Sale
              </h1>
              <div className="text-lg md:text-xl text-white md-2">
                Enjoy discount on selected items
              </div>
              <p className="text-2xl md:text-5xl text-yellow-400 font-bold">
                GET 50% OFF
              </p>
            </div>
            <div className="w-2/3 md:w-1/3 relative aspect-video">
              <img
                alt="banner"
                src="/banner-image.png"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      url: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80",
    },
    {
      url: "https://images.unsplash.com/photo-1661961112951-f2bfd1f253ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2672&q=80",
    },
    {
      url: "https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2253&q=80",
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="max-w-[1400px] w-full m-auto py-16 relative group">
      {/* Render the current slide */}
      {slides[currentIndex].isBanner ? (
        slides[currentIndex].content
      ) : (
        <div
          style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
          className="h-[500px] w-full  rounded-2xl bg-center bg-cover duration-500"
        ></div>
      )}

      {/* Left Arrow */}
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactLeft onClick={prevSlide} size={30} />
      </div>
      {/* Right Arrow */}
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactRight onClick={nextSlide} size={30} />
      </div>
      <div className="flex top-4 justify-center py-2">
        {slides.map((slide, slideIndex) => {
          return (
            <div
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className="text-2xl cursor-pointer"
            >
              {currentIndex === slideIndex ? (
                <RxShadowOuter />
              ) : (
                <RxDotFilled />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Carousel;
