import React from "react";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white space-y-6 flex h-48 mt-10 flex-col justify-center items-center text-center py-4 border-t border-gray-300 text-gray-600 text-sm">
      <div className="flex justify-center flex-wrap items-center space-x-5 sm:space-x-20">
        <Link to={"/"}>DashBoard</Link>
        <Link to={"/categories"}>Category</Link> 
        <Link to={"/users"}>Users</Link>
        <Link to={"/profile"}>Profile</Link> 
      </div>
      <div className="flex space-x-14 items-center">
        <FaFacebook  size={24}/>
        <FaLinkedin size={24}/>
        <FaGithub size={24}/>
      </div>
      <div>
      © {new Date().getFullYear()} Zain General Store Admin Panel. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
