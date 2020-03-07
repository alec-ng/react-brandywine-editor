import styled from 'styled-components';

/**
 * styled components for app.js
 */

export const BaseContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  height: ${props => props.fullHeight === true ? '100vh' : '100%' };

  ${({ inPreviewMode }) => inPreviewMode 
    ? `display: block;`
    : `display: flex;
       min-width: 992px;
      `
  }
`;

export const ToolbarContainer = styled.div`
  flex: 0 0 25%;
  overflow-y: auto;
  height: ${props => props.fullHeight === true ? '100vh' : '100%' };

  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 5px;
  }
  &::-webkit-scrollbar-track {
    opacity: 0;
    margin: 3px 0;
  }
`;

export const CanvasContainer = styled.div`
  ${({ inPreviewMode }) => inPreviewMode 
    ? `padding-bottom: 30px;`
    : `flex: 75%;
       padding: 0 10px 20px 10px;
       height: 100%;
       overflow-y: auto;  
       `
  }
`;

export const InPreviewModeButton = styled.button`
  position: fixed;
  width: 150px;
  height: 40px;
  bottom: 5%;
  right: 5%;
  background-color: rgba(0, 0, 0, 0);
  border-color: rgba(0, 0, 0, 0.4);
  color: rgba(0, 0, 0, 0.4);
`;