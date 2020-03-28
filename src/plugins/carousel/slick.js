import React from 'react';
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
  const responsiveSettings = getResponsiveSettings(cardsToShow)

  let imgList = [];
  srcList.forEach((url, index) => {
    if (url.length) {
      imgList.push(
        <CarouselImage urlSource={url} height={cardHeight} key={index} />
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
        responsive={responsiveSettings}
        className="brandywine-slick-container"
      >
        {imgList}
      </Slider>
    </div>
  );
}

// ----- CONFIG
function getResponsiveSettings(numCards) {
  return [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: numCards > 3 ? 3 : numCards,
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: numCards > 2 ? 2 : numCards,
      }
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1,
      }
    }
  ]
}

// ----- STYLING

const CarouselImage = ({ height, urlSource }) =>
  <div style={{
    height: height,
    background: `url(${urlSource})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  }} />
  

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
