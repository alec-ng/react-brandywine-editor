import React from "react";
import { connect } from 'react-redux';
import { togglePreviewMode } from '../../../state/actions';

import Canvas from "../canvas";
import { BaseContainer, CanvasContainer } from './styled';

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
