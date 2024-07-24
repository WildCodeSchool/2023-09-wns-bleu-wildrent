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
import Link from 'next/link';
import { RiArrowRightLine } from 'react-icons/ri';

const Cart = () => {
  const { showAlert } = useAlert();
  const { user } = useUser();
  const { startDate, endDate, nbDays } = useDate();
  const { showLoginForm, showRegisterForm, handleLoginClick, handleRegisterClick, closeModal } =
    useAuthModal();
  const tva = 20;
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

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.priceHT * item.quantity * nbDays, 0);
  };

  const calculateTax = (calculateTotal: number, tva: number) => {
    const tax = (calculateTotal * tva) / 100;
    return parseFloat(tax.toFixed(2));
  };
  const tax = calculateTax(calculateTotal(), tva);

  const montantTTC = calculateTotal() + tax;
  const clearCart = () => {
    setCartItems([]);
    localStorage.setItem('cartList', '[]');
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
      <section className="py-4 antialiased dark:bg-gray-900 mt-3 md:py-8">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h1 className="text-3xl font-bold text-center my-6 text-secondary ">Shopping Cart</h1>
          {cartItems.length === 0 && <p>Your cart is empty</p>}
          {cartItems.length > 0 && (
            <>
              <p className="m-4 text-center">Number of days of reservation: {nbDays}</p>
              <form onSubmit={handleSubmit}>
                <div className="cart-items p-4">
                  {cartItems.map((item) => (
                    <CartItem
                      key={item.productRefId}
                      item={item}
                      updateQuantity={updateQuantity}
                      removeItem={removeItem}
                    />
                  ))}
                </div>
                <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                  <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                    <p className="text-xl font-semibold text-gray-900 dark:text-white">
                      Order summary
                    </p>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <dl className="flex items-center justify-between gap-4">
                          <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                            HT price
                          </dt>
                          <dd className="text-base font-medium text-gray-900 dark:text-white">
                            {calculateTotal()} €
                          </dd>
                        </dl>

                        <dl className="flex items-center justify-between gap-4">
                          <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                            Tax
                          </dt>
                          <dd className="text-base font-medium text-gray-900 dark:text-white">
                            {tax} €
                          </dd>
                        </dl>
                      </div>

                      <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
                        <dt className="text-base font-bold text-gray-900">Total</dt>
                        <dd className="text-base font-bold text-gray-900">{montantTTC} €</dd>
                      </dl>
                    </div>
                    <button
                      type="submit"
                      className=" btn flex w-full items-center justify-center rounded-lg bg-secondary-700 px-5 py-2.5 text-sm font-medium hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      Validate Order
                    </button>

                    <div className="flex items-center justify-center gap-2">
                      <Link href="/">
                        <div className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">
                          Continue Shopping
                          <RiArrowRightLine />
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
                {showLoginForm && (
                  <LoginForm closeModal={closeModal} switchToRegister={handleRegisterClick} />
                )}
                {showRegisterForm && <RegisterForm closeModal={closeModal} />}
              </form>
            </>
          )}
        </div>
      </section>
    </Layout>
  );
};
export default Cart;
