import { Link, NavLink } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logoutuser } from "../redux/Authslice";
import icon from "../assets/Images/logo.png";
import { RxDashboard } from "react-icons/rx";
import { TbCategoryPlus, TbLogout2 } from "react-icons/tb";
import { FiUsers } from "react-icons/fi";
import { PiUserCircle } from "react-icons/pi";

const Sidebar = ({ isOpen, setIsOpen, isCollapsed }) => {
  const dispatch = useDispatch();
  const handlelogout = () => {
    dispatch(logoutuser());
  };
  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-30 md:hidden transition-opacity duration-300 ${
          isOpen ? "block" : "hidden"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40  h-full font-serif bg-white text-black border border-gray-300 flex flex-col
          md:translate-x-0 
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          ${isCollapsed ? "w-24" : "w-72"}
          `}
      >
        <div
          className={`flex items-center justify-center md:justify-between ${
            isCollapsed ? "mt-6 ml-2 w-full" : "p-6 md:p-8 "
          } space-x-4  border-gray-700`}
        >
          <Link className="flex items-center space-x-2" to={"/"}>
            <img
              src={icon}
              alt=""
              className={`object-contain ${isCollapsed ? "w-28" : "w-12 ml-6"} `}
            />
            <span
              className={`${
                isCollapsed ? "hidden" : "inline"
              } transition-all duration-300 text-lg`}
            >
              StoreAdmin
            </span>
          </Link>
          <FaTimes
            className="text-sm cursor-pointer md:hidden"
            onClick={() => {
              setIsOpen(false);
            }}
          />
        </div>

        <nav className={`flex-1 p-4 ${isCollapsed?'flex flex-col mt-5 items-center':''}  space-y-2`}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 text-md rounded-xl hover:bg-[#ecf3ff] ${
                isActive ? "bg-[#ecf3ff]" : ""
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            <RxDashboard className="text-[#687287]" size={20} />{" "}
            {!isCollapsed && <span>Dashboard</span>}
          </NavLink>

          <NavLink
            to="/categories"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 text-md rounded-xl hover:bg-[#ecf3ff] ${
                isActive ? "bg-[#ecf3ff]" : ""
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            <TbCategoryPlus className="text-[#687287]" size={20} />{" "}
            {!isCollapsed && <span> Categories</span>}
          </NavLink>

          <NavLink
            to="/users"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 text-md  rounded-xl hover:bg-[#ecf3ff] ${
                isActive ? "bg-[#ecf3ff]" : ""
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            <FiUsers className="text-[#687287]" size={20} />{" "}
            {!isCollapsed && <span>Users</span>}
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 text-md  rounded-xl hover:bg-[#ecf3ff] ${
                isActive ? "bg-[#ecf3ff]" : ""
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            <PiUserCircle className="text-[#687287] " size={20} />{" "}
            {!isCollapsed && <span>Profile</span>}
          </NavLink>

          <button onClick={handlelogout}>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 text-md  md:hidden rounded-xl hover:bg-[#ecf3ff] ${
                  isActive ? "bg-[#ecf3ff]" : ""
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              <TbLogout2 className="text-[#687287]" size={20} />{" "}
              {!isCollapsed && <span>Logout</span>}
            </NavLink>
          </button>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
