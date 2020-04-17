import React, { useState, useEffect } from "react";
import DropzoneDiv from './styled-div';
import FocusableContainer from '../focusable-container';
import { RootContainer } from './styles';

/**
 * Area allowing click and drop functionality, and maintains
 * an active state for styling
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
        showOutline={false}
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