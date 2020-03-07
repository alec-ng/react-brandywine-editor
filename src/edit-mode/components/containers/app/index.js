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
function App({ inPreviewMode, fullHeight, dispatch }) {
  
  const togglePreview = () => {
    dispatch(togglePreviewMode());
  }

  return (
    <BaseContainer inPreviewMode={inPreviewMode} fullHeight={fullHeight}>
      {!inPreviewMode && (
        <ToolbarContainer>
          <Toolbar />
        </ToolbarContainer>
      )}
      <CanvasContainer inPreviewMode={inPreviewMode} fullHeight={fullHeight}>
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
  fullHeight: state.fullHeight
});
export default connect(mapStateToProps)(App);
