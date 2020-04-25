import React from 'react';
import styled from "styled-components";

const FocusDiv = styled.div`
  ${({ inPreviewMode, isFocused, showOutline }) => {
    if (inPreviewMode) {
      return `
        margin-bottom: 1.5rem;
      `;
    }
    let styles = `
      cursor: pointer;
      min-height: 15px;
      margin-bottom: 0.5rem;
      border-width: 1px;
      border-color: rgba(0,0,0,0);
      border-style: dashed;
    `
    if (showOutline) {
      styles += `&:hover {
        border-color: rgba(0,0,0,0.2);
      }`;
      if (isFocused) {
        styles += `border-color: rgba(0,0,0,0.2);`
      }
    }
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
  showOutline = true,
  dataset,            // object that will be passed as argument to onClick callback
  renderCompareProp,  // optional: value used for equality comparison for component memoization
  children
}) {
  // pass through html dataset attributes if not in preview mode
  const htmlDatasetAttrs = dataset && !inPreviewMode
    ? Object.keys(dataset).reduce((attributes, attr) => {
        let dataProp = {};
        dataProp[`data-${attr}`] = dataset[attr];
        return Object.assign({}, attributes, dataProp);
      }, {})
    : {};

  // onClick handler receives dataset as prop
  function handleOnClick(e) {
    onClick(dataset);
  }

  return (
    <FocusDiv
      inPreviewMode={inPreviewMode}
      onClick={handleOnClick}
      showOutline={showOutline}
      isFocused={isFocused}
      {... htmlDatasetAttrs}
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