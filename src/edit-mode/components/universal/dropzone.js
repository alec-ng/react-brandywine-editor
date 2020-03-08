import React, { useState } from "react";
import styled from "styled-components";
import FocusableContainer from './focusable-container';

const DropZoneDiv = styled.div`
  z-index: 9999;
  height: 15px;
  background-color: ${props => props.dragEnter
    ? "rgba(0, 0, 0, 0.1)"
    : "rgba(0, 0, 0, 0.03)"
  };
  border: ${props => props.dragEnter
    ? "1px dashed rgba(0, 0, 0, 0.75)"
    : "1px dashed rgba(0, 0, 0, 0.15)"
  };
  transition: border 0.25s, background-color 0.25s;  
  margin: -1px;
`;

export default function DropZone({ 
  uuid, 
  onDrop,
  inPreviewMode, 
  isFocused, 
  onClick 
}) {
  const [dragEnter, setDragEnter] = useState(false);
  const dataset = { 
    elementType: 'dropzone',
    uuid: uuid
  }

  function onDragOver(e) {
    e.preventDefault();
  }
  function setDragLeft(e) {
    setDragEnter(false);
  }
  function setDrag(e) {
    setDragEnter(true);
  }
  function handleDrop(e) {
    setDragEnter(false);
    onDrop(e);
  }

  return (
    <FocusableContainer
      onClick={onClick}
      inPreviewMode={inPreviewMode}
      isFocused={isFocused}
      dataset={dataset}
    >
      <DropZoneDiv
        data-uuid={uuid}
        onDragOver={onDragOver}
        onDrop={handleDrop}
        onDragLeave={setDragLeft}
        onDragEnter={setDrag}
        dragEnter={dragEnter}
      />
    </FocusableContainer>
  );
};
