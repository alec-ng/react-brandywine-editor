import React from 'react';
import styled from 'styled-components'

/**
 * 
 */
export default function DropzoneDiv({ setActiveState, isActive }) {  
  function setActive() {
    setActiveState(true);
  }
  function setInactive() {
    setActiveState(false);
  }

  return (
    <RootContainer>
      <ColorBlockDiv 
        onDragEnter={setActive} 
        onDragLeave={setInactive} 
        onMouseOver={setActive}
        onMouseOut={setInactive}
        color="#64b5f6" 
        isActive={isActive}
      >  
        <ColourBlock />
        <ColourBlock />
        <ColourBlock />
      </ColorBlockDiv>
      <StyledBtn 
        type="button"
        onMouseOver={setActive}
        onMouseOut={setInactive}
        isActive={isActive}
        color="#64b5f6"
      >
        +
      </StyledBtn>
    </RootContainer>
  );
}

const RootContainer = styled.div`
  position: relative;
`;

const StyledBtn = styled.button`
  position: absolute;
  bottom: -3px;
  right: -1px;
  border-radius: 10px;
  border-style: solid;
  border-width: 1px;
  background: white;
  outline: none;
  &:focus {
    outline: none;
  }

  ${( { isActive, color } ) => {
    return isActive 
      ? `color: ${color};
         border-color: ${color};
        `
      : `color: rgba(0, 0, 0, 0.3);
         border-color: rgba(0, 0, 0, 0.3);
        `
  }}
  
  &:hover {
    border-color: ${props => props.color};
    color: ${props=> props.color};
  }
  transition: border-color 0.1s, color 0.1s;
  
`;

const ColorBlockDiv = styled.div`
  height: 15px;
  transition: border 0.25s;  
  margin: -1px;
  display: flex;
  flex-direction: column;

  & * {
    pointer-events: none;
  }
  & ${ColourBlock}:nth-child(even) {
    flex-grow: 1;
    max-height: 1px;
  }
  & ${ColourBlock}:nth-child(odd) {
    flex-grow: 4;
    background-color: #FFF;
  }

  & ${ColourBlock}:nth-child(2) {
    background-color: ${props => props.isActive 
      ? props.color 
      : '#FFF' 
    };
  }
  &:hover {
    & ${ColourBlock}:nth-child(2) {
      background-color: ${props => props.color};
    }
  }
  
`;

const ColourBlock = styled.div`
  transition: background-color 0.1s linear
`;