import React from 'react';
import styled from "styled-components";
import Slider from 'react-slick';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./overrides.css";

export default function SlickCarousel({ 
  itemHeight,
  srcList,
  numCards
}) {
  const cardHeight = responsiveHeights[viewport] || `${itemHeight}px`;
  const cardsToShow = numCards > 0 ? numCards : 1;

  let imgList = [];
  srcList.forEach((url, index) => {
    if (url.length) {
      imgList.push(
        <ImageContainer key={index}>
          <CarouselImage urlSource={url} height={cardHeight} />
        </ImageContainer>
      );
    }
  });

  return (
    <div 
      className="brandywine-carousel-plugin" 
      style={{ paddingBottom: '25px' }}
    >
      <Slider
        dots={true}
        infinite={false}
        speed={500}
        slidesToShow={cardsToShow}
        slidesToScroll={1}
        arrows={true}
        responsive={responsiveSliderSettings}
        className="brandywine-slick-container"
      >
        {imgList}
      </Slider>
    </div>
  );
}

// ----- CONFIG
const responsiveSliderSettings = [
  {
    breakpoint: 1024,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 3,
      infinite: true,
      dots: true
    }
  },
  {
    breakpoint: 600,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 2,
      initialSlide: 2
    }
  },
  {
    breakpoint: 480,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1
    }
  }
]

// ----- STYLING
const ImageContainer = styled.div`
  padding: 0 5px;
`;

const CarouselImage = styled.div`
  height: ${props => props.height};
  background: url(${props => props.urlSource});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const viewport = (function() {
  const vw = Math.max(
    document.documentElement.clientWidth, window.innerWidth || 0
  );
  if (vw < 768) {
    return 'sm';
  }
  if (vw < 992) {
    return 'md';
  }
})();

const responsiveHeights = {
  sm: "350px",
  md: "500px"
};
