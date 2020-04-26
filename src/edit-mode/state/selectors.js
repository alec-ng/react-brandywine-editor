/**
 * Return all non-mutable config state properties
 */
export function selectConfig(state) {
  return {
    verticalBlockMargin: state.verticalBlockMargin,
    onSave: state.onSave,
    onChange: state.onChange,
    pluginOrder: state.pluginOrder,
    pluginMap: state.pluginMap
  };
}

/**
 * Return the full focused block object from the key-value store
 */
export function selectFocusedBlock(state) {
  if (!state.focusedBlock) {
    return null;
  }
  return state.blocks[state.focusedBlock];
}

export function selectFocusedElement(state) {
  if (!state.focusedElementType) {
    return {};
  }
  let id;
  let data;
  if (state.focusedElementType === 'dropzone') {
    id = state.focusedDropzone; 
  }
  if (state.focusedElementType === 'block') {
    id = state.focusedBlock; 
    data = state.blocks[state.focusedBlock]
  }
  if (state.focusedElementType === 'header') {
    id = 'header';
    data = state.header;
  }

  return {
    type: state.focusedElementType,
    id: id,
    data: data
  };
}

/**
 * Return an ordered array of block objects
 */
export function selectBlockArray(state) {
  return state.blockOrder.map(uuid => state.blocks[uuid]);
}