import React, { useState } from "react";
import {  FaBars, FaChevronDown,FaUser,FaSignOutAlt} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutuser } from "../redux/Authslice";
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import { TbLogout2 } from "react-icons/tb";
import { PiUserCircle } from "react-icons/pi";

const Dropdown = ({ isOpen, onClose, children, className }) => {
  if (!isOpen) return null;
  return (
    <div className={`absolute z-10 ${className}`} onClick={onClose}>
      {children}
    </div>
  );
};

const DropdownItem = ({
  onItemClick,
  to,
  children,
  className,
  tag: Tag = "div",
}) => (
  <Tag
    to={to}
    onClick={onItemClick}
    className={`flex items-center gap-3 px-3 py-2 font-medium rounded-lg group text-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300 ${className}`}
  >
    {children}
  </Tag>
);

const Header = ({ setIsSidebarOpen, setIsCollapsed }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handlelogout = () => {
    dispatch(logoutuser());
    navigate("/login", { replace: true });
    setIsOpen(false);
  };

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const closeDropdown = () => setIsOpen(false);

  return (
    <>
      <div
        className={`fixed inset-0 duration-300 ${
          isOpen ? "block" : "hidden"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>
      <header className="flex justify-between items-center px-6 py-[13px] bg-white border border-gray-300">
        <div className="flex items-center gap-4">
          <FaBars
            className="text-gray-600 text-xl cursor-pointer md:hidden"
            onClick={() => {
              setIsSidebarOpen(true);
              setIsCollapsed(false);
            }}
          />
          <div
            onClick={() => setIsCollapsed((prev) => !prev)}
            className="bg-white border border-gray-300 rounded-lg hidden md:block p-3 cursor-pointer"
          >
            <HiMiniBars3CenterLeft size={20} className="text-gray-400" />
          </div>
        </div>
        <div className="relative  flex items-center gap-4">
          <button
            onClick={toggleDropdown}
            className="flex items-center cursor-pointer text-gray-700 "
          >
            <img
              src={
                user?.currentuser.image ||
                `https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541`
              }
              alt={user?.username || "User Profile"}
              className="w-10 h-10 object-cover rounded-full mr-3"
            />
            <span className="block mr-1 font-medium text-sm">
              {user?.currentuser.username || "User"}
            </span>
            <FaChevronDown
              className={`text-gray-500  transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
              size={13}
            />
          </button>
          {user.isAuthenticated && (
            <Dropdown
              isOpen={isOpen}
              onClose={closeDropdown}
              className="absolute right-0 top-[57px] w-[260px] flex flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-lg "
            >
              <div>
                <span className="block font-medium text-sm text-gray-700 ">
                  {user?.currentuser.username || "User Name"}
                </span>
                <span className="mt-0.5 block text-xs text-gray-500 ">
                  {user?.currentuser.email || "user@example.com"}
                </span>
              </div>
              <ul className="flex gap-1 mt-2 text-gray-700 rounded-lg hover:bg-gray-100 hover:text-gray-700 border-gray-200 ">
                <li>
                  <DropdownItem
                    onItemClick={closeDropdown}
                    tag={Link}
                    to="/profile"
                  >
                    <PiUserCircle
                      className="text-gray-500 group-hover:text-gray-700 "
                      size={24}
                    />
                   <span className="text-gray-700">Edit profile</span> 
                  </DropdownItem>
                </li>
              </ul>
              <button
                onClick={handlelogout}
                className="flex items-center gap-3 px-3 py-2 mt-1 cursor-pointer font-medium text-gray-700 rounded-lg group text-sm hover:bg-gray-100 hover:text-gray-700 "
              >
                <TbLogout2
                  className="text-gray-500 group-hover:text-gray-700 "
                  size={24}
                />
                Sign out
              </button>
            </Dropdown>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
