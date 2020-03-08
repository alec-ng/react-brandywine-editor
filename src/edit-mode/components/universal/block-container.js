import React from "react";
import FocusableContainer from './focusable-container';
import DraggableContainer from './draggable-container';

export default function BlockContainer({ 
  block, 
  onBlockClick, 
  BlockElement, 
  omitBottomMargin, 
  inPreviewMode,
  isFocused
}) {
  const dataset = {
    uuid: block.uuid, 
    elementType: 'block'
  }; 

  return (
    <FocusableContainer
        isFocused={isFocused}
        dataset={dataset}
        onClick={onBlockClick}
        inPreviewMode={inPreviewMode}
    >
      <DraggableContainer
        inPreviewMode={inPreviewMode}
        omitBottomMargin={omitBottomMargin}
        uuid={block.uuid}
      >
        <BlockElement
          isEditable={!inPreviewMode}
          variation={block.variation}
          baseAttrs={block.baseAttrs}
          variationAttrs={block.variationAttrs}
        />
      </DraggableContainer>
    </FocusableContainer>
  );
}
