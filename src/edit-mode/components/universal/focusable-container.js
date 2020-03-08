import React, { useEffect } from 'react';
import styled from "styled-components";

const FocusDiv = styled.div`
  border: ${props => props.isFocused 
    ? '1pt solid rgba(0,0,0,0.4)' 
    : '1pt solid transparent' 
  };
  ${({ inPreviewMode }) => !inPreviewMode
    ? `cursor: pointer;
       min-height: 15px;
       margin: 10px 0;
      `
    : ``
  }
  ${({ isFocused }) => !isFocused && `
    &:hover {
      border: 1pt solid rgba(0,0,0,0.3);
    }
    `
  } 
  transition: border 0.1s linear;

`;

/**
 * Wrapper for canvas elements that can be focused on
 * Provides styling, onClick / scrollTo functionality
 */
export default function FocusableContainer({
  onClick, inPreviewMode, isFocused, dataset, children
}) {
  const containerRef = React.createRef();

  // Scroll into view whenever the block is in focus
  useEffect(() => {
    if (isFocused && !inPreviewMode) {
      containerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }
  }, [isFocused, inPreviewMode]);

  function handleOnClick(e) {
    onClick(dataset);
  }

  return (
    <FocusDiv
      inPreviewMode={inPreviewMode}
      onClick={handleOnClick}
      isFocused={isFocused}
      ref={containerRef}
    >
      {children}
    </FocusDiv>
  )
}
