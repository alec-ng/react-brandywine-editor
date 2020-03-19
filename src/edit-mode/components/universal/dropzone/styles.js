import styled from 'styled-components'

/**
 * TOP LEVEL STYLES
 */
export const RootContainer = styled.div`
  display: ${props => props.inPreviewMode 
    ? 'none'
    : 'initial'
  }
`;

/*
 * BUTTON STYLES
 */
export const RelativeContainer = styled.div`
  position: relative;
`;
export const StyledBtn = styled.button`
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

/*
 * DIV STYLES
 */
export const ColourBlockDiv = styled.div`
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

export const ColourBlock = styled.div`
  transition: background-color 0.1s linear
`;