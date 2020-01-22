import expect from 'expect';
import { ACTION_TYPES, MainReducer } from 'src/reducers';

import MockState from './test-data/state.mock';
import { MOCK_PLUGIN_NAME } from './test-data/plugin.mock';

describe('block reducer', () => {

  it('should handle adding a new block', () => {
    let state = JSON.parse(JSON.stringify(MockState));
    let action = {
      type: ACTION_TYPES.ADD_BLOCK,
      payload: {
        pluginName: MOCK_PLUGIN_NAME,
        uuid: 'test-uuid-1'
      } 
    };
    let newState = MainReducer(state, action);
    expect(newState).toExist();
  });

});