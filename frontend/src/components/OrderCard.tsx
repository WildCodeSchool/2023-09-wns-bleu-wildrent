type OrderCardProps = {
  order: {
    orderDate: string;
    totalAmount: number;
    startDate: string;
    endDate: string;
    numberOfDays: number;
    items: {
      quantity: number;
      unitPrice: number;
      productRef: {
        name: string;
      };
    }[];
  };
  link?: string;
};
export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString();
};
const OrderCard = ({
  order: { orderDate, totalAmount, startDate, endDate, numberOfDays, items },
  link,
}: OrderCardProps) => {
  return (
    <div className="p-4 bg-white shadow rounded-lg mx-auto w-full m-2">
      <div className="flex justify-between items-center bg-secondary/50">
        <div>
          <div className="text-sm text-gray-500">Ordered on</div>
          <div className="text-lg font-semibold text-gray-900">{formatDate(orderDate)}</div>
        </div>
        <div>
          <div className="text-sm text-gray-500">TOTAL</div>
          <div className="text-lg font-semibold text-gray-900">€{totalAmount}</div>
        </div>
      </div>
      <div className="text-sm text-gray-500 text-center">
        Rental from {formatDate(startDate)} to {formatDate(endDate)} ({numberOfDays} days)
      </div>
      <div className="flex justify-between items-center">
        <div className="overflow-x-auto w-full">
          <table className="table">
            <thead>
              <tr>
                <th className="px-4 py-2 text-center">Product</th>
                <th className="px-4 py-2 text-center">Quantity</th>
                <th className="px-4 py-2 text-center">Unit Price per day</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2 text-center">{item.productRef.name}</td>
                  <td className="border px-4 py-2  text-center">{item.quantity}</td>
                  <td className="border px-4 py-2  text-center">€{item.unitPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
