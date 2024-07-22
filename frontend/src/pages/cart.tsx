import { CartItem, CartItemProps } from '@/components/CartItem';
import Layout from '@/components/Layout';
import client from '@/graphql/client';
import React, { useEffect, useState } from 'react';
import { OrderItemInput, useProductRefByIdQuery } from '@/graphql/generated/schema';
import { useRouter } from 'next/router';
import { useAlert } from '@/components/hooks/AlertContext';
import { useCreateOrderMutation, OrderInput } from '@/graphql/generated/schema';
import { useUser } from '@/components/hooks/UserContext';
import { useDate } from '@/components/hooks/DatesContext';
import { useAuthModal } from '@/components/hooks/useAuthModal';
import LoginForm from '@/components/LoginForm';
import RegisterForm from '@/components/RegisterForm';

const Cart = () => {
  const { showAlert } = useAlert();
  const { user } = useUser();
  const { startDate, endDate, nbDays } = useDate();
  const { showLoginForm, showRegisterForm, handleLoginClick, handleRegisterClick, closeModal } =
    useAuthModal();

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
  const [createOrder] = useCreateOrderMutation();
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
    showAlert('success', 'Cart cleared', 3000);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.priceHT * item.quantity * nbDays, 0);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      handleLoginClick();
      return;
    }
    if (!startDate || !endDate) {
      showAlert('info', 'Please fill in all the required fields', 3000);
      return;
    }

    const orderData: OrderInput = {
      user: { id: user.id },
      orderItems: cartItems.map((item) => ({
        productRef: { id: item.productRefId },
        quantity: item.quantity,
        unitPrice: item.priceHT,
      })) as OrderItemInput[],

      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
    };

    try {
      await createOrder({ variables: { data: orderData } });
      showAlert('success', 'Order created successfully', 3000);
      clearCart();
      router.push('/myprofile');
    } catch (error) {
      showAlert('error', 'Failed to create order', 3000);
      console.error('Failed to create order', error);
    } finally {
      client.resetStore();
    }
  };

  return (
    <Layout>
      <div className="p-6 min-h-screen">
        {cartItems.length === 0 && <p>Your cart is empty</p>}
        {cartItems.length > 0 && (
          <>
            <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
            <p>nombre de jours de location: {nbDays}</p>
            <form onSubmit={handleSubmit}>
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
                <button
                  type="submit"
                  className="btn btn-secondary text-primary mt-4 ml-4 px-6 py-2 "
                >
                  Reserve
                </button>
                <button
                  type="button"
                  onClick={clearCart}
                  className="btn btn-error text-primary mt-4 ml-4 px-6 py-2 "
                >
                  Clear Cart
                </button>
              </div>
            </form>
            {showLoginForm && (
              <LoginForm closeModal={closeModal} switchToRegister={handleRegisterClick} />
            )}
            {showRegisterForm && <RegisterForm closeModal={closeModal} />}
          </>
        )}
      </div>
    </Layout>
  );
};
export default Cart;
