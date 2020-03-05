
import {
  ADD_BLOCK,
  DELETE_FOCUSED_BLOCK,
  MOVE_BLOCK,
  UPDATE_HEADER,
  TOGGLE_PREVIEW_MODE,
  SWITCH_BLOCK_FOCUS
} from '../actions';

export function blockOrderReducer(blockOrder=[], focusedBlock, action) {
  let newArray = blockOrder.slice();
  
  switch (action.type) {
    case ADD_BLOCK: {
      if (!action.positionUuid) {
        newArray.push(action.newUuid);
      } else {
        const indToInsert = newArray.findIndex(uuid => uuid === action.positionUuid);
        newArray.splice(indToInsert, 0, action.newUuid);
      }
      return newArray;
    }

    case DELETE_FOCUSED_BLOCK: {
      const indToRemove = newArray.findIndex(uuid => uuid === focusedBlock);
      newArray.splice(indToRemove, 1);
      return newArray;
    }

    case MOVE_BLOCK: {
      const oldInd = newArray.findIndex(uuid => uuid === action.targetBlockId);
      let newInd = action.positionBlockId
        ? newArray.findIndex(uuid => uuid === action.positionBlockId)
        : newArray.length;

      if (oldInd === newInd || newInd === (oldInd + 1)) {
        return blockOrder;
      }

      newArray.splice(oldInd, 1);
      if (newInd > oldInd) {
        newInd--; // because we just removed the element to move
      }  
      newArray.splice(newInd, 0, action.targetBlockId);
      return newArray;
    }
    
    default:
      return blockOrder;
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
    case DELETE_FOCUSED_BLOCK:
      return null;
    case ADD_BLOCK:
      return action.newUuid;
    default:
      return focusedBlock;
  }
}

