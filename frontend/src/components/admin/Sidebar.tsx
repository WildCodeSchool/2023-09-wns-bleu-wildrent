// components/dashboard/Sidebar.tsx

import SideBarLink from './navigation/SideBarLink';
import { LinkProps } from '@/types/props';

const Sidebar = ({ navItems }: { navItems: LinkProps[] }) => {
  return (
    <div className="flex flex-col w-64 px-4 py-8 bg-secondary/10 bg-base-100 border-r border-light-gold min-h-screen shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold text-dark-gold mb-6">Dashboard</h2>
      <div className="flex flex-col justify-between flex-1">
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
