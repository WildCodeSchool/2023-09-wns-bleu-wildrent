import { useAllOrdersQuery } from '@/graphql/generated/schema';
import Loader from './Loader';
import OrderCard from './OrderCard';

function Orders() {
  const { data, loading } = useAllOrdersQuery();
  if (loading) return <Loader />;
  const orders = data?.allOrders || [];

  return (
    <>
      <div className="card card-compact w-full bg-base-100 shadow-xl p-5">
        <h2 className="mb-4 text-xl font-bold">Orders </h2>
        {orders.length > 0 ? (
          <section className="flex flex-col">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </section>
        ) : (
          <div className="block mb-2 text-sm font-medium text-gray-900">No rental</div>
        )}
      </div>{' '}
    </>
  );
}

export default Orders;
