import React from "react";
import { readModePropTypes } from '../user-prop-types';
import "../styles.css";

function BrandywineReader({ pageData, plugins, customContent}) {
  /**
   * Header
   */
  let displayDate;
  let displayDate1 = !pageData.header.displayDate1 
    ? null 
    : pageData.header.displayDate1.replace(/-/g, '/');
  let displayDate2 = !pageData.header.displayDate2 
    ? null 
    : pageData.header.displayDate2.replace(/-/g, '/');

  if (displayDate1 && displayDate2) {
    displayDate = `${displayDate1} - ${displayDate2}`;
  } else {
    displayDate = displayDate1 || displayDate2;
  }
  
  /**
   * Blocks
   */
  const pluginMap = plugins.reduce(
    (mapping, plugin) => ({ ...mapping, [plugin.name]: plugin }),
    {}
  );
  const blockElementList = pageData.blocks.map(
    (block, i) => {
      const BlockElement = pluginMap[block.name].canvasElement;
      const styles =  i === pageData.blocks.length - 1
        ? {}
        : { marginBottom: '20px' }
      return (
        <div style={styles} key={i}>
          <BlockElement
            isEditable={false}
            variation={block.variation}
            baseAttrs={block.baseAttrs}
            variationAttrs={block.variationAttrs}
          />
        </div>
      );
  });

  return (
    <div style={{
      margin: '0 auto',
      display: 'block',
      height: '100%'
    }}>
      <div 
        className="brandywine-width_large brandywine-responsive-x-padding"
        style={{
          overflowWrap: 'break-word',
          margin: '3rem auto',
          textAlign: 'center',
        }}
      >
        {pageData.header.title && 
          <h1 className="brandywine-responsive-header" style={{ margin: '0' }}>
            {pageData.header.title}
          </h1>
        }
        {pageData.header.subTitle && 
          <h3 className="mt-3 mb-0" style={{ marginBottom: '0', marginTop: '1rem' }}>
            {pageData.header.subTitle}
          </h3>
        }
        {displayDate && 
          <h4 className="mt-2 mb-0" style={{ marginBottom: '0', marginTop: '0.5rem' }}>
            {displayDate}
          </h4>
        }
      </div>

      {customContent && customContent}

      {blockElementList}
    </div>
  );
}

BrandywineReader.propTypes = readModePropTypes;
export { BrandywineReader };
