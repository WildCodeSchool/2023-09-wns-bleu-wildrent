import { FormInputProps, LinkProps } from './types/props';

export const navData = [
  {
    text: 'Accueil',
    alt: 'alt',
    link: '/',
  },
  {
    text: 'Catalogue',
    alt: 'alt',
    link: '/products',
  },
  {
    text: 'A propos',
    alt: 'alt',
    link: '/about',
  },
  {
    text: 'Contact',
    alt: 'alt',
    link: '/contact',
  },
];

export const adminSideBarItems: LinkProps[] = [
  {
    href: '/admin',
    text: 'Accueil dashboard',
  },
  {
    href: '/admin/users',
    text: 'Gestion des utilisateurs',
  },
  {
    href: '/admin/category',
    text: 'Catégorie',
  },
  {
    href: '/admin/sous-categorie',
    text: 'Sous-catégorie',
  },
  {
    href: '/admin/products',
    text: 'Articles',
  },
  {
    href: '/admin/productref',
    text: 'ProductRef',
  },
  {
    href: '/admin/reservation',
    text: 'Réservation',
  },
  {
    href: '/profile',
    text: 'Profil',
  },
  {
    href: '/',
    text: 'Wildrent',
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
