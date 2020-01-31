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
  const offsetDefined =
    (props.variationAttrs.top && props.variationAttrs.top !== "0") ||
    (props.variationAttrs.right && props.variationAttrs.right !== "0") !==
      "0" ||
    (props.variationAttrs.bottom && props.variationAttrs.bottom !== "0")(
      props.variationAttrs.left && props.variationAttrs.left !== "0"
    );

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
                  <TextOverlay className={`${alignmentClass} mb-0`}>
                    {props.variationAttrs.text}
                  </TextOverlay>
                </OverlayContainer>
              </React.Fragment>
            )}
          </VideoContainer>
          {/* Mobile see caption */}
          {offsetDefined && (
            <CaptionContainer>
              {props.variationAttrs.text}
            </CaptionContainer>
          )}
        </AlignmentContainer>
      </div>
    </VisibilitySensor>
  );

}
