import React from "react";
import { connect } from 'react-redux';
import { 
  togglePreviewMode, deleteFocusedBlock, updateHeader, updateFocusedBlock, updateVariation
} from '../../state/actions';
import { selectConfig, selectFocusedBlock } from '../../state/selectors';

import PageHeaderForm from "../universal/page-header-form";
import DraggablePlugin from "../universal/draggable-plugin";
import Accordion from "../generic/accordion";
import BlockAttributes from "../universal/block-attributes";

/**
 * Represents the editor's left hand command bar for modifying page and block metadata
 */
function Toolbar({ config, focusedBlock, header, dispatch }) {

  function togglePreview() {
    dispatch(togglePreviewMode());
  }

  function deleteCurrentBlock() {
    dispatch(deleteFocusedBlock());
  }

  function updateHeaderValue(key, value) {
    dispatch(updateHeader(key, value));
  }

  function updateBlockAttribute(variation, name, value) {
    dispatch(updateFocusedBlock(variation, name, value));
  }

  function updateBlockVariation(newVariation) {
    dispatch(updateVariation(newVariation));
  }

  const PluginList = config.pluginOrder.map(pluginName => (
    <DraggablePlugin
      showPluginDescription={config.showPluginDescription}
      key={pluginName}
      plugin={config.pluginMap[pluginName]}
    />
  ));

  return (
    <div>
      <section className="p-1">
        <Accordion title="Page Header">
          <PageHeaderForm 
            header={header}
            onInputChange={updateHeaderValue}
          />
        </Accordion>
        <Accordion title="Add Block">
          {PluginList}
        </Accordion>
        <Accordion title="Block Attributes" openOnDefault={true}>
          <BlockAttributes 
              onAttributeChange={updateBlockAttribute}
              onVariationChange={updateBlockVariation}
              focusedBlock={focusedBlock}
              pluginMap={config.pluginMap}
          />
        </Accordion>
      </section>

      <section className="p-3">
        {config.onSave && (
          <button
            type="button"
            className="btn btn-block btn-success"
            onClick={exportEditorData}
          >
            Save
          </button>
        )}
        <button
          type="button"
          className="btn btn-block btn-primary"
          onClick={togglePreview}
        >
          Preview
        </button>
        {focusedBlock != null && (
          <button
            type="button"
            className="btn btn-block btn-danger"
            onClick={deleteCurrentBlock}
          >
            Delete Current Block
          </button>
        )}
      </section>
    </div>
  );
}

const mapStateToProps = (state) => ({
  config: selectConfig(state),
  focusedBlock: selectFocusedBlock(state),
  header: state.header
});
export default connect(mapStateToProps)(Toolbar);

