import type { Product } from "./types";

export const products: Product[] = [
  {
    id: 1,
    name: "Linen Oversized Shirt",
    price: 129,
    oldPrice: 169,
    variants: [
      {
        color: "Black",
        colorCode: "#1A1A1A",
        images: [
          "01-linen-shirt/black-1.png",
          "01-linen-shirt/black-2.png",
          "01-linen-shirt/black-3.png",
        ],
      },
      {
        color: "Ivory",
        colorCode: "#F4F0E6",
        images: [
          "01-linen-shirt/ivory-1.png",
          "01-linen-shirt/ivory-2.png",
        ],
      },
      {
        color: "Sage",
        colorCode: "#8A9A7B",
        images: ["01-linen-shirt/sage-1.png"],
      },
    ],
  },
  {
    id: 2,
    name: "Wool Tailored Coat",
    price: 389,
    oldPrice: 449,
    variants: [
      {
        color: "Camel",
        colorCode: "#C4A574",
        images: [
          "02-wool-coat/camel-1.png",
          "02-wool-coat/camel-2.png",
        ],
      },
      {
        color: "Charcoal",
        colorCode: "#3D3D3D",
        images: [
          "02-wool-coat/charcoal-1.png",
          "02-wool-coat/charcoal-2.png",
          "02-wool-coat/charcoal-3.png",
          "02-wool-coat/charcoal-4.png",
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Cotton Crew Knit",
    price: 89,
    variants: [
      {
        color: "Navy",
        colorCode: "#1E2A4A",
        images: [
          "03-crew-knit/navy-1.png",
          "03-crew-knit/navy-2.png",
        ],
      },
      {
        color: "Oat",
        colorCode: "#D9CDB8",
        images: [
          "03-crew-knit/oat-1.png",
          "03-crew-knit/oat-2.png",
          "03-crew-knit/oat-3.png",
        ],
      },
      {
        color: "Burgundy",
        colorCode: "#6B2D3C",
        images: ["03-crew-knit/burgundy-1.png"],
      },
    ],
  },
  {
    id: 4,
    name: "Relaxed Trouser",
    price: 149,
    oldPrice: 189,
    variants: [
      {
        color: "Stone",
        colorCode: "#B7B09A",
        images: [
          "04-trouser/stone-1.png",
          "04-trouser/stone-2.png",
        ],
      },
      {
        color: "Black",
        colorCode: "#111111",
        images: [
          "04-trouser/black-1.png",
          "04-trouser/black-2.png",
          "04-trouser/black-3.png",
        ],
      },
    ],
  },
  {
    id: 5,
    name: "Silk Slip Dress",
    price: 219,
    variants: [
      {
        color: "Champagne",
        colorCode: "#E8D5B5",
        images: [
          "05-slip-dress/champagne-1.png",
          "05-slip-dress/champagne-2.png",
          "05-slip-dress/champagne-3.png",
        ],
      },
      {
        color: "Ink",
        colorCode: "#2B2F3A",
        images: [
          "05-slip-dress/ink-1.png",
          "05-slip-dress/ink-2.png",
        ],
      },
    ],
  },
  {
    id: 6,
    name: "Denim Trucker Jacket",
    price: 179,
    oldPrice: 210,
    variants: [
      {
        color: "Indigo",
        colorCode: "#4B5E7A",
        images: [
          "06-trucker/indigo-1.png",
          "06-trucker/indigo-2.png",
        ],
      },
      {
        color: "Wash",
        colorCode: "#9AA7B5",
        images: [
          "06-trucker/wash-1.png",
          "06-trucker/wash-2.png",
          "06-trucker/wash-3.png",
        ],
      },
    ],
  },
  {
    id: 7,
    name: "Merino Cardigan",
    price: 159,
    variants: [
      {
        color: "Greige",
        colorCode: "#C5BDB0",
        images: [
          "07-cardigan/greige-1.png",
          "07-cardigan/greige-2.png",
        ],
      },
      {
        color: "Forest",
        colorCode: "#3F5344",
        images: ["07-cardigan/forest-1.png", "07-cardigan/forest-2.png"],
      },
      {
        color: "Black",
        colorCode: "#1C1C1C",
        images: ["07-cardigan/black-1.png"],
      },
    ],
  },
  {
    id: 8,
    name: "Poplin Midi Skirt",
    price: 119,
    oldPrice: 149,
    variants: [
      {
        color: "White",
        colorCode: "#F7F7F4",
        images: [
          "08-midi-skirt/white-1.png",
          "08-midi-skirt/white-2.png",
        ],
      },
      {
        color: "Chocolate",
        colorCode: "#5C4033",
        images: [
          "08-midi-skirt/chocolate-1.png",
          "08-midi-skirt/chocolate-2.png",
          "08-midi-skirt/chocolate-3.png",
        ],
      },
    ],
  },
  {
    id: 9,
    name: "Cashmere Turtleneck",
    price: 249,
    variants: [
      {
        color: "Cream",
        colorCode: "#EFE6D9",
        images: [
          "09-turtleneck/cream-1.png",
          "09-turtleneck/cream-2.png",
        ],
      },
      {
        color: "Heather",
        colorCode: "#8B8E93",
        images: [
          "09-turtleneck/heather-1.png",
          "09-turtleneck/heather-2.png",
          "09-turtleneck/heather-3.png",
          "09-turtleneck/heather-4.png",
        ],
      },
    ],
  },
  {
    id: 10,
    name: "Leather Belted Trench",
    price: 429,
    oldPrice: 490,
    variants: [
      {
        color: "Khaki",
        colorCode: "#9C8B6A",
        images: [
          "10-trench/khaki-1.png",
          "10-trench/khaki-2.png",
          "10-trench/khaki-3.png",
        ],
      },
      {
        color: "Black",
        colorCode: "#161616",
        images: ["10-trench/black-1.png", "10-trench/black-2.png"],
      },
    ],
  },
  {
    id: 11,
    name: "Wide-Leg Chino",
    price: 139,
    variants: [
      {
        color: "Sand",
        colorCode: "#C8B89A",
        images: ["11-chino/sand-1.png", "11-chino/sand-2.png"],
      },
      {
        color: "Olive",
        colorCode: "#6E6B4F",
        images: [
          "11-chino/olive-1.png",
          "11-chino/olive-2.png",
          "11-chino/olive-3.png",
        ],
      },
    ],
  },
  {
    id: 12,
    name: "Structured Blazer",
    price: 279,
    oldPrice: 329,
    variants: [
      {
        color: "Ivory",
        colorCode: "#EDE6D9",
        images: [
          "12-blazer/ivory-1.png",
          "12-blazer/ivory-2.png",
        ],
      },
      {
        color: "Navy",
        colorCode: "#1B2436",
        images: [
          "12-blazer/navy-1.png",
          "12-blazer/navy-2.png",
          "12-blazer/navy-3.png",
        ],
      },
      {
        color: "Grey",
        colorCode: "#6F6F6F",
        images: ["12-blazer/grey-1.png"],
      },
    ],
  },
];
