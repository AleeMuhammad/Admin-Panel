import React from "react";

const DeleteModal = ({ onClose, onDelete }) => {
  const handleDelete = async () => {
    await onDelete();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex shadow-2xl items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 sm:p-8 relative">
        <div className="flex flex-col space-y-4 justify-center items-center p-2">
          <p className="font-semibold text-xl">
            Are you sure you want to delete?{" "}
          </p>
          <div className="flex space-x-2">
            <button
              onClick={handleDelete}
              className="px-4 py-2 w-20 bg-red-500 cursor-pointer text-white rounded-lg hover:bg-red-600 text-sm font-medium transition-colors"
            >
              Delete
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 cursor-pointer text-gray-700 rounded-lg hover:bg-gray-300 text-sm font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
