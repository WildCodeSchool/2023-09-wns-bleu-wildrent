export type ProductCardProps = {
  productRef: ProductRef;
  link: string;
};
export type CategoryCardProps = {
  category: Category;
  link: string;
};

export type Message = {
  success: boolean;
  message: string;
  isAdmin?: boolean;
};

export type Category = {
  id: number;
  name: string;
  description?: string | null;
  image: string;
};

export type SubCategory = {
  id: number;
  name: string;
  description?: string;
  image?: string;
  productRef?: ProductRef[];
};
export type SimpleSubCategory = {
  id: number;
  name: string;
};

export type ProductRef = {
  id: number;
  name: string;
  description?: string;
  image: string;
  priceHT: number;
};

export interface Option {
  value: number;
  label: string;
}
export type FormInputProps = {
  label: string;
  id: string;
  placeholder: string;
  inputType?: string;
  error?: string;
  options?: Option[];
};
