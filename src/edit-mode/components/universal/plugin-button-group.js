import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: white;
  color: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  width: 100%;
  margin-bottom: 5px;
  text-align: center;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(0,0,0,0.1);
  }
`;

const MediumContainer = styled.div`
  width: 70%;
  margin: 10px auto;
`;

/**
 * Vertical list of buttons generated with plugins from user prop
 */
export default function PluginButtons({ pluginOrder, pluginMap, onClick }) {
  const buttonList = pluginOrder.map(name => 
    <StyledButton 
      onClick={onClick} 
      data-pluginname={name} 
      key={name}
      type="button"
    >
      {pluginMap[name].label}
    </StyledButton>  
  )

  return (
    <MediumContainer>
      {buttonList}
    </MediumContainer>
  );
}