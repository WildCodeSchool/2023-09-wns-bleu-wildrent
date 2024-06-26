import { CategoryCardProps } from '../types/index';
import Link from 'next/link';
import React from 'react';

function CategoryCard({ category: { name, image }, link }: CategoryCardProps) {
  return (
    <Link href={link}>
      <div className="group relative">
        <div className="relative h-80 w-full overflow-hidden rounded-lg sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
          <img src={image} alt={name} className="h-full w-full object-cover object-center" />
        </div>
        <h3 className="mt-6 text-xl text-gray-500">{name}</h3>
      </div>
    </Link>
  );
}

export default CategoryCard;
