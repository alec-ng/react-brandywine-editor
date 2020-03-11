import React, { useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { 
  deleteFocusedBlock, 
  updateHeader,
  updateFocusedBlock, 
  updateVariation
} from '../../state/actions';

import Popper from '../generic/popper';
import PageHeaderForm from "../universal/page-header-form";
import BlockAttributes from "../universal/block-attributes";

/**
 * Renders a popper that conditionally renders a body depending on the focused
 * element type
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
      e.currentTarget.dataset.pluginName,
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
        <h1>Dropzone!</h1>
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



const StyledButton = styled.div`
  border: 1px solid grey;

`;

function PluginButtons({ pluginOrder, pluginMap }) {
  return (
    <div>

    </div>
  )
}
