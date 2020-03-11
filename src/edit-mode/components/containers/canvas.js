import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { selectConfig, selectBlockArray, selectFocusedBlock } from '../../state/selectors';
import { moveBlock, updateFocusedElement } from '../../state/actions';

import FocusableContainer from '../universal/focusable-container';
import PageHeader from "../universal/page-header"
import DropZone from "../universal/dropzone";
import BlockContainer from "../universal/block-container";
import FocusedElementPopper from './focused-element-popper';

/**
 * Top level stateful container for responsive canvas
 * Renders all canvas elements and the focused element popper
 */
function Canvas({ 
  config, 
  header, 
  inPreviewMode, 
  blocks,
  focusedData,
  dispatch 
}) {  
  const [focusedElementRef, setFocusedElementRef] = useState(null);

  /**
   * Components to render
   */
  let elements = [];
  blocks.forEach((block, index) => {
    let BlockElement = config.pluginMap[block.name].canvasElement;
    if (!inPreviewMode) {
      elements.push(
        <DropZone
          key={`dropzone-${block.uuid}`}
          uuid={`dropzone-${block.uuid}`}
          onDrop={handleOnDrop}
          onClick={handleElementClick}
          inPreviewMode={inPreviewMode}
          isFocused={focusedData.dropzoneId === `dropzone-${block.uuid}`}
        />
      );
    }
    elements.push(
      <BlockContainer
        key={block.uuid}
        block={block}
        onBlockClick={handleElementClick}
        BlockElement={BlockElement}
        inPreviewMode={inPreviewMode}
        omitBottomMargin={index === blocks.length - 1}
        isFocused={focusedData.blockId === block.uuid}
      />
    );
  });
  if (!inPreviewMode) {
    elements.push(
      <DropZone 
        key='dropzone-last' 
        uuid={'dropzone-last'}
        onDrop={handleOnDrop} 
        onClick={handleElementClick}
        inPreviewMode={inPreviewMode}
        isFocused={focusedData.dropzoneId === 'dropzone-last'}
      />
    );
  }

  /**
   * Handlers for clicking canvas elements
   */
  function handleElementClick({ elementType, uuid }, elementRef) {
    dispatch(updateFocusedElement(elementType, uuid));
    setFocusedElementRef(elementRef);
  }

  /**
   * When a block is dragged onto a dropzone, initiate move action
   */
  function handleOnDrop(e) {
    // Assumes dropzone uuid is of form dropzone-{uuid}, set in canvas.js
    const currentPositionId = e.currentTarget.dataset.uuid
      ? e.currentTarget.dataset.uuid.replace("dropzone-", "")
      : null; // special case for no uuid -- last block of the canvas

    // do not move block if it is dragged to same position
    const targetBlockId = e.dataTransfer.getData("targetBlockId");
    if (targetBlockId === currentPositionId) {
      return; 
    }
    dispatch(moveBlock(targetBlockId, currentPositionId));
  };

  return (
    <React.Fragment>
      {
        !inPreviewMode && focusedData.exists &&
        <FocusedElementPopper
          header={header}
          config={config}
          anchorRef={focusedElementRef}
          focusedBlock={focusedData.block}
          focusedDropzone={focusedData.dropzoneId}
          focusedElementType={focusedData.elementType}
          dispatch={dispatch}
        />
      }

      <FocusableContainer
        isFocused={focusedData.elementType === 'header'}
        dataset={{ elementType: 'header' }}
        onClick={handleElementClick}
        inPreviewMode={inPreviewMode}
      >
        <PageHeader header={header} />
      </FocusableContainer>
      {elements}

    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  config: selectConfig(state),
  blocks: selectBlockArray(state),
  header: state.header,
  inPreviewMode: state.inPreviewMode,
  focusedData: {
    exists: state.focusedElementType != null,
    dropzoneId: state.focusedDropzone,
    blockId: state.focusedBlock,
    elementType: state.focusedElementType,
    block: selectFocusedBlock(state)
  }
});
export default connect(mapStateToProps)(Canvas);
