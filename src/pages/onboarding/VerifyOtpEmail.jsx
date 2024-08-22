import React, { useContext, useEffect, useRef, useState } from "react";
import { FaApple, FaFacebook, FaFacebookF } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { TiUserAddOutline } from "react-icons/ti";
import { AppContext } from "../../context/AppContext";
import { verifyOtpSchema } from "../../schema/verifyOtpSchema";
import { verifyOtpValues } from "../../data/authentication";
import { useFormik } from "formik";
import authentication from "../../api/authenticationInterceptor";
import Cookies from "js-cookie";
import Error from "../../components/app/global/Error";
import SuccessToast from "../../components/app/global/SuccessToast";
import api from "../../api/apiInterceptor";

const VerifyOtpEmail = () => {
  const { navigate, error, setError } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: verifyOtpValues,
      validationSchema: verifyOtpSchema,
      validateOnChange: true,
      validateOnBlur: false,

      onSubmit: async (values, action) => {
        const email = localStorage.getItem("email");
        setLoading(true);
        try {
          const otp = values.otp1 + values.otp2 + values.otp3 + values.otp4;
          // API call to login using Axios interceptor
          const response = await authentication.post("/auth/validateOTP", {
            email: email,
            code: otp,
          });

          if (response?.data?.success) {
            setSuccess("Email  Verified Successfully Successfully.");
            const response = await api.post("/auth/sendPhoneOTP", {
              phoneNo: localStorage.getItem("phone"),
            });
            localStorage.setItem("token", response?.data?.token);
            navigate("Verify Phone Otp", "/verify-otp-phone");
          }
        } catch (error) {
          // Handle errors (e.g., show error message)
          setError(error?.response?.data?.message);

          // console.error("Login failed:", error.response?.data);
        } finally {
          setLoading(false);
        }
      },
    });

  //   OTP Code:
  const [otp1, setOtp1] = useState("");
  const [otp2, setOtp2] = useState("");
  const [otp3, setOtp3] = useState("");
  const [otp4, setOtp4] = useState("");

  const otpRef1 = useRef();
  const otpRef2 = useRef();
  const otpRef3 = useRef();
  const otpRef4 = useRef();

  useEffect(() => {
    otpRef1.current.focus();
  }, []);

  const focusNextInput = (currentRef) => {
    if (currentRef && currentRef.current) {
      currentRef.current.focus();
    }
  };

  const focusPrevInput = (currentRef) => {
    if (currentRef && currentRef.current) {
      currentRef.current.focus();
    }
  };

  const handleInputChange = (e, inputNumber) => {
    const value = e.target.value;

    if (value.length > 0 && inputNumber < 4) {
      const nextInputRef = eval("otpRef" + (inputNumber + 1));
      if (nextInputRef && nextInputRef.current) {
        nextInputRef.current.focus();
      }
    }

    switch (inputNumber) {
      case 1:
        setOtp1(value);
        break;
      case 2:
        setOtp2(value);
        break;
      case 3:
        setOtp3(value);
        break;
      case 4:
        setOtp4(value);
        break;
      default:
        break;
    }
  };

  const handleBackspace = (e, inputNumber) => {
    if (e.key === "Backspace" && !e.target.value) {
      if (inputNumber > 1) {
        const prevInputRef = eval("otpRef" + (inputNumber - 1));
        focusPrevInput(prevInputRef);
      }
    }
  };

  // Resend OTP:
  const [resendLoading, setResendLoading] = useState(false);
  const resendOtp = async () => {
    setResendLoading(true);
    try {
      const response = await authentication.post("/auth/sendOTP", {
        email: localStorage.getItem("email"),
      });
      if (response?.data?.success) {
        setResendLoading(false);
        setSuccess("OTP Resend Successfully.");
      }
    } catch (error) {
      // Handle errors (e.g., show error message)
      setError(error?.response?.data?.message);
      // console.error("Login failed:", error.response?.data);
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <section className="bg-white">
      <div className="flex justify-center min-h-screen">
        <div className="hidden bg-gray-50 lg:flex justify-center items-center bg-cover lg:w-1/2">
          <div className="w-full h-full flex items-center justify-center animate-one text-4xl font-bold text-[#c00000]">
            <img
              src="https://fareshare.vercel.app/assets/mobilemockup-ySib-16m.svg"
              alt="Mobile Mockup"
              className="w-[40%]"
            />
          </div>
        </div>
        <Error error={error} setError={setError} />
        <SuccessToast success={success} setSuccess={setSuccess} />
        <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-1/2">
          <div className="w-full">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-8">
              <div className="w-full h-auto ">
                <div class="w-full h-auto ">
                  <div class="w-full flex flex-col gap-4 justify-around items-center">
                    <div class="w-full h-auto flex flex-col py-4 justify-start items-center gap-6">
                      <div class="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                        <img
                          src="data:image/png;base64,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"
                          alt="forgot-image"
                          class="w-full h-full rounde-full"
                        />
                      </div>
                      <div className="w-full flex flex-col items-center justify-center">
                        <h1 class="text-2xl text-center font-semibold leading-tight tracking-wider text-gray-800 capitalize ">
                          Confirm your email.
                        </h1>

                        <p class="mt-4 text-center text-gray-500 leading-tight">
                          We've sent an email onto your registered email.
                        </p>
                      </div>
                      <div class="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                        <div class="w-16 h-16 ">
                          <input
                            maxlength="1"
                            class={`w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none  border-b border-gray-500 text-lg bg-white focus:bg-gray-50 focus:border-gray-800  transition-colors duration-300 ${
                              errors.otp1 && touched.otp1
                                ? "focus:bg-red-50 border-red-600 shake"
                                : null
                            }`}
                            type="text"
                            name="otp1"
                            placeholder="-"
                            maxLength="1"
                            value={values.otp1}
                            onChange={(e) => {
                              handleInputChange(e, 1);
                              handleChange(e);
                            }}
                            onBlur={handleBlur}
                            onKeyDown={(e) => handleBackspace(e, 1)}
                            ref={otpRef1}
                            id=""
                            autocomplete="off"
                          />
                        </div>
                        <div class="w-16 h-16 ">
                          <input
                            maxlength="1"
                            class={`w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none  border-b border-gray-500 text-lg bg-white focus:bg-gray-50 focus:border-gray-800  transition-colors duration-300 ${
                              errors.otp2 && touched.otp2
                                ? "focus:bg-red-50 border-red-600 shake"
                                : null
                            }`}
                            type="text"
                            name="otp2"
                            placeholder="-"
                            maxLength="1"
                            value={values.otp2}
                            onChange={(e) => {
                              handleInputChange(e, 2);
                              handleChange(e);
                            }}
                            onBlur={handleBlur}
                            onKeyDown={(e) => handleBackspace(e, 2)}
                            ref={otpRef2}
                            id=""
                            autocomplete="off"
                          />
                        </div>
                        <div class="w-16 h-16 ">
                          <input
                            maxlength="1"
                            class={`w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none  border-b border-gray-500 text-lg bg-white focus:bg-gray-50 focus:border-gray-800  transition-colors duration-300 ${
                              errors.otp3 && touched.otp3
                                ? "focus:bg-red-50 border-red-600 shake"
                                : null
                            }`}
                            type="text"
                            name="otp3"
                            placeholder="-"
                            maxLength="1"
                            value={values.otp3}
                            onChange={(e) => {
                              handleInputChange(e, 3);
                              handleChange(e);
                            }}
                            onBlur={handleBlur}
                            onKeyDown={(e) => handleBackspace(e, 3)}
                            ref={otpRef3}
                            id=""
                            autocomplete="off"
                          />
                        </div>
                        <div class="w-16 h-16 ">
                          <input
                            maxlength="1"
                            class={`w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none  border-b border-gray-500 text-lg bg-white focus:bg-gray-50 focus:border-gray-800  transition-colors duration-300 ${
                              errors.otp4 && touched.otp4
                                ? "focus:bg-red-50 border-red-600 shake"
                                : null
                            }`}
                            type="text"
                            name="otp4"
                            placeholder="-"
                            maxLength="1"
                            value={values.otp4}
                            onChange={(e) => {
                              handleInputChange(e, 4);
                              handleChange(e);
                            }}
                            onBlur={handleBlur}
                            onKeyDown={(e) => handleBackspace(e, 4)}
                            ref={otpRef4}
                            id=""
                            autocomplete="off"
                          />
                        </div>
                      </div>
                      {(errors.otp1 && touched.otp1) ||
                      (errors.otp2 && touched.otp2) ||
                      (errors.otp3 && touched.otp3) ||
                      (errors.otp4 && touched.otp4) ? (
                        <p className="text-red-700 text-sm font-medium">
                          OTP is required
                        </p>
                      ) : null}
                      <button
                        type="submit"
                        disabled={loading}
                        class="h-14 text-lg font-semibold w-full xl:w-[24rem] bg-[#c00000] flex justify-center items-center gap-2 text-white rounded-full "
                      >
                        {loading && (
                          <div
                            class="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-white rounded-full"
                            role="status"
                            aria-label="loading"
                          >
                            <span class="sr-only">Loading...</span>
                          </div>
                        )}
                        Submit
                      </button>
                      <button
                        type="button"
                        onClick={resendOtp}
                        disabled={resendLoading}
                        class="h-14 text-lg font-semibold w-full xl:w-[24rem] border-2 border-[#c00000] text-[#c00000] rounded-full transition-all flex justify-center items-center gap-2 duration-200 hover:bg-[#c00000] hover:text-white"
                      >
                        {resendLoading && (
                          <div
                            class="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-white rounded-full"
                            role="status"
                            aria-label="loading"
                          >
                            <span class="sr-only">Loading...</span>
                          </div>
                        )}
                        Resend Code
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerifyOtpEmail;
