/**
 * PEER DEPENDENCY: react-slick, slick-carousel
 */
import { CarouselElement, VARIATION_DEFAULT } from "./carousel";

const Carousel = {
  name: "carousel",
  label: "Carousel",
  description: "Renders multiple images in a carousel",
  canvasElement: CarouselElement,
  baseAttrs: [
    {
      name: "numCards",
      label: "Number of cards to show on screen",
      element: "input",
      type: "number",
      min: 0,
      defaultValue: 1
    },
    {
      name: "height",
      label: "Max Height (px)",
      element: "input",
      type: "range",
      min: 300,
      max: 600,
      defaultValue: 400
    },
    {
      name: "urlSources",
      label: "URL Sources (separate each link with a new line)",
      element: "textarea"
    },
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
        {
          name: "small",
          label: "Small"
        }
      ]
    },
    {
      name: "caption",
      label: "Caption",
      element: "input",
      type: "text"
    }
  ],
  variations: [
    {
      name: VARIATION_DEFAULT,
      label: "Base Image",
      attrs: []
    }
  ],
  defaultVariation: VARIATION_DEFAULT
};

export default Carousel;
