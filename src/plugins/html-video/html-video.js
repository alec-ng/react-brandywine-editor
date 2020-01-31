import React from "react";
import { VARIATION_AUTOPLAY, AutoplayElement } from "./variation-autoplay";
import { 
  Placeholder, AlignmentContainer, VideoContainer, HTMLVideo 
} from './components-util';

export const VARIATION_DEFAULT = "html-video-default";

export function HTMLVideoElement(props) {
  const sizeClassName = `brandywine-width_${props.baseAttrs.size}`;

  // base case: no link provided
  if (!props.baseAttrs.urlSource) {
    return (
      <AlignmentContainer sizeClassName={sizeClassName}>
        <Placeholder />
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
