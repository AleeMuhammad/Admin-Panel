import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import { useLocation } from "react-router-dom";

const OrderDetails = () => {
  const location = useLocation();
  const totalOrders = location?.state?.totalOrders;
  const loading = !totalOrders;
  
  const totalOrderCount = totalOrders ?? []; 
  console.log(totalOrderCount);

    const makeWhatsAppLink = (number) => {
    if (!number) return;
    number = number.replace(/\D/g, "");
    if (number.startsWith("0")) {
      number = "92" + number.slice(1);
    }
    const url = `https://wa.me/${number}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };
 
  return (
    <div className="p-4 sm:p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <ToastContainer />
      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 sm:mb-8 text-center tracking-tight">
        Order Summary
      </h1>

      {loading ? (
        <div className="flex items-center justify-center min-h-[50vh]">
          <ClipLoader color="#1E3A8A" size={50} />
        </div>
      ) : totalOrderCount.length === 0 ? (
        <p className="text-center text-gray-500 text-base sm:text-lg font-medium">
          No orders found.
        </p>
      ) : (
        totalOrderCount.map((order) => (
          <div
            key={order.orderId}
            className="w-full sm:w-3/4 mx-auto bg-white border border-gray-200 rounded-2xl shadow-lg p-4 sm:p-8 mb-6 sm:mb-8 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="mb-4 sm:mb-6">
              <p className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                Order ID:{" "}
                <span className="text-gray-600 font-medium">
                  {order.orderId}
                </span>
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                <p className="text-xs sm:text-sm text-gray-600">
                  Ordered By:{" "}
                  <span className="text-gray-900 font-medium">
                    {order.orderByUser}
                  </span>
                </p>
                <p className="text-xs sm:text-sm text-gray-600">
                  Mobile: {" "}
                   <span className=" text-gray-900">
                          {order?.mobile ? (
                            <button
                              onClick={() => makeWhatsAppLink(order.mobile)}
                              className="text-gray-900 font-medium cursor-pointer hover:underline"
                            >
                              {order.mobile}
                            </button>
                          ) : (
                            "N/A"
                          )}
                        </span>
                </p>
                <p className="text-xs sm:text-sm text-gray-600">
                  Address:{" "}
                  <span className="text-gray-900 font-medium">
                    {order.address}
                  </span>
                </p>
                <p className="text-xs sm:text-sm text-gray-600">
                  Area:{" "}
                  <span className="text-gray-900 font-medium">
                    {order.location_area}
                  </span>
                </p>
                <p className="text-xs sm:text-sm text-gray-600">
                  Payment:{" "}
                  <span className="text-gray-900 font-medium">
                    {order.payment}
                  </span>
                </p>
                <p className="text-xs sm:text-sm text-gray-600">
                  Status:
                  <span
                    className={`text-xs sm:text-sm font-medium capitalize ml-1 sm:ml-2 px-1 sm:px-2 py-0.5 sm:py-1 rounded-full ${
                      order.status === "delivered"
                        ? "bg-green-400 text-green-900"
                        : order.status === "pending"
                        ? "bg-yellow-400 text-yellow-900"
                        :order.status === 'rejected'
                        ? "bg-red-400 text-red-900"
                        : "bg-blue-400 text-blue-900"
                    }`}
                  >
                    {order.status}
                  </span>
                </p>
                <p className="text-xs sm:text-sm text-gray-600">
                  Date:{" "}
                  <span className="text-gray-900 font-medium">
                    {new Date(order.createdAt).toLocaleString()}
                  </span>
                </p>
                <p className="text-xs sm:text-sm text-gray-600">
                 OrderType:{" "}
                  <span className="text-gray-900 capitalize font-medium">
                    {order?.orderType}
                  </span>
                </p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 sm:pt-6">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">
                Order Items
              </h3>
              {order.orderItems?.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 border-b border-gray-100 pb-4 hover:bg-gray-50 rounded-lg transition-colors duration-200 p-2"
                >
                  <div className="flex items-start space-x-3 sm:space-x-4 flex-1">
                    <img
                      src={item.productImage}
                      alt={item.productName}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg"
                    />
                    <div>
                      <p className="font-semibold text-gray-900 text-sm sm:text-base">
                        {item.productName}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500 mt-1">
                        {item.productDescription}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600 mt-1">
                        Price: PKR {parseFloat(item.productPrice).toFixed(2)} x{" "}
                        {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="font-semibold text-gray-900 text-sm sm:text-base mt-2 sm:mt-0 sm:ml-4">
                    PKR{" "}
                    {(parseFloat(item.productPrice) * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}

              <div className="flex justify-between items-center mt-4 sm:mt-6 text-base sm:text-lg font-semibold text-gray-900">
                <p>Order Amount:</p>
                <p>PKR {order?.amount.toFixed(2)}</p>
              </div>
              <div className="flex justify-between items-center mt-4 sm:mt-6 text-base sm:text-lg font-semibold text-gray-900">
                <p>Delivery Fee:</p>
                <p>PKR {order?.delivery_fee?.toFixed(2)}</p>
              </div>

              <div className="flex justify-between items-center mt-3 sm:mt-4 border-t border-gray-200 pt-3 sm:pt-4 text-xl sm:text-2xl font-bold text-gray-900">
                <p>Total Amount:</p>
                <p>PKR {(order?.amount + order.delivery_fee).toFixed(2)}</p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderDetails;
