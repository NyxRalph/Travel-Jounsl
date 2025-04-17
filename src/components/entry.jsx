import React, { useState } from "react";
import Nav from "./nav";
import previous from "/public/Left.svg"
import next from "/public/Right.svg"

function EntryLog() {


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
           <img className="arrows left_arrow" src={previous} alt="Previous" />
          </button>
          {/* <img
            className="slide"
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
          /> */}
          <button onClick={handleNext} className="slider__button next">
          <img className="arrows right_arrow" src={next} alt="Next" />
            
          </button>
        </div>
      </div>
    </section>
  );
}

export default EntryLog;