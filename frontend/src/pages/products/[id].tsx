import Layout from '@/components/Layout';
import BreadcrumbComponent from '@/components/BreadcrumbComponent';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useProductRefByIdQuery } from '@/graphql/generated/schema';
import { gql, useQuery } from '@apollo/client';
import { BiSolidCartAdd } from 'react-icons/bi';
import { CartItemProps } from '@/components/CartItem';

const GET_PRODUCT_REF_BY_ID = gql`
  query ProductRefById($productRefId: Int!) {
    productRefById(productRefId: $productRefId) {
      id
      name
      description
      priceHT
      image
      quantity
      subCategory {
        id
        name
        category {
          id
          name
        }
      }
    }
  }
`;

function ProductRefDetails() {
  const cartLocalStorage = JSON.parse(localStorage.getItem('cartList') || '[]');
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const { id } = router.query;
  const { data, loading, error } = useQuery(GET_PRODUCT_REF_BY_ID, {
    variables: { productRefId: typeof id === 'string' ? parseInt(id, 10) : 0 },
    skip: typeof id === 'undefined',
  });

  const [cartList, setCartList] = useState(cartLocalStorage);
  const [showDialog, setShowDialog] = useState(false);
  const continueShopping = () => {
    router.push('/');
  };
  const goToCart = () => {
    router.push('/cart');
  };
  useEffect(() => {
    localStorage.setItem('cartList', JSON.stringify(cartList));
  }, [cartList]);
  const productRef = data?.productRefById;

  if (!productRef) {
    console.error('productRef is undefined');
    return <p>Product not found</p>;
  }

  const { id: productRefId, name, image, priceHT } = productRef;
  const handleAddToCart = () => {
    const existingItemIndex = cartList.findIndex(
      (item: CartItemProps['item']) => item.productRefId === productRefId,
    );

    if (existingItemIndex >= 0) {
      const updatedCartList = cartList.map((item: CartItemProps['item'], index: number) =>
        index === existingItemIndex ? { ...item, quantity: item.quantity + quantity } : item,
      );
      setCartList(updatedCartList);
    } else {
      setCartList([...cartList, { productRefId, name, image, priceHT, quantity }]);
    }
    setShowDialog(true);
  };

  if (loading) {
    return <p className="text-center">Chargement...</p>;
  }

  if (error) {
    return <p className="text-center">Une erreur s'est produite : {error.message}</p>;
  }

  if (!productRef) {
    return <p className="text-center">Produit non trouvé</p>;
  }

  const breadcrumbItems = [
    { label: 'Catégories', href: '/' },
    {
      label: productRef.subCategory.category.name,
      href: `/categories/${productRef.subCategory.category.id}`,
    },
    { label: productRef.subCategory.name, href: `/subcategories/${productRef.subCategory.id}` },
    { label: productRef.name, href: `/products/${productRef.id}`, current: true },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 my-8">
        <BreadcrumbComponent items={breadcrumbItems} />
        <div className="min-w-screen flex items-center p-5 lg:p-10 overflow-hidden relative">
          <div className="w-full max-w-6xl rounded bg-white shadow-xl p-10 lg:p-20 mx-auto text-gray-800 relative md:text-left">
            <div className="md:flex items-center -mx-10">
              <div className="w-full md:w-1/2 px-10 mb-10 md:mb-0">
                <div className="relative">
                  <img
                    src={productRef?.image}
                    className="w-full relative z-10"
                    alt={productRef?.name}
                  />
                  <div className="border-4 absolute top-10 bottom-10 left-10 right-10 z-0"></div>
                </div>
              </div>
              <div className="w-full md:w-1/2 px-10">
                <div className="mb-10">
                  <h1 className="font-bold uppercase text-2xl mb-5">{productRef?.name}</h1>
                  <p className="text-sm">{productRef?.description}</p>
                </div>
                <div className="mb-10">
                  <p className="text-sm">Quantités disponibles : {productRef?.quantity}</p>
                </div>
                <div>
                  <div className="inline-block align-bottom mr-5 mb-10">
                    <span className="text-2xl leading-none align-baseline">€</span>
                    <span className="font-bold text-5xl leading-none align-baseline">
                      {productRef?.priceHT}
                    </span>
                    <span className="text-2xl leading-none align-baseline">
                      {' '}
                      per day and per unit
                    </span>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="number"
                      value={quantity}
                      onChange={() => {
                        setQuantity(quantity + 1);
                      }}
                      min="1"
                      max={productRef?.quantity}
                      className="mt-2 p-1 border rounded w-16"
                    />
                    <BiSolidCartAdd
                      className="m-4 text-secondary hover:text-secondary/50 cursor-pointer"
                      onClick={handleAddToCart}
                      type="button"
                      size={25}
                    />
                    {showDialog && (
                      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-10">
                        <div className="bg-warning p-6 rounded shadow-lg text-center">
                          <p>Item added to cart. What would you like to do next?</p>
                          <div className="mt-4">
                            <button
                              className="px-4 py-2 bg-success font-semibold rounded mr-2"
                              onClick={goToCart}
                            >
                              Go to Cart
                            </button>
                            <button
                              className="px-4 py-2 bg-primary font-semibold rounded"
                              onClick={continueShopping}
                            >
                              Continue
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ProductRefDetails;
