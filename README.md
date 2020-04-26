# react-brandywine-editor

[![npm](https://img.shields.io/npm/v/react-brandywine-editor)](https://www.npmjs.com/package/react-brandywine-editor)

A WYSIWYG-like block editor for creating blogging content. 
- easily customizable (see [plugins](https://github.com/alec-ng/react-brandywine-editor/blob/master/docs/plugins.md))
- separate read/edit exports
- serializes to a JSON data structure

![react-brandywine-editor overview](https://github.com/alec-ng/react-brandywine-editor/blob/master/docs/features.gif?raw=true)

### Demo

* [Standalone editor](https://alec-ng.github.io/react-brandywine-editor/demo/dist/)
* [Live blog](https://alecng.ca/blog) using read mode with data produced with this library

### Setup

`npm install --save react-brandywine-editor`

The library comes with two entry points that can be imported separately.
* Read mode for static rendering: `import { BrandywineReader } from react-bradywine-editor/src/read-mode/index`
* Editor mode: `import { BrandywineEditor } from react-bradywine-editor/src/edit-mode/index`

The only dependency listed is `prop-types`. If your project intends to use editor mode, the peer dependencies are required:
* `npm install @material-ui/core@^4.9.5 styled-components@^5.0.0 react@16.x react-redux@^7.2.0 redux@^4.0 bootstrap@^4.4.1 immer@^6.0.0 uuid@^7.0.1`

The library ships with a set of pre-written plugins. If you want to use them, note _they have dependencies on bootstrap CSS and styled-components_. Some of them also have other peer dependencies:
  * Carousel: `npm install react-slick@^0.25.2` `slick-carousel@^1.8.1`
  * HTMLVideo: `npm install react-visibility-sensor@^5.1.1`
  * Markdown: `npm install react-markdown@^4.3.1`

See the [demo src/](https://github.com/alec-ng/react-brandywine-editor/blob/master/demo/src) for an example.

### API

Taken from [user-prop-types.js](src/user-prop-types.js).

```javascript
/**
 * Applicable for <BrandywineEditor />, edit mode
 */
const editorPropTypes = {
  /**
   * Function receiving two arguments: 1. header, 2. blocks, whose shape is described
   * below under the pageData prop
   */
  onChange: PropTypes.func,
  
  
  /**
   * Whether or not to show descriptive text beside plugins in editor mode	
   * default: true
   */
  showPluginDescription: PropTypes.bool,
  
  /**
   * Used to generate blocks on the canvas. Note it's an array of element types, not elements
   */
  plugins: PropTypes.arrayOf(PropTypes.shape({
    // ... see /docs/plugins.md, or use of one default shipped plugins in /src/plugins/
  })).isRequired,
  
  /**
   * Default editor data loaded on initialization
   */
  pageData: PropTypes.exact({
    header: PropTypes.exact({
      title: PropTypes.string,
      subTitle: PropTypes.string,
      displayDate1: PropTypes.string, // dates: yyyy-mm-dd format
      displayDate2: PropTypes.string
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
const readModePropTypes = {
  /**
   * Optional React element to be rendered in between the page header and the block content
   */
  customContent: PropTypes.element,
  // subset of editor props
  pageData: editorPropTypes.pageData.isRequired,
  plugins: editorPropTypes.plugins, // isRequired already
}
```