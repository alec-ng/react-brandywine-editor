import React from "react";
import styled from "styled-components";
import SlickCarousel from './slick';

export const VARIATION_DEFAULT = "carousel_default";

export function CarouselElement({ baseAttrs }) {
  const urlSources = baseAttrs.urlSources
    ? baseAttrs.urlSources.split("\n")
    : "";
  const isEmpty = !urlSources || !urlSources[0];

  return (
    <CarouselContainer size={baseAttrs.size}>
      {isEmpty &&
        <PlaceholderDiv>
          <h1 className="text-center">Provide at least one URL to an image.</h1>
        </PlaceholderDiv>
      }
      {!isEmpty &&
        <SlickCarousel
          itemHeight={baseAttrs.height}
          srcList={urlSources}
          numCards={baseAttrs.numCards}
        />
      }
       {baseAttrs.caption && (
        <h6 className="mt-2 mx-3 mb-0 text-center brandywine-responsive-caption">
          {baseAttrs.caption}
        </h6>
      )}
    </CarouselContainer>
  );
}

// ----- STYLING

const PlaceholderDiv = styled.div`  
  background-color: #ddd;
  width: 100%;
  min-height: 250px;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

function CarouselContainer({ children, size }) {
  const sizeClassName = `brandywine-width_${size}`;

  return (
    <div className={`${sizeClassName} mx-auto brandywine-responsive-x-padding`}>
      {children}
    </div>
  );
}
