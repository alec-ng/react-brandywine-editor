import React from "react";
import { useStateValue } from "./state";
import styled from "styled-components";
import "./styles.css";
import Toolbar from "./toolbar";
import Canvas from "./canvas";
import PreviewButton from "./components/preview-button";

/**
 * Highest level rendering component
 */

const BaseContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  display: ${props =>
    props.readOnly || props.inPreviewMode ? "block" : "flex"};
  height: ${props => props.fullHeight === true ? '100vh' : '100%' };
  min-width: ${props =>
    props.readOnly || props.inPreviewMode ? "inherit" : "992px"};
`;
const ToolbarContainer = styled.div`
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
const CanvasContainer = styled.div`
  ${({ readOnly, inPreviewMode }) => (readOnly || inPreviewMode) && `
    padding: 0;
  `}
  ${({ readOnly, inPreviewMode }) => !readOnly && !inPreviewMode && `
    flex: 75%;
    padding: 0 10px 20xpx 10px;
    height: 100%;
    overflow-y: auto;  
  `}
  ${({ inPreviewMode }) => inPreviewMode && `
    padding-bottom: 30px;
  `}
`;

export default function App(props) {
  const [{ inPreviewMode, readOnly, fullHeight }] = useStateValue();
  return (
    <BaseContainer readOnly={readOnly} inPreviewMode={inPreviewMode} fullHeight={fullHeight} >
      {!inPreviewMode && !readOnly && (
        <ToolbarContainer>
          <Toolbar />
        </ToolbarContainer>
      )}
      <CanvasContainer readOnly={readOnly} inPreviewMode={inPreviewMode} fullHeight={fullHeight}>
        <Canvas />
      </CanvasContainer>
      {inPreviewMode && <PreviewButton />}
    </BaseContainer>
  );
}
