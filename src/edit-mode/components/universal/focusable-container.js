import React, { useEffect, useRef } from 'react';
import styled from "styled-components";

const FocusDiv = styled.div`
  ${({ inPreviewMode, isFocused }) => {
    if (inPreviewMode) {
      return ``;
    }
    let styles = `
      transition: border 0.1s linear;
      cursor: pointer;
      min-height: 15px;
      margin: 10px 0;
    `
    styles += isFocused
      ? `border: 1pt solid rgba(0,0,0,0.4);`
      : `border: 1pt solid transparent;
         &:hover {
          border: 1pt solid rgba(0,0,0,0.3);
         }
        `
    return styles;
  }}
`;

/**
 * Wrapper for canvas elements that can be focused on
 * Provides styling, onClick / scrollTo functionality
 */
export default function FocusableContainer({
  onClick, inPreviewMode, isFocused, dataset, children
}) {
  const containerRef = useRef();

  // Scroll into view whenever the block is in focus
  useEffect(() => {
    if (isFocused && !inPreviewMode) {
      containerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }, [isFocused, inPreviewMode]);

  /**
   * Call onClick handler, passing in dataset prop and ref
   */
  function handleOnClick(e) {
    onClick(dataset, containerRef.current);
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
