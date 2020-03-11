import styled from 'styled-components';

/**
 * styled components for app.js
 */

export const BaseContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: ${props => props.width || '75%'};
`;

export const CanvasContainer = styled.div`
  ${({ inPreviewMode }) => inPreviewMode 
    ? `padding-bottom: 20px;`
    : `padding: 0 10px 200px 10px;
       height: 100%;
       `
  }
  & div[role=tooltip] {
    z-index: 2;
  }
`;

