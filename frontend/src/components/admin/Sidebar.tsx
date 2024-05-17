// components/dashboard/Sidebar.tsx

import Link from 'next/link';
import SideBarLink from './navigation/SideBarLink';
import { LinkProps } from '@/types/props';
import { useRouter } from 'next/router';

const Sidebar = ({ navItems }: { navItems: LinkProps[] }) => {
  const router = useRouter();
  // Cette fonction détermine si le lien est actif basé sur le chemin actuel
  const isActive = (pathname: string) => router.pathname === pathname;
  return (
    <div className="flex flex-col w-64 px-4 py-8 bg-white border-r dark:bg-gray-200 dark:border-gray-600 min-h-screen">
      <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">Dashboard</h2>
      <div className="flex flex-col justify-between flex-1 mt-6">
        <nav>
          {navItems.map(({ href, text, testId }) => (
            <SideBarLink key={href} href={href} text={text} testId={testId} />
          ))}
          <Link
            href="/"
            className={`${isActive('/') ? 'bg-base-300' : ''} flex items-center px-4 py-2 cursor-pointer`}
            data-test-id="wildrent-id"
          >
            WildRent
          </Link>
          {/* Insérez d'autres liens dans /const/adminSidebarItems si nécessaire */}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
