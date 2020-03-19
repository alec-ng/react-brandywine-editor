import React, { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { 
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

  // Scroll into view when anchor changes, if necessary
  useEffect(() => {
    const timer = setTimeout(() => {
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const eleStart = contentRef.current.getBoundingClientRect().top;
      if (windowHeight - eleStart < 100) {
        contentRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
      }
    });
    return () => clearTimeout(timer);
  }, [anchorRef])
  
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
            <BlockAttributes 
              onAttributeChange={updateBlockAttribute}
              onVariationChange={updateBlockVariation}
              focusedBlock={focusedElement.data}
              pluginMap={config.pluginMap}
            />
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
