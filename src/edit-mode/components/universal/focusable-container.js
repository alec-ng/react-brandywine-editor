import React, { useRef } from 'react';
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
function FocusableContainer({
  onClick,            // cb that receives the dataset supplied as props to this component
  inPreviewMode,
  isFocused,
  dataset,            // object that will be passed as argument to onClick callback
  renderCompareProp,  // optional: value used for equality comparison for component memoization
  children
}) {
  const containerRef = useRef();

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

function isEqual(prevProps, nextProps) {
  return prevProps.inPreviewMode === nextProps.inPreviewMode
    && prevProps.isFocused === nextProps.isFocused
    && prevProps.renderCompareProp === nextProps.renderCompareProp
}
export default React.memo(FocusableContainer, isEqual);