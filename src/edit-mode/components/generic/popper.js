import React from 'react';
import styled from 'styled-components';
import Popper from '@material-ui/core/Popper';

const Arrow = styled.span`
  &, &::before {
    position: absolute;
    width: 20px;
    height: 20px;
    z-index: -1;
  }
  &::before {
    top: -10px;
    content: '';
    transform: rotate(45deg);
    background: rgb(245, 245, 245);
  }
`;

const RootContainer = styled.div`
  box-shadow: 0px 2px 2px rgb(100, 100, 100);
  border-radius: 10px;
`;

export const PopperContainer = styled.div`
  position: relative;
  padding: 10px 20px;
  width: 400px;
  max-height: 300px;
  overflow-y: auto;
  background: rgb(245, 245, 245);
  border-radius: 5px;

  &::-webkit-scrollbar {
    width: 3px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 3px;
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

export function PopperComponent({ anchorEl, open, children }) {
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
        arrow: {
          enabled: true,
          element: '[data-popper-arrow]'
        },
        offset: {
          enabled: true,
          offset: "0, 15"
        }  
      }}
    >
      <Arrow data-popper-arrow></Arrow>
      <RootContainer>
        {children}
      </RootContainer>
    </Popper>
  );
}