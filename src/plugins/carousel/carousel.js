import React from "react";
import SlickCarousel from './slick';

export const VARIATION_DEFAULT = "carousel_default";

export function CarouselElement({ baseAttrs }) {
  const urlSources = baseAttrs.urlSources
    ? baseAttrs.urlSources.split("\n")
    : "";
  const isEmpty = !urlSources || !urlSources[0];
  const sizeClassName = `brandywine-width_${baseAttrs.size}`;

  return (
    <figure className={`${sizeClassName} mx-auto brandywine-responsive-x-padding`}>
      {isEmpty 
        ? <EmptyPlaceholder />
        : <SlickCarousel
            itemHeight={baseAttrs.height}
            srcList={urlSources}
            numCards={baseAttrs.numCards}
          />
      }
       {baseAttrs.caption &&
        <figcaption className="mx-3 mt-1 text-center">
          <p className="mb-0 brandywine-responsive-caption">
              {baseAttrs.caption}
            </p>
        </figcaption>
      }
    </figure>
  );
}

const EmptyPlaceholder = () =>
  <div style={{
    backgroundColor: '#ddd',
    width: '100%',
    minHeight: '250px',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  }}>
    <h1 className="text-center">Provide at least one URL to an image.</h1>
  </div>

