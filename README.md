# react-brandywine-editor

[![npm package][npm-badge]][npm]

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package


A WYSIWYG-like block editor for creating blogging content. Try it out on [codesandbox](https://codesandbox.io/s/react-brandywine-editor-ld0lq) or clone the repo and run `npm run start`.

A live sample of some content produced and rendered with this editor is coming soon!

- drag and drop UX
- easily extensible plugin architecture
- serializes to a JSON data structure
- read-only mode

![react-brandywine-editor overview](https://github.com/alec-ng/react-brandywine-editor/blob/master/docs/features.gif)

### Quickstart

`npm install --save react-brandywine-editor`

See the [demo source file](/demo/src/index.js) to get started.

### Creating Your Own Plugins

See the documentation on [plugins](/docs/plugins.md) for more details.

### API

| name                  | description                                                                                          | type                       | required                                        |
| --------------------- | ---------------------------------------------------------------------------------------------------- | -------------------------- | ----------------------------------------------- |
| pageData              | default editor data loaded                                                                           | {header, blocks}           | -                                               |
| onSave                | renders a save button on the toolbar that, when clicked, executes this callback with the editor data | function({header, blocks}) | One of onSave or onChange if `readOnly = false` |
| onChange              | fires on every change                                                                                | function(header,blocks){}  | One of onSave or onChange if `readOnly = false` |
| readOnly              | if true, applies read-only styles to content and does not render the toolbar or editing canvas       | boolean                    | default `false`                                 |
| plugins               | list of plugins you want to work with in editor mode or need to render according to `pageData`       | []                         | yes                                             |
| showPluginDescription | show descriptive text beside plugins in editor mode                                                  | boolean                    | default `true`                                  |

### Roadmap

- Unit testing
- Remove depedency on bootstrap-react
- Implement native HTML5 form validation on attributes
- Support all HTML5 input attributes in attribute definitions, such as "min", "max", etc
