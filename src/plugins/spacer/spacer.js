import React from 'react';

const DEFAULT_BOTTOM_MARGIN = 1.5; // rem
const SPACER_BASE = 1; // rem

export const VARIATION_DEFAULT = "spacer_default";
export const VARIATION_INVERSE = "inverse";

/**
 * Element to add/remove padding
 */
export default function SpacerElement({
  variation,
  isEditable,
  variationAttrs
}) {
  if (variation === VARIATION_INVERSE) {
    if (isEditable) {
      return (
        <PlaceholderMsg />
      );
    }
    return (
      <div style={{ marginTop: `-${DEFAULT_BOTTOM_MARGIN}rem` }} />
    );
  }

  // default
  const factor = parseInt(variationAttrs[VARIATION_DEFAULT].factor);
  const spaceSize = factor * SPACER_BASE;

  return (
    <div style={{ 
      height: `${spaceSize}rem`, 
      marginBottom:  `-${DEFAULT_BOTTOM_MARGIN}rem` 
    }} />
  );
}

// ------- UTIL

const PlaceholderMsg = () => 
  <p className="text-center text-muted my-0">
    This space will not exist in read mode.
  </p>
