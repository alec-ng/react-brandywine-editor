import React from 'react';
import Input from '../generic/input';

/**
 * Set of inputs to edit current page header
 */
export default function PageHeaderControls({ header, onInputChange }) {
  function handleChange(e) {
    onInputChange(e.currentTarget.dataset.key, e.currentTarget.value);
  }
  
  return (
    <form onSubmit={e => {e.preventDefault();}} >
      <Input
        label="Title"
        type="text"
        dataKey="title"
        attributes={{ value: header.title || "" }}
        handleOnChange={handleChange}
      />
      <Input
        label="Subtitle"
        type="text"
        dataKey="subTitle"
        attributes={{ value: header.subTitle || "" }}
        handleOnChange={handleChange}
      />
      <div className="form-row">
        <div className="col-md-6">
          <Input
            label="Start Date"
            type="date"
            dataKey="displayDate1"
            attributes={{ value: header.displayDate1 || "" }}
            handleOnChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <Input
            label="End Date"
            type="date"
            dataKey="displayDate2"
            attributes={{ value: header.displayDate2 || "" }}
            handleOnChange={handleChange}
          />
        </div>
      </div>
    </form>
  );
}