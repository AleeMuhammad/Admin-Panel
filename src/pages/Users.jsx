import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import { RxCross2 } from "react-icons/rx";
import DeleteModal from "../components/DeleteModal";
import { useDeleteUserMutation, useGetUsersQuery } from "../redux/apiSlice";
import { RiDeleteBin6Line } from "react-icons/ri";

const Users = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState("username");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userId, setUserId] = useState(null);

  const usersPerPage = 10;
  const offset = (currentPage - 1) * usersPerPage;

  const { data: users, isLoading, isError, error } = useGetUsersQuery({
    limit: usersPerPage,
    offset,
  });
  const [deleteUser] = useDeleteUserMutation();

  const handleDelete = async (id) => {
    if (!id) return;
    const response = await deleteUser(id);
    if (response?.error) {
      toast.error(response?.error?.data?.message);
    } else {
      toast.success(response?.data?.message);
    }
    setIsDeleteModalOpen(false);
    setUserId(null);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (field) => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const filteredUsers =
    users?.data?.filter((user) => {
      const q = searchQuery.toLowerCase();
      return (
        user?.username?.toLowerCase().includes(q) ||
        user?.email?.toLowerCase().includes(q)
      );
    }) || [];

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const valA = a?.[sortField]?.toString()?.toLowerCase() || "";
    const valB = b?.[sortField]?.toString()?.toLowerCase() || "";

    return sortOrder === "asc"
      ? valA.localeCompare(valB)
      : valB.localeCompare(valA);
  });

  const totalPages = Math.ceil((users?.count || 0) / usersPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handleSelectChange = (e) => {
    setCurrentPage(Number(e.target.value));
  };

  return (
    <div className="mt-4">
      <ToastContainer />

      <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-4 mb-6">
        <div className="flex w-full sm:w-[24rem] relative">
          <input
            type="text"
            placeholder="Search by username or email"
            value={searchQuery}
            onChange={handleSearchChange}
            className="px-4 py-2 border rounded w-full pr-8"
          />
          {searchQuery && (
            <RxCross2
              onClick={() => setSearchQuery("")}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#011830] cursor-pointer"
              size={20}
            />
          )}
        </div>

        <div className="flex items-center space-x-2">
          <span className="font-medium text-gray-500">Sort by:</span>
          <button
            onClick={() => handleSortChange("username")}
            className={`px-3 py-1 border w-32 rounded ${
              sortField === "username"
                ? "bg-[#011830] text-white"
                : "bg-white text-gray-500"
            }`}
          >
            Username {sortField === "username" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
          </button>
          <button
            onClick={() => handleSortChange("role")}
            className={`px-3 py-1 border w-32 rounded ${
              sortField === "role"
                ? "bg-[#011830] text-white"
                : "bg-white text-gray-500"
            }`}
          >
            Role {sortField === "role" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center min-h-[50vh]">
          <ClipLoader color="#011830" size={50} />
        </div>
      ) : isError ? (
        <p className="text-center text-red-600">
          {error?.data?.message || error?.error || "Something went wrong."}
        </p>
      ) : sortedUsers.length === 0 ? (
        <p className="text-center mt-10 text-[#011830]">No users found.</p>
      ) : (
        <>
          <div className="rounded-2xl border border-gray-200 bg-white">
            <div className="px-6 py-5">
              <h3 className="text-lg font-medium text-gray-800">Users Table</h3>
              <p className="mt-1 text-sm text-gray-500">
                List of all available users
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Total Users: {users?.count}
              </p>
            </div>

            <div className="border-t border-gray-100 p-6">
              <div className="overflow-x-auto w-full rounded-xl border border-gray-200">
                <table className="w-full min-w-[900px] text-center">
                  <thead className="border-b-2 border-gray-100">
                    <tr>
                      <td className="px-4 py-3 font-medium text-gray-500">Image</td>
                      <td className="px-4 py-3 font-medium text-gray-500">Username</td>
                      <td className="px-4 py-3 font-medium text-gray-500">Email</td>
                      <td className="px-4 py-3 font-medium text-gray-500">Mobile</td>
                      <td className="px-4 py-3 font-medium text-gray-500">Address</td>
                      <td className="px-4 py-3 font-medium text-gray-500">Role</td>
                      <td className="px-4 py-3 font-medium text-gray-500">Actions</td>
                    </tr>
                  </thead>
                  <tbody className="divide-y-2 divide-gray-100">
                    {sortedUsers.map((user) => (
                      <tr key={user?._id}>
                        <td className="px-4 py-4">
                          <img
                            src={
                              user?.image ||
                              "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                            }
                            alt={user?.username || "User"}
                            className="w-12 h-12 object-cover rounded-full"
                          />
                        </td>
                        <td className="px-4 py-3 text-gray-500">{user?.username || "N/A"}</td>
                        <td className="px-4 py-3 text-gray-500">{user?.email || "N/A"}</td>
                        <td className="px-4 py-3 text-gray-500">{user?.mobile || "N/A"}</td>
                        <td className="px-4 py-3 text-gray-500 truncate">{user?.address || "N/A"}</td>
                        <td className="px-4 py-3 text-gray-500 capitalize">{user?.role || "N/A"}</td>
                        <td className="px-4 py-3 text-gray-500">
                          <button
                            onClick={() => {
                              setIsDeleteModalOpen(true);
                              setUserId(user?._id);
                            }}
                            className="px-4 py-2 hover:text-red-600 transition"
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
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
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
        </>
      )}

      {isDeleteModalOpen && (
        <DeleteModal
          onClose={() => {
            setIsDeleteModalOpen(false);
            setUserId(null);
          }}
          onDelete={() => handleDelete(userId)}
        />
      )}
    </div>
  );
};

export default Users;
