import SpacerElement, { VARIATION_INVERSE } from './spacer';

const VARIATION_DEFAULT = "spacer_default";

const Spacer = {
  name: "spacer",
  label: "Spacer",
  description: "Remove or add space in between blocks",
  canvasElement: SpacerElement,
  baseAttrs: [],
  variations: [
    {
      name: VARIATION_DEFAULT,
      label: "Add Space",
      attrs: [
        {
          name: "factor",
          label: "Size",
          element: "select",
          defaultRequired: true,
          defaultValue: "1",
          options: [
            {
              name: "1",
              label: "Normal"
            },
            {
              name: "3",
              label: "Medium"
            },
            {
              name: "5",
              label: "Large"
            }
          ]
        }
      ]
    },
    {
      name: VARIATION_INVERSE,
      label: "Remove Space",
      attrs: []
    }
  ],
  defaultVariation: VARIATION_DEFAULT
};
export default Spacer;
