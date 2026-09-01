export type ProductVariant = {
  color: string;
  colorCode: string;
  images: string[];
};

export type Product = {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  variants: ProductVariant[];
};
