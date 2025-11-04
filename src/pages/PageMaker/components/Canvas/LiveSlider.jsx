import React, { useState, useEffect, useRef } from "react";

const LiveSlider = ({ slides, autoplay = true, swapTime = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    if (!autoplay || !slides || slides.length <= 1) return;

    timeoutRef.current = setTimeout(() => {
      const nextIndex =
        currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
      setCurrentIndex(nextIndex);
    }, swapTime);

    return () => {
      resetTimeout();
    };
  }, [currentIndex, slides, autoplay, swapTime]);

  if (!slides || slides.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          background: "#eee",
          color: "#777",
        }}
      >
        اسلایدی برای نمایش وجود ندارد.
      </div>
    );
  }

  const goToSlide = (slideIndex, e) => {
    e && e.stopPropagation();
    setCurrentIndex(slideIndex);
  };

  const goToPrevious = (e) => {
    e.stopPropagation();
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = (e) => {
    e.stopPropagation();
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const sliderStyles = {
    height: "100%",
    position: "relative",
    overflow: "hidden",
    background: "#333",
  };

  const slideImageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  };

  const slideContainerStyle = (index) => ({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    opacity: currentIndex === index ? 1 : 0,
    transition: "opacity 0.5s ease-in-out",
    visibility: currentIndex === index ? "visible" : "hidden",
  });

  const arrowStyles = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: "2rem",
    color: "#fff",
    zIndex: 1,
    cursor: "pointer",
    background: "rgba(0,0,0,0.4)",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    userSelect: "none",
  };

  const dotsContainerStyles = {
    position: "absolute",
    bottom: "10px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    justifyContent: "center",
    zIndex: 1,
  };

  const dotStyle = {
    margin: "0 5px",
    cursor: "pointer",
    fontSize: "12px",
    color: "rgba(255, 255, 255, 0.5)",
  };

  const activeDotStyle = {
    ...dotStyle,
    color: "white",
  };

  return (
    <div style={sliderStyles}>
      {slides.length > 1 && (
        <>
          <div style={{ ...arrowStyles, left: "10px" }} onClick={goToPrevious}>
            ‹
          </div>
          <div style={{ ...arrowStyles, right: "10px" }} onClick={goToNext}>
            ›
          </div>
        </>
      )}

      {slides.map((slide, slideIndex) => (
        <div key={slideIndex} style={slideContainerStyle(slideIndex)}>
          <img
            src={slide.src}
            alt={`Slide ${slideIndex + 1}`}
            style={slideImageStyle}
          />
        </div>
      ))}

      {slides.length > 1 && (
        <div style={dotsContainerStyles}>
          {slides.map((_, slideIndex) => (
            <div
              key={slideIndex}
              style={currentIndex === slideIndex ? activeDotStyle : dotStyle}
              onClick={(e) => goToSlide(slideIndex, e)}
            >
              ●
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LiveSlider;
