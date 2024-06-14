import { ProductCardProps } from '../types/index';
import Link from 'next/link';
import React from 'react';

const ProductCard: React.FC<ProductCardProps> = ({
  productRef: { name, image, priceHT },
  link,
}) => {
  return (
    <Link href={link}>
      <div className="card card-compact w-full bg-base-100 shadow-xl mb-6">
        <figure>
          <img src={image} alt={name} className="h-48 w-full object-cover" />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-center">{name}</h2>
          <div className="card-price text-right">{priceHT} € / jour</div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
