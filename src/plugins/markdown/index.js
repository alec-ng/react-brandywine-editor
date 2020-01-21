import { MarkdownElement, VARIATION_DEFAULT } from "./markdown";

/**
 * Plugin definition for Markdown text
 */
const Image = {
  name: "markdown",
  label: "Markdown",
  description: "Parses and renders a markdown source",
  icon: null,
  canvasElement: MarkdownElement,
  baseAttrs: [
    {
      name: "source",
      label: "Source",
      element: "textarea"
    }
  ],
  variations: [
    {
      name: VARIATION_DEFAULT,
      label: "Default",
      attrs: []
    }
  ],
  defaultVariation: VARIATION_DEFAULT,
  useDefaultControls: true
};

export default Image;
