import React from "react";
import { useForm } from "react-hook-form";

const EditProfileModal = ({onClose,userProfile,onSubmitProfile}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    mode: "onChange",
  });
  
  const onSubmit=async(data)=>{
   await onSubmitProfile(data);
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl p-6 sm:p-8 relative">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Edit Profile
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-5">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  defaultValue={userProfile?.username}
                  {...register("username", {
                    required: "Name is required",
                    minLength: {
                      value: 3,
                      message:
                        "Name should be at least 3 characters long",
                    },
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="Enter name"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors?.name?.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type='email'
                  defaultValue={userProfile?.email}
                  disabled
                  {...register("email")}
                  className="w-full px-4 py-2 border cursor-not-allowed border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="Enter email"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors?.email?.message}
                  </p>
                )}
              </div>

             

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Mobile No
                </label>
                <input
                  type="number"
                  defaultValue={userProfile?.mobile}
                  {...register("mobile", { required: "Mobile No is required", })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="Enter mobile number"
                />
                {errors.mobile && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors?.mobile?.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  defaultValue={userProfile?.address || '-'}
                  {...register("address", { required: true })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="Enter address"
                />
                {errors.details && (
                  <p className="text-red-500 text-xs mt-1">
                    This field is required
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Upload Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  {...register("image")}
                  className="w-full px-4 file:cursor-pointer border border-gray-300 rounded-lg text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 py-1 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Role
                </label>
                <input
                  type="text"
                  defaultValue={userProfile.role}
                  disabled
                  {...register("role", { required: "Role is required"})}
                  className="w-full px-4 py-2 border border-gray-300 cursor-not-allowed rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
                {errors.role&& (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.role.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 cursor-pointer text-gray-700 rounded-lg hover:bg-gray-300 text-sm font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 rounded-lg cursor-pointer text-sm font-medium transition-colors
    ${
      isSubmitting
        ? "bg-blue-400 cursor-not-allowed"
        : "bg-blue-600 hover:bg-blue-700 text-white"
    }`}
            >
              {isSubmitting ? "Editing..." : "Edit Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
