import React from "react";
import { VARIATION_AUTOPLAY, AutoplayElement } from "./variation-autoplay";
import styled from 'styled-components';
import "./style.css";

const PlaceholderDiv = styled.div`  
  background-color: #ddd;
  width: 100%;
  min-height: 250px;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const VARIATION_DEFAULT = "html-video-default";
export const AlignmentContainer = function(props) {
  let responsivePadding =
    props.sizeClassName !== "brandywine-width_stretch"
      ? "brandywine-responsive-x-padding"
      : "";

  return (
    <div className={`${props.sizeClassName} ${responsivePadding} mx-auto`}>
      {props.children}
    </div>
  );
};
export const VideoContainer = function(props) {
  return (
    <div
      className="embed-responsive embed-responsive-16by9"
      style={{ position: "relative" }}
    >
      {props.children}
    </div>
  );
};
export const HTMLVideo = function(props) {
  let attributes = props.attributes || {
    controls: true
  };
  return <video src={props.urlSource} preload="metadata" {...attributes} />;
};


export function HTMLVideoElement(props) {
  const sizeClassName = `brandywine-width_${props.baseAttrs.size}`;

  // base case: no link provided
  if (!props.baseAttrs.urlSource) {
    return (
      <AlignmentContainer sizeClassName={sizeClassName}>
        <PlaceholderDiv>
          <h1 className="text-center">Provide a URL to a video file.</h1>
        </PlaceholderDiv>
      </AlignmentContainer>
    );
  }

  if (props.variation === VARIATION_AUTOPLAY) {
    const variationAttrs = JSON.parse(
      JSON.stringify(props.variationAttrs[VARIATION_AUTOPLAY])
    );
    return (
      <AutoplayElement
        sizeClassName={sizeClassName}
        baseAttrs={props.baseAttrs}
        variationAttrs={variationAttrs}
      />
    );
  }

  // default variation
  return (
    <AlignmentContainer sizeClassName={sizeClassName}>
      <VideoContainer>
        <HTMLVideo urlSource={props.baseAttrs.urlSource} />
      </VideoContainer>
    </AlignmentContainer>
  );
}
