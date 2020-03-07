import React from "react";
import styled from 'styled-components';

const HeaderContainer = styled.div`
  overflow-wrap: break-word;
  margin: 0 auto;
  text-align: center;
`;

/**
 * Displays the title, subtitle, and display dates
 */
export default function PageHeader({ header }) {
  const valueExists = header && (
    header.title ||
    header.subTitle ||
    header.displayDate1 ||
    header.displayDate2
  );

  if (!valueExists) {
    return (
      <HeaderContainer className="brandywine-width_large brandywine-responsive-x-padding my-5">
        <h1 className="text-muted">Your page title goes here</h1>
      </HeaderContainer>
    )
  }

  let displayDate;
  let displayDate1 = !header.displayDate1 ? null : header.displayDate1.replace(/-/g, '/');
  let displayDate2 = !header.displayDate2 ? null : header.displayDate2.replace(/-/g, '/');
  if (displayDate1 && displayDate2) {
    displayDate = `${displayDate1} - ${displayDate2}`;
  } else {
    displayDate = displayDate1 || displayDate2;
  }

  return (
    <HeaderContainer className="brandywine-width_large brandywine-responsive-x-padding my-5">
      {header.title && 
        <h1 className="mb-0 brandywine-responsive-header">{header.title}</h1>
      }
      {header.subTitle && 
        <h3 className="mt-3 mb-0">{header.subTitle}</h3>
      }
      {displayDate && 
        <h4 className="mt-2 mb-0">{displayDate}</h4>
      }
    </HeaderContainer>
  );
}

