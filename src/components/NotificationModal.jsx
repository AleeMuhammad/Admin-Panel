import React from "react";
import { useForm } from "react-hook-form";
import { useSendNotificationMutation } from "../redux/apiSlice";
import { toast, ToastContainer } from "react-toastify";

const NotificationModal = ({ setIsModalOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
 
  const[sendnotification]=useSendNotificationMutation();
  

  const onSubmit = async(data) => {
   const response=await sendnotification(data);
   if(response?.error){
    console.log(response?.error?.data?.message);
    toast.error(response?.error?.data?.message);
   }else{
    console.log(response?.data)
    toast.success(response?.data)
    setIsModalOpen(false);
   }
    // console.log(data);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">
      <ToastContainer/>
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 relative">
        <h2 className="text-2xl font-semibold text-center mb-6 text-[#011830]">
          Send Notification
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="flex flex-col">
            <label
              htmlFor="title"
              className="mb-1 text-sm font-medium text-gray-700"
            >
              Notification Title
            </label>
            <input
              id="title"
              placeholder="Enter notification title"
              className={`border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.title ? "border-red-500" : "border-gray-300"
              }`}
              {...register("title", {
                required: "Notification title is required",
              })}
            />
            {errors.title && (
              <span className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="message"
              className="mb-1 text-sm font-medium text-gray-700"
            >
              Notification Message
            </label>
            <textarea
              id="message"
              rows={4}
              placeholder="Enter message"
              className={`border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                errors.message ? "border-red-500" : "border-gray-300"
              }`}
              {...register("message", {
                required: "Notification message is required",
              })}
            />
            {errors.message && (
              <span className="text-red-500 text-sm mt-1">
                {errors.message.message}
              </span>
            )}
          </div>

          <div className="text-right space-x-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="bg-gray-600 w-20 cursor-pointer text-center  text-white px-6 py-2 rounded-md hover:bg-gray-700 transition"
            >
              Close
            </button>
            <button
              type="submit"
              className="bg-blue-600 w-20 cursor-pointer text-center text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            > 
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NotificationModal;
