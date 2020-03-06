import React from "react";
import Select from "../generic/select";

/**
 * Renders a select option that toggles the variation of the currently focused block
 */
export default function VariationSelect({ focusedBlock, pluginMap, onChange }) {
  // If only one variation (default), do not render anything
  const currPlugin = pluginMap[focusedBlock.name];
  if (!currPlugin || currPlugin.variations.length < 2) {
    return null;
  }

  const handleChange = (e) => {
    let newVariation = e.target.value;
    if (focusedBlock.variation === newVariation) {
      return;
    }
    onChange(newVariation);
  }
  const selectAttrs = { value: focusedBlock.variation };
  const optionsList = currPlugin.variations.map(variation => ({
    name: variation.name,
    label: variation.label
  }));
  
  return (
    <Select
      defaultRequired={true}
      multiple={false}
      attributes={selectAttrs}
      label="Variation"
      onChange={handleChange}
      options={optionsList}
    />
  );
}
