import React, { useEffect } from "react";
import styled from "styled-components";

/**
 * Renders a block as a plugin instance inside of a container
 * that provides focus/draggable functionality
 */
const FocusDiv = styled.div`
  cursor: ${props => (props.locked ? "inherit" : "move")};
  min-height: ${props => (props.locked ? "inherit" : "20px")};
  border: ${props => props.isFocused  && !props.locked 
    ? "2pt solid rgba(0,0,0,0.5)" 
    : "none"
  };
  margin: ${props => props.locked
    ? (props.omitBottomMargin ? 0 : '0 0 20px 0')
    : "10px 0"
  }
`;

export default function BlockContainer({ 
  block, onBlockClick, BlockElement, omitBottomMargin, isEditable
}) {
  const containerDivRef = React.createRef();

  // Scroll into view whenever the block is in focus
  useEffect(() => {
    if (block.isFocused && isEditable) {
      containerDivRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }
  }, [block.isFocused, isEditable]);

  function onDragStart(e) {
    e.dataTransfer.setData("dragType", "block");
    e.dataTransfer.setData("targetBlockId", block.uuid);
  };
  
  const isDraggable = isEditable ? { draggable: true } : {};
  const editableProperties = isEditable ? {
    onDragStart: onDragStart,
    onClick: onBlockClick,
    'data-uuid': block.uuid
  } : {};

  return (
    <FocusDiv
      {...isDraggable}
      {...editableProperties}
      isFocused={block.isFocused}
      locked={!isEditable}
      ref={containerDivRef}
      omitBottomMargin={omitBottomMargin}
    >
      <BlockElement
        isEditable={isEditable}
        variation={block.variation}
        baseAttrs={block.baseAttrs}
        variationAttrs={block.variationAttrs}
      />
    </FocusDiv>
  );
}
