/**
 * Return all non-mutable config state properties
 */
export function selectConfig(state) {
  return {
    verticalBlockMargin: state.verticalBlockMargin,
    showPluginDescription: state.showPluginDescription,
    onSave: state.onSave,
    onChange: state.onChange,
    fullHeight: state.onChange,
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

/**
 * Return an ordered array of block objects
 */
export function selectBlockArray(state) {
  return state.blockOrder.map(uuid => state.blocks[uuid]);
}