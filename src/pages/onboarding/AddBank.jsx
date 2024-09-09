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
import { signupSchema } from "../../schema/signupSchema";
import { signupValues } from "../../data/authentication";
import { Link } from "react-router-dom";
import { ImProfile } from "react-icons/im";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { GoPlus } from "react-icons/go";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Bank } from "../../assets/export";
import axios from "axios";
import { addBankValues } from "../../data/profile/addBank";
import { addBankSchema } from "../../schema/profile/addBankSchema";
import FinalSuccess from "./FinalSuccess";

const AddBank = () => {
  const { navigate, error, setError } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: addBankValues,
      validationSchema: addBankSchema,
      validateOnChange: true,
      validateOnBlur: false,

      onSubmit: async (values, action) => {
        setLoading(true);
        const headers = {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        };
        // API call to login using Axios interceptor
        axios
          .post(
            "https://backend.faresharellc.com/finance/banks",
            {
              accountNumber: values.accountNumber,
              accountHolderName: values.accountHolderName,
              routingNumber: values.routingNumber,
            },
            { headers }
          )
          .then((response) => {
            if (response?.data?.success) {
              setSuccess(true);
              setLoading(false);
            }
          })
          .catch((error) => {
            setError(error?.response?.data?.message);
            setLoading(false);
          });
      },
    });
  return (
    <section class="bg-white ">
      {success && <FinalSuccess />}
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
              {/* <Link
                to={"/add-card"}
                className="w-10 h-10 mr-auto rounded-full flex justify-center items-center text-md bg-[#c00000] text-white"
              >
                <FaArrowLeft />
              </Link> */}
              <h1 class="text-[17px]  lg:text-[24px] font-semibold text-center tracking-tight text-gray-800 capitalize ">
                Bank details{" "}
              </h1>
            </div>
            <div className="w-full flex justify-center items-center my-6">
              <img src={Bank} alt="" />
            </div>

            <form
              onSubmit={handleSubmit}
              class="w-full flex flex-col gap-6 mt-8 "
            >
              <div className="w-full flex flex-col  gap-4 ">
                <div>
                  <label class="block mb-1 text-sm text-gray-500 font-medium ml-1 ">
                    Account Holder’s Name
                  </label>
                  <input
                    type="text"
                    id="accountHolderName"
                    name="accountHolderName"
                    value={values.accountHolderName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="John Doe"
                    class={`block w-full px-5 py-3 bg-gray-50  text-gray-700 placeholder-gray-400  border border-gray-200 rounded-2xl   focus:border-[#c00000]  focus:ring-[#c00000] focus:outline-none focus:ring focus:ring-opacity-40 transition-colors duration-300 ${
                      errors.accountHolderName && touched.accountHolderName
                        ? "border-red-600 shake"
                        : null
                    }`}
                  />
                  {errors.accountHolderName && touched.accountHolderName ? (
                    <p className="text-red-700 text-sm font-medium">
                      {errors.accountHolderName}
                    </p>
                  ) : null}
                </div>
                <div>
                  <label class="block mb-1 text-sm text-gray-500 font-medium ml-1 ">
                    Account Number
                  </label>
                  <input
                    type="text"
                    id="accountNumber"
                    name="accountNumber"
                    maxLength={17}
                    value={values.accountNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="XXXX-XXXX-XXXX"
                    class={`block w-full px-5 py-3 bg-gray-50  text-gray-700 placeholder-gray-400  border border-gray-200 rounded-2xl   focus:border-[#c00000]  focus:ring-[#c00000] focus:outline-none focus:ring focus:ring-opacity-40 transition-colors duration-300 ${
                      errors.accountNumber && touched.accountNumber
                        ? "border-red-600 shake"
                        : null
                    }`}
                  />
                  {errors.accountNumber && touched.accountNumber ? (
                    <p className="text-red-700 text-sm font-medium">
                      {errors.accountNumber}
                    </p>
                  ) : null}
                </div>
                <div>
                  <label class="block mb-1 text-sm text-gray-500 font-medium ml-1 ">
                    Routing Number
                  </label>
                  <input
                    type="text"
                    id="routingNumber"
                    name="routingNumber"
                    value={values.routingNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="XXXX-XXXX-XXXX"
                    class={`block w-full px-5 py-3 bg-gray-50  text-gray-700 placeholder-gray-400  border border-gray-200 rounded-2xl   focus:border-[#c00000]  focus:ring-[#c00000] focus:outline-none focus:ring focus:ring-opacity-40 transition-colors duration-300 ${
                      errors.routingNumber && touched.routingNumber
                        ? "border-red-600 shake"
                        : null
                    }`}
                  />
                  {errors.routingNumber && touched.routingNumber ? (
                    <p className="text-red-700 text-sm font-medium">
                      {errors.routingNumber}
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
                <span>Confirm & Continue </span>

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

export default AddBank;
