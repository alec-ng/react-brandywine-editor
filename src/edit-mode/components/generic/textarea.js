import React from "react";
import FormGroupDiv from './form-group-div'

/**
 * Represents an HTML5 textarea element
 */
export default function TextArea(props) {
  let numRows = props.attributes.rows || 5;

  return (
    <FormGroupDiv>
      {props.label}
      <textarea
        onChange={props.handleOnChange}
        className="form-control form-control-sm"
        rows={numRows}
        {...props.attributes}
      >
        {props.value}
      </textarea>
    </FormGroupDiv>
  );
}
