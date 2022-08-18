import React from "react";
import './styles.scss';
import svgImg from '../../../../assets/images/svg/index';
import pngImg from '../../../../assets/images/png/index';

class LeftFrame extends React.Component {

  constructor(){
    super();
    this.state = {
      currentSlide: 0,
      isActiveLeft: false,
      isActiveRight: true,
      textSate: '"Improve lives by making the most accurate heart data available to everyone."'
    }
    this.SLIDESTEXT = [
      "Improve lives by making the most accurate heart data available to everyone.",
      "Bioheart is the first of its kind - a continuous heart rhythm monitor for everyday use.",
  
      "Bioheart records your electrical heart activity continuously while you wear it, delivering the most accurate health insights on your heart.",
  
      "Your data is viewable live and saved in the app for you to review later.",
  
      "Easily export and share your data with a physician for a deeper understanding of your heart trends.",
    ];
   
  }

  componentDidMount() {
    this.changeSlide()
  
  };

   changeSlide = (direction="free") =>{
    // get current slide
    const slidesNum = document.querySelectorAll(".carousel-item").length;
    const carouselItem = document.querySelectorAll(".carousel-item");
    const indicator = document.querySelectorAll(".carousel-indicators button");
    const getcurrentSlide = document.querySelector(".carousel-item.active")
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
        this.setState({isActiveRight: false});
        this.setState({isActiveLeft: true});
        
      } else if (parseInt(number) === 1) {
        this.setState({isActiveLeft: false});
        this.setState({isActiveRight: true});
        
      } else {
        this.setState({isActiveRight: true});
        this.setState({isActiveLeft: true});
        
      }

      this.setState({textSate: this.SLIDESTEXT[number - 1]});
      this.setState({currentSlide: number - 1});
      
    } else {
      carouselItem.forEach((item) => {
        item.classList.remove("active");
      });
      indicator.forEach((item) => {
        item.classList.remove("active");
      });

      this.setState({currentSlide: getcurrentSlide});

      if (direction === "left") {
        if (this.state.currentSlide === 0) {
          this.setState({isActiveLeft: true});
        } else {
          this.setState({currentSlide: this.state.currentSlide-1});
          indicator[this.state.currentSlide - 1].classList.add("active");
          carouselItem[this.state.currentSlide - 1].classList.add("active");
          this.setState({textSate: this.SLIDESTEXT[this.state.currentSlide - 1]});
          //setTextState(this.SLIDESTEXT[this.state.currentSlide - 1]);
          this.setState({isActiveLeft: true});
          this.setState({isActiveRight: true});
          
          if (this.state.currentSlide === 1) {
            this.setState({isActiveLeft: false});
          }
        }
      } else if (this.state.currentSlide === slidesNum - 1) {
        this.setState({currentSlide: slidesNum -1 });
        //setCurrentSlide(slidesNum - 1);
       
      } else {
        this.setState({currentSlide:this.state.currentSlide + 1});
        indicator[this.state.currentSlide + 1].classList.add("active");
        carouselItem[this.state.currentSlide + 1].classList.add("active");
        this.setState({textSate: this.SLIDESTEXT[this.state.currentSlide + 1]});
        //setTextState(SLIDESTEXT[this.state.currentSlide + 1]);
        this.setState({isActiveLeft: true});
        this.setState({isActiveRight: true});
        
        if (this.state.currentSlide === slidesNum - 2) {
          this.setState({isActiveRight: false});
        }
      }
    }
}
  

  render() {
    return (
      <div className="mainBack">
      <div className="arrows d-flex justify-content-between align-items-center  ">
        <div className="arrow">
          <button
            type="submit"
            className="arrow-left"
            disabled={!this.state.isActiveLeft}
            onClick={() => this.changeSlide('left')}
          >
            {this.state.isActiveLeft ? (
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
            disabled={!this.state.isActiveRight}
            onClick={() => this.changeSlide('right')}
          >
            {this.state.isActiveRight === true ? (
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
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="0"
              className="active "
              aria-current="true"
              aria-label="Slide 1"
              onClick={() => this.changeSlide()}
            />
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="1"
              aria-label="Slide 2"
              onClick={() => this.changeSlide()}
            />
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="2"
              aria-label="Slide 3"
              onClick={() => this.changeSlide()}
            />
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="3"
              aria-label="Slide 4"
              onClick={() => this.changeSlide()}
            />
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="4"
              aria-label="Slide 5"
              onClick={() => this.changeSlide()}
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
        <p className="">{this.state.textSate}</p>
      </div>
    </div>
    );
  }
}

export default LeftFrame;