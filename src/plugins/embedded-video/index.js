import React from "react";
import styled from 'styled-components';

const VARIATION_DEFAULT = "embedded_video_default";

const EmbeddedVideo = {
  name: "embedded_video",
  label: "Embedded Video",
  description: "Renders a embedded video (YouTube, Vimeo, etc)",
  canvasElement: EmbeddeVideoElement,
  baseAttrs: [
    {
      name: "link",
      label: "Embedded Link",
      element: "input",
      type: "text"
    },
    {
      name: "size",
      label: "Size",
      element: "select",
      defaultRequired: true,
      defaultValue: "large",
      options: [
        {
          name: "stretch",
          label: "Stretch"
        },
        {
          name: "large",
          label: "Large"
        },
        {
          name: "medium",
          label: "Medium"
        }
      ]
    }
  ],
  variations: [
    {
      name: VARIATION_DEFAULT,
      label: "Default Video",
      attrs: []
    }
  ],
  defaultVariation: VARIATION_DEFAULT
};
export default EmbeddedVideo;

/////////////////////////////////////////////////////////////

function EmbeddeVideoElement(props) {
  const sizeClassName = `brandywine-width_${props.baseAttrs.size}`;

  // base case: no link provided
  if (!props.baseAttrs.link) {
    return (
      <AlignmentContainer sizeClassName={sizeClassName}>
        <PlaceholderDiv>
          <h1 className="text-center">Provide a link to an embedded video.</h1>
        </PlaceholderDiv>
      </AlignmentContainer>
    );
  }

  let link = props.baseAttrs.link;
  if (
    !props.baseAttrs.link.startsWith("http") &&
    !props.baseAttrs.link.startsWith("https")
  ) {
    link = `https://${link}`;
  }

  return (
    <AlignmentContainer sizeClassName={sizeClassName}>
      <div className="embed-responsive embed-responsive-16by9">
        <iframe
          title={link}
          src={link}
          className="embed-responsive-item"
          frameBorder="0"
          allow="fullscreen; accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </AlignmentContainer>
  );
}

/////////////////////////////////////////////////////////////

const AlignmentContainer = function(props) {
  return (
    <figure
      className={`${props.sizeClassName} mx-auto brandywine-responsive-x-padding`}
    >
      {props.children}
    </figure>
  );
};

const PlaceholderDiv = styled.div`  
  background-color: #ddd;
  width: 100%;
  min-height: 250px;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
