import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DropzoneDiv from './styled-div';
import FocusableContainer from '../focusable-container';

/**
 * 
 */
export default function DropZone({ 
  uuid, 
  onDrop,
  inPreviewMode, 
  isFocused, 
  onClick 
}) {
  const dataset = { 
    elementtype: 'dropzone',
    uuid: uuid
  }

  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    setIsActive(isFocused);
  }, [isFocused]);

  // only remove active state if the dropzone is also not focused
  function setActiveState(dragEnter) {
    if (dragEnter) {
      setIsActive(true);
    } else if (!isFocused) {
      setIsActive(false);
    }
  }

  function onDragOver(e) {
    e.preventDefault();
  }
  function handleDrop(e) {
    setIsActive(false);
    onDrop(e);
  }

  return (
    <RootContainer inPreviewMode={inPreviewMode}>
      <FocusableContainer
        onClick={onClick}
        inPreviewMode={inPreviewMode}
        isFocused={isFocused}
        dataset={dataset}
        renderCompareProp={isActive}
      >
        <div
          data-uuid={uuid}
          onDragOver={onDragOver}
          onDrop={handleDrop}
        >
          <DropzoneDiv
            setActiveState={setActiveState}
            isActive={isActive}
          />
        </div>
      </FocusableContainer>
    </RootContainer>
  );
};

// --------- STYLES
const RootContainer = styled.div`
  display: ${props => props.inPreviewMode 
    ? 'none'
    : 'initial'
  }
`;