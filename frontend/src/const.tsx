import { IoCart } from 'react-icons/io5';
import { FormInputProps, LinkProps } from './types/props';

export const navData = [
  {
    text: 'Contact',
    alt: 'alt',
    link: '/',
  },
  {
    text: 'About us',
    alt: 'alt',
    link: '/about',
  },
  {
    text: 'Catalog',
    alt: 'alt',
    link: '/products',
  },
  {
    text: <IoCart size={25} />,
    alt: 'alt',
    link: '/cart',
  },
];

export const adminSideBarItems: LinkProps[] = [
  {
    href: '/admin',
    text: 'Home',
    testId: 'dashboard-id',
  },
  {
    href: '/admin/category',
    text: 'Categories',
  },
  {
    href: '/admin/subCategory',
    text: 'SubCategories',
  },
  {
    href: '/admin/users',
    text: 'Users',
  },
  {
    href: '/admin/products',
    text: 'Products',
  },
  {
    href: '/admin/orders',
    text: 'Orders',
  },
  {
    href: '/',
    text: 'Wildrent',
    testId: 'wildrent-id',
  },
];

export const newUserFields: FormInputProps[] = [
  {
    id: 'lastname',
    label: 'Nom',
    placeholder: 'Doe',
    inputType: 'text',
  },
  {
    id: 'firstname',
    label: 'Prénom',
    placeholder: 'John',
    inputType: 'text',
  },
  {
    id: 'email',
    label: 'Email',
    placeholder: 'exemple@email.com',
    inputType: 'text',
  },
  {
    id: 'role',
    label: 'Rôle',
    placeholder: '',
    inputType: 'select',
    options: [
      { label: 'User', value: 'USER' },
      { label: 'Administrateur', value: 'ADMIN' },
    ],
  },
  {
    id: 'password',
    label: 'Mot de Passe',
    placeholder: '********',
    inputType: 'password',
  },
  {
    id: 'address',
    label: 'Adresse',
    placeholder: '123 rue Wild',
    inputType: 'text',
  },
  {
    id: 'city',
    label: 'Ville',
    placeholder: 'Paris',
    inputType: 'text',
  },
  {
    id: 'cp',
    label: 'Code Postal',
    placeholder: '75001',
    inputType: 'text',
  },
];
