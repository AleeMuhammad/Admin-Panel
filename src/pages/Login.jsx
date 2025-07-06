import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginSessionOnly, loginuser } from "../redux/Authslice";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../redux/apiSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { BiChevronLeft } from "react-icons/bi";
import { persistor } from "../redux/Store";

const Login = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [login] = useLoginMutation();

  const onSubmit = async (data) => {
  try {
    const response = await login({
      email: data.email,
      password: data.password,
    }).unwrap();
    console.log(response);

    if (data.rememberme === false) {
      await persistor.purge();
      dispatch(loginSessionOnly(response)); 
    } else {
      dispatch(loginuser(response)); 
    }

    toast.success("Login Successful");
    navigate("/", { replace: true });

  } catch (error) {
    toast.error(error?.data?.message || "Login failed");
  }
};

  return (

    <div className="flex flex-col items-center justify-center h-screen font-serif">
      <ToastContainer/>
      <div className="w-full max-w-md mx-auto ">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 "
        >
          <BiChevronLeft className="size-5" />
          Back to dashboard
        </Link>
      </div>
      <div className="flex flex-col justify-center  mb-3 p-10 shadow-2xl bg-gray-300 rounded-2xl  w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 text-2xl font-outfit font-semibold text-gray-800   ">
              Sign In
            </h1>
            <p className="text-md text-gray-600 ">
              Enter your email and password to sign in!
            </p>
          </div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-6">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-black">
                    Email <span className="text-error-500">*</span>{" "}
                  </label>
                  <input
                    {...register("email", { required: "Email is required" })}
                    className="h-11 w-full rounded-lg border  border-gray-400 px-4 py-2.5 text-sm placeholder:text-gray-500 focus:outline-hidden   focus:ring-1 text-black   "
                    placeholder="info@gmail.com"
                  />
                  {errors.email && (
                    <span className="text-sm text-red-500">
                      {errors.email.message}
                    </span>
                  )}
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-black">
                    Password <span className="text-error-500">*</span>{" "}
                  </label>
                  <div className="relative">
                    <input
                      {...register("password", {
                        required: "Password is required",
                      })}
                      className="h-11 w-full rounded-lg border border-gray-400 px-4 py-2.5 text-sm placeholder:text-gray-500 focus:outline-hidden focus:ring-1 text-black"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <FaEye className="fill-gray-500 dark:fill-gray-400 size-5" />
                      ) : (
                        <FaEyeSlash className="fill-gray-500 dark:fill-gray-400 size-5" />
                      )}
                    </span>
                    {errors.password && (
                      <span className="text-sm text-red-500">
                        {errors.password.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      {...register("rememberme")}
                      className="w-5 h-5 rounded-3xl cursor-pointer dark:border-gray-700 border border-gray-300 "
                      type="checkbox"
                    />
                    <span className="block font-normal text-gray-700 text-theme-sm ">
                      Keep me logged in
                    </span>
                  </div>
                  {/* <Link
                    to="/reset-password"
                    className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                  >
                    Forgot password?
                  </Link> */}
                </div>
                <div>
                  <button className="w-full bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-300">
                    Sign in
                  </button>
                </div>
              </div>
            </form>

            {/* <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Don&apos;t have an account? {""}
                <Link
                  to="/signup"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Sign Up
                </Link>
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
