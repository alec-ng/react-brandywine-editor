import React from 'react';
import styled from 'styled-components';
import Popper from '@material-ui/core/Popper';
import { Paper } from '@material-ui/core';

const Container = styled.div`
  position: relative;
  padding: 5px;
  width: 350px;
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid rgba(0, 0, 0, 0.4);

  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 5px;
  }
  &::-webkit-scrollbar-track {
    opacity: 0;
  }
  &:after {
    bottom: 100%;
    left: 50%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-color: rgba(255, 255, 255, 0);
    border-bottom-color: #fff;
    border-width: 10px;
    margin-left: -10px;
  }
`;

export default function StyledPopper({ anchorEl, open, children }) {
  return (
    <Popper 
      open={open} 
      anchorEl={anchorEl} 
      placement="bottom"
      disablePortal={true}
      modifiers={{
        preventOverflow: {
          enabled: false,
        },
        hide: {
          enabled: false
        },
        flip: {
          enabled: false,
        },
      }}
    >
      <Paper>
        <Container>
          {children}
        </Container>
      </Paper>
    </Popper>
  );
}