import React from "react";
import VariationSelect from "./variation-select";
import AttributeGroup from "./block-attribute-group";

/**
 * Set of inputs that matches the attributes of the focused block on the canvas
 */
export default function BlockAttributes(
  { focusedBlock, pluginMap, onAttributeChange, onVariationChange }
) {
  if (!focusedBlock) {
    return (
      <div className="text-center">
        <p>Select a block on the canvas to view its attributes.</p>
      </div>
    );
  }

  const handleChange = (e) => {
    let newVal;
    switch (e.target.type) {
      case 'checkbox': 
        newVal = e.target.checked; 
        break;
      case 'number':
        newVal = parseFloat(e.target.value);
        break;
      default:
        newVal = e.target.value;
    }
    onAttributeChange(e.target.dataset.name, newVal, e.target.dataset.variation);
  }
  const plugin = pluginMap[focusedBlock.name];
  const variation = plugin.variations.find(
    variation => variation.name === focusedBlock.variation
  );

  return (
    <form onSubmit={e => { e.preventDefault(); }}>
      <AttributeGroup 
        attrs={plugin.baseAttrs}
        isBase={true}
        onChange={handleChange}
        focusedBlock={focusedBlock}
      />
      <VariationSelect
        focusedBlock={focusedBlock}
        pluginMap={pluginMap} 
        onChange={onVariationChange}
      />
      <AttributeGroup
        attrs={variation.attrs}
        isBase={false}
        onChange={handleChange}
        variationName={focusedBlock.variation}
        focusedBlock={focusedBlock}
      />
    </form>
  );
}
