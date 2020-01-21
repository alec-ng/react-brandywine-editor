import React from "react";
import PlaceholderImgURL from "./placeholder.jpg";
import styled from "styled-components";
import "./style.css";

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
  let urlSource = props.urlSource || PlaceholderImgURL;
  return (
    <img
      src={urlSource}
      className="img-fluid"
      style={{ width: "100%" }}
      alt=""
    />
  );
}

// Text Overlay Variation
//////////////////////////////////////////////////////////

const OverlayContainer = styled.div`
  position: absolute;
  margin: 10px;
  color: #ffffff;
  top: ${props => props.top};
  right: ${props => props.right};
  bottom: ${props => props.bottom};
  left: ${props => props.left};
`;
function TextOverlayImage(props) {
  let [top, right, bottom, left] = [
    props.variationAttrs.top || "0",
    props.variationAttrs.right || "0",
    props.variationAttrs.bottom || "0",
    props.variationAttrs.left || "0"
  ];
  // expect alignment to be one of either left, right, or center to match with CSS class
  let alignmentClass = `text-${props.variationAttrs.align}`;

  return (
    <div style={{ position: "relative" }}>
      <BaseImage
        urlSource={props.baseAttrs.urlSource}
        sizeClassName={props.sizeClassName}
      />
      {(top !== "0" || right !== "0" || bottom !== "0" || left !== "0") && (
        <OverlayContainer top={top} right={right} bottom={bottom} left={left}>
          <h3 className={`${alignmentClass} text-overlay`}>
            {props.variationAttrs.text}
          </h3>
        </OverlayContainer>
      )}
    </div>
  );
}
