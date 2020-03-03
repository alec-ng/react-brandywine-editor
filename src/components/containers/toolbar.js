import React from "react";
import { exportStateData } from "../../state/index";
import { useStateValue } from '../../state/context';
import { ACTION_TYPES } from "../../state/reducers/index";

import PageHeaderForm from "../universal/page-header-form";
import DraggablePlugin from "../universal/draggable-plugin";
import Accordion from "../generic/accordion";
import BlockAttributes from "../universal/block-attributes";

/**
 * Represents the editor's left hand command bar for modifying page and block metadata
 */
export default function Toolbar() {
  const [
    { plugins, pluginMap, blocks, onSave, focusedBlock, showPluginDescription, header },
    dispatch
  ] = useStateValue();

  
  function exportEditorData() {
    let { exportHeader, exportBlocks } = exportStateData(header, blocks);
    onSave(exportHeader, exportBlocks);
  }

  function togglePreview() {
    dispatch ({ type: ACTION_TYPES.TOGGLE_PREVIEW_MODE });
  }

  function deleteFocusedBlock() {
    dispatch({ type: ACTION_TYPES.DELETE_FOCUSED_BLOCK });
  }

  function updateHeader(key, value) {
    dispatch({
      type: ACTION_TYPES.UPDATE_HEADER,
      payload: {
        key: key,
        value: value
      }
    });
  }

  function updateBlockAttribute(name, value, variation) {
    dispatch({
      type: ACTION_TYPES.UPDATE_FOCUSED_BLOCK,
      payload: {
        name: name,
        val: value,
        variation: variation
      }
    });
  }

  function updateVariation(newVariation) {
    dispatch({
      type: ACTION_TYPES.UPDATE_VARIATION,
      payload: { variation: newVariation }
    });
  }

  const PluginList = plugins.map(plugin => (
    <DraggablePlugin
      showPluginDescription={showPluginDescription}
      key={plugin.name}
      plugin={plugin}
    />
  ));

  return (
    <div>
      <section className="p-1">
        <Accordion title="Page Header">
          <PageHeaderForm 
            header={header}
            onInputChange={updateHeader}
          />
        </Accordion>
        <Accordion title="Add Block">
          {PluginList}
        </Accordion>
        <Accordion title="Block Attributes" openOnDefault={true}>
          <BlockAttributes 
              onAttributeChange={updateBlockAttribute}
              onVariationChange={updateVariation}
              focusedBlock={focusedBlock}
              pluginMap={pluginMap}
          />
        </Accordion>
      </section>

      <section className="p-3">
        {onSave != null && (
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
            onClick={deleteFocusedBlock}
          >
            Delete Current Block
          </button>
        )}
      </section>
    </div>
  );
}
