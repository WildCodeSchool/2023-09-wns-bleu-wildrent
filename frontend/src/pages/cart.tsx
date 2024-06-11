import { CartItem } from '@/components/CartItem';
import Layout from '@/components/Layout';
import React from 'react';
import { useState } from 'react';
import { useProductRefByIdQuery } from '@/graphql/generated/schema';
import router from 'next/router';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Product 1', price: 10, quantity: 1, image: '/images/product1.jpg' },
    { id: 2, name: 'Product 2', price: 20, quantity: 2, image: '/images/product2.jpg' },
  ]);

  const { id } = router.query;
  const { data } = useProductRefByIdQuery({
    variables: { productRefId: typeof id === 'string' ? parseInt(id, 10) : 0 },
    skip: typeof id === 'undefined',
  });
  const productRef = data?.productRefById;

  const updateQuantity = (id: number, quantity: number) => {
    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity } : item)));
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <Layout>
      <div className="p-6 bg-gray-100 min-h-screen">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
        <div className="cart-items">
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              updateQuantity={updateQuantity}
              removeItem={removeItem}
            />
          ))}
        </div>
        <div className="mt-6 text-right">
          <h3 className="text-xl font-semibold">Total: {calculateTotal()} €</h3>
          <button className="mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded shadow hover:bg-blue-700">
            Reserve
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
