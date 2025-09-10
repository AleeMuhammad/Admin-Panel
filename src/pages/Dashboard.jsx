import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card from "../components/Card";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdPendingActions, MdOutlineDeliveryDining } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader"; // spinner import
import { Link } from "react-router-dom";
import { FaClipboardList, FaPaperPlane } from "react-icons/fa";
import NotificationModal from "../components/NotificationModal";
import {
  useGetOrderDetailsCountQuery,
  useGetTotalOrderQuery,
} from "../redux/apiSlice";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useSelector((state) => state.user.currentuser);
  const { data: orderDetailsCount, isLoading } = useGetOrderDetailsCountQuery();
  const { data: totalOrderCount } = useGetTotalOrderQuery();
  console.log(totalOrderCount);
  let recentOrderItems = [];

  if (totalOrderCount?.length > 0) {
    const mostRecentDate = totalOrderCount.reduce((latest, order) => {
      const current = new Date(order.updatedAt);
      const latestDate = new Date(latest);
      return current > latestDate ? order.updatedAt : latest;
    }, totalOrderCount[0].updatedAt);

    const mostRecentDateOnly = new Date(mostRecentDate)
      .toISOString()
      .split("T")[0];

    const filtered = totalOrderCount.filter((order) => {
      const orderDateOnly = new Date(order.updatedAt)
        .toISOString()
        .split("T")[0];
      return orderDateOnly === mostRecentDateOnly;
    });

    recentOrderItems = filtered
      .flatMap((order) => order.orderItems)
      .map((item) => ({
        productName: item.productName,
        productImage: item.productImage,
        productPrice: item.productPrice,
        productDescription: item.productDescription,
        ProductDetails:item.ProductDetails

      }));
  }

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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <Card
              title="Active Orders"
              count={orderDetailsCount?.active ?? "0"}
              icon={<AiOutlineLoading3Quarters className="" />}
            />
            <Card
              title="Pending Orders"
              count={orderDetailsCount?.pending ?? "0"}
              icon={<MdPendingActions className="" />}
            />
            <Card
              title="Delivered Orders"
              count={orderDetailsCount?.delivered ?? "0"}
              icon={<MdOutlineDeliveryDining className="" />}
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

          <div className="max-w-[53rem] mt-5 rounded-2xl border-2 border-gray-200 bg-white px-4 pb-3 pt-4  sm:px-6">
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
          </div>

          {isModalOpen && <NotificationModal setIsModalOpen={setIsModalOpen} />}
        </>
      )}
    </div>
  );
};

export default Dashboard;

// import React, { useEffect } from "react";
// import { useSelector } from "react-redux";
// import Card from "../components/Card";
// import { AiOutlineLoading3Quarters } from "react-icons/ai";
// import { MdPendingActions, MdOutlineDeliveryDining } from "react-icons/md";
// import { ToastContainer, toast } from "react-toastify";
// import ClipLoader from "react-spinners/ClipLoader";
// import { Link } from "react-router-dom";

// import {
//   useGetOrderDetailsCountQuery,
//   useGetTotalOrderQuery,
// } from "../redux/apiSlice";

// const Dashboard = () => {
//   const user = useSelector((state) => state.user.currentuser);

//   // RTK Query Hooks
//   const {

//     data: orderDetailsCount,
//     isLoading: isLoadingOrderCount,
//     isError: isErrorOrderCount,
//     error: errorOrderCount,
//   } = useGetOrderDetailsCountQuery();

//   const {
//     data: totalOrderCount,
//     isLoading: isLoadingTotalOrders,
//     isError: isErrorTotalOrders,
//     error: errorTotalOrders,
//   } = useGetTotalOrderQuery();

//   const isLoading = isLoadingOrderCount || isLoadingTotalOrders;
//   const isError = isErrorOrderCount || isErrorTotalOrders;

//   // Toast error - only once, not on every render
//   useEffect(() => {
//     if (isErrorOrderCount && errorOrderCount) {
//       toast.error(`Failed to fetch order numbers: ${errorOrderCount.status}`);
//     }
//     if (isErrorTotalOrders && errorTotalOrders) {
//       toast.error(`Failed to fetch total orders: ${errorTotalOrders.status}`);
//     }
//   }, [isErrorOrderCount, errorOrderCount, isErrorTotalOrders, errorTotalOrders]);

//   // Loader UI
//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-[50vh]">
//         <ClipLoader color="#011830" size={50} />
//       </div>
//     );
//   }

//   // Error UI
//   if (isError) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-[50vh] text-red-600 text-xl font-bold">
//         Error loading dashboard data!
//         <ToastContainer />
//       </div>
//     );
//   }

//   // Success UI
//   return (
//     <div className="p-6 bg-[#F7F4F3] min-h-screen">
//       <ToastContainer />
//       <h1 className="text-3xl font-bold font-serif text-black mb-6">
//         Welcome to Dashboard,{" "}
//         <span className="text-[#011830]">{user?.username}</span>
//       </h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         <Card
//           title="Active Orders"
//           count={orderDetailsCount?.active ?? "0"}
//           icon={<AiOutlineLoading3Quarters className="text-[#011830]" />}
//         />
//         <Card
//           title="Pending Orders"
//           count={orderDetailsCount?.pending ?? "0"}
//           icon={<MdPendingActions className="text-[#011830]" />}
//         />
//         <Card
//           title="Delivered Orders"
//           count={orderDetailsCount?.delivered ?? "0"}
//           icon={<MdOutlineDeliveryDining className="text-[#011830]" />}
//         />
//         <Link to={"/order-details"} state={{'totalOrders':totalOrderCount}}>
//           <Card
//             title="Total Orders"
//             count={totalOrderCount?.length ?? "0"}
//             icon={<MdOutlineDeliveryDining className="text-[#011830]" />}
//           />
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
