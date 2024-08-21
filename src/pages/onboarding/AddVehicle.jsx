import React, { useContext } from "react";
import {
  FaApple,
  FaArrowLeft,
  FaArrowRight,
  FaFacebook,
  FaFacebookF,
} from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { TiUserAddOutline } from "react-icons/ti";
import { AppContext } from "../../context/AppContext";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import authentication from "../../api/authenticationInterceptor";
import { useState } from "react";
import Error from "../../components/app/global/Error";
import axios from "axios";
import { signupSchema } from "../../schema/signupSchema";
import { signupValues } from "../../data/authentication";
import { Link } from "react-router-dom";
import { ImProfile } from "react-icons/im";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { GoPlus } from "react-icons/go";
import { IoIosArrowRoundForward } from "react-icons/io";

const AddVehicle = () => {
  const { navigate, error, setError } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: signupValues,
      validationSchema: signupSchema,
      validateOnChange: true,
      validateOnBlur: false,

      onSubmit: async (values, action) => {
        setLoading(true);
        // try {
        //   // API call to login using Axios interceptor
        //   const response = await authentication.post("/auth/brokerSignIn", {
        //     email: values.email,
        //     password: values.password,
        //   });

        //   if (response?.status == 200 && response?.data?.token !== null) {
        //     localStorage.setItem("token", response?.data?.token);
        //     localStorage.setItem(
        //       "broker",
        //       JSON.stringify(response?.data?.data)
        //     );
        //     navigate("Home", "/home");
        //   }
        // } catch (error) {
        //   console.log(error);
        //   // Handle errors (e.g., show error message)
        //   setError(error?.response?.data?.message);
        // } finally {
        //   // console.error("Login failed:", error.response?.data);
        //   setLoading(false);
        // }
        setTimeout(() => {
          navigate("Verify Email Otp", "verify-otp-email");
          setLoading(false);
        }, 2000);
      },
    });
  return (
    <section class="bg-white ">
      <div class="flex justify-center min-h-screen">
        <div class="hidden  h-screen lg:flex justify-center items-center bg-cover  lg:w-2/5">
          <div class="w-full h-full  flex items-center justify-center animate one text-4xl font-bold text-[#c00000]">
            <img
              src="https://fareshare.vercel.app/assets/fareshare_logo-15fzbzBE.svg"
              alt=""
              className="w-[70%]"
            />
          </div>
        </div>

        <div class="flex items-center  w-full max-w-3xl p-6 mx-auto lg:px-12 lg:w-3/5">
          <div class="w-full">
            <Error error={error} setError={setError} />

            <div className="w-full flex justify-center items-center">
              <Link
                to={"/complete-profile"}
                className="w-10 h-10 mr-auto rounded-full flex justify-center items-center text-md bg-[#c00000] text-white"
              >
                <FaArrowLeft />
              </Link>
              <h1 class="text-[17px] mr-auto lg:text-[24px] font-semibold text-center tracking-tight text-gray-800 capitalize ">
                Add Vehicle{" "}
              </h1>
            </div>

            <form
              onSubmit={handleSubmit}
              class="w-full flex flex-col gap-6 mt-8 "
            >
              <div className="w-full flex flex-col  gap-4 ">
                <div className="w-full flex flex-col gap-1 justify-center items-center">
                  <button
                    type="button"
                    onClick={() =>
                      navigate("Upload Images", "/upload-vehicle-images")
                    }
                    className="w-full h-[136px] rounded-2xl bg-gray-50 border border-gray-200 text-[#c00000] flex gap-1 flex-col justify-center items-center text-2xl font-medium"
                  >
                    <GoPlus />
                    <div className="w-auto flex justify-center items-center gap-1">
                      <span className="text-xs  text-[#000] font-semibold">
                        Upload Vehicle Images
                      </span>
                      <IoIosArrowRoundForward className="text-md text-black" />
                    </div>
                  </button>
                </div>

                <div>
                  <label class="block mb-1 text-sm text-gray-500 font-medium ml-1 ">
                    Make
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Toyotta"
                    class={`block w-full px-5 py-3 bg-gray-50  text-gray-700 placeholder-gray-400  border border-gray-200 rounded-2xl   focus:border-[#c00000]  focus:ring-[#c00000] focus:outline-none focus:ring focus:ring-opacity-40 transition-colors duration-300 ${
                      errors.email && touched.email
                        ? "border-red-600 shake"
                        : null
                    }`}
                  />
                  {errors.email && touched.email ? (
                    <p className="text-red-700 text-sm font-medium">
                      {errors.email}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label class="block mb-1 text-sm text-gray-500 font-medium ml-1 ">
                    Name
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="John Doe"
                    class={`block w-full px-5 py-3  text-gray-700 placeholder-gray-400 bg-gray-50 border border-gray-200 rounded-2xl   focus:border-[#c00000]  focus:ring-[#c00000] focus:outline-none focus:ring focus:ring-opacity-40 transition-colors duration-300 ${
                      errors.email && touched.email
                        ? "border-red-600 shake"
                        : null
                    }`}
                  />
                  {errors.email && touched.email ? (
                    <p className="text-red-700 text-sm font-medium">
                      {errors.email}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label class="block mb-1 text-sm text-gray-500 font-medium ml-1 ">
                    Model/Year
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Corolla/2024"
                    class={`block w-full px-5 py-3  text-gray-700 placeholder-gray-400 bg-gray-50 border border-gray-200 rounded-2xl   focus:border-[#c00000]  focus:ring-[#c00000] focus:outline-none focus:ring focus:ring-opacity-40 transition-colors duration-300 ${
                      errors.email && touched.email
                        ? "border-red-600 shake"
                        : null
                    }`}
                  />
                  {errors.email && touched.email ? (
                    <p className="text-red-700 text-sm font-medium">
                      {errors.email}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label class="block mb-1 text-sm text-gray-500 font-medium ml-1 ">
                    Plate Number
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="XXX-XXXX"
                    class={`block w-full px-5 py-3  text-gray-700 placeholder-gray-400 bg-gray-50 border border-gray-200 rounded-2xl   focus:border-[#c00000]  focus:ring-[#c00000] focus:outline-none focus:ring focus:ring-opacity-40 transition-colors duration-300 ${
                      errors.email && touched.email
                        ? "border-red-600 shake"
                        : null
                    }`}
                  />
                  {errors.email && touched.email ? (
                    <p className="text-red-700 text-sm font-medium">
                      {errors.email}
                    </p>
                  ) : null}
                </div>

                <div class="flex items-center">
                  <input
                    id="checked-checkbox"
                    type="checkbox"
                    value=""
                    class="w-3 h-3 text-[#c00000] bg-gray-100 border-gray-300 rounded focus:ring-[#c00000] accent-[#c00000]  focus:ring-2"
                  />
                  <label
                    htmlFor="checked-checkbox"
                    class="ms-2 text-xs my-2 font-medium text-gray-600 "
                  >
                    Is this Wheel Chair Accessible ?
                  </label>
                </div>
                <div className="w-full grid grid-cols-2 gap-2">
                  <div className="h-[139px] rounded-2xl border border-gray-200 bg-gray-50 p-3 w-full flex flex-col gap-2 justify-center items-center">
                    <div className="w-full flex items-center justify-center gap-1">
                      <span className="w-6 h-6 rounded-full bg-[#c00000] text-white flex items-center justify-center text-xs">
                        <ImProfile />
                      </span>
                      <span className="text-[13.5px] font-bold text-black">
                        Driver's License
                      </span>
                    </div>
                    <span className="text-[12px] font-[510] text-black">
                      Front
                    </span>

                    <div className="w-full flex items-center justify-center gap-2 text-black">
                      <AiOutlinePlusCircle />
                      <span className="text-[12px] underline underline-offset-2 font-bold text-black">
                        Add Documents
                      </span>
                    </div>
                  </div>
                  <div className="h-[139px] rounded-2xl border  border-gray-200 bg-gray-50 p-3 w-full flex flex-col gap-2 justify-center items-center">
                    <div className="w-full flex items-center justify-center gap-1">
                      <span className="w-6 h-6 rounded-full bg-[#c00000] text-white flex items-center justify-center text-xs">
                        <ImProfile />
                      </span>
                      <span className="text-[13.5px] font-bold text-black">
                        Driver's License
                      </span>
                    </div>
                    <span className="text-[12px] font-[510] text-black">
                      Back
                    </span>

                    <div className="w-full flex items-center justify-center gap-2 text-black">
                      <AiOutlinePlusCircle />
                      <span className="text-[12px] underline underline-offset-2 font-bold text-black">
                        Add Documents
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <label class="block mb-1 text-sm text-gray-500 font-medium ml-1 ">
                    Expiration Date
                  </label>
                  <input
                    type="date"
                    id="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="johnsnow@example.com"
                    class={`block w-full px-5 py-3  text-gray-700 placeholder-gray-400 bg-gray-50 border border-gray-200 rounded-2xl   focus:border-[#c00000]  focus:ring-[#c00000] focus:outline-none focus:ring focus:ring-opacity-40 transition-colors duration-300 ${
                      errors.email && touched.email
                        ? "border-red-600 shake"
                        : null
                    }`}
                  />
                  {errors.email && touched.email ? (
                    <p className="text-red-700 text-sm font-medium">
                      {errors.email}
                    </p>
                  ) : null}
                </div>

                <div className="h-[139px] bg-gray-50 rounded-2xl border border-gray-200 p-3 w-full flex flex-col gap-2 justify-center items-center">
                  <div className="w-full flex items-center justify-center gap-1">
                    <span className="w-6 h-6 rounded-full bg-[#c00000] text-white flex items-center justify-center text-xs">
                      <ImProfile />
                    </span>
                    <span className="text-[13.5px] font-bold text-black">
                      Proof Insurance
                    </span>
                  </div>
                  <span className="text-[12px] font-[510] text-black">
                    Upload proof insurance
                  </span>

                  <div className="w-full flex items-center justify-center gap-2 text-black">
                    <AiOutlinePlusCircle />
                    <span className="text-[12px] underline underline-offset-2 font-bold text-black">
                      Add Documents
                    </span>
                  </div>
                </div>

                <div>
                  <label class="block mb-1 text-sm text-gray-500 font-medium ml-1 ">
                    Expiration Date
                  </label>
                  <input
                    type="date"
                    id="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="johnsnow@example.com"
                    class={`block w-full px-5 py-3  text-gray-700 placeholder-gray-400 bg-gray-50 border border-gray-200 rounded-2xl   focus:border-[#c00000]  focus:ring-[#c00000] focus:outline-none focus:ring focus:ring-opacity-40 transition-colors duration-300 ${
                      errors.email && touched.email
                        ? "border-red-600 shake"
                        : null
                    }`}
                  />
                  {errors.email && touched.email ? (
                    <p className="text-red-700 text-sm font-medium">
                      {errors.email}
                    </p>
                  ) : null}
                </div>

                <div className="h-[139px] rounded-2xl bg-gray-50 border border-gray-200 p-3 w-full flex flex-col gap-2 justify-center items-center">
                  <div className="w-full flex items-center justify-center gap-1">
                    <span className="w-6 h-6 rounded-full bg-[#c00000] text-white flex items-center justify-center text-xs">
                      <ImProfile />
                    </span>
                    <span className="text-[13.5px] font-bold text-black">
                      Registration
                    </span>
                  </div>
                  <span className="text-[12px] font-[510] text-black">
                    Upload proof of vehicle’s registrations
                  </span>

                  <div className="w-full flex items-center justify-center gap-2 text-black">
                    <AiOutlinePlusCircle />
                    <span className="text-[12px] underline underline-offset-2 font-bold text-black">
                      Add Documents
                    </span>
                  </div>
                </div>

                <div>
                  <label class="block mb-1 text-sm text-gray-500 font-medium ml-1 ">
                    Expiration Date
                  </label>
                  <input
                    type="date"
                    id="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="johnsnow@example.com"
                    class={`block w-full px-5 py-3  text-gray-700 placeholder-gray-400 bg-gray-50 border border-gray-200 rounded-2xl   focus:border-[#c00000]  focus:ring-[#c00000] focus:outline-none focus:ring focus:ring-opacity-40 transition-colors duration-300 ${
                      errors.email && touched.email
                        ? "border-red-600 shake"
                        : null
                    }`}
                  />
                  {errors.email && touched.email ? (
                    <p className="text-red-700 text-sm font-medium">
                      {errors.email}
                    </p>
                  ) : null}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                class="flex items-center justify-center gap-4 w-full  px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-[#c00000] rounded-full hover:bg-[#c00000] focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-50"
              >
                {loading && (
                  <div
                    class="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-white rounded-full"
                    role="status"
                    aria-label="loading"
                  >
                    <span class="sr-only">Loading...</span>
                  </div>
                )}
                <span>Confirm & Send for Approval </span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5 rtl:-scale-x-100"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddVehicle;
