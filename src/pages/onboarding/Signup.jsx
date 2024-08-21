import React, { useContext } from "react";
import { FaApple, FaFacebook, FaFacebookF } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { TiUserAddOutline } from "react-icons/ti";
import { AppContext } from "../../context/AppContext";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import authentication from "../../api/authenticationInterceptor";
import { useState } from "react";
import Error from "../../components/app/global/Error";
import SocialLogin from "../../components/authentication/SocialLogin";
import axios from "axios";
import { signupSchema } from "../../schema/signupSchema";
import { signupValues } from "../../data/authentication";
import { Link } from "react-router-dom";
// firebase:
import { auth } from "../../firebase/firebase"; // Adjust the import based on your file structure
import {
  createUserWithEmailAndPassword,
  getIdToken,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useEffect } from "react";

const Signup = () => {
  const { navigate, error, setError } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [idToken, setIdToken] = useState(null);
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: signupValues,
      validationSchema: signupSchema,
      validateOnChange: true,
      validateOnBlur: false,

      onSubmit: async (values, action) => {
        setLoading(true);
        try {
          try {
            const newUser = await createUserWithEmailAndPassword(
              auth,
              values?.email,
              values?.password
            );
            const user = newUser.user;
            // Get the ID token
            const token = await getIdToken(user);
            if (token) {
              setIdToken(token);
            } else {
              setError("Token Not Found");
              setLoading(false);
            }
          } catch (error) {
            console.log(error);
            if (error.code === "auth/email-already-in-use") {
              // Try to sign in the user
              const userCredential = await signInWithEmailAndPassword(
                auth,
                values?.email,
                values?.password
              );
              const user = userCredential.user;
              //   // Get the ID token
              const token = await getIdToken(user);
              if (token) {
                setIdToken(token);
              } else {
                setError("Token Not Found");
                setLoading(false);
              }
            } else {
              setError("Login error");
              setLoading(false);
            }
          }
        } finally {
          setLoading(false);
        }
      },
    });

  const sendDataToBackend = async () => {
    if (idToken) {
      setLoading(true);
      try {
        const ip = await authentication.get(
          "https://api.ipify.org?format=json"
        );
        // API call to login using Axios interceptor
        const response = await authentication.post("/auth/driverEmailSignUp", {
          email: values.email,
          phoneNo: values.phoneNo,
          password: values.password,
          confirmPassword: values.confirmPassword,
          referalCode: values.referalCode == "" ? null : values.referalCode,
          ip: ip.data.ip,
          idToken: idToken,
        });

        // Handle the response (e.g., save token, redirect)
        if (response?.data?.success) {
          localStorage.setItem("email", values?.email);
          localStorage.setItem("phone", values?.phoneNo);
          navigate("Verify Otp Email", "/verify-otp-email");
        }
      } catch (error) {
        // Handle errors (e.g., show error message)
        setError(error?.response?.data?.message);
        // console.error("Login failed:", error.response?.data);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    sendDataToBackend();
  }, [idToken]);
  return (
    <section class="bg-white ">
      <div class="flex justify-center min-h-screen">
        <div class="hidden bg-gray-50 lg:flex justify-center items-center bg-cover  lg:w-2/5">
          <div class="w-full h-full  flex items-center justify-center animate one text-4xl font-bold text-[#c00000]">
            <img
              src="https://fareshare.vercel.app/assets/fareshare_logo-15fzbzBE.svg"
              alt=""
              className="w-[70%]"
            />
          </div>
        </div>

        <div class="flex items-center  w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
          <div class="w-full">
            <Error error={error} setError={setError} />

            <h1 class="text-4xl font-bold text-center tracking-wider text-gray-800 capitalize ">
              Hello!
            </h1>

            <p class=" text-gray-500 text-center text-xl">Create an account.</p>

            <form
              onSubmit={handleSubmit}
              class="w-full flex flex-col gap-6 mt-8 "
            >
              <div className="w-full flex flex-col gap-2 ">
                <div className="w-full">
                  <input
                    type="text"
                    id="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Email"
                    class={`block w-full px-5 py-3 mt-1.5 text-gray-700 placeholder-gray-400 bg-gray-50 border border-gray-200 rounded-full   focus:border-[#c00000]  focus:ring-[#c00000] focus:outline-none focus:ring focus:ring-opacity-40 transition-colors duration-300 ${
                      errors.email && touched.email
                        ? "border-red-600 shake"
                        : null
                    }`}
                  />
                  {errors.email && touched.email ? (
                    <p className="text-red-700 text-sm ml-1 font-medium">
                      {errors.email}
                    </p>
                  ) : null}
                </div>

                <div className="w-full">
                  <input
                    type="text"
                    id="phoneNo"
                    name="phoneNo"
                    value={values.phoneNo}
                    maxLength={12}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Phone Number"
                    class={`block w-full px-5 py-3 mt-1.5 text-gray-700 placeholder-gray-400 bg-gray-50 border border-gray-200 rounded-full   focus:border-[#c00000]  focus:ring-[#c00000] focus:outline-none focus:ring focus:ring-opacity-40 transition-colors duration-300 ${
                      errors.phoneNo && touched.phoneNo
                        ? "border-red-600 shake"
                        : null
                    }`}
                  />
                  {errors.phoneNo && touched.phoneNo ? (
                    <p className="text-red-700 text-sm ml-1 font-medium">
                      {errors.phoneNo}
                    </p>
                  ) : null}
                </div>

                <div className="w-full">
                  <input
                    type="text"
                    id="referalCode"
                    name="referalCode"
                    value={values.referalCode}
                    maxLength={12}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Referal Code"
                    class={`block w-full px-5 py-3 mt-1.5 text-gray-700 placeholder-gray-400 bg-gray-50 border border-gray-200 rounded-full   focus:border-[#c00000]  focus:ring-[#c00000] focus:outline-none focus:ring focus:ring-opacity-40 transition-colors duration-300 ${
                      errors.referalCode && touched.referalCode
                        ? "border-red-600 shake"
                        : null
                    }`}
                  />
                  {errors.referalCode && touched.referalCode ? (
                    <p className="text-red-700 text-sm ml-1 font-medium">
                      {errors.referalCode}
                    </p>
                  ) : null}
                </div>

                <div class="w-full">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Your Password"
                    class={`block w-full px-5 py-3 mt-1.5 text-gray-700 placeholder-gray-400 bg-gray-50 border border-gray-200 rounded-full   focus:border-[#c00000]  focus:ring-[#c00000] focus:outline-none focus:ring focus:ring-opacity-40  transition-colors duration-300 ${
                      errors.password && touched.password
                        ? "border-red-600 shake"
                        : null
                    }`}
                  />
                  {errors.password && touched.password ? (
                    <p className="text-red-700 text-sm ml-1 font-medium">
                      {errors.password}
                    </p>
                  ) : null}
                </div>

                <div class="w-full">
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Confirm Password"
                    class={`block w-full px-5 py-3 mt-1.5 text-gray-700 placeholder-gray-400 bg-gray-50 border border-gray-200 rounded-full   focus:border-[#c00000]  focus:ring-[#c00000] focus:outline-none focus:ring focus:ring-opacity-40  transition-colors duration-300 ${
                      errors.confirmPassword && touched.confirmPassword
                        ? "border-red-600 shake"
                        : null
                    }`}
                  />
                  {errors.confirmPassword && touched.confirmPassword ? (
                    <p className="text-red-700 text-sm ml-1 font-medium">
                      {errors.confirmPassword}
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
                    I Accept the{" "}
                    <Link to={"/"} className="text-[#c00000]">
                      Terms & Conditions
                    </Link>{" "}
                    and{" "}
                    <Link to={"/"} className="text-[#c00000]">
                      Privacy Policy
                    </Link>
                  </label>
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
                <span>Sign Up </span>

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

              <div className="w-full flex justify-center items-center gap-2">
                <span className="w-[35%] h-[1px] bg-gray-300"></span>
                <span className="text-sm font-semibold text-gray-500">OR</span>
                <span className="w-[35%] h-[1px] bg-gray-300"></span>
              </div>

              <SocialLogin />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
