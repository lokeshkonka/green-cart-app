import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { assets, dummyOrders } from "../../assets/assets";

const Orders = () => {
  const { currency } = useAppContext();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    setOrders(dummyOrders);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="flex-1 h-[95vh] overflow-y-auto bg-gray-50">
      <div className="md:p-10 p-4 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Orders</h2>

        {orders.length === 0 ? (
          <p className="text-gray-500 text-center py-10">No orders found.</p>
        ) : (
          orders.map((order, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 space-y-6 hover:shadow-lg transition-all duration-300"
            >
              {/* Header */}
              <div className="flex justify-between items-center border-b pb-3">
                <h3 className="text-lg font-semibold text-gray-800">
                  Order #{index + 1}
                </h3>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      order.isPaid
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {order.isPaid ? "Paid" : "Pending"}
                  </span>
                </div>
              </div>

              {/* Products */}
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">
                  Products
                </h4>
                <div className="flex flex-wrap gap-4">
                  {order.items.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200"
                    >
                      <img
                        src={assets.box_icon}
                        alt="product"
                        className="w-10 h-10 opacity-70"
                      />
                      <p className="text-gray-700 text-sm font-medium">
                        {item.product.name}{" "}
                        <span className="text-primary">× {item.quantity}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Address */}
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">
                  Shipping Address
                </h4>
                <p className="text-gray-800 font-medium">
                  {order.address.firstName} {order.address.lastName}
                </p>
                <p className="text-gray-600 text-sm">
                  {order.address.street}, {order.address.city},{" "}
                  {order.address.state}, {order.address.zipcode},{" "}
                  {order.address.country}
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  {order.address.phone}
                </p>
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center border-t pt-3">
                <p className="text-lg font-bold text-gray-800">
                  {currency}
                  {order.amount}
                </p>
                <p className="text-sm text-gray-600">
                  Method:{" "}
                  <span className="font-medium">{order.paymentType}</span>
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
