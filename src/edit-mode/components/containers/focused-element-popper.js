import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { 
  deleteFocusedBlock, 
  updateHeader,
  updateFocusedBlock, 
  updateVariation,
  addBlock
} from '../../state/actions';

import Popper from '../generic/popper';
import PageHeaderForm from "../universal/page-header-form";
import BlockAttributes from "../universal/block-attributes";
import PluginButtonGroup from '../universal/plugin-button-group';

/**
 * Renders a popper that conditionally renders a body depending on the focused
 * element type
 * Stateful, but relies on props instead of connecting to store
 */
export default function FocusedElementPopper({ 
  anchorRef, 
  focusedBlock,
  header,
  config,
  focusedDropzone,
  focusedElementType,
  dispatch
}) {

  const [open, setOpen] = useState(true);
  
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
  function createNewBlock(e) {
    dispatch(addBlock(
      e.currentTarget.dataset.pluginname,
      focusedDropzone,
      uuidv4()
    ));
  }

  return (
    <Popper anchorEl={anchorRef} open={open}>
      {
        focusedElementType === 'block' && 
        <div>
          <BlockAttributes 
            onAttributeChange={updateBlockAttribute}
            onVariationChange={updateBlockVariation}
            focusedBlock={focusedBlock}
            pluginMap={config.pluginMap}
          />
          <button
            type="button"
            className="btn btn-block btn-danger"
            onClick={deleteCurrentBlock}
          >
            Delete
          </button>
        </div>
      }
      {
        focusedElementType === 'dropzone' && 
        <PluginButtonGroup
          pluginOrder={config.pluginOrder}
          pluginMap={config.pluginMap}
          onClick={createNewBlock}
        />
      }
      {
        focusedElementType === 'header' && 
        <PageHeaderForm 
          header={header}
          onInputChange={updateHeaderValue}
        />
      }
    </Popper>
  )
}
