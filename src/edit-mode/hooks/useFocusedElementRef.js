import { useState, useEffect } from 'react';

/**
 * Track element references to focusable container document nodes
 * Returns the reference to the current focused element
 * Based on the html dataset conventions defined in focusable-container and canvas
 */
export default function useFocusedElementRef(type, id) {
  const [cachedRefs, setCachedRefs] = useState({});

  function getHash(type, id) {
    return `${type}-${id}`;
  }

  useEffect(() => {
    const hash = getHash(type, id);
    if (cachedRefs[hash]) {
      return;
    }
    const selectorId = (type === 'header') ? "header" : id;
    const newRef = { [hash]: document.querySelector(`[data-uuid="${selectorId}"]`) };
    setCachedRefs(Object.assign({}, cachedRefs, newRef));
  }, [type, id]);
  
  return type ? cachedRefs[getHash(type, id)] : null;
}