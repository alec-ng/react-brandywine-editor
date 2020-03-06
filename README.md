# react-brandywine-editor

[![npm](https://img.shields.io/npm/v/react-brandywine-editor)](https://www.npmjs.com/package/react-brandywine-editor)

A WYSIWYG-like block editor for creating blogging content. Try out a live demo [here](https://ld0lq.csb.app/) hosted on [codesandbox](https://codesandbox.io/s/react-brandywine-editor-ld0lq), or check out a [live blog](https://alecng.ca/blog) using content produced and rendered with this library.

__Features__

- drag and drop UX
- serializes to a JSON data structure
- read-only mode
- easily customizable (see the documentation on [plugins](https://github.com/alec-ng/react-brandywine-editor/blob/master/docs/plugins.md) for more details)

![react-brandywine-editor overview](https://github.com/alec-ng/react-brandywine-editor/blob/master/docs/features.gif?raw=true)

### Quickstart

`npm install --save react-brandywine-editor`

See [codesandbox](https://codesandbox.io/s/react-brandywine-editor-ld0lq) or the [demo source file](https://github.com/alec-ng/react-brandywine-editor/blob/master/demo/src/index.js) to get started.

A note on dependencies:
  * Styled components is a peer dependency: `npm install styled-components@^5.0.0`
  * This library ships with a set of pre-written plugins. Some of them have peer dependencies; if you are using any of the following, run:
    * Carousel: `npm install react-items-carousel@^2.8.0 react-device-detect@^1.11.14`
    * HTMLVideo: `npm install react-visibility-sensor@^5.1.1`
    * Markdown: `npm install react-markdown@^4.3.1`

### API

Taken from [user-prop-types.js](src/user-prop-types.js).

```javascript
  /**
   * Function receiving two arguments: 1. header, 2. blocks, whose shape is described
   * below under the pageData prop
   */
  onChange: PropTypes.func,
  
  /**
   * Whether or not to render the complete editor (false), or supplied pageData (true)
   * Default: false
   */
  readOnly: PropTypes.bool,
  
  /**
   * If readOnly = false, controls the sidebar/canvas height CSS property. 
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
      // see docs/plugins.md
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
```

### Roadmap

- Jest/enzyme testing, with or without storybook
- Remove depedency on bootstrap-react and bootstrap
- read only vs editor separate exports
- attribute validation
