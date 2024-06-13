import React, { useState } from 'react';

export type CartItemProps = {
  item: {
    productRefId: number;
    name: string;
    priceHT: number;
    image: string;
    quantity: number;
  };

  updateQuantity: (id: number, quantity: number) => void;
  removeItem: (id: number) => void;
};

export const CartItem = ({ item, updateQuantity, removeItem }: CartItemProps) => {
  const handleQuantityChange = (e: any) => {
    updateQuantity(item.productRefId, parseInt(e.target.value));
  };

  return (
    <div className="flex items-center mb-4 p-4 bg-secondary/50 rounded-lg shadow-md">
      <img src={item.image} alt={item.name} className="w-24 h-24 object-cover mr-4 rounded-lg" />
      <div className="flex-grow">
        <h4 className="text-lg font-semibold">{item.name}</h4>
        <p className="text-primary">{item.priceHT} €</p>
      </div>
      <div className="flex-grow">
        {' '}
        <input
          type="number"
          value={item.quantity}
          onChange={handleQuantityChange}
          min="1"
          className="mt-2 p-1 border rounded w-16"
        />
        <button
          onClick={() => removeItem(item.productRefId)}
          className="btn btn-error text-primary mt-4 ml-4 px-6 py-2 "
        >
          Remove
        </button>
      </div>
    </div>
  );
};
