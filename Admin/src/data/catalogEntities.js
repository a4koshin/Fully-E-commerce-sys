export const catalogModals = {
  category: {
    title: "Create category",
    actionLabel: "category",
    fields: [
      { label: "Category name", placeholder: "e.g. Home office" },

      {
        label: "Visibility",
        component: "select",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ],
      },
    ],
  },
  subCategory: {
    title: "Create sub-category",
    actionLabel: "sub-category",
    fields: [
      { label: "Sub-category name", placeholder: "Wearables" },
      {
        label: "Parent category",
        component: "select",
        options: [
          { value: "electronics", label: "Electronics" },
          { value: "fashion", label: "Fashion" },
          { value: "home", label: "Home & Living" },
        ],
      },
      {
        label: "SKU forecast",
        type: "number",
        placeholder: "0",
      },
      {
        label: "Description",
        component: "textarea",
        placeholder: "Outline focus for this sub-collection",
        fullWidth: true,
      },
    ],
  },
  brand: {
    title: "Invite brand partner",
    actionLabel: "brand",
    fields: [
      { label: "Brand name", placeholder: "NovaWave" },
      {
        label: "Primary contact email",
        type: "email",
        placeholder: "partner@brand.com",
      },
      {
        label: "Tier",
        component: "select",
        options: [
          { value: "preferred", label: "Preferred" },
          { value: "strategic", label: "Strategic" },
          { value: "emerging", label: "Emerging" },
        ],
      },
      {
        label: "Launch plan",
        component: "textarea",
        placeholder: "Key milestones & marketing support",
        fullWidth: true,
      },
    ],
  },
  unit: {
    title: "Create measurement unit",
    actionLabel: "unit",
    fields: [
      { label: "Unit name", placeholder: "Gram" },
      { label: "Abbreviation", placeholder: "g" },
      {
        label: "Measurement type",
        component: "select",
        options: [
          { value: "weight", label: "Weight" },
          { value: "volume", label: "Volume" },
          { value: "length", label: "Length" },
        ],
      },
      {
        label: "Notes",
        component: "textarea",
        placeholder: "Usage guidance",
        fullWidth: true,
      },
    ],
  },
  color: {
    title: "Create color swatch",
    actionLabel: "color",
    fields: [
      { label: "Color name", placeholder: "Emerald Pulse" },
      { label: "HEX value", placeholder: "#06BE5F" },
      {
        label: "Usage notes",
        component: "textarea",
        placeholder: "Where this color applies",
        fullWidth: true,
      },
    ],
  },
  size: {
    title: "Create size option",
    actionLabel: "size",
    fields: [
      { label: "Label", placeholder: "Large" },
      { label: "Measurement", placeholder: "42 cm" },
      {
        label: "Fit notes",
        component: "textarea",
        placeholder: "Optional guidance for customers",
        fullWidth: true,
      },
    ],
  },
};
