import React from 'react';
import styled from 'styled-components';

export const OverlayContainer = styled.div`
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

export const TextOverlay = styled.p`
  font-size: 0.8rem;
  
  @media (min-width: 576px) {
    font-size: 0.9rem;
  }
  @media (min-width: 768px) {
    font-size: 1rem;
  }
  @media (min-width: 992px) {
    font-size: 1.1rem;
  }
  @media (min-width: 1200px) {
    font-size: 1.2rem;
  }
`;

export function CaptionContainer(props) {
  return (
    <div className="mx-auto text-center d-block d-md-none">
      <h6 className="py-2 mx-3 mb-0 brandywine-responsive-caption">
        {props.children}
      </h6>
    </div>
  )
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
export function Placeholder(props) {
  return (
    <PlaceholderDiv>
      <h1 className="text-center">Provide a URL to a video file.</h1>
    </PlaceholderDiv>  
  )
}

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
