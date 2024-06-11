import React, { useState } from 'react';

type CartItemProps = {
  item: {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
  };

  updateQuantity: (id: number, quantity: number) => void;
  removeItem: (id: number) => void;
};

export const CartItem = ({ item, updateQuantity, removeItem }: CartItemProps) => {
  const handleQuantityChange = (e: any) => {
    updateQuantity(item.id, parseInt(e.target.value));
  };

  return (
    <div className="flex items-center mb-4 p-4 bg-white rounded shadow-md">
      <img src={item.image} alt={item.name} className="w-24 h-24 object-cover mr-4" />
      <div className="flex-grow">
        <h4 className="text-lg font-semibold">{item.name}</h4>
        <p className="text-gray-600">{item.price} €</p>
        <input
          type="number"
          value={item.quantity}
          onChange={handleQuantityChange}
          min="1"
          className="mt-2 p-1 border rounded w-16"
        />
        <button
          onClick={() => removeItem(item.id)}
          className="ml-4 p-2 bg-red-500 text-white rounded"
        >
          Remove
        </button>
      </div>
    </div>
  );
};
