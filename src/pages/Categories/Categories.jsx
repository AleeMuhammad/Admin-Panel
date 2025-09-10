import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import CategoryModal from "../../components/CategoryModal";
import { toast, ToastContainer } from "react-toastify";
import { Link, useSearchParams } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import {
  useAddCategoryMutation,
  useGetCategoryQuery,
} from "../../redux/apiSlice";

const Categories = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = parseInt(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categoriesPerPage = 10;
  const offset = (currentPage - 1) * categoriesPerPage;

  const { data: categories, isLoading, error, isError } = useGetCategoryQuery({
    limit: categoriesPerPage,
    offset,
  });

  const [addCategory] = useAddCategoryMutation();

  const HandleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredCategories =
    categories?.data?.filter((cat) =>
      cat?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const totalPages = categories?.totalPages || 1;

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSearchParams({ page }); 
  };

  const handlePrev = () => {
    if (currentPage > 1) handlePageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) handlePageChange(currentPage + 1);
  };

  const handleSelectChange = (e) => {
    handlePageChange(Number(e.target.value));
  };

  const handleModal = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleCategorySubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("image", data.image[0]);
    const response = await addCategory(formData);
    if (response?.error) {
      toast.error(response?.error?.data?.message);
    } else {
      toast.success(response?.data?.message);
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <div className="mt-4 md:space-x-2 flex flex-col sm:flex-row items-center">
        <ToastContainer />
        <div className="flex w-full md:w-[24rem] relative">
          <input
            type="text"
            placeholder="Search by Category"
            value={searchTerm}
            onChange={HandleSearchChange}
            className="px-4 py-2 border rounded w-full pr-8"
          />
          {searchTerm && (
            <RxCross2
              onClick={() => setSearchTerm("")}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#011830] cursor-pointer"
              size={20}
            />
          )}
        </div>

        <div className="w-full flex">
          <button
            onClick={handleModal}
            className="px-4 py-2 w-full sm:w-36 mt-3 cursor-pointer sm:mt-0 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add Category
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center min-h-[50vh]">
          <ClipLoader color="#011830" size={50} />
        </div>
      ) : isError ? (
        <p className="text-center text-red-600">
          {error?.data?.message ||
            error?.error ||
            "Something went wrong. Unable to fetch Categories"}
        </p>
      ) : filteredCategories.length === 0 ? (
        <p className="text-center mt-10 text-[#011830]">No categories found.</p>
      ) : (
        <>
          <div className="mt-6 max-w-4xl">
            <div className="rounded-2xl border border-gray-200 bg-white">
              {/* Card Header */}
              <div className="px-6 py-5">
                <h3 className="text-lg font-medium text-gray-800">
                  Categories Table
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  List of all available categories
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Total Categories: {categories.count}
                </p>
              </div>

              <div className="border-t border-gray-100 p-6">
                <div className="space-y-6">
                  <div className="overflow-x-auto w-full rounded-xl border border-gray-200 bg-white">
                    <div className="min-w-[600px] w-full text-center">
                      <table className="w-full">
                        <thead className="border-b-2 border-gray-100">
                          <tr>
                            <td className="px-5 py-3 font-medium text-gray-500">
                              Image
                            </td>
                            <td className="px-5 py-3 font-medium text-gray-500">
                              Name
                            </td>
                          </tr>
                        </thead>

                        <tbody className="divide-y-2 divide-gray-100">
                          {filteredCategories.map((cat) => (
                            <tr key={cat.categoryId}>
                              <td className="px-5 py-4 sm:px-6 flex justify-center items-center">
                                <img
                                  className="w-16 h-16 object-cover rounded"
                                  src={cat.image}
                                  alt={cat.name}
                                />
                              </td>
                              <td className="px-4 py-3 text-gray-500">
                                <Link
                                  to={`/categories/${cat.categoryId}?page=${currentPage}`}
                                  state={{ categoryName: cat.name }}
                                >
                                  {cat.name}
                                </Link>
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
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-start mt-6 gap-4">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-[#011830] w-24 cursor-pointer text-white rounded disabled:bg-gray-400"
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
              className="px-4 py-2 bg-[#011830] w-24 cursor-pointer text-white rounded disabled:bg-gray-400"
            >
              Next
            </button>
          </div>

          {isModalOpen && (
            <CategoryModal
              onClose={handleModalClose}
              onSubmitCategory={handleCategorySubmit}
            />
          )}
        </>
      )}
    </>
  );
};

export default Categories;
