import React from "react";
import styled from 'styled-components';

const DEFAULT_SIZE = "large";
const PlaceholderDiv = styled.div`  
  background-color: #ddd;
  width: 100%;
  min-height: 250px;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const VARIATION_DEFAULT = "image_default";

export function ImageElement(props) {
  const imgSize = props.baseAttrs.size || DEFAULT_SIZE;
  const sizeClassName = `brandywine-width_${imgSize}`;

  if (!props.baseAttrs.urlSource) {
    return (
      <div className={`${sizeClassName} mx-auto text-center brandywine-responsive-x-padding`}>
        <PlaceholderDiv>
          <h1 className="text-center">Provide a URL to an image.</h1>
        </PlaceholderDiv>
      </div>
    )
  }

  return (
    <div
      className={`${sizeClassName} mx-auto text-center brandywine-responsive-x-padding`}
    >
      <img alt="" src={props.baseAttrs.urlSource} className="img-fluid" />
      {props.baseAttrs.primaryText && (
        <h6 className="mt-2 mx-3 mb-0 brandywine-responsive-caption">
          {props.baseAttrs.primaryText}
        </h6>
      )}
      {props.baseAttrs.secondaryText && (
        <small className="mx-3 text-muted text-center">
          {props.baseAttrs.secondaryText}
        </small>
      )}
    </div>
  );
}
