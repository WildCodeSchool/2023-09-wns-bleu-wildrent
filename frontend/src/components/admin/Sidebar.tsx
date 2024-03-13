// components/dashboard/Sidebar.tsx
import Link from 'next/link';
import { useRouter } from 'next/router';

const Sidebar = () => {
  const router = useRouter();

  // Cette fonction détermine si le lien est actif basé sur le chemin actuel
  const isActive = (pathname: string) => router.pathname === pathname;

  return (
    <div className="flex flex-col w-64 px-4 py-8 bg-white border-r dark:bg-gray-800 dark:border-gray-600 min-h-screen">
      <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">Dashboard</h2>
      <div className="flex flex-col justify-between flex-1 mt-6">
        <nav>
          <Link
            href="/admin/dashboard"
            className={`flex items-center px-4 py-2 cursor-pointer ${isActive('/admin/dashboard') ? 'bg-base-300' : ''}`}
          >
            Accueil dashboard
          </Link>
          <Link
            href="/admin/categorie"
            className={`flex items-center px-4 py-2 cursor-pointer ${isActive('/admin/categorie') ? 'bg-base-300' : ''}`}
          >
            Catégorie
          </Link>
          <Link
            href="/admin/sous-categorie"
            className={`flex items-center px-4 py-2 cursor-pointer ${isActive('/admin/sous-categorie') ? 'bg-base-300' : ''}`}
          >
            Sous-catégorie
          </Link>
          <Link
            href="/admin/products"
            className={`flex items-center px-4 py-2 cursor-pointer ${isActive('/admin/products') ? 'bg-base-300' : ''}`}
          >
            Articles
          </Link>
          <Link
            href="/admin/productref"
            className={`${isActive('/admin/productref') ? 'bg-base-300' : ''} flex items-center px-4 py-2 cursor-pointer`}
          >
            ProductRef
          </Link>
          <Link
            href="/admin/reservation"
            className={`${isActive('/admin/reservation') ? 'bg-base-300' : ''} flex items-center px-4 py-2 cursor-pointer`}
          >
            Réservation
          </Link>
          <Link
            href="/profile"
            className={`${isActive('/profile') ? 'bg-base-300' : ''} flex items-center px-4 py-2 cursor-pointer`}
          >
            Profil
          </Link>
          <Link
            href="/"
            className={`${isActive('/') ? 'bg-base-300' : ''} flex items-center px-4 py-2 cursor-pointer`}
          >
            WildRent
          </Link>
          {/* Insérez d'autres liens ici si nécessaire */}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
