import React, { useState } from 'react';
import { Order } from '../../../graphql/generated/schema';
import { formatDate } from '@/components/OrderCard';

type AdminOrdersTableProps = {
  orders: Order[];
};

const AdminOrdersTable: React.FC<AdminOrdersTableProps> = ({ orders }) => {
  const sortedOrders = [...orders].sort((a, b) => a.orderDate - b.orderDate);
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);

  const toggleExpand = (orderId: number) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };
  return (
    <>
      <table className="min-w-full table-auto mx-auto">
        <thead>
          <tr className="bg-gray-400 text-left text-white">
            <th className="px-4 py-2 text-center">ID</th>
            <th className="px-4 py-2 text-center">User</th>
            <th className="px-4 py-2 text-center">Order Date</th>
            <th className="px-4 py-2 text-center">Start Date</th>
            <th className="px-4 py-2 text-center">End Date</th>
            <th className="px-4 py-2 text-center">Days</th>
            <th className="px-4 py-2 text-center">Total Amount</th>
            <th className="px-4 py-2 text-center">Payment Status</th>
            <th className="px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedOrders.map((order) => (
            <React.Fragment key={order.id}>
              <tr className={order.id % 2 === 0 ? 'bg-gray-200' : ''}>
                <td className="px-4 py-2 border-b text-center">{order.id}</td>
                <td className="px-4 py-2 border-b text-center">{order.user?.email}</td>
                <td className="px-4 py-2 border-b text-center">{formatDate(order.orderDate)}</td>
                <td className="px-4 py-2 border-b text-center">{formatDate(order.startDate)}</td>
                <td className="px-4 py-2 border-b text-center">{formatDate(order.endDate)}</td>
                <td className="px-4 py-2 border-b text-center">{order.numberOfDays}</td>
                <td className="px-4 py-2 border-b text-center">{order.totalAmount}€</td>
                <td className="px-4 py-2 border-b text-center">{order.paymentStatus}</td>
                <td className="px-4 py-2 border-b text-center">
                  <button
                    className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() => toggleExpand(order.id)}
                  >
                    {expandedOrderId === order.id ? 'Hide Details' : 'Show Details'}
                  </button>
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                    Delete
                  </button>
                </td>
              </tr>
              {expandedOrderId === order.id && (
                <>
                  <tr>
                    <td colSpan={9} className="px-4 py-2 text-center">
                      <span className="font-bold">Shipping Address:</span> {order.shippingAddress}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={9} className="px-4 py-2 bg-gray-100 text-center">
                      <div className="flex justify-center w-full">
                        <div className="overflow-x-auto w-4/5">
                          <table className="min-w-full table-auto mx-auto">
                            <thead>
                              <tr className="bg-gray-300 text-left">
                                <th className="px-4 py-2 text-center">Product</th>
                                <th className="px-4 py-2 text-center">Quantity</th>
                                <th className="px-4 py-2 text-center">Unit Price</th>
                              </tr>
                            </thead>
                            <tbody>
                              {order.orderItems.map((item, index) => (
                                <tr key={index} className="border-t">
                                  <td className="px-4 py-2 text-center">
                                    {item.productItems.length > 0 &&
                                      item.productItems[0].productRef.name}
                                  </td>
                                  <td className="px-4 py-2 text-center">{item.quantity}</td>
                                  <td className="px-4 py-2 text-center">{item.unitPrice}€</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </td>
                  </tr>
                </>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default AdminOrdersTable;
