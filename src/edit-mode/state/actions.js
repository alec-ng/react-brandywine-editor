/**
 * Action types
 */
export const UPDATE_HEADER = 'UPDATE_HEADER';
export const UPDATE_FOCUSED_BLOCK = 'UPDATE_FOCUSED_BLOCK';
export const ADD_BLOCK = 'ADD_BLOCK';
export const SWITCH_BLOCK_FOCUS = 'SWITCH_BLOCK_FOCUS';
export const UPDATE_VARIATION = 'UPDATE_VARIATION';
export const TOGGLE_PREVIEW_MODE = 'TOGGLE_PREVIEW_MODE';
export const DELETE_FOCUSED_BLOCK = 'DELETE_FOCUSED_BLOCK';
export const MOVE_BLOCK = 'MOVE_BLOCK';
export const UPDATE_FOCUSED_ELEMENT_TYPE = 'UPDATE_FOCUSED_ELEMENT_TYPE';

/**
 * Action creators
 */
export const updateHeader = makeActionCreator(UPDATE_HEADER, 'key', 'value');
export const updateFocusedBlock = makeActionCreator(UPDATE_FOCUSED_BLOCK, 'variation', 'key', 'val');
export const addBlock = makeActionCreator(ADD_BLOCK, 'pluginName', 'positionUuid', 'newUuid');
export const switchBlockFocus = makeActionCreator(SWITCH_BLOCK_FOCUS, 'uuid');
export const updateVariation = makeActionCreator(UPDATE_VARIATION, 'newVariation');
export const togglePreviewMode = makeActionCreator(TOGGLE_PREVIEW_MODE);
export const deleteFocusedBlock = makeActionCreator(DELETE_FOCUSED_BLOCK);
export const moveBlock = makeActionCreator(MOVE_BLOCK, 'targetBlockId', 'positionBlockId');
export const updateFocusedElementType = makeActionCreator(UPDATE_FOCUSED_ELEMENT_TYPE, 'type');

/**
 * Action types that will fire the onSave config cb
 */
export const actionsTriggeringDispatch = [
  ADD_BLOCK,
  UPDATE_FOCUSED_BLOCK,
  UPDATE_VARIATION,
  DELETE_FOCUSED_BLOCK,
  MOVE_BLOCK,
  UPDATE_HEADER
];

/**
 * Utility method to create action creator functions
 */
function makeActionCreator(type, ...argNames) {
  return function(...args) {
    const action = { type }
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index]
    })
    return action
  }
}