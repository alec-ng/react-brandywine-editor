/**
 * Factory function for blocks
 */
function getBlock(name, variation, uuid) {
  return {
    name: name,
    baseAttrs: {},
    variation: variation,
    variationAttrs: {},
    uuid: uuid,
    isFocused: true  
  }
}

/**
 * Returns new block instance, copying blueprint from plugin given
 */
export function createNewBlock(plugin, uuid) {
  let newBlock = getBlock(plugin.name, plugin.defaultVariation, uuid);
  
  // populate any default attribute values
  if (plugin.baseAttrs) {
    plugin.baseAttrs.forEach(attr => {
      if (attr.defaultValue) {
        newBlock.baseAttrs[attr.name] = attr.defaultValue;
      }
    });
  }

  newBlock.variationAttrs[plugin.defaultVariation] = {};
  let defaultVariation = plugin.variations.find(
    variation => variation.name === plugin.defaultVariation
  );
  if (defaultVariation.attrs) {
    defaultVariation.attrs.forEach(attr => {
      if (attr.defaultValue) {
        newBlock.variationAttrs[plugin.defaultVariation][attr.name] =
          attr.defaultValue;
      }
    });
  }

  return newBlock;
}

/**
 * IIFE that returns a function that executes a callback with the editor's exported 
 * header and block data as arguments
 */
export const dispatchChange = (() => {

  let memoizedBlockReferences = {};
  let computedExportBlocks = {};    

  /**
   * Deep clone block and delete dynamic properties that shouldn't be saved
   * Return value of this function is memoized
   */
  function exportBlock(block) {
    let newBlock = JSON.parse(JSON.stringify(block));
    delete newBlock.isFocused;
    delete newBlock.uuid;
    Object.keys(newBlock.variationAttrs).forEach(variationKey => {
      if (variationKey !== newBlock.variation) {
        delete newBlock.variationAttrs[variationKey];
      }
    });
    return newBlock;
  }

  /**
   * Calculates the editor's exported header and block data
   * Block data is computed only if the original state reference is changed (it has been modified)
   */
  return (dispatchCb, header, blocks, blockOrder) => {
    let exportHeader = JSON.parse(JSON.stringify(header));
    let exportBlocks = [];
  
    blockOrder.forEach(uuid => {
      if (memoizedBlockReferences[uuid] !== blocks[uuid]) {
        memoizedBlockReferences[uuid] = blocks[uuid];
        computedExportBlocks[uuid] = exportBlock(blocks[uuid]);
      }
      exportBlocks.push(computedExportBlocks[uuid]);
    });
    
    dispatchCb(exportHeader, exportBlocks);
  }

})();
