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
  font-size: 1rem;
  margin-bottom: 0;

  @media (min-width: 992px) {
    font-size: 1.1rem;
  }
  @media (min-width: 1200px) {
    font-size: 1.2rem;
  }
`;

export function CaptionContainer({ children }) {
  return (
    <div className="mt-1 text-center d-block d-md-none">
      <figcaption className="mx-3 pb-3 brandywine-responsive-caption">
        {children}
      </figcaption>
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
  text-align: center;
`;
export function Placeholder(props) {
  return (
    <PlaceholderDiv>
      <h1>Provide a URL to a video file.</h1>
    </PlaceholderDiv>  
  )
}

export const AlignmentContainer = function({ sizeClassName, children }) {
  const responsivePadding = sizeClassName !== "brandywine-width_stretch"
      ? "brandywine-responsive-x-padding"
      : "";
  return (
    <figure className={`${sizeClassName} ${responsivePadding} mx-auto`}>
      {children}
    </figure>
  );
};

export const VideoContainer = function({ children }) {
  return (
    <div
      className="embed-responsive embed-responsive-16by9"
      style={{ position: "relative" }}
    >
      {children}
    </div>
  );
};

export const HTMLVideo = function(props) {
  const attributes = props.attributes || {
    controls: true
  };
  return (
    <video 
      src={props.urlSource} 
      preload="metadata" 
      {...attributes} 
    />
  );
};
