import { mockPlugin, MOCK_PLUGIN_NAME } from './plugin.mock';

const plugins = [mockPlugin];

let pluginMap = {};
pluginMap[MOCK_PLUGIN_NAME] = mockPlugin;

export default {
  plugins: plugins,
  pluginMap: pluginMap,
  header: {
    title: "",
    subTitle: "",
    displayDate1: "",
    displayDate2: ""
  },
  blocks: [],
  readOnly: false,
  focusedBlock: undefined,
  inPreviewMode: false,
  verticalBlockMargin: '20px',
  showPluginDescription: true,
  onSave: null,
  onChange: null
};

