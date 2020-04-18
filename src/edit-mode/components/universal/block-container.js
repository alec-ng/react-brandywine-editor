import React from "react";
import FocusableContainer from './focusable-container';
import DraggableContainer from './draggable-container';

import styled from 'styled-components';

function BlockContainer({ 
  block, 
  onBlockClick,
  onDelete, 
  BlockElement, 
  inPreviewMode,
  isFocused
}) {
  const dataset = {
    uuid: block.uuid, 
    elementtype: 'block'
  }; 

  function deleteBlock(e) {
    e.stopPropagation();
    onDelete(block.uuid);
  }

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
        <ContentContainer>
          <DeleteBtn 
            type="button"
            onClick={deleteBlock}
            inPreviewMode={inPreviewMode}
          >
            X
          </DeleteBtn>
          <BlockElement
            isEditable={!inPreviewMode}
            variation={block.variation}
            baseAttrs={block.baseAttrs}
            variationAttrs={block.variationAttrs}
          />
        </ContentContainer>
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


const ContentContainer = styled.div`
  position: relative;
`;
const DeleteBtn = styled.button`
  position: absolute;
  top: -10px;
  left: -12px;
  border-radius: 10px;
  padding: 0px;
  height: 20px;
  width: 20px;
  font-size: 10px;
  border-width: 1px;
  z-index: 2;
  background-color: rgb(250, 250, 250);
  border-color: rgba(0,0,0,0.3);
  color: rgba(0,0,0,0.5);
  transition: border-color 0.1s, color 0.1s;
  display: ${props => props.inPreviewMode ? 'none' : 'initial'};

  &:focus {
    box-shadow: none;
    outline: none;
  }
  &:hover, &:focus {
    background-color: #dc3545;
    border-color: #dc3545;
    color: white;
  }
`;