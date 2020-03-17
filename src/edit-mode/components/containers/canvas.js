import React from "react";
import useFocusedElementRef from '../../hooks/useFocusedElementRef';
import { connect } from 'react-redux';
import { 
  selectConfig, 
  selectBlockArray, 
  selectFocusedElement 
} from '../../state/selectors';
import { 
  moveBlock, 
  updateFocusedElement,
  clearFocusedElement 
} from '../../state/actions';

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
  focusedElement,
  dispatch 
}) {  
  const focusedElementRef = useFocusedElementRef(focusedElement.type, focusedElement.id);

  /**
   * Components to render
   */
  let elements = [];
  blocks.forEach((block) => {
    let BlockElement = config.pluginMap[block.name].canvasElement;
    if (!inPreviewMode) {
      elements.push(
        <DropZone
          key={`dropzone-${block.uuid}`}
          uuid={`dropzone-${block.uuid}`}
          onDrop={handleOnDrop}
          onClick={handleElementClick}
          inPreviewMode={inPreviewMode}
          isFocused={focusedElement.id === `dropzone-${block.uuid}`}
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
        isFocused={focusedElement.id === block.uuid}
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
        isFocused={focusedElement.id === 'dropzone-last'}
      />
    );
  }

  /**
   * Handlers for clicking canvas elements
   * Focused element if not focused previously. Removes focus if already focused.
   */
  function handleElementClick({ elementtype, uuid }) {
    const isSameElement = elementtype === 'header'
      ? focusedElement.type === 'header'
      : focusedElement.type === elementtype && focusedElement.id === uuid;

    if (isSameElement) {
      dispatch(clearFocusedElement());
    } else {
      dispatch(updateFocusedElement(elementtype, uuid));
    }
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
        !inPreviewMode && focusedElementRef &&
        <FocusedElementPopper
          config={config}
          anchorRef={focusedElementRef}
          focusedElement={focusedElement}
          dispatch={dispatch}
        />
      }

      <FocusableContainer
        isFocused={focusedElement.type === 'header'}
        dataset={{ elementtype: 'header', uuid: 'header' }}
        onClick={handleElementClick}
        inPreviewMode={inPreviewMode}
        renderCompareProp={header}
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
  focusedElement: selectFocusedElement(state),
});
export default connect(mapStateToProps)(Canvas);
