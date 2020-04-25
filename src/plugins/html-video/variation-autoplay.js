import React from "react";
import VisibilitySensor from "react-visibility-sensor";
import {
  OverlayContainer, 
  TextOverlay, 
  CaptionContainer, 
  AlignmentContainer, 
  VideoContainer, 
  HTMLVideo
} from './components-util';

export const VARIATION_AUTOPLAY = "video_autoplay";

export function AutoplayElement({ 
  variationAttrs, 
  baseAttrs, 
  sizeClassName 
}) {
  const alignmentClass = variationAttrs.align
    ? `text-${variationAttrs.align}`
    : "";
  const overlayDefined = isOverlayDefined(variationAttrs);
  const vidRef = React.useRef();

  // For autoplay variation- if video is visible, play. If not, pause
  function onChange(isVisible) {
    const video = this.children.ref.current.getElementsByTagName("video")[0];
    let promise;
    
    if (isVisible) {
      promise = video.play();
    } else if (video.playing) {
      promise = video.pause();
    }
    // If there's a playback error, show the controls 
    if (promise !== undefined) {
      promise.catch(() => {
        video.controls = true;
      });
    }
  }

  return (
    <VisibilitySensor partialVisibility={true} onChange={onChange}>
      <div ref={vidRef}>
        <AlignmentContainer sizeClassName={sizeClassName}>
          <VideoContainer>
            <HTMLVideo
              urlSource={baseAttrs.urlSource}
              attributes={vidAttributes}
            />
            {/* Tablets & Desktop  absolute overlay */}
            {overlayDefined &&  
              <AbsoluteOverlay 
                variationAttrs={variationAttrs} 
                alignmentClass={alignmentClass} />
            }
          </VideoContainer>
          {/* Mobile caption instead of overlay */}
          {overlayDefined && 
            <CaptionContainer> 
              {variationAttrs.text}
            </CaptionContainer>
          }
        </AlignmentContainer>
      </div>
    </VisibilitySensor>
  );
}

///////////////////////////////////

const vidAttributes = {
  muted: true,
  loop: true,
  playsInline: true
};

function AbsoluteOverlay({ variationAttrs, alignmentClass }) {
  return (
    <OverlayContainer
      className="d-none d-md-block"
      top={variationAttrs.top}
      right={variationAttrs.right}
      bottom={variationAttrs.bottom}
      left={variationAttrs.left}
    >
      <TextOverlay className={`${alignmentClass} mb-0`}> 
        {variationAttrs.text}
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
  return (variationAttrs.top && variationAttrs.top !== "0") || 
    (variationAttrs.right && variationAttrs.right !== "0") ||
    (variationAttrs.bottom && variationAttrs.bottom !== "0") ||
    (variationAttrs.left && variationAttrs.left !== "0");        
}
