import { CartItem, CartItemProps } from '@/components/CartItem';
import Layout from '@/components/Layout';
import React, { useEffect, useState } from 'react';
import { useProductRefByIdQuery } from '@/graphql/generated/schema';
import { useRouter } from 'next/router';

const Cart = () => {
  const numberOfDays = 3;

  const [cartItems, setCartItems] = useState<CartItemProps['item'][]>(() => {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem('cartList') || '[]');
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('cartList', JSON.stringify(cartItems));
  }, [cartItems]);

  const router = useRouter();
  const { id } = router.query;
  const { data } = useProductRefByIdQuery({
    variables: { productRefId: typeof id === 'string' ? parseInt(id, 10) : 0 },
    skip: typeof id === 'undefined',
  });
  const productRef = data?.productRefById;

  const updateQuantity = (id: number, quantity: number) => {
    setCartItems(
      cartItems.map((item) => (item.productRefId === id ? { ...item, quantity } : item)),
    );
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.productRefId !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.priceHT * item.quantity * numberOfDays,
      0,
    );
  };

  return (
    <Layout>
      <div className="p-6 min-h-screen">
        {cartItems.length === 0 && <p>Your cart is empty</p>}
        {cartItems.length > 0 && (
          <>
            <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
            <p>nombre de jours de location: {numberOfDays}</p>
            <div className="cart-items">
              {cartItems.map((item) => (
                <CartItem
                  key={item.productRefId}
                  item={item}
                  updateQuantity={updateQuantity}
                  removeItem={removeItem}
                />
              ))}
            </div>
            <div className="mt-6 text-right">
              <h3 className="text-xl font-semibold">Total: {calculateTotal()} €</h3>
              <button className="btn btn-secondary text-primary mt-4 ml-4 px-6 py-2 ">
                Reserve
              </button>
              <button
                // className="mt-4 ml-4 px-6 py-2 bg-error font-semibold rounded shadow hover:bg-error/60 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300"
                onClick={clearCart}
                className="btn btn-error text-primary mt-4 ml-4 px-6 py-2 "
              >
                Clear Cart
              </button>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};
export default Cart;
