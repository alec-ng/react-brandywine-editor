import React from "react";

export const VARIATION_DEFAULT = "image_default";

export function ImageElement(props) {
  const imgSize = props.baseAttrs.size || DEFAULT_SIZE;
  const sizeClassName = `brandywine-width_${imgSize}`;
  const isEmpty = !props.baseAttrs.urlSource

  return (
    <figure className={`${sizeClassName} mx-auto text-center brandywine-responsive-x-padding`} >
      {isEmpty
        ? <Placeholder />
        : <Image baseAttrs={props.baseAttrs} />
      }
    </figure>
  );
}

////////////////////////////////////

const DEFAULT_SIZE = "large";

function Image({ baseAttrs }) {
  return (
    <React.Fragment>
      <img 
        alt={baseAttrs.primaryText} 
        src={baseAttrs.urlSource} 
        className="img-fluid" 
      />
      {(baseAttrs.primaryText || baseAttrs.secondaryText) &&
        <figcaption className="mx-3 mt-1">
          {baseAttrs.primaryText && 
            <p className="mb-0 brandywine-responsive-caption">
              {baseAttrs.primaryText}
            </p>
          }
          {baseAttrs.secondaryText && 
            <small className="text-muted">{baseAttrs.secondaryText}</small>
          }
        </figcaption>
      }
    </React.Fragment>
  )
}

function Placeholder() {
  return (
    <div style={{
      backgroundColor: '#ddd',
      width: '100%',
      minHeight: '250px',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }}>
      <h1>
        Provide a URL to an image.
      </h1>
    </div>
  )
}