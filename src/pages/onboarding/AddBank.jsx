import React, { useContext } from "react";

import { AppContext } from "../../context/AppContext";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import { useState } from "react";
import { Bank } from "../../assets/export";
import axios from "../../axios";
import { addBankValues } from "../../data/profile/addBank";
import { addBankSchema } from "../../schema/profile/addBankSchema";
import FinalSuccess from "./FinalSuccess";
import { ErrorToast } from "../../components/global/Toast";
import { FiUser } from "react-icons/fi";
import { GoNumber } from "react-icons/go";

const AddBank = () => {
  const { error, setError } = useContext(AppContext);
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

        // API call to login using Axios interceptor
        axios
          .post("/finance/banks", {
            accountNumber: values.accountNumber,
            accountHolderName: values.accountHolderName,
            routingNumber: values.routingNumber,
          })
          .then((response) => {
            if (response?.data?.success) {
              setSuccess(true);
              setLoading(false);
            }
          })
          .catch((error) => {
            ErrorToast(error?.response?.data?.message);
            setLoading(false);
          });
      },
    });
  return (
    <div class="w-full  bg-white ">
      <div class="grid lg:grid-cols-4  md:grid-cols-3 items-center">
        <section
          class={`${
            success ? "lg:col-span-4" : "lg:col-span-3 "
          } md:col-span-2 max-w-2xl w-full lg:p-6 mx-auto `}
        >
          {success ? (
            <FinalSuccess />
          ) : (
            <div class="flex justify-center w-full min-h-screen">
              <div class="flex items-center  w-full  p-6 lg:px-12 ">
                <div class="w-full">
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
                        <div class="relative flex items-center">
                          <label class="text-gray-800 text-[13px] bg-white absolute px-2 top-[-9px] left-[18px] font-semibold">
                            Account Holder Name
                          </label>
                          <input
                            type="text"
                            id="accountHolderName"
                            name="accountHolderName"
                            placeholder="e.g. Jason"
                            value={values.accountHolderName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            class="px-4 py-3.5 bg-white w-full text-sm border-2 border-gray-200 focus:border-[#c00000] rounded-lg outline-none"
                          />

                          <span className="absolute right-4 text-xl text-gray-400">
                            <FiUser />{" "}
                          </span>
                        </div>
                        {errors.accountHolderName &&
                        touched.accountHolderName ? (
                          <p className="text-red-700 ml-1 mt-1 text-sm font-medium">
                            {errors.accountHolderName}
                          </p>
                        ) : null}
                      </div>
                      <div>
                        <div class="relative flex items-center">
                          <label class="text-gray-800 text-[13px] bg-white absolute px-2 top-[-9px] left-[18px] font-semibold">
                            Account Number
                          </label>
                          <input
                            type="text"
                            id="accountNumber"
                            name="accountNumber"
                            placeholder="XXXXXXXXXX"
                            maxLength={12}
                            value={values.accountNumber}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            class="px-4 py-3.5 bg-white w-full text-sm border-2 border-gray-200 focus:border-[#c00000] rounded-lg outline-none"
                          />

                          <span className="absolute right-4 text-xl text-gray-400">
                            <GoNumber />{" "}
                          </span>
                        </div>
                        {errors.accountNumber && touched.accountNumber ? (
                          <p className="text-red-700 ml-1 mt-1 text-sm font-medium">
                            {errors.accountNumber}
                          </p>
                        ) : null}
                      </div>
                      <div>
                        <div class="relative flex items-center">
                          <label class="text-gray-800 text-[13px] bg-white absolute px-2 top-[-9px] left-[18px] font-semibold">
                            Routing Number
                          </label>
                          <input
                            type="text"
                            id="routingNumber"
                            maxLength={9}
                            name="routingNumber"
                            placeholder="XXXXXXXXX"
                            value={values.routingNumber}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            class="px-4 py-3.5 bg-white w-full text-sm border-2 border-gray-200 focus:border-[#c00000] rounded-lg outline-none"
                          />

                          <span className="absolute right-4 text-xl text-gray-400">
                            <GoNumber />{" "}
                          </span>
                        </div>
                        {errors.routingNumber && touched.routingNumber ? (
                          <p className="text-red-700 ml-1 mt-1 text-sm font-medium">
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
          )}
        </section>

        {!success && (
          <div class="flex flex-col justify-center space-y-16  max-md:mt-16 min-h-full bg  py-4">
            <div className="px-4">
              <h4 class="text-white text-lg font-semibold">Sign up</h4>
              <p class="text-[13px] text-white mt-2">
                Register yourself by filling out your account specific data.
              </p>
            </div>

            <div className=" px-4 ">
              <h4 class="text-white  text-lg font-semibold">
                Complete Profile
              </h4>
              <p class="text-[13px] text-white mt-2">
                Complete your profile by providing your personal details for
                your account.
              </p>
            </div>
            <div className=" px-4">
              <h4 class="text-white  text-lg font-semibold">Add Vehicle</h4>
              <p class="text-[13px] text-white mt-2">
                Add your primary vehicle images, and documentation to access
                seamless driving experience.
              </p>
            </div>
            <div className="px-4">
              <h4 class="text-white  text-lg font-semibold">Admin Approval</h4>
              <p class="text-[13px] text-white mt-2">
                Wait for the admin to approve your profile by verifying your
                personal and vehicle information.
              </p>
            </div>
            <div className="px-4">
              <h4 class="text-white  text-lg font-semibold">
                Buy Subscription
              </h4>
              <p class="text-[13px] text-white mt-2">
                Attach your card and buy a weekly subscription to access the
                features of the platform.
              </p>
            </div>

            <div className="mx-4 rounded-2xl p-4 bg-white">
              <h4 class="text-[#c00000]  text-lg font-semibold">Add Bank</h4>
              <p class="text-[13px] text-[#c00000] mt-2">
                Add your bank account details for future funds and your rides
                payment recieving.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddBank;
