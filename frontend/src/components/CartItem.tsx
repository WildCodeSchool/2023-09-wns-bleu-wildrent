import Link from 'next/link';
import React, { ChangeEvent, useState } from 'react';
import { RiDeleteBin6Fill } from 'react-icons/ri';
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
    <div className="mx-auto w-full flex-none lg:max-w-2xl m-2 xl:max-w-4xl">
      <div className="space-y-6">
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
          <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
            <Link href={`/products/${item.productRefId}`}>
              <img
                className="w-24 h-24 object-cover mr-4 rounded-lg"
                src={item.image}
                alt={item.name}
              />
            </Link>

            <label htmlFor="counter-input" className="sr-only">
              Choose quantity:
            </label>
            <div className="flex items-center justify-between md:order-3 md:justify-end">
              <input
                type="number"
                value={item.quantity}
                onChange={handleQuantityChange}
                min="1"
                className="m-2 p-1 border rounded w-16"
              />

              <div className="text-end md:order-4 md:w-32">
                <p className="text-base font-bold text-gray-900 dark:text-white">
                  {item.priceHT} €
                </p>
              </div>
            </div>

            <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
              <Link href={`/products/${item.productRefId}`}>
                <div className="text-base font-medium text-gray-900 hover:underline dark:text-white">
                  {item.name}
                </div>
              </Link>
              <div className="flex items-center gap-4">
                <RiDeleteBin6Fill
                  size={25}
                  onClick={() => removeItem(item.productRefId)}
                  className="cursor-pointer text-error"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
