import React from 'react';
import {
  RelativeContainer,
  StyledBtn,
  ColourBlockDiv,
  ColourBlock
} from './styles';

/**
 * Styled component with an active/inactive state
 * Able to toggle active state on hover/dragOver events
 */
export default function DropzoneDiv({ setActiveState, isActive }) {  
  function setActive() {
    setActiveState(true);
  }
  function setInactive() {
    setActiveState(false);
  }

  return (
    <RelativeContainer>
      <ColourBlockDiv 
        onDragEnter={setActive} 
        onDragLeave={setInactive} 
        onMouseOver={setActive}
        onMouseOut={setInactive}
        color="#007bff" 
        isActive={isActive}
      >  
        <ColourBlock />
        <ColourBlock />
        <ColourBlock />
      </ColourBlockDiv>
      <StyledBtn 
        type="button"
        onMouseOver={setActive}
        onMouseOut={setInactive}
        isActive={isActive}
        color="#007bff"
      >
        +
      </StyledBtn>
    </RelativeContainer>
  );
}
