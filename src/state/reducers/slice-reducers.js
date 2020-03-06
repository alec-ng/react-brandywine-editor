
import {
  ADD_BLOCK,
  DELETE_FOCUSED_BLOCK,
  UPDATE_HEADER,
  TOGGLE_PREVIEW_MODE,
  SWITCH_BLOCK_FOCUS,
  MOVE_BLOCK
} from '../actions';

export function headerReducer(header={}, action) {
  switch (action.type) {
    case UPDATE_HEADER:
      return {...header, [action.key]: action.value };
    default:
      return header;
  }
}

export function previewModeReducer(inPreviewMode=false, action) {
  switch (action.type) {
    case TOGGLE_PREVIEW_MODE:
      return !inPreviewMode
    default: 
      return inPreviewMode;
  }
}

export function focusedBlockReducer(focusedBlock=null, action) {
  switch (action.type) {
    case SWITCH_BLOCK_FOCUS:
      return action.uuid;
    case DELETE_FOCUSED_BLOCK:
      return null;
    case ADD_BLOCK:
      return action.newUuid;
    case MOVE_BLOCK:
      return action.targetBlockId;
    default:
      return focusedBlock;
  }
}

