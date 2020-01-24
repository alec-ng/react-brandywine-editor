import React from "react";
import PlaceholderImgURL from "./placeholder.jpg";

const DEFAULT_SIZE = "medium";
export const VARIATION_DEFAULT = "image_default";
export const VARIATION_CAPTION = "image_caption";

export function ImageElement(props) {
  const imgSize = props.baseAttrs.size || DEFAULT_SIZE;
  const sizeClassName = `brandywine-width_${imgSize}`;

  function Variation() {
    // isolate attributes for current variations only
    let variationAttrs = Object.assign(
      {},
      props.variationAttrs[props.variation]
    );
    let variationProps = Object.assign({}, props, {
      variationAttrs: variationAttrs
    });

    switch (props.variation) {
      case VARIATION_DEFAULT:
        return (
          <BaseImage
            urlSource={props.baseAttrs.urlSource}
            sizeClassName={sizeClassName}
          />
        );
      case VARIATION_CAPTION:
        return (
          <ImageCaption {...variationProps} sizeClassName={sizeClassName} />
        );
      default:
        throw new Error(`Unknown Image variation: ${props.variation}`);
    }
  }

  return <Variation />;
}

// Default Variation
//////////////////////////////////////////////////////////

export function BaseImage(props) {
  let urlSource = props.urlSource || PlaceholderImgURL;
  return (
    <img
      alt=""
      src={urlSource}
      className={`${props.sizeClassName} img-fluid d-block mx-auto`}
    />
  );
}

// Caption Variation
//////////////////////////////////////////////////////////

function ImageCaption(props) {
  return (
    <React.Fragment>
      <BaseImage
        urlSource={props.baseAttrs.urlSource}
        sizeClassName={props.sizeClassName}
      />
      <div className={`${props.sizeClassName} text-center mx-auto`}>
        {props.variationAttrs.primaryText && (
          <h6 className="mt-1 mb-0">{props.variationAttrs.primaryText}</h6>
        )}
        {props.variationAttrs.secondaryText && (
          <small className="text-muted text-center">
            {props.variationAttrs.secondaryText}
          </small>
        )}
      </div>
    </React.Fragment>
  );
}
