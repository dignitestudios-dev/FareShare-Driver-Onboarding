import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "../../assets/export";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import axios from "../../axios";
import { loginValues, signupValues } from "../../data/authentication";
import { SuccessToast, ErrorToast } from "../../components/global/Toast";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { signupSchema } from "../../schema/signupSchema";
// firebase:
import { auth } from "../../firebase/firebase"; // Adjust the import based on your file structure
import {
  createUserWithEmailAndPassword,
  getIdToken,
  signInWithEmailAndPassword,
} from "firebase/auth";
import SocialLogin from "../../components/authentication/SocialLogin";

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [idToken, setIdToken] = useState(null);
  const [show, setShow] = useState(false);
  const [showConf, setShowConf] = useState(false);

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: signupValues,
      validationSchema: signupSchema,
      validateOnChange: true,
      validateOnBlur: false,

      onSubmit: async (values, action) => {
        setLoading(true);
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
            ErrorToast("Token not found");
            setLoading(false);
          }
        } catch (error) {
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
              ErrorToast("Token Not Found");
              setLoading(false);
            }
          } else {
            ErrorToast("Login error || Firebase authentication failed");
            setLoading(false);
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
        let res = await fetch("https://api.ipify.org?format=json", {
          method: "GET",
        });
        const ip = await res.json();
        // API call to login using Axios interceptor
        const response = await axios.post("/auth/driverEmailSignUp", {
          email: values.email.toLowerCase(),
          phoneNo: "+1" + values.phoneNo,
          password: values.password,
          confirmPassword: values.confirmPassword,
          referalCode: values.referalCode == "" ? null : values.referalCode,
          ip: ip?.ip,
          idToken: idToken,
        });

        // Handle the response (e.g., save token, redirect)
        if (response?.data?.success) {
          localStorage.setItem("email", values?.email.toLowerCase());
          localStorage.setItem("phone", "+1" + values?.phoneNo);
          navigate("/verify-otp-email");
        }
      } catch (error) {
        ErrorToast(error?.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    sendDataToBackend();
  }, [idToken]);

  return (
    <div class="w-full  bg-white">
      <div class="grid lg:grid-cols-4 md:grid-cols-3 items-center">
        <div className="lg:col-span-3 md:col-span-2 max-w-2xl w-full p-6 mx-auto ">
          <form onSubmit={handleSubmit} class=" w-full ">
            <div class="mb-12">
              <img src={Logo} alt="" className="mb-10 scale-110" />
              <h3 class="text-gray-800 text-4xl font-extrabold">Sign Up</h3>
              <p class="text-gray-800 text-sm mt-6 leading-relaxed">
                Fill out this form & register yourself as a new driver on
                FareShare.
              </p>
            </div>
            <div>
              <div class="relative flex items-center">
                <label class="text-gray-800 text-[13px] bg-white absolute px-2 top-[-9px] left-[18px] font-semibold">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter email"
                  class="px-4 py-3.5 bg-white w-full text-sm border-2 border-gray-200 focus:border-[#c00000] rounded-lg outline-none"
                />

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  class="w-[18px] h-[18px] absolute right-4"
                  viewBox="0 0 682.667 682.667"
                >
                  <defs>
                    <clipPath id="a" clipPathUnits="userSpaceOnUse">
                      <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                    </clipPath>
                  </defs>
                  <g
                    clip-path="url(#a)"
                    transform="matrix(1.33 0 0 -1.33 0 682.667)"
                  >
                    <path
                      fill="none"
                      stroke-miterlimit="10"
                      stroke-width="40"
                      d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                      data-original="#000000"
                    ></path>
                    <path
                      d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                      data-original="#000000"
                    ></path>
                  </g>
                </svg>
              </div>
              {errors.email && touched.email ? (
                <p className="text-red-700 ml-1 mt-1 text-sm font-medium">
                  {errors.email}
                </p>
              ) : null}
            </div>

            <div>
              <div class="relative flex  border-2 border-gray-200 focus:border-[#c00000] rounded-lg outline-none items-center mt-8">
                <label class="text-gray-800 text-[13px] bg-white absolute px-2 top-[-9px] left-[18px] font-semibold">
                  Phone Number
                </label>
                <span className="w-[10%] border-r-2 border-gray-200  flex items-center justify-center text-gray-400">
                  +1
                </span>
                <input
                  type={"text"}
                  id="phoneNo"
                  name="phoneNo"
                  maxLength={10}
                  value={values.phoneNo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Phone Number (without +1 & dashes)"
                  class="px-4 py-3.5 bg-white w-[90%] text-sm rounded-lg outline-none"
                />
              </div>
              {errors.phoneNo && touched.phoneNo ? (
                <p className="text-red-700 ml-1 mt-1 text-sm font-medium">
                  {errors.phoneNo}
                </p>
              ) : null}
            </div>
            <div>
              <div class="relative flex items-center mt-8">
                <label class="text-gray-800 text-[13px] bg-white absolute px-2 top-[-9px] left-[18px] font-semibold">
                  Referral Code
                </label>
                <input
                  type={"text"}
                  id="referalCode"
                  name="referalCode"
                  value={values.referalCode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="4-Digit Referral Code"
                  class="px-4 py-3.5 bg-white w-full text-sm border-2 border-gray-200 focus:border-[#c00000] rounded-lg outline-none"
                />
                <span className="absolute right-4 text-gray-400">%</span>
              </div>
              {errors.referalCode && touched.referalCode ? (
                <p className="text-red-700 ml-1 mt-1 text-sm font-medium">
                  {errors.referalCode}
                </p>
              ) : null}
            </div>
            <div>
              <div class="relative flex items-center mt-8">
                <label class="text-gray-800 text-[13px] bg-white absolute px-2 top-[-9px] left-[18px] font-semibold">
                  Password
                </label>
                <input
                  type={show ? "text" : "password"}
                  id="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter password"
                  class="px-4 py-3.5 bg-white w-full text-sm border-2 border-gray-200 focus:border-[#c00000] rounded-lg outline-none"
                />
                <span
                  className="absolute cursor-pointer right-4 text-gray-400"
                  onClick={() => setShow((prev) => !prev)}
                >
                  {show ? <FaRegEye /> : <FaRegEyeSlash />}
                </span>
              </div>
              {errors.password && touched.password ? (
                <p className="text-red-700 ml-1 mt-1 text-sm font-medium">
                  {errors.password}
                </p>
              ) : null}
            </div>
            <div>
              <div class="relative flex items-center mt-8">
                <label class="text-gray-800 text-[13px] bg-white absolute px-2 top-[-9px] left-[18px] font-semibold">
                  Confirm Password
                </label>
                <input
                  type={showConf ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Re-enter password"
                  class="px-4 py-3.5 bg-white w-full text-sm border-2 border-gray-200 focus:border-[#c00000] rounded-lg outline-none"
                />
                <span
                  className="absolute cursor-pointer right-4 text-gray-400"
                  onClick={() => setShowConf((prev) => !prev)}
                >
                  {showConf ? <FaRegEye /> : <FaRegEyeSlash />}
                </span>
              </div>
              {errors.confirmPassword && touched.confirmPassword ? (
                <p className="text-red-700 ml-1 mt-1 text-sm font-medium">
                  {errors.confirmPassword}
                </p>
              ) : null}
            </div>

            <div class="flex flex-col my-4 items-start ">
              <div
                className={`flex items-start transition-colors duration-300 ${
                  errors.accept && touched.accept ? " shake" : null
                }`}
              >
                <input
                  id="accept"
                  type="checkbox"
                  name="accept"
                  value={values.accept}
                  maxLength={12}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  class="w-3 h-3 text-[#c00000]  bg-gray-100 border-gray-300 rounded  accent-[#c00000]  outline-none cursor-pointer"
                />
                <label
                  htmlFor="accept"
                  class="ms-2 text-xs leading-none font-medium text-gray-600 "
                >
                  I Accept the{" "}
                  <Link
                    to={"https://www.faresharellc.com/terms-and-conditions"}
                    target="_blank"
                    className="text-[#c00000]"
                  >
                    Terms & Conditions
                  </Link>{" "}
                  and{" "}
                  <Link
                    to={"https://www.faresharellc.com/privacy-policy"}
                    target="_blank"
                    className="text-[#c00000]"
                  >
                    Privacy Policy
                  </Link>
                </label>
              </div>
              {errors.accept && touched.accept ? (
                <p className="text-red-700 text-sm ml-1 font-medium">
                  {errors.accept}
                </p>
              ) : null}
            </div>

            <div class="flex flex-col my-4 items-start ">
              <div
                className={`flex items-start transition-colors duration-300 ${
                  errors.twilioCheck && touched.twilioCheck ? " shake" : null
                }`}
              >
                <input
                  id="twilioCheck"
                  type="checkbox"
                  name="twilioCheck"
                  value={values.twilioCheck}
                  maxLength={12}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  class="w-3 h-3 text-[#c00000]  bg-gray-100 border-gray-300 rounded  accent-[#c00000]  outline-none cursor-pointer"
                />
                <label
                  htmlFor="twilioCheck"
                  class="ms-2 text-xs leading-none font-medium text-gray-600 "
                >
                  I Consent to Receive SMS Notifications and messages from
                  FareShare LLC. An OTP message is received for every signup for
                  authentication purposes only; FareShare LLC will never contact
                  you for any other purposes besides signup authentication.
                  Message & data rates may apply. Text HELP to +1 (650) 389-5456
                  for assistance.
                </label>
              </div>
              {errors.twilioCheck && touched.twilioCheck ? (
                <p className="text-red-700 text-sm ml-1 font-medium">
                  {errors.twilioCheck}
                </p>
              ) : null}
            </div>

            <div class="mt-12">
              <button
                type="submit"
                disabled={loading}
                class="w-full shadow-xl py-2.5 px-4 text-sm tracking-wider font-semibold rounded-full text-white button-bg  focus:outline-none"
              >
                Sign Up
                <span className="ml-2">
                  {loading && (
                    <div
                      class="animate-spin inline-block size-3 border-[3px] border-current border-t-transparent text-white rounded-full"
                      role="status"
                      aria-label="loading"
                    >
                      <span class="sr-only">Loading...</span>
                    </div>
                  )}
                </span>
              </button>
            </div>
          </form>

          <div className="w-full flex justify-center my-4 items-center gap-2">
            <span className="w-[35%] h-[1px] bg-gray-300"></span>
            <span className="text-sm font-semibold text-gray-500">OR</span>
            <span className="w-[35%] h-[1px] bg-gray-300"></span>
          </div>

          <SocialLogin />
        </div>
        <div class="flex flex-col justify-center space-y-16 md:h-screen max-md:mt-16 min-h-full bg  py-4">
          <div className=" mx-4 rounded-2xl p-4 bg-white">
            <h4 class="text-[#c00000] text-lg font-semibold">Sign up</h4>
            <p class="text-[13px] text-[#c00000] mt-2">
              Register yourself by filling out your account specific data.
            </p>
          </div>

          <div className=" px-4">
            <h4 class="text-white  text-lg font-semibold">Complete Profile</h4>
            <p class="text-[13px] text-white mt-2">
              Complete your profile by providing your personal details for your
              account.
            </p>
          </div>
          <div className="px-4">
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
            <h4 class="text-white  text-lg font-semibold">Buy Subscription</h4>
            <p class="text-[13px] text-white mt-2">
              Attach your card and buy a weekly subscription to access the
              features of the platform.
            </p>
          </div>

          <div className="px-4">
            <h4 class="text-white  text-lg font-semibold">Add Bank</h4>
            <p class="text-[13px] text-white mt-2">
              Add your bank account details for future funds and your rides
              payment recieving.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
