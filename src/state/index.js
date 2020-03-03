import uuidv1 from "uuid/v1";

/**
 * Expected editor state keys and default values
 */
export const DefaultState = {
  plugins: null,
  pluginMap: null,
  header: {
    title: "",
    subTitle: "",
    displayDate1: "",
    displayDate2: ""
  },
  blocks: [],
  focusedBlock: undefined,
  inPreviewMode: false,
  readOnly: false,
  verticalBlockMargin: "20px",
  showPluginDescription: true,
  onSave: null,
  onChange: null,
  fullHeight: false
};

/**
 * Creates a state value given editor initialization values via props
 */
export function generateStateFromProps(
  { plugins, onSave, onChange, readOnly, pageData, fullHeight, showPluginDescription }
) {
  // Validation
  if (!plugins ||plugins.length < 1) {
    throw new Error("You must supply at least one plugin through props.plugins");
  }
  if (!onSave && !onChange && !props.readOnly) {
    throw new Error(
      'If rendering in edit mode, you must supply at least one of onSave or onChange'
    );
  }

  let globalState = Object.assign({}, DefaultState);

  // Initialize default content
  if (pageData) {
    let localPageData = JSON.parse(JSON.stringify(pageData));
    if (localPageData.blocks && localPageData.blocks.length > 0) {
      localPageData.blocks.forEach(block => {
        block.uuid = uuidv1();
        block.isFocused = false;
      });
    }
    globalState.blocks = localPageData.blocks;
    globalState.header = localPageData.header;
  }

  // Map rest of props
  globalState.plugins = plugins;
  globalState.pluginMap = plugins.reduce((pluginMap, plugin) => 
    Object.assign({}, pluginMap, {[plugin.name]: plugin})
  , {});
  globalState.onChange = onChange;
  globalState.onSave = onSave;
  globalState.showPluginDescription = showPluginDescription === false ? false : true;
  globalState.fullHeight = fullHeight === true ? true : false;
  globalState.readOnly = readOnly === true ? true : false;  

  return globalState;
}


/**
 * Trims state data to be exported to parent component
 */
export const exportStateData = function(header, blocks) {
  let localHeader = JSON.parse(JSON.stringify(header));
  let localBlocks = JSON.parse(JSON.stringify(blocks).replace(/\n/g, "\\n"));

  // For each block, delete unneeded props and variation attributes not used
  localBlocks.forEach(block => {
    delete block.isFocused;
    delete block.uuid;
    Object.keys(block.variationAttrs).forEach(variationKey => {
      if (variationKey !== block.variation) {
        delete block.variationAttrs[variationKey];
      }
    });
  });

  return {
    exportHeader: localHeader,
    exportBlocks: localBlocks
  };
};

