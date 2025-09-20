import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { FaTags } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import AddProductModal from "../../components/AddProductModal";
import DeleteModal from "../../components/DeleteModal";
import {
  useAddProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
  useUpdateProductMutation,
} from "../../redux/apiSlice";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

const CategoriesDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const categoryName = location.state?.categoryName || "";

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);

  const productsPerPage = 10;
  const offset = (currentPage - 1) * productsPerPage;

  const {
    data: Products,
    isLoading,
    isError,
  } = useGetProductsQuery({
    id,
    limit: productsPerPage,
    offset,
  });

  const [addProduct] = useAddProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const handleDelete = async (prodId) => {
    try {
      const response = await deleteProduct(prodId);
      toast.success(response?.data?.message || "Deleted successfully");
      setIsDeleteModalOpen(false);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete");
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    // setCurrentPage(1);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setCurrentPage(1);
  };

  const filteredProducts =
    Products?.data?.filter((prod) =>
      prod?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const totalPages = Products?.totalPages || 1;

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handleSelectChange = (e) => {
    setCurrentPage(Number(e.target.value));
  };

  const handleModal = () => {
    setIsModalOpen(true);
  };

  // const handleProductSubmit = async (data) => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("name", data.name);
  //     formData.append("description", data.description);
  //     formData.append("categoryId", data.category);
  //     formData.append("price", data.price);
  //     formData.append("details", data.details);
  //     if (data.image && data.image[0]) {
  //       formData.append("image", data.image[0]);
  //     }
  //     formData.append("oldPrice", data.oldPrice);

  //     let response;
  //     if (productToEdit) {
  //       response = await updateProduct({
  //         id: productToEdit._id,
  //         updatedProduct: formData,
  //       });
  //       toast.success(response?.data?.message || "Updated successfully");
  //       setProductToEdit(null);
  //     } else {
  //       response = await addProduct(formData);
  //       toast.success(response?.data?.message || "Added successfully");
  //     }
  //     setIsModalOpen(false);
  //   } catch (error) {
  //     toast.error("Failed to save product");
  //   }
  // };

  const handleProductSubmit = async (data) => {
  try {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("categoryId", data.category);
    formData.append("price", data.price);
    formData.append("details", data.details);
    formData.append("oldPrice", data.oldPrice);
    // formData.append("keywords",JSON.stringify(data.keywords));

    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]); 
    } else if (productToEdit?.image) {
      formData.append("image", productToEdit.image); 
    }

    let response;
    if (productToEdit) {
      response = await updateProduct({
        id: productToEdit._id,
        updatedProduct: formData,
      });
      toast.success(response?.data?.message || "Updated successfully");
      setProductToEdit(null);
    } else {
      response = await addProduct(formData);
      toast.success(response?.data?.message || "Added successfully");
    }

    setIsModalOpen(false);
  } catch (error) {
    toast.error("Failed to save product");
  }
};


  return (
    <div className="mt-4 min-h-screen">
      <ToastContainer />
      <div className="mb-5 flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
        <div className="flex w-full md:w-[24rem] border rounded px-2 py-1 items-center">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search Products"
            className="flex-grow px-3 py-1 outline-none"
          />
          {searchTerm && (
            <button
              onClick={handleClearSearch}
              className="text-[#011830] cursor-pointer p-1"
            >
              <RxCross2 size={20} />
            </button>
          )}
        </div>

        <button
          className="px-4 py-2 bg-blue-600 cursor-pointer text-white rounded hover:bg-blue-700 w-full sm:w-40"
          onClick={handleModal}
        >
          Add Product
        </button>
      </div>

      {isModalOpen && (
        <AddProductModal
          onClose={() => {
            setIsModalOpen(false);
            setProductToEdit(null);
          }}
          onSubmitProduct={handleProductSubmit}
          categoryName={categoryName}
          id={id}
          productToEdit={productToEdit}
        />
      )}

      {isLoading ? (
        <div className="flex items-center justify-center min-h-[50vh]">
          <ClipLoader color="#011830" size={50} />
        </div>
      ) : isError ? (
        <p className="text-center text-red-600">{"Something went wrong"}</p>
      ) : !filteredProducts?.length ? (
        <div className="text-center text-gray-600">No Product Found</div>
      ) : (
        <>
          <div>
            <div className="rounded-2xl border border-gray-200 bg-white">
              <div className="px-6 py-5">
                <h3 className="text-lg font-medium text-gray-800">
                  Products Table: Category {categoryName}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  List of all available products
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Total Products : {Products?.count}
                </p>
              </div>

              <div className="border-t border-gray-100 p-6">
                <div className="overflow-x-auto w-full rounded-xl border border-gray-200 bg-white">
                  <div className="min-w-[900px] w-full text-center">
                    <table className="w-full">
                      <thead className="border-b-2 border-gray-100">
                        <tr>
                          <td className="px-4 py-3 font-medium text-gray-500">
                            Image
                          </td>
                          <td className="px-4 py-3 font-medium text-gray-500">
                            Name
                          </td>
                          <td className="px-4 py-3 font-medium text-gray-500">
                            Description
                          </td>
                          <td className="px-4 py-3 font-medium text-gray-500">
                            Details
                          </td>
                          <td className="px-4 py-3 font-medium text-gray-500">
                            Price
                          </td>
                          <td className="px-4 py-3 font-medium text-gray-500">
                            Actions
                          </td>
                        </tr>
                      </thead>

                      <tbody className="divide-y-2 divide-gray-100">
                        {filteredProducts.map((prod) => (
                          <tr key={prod?._id}>
                            <td className="px-4 py-4 flex justify-center ">
                              <img
                                src={
                                  prod?.image ||
                                  `https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541`
                                }
                                alt={prod?.name || "Product"}
                                className="w-16 h-16 object-contain rounded-full"
                              />
                            </td>
                            <td className="px-4 py-3 text-gray-500">
                              {prod?.name || "N/A"}
                            </td>
                            <td className="px-4 py-3 text-gray-500">
                              {prod?.description || "N/A"}
                            </td>
                            <td className="px-4 py-3 text-gray-500">
                              {prod?.details || "N/A"}
                            </td>
                            <td className="px-5 py-3 text-gray-500 max-w-xs truncate">
                              <div className="flex flex-col items-center space-y-1">
                                {prod?.oldPrice && (
                                  <div className="flex items-center space-x-2 text-red-500 text-sm">
                                    <FaTags />
                                    <span className="line-through">
                                      {prod.oldPrice || "0"}
                                    </span>
                                  </div>
                                )}
                                <span className="text-[#011830] font-semibold">
                                  {prod?.price || "0"}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-3 space-y-2 xl:space-y-1">
                              <button
                                onClick={() => {
                                  setProductToEdit(prod);
                                  setIsModalOpen(true);
                                }}
                                className="px-2 py-2 text-[#798295] hover:text-gray-500 cursor-pointer"
                              >
                                <MdOutlineModeEditOutline size={20} />
                              </button>
                              <button
                                onClick={() => {
                                  setIsDeleteModalOpen(true);
                                  setProductToDelete(prod._id);
                                }}
                                className="py-2 text-[#798295] hover:text-red-600 cursor-pointer"
                              >
                                <RiDeleteBin6Line size={20} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex flex-col sm:flex-row items-center md:justify-end gap-4">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-[#011830] w-24 text-white rounded disabled:bg-gray-400"
            >
              Previous
            </button>
            <select
              value={currentPage}
              onChange={handleSelectChange}
              className="px-4 py-2 border rounded"
            >
              {Array.from({ length: totalPages }, (_, index) => (
                <option key={index + 1} value={index + 1}>
                  Page {index + 1}
                </option>
              ))}
            </select>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-[#011830] w-24 text-white rounded disabled:bg-gray-400"
            >
              Next
            </button>
          </div>

          {isDeleteModalOpen && (
            <DeleteModal
              onClose={() => {
                setIsDeleteModalOpen(false);
                setProductToDelete(null);
              }}
              onDelete={() => handleDelete(productToDelete)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default CategoriesDetails;
