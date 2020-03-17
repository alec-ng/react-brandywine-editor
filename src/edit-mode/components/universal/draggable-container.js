import React from "react";
import styled from "styled-components";

const DraggableDiv = styled.div`
  cursor: ${props => props.inPreviewMode ? 'inherit' : 'move'};
`;

/**
 * Wrapper for block canvas block elements to be draggable
 */
function DraggableContainer({ 
  inPreviewMode, 
  uuid, 
  renderCompareProp,  // optional: value used for equality comparison for component memoization
  children 
}) {
  function onDragStart(e) {
    e.dataTransfer.setData("targetBlockId", uuid);
  };

  const isDraggable = !inPreviewMode ? { draggable: true } : {};
  const editableProperties = !inPreviewMode ? {
    onDragStart: onDragStart,
  } : {};

  return (
    <DraggableDiv 
      {...isDraggable}
      {...editableProperties}
      inPreviewMode={inPreviewMode} 
    >
      {children}
    </DraggableDiv>
  )
}

function isEqual(prevProps, nextProps) {
  return prevProps.inPreviewMode === nextProps.inPreviewMode
    && prevProps.renderCompareProp === nextProps.renderCompareProp
}
export default React.memo(DraggableContainer, isEqual);