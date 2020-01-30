import React from "react";
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
  if (!props.urlSource) {
    return (
      <PlaceholderDiv>
        <h1 className="text-center">Provide a URL to an image.</h1>
      </PlaceholderDiv>
    )
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

const PlaceholderDiv = styled.div`  
  background-color: #ddd;
  width: 100%;
  min-height: 250px;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

// Text Overlay Variation
//////////////////////////////////////////////////////////

const OverlayContainer = styled.div`
  position: absolute;
  margin: 10px;
  color: #ffffff;
  top: ${props => (props.top && props.top !== "0" ? props.top + "%" : "auto")};
  right: ${props =>
    props.right && props.right !== "0" ? props.right + "%" : "auto"};
  bottom: ${props =>
    props.bottom && props.bottom !== "0" ? props.bottom + "%" : "auto"};
  left: ${props =>
    props.left && props.left !== "0" ? props.left + "%" : "auto"};
`;
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
            <p className={`${alignmentClass} text-overlay mb-0`}>
              {props.variationAttrs.text}
            </p>
          </OverlayContainer>
          {/* Mobile see caption */}
          <div className="mx-auto text-center d-block d-md-none">
            <h6 className="py-2 mx-3 mb-0 brandywine-responsive-caption">
              {props.variationAttrs.text}
            </h6>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}
