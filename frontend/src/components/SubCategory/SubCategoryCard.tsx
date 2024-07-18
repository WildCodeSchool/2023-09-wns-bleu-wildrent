import Link from 'next/link';
import React from 'react';

interface SubCategoryCardProps {
  subcategory: {
    id: number;
    name: string;
    image: string;
    description?: string;
  };
}

const SubCategoryCard: React.FC<SubCategoryCardProps> = ({ subcategory }) => {
  return (
    <Link href={`/subcategories/${subcategory.id}`}>
      <div className="card card-compact w-full bg-base-100 shadow-xl mb-6">
        <figure>
          <img
            src={subcategory.image}
            alt={subcategory.name}
            className="h-48 w-full object-cover"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-center">{subcategory.name}</h2>
        </div>
      </div>
    </Link>
  );
};

export default SubCategoryCard;
