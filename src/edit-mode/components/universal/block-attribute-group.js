import React from "react";
import Input from "../generic/input";
import Select from "../generic/select";
import TextArea from "../generic/textarea";

/**
 * Represents a grouping of form elements to be rendered in BlockAttributes in the Toolbar
 * The groupings are either "base" or some variation
 */
export default function BlockAttributeGroup(
  { attrs, focusedBlock, isBase, variationName, onChange }
) {

  let attrList = [];
  attrs.forEach(attr => {
    // Populate HTML attributes through focused block/plugin definition information
    let inputAttrs = { "data-name": attr.name };
    let attributeSet = isBase
      ? focusedBlock.baseAttrs
      : focusedBlock.variationAttrs[variationName];

    inputAttrs["min"] = attr.min;
    inputAttrs["max"] = attr.max;
    inputAttrs["data-variation"] = isBase ? "base" : variationName;
    inputAttrs["value"] = attributeSet[attr.name] || attr.defaultValue || "";

    if (attr.element === "input") {
      if (attr.type === "checkbox" && attributeSet[attr.name] === true) {
        inputAttrs["checked"] = true;
      }
      attrList.push(
        <Input
          label={attr.label}
          type={attr.type}
          handleOnChange={onChange}
          key={attr.name}
          attributes={inputAttrs}
        />
      );
    }

    if (attr.element === "textarea") {
      inputAttrs["rows"] = attr.rows;
      attrList.push(
        <TextArea
          label={attr.label}
          handleOnChange={onChange}
          key={attr.name}
          attributes={inputAttrs}
        />
      );
    }

    if (attr.element === "select") {
      attrList.push(
        <Select
          label={attr.label}
          onChange={onChange}
          key={attr.name}
          options={attr.options}
          attributes={inputAttrs}
          defaultRequired={attr.defaultRequired}
        />
      );
    }
  });

  return (
    <React.Fragment>
      {isBase
        ? attrList
        : attrList.length > 0 && <React.Fragment>{attrList}</React.Fragment>}
    </React.Fragment>
  );
}
