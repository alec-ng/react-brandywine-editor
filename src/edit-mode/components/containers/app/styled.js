import styled from 'styled-components';

/**
 * styled components for app.js
 */

export const BaseContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 100%;
`;

export const CanvasContainer = styled.div`
  ${({ inPreviewMode }) => {
    if (!inPreviewMode) {
      return `
        padding: 0 10px 200px 10px;
        & div[role=tooltip] {
          z-index: 2;
        }
      `
    }
  }}
`;


