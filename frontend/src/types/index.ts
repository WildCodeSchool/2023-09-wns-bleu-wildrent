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

export type FormInputProps = {
  label: string;
  id: string;
  placeholder: string;
  inputType?: string;
  error?: string;
};

export type User = {
  id: number;
  role: 'USER' | 'ADMIN';
  firstname: string;
  lastname: string;
  email: string;
  address: string;
  city: string;
  cp: string;
};
