import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { selectConfig, selectBlockArray } from '../../state/selectors';
import { switchBlockFocus, addBlock, moveBlock } from '../../state/actions';

import PageHeader from "../universal/page-header"
import DropZone from "../universal/dropzone";
import BlockContainer from "../universal/block-container";

/**
 * Represents the portion of the editor showing block elements. In editor mode, the user can
 * drag/drop/manipulate blocks on the canvas. In read/preview, the blocks are just shown
 */
function Canvas({ config, header, isEditable, blocks, dispatch }) {
  
  let elements = [];
  blocks.forEach((block, index) => {
    let BlockElement = config.pluginMap[block.name].canvasElement;
    if (isEditable) {
      elements.push(
        <DropZone
          key={`dropzone-${block.uuid}`}
          uuid={`dropzone-${block.uuid}`}
          onDrop={handleOnDrop}
        />
      );
    }
    elements.push(
      <BlockContainer
        key={block.uuid}
        block={block}
        onBlockClick={handleBlockClick}
        BlockElement={BlockElement}
        isEditable={isEditable}
        omitBottomMargin={index === blocks.length - 1}
      />
    );
  });
  if (isEditable) {
    elements.push(
      <DropZone key={`dropzone-last`} onDrop={handleOnDrop} />
    );
  }

  /**
   * When a block on the canvas is clicked, switch the active focus to that block if in editor mode
   */
  function handleBlockClick(e) {
    dispatch(switchBlockFocus(e.currentTarget.dataset.uuid));
  };

  /**
   * When an item is dropped onto a dropzone, determine whether to add a new block
   * or move a current one
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
      <PageHeader header={header} />
      {elements}
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  config: selectConfig(state),
  blocks: selectBlockArray(state),
  header: state.header,
  isEditable: !state.readOnly && !state.inPreviewMode
});
export default connect(mapStateToProps)(Canvas);
