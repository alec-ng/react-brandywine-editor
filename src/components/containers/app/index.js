import React from "react";
import { connect } from 'react-redux';
import { togglePreviewMode } from '../../../state/actions';

import Toolbar from "../toolbar";
import Canvas from "../canvas";
import { 
  BaseContainer, CanvasContainer, ToolbarContainer , InPreviewModeButton
} from './styled';

/**
 * Top level container component
 * Conditional rendering dependning on read vs preview vs edit mode
 */
function App({ inPreviewMode, readOnly, fullHeight, dispatch }) {
  
  const togglePreview = () => {
    dispatch(togglePreviewMode());
  }

  return (
    <BaseContainer 
      readOnly={readOnly} 
      inPreviewMode={inPreviewMode} 
      fullHeight={fullHeight} 
    >
      
      {!inPreviewMode && !readOnly && (
        <ToolbarContainer>
          <Toolbar />
        </ToolbarContainer>
      )}
      
      <CanvasContainer 
        readOnly={readOnly} 
        inPreviewMode={inPreviewMode} 
        fullHeight={fullHeight}
      >
        <Canvas />
      </CanvasContainer>
      
      {inPreviewMode && 
        <InPreviewModeButton 
          type="button"
          className="btn btn-block btn-primary"
          onClick={togglePreview}
        >
          Return to Editor
        </InPreviewModeButton>
      }

    </BaseContainer>
  );
}

const mapStateToProps = (state) => ({
  inPreviewMode: state.inPreviewMode,
  readOnly: state.readOnly,
  fullHeight: state.fullHeight
});
export default connect(mapStateToProps)(App);
