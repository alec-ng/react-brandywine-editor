import React from "react";
import {
  OverlayContainer, TextOverlay, CaptionContainer, Placeholder
 } from './components-util'

export const VARIATION_DEFAULT = "coverPhoto_default";
export const VARIATION_TEXT_OVERLAY = "coverPhoto_text_overlay";

export function CoverPhotoElement(props) {
  
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
        return <BaseImage urlSource={props.baseAttrs.urlSource} />;
      case VARIATION_TEXT_OVERLAY:
        return <TextOverlayImage {...variationProps} />;
      default:
        throw new Error(`Unknown Image variation: ${props.variation}`);
    }
  }

  return (
    <figure>
      <Variation />
    </figure>
  );
}

// Default Variation
//////////////////////////////////////////////////////////

export function BaseImage(props) {
  if (!props.urlSource) {
    return <Placeholder />
  }
  return (
    <img
      src={props.urlSource}
      className="img-fluid"
      style={{ width: "100%" }}
      alt=""
    />
  );
}

// Text Overlay Variation
//////////////////////////////////////////////////////////

function TextOverlayImage({ baseAttrs, variationAttrs }) {
  const alignmentClass = variationAttrs.align 
    ? `text-${variationAttrs.align}` 
    : '';
  const offsetDefined =
    (variationAttrs.top && variationAttrs.top !== "0") ||
    (variationAttrs.right && variationAttrs.right !== "0") ||
    (variationAttrs.bottom && variationAttrs.bottom !== "0") ||
    (variationAttrs.left && variationAttrs.left !== "0");

  return (
    <div style={{ position: "relative" }}>
      <BaseImage urlSource={baseAttrs.urlSource} />
      
      {offsetDefined && (
        <React.Fragment>
          {/* Tablets & Desktop see absolute overlay */}
          <OverlayContainer
            className="d-none d-md-block"
            top={variationAttrs.top}
            right={variationAttrs.right}
            bottom={variationAttrs.bottom}
            left={variationAttrs.left}
          >
            <TextOverlay className={alignmentClass}>
              {variationAttrs.text}
            </TextOverlay>
          </OverlayContainer>
      
          {/* Mobile see caption */}
          <CaptionContainer>
            {variationAttrs.text}
          </CaptionContainer>

        </React.Fragment>
      )}
    </div>
  );
}
