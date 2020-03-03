import React from "react";
import { useStateValue } from "../../../state/context";
import { ACTION_TYPES } from '../../../state/reducers';
import Toolbar from "../toolbar";
import Canvas from "../canvas";
import { 
  BaseContainer, CanvasContainer, ToolbarContainer , InPreviewModeButton
} from './styled';

/**
 * Top level container component
 * Conditional rendering dependning on read vs preview vs edit mode
 */
export default function App() {
  const [{ inPreviewMode, readOnly, fullHeight }, dispatch] = useStateValue();
  const togglePreview = () => {
    dispatch ({ type: ACTION_TYPES.TOGGLE_PREVIEW_MODE });
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
