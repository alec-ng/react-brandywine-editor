import PropTypes  from 'prop-types';

/**
 * Applicable for <BrandywineEditor />, edit mode
 */
export const editorPropTypes = {
  /**
   * Function receiving two arguments: 1. header, 2. blocks, whose shape is described
   * below under the pageData prop
   */
  onChange: PropTypes.func.isRequired,
  
  /**
   * Controls the sidebar/canvas height CSS property. 
   * true: 100vh, false: 100%
   * Default: false
   */
  fullHeight: PropTypes.bool,
  
  /**
   * Whether or not to show descriptive text beside plugins in editor mode	
   * default: true
   */
  showPluginDescription: PropTypes.bool,
  
  /**
   * Used to generate blocks on the canvas. Note it's an array of element types, not elements
   */
  plugins: PropTypes.arrayOf(PropTypes.shape({
    // API name of the plugin, must be unique across all plugins supplied
    name: PropTypes.string.isRequired,
    // label shown on toolbar UI
    label: PropTypes.string.isRequired,
    // description shown on toolbar UI
    description: PropTypes.string.isRequired,
    // React element rendered on canvas
    canvasElement: PropTypes.elementType.isRequired,
    // data accessible across all variations
    baseAttrs: PropTypes.arrayOf(PropTypes.shape({
      // api name, must be unique across all attributes (base or variation) of this plugin
      name: PropTypes.string.isRequired,
      // readable name
      label: PropTypes.string.isRequired,
      // type of form element generated 
      element: PropTypes.string.isRequired
    })),
    // variation plugin initialized with when first created
    defaultVariation: PropTypes.string.isRequired, 
    // list of plugin variations to provide functionality specific data
    variations: PropTypes.arrayOf(PropTypes.shape({
      // variation api name, must be unique across all of this plugin's variations
      name: PropTypes.string.isRequired,
      // readable variation name
      label: PropTypes.string.isRequired,
      // refer to baseAttrs shape 
      attrs: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        element: PropTypes.string.isRequired
      })),
    })),

  })).isRequired,
  
  /**
   * Default editor data loaded on initialization
   */
  pageData: PropTypes.exact({
    header: PropTypes.exact({
      title: PropTypes.string.isRequired,
      subTitle: PropTypes.string.isRequired,
      displayDate1: PropTypes.string.isRequired, // dates: yyyy-mm-dd format
      displayDate2: PropTypes.string.isRequired
    }),
    // The header and blocks properties are the same as the arguments 
    // supplied to the onChange prop
    blocks: PropTypes.arrayOf(PropTypes.exact({
      name: PropTypes.string.isRequired,
      baseAttrs: PropTypes.object,
      variation: PropTypes.string,
      variationAttrs: PropTypes.object
    }))
  })
}

/**
 * Applicable for <BrandywineReader />, readonly mode
 */
export const readModePropTypes = {
  /**
   * Optional React element to be rendered in between the page header and the block content
   */
  customContent: PropTypes.element,
  // subset of editor props
  pageData: editorPropTypes.pageData.isRequired,
  plugins: editorPropTypes.plugins, // isRequired already
}
