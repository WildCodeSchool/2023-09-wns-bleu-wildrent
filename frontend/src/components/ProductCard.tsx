import { ProductCardProps } from '../types/index';
import Link from 'next/link';
import React from 'react';

function ProductCard({ productRef: { name, image, priceHT }, link }: ProductCardProps) {
  return (
    <Link href={link}>
      <div className="card card-compact w-96 bg-base-100 shadow-xl">
        <figure>
          <img src={image} alt={name} />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-center">{name}</h2>
          <div className="card-price text-right">{priceHT} € / jour</div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
