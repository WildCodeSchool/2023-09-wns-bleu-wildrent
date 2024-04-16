export type ProductCardProps = {
  productRef: ProductRef;
  link: string;
};
export type CategoryCardProps = {
  category: Category;
  link: string;
};

export type Category = {
  id: number;
  name: string;
  // description?: string;
  image: string;
  // subCategories: SubCategory[];
};

export type SubCategory = {
  id: number;
  name: string;
  description?: string;
  image: string;
  productRef: ProductRef[];
};

export type ProductRef = {
  id: number;
  name: string;
  description?: string;
  image: string;
  priceHT: number;
};

export type FormInputProps = {
  label: string;
  id: string;
  placeholder: string;
  inputType?: string;
  error?: string;
};
