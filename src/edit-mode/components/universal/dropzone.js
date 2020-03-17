import React, { useState } from "react";
import styled from "styled-components";
import FocusableContainer from './focusable-container';

const DropZoneDiv = styled.div`
  height: 15px;
  background-color: ${props => props.dragEnter
    ? "rgba(0, 0, 0, 0.1);"
    : "rgba(0, 0, 0, 0.03);"
  };
  border: ${props => props.dragEnter
    ? "1px dashed rgba(0, 0, 0, 0.75);"
    : "1px dashed rgba(0, 0, 0, 0.15);"
  };
  transition: border 0.25s, background-color 0.25s;  
  margin: -1px;
`;

const RootContainer = styled.div`
  display: ${props => props.inPreviewMode 
    ? 'none'
    : 'initial'
  }
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
    elementtype: 'dropzone',
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
    <RootContainer inPreviewMode={inPreviewMode}>
      <FocusableContainer
        onClick={onClick}
        inPreviewMode={inPreviewMode}
        isFocused={isFocused}
        dataset={dataset}
        renderCompareProp={dragEnter}
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
    </RootContainer>
  );
};
