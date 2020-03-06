import React, { useState } from "react";
import { isMobileOnly, isTablet } from "react-device-detect";
import ItemsCarousel from "react-items-carousel";
import styled from "styled-components";

export const DEFAULT_NUM_CARDS = 1;
export const VARIATION_DEFAULT = "carousel_default";

const NUM_CARDS_MOBILE = 1;
const CarouselImage = styled.div`
  height: ${props => props.height};
  background: url(${props => props.urlSource});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;
const ChevronButton = styled.button`
  border-radius: 15px;
  border: none;
  color: black;
  background-color: rgba(255, 255, 255, 0.75);
`;
const PlaceholderDiv = styled.div`  
  background-color: #ddd;
  width: 100%;
  min-height: 250px;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const maxSizes = {
  mobile: "300px",
  tablet: "450px"
};

export function CarouselElement(props) {
  const sizeClassName = `brandywine-width_${props.baseAttrs.size}`;
  let urlSources = props.baseAttrs.urlSources
    ? props.baseAttrs.urlSources.split("\n")
    : "";

  if (!urlSources || !urlSources[0]) {
    return (
      <div className={`${sizeClassName} mx-auto brandywine-responsive-x-padding`}>
        <PlaceholderDiv>
          <h1 className="text-center">Provide at least one URL to an image.</h1>
        </PlaceholderDiv>
      </div>
    );
  }

  const [activeItemIndex, setActiveItemIndex] = useState(0);

  // determine how many cards to show at once
  let numCards = isMobileOnly
    ? NUM_CARDS_MOBILE
    : props.baseAttrs.numCards > 0
      ? props.baseAttrs.numCards
      : DEFAULT_NUM_CARDS;

  // one-time calculation of max height depending on device being used
  let responsiveHeight;
  if (isMobileOnly && props.baseAttrs.height > maxSizes.mobile) {
    responsiveHeight = maxSizes.mobile;
  } else if (isTablet && props.baseAttrs.height > maxSizes.tablet) {
    responsiveHeight = maxSizes.tablet;
  } else {
    responsiveHeight = `${props.baseAttrs.height}px`;
  }

  // Generate carousel images from URLs provided
  let imgList = [];
  urlSources.forEach((url, index) => {
    if (url.length) {
      imgList.push(
        <CarouselImage key={index} urlSource={url} height={responsiveHeight} />
      );
    }
  });

  return (
    <div
      className={`${sizeClassName} mx-auto brandywine-responsive-x-padding`}
    >
      <ItemsCarousel
        infiniteLoop={false}
        gutter={12}
        activePosition={"center"}
        chevronWidth={60}
        disableSwipe={false}
        alwaysShowChevrons={false}
        numberOfCards={numCards}
        slidesToScroll={1}
        outsideChevron={false}
        firstAndLastGutter={false}
        requestToChangeActive={setActiveItemIndex}
        activeItemIndex={activeItemIndex}
        leftChevron={<ChevronButton>{"<"}</ChevronButton>}
        rightChevron={<ChevronButton>{">"}</ChevronButton>}
      >
        {imgList}
      </ItemsCarousel>
      {props.baseAttrs.caption && (
        <h6 className="mt-2 mx-3 mb-0 text-center brandywine-responsive-caption">
          {props.baseAttrs.caption}
        </h6>
      )}
    </div>
  );
}
