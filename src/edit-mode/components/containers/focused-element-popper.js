import React, { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { 
  deleteFocusedBlock, 
  updateHeader,
  updateFocusedBlock, 
  updateVariation,
  addBlock
} from '../../state/actions';

import { PopperComponent, PopperContainer } from '../generic/popper';
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
  config,
  focusedElement,
  dispatch
}) {

  const [open, setOpen] = useState(true);
  const contentRef = useRef();
  useEffect(() => {
    const timer = setTimeout(() => {
      contentRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }, 100);
    return () => clearTimeout(timer);
  }, [anchorRef])
  
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
      focusedElement.id,
      uuidv4()
    ));
  }

  return (
    <PopperComponent anchorEl={anchorRef} open={open}>
      <div ref={contentRef}>
        <PopperContainer>
          {
            focusedElement.type === 'block' && 
            <div>
              <BlockAttributes 
                onAttributeChange={updateBlockAttribute}
                onVariationChange={updateBlockVariation}
                focusedBlock={focusedElement.data}
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
            focusedElement.type === 'dropzone' && 
            <PluginButtonGroup
              pluginOrder={config.pluginOrder}
              pluginMap={config.pluginMap}
              onClick={createNewBlock}
            />
          }
          {
            focusedElement.type === 'header' && 
            <PageHeaderForm 
              header={focusedElement.data}
              onInputChange={updateHeaderValue}
            />
          }
        </PopperContainer>
      </div>
    </PopperComponent>
  )
}
