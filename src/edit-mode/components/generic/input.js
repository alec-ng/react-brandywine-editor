import React from "react";
import FormGroupDiv from './form-group-div'

/**
 * Represents an HTML5 input. Requires at least props.onInput to handle any
 * changes, and type to defined data type expected
 */
export default function Input(props) {
  return (
    <FormGroupDiv>
      {props.label}
      {props.type === "checkbox" ? (
        <CheckboxInput {...props} />
      ) : (
        <BaseInput {...props} />
      )}
    </FormGroupDiv>
  );
}

function BaseInput(props) {
  let inputClass =
    props.type === "range" ? "form-control-range" : "form-control form-control-sm";
  return (
    <input
      type={props.type}
      data-key={props.dataKey}
      className={inputClass}
      onChange={props.handleOnChange}
      {...props.attributes}
    />
  );
}

function CheckboxInput(props) {
  // Convert value to checked property
  let attributeObj = props.attributes
    ? Object.assign({}, props.attributes)
    : {};
  attributeObj.checked = attributeObj.value;
  let newProps = Object.assign({}, props, { attributes: attributeObj });
  return <BaseInput {...newProps} />;
}
