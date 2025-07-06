import React from 'react';
import { useForm } from 'react-hook-form';

const CategoryModal = ({ onClose, onSubmitCategory }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log('Submitted:', data);
    onSubmitCategory(data); // pass to parent
    onClose(); // close modal
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <h2 className="text-xl font-bold mb-4">Add Category</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Category Name</label>
            <input
              type="text"
              {...register('name', { required: true })}
              className="w-full px-4 py-3 border border-gray-300 rounded"
              placeholder="Enter category name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">This field is required</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              {...register('image', { required: true })}
              className="w-full border border-gray-300 px-4 py-2 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 file:rounded-lg file:px-2 file:py-2 rounded file:border-0 file:text-sm file:font-medium text-gray-600 file:mr-4"
            />
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">This field is required</p>
            )}
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 w-20 bg-gray-600 cursor-pointer text-white rounded hover:bg-gray-700"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 w-20 bg-blue-600 cursor-pointer text-white rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryModal;
