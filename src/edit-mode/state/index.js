import { v4 as uuidv4 } from 'uuid';
import { createStore } from 'redux';
import { mainReducer } from "./reducers/index";


const defaultState = {
  // CONFIG properties: set once from user props
  showPluginDescription: true,
  onChange: null,
  fullHeight: false,
  pluginOrder: [],
  pluginMap: {},
  
  // MUTABLE properties: generated from user props in initialization
  blockOrder: [],
  blocks: {},
  focusedBlock: null,
  header: {},
  inPreviewMode: false
}

export const getInitialStore = (props) => createStore(
  mainReducer, 
  generateStateFromProps(props)
);

/**
 * Creates an initial state given editor initialization values via props
 */
function generateStateFromProps({ 
  plugins, 
  onChange, 
  pageData, 
  fullHeight, 
  showPluginDescription 
}) {
  let initialState = {...defaultState};

  // Map Config properties
  let pluginMap = {};
  let pluginOrder = [];
  plugins.forEach(plugin => {
    pluginOrder.push(plugin.name);
    pluginMap[plugin.name] = plugin;
  });
  initialState.pluginMap = pluginMap;
  initialState.pluginOrder = pluginOrder;
  initialState.onChange = onChange;
  initialState.showPluginDescription = showPluginDescription === false ? false : true;
  initialState.fullHeight = fullHeight === true ? true : false;

  // Initialize default content
  if (pageData) {
    let localPageData = JSON.parse(JSON.stringify(pageData));
    initialState.header = localPageData.header;

    if (localPageData.blocks && localPageData.blocks.length > 0) {
      let blocks = {};
      let blockOrder = [];
      localPageData.blocks.forEach(block => {
        block.uuid = uuidv4();
        block.isFocused = false;
        blockOrder.push(block.uuid);
        blocks[block.uuid] = block;
      });
      initialState.blocks = blocks;
      initialState.blockOrder = blockOrder;
    }
  }

  return initialState;
}

