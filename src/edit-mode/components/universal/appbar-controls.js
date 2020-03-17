import React from 'react';
import { Button } from '@material-ui/core'

export default function AppbarControls({
  inPreviewMode,
  handlePreviewClick,
  handleZoomChange
}) {

  if (!inPreviewMode) {
    return (
      <React.Fragment>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handlePreviewClick}
        >
          Preview
        </Button>
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <Button 
        variant="outlined" 
        color="primary" 
        onClick={handlePreviewClick}
      >
        Back to Editor
      </Button>
    </React.Fragment>
  );

}