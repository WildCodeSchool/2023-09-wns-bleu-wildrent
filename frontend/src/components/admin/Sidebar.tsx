// components/dashboard/Sidebar.tsx

import SideBarLink from './navigation/SideBarLink';
import { LinkProps } from '@/types/props';

const Sidebar = ({ navItems }: { navItems: LinkProps[] }) => {
  return (
    <div className="flex flex-col w-64 px-4 py-8 bg-white border-r dark:bg-gray-200 dark:border-gray-600 min-h-screen">
      <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">Dashboard</h2>
      <div className="flex flex-col justify-between flex-1 mt-6">
        <nav>
          {navItems.map(({ href, text, testId }) => (
            <SideBarLink key={href} href={href} text={text} testId={testId} />
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
