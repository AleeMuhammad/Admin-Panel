import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const AddProductModal = ({
  onClose,
  onSubmitProduct,
  categoryName,
  id,
  productToEdit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    mode: "onChange",
  });

  useEffect(() => {
    if (productToEdit) {
      reset({
        name: productToEdit.name,
        description: productToEdit.description,
        category: productToEdit.id || id,
        price: productToEdit.price,
        details: productToEdit.details,
        oldPrice: productToEdit.oldPrice,
        // image: null, // file input ko empty rakho
      });
    } else {
      reset({
        name: "",
        description: "",
        category: id,
        price: "",
        details: "",
        oldPrice: "",
        image: null,
      });
    }
  }, [productToEdit, reset, id]);

  const onSubmit = async (data) => {
    await onSubmitProduct(data);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl p-6 sm:p-8 relative">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          {productToEdit ? "Edit Product" : "Add Product"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-5">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Product Name
                </label>
                <input
                  type="text"
                  {...register("name", {
                    required: "Product name is required",
                    minLength: {
                      value: 3,
                      message:
                        "Product name should be at least 3 characters long",
                    },
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="Enter product name"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors?.name?.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Product Description
                </label>
                <input
                  type="text"
                  {...register("description", {
                    required: "Product Description is required",
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="Enter product description"
                />
                {errors.description && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors?.description?.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Category Name
                </label>
                <select
                  {...register("category", { required: true })}
                  defaultValue={categoryName}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value={id}>{categoryName}</option>
                </select>
                {errors.category && (
                  <p className="text-red-500 text-xs mt-1">
                    This field is required
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Product Price
                </label>
                <input
                  type="number"
                  {...register("price", { required: true, min: 0 })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="Enter product price"
                />
                {errors.price && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.price.type === "required"
                      ? "This field is required"
                      : "Price must be a positive number"}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-5">
             {!productToEdit && (
               <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Product Details
                </label>
                <input
                  type="text"
                  {...register("details", { required: true })}
                  className="w-full px-4 py-2 border border-gray-300  rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="Enter product details"
                />
                {errors.details && (
                  <p className="text-red-500 text-xs mt-1">
                    This field is required
                  </p>
                )}
              </div>
             )}

             {!productToEdit && ( <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Upload Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  {...register("image", {
                    required: !productToEdit, // Add me required, Edit me optional
                  })}
                  className="w-full px-4  border border-gray-300 rounded-lg text-sm file:cursor-pointer text-gray-600 file:mr-4 file:py-2 file:px-4 py-1 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {errors.image && (
                  <p className="text-red-500 text-xs mt-1">
                    This field is required
                  </p>
                )}
              </div>)}

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Product Old Price
                </label>
                <input
                  type="number"
                  {...register("oldPrice", { required: true, min: 0 })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="Enter old price"
                />
                {errors.oldPrice && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.oldPrice.type === "required"
                      ? "This field is required"
                      : "Old price must be a positive number"}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 cursor-pointer text-white w-28 rounded-lg hover:bg-gray-700 text-sm font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 rounded-lg w-28 cursor-pointer text-sm font-medium transition-colors
    ${
      isSubmitting
        ? "bg-blue-400 cursor-not-allowed"
        : "bg-blue-600 hover:bg-blue-700 text-white"
    }`}
            >
              {productToEdit
                ? isSubmitting
                  ? "Editing..."
                  : "Edit Product"
                : isSubmitting
                ? "Adding..."
                : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
