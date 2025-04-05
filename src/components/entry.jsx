import React, { useState } from "react";
import Nav from "./nav";

function EntryLog() {
  const images = [
    { src: "/assets/image1.jpg", alt: "Image 1" },
    { src: "/assets/image2.jpg", alt: "Image 2" },
    { src: "/assets/image3.jpg", alt: "Image 3" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <section id="entrylog">
      <Nav title="Travel Log" />
      <div className="entry">
        <div className="entry__img__slider__wrapper">
          <button onClick={handlePrev} className="slider__button prev">
           Img
          </button>
          <img
            className="slide"
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
          />
          <button onClick={handleNext} className="slider__button next">
            
            
          </button>
        </div>
      </div>
    </section>
  );
}

export default EntryLog;