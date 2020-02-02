import React from "react";
import styled from 'styled-components';
import { useStateValue } from "../state";
import { ACTION_TYPES } from "../reducers/index";
import Input from "./input";

/**
 * Displays the title, subtitle, and display dates at the top of the page
 */
export function PageHeader(props) {
  const [{ header }] = useStateValue();
  const headerExists =
    header.title ||
    header.subTitle ||
    header.displayDate1 ||
    header.displayDate2;

  if (!headerExists) {
    return (
      <Header>
        <h1 className="text-muted">Your page title goes here</h1>
      </Header>
    )
  }

  let displayDate;
  if (header.displayDate1 && header.displayDate2) {
    displayDate = `${header.displayDate1.replace(
      "-",
      "/"
    )}  - ${header.displayDate2.replace("-", "/")}`;
  } else {
    displayDate = header.displayDate1 || header.displayDate2;
  }

  return (
    <Header>
      {header.title && (
        <h1 className="mb-0 brandywine-responsive-header">{header.title}</h1>
      )}
      {header.subTitle && <h3 className="mt-3 mb-0">{header.subTitle}</h3>}
      {displayDate && <h4 className="mt-2 mb-0">{displayDate}</h4>}
    </Header>
  );
}


const HeaderContainer = styled.div`
  overflow-wrap: break-word;
  margin: 0 auto;
  text-align: center;
`;

function Header(props) {
  return (
    <HeaderContainer className="brandywine-width_large brandywine-responsive-x-padding my-5">
      {props.children}
    </HeaderContainer>
  )
}

/**
 * Set of inputs to edit current page header
 */
export function PageHeaderControls(props) {
  const [{ header }, dispatch] = useStateValue();

  function handleOnChange(e) {
    dispatch({
      type: ACTION_TYPES.UPDATE_HEADER,
      payload: {
        key: e.target.dataset.key,
        value: e.target.value
      }
    });
  }

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
      }}
    >
      <Input
        label="Title"
        type="text"
        dataKey="title"
        attributes={{ value: header.title || "" }}
        handleOnChange={handleOnChange}
      />
      <Input
        label="Subtitle"
        type="text"
        dataKey="subTitle"
        attributes={{ value: header.subTitle || "" }}
        handleOnChange={handleOnChange}
      />
      <div className="form-row">
        <div className="col-md-6">
          <Input
            label="Start Date"
            type="date"
            dataKey="displayDate1"
            attributes={{ value: header.displayDate1 || "" }}
            handleOnChange={handleOnChange}
          />
        </div>
        <div className="col-md-6">
          <Input
            label="End Date"
            type="date"
            dataKey="displayDate2"
            attributes={{ value: header.displayDate2 || "" }}
            handleOnChange={handleOnChange}
          />
        </div>
      </div>
    </form>
  );
}
