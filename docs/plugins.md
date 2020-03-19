# Plugins

The editor builds up content using **blocks**. Blocks are _instances_ of **plugins**, which are generic blueprints for editor components. Plugins can pre-define a list of **attributes** that allow users to input data for each block, which is used to dynamically render or decide content to show.

### Examples

react-brandywine-editor comes shipped with a number of [pre-written plugins](/src/plugins) whose source code is available to use as a template.

### Plugin Definition

Taken from [user-prop-types.js](../src/user-prop-types.js).

A plugin is defined by an object and contains the following properties:

```javascript
  // API name of the plugin, must be unique across all plugins supplied
  name: PropTypes.string.isRequired,

  // shown on block creatino UI
  label: PropTypes.string.isRequired,

  // developer reference
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
  }))
}
```

Below is an example of how each plugin propery maps to the editor UI.

![plugin-definition-to-UI](https://i.imgur.com/JUV8foe.png)

### Variations

Plugins are intended to represent a some sort of generic element, such as an "image" or a "video". Variations are used to differentiate specific versions of the element. For example, a plugin for an Image might have the variations for a Parallax image, a full-width responsive image, a centered caption image, etc...

**Each plugin must define at least one variation, and each block will always be associated with a variation.**

Example -

```javascript
variations: [
  {
    name: 'variation_default',
    label: "Default",
    attrs: [] ,
  }
  {
    name: 'variation_large',
    label: 'Large Size',
    attrs: [
      {
        name: "size_percentage",
        label: "Size (%)",
        type: "number"
      }
    ]
  }
],
```

### Canvas Element

The canvasElement is a React component that represents an instance of the plugin. It has access to the following via `props` -

|                | Description                                                              | Type   |
| -------------- | ------------------------------------------------------------------------ | ------ |
| isEditable     | Whether the element is in a state that allows it to be modified. False when using read mode component or when in edit mode preview          | bool   |
| variation      | API name of the plugin variation being used.                             | string |
| baseAttrs      | key/value pairings of base attribute names to their values               | {}     |
| variationAttrs | key/value pairings of variation specific attribute names to their values | {}     |

### Attributes and Controls

In order for a block to accept user input, the plugin must define at least one attribute via `baseAttrs` or in the attribute list of a variation. Attributes are defined declaratively in the plugin definition. The editor will auto-generate HTML5 for elements in the sidebar according to the element type specified.

An attribute is minimally defined by an object with the following keys:

```javascript
{
  name: 'attribute_name', // api name of the attribute, unique across the attribute group (base or variation)
  label: 'My Attribute',
  element: 'input' // type of form element auto generated
  }
```

The following attribute elements are supported:

1. input
2. select
3. textarea

Depending on the element chosen, additional attribute properties must/may be defined.

|          | required                                                                     | optional                                                                                                                                  | notes                                                                                                                       |
| -------- | ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| input    | `type` - any valid HTML5 input value type, such as "text", "range", "number" | -                                                                                                                                         | -                                                                                                                           |
| select   | `options` - an array of {name, label} objects representing available options | `defaultRequired` - if not defined or false, an empty option is rendered. `defaultValue` - the name of an option to be initially selected | if only one option is provided and `defaultRequired` is true, the element renders as disabled with the sole option selected |
| textarea | -                                                                            | `rows` - how many rows to render the textarea with                                                                                        | -                                                                                                                           |

Here are some examples of each element:

```javascript
{
  name: "urlSource",
  label: "URL",
  element: "input",
  type: "text"
}
```

```javascript
{
  name: "size",
  label: "Size",
  element: "select",
  defaultRequired: true,
  defaultValue: "large",
  options: [
    {
      name: "large",
      label: "Large"
    },
    {
      name: "medium",
      label: "Medium"
    },
  ]
}
```

```javascript
{
  name: "source",
  label: "Source",
  element: "textarea",
  rows: 5
}
```

Note the following:

- Base Attributes and Variation attributes can share the same name
  - (baseAttr.name1 + variationAttr.name1 is fine, as well as variation1Attr.name1 + variation2Attr.name1)
- A plugin does not have to define any base attributes
- Variations also do not have to define any attributes

### Styling

The default plugins shipped with this library use a set of namespaced CSS classes to handle element widths. 
If you build custom plugins that coexist with the default set, or you would like a set of helper classes
to standardize block sizing, check out the stylesheet [here](/src/styles.css).
