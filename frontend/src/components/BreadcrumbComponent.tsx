import Link from 'next/link';
import React from 'react';

interface BreadcrumbProps {
  items: { label: string; href: string; current?: boolean }[];
}

const BreadcrumbComponent: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="flex mb-4" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {items.map((item, index) => (
          <li key={index} className="inline-flex items-center">
            {!item.current ? (
              <Link
                href={item.href}
                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                {item.label}
              </Link>
            ) : (
              <span className="inline-flex items-center text-sm font-medium text-gray-900">
                {item.label}
              </span>
            )}
            {index !== items.length - 1 && <span className="mx-1 text-gray-400">{'>'}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default BreadcrumbComponent;
