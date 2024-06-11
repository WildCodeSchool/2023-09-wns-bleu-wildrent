// components/dashboard/Sidebar.tsx
import Link from 'next/link';
import { useRouter } from 'next/router';

const Sidebar = () => {
  const router = useRouter();

  // Cette fonction détermine si le lien est actif basé sur le chemin actuel
  const isActive = (pathname: string) => router.pathname === pathname;

  return (
    <div className="flex flex-col w-64 px-4 py-8 bg-white border-r dark:bg-gray-200 dark:border-gray-600 min-h-screen">
      <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">Dashboard</h2>
      <div className="flex flex-col justify-between flex-1 mt-6">
        <nav>
          <Link
            href="/admin"
            className={`flex items-center px-4 py-2 cursor-pointer ${isActive('/admin') ? 'bg-base-300' : ''}`}
          >
            Accueil
          </Link>
          <Link
            href="/admin/category"
            className={`flex items-center px-4 py-2 cursor-pointer ${isActive('/admin/category') ? 'bg-base-300' : ''}`}
          >
            Categories
          </Link>
          <Link
            // href="/admin/sous-categorie"
            href="/admin"
            className={`flex items-center px-4 py-2 cursor-pointer ${isActive('/admin/sous-categorie') ? 'bg-base-300' : ''}`}
          >
            SubCategories
          </Link>
          <Link
            href="/admin/products"
            className={`flex items-center px-4 py-2 cursor-pointer ${isActive('/admin/products') ? 'bg-base-300' : ''}`}
          >
            Products
          </Link>
          <Link
            href="/admin/orders"
            className={`${isActive('/admin/orders') ? 'bg-base-300' : ''} flex items-center px-4 py-2 cursor-pointer`}
          >
            Orders
          </Link>
          <Link
            href="/admin/users"
            className={`${isActive('/profile') ? 'bg-base-300' : ''} flex items-center px-4 py-2 cursor-pointer`}
          >
            Users
          </Link>
          <Link
            href="/"
            className={`${isActive('/') ? 'bg-base-300' : ''} flex items-center px-4 py-2 cursor-pointer`}
            data-test-id="wildrent-id"
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
