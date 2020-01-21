# react-brandywine-editor

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo

A WYSIWYG-like block editor for creating blogging content. Try it out on [codesandbox](https://codesandbox.io/s/react-brandywine-editor-ld0lq), or see a [live sample](www.alecng.ca) of some content produced and rendered with this editor.

- drag and drop UX
- easily extensible plugin architecture
- serializes to a JSON data structure
- read-only mode

![react-brandywine-editor overview](https://github.com/alec-ng/react-brandywine-editor/blob/master/docs/features.gif)

### Quickstart

`npm install --save react-brandywine-editor`

```javascript
import "react-brandywine-editor/styles.css";
import Editor from 'react-brandywine-editor';

// Import whatever plugins you want to work with or show
import Image from "react-brandywine-editor/plugins/image/index";
import Markdown from "react-brandywine-editor/plugins/markdown/index";
import CoverPhoto from "react-brandywine-editor/plugins/cover-photo/index";
import Spacer from "react-brandywine-editor/plugins/spacer/index";
import Carousel from "react-brandywine-editor/plugins/carousel/index";
import Video from "react-brandywine-editor/plugins/video/index";

import React from 'react';

const plugins = [Image, Markdown, CoverPhoto, Spacer, Carousel, Video];

export default function BlockEditor(props) {
	function onEditorChange(header, blocks) {
		// save this somewhere
	}

	return (
		<BrandywineEditor
			plugins={plugins}
			onChange={onEditorChange}
		/>
);

```

### Creating Your Own Plugins

See the documentation on [plugins](/plugins.md) for more details.

### API

---

| name                  | description                                                                                          | type                       | required                                        |
| --------------------- | ---------------------------------------------------------------------------------------------------- | -------------------------- | ----------------------------------------------- |
| pageData              | default editor data loaded                                                                           | {header, blocks}           |                                                 |
| onSave                | renders a save button on the toolbar that, when clicked, executes this callback with the editor data | function({header, blocks}) | One of onSave or onChange if `readOnly = false` |
| onChange              | fires on every change                                                                                | function(header,blocks){}  | One of onSave or onChange if `readOnly = false` |
| readOnly              | if true, applies read-only styles to content and does not render the toolbar or editing canvas       | boolean                    | default `false`                                 |
| plugins               | list of plugins you want to work with in editor mode or need to render according to `pageData`       | []                         | yes                                             |
| showPluginDescription | show descriptive text beside plugins in editor mode                                                  | boolean                    | default `true`                                  |
| verticalBlockMargin   | y-axis margin used on all canvas block elements during read only mode                                | text                       | default `'20px'`                                |

### Roadmap

- Unit testing
- Remove depedency on bootstrap-react
- Implement native HTML5 form validation on attributes
- Support all HTML5 input attributes in attribute definitions, such as "min", "max", etc
