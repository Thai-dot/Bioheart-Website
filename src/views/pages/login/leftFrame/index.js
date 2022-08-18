import React, { useState } from "react";
import './styles.scss';
import svgImg from '../../../../assets/images/svg/index';
import pngImg from '../../../../assets/images/png/index';


const LeftFrame = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isActiveLeft, setisActiveLeft] = useState(false);
  const [isActiveRight, setisActiveRight] = useState(true);
  const [textSate, setTextState] = useState(
    "Improve lives by making the most accurate heart data available to everyone."
  );
  const SLIDESTEXT = [
    "Improve lives by making the most accurate heart data available to everyone.",
    "Bioheart is the first of its kind - a continuous heart rhythm monitor for everyday use.",

    "Bioheart records your electrical heart activity continuously while you wear it, delivering the most accurate health insights on your heart.",

    "Your data is viewable live and saved in the app for you to review later.",

    "Easily export and share your data with a physician for a deeper understanding of your heart trends.",
  ];

  const changeSlide = (direction = "free") => {
    // get current slide
    const slidesNum = document.querySelectorAll(".carousel-item").length;
    const carouselItem = document.querySelectorAll(".carousel-item");
    const indicator = document.querySelectorAll(".carousel-indicators button");
    const getcurrentSlide = document
      .querySelector(".carousel-item.active")
      .className.split(" ")[1]
      .slice(-1);
    if (direction === "free") {
      let number = 0;
      indicator.forEach((item) => {
        if (item.classList.contains("active")) {
          number = item.getAttribute("aria-label").split(" ")[1];
        }
      });
      if (parseInt(number) === slidesNum) {
        setisActiveRight(false);
        setisActiveLeft(true);
      } else if (parseInt(number) === 1) {
        setisActiveLeft(false);
        setisActiveRight(true);
      } else {
        setisActiveRight(true);
        setisActiveLeft(true);
      }

      setTextState(SLIDESTEXT[number - 1]);
      setCurrentSlide(number - 1);
    } else {
      carouselItem.forEach((item) => {
        item.classList.remove("active");
      });
      indicator.forEach((item) => {
        item.classList.remove("active");
      });

      setCurrentSlide(getcurrentSlide);

      if (direction === "left") {
        if (currentSlide === 0) {
          // setCurrentSlide(0)
          // setCurrentSlide(slidesNum - 1);
          // indicator[slidesNum - 1].classList.add("active");
          // carouselItem[slidesNum - 1].classList.add("active");
          // setTextState(SLIDESTEXT[slidesNum - 1]);

          setisActiveLeft(true);
        } else {
          setCurrentSlide(currentSlide - 1);
          indicator[currentSlide - 1].classList.add("active");
          carouselItem[currentSlide - 1].classList.add("active");
          setTextState(SLIDESTEXT[currentSlide - 1]);
          setisActiveLeft(true);
          setisActiveRight(true);
          if (currentSlide === 1) {
            setisActiveLeft(false);
          }
        }
      } else if (currentSlide === slidesNum - 1) {
        setCurrentSlide(slidesNum - 1);
        // setCurrentSlide(0);
        // indicator[0].classList.add("active");
        // carouselItem[0].classList.add("active");
        // setTextState(SLIDESTEXT[0]);
      } else {
        setCurrentSlide(currentSlide + 1);
        indicator[currentSlide + 1].classList.add("active");
        carouselItem[currentSlide + 1].classList.add("active");
        setTextState(SLIDESTEXT[currentSlide + 1]);
        setisActiveRight(true);
        setisActiveLeft(true);
        if (currentSlide === slidesNum - 2) {
          setisActiveRight(false);
        }
      }
    }
  };
  return (
    <div className="mainBack">
      <div className="arrows d-flex justify-content-between align-items-center  ">
        <div className="arrow">
          <button
            type="submit"
            className="arrow-left"
            disabled={!isActiveLeft}
            onClick={() => changeSlide('left')}
          >
            {isActiveLeft ? (
              <img src={svgImg.arrowLeftActive} alt="left arrow active" />
            ) : (
              <img src={svgImg.arrowLeftInactive} alt="left arrow deacive" />
            )}
          </button>
        </div>
        <div className="arrow">
          <button
            type="submit"
            className="arrow-right"
            disabled={!isActiveRight}
            onClick={() => changeSlide('right')}
          >
            {isActiveRight === true ? (
              <img src={svgImg.arrowRightActive} alt="right arrow active" />
            ) : (
              <img src={svgImg.arrowRightInactive} alt="right arrow deactive" />
            )}
          </button>
        </div>
      </div>
      <div className="Maincarousel">
        <div
          id="carouselExampleIndicators"
          className="carousel slide "
          data-bs-ride="false"
        >
          <div className="carousel-indicators ">
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="0"
              className="active "
              aria-current="true"
              aria-label="Slide 1"
              onClick={() => changeSlide()}
            />
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="1"
              aria-label="Slide 2"
              onClick={() => changeSlide()}
            />
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="2"
              aria-label="Slide 3"
              onClick={() => changeSlide()}
            />
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="3"
              aria-label="Slide 4"
              onClick={() => changeSlide()}
            />
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="4"
              aria-label="Slide 5"
              onClick={() => changeSlide()}
            />
          </div>
          <div className="carousel-inner">
            <div className="carousel-item slide0 active ">
              <img
                src={pngImg.Illustration1}
                className="carouselImg w-100 "
                alt="..."
              />
            </div>
            <div className="carousel-item slide1">
              <img
                src={pngImg.Illustration2}
                className="carouselImg w-100"
                alt="..."
              />
            </div>
            <div className="carousel-item slide2">
              <img
                src={pngImg.Illustration3}
                className="carouselImg w-100"
                alt="..."
              />
            </div>
            <div className="carousel-item slide3">
              <img
                src={pngImg.Illustration4}
                className="carouselImg w-100"
                alt="..."
              />
            </div>
            <div className="carousel-item slide4">
              <img
                src={pngImg.Illustration5}
                className="carouselImg w-100"
                alt="..."
              />
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex  justify-content-start align-items-start  flex-column belowContent">
        <img src={pngImg.bioheart} alt="bioheart" className="bioheart-icon mb-3" />
        <p className="">{textSate}</p>
      </div>
    </div>
  );
};

export default LeftFrame;
