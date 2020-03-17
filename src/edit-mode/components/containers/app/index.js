import React from "react";
import { connect } from 'react-redux';
import { togglePreviewMode } from '../../../state/actions';

import Canvas from "../canvas";
import AppBar from '../../generic/appbar';
import AppbarControls from '../../universal/appbar-controls';
import { BaseContainer, CanvasContainer } from './styled';

/**
 * Top level container component
 * Conditional rendering dependning on read vs preview vs edit mode
 */
function App({ inPreviewMode, fullHeight, dispatch }) {
  
  function togglePreview() {
    dispatch(togglePreviewMode());
  }

  return (
    <BaseContainer>
      <AppBar>
        <AppbarControls
          inPreviewMode={inPreviewMode}
          handlePreviewClick={togglePreview}
        />
      </AppBar>
      <CanvasContainer inPreviewMode={inPreviewMode} fullHeight={fullHeight}>
        <Canvas />
      </CanvasContainer>
    </BaseContainer>
  );
}

const mapStateToProps = (state) => ({
  inPreviewMode: state.inPreviewMode,
  fullHeight: state.fullHeight
});
export default connect(mapStateToProps)(App);
