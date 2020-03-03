import React from "react";
import { useStateValue } from "../../state/context";
import { ACTION_TYPES } from "../../state/reducers/index";

import PageHeader from "../universal/page-header"
import DropZone from "../universal/dropzone";
import BlockContainer from "../universal/block-container";

/**
 * Represents the portion of the editor showing block elements. In editor mode, the user can
 * drag/drop/manipulate blocks on the canvas. In read/preview, the blocks are just shown
 */
export default function Canvas() {
  const [
    { blocks, pluginMap, readOnly, inPreviewMode, verticalBlockMargin, header },
    dispatch
  ] = useStateValue();
  const renderDropzones = !readOnly && !inPreviewMode;

  /**
   * When a block on the canvas is clicked, switch the active focus to that block if in editor mode
   */
  function handleBlockClick(e) {
    dispatch({
      type: ACTION_TYPES.SWITCH_BLOCK_FOCUS,
      payload: {
        uuid: e.currentTarget.dataset.uuid
      }
    });
  };

  /**
   * When item is dropped onto dropzone, extract the plugin name from dataTransfer and
   * dispatch add_block action
   */
  function handleOnDrop(e) {
    // assumes dropzone uuid is of form dropzone-{uuid}, set in canvas.js
    let currentPositionId = e.currentTarget.dataset.uuid
      ? e.currentTarget.dataset.uuid.replace("dropzone-", "")
      : null;

    if (e.dataTransfer.getData("dragType") === "plugin") {
      const pluginName = e.dataTransfer.getData("pluginName");
      // assumes dropzone uuid is of form dropzone-{uuid}, set in canvas.js
      dispatch({
        type: ACTION_TYPES.ADD_BLOCK,
        payload: {
          pluginName: pluginName,
          uuid: currentPositionId
        }
      });
    }

    if (e.dataTransfer.getData("dragType") === "block") {
      let targetBlockId = e.dataTransfer.getData("targetBlockId");
      if (targetBlockId === currentPositionId) {
        return; // first block is moved to first position, nothing to move
      }
      dispatch({
        type: ACTION_TYPES.MOVE_BLOCK,
        payload: {
          targetBlockId: targetBlockId, // block to be moved
          positionBlockId: currentPositionId // block for the above to be moved in front of
        }
      });
    }
  };

  // Generate and render block elements on the canvas
  // Each block is displayed with a dropzone
  let list = [];
  blocks.forEach((block, index) => {
    let BlockElement = pluginMap[block.name].canvasElement;

    if (renderDropzones) {
      list.push(
        <DropZone
          key={`dropzone-${block.uuid}`}
          uuid={`dropzone-${block.uuid}`}
          onDrop={handleOnDrop}
        />
      );
    }
    list.push(
      <BlockContainer
        omitBottomMargin={index === blocks.length - 1}
        locked={readOnly || inPreviewMode}
        verticalBlockMargin={verticalBlockMargin}
        key={block.uuid}
        isFocused={block.isFocused}
        uuid={block.uuid}
        onBlockClick={handleBlockClick}
        variation={block.variation}
        baseAttrs={block.baseAttrs}
        variationAttrs={block.variationAttrs}
        blockElement={BlockElement}
      />
    );
  });

  return (
    <React.Fragment>
      <PageHeader header={header} />
      {list}
      {renderDropzones && <DropZone onDrop={handleOnDrop} />}
    </React.Fragment>
  );
}
