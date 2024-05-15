import { LinkProps } from './types/props';

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
