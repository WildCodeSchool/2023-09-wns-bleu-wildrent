export type ProductCardProps = {
  productRef: ProductRef;
  link: string;
};

export type ProductRef = {
  id: number;
  name: string;
  description?: string;
  image: string;
  priceHT: number;
};
