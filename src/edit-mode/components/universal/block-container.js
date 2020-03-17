import React from "react";
import FocusableContainer from './focusable-container';
import DraggableContainer from './draggable-container';

function BlockContainer({ 
  block, 
  onBlockClick, 
  BlockElement, 
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
        renderCompareProp={block}
    >
      <DraggableContainer
        inPreviewMode={inPreviewMode}
        uuid={block.uuid}
        renderCompareProp={block}
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

function isEqual(prevProps, nextProps) {
  return prevProps.inPreviewMode === nextProps.inPreviewMode
    && prevProps.isFocused === nextProps.isFocused
    && prevProps.block === nextProps.block
}
export default React.memo(BlockContainer, isEqual);
