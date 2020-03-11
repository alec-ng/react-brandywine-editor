
import {
  ADD_BLOCK,
  DELETE_FOCUSED_BLOCK,
  UPDATE_HEADER,
  TOGGLE_PREVIEW_MODE,
  SWITCH_BLOCK_FOCUS,
  MOVE_BLOCK,
  UPDATE_FOCUSED_ELEMENT
} from '../actions';

export function focusedElementTypeReducer(focusedElementType=null, action) {
  switch (action.type) {
    case UPDATE_FOCUSED_ELEMENT:
      return action.elementType;
    case SWITCH_BLOCK_FOCUS:
      return 'block';
    case DELETE_FOCUSED_BLOCK:
      return null;
    default:
      return focusedElementType;
  }
}

export function focusedDropzoneReducer(focusedDropzone=null, action) {
  switch (action.type) {
    case SWITCH_BLOCK_FOCUS:
      return null;
    case UPDATE_FOCUSED_ELEMENT:
      return action.elementType === 'dropzone' ? action.uuid : null;
    default:
      return focusedDropzone;
  }
}

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
    case UPDATE_FOCUSED_ELEMENT:
      return action.elementType === 'block' ? action.uuid : null;
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

