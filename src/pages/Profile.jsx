import React, { useState } from "react";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../redux/apiSlice";
import EditProfileModal from "../components/EditProfileModal";
import { toast, ToastContainer } from "react-toastify";
import { loginuser } from "../redux/Authslice";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { BsInstagram } from "react-icons/bs";
import { BiLogoInstagramAlt } from "react-icons/bi";

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const { data: Profile, isLoading, isError, error } = useGetProfileQuery();
  const [updateUser] = useUpdateProfileMutation();
  const userinfo = Profile;
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentuser);
  const token = useSelector((state) => state.user.token);

  const handleEditProfile = async (data) => {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("mobile", data.mobile);
    formData.append("address", data.address);
    formData.append("image", data.image[0]);
    formData.append("role", data.role);

    const response = await updateUser(formData);

    if (response?.error) {
      toast.error(response.error?.data?.message || response?.error?.status);
    } else {
      const updatedUser = {
        ...currentUser,
        username: data.username,
        email: data.email,
        mobile: data.mobile,
        address: data.address,
        role: data.role,
        image: data.image[0]
          ? URL.createObjectURL(data.image[0])
          : currentUser.image,
        token,
      };

      toast.success(response?.data?.message);
      dispatch(loginuser(updatedUser));
      setIsModalOpen(false);
      setUserProfile(null);
    }
  };

  return (
    <>
      <div className="p-6 mt-4">
        <ToastContainer />
        {isLoading ? (
          <div className="flex items-center justify-center min-h-[50vh]">
            <ClipLoader color="#011830" size={50} />
          </div>
        ) : isError ? (
          <p className="text-center text-red-600">
            {error?.data?.message ||
              error?.error ||
              "Something went wrong. Unable to fetch users"}
          </p>
        ) : (
          <div className="rounded-2xl border border-gray-200 bg-white p-5  lg:p-">
            <h3 className="mb-5 text-lg font-semibold text-gray-800  lg:mb-7">
              Profile
            </h3>
            <div className="space-y-6">
              <div className="p-5 border border-gray-200 rounded-2xl  lg:p-6">
                <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                  <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
                    <div className=" overflow-hidden border border-gray-200 rounded-full d">
                      <img
                        src={userinfo?.image}
                        className="w-20 h-20 object-cover"
                        alt="user"
                      />
                    </div>
                    <div className="order-3 xl:order-2">
                      <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 xl:text-left">
                        {userinfo?.username}
                      </h4>
                      {/* <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                        <p className="text-sm text-gray-500 ">Team Manager</p>
                        <div className="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>
                        <p className="text-sm text-gray-500 ">
                          Karachi, Pakistan
                        </p>
                      </div> */}
                    </div>
                    <div className="flex items-center order-2 gap-2 grow xl:order-3 xl:justify-end">
                      <Link className="flex h-11 w-11 items-center justify-center gap-2 rounded-full border border-gray-300 bg-white text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 ">
                        <FaFacebook size={20} />
                      </Link>

                      <Link className="flex h-11 w-11 items-center justify-center gap-2 rounded-full border border-gray-300 bg-white text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 ">
                        <FaLinkedin size={20} />
                      </Link>

                      <Link className="flex h-11 w-11 items-center justify-center gap-2 rounded-full border border-gray-300 bg-white text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 ">
                        <FaGithub size={20} />
                      </Link>

                      <Link className="flex h-11 w-11 items-center justify-center gap-2 rounded-full border border-gray-300 bg-white text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 ">
                        <BiLogoInstagramAlt size={20} />
                      </Link>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setIsModalOpen(true);
                      setUserProfile(userinfo);
                    }}
                    className="flex w-full items-center justify-center gap-2 cursor-pointer rounded-full border border-gray-300 bg-white px-4 py-3 text-md font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800  lg:inline-flex lg:w-auto"
                  >
                    <MdOutlineModeEditOutline size={20} />
                    Edit
                  </button>
                </div>
              </div>
            </div>
            <div className="p-5 mt-7 border border-gray-200 rounded-2xl lg:p-6">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 lg:mb-6">
                    Personal Information
                  </h4>

                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
                    <div>
                      <p className="mb-2 text-xs leading-normal text-gray-500 ">
                        Name
                      </p>
                      <p className="text-sm font-medium text-gray-800 ">
                        {userinfo?.username}
                      </p>
                    </div>

                    <div>
                      <p className="mb-2 text-xs leading-normal text-gray-500 ">
                        Role
                      </p>
                      <p className="text-sm font-medium text-gray-800 ">
                        {userinfo?.role}
                      </p>
                    </div>

                    <div>
                      <p className="mb-2 text-xs leading-normal text-gray-500 ">
                        Email address
                      </p>
                      <p className="text-sm font-medium text-gray-800 ">
                        {userinfo?.email}
                      </p>
                    </div>

                    <div>
                      <p className="mb-2 text-xs leading-normal text-gray-500 ">
                        Phone
                      </p>
                      <p className="text-sm font-medium text-gray-800 ">
                        {userinfo?.mobile}
                      </p>
                    </div>

                    <div>
                      <p className="mb-2 text-xs leading-normal text-gray-500 ">
                        Address
                      </p>
                      <p className="text-sm font-medium text-gray-800 ">
                        {userinfo?.address}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {isModalOpen && (
          <EditProfileModal
            onClose={() => {
              setIsModalOpen(false);
              setUserProfile(null);
            }}
            userProfile={userProfile}
            onSubmitProfile={handleEditProfile}
          />
        )}
      </div>
    </>
  );
};

export default Profile;
