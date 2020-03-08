import React from "react";
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { selectConfig, selectBlockArray } from '../../state/selectors';
import { 
  switchBlockFocus, addBlock, moveBlock, updateFocusedElement 
} from '../../state/actions';

import FocusableContainer from '../universal/focusable-container';
import PageHeader from "../universal/page-header"
import DropZone from "../universal/dropzone";
import BlockContainer from "../universal/block-container";

/**
 * Represents the portion of the editor showing block elements. In editor mode, the user can
 * drag/drop/manipulate blocks on the canvas. In read/preview, the blocks are just shown
 */
function Canvas({ 
  config, 
  header, 
  inPreviewMode, 
  blocks,
  focusedDropzone, 
  focusedBlock,
  focusedElementType,
  dispatch 
}) {
  
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
          isFocused={focusedDropzone === `dropzone-${block.uuid}`}
        />
      );
    }
    elements.push(
      <BlockContainer
        key={block.uuid}
        block={block}
        onBlockClick={handleBlockClick}
        BlockElement={BlockElement}
        inPreviewMode={inPreviewMode}
        omitBottomMargin={index === blocks.length - 1}
        isFocused={focusedBlock === block.uuid}
      />
    );
  });
  if (!inPreviewMode) {
    elements.push(
      <DropZone key={`dropzone-last`} onDrop={handleOnDrop} />
    );
  }

  /**
   * Handlers for clicking canvas elements
   */
  function handleBlockClick({ uuid }) {
    dispatch(switchBlockFocus(uuid));
  };
  function handleElementClick({ elementType, uuid }) {
    dispatch(updateFocusedElement(elementType, uuid))
  }

  /**
   * When an item is dropped , determine whether to add block or plugin
   * Assumes dropzone uuid is of form dropzone-{uuid}, set in canvas.js
   */
  function handleOnDrop(e) {
    const draggedItemType = e.dataTransfer.getData("dragType");
    const currentPositionId = e.currentTarget.dataset.uuid
      ? e.currentTarget.dataset.uuid.replace("dropzone-", "")
      : null;

    if (draggedItemType === "plugin") {
      dispatch(addBlock(
        e.dataTransfer.getData("pluginName"),
        currentPositionId,
        uuidv4()
      ));
    }

    if (draggedItemType === "block") {
      // do not move block if it is dragged to same position
      const targetBlockId = e.dataTransfer.getData("targetBlockId");
      if (targetBlockId === currentPositionId) {
        return; 
      }
      dispatch(moveBlock(targetBlockId, currentPositionId));
    }
  };


  return (
    <React.Fragment>
      <FocusableContainer
        isFocused={focusedElementType === 'header'}
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
  focusedDropzone: state.focusedDropzone,
  focusedBlock: state.focusedBlock,
  focusedElementType: state.focusedElementType
});
export default connect(mapStateToProps)(Canvas);
