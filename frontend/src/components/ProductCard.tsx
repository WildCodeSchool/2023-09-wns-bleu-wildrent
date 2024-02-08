import Link from 'next/link';
import React from 'react';

type ProductCardProps = {
  name: string;
  description: string;
  image: string;
  priceHT: number;
  link: string;
};
function ProductCard({ name, description, image, priceHT, link }: ProductCardProps) {
  return (
    <div>
      <Link href={link}>
        <h3> {name}</h3>
        <img src={image} alt={name} />
        <p>{description}</p>
        <p>{priceHT}€</p>
      </Link>
    </div>
  );
}

export default ProductCard;
