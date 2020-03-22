import React from 'react';

const DEFAULT_SPACE_SIZE = 20;

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
      <div style={{ marginTop: `-${DEFAULT_SPACE_SIZE}px` }} />
    );
  }

  // default
  const factor = parseInt(variationAttrs[VARIATION_DEFAULT].factor);
  const responsiveFactor = getResponsiveFactor(factor);
  const spaceSize = responsiveFactor * DEFAULT_SPACE_SIZE;

  return (
    <div style={{ paddingTop: `${spaceSize}px` }} />
  );
}

// ------- UTIL

function getResponsiveFactor(originalFactor) {
  const vw =  Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  if (vw <= 576) {
    return 1; // since min is already 1
  }
  if (vw <= 768) {
    return originalFactor > 2 ? 2 : originalFactor;
  }
  if (vw <= 992) {
    return originalFactor > 4 ? 4 : originalFactor;
  }
  return originalFactor;
}

const PlaceholderMsg = () => 
  <p className="text-center text-muted my-0">
    This space will not exist in read mode.
  </p>
