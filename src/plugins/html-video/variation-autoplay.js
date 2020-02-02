import React from "react";
import VisibilitySensor from "react-visibility-sensor";
import {
  OverlayContainer, TextOverlay, CaptionContainer, AlignmentContainer, VideoContainer, HTMLVideo
} from './components-util';

export const VARIATION_AUTOPLAY = "video_autoplay";

export function AutoplayElement(props) {
  const alignmentClass = props.variationAttrs.align
    ? `text-${props.variationAttrs.align}`
    : "";
  const overlayDefined = isOverlayDefined(props.variationAttrs);

  let vidRef = React.useRef();
  let attributes = {
    muted: true,
    loop: true
  };

  // For autoplay variation- if video is visible, play. If not, pause
  function onChange(isVisible) {
    let video = this.children.ref.current.getElementsByTagName("video")[0];
    if (isVisible) {
      video.play();
    } else if (video.playing) {
      video.pause();
    }
  }

  return (
    <VisibilitySensor partialVisibility={true} onChange={onChange}>
      <div ref={vidRef}>
        <AlignmentContainer sizeClassName={props.sizeClassName}>
          <VideoContainer>
            <HTMLVideo
              urlSource={props.baseAttrs.urlSource}
              attributes={attributes}
            />
            {/* Tablets & Desktop  absolute overlay */}
            {overlayDefined &&  
              <AbsoluteOverlay 
                variationAttrs={props.variationAttrs} 
                alignmentClass={alignmentClass} />
            }
          </VideoContainer>
          {/* Mobile caption instead of overlay */}
          {overlayDefined && 
            <CaptionContainer> 
              {props.variationAttrs.text}
            </CaptionContainer>
          }
        </AlignmentContainer>
      </div>
    </VisibilitySensor>
  );
}

function AbsoluteOverlay(props) {
  return (
    <OverlayContainer
      className="d-none d-md-block"
      top={props.variationAttrs.top}
      right={props.variationAttrs.right}
      bottom={props.variationAttrs.bottom}
      left={props.variationAttrs.left}
    >
      <TextOverlay className={`${props.alignmentClass} mb-0`}>
        {props.variationAttrs.text}
      </TextOverlay>
    </OverlayContainer>
  )
}

function isOverlayDefined(variationAttrs) {
  // at least one character exists 
  if (!variationAttrs.text || !variationAttrs.text.trim()) {
    return false;
  }
  // at least one offset is defined
  if (
    (variationAttrs.top && variationAttrs.top !== "0")
    || (variationAttrs.right && variationAttrs.right !== "0") 
    || (variationAttrs.bottom && variationAttrs.bottom !== "0")
    || (variationAttrs.left && variationAttrs.left !== "0")
    ) {
      return true;
    }

  return false;
}
