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
  position: relative;
  ${({ inPreviewMode }) => {
    if (!inPreviewMode) {
      return `
        padding-bottom: 350px;
        & div[role=tooltip] {
          z-index: 2;
        }
      `
    }
  }}
`;


