import React from "react";

import {
  OverlayContainer, TextOverlay, CaptionContainer, Plcaeholder
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

  return <Variation />;
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

function TextOverlayImage(props) {
  const alignmentClass = props.variationAttrs.align ? `text-${props.variationAttrs.align}` : '';
  const offsetDefined =
    (props.variationAttrs.top && props.variationAttrs.top !== "0") ||
    (props.variationAttrs.right && props.variationAttrs.right !== "0") !==
      "0" ||
    (props.variationAttrs.bottom && props.variationAttrs.bottom !== "0")(
      props.variationAttrs.left && props.variationAttrs.left !== "0"
    );

  return (
    <div style={{ position: "relative" }}>
      <BaseImage urlSource={props.baseAttrs.urlSource} />
      {offsetDefined && (
        <React.Fragment>
          {/* Tablets & Desktop see absolute overlay */}
          <OverlayContainer
            className="d-none d-md-block"
            top={props.variationAttrs.top}
            right={props.variationAttrs.right}
            bottom={props.variationAttrs.bottom}
            left={props.variationAttrs.left}
          >
            <TextOverlay className={`${alignmentClass} mb-0`}>
              {props.variationAttrs.text}
            </TextOverlay>
          </OverlayContainer>
          {/* Mobile see caption */}
          <CaptionContainer>
            {props.variationAttrs.text}
          </CaptionContainer>
        </React.Fragment>
      )}
    </div>
  );
}
