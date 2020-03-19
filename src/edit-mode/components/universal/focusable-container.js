import React from 'react';
import styled from "styled-components";

const FocusDiv = styled.div`
  ${({ inPreviewMode, isFocused }) => {
    if (inPreviewMode) {
      return `
        margin-bottom: 20px;
      `;
    }
    let styles = `
      cursor: pointer;
      min-height: 15px;
      margin: 10px 0;
      border-width: 1px;
      border-color: rgba(0,0,0,0);
      border-style: dashed;
      &:hover {
      border-color: rgba(0,0,0,0.2);
      }
    `
    if (isFocused) {
      styles += `border-color: rgba(0,0,0,0.2);`
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
  dataset,            // object that will be passed as argument to onClick callback
  renderCompareProp,  // optional: value used for equality comparison for component memoization
  children
}) {
  const htmlDatasetAttrs = dataset && !inPreviewMode
    ? Object.keys(dataset).reduce((attributes, attr) => {
        let dataProp = {};
        dataProp[`data-${attr}`] = dataset[attr];
        return Object.assign({}, attributes, dataProp);
      }, {})
    : {};

  /**
   * Call onClick handler, passing in dataset prop and ref
   */
  function handleOnClick(e) {
    onClick(dataset);
  }

  return (
    <FocusDiv
      inPreviewMode={inPreviewMode}
      onClick={handleOnClick}
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