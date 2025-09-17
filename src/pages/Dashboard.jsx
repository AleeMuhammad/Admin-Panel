import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from "recharts";
import {
  getMonthlyOrders,
  getMonthlyRevenue,
  getStatusDistribution,
} from "../utils/order";
import { useSelector } from "react-redux";
import Card from "../components/Card";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdPendingActions, MdOutlineDeliveryDining, MdCancel } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader"; // spinner import
import { Link } from "react-router-dom";
import { FaClipboardList, FaPaperPlane } from "react-icons/fa";
import NotificationModal from "../components/NotificationModal";
import {
  useGetOrderDetailsCountQuery,
  useGetTotalOrderQuery,
} from "../redux/apiSlice";

const COLORS = ["#033468", "#ff9800", "#4caf50", "#f44336"];


const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useSelector((state) => state.user.currentuser);
  const { data: orderDetailsCount, isLoading } = useGetOrderDetailsCountQuery();
  const { data: totalOrderCount } = useGetTotalOrderQuery();
  // let recentOrderItems = [];

  const monthlyOrders = getMonthlyOrders(totalOrderCount || []);
  const monthlyRevenue = getMonthlyRevenue(totalOrderCount || []);
  const statusDistribution = getStatusDistribution(totalOrderCount || []);

  // if (totalOrderCount?.length > 0) {
  //   const mostRecentDate = totalOrderCount.reduce((latest, order) => {
  //     const current = new Date(order.updatedAt);
  //     const latestDate = new Date(latest);
  //     return current > latestDate ? order.updatedAt : latest;
  //   }, totalOrderCount[0].updatedAt);

  //   const mostRecentDateOnly = new Date(mostRecentDate)
  //     .toISOString()
  //     .split("T")[0];

  //   const filtered = totalOrderCount.filter((order) => {
  //     const orderDateOnly = new Date(order.updatedAt)
  //       .toISOString()
  //       .split("T")[0];
  //     return orderDateOnly === mostRecentDateOnly;
  //   });

  //   recentOrderItems = filtered
  //     .flatMap((order) => order.orderItems)
  //     .map((item) => ({
  //       productName: item.productName,
  //       productImage: item.productImage,
  //       productPrice: item.productPrice,
  //       productDescription: item.productDescription,
  //       ProductDetails:item.ProductDetails

  //     }));
  // }

  return (
    <div className="p-6 min-h-screen">
      <ToastContainer />

      <div className="flex mb-6  flex-wrap justify-between items-center">
        <h1 className="text-3xl font-bold font-serif text-black ">
          Welcome to Dashboard,{" "}
          <span className="text-[#011830]">{user?.username}</span>
        </h1>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#033468] hover:bg-[#011830] cursor-pointer text-[#F7F4F3] mt-3 lg:mt-0 flex items-center  space-x-2 rounded-lg px-3 py-2"
        >
          <span>Send Notification</span>
          <FaPaperPlane />
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center min-h-[50vh]">
          <ClipLoader color="#011830" size={50} />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
            <Card
              title="Pending Orders"
              count={orderDetailsCount?.data?.pendingOrders ?? "0"}
              icon={<MdPendingActions className="" />}
            />
            <Card
              title="Active Orders"
              count={orderDetailsCount?.data?.activeOrders ?? "0"}
              icon={<AiOutlineLoading3Quarters className="" />}
            />
            <Card
              title="Delivered Orders"
              count={orderDetailsCount?.data?.deliveredOrders ?? "0"}
              icon={<MdOutlineDeliveryDining className="" />}
            />
             <Card
              title="Rejected Orders"
              count={orderDetailsCount?.data?.rejectedOrders ?? "0"}
              icon={<MdCancel className="" />}
            />
            <Link
              to={"/order-details"}
              state={{ totalOrders: totalOrderCount }}
            >
              <Card
                title="Total Orders"
                count={totalOrderCount?.length ?? "0"}
                icon={<FaClipboardList className="" />}
              />

            </Link>
          </div>

          {/* <div className="max-w-[53rem] mt-5 rounded-2xl border-2 border-gray-200 bg-white px-4 pb-3 pt-4  sm:px-6">
            <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 ">
                  Recent Order
                </h3>
              </div>
              <div>
                <Link
                  state={{ totalOrders: totalOrderCount }}
                  to={"/order-details"}
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5  font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 "
                >
                  See all
                </Link>
              </div>
            </div>
            <div className="overflow-x-auto ">
              <table className="w-full">
                <thead className="border-gray-100 border-y ">
                  <tr>
                    <td className="px-5 py-3 font-medium text-gray-500 ">Name</td>
                    <td className="px-5 py-3 font-medium text-gray-500 ">Image</td>
                    <td className="px-5 py-3 font-medium text-gray-500 ">Price</td>
                    <td className="px-5 py-3 font-medium text-gray-500 ">
                      Details
                    </td>
                    <td className="px-5 py-3 font-medium text-gray-500 ">
                      Description
                    </td>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100 ">
                  {recentOrderItems.map((product, index) => (
                    <tr key={index}>
                      <td className="px-5 py-3 font-medium text-gray-800 ">
                        {product.productName}
                      </td>
                      <td className="px-5 py-3">
                        <div className="h-[50px] w-[50px]  overflow-hidden rounded-md">
                          <img
                            src={product.productImage}
                            className="h-[50px] w-[50px]  object-cover"
                            alt={product.productName}
                          />
                        </div>
                      </td>
                      <td className="px-5 py-3 text-gray-500  ">
                        Rs. {product.productPrice}
                      </td>
                      <td className="px-5 py-3 text-gray-500 ">
                        {product.ProductDetails}
                      </td>
                      <td className="px-5 py-3 text-gray-500 ">
                        {product.productDescription}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div> */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="rounded-2xl border-2 border-gray-200 bg-white p-4">
          <h3 className="text-lg font-semibold mb-4">Monthly Orders</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyOrders}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="orders" fill="#033468" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl border-2 border-gray-200 bg-white p-4">
          <h3 className="text-lg font-semibold mb-4">Monthly Revenue (Rs.)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#ff9800" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl border-2 border-gray-200 bg-white p-4 md:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Order Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusDistribution}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {statusDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

          {isModalOpen && <NotificationModal setIsModalOpen={setIsModalOpen} />}
        </>
      )}
    </div>
  );
};

export default Dashboard;

