import React from "react";
import styled from "styled-components";

const DraggableDiv = styled.div`
  cursor: ${props => props.inPreviewMode ? 'inherit' : 'move'};
  margin-bottom: ${props => props.inPreviewMode
    ? props.omitBottomMargin ? 0 : '20px'
    : '0'
  }
`;

/**
 * Wrapper for block canvas block elements to be draggable
 */
export default function DraggableContainer({ inPreviewMode, omitBottomMargin, uuid, children }) {
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
      omitBottomMargin={omitBottomMargin}
    >
      {children}
    </DraggableDiv>
  )
}