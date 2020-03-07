import { dispatchChange } from "./util";
import { actionsTriggeringDispatch } from '../actions';

import blocksReducer from "./blocks-reducer";
import blockOrderReducer from './block-order-reducer';
import { 
  headerReducer, previewModeReducer, focusedBlockReducer, focusedElementTypeReducer
} from './slice-reducers';

export const mainReducer = (state = {}, action) => {
  // get next values for subset of state that is mutable 
  const updatedState = {
    header: headerReducer(state.header, action),
    blocks: blocksReducer(state.blocks, state.focusedBlock, state.pluginMap, action),
    blockOrder: blockOrderReducer(state.blockOrder, state.focusedBlock, action),
    focusedBlock: focusedBlockReducer(state.focusedBlock, action),
    inPreviewMode: previewModeReducer(state.inPreviewMode, action),
    focusedElementTypeReducer: focusedElementTypeReducer(state.focusuedElementType, action)
  };

  // merge next state values with static config values
  const newState = Object.assign({}, state, updatedState);

  // trigger onChange config callback on certain action types
  if (newState.onChange && actionsTriggeringDispatch.indexOf(action.type) !== -1) {
    dispatchChange(
      newState.onChange, newState.header, newState.blocks, newState.blockOrder
    );
  }

  return newState;
}

