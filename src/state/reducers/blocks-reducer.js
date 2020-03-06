import produce from 'immer';
import { createNewBlock } from "./util";
import {
  UPDATE_VARIATION,
  UPDATE_FOCUSED_BLOCK,
  ADD_BLOCK,
  DELETE_FOCUSED_BLOCK,
  SWITCH_BLOCK_FOCUS,
  MOVE_BLOCK
} from '../actions';

export default function blocksReducer(blocks={}, focusedBlock, pluginMap, action) {
  return produce(blocks, draft => {
    switch (action.type) {
      // block that was just moved is now the only new focused block
      case MOVE_BLOCK: {
        if (focusedBlock) {
          draft[focusedBlock].isFocused = false;
        }
        draft[action.targetBlockId].isFocused = true;
        break;
      }

      // specified block is now the only focused block
      case SWITCH_BLOCK_FOCUS: {
        if (focusedBlock) {
          draft[focusedBlock].isFocused = false;
        }
        draft[action.uuid].isFocused = true;
        break;
      }

      // update a specific base of variation attribute  of the current block
      case UPDATE_FOCUSED_BLOCK: {
        if (!focusedBlock) {
          break;
        }
        if (action.variation === 'base') {
          draft[focusedBlock].baseAttrs[action.key] = action.val;
        } else {
          draft[focusedBlock].variationAttrs[action.variation][action.key] = action.val;
        }
        break;
      }

      // add new block entry and make sure it's the only focused block
      case ADD_BLOCK: {
        if (focusedBlock) {
          draft[focusedBlock].isFocused = false;
        }
        const plugin = pluginMap[action.pluginName];
        draft[action.newUuid] = createNewBlock(plugin, action.newUuid)
        break;
      }
  
      // update the variation property of the focused block
      case UPDATE_VARIATION: {
        if (!focusedBlock) {
          break;
        }
        let blockToUpdate = draft[focusedBlock];
        blockToUpdate.variation = action.newVariation;
        if (!blockToUpdate.variationAttrs[action.newVariation]) {
          blockToUpdate.variationAttrs[action.newVariation] = {};
        }
        break;
      }
       
      // removes the focused block from key value store
      case DELETE_FOCUSED_BLOCK: {
        if (!focusedBlock) {
          break;
        }
        delete draft[focusedBlock];
        break;
      }
  
      default:
        return draft;
    }
  });
}