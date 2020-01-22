import React from 'react';

export const MOCK_PLUGIN_NAME = 'mock_plugin';

export const mockPlugin = {
  name: MOCK_PLUGIN_NAME,
  label: 'label',
  description: 'description',
  canvasElement: (props) => {
    return (
      <h1>Mock Plugin</h1>
    );
  },
  variations: [
    {
      name: 'default',
      label: 'default'
    }
  ],
  defaultVariation: 'default'
};